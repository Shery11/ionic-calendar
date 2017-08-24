import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';



// for calendar
import { NgCalendarModule } from 'ionic2-calendar';


const firebaseAuth = {
    apiKey: "AIzaSyDbkgqhc3--XKi3mSmKc_J_bztONps4pF4",
    authDomain: "ionic-crud-b95b2.firebaseapp.com",
    databaseURL: "https://ionic-crud-b95b2.firebaseio.com",
    projectId: "ionic-crud-b95b2",
    storageBucket: "ionic-crud-b95b2.appspot.com",
    messagingSenderId: "984894407203"
  }

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    NgCalendarModule,
    AngularFireDatabaseModule,
    AngularFireModule.initializeApp(firebaseAuth),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
