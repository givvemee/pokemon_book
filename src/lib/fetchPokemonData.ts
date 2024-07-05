// 디테일 페이지에서 포켓몬 정보를 불러오는 함수
export const fetchPokemonData = async (id: string) => {
    try {
        const response = await fetch(`${process.env.BASE_URL}/api/pokemons/${id}`);
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
