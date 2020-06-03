import firebase from '../Firebase';
import {getCurrentTimestamp} from '../API/timestamp';

async function writeData(ref, data) {
  await firebase
    .database()
    .ref(ref)
    .set(data);
}

export async function addPost(title, description) {
  try {
    var userId = firebase.auth().currentUser.uid;
    const timestamp = getCurrentTimestamp();
    var ref = 'post/' + userId + '/' + timestamp;
    var postInfo = {
      timestamp: timestamp,
      title: title,
      description: description,
    };
    await writeData(ref, postInfo);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

async function deleteData(ref) {
  await firebase
    .database()
    .ref(ref)
    .remove();
  console.log('Successfully delete post');
}

export async function deletePost(timestamp) {
  var userId = firebase.auth().currentUser.uid;
  var ref = 'post/' + userId + '/' + timestamp;
  await deleteData(ref);
}

export async function getAllPosts() {
  var ref = 'post/';
  const response = await firebase
    .database()
    .ref(ref)
    .once('value');
  return response.val();
}

export async function getUserPosts() {
  var userId = firebase.auth().currentUser.uid;
  var ref = 'post/' + userId;
  const response = await firebase
    .database()
    .ref(ref)
    .once('value');
  return response.val();
}
