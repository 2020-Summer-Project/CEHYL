import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  FlatList,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import {addPost, getUserPosts, deletePost} from '../API/database';
import moment from 'moment';
import Card from '../components/card';
import {v4 as uuidv4} from 'uuid';
import {getCurrentTimestamp} from '../API/timestamp';

export default function CreatePostScreen({navigation}) {
  const {button, buttonText, container, header, textInput, colors} = useTheme();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [data, setData] = useState([]);

  const styles = StyleSheet.create({
    title: {
      color: 'white',
      marginTop: 10,
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
    postTitleContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    postTitle: {
      fontSize: 22,
    },
    descriptionContainer: {
      marginTop: 10,
      flexWrap: 'wrap',
    },
    post: {
      flexDirection: 'column',
      width: (Dimensions.get('window').width * 80) / 100,
      height: 'auto',
      padding: 10,
    },
    flatlist: {
      marginVertical: 10,
    },
    deletePost: {
      position: 'relative',
      bottom: -10,
      color: 'red',
      fontSize: 20,
    },
  });

  const handleSubmit = async () => {
    const timestamp = getCurrentTimestamp();
    const failTramission = await addPost(title, description, timestamp);
    if (failTramission) {
      Alert.alert('Fail transmission', 'Please resubmit the post again!');
    }

    var posts = data;
    posts.unshift({
      id: uuidv4(),
      title: title,
      description: description,
      timestamp: timestamp,
    });
    setData(posts);
    setDescription('');
    setTitle('');
    Alert.alert('Success', 'You have post successfully!');
  };

  function processData(data) {
    try {
      var originalData = data;
      var processedData = [];
      Object.entries(originalData).forEach(([timstamp, individualPost]) => {
        processedData.push({
          title: individualPost.title,
          description: individualPost.description,
          timestamp: individualPost.timestamp,
          id: uuidv4(),
        });
      });
      processedData.sort((a, b) => {
        return moment(a.timestamp, 'DD-MM-YYYY HH:mm:ss').isBefore(
          b.timestamp,
          'DD-MM-YYYY HH:mm:ss',
        )
          ? 1
          : -1;
      });
      setData(processedData);
    } catch (error) {
      console.log(error);
    }
  }

  const updatePostList = async () => {
    try {
      const result = await getUserPosts();
      processData(result);
    } catch (err) {
      console.log(err);
      Alert.alert(
        'Failed to retrieve posts!',
        'Please pull to refresh the list!',
      );
    }
  };

  const deleteItem = post => {
    deletePost(post.timestamp);
    var posts = data;
    setData(posts.filter(item => item.timestamp !== post.timestamp));
  };

  useEffect(() => {
    updatePostList();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={{
        alignItems: 'center',
      }}>
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

      {data.length !== 0 && (
        <Text style={{...header, ...styles.title}}>Your Posts</Text>
      )}
      <FlatList
        data={data}
        contentContainerStyle={styles.flatlist}
        renderItem={({item}) => (
          <Card style={styles.post}>
            <View style={styles.postTitleContainer}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text>{item.timestamp}</Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text>{item.description}</Text>
              <Text style={styles.deletePost} onPress={() => deleteItem(item)}>
                Delete
              </Text>
            </View>
          </Card>
        )}
      />
    </ScrollView>
  );
}
