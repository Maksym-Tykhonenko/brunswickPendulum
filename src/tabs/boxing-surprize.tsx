import React, { useContext, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ImageBackground, ScrollView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { TabContext } from '../navigation/navigation';
import BackArrowSvg from '../../assets/svg/back-button.svg'
import Box from '../../assets/svg/box.svg'
import OpenBox from '../../assets/svg/open-box.svg'
import FullStars from '../../assets/svg/full-stars.svg'
import EmptyStars from '../../assets/svg/empty-stars.svg'
import Lock from '../../assets/svg/lock.svg'
import { getAsyncStorageItem, setAsyncStorage } from '../utils/async-storage';
import { Dimensions } from 'react-native';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const images = [
  require('../../assets/png/lifebuoy.png'),
  require('../../assets/png/ship-rudder.png'),
  require('../../assets/png/anchor.png'),
  require('../../assets/png/captain-hat.png'),
  require('../../assets/png/yacht.png'),
  require('../../assets/png/spyglass.png'),
  require('../../assets/png/compass.png'),
  require('../../assets/png/treasure.png'),
  require('../../assets/png/map.png'),
];

export default function BoxingSurprize({ navigation }: any) {
  const { routeName, setRouteName } = useContext(TabContext);
  const [openedImages, setOpenedImages] = useState<number[]>([]);
  const [canOpen, setCanOpen] = useState<boolean>(false);
  const [isContinue, setIsContinue] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [buttonFontSize, setButtonFontSize] = useState<number>(20)

  const checkLastOpened = async () => {
    const today = new Date().toDateString();
    const lastOpened = await getAsyncStorageItem('lastOpened');
    const storedImages = await getAsyncStorageItem('openedImages');
    const openedImagesArray = storedImages ? JSON.parse(storedImages) : [];

    setOpenedImages(openedImagesArray);

    if (lastOpened !== today && openedImagesArray.length < images.length) {
      setCanOpen(true);
    } else {
      setIsContinue(true)
    }
  };

  const openBox = async () => {
    let newImageIndex;
    do {
      newImageIndex = Math.floor(Math.random() * images.length);
      setSelectedImage(newImageIndex);
    } while (openedImages.includes(newImageIndex));

    const updatedOpenedImages = [...openedImages, newImageIndex];
    setOpenedImages(updatedOpenedImages);
    await setAsyncStorage('openedImages', JSON.stringify(updatedOpenedImages));

    const today = new Date().toDateString();
    await setAsyncStorage('lastOpened', today);
    setCanOpen(false);
  };

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        
      })();
      setRouteName('boxing-surprize')
      checkLastOpened();
    }, []),
  );

  return (
    <ImageBackground
      source={require('../../assets/upgrDiz/bcgr.png')}
      resizeMode='cover'
      style={styles.container}
    >
      <View
        style={styles.header}
      >
        <Pressable
          onPress={() => {
            navigation.navigate('Home')
          }} 
        >
          <Image style={{width:24, height:24}} source={require('../../assets/svgtopng/back-button.png')}/>
        </Pressable>
        <Text
          style={styles.mainText}
        >
          Boxing Surprise
        </Text>
      </View>
      <Text
        style={styles.text}
      >
        Open the box every day to collect all the items
      </Text>
      {!isContinue ? 
        <View
          style={{alignItems: 'center'}}
        >
          <ScrollView>
            <View style={styles.box}>
            {!canOpen ? (
              <View>
                <Image style={{width:220, height:220}} source={require('../../assets/svgtopng/open-box.png')}/>
                <Image source={images[selectedImage]} style={styles.img} />
              </View>
            ) : (
              <Image style={{width:220, height:220}} source={require('../../assets/svgtopng/box.png')}/>
            )}
          </View>
          <Pressable
            onPress={() => canOpen ? openBox() : setIsContinue(true)}
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
              {canOpen ?
                <Text style={[styles.buttonText, {fontSize: buttonFontSize}]}>
                  OPEN THE BOKS
                </Text>
                :
                <Text style={[styles.buttonText, {fontSize: buttonFontSize}]}>
                  continue
                </Text>
              }
            </ImageBackground>
          </Pressable>
          </ScrollView>
          
        </View>
        :
        <View style={styles.grid}>
          {openedImages.map((imgIndex) => (
            <View 
              key={imgIndex}
              style={{
                alignItems: 'center',
                marginBottom: 60,
              }}
            >
                
            
              <Image source={images[imgIndex]} style={styles.openImage} />
              <Image style={{width:84, height:24}} source={require('../../assets/svgtopng/full-stars.png')}/>
            </View>
          ))}
          {Array.from({ length: 9 - openedImages.length }).map((_, index) => (
            <View 
              key={`lock-${index}`}
              style={{
                marginBottom: 60,
                alignItems: 'center',
              }}
            >
              <Image style={styles.openImage} source={require('../../assets/svgtopng/lock.png')}/>
              
              
              <Image style={{width:84, height:24}} source={require('../../assets/svgtopng/empty-stars.png')}/>
            </View>
          ))}

         
        </View>
      }
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
  image: {
    width: 59,
    height: 59,
    resizeMode: 'contain',
  },
  buttonText: {
    fontFamily: 'GUERRILLA-Normal',
    lineHeight: 24,
    textTransform: 'uppercase',
    color: '#F9F9F9',
  },
  img: {
    position: 'absolute',
    width: 80,
    height: 80,
    left: 140,
    top: -20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: windowWidth
  },
  openImage: {
    width: 80,
    height: 80,
    marginHorizontal: 20,
  },
  box:{}
});