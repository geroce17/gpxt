import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
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

const USER_INFO = gql`
  query ($uid: ID!) {
    findUser(uid: $uid){
      _id
      nombre
      apellidoP
      apellidoM
      telefono
      direccion
    }
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
  mutation deleteUser($uid: ID!) {
    deleteUser(uid: $uid)
  }
`;

const CREATE_USER = gql`
mutation createUser($userInfo: UserInfo!) {
  createUser(userInfo: $userInfo){
    nombre
    apellidoP
    apellidoM
    telefono
    direccion
  }
}
`;

const UPDATE_USER = gql`
  mutation updateUser($uid: ID!, $userInfo: UserInfo!) {
    updateUser(uid: $uid, userInfo: $userInfo) {
      nombre
      apellidoP
      apellidoM
      telefono
      direccion
    }
  }
`;

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private apollo: Apollo) { }

  getAllUsers(): QueryRef<any> {
    return this.apollo.watchQuery<any>({ query: USERS });
  }

  getUserInfo(uid: string): QueryRef<any> {
    return this.apollo.watchQuery<any>({
      query: USER_INFO,
      variables: {
        uid
      }
    })
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

  deleteUser(uid: string) {
    console.log(uid);

    return this.apollo.mutate({
      mutation: DELETE_USER,
      variables: {
        uid
      }
    });
  }

  createUser(userInfo: Usuario) {
    console.log(userInfo);
    
    return this.apollo.mutate({
      mutation: CREATE_USER,
      variables: {
        userInfo
      }    
    }).pipe(
      map((data: any) => data.data.createUser)
    )
  }

  updateUser(uid: string, userInfo: Usuario) {
    return this.apollo.mutate({
      mutation: UPDATE_USER,
      variables: {
        uid,
        userInfo
      }
    }).pipe(
      map((data: any) => data.data.updateUser)
    )
  }
}
