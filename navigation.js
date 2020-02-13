import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from './Home';
import myMap from './Map';
import Workplace from './Workplace';
import Waiting  from './Waiting';
import Swiper from './SwiperPage';

const MyStackNavigator = createStackNavigator({
    Home: {
        screen : Home
      },
    Map: {
        screen : myMap
    },
    Workplace: {
      screen : Workplace
    },
    Waiting: {
      screen : Waiting
    },
    Swiper: {
      screen : Swiper
    }
  })


export default createAppContainer(MyStackNavigator)