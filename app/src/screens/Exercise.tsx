import BodySvg from "@assets/body.svg";
import RepetitionSvg from "@assets/repetitions.svg";
import SeriesSvg from "@assets/series.svg";
import { Button } from "@components/Button";
import { Feather } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ExerciseProps, IAppRoutesProps } from "@routes/app.routes";
import { Box, HStack, Heading, Icon, Image, ScrollView, Text, VStack } from "native-base";
import { TouchableOpacity } from "react-native";

export function Exercise() {

  const params = useRoute().params as ExerciseProps;
  const navigation = useNavigation<IAppRoutesProps>();

  return (
    <VStack flex={1}>
      <VStack w="full" h={33} pt={12} px={8} bg="gray.600">
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon as={Feather} name="arrow-left" size={6} color="green.500" />
        </TouchableOpacity>
        <HStack alignItems="center" justifyContent="space-between" mt={3} mb={8}>
          <Heading fontSize="lg" flexShrink={1}>
            {params.title}
          </Heading>
          <HStack alignItems="center">
            <BodySvg />
            <Text fontSize="md" color="gray.200">
              {params.category}
            </Text>
          </HStack>
        </HStack>
      </VStack>
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <VStack px={8}>
          <Image
            source={{ uri: params.img }}
            alt={params.title}
            w="full" h={91}
            mt={8} mb={3}
            rounded="lg"
            resizeMode="cover"
          />
          <Box p={4} pt={5} bg="gray.600" rounded="md">
            <HStack mb={6} alignItems="center" justifyContent="space-around">
              <HStack alignItems="center">
                <SeriesSvg />
                <Text fontSize="lg" color="gray.200" ml={2}>
                  {params.sequenceNumber > 1
                    ? params.sequenceNumber + ' séries'
                    : params.sequenceNumber + ' série'
                  }
                </Text>
              </HStack>
              <HStack alignItems="center">
                <RepetitionSvg />
                <Text fontSize="lg" color="gray.200" ml={2}>
                  {params.repetitionNumber > 1
                    ? params.repetitionNumber + ' repetições'
                    : params.repetitionNumber + ' repetição'
                  }
                </Text>
              </HStack>
            </HStack>
            <Button>
              Marcar como realizado
            </Button>
          </Box>
        </VStack>
      </ScrollView>
    </VStack>
  )
}