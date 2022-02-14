import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

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

  constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  createUser() {
    if(this.userForm.valid){
      Swal.fire({
        title: '¿Deseas crear un nuevo usuario?',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, crear'
      }).then((result) => {
        if (result.isConfirmed) {
          
          this.userService.createUser(this.userForm.value)
            .subscribe((user: Usuario) => {
              Swal.fire(
                'El usuario ' + user.nombre + ' ha sido creado correctamente',
                '',
                'success'
              ).then(() => {
                this.router.navigate(['/usuarios']);
              })
            })
  
        }
      })
    }
    else{
      Swal.fire(
        'Debes de llenar correctamente todos los campos',
        '',
        'warning'
      )
    }
    
  }

}
