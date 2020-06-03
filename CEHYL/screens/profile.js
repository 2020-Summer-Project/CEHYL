import React, {useEffect} from 'react';
import {
  TouchableOpacity,
  ScrollView,
  TextInput,
  Text,
  Alert,
} from 'react-native';
import firebase from '../Firebase';
import {useTheme} from '@react-navigation/native';

function ProfileScreen({navigation}) {
  var user = firebase.auth().currentUser;
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [editable, setFields] = React.useState(false);
  const {
    button,
    textInput,
    buttonText,
    container,
    colors,
    headerWithNoMargin,
  } = useTheme();

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
    try {
      await user.updateEmail(email);
      if (password === undefined) {
        Alert.alert('Password cannot leave blank');
        return;
      }
      try {
        await user.updatePassword(password);
      } catch (err) {
        console.log(err);
        Alert.alert(err.message);
      }
      await firebase
        .database()
        .ref('users/' + user.uid)
        .set({
          email: email,
          age: age,
          gender: gender,
          name: name,
        });
      Alert.alert('Profile information has been updated!');
      setFields(false);
      setPassword('');
    } catch (error) {
      Alert.alert(error.message);
    }
  }

  useEffect(() => defaultProfile(), []);

  return (
    <ScrollView contentContainerStyle={{...container, paddingTop: 0}}>
      <Text style={headerWithNoMargin}>Profile</Text>
      <TextInput
        style={textInput}
        editable={editable}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        textContentType="emailAddress"
        placeholderTextColor={colors.textColor}
      />
      {editable && (
        <TextInput
          style={textInput}
          editable={editable}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          textContentType="password"
          placeholderTextColor={colors.textColor}
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
        placeholderTextColor={colors.textColor}
      />
      <TextInput
        style={textInput}
        editable={editable}
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        placeholderTextColor={colors.textColor}
        keyboardType="numeric"
      />
      <TextInput
        style={textInput}
        editable={editable}
        placeholder="Gender"
        value={gender}
        onChangeText={setGender}
        placeholderTextColor={colors.textColor}
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
    </ScrollView>
  );
}

export default ProfileScreen;
