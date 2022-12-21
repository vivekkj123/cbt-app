import {
  Alert,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

const SignUp = () => {
  const [FormValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    whatsapp: '',
  });

  let createUser = () => {
    if (
      FormValues.name.length === 0 ||
      FormValues.email.length === 0 ||
      FormValues.password.length === 0 ||
      FormValues.whatsapp.length === 0
    ) {
      Alert.alert('Warning', 'Please fill all required details');
      return;
    }
    auth()
      .createUserWithEmailAndPassword(FormValues.email, FormValues.password)
      .then(userCredential => {
        userCredential.user
          .updateProfile({
            displayName: FormValues.name,
          })
          .then(() => {
            delete FormValues.password;
            firestore()
              .collection('users')
              .doc(userCredential.user.uid)
              .set(FormValues);
          });
      })
      .then(() => {
        Alert.alert('Message', 'Account created Succesfully');
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('Error', 'That email address is already in use!');
        }
        if (error.code === 'auth/weak-password') {
          Alert.alert('Error', 'Password should be at least 6 characters');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('Error', 'That email address is invalid!');
        }

        console.error(error);
      });
  };
  return (
    <SafeAreaView>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.SignUpView}>
        <LinearGradient
          style={styles.bgdecoration}
          colors={['#E5BDF6', '#D8DEDE']}
        />
        <View>
          <Text style={styles.Title}>Sign Up</Text>
          <TextInput
            style={styles.Inputbox}
            value={FormValues.name}
            onChangeText={text => {
              setFormValues({...FormValues, name: text});
            }}
            placeholder="Full Name"
            placeholderTextColor={'#444'}
          />
          <TextInput
            style={styles.Inputbox}
            value={FormValues.email}
            onChangeText={text => {
              setFormValues({...FormValues, email: text});
            }}
            placeholder="Email"
            keyboardType="email-address"
            placeholderTextColor={'#444'}
          />
          <TextInput
            style={styles.Inputbox}
            value={FormValues.password}
            onChangeText={text => {
              setFormValues({...FormValues, password: text});
            }}
            placeholder="Password"
            secureTextEntry
            placeholderTextColor={'#444'}
          />
          <TextInput
            style={styles.Inputbox}
            value={FormValues.whatsapp}
            onChangeText={text => {
              setFormValues({...FormValues, whatsapp: text});
            }}
            placeholder="Whatsapp No."
            keyboardType="phone-pad"
            placeholderTextColor={'#444'}
          />
        </View>
        <Pressable onPress={createUser} style={styles.Button}>
          <Text style={{color: '#000', fontSize: 18}}> Sign Up </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  SignUpView: {
    height: '100%',
    width: '100%',
    backgroundColor: '#fff',
  },
  Title: {
    padding: 40,
    fontSize: 35,
    color: '#222',
    fontWeight: '800',
  },
  bgdecoration: {
    height: '90%',
    width: '200%',
    backgroundColor: '#749',
    position: 'absolute',
    top: '-15%',
    left: '-60%',
    borderRadius: 999,
  },
  Inputbox: {
    borderRadius: 10,
    borderColor: '#000',
    borderWidth: 1,
    padding: 10,
    marginHorizontal: 25,
    marginVertical: 18,
    color: '#000',
  },
  Button: {
    backgroundColor: '#12E79B',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: '25%',
    marginVertical: 100,
    width: '50%',
  },
});
