import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BlogModel } from '../interfaces/blog-model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiConnectionService {

  constructor(
    private http: HttpClient
  ) { }

  fetchFromServer(){
    console.log('%cInitiating GET request...', 'color: yellow; font-size: 18px;')
    return this.http.get<BlogModel[]>('http://localhost:3000/api/blog/all', {
      responseType: 'json'
    });
  }
  
  addToServer(blog: BlogModel): any {
    console.log('%cInitiating POST request...', 'color: lightpink; font-size: 18px;')
    return this.http.post<BlogModel[]>('http://localhost:3000/api/blog', blog, {
      observe: 'response',
      responseType: 'json'
    }).pipe(
      catchError(errorRes => {
        return throwError(errorRes);
      })
      )
    .subscribe((responseData) => {
      console.log(responseData);
      return responseData;
      // return new Promise((resolve, reject) => {
      //   console.log('Resolved Post');
      //   resolve(responseData);
      // });
    }, (err) => {
      console.log(err);
      return err;
      // return new Promise((resolve, reject) => {
        //   console.log('Rejected Post');
        //   reject(err);
        // });
    });
  }
    
  deleteOneFromServer(id: string): any {
    console.log('%cInitiating DELETE request...', 'color: blueviolet; font-size: 18px;')
    return this.http.delete<any>('http://localhost:3000/api/blog/'+id, {}).pipe(
      catchError(errorRes => {
        return throwError(errorRes);
      })
    ).subscribe(responseData => {
      console.log(responseData);
      return responseData;
    }, error => {
      console.log(error);
      return error; 
    });
  }

  deleteManyFromServer(ids: string[]) {
    if(ids.length < 1){
      return;
    }
    ids.forEach(id => {
      this.deleteOneFromServer(id);
    });
  }
}
