import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Motel } from '../../models/motel.model';

/*
  Generated class for the MotelProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class MotelProvider {

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': localStorage.getItem("token")
    })
  };

public url = "https://motelsinn.herokuapp.com/api"
// public url = "http://localhost:3000/api"
// public urlCloudinary= 'https://958174811683369:vH_QIhGR3VCGyaKLWUSfvt0_R18@api.cloudinary.com/v1_1/motelsinn/resources/image/upload';


constructor(private _http: HttpClient) { }

onSave(motel: Motel): Observable<any> {
    return this._http.post(`${this.url}/motel`, motel);
}

onEdit(motel: Motel, nitMotel) {
    return this._http.put(`${this.url}/motel/${nitMotel}`, motel);
}

onList() : Observable<any> {
    return this._http.get(`${this.url}/motel` );
}

onListInactivo() : Observable<any> {
    return this._http.get(`${this.url}/motelInactivo` );
}

onView(nitMotel): Observable<any> {
    return this._http.get(`${this.url}/motel/${nitMotel}`);
}

onDelete(nitMotel, estadoMotel): Observable<any> {
    return this._http.delete(`${this.url}/motel/${nitMotel}/${estadoMotel}`);
}

}
