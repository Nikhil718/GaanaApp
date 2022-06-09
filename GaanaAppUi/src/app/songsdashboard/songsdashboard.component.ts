import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { SongModel } from './songdashboard.model';
import { ArtistModel } from '../artistdashboard/artistdashboard_model';
@Component({
  selector: 'app-songsdashboard',
  templateUrl: './songsdashboard.component.html',
  styleUrls: ['./songsdashboard.component.css']
})
export class SongsdashboardComponent implements OnInit {
  formValue !: FormGroup;
  songModelObj : SongModel = new SongModel();
  artistModelObj : ArtistModel = new ArtistModel();
  songData !: any;
  artistData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(private formbuilder: FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      songid: [''],
      songname : [''],
      artistname :[''],
      ratings :['']
      
    })
    this.getAllSong();
  }
  
  clickAddSong(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postSongDetails(){
    this.songModelObj.songname = this.formValue.value.songname;
    this.songModelObj.artistname = this.formValue.value.artistname;
    this.songModelObj.ratings = this.formValue.value.rating;
    

    this.api.postSong(this.songModelObj)
    .subscribe(res=>{
      alert("Song Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllSong();
    },
    err=>{
      alert("Something Went Wrong")
    })
  }
  getAllSong(){
this.api.getSong()
.subscribe(res=>{
  this.songData = res.songsDetails;
})
  }
  deleteSong(row : any){
    this.api.deleteSong(row.songid)
    .subscribe(res=>{
      alert("Song Deleted")
      this.getAllSong();
    })
  }
  
  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.songModelObj.songid = row.songid;
    this.formValue.controls['songname'].setValue(row.songname)
    this.formValue.controls['artistname'].setValue(row.artistname)
    this.formValue.controls['ratings'].setValue(row.ratings)
  }
  updateSongDetails(){
    this.songModelObj.songname = this.formValue.value.songname;
    
    this.songModelObj.artistname = this.formValue.value.artistname;
    this.songModelObj.ratings = this.formValue.value.rating;
    this.api.updateSong(this.songModelObj,this.songModelObj.songid)
    .subscribe(res=>{
      alert("Updated successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllSong();
    })
  }


  clickAddArtist(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
}
