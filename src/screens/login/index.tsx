import React, {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Lottie from 'lottie-react-native';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  BackHandler,
  SafeAreaView,
} from 'react-native';
import {IAssessment, IStudent} from '../../database/interfaces/ICard';
import api from '../../services/api';

interface ILogin {
  navigation: any;
}

function Login({navigation}: ILogin) {
  const studentId = '937a904a-7141-4e9b-abcb-93cd4fb13856';
  const [student, setStudent] = useState<IStudent>();

  useEffect(() => {
    api
      .get(`students/${studentId}`)
      .then(function (response) {
        setStudent(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });

    BackHandler.addEventListener('hardwareBackPress', () => {
      return true;
    });
  }, []);

  const handleNavigation = () => {
    api
      .get(`/students/${studentId}/assessments`)
      .then(function (response) {
        const homeObject = {
          student,
          assessment: response.data[0] as IAssessment,
        };

        navigation.navigate('Home', homeObject);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <SafeAreaView style={styles.safeAreaContainer}>
      <View style={styles.userContainer}>
        <Lottie
          source={require('../../assets/lottie/user.json')}
          autoPlay
          loop={false}
          style={styles.icon}
          onAnimationFinish={() => handleNavigation()}
        />
        <Text style={styles.text}>{student?.name}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeAreaContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingBottom: 16,
    backgroundColor: '#151515',
    paddingHorizontal: 10,
  },
  userContainer: {
    alignItems: 'center',
    marginBottom: 54,
  },
  icon: {
    width: 200,
    height: 200,
  },
  button: {
    marginTop: 2,
    backgroundColor: '#ff5b27',
    width: '100%',
    height: 48,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 20,
    color: '#ff5b27',
    fontWeight: '600',
  },
  textButton: {
    color: '#fcfcfd',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Login;
