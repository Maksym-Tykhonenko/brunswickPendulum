import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LighthouseQuiz from '../tabs/lighthouse-quiz';
import { View, Pressable, Image } from 'react-native';
import { createContext, useState } from 'react';
import ActiveLighthouseQuiz from '../../assets/svg/active-lighthouse-quiz.svg'
import ActiveBrunswickCards from '../../assets/svg/active-brunswick-cards.svg'
import ActiveBoxingSurprize from '../../assets/svg/active-boxing-surprize.svg'
import ActiveFindTheWords from '../../assets/svg/active-find.svg'
import NonActiveLighthouseQuiz from '../../assets/svg/nonactive-lighthouse-quiz.svg'
import NonActiveBrunswickCards from '../../assets/svg/nonactive-brunswick-cards.svg'
import NonActiveBoxingSurprize from '../../assets/svg/nonactive-boxing-surprize.svg'
import NonActiveFindTheWords from '../../assets/svg/nonactive-find.svg'
import NonActiveSettings from '../../assets/svg/nonactive-settings.svg'
import Welcome from '../tabs/welcome';
import Home from '../tabs/home';
import BrunswickCards from '../tabs/brunswick-cards';
import BoxingSurprize from '../tabs/boxing-surprize';
import SettingsScreen from '../tabs/settings';
import FindTheWords from '../tabs/find-the-words';

interface TabContextType {
  routeName: string;
  setRouteName: (name: string) => void;
  isSound: boolean,
  setIsSound: (name: boolean) => void;
  isVibro: boolean,
  setIsVibro: (name: boolean) => void;
  isNotification: boolean,
  setIsNotification: (name: boolean) => void;
}

export const TabContext = createContext<TabContextType>({
  routeName: '',
  setRouteName: () => {},
  isSound: false,
  setIsSound: () => {},
  isVibro: true,
  setIsVibro: () => {},
  isNotification: true,
  setIsNotification: () => {},
});

const Tab = createBottomTabNavigator();

export default function Tabs() {
  const [routeName, setRouteName] = useState<string>('')
  const [isSound, setIsSound] = useState<boolean>(false)
  const [isVibro, setIsVibro] = useState<boolean>(true)
  const [isNotification, setIsNotification] = useState<boolean>(true)
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalToggle = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <TabContext.Provider value={{ routeName, setRouteName, isSound, setIsSound, isVibro, setIsVibro, isNotification, setIsNotification }}>
      <Tab.Navigator
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'rgba(26, 26, 26, 0.6)',
          height: 82,
          paddingVertical: 20,
        },
        headerShown: false,
      }}
      >
        <Tab.Screen 
          name="Welcome"
          component={Welcome}
          options={{
            tabBarLabel: '',
            tabBarButton: () => null,
          }}
        />
        <Tab.Screen 
          name="Home"
          component={Home}
          options={{
            tabBarLabel: '',
            tabBarButton: () => null,
          }}
        />
        <Tab.Screen 
          name="LighthouseQuiz"
          component={LighthouseQuiz}
          options={{
            tabBarLabel: '',
            tabBarIcon: () => (
              <View>
               
                {routeName === 'lighthouse-quiz' ?
                  
                  <Image style={{width:32, height:32}} source={require('../../assets/svgtopng/active-lighthouse-quiz.png')}/>
                  :
                  <Image style={{width:32, height:32}} source={require('../../assets/svgtopng/nonactive-lighthouse-quiz.png')}/>
                }
              </View>
            )
          }}
        />
        <Tab.Screen 
          name="BrunswickCards"
          component={BrunswickCards}
          options={{
            tabBarLabel: '',
            tabBarIcon: () => (
              <View>
                {routeName === 'brunswick-cards' ?
                  <Image style={{width:32, height:32}} source={require('../../assets/svgtopng/active-brunswick-cards.png')}/>
                  :
                  <Image style={{width:32, height:32}} source={require('../../assets/svgtopng/nonactive-brunswick-cards.png')}/>
                }
              </View>
            )
          }}
        />
        <Tab.Screen 
          name="BoxingSurprize"
          component={BoxingSurprize}
          options={{
            tabBarLabel: '',
            tabBarIcon: () => (
              <View>
                {routeName === 'boxing-surprize' ?
                  <Image style={{width:32, height:32}} source={require('../../assets/svgtopng/active-boxing-surprize.png')}/>
                  :
                  <Image style={{width:32, height:32}} source={require('../../assets/svgtopng/nonactive-boxing-surprize.png')}/>
                }
              </View>
            )
          }}
        />
        <Tab.Screen 
          name="FindTheWords"
          component={FindTheWords}
          options={{
            tabBarLabel: '',
            tabBarIcon: () => (
              <View>
                {routeName === 'find-the-words' ?
                  <Image style={{width:32, height:32}} source={require('../../assets/svgtopng/active-find.png')}/>
                  :
                  <Image style={{width:32, height:32}} source={require('../../assets/svgtopng/nonactive-find.png')}/>
                }
              </View>
            )
          }}
        />
        <Tab.Screen 
          name="SettingsScreen"
          component={View}
          options={{
            tabBarLabel: '',
            tabBarIcon: (props: any) => (
              <Pressable
                onPress={handleModalToggle} {...props}
              >
                <Image style={{width:32, height:32}} source={require('../../assets/svgtopng/nonactive-settings.png')}/>
              </Pressable>
            ),
          }}
          listeners={{
            tabPress: (e: { preventDefault: () => void; }) => {
              e.preventDefault();
              handleModalToggle();
            },
          }}
        />
      </Tab.Navigator>
      <SettingsScreen visible={isModalVisible} onClose={handleModalToggle} />
    </TabContext.Provider>
  );
}