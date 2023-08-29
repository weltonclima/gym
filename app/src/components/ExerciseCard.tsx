import { Entypo } from '@expo/vector-icons';
import { api } from '@services/api';
import { HStack, Heading, Icon, Image, Text, VStack } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";
import { IExercise } from 'src/interfaces/IExercise';

interface Props extends TouchableOpacityProps {
  data: IExercise;
}
export function ExerciseCard({
  data, ...rest
}: Props) {

  const sequence = data.series > 1
    ? data.series + ' séries'
    : data.series + ' série';

  const repetition = data.repetitions > 1
    ? data.repetitions + ' repetições'
    : data.repetitions + ' repetição';

  return (
    <TouchableOpacity
      {...rest}
    >
      <HStack alignItems="center" bg="gray.500" p={2} pr={4} rounded="md" mb={3}>
        <Image
          source={{ uri: `${api.defaults.baseURL}/exercise/thumb/${data.thumb}` }}
          alt={data.name}
          w={16} h={16}
          rounded="md"
          resizeMode="cover"
        />
        <VStack ml={4} flex={1}>
          <Heading fontSize="lg">
            {data.name}
          </Heading>
          <Text mt={0.5} color="gray.200" numberOfLines={2}>
            {sequence + ' x ' + repetition}
          </Text>
        </VStack>
        <Icon
          as={Entypo}
          name="chevron-thin-right"
          color="gray.300"
          size={6}
        />
      </HStack>
    </TouchableOpacity>
  )
}