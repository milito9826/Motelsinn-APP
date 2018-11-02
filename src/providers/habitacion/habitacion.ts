import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

/*
  Generated class for the HabitacionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HabitacionProvider {

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': localStorage.getItem("token")
    })
  };

public url = "https://motelsinn.herokuapp.com/api"
// public url = "http://localhost:3000/api"
// public urlCloudinary= 'https://958174811683369:vH_QIhGR3VCGyaKLWUSfvt0_R18@api.cloudinary.com/v1_1/motelsinn/resources/image/upload';

constructor(public _http: HttpClient) { }

onListHabitacionesMotel(nitMotel): Observable<any> {
  return this._http.get(`${this.url}/habitacionPorMotel/${nitMotel}`);
}

}
