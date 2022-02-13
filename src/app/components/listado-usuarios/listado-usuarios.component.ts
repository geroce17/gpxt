import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {

  listaUsuarios: Usuario[] = [];
  NoUsers: number = 0;
  loading: boolean = true;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getAllUsers()
      .subscribe((users: Usuario[]) => {
        if (users.length > 0) {
          this.listaUsuarios = users;
        }
        else{
          this.listaUsuarios = [];
        }

        this.loading = false;
      })
  }

  searchUsers(termino: string) {
    this.loading = true;
    this.userService.searchUsers(termino)
      .subscribe((results: Usuario[]) => {
        this.listaUsuarios = results;
        this.loading = false;
      });
  }

  deleteUser(uid: string) {
    Swal.fire({
      title: '¿Deseas borrar este usuario?',
      text: "Este procedimiento es irreversible",
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: "Cancelar",
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, borralo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(uid)
          .subscribe(message => {
            console.log(message);
            this.userService.deleteUser(uid)
              .subscribe(data => {
                Swal.fire(
                  'Usuario eliminado',
                  // `${data} fue eliminado correctamente`,
                  'success'
                ).then(() => {
                  this.loadUsers();
                })
              });
          });
      }
    })
  }
}
