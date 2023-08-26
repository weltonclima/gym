import { IPressableProps, Pressable, Text } from "native-base";

interface Props extends IPressableProps {
  name: string;
  isActive: boolean;
}
export function Group({ name, isActive, ...rest }: Props) {
  return (
    <Pressable
      w={24} h={10}
      alignItems="center"
      justifyContent="center"
      bg="gray.600"
      mr={3}
      p={3}
      rounded="md"
      overflow="hidden"
      isPressed={isActive}
      _pressed={{
        borderWidth: 1,
        borderColor: "green.500",
      }}
      {...rest}
    >
      <Text
        color={isActive ? "green.500" : "gray.200"}
        textTransform="uppercase"
        fontSize="xs"
        fontWeight="bold"
      >
        {name}
      </Text>
    </Pressable>
  )
}