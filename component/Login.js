import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Button, KeyboardAvoidingView, Alert } from 'react-native';
import  FlatlistBasic  from './FlatlistBasic'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            accessToken: null
        }
    }
    render() {
        if (this.state.accessToken == null) {
            return <View style={styles.container} >
                <View style={styles.logoContainer}>
                    <Image style={styles.logo} source={require('../assets/recipe.png')}></Image>
                </View>
                <TextInput style={styles.input}
                    placeholder='Email or Mobile Num'
                    onChangeText={(email) => { this.setState({ email }) }}
                    placeholderTextColor="black"
                    returnKeyType='next'
                    keyboardType="email-address"
                    onSubmitEditing={() => this.passwordInput.focus()}
                    autoCapitalize="none"
                    autoCorrect={false}
                />
                <TextInput style={styles.input}
                    placeholder='Password'
                    onChangeText={(password) => { this.setState({ password }) }}
                    placeholderTextColor="black"
                    secureTextEntry
                    returnKeyType='go'
                    ref={(input) => this.passwordInput = input}
                />
                <TouchableOpacity style={styles.buttonContainer} >
                    <Text style={styles.buttonText} onPress={this.onClick}>LOGIN</Text>
                </TouchableOpacity>
            </View >
        } else {
            console.log('----------dssdasasa')
            return <View style={[styles.mainContainer, styles.shadow]}>
                <FlatlistBasic token={this.state.accessToken} />
            </View>
        }
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
            if (response.status === 200) {
                return response.json();
            } else {
                Alert.alert("Fail", 'Plese eneter valid credentails');
            }
        }).then(response => {
            console.log(response);
            if (response) {
                this.setState({ accessToken: response.token });
                Alert.alert("Success", "Welcome to Secret Recipe");  
            }
           
        }).catch(err => {
            // console.log(err);
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4C095',
        justifyContent: 'center',
        padding: 20
    },
    mainContainer: {
        flex: 1,
    },
    input: {
        height: 40,
        backgroundColor: '#FFFFFB',
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
