import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ImageBackground, Vibration , ScrollView} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { TabContext } from '../navigation/navigation';
import BackArrowSvg from '../../assets/svg/back-button.svg'
import { getAsyncStorageItem, setAsyncStorage } from '../utils/async-storage';
import { Questions } from '../constants/questions';

export default function LighthouseQuiz({ navigation }: any) {
  const { routeName, setRouteName } = useContext(TabContext);
  const { isVibro, setIsVibro } = useContext(TabContext);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [rightAnswers, setRightAnswers] = useState<number>(0);
  const [isCongrats, setCongrats] = useState<boolean>(false);
  const [coins, setCoins] = useState<string>('')
  const [isPressedButton, setPressedButton] = useState<number | null>(null)
  const [buttonFontSize, setButtonFontSize] = useState<number>(20)

  const handleAnswerPress = async(index: number) => {
    if (index === Questions[currentQuestion].correctOption) {
      setCoins((+coins + 100).toString());
      setRightAnswers(rightAnswers + 1)
    } else {
      if (isVibro) {
        Vibration.vibrate(300);
      }
      setCoins((+coins - 50).toString());
    }

    if (currentQuestion < Questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setCongrats(true)
    }
  };

  useEffect(() => {
    (async () => {
      const currentCoins = await getAsyncStorageItem('coins');
        if (currentCoins) {
          await setAsyncStorage('coins', coins.toString());
        }
    })();
  }, [coins]);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        const currentCoins = await getAsyncStorageItem('coins');
        if (currentCoins) {
          setCoins(currentCoins);
          await setAsyncStorage('coins', currentCoins);
        } else {
          setCoins('1550')
          await setAsyncStorage('coins', '1550');
        }
      })();
      setRouteName('lighthouse-quiz')
      setCurrentQuestion(0)
      setRightAnswers(0)
    }, []),
  );

  return (
    <ImageBackground
      source={require('../../assets/png/background.png')}
      resizeMode='cover'
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{alignItems:'center',justifyContent:'center'}}>
          <View
            style={styles.header}
          >
            <Pressable
              onPress={() => navigation.navigate('Home')}
            >
              <Image style={{ width: 24, height: 24 }} source={require('../../assets/svgtopng/back-button.png')} />
            </Pressable>
            <Text
              style={styles.mainText}
            >
              lighthouse quiz
            </Text>
          </View>
          {!isCongrats ?
            <View
              style={styles.container}
            >
              <Text
                style={styles.text}
              >
                {Questions[currentQuestion].question}
              </Text>
              <Image
                source={Questions[currentQuestion].image}
                style={{
                  width: 60,
                  height: 160,
                  marginBottom: 40,
                }}
              />
              {Questions[currentQuestion].options.map((option, index) => (
                <Pressable
                  key={index}
                  onPress={() => handleAnswerPress(index)}
                  onPressIn={() => setPressedButton(index)}
                  onPressOut={() => setPressedButton(null)}
                >
                  <ImageBackground
                    source={require('../../assets/png/variant.png')}
                    style={{
                      width: 300,
                      height: 70,
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: 30,
                    }}
                  >
                    <Text
                      style={[styles.buttonText, { fontSize: isPressedButton !== index ? 14 : 11 }]}
                    >
                      {option}
                    </Text>
                  </ImageBackground>
                </Pressable>
              ))}
            </View>
            :
            <View
              style={styles.container}
            >
              <Text
                style={styles.text}
              >
                Congratulations! Your result:
              </Text>
              <Image
                source={require('../../assets/png/congrats.png')}
                style={{
                  width: 200,
                  height: 200,
                  marginBottom: 40,
                }}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center'
                }}
              >
                <Text
                  style={{
                    fontFamily: 'GUERRILLA-Normal',
                    fontSize: 34,
                    textTransform: 'uppercase',
                    color: '#F9F9F9',
                  }}
                >
                  {rightAnswers}/
                </Text>
                <Text
                  style={{
                    fontFamily: 'GUERRILLA-Normal',
                    fontSize: 16,
                    textTransform: 'uppercase',
                    color: '#F9F9F9',
                  }}
                >
                  8
                </Text>
              </View>
              <Pressable
                onPress={() => {
                  setCongrats(false),
                    setCurrentQuestion(0)
                  setRightAnswers(0)
                }}
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
                    Try again
                  </Text>
                </ImageBackground>
              </Pressable>
            </View>
          }
          <View style={{height:150}}></View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    //paddingHorizontal: 30,
  },
  header: {
    paddingTop: 60,
    height: 110,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  mainText: {
    fontFamily: 'GUERRILLA-Normal',
    fontSize: 36,
    textTransform: 'uppercase',
    color: '#F9F9F9',
    marginLeft: 24
  },
  text: {
    fontFamily: 'GUERRILLA-Normal',
    fontSize: 16,
    lineHeight: 19,
    textTransform: 'uppercase',
    color: '#F9F9F9',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonText: {
    fontFamily: 'GUERRILLA-Normal',
    lineHeight: 19,
    textTransform: 'uppercase',
    color: '#F9F9F9',
    textAlign: 'center'
  },
});