import BodySvg from "@assets/body.svg";
import RepetitionSvg from "@assets/repetitions.svg";
import SeriesSvg from "@assets/series.svg";
import { Button } from "@components/Button";
import { Loading } from "@components/Loading";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { IAppRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { useMutation } from "@tanstack/react-query";
import { Box, HStack, Heading, Icon, Image, ScrollView, Text, VStack, useToast } from "native-base";
import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { IExercise } from "src/interfaces/IExercise";

export function Exercise() {
  const [exercises, setExercises] = useState({} as IExercise);
  const [loading, setLoading] = useState(true);

  const toast = useToast();
  const { id } = useRoute().params as { id: number };
  const navigation = useNavigation<IAppRoutesProps>();

  useEffect(() => {
    api.get<IExercise>(`exercises/${id}`)
      .then(({ data }) => data && setExercises(data))
      .catch(error => toast.show({
        title: error instanceof Error
          ? error.message
          : "Não foi possível carregar os detalhes do exercício. Tente novamente mais tarde.",
        bg: "red.500", placement: "top"
      }))
      .finally(() => setLoading(false));
  }, []);

  const handleInsertExercise = useMutation(async () => {
    return await api.post("history", { exercise_id: id })
  }, {
    onSuccess() {
      navigation.navigate("history");
      toast.show({
        title: "Parabéns! Exercício resgistrado no seu histórico.",
        bg: "green.700", placement: "top"
      })
    },
    onError(error) {
      toast.show({
        title: error instanceof Error
          ? error.message
          : "Não foi possível registrar o exercício. Tente novamente mais tarde.",
        bg: "red.500", placement: "top"
      });
    },
  })

  return (
    <VStack flex={1}>
      <VStack w="full" h={33} pt={12} px={8} bg="gray.600">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon as={Feather} name="arrow-left" size={6} color="green.500" />
        </TouchableOpacity>
        <HStack alignItems="center" justifyContent="space-between" mt={3} mb={8}>
          <Heading fontSize="lg" flexShrink={1}>
            {exercises.name}
          </Heading>
          <HStack alignItems="center">
            <BodySvg />
            <Text fontSize="md" color="gray.200" textTransform="capitalize">
              {exercises.group}
            </Text>
          </HStack>
        </HStack>
      </VStack>
      {loading ?
        <Loading />
        :
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <VStack p={8}>
            <Box rounded="lg" mb={3} overflow="hidden">
              <Image
                source={{ uri: `${api.defaults.baseURL}/exercise/demo/${exercises.demo}` }}
                alt={exercises.name}
                w="full" h={91}
                resizeMode="cover"
              />
            </Box>
            <Box p={4} pt={5} bg="gray.600" rounded="md">
              <HStack mb={6} alignItems="center" justifyContent="space-around">
                <HStack alignItems="center">
                  <SeriesSvg />
                  <Text fontSize="lg" color="gray.200" ml={2}>
                    {exercises.series > 1
                      ? exercises.series + ' séries'
                      : exercises.series + ' série'
                    }
                  </Text>
                </HStack>
                <HStack alignItems="center">
                  <RepetitionSvg />
                  <Text fontSize="lg" color="gray.200" ml={2}>
                    {exercises.repetitions > 1
                      ? exercises.repetitions + ' repetições'
                      : exercises.repetitions + ' repetição'
                    }
                  </Text>
                </HStack>
              </HStack>
              <Button
                onPress={() => handleInsertExercise.mutateAsync()}
                isLoading={handleInsertExercise.isLoading}
              >
                Marcar como realizado
              </Button>
            </Box>
          </VStack>
        </ScrollView>
      }
    </VStack>
  )
}