import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-usuario',
  templateUrl: './detalle-usuario.component.html',
  styleUrls: ['./detalle-usuario.component.css']
})
export class DetalleUsuarioComponent implements OnInit {

  public formSubmitted = false;
  public id: string = "";
  public userForm = this.fb.group({
    nombre: ['', [Validators.required]],
    apellidoP: ['', [Validators.required]],
    apellidoM: ['', [Validators.required]],
    direccion: ['', [Validators.required]],
    telefono: ['', [Validators.required]]
  });

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private fb: FormBuilder, private userService: UserService) { }

  ngOnInit(): void {
    this.activatedRoute.params
      .subscribe(({ id }) => {
        console.log(id);

        this.getUserInfo(id)
        this.id = id;
      })
  }

  getUserInfo(uid: string) {
    this.userService.getUserInfo(uid)
      .valueChanges.pipe(
        map(({ data }) => data.findUser)
      ).subscribe(
        (userInfo: Usuario) => {
          this.userForm.patchValue(userInfo)
        })
  }

  getReloadInfo(uid: string) {
    this.userService.getUserInfo(uid).refetch();
  }

  saveUserChanges() {

    if (this.userForm.valid) {
      Swal.fire({
        title: '¿Deseas guardar los cambios?',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, guardalos'
      }).then((result) => {
        if (result.isConfirmed) {

          this.userService.updateUser(this.id, this.userForm.value)
            .subscribe((user: Usuario) => {
              Swal.fire(
                'Cambios guardados correctamente',
                'Usuario - ' + user.nombre + ' modificado',
                'success'
              ).then(() => {
                this.getReloadInfo(this.id)
              }).then(() => {
                this.getUserInfo(this.id)
              })
            })

        }
      })
    }
    else {
      Swal.fire(
        'Debes de llenar correctamente todos los campos',
        '',
        'warning'
      )
    }

  }
}
