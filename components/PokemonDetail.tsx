import {
	Badge,
	Button,
	Col,
	Grid,
	Image,
	Row,
	Spacer,
	Table,
	Text,
} from "@nextui-org/react";
import { FC, useEffect, useState } from "react";
import { PokemonDetail, Sprites, Stat } from "../models/pokemon";
import { isFavorite, toggleFavorite } from "../integration/favorites";
import confetti from "canvas-confetti";

type PokemonStatsTableProps = {
	stats: Stat[];
	name: string;
};

const PokemonStatsTable: FC<PokemonStatsTableProps> = ({ name, stats }) => (
	<Table
		aria-label={`${name} pokemon stats`}
		css={{ p: "0" }}
		bordered
		shadow={false}
		striped
	>
		<Table.Header>
			{[
				<Table.Column
					key={0}
					css={{
						textAlign: "center",
						textTransform: "capitalize",
					}}
				>
					Stat Info
				</Table.Column>,
				...stats.map((stat, index) => (
					<Table.Column
						key={index + 1}
						css={{
							textAlign: "center",
							textTransform: "capitalize",
						}}
					>
						{stat.stat.name}
					</Table.Column>
				)),
			]}
		</Table.Header>
		<Table.Body>
			<Table.Row key="1">
				{[
					<Table.Cell css={{ textAlign: "center" }} key={0}>
						<Text b>Base Stat</Text>
					</Table.Cell>,
					...stats.map((stat, index) => (
						<Table.Cell
							key={index + 1}
							css={{ textAlign: "center" }}
						>
							{stat.base_stat}
						</Table.Cell>
					)),
				]}
			</Table.Row>
			<Table.Row key="2">
				{[
					<Table.Cell css={{ textAlign: "center" }} key={0}>
						<Text b>Effort</Text>
					</Table.Cell>,
					...stats.map((stat, index) => (
						<Table.Cell
							key={index + 1}
							css={{ textAlign: "center" }}
						>
							{stat.effort}
						</Table.Cell>
					)),
				]}
			</Table.Row>
		</Table.Body>
	</Table>
);

type PokemonImagesProps = {
	name: string;
	sprites: Sprites;
};

const PokemonImages: FC<PokemonImagesProps> = ({ name, sprites }) => (
	<>
		<Image
			src={
				sprites.other?.dream_world.front_default ||
				sprites.front_default
			}
			alt={name}
		/>
		<Grid.Container>
			<Grid xs={6}>
				<Image src={sprites.front_default} alt={name} />
			</Grid>
			<Grid xs={6}>
				<Image src={sprites.back_default} alt={name} />
			</Grid>
			<Grid xs={6}>
				<Image src={sprites.front_shiny} alt={name} />
			</Grid>
			<Grid xs={6}>
				<Image src={sprites.back_shiny} alt={name} />
			</Grid>
		</Grid.Container>
	</>
);

type PokemonDetailProps = {
	pokemon: PokemonDetail;
};

const PokemonDetail: FC<PokemonDetailProps> = ({
	pokemon: {
		id,
		name,
		sprites,
		height,
		stats,
		abilities,
		weight,
		types,
		base_experience,
	},
}) => {
	const [favorite, setFavorite] = useState(false);
	const onToggleFavorite = (): void => {
		if (!favorite)
			confetti({
				angle: 180,
				origin: { x: 1.5, y: 0.2 },
				particleCount: 100,
			});
		setFavorite(
			toggleFavorite({
				id,
				image: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`,
				name: name,
				url: `https://pokeapi.co/api/v2/pokemon/${id}`,
			}),
		);
	};
	useEffect(() => setFavorite(isFavorite(id)), [id]);
	return (
		<Grid.Container gap={2}>
			<Grid xs={4} md={3} css={{ flexDirection: "column" }}>
				<PokemonImages sprites={sprites} name={name} />
			</Grid>
			<Grid xs={8} md={9} css={{ flexDirection: "column" }}>
				<Row align="center" justify="space-between">
					<Col css={{ marginBottom: "$8" }}>
						<Row align="center">
							<Text
								h2
								transform="capitalize"
								css={{ marginBottom: "$0" }}
							>
								{name}
							</Text>
							<Text
								b
								css={{ color: "$accents7", marginLeft: "$5" }}
							>
								#{id}
							</Text>
						</Row>
						{types.map(({ type }, index) => (
							<Badge
								color="primary"
								key={index}
								variant="flat"
								isSquared
								size="sm"
								css={{
									textTransform: "capitalize",
								}}
							>
								{type.name}
							</Badge>
						))}
					</Col>
					<Button
						size="sm"
						color="gradient"
						bordered={!favorite}
						onPress={onToggleFavorite}
					>
						{favorite ? "Favorite" : "Save as Favorite"}
					</Button>
				</Row>
				<Text span>
					<Text b>Height: </Text>
					{height}
				</Text>
				<Text span>
					<Text b>Weight: </Text>
					{weight}
				</Text>
				<Text span>
					<Text b>XP Base: </Text>
					{base_experience}
				</Text>
				<Spacer y={0.5} />
				<Text b>Stats:</Text>
				<PokemonStatsTable stats={stats} name={name} />
				<Spacer y={0.5} />
				<Text b>Abilities:</Text>
				<Grid.Container>
					{abilities.map((ability, index) => (
						<Grid key={index}>
							<Badge
								variant="flat"
								isSquared
								css={{ textTransform: "capitalize" }}
							>
								{ability.ability.name}
							</Badge>
						</Grid>
					))}
				</Grid.Container>
			</Grid>
		</Grid.Container>
	);
};

export default PokemonDetail;
