import Music from '../models/music.models';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Response} from '@angular/http';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

@Injectable()
export class MusicService {

  api_url = 'http://localhost:3000';
  musicUrl = `${this.api_url}/api/musics`;

  constructor(    private http: HttpClient) {}

   

//Create music, takes a Music Object

  createMusic(music: Music): Observable<any>{
    //returns the observable of http post request 
    console.log("music.services.ts: " + music);
    return this.http.post(`${this.musicUrl}`, music);
  }

  //Read music, takes no arguments
  getMusics(): Observable<Music[]>{ 
    return this.http.get(this.musicUrl)
    .pipe(map(res  => {
      //Maps the response object sent from the server
       // console.log(res)
      return res["data"].docs as Music[];
    }))
  }

  
//Update music, takes a Music Object as parameter
  editMusic(music:Music){
    let editUrl = `${this.musicUrl}`
    //returns the observable of http put request 
    return this.http.put(editUrl, music);
  }

  deleteMusic(id:string):any{
    //Delete the object by the id
    let deleteUrl = `${this.musicUrl}/${id}`
    return this.http.delete(deleteUrl)
    .pipe(map(res  => {
      return res;
    }))
  }

  
  private handleError(error: any): Promise<any> {
    console.error('An error occurred', error); 
    // for demo purposes only
    return Promise.reject(error.message || error);
  }


}