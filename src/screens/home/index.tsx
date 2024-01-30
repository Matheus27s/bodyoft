import React, {useState, useEffect, useCallback} from 'react';
import {windowHeight, windowWidth} from '../../utils/dimensions';
import Lottie from 'lottie-react-native';

import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  IAssessment,
  IExercise,
  IStudent,
} from '../../database/interfaces/ICard';

import {
  Menu,
  MenuOptions,
  MenuOption,
  MenuTrigger,
} from 'react-native-popup-menu';

import {
  View,
  TouchableNativeFeedback,
  SafeAreaView,
  FlatList,
  StyleSheet,
  Text,
  Image,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {MenuProvider} from 'react-native-popup-menu';
import {useFocusEffect} from '@react-navigation/native';
import api from '../../services/api';

interface IHome {
  navigation: any;
  route: any;
}

function Home({navigation, route}: IHome) {
  const [student] = useState<IStudent>(route.params.student);
  const [assessment] = useState<IAssessment>(route.params.assessment);

  const [exercises, setExercises] = useState<IExercise[]>();
  const [trainingDaySelected, setTrainingDaySelected] = useState('Todos');

  const [isLoading, setIsLoading] = useState(true);

  const months = ['01/2023', '02/2023', '03/2023', '04/2023'] as string[];
  const [trainingDays] = useState(['01', '02', '03', 'Todos']);

  useEffect(() => {
    getAllExercisesByAssessment('Todos');
  }, []);

  useFocusEffect(
    useCallback(() => {
      getAllExercisesByAssessment(trainingDaySelected);
    }, [trainingDaySelected])
  );

  const getAllExercisesByAssessment = (trainingDay: string) => {
    setIsLoading(true);

    if (trainingDay === 'Todos') {
      api
        .get(`/assessments/${assessment.assessmentId}/exercises`)
        .then(function (response) {
          setExercises(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    } else {
      api
        .get(
          `/assessments/${assessment.assessmentId}/exercises?trainingDay=${trainingDay}`,
        )
        .then(function (response) {
          setExercises(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    setTrainingDaySelected(trainingDay);
    setIsLoading(false);
  };

  return (
    <MenuProvider>
      <SafeAreaView style={styles.homeContainer}>
        <StatusBar barStyle={'light-content'} backgroundColor={'#151515'} />
        <View style={styles.header}>
          <Text />
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
          <Menu>
            <MenuTrigger
              children={<Icon name="settings" size={30} color="#FFFFFF" />}
            />
            <MenuOptions>
              <MenuOption
                style={styles.menuOption}
                onSelect={async () => {
                  navigation.navigate('Perfil', student);
                }}>
                <Icon style={styles.menuIcon} size={24} name="person-pin" />
                <Text style={styles.menuText}>Perfil</Text>
              </MenuOption>

              <MenuOption style={styles.menuOption} onSelect={() => {}}>
                <Icon
                  style={styles.menuIcon}
                  size={24}
                  name="power-settings-new"
                />
                <Text style={styles.menuText}>Sair</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
        <>
          {isLoading ? (
            <Lottie
              style={styles.lottie}
              source={require('../../assets/lottie/animation3.json')}
              autoPlay
              loop={false}
              onAnimationFinish={() => setIsLoading(false)}
            />
          ) : (
            <>
              <FlatList
                numColumns={3}
                style={stylesCard.listContainer}
                data={exercises}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.exerciseId.toString()}
                renderItem={({item}) => {
                  return (
                    <View style={stylesCard.cardContainerSeparator}>
                      <TouchableNativeFeedback
                        onPress={() => {
                          navigation.navigate('Details', {
                            item,
                          });
                        }}>
                        <View style={stylesCard.cardContainer}>
                          <View style={stylesCard.header}>
                            <Text style={stylesCard.textHeader}>
                              {item.bodyRegion}
                            </Text>
                          </View>
                          <Image
                            source={{
                              uri: item.imageUrl.toString(),
                            }}
                            style={stylesCard.cardImageContainer}
                          />
                          {item.hasDone && (
                            <Image
                              source={{
                                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/600px-Sign-check-icon.png?20200929115132',
                              }}
                              style={stylesCard.cardImageCheck}
                            />
                          )}
                          <Text>{item.descriptions}</Text>
                        </View>
                      </TouchableNativeFeedback>
                    </View>
                  );
                }}
              />
              {/* {isCongratulation && (
                <Lottie
                  style={styles.congratulations}
                  source={require('../../assets/lottie/congratulation.json')}
                  autoPlay
                  loop={false}
                  onAnimationFinish={() => setIsCongratulation(false)}
                />
              )} */}
              <View style={styles.footer}>
                <FlatList
                  data={trainingDays}
                  horizontal={true}
                  keyExtractor={item => item}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => getAllExercisesByAssessment(item)}
                      style={stylesDaySelected.buttonContainer}>
                      <Text style={stylesDaySelected.text}>
                        {item !== 'Todos' ? `Dia ${item}` : item}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
              </View>
            </>
          )}
        </>
      </SafeAreaView>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({
  lottie: {
    width: 150,
  },
  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000000',
  },
  homeContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    backgroundColor: '#FFFAEE',
  },
  header: {
    flexDirection: 'row',
    width: windowWidth,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#151515',
    marginBottom: 10,
  },
  congratulations: {
    position: 'absolute',
    marginVertical: 50,
  },
  button: {
    marginTop: 2,
    backgroundColor: '#151515',
    width: '100%',
    height: 48,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSelect: {
    backgroundColor: '#151515',
    marginRight: 32,
    borderRadius: 5,
    width: 120,
  },
  textButton: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  footer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: windowHeight - 720,
    marginTop: 10,
    marginBottom: 10,
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 2,
  },
  menuText: {
    fontSize: 16,
  },
});

const stylesCard = StyleSheet.create({
  listContainer: {
    marginHorizontal: 8,
  },
  cardContainerSeparator: {
    height: 200,
    width: 125,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  cardContainer: {
    paddingBottom: 5,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    width: '100%',
  },
  header: {
    width: '100%',
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(100,100,100,0.1)',
  },
  textHeader: {},
  cardImageContainer: {
    height: 135,
    width: 105,
  },
  cardImageCheck: {
    position: 'absolute',
    width: 100,
    height: 100,
  },
});

const stylesDaySelected = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#151515',
    marginHorizontal: 5,
    borderRadius: 10,
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
  },
});

export default Home;
