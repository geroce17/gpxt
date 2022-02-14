import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ListadoUsuariosComponent } from './components/listado-usuarios/listado-usuarios.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { RegistroUsuarioComponent } from './pages/registro-usuario/registro-usuario.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DetalleUsuarioComponent } from './pages/detalle-usuario/detalle-usuario.component';

import {APOLLO_OPTIONS} from 'apollo-angular';
import {HttpLink} from 'apollo-angular/http';
import {ApolloClientOptions, InMemoryCache} from '@apollo/client/core';
import { HttpClientModule } from '@angular/common/http';

const uri = 'http://localhost:4000'; // <-- add the URL of the GraphQL server here
export function createApollo(httpLink: HttpLink): ApolloClientOptions<any> {
  return {
    link: httpLink.create({uri}),
    cache: new InMemoryCache(),
  };
}

@NgModule({
  declarations: [
    AppComponent,
    UsuariosComponent,
    ListadoUsuariosComponent,
    RegistroUsuarioComponent,
    DetalleUsuarioComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: APOLLO_OPTIONS,
      useFactory: createApollo,
      deps: [HttpLink],
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
