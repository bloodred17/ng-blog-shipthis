import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { BlogModel } from '../interfaces/blog-model';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { FirebaseService } from './firebase.service';

@Injectable({
  providedIn: 'root'
})
export class ApiConnectionService {

  constructor(
    private http: HttpClient,
    private firebase: FirebaseService
  ) { }

  //-------------GET request
  fetchFromServer(): Observable<BlogModel[]>{
    console.log('%cInitiating GET request...', 'color: yellow; font-size: 18px;');

    // -------------- Node Server ---------------
    // return this.http.get<BlogModel[]>('http://localhost:3000/api/blog/all', {
    //   responseType: 'json'
    // });

    // --------------- Firebase -------------------
    return this.firebase.fetchBlogs();
  }

  //-------------POST request
  addToServer(blog: BlogModel): any {
    console.log('%cInitiating POST request...', 'color: lightpink; font-size: 18px;');

    // -------------- Node Server ---------------
    // return this.http.post<BlogModel[]>('http://localhost:3000/api/blog', blog, {
    //   observe: 'response',
    //   responseType: 'json'
    // }).pipe(
    //   catchError(errorRes => {
    //     return throwError(errorRes);
    //   })
    //   )
    // .subscribe((responseData) => {
    //   console.log(responseData);
    // }, (err) => {
    //   console.log(err);
    // });

    // --------------- Firebase -------------------
    return this.firebase.createAndStoreBlog(blog);
  }
    
  //-------------DELETE request
  deleteOneFromServer(id: string): any {
    console.log('%cInitiating DELETE request...', 'color: blueviolet; font-size: 18px;');

    // -------------- Node Server ---------------
    // return this.http.delete<any>('http://localhost:3000/api/blog/'+id, {}).pipe(
    //   catchError(errorRes => {
    //     return throwError(errorRes);
    //   })
    // ).subscribe(responseData => {
    //   console.log(responseData);
    //   return responseData;
    // }, error => {
    //   console.log(error);
    //   return error; 
    // });

    // --------------- Firebase -------------------
    return this.firebase.clearBlog(id);
  }

  deleteManyFromServer(ids: string[]) {
    if(ids.length < 1){
      return;
    }
    ids.forEach(id => {
      this.deleteOneFromServer(id);
    });
  }

  //-------------UPDATE request
  updateToServer(id:string, blogData: BlogModel): any {

    // -------------- Node Server ---------------
    // console.log('%cInitiating PUT request...', 'color: orange; font-size: 18px;');
    // return this.http.put<any>('http://localhost:3000/api/blog/'+id, blogData, { 
    //   observe: 'response',
    //   responseType: 'json'
    // }).pipe(
    //   catchError(errorRes => {
    //     return throwError(errorRes);
    //   })
    // )

    // --------------- Firebase -------------------
    
    return this.firebase.updateBlog(id, blogData).toPromise().then((data) => {
    });
  }
}
