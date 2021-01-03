import { createStackNavigator } from 'react-navigation-stack'
import { createAppContainer } from 'react-navigation'

import MainScreen from '../components/MainScreen'
import PokemonDetails from '../components/PokemonDetails'
 
const Navigator = createStackNavigator({
    Main: MainScreen,
    Details: PokemonDetails
})
 
export default createAppContainer(Navigator)