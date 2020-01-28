import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button, KeyboardAvoidingView, Alert } from 'react-native';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }
    render() {
        return (
            <View style={styles.container} >    
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../Images/crickbuzz.png')}></Image>
                </View>
                <TextInput style={styles.input}
                    placeholder='Email or Mobile Num'
                    onChangeText = {(email)=> {this.setState({email})}}
                    placeholderTextColor="rgba(255, 255, 255, 1.0 )"
                    returnKeyType='next'
                    keyboardType="email-address"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TextInput style={styles.input}
                    placeholder='Password'
                    onChangeText = {(password)=> {this.setState({password})}}
                    placeholderTextColor="rgba(255, 255, 255, 1.0 )"
                    secureTextEntry
                    returnKeyType='go'
                    ref={(input) => this.passwordInput = input}
                />

                <TouchableOpacity style={styles.buttonContainer} >
                    <Text style={styles.buttonText} onPress={this.onClick}>LOGIN</Text>
                </TouchableOpacity>
            </View >
        );
    }

    onClick = async () => {
        // console.log(this.state);
        fetch('http://35.160.197.175:3006/api/v1/user/login', {
            method: 'POST',
            headers: {
                // Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: this.state.email,
                password: this.state.password,
            }),
        }).then(response => {
            // console.log(response);
            if (response.status === 200) {
                return response.json();
            } else {
                 Alert.alert("Fail", 'Plese eneter valid credentails');
            }
        }).then(response => {
            console.log(response);
            if (response) {
              Alert.alert("Success", "Welcome to Cricbuzz");
            }
          }).catch (err => {
            // console.log(err);
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#7fe6e8',
        justifyContent: 'center',
        padding: 20
    },
    input: {
        height: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        marginBottom: 20,
        padding: 15,
        paddingHorizontal: 10,
        // color: '#fff'
    },
    logoContainer: {
        justifyContent: "center",
        // flexGrow: 1,
        alignItems: "center",
    },
    logo: {
        height: 100,
        width: 150,
        borderRadius: 50,
        marginBottom: 40
    },
    buttonContainer: {
        backgroundColor: '#2980b6',
        paddingVertical: 10
    },
    buttonText: {
        color: '#7ac5cd',
        textAlign: 'center',
        fontWeight: '800'
    }
});
