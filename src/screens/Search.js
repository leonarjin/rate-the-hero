import React from 'react';
import styled from 'styled-components';
import { Alert } from '../common-components/Alert/Alert';
import { Flex, Box } from 'reflexbox';
import { Button } from '../common-components/Button/Button';
import { SearchField } from '../common-components/SearchField/SearchField';
import { HeroCard } from '../components/HeroCard/HeroCard';
import { HeroCardLoader } from '../components/HeroCard/HeroCardLoader';
import { Spaces } from '../shared/DesignTokens';
import axios from 'axios';
import useAxios from 'axios-hooks';
const HeroesGrid = styled(Box)`
	display: grid;
	grid-template-columns: 1fr;
	gap: ${Spaces.ONE_HALF};
	@media (min-width: 1024px) {
		grid-template-columns: 1fr 1fr 1fr 1fr;
		gap: ${Spaces.TWO};
	}
`;
async function searchHero(heroName) {
	const { data } = await axios.get(`/search/${heroName}`, {
		baseURL: `${process.env.REACT_APP_SUPER_HERO_API_BASE_URL}/${process.env.REACT_APP_SUPER_HERO_API_KEY}`,
	});
	return data.results || [];
}
export function Search() {

	const [search, setSearch] = React.useState({
		value: 'captain',
		doSearch: false,
	});
	const [{ data: heroes, loading: isLoadingHeroes }, searchHero] = useAxios(
		`/search/${search.value}`,
		{ manual: true }
	);
	React.useEffect(() => {
		searchHero();
	}, []);
	function handleUpdateSearchValue({ target: { value } }) {
		setSearch((prevValue) => ({ ...prevValue, value }));
	}
	function handleSearch() {
		setSearch((prevValue) => ({ ...prevValue, doSearch: true }));
	}
	return (
		<>
			<Flex
				width={['100%', '600px']}
				mx={[Spaces.None, 'auto']}
				mt={[Spaces.THREE, Spaces.FIVE]}
				px={[Spaces.ONE, Spaces.NONE]}
				mb={[Spaces.TWO, Spaces.FOUR]}
			>
				<Box flexGrow="1">
					<SearchField
						placeholder="Digite um nome de herói ou heroína"
						onKeyUp={handleUpdateSearchValue}
					/>
				</Box>
				<Box ml={Spaces.TWO}>
					<Button onClick={handleSearch}>Buscar</Button>
				</Box>
			</Flex>
			{!isLoadingHeroes && heroes && heroes.error ? (
				<Box
					px={[Spaces.ONE, Spaces.TWO]}
					pb={[Spaces.ONE, Spaces.TWO]}
				>
					<Alert type="info">
						Nenhum registro de herói ou heroína foi encontrado.
					</Alert>
				</Box>
			) : (
				<HeroesGrid
					px={[Spaces.ONE, Spaces.TWO]}
					pb={[Spaces.ONE, Spaces.TWO]}
				>
					{isLoadingHeroes && (
						<>
							<HeroCardLoader />
							<HeroCardLoader />
							<HeroCardLoader />
							<HeroCardLoader />
						</>
					)}
					{!isLoadingHeroes && heroes && heroes.results.map((hero) => (
						<HeroCard
							key={hero.id}
							id={hero.id}
							secretIdentity={hero.biography['full-name']}
							name={hero.name}
							picture={hero.image.url}
							universe={hero.biography.publisher}
						/>
					))}
				</HeroesGrid>
			)}
		</>
	);
}