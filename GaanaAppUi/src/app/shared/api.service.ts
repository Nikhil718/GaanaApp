import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

public loginAPIUrl : string = "https://localhost:44303/api/Login/"
  constructor(private _http : HttpClient) { }

  signUp(userObj : any){
    return this._http.post<any>(`${this.loginAPIUrl}signup`, userObj)
  }

  login(userObj : any){
    return this._http.post<any>(`${this.loginAPIUrl}login`, userObj)
  }
}
