import { FC, useState } from "react";
import {
  Text,
  Box,
  HStack,
  Image,
  Divider,
  Button,
  Flex,
  IconButton,
} from "native-base";
import { MaterialIcons } from "@expo/vector-icons";
import { Beer } from "../../api/types";

interface BeerListItemProps {
  beer: Beer;
  onRemove?: (beerId: number) => any;
}

const TRUNCATED_DESC_LENGTH = 100;

const BeerListItem: FC<BeerListItemProps> = ({ beer, onRemove }) => {
  const [truncated, setTruncated] = useState<boolean>(true);
  const shouldTruncate = beer.description.length > TRUNCATED_DESC_LENGTH;

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
          <Divider my={1} />
          <Text fontSize="xs">
            {shouldTruncate && truncated
              ? beer.description.slice(0, TRUNCATED_DESC_LENGTH) + "..."
              : beer.description}
          </Text>
          <Flex justifyContent="center" alignItems="center">
            {shouldTruncate && truncated && (
              <IconButton
                _icon={{
                  as: MaterialIcons,
                  name: "expand-more",
                }}
                size="sm"
                onPress={() => setTruncated(false)}
              />
            )}
            {shouldTruncate && !truncated && (
              <IconButton
                _icon={{
                  as: MaterialIcons,
                  name: "expand-less",
                }}
                size="sm"
                onPress={() => setTruncated(true)}
              />
            )}
          </Flex>
        </Box>

        {!!onRemove && (
          <Button.Group>
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
          </Button.Group>
        )}
      </HStack>
    </Box>
  );
};

export default BeerListItem;
