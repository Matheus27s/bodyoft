import React, {useState, useEffect, SetStateAction, useCallback} from 'react';
import {windowHeight, windowWidth} from '../../utils/dimensions';
import Lottie from 'lottie-react-native';

import SelectDropdown from 'react-native-select-dropdown';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {ICard} from '../../database/interfaces/ICard';

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
  BackHandler,
  TouchableOpacity,
} from 'react-native';

import {
  postCards,
  putCardsResetDay,
  removeAllCards,
  days,
  months,
} from '../../database/api';

import getRealm from '../../database/realm';
import {MenuProvider} from 'react-native-popup-menu';
import {useFocusEffect} from '@react-navigation/native';

interface IHome {
  navigation: any;
}

function Home({navigation}: IHome) {
  const [day, setDay] = useState(days[0]);
  const [month, setMonth] = useState(months[0]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCongratulation, setIsCongratulation] = useState(false);

  const [currentCardList, setCurrentCardList] =
    useState<SetStateAction<ICard[] | undefined | never | Object>>();

  // Esconder o Congratulation
  const handleHideCongratulation = (element: ICard) =>
    element.checked === false;

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }, []);

  useFocusEffect(
    useCallback(() => {
      handleListAll(day);
    }, [day]),
  );

  useFocusEffect(
    useCallback(() => {
      const list = currentCardList as ICard[];
      if (currentCardList !== undefined) {
        setIsCongratulation(!list.some(handleHideCongratulation));
      }
    }, [currentCardList]),
  );

  const handleCreate = () => {
    postCards();
  };

  const handleListAll = async (group: string) => {
    const realm = await getRealm();
    setCurrentCardList(
      group === 'todos'
        ? realm.objects<ICard>('Card')
        : realm.objects<ICard>('Card').filtered(`group=='${group}'`),
    );
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
            defaultButtonText={month}
            data={months}
            onSelect={selectedItem => {
              setMonth(selectedItem);
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
                onSelect={() => {
                  handleCreate();
                  handleListAll(day);
                }}>
                <Icon style={styles.menuIcon} size={16} name="refresh" />
                <Text>Sincronizar</Text>
              </MenuOption>
              <MenuOption
                style={styles.menuOption}
                onSelect={() => {
                  removeAllCards();
                  handleListAll(day);
                }}>
                <Icon style={styles.menuIcon} size={16} name="auto-delete" />
                <Text>Remover Todos</Text>
              </MenuOption>
              <MenuOption
                style={styles.menuOption}
                onSelect={async () => {
                  await putCardsResetDay(day);
                  handleListAll(day);
                }}>
                <Icon style={styles.menuIcon} size={16} name="auto-delete" />
                <Text>Resetar Todos</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
        <>
          {isLoading ? (
            <Lottie
              source={require('../../assets/lottie/loading.json')}
              autoPlay
              loop={false}
              onAnimationFinish={() => setIsLoading(false)}
            />
          ) : (
            <>
              <FlatList
                numColumns={3}
                style={stylesCard.listContainer}
                data={currentCardList as ICard[]}
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item._id.toString()}
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
                          {item.checked && (
                            <Image
                              source={{
                                uri: 'https://drive.google.com/uc?export=view&id=1PPUSaNu4imVc2ZenatONfmwmfhmp7sGx',
                              }}
                              style={stylesCard.cardImageCheck}
                            />
                          )}
                          <Text>
                            {item.descriptions[0].slice(0, 7) + '...'}
                          </Text>
                        </View>
                      </TouchableNativeFeedback>
                    </View>
                  );
                }}
              />
              {isCongratulation && (
                <Lottie
                  style={styles.congratulations}
                  source={require('../../assets/lottie/congratulation.json')}
                  autoPlay
                  loop={false}
                  onAnimationFinish={() => setIsCongratulation(false)}
                />
              )}
              <View style={styles.footer}>
                <FlatList
                  data={days}
                  horizontal={true}
                  keyExtractor={item => item}
                  showsHorizontalScrollIndicator={false}
                  renderItem={({item}) => {
                    if (item === day) {
                      return (
                        <TouchableOpacity
                          onPress={() => setDay(item)}
                          style={stylesDaySelected.buttonContainer}>
                          <Text style={stylesDaySelected.text}>{item}</Text>
                        </TouchableOpacity>
                      );
                    } else {
                      return (
                        <TouchableOpacity
                          onPress={() => setDay(item)}
                          style={stylesDay.buttonContainer}>
                          <Text style={stylesDay.text}>{item}</Text>
                        </TouchableOpacity>
                      );
                    }
                  }}
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
  },
  menuOption: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuIcon: {
    marginRight: 2,
  },
});

const stylesCard = StyleSheet.create({
  listContainer: {
    marginHorizontal: 8,
  },
  cardContainerSeparator: {
    height: 190,
    width: 120,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 2,
  },
  cardContainer: {
    paddingBottom: 5,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.1)',
    backgroundColor: '#FFFFFF',
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

const stylesDay = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'rgba(255,0,0,0.1)',
    marginHorizontal: 5,
    borderRadius: 20,
    width: 100,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {},
});

const stylesDaySelected = StyleSheet.create({
  buttonContainer: {
    backgroundColor: '#151515',
    marginHorizontal: 5,
    borderRadius: 20,
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
