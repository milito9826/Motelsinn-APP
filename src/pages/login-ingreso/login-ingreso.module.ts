import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginIngresoPage } from './login-ingreso';

@NgModule({
  declarations: [
    LoginIngresoPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginIngresoPage),
  ],
})
export class LoginIngresoPageModule {}
