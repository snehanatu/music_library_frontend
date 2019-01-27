import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MusicComponent } from "./music/music.component";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from './about/about.component';

const routes: Routes = [
  
  { path: '', redirectTo: "/home", pathMatch: 'full' },
  { path: 'music', component: MusicComponent },
  { path: 'home', component: HomeComponent },
  {path: 'about', component: AboutComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }