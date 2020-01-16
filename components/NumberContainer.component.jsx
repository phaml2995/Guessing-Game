import React from 'react';

import { View, Text, StyleSheet } from 'react-native';

const NumContainer = props => {
    return(
        <View style={styles.container} >
            <Text style={styles.number} >{props.children}</Text>
        </View>
    )
}

const styles  = StyleSheet.create({
    container: {
        borderWidth: 5,
        borderColor: '#8A2387',
        padding: 10,
        borderRadius: 10,
        marginVertical: 10,
        alignItems: 'center',
        justifyContent: 'center'
    },

    number: {
        color: '#8A2387',
        fontSize: 20
    }
})

export default NumContainer;