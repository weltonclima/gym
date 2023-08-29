import { Header } from "@components/Header";
import { HistoryCard } from "@components/HistoryCard";
import { Loading } from "@components/Loading";
import { useFocusEffect } from "@react-navigation/native";
import { api } from "@services/api";
import { Heading, SectionList, Text, VStack, useToast } from "native-base";
import { useCallback, useState } from "react";
import { IHistoryByDay } from "src/interfaces/IHistory";

export function History() {
  const [history, setHistory] = useState<IHistoryByDay[]>([]);
  const [loading, setLoading] = useState(true);

  const toast = useToast();

  useFocusEffect(useCallback(() => {
    api.get<IHistoryByDay[]>("history")
      .then(({ data }) => setHistory(data))
      .catch(error => toast.show({
        title: error instanceof Error
          ? error.message
          : "Não foi possível carregar o histórico dos exercícios. Tente novamente mais tarde.",
        bg: "red.500", placement: "top"
      }))
      .finally(() => setLoading(false));
  }, []))

  return (
    <VStack flex={1}>
      <Header title="Histórico de Exercícios" />
      {loading ?
        <Loading />
        :
        <SectionList
          px={8}
          sections={history}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => <HistoryCard data={item} />}
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
      }
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