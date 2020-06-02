import React, {useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Card,
  CardItem,
} from 'react-native';
import {AuthContext} from '../providers/authprovider';
import {useTheme} from '@react-navigation/native';
import firebase from '../Firebase';
import {v4 as uuidv4} from 'uuid';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {styles} from '../styles/medicalrecordstyles';

function MedicalRecordsScreen({navigation}) {
  const [entry, setEntry] = React.useState('');
  const [recordsToShow, setRecords] = React.useState([]);
  const {button, textInput, buttonText, container} = useTheme();

  var user = firebase.auth().currentUser;

  function store(entry) {
    var updatedRecords = recordsToShow.map(item => item['title']);
    updatedRecords.push(entry.entry);
    firebase
      .database()
      .ref('medicalrecords/' + user.uid)
      .set({
        entry: updatedRecords,
      });
    setRecords(mapToJson(updatedRecords));
  }

  async function show() {
    try {
      await firebase
        .database()
        .ref('medicalrecords/' + user.uid)
        .once('value', function(snapshot) {
          if (snapshot.val() === null) {
            setRecords([]);
          } else {
            setRecords(mapToJson(snapshot.val().entry));
          }
        });
    } catch (error) {
      Alert.alert(error);
    }
  }

  useEffect(() => {
    show();
  }, []);

  function mapToJson(records) {
    let json = [];
    for (i = 0; i < records.length; i++) {
      const obj = {
        title: '',
        id: '',
      };
      json[i] = obj;
      json[i].title = records[i];
      json[i].id = uuidv4();
    }
    console.log(json);
    return json;
  }

  function handleSave(entry) {
    if (entry.entry.trim().length !== 0) {
      setEntry('');
      store(entry);
    } else {
      Alert.alert('Notice', 'The input entry is empty.', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'OK', onPress: () => console.log('OK Pressed')},
      ]);
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
        nestedScrollEnabled={true}
        data={recordsToShow}
        renderItem={({item}) => (
          <Text style={styles.container}>{item.title}</Text>
        )}
      />

      <TextInput
        style={textInput}
        placeholder="Entry"
        value={entry}
        onChangeText={setEntry}
        textContentType="entry"
        placeholderTextColor="white"
      />
      <TouchableOpacity style={button} onPress={() => handleSave({entry})}>
        <Text style={buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

export default MedicalRecordsScreen;
