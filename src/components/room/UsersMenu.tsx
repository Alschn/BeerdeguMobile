import { Avatar, Icon, Menu, Pressable, View, Text, Badge } from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { User } from "../../api/types";
import { FC } from "react";

interface UsersMenuProps {
  users: User[];
}

const UsersMenu: FC<UsersMenuProps> = ({ users }) => {
  return (
    <Menu
      trigger={(triggerProps) => (
        <Pressable
          accessibilityLabel="More room options menu"
          {...triggerProps}
        >
          <View
            position="absolute"
            top={-6}
            right={-7}
            bgColor="blue.500"
            borderRadius={50}
            w={users.length >= 10 ? 4 : 3}
            h={3}
            alignItems="center"
            justifyContent="center"
          >
            <Text
              fontSize="xs"
              fontWeight="bold"
              bgColor="red.100"
              color="white"
              position="absolute"
            >
              {users.length}
            </Text>
          </View>

          <Icon as={<Ionicons name="person" />} />
        </Pressable>
      )}
      mx={0}
    >
      <Menu.Group title={`Users (${users.length}):`}>
        {users.map((user) => (
          <Menu.Item
            key={`user-menu-item-${user.id}`}
            isDisabled
            p={0}
            w={150}
            mb={2}
          >
            <View flexDir="row" textAlign="center" alignItems="center">
              <Avatar size="sm" mr={2}>
                {user.username.slice(0, 1)}
              </Avatar>
              <Text fontSize="sm">{user.username}</Text>
            </View>
          </Menu.Item>
        ))}
      </Menu.Group>
    </Menu>
  );
};

export default UsersMenu;
