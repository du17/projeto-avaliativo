
import React, { useState } from 'react';
import { View, Button, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

export default function DataPicker({ aoSelecionar }) {
  const [data, setData] = useState(new Date());
  const [mostrar, setMostrar] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || data;
    setMostrar(Platform.OS === 'ios');
    setData(currentDate);
    aoSelecionar(currentDate);
  };

  return (
    <View>
      <Button title="Selecionar Data" onPress={() => setMostrar(true)} />
      {mostrar && (
        <DateTimePicker
          value={data}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
}
