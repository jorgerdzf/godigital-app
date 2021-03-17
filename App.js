import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import firebase from 'firebase/app'
require('firebase/auth')
import 'firebase/firestore'
import { firebaseConfig } from './config/firebaseConfig'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from './redux/reducers'
import thunk from 'redux-thunk'

if(firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}

const store = createStore(rootReducer, applyMiddleware(thunk))

import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import Landing from './components/auth/Landing'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Main from './components/main/Main'
import Splash from './components/main/Splash'
import PaymentHistory from './components/payment/PaymentHistory'
import PaymentInfo from './components/payment/PaymentInfo'
import PaymentPost from './components/payment/PaymentPost'

const Stack = createStackNavigator();

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
    }
  }
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (!user) {
        this.setState({
          loggedIn: false,
          loaded: true
        })
      } else {
        this.setState({
          loggedIn: true,
          loaded: true
        })
      }
    });
  }
  render() {
    const { loggedIn, loaded } = this.state;
    if (!loaded) {
      return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <Text>Cargando...</Text>
        </View>
      )
    }
    if (!loggedIn) {
      return (
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Landing'>
            <Stack.Screen name='Landing' component={Landing} options={{ headerShown: false }} />
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='Login' component={Login} />
          </Stack.Navigator>
        </NavigationContainer>
      )
    } else {
      <Provider store={store}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Main'>
            <Stack.Screen name='Splash' component={Splash} />
            <Stack.Screen name='Main' component={Main} />
            <Stack.Screen name='PaymentHistory' component={PaymentHistory} navigation={this.props.navigation}/>
            <Stack.Screen name='PaymentInfo' component={PaymentInfo} navigation={this.props.navigation}/>
            <Stack.Screen name='PaymentPost' component={PaymentPost} navigation={this.props.navigation}/>
          </Stack.Navigator>
        </NavigationContainer>
      </Provider>
    }
  }
}

export default App