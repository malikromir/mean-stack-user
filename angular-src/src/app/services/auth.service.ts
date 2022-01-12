import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authToken: any;
  user: any;
  jwtHelper = new JwtHelperService();
  constructor(private http: HttpClient) {}

  registerUser(user: any) {
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post('http://localhost:3000/users/register', user, {
      headers: header,
    });
  }
  authenticateUser(user: any) {
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
    });
    return this.http.post('http://localhost:3000/users/authenticate', user, {
      headers: header,
    });
  }
  getProfile() {
    this.loadToken();
    let header = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: this.authToken,
    });
    return this.http.get('http://localhost:3000/users/profile', {
      headers: header,
    });
  }
  storeUserData(token: any, user: any) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
  loggedIn() {
    return !this.jwtHelper.isTokenExpired(
      localStorage.getItem('id_token')?.toString()
    );
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
