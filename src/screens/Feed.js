import firestore from '@react-native-firebase/firestore';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {FAB} from 'react-native-paper';
import CardComponent from './CardComponent';
import CreatePost from './createPost';

const FeedHome = ({navigation}) => {
  const [OpenState, setOpenState] = useState(false);
  const [Posts, setPosts] = useState([]);
  const onFabOpen = () => {
    setOpenState(!OpenState);
  };
  const actions = [
    {
      label: 'Sell Book',
      icon: 'book',
      onPress: () =>
        navigation.navigate('createPost', {
          type: 'book',
        }),
    },
    {
      label: 'Trash Request',
      icon: 'trash-can',
      onPress: () =>
        navigation.navigate('createPost', {
          type: 'trash',
        }),
    },
  ];

  useEffect(() => {
    firestore()
      .collection('posts')
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(element => {
          var data = element.data();
          setPosts(arr => [...arr, data]);
        });
      });
    // console.log(Posts);
  }, []);
  return (
    <>
      <ScrollView style={styles.Feed}>
        {Posts.map(p => {
          let d = new Date(p.date).toLocaleDateString();
          return (
            <CardComponent
              key={p.date}
              author={p.user}
              image={p.imageUrl}
              date={d}
              description={p.description}
              price={p.price}
              whatsapp={p.whatsapp}
            />
          );
        })}

        {/* <FloatingAction
        actions={actions}
        onPressItem={name => {
          navigation.navigate('createPost', {
            type: name,
          });
        }}
      /> */}
      </ScrollView>
      <FAB.Group
        open={OpenState}
        visible
        onStateChange={onFabOpen}
        actions={actions}
        icon="plus"
        style={styles.fab}
      />
    </>
  );
};

const FeedPage = () => {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <NavigationContainer independent>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="feed" component={FeedHome} />
          <Stack.Screen name="createPost" component={CreatePost} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};

export default FeedPage;

const styles = StyleSheet.create({
  Feed: {
    height: '100%',
    backgroundColor: '#fff',
    paddingVertical: 20,
  },
});
