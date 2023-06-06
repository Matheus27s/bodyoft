import React from 'react';
import {StatusBar, StyleSheet, View} from 'react-native';
import Lottie from 'lottie-react-native';

function Splash({navigation}: any) {
  return (
    <View style={styles.splash}>
      <StatusBar barStyle={'light-content'} backgroundColor={'#151515'} />
      <Lottie
        source={require('../../assets/lottie/oft.json')}
        autoPlay
        loop={false}
        onAnimationFinish={() => navigation.navigate('Home')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  splash: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#151515',
  },
});

export default Splash;
