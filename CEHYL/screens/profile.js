import React, {useEffect} from 'react';
import {TouchableOpacity, View, TextInput, Text, Alert} from 'react-native';
import firebase from '../Firebase';
import {useTheme} from '@react-navigation/native';

function ProfileScreen({navigation}) {
  var user = firebase.auth().currentUser;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState('0');
  const [gender, setGender] = React.useState('');
  const [editable, setFields] = React.useState(false);
  const {button, textInput, buttonText, container} = useTheme();

  function defaultProfile() {
    try {
      setPassword(user.password);
      firebase
        .database()
        .ref('users/' + user.uid)
        .once('value')
        .then(function(snapshot) {
          setAge(snapshot.val().age);
          setEmail(snapshot.val().email);
          setGender(snapshot.val().gender);
          setName(snapshot.val().name);
        });
    } catch (error) {
      Alert.alert(error);
    }
  }

  async function updateProfile(email, password, name, age, gender) {
    await firebase
      .database()
      .ref('users/' + user.uid)
      .set({
        email: email,
        age: age,
        gender: gender,
        name: name,
      });
    await user.updateEmail(email);
    await user.updatePassword(password);
    setFields(false);
  }

  useEffect(() => defaultProfile(), []);

  return (
    <View style={container}>
      <TextInput
        style={textInput}
        editable={editable}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        textContentType="emailAddress"
        placeholderTextColor="white"
      />
      {editable && (
        <TextInput
          style={textInput}
          editable={editable}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          textContentType="password"
          placeholderTextColor="white"
          secureTextEntry
        />
      )}
      <TextInput
        style={textInput}
        editable={editable}
        placeholder="Name"
        value={name}
        onChangeText={setName}
        textContentType="name"
        placeholderTextColor="white"
      />
      <TextInput
        style={textInput}
        editable={editable}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        placeholderTextColor="white"
        keyboardType="numeric"
      />
      <TextInput
        style={textInput}
        editable={editable}
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
        placeholderTextColor="white"
      />
      {editable ? (
        <TouchableOpacity
          style={button}
          onPress={() => updateProfile(email, password, name, age, gender)}>
          <Text style={buttonText}>Save</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={button} onPress={() => setFields(true)}>
          <Text style={buttonText}>Edit</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

export default ProfileScreen;
