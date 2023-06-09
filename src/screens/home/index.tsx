import React, {useState, useEffect, SetStateAction} from 'react';
import {windowHeight, windowWidth} from '../../utils/dimensions';

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

interface IHome {
  navigation: any;
}

function Home({navigation}: IHome) {
  const [day, setDay] = useState(days[0]);
  const [month, setMonth] = useState(months[0]);

  const [currentCardList, setCurrentCardList] =
    useState<SetStateAction<ICard[] | undefined | never | Object>>();

  useEffect(() => {
    handleListAll(day);
  }, [day]);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }, []);

  /*useFocusEffect(() => {
    handleListAll(day);
    let auxList = currentCardList as ICard[];
    if (auxList !== undefined) {
      console.log(!auxList.some(auxItem => auxItem.checked === false));
    }
  });*/

  const handleCreate = () => {
    postCards();
  };

  const handleListAll = async (group: string) => {
    const realm = await getRealm();
    setCurrentCardList(
      group === 'todos os dias'
        ? realm.objects<ICard>('Card')
        : realm.objects<ICard>('Card').filtered(`group=='${group}'`),
    );
  };

  const handleCardsReset = async (group: string) => {
    await putCardsResetDay(group);
    handleListAll(group);
  };

  return (
    <MenuProvider>
      <SafeAreaView style={stylesHome.homeContainer}>
        <StatusBar barStyle={'light-content'} backgroundColor={'#151515'} />
        <>
          <View style={stylesHome.header}>
            <Text />
            <SelectDropdown
              buttonStyle={stylesHome.buttonSelect}
              buttonTextStyle={stylesHome.textButton}
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
                  style={stylesHome.menuOption}
                  onSelect={() => handleCreate()}>
                  <Icon style={stylesHome.menuIcon} size={16} name="refresh" />
                  <Text>Sincronizar</Text>
                </MenuOption>
                <MenuOption
                  style={stylesHome.menuOption}
                  onSelect={() => removeAllCards()}>
                  <Icon
                    style={stylesHome.menuIcon}
                    size={16}
                    name="auto-delete"
                  />
                  <Text>Remover Todos</Text>
                </MenuOption>
                <MenuOption
                  style={stylesHome.menuOption}
                  onSelect={() => handleCardsReset(day)}>
                  <Icon
                    style={stylesHome.menuIcon}
                    size={16}
                    name="auto-delete"
                  />
                  <Text>Resetar Todos</Text>
                </MenuOption>
              </MenuOptions>
            </Menu>
          </View>
          <FlatList
            style={stylesHome.listContainer}
            numColumns={3}
            keyExtractor={item => item._id.toString()}
            data={currentCardList as ICard[]}
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
                      <Text>{item.descriptions[0].slice(0, 7) + '...'}</Text>
                    </View>
                  </TouchableNativeFeedback>
                </View>
              );
            }}
          />
          <View style={stylesCard.footer}>
            <SelectDropdown
              buttonStyle={stylesHome.button}
              buttonTextStyle={stylesHome.textButton}
              defaultButtonText={day}
              data={days}
              onSelect={selectedItem => {
                setDay(selectedItem);
              }}
              buttonTextAfterSelection={selectedItem => {
                return selectedItem;
              }}
              rowTextForSelection={item => {
                return item;
              }}
            />
          </View>
        </>
      </SafeAreaView>
    </MenuProvider>
  );
}

const stylesHome = StyleSheet.create({
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
    paddingBottom: 16,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: '#FFFAEE',
  },
  header: {
    flexDirection: 'row',
    width: windowWidth,
    paddingHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#151515',
  },
  listContainer: {
    marginTop: 8,
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
    width: windowWidth - 32,
    height: windowHeight - 560,
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
  cardContainerSeparator: {
    height: 190,
    width: 115,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 3,
    marginVertical: 1,
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
  footer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: windowWidth - 32,
  },
});

export default Home;
