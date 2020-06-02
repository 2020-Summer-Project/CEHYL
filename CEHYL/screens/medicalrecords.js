import React, {useEffect} from 'react';
import {Text, View, TextInput, TouchableOpacity, Alert} from 'react-native';
import {AuthContext} from '../providers/authprovider';
import {useTheme} from '@react-navigation/native';
import firebase from '../Firebase';

function MedicalRecordsScreen({navigation}) {
  const [entry, setEntry] = React.useState('');
  const [pastRecords, setPastRecords] = React.useState([]);
  const {button, textInput, buttonText, container} = useTheme();

  var user = firebase.auth().currentUser;

  function store(entry) {
    var updatedRecords = pastRecords;
    updatedRecords.push(entry.entry);
    firebase
      .database()
      .ref('medicalrecords/' + user.uid)
      .set({
        entry: updatedRecords,
      });
  }

  async function show() {
    try {
      await firebase
        .database()
        .ref('medicalrecords/' + user.uid)
        .once('value', function(snapshot) {
          console.log(snapshot.val().entry);
          setPastRecords(snapshot.val().entry);
        });
    } catch (error) {
      Alert.alert(error);
    }
  }

  useEffect(() => show(), []);

  function mapToJson(pastRecords) {
    let json = [];
    pastRecords.map(elem => json.push({title: elem, id: uuidv4()}));
  }

  return (
    <View style={container}>
      <TextInput
        style={textInput}
        placeholder="Entry"
        value={entry}
        onChangeText={setEntry}
        textContentType="entry"
        placeholderTextColor="white"
      />
      <TouchableOpacity style={button} onPress={() => store({entry})}>
        <Text style={buttonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
}

export default MedicalRecordsScreen;
