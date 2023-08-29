import { HStack, Heading, Text, VStack } from "native-base";
import { IHistory } from "src/interfaces/IHistory";

interface Props {
  data: IHistory;
}
export function HistoryCard({ data }: Props) {
  return (
    <HStack py={4} px={5} mt={3}
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
          {data.group}
        </Heading>
        <Text fontSize="lg" lineHeight="xl" numberOfLines={1}>
          {data.name}
        </Text>
      </VStack>
      <Text fontSize="md" color="gray.300">
        {data.hour}
      </Text>
    </HStack>
  )
}