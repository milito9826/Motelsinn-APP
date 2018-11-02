import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker,
  Environment,
  LatLng,
  GoogleMapsAnimation
} from '@ionic-native/google-maps';
import { MotelProvider } from '../../providers/motel/motel';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  datosMoteles = [];
  datosPorMotel = [];
  element: HTMLElement;
  map: GoogleMap;
  parametrosHabitaciones = {
    nombreMotel: '',
    idMotel: '',
    descripcionMotel: ''
  };

  constructor(public navCtrl: NavController, 
              public geolocation: Geolocation,
              private googlemaps: GoogleMaps,
              private motelProvider: MotelProvider) {

  }

  ngAfterViewInit() {
    this.geolocationNative();  
   
  }
  
  geolocationNative() {
    this.geolocation.getCurrentPosition().then((geoposition: Geoposition) => {
        this.loadMap(geoposition);
    });
  }

  loadMap(position) {
    this.element = document.getElementById('map');
    this.map = GoogleMaps.create(this.element);
    let latLng = new LatLng(position.coords.latitude, position.coords.longitude);
  
  
  // PRIMERO HAGO LA CONSULTA DE LOS MOTELES
     this.motelProvider.onList().subscribe((data) =>{
  
      data.datos.forEach(element => {
        let latLng = new LatLng(element.latitudMotel, element.longitudMotel);
          this.datosMoteles.push({
              position: latLng,
              codigo: element._id,
              name: element.nombreMotel,
              descripcionMotel: element.descripcionMotel,
              icon: './assets/imgs/logosMoteles.png'
          });  
       });
     }, error => {
          console.log('No se pueden obtener la informacion de los moteles', error);
     });
  //FIN CONSULTA MOTELES
  
  console.log('que datos hay por aqui', this.datosMoteles);
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      let position: any = {
                 target: latLng,
                 zoom: 15,
                 tilt: 30
              };
  
              this.map.moveCamera(position);
  
                    let markerOptions: MarkerOptions = {
                      position: latLng,
                      title: 'Tú',
                      icon: './assets/imgs/ubicacionPersonal.png'
                      
                    };
                    let marker = this.map.addMarker(markerOptions).then((marker: Marker) => {
                        marker.showInfoWindow();
                    });
                    this.adicionarMarcadoresMoteles();
                         
    });
  }
  
  adicionarMarcadoresMoteles() {
    this.datosMoteles.forEach((element, index) => {
      let marcadoresMoteles: MarkerOptions = {
        position: this.datosMoteles[index].position,
        title: this.datosMoteles[index].name,
        icon: this.datosMoteles[index].icon,
        codigo: this.datosMoteles[index].codigo,
        descripcionMotel: this.datosMoteles[index].descripcionMotel
  
      };
      setTimeout(() => {
        let markerMotel = this.map.addMarker(marcadoresMoteles).then((marker: Marker) => {
          marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe((params) => {
            let latLng: LatLng = params[0];
            let marker: Marker = params[1];
            marker.setAnimation(GoogleMapsAnimation.BOUNCE);
            // Asignar parametros a la pagina habitaciones
            this.parametrosHabitaciones.idMotel = marker.get('codigo');
            this.parametrosHabitaciones.nombreMotel = marker.get('title');
            this.parametrosHabitaciones.descripcionMotel =  marker.get('descripcionMotel');
            this.navCtrl.push('MotelesPage', this.parametrosHabitaciones);
            
          });
      });
      }, 2000);
     
    });
  
  }


  

}
