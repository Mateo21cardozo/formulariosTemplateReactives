import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProvinciaService {

  constructor(private http : HttpClient) { }
getprovincia(){
  return this.http.get<any[]>('https://apis.datos.gob.ar/georef/api/provincias?campos=id,nombre')
  .pipe(
    map ((response:any[]) =>
       response.map(pais => ({nombre: pais.name.common, codigo:pais.cca2}))
    )
  )
}

}
