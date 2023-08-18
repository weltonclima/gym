import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { Input } from "@components/Input";
import { UserPhoto } from "@components/UserPhoto";
import { Center, Heading, ScrollView, Skeleton, VStack } from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";

export function Profile() {
  const [loading, setLoading] = useState(false);

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
              source={{ uri: "https://github.com/weltonclima.png" }}
              alt="Photo user"
              size={33}
            />
          }
          <TouchableOpacity>
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