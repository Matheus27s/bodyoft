import {Box, Text} from '@gluestack-ui/themed';
import React from 'react';

type Props = {
  children: string | JSX.Element | JSX.Element[] | JSX.Element;
  description: string;
};

function PerimetryBox({children, description}: Props) {
  return (
    <Box
      borderRadius={5}
      bg="$violet900"
      flexDirection="row"
      mb={10}
      p={10}
      alignItems="center"
      justifyContent="space-between">
      <Text color="$white">{description}</Text>
      {children}
    </Box>
  );
}

export default PerimetryBox;
