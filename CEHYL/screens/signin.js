import React from 'react';
import {Button, View, TextInput, Text} from 'react-native';
import {AuthContext} from '../providers/authprovider';
import SignUpScreen from './signup';

function SignInScreen({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const {signIn} = React.useContext(AuthContext);

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Sign In" onPress={() => signIn({email, password})} />
      <Button
        title="Register Here"
        onPress={() => navigation.navigate('SignUp')}
      />
      <Button
        title="Forgot your password? Reset it here."
        onPress={() => navigation.navigate('ResetPassword')}
      />
    </View>
  );
}

export default SignInScreen;
