import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtistdashboardComponent } from './artistdashboard/artistdashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { SongsdashboardComponent } from './songsdashboard/songsdashboard.component';

const routes: Routes = [
  {path:'', redirectTo:'login', pathMatch:'full'},
  {path:'login', component:LoginComponent},
  {path:'signup', component:SignupComponent},
  {path:'songsdashboard', component: SongsdashboardComponent},
  {path: 'artistdashboard', component: ArtistdashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
