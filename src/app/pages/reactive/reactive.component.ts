import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { ProvinciaService } from 'src/app/services/provincia.service';
import { ValidadoresService } from 'src/app/services/validadores.service';

@Component({
  selector: 'app-reactive',
  templateUrl: './reactive.component.html',
  styleUrls: ['./reactive.component.css'],
})
export class ReactiveComponent implements OnInit {
  forma!: FormGroup<any>;
  provinciasService!: ProvinciaService
  constructor(
    private fb: FormBuilder,
    private validadores: ValidadoresService
  ) {
    this.crearFormulario();
    this.cargarDatosFormulario();
    this.crearListeners();
  }
  ngOnInit(): void {}
  get nombreNovalido() {
    return (
      this.forma.get('nombre')?.invalid && this.forma.get('nombre')?.touched
    );
  }
  get pasatiempos() {
    return this.forma.get('pasatiempos') as FormArray;
  }
  get apellidoNovalido() {
    return (
      this.forma.get('apellido')?.invalid && this.forma.get('apellido')?.touched
    );
  }
  get correoNovalido() {
    return (
      this.forma.get('correo')?.invalid && this.forma.get('correo')?.touched
    );
  }
  get usuarioNovalido() {
    return (
      this.forma.get('usuario')?.invalid && this.forma.get('usuario')?.touched
    );
  }
  get distritoNovalido() {
    return (
      this.forma.get('direccion.distrito')?.invalid &&
      this.forma.get('direccion.distrito')?.touched
    );
  }
  get ciudadNovalido() {
    return (
      this.forma.get('direccion.ciudad')?.invalid &&
      this.forma.get('direccion.ciudad')?.touched
    );
  }
  get password1Novalido() {
    return (
      this.forma.get('password1')?.invalid &&
      this.forma.get('password1')?.touched
    );
  }
  get password2Novalido() {
    const password1 = this.forma.get('password1')?.value;
    const password2 = this.forma.get('password2')?.value;
    return password1 === password2 ? false : true;
  }
  crearFormulario() {
    this.forma = this.fb.group(
      {
        nombre: ['', [Validators.required, Validators.minLength(5)]],
        apellido: ['', [Validators.required], this.validadores.noCardozo],
        correo: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
          ],
        ],
        usuario: ['', , this.validadores.existeUsuario],
        password1: ['', Validators.required],
        password2: ['', Validators.required],
        direccion: this.fb.group({
          distrito: ['', Validators.required],
          ciudad: ['', Validators.required],
        }),
        pasatiempos: this.fb.array([]),
      },
      {
        validators: this.validadores.passwordsIguales('password1', 'password2'),
      }
    );
  }
  crearListeners() {
    // this.forma.valueChanges.subscribe((valor) => {
    //   console.log(valor);
    // });
    // this.forma.statusChanges.subscribe(status=> console.log({ status }))
  this.forma.get('nombre')?.valueChanges.subscribe(console.log);}
cargarDistrito(){
  this.provinciasService
  .getprovincia()
  .subscribe(distrito=> console.log(distrito))
}
  cargarDatosFormulario() {
    // this.forma.setValue( {
    this.forma.reset({
      nombre: 'Juancito',
      apellido: 'Perez',
      correo: 'mateitoi@.com',
      password1: '123',
      password2: '123',
      direccion: {
        distrito: 'Corrientes',
        ciudad: 'Curuzu',
      },
    });
  }
  agregarPasatiempo() {
    this.pasatiempos.push(this.fb.control(''));
  }
  borrarPasatiempo(i: number) {
    this.pasatiempos.removeAt(i);
  }
  guardar() {
    console.log(this.forma);
    if (this.forma.invalid) {
      return Object.values(this.forma.controls).forEach((control) => {
        if (control instanceof FormGroup) {
          return Object.values(control.controls).forEach(
            (control) => control.markAsTouched
          );
        } else {
          control.markAsTouched();
        }
      });
    }

    //posteo de informacion

    // reseteo de formulario
    this.forma.reset({ nombre: 'sin nombre'});
  }
}
