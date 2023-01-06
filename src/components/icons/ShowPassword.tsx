import { MaterialIcons } from "@expo/vector-icons";
import { IconProps } from "@expo/vector-icons/build/createIconSet";
import { Icon } from "native-base";
import { FC } from "react";

interface ShowPasswordIconProps
  extends Omit<IconProps<string>, "color" | "children"> {
  show: boolean;
  variant?: unknown;
  colorScheme: any;
}

const ShowPasswordIcon: FC<ShowPasswordIconProps> = ({ show, ...rest }) => {
  return (
    <Icon
      as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />}
      size={5}
      mr="2"
      color="muted.400"
      {...rest}
    />
  );
};

export default ShowPasswordIcon;
