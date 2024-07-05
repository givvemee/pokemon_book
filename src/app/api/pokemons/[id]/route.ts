import { NextResponse } from 'next/server';
import axios from 'axios';

// GET 요청을 처리하는 함수
export const GET = async (request: Request, { params }: { params: { id: string } }) => {
    const { id } = params;

    try {
        // 포켓몬 기본 정보를 가져오는 요청
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
        // 포켓몬 종 정보를 가져오는 요청
        const speciesResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${id}`);

        // 포켓몬의 한국어 이름을 찾음
        const koreanName = speciesResponse.data.names?.find(
            (name: { language: { name: string } }) => name.language.name === 'ko'
        );

        // 포켓몬의 타입을 한국어로 변환
        const typesWithKoreanNames = await Promise.all(
            response.data.types.map(async (type: { type: { name: string; url: string } }) => {
                const typeResponse = await axios.get(type.type.url);
                const koreanTypeName =
                    typeResponse.data.names?.find((name: { language: { name: string } }) => name.language.name === 'ko')
                        ?.name || type.type.name;
                return { ...type, type: { ...type.type, korean_name: koreanTypeName } };
            })
        );
        // 포켓몬의 능력을 한국어로 변환
        const abilitiesWithKoreanNames = await Promise.all(
            response.data.abilities.map(async (ability: { ability: { name: string; url: string } }) => {
                const abilityResponse = await axios.get(ability.ability.url);
                const koreanAbilityName =
                    abilityResponse.data.names?.find(
                        (name: { language: { name: string } }) => name.language.name === 'ko'
                    )?.name || ability.ability.name;
                return {
                    ...ability,
                    ability: { ...ability.ability, korean_name: koreanAbilityName },
                };
            })
        );

        // 포켓몬의 기술을 한국어로 변환
        const movesWithKoreanNames = await Promise.all(
            response.data.moves.map(async (move: { move: { name: string; url: string } }) => {
                const moveResponse = await axios.get(move.move.url);
                const koreanMoveName =
                    moveResponse.data.names?.find((name: { language: { name: string } }) => name.language.name === 'ko')
                        ?.name || move.move.name;
                return { ...move, move: { ...move.move, korean_name: koreanMoveName } };
            })
        );

        // 이미지 받아오기
        const dreamWorldImage = response.data.sprites.other.dream_world.front_default;
        const defaultImage = response.data.sprites.front_default;
        const image = dreamWorldImage || defaultImage;

        // 최종 포켓몬 데이터를 구성
        const pokemonData = {
            ...response.data,
            korean_name: koreanName?.name || response.data.name,
            types: typesWithKoreanNames,
            abilities: abilitiesWithKoreanNames,
            moves: movesWithKoreanNames,
            image,
        };
        // JSON 응답으로 포켓몬 데이터를 반환
        return NextResponse.json(pokemonData);
    } catch (error) {
        // 에러 처리
        console.error('Error fetching Pokemon data:', error);
        return NextResponse.json({ error: 'Failed to fetch data' });
    }
};
