import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { GoogleMaps } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation';
import { UsuarioProvider } from '../providers/usuario/usuario';
import { LoginPage } from '../pages/login/login';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginIngresoPage } from '../pages/login-ingreso/login-ingreso';
import { MotelProvider } from '../providers/motel/motel';
import { MotelesPage } from '../pages/moteles/moteles';
import { CloudinaryModule } from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';
import { HabitacionProvider } from '../providers/habitacion/habitacion';
import { HabitacionesPage } from '../pages/habitaciones/habitaciones';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    LoginIngresoPage,
    HabitacionesPage
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'motelsinn'}),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    LoginIngresoPage,
    HabitacionesPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Geolocation,
    GoogleMaps,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UsuarioProvider,
    MotelProvider,
    HabitacionProvider
  ]
})
export class AppModule {}
