import { FC } from "react";
import {
  Text,
  Box,
  HStack,
  Image,
  Divider,
  Button,
  IconButton,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { BeerDetailed } from "../../api/types";

interface BeerApiItemProps {
  beer: BeerDetailed;
  isAdded: boolean;
  onRemove: (beerId: number) => void;
  onAdd: (beerId: number) => void;
}

const BeerApiItem: FC<BeerApiItemProps> = ({
  beer,
  isAdded,
  onRemove,
  onAdd,
}) => {
  return (
    <Box
      pr={4}
      py={4}
      rounded="lg"
      borderWidth="1"
      _dark={{
        borderColor: "coolGray.600",
        backgroundColor: "gray.700",
      }}
      _light={{
        borderColor: "coolGray.200",
        backgroundColor: "gray.50",
      }}
    >
      <HStack space={2} alignItems="center">
        <Box>
          <Image
            source={{ uri: beer.image || undefined }}
            size="sm"
            resizeMode="contain"
            alt="Beer"
          />
        </Box>

        <Box flex={1} pr={2}>
          <Text fontSize="lg" fontWeight="600">
            {beer.name}
          </Text>
          <Divider />
          <Text fontSize="md" fontWeight="600">
            {beer.brewery.name}
          </Text>
          {!!beer.style && <Text fontSize="xs">{beer.style.name}</Text>}
          <HStack space={2}>
            <Text fontSize="md">{beer.percentage}%</Text>
            {!!beer.IBU && <Text fontSize="md">{beer.IBU} IBU</Text>}
            {!!beer.extract && <Text fontSize="md">{beer.extract}° BLG</Text>}
            <Text fontSize="md">{beer.volume_ml}ml</Text>
          </HStack>
        </Box>

        <Button.Group>
          {isAdded ? (
            <IconButton
              _icon={{
                as: MaterialIcons,
                name: "delete",
              }}
              size="sm"
              variant="solid"
              colorScheme="red"
              onPress={() => onRemove(beer.id)}
            />
          ) : (
            <IconButton
              _icon={{
                as: MaterialIcons,
                name: "add",
              }}
              size="sm"
              variant="solid"
              colorScheme="green"
              onPress={() => onAdd(beer.id)}
            />
          )}
        </Button.Group>
      </HStack>
    </Box>
  );
};

export default BeerApiItem;
