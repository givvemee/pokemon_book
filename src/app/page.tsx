import React from 'react';
import PokemonList from '@/components/(home)/PokemonList';

const HomePage: React.FC = () => {
    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <div className="w-full max-w-screen-2xl lg:px-8 md:max-w-screen-lg md:px-6 sm:max-w-screen-md sm:px-4 mx-auto">
                <PokemonList />
            </div>
        </div>
    );
};

export default HomePage;
