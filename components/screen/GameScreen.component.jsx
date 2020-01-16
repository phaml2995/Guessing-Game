import React, { useState, useRef, useEffect } from 'react';

import { View, Text, StyleSheet, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import NumberContainer from '../NumberContainer.component';
import Card from '../card/card.component';
import CustomButton from '../button/customButton.component';

const generateRandom = (min,max,exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandom(min,max,exclude);
    } else {
        return rndNum;
    }
}

const renderListItems = (value, numOfRound) => (
    <View key={value} style={styles.listItem}>
        <Text>Guess #: {numOfRound}</Text>
        <Text>Guess: {value}</Text>
    </View>
)

const GameScreen = props => {
    const initialGuess = generateRandom(1,100,props.userChoice);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [rounds, setRounds] = useState(0);
    const [pastGuesses, setPastGuesses] = useState([initialGuess]);

    const currLow = useRef(1);
    const currHigh = useRef(100);

    const { userChoice, onGameOver} = props;

    useEffect(() =>{
        if (currentGuess === userChoice){
            onGameOver(rounds);
        }
    },[currentGuess,userChoice,onGameOver])

    const  nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert('OOPS!',"Are you sure this is the right button?",[
                {tetx:'GO BACK', style:'cancel',}
            ])
            return;
        }
        if (direction === 'lower') {
            currHigh.current = currentGuess;
        } else {
            currLow.current = currentGuess + 1;
        }
        const nextNum = generateRandom(currLow.current,currHigh.current,currentGuess);
        setCurrentGuess(nextNum);
        setRounds(currRrounds => rounds + 1); 
        setPastGuesses(existingGuesses => [...existingGuesses,nextNum])
    };
    

    return (
        <View style={styles.screen} >
            <Text>Computer's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer} >
                <CustomButton onPress={nextGuessHandler.bind(this,'lower')}>
                    <Ionicons name="md-remove" size={24} color="white"/>
                </CustomButton>
                <CustomButton onPress={nextGuessHandler.bind(this,'greater')}>
                    <Ionicons name="md-add" size={24} color="white"/>
                </CustomButton>
            </Card>
            <View style={styles.listContainer}>
                <ScrollView contentContainerStyle={styles.listContent}>
                    {pastGuesses.map((guess,rounds)=> renderListItems(guess,rounds + 1))}
                </ScrollView>
            </View>
            
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        padding: 10,
        alignItems: 'center'
    },

    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
        width: 300,
        maxWidth: '70%'
    },
    listItem: {
        borderColor:'#8A2387',
        borderWidth: 5,
        padding: 15,
        marginVertical: 10,
        backgroundColor: 'white',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    listContainer: {
        padding:20,
        width: '80%'
    },
    listContent: {
        flexGrow: 1
    }
})

export default GameScreen;