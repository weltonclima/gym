import BackgroungImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';
import { Button } from '@components/Button';
import { FormInput } from '@components/forms/FormInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '@hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { IAuthRoutesProps } from '@routes/auth.routes';
import { api } from '@services/api';
import jwtDecode from "jwt-decode";
import { Center, Image, ScrollView, Text, VStack, useToast } from 'native-base';
import { SubmitHandler, useForm } from 'react-hook-form';
import { IFormSignIn, ISignIn } from 'src/interfaces/ISignIn';
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().required("informe o email").email("Email inválido"),
  password: yup.string().required("informe a senha"),
});

export function SignIn() {

  const navigation = useNavigation<IAuthRoutesProps>();
  const { handleSignIn } = useAuth();
  const toast = useToast();

  const { control, handleSubmit, formState } = useForm<IFormSignIn>({
    resolver: yupResolver(schema)
  });

  const onSubmitHandler: SubmitHandler<IFormSignIn> = async (event) => {
    try {
      const { data } = await api.post<ISignIn>("sessions", event)

      if (!!data?.user) {
        handleSignIn(data);
        const decode = jwtDecode<{ exp: number }>(data.token);
        console.log("decode", new Date(decode.exp * 1000), new Date())
      }

    } catch (error) {
      toast.show({
        title: error instanceof Error
          ? error.message
          : "Não foi possível entrar. Tente novamente mais tarde.",
        bg: "red.500", placement: "top"
      });
    }
  }

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      showsVerticalScrollIndicator={false}
    >
      <VStack flex={1} px={10}>
        <Image
          source={BackgroungImg}
          defaultSource={BackgroungImg}
          alt="Logo treino"
          resizeMode="contain"
          position="absolute"
        />
        <Center mt={24} mb={40}>
          <LogoSvg />
          <Text fontSize="sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>
        <Center>
          <Text fontSize="xl" fontWeight="bold">
            Acesse sua conta
          </Text>
          <FormInput
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
            name="email"
            control={control}
          />
          <FormInput
            placeholder="Senha"
            secureTextEntry
            name="password"
            control={control}
            onSubmitEditing={handleSubmit(onSubmitHandler)}
            returnKeyType="send"
          />
          <Button mt={8}
            isLoading={formState.isSubmitting}
            onPress={handleSubmit(onSubmitHandler)}
          >
            Acessar
          </Button>
        </Center>
        <Center mt={24}>
          <Text fontSize="md" mb={3}>
            Ainda não tem acesso?
          </Text>
          <Button
            variant="outline"
            onPress={() => navigation.navigate('signUp')}
          >
            Criar conta
          </Button>
        </Center>
      </VStack>
    </ScrollView>
  )
}
