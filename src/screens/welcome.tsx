import React from 'react';
import { Text, Image, StyleSheet, Pressable, ImageBackground } from 'react-native';

export default function Welcome({ navigation }: any) {

  return (
    <ImageBackground
      source={require('../../assets/upgrDiz/bcgr.png')}
      resizeMode='cover'
      style={styles.container}>
      <Image 
        source={require('../../assets/png/pendulum.png')}
        style={{ width: 190, height: 290 }}
      />
      <Text
        style={styles.mainText}
      >
        Brunswick Pendulum
      </Text>
      <Pressable
        onPress={() => navigation.navigate('Tabs')}
      >
        <ImageBackground
          source={require('../../assets/png/button3.png')}
          style={{ 
            width: 200,
            height: 76,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <Text style={styles.buttonText}>
            Start Research
          </Text>
        </ImageBackground>
      </Pressable>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 75,
  },
  mainText: {
    marginTop: 40,
    fontFamily: 'GUERRILLA-Normal',
    fontSize: 48,
    lineHeight: 58,
    textTransform: 'uppercase',
    color: '#F9F9F9',
    textAlign: 'center',
    marginBottom: 100,
  },
  buttonText: {
    fontFamily: 'GUERRILLA-Normal',
    fontSize: 20,
    lineHeight: 24,
    textTransform: 'uppercase',
    color: '#F9F9F9',
  }
});