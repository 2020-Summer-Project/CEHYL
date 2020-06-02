import firebase from '../Firebase';

function uploadImage(imageRef, image) {
  var storageRef = firebase.storage().ref();
  var uploadTask = storageRef.child(imageRef).put(image);
  var imageURL = '';

  uploadTask.on(
    firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
    function(snapshot) {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case firebase.storage.TaskState.PAUSED: // or 'paused'
          console.log('Upload is paused');
          break;
        case firebase.storage.TaskState.RUNNING: // or 'running'
          console.log('Upload is running');
          break;
      }
    },
    function(error) {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          console.log('User do not have permission to access');
          break;

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          console.log('Unknown error occurs');
          break;
      }
    },
    function() {
      // Upload completed successfully, now we can get the download URL
      uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
        console.log('File available at', downloadURL);
        imageURL = downloadURL;
      });
    },
  );

  return imageURL;
}

export function uploadPostImage(userId, timestamp, imageName, image) {
  const imageRef = 'Post/' + userId + '/' + timestamp + '/' + imageName;
  const imageURL = uploadImage(imageRef, image);
  return imageURL;
}

function deleteImage(imageRef) {
  var storageRef = firebase.storage().ref();
  var imageRef = storageRef.child(imageRef);
  imageRef
    .delete()
    .then(function() {
      console.log('Image has been deleted successfully');
    })
    .catch(function(error) {
      console.log('Unable to delete the image at: ' + imageRef);
    });
}

export function deletePostImage(userId, timestamp) {
  const imageRef = 'Post/' + userId + '/' + timestamp;
  deleteImage(imageRef);
}
