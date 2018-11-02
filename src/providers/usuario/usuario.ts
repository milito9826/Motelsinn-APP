import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Usuario } from '../../models/usuario.model';


@Injectable()
export class UsuarioProvider {

  constructor(public _http: HttpClient) {
    console.log('Hello UsuarioProvider Provider');
  }

   httpOptions = {
    headers: new HttpHeaders({
      'Authorization': localStorage.getItem("token")
    })
  };

public url = "https://motelsinn.herokuapp.com/api"



onSave(usuario: Usuario): Observable<any> {
    return this._http.post(`${this.url}/usuario`, usuario);
}

onEdit(usuario: Usuario, idUsuario):  Observable<any> {
    return this._http.put(`${this.url}/usuario/${idUsuario}`, usuario);
}

onListInactivo() : Observable<any> {
    return this._http.get(`${this.url}/usuarioInactivo` );
}


onList() : Observable<any> {
    return this._http.get(`${this.url}/usuario` );
}

onView(idUsuario): Observable<any> {
    return this._http.get(`${this.url}/usuario/${idUsuario}`);
}

onDelete(idUsuario, estadoUsuario): Observable<any> {
   return this._http.delete(`${this.url}/usuario/${idUsuario}/${estadoUsuario}`);
}

onlogin(usuario) : Observable<any> {
    return this._http.post(`${this.url}/login`, usuario);
  }

buscarUser(correo: string): Observable<any> {
   return this._http.post(`${this.url}/buscarUsuario`, {correoUsuario: correo});
}

}
