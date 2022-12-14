import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { StyleSheet, Text, View, ScrollView, Button, Image, ActivityIndicator, TouchableNativeFeedback } from 'react-native';

import iconSource from '../constants/iconSource'
import styleType from '../constants/backgroundTypes'
import myButton from '../constants/myButton'



const PokemonDetails = props => {
    const [pokemonInfo, setPokemonInfo] = useState('')
    const [speciesInfo, setSpeciesInfo] = useState('')
    const [descriptionIndex, setDescriptionIndex] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [generalInfo, setGeneralInfo] = useState(true)
    const [stats, setStats] = useState(false)
    const [lastPage, setLastPage] = useState(false)

    const inputValue = props.navigation.getParam('pokedexNumber').toLowerCase()

    useEffect(() => {
        getPokemon()
        async function getPokemon() {
        try {
            const pkInfo = await axios.get(`https://pokeapi.co/api/v2/pokemon/${inputValue}`);
                setPokemonInfo(pkInfo.data)
                
            const spInfo = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${inputValue}`)
                setSpeciesInfo(spInfo.data)
                setDescriptionIndex(spInfo.data.flavor_text_entries.findIndex(x => x.language.name === 'en'))
                setIsLoading(false)
                const setHeader = () => PokemonDetails.navigationOptions = {
                    headerTitle: pkInfo.data.name.toUpperCase(),
                    headerStyle: {
                        backgroundColor: pkInfo.data[pokemonInfo.types[0].type.name]
                    },
                }
                setHeader()
                
          ;
        } catch (error) {
          console.error(error);
        }}
      }, [])

      
      
      
    if (isLoading) {
        return (
        <View style={styles.main}>
           <ActivityIndicator size={100} color="red"/>
        </View>
        )
    } else {
        return (
        <ScrollView>
        <View style={{...styles.detail, ...styleType[pokemonInfo.types[0].type.name]}}>
            <View style={styles.pokemonName}>
                <Text style={styles.topText}>{pokemonInfo.name.toUpperCase()}</Text>
            </View>
            <View style={styles.topContainer}>
                <View style={styles.imgContainer}>
                    <Image style={styles.img} source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfo.id}.png`}} />
                </View>
            </View>
            
            <View style={styles.infoContainer}>
                <View style={styles.imgBottom}></View>
                <View style={styles.buttons}>
                    <View style={styles.touchable} >
                        <TouchableNativeFeedback onPress={()=>{
                            setGeneralInfo(true)
                            setStats(false)
                            setLastPage(false)
                        }} background={TouchableNativeFeedback.Ripple('rgba(255,255,255,0.2)', true)}
                        ><View style={styles.button} ><Text style={styles.buttonText}>one</Text></View></TouchableNativeFeedback>
                    </View>
                    <View style={styles.touchable} >
                        <TouchableNativeFeedback onPress={()=>{
                            setGeneralInfo(false)
                            setStats(true)
                            setLastPage(false)
                        }} background={TouchableNativeFeedback.Ripple('rgba(255,255,255,0.2)', true)}
                        ><View style={styles.button} ><Text style={styles.buttonText}>two</Text></View></TouchableNativeFeedback>
                    </View>
                    <View style={styles.touchable} >
                        <TouchableNativeFeedback onPress={()=>{
                            setGeneralInfo(false)
                            setStats(false)
                            setLastPage(true)
                        }}
                        background={TouchableNativeFeedback.Ripple('rgba(255,255,255,0.2)', true)}><View style={styles.button} ><Text style={styles.buttonText}>three</Text></View></TouchableNativeFeedback>
                    </View>
                </View>
                {generalInfo && <View style={styles.typeContainer}>
                    <Text style={styles.description}>{speciesInfo.flavor_text_entries[descriptionIndex].flavor_text.replace(/(\r\n|\n|\r)/gm," ").replace(/é/g, 'e').replace(/É/g, 'E')}</Text>
                    <Text style={styles.textCenter}>Types</Text>
                    {pokemonInfo.types.map((x, i) => <View style={styles.types}><View style={{...styles.icon, ...styleType[pokemonInfo.types[i].type.name]}}></View><Text style={styles.text}>{x.type.name.toUpperCase()}</Text></View>)}
                    <Text style={styles.textCenter}>Habitat</Text>
                    {speciesInfo.habitat ? <View style={styles.habitatContainer}><Image source={iconSource[speciesInfo.habitat.name]} /><Text style={styles.text}>{speciesInfo.habitat.name.toUpperCase()}</Text></View> : <View style={styles.habitatContainer}><Image source={require(`../assets/icons/confused.png`)} /><Text style={styles.text}>Who knows?</Text></View>}
                </View>}
                {stats && <View style={styles.typeContainer}>
                    <Text style={styles.description}>{speciesInfo.flavor_text_entries[descriptionIndex].flavor_text.replace(/(\r\n|\n|\r)/gm," ").replace(/é/g, 'e').replace(/É/g, 'E')}</Text>
                    <Text style={styles.textCenter}>Types</Text>
                    {pokemonInfo.types.map((x, i) => <View style={styles.types}><View style={{...styles.icon, ...styleType[pokemonInfo.types[i].type.name]}}></View><Text style={styles.text}>{x.type.name.toUpperCase()}</Text></View>)}
                                    </View>}
                {lastPage && <View style={styles.typeContainer}>
                    <Text style={styles.description}>{speciesInfo.flavor_text_entries[descriptionIndex].flavor_text.replace(/(\r\n|\n|\r)/gm," ").replace(/é/g, 'e').replace(/É/g, 'E')}</Text>
                    <Text style={styles.textCenter}>Habitat</Text>
                    {speciesInfo.habitat ? <View style={styles.habitatContainer}><Image source={iconSource[speciesInfo.habitat.name]} /><Text style={styles.text}>{speciesInfo.habitat.name.toUpperCase()}</Text></View> : <View style={styles.habitatContainer}><Image source={require(`../assets/icons/confused.png`)} /><Text style={styles.text}>Who knows?</Text></View>}
                </View>}
            </View>
            
        </View>
        </ScrollView>

    )}
}





