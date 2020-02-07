import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image } from 'react-native';



export class Workplace extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View >
                    <Text style={styles.title}>Où est-ce que vous allez aujourd'hui ? </Text>
                </View>


                <View style={styles.imagesContainer}>
                    <View style={styles.touchableSyle}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Map')}>
                            <Image style={styles.image}
                                source={require('./test.jpg')} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.touchableSyle}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Map')}>
                            <Image style={styles.image}
                                source={require('./test2.jpg')} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.touchableSyle}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Map')}>
                            <Image style={styles.image}
                                source={require('./test3.jpg')} />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.touchableSyle}>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Map')}>
                            <Image style={styles.image}
                                source={require('./test4.jpg')} />
                        </TouchableOpacity>
                    </View>

                </View>

            </View>
        )
    }
};

export default Workplace;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    button: {
        marginTop: '200'
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 20,
    },
    title: {
        fontSize: 20,
        backgroundColor: "#a64253",
        textAlign: "center",
        margin: 15,
        color: 'white',
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 10,
        marginBottom: 70
    },
    imagesContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        flexWrap: 'wrap',
    },
    touchableSyle: {
        marginBottom: 60
    }
});
