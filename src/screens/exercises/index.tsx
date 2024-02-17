import React, {useEffect} from 'react';
import {Text, SafeAreaView, Button} from '@gluestack-ui/themed';
import api from '../../services/api';

function Exercises({route, navigation}: any) {
  const {studentId, valuationDate, dueDate} = route.params;

  useEffect(() => {
    api
      .get(
        `/students/${studentId}/assessments?valuationDate=${valuationDate}&dueDate=${dueDate}`,
      )
      .then(function (response) {
        console.log(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [dueDate, studentId, valuationDate]);

  return (
    <SafeAreaView bgColor="$violet700" flex={1}>
      <Text>Exercises</Text>
      <Button onPress={() => navigation.navigate('Home')}>
        <Text>Voltar</Text>
      </Button>
    </SafeAreaView>
  );
}

export default Exercises;
