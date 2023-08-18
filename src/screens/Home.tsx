import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { UserPhoto } from "@components/UserPhoto";
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { IAppRoutesProps } from "@routes/app.routes";
import { FlatList, HStack, Heading, Icon, Text, VStack } from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

export function Home() {
  const [groupSelected, setGroupSelected] = useState("costas")

  const navigation = useNavigation<IAppRoutesProps>();

  return (
    <VStack flex={1}>
      <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
        <HStack flex={1} alignItems="center">
          <UserPhoto
            source={{ uri: "https://github.com/weltonclima.png" }}
            alt="Photo user"
            size={16}
          />
          <VStack ml={4}>
            <Text fontSize="md">
              Olá,
            </Text>
            <Text fontFamily="heading" fontSize="md" >
              Welton Lima
            </Text>
          </VStack>
        </HStack>
        <TouchableOpacity>
          <Icon
            as={MaterialIcons}
            name="logout"
            color="gray.200"
            size={7}
          />
        </TouchableOpacity>
      </HStack>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={groups}
        keyExtractor={item => item}
        renderItem={({ item }) => (
          <Group
            name={item}
            isActive={item === groupSelected}
            onPress={() => setGroupSelected(item)}
          />
        )}
        _contentContainerStyle={{ px: 8 }}
        my={10}
        maxH={10}
        minH={10}
      />
      <VStack flex={1} px={8}>
        <HStack justifyContent="space-between" mb={3}>
          <Heading fontSize="md">
            Exercícios
          </Heading>
          <Text fontSize="sm">
            {exercises.length}
          </Text>
        </HStack>
        <FlatList
          data={exercises}
          keyExtractor={item => `${item.id}`}
          renderItem={({ item }) => {
            const sequence = item.sequenceNumber > 1
              ? item.sequenceNumber + ' séries'
              : item.sequenceNumber + ' série';

            const repetition = item.repetitionNumber > 1
              ? item.repetitionNumber + ' repetições'
              : item.repetitionNumber + ' repetição';

            const subTitle = sequence + ' x ' + repetition;

            return (
              <ExerciseCard
                imgUri={item.img}
                title={item.title}
                subTitle={subTitle}
                onPress={() => navigation.navigate('exercise', {
                  ...item,
                  subTitle: subTitle,
                  category: groupSelected
                })}
              />
            )
          }}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />

      </VStack>

    </VStack>
  )
}


const groups = ['costas', 'bíceps', 'tríceps', 'ombro']
const exercises = [
  {
    id: 1,
    img: "https://www.fiqueinforma.com/wp-content/uploads/2008/12/puxadas.jpg",
    title: "Puxada frontal",
    sequenceNumber: 4,
    repetitionNumber: 11
  }, {
    id: 2,
    img: "https://pratiquefitness.com.br/blog/wp-content/uploads/2023/07/Remada-curvada-aprenda-a-fazer-e-conheca-os-beneficios-2.jpg",
    title: "Remada curvada",
    sequenceNumber: 2,
    repetitionNumber: 15
  }, {
    id: 3,
    img: "https://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg",
    title: "Remada unilateral",
    sequenceNumber: 3,
    repetitionNumber: 13
  }, {
    id: 4,
    img: "https://www.espaco360med.com.br/images/blog/main/large/10-fatos-que-farao-voce-incluir-o-levantamento-terra-no-seu-treino-.jpg",
    title: "Levantamento terra",
    sequenceNumber: 1,
    repetitionNumber: 12
  }
]
