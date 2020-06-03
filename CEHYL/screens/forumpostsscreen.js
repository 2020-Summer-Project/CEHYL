import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Alert,
} from 'react-native';
import {useTheme} from '@react-navigation/native';
import Card from '../components/card';
import {getAllPosts} from '../API/database';
import moment from 'moment';

export default function ForumPostsScreen({navigation}) {
  const {container, headerWithNoMargin} = useTheme();
  const [data, setData] = useState([]);
  const [isRefreshing, setLoading] = useState(false);

  const styles = StyleSheet.create({
    title: {
      color: 'white',
    },
    timestamp: {
      flex: 1,
      fontSize: 18,
      textAlign: 'right',
    },
    postTitleContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    postTitle: {
      fontSize: 22,
      flex: 2,
      flexWrap: 'wrap',
      width: '80%',
    },
    postDescription: {
      flexWrap: 'wrap',
      flex: 1,
      fontSize: 17,
    },
    descriptionContainer: {
      marginTop: 10,
    },
    post: {
      flexDirection: 'column',
      width: (Dimensions.get('window').width * 80) / 100,
      height: 'auto',
      padding: 10,
    },
  });

  function processData(data) {
    try {
      var originalData = data;
      var processedData = [];
      var id = 0;
      Object.entries(originalData).forEach(([userId, UserPosts]) => {
        Object.entries(UserPosts).forEach(([timstamp, individualPost]) => {
          processedData.push({
            title: individualPost.title,
            description: individualPost.description,
            timestamp: individualPost.timestamp,
            id: id.toString(),
          });
          id++;
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
      setLoading(true);
      const result = await getAllPosts();
      processData(result);
      setLoading(false);
    } catch (err) {
      console.log(err);
      Alert.alert(
        'Failed to retrieve posts!',
        'Please pull to refresh the list!',
      );
    }
  };

  useEffect(() => {
    updatePostList();
  }, []);

  return (
    <View style={{...container, paddingTop: 0}}>
      <Text style={{...headerWithNoMargin, ...styles.title}}>Posts</Text>
      <FlatList
        data={data}
        onRefresh={updatePostList}
        refreshing={isRefreshing}
        renderItem={({item}) => (
          <Card style={styles.post}>
            <View style={styles.postTitleContainer}>
              <Text style={styles.postTitle}>{item.title}</Text>
              <Text style={styles.timestamp}>{item.timestamp}</Text>
            </View>
            <View style={styles.descriptionContainer}>
              <Text style={styles.postDescription}>{item.description}</Text>
            </View>
          </Card>
        )}
      />
    </View>
  );
}
