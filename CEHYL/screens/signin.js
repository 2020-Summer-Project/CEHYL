import React from 'react';
import {Text, View, TextInput, TouchableOpacity} from 'react-native';
import {AuthContext} from '../providers/authprovider';
import {styles} from '../styles/signinstyle';
import {MyTheme} from '../theme/maintheme';

function SignInScreen({navigation}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const {signIn} = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        textContentType="emailAddress"
        placeholderTextColor="white"
      />
      <TextInput
        style={styles.textInput}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        textContentType="password"
        placeholderTextColor="white"
        secureTextEntry
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => signIn({email, password})}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('SignUp')}>
        <Text style={styles.buttonText}>Register Here</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ResetPassword')}>
        <Text style={styles.buttonText}>Reset password</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SignInScreen;
