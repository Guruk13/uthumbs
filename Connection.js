import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, Image, TextInput, Dimensions } from 'react-native';
import { Icon } from 'react-native-elements';
import { connect } from 'react-redux'
import { Logs } from 'expo';
import Dialog, { SlideAnimation, DialogContent, DialogFooter, DialogButton, PopupDialog } from 'react-native-popup-dialog';


class Connection extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: null,
            dialogOpen: false,
        };
    }
    setUsername(status) {
        const action = {
            type: status,
            value: this.state.username
        }
        this.props.dispatch(action)
    }

    startOnApp() {
        if (this.state.username != null) {
            this.setUsername('setUsername');
            this.props.navigation.push('Home');
        }
        else {
            this.setState({ dialogOpen: true });
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <Image style={styles.logoStyle}
                    source={require('./public/imgs/logoFullWhite.png')} />

                <View style={styles.pageContent}>
                    <TextInput
                        style={styles.inputStyle}
                        returnKeyType={"next"}
                        onChangeText={(username) => this.setState({ username })}
                        value={this.state.username}
                        placeholder="Pseudo" />

                    <TouchableOpacity onPress={() => { this.startOnApp() }} style={styles.buttonConnection}>
                        <Text style={styles.textConnection}>C'est parti !</Text>
                    </TouchableOpacity>
                </View>

                <Dialog
                    style={styles.popUp}
                    visible={this.state.dialogOpen}
                    onTouchOutside={() => {
                        this.setState({ dialogOpen: false });
                    }}
                    footer={
                        <DialogFooter>
                            <DialogButton
                                style={styles.dialogButton}
                                text="OK"
                                onPress={() => {
                                    this.setState({ dialogOpen: false })
                                }}
                            />
                        </DialogFooter>
                    }
                >
                    <DialogContent>
                        <Text style={styles.dialogContent}>Pseudo invalide ...</Text>
                    </DialogContent>
                </Dialog>
            </View>
        )
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#a64253',
    },
    logoStyle: {
        width: '80%',
        height: '10%',
        marginBottom: '20%'
    },

    buttonConnection: {
        borderWidth: 2,
        borderColor: 'white',
        padding: '4%',
        borderRadius: 20,
        marginTop: '6%',
        width: '35%',
    },
    textConnection: {
        color: 'white',
        fontSize: 17,
        textAlign: 'center',
        fontWeight: 'bold',
    },

    inputStyle: {
        borderWidth: 1,
        borderColor: 'white',
        padding: '2%',
        textAlign: 'center',
        borderRadius: 10,
        width: 200,
        backgroundColor: 'white'
    },
    pageContent: {
        alignItems: 'center',
        marginBottom: '20%'
    },
    dialogContent: {
        fontSize: 17,
        textAlign: 'center',
        marginTop: 30,
        marginLeft: '15%',
        marginRight: '15%'
    },
    popUp: {
        backgroundColor: 'red'
    },
    dialogButton: {
        color: 'red',

    }

});



const mapStateToProps = (state) => {
    return {
        username: state.username,
        
    };
}
export default connect(mapStateToProps)(Connection);
