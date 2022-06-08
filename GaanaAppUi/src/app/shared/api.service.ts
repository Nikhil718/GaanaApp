import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

public loginAPIUrl : string = "https://localhost:44303/api/Login/"
public songAPIUrl : string = "https://localhost:44303/api/Songs/"
  constructor(private _http : HttpClient) { }

  signUp(userObj : any){
    return this._http.post<any>(`${this.loginAPIUrl}signup`, userObj)
  }

  login(userObj : any){
    return this._http.post<any>(`${this.loginAPIUrl}login`, userObj)
  }


  postSong(data : any){
    return this._http.post<any>(`${this.songAPIUrl}add_song`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getSong(){
    return this._http.get<any>(`${this.songAPIUrl}get_all_songs`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateSong(data : any, id: number){
    return this._http.put<any>("",data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteSong(id: number){
    return this._http.delete<any>("")
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
