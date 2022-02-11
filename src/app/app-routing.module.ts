import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { RegistroUsuarioComponent } from './pages/registro-usuario/registro-usuario.component';
import { DetalleUsuarioComponent } from './pages/detalle-usuario/detalle-usuario.component';

const routes: Routes = [
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'registro', component: RegistroUsuarioComponent },
    { path: 'usuario/:id', component: DetalleUsuarioComponent },
    { path: '**', redirectTo: '/usuarios', pathMatch: 'full' },
]

@NgModule({
    declarations: [],
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [RouterModule]
})

export class AppRoutingModule { }