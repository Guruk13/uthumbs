import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Home from './Home';
import myMap from './Map';

const MyStackNavigator = createStackNavigator({
    Home: {
        screen: Home
      },
    Map: {
        screen: myMap
    }
  })


export default createAppContainer(MyStackNavigator)