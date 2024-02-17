import React, {useEffect, useState} from 'react';
import {
  Box,
  Button,
  ButtonIcon,
  Center,
  Heading,
  Icon,
  Image,
  SafeAreaView,
  Select,
  SelectIcon,
  SelectInput,
  SelectTrigger,
  SettingsIcon,
  VStack,
  CalendarDaysIcon,
  SelectPortal,
  SelectBackdrop,
  SelectContent,
  SelectDragIndicatorWrapper,
  SelectDragIndicator,
  SelectItem,
} from '@gluestack-ui/themed';

import api from '../../services/api';

import {IStudent} from '../../interfaces';
import {dateMonthAndYear} from '../../utils/dateFormat';
import TouchableOpacity from '../../components/TouchableOpacity';

function Home({navigation}: any) {
  const [student, setStudent] = useState<IStudent>();
  const studentID = '937a904a-7141-4e9b-abcb-93cd4fb13856';

  useEffect(() => {
    api
      .get(`/students/${studentID}`)
      .then(function (response) {
        setStudent(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [studentID]);

  return (
    <SafeAreaView bgColor="$violet700" flex={1} paddingHorizontal={12}>
      <Button
        h={46}
        bg="$violet700"
        p="$3"
        onPress={() => navigation.navigate('Perfil', student)}>
        <ButtonIcon as={SettingsIcon} size="xl" />
      </Button>
      <Select>
        <SelectTrigger bg="$emerald400" size="xl">
          <SelectInput
            placeholder="Escolha o Mês"
            fontWeight="$bold"
            fontSize="$sm"
          />
          <SelectIcon mr="$3">
            <Icon as={CalendarDaysIcon} size="xl" color="$white" />
          </SelectIcon>
        </SelectTrigger>
        <SelectPortal>
          <SelectBackdrop />
          <SelectContent bg="$emerald400">
            <SelectDragIndicatorWrapper>
              <SelectDragIndicator bg="$white" />
            </SelectDragIndicatorWrapper>
            <SelectItem
              label={`${dateMonthAndYear('2023-07-03')} a ${dateMonthAndYear(
                '2023-09-03',
              )}`}
              value="ux"
            />
            <SelectItem
              label={`${dateMonthAndYear('2023-10-03')} a ${dateMonthAndYear(
                '2023-12-03',
              )}`}
              value="ux"
            />
          </SelectContent>
        </SelectPortal>
      </Select>
      <Center flex={1} marginVertical={12}>
        <VStack space="lg" w="100%">
          <Box>
            <Heading color="$emerald400" size="2xl">
              Bora treinar ?
            </Heading>
            <Heading color="$white" size="2xl">
              Escolha...
            </Heading>
          </Box>
          <Box
            bg="$violet900"
            w="100%"
            height={120}
            borderRadius={5}
            hardShadow="1"
            shadowColor="white"
            onTouchStart={() =>
              navigation.navigate('Exercises', {
                studentId: student?.studentId,
                valuationDate: '2023-10-03',
                dueDate: '2023-12-03',
              })
            }>
            <Image
              w="100%"
              h="100%"
              alt="Imagem"
              borderRadius={5}
              source={{
                uri: 'https://img.freepik.com/fotos-gratis/halteres-no-chao-de-uma-academia-ai-generative_123827-23743.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1706572800&semt=sph',
              }}
            />
            <Heading
              italic
              color="$white"
              size="2xl"
              position="absolute"
              left={10}>
              Treino A
            </Heading>
          </Box>
          <Box
            bg="$violet900"
            w="100%"
            height={120}
            borderRadius={5}
            hardShadow="1"
            shadowColor="white"
            onTouchStart={() =>
              navigation.navigate('Exercises', {
                studentId: student?.studentId,
                valuationDate: '2023-10-03',
                dueDate: '2023-12-03',
              })
            }>
            <Image
              w="100%"
              h="100%"
              alt="Imagem"
              borderRadius={5}
              source={{
                uri: 'https://media.istockphoto.com/id/1322158059/pt/foto/dumbbell-water-bottle-towel-on-the-bench-in-the-gym.jpg?s=612x612&w=0&k=20&c=eFfg0ECbiSopufODZ0Kz6yKTXvay0pXQpwJaUXxpBoc=',
              }}
            />
            <Heading
              italic
              color="$white"
              size="2xl"
              position="absolute"
              left={10}>
              Treino B
            </Heading>
          </Box>
          <Box
            bg="$violet900"
            w="100%"
            height={120}
            borderRadius={5}
            hardShadow="1"
            shadowColor="white"
            onTouchStart={() =>
              navigation.navigate('Exercises', {
                studentId: student?.studentId,
                valuationDate: '2023-10-03',
                dueDate: '2023-12-03',
              })
            }>
            <Image
              w="100%"
              h="100%"
              alt="Imagem"
              borderRadius={5}
              source={{
                uri: 'https://venum.com.br/blog/wp-content/uploads/2023/05/historia-muscle-beach-venice-1080x400.jpg',
              }}
            />
            <Heading
              italic
              color="$white"
              size="2xl"
              position="absolute"
              left={10}>
              Treino C
            </Heading>
          </Box>
          <TouchableOpacity
            onPress={() => navigation.navigate('Login')}
            title="Sair"
          />
        </VStack>
      </Center>
    </SafeAreaView>
  );
}

export default Home;
