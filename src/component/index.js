import React, {Component} from 'react';
import {View} from 'react-native';
import {
    Container,
    Content,
    Button,
    Text,
    Label,
    Card,
    CardItem,
    Body
} from 'native-base';
import Modal from 'react-native-modalbox';
import {CreditCardInput, LiteCreditCardInput} from 'react-native-credit-card-input';
let cardData = null;

export default class CcModal extends Component {
    constructor() {
        super();
        this.state = {
            disableClose: true,
            dataDisplay: false,
            data: '',
            clearButton: false
        };
    }

    onClose = () => {
        console.log('Modal Close');
        console.log('Final Result:', JSON.stringify(cardData, null, " "));
        this.setState({
            dataDisplay: true,
            data: JSON.stringify(cardData, null, " "),
            clearButton: true
        });
    }

    onOpen() {
        console.log('Modal Open');
    }

    onClosingState(state) {
        console.log('Modal is Closing.....');
    }

    _onChange = formData => {
        if (formData.valid === true) {
            this.setState({disableClose: false});
            cardData = formData;
        }

    };

    _onFocus = field => {
        console.log(field);
    };

    _closeButton() {
        if (this.state.disableClose === false) {
            return (
                <Button block danger onPress={() => this.refs.ccmodal.close()} style={{
                    margin: 10
                }}>
                    <Text>Pay</Text>
                </Button>
            );
        } else {
            return (
                <Button disabled block style={{
                    margin: 10
                }}>
                    <Text>Pay</Text>
                </Button>
            );
        }
    }

    _clearButton() {
        if (this.state.clearButton === true) {
            return (
                <Button block dark onPress={() => this._clearData()} style={{
                    marginTop: 10
                }}>
                    <Text>Clear Data</Text>
                </Button>
            );
        } else {
            return null;
        }
    }

    _clearData() {
        this.setState({data: '', clearButton: false, disableClose: true, dataDisplay: false});
        cardData = null;
    }

    _displayData() {
        if (this.state.dataDisplay === false) {
            return (
                <Label style={{
                    paddingBottom: 20,
                    color: 'darkgray'
                }}>Add Card To See Data</Label>
            );
        } else {
            return (
                <Label style={{
                    paddingBottom: 20,
                    color: 'green'
                }}>{this.state.data}</Label>
            );
        }
    }
    render() {

        return (
            <View style={{
                flex: 1,
                flexDirection: 'column',
                justifyContent: 'center',
                padding: 10,
                alignItems: 'center'
            }}>
                {this._displayData()}
                <Button block success onPress={() => this.refs.ccmodal.open()}>
                    <Text>Open CreditCard Modal</Text>
                </Button>
                {this._clearButton()}
                <Modal
                  ref={'ccmodal'}
                  swipeToClose={false}
                  onClosed={this.onClose}
                  onOpened={this.onOpen}
                  onClosingState={this.onClosingState}
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center'
                }}>
                    <Label style={{
                        paddingBottom: 20,
                        color: 'darkgray'
                    }}>Enter Card Details</Label>
                    <LiteCreditCardInput
                      autoFocus
                      requiresCVC
                      validColor={'black'}
                      invalidColor={'red'}
                      placeholderColor={'darkgray'}
                      onChange={this._onChange}
                      onFocus={this._onFocus}
                    />
                    {this._closeButton()}
                </Modal>

            </View>
        );
    }
}
