import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {useTheme} from '@react-navigation/native';

export default function CreatePostScreen({navigation}) {
  const {button, buttonText, container, header, textInput, colors} = useTheme();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const styles = StyleSheet.create({
    title: {
      color: 'white',
    },
    textBox: {
      backgroundColor: 'white',
      color: colors.text,
      fontSize: 16,
      textAlign: 'left',
    },
    description: {
      paddingBottom: '40%',
      textAlignVertical: 'top',
    },
    submit: {
      marginTop: 10,
    },
  });

  const handleSubmit = () => {};

  return (
    <View style={container}>
      <Text style={{...header, ...styles.title}}>Create a Post!</Text>
      <TextInput
        keyboardType="default"
        style={{...textInput, ...styles.textBox}}
        value={title}
        onChangeText={text => setTitle(text)}
        placeholder="Title"
      />
      <TextInput
        keyboardType="default"
        style={{...textInput, ...styles.description, ...styles.textBox}}
        value={description}
        multiline={true}
        onChangeText={text => setDescription(text)}
        placeholder="Description"
      />
      <TouchableOpacity
        style={{...button, ...styles.submit}}
        onPress={handleSubmit}>
        <Text style={buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}
