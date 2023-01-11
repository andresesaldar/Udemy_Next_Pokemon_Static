import { Card, Row, Text } from "@nextui-org/react";
import { FC } from "react";
import { Pokemon } from "../models/pokemon";
import { useRouter } from "next/router";

type PokemonCardProps = {
	pokemon: Pokemon;
};

const PokemonCard: FC<PokemonCardProps> = ({
	pokemon: { id, image, name },
}) => {
	const router = useRouter();
	const goToPokemonDetail = (): Promise<boolean> =>
		router.push(`/name/${name}`);
	return (
		<Card
			isPressable
			isHoverable
			variant="bordered"
			onClick={goToPokemonDetail}
		>
			<Card.Body>
				<Card.Image src={image} width="100%" height={140} alt={name} />
			</Card.Body>
			<Card.Footer css={{ justifyItems: "flex-start" }}>
				<Row wrap="wrap" justify="space-between" align="center">
					<Text b transform="capitalize">
						{name}
					</Text>
					<Text
						css={{
							color: "$accents7",
							fontSize: "$sm",
							fontWeight: "$semibold",
						}}
					>
						#{id}
					</Text>
				</Row>
			</Card.Footer>
		</Card>
	);
};

export default PokemonCard;
