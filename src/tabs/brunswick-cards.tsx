import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ImageBackground, Alert, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { TabContext } from '../navigation/navigation';
import BackArrowSvg from '../../assets/svg/back-button.svg'
import QuestionMarkSvg from '../../assets/svg/question-mark.svg'
import { getAsyncStorageItem, setAsyncStorage } from '../utils/async-storage';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const images = [
  require('../../assets/png/lifebuoy.png'),
  require('../../assets/png/ship-rudder.png'),
  require('../../assets/png/anchor.png'),
  require('../../assets/png/treasure.png'),
  require('../../assets/png/yacht.png'),
  require('../../assets/png/spyglass.png'),
];

const generateShuffledGrid = () => {
  const grid = [...images, ...images];
  for (let i = grid.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [grid[i], grid[j]] = [grid[j], grid[i]];
  }
  return grid.map(image => ({ image, isRevealed: false, isMatched: false }));
};

export default function BrunswickCards({ navigation }: any) {
  const { routeName, setRouteName } = useContext(TabContext);
  const [grid, setGrid] = useState(generateShuffledGrid());
  const [firstSelection, setFirstSelection] = useState(null);
  const [secondSelection, setSecondSelection] = useState(null);
  const [lockBoard, setLockBoard] = useState(false);
  const [coins, setCoins] = useState<string>('')

  const resetSelections = () => {
    setFirstSelection(null);
    setSecondSelection(null);
  };

  const handleTilePress = (index: any) => {
    if (lockBoard || grid[index].isRevealed || grid[index].isMatched) return;

    const newGrid = [...grid];
    newGrid[index].isRevealed = true;
    setGrid(newGrid);

    if (firstSelection === null) {
      setFirstSelection(index);
    } else {
      setSecondSelection(index);
    }
  };

  const checkIfWon = async() => {
    if (grid.every(tile => tile.isMatched)) {
      setCoins((+coins + 200).toString());
      Alert.alert("Congratulations!", "You've matched all the pictures!");
      navigation.navigate('Home')
      resetGame()
    }
  };

  const resetGame = () => {
    setGrid(generateShuffledGrid());
    resetSelections();
    setLockBoard(false);
  };

  useEffect(() => {
    (async () => {
      const currentCoins = await getAsyncStorageItem('coins');
        if (currentCoins) {
          await setAsyncStorage('coins', coins.toString());
        }
    })();
  }, [coins]);

  useEffect(() => {
    checkIfWon();
  }, [grid]);

  useEffect(() => {
    if (firstSelection !== null && secondSelection !== null) {
      if (grid[firstSelection].image === grid[secondSelection].image) {
        const newGrid = [...grid];
        newGrid[firstSelection].isMatched = true;
        newGrid[secondSelection].isMatched = true;
        setGrid(newGrid);
        resetSelections();
      } else {
        setLockBoard(true);
        setTimeout(() => {
          const newGrid = [...grid];
          newGrid[firstSelection].isRevealed = false;
          newGrid[secondSelection].isRevealed = false;
          setGrid(newGrid);
          resetSelections();
          setLockBoard(false);
        }, 1000);
      }
    }
  }, [secondSelection]);

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
      setRouteName('brunswick-cards')
    }, []),
  );

  return (
    <ImageBackground
      source={require('../../assets/png/background.png')}
      resizeMode='cover'
      style={styles.container}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{  }}>
          <View
            style={styles.header}
          >
            <Pressable
              onPress={() => {
                navigation.navigate('Home')
                resetGame()
              }}
            >
              <Image style={{ width: 24, height: 24 }} source={require('../../assets/svgtopng/back-button.png')} />
            </Pressable>
            <Text
              style={styles.mainText}
            >
              Brunswick cards
            </Text>
          </View>
          <Text
            style={styles.text}
          >
            Find a Pair to Things
          </Text>
          <View style={styles.grid}>
            {grid.map((tile, index) => (
              <Pressable
                key={index}
                onPress={() => handleTilePress(index)}
              >
                <ImageBackground
                  source={require('../../assets/png/cart.png')}
                  style={styles.tile}
                >
                  {tile.isRevealed || tile.isMatched ? (
                    <Image source={tile.image} style={styles.image} />
                  ) : (
                    <Image style={styles.image} source={require('../../assets/svgtopng/question-mark.png')} />
                  )}
                </ImageBackground>
              </Pressable>
            ))}
          </View>
          <View style={{ height: 150 }}></View>
        </View>
      </ScrollView>
      
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 10,
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
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    width: '100%'
  },
  tile: {
    width: windowWidth / 3 - 20, // Плитка займає третину екрану мінус відступ
    height: windowWidth / 3 - 20, // Висота така ж, як ширина для квадратних плиток
    margin: 5, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '70%', // Зменшили розмір зображення всередині плитки
    height: '70%',
    resizeMode: 'contain',
  },
  hiddenTile: {
    width: '100%',
    height: '100%',
    backgroundColor: '#aaa',
  },
});