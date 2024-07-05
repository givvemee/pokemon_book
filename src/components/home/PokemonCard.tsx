import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './PokemonCard.module.css';

interface Pokemon {
    id: number;
    name: string;
    korean_name: string | null;
    sprites: { front_default: string };
}

const PokemonCard: React.FC<{ pokemon: Pokemon }> = ({ pokemon }) => {
    return (
        <Link href={`/detail/${pokemon.id}`} className={styles.pokemonCard}>
            <div className={styles.cardInner}>
                {/* 카드 앞면 */}
                <div className={styles.cardFront}>
                    <div className={`relative ${styles.paperTexture}`}>
                        <Image
                            src={pokemon.sprites.front_default}
                            alt={pokemon.name}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 100vw"
                            className={`${styles.image} rounded-t-lg`}
                            style={{ objectFit: 'contain' }}
                            priority
                        />
                    </div>
                    <div className="absolute bottom-0 left-0 rounded-b-none w-full h-17 bg-custom-blue text-white text-center p-2 rounded-b-lg">
                        <p className="text-2xl font-semibold mt-1">{pokemon.korean_name}</p>
                        <p className="text-base">도감번호: {pokemon.id}</p>
                    </div>
                </div>
                {/* 카드 뒷면 */}
                <div className={styles.cardBack}>
                    <Image
                        src="/card-back.jpg"
                        alt="Pokemon Card Back"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 240px"
                        className={`${styles.image} rounded-lg`}
                        priority
                    />
                </div>
            </div>
        </Link>
    );
};

export default PokemonCard;
