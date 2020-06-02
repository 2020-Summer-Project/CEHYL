import React, { useState, useEffect } from 'react';
import { Image, FlatList, Text, TouchableOpacity, View, Alert} from 'react-native';
import {useTheme} from '@react-navigation/native';
import { styles } from '../styles/temperaturestyle'
import { TextInput } from 'react-native-gesture-handler';
import Card from '../components/card';
import firebase from '../Firebase';
import {v4 as uuidv4} from 'uuid';

import DateTimePicker from '@react-native-community/datetimepicker';

export default function TemperatureScreen({ navigation }) {
    const [temperature, setTemperature] = useState('');
    const {header, button } = useTheme();
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);
    const [listOfTemperature, setListOfTemperature] = useState([])
  
    const user = firebase.auth().currentUser;

    const addTemperature = () => {
        if (isNaN(temperature)) {
            return Alert.alert('Not a number')
        }
        console.log(temperature)
        addTemperatureToDatabase()

        setTemperature('')
        setDate(new Date())
    }

    const addTemperatureToDatabase = () => {
        const dateTime = dateTimeInString()
        console.log(dateTime)
        firebase.database().ref('temperature/' + user.uid + '/' + dateTime).set({
            temperature: temperature,
            date: dateTime,
        })
    }

    const dateTimeInString = () => {
        let minutes = formatMinutes(date.getMinutes().toString())
        console.log(minutes)
        return date.getDate() + "-" + (date.getMonth() + 1) + '-' + date.getFullYear() + " " + date.getHours() + ":" + minutes
    }

    const formatMinutes = (minutes) => {
        if (minutes.length === 2) {
            return minutes
        }
        return "0" + minutes
    }

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

    const processRetrievedData = (dataRetrieved) => {
        const sortedData = {}
        Object.keys(dataRetrieved).sort(
            (a, b) => {
                return new Date(a) > new Date(b) ? 1 : -1
            })
            .reverse()
            .forEach((key) => sortedData[key] = dataRetrieved[key])
        const result = Object.values(sortedData)
            .map(data => {
                return {...data, id: uuidv4()}
            })
            console.log(result)
        return result
    }

    useEffect(() =>{
        try {
            const listener = firebase.database().ref('temperature/' + user.uid)
            listener.on('value', function(snapshot) {
                const dataRetrieved = snapshot.val();
                const result = processRetrievedData(dataRetrieved);
                setListOfTemperature(result)
            })
                // .once('value')
                // .then(function(snapshot) {
                //     Object.keys(dataRetrieved).sort( (a, b) => {
                //         return new Date(a) - new Date(b)
                //     }).reverse().forEach((key) => sortedData[key] = dataRetrieved[key])
                //     const result = Object.values(sortedData).map(data => {
                //         return {...data, id: uuidv4()}
                //     })
                //     setListOfTemperature(result)
                // });
        } catch(err) {
            Alert.alert(err);
        }
    }, [])

    return(
        <View style={styles.container}>
            <Text style={header}>Temperature Screen</Text>

            <View style={styles.row}>
                <TouchableOpacity style={button} onPress={showDatepicker}>
                    <Text style={styles.textCenter}>{date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear()}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={button} onPress={showTimepicker}>
                    <Text style={styles.textCenter}>{date.getHours() + ":" + formatMinutes(date.getMinutes().toString())}</Text>
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
                    onChangeText={setTemperature}
                    value={temperature}
                />
                <TouchableOpacity onPress={() => {
                        addTemperature(temperature)
                    }}>
                    <Image source={require('../images/baseline_add_black_18dp.png')} style={styles.addIcon}/>                        
                </TouchableOpacity>
            </View>
            <View>
                <FlatList
                    data={listOfTemperature}
                    renderItem={({item}) => (
                        <Card>
                            <View style={styles.row}>
                                <Text>{item.date}</Text>
                                <Text>{item.temperature}</Text>
                            </View>
                        </Card>
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        </View>
    );
}

