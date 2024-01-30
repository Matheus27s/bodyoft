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

import {IExercise} from '../../database/interfaces/ICard';
import {animatedStyle, handleAnimation} from './animation';
import api from '../../services/api';

interface IDetails {
  navigation: any;
  route: any;
}

function Details({route, navigation}: IDetails) {
  const {item} = route.params;
  const [exercise, setExercise] = useState<IExercise>(item);

  const updateExercise = (data: IExercise) => {
    const assessmentId = 'add2a437-ee05-4c5b-a6ca-5ff50e4135bc';
    data.hasDone = !data.hasDone;
    api
      .put(`/assessments/${assessmentId}/exercises/${data.exerciseId}`, data)
      .then(function (response) {
        setTimeout(() => setExercise(response.data), 500);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#151515'} />
      <View style={styles.header}>
        <Text style={styles.textHeader}>{exercise.bodyRegion}</Text>
      </View>
      <TouchableWithoutFeedback
        onPress={async () => {
          handleAnimation();
          updateExercise(exercise);
        }}>
        <Animated.View style={[stylesDetailsCard.cardContainer, animatedStyle]}>
          <Image
            source={{
              uri: exercise.imageUrl.toString(),
            }}
            style={stylesDetailsCard.cardImageContainer}
          />
          {exercise.hasDone && (
            <Image
              source={{
                uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/600px-Sign-check-icon.png?20200929115132',
              }}
              style={stylesDetailsCard.cardImageCheck}
            />
          )}
          <View />
        </Animated.View>
      </TouchableWithoutFeedback>
      <View style={styles.footer}>
        <View style={stylesDetailsCard.descriptionsContainer}>
          <Text>{exercise.descriptions}</Text>
        </View>
        <View style={stylesDetailsCard.commentsContainer}>
          <Text>{exercise.comments}</Text>
        </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
    paddingBottom: 16,
    width: windowWidth,
    height: windowHeight,
    backgroundColor: '#FFFAEE',
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
    justifyContent: 'space-between',
    alignItems: 'center',
    width: windowWidth - 32,
    height: windowHeight - 590,
  },
});

const stylesDetailsCard = StyleSheet.create({
  cardContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: 'rgba(0,0,0,0.1)',
    backgroundColor: '#FFFFFF',
    width: windowWidth - 28,
    height: windowHeight - 286,
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
    width: windowHeight - 432,
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
    marginTop: 2,
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
