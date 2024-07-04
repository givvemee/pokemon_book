import React from 'react';
import { notFound } from 'next/navigation';
import PokemonDetail from '@/components/(detail)/PokemonDetail';
import type { Metadata } from 'next';

// 포켓몬 정보를 불러오는 함수
const fetchPokemonData = async (id: string) => {
    try {
        const response = await fetch(`https://pokemon-book-lyart.vercel.app/api/pokemons/${id}`);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.status}`);
        }
        const pokemon = await response.json();
        return pokemon;
    } catch (error) {
        console.error('Error fetching Pokemon data:', error);
        return null;
    }
};

// 동적 메타데이터 생성 함수
export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    const { id } = params; // URL에서 포켓몬 id 가져옴
    const pokemon = await fetchPokemonData(id); // 포켓몬 데이터 가져옴

    if (!pokemon) {
        return {
            // 포켓몬 정보를 찾을 수 없는 경우의 메타데이터
            title: '포켓몬 정보를 찾을 수 없습니다',
            description: '해당 포켓몬 정보를 찾을 수 없습니다.',
            keywords: ['포켓몬', 'Pokemon', '도감', 'react', 'nextjs', '프론트앤드개발자'],
            authors: [{ name: '이보아' }],
        };
    }

    return {
        // 포켓몬 정보를 찾은 경우의 메타데이터
        title: `포켓몬 도감 - ${pokemon.korean_name}`,
        description: `${pokemon.korean_name} 포켓몬의 상세 정보가 담긴 상세페이지입니다.`,
        keywords: ['포켓몬', 'Pokemon', '도감', 'react', 'nextjs', '프론트앤드개발자'],
        authors: [{ name: '이보아' }],
    };
}

interface PokemonDetailPageProps {
    params: {
        id: string;
    };
}

const PokemonDetailPage: React.FC<PokemonDetailPageProps> = async ({ params }) => {
    const { id } = params; // URL에서 포켓몬 id 가져옴
    const pokemon = await fetchPokemonData(id); // 포켓몬 데이터 가져옴

    if (!pokemon) {
        notFound(); // 포켓몬이 없으면 404 페이지로 이동
    }
    // 포켓몬 데이터를 PokemonDetail 컴포넌트에 전달하여 렌더링
    return <PokemonDetail pokemon={pokemon} />;
};

export default PokemonDetailPage;
