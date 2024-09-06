import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ImageBackground, SafeAreaView, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { TabContext } from '../navigation/navigation';
//import Whale from '../../assets/svg/whale.svg'
// 
// ../../assets/bcgr.png


export default function Welcome({ navigation }: any) {
  const { routeName, setRouteName } = useContext(TabContext);
  const [step, setStep] = useState<string>('1')
  const [buttonFontSize, setButtonFontSize] = useState<number>(20)

  useFocusEffect(
    React.useCallback(() => {
      setRouteName('welcome')
    }, []),
  );

  return (
    <ImageBackground
      source={require('../../assets/upgrDiz/bcgr.png')}
      resizeMode='cover'
      style={styles.container}>
      <ScrollView>
        <View style={{alignItems:'center', justifyContent:'center'}}>
          {step === '1' ?
            <SafeAreaView
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={styles.mainText}
              >
                Welcome to Brunswick Pendulum! Collect objects, guess what's in the picture and get new challenges. Test your abilities, show observation and intelligence, and prove that you are a real expert in the world of riddles and secrets.   With each level, the tasks become more difficult, and the challenges are even more exciting.  Ready to start this interesting journey?  Then go ahead!
              </Text>
              <Image
                style={{ width: 200, height: 200 }}
                source={require('../../assets/png/whale.png')}
              />
            </SafeAreaView>
            :
            <SafeAreaView
              style={{
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <Text
                style={styles.mainText}
              >
                You have already taken the first step into the wonderful world of mysteries and secrets.  Various levels with unpredictable challenges await you ahead.  The more levels you complete, the more experience and rewards await you.  Remember: the main thing here is not to rush, but to enjoy the process and discover something new for yourself at every step.  Ready for the next challenge?  Then go ahead, to new victories!
              </Text>
              <Image
                source={require('../../assets/png/pendulum-bg.png')}
                style={{ width: 200, height: 200 }}
              />
            </SafeAreaView>
          }
          <Pressable
            onPress={() => step === '1' ? setStep('2') : navigation.navigate('Home')}
            style={{ marginTop: 50 }}
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
              <Text style={[styles.buttonText, { fontSize: buttonFontSize }]}>
                continue
              </Text>
            </ImageBackground>
          </Pressable>
          <View style={{height:200}}></View>
        </View>
      </ScrollView>
      
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  mainText: {
    fontFamily: 'GUERRILLA-Normal',
    fontSize: 20,
    lineHeight: 24,
    textTransform: 'uppercase',
    color: '#F9F9F9',
    textAlign: 'center',
    marginBottom: 10,
  },
  buttonText: {
    fontFamily: 'GUERRILLA-Normal',
    lineHeight: 24,
    textTransform: 'uppercase',
    color: '#F9F9F9',
  }
});