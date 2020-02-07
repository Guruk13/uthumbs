import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from './Home';
import myMap from './Map';
import Workplace from './Workplace';


const MyStackNavigator = createStackNavigator({
    Home: {
        screen : Home
      },
    Map: {
        screen : myMap
    },
    Workplace: {
      screen : Workplace
    }
  })


export default createAppContainer(MyStackNavigator)