import React, {useState} from 'react';
import {View, Text, StyleSheet, FlatList, Dimensions} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Card from '../components/card';

export default function ForumPostsScreen({navigation}) {
  const {button, buttonText, container, header, textInput, colors} = useTheme();
  const [data, setData] = useState([{id: 'a'}, {id: 'b'}]);

  const styles = StyleSheet.create({
    title: {
      color: 'white',
    },
    post: {
      flexDirection: 'column',
      width: (Dimensions.get('window').width * 80) / 100,
      height: 'auto',
      padding: 10,
    },
  });

  return (
    <View style={container}>
      <Text style={{...header, ...styles.title}}>Posts</Text>
      <FlatList
        data={data}
        renderItem={({item}) => (
          <Card style={styles.post}>
            <View>
              <Text>Post title</Text>
            </View>
            <View>
              <Text>Post description</Text>
            </View>
          </Card>
        )}
      />
    </View>
  );
}
