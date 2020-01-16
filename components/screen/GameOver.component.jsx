import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import CustomButton from '../button/customButton.component';

const GameOverScreen = props => {
    return(
        <View style={styles.screen}>
            <Text style={styles.text}>The Game is Over!</Text>
            <View style={styles.imageContainer}>
                <Image source={require('../../assets/gameover.jpg')} style={styles.image} resizeMode='cover'/> 
            </View>
            <Text style={styles.text}>Number of Guesses: {props.roundNumber}</Text>
            <Text style={styles.text}>Correct Answer: {props.userNumber}</Text>
            <CustomButton onPress={props.onNewGame}>NEW GAME</CustomButton>
        </View>
    )

    
}

const styles = StyleSheet.create({
    screen: {
        padding: 60,
        justifyContent: 'center',
        alignItems: "center",
       
    },
    image: {
        width: '100%',
        height: '100%'
    },
    imageContainer: {
        width: '80%',
        height: 400,
        borderRadius: 200,
        borderWidth: 3,
        borderColor: '#FC466B',
        overflow: 'hidden',
        marginTop:20,
        marginBottom: 20
    },
    text: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily:'open-sans-bold',
        color: '#4b134f'
    },
})

export default GameOverScreen;