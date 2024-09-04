import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ImageBackground } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { TabContext } from '../navigation/navigation';
import HomeSvg from '../../assets/svg/home.svg'
import CoinsSvg from '../../assets/svg/coins.svg'
import { getAsyncStorageItem, setAsyncStorage } from '../utils/async-storage';

export default function Home({ navigation }: any) {
  const { routeName, setRouteName } = useContext(TabContext);
  const [buttonFontSize, setButtonFontSize] = useState<number>(20)
  const [coins, setCoins] = useState<string>('')

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const currentCoins = await getAsyncStorageItem('coins');
        if (currentCoins) {
          setCoins(await getAsyncStorageItem('coins'));
          await setAsyncStorage('coins', currentCoins);
        } else {
          setCoins('1550')
          await setAsyncStorage('coins', '1550');
        }
      })();
      setRouteName('home')
    }, []),
  );

  return (
    <ImageBackground
      source={require('../../assets/png/background.png')}
      resizeMode='cover'
      style={styles.container}
    >
      <View
        style={styles.header}
      >
        <Image style={{width:24, height:24}} source={require('../../assets/svgtopng/home.png')}/>
        <View
          style={{flexDirection: 'row', alignItems: 'center'}}
        >
          <Text
            style={styles.coinsText}
          >
            {coins}
          </Text>
          <Image style={{width:24, height:24}} source={require('../../assets/svgtopng/coins.png')}/>
        </View>
      </View>
      <Text
        style={styles.mainText}
      >
        Brunswick Pendulum
      </Text>
      <Text
        style={styles.text}
      >
        Open the box every day to collect all the items
      </Text>
      <Image
        source={require('../../assets/png/pendulum.png')}
        style={{ width: 100, height: 180 }}
      />
      <Pressable
        onPress={() => navigation.navigate('BoxingSurprize')}
        style={{marginTop: 50}}
        onPressIn={() => setButtonFontSize(15)}
        onPressOut={() => setButtonFontSize(20)}
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
          <Text style={[styles.buttonText, {fontSize: buttonFontSize}]}>
            OPEN THE BOKS
          </Text>
        </ImageBackground>
      </Pressable>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  header: {
    justifyContent: 'space-between',
    height: 90,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 30,
  },
  mainText: {
    fontFamily: 'GUERRILLA-Normal',
    fontSize: 36,
    lineHeight: 43,
    textTransform: 'uppercase',
    color: '#F9F9F9',
    textAlign: 'center',
    marginBottom: 20,
  },
  text: {
    fontFamily: 'GUERRILLA-Normal',
    fontSize: 16,
    lineHeight: 19,
    textTransform: 'uppercase',
    color: '#F9F9F9',
    textAlign: 'center',
    marginBottom: 50,
  },
  buttonText: {
    fontFamily: 'GUERRILLA-Normal',
    lineHeight: 24,
    textTransform: 'uppercase',
    color: '#F9F9F9',
  },
  coinsText: {
    fontFamily: 'GUERRILLA-Normal',
    fontSize: 20,
    lineHeight: 24,
    color: '#F9F9F9',
    marginRight: 7,
  }
});