import React, { useState, useEffect, useCallback } from 'react'
import axios from 'axios'
import { StyleSheet, Text, View, TextInput, Button, ActivityIndicator, FlatList, TouchableNativeFeedback, Image } from 'react-native';

import styleType from '../constants/backgroundTypes'

const MainScreen = props => {
    const [isLoading, setIsLoading] = useState(true)
    const [number, setNumebr] = useState('')

    const [allPokemons, setAllPokemons] = useState([])

    
    const getPokemon = useCallback(async function getPokemon() {
      try {
          const pokemons = []
          const normal = await axios.get('https://pokeapi.co/api/v2/type/1')
              const normPk = [...normal.data.pokemon].filter(x => x.slot === 1).map(
                x => x.pokemon = {name: x.pokemon.name, type: 'normal', id: x.pokemon.url.split('/').reverse()[1]})
              pokemons.push(...normPk)
          const fighting = await axios.get('https://pokeapi.co/api/v2/type/2')
              const figPk = [...fighting.data.pokemon].filter(x => x.slot === 1).map(
                x => x.pokemon = {name: x.pokemon.name, type: 'fighting', id: x.pokemon.url.split('/').reverse()[1]})
              pokemons.push(...figPk)
          const flying = await axios.get('https://pokeapi.co/api/v2/type/3')
              const flyPk = [...flying.data.pokemon].filter(x => x.slot === 1).map(
                x => x.pokemon = {name: x.pokemon.name, type: 'flying', id: x.pokemon.url.split('/').reverse()[1]})
              pokemons.push(...flyPk)
          const poison = await axios.get('https://pokeapi.co/api/v2/type/4')
              const poisPk = [...poison.data.pokemon].filter(x => x.slot === 1).map(
              x => x.pokemon = {name: x.pokemon.name, type: 'poison', id: x.pokemon.url.split('/').reverse()[1]})
            pokemons.push(...poisPk)
          const ground = await axios.get('https://pokeapi.co/api/v2/type/5')
            const grPk = [...ground.data.pokemon].filter(x => x.slot === 1).map(
              x => x.pokemon = {name: x.pokemon.name, type: 'ground', id: x.pokemon.url.split('/').reverse()[1]})
              pokemons.push(...grPk)
          const rock = await axios.get('https://pokeapi.co/api/v2/type/6')
          const rockPk = [...rock.data.pokemon].filter(x => x.slot === 1).map(
              x => x.pokemon = {name: x.pokemon.name, type: 'rock', id: x.pokemon.url.split('/').reverse()[1]})
              pokemons.push(...rockPk)
          const bug = await axios.get('https://pokeapi.co/api/v2/type/7')
          const bugPk = [...bug.data.pokemon].filter(x => x.slot === 1).map(
              x => x.pokemon = {name: x.pokemon.name, type: 'bug', id: x.pokemon.url.split('/').reverse()[1]})
              pokemons.push(...bugPk)
          const ghost = await axios.get('https://pokeapi.co/api/v2/type/8')
          const ghPk = [...ghost.data.pokemon].filter(x => x.slot === 1).map(
              x => x.pokemon = {name: x.pokemon.name, type: 'ghost', id: x.pokemon.url.split('/').reverse()[1]})
              pokemons.push(...ghPk)
          const steel = await axios.get('https://pokeapi.co/api/v2/type/9')
          const stPk = [...steel.data.pokemon].filter(x => x.slot === 1).map(
              x => x.pokemon = {name: x.pokemon.name, type: 'steel', id: x.pokemon.url.split('/').reverse()[1]})
              pokemons.push(...stPk)
          const fire = await axios.get('https://pokeapi.co/api/v2/type/10')
          const firePk = [...fire.data.pokemon].filter(x => x.slot === 1).map(
              x => x.pokemon = {name: x.pokemon.name, type: 'fire', id: x.pokemon.url.split('/').reverse()[1]})
              pokemons.push(...firePk)
          const water = await axios.get('https://pokeapi.co/api/v2/type/11')
          const wtPk = [...water.data.pokemon].filter(x => x.slot === 1).map(
              x => x.pokemon = {name: x.pokemon.name, type: 'water', id: x.pokemon.url.split('/').reverse()[1]})
              pokemons.push(...wtPk)
          const grass = await axios.get('https://pokeapi.co/api/v2/type/12')
          const grassPk = [...grass.data.pokemon].filter(x => x.slot === 1).map(
              x => x.pokemon = {name: x.pokemon.name, type: 'grass', id: x.pokemon.url.split('/').reverse()[1]})
              pokemons.push(...grassPk)
          const electric = await axios.get('https://pokeapi.co/api/v2/type/13')
          const elPk = [...electric.data.pokemon].filter(x => x.slot === 1).map(
              x => x.pokemon = {name: x.pokemon.name, type: 'electric', id: x.pokemon.url.split('/').reverse()[1]})
              pokemons.push(...elPk)
          const psychic = await axios.get('https://pokeapi.co/api/v2/type/14')
          const psPk = [...psychic.data.pokemon].filter(x => x.slot === 1).map(
              x => x.pokemon = {name: x.pokemon.name, type: 'psychic', id: x.pokemon.url.split('/').reverse()[1]})
              pokemons.push(...psPk)
          const ice = await axios.get('https://pokeapi.co/api/v2/type/15')
          const icePk = [...ice.data.pokemon].filter(x => x.slot === 1).map(
              x => x.pokemon = {name: x.pokemon.name, type: 'ice', id: x.pokemon.url.split('/').reverse()[1]})
              pokemons.push(...icePk)
          const dragon = await axios.get('https://pokeapi.co/api/v2/type/16')
          const drPk = [...dragon.data.pokemon].filter(x => x.slot === 1).map(
              x => x.pokemon = {name: x.pokemon.name, type: 'dragon', id: x.pokemon.url.split('/').reverse()[1]})
              pokemons.push(...drPk)
          const dark = await axios.get('https://pokeapi.co/api/v2/type/17')
          const darkPk = [...dark.data.pokemon].filter(x => x.slot === 1).map(
              x => x.pokemon = {name: x.pokemon.name, type: 'dark', id: x.pokemon.url.split('/').reverse()[1]})
              pokemons.push(...darkPk)
          const fairy = await axios.get('https://pokeapi.co/api/v2/type/18')
          const faPk = [...fairy.data.pokemon].filter(x => x.slot === 1).map(
              x => x.pokemon = {name: x.pokemon.name, type: 'fairy', id: x.pokemon.url.split('/').reverse()[1]})
              pokemons.push(...faPk)

              setIsLoading(false)
              setAllPokemons([...pokemons.sort((a,b) => a.id - b.id).filter((x,i) => i < 893)])
      } catch (error) {
        console.error(error);
      }}
    )
    

    useEffect(() => {
      getPokemon()
    }, [])


    if (isLoading) {
      return (
      <View style={styles.main}>
         <ActivityIndicator size={100} color="white"/>
         <Text style={styles.spinnerText}>Loading! Please wait...</Text>
      </View>
      )
  } else {
    return (

        <View style={styles.main}>
          <View style={styles.topContainer}>
            <Text style={styles.topText}>POKEMON CATALOGUE</Text>
            <TextInput placeholder="Type a number or a name..." onChangeText={setNumebr} style={styles.input}/>

                  <View style={styles.touchableFind}>
                    <TouchableNativeFeedback 
                      onPress={() => {
                        props.navigation.navigate({routeName: 'Details', params: {
                          pokedexNumber: number}})}}
                          background={TouchableNativeFeedback.Ripple('rgba(255,255,255,0.8)', true)}
                        >
                      <View style={styles.buttonFind}>
                        <Text style={styles.btnText}>Find!</Text>
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                  <View style={styles.touchableRandom}>
                    <TouchableNativeFeedback 
                      onPress={() => {
                        const myNumber = Math.ceil(+(Math.random().toString().slice(-3)) * 0.892)
                        props.navigation.navigate({routeName: 'Details', params: {
                        pokedexNumber: myNumber.toString()
                      }})}}
                      background={TouchableNativeFeedback.Ripple('rgba(255,255,255,0.8)', true)}
                        >
                      <View style={styles.buttonRandom}>
                        <Text style={styles.btnText}>RANDOM!</Text>
                      </View>
                    </TouchableNativeFeedback>
                  </View>
            </View>
            <View style={styles.list}>
              <FlatList 
                keyExtractor={item => item.name} 
                data={allPokemons} 
                renderItem={itemData =>{
                  const urlNr = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${itemData.item.id}.png`
                  return (
                  <View style={{...styles.touchable, ...styleType[itemData.item.type]}}>
                    <TouchableNativeFeedback 
                      onPress={() => {
                        props.navigation.navigate({routeName: 'Details', params: {
                          pokedexNumber: itemData.item.id
                        }})}}
                      background={TouchableNativeFeedback.Ripple('rgba(255,255,255,0.2)', true)}
                        >
                      <View style={styles.listItem}>
                        <Text style={styles.listText}>#{itemData.item.id}  {itemData.item.name}</Text>
                        <Image style={styles.smallImg} source={{uri: urlNr}}/>
                      </View>
                    </TouchableNativeFeedback>
                  </View>
                )}}>
              </FlatList>
            </View>
        </View>

    )
}}

MainScreen.navigationOptions = {
  headerTitle: 'Pokemon!',
  headerStyle: {
      backgroundColor: 'black'
  },
  headerTintColor: 'white',
  headerTitleStyle: {
      fontFamily: "long-cang",
      fontSize: 28
    }
}

const styles = StyleSheet.create({
    main: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: 'black',
        paddingTop: 130
    },
    spinnerText: {
      textAlign: 'center',
      marginVertical: 5,
      fontFamily: 'long-cang',
      fontSize: 28,
      color: 'white'
    },
    listItem: {
      borderRadius: 20,
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingLeft: 15
    },
    list: {
      backgroundColor: 'black',
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    listText: {
      textAlign: 'center',
      fontFamily: 'lacquer',
      fontSize: 24
    },
    touchable: {
      height: 70,
      width: 350,
      marginTop: 15,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: 'rgba(0,0,0,0.7)',
      justifyContent: 'center',
      elevation: 5
  },
touchableFind: {
  backgroundColor: 'yellow',
  marginBottom: 10,
  width: 200,
  height: 40,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 20,
      borderWidth: 2,
      marginTop: 15,
      overflow: 'hidden'
},
touchableRandom: {
  backgroundColor: 'white',
  marginBottom: 10,
  width: 120,
  height: 40,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 20,
      borderWidth: 2,
      marginTop: 15,
      overflow: 'hidden'
},
  smallImg: {
    height: 80,
    width: 80
},
buttonFind: {
  backgroundColor: 'yellow',
  width: 200,
  height: 40,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 20,
      borderWidth: 2,
      overflow: 'hidden'
},
button: {
  backgroundColor: 'white',
  marginBottom: 10,
  width: '30%',
  height: 40,
  alignItems: 'center'
},
buttonRandom: {
  backgroundColor: 'white',
  width: 120,
  height: 40,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 20,
      borderWidth: 2,
      overflow: 'hidden'
},
btnText: {
    fontFamily: 'lacquer',
    fontSize: 16,
    textAlign: 'center'
},
topText: {
  fontFamily: 'lacquer',
    fontSize: 24,
    textAlign: 'center'
},
topContainer: {
  justifyContent: 'center',
        alignItems: 'center',
        width: '95%',
        paddingVertical: 20,
        backgroundColor: 'lightyellow',
        borderRadius: 20,
        elevation: 25
},
input: {
  padding: 5,
  borderBottomWidth: 2
}

})

export default MainScreen