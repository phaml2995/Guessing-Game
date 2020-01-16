import React, { useState } from 'react';

import { View, Text, StyleSheet,Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

import Card from '../card/card.component';
import Input from '../input/input.component';
import NumContainer from '../NumberContainer.component';
import CustomButton from '../button/customButton.component'


const StartScreen = props => {
    const [enteredVal, setEnteredValue]  = useState('');
    const [confirmed, setConfirmed] =  useState(false);
    const [confirmVal, setConfirmVal] = useState();

    const numberInputHandler = inputText => {
        setEnteredValue(inputText.replace(/[^0-9]/g,''));
    };

    const resetPressed = () => {
        setEnteredValue('');
        setConfirmed(false);
    };

    const confirmPressed = () => {
        const chosenNum = parseInt(enteredVal);
        if (isNaN(chosenNum) ||   chosenNum <= 0 || chosenNum > 99 ){
            Alert.alert(
                'Invalid Number!',
                [{text: 'Retry', style:'destructive',onPress: resetPressed }
            ])
            return;
        }
        setConfirmed(true);
        setConfirmVal(chosenNum)
        setEnteredValue('');
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = 
           ( <Card style={styles.inputSummary} >
                <Text>Your Number</Text>
                <NumContainer>{confirmVal}</NumContainer> 
                <CustomButton onPress={() => props.onStartGame(confirmVal)}>START GAME</CustomButton>
            </Card>
        );
    }

    return(
        <TouchableWithoutFeedback onPress={() => {Keyboard.dismiss()} } >
            <View style={styles.screen}>
                <Text style={styles.text}>Start A New Game!</Text>
                <Card style = {styles.TextInput}>
                    <Text style={styles.text2}>Select a Number</Text>
                    <Input 
                        style={styles.input} 
                        blurOnSubmit
                        autoCorrect={false} 
                        keyboardType="number-pad" 
                        maxLength={2} 
                        onChangeText={numberInputHandler}
                        value={enteredVal}
                    />
                    <View style={styles.buttonContainer}>
                        <View style={styles.button}><Button title="Reset" onPress={resetPressed} color="#92FE9D" /></View>
                        <View style={styles.button}><Button  title="Confirm" onPress={confirmPressed} color="#00C9FF" /></View>
                    </View>
                </Card>
                {confirmedOutput}
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    screen: {
        padding: 10,
        alignItems: "center"
    },

    text: {
        fontSize: 20,
        marginVertical: 10,
        fontFamily:'open-sans-bold'
    },
    text2: {
        fontFamily:'open-sans-bold',
        color: '#544a7d'
    },
    TextInput: {
        width: 300,
        maxWidth: "80%",
        alignItems: 'center'

    },

    buttonContainer: {
        flexDirection: "row",
        width: "90%",
        justifyContent: "space-between",
        padding: 10
    },

    button:{
        width: 100
    },

    input: {
        width: 50,
        textAlign: 'center'
    },

    inputSummary: {
        marginTop: 20,
        alignItems: 'center'
    }

})

export default StartScreen;