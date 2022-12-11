import {
  Image,
  Pressable,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
import WelcomeImage from '../images/welcome-0.png';
import LinearGradient from 'react-native-linear-gradient';
import Animated, {Keyframe} from 'react-native-reanimated';

const Welcome = () => {
  const keyframe = new Keyframe({
    0: {
      transform: [{translateX: -100}],
    },
    100: {
      transform: [{translateX: 0}],
    },
  });
  return (
    <SafeAreaView>
      <StatusBar translucent backgroundColor="transparent" />

      <View style={styles.WelcomeView}>
        <LinearGradient
          style={styles.bgdecoration}
          colors={['#E5BDF6', '#D8DEDE']}
        />
        {/* <View style={styles.bgdecoration} /> */}
        <View>
          <Text
            style={[
              styles.title,
              {
                fontSize: 40,
              },
            ]}>
            CBT
          </Text>
          <Text style={styles.title}>Cloths-Books-Trash Centre</Text>
        </View>
        <Animated.Image
          entering={keyframe}
          style={styles.ImageWelcome}
          source={WelcomeImage}
        />
        <View style={styles.buttonContainer}>
          <Pressable
            style={styles.Button}
            onPress={() => {
              console.log('Button Pressed');
            }}>
            <Text style={{color: '#000', fontSize: 18}}> Login </Text>
          </Pressable>
          <Pressable style={styles.Button}>
            <Text style={{color: '#000', fontSize: 18}}> Sign up </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  WelcomeView: {
    height: '100%',
    backgroundColor: '#fff',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    color: '#000',
    fontSize: 22,
    alignSelf: 'center',
  },
  ImageWelcome: {
    height: 250,
    width: 250,
  },
  bgdecoration: {
    height: '90%',
    width: '200%',
    backgroundColor: '#749',
    position: 'absolute',
    top: '-8%',
    left: '-60%',
    borderRadius: 999,
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    width: '70%',
    justifyContent: 'space-around',
  },
  Button: {
    backgroundColor: '#12E79B',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 10,
  },
});
