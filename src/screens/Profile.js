import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import auth from '@react-native-firebase/auth';
import {Button} from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';

const Profile = () => {
  let Signout = () => {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  };
  return (
    <View style={styles.profile}>
      <View>
        <Icon name="ios-person-circle-outline" size={100} color={'#475A8A'} />
        <Text style={styles.Name}>{auth().currentUser.displayName}</Text>
        <Button style={styles.postButton} onPress={Signout} mode="contained">
          Sign Out
        </Button>
      </View>
      <View>
        <Text style={styles.Text}>Help Centre: +91 12345 67890</Text>
        <Image
          resizeMode="center"
          resizeMethod="resize"
          style={styles.MIILogo}
          source={{
            uri: 'http://www.pngimagesfree.com/LOGO/M/Make-in-India/Make-in%20India-Logo-PNG-HD-Transparent.png',
          }}
        />
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  profile: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  Name: {
    fontSize: 30,
    color: '#010',
    marginVertical: 10,
    fontWeight: '800',
  },
  Text: {
    color: '#000',
  },
  MIILogo: {
    width: 150,
    height: 150,
  },
});
