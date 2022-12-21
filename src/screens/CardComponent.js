import {Alert, Image, Linking, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import {Button} from 'react-native-paper';

const CardComponent = ({author, image, date, description, price, whatsapp}) => {
  let openWhatsapp = () => {
    let url =
      'whatsapp://send?text=' +
      'Hey, Nice Deal. Found this on CBT App' +
      '&phone=91' +
      whatsapp;
    Linking.openURL(url)
      .then(data => {
        console.log('WhatsApp Opened successfully ' + data);
      })
      .catch(() => {
        Alert.alert('', 'Make sure WhatsApp installed on your device');
      });
  };
  return (
    <View style={styles.Card}>
      <View style={styles.postHeader}>
        <Icon name="ios-person-circle-outline" color={'#181818'} size={35} />
        <View>
          <Text
            style={[
              styles.text,
              {
                marginLeft: 20,
              },
            ]}>
            {author}
          </Text>
          <Text style={styles.Date}>Posted on {date}</Text>
        </View>
      </View>
      <Text style={styles.description}>{description}</Text>
      <Text style={styles.price}>Price: {price}₹</Text>
      <View style={styles.imageContainer}>
        <Image
          resizeMode="cover"
          resizeMethod="resize"
          style={styles.image}
          source={{
            uri: image,
          }}
        />
      </View>
      <Button
        onPress={openWhatsapp}
        textColor="#fff"
        buttonColor="#075E54"
        mode="elevated">
        <Icon name="logo-whatsapp" size={20} />
        Contact Through Whatsapp
      </Button>
    </View>
  );
};

export default CardComponent;

const styles = StyleSheet.create({
  Card: {
    padding: 10,
    backgroundColor: '#fff',
    width: '80%',
    marginHorizontal: '10%',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
    marginVertical: 20,
    borderRadius: 10,
  },
  text: {
    color: '#000',
    fontSize: 20,
  },
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
  },
  imageContainer: {
    marginVertical: 24,
    alignItems: 'center',
  },
  description: {
    marginVertical: 10,
    color: '#333',
  },
  price: {
    color: '#000',
    fontWeight: '900',
  },
  Date: {
    marginLeft: 20,
    color: '#2344',
  },
});
