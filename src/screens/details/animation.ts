import {Animated} from 'react-native';

const rotateAnimation = new Animated.Value(0);

export const handleAnimation = () => {
  Animated.timing(rotateAnimation, {
    toValue: 1,
    duration: 800,
    useNativeDriver: false,
  }).start(() => {
    rotateAnimation.setValue(0);
  });
};

const interpolateRotating = rotateAnimation.interpolate({
  inputRange: [0, 2],
  outputRange: ['0deg', '690deg'],
});

export const animatedStyle = {
  transform: [
    {
      rotateY: interpolateRotating,
    },
  ],
};
