import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import SelectDropdown from 'react-native-select-dropdown';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Image,
} from 'react-native';
import {IAssessment, IStudent} from '../../database/interfaces/ICard';
import api from '../../services/api';
import {windowHeight, windowWidth} from '../../utils/dimensions';
import {dateMonthAndYear} from '../../utils/dateFormat';

interface IPerfil {
  navigation: any;
  route: any;
}

function Perfil({route, navigation}: IPerfil) {
  const [student] = useState<IStudent>(route.params);
  const [assessments, setAssessments] = useState<IAssessment[]>();
  const [months, setMonths] = useState<string[]>([
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
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [student]);

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.header}>
        <Text style={styles.textHeader}>
          {assessments !== undefined
            ? `${dateMonthAndYear(
                assessments[0].valuationDate,
              )} a ${dateMonthAndYear(assessments[0].dueDate)}`
            : null}
        </Text>
      </View>
      <SelectDropdown
        buttonStyle={styles.buttonSelect}
        buttonTextStyle={styles.textButton}
        defaultButtonText={months[0]}
        data={months}
        onSelect={selectedItem => {
          () => {
            console.log(selectedItem);
          };
        }}
        buttonTextAfterSelection={selectedItem => {
          return selectedItem;
        }}
        rowTextForSelection={item => {
          return item;
        }}
      />
      <FlatList
        style={styles.listContainer}
        numColumns={3}
        data={assessments}
        showsHorizontalScrollIndicator={false}
        keyExtractor={assessment => assessment.assessmentId.toString()}
        renderItem={({item}) => {
          return (
            <View style={styles.content}>
              <View style={styles.session}>
                <Text style={styles.title}>Info</Text>
                <Text>Nome: {student.name}</Text>
                <Text>Idade: {student.age}</Text>
                <Text>Professor: {item?.teacher}</Text>
              </View>
              <View style={styles.session}>
                <Text style={styles.title}>Perimetria</Text>
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
              </View>
              <View style={styles.session}>
                <Text style={styles.title}>Medidas</Text>

                <View style={styles.perimetrySession}>
                  <Text>Ombro: {item.perimetry.shoulder}</Text>
                  <Image
                    style={styles.perimetryIcon}
                    source={require('../../assets/image/human.png')}
                  />
                </View>

                <View style={styles.perimetrySession}>
                  <Text>Peito: {item.perimetry.chest}</Text>
                  <Image
                    style={styles.perimetryIcon}
                    source={require('../../assets/image/chest.png')}
                  />
                </View>

                <View style={styles.perimetrySession}>
                  <Text>Abdômen: {item.perimetry.abdomen}</Text>
                  <Image
                    style={styles.perimetryIcon}
                    source={require('../../assets/image/abs.png')}
                  />
                </View>

                <View style={styles.perimetrySession}>
                  <Text>Cintura: {item.perimetry.waist}</Text>
                  <Image
                    style={styles.perimetryIcon}
                    source={require('../../assets/image/diet.png')}
                  />
                </View>

                <View style={styles.perimetrySession}>
                  <Text>Quadril: {item.perimetry.hip}</Text>
                  <Image
                    style={styles.perimetryIcon}
                    source={require('../../assets/image/hips.png')}
                  />
                </View>

                <View style={styles.perimetrySession}>
                  <Text>Braço Esquerda: {item.perimetry.leftArm}</Text>
                  <Image
                    style={styles.perimetryIcon}
                    source={require('../../assets/image/muscles.png')}
                  />
                </View>

                <View style={styles.perimetrySession}>
                  <Text>Braço Direito: {item.perimetry.rightArm}</Text>
                  <Image
                    style={styles.perimetryIcon}
                    source={require('../../assets/image/muscles.png')}
                  />
                </View>

                <View style={styles.perimetrySession}>
                  <Text>Coxa Direita: {item.perimetry.rightThigh}</Text>
                  <Image
                    style={styles.perimetryIcon}
                    source={require('../../assets/image/leg.png')}
                  />
                </View>

                <View style={styles.perimetrySession}>
                  <Text>Coxa Esquerda: {item.perimetry.leftThigh}</Text>
                  <Image
                    style={styles.perimetryIcon}
                    source={require('../../assets/image/leg.png')}
                  />
                </View>

                <View style={styles.perimetrySession}>
                  <Text>Panturrilha Direita: {item.perimetry.rightCalf}</Text>
                  <Image
                    style={styles.perimetryIcon}
                    source={require('../../assets/image/calf.png')}
                  />
                </View>

                <View style={styles.perimetrySession}>
                  <Text>Panturrilha Esquerda: {item.perimetry.leftCalf}</Text>
                  <Image
                    style={styles.perimetryIcon}
                    source={require('../../assets/image/calf.png')}
                  />
                </View>
              </View>
            </View>
          );
        }}
      />
      <View style={styles.footer}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.button}>
          <Text style={styles.textButton}>
            <Icon name="arrow-back-ios" size={28} color="#FFFFFF" />
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    paddingBottom: 16,
    backgroundColor: '#FFFAEE',
  },
  listContainer: {
    width: '100%',
  },
  header: {
    width: windowWidth,
    height: windowHeight - 712,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#151515',
  },
  textHeader: {
    fontSize: 18,
    color: '#FFFFFF',
  },
  buttonSelect: {
    backgroundColor: '#151515',
    marginRight: 32,
    borderRadius: 5,
    width: 120,
  },
  content: {
    width: '100%',
    paddingHorizontal: 12,
  },
  session: {
    backgroundColor: 'rgba(100,100,100,0.1)',
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
    width: '100%',
  },
  perimetrySession: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.2)',
    marginBottom: 10,
    backgroundColor: '#FFFAEE',
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  title: {
    fontWeight: '700',
    color: '#ff5b27',
    marginBottom: 10,
  },
  perimetryIcon: {
    width: 40,
    height: 40,
  },
  button: {
    marginTop: 2,
    backgroundColor: '#151515',
    width: '100%',
    height: 48,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textButton: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: windowWidth - 32,
  },
});

export default Perfil;
