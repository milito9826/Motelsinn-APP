import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Events } from 'ionic-angular';
import { AbstractControl, ValidatorFn, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsuarioProvider } from '../../providers/usuario/usuario';
import { Usuario } from '../../models/usuario.model';
import { HomePage } from '../home/home';

function equalsValidator(otherControl: AbstractControl): ValidatorFn {
  return (control: AbstractControl): {[key: string]: any} => {
    const value: any = control.value;
    const otherValue: any = otherControl.value;
    return otherValue === value ? null : { 'notEquals': { value, otherValue } };
  };
}

export const CustomValidators = {
  equals: equalsValidator
};
    
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  formRegister: FormGroup;
  usuario : Usuario = {
    documentoUsuario: '',
    nombreUsuario: '',
    apellidoUsuario: '',
    correoUsuario: '',
    claveUsuario: '',
    perfilUsuario: ''
  };

existe = undefined || null;

constructor(private fb: FormBuilder,
  public navCtrl: NavController,
  private usuario_Service: UsuarioProvider,
  private alertCtrl: AlertController,
  public navParams: NavParams,
  public events: Events) {

    this.formRegister = this.fb.group({
      documentoUsuario: ['', ],
      nombreUsuario: ['', ],
      apellidoUsuario: ['', ],
      correoUsuario: ['', [Validators.required, Validators.pattern(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,3}))$/)]],  
      claveUsuario: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$')]],
      confirmarClave: ['', ],
      perfilUsuario: ['usuario', ]
       });
        this.formRegister.get('confirmarClave').setValidators(
         CustomValidators.equals(this.formRegister.get('claveUsuario'))
       );
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  onRegisterUser () {
    if (this.formRegister.valid){
      this.usuario.documentoUsuario = this.formRegister.get('documentoUsuario').value;
      this.usuario.nombreUsuario = this.formRegister.get('nombreUsuario').value;
      this.usuario.apellidoUsuario = this.formRegister.get('apellidoUsuario').value;
      this.usuario.correoUsuario = this.formRegister.get('correoUsuario').value;
      this.usuario.claveUsuario = this.formRegister.get('claveUsuario').value;
      this.usuario.perfilUsuario = this.formRegister.get('perfilUsuario').value;
   
      this.usuario_Service.buscarUser(this.usuario.correoUsuario).subscribe(data =>{
        if (data.ok){
          this.userExist();
          this.existe = true;
        }
     });

     setTimeout(() => {
       if(this.existe !== true){
        this.usuario_Service.onSave(this.usuario).subscribe((datos) => {
         
          if(datos.ok) {
            this.registerValid();
            this.navCtrl.push(HomePage);
          } else {
             this.ErrorAplication();
          }
             
        },
        err => {
          
        });
       }
     }, 4000);

  }   
}

registerValid() {
  let alert = this.alertCtrl.create({
    title: 'Guardado',
    subTitle: 'Usuario guardado correctamente',
    buttons: [{
      text: 'Aceptar'
    }]
  });
  alert.present();
}

userExist() {
  let alert = this.alertCtrl.create({
    title: 'Error',
    subTitle: 'El usuario ya existe',
    buttons: [{
      text: 'Aceptar'
    }]
  });
  alert.present();
}

ErrorAplication() {
  let alert = this.alertCtrl.create({
    title: 'Error',
    subTitle: 'Intenta mas tarde',
    buttons: [{
      text: 'Aceptar'
    }]
  });
  alert.present();
}

}
