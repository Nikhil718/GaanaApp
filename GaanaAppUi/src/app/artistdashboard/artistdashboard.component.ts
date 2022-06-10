import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { ArtistModel } from './artistdashboard_model';

@Component({
  selector: 'app-artistdashboard',
  templateUrl: './artistdashboard.component.html',
  styleUrls: ['./artistdashboard.component.css']
})
export class ArtistdashboardComponent implements OnInit {
formValue !: FormGroup;
artistModelObj : ArtistModel = new ArtistModel();
artistData !: any;
showAdd !: boolean;
showUpdate !: boolean;

  constructor(private formbuilder: FormBuilder, private api : ApiService) { }

  ngOnInit(): void {
    this.formValue = this.formbuilder.group({
      artistid: [''],
      artistname : [''],
      dob :[''],
      bio :['']
  })
  this.getAllArtist();
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
    deleteArtist(row : any){
      this.api.deleteArtist(row.artistid)
      .subscribe(res=>{
        alert("Artist Deleted")
        this.getAllArtist();
      })
    }
    onEdit(row: any){
      this.showAdd = false;
      this.showUpdate = true;
      this.artistModelObj.artistid = row.artistid;
      this.formValue.controls['artistname'].setValue(row.artistname)
      this.formValue.controls['dob'].setValue(row.dob)
      this.formValue.controls['bio'].setValue(row.bio)
    }
    updateArtistDetails(){
      this.artistModelObj.artistname = this.formValue.value.artistname;
      this.artistModelObj.dob = this.formValue.value.dob;
      this.artistModelObj.bio = this.formValue.value.bio;
      this.api.updateArtist(this.artistModelObj,this.artistModelObj.artistid)
      .subscribe(res=>{
        alert("Updated successfully")
        let ref = document.getElementById('cancel')
        ref?.click();
        this.formValue.reset();
        this.getAllArtist();
      })
    }

}
