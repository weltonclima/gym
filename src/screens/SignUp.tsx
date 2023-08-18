import BackgroungImg from '@assets/background.png';
import LogoSvg from '@assets/logo.svg';
import { Button } from '@components/Button';
import { Input } from '@components/Input';
import { useNavigation } from '@react-navigation/native';
import { IAuthRoutesProps } from '@routes/auth.routes';
import { Center, Image, ScrollView, Text, VStack } from 'native-base';

export function SignUp() {

  const navigation = useNavigation<IAuthRoutesProps>();

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
          <Input
            placeholder="Nome"
          />
          <Input
            placeholder="E-mail"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <Input
            placeholder="Senha"
            secureTextEntry
          />
          <Input
            placeholder="Confirme a Senha"
            secureTextEntry
          />
          <Button mt={8}>
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
