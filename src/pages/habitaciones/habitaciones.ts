import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { HabitacionProvider } from '../../providers/habitacion/habitacion';
import { ClaveImagenes, serviciosMotel } from '../../models/motel.model';

@IonicPage()
@Component({
  selector: 'page-habitaciones',
  templateUrl: 'habitaciones.html',
})
export class HabitacionesPage {
  @ViewChild(Slides) slides: Slides;
  objetoMotel: any;
  arrayClavesImagenes: Array<ClaveImagenes> = [];
  arrayServiciosHabitacion: Array<serviciosMotel> = [];
  arrayHabitacionesMotel: any;
  totalHabitaciones;
  atributosHabitaciones: Array<any>;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public habitacionProvider: HabitacionProvider) {
    this.objetoMotel = navParams.data;
    this.obtenerClavesImagenesHabitacionesPorMotel();
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.resultadoConsultaHabitaciones();
    }, 2000);
  }

  ngAfterViewInit() {
  
  }

  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    console.log('Current index is', currentIndex);
  }

  obtenerClavesImagenesHabitacionesPorMotel() {
    this.habitacionProvider.onListHabitacionesMotel(/*this.objetoMotel.idMotel*/'5bdbc0e704df6000155dbcbb').subscribe((data) => {
      this.totalHabitaciones = data.datos;
      data.datos.forEach((element, index) => {
        this.arrayClavesImagenes.push(element.fotoHabitacion);

        // element.servicioHabitacion.forEach(servicio => {
        //   this.arrayServiciosHabitacion.push({ codigo: servicio.codigo, nombre: servicio.nombre });
        // });


      });

    });

  }

  resultadoConsultaHabitaciones() {
    console.log('USTED QUE TIENE SAPO', this.totalHabitaciones);
    console.log('USTED QUE TIENE SUPER SAPO', this.arrayClavesImagenes);
  }
}

