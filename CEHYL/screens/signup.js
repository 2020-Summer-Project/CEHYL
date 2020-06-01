import React from 'react';
import {Button, View, TextInput} from 'react-native';
import {AuthContext} from '../providers/authprovider';

function SignUpScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [name, setName] = React.useState('');
  const [age, setAge] = React.useState(0);
  const [gender, setGender] = React.useState('');
  const {signUp} = React.useContext(AuthContext);

  return (
    <View>
      <TextInput placeholder="Full Name" value={name} onChangeText={setName} />
      <TextInput placeholder="Gender" value={gender} onChangeText={setGender} />
      <TextInput
        placeholder="Age"
        value={age}
        onChangeText={setAge}
        keyboardType={'number-pad'}
      />
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title="Sign Up"
        onPress={() => signUp({email, password, age, gender, name})}
      />
    </View>
  );
}

export default SignUpScreen;
