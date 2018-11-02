import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { MotelProvider } from '../../providers/motel/motel';
import { Cloudinary } from '@cloudinary/angular-5.x';
import { ClaveImagenes, serviciosMotel } from '../../models/motel.model';


@IonicPage()
@Component({
  selector: 'page-moteles',
  templateUrl: 'moteles.html',
})

export class MotelesPage {
  @ViewChild(Slides) slides: Slides;
  objetoMotel: any;
  nitMotelMomentaneo = '5bb61abc77cc683ee4fbd2a9';
  arrayClavesImagenes: Array<ClaveImagenes> = [];
  arrayServiciosMotel:  Array<serviciosMotel> =  [];
  arrayUrlImagenes = [];
  

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
  }

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private motelProvider: MotelProvider,
    private cloudinary: Cloudinary) {
    this.objetoMotel = navParams.data;
    this.obtenerClavesImagenesMotel();
  }

  ionViewDidLoad() {
    console.log('PARAMETROS ESTAN LLEGANDO', this.objetoMotel);
  }


  obtenerClavesImagenesMotel() {
    this.motelProvider.onView(this.objetoMotel.idMotel).subscribe((data) => {
      data.datos.fotosMotel.forEach(element => {
        this.arrayClavesImagenes.push({
          nombre: element.nombre
        });
      });
   console.log('IMAGENES TRAE', this.arrayClavesImagenes);
      data.datos.serviciosMotel.forEach(element => {
        this.arrayServiciosMotel.push({
          codigo: element.codigo,
          nombre: element.nombre
        });
      });
    });
    console.log('SERVICIOS TRAE', this.arrayServiciosMotel);
  }

  habitacionesDisponibles() {
    this.navCtrl.push('HabitacionesPage',  this.objetoMotel);
  }

}
