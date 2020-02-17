import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux'
import { Logs } from 'expo';


class Connection extends Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logoStyle}
                    source={require('./public/imgs/logoFullWhite.png')} />

                <TextInput
                    style={styles.inputStyle}
                    returnKeyType={"next"}
                    // autoFocus={true}
                    placeholder="Email" />
                <TextInput
                    placeholder="Mot de passe"
                    secureTextEntry={true}
                    style={styles.inputStyle} />
                <TouchableOpacity>
                    <Text style={styles.textConnection}>Mot de passe oublié ?</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => { this.props.navigation.navigate('Home') }} style={styles.buttonConnection}>
                    <Text style={styles.textConnection}>Connexion</Text>
                </TouchableOpacity>

            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1 ,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a64253',
    },
    logoStyle: {
        marginTop: '5%',
        width: '80%',
        height: '10%',
    },
    text: {
        color: '#fff',
        fontSize: 20,
        //fontWeight: 'bold',
        textAlign: 'center',
        marginTop: '4%',
        width: '90%',
        marginBottom: '40%',

    },

    image: {
        width: '80%',
        height: '37%',
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        backgroundColor: 'white'
    },

    buttonConnection: {
        borderWidth: 2,
        borderColor: 'white',
        padding: '4%',
        borderRadius: 20,
        marginTop: '10%',
        width: '35%',
    },
    textConnection: {
        color: 'white',
        fontSize: 17,
        textAlign: 'center'

    },

    inputStyle: {
        marginBottom: 20,
        borderWidth: 1,
        borderColor: 'white',
        padding: '2%',
        textAlign: 'center',
        borderRadius: 10,
        width: '70%',
        backgroundColor: 'white'
    }
});



const mapStateToProps = (state) => {
    return {

    };
}
export default connect(mapStateToProps)(Connection);
