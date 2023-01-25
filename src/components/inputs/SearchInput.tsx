import { MaterialIcons } from "@expo/vector-icons";
import { Icon, IInputProps, Input, Spinner } from "native-base";
import { FC } from "react";

interface SearchInputProps extends IInputProps {
  query: string;
  setQuery: (query: string) => void;
  isLoading: boolean;
}

const SearchInput: FC<SearchInputProps> = ({
  query,
  setQuery,
  isLoading,
  ...rest
}) => {
  return (
    <Input
      size="lg"
      value={query}
      onChangeText={setQuery}
      InputLeftElement={
        <Icon
          m="2"
          ml="3"
          size="6"
          color="gray.400"
          as={<MaterialIcons name="search" />}
        />
      }
      InputRightElement={isLoading ? <Spinner mr={2} /> : undefined}
      {...rest}
    />
  );
};

export default SearchInput;
