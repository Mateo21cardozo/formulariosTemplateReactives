import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { PaisService } from '../../services/pais.service';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.css'],
})
export class TemplateComponent implements OnInit {
  usuario = {
    nombre: 'Mateo',
    apellido: 'Cardozo',
    correo: 'mateo21cardozo@gmail.com',
    pais: 'AR',
    genero: 'M'
  };

  paises: any []=[];
  constructor(private paisService: PaisService ) {}

  guardar(forma: NgForm) {
    // console.log(forma);
    console.log(forma.value);
    if (forma.invalid) {
      Object.values(forma.controls).forEach((control) => {
        control.markAsTouched();
      });
    }
  }
  ngOnInit(): void {
      this.paisService.getpaises()
        .subscribe( paises => {this.paises = paises;
          this.paises.unshift({
          nombre: '(Seleccionar Pais)',
          codigo: ''
          })
        })
  }
}
