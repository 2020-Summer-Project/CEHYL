import React from 'react';
import {Button, View, TextInput} from 'react-native';
import {AuthContext} from '../providers/authprovider';

function SignUpScreen() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const {signUp} = React.useContext(AuthContext);

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign Up" onPress={() => signUp({email, password})} />
    </View>
  );
}

export default SignUpScreen;
