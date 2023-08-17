import { IButtonProps, Button as NBButton, Text } from "native-base";

interface Props extends IButtonProps {
  children: string;
  variant?: "solid" | "outline";
}
export function Button({
  children, variant = "solid", ...rest
}: Props) {
  return (
    <NBButton
      width="full"
      height={14}
      bg={variant == "outline" ? "transparent" : "green.700"}
      borderWidth={variant == "outline" ? 1 : 0}
      borderColor="green.500"
      rounded="sm"
      _pressed={{
        bg: variant == "outline" ? "gray.500" : "green.500"
      }}
      {...rest}
    >
      <Text
        color={variant == "outline" ? "green.500" : "white"}
        fontSize="md"
        fontFamily="heading"
      >
        {children}
      </Text>
    </NBButton>
  )
}