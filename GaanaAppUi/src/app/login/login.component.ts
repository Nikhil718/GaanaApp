import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
public loginForm!: FormGroup
  constructor(private formBuilder : FormBuilder, private http : HttpClient, private router : Router, private api: ApiService ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['',Validators.required],
      password:['',Validators.required]
    })
  }
  login(){
    this.api.login(this.loginForm.value)
    .subscribe((res=>{
      alert(res.message);
      this.loginForm.reset();
      this.router.navigate(['signup'])
    }))
  }
}
