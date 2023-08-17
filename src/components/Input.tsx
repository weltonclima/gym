import { IInputProps, Input as NBInput } from "native-base";

export function Input({
  ...rest
}: IInputProps) {
  return (
    <NBInput
      bg="gray.700"
      borderWidth={0}
      color="white"
      fontSize="md"
      fontFamily="body"
      h={14}
      p={4}
      mt={4}
      placeholderTextColor="gray.300"
      _focus={{
        bg: "gray.700",
        borderWidth: 1,
        borderColor: "green.500"
      }}
      {...rest}
    />
  )
}