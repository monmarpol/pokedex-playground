import React, { useState, useEffect, useCallback, useRef } from 'react'
import axios from 'axios'
import { Easing, Animated, StyleSheet, Text, View, ScrollView, Button, Image, ActivityIndicator, TouchableNativeFeedback } from 'react-native';

import iconSource from '../constants/iconSource'
import styleType from '../constants/backgroundTypes'
import StatsDots from '../constants/statsDots'

const PokemonDetails = props => {
    const [pokemonInfo, setPokemonInfo] = useState('')
    const [speciesInfo, setSpeciesInfo] = useState('')
    const [descriptionIndex, setDescriptionIndex] = useState()
    const [isLoading, setIsLoading] = useState(true)
    const [evolutionPokemons, setEvolution] = useState([])
    const [generalInfo, setGeneralInfo] = useState(true)
    const [stats, setStats] = useState(false)
    const [lastPage, setLastPage] = useState(false)

    const fadeAnim = useRef(new Animated.Value(0.6)).current;

    const scaleAnim = useRef(new Animated.Value(1)).current;

    const fadeIn = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 2000,
          easing: Easing.bounce,
          useNativeDriver: true
        }).start();
      };

      const moveAnim = useRef(new Animated.Value(300)).current;;

      const moveIn = () => {
        Animated.sequence([
            Animated.timing(moveAnim, {
                toValue: -50,
                duration: 1000,
                useNativeDriver: true
                }),
            Animated.timing(moveAnim, {
                toValue: 0,
                duration: 1000,
                useNativeDriver: true
                }),
            Animated.timing(scaleAnim, {
                toValue: 0.7,
                duration: 2000,
                easing: Easing.bounce,
                useNativeDriver: true})
        ]).start();
    };

    const groundAnim = useRef(new Animated.Value(1)).current;

    const groundAnimation = () => {
        Animated.timing(groundAnim, {
            delay: 2000,
          toValue: 0.6,
          duration: 2000,
          useNativeDriver: true
        }).start();
      };


    let inputValue = props.navigation.getParam('pokedexNumber').toLowerCase()
    
    const getPokemon = useCallback(async function getPokemon() {
        setIsLoading(true)
        try {
            const pkInfo = await axios.get(`https://pokeapi.co/api/v2/pokemon/${inputValue}`);
                setPokemonInfo(pkInfo.data)
                
            const spInfo = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${inputValue}`)
                setSpeciesInfo(spInfo.data)
                setDescriptionIndex(spInfo.data.flavor_text_entries.findIndex(x => x.language.name === 'en'))
                
            if (spInfo.data.evolution_chain) {
            const evoInfo = await axios.get(`${spInfo.data.evolution_chain.url}`)
            const evolutionArray = []
            function evolution(evo) {
                if (evo.evolves_to.length === 0) {
                    evolutionArray.push({name: evo.species.name, img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo.species.url.split('/').reverse()[1]}.png`})
                    setEvolution([...evolutionArray])
                    return
                } 
                evolutionArray.push({name: evo.species.name, img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${evo.species.url.split('/').reverse()[1]}.png`})
                evolution(evo.evolves_to[0])
            } 
            
            evolution(evoInfo.data.chain)}
            
          ;
        } catch (error) {
          console.error(error);
        }
        setIsLoading(false)
        fadeIn()
        moveIn()
        groundAnimation()
    }        
    )

    useEffect(() => {
        getPokemon()
        }, [inputValue])
      
      
    if (isLoading) {
        return (
        <View style={styles.main}>
           <ActivityIndicator size={100} color="white"/>
           <Text style={styles.spinnerText}>Opening the pokeball...</Text>
        </View>
        )
    } else {
        return (
        <ScrollView style={{...styles.detail, ...styleType[pokemonInfo.types[0].type.name]}}>
        <View style={{...styles.detail, ...styleType[pokemonInfo.types[0].type.name]}}>
            <Animated.View style={[styles.pokemonName, {transform: [{ scale:fadeAnim }]}]}>
                <Text style={styles.topText}>{pokemonInfo.name.toUpperCase()}</Text>
                {pokemonInfo.types.map(x => <Text style={styles.topType}>{x.type.name.toUpperCase()}</Text>)}
                <Text style={styles.topType}>#{pokemonInfo.id}</Text>
            </Animated.View>
            <View style={styles.topContainer}>
                <Animated.View style={[styles.imgContainer, {transform: [
                    {translateX: moveAnim}, {scale: scaleAnim}]}]}>
                    <Image style={styles.img} source={{uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemonInfo.id}.png`}} />
                </Animated.View>
            </View>
            
            <View style={styles.infoContainer}>
                <Animated.View style={[styles.imgBottom, {transform: [
                    {scale: groundAnim}]}]}></Animated.View>
                <View style={styles.buttons}>
                    <View style={styles.touchable} >
                        <TouchableNativeFeedback onPress={()=>{
                            setGeneralInfo(true)
                            setStats(false)
                            setLastPage(false)
                        }} background={TouchableNativeFeedback.Ripple('rgba(255,255,255,0.2)', true)}
                        ><View style={styles.button} ><Text style={styles.buttonText}>INFO</Text></View></TouchableNativeFeedback>
                    </View>
                    <View style={styles.touchable} >
                        <TouchableNativeFeedback onPress={()=>{
                            setGeneralInfo(false)
                            setStats(true)
                            setLastPage(false)
                        }} background={TouchableNativeFeedback.Ripple('rgba(255,255,255,0.2)', true)}
                        ><View style={styles.button} ><Text style={styles.buttonText}>STATS</Text></View></TouchableNativeFeedback>
                    </View>
                    <View style={styles.touchable} >
                        <TouchableNativeFeedback onPress={()=>{
                            setGeneralInfo(false)
                            setStats(false)
                            setLastPage(true)
                        }}
                        background={TouchableNativeFeedback.Ripple('rgba(255,255,255,0.2)', true)}><View style={styles.button} ><Text style={styles.buttonText}>EVOLUTION</Text></View></TouchableNativeFeedback>
                    </View>
                </View>
                {generalInfo && <View style={styles.typeContainer}>
                    <Text style={styles.textCenter}>GENERAL INFORMATION</Text>
                    <Text style={styles.description}>{speciesInfo.flavor_text_entries[descriptionIndex].flavor_text.replace(/(\r\n|\n|\r)/gm," ").replace(/é/g, 'e').replace(/É/g, 'E')}</Text>
                    <Text style={styles.textCenter}>Types</Text>
                        {pokemonInfo.types.map((x, i) => <View style={styles.types}><View style={{...styles.icon, ...styleType[pokemonInfo.types[i].type.name]}}></View><Text style={styles.text}>{x.type.name.toUpperCase()}</Text></View>)}
                    <Text style={styles.textCenter}>Habitat</Text>
                        {speciesInfo.habitat ? <View style={styles.habitatContainer}><Image source={iconSource[speciesInfo.habitat.name]} /><Text style={styles.text}>{speciesInfo.habitat.name.toUpperCase()}</Text></View> : <View style={styles.habitatContainer}><Image source={require(`../assets/icons/confused.png`)} /><Text style={styles.text}>Who knows?</Text></View>}
                </View>}
                {stats && <View style={styles.typeContainer}>
                    <Text style={styles.textCenter}>STATISTICS</Text>
                        <View style={styles.statsContainer}>
                            <Text style={styles.text}>Health Points</Text>
                            <StatsDots stat={Math.ceil(pokemonInfo.stats[0].base_stat/42.5)}/>
                        </View>
                        <View style={styles.statsContainer}>
                            <Text style={styles.text}>Attack</Text>
                            <StatsDots stat={Math.ceil(pokemonInfo.stats[1].base_stat/42.5)}/>
                        </View>
                        <View style={styles.statsContainer}>
                            <Text style={styles.text}>Defense</Text>
                            <StatsDots stat={Math.ceil(pokemonInfo.stats[2].base_stat/42.5)}/>
                        </View>
                        <View style={styles.statsContainer}>
                            <Text style={styles.text}>Special Attack</Text>
                            <StatsDots stat={Math.ceil(pokemonInfo.stats[3].base_stat/42.5)}/>
                        </View>
                        <View style={styles.statsContainer}>
                            <Text style={styles.text}>Special Defense</Text>
                            <StatsDots stat={Math.ceil(pokemonInfo.stats[4].base_stat/42.5)}/>
                        </View>
                        <View style={styles.statsContainer}>
                            <Text style={styles.text}>Speed</Text>
                            <StatsDots stat={Math.ceil(pokemonInfo.stats[5].base_stat/42.5)}/>
                        </View>
                        
                </View>}
                {lastPage && <View style={styles.evoContainer}>
                    <Text style={styles.textCenter}>EVOLUTION</Text>
                    {evolutionPokemons.map((x, i) => i !== 0 ? <View>
                        <Text style={styles.textEvo} >EVOLVES INTO:</Text>
                        <View style={styles.touchableEvo}>
                            <TouchableNativeFeedback onPress={()=>{
                                inputValue = evolutionPokemons[i].name
                                getPokemon()
                                
                            }} background={TouchableNativeFeedback.Ripple('rgba(255,255,255,0.2)', true)} >
                                <View style={styles.evolutionContainer} >
                                    <Image style={styles.smallImg} source={{uri: evolutionPokemons[i].img}}/>
                                    <Text style={styles.topTypeEv} >{evolutionPokemons[i].name.toUpperCase()}</Text>
                                </View>
                            </TouchableNativeFeedback>
                        </View>
                        </View>: <View>
                        <View style={styles.touchableEvo}>
                        <TouchableNativeFeedback onPress={()=>{
                            inputValue = evolutionPokemons[i].name
                            getPokemon()
                        }} background={TouchableNativeFeedback.Ripple('rgba(255,255,255,0.2)', true)}>
                            <View style={styles.evolutionContainer}>
                                <Image style={styles.smallImg} source={{uri: evolutionPokemons[i].img}}/>
                                <Text style={styles.topTypeEv} >{evolutionPokemons[i].name.toUpperCase()}</Text>
                            </View>
                        </TouchableNativeFeedback>
                        </View>
                        </View>   )}
                </View>}
            </View>
            
        </View>
        </ScrollView>

    )}
}


