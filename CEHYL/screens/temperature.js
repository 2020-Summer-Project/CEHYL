import React, { useState } from 'react';
import { Button, Image, Text, TouchableOpacity, View, Alert} from 'react-native';
import {useTheme} from '@react-navigation/native';
import { styles } from '../styles/temperaturestyle'
import { TextInput } from 'react-native-gesture-handler';
import Card from '../components/card';

import DateTimePicker from '@react-native-community/datetimepicker';


const addTemperature = (temp) => {
    return !isNaN(temp) ? console.log(temp) : Alert.alert('Not a number')
}

export default function TemperatureScreen({ navigation }) {
    const [temperature, setTemperature] = useState('');
    const {header, button } = useTheme();
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
  
    const onChange = (event, selectedDate) => {
      const currentDate = selectedDate || date;
      setShow(Platform.OS === 'ios');
      setDate(currentDate);
    };
  
    const showMode = currentMode => {
      setShow(true);
      setMode(currentMode);
    };
  
    const showDatepicker = () => {
      showMode('date');
    };
  
    const showTimepicker = () => {
      showMode('time');
    };

    return(
        <View style={styles.container}>
            <Text style={header}>Temperature Screen</Text>

            <View style={styles.row}>
                <TouchableOpacity style={button} onPress={showDatepicker}>
                    <Text style={styles.textCenter}>{date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear()}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={button} onPress={showTimepicker}>
                    <Text style={styles.textCenter}>{date.getHours() + ":" + date.getMinutes()}</Text>
                </TouchableOpacity>
            </View>            

            {show && ( 
                <DateTimePicker
                  testID="dateTimePicker"
                  timeZoneOffsetInMinutes={0}
                  value={date}
                  mode={mode}
                  is24Hour={true}
                  display="default"
                  onChange={onChange}
                />
            )}
            <View style={styles.row}>
                <TextInput 
                    keyboardType='numeric' style={styles.textInput} 
                    placeholder="Your temperature here"
                    onChangeText={(temp) => setTemperature(temp)}
                />
                <TouchableOpacity onPress={() => {
                        addTemperature(temperature)
                    }}>
                    <Image source={require('../images/baseline_add_black_18dp.png')} style={styles.addIcon}/>                        
                </TouchableOpacity>
            </View>
            <View>
                {/* list of temperature records here */}
                <Text></Text>
                <Card>
                    <Text style={{ paddingRight: 10}}>36.5</Text>
                    <Text>20/5/2020</Text>
                </Card>
                <Card>
                    <Text style={{ paddingRight: 10}}>36.5</Text>
                    <Text>20/5/2020</Text>
                </Card>
                <Card>
                    <Text style={{ paddingRight: 10}}>36.5</Text>
                    <Text>20/5/2020</Text>
                </Card>
            </View>
        </View>
    );
}

