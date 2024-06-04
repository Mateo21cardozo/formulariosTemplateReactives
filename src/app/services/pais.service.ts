import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PaisService {

  constructor(private http : HttpClient) { }
getpaises(){
  return this.http.get<any[]>('https://restcountries.com/v3.1/lang/spanish')
  .pipe(
    map ((response:any[]) =>
       response.map(pais => ({nombre: pais.name.common, codigo:pais.cca2}))
    )
  )
}

}
