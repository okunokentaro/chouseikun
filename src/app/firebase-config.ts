import {AngularFireModule, FirebaseAppConfig, AuthMethods, AuthProviders} from 'angularfire2'
import {NgModule} from '@angular/core'

export const FIREBASE_CONFIG = {
  apiKey           : 'AIzaSyB4r-1COyvDxQIWWAocrqCp2OrMCOLleGc',
  authDomain       : 'chouseikun-d59bc.firebaseapp.com',
  databaseURL      : 'https://chouseikun-d59bc.firebaseio.com',
  storageBucket    : 'chouseikun-d59bc.appspot.com',
  messagingSenderId: '1099145559138'
}

export const AUTH_CONFIG = {
  provider: AuthProviders.Twitter,
  method: AuthMethods.Redirect
}

@NgModule({
  imports: [
    AngularFireModule.initializeApp(FIREBASE_CONFIG, AUTH_CONFIG),
  ],
  exports: [
    AngularFireModule
  ]
})
export class ConfiguredAngularFireModule { }
