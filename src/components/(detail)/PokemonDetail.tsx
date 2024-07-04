import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NameWithKorean {
    name: string;
    korean_name: string;
}

interface Pokemon {
    id: number;
    name: string;
    korean_name: string;
    height: number;
    weight: number;
    sprites: {
        front_default: string;
    };
    types: { type: NameWithKorean }[];
    abilities: { ability: NameWithKorean }[];
    moves: { move: NameWithKorean }[];
}

interface PokemonDetailProps {
    pokemon: Pokemon;
}

// 포켓몬 상세 페이지 컴포넌트 정의
const PokemonDetail: React.FC<PokemonDetailProps> = ({ pokemon }) => {
    return (
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded-lg shadow-lg relative mt-0 mb-0 sm:mt-10 sm:mb-10">
            {/* 뒤로가기 버튼 */}
            <div>
                <Link href={`/`}>
                    <Image
                        src="/back-arrow.png"
                        alt="뒤로가기"
                        width={40}
                        height={40}
                        className="absolute top-6 right-6 mx-auto"
                    />
                </Link>
            </div>

            {/* 타이틀 */}
            <header className="text-center mb-7">
                <h1 className="text-4xl font-bold mb-3 mt-3">{pokemon.korean_name}</h1>
                <p className="text-xl">No. {pokemon.id}</p>
            </header>

            {/* 캐릭터 이미지 및 정보 섹션 */}
            <section className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                    <article className="bg-white p-6 pt-0 rounded-lg shadow mb-6">
                        <Image
                            src={pokemon.sprites.front_default}
                            alt={pokemon.name}
                            width={165}
                            height={165}
                            className="mx-auto"
                        />
                        <div className="text-center mt-4">
                            <p className="font-semibold">{pokemon.korean_name}</p>
                            <p>키: {pokemon.height / 10} m</p>
                            <p>무게: {pokemon.weight / 10} kg</p>
                        </div>
                    </article>
                </div>

                {/* 캐릭터 타입 및 특성 섹션 */}
                <div className="md:w-1/2">
                    <section className="bg-white p-6 rounded-lg shadow mb-6">
                        <h2 className="text-2xl font-semibold mb-4">타입</h2>
                        <div className="flex flex-wrap gap-2">
                            {pokemon.types.map((type) => (
                                <span key={type.type.name} className="px-3 py-1 bg-gray-200 rounded-full text-sm">
                                    {type.type.korean_name}
                                </span>
                            ))}
                        </div>
                    </section>

                    <section className="bg-white p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-semibold mb-4">특성</h2>
                        <div className="flex flex-wrap gap-2">
                            {pokemon.abilities.map((ability) => (
                                <span
                                    key={ability.ability.name}
                                    className="px-3 py-1 bg-green-200 rounded-full text-sm"
                                >
                                    {ability.ability.korean_name}
                                </span>
                            ))}
                        </div>
                    </section>
                </div>
            </section>

            {/* 캐릭터 기술 섹션 */}
            <section className="mt-8 bg-white p-6 rounded-lg shadow">
                <h2 className="text-2xl font-semibold mb-4">기술</h2>
                <div className="flex flex-wrap gap-2">
                    {pokemon.moves.map((move) => (
                        <span key={move.move.name} className="px-3 py-1 bg-blue-200 rounded-full text-sm">
                            {move.move.korean_name}
                        </span>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default PokemonDetail;
