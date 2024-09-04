import React, { useContext } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, ImageBackground,Image } from 'react-native';
import CloseSvg from '../../assets/svg/close-settings-btn.svg'
import SoundOffSvg from '../../assets/svg/sound-off.svg'
import SoundOnSvg from '../../assets/svg/sound-on.svg'
//import BottomSvg from '../../assets/svg/rectangle-bottom.svg'
import BottomSvg from '../../assets/svg/rectangle-bottom.svg'
import TopSvg from '../../assets/svg/rectangle-top.svg'
import { TabContext } from '../navigation/navigation';

export default function SettingsScreen({ visible, onClose }: any) {
  const { isSound, setIsSound } = useContext(TabContext);
  const { isVibro, setIsVibro } = useContext(TabContext);
  const { isNotification, setIsNotification } = useContext(TabContext);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <ImageBackground
          source={require('../../assets/png/frame.png')}
          resizeMode='cover'
          style={{
            height: 400,
            width: 340,
            paddingTop: 42,
            paddingHorizontal: 30,
          }}
        >
          <Pressable
            style={{
              position: 'absolute',
              right: 0,
              top: -20
            }}
            onPress={onClose}
          >
            <Image style={{width:32, height:32}} source={require('../../assets/svgtopng/close-settings-btn.png')}/>
          </Pressable>
          <Text
            style={styles.mainText}
          >
            Settings
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Text
              style={styles.text}
            >
              sound
            </Text>
            <Pressable
              onPress={() => setIsSound(!isSound)}
            >
              {isSound ?
                <Image style={{width:32, height:32}} source={require('../../assets/svgtopng/sound-on.png')}/>
                :
                <Image style={{width:32, height:32}} source={require('../../assets/svgtopng/sound-off.png')}/>
              }
            </Pressable>
          </View>
          <View
            style={{
              paddingVertical: 20,
              marginVertical: 20,
              borderTopWidth: 1,
              borderBottomWidth: 1,
              borderColor: '#FFF',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Text
              style={styles.text}
            >
              Vibration
            </Text>
            <Pressable
              onPress={() => setIsVibro(!isVibro)}
            >
              {isVibro ?
                <Image style={{width:32, height:32}} source={require('../../assets/svgtopng/sound-on.png')}/>
                :
                <Image style={{width:32, height:32}} source={require('../../assets/svgtopng/sound-off.png')}/>
              }
            </Pressable>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Text
              style={styles.text}
            >
              Notifications
            </Text>
            <Pressable
              onPress={() => setIsNotification(!isNotification)}
            >
              <View>
                <Image style={{width:32, height:32}} source={require('../../assets/svgtopng/rectangle-bottom.png')}/>
                <Image 
                  style={{
                    position: 'absolute',
                    right: isNotification ? 0 : 25
                  }}
                 source={require('../../assets/svgtopng/rectangle-top.png')}/>
              </View>
            </Pressable>
          </View>
        </ImageBackground>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  mainText: {
    fontFamily: 'GUERRILLA-Normal',
    fontSize: 36,
    lineHeight: 43,
    textTransform: 'uppercase',
    color: '#F9F9F9',
    textAlign: 'center',
    marginBottom: 40,
  },
  text: {
    fontFamily: 'GUERRILLA-Normal',
    fontSize: 20,
    lineHeight: 24,
    textTransform: 'uppercase',
    color: '#FFF',
  }
});
