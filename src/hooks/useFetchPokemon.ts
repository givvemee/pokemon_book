import { useInfiniteQuery } from '@tanstack/react-query';

// 포켓몬 데이터를 페이지별로 가져오는 함수
const fetchPokemonPage = async ({ pageParam = 1 }) => {
    const response = await fetch(`/api/pokemons?page=${pageParam}`);
    return response.json();
};

const useFetchPokemon = () => {
    // 포켓몬 데이터를 무한히 불러오기 위한 훅 사용
    const { data, fetchNextPage, hasNextPage, isFetching, isFetchingNextPage } = useInfiniteQuery({
        // 이 쿼리의 고유한 키를 설정, 데이터를 구분하는데 사용
        queryKey: ['pokemons'],
        // 데이터를 가져오는 함수
        queryFn: fetchPokemonPage,
        // 다음 페이지의 파라미터를 결정하는 함수
        getNextPageParam: (lastPage, pages) => {
            // 마지막 페이지에 데이터가 있으면 다음 페이지 번호를 반환, 없으면 undefined 반환
            return lastPage.length > 0 ? pages.length + 1 : undefined;
        },
        // 초기 페이지 번호를 설정
        initialPageParam: 1,
    });

    // 여러 페이지에서 가져온 데이터를 하나의 배열로 합치기, 기본값은 빈 배열
    const pokemonData = data?.pages.flat() || [];
    // 데이터를 가져오는 중인지 여부를 저장
    const fetching = isFetching;
    // 더 많은 데이터가 있는지 여부를 저장
    const hasMore = !!hasNextPage;

    return { pokemonData, fetching, hasMore, fetchNextPage, isFetchingNextPage };
};

export default useFetchPokemon;
