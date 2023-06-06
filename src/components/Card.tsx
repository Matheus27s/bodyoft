import React from 'react';

import {View, Image, StyleSheet} from 'react-native';

function Card(): JSX.Element {
  return (
    <View style={styles.cardContainer}>
      <Image
        style={styles.cardImageContainer}
        source={require('../assets/image/card-image.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'red',
    height: 135,
    width: 105,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImageContainer: {
    height: 135,
    width: 105,
    borderRadius: 5,
  },
});

export default Card;
