import { Entypo } from '@expo/vector-icons';
import { HStack, Heading, Icon, Image, Text, VStack } from "native-base";
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

interface Props extends TouchableOpacityProps {
  imgUri: string;
  title: string;
  subTitle: string;
}
export function ExerciseCard({
  imgUri, title, subTitle,
  ...rest
}: Props) {
  return (
    <TouchableOpacity
      {...rest}
    >
      <HStack alignItems="center" bg="gray.500" p={2} pr={4} rounded="md" mb={3}>
        <Image
          source={{ uri: imgUri }}
          alt={title}
          w={16} h={16}
          rounded="md"
          resizeMode="cover"
        />
        <VStack ml={4} flex={1}>
          <Heading fontSize="lg">
            {title}
          </Heading>
          <Text mt={0.5} color="gray.200" numberOfLines={2}>
            {subTitle}
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