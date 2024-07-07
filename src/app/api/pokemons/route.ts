import { NextResponse } from 'next/server';
import axios, { AxiosResponse } from 'axios';

// 포켓몬 총 개수, 한번에 불러올 포켓몬 개수 설정
const TOTAL_POKEMON = 151;
const PAGE_SIZE = 20;

// GET 요청을 처리하는 함수
export const GET = async (request: Request) => {
    // 요청 URL에서 검색 매개변수를 가져옴
    const { searchParams } = new URL(request.url);
    // 페이지 번호를 가져옵니다. 기본값은 1로 설정
    const page = parseInt(searchParams.get('page') || '1');
    // 페이지 번호에 따른 오프셋을 계산
    const offset = (page - 1) * PAGE_SIZE;

    try {
        // 포켓몬 데이터를 가져오기 위한 여러 개의 요청을 생성
        const allPokemonPromises = Array.from({ length: PAGE_SIZE }, (_, index) => {
            const id = index + 1 + offset;
            if (id > TOTAL_POKEMON) return null;
            // 포켓몬(기본 정보)과 포켓몬 종 데이터(도감 설명)을 가져오는 두 개의 요청을 생성
            return Promise.all([
                axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`),
                axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`),
            ]) as Promise<[AxiosResponse<any>, AxiosResponse<any>]>;
        }).filter((promise): promise is Promise<[AxiosResponse<any>, AxiosResponse<any>]> => promise !== null);

        const allPokemonResponses = await Promise.all(allPokemonPromises);

        // 요청 결과에서 포켓몬 데이터를 추출 후, 한국어 이름을 추가
        const allPokemonData = allPokemonResponses.map(([response, speciesResponse]) => {
            const koreanName = speciesResponse.data.names.find((name: any) => name.language.name === 'ko');
            const dreamWorldImage = response.data.sprites.other.dream_world.front_default;
            const officialArtworkImage = response.data.sprites.other['official-artwork'].front_default;
            const image = dreamWorldImage || officialArtworkImage;
            return { ...response.data, korean_name: koreanName?.name || null, image };
        });
        // JSON 형식으로 포켓몬 데이터를 응답
        return NextResponse.json(allPokemonData);
    } catch (error) {
        // 에러처리
        return NextResponse.json({ error: 'Failed to fetch data' });
    }
};
