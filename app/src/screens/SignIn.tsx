import BackgroungImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';
import { Button } from '@components/Button';
import { FormInput } from '@components/forms/FormInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigation } from '@react-navigation/native';
import { IAuthRoutesProps } from '@routes/auth.routes';
import { Center, Image, ScrollView, Text, VStack } from 'native-base';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ISignIn } from 'src/interfaces/ISignIn';
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().required("informe o email").email("Email inválido"),
  password: yup.string().required("informe a senha"),
});

export function SignIn() {

  const navigation = useNavigation<IAuthRoutesProps>();

  const { control, handleSubmit, formState, } = useForm<ISignIn>({
    resolver: yupResolver(schema)
  });

  const onSubmitHandler: SubmitHandler<ISignIn> = (event) => {
    console.log(event)
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
          <Button mt={8} onPress={handleSubmit(onSubmitHandler)}>
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
