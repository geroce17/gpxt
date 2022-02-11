import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ListadoUsuariosComponent } from './components/listado-usuarios/listado-usuarios.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { RegistroUsuarioComponent } from './pages/registro-usuario/registro-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DetalleUsuarioComponent } from './pages/detalle-usuario/detalle-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    ListadoUsuariosComponent,
    RegistroUsuarioComponent,
    DetalleUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
