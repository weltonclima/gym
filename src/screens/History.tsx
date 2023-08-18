import { Header } from "@components/Header";
import { HistoryCard } from "@components/HistoryCard";
import { Heading, SectionList, Text, VStack } from "native-base";

export function History() {
  return (
    <VStack flex={1}>
      <Header title="Histórico de Exercícios" />
      <SectionList
        px={8}
        sections={histories}
        keyExtractor={item => item.title + item.subTitle}
        renderItem={({ item }) => (
          <HistoryCard
            title={item.title}
            subTitle={item.subTitle}
            time={item.time}
          />
        )}
        renderSectionHeader={({ section }) => (
          <Heading fontSize="md" mt={10}>
            {section.title}
          </Heading>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          { paddingBottom: 40, },
          !histories.length && { flex: 1, justifyContent: 'center' }
        ]}
        ListEmptyComponent={() => (
          <Text textAlign="center">
            Não há exercícios registrados ainda.
          </Text>
        )}
      />
    </VStack>
  )
}

const histories = [
  {
    id: 1,
    title: "26.08.22",
    data: [
      {
        title: "costas",
        subTitle: "Puxada frontal",
        time: "08:56"
      },
      {
        title: "costas",
        subTitle: "Remada unilateral",
        time: "08:32"
      }
    ]
  },
  {
    id: 2,
    title: "26.08.22",
    data: [
      {
        title: "costas",
        subTitle: "Puxada frontal",
        time: "11:24"
      },
      {
        title: "costas",
        subTitle: "Remada unilateral",
        time: "12:00"
      }
    ]
  },
  {
    id: 3,
    title: "27.08.22",
    data: [
      {
        title: "costas",
        subTitle: "Puxada frontal",
        time: "13:00"
      },
      {
        title: "costas",
        subTitle: "Remada unilateral",
        time: "14:00"
      }
    ]
  }
]