import firebase from 'firebase'

var config = {
  apiKey: 'AIzaSyA8CK987BiWFeo55J9cnOOGb2TXBM0LF2Y',
  authDomain: 'redux-tweet.firebaseapp.com',
  databaseURL: 'https://redux-tweet.firebaseio.com',
  storageBucket: 'redux-tweet.appspot.com'
}

firebase.initializeApp(config)

export const ref = firebase.database().ref()
export const firebaseAuth = firebase.auth

export const usersTweetsExpirationTime = 100000
export const userExpirationTime = 100000
export const repliesExpirationTime = 300000
