import React, { Component } from 'react';
import { View } from 'react-native';
import {
  Container,
  Content,
  Button,
  Text,
} from 'native-base';
import Modal from 'react-native-modalbox';

export default class CcModal extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
    };
  }

  onClose() {
    console.log('Modal just closed');
  }

  onOpen() {
    console.log('Modal just openned');
  }

  onClosingState(state) {
    console.log('the open/close of the swipeToClose just changed');
  }

  render() {
    return (
      <View style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 10,
              alignItems: 'center',
            }}>
            <Button block success>
              <Text>Open CreditCard Modal</Text>
            </Button>
            <Modal
              style={[styles.modal, styles.modal1]}
              swipeToClose={this.state.swipeToClose}
              onClosed={this.onClose}
              onOpened={this.onOpen}
              onClosingState={this.onClosingState}>
                <Text style={styles.text}>Basic modal</Text>
                <Button onPress={() => this.setState({ swipeToClose: !this.state.swipeToClose })}
                  style={
                    {
                      margin: 10,
                      backgroundColor: '#3B5998',
                      color: 'white',
                      padding: 10,
                    }}>
                  Disable swipeToClose({this.state.swipeToClose ? 'true' : 'false'})
                </Button>
            </Modal>

      </View>
    );
  }
}