const styles = StyleSheet.create({
    main: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        backgroundColor: '#f2e76d'
    },
    detail: {
        flex: 1
    },
    img: {
        height: 350,
        width: 350,
        top: 150,
        left: 100
    },
    imgContainer: {
        marginTop: -150,
    },
    imgBottom: {
        height: 150,
        width: '100%',
        backgroundColor: 'rgba(0,0,0,0.7)',
        top: -20
    },
    pokemonName: {
        position: 'absolute',
        top: 0,
        left: 0
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.7)',
        paddingBottom: 30,
        zIndex: 1
    },
    topText: {
        fontSize: 40,
        textAlign: 'center',
        margin: 10,
        fontFamily: 'lacquer',
    },
    typeContainer: {
        textAlign: 'center',
        width: '70%',
        paddingBottom: 50,
        
        
    },
    infoContainer: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)'

    },
    textCenter: {
        textAlign: 'center',
        fontSize: 16,
        borderBottomWidth: 2,
        marginVertical: 5,
        fontFamily: 'long-cang',
        fontSize: 28,
    },
    habitatContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    icon: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 1,
        borderColor: 'black',
        marginLeft: 5
    },
    types: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    text: {
        fontFamily: 'long-cang',
        fontSize: 20,
        marginRight: 5
    },
    descriptionContainer: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: '70%'
    },
    description: {
        fontFamily: 'long-cang',
        textAlign: 'center',
        fontSize: 20,
        paddingBottom: 20
    },
    buttons: {
        flexDirection: 'row',
        marginBottom: 15,
    },
    button: {
        borderRadius: 20,
        overflow: 'hidden'
    },
    buttonText: {
        textAlign: 'center'
    },
    touchable: {
        height: 40,
        width: 100,
        margin: 15,

        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: 'rgba(0,0,0,0.7)',
        elevation: 2,
        justifyContent: 'center'
    },


})

export default PokemonDetails
