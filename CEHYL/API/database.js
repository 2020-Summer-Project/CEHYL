import firebase from '../Firebase';
import {getCurrentTimestamp} from '../API/timestamp';

async function writeData(ref, data) {
  await firebase
    .database()
    .ref(ref)
    .set(data);
}

export async function addPost(title, description) {
  var userId = firebase.auth().currentUser.uid;
  const timestamp = getCurrentTimestamp();
  var ref = 'post/' + userId + '/' + timestamp;
  var postInfo = {timestamp: timestamp, title: title, description: description};
  await writeData(ref, postInfo);
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

export async function getPosts() {
  var userId = firebase.auth().currentUser.uid;
  var ref = 'post/' + userId;
  const response = await firebase
    .database()
    .ref(ref)
    .once('value');
  return response.val();
}
