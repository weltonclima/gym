import { Center, Heading, ICenterProps } from "native-base";

interface Props extends ICenterProps {
  title: string;
}
export function Header({ title, ...rest }: Props) {
  return (
    <Center
      w="full" h={32}
      pt={16}
      bg="gray.500"
      {...rest}
    >
      <Heading fontSize="xl">
        {title}
      </Heading>
    </Center>
  )
}