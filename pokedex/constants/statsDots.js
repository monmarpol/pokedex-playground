import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, Button, TouchableNativeFeedback } from 'react-native';

const statDots = props => {
    const statValue = props.stat
    const stats = []
    for (i=0; i < statValue; i++) {
        stats.push(1)
    }
    for (i=0; i < 6-statValue; i++) {
        stats.push(0)
    }

    

    return (
        <View style={styles.cont}>
            {stats.map(x => x === 1 ? <View style={styles.icon}></View>: <View style={styles.emptyIcon}></View>)}
        </View>
    )
}

const styles = StyleSheet.create({
    icon: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 1,
        borderColor: 'black',
        marginLeft: 5,
        backgroundColor: 'rgba(0,0,0,0.7)'
    },
    emptyIcon: {
        width: 18,
        height: 18,
        borderRadius: 9,
        borderWidth: 1,
        borderColor: 'black',
        marginLeft: 5,
        backgroundColor: 'rgba(0,0,0,0.1)'
    },
    cont: {
        flexDirection: 'row'
    }
})

export default statDots