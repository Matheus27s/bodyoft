import React, {useState} from 'react';

import {
  Avatar,
  AvatarFallbackText,
  Center,
  EyeIcon,
  EyeOffIcon,
  FormControl,
  Heading,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  SafeAreaView,
  VStack,
} from '@gluestack-ui/themed';
import TouchableOpacity from '../../components/TouchableOpacity';

function Login({navigation}: any) {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleState = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = () => {
    setIsLoading(!isLoading);
    navigation.navigate('Home');
  };

  return (
    <SafeAreaView bgColor="$violet700" flex={1}>
      <FormControl size="md" flex={1}>
        <Center flex={1} marginVertical={12} marginHorizontal={12}>
          <Heading color="$white" size="2xl">
            BodyOft
          </Heading>
          <VStack space="md" w="100%" alignItems="center">
            <VStack alignItems="center" space="md" m={48}>
              <Avatar bgColor="$violet900" size="md" borderRadius="$full">
                <AvatarFallbackText>Matheus S. Santos</AvatarFallbackText>
              </Avatar>
              <Heading color="$white" size="md">
                Matheus S. Santos
              </Heading>
            </VStack>
            <Input
              alignItems="center"
              variant="outline"
              size="md"
              isDisabled={false}
              isInvalid={false}
              isReadOnly={false}
              bg="$violet900">
              <InputField
                placeholder="Senha"
                type={showPassword ? 'text' : 'password'}
                color="$white"
                placeholderTextColor="$white"
              />
              <InputSlot pr="$3" onPress={handleState}>
                <InputIcon
                  as={showPassword ? EyeIcon : EyeOffIcon}
                  color="$$white"
                />
              </InputSlot>
            </Input>
            <TouchableOpacity
              onPress={async () => handleSubmit()}
              title={isLoading ? 'Please wait...' : 'Login'}
            />
          </VStack>
        </Center>
      </FormControl>
    </SafeAreaView>
  );
}

export default Login;
