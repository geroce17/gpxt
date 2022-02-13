import { Injectable } from '@angular/core';
import { Apollo, gql } from 'apollo-angular';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Usuario } from '../interfaces/usuario.interface';

const USERS = gql`
  {
    allUsers {
      _id
      nombre
      apellidoP
      apellidoM
      telefono
      direccion
    }
    userCount
  }
`;

const SEARCH_USERS = gql`
  query ($termino: String!) {
    searchUser(termino: $termino){
      _id
      nombre
      apellidoP
      apellidoM
      telefono
      direccion
    }
  }
`;

const DELETE_USER = gql`
  mutation ($uid: ID!) {
    deleteUser(uid: $uid)
  }
`;

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private apollo: Apollo) { }

  getAllUsers() {
    return this.apollo.watchQuery<any>({ query: USERS }).valueChanges.pipe(
      map((data) => data.data.allUsers))
  }

  searchUsers(termino: String) {
    return this.apollo.watchQuery<any>(
      {
        query: SEARCH_USERS,
        variables: {
          termino: termino
        }
      },
    ).valueChanges.pipe(map(
      ({ data }) => data.searchUser)
    );
  }

  deleteUser(uid: string){
    console.log(uid);
    
    return this.apollo.mutate({
      mutation: DELETE_USER,
      variables: {
        uid
      }
    });
  }
}
