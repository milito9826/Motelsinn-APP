import { Component } from '@angular/core';
import { NavController, IonicPage, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { HabitacionesPage } from '../habitaciones/habitaciones';

@IonicPage()
@Component({
  selector: 'page-login-ingreso',
  templateUrl: 'login-ingreso.html',
})
export class LoginIngresoPage {
  formUsuario: FormGroup;
  token: string;

  constructor(public navCtrl: NavController,
    private fb: FormBuilder,
    private usuario_Service: UsuarioProvider,
    private alertCtrl: AlertController) {
      {
        this.formUsuario = this.fb.group({
          correoUsuario: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)]],  
          claveUsuario: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')]]
        });
      }
  }

   
  loginUsuario() {
    // this.usuario_Service.onlogin(this.formUsuario.value).subscribe((data) => {
         
    //   if(data.ok) {
    //      this.token = data.token;
    //      console.log(this.token);
         this.navCtrl.setRoot(HabitacionesPage);
    //   }
         
    // },
    // err => {
    //   this.loginInvalidAlert();
    // });
  }

  loginInvalidAlert() {
    let alert = this.alertCtrl.create({
      title: 'Incorrecto',
      subTitle: 'Verifique usuario y contraseña',
      buttons: [{
        text: 'Aceptar'
      }]
    });
    alert.present();
  }

  registrarUsuarios () {
    this.navCtrl.push(LoginPage);
  }
} 
