import { Response } from '@angular/http';
import { MusicService } from '../services/music.services';
import Music from '../models/music.models';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-music',
  templateUrl: './music.component.html',
  styleUrls: ['./music.component.scss']
})
export class MusicComponent implements OnInit {

  constructor(
    //Private musicservice will be injected into the component by Angular Dependency Injector
    private musicService: MusicService
  ) { }

  //Declaring the new music Object and initilizing it
  public newMusic: Music = new Music()

  //An Empty list for the visible music list
  musicsList: Music[] = [];
  editMusics: Music[] = [];


  ngOnInit(): void {

    //At component initialization the 
    this.musicService.getMusics()
      .subscribe(musics => {
        //assign the musiclist property to the proper http response
        this.musicsList = musics
      
      })
  }
  //This method will get called on Create button event
  
  create() {
    console.log(this.newMusic);
    this.musicService.createMusic(this.newMusic)
      .subscribe((res) => {
        this.musicsList.push(res.data)
        this.newMusic = new Music()
      })
  }

  editMusic(music: Music) {
    console.log(music)
     if(this.musicsList.includes(music)){
      if(!this.editMusics.includes(music)){
        this.editMusics.push(music)
      }else{
        this.editMusics.splice(this.editMusics.indexOf(music), 1)
        this.musicService.editMusic(music).subscribe(res => {
          console.log('Update Succesful')
         }, err => {
           // this.editMusic(music)
            console.error('Update Unsuccesful')
          })
        }
      }
    }

    doneMusic(music:Music){
      music.status = 'Done'
      this.musicService.editMusic(music).subscribe(res => {
        console.log('Update Succesful')
      }, err => {
        //this.editMusic(music)
        music.status = 'Error'
        console.error('Update Unsuccesful')
      })
    }
//listening to the enter key,when the user clicks the enter key only
    submitMusic(event, music:Music){
      if(event.keyCode ==13){
        this.editMusic(music)
      }
    }

    deleteMusic(music: Music) {
      this.musicService.deleteMusic(music._id).subscribe(res => {
        this.musicsList.splice(this.musicsList.indexOf(music), 1);
      })
    }
}
