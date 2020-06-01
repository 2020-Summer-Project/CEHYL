import React, {useReducer, useEffect} from 'react';
import {Button, View, TextInput, Text, Alert} from 'react-native';
import firebase from '../Firebase';

function ProfileScreen({navigation}) {
  var user = firebase.auth().currentUser;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState(0);
  const [gender, setGender] = React.useState('');
  const [editable, setFields] = React.useState(false);

  async function defaultProfile() {
    try {
      console.log(user);
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
    <View>
      <TextInput
        editable={editable}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      {editable && (
        <TextInput
          editable={editable}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      )}
      <TextInput
        editable={editable}
        placeholder="Name"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        editable={editable}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
      />
      <TextInput
        editable={editable}
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
      />
      {editable ? (
        <Button
          title="Save"
          onPress={() => updateProfile(email, password, name, age, gender)}
        />
      ) : (
        <Button title="Edit" onPress={() => setFields(true)} />
      )}
    </View>
  );
}

export default ProfileScreen;
