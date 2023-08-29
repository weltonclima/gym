import userPhotoDefault from "@assets/userPhotoDefault.png";
import { Button } from "@components/Button";
import { Header } from "@components/Header";
import { UserPhoto } from "@components/UserPhoto";
import { FormInput } from "@components/forms/FormInput";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "@hooks/useAuth";
import { api } from "@services/api";
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { Center, Heading, ScrollView, Skeleton, VStack, useToast } from "native-base";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TouchableOpacity } from "react-native";
import { INewPassord } from "src/interfaces/INewPassord";
import { IUser } from "src/interfaces/IUser";
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("informe o nome"),

  old_password: yup.string().notRequired()
    .when("password", {
      is: (value: string) => !!value,
      then: schema => schema.required("informe a senha antiga"),
      otherwise: schema => schema.when("confirm_password", {
        is: (value: string) => !!value,
        then: schema => schema.required("informe a senha antiga"),
        otherwise: schema => schema.nullable().transform(value => !!value ? value : null)
      })
    }),

  password: yup.string().when("old_password", {
    is: (value: string) => !!value,
    then: schema => schema.required("informe a nova senha").min(6, "A nova senha deve ter pelo menos seis dígitos"),
    otherwise: schema => schema.nullable().transform(value => !!value ? value : null)
  }),

  confirm_password: yup.string().when("password", {
    is: (value: string) => !!value,
    then: schema => schema.oneOf([yup.ref("password")], "As novas senhas não coincidem"),
    otherwise: schema => schema.nullable().transform(value => !!value ? value : null)
  })

}, [
  ["old_password", "password"],
  ["password", "old_password"],
  ["confirm_password", "password"],
]);

export function Profile() {
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const { user, handleUpdateUser } = useAuth();

  const { control, handleSubmit, formState } = useForm<INewPassord>({
    resolver: yupResolver<any>(schema),
    defaultValues: {
      name: user?.name,
      email: user?.email,

    }
  });

  const onSubmitHandler: SubmitHandler<INewPassord> = async (event) => {
    try {
      const { status } = await api.put("users", {
        name: event.name,
        old_password: event.old_password,
        password: event.password
      });

      if (status >= 200 && status < 400) {
        await handleUpdateUser(!!user ? { ...user, name: event.name } : null);
        toast.show({
          title: "Parabéns! Perfil alterado com sucesso.",
          bg: "green.700", placement: "top"
        });
      }

    } catch (error) {
      toast.show({
        title: error instanceof Error
          ? error.message
          : "Não foi possível alterar o perfil. Tente novamente mais tarde.",
        bg: "red.500", placement: "top"
      });
    }
  }

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
          placement: "top",
          bg: "red.500",
        });

      const fileExtension = photo.assets[0].uri.split(".").pop();

      const form = new FormData();
      form.append("avatar", {
        name: `${user?.name}.${fileExtension}`.toLowerCase(),
        uri: photo.assets[0].uri,
        type: `${photo.assets[0].type}/${fileExtension}`
      } as any);

      const { data, status } = await api.patch<IUser>("users/avatar", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      });
      console.log({ data, status });
      if (status >= 200 && status < 400) {
        await handleUpdateUser(!!user ? { ...user, avatar: data.avatar } : null);
        toast.show({
          title: "Parabéns! Foto do perfil alterada com sucesso.",
          bg: "green.700", placement: "top"
        });
      }


    } catch (error) {
      toast.show({
        title: error instanceof Error
          ? error.message
          : "Não foi possível alterar a foto do perfil. Tente novamente mais tarde.",
        bg: "red.500", placement: "top"
      });
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
              source={!!user?.avatar ? { uri: `${api.defaults.baseURL}/avatar/${user.avatar}` } : userPhotoDefault}
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
          <FormInput
            name="name"
            placeholder="Nome"
            bg="gray.600"
            control={control}
          />
          <FormInput
            name="email"
            placeholder="E-mail"
            bg="gray.500"
            control={control}
            isDisabled
          />
          <Heading fontSize="md" mt={12}>
            Alterar senha
          </Heading>
          <FormInput
            name="old_password"
            placeholder="Senha antiga"
            bg="gray.600"
            secureTextEntry
            control={control}
          />
          <FormInput
            name="password"
            placeholder="Nova senha"
            bg="gray.600"
            secureTextEntry
            control={control}
          />
          <FormInput
            name="confirm_password"
            placeholder="Confirme nova senha"
            bg="gray.600"
            secureTextEntry
            control={control}
            onSubmitEditing={handleSubmit(onSubmitHandler)}
          />
          <Button mt={8} mb={9}
            onPress={handleSubmit(onSubmitHandler)}
            isLoading={formState.isSubmitting}
          >
            Atualizar
          </Button>
        </VStack>
      </ScrollView >

    </VStack>
  )
}