import {Alert, Image, Platform, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {Button, TextInput} from 'react-native-paper';
import {launchImageLibrary} from 'react-native-image-picker';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import Geolocation from '@react-native-community/geolocation';

const CreatePost = ({route, navigation}) => {
  const {type} = route.params;
  const [ImageData, setImageData] = useState(null);
  const [user, setUser] = useState();
  let [FormData, setFormData] = useState({
    description: '',
    price: '0',
    imageUrl: '',
    date: '',
    user: '',
    whatsapp: '',
  });
  // Handle user state changes
  function onAuthStateChanged(User) {
    setUser(User);
    setFormData({
      ...FormData,
      user: User.displayName,
      date: Date.now(),
    });
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  let uploadPost = async () => {
    if (FormData.description.length === 0 || ImageData === null) {
      Alert.alert('Warning', 'Enter all required details');
      return;
    }
    const userDB = (
      await firestore().collection('users').doc(user.uid).get()
    ).data();
    const uri = ImageData.assets[0].uri;
    const filename = uri.substring(uri.lastIndexOf('/') + 1);
    const uploadUri = Platform.OS === 'ios' ? uri.replace('file://', '') : uri;
    await storage().ref(filename).putFile(uploadUri);
    let link = await storage().ref(filename).getDownloadURL();
    if (type === 'trash') {
      await firestore()
        .collection('requests')
        .add({...FormData, whatsapp: userDB.whatsapp, imageUrl: link});
      Alert.alert(
        'Message',
        'Collection request succesfully sent. Our volunteers will reach your doorstep.',
      );
    } else {
      await firestore()
        .collection('posts')
        .add({...FormData, whatsapp: userDB.whatsapp, imageUrl: link});
    }

    navigation.navigate('feed');
  };
  let options = {
    mediaType: 'photo',
    maxWidth: 300,
    maxHeight: 550,
    quality: 1,
  };
  return (
    <View style={styles.createPost}>
      {type !== 'trash' ? (
        <>
          <Text style={styles.header}>Donate/Sell {type}</Text>
          <Button
            onPress={async () => {
              await launchImageLibrary(options, response => {
                if (response.didCancel) {
                  Alert.alert('User cancelled camera picker');
                  return;
                } else if (response.errorCode === 'camera_unavailable') {
                  Alert.alert('Camera not available on device');
                  return;
                } else if (response.errorCode === 'permission') {
                  Alert.alert('Permission not satisfied');
                  return;
                } else if (response.errorCode === 'others') {
                  Alert.alert(response.errorMessage);
                  return;
                }
                setImageData(response);
              });
            }}>
            Upload Image
          </Button>
          {ImageData?.assets &&
            ImageData?.assets.map(uri => (
              <View key={uri} style={styles.imageContainer}>
                <Image
                  resizeMode="cover"
                  resizeMethod="scale"
                  style={styles.image}
                  source={uri}
                />
              </View>
            ))}
          <TextInput
            mode="outlined"
            multiline
            numberOfLines={6}
            value={FormData.description}
            onChangeText={t => setFormData({...FormData, description: t})}
            label={'Description'}
          />
          <View style={styles.PriceView}>
            <Text
              style={{
                color: '#000',
              }}>
              Price (0 for Free / Donation):
            </Text>
            <TextInput
              mode="outlined"
              value={FormData.price}
              onChangeText={t => setFormData({...FormData, price: t})}
              keyboardType="decimal-pad"
            />
          </View>
          <Button
            style={styles.postButton}
            onPress={uploadPost}
            mode="contained">
            Post
          </Button>
        </>
      ) : (
        <>
          <Text style={styles.header}>Create Request for Trash Collection</Text>
          <Button
            onPress={async () => {
              await launchImageLibrary(options, response => {
                if (response.didCancel) {
                  Alert('User cancelled camera picker');
                  return;
                } else if (response.errorCode === 'camera_unavailable') {
                  Alert('Camera not available on device');
                  return;
                } else if (response.errorCode === 'permission') {
                  Alert('Permission not satisfied');
                  return;
                } else if (response.errorCode === 'others') {
                  Alert(response.errorMessage);
                  return;
                }
                setImageData(response);
              });
            }}>
            Upload Image
          </Button>
          {ImageData?.assets &&
            ImageData?.assets.map(uri => (
              <View key={uri} style={styles.imageContainer}>
                <Image
                  resizeMode="cover"
                  resizeMethod="scale"
                  style={styles.image}
                  source={uri}
                />
              </View>
            ))}
          <TextInput
            mode="outlined"
            multiline
            numberOfLines={6}
            value={FormData.description}
            onChangeText={t => setFormData({...FormData, description: t})}
            label={'Notes'}
          />
          <Button
            style={styles.postButton}
            onPress={uploadPost}
            mode="contained">
            Send Request
          </Button>
        </>
      )}
    </View>
  );
};

export default CreatePost;

const styles = StyleSheet.create({
  createPost: {
    height: '100%',
    padding: 10,
  },
  header: {
    padding: 20,
    fontSize: 30,
    color: '#222',
    fontWeight: '800',
  },
  PriceView: {
    width: '75%',
    marginTop: 10,
    justifyContent: 'space-around',
    flexDirection: 'row',
    alignItems: 'center',
    // marginLeft: 'auto',
  },
  postButton: {
    marginTop: 30,
  },
  imageContainer: {
    marginVertical: 24,
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
});
