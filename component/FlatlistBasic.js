import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Alert, FlatList, SafeAreaView, RefreshControl, TouchableWithoutFeedback, Image, ImageBackground } from 'react-native';
import LoadingIndicator from './LodingIndicator';

export default class FlatlistBasic extends Component {
    constructor() {
        super();
        this.state = {
            isLoading: false,
            itemList: []
        }
    }
    componentDidMount() {
        this.fetchCookingList()
    }

    render() {
        return (
            <View style={styles.container}>
                <LoadingIndicator isLoading={this.state.isLoading} />
                <SafeAreaView>
                    <ScrollView>
                        <Text style={[styles.commonText, styles.mainTitle, styles.shadow]}>Recipe List</Text>
                        <FlatList
                            data={this.state.itemList}
                            renderItem={({ item }) => {
                                return <View style={[styles.recipeCell, styles.shadow]}>
                                    <TouchableWithoutFeedback style={styles.container}>
                                        <ImageBackground source={this.getImageUrl(item.photo)} style={styles.recipeImage} imageStyle={{ borderRadius: 10 }}>
                                            <View style={styles.recipeBottomContainer}>
                                            </View>
                                            <View style={styles.recipeUpperContainer}>
                                                <Text style={[styles.commonText, styles.recipeMadeBy]}>Made by 👨🏻‍🍳 {item.firstName + ' ' + item.lastName}</Text>
                                                <Text style={[styles.commonText, styles.recipeMadeBy, { fontSize: 15 }]}>Serves: {item.serves}</Text>
                                                <Text style={[styles.commonText, styles.recipeMadeBy]}>Complexcity level: {item.complexity}</Text>
                                            </View>
                                            <View style={styles.recipeTopContainer}>
                                                <Text style={[styles.commonText, styles.recipeTitle, styles.shadow]}>{item.name}</Text>
                                            </View>
                                        </ImageBackground>
                                    </TouchableWithoutFeedback>
                                </View>
                            }}
                            keyExtractor={(item) => item.id}
                        >
                        </FlatList>
                    </ScrollView>
                </SafeAreaView>
            </View>
        );
    }

    getImageUrl(url) {
        console.log(url, '-------------');

        if (url == null) {
            return require('../assets/NO_DATA.jpeg')
        } else {
            return { uri: url }
        }
    }
    // eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6Mn0.MGBf-reNrHdQuwQzRDDNPMo5oWv4GlZKlDShFAAe16s
    fetchCookingList = async () => {
        console.log(this.props.token);
        this.setState({
            isLoading: true
        })
        fetch('http://35.160.197.175:3006/api/v1/recipe/cooking-list', {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer ' + this.props.token,
                'Content-Type': 'application/json',
            },
        }).then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                return null
            }
        }).then(response => {
            // console.log(response)
            this.setState({
                isLoading: false,
                itemList: response
            })
        });
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EF915B'
    },
    recipeContainer: {
        flex: 1,
        margin: 10,
        height: 200,
        // backgroundColor: 'red',
        // height: 150,
    },
    nameContainer: {
        flex: 1,
        // backgroundColor: 'orange',
        color: 'black',
        padding: 5,
        fontWeight: "bold",
        fontSize: 15
    },
    recipeCell: {
        margin: 10,
        // backgroundColor: '#219199',
        height: 300,
        borderRadius: 10
    },
    recipeMadeBy: {
        fontSize: 17,
        marginLeft: 10,
        marginTop: 5,
        color: 'white',
        alignSelf: 'flex-start',
        fontWeight: '500'
    },
    recipeBottomContainer: {
        // backgroundColor: '#219199',
        opacity: 0.5,
        flex: 0.3
    },
    recipeUpperContainer: {
        position: 'absolute',
        backgroundColor: '#272727',
        width: '100%',
        height: 85,
        opacity: 0.8
    },
    commonText: {
        textAlign: 'center',
        color: 'white',
        shadowColor: 'black',
    },
    mainTitle: {
        fontSize: 30,
        marginBottom: 30,
        marginTop: 15,
        backgroundColor: '#2F243A',
    },
    shadow: {
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.75,
        shadowRadius: 2,
    },
    recipeTitle: {
        margin: 8,
        fontSize: 20,
        fontWeight: '500',
        color: '#1e2022',
        fontStyle: "italic",

    },
    recipeImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
        opacity: 0.9,
    },
});