import {Button, ButtonText} from '@gluestack-ui/themed';
import React from 'react';

type TouchableOpacityProps = {
  onPress: () => {};
  title: string;
};

function TouchableOpacity({onPress, title}: TouchableOpacityProps) {
  return (
    <Button w="100%" h={46} bg="$emerald400" p="$3" onPress={onPress}>
      <ButtonText fontWeight="$bold" fontSize="$sm" color="$white">
        {title}
      </ButtonText>
    </Button>
  );
}

export default TouchableOpacity;
