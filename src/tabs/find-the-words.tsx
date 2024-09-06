import React, { useContext, useState } from 'react';
import { View, Text, StyleSheet, ImageBackground, Pressable ,Image} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import BackArrowSvg from '../../assets/svg/back-button.svg';
import { TabContext } from '../navigation/navigation';

const GRID_SIZE = { rows: 6, cols: 8 };
const WORDS = ['SEA', 'SIGNAL', 'PORT', 'TOWER', 'ROCK', 'STORM']; 

const createEmptyGrid = () => {
  return Array.from({ length: GRID_SIZE.rows }, () =>
    Array.from({ length: GRID_SIZE.cols }, () => '')
  );
};

const placeWordsInGrid = (grid: string[][], words: string[]) => {
  words.forEach((word) => {
    let placed = false;
    while (!placed) {
      const row = Math.floor(Math.random() * GRID_SIZE.rows);
      const col = Math.floor(Math.random() * GRID_SIZE.cols);
      const direction = Math.random() > 0.5 ? 'HORIZONTAL' : 'VERTICAL';

      if (canPlaceWord(grid, word, row, col, direction)) {
        for (let i = 0; i < word.length; i++) {
          if (direction === 'HORIZONTAL') {
            grid[row][col + i] = word[i];
          } else {
            grid[row + i][col] = word[i];
          }
        }
        placed = true;
      }
    }
  });
};

const canPlaceWord = (
  grid: string[][],
  word: string,
  row: number,
  col: number,
  direction: 'HORIZONTAL' | 'VERTICAL'
) => {
  if (direction === 'HORIZONTAL') {
    if (col + word.length > GRID_SIZE.cols) return false;
    for (let i = 0; i < word.length; i++) {
      if (grid[row][col + i] !== '' && grid[row][col + i] !== word[i]) {
        return false;
      }
    }
  } else {
    if (row + word.length > GRID_SIZE.rows) return false;
    for (let i = 0; i < word.length; i++) {
      if (grid[row + i][col] !== '' && grid[row + i][col] !== word[i]) {
        return false;
      }
    }
  }
  return true;
};

const fillEmptySpaces = (grid: string[][]) => {
  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  for (let row = 0; row < GRID_SIZE.rows; row++) {
    for (let col = 0; col < GRID_SIZE.cols; col++) {
      if (grid[row][col] === '') {
        grid[row][col] = alphabet[Math.floor(Math.random() * alphabet.length)];
      }
    }
  }
};

