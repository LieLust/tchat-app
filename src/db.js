import Rebase from 're-base'
import firebase from 'firebase/app'
import 'firebase/database'

const firebaseApp = firebase.initializeApp({
  apiKey: 'AIzaSyAOHr-WKHCXUCGB5d9vuXRxdonW1YsaDNk',
  authDomain: 'tchat-app-914b3.firebaseapp.com',
  databaseURL: 'https://tchat-app-914b3.firebaseio.com'
})

const db = Rebase.createClass(firebase.database())

export { firebaseApp }

export default db
