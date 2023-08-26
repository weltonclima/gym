import BackgroungImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';
import { Button } from '@components/Button';
import { FormInput } from '@components/forms/FormInput';
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from '@react-navigation/native';
import { IAuthRoutesProps } from '@routes/auth.routes';
import { Center, Image, ScrollView, Text, VStack } from 'native-base';
import { SubmitHandler, useForm } from 'react-hook-form';
import { ISignUp } from 'src/interfaces/ISignUp';
import * as yup from "yup";

const schema = yup.object().shape({
  name: yup.string().required("informe o nome"),
  email: yup.string().required("informe o email").email("Email inválido"),
  password: yup.string().required("informe a senha").min(6, "A senha deve ter pelo menos seis dígitos"),
  password_confirm: yup.string().required("Confirme a senha")
    .oneOf([yup.ref("password")], "As senhas não coincidem"),
});

export function SignUp() {

  const navigation = useNavigation<IAuthRoutesProps>();

  const { control, handleSubmit, formState, } = useForm<ISignUp>({
    resolver: yupResolver(schema)
  });

  const onSubmitHandler: SubmitHandler<ISignUp> = (event) => {
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
        <Center mt={24} mb={24}>
          <LogoSvg />
          <Text fontSize="sm">
            Treine sua mente e o seu corpo
          </Text>
        </Center>
        <Center>
          <Text fontSize="xl" fontWeight="bold">
            Crie sua conta
          </Text>
          <FormInput
            placeholder="Nome"
            name="name"
            isRequired
            control={control}
          />
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
          />
          <FormInput
            placeholder="Confirme a Senha"
            secureTextEntry
            name="password_confirm"
            control={control}
            onSubmitEditing={handleSubmit(onSubmitHandler)}
            returnKeyType="send"
          />
          <Button mt={8} onPress={handleSubmit(onSubmitHandler)}>
            Criar e acessar
          </Button>
        </Center>
        <Button
          onPress={() => navigation.navigate('signIn')}
          variant="outline"
          mt={16}
        >
          Voltar para o login
        </Button>
      </VStack>
    </ScrollView>
  )
}
