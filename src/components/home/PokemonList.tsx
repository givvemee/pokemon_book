'use client';

import React, { useRef, useCallback } from 'react';
import useFetchPokemon from '../../hooks/useFetchPokemon';
import PokemonCard from './PokemonCard';
import Image from 'next/image';

const PokemonList: React.FC = () => {
    // 포켓몬 데이터를 가져오는 커스텀 훅 사용
    const { pokemonData, fetching, hasMore, fetchNextPage, isFetchingNextPage } = useFetchPokemon();

    // IntersectionObserver를 참조하기 위한 useRef 사용
    const observer = useRef<IntersectionObserver | null>(null);

    // 마지막 포켓몬 카드 엘리먼트를 참조하기 위한 콜백 함수
    const lastPokemonElementRef = useCallback(
        (node: HTMLLIElement) => {
            if (fetching) return;
            if (observer.current) observer.current.disconnect();

            observer.current = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting && hasMore) {
                    fetchNextPage(); // 스크롤 시 다음 페이지 데이터를 불러옴
                }
            });

            if (node) observer.current.observe(node);
        },
        [fetching, hasMore, fetchNextPage]
    );

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8 text-center">포켓몬 도감</h1>
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-items-center">
                {pokemonData.map((pokemon, index) => {
                    // 마지막 포켓몬 카드에 lastPokemonElementRef를 적용
                    if (pokemonData.length === index + 1) {
                        return (
                            <li
                                ref={lastPokemonElementRef}
                                key={`pokemon-${pokemon.id}-${index}`}
                                className="w-[240px] h-[336px] flex justify-center"
                            >
                                <PokemonCard pokemon={pokemon} />
                            </li>
                        );
                    } else {
                        return (
                            <li
                                key={`pokemon-${pokemon.id}-${index}`}
                                className="w-[240px] h-[336px] flex justify-center"
                            >
                                <PokemonCard pokemon={pokemon} />
                            </li>
                        );
                    }
                })}
            </ul>
            {(fetching || isFetchingNextPage) && (
                <div className="flex flex-col justify-center items-center h-20 mt-10">
                    <Image
                        src="/pokemon-ball.png"
                        alt="포켓몬 도감 불러오는중"
                        width={120}
                        height={90}
                        className="animate-shake-once"
                    />
                    <p className="text-2xl font-bold mt-3">포켓몬 찾는중...</p>
                </div>
            )}
        </div>
    );
};

export default PokemonList;
