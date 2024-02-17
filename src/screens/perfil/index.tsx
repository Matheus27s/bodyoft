import React, {useEffect, useState} from 'react';

import {
  SafeAreaView,
  Text,
  FlatList,
  Box,
  VStack,
  Image,
} from '@gluestack-ui/themed';

import api from '../../services/api';
import {IStudent} from '../../interfaces';
import PerimetryBox from './PerimetryBox';

interface IPerfil {
  navigation: any;
  route: any;
}

function Perfil({route}: IPerfil) {
  const [student] = useState<IStudent>(route.params);
  const [assessments, setAssessments] = useState<IArguments[]>();
  const [months] = useState<string[]>([
    '01/2023',
    '02/2023',
    '03/2023',
    '04/2023',
  ]);

  useEffect(() => {
    api
      .get(`/students/${student.studentId}/assessments`)
      .then(function (response) {
        setAssessments(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [student]);

  return (
    <SafeAreaView
      bgColor="$violet700"
      flex={1}
      paddingVertical={12}
      paddingHorizontal={12}>
      <Box bg="red" alignItems="flex-start" justifyContent="space-between">
        <Text>Nome: {student.name}</Text>
        <Text>Profissão: {student.profession}</Text>
        <Text>Idade: {student.age}</Text>
      </Box>
      <FlatList
        data={assessments}
        renderItem={({item}) => (
          <Box>
            <VStack bg="$violet900" borderRadius={5} padding={10}>
              <Text>Perimetria</Text>
              <Text>Estatura: {item.perimetry.stature}</Text>
              <Text>Peso: {item.perimetry.fat}</Text>
              <Text>Metabolismo Basal: {item.perimetry.basalMetabolism}</Text>
              <Text>Idade Corporal: {item.perimetry.bodyAge}</Text>
              <Text>Gordura ( % ): {item.perimetry.fatPercentage}</Text>
              <Text>
                Massa Magra ( % ): {item.perimetry.leanMassPercentage}
              </Text>
              <Text>Massa Magra ( kg ): {item.perimetry.leanMass}</Text>
              <Text>
                Gordura Viceral ( % ): {item.perimetry.visceralFatpercentage}
              </Text>
            </VStack>
            <VStack>
              <Text>Medidas</Text>

              <PerimetryBox description={`Ombro: ${item.perimetry.shoulder}`}>
                <Image
                  alt="image"
                  source={require('../../assets/image/shoulder.png')}
                />
              </PerimetryBox>

              <PerimetryBox description={`Peito: ${item.perimetry.chest}`}>
                <Image
                  alt="image"
                  source={require('../../assets/image/chest.png')}
                />
              </PerimetryBox>

              <PerimetryBox description={`Abdômen: ${item.perimetry.abdomen}`}>
                <Image
                  alt="image"
                  source={require('../../assets/image/abdomen.png')}
                />
              </PerimetryBox>

              <PerimetryBox description={`Cintura: ${item.perimetry.waist}`}>
                <Image
                  alt="image"
                  source={require('../../assets/image/waist.png')}
                />
              </PerimetryBox>

              <PerimetryBox description={`Quadril: ${item.perimetry.hip}`}>
                <Image
                  alt="image"
                  source={require('../../assets/image/hip.png')}
                />
              </PerimetryBox>

              <PerimetryBox
                description={`Braço Esquerda: ${item.perimetry.leftArm}`}>
                <Image
                  alt="image"
                  source={require('../../assets/image/arm.png')}
                />
              </PerimetryBox>

              <PerimetryBox
                description={`Braço Direito: ${item.perimetry.rightArm}`}>
                <Image
                  alt="image"
                  source={require('../../assets/image/arm.png')}
                />
              </PerimetryBox>

              <PerimetryBox
                description={`Coxa Direita: ${item.perimetry.rightThigh}`}>
                <Image
                  alt="image"
                  source={require('../../assets/image/thigh.png')}
                />
              </PerimetryBox>

              <PerimetryBox
                description={`Coxa Esquerda: ${item.perimetry.leftThigh}`}>
                <Image
                  alt="image"
                  source={require('../../assets/image/thigh.png')}
                />
              </PerimetryBox>

              <PerimetryBox
                description={`Panturrilha Direita: ${item.perimetry.rightCalf}`}>
                <Image
                  alt="image"
                  source={require('../../assets/image/calf.png')}
                />
              </PerimetryBox>

              <PerimetryBox
                description={`Panturrilha Esquerda: ${item.perimetry.leftCalf}`}>
                <Image
                  alt="image"
                  source={require('../../assets/image/calf.png')}
                />
              </PerimetryBox>
            </VStack>
          </Box>
        )}
      />
    </SafeAreaView>
  );
}

export default Perfil;
