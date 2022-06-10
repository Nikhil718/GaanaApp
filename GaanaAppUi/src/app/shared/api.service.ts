import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

public loginAPIUrl : string = "https://localhost:44303/api/Login/"
public songAPIUrl : string = "https://localhost:44303/api/Songs/"
public artistAPIUrl : string = "https://localhost:44303/api/Artist/"
  constructor(private _http : HttpClient) { }

  signUp(userObj : any){
    return this._http.post<any>(`${this.loginAPIUrl}signup`, userObj)
  }

  login(userObj : any){
    return this._http.post<any>(`${this.loginAPIUrl}login`, userObj)
  }

// Song api callS
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
    return this._http.put<any>(`${this.songAPIUrl}update_song`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteSong(songid: number){
    return this._http.delete<any>(`${this.songAPIUrl}delete_song/`+songid)
    .pipe(map((res:any)=>{
      return res;
    }))
  }


  // Artist Api Call

  postArtist(data : any){
    return this._http.post<any>(`${this.artistAPIUrl}add_artist`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  getArtist(){
    return this._http.get<any>(`${this.artistAPIUrl}get_all_artist`)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  updateArtist(data : any, id: number){
    return this._http.put<any>(`${this.artistAPIUrl}update_artist`,data)
    .pipe(map((res:any)=>{
      return res;
    }))
  }

  deleteArtist(artistid: number){
    return this._http.delete<any>(`${this.artistAPIUrl}delete_artist/`+artistid)
    .pipe(map((res:any)=>{
      return res;
    }))
  }
}
