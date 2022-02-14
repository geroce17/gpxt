import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Usuario } from 'src/app/interfaces/usuario.interface';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'


@Component({
  selector: 'app-listado-usuarios',
  templateUrl: './listado-usuarios.component.html',
  styleUrls: ['./listado-usuarios.component.css']
})
export class ListadoUsuariosComponent implements OnInit {

  public usuarios: Usuario[] = [];
  public loading: boolean = true;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
    this.userService.getAllUsers().refetch();
    this.getAllUsers();
  }

  getAllUsers() {
    this.loading = true;
    this.usuarios = [];
    this.userService.getAllUsers()
    .valueChanges.pipe(
      map((data: any) => data.data.allUsers))
      .subscribe(
        (users: Usuario[]) => {
          this.usuarios = users;
          this.loading = false;
        })
  }

  reloadUsers(){

    this.userService.getAllUsers().refetch();
    this.getAllUsers();
    
  }

  searchUsers(termino: string) {
    this.loading = true;
    this.userService.searchUsers(termino)
      .subscribe((results: Usuario[]) => {
        this.usuarios = results;
        this.loading = false;
      });
  }

  deleteUser(uid: string, index: number) {
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
          .subscribe((message: any) => {

            Swal.fire(
              'Usuario eliminado',
              message.data.deleteUser,
              'success'
            ).then(() => {
              this.reloadUsers();
            });
          });
      }
    });
  }

  detailUser(uid: string) {
    this.router.navigate(['/usuario', uid]);
  }
}