PokemonDetails.navigationOptions = {
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
    },
    spinnerText: {
        textAlign: 'center',
        marginVertical: 5,
        fontFamily: 'long-cang',
        fontSize: 28,
        color: 'white'
    },
    detail: {
        flex: 1
    },
    img: {
        height: 350,
        width: 350,
        top: 200,
        left: 100
    },
    smallImg: {
        height: 110,
        width: 110,
        top: 5
    },
    imgContainer: {
        marginTop: -150,
    },
    imgBottom: {
        height: 150,
        width: '200%',
        backgroundColor: 'rgba(0,0,0,0.7)',
        top: -50,
        zIndex: 1
    },
    pokemonName: {
        position: 'absolute',
        top: 0,
        left: 10,
        overflow: 'hidden',

        transform: [{ rotateZ: '-10deg' }]
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
    topType: {
        fontSize: 25,
        textAlign: 'left',
        marginLeft: 15,
        fontFamily: 'long-cang',
        top: -20
    },
    topTypeEv: {
        fontSize: 25,
        textAlign: 'left',
        fontFamily: 'long-cang',
        top: -5
    },
    typeContainer: {
        textAlign: 'center',
        width: '85%',
        paddingTop: 5,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20
    },
    evoContainer: {
        textAlign: 'center',
        width: '85%',
        paddingTop: 5,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 20,
        padding: 20,
        marginBottom: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    
    statsContainer: {
        paddingTop: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    infoContainer: {
        textAlign: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255,255,255,0.2)',

    },
    textCenter: {
        textAlign: 'center',
        borderBottomWidth: 2,
        marginVertical: 5,
        marginBottom: 20,
        fontFamily: 'long-cang',
        fontSize: 28,
        width: '100%'
    },
    textEvo: {
        textAlign: 'center',
        marginVertical: 5,
        fontFamily: 'long-cang',
        fontSize: 20,
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
        top: -50
    },
    button: {
        borderRadius: 20,
        overflow: 'hidden'
    },
    buttonText: {
        textAlign: 'center',
        fontFamily: 'long-cang',
        fontSize: 20
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
    touchableEvo: {
        width: 150,
        height: 150,
        marginVertical: 10,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 3,
        borderColor: 'rgba(0,0,0,0.5)'
    },
    evolutionContainer: {
        width: 150,
        height: 150,
        marginVertical: 10,
        backgroundColor: 'rgba(255,255,255,0.2)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 20,
        borderWidth: 3,
        borderColor: 'rgba(0,0,0,0.5)'
    },


})

export default PokemonDetails