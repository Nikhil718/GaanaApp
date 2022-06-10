import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { SongModel } from './songdashboard.model';
import { ArtistModel } from '../artistdashboard/artistdashboard_model';
import { ArtistdashboardComponent } from '../artistdashboard/artistdashboard.component';
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
  artistdropdown !: any;



  constructor(private formbuilder: FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      songid: [''],
      songname : [''],
      ratings :[''],
      artistname :[''],
      dob : [''],
      bio : ['']
      
    })
    this.getAllSong();
    

  }

  initializedropdown(){
     this.api.getArtist()
    .subscribe(res=>{
      this.artistdropdown = res.artistDetails;
    })
  }
  
  clickAddSong(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postSongDetails(){
    this.initializedropdown();
    this.songModelObj.songname = this.formValue.value.songname;
    this.songModelObj.artistId = this.formValue.value.artistname;
    this.songModelObj.ratings = this.formValue.value.ratings;
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
    this.initializedropdown();
    this.showAdd = false;
    this.showUpdate = true;
    this.songModelObj.id = row.songid;
    this.formValue.controls['songname'].setValue(row.songname)
    //console.log(this.formValue.controls['artistname'])
    this.formValue.controls['artistname'].setValue(row.artistid,{onlySelf: true})
    console.log(row.artistid);
    this.formValue.controls['ratings'].setValue(row.ratings)
  }
  updateSongDetails(){
    this.songModelObj.songname = this.formValue.value.songname;
    
    this.songModelObj.artistId = this.formValue.value.artistname;
    this.songModelObj.ratings = this.formValue.value.ratings;
    this.api.updateSong(this.songModelObj,this.songModelObj.id)
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


  postArtistDetails(){
    this.artistModelObj.artistname = this.formValue.value.artistname;
    this.artistModelObj.dob = this.formValue.value.dob;
    this.artistModelObj.bio = this.formValue.value.bio;
    
  
    this.api.postArtist(this.artistModelObj)
    .subscribe(res=>{
      alert("Artist Added Successfully")
      let ref = document.getElementById('cancel')
      ref?.click();
      this.formValue.reset();
      this.getAllArtist();
    },
    err=>{
      alert("Something Went Wrong")
    })
  }

  getAllArtist(){
    this.api.getArtist()
    .subscribe(res=>{
      this.artistData = res.artistDetails;
    })
      }
}
