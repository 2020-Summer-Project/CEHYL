import React, {useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import firebase from '../Firebase';
import {v4 as uuidv4} from 'uuid';
import {FlatList, ScrollView} from 'react-native-gesture-handler';
import {styles} from '../styles/notesstyles';
import Card from '../components/card';
import {Header} from 'react-native/Libraries/NewAppScreen';

function NotesScreen({navigation}) {
  const [entry, setEntry] = React.useState('');
  const [recordsToShow, setRecords] = React.useState([]);
  const {button, textInput, buttonText, container} = useTheme();

  var user = firebase.auth().currentUser;

  function store(entry) {
    var updatedRecords = recordsToShow.map(item => item['title']);
    updatedRecords.push(entry.entry);
    firebase
      .database()
      .ref('notes/' + user.uid)
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
            setRecords(mapToJson(snapshot.val()));
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

  function handleDelete(item) {
    Alert.alert('Notice', 'Do you want to delete this entry?', [
      {
        text: 'No',
        onPress: () => console.log('No Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          console.log('Yes Pressed');
          let removed = recordsToShow.filter(record => {
            return record.id !== item.id;
          });
          setRecords(removed);
          removed = removed.map(item => item['title']);
          firebase
            .database()
            .ref('medicalrecords/' + user.uid)
            .set(removed);
        },
      },
    ]);
  }

  return (
    <KeyboardAvoidingView
      styles={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <Text style={styles.header}>Notes</Text>
      <FlatList
        nestedScrollEnabled={true}
        data={recordsToShow}
        renderItem={({item}) => (
          <Card style={styles.text}>
            <View>
              <TouchableOpacity onPress={() => handleDelete({item}['item'])}>
                <Text style={styles.button}>Delete</Text>
              </TouchableOpacity>
              <Text>{item.title}</Text>
            </View>
          </Card>
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
      <TouchableOpacity
        style={styles.inputText}
        onPress={() => handleSave({entry})}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

export default NotesScreen;
