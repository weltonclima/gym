import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { UserPhoto } from "@components/UserPhoto";
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { Center, Heading, ScrollView, Skeleton, VStack, useToast } from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

export function Profile() {
  const [loading, setLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState("https://github.com/weltonclima.png");

  const toast = useToast();

  const handleImage = async () => {
    try {
      setLoading(true);
      const photo = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if (photo.canceled || !photo.assets?.[0]?.uri) return;

      const isValidPhoto = await FileSystem
        .getInfoAsync(photo.assets[0].uri) as FileSystem.FileInfo & { size: number };

      if (!!isValidPhoto.size && (isValidPhoto.size / 1024 / 1024) > 1)
        return toast.show({
          title: "Essa imagem é muito grande. Escolha uma de até 5MB.",
          placement:"top",
          bg:"red.500",
        })

      setUserPhoto(photo.assets?.[0].uri);

    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  }

  return (
    <VStack flex={1}>
      <Header title="Profile" />
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        showsVerticalScrollIndicator={false}
      >
        <Center mt={6}>
          {loading ?
            <Skeleton w={33} h={33}
              rounded="full"
              startColor="gray.400"
              endColor="gray.300"
            />
            :
            <UserPhoto
              source={{ uri: userPhoto }}
              alt="Photo user"
              size={33}
            />
          }
          <TouchableOpacity
            onPress={handleImage}
          >
            <Heading fontSize="md" color="green.500" mt={3}>
              Alterar foto
            </Heading>
          </TouchableOpacity>
        </Center>
        <VStack px={10} mt={5}>
          <Input
            placeholder="Nome"
            bg="gray.600"
            value="Welton Lima"
          />
          <Input
            placeholder="E-mail"
            bg="gray.500"
            value="welton.c.lima@gmail.com"
            isDisabled
          />
          <Heading fontSize="md" mt={12}>
            Alterar senha
          </Heading>
          <Input
            placeholder="Senha antiga"
            bg="gray.600"
            secureTextEntry
          />
          <Input
            placeholder="Nova senha"
            bg="gray.600"
            secureTextEntry
          />
          <Input
            placeholder="Confirme nova senha"
            bg="gray.600"
            secureTextEntry
          />
          <Button mt={8} mb={9}>
            Atualizar
          </Button>
        </VStack>
      </ScrollView >

    </VStack>
  )
}