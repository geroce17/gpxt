import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-registro-usuario',
  templateUrl: './registro-usuario.component.html',
  styleUrls: ['./registro-usuario.component.css']
})
export class RegistroUsuarioComponent implements OnInit {

  public formSubmitted = false;
  public userForm = this.fb.group({
    nombre: ['', [Validators.required]],
    apellidoP: ['', [Validators.required]],
    apellidoM: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    telefono: ['', [Validators.required]]
  });

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

  crearUsuario() {
    this.formSubmitted = true;
    if (this.userForm.invalid)
      return;

      
  }

}
