import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {windowHeight, windowWidth} from '../../utils/dimensions';

import {
  Animated,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import {ICard} from '../../database/interfaces/ICard';
import {putCards} from '../../database/api';
import {animatedStyle, handleAnimation} from './animation';

interface IDetails {
  navigation: any;
  route: any;
}

function Details({route, navigation}: IDetails) {
  const {item} = route.params;
  const [cardSelected, setCardSelect] = useState<ICard>(item);
  const [isCheck, setIsCheck] = useState<boolean>(cardSelected.checked);

  const handleUpdate = (data: ICard) => {
    putCards(data);
    setCardSelect(data);
    setTimeout(() => setIsCheck(data.checked), 500);
  };

  return (
    <SafeAreaView style={stylesHome.safeAreaContainer}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#151515'} />
      <TouchableWithoutFeedback
        onPress={async () => {
          handleAnimation();
          handleUpdate(cardSelected);
        }}>
        <Animated.View style={[stylesDetailsCard.cardContainer, animatedStyle]}>
          <View style={stylesDetailsCard.header}>
            <Text style={stylesDetailsCard.textHeader}>
              {cardSelected.bodyRegion}
            </Text>
          </View>
          <Image
            source={{
              uri: cardSelected.imageUrl.toString(),
            }}
            style={stylesDetailsCard.cardImageContainer}
          />
          {isCheck && (
            <Image
              source={{
                uri: 'https://drive.google.com/uc?export=view&id=1PPUSaNu4imVc2ZenatONfmwmfhmp7sGx',
              }}
              style={stylesDetailsCard.cardImageCheck}
            />
          )}
          <View />
        </Animated.View>
      </TouchableWithoutFeedback>
      <View style={stylesHome.footer}>
        <View style={stylesDetailsCard.descriptionsContainer}>
          {cardSelected.descriptions.map(description => (
            <View
              style={stylesDetailsCard.descriptionContainer}
              key={description.toString()}>
              <Text style={stylesDetailsCard.descriptionText}>
                {description}
              </Text>
              {cardSelected.descriptions[
                cardSelected.descriptions.length - 1
              ] === description ? (
                <Text style={stylesDetailsCard.descriptionPlus} />
              ) : (
                <Text style={stylesDetailsCard.descriptionPlus}> + </Text>
              )}
            </View>
          ))}
        </View>
        <View style={stylesDetailsCard.commentsContainer}>
          {cardSelected.comments.map(comment => (
            <Text
              style={stylesDetailsCard.commentsText}
              key={comment.toString()}>
              {comment}
            </Text>
          ))}
        </View>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={stylesHome.button}>
          <Text style={stylesHome.textButton}>
            <Icon name="arrow-back-ios" size={28} color="#FFFFFF" />
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const stylesHome = StyleSheet.create({
  safeAreaContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    paddingBottom: 16,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: '#FFFAEE',
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
});

const stylesDetailsCard = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: 'rgba(0,0,0,0.1)',
    backgroundColor: '#FFFFFF',
    width: windowWidth - 32,
    height: windowHeight - 256,
    borderRadius: 10,
    borderWidth: 1,
    marginTop: 16,
  },
  header: {
    width: '100%',
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(100,100,100,0.1)',
  },
  textHeader: {
    fontSize: 18,
  },
  cardImageContainer: {
    height: windowWidth,
    width: windowHeight - 450,
  },
  cardImageCheck: {
    position: 'absolute',
    height: windowWidth - 125,
    width: windowHeight - 510,
    bottom: 100,
  },
  descriptionsContainer: {
    width: '100%',
  },
  descriptionContainer: {
    flexDirection: 'row',
  },
  descriptionText: {
    fontWeight: '500',
    fontSize: 18,
  },
  descriptionPlus: {
    color: '#F6153F',
    fontWeight: '500',
  },
  text: {},
  commentsContainer: {
    width: '100%',
  },
  commentsText: {
    fontSize: 12,
  },
});

export default Details;
