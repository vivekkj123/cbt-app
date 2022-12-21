import {
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import LinearGradient from 'react-native-linear-gradient';
import {firebase} from '@react-native-firebase/auth';

const SignIn = () => {
  const [FormData, setFormData] = useState({
    email: '',
    password: '',
  });
  let SignInApp = () => {
    firebase
      .auth()
      .signInWithEmailAndPassword(FormData.email, FormData.password);
  };
  return (
    <SafeAreaView>
      <StatusBar translucent backgroundColor="transparent" />
      <View style={styles.SignInView}>
        <LinearGradient
          style={styles.bgdecoration}
          colors={['#E5BDF6', '#D8DEDE']}
        />
        <View>
          <Text style={styles.Title}>Sign In</Text>
          <TextInput
            style={styles.Inputbox}
            placeholder="Email"
            keyboardType="email-address"
            value={FormData.email}
            onChangeText={t => setFormData({...FormData, email: t})}
            placeholderTextColor={'#444'}
          />
          <TextInput
            style={styles.Inputbox}
            placeholder="Password"
            secureTextEntry
            value={FormData.password}
            onChangeText={t => setFormData({...FormData, password: t})}
            placeholderTextColor={'#444'}
          />
        </View>
        <Pressable onPress={SignInApp} style={styles.Button}>
          <Text style={{color: '#000', fontSize: 18}}> Login </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  SignInView: {
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