export default function FindTheWords({ navigation }: any) {
  const { routeName, setRouteName } = useContext(TabContext);
  const [buttonFontSize, setButtonFontSize] = useState<number>(20);

  useFocusEffect(
    React.useCallback(() => {
      setRouteName('find-the-words');
    }, []),
  );

  const colors = ['#FAD833', '#3787E5', '#3357FF', '#E53738'];

  const initializeGame = () => {
    const newGrid = createEmptyGrid();
    placeWordsInGrid(newGrid, WORDS);
    fillEmptySpaces(newGrid);
    return newGrid;
  };

  const [grid, setGrid] = useState<string[][]>(initializeGame);
  const [foundWords, setFoundWords] = useState<
    { word: string; positions: { row: number; col: number }[]; color: string }[]
  >([]);
  const [currentSelection, setCurrentSelection] = useState<
    { row: number; col: number }[]
  >([]);
  const [highlightColorIndex, setHighlightColorIndex] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState<{ row: number; col: number }[]>([]);

  const handlePress = (row: number, col: number) => {
    const newSelection = [...currentSelection, { row, col }];
    setCurrentSelection(newSelection);
    setSelectedLetters(newSelection);

    for (let word of WORDS) {
      const positions = checkWordInGrid(grid, word, newSelection);
      if (positions) {
        const color = colors[highlightColorIndex % colors.length];
        setFoundWords((prevFoundWords) => [
          ...prevFoundWords,
          { word, positions, color },
        ]);
        setHighlightColorIndex((prevIndex) => prevIndex + 1);
        setCurrentSelection([]);
        return;
      }
    }

    if (newSelection.length > 0 && newSelection.length <= Math.max(...WORDS.map((word) => word.length))) {
      const lastSelection = newSelection[newSelection.length - 1];
      const lastLetterInWord = WORDS.some(word =>
        word.includes(grid[lastSelection.row][lastSelection.col])
      );

      if (!lastLetterInWord) {
        setCurrentSelection([]);
      }
    } else {
      setCurrentSelection([]);
    }
  };

  const checkWordInGrid = (
    grid: string[][],
    word: string,
    selection: { row: number; col: number }[]
  ): { row: number; col: number }[] | null => {
    if (selection.length !== word.length) return null;

    const directions = [
      { rowDir: 0, colDir: 1 },
      { rowDir: 1, colDir: 0 },
    ];

    for (const { rowDir, colDir } of directions) {
      const positions = [];
      for (let i = 0; i < word.length; i++) {
        const pos = selection[i];
        if (
          pos.row < 0 ||
          pos.row >= GRID_SIZE.rows ||
          pos.col < 0 ||
          pos.col >= GRID_SIZE.cols ||
          grid[pos.row][pos.col] !== word[i]
        ) {
          break;
        }
        positions.push({ row: pos.row, col: pos.col });
      }

      if (positions.length === word.length) {
        return positions;
      }
    }

    return null;
  };

  const resetGame = () => {
    const newGrid = initializeGame();
    setGrid(newGrid);
    setFoundWords([]);
    setCurrentSelection([]);
    setHighlightColorIndex(0);
    setSelectedLetters([]);
  };

  return (
    <ImageBackground
      source={require('../../assets/upgrDiz/bcgr.png')}
      resizeMode='cover'
      style={styles.container}
    >
      <View style={styles.header}>
        <Pressable onPress={() => navigation.navigate('Home')}>
         <Image style={{width:24, height:24}} source={require('../../assets/svgtopng/back-button.png')}/>
          
        </Pressable>
        <Text style={styles.mainText}>Find the words</Text>
      </View>
      <Text style={styles.text}>Collect 8 words</Text>
      <View>
        {grid.map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((letter, colIndex) => {
              let isHighlighted = false;
              let color = '#ddd';

              const currentPos = currentSelection.find(
                (pos) => pos.row === rowIndex && pos.col === colIndex
              );
              if (currentPos) {
                isHighlighted = true;
                color = '#FFD700';
              }

              foundWords.forEach((foundWord) => {
                if (
                  foundWord.positions.some(
                    (pos) => pos.row === rowIndex && pos.col === colIndex
                  )
                ) {
                  isHighlighted = true;
                  color = foundWord.color;
                }
              });

              return (
                <Pressable
                  key={colIndex}
                  onPress={() => handlePress(rowIndex, colIndex)}
                  style={styles.cell}
                >
                  <ImageBackground
                    source={require('../../assets/png/letter-cart.png')}
                    resizeMode='cover'
                    style={{
                      width: 40,
                      height: 40,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Text style={[styles.letter, { color: isHighlighted ? color : '#FFF' }]}>
                      {letter}
                    </Text>
                  </ImageBackground>
                </Pressable>
              );
            })}
          </View>
        ))}
      </View>
      <Pressable
        onPress={() => resetGame()}
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
            try again
          </Text>
        </ImageBackground>
      </Pressable>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  header: {
    paddingTop: 60,
    height: 110,
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
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
    marginBottom: 50,
  },
  row: {
    flexDirection: 'row',
  },
  cell: {
    width: 30,
    height: 30,
    margin: 7,
    justifyContent: 'center',
    alignItems: 'center',
  },
  letter: {
    fontSize: 18,
    fontFamily: 'GUERRILLA-Normal',
  },
  foundWordsContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  foundWordsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  foundWord: {
    fontSize: 14,
    marginVertical: 2,
  },
  buttonText: {
    fontFamily: 'GUERRILLA-Normal',
    lineHeight: 24,
    textTransform: 'uppercase',
    color: '#F9F9F9',
  },
});
