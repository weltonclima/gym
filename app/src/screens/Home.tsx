import userPhotoDefault from "@assets/userPhotoDefault.png";
import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { UserPhoto } from "@components/UserPhoto";
import { MaterialIcons } from '@expo/vector-icons';
import { useAuth } from "@hooks/useAuth";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { IAppRoutesProps } from "@routes/app.routes";
import { api } from "@services/api";
import { FlatList, HStack, Heading, Icon, Text, VStack, useToast } from "native-base";
import { useCallback, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { IExercise } from "src/interfaces/IExercise";

export function Home() {
  const [groupSelected, setGroupSelected] = useState("antebraço");
  const [groups, setGroups] = useState<string[]>([]);
  const [exercises, setExercises] = useState<IExercise[]>([]);

  const toast = useToast();
  const navigation = useNavigation<IAppRoutesProps>();
  const { user, handleSignOut } = useAuth();

  useEffect(() => {
    api.get<string[]>("groups")
      .then(({ data }) => data && setGroups(data))
      .catch(error => toast.show({
        title: error instanceof Error
          ? error.message
          : "Não foi possível carregar os grupos. Tente novamente mais tarde.",
        bg: "red.500", placement: "top"
      }))
  }, []);

  useFocusEffect(useCallback(() => {
    api.get<IExercise[]>(`exercises/bygroup/${groupSelected}`)
      .then(({ data }) => setExercises(data))
      .catch(error => toast.show({
        title: error instanceof Error
          ? error.message
          : "Não foi possível carregar os exercícios. Tente novamente mais tarde.",
        bg: "red.500", placement: "top"
      }))
  }, [groupSelected]));

  return (
    <VStack flex={1}>
      <HStack bg="gray.600" pt={16} pb={5} px={8} alignItems="center">
        <HStack flex={1} alignItems="center">
          <UserPhoto
            source={!!user?.avatar ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` } : userPhotoDefault}
            alt="Photo user"
            size={16}
          />
          <VStack ml={4}>
            <Text fontSize="md">
              Olá,
            </Text>
            <Text fontFamily="heading" fontSize="md" >
              {user?.name}
            </Text>
          </VStack>
        </HStack>
        <TouchableOpacity onPress={() => handleSignOut()}>
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
          renderItem={({ item }) => (
            <ExerciseCard
              data={item}
              onPress={() => navigation.navigate('exercise', { id: item.id })}
            />
          )}
          showsVerticalScrollIndicator={false}
          _contentContainerStyle={{ paddingBottom: 20 }}
        />
      </VStack>
    </VStack>
  )
}