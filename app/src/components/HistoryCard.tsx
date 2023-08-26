import { HStack, Heading, Text, VStack } from "native-base";

interface Props {
  title: string;
  subTitle: string;
  time: string;
}
export function HistoryCard({ title, subTitle, time }: Props) {
  return (
    <HStack key={title + time} py={4} px={5} mt={3}
      bg="gray.600"
      rounded="md"
      alignItems="center"
    >
      <VStack flex={1}>
        <Heading
          color="white"
          textTransform="capitalize"
          fontSize="md"
          lineHeight="lg"
          numberOfLines={1}
        >
          {title}
        </Heading>
        <Text fontSize="lg" lineHeight="xl" numberOfLines={1}>
          {subTitle}
        </Text>
      </VStack>
      <Text fontSize="md" color="gray.300">
        {time}
      </Text>
    </HStack>
  )
}