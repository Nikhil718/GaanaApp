import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { SongModel } from './songdashboard.model';

@Component({
  selector: 'app-songsdashboard',
  templateUrl: './songsdashboard.component.html',
  styleUrls: ['./songsdashboard.component.css']
})
export class SongsdashboardComponent implements OnInit {
  formValue !: FormGroup;
  songModelObj : SongModel = new SongModel();
  songData !: any;
  showAdd !: boolean;
  showUpdate !: boolean;

  constructor(private formbuilder: FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      songname : [''],
      image : [''],
      artist :[''],
      rating :[''],
      userid :[''],
      artistid : ['']
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
   
    this.songModelObj.artist = this.formValue.value.artist;
    this.songModelObj.rating = this.formValue.value.rating;
    

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
    this.api.deleteSong(row.id)
    .subscribe(res=>{
      alert("Song Deleted")
      this.getAllSong();
    })
  }
  
  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.songModelObj.id = row.id;
    this.formValue.controls['songName'].setValue(row.songname)
    this.formValue.controls['artist'].setValue(row.artist)
    this.formValue.controls['rating'].setValue(row.rating)
  }
  updateSongDetails(){
    this.songModelObj.songname = this.formValue.value.songname;
    
    this.songModelObj.artist = this.formValue.value.artist;
    this.songModelObj.rating = this.formValue.value.rating;
    this.api.updateSong(this.songModelObj,this.songModelObj.id)
    .subscribe(res=>{
      alert("Updated successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllSong();
    })
  }

}
