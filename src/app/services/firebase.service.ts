import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpEventType } from '@angular/common/http';
import { BlogModel } from '../interfaces/blog-model';
import { map, catchError, tap } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  url: string = 'https://blog-shipthis-litera.firebaseio.com/blogs.json';

  constructor(
    private http: HttpClient
  ) { }

  createAndStoreBlog(blog: BlogModel): any{
    return this.http
    .post<{ name: string }>(
      this.url,
      blog,
      {
        observe: 'response'
      }
    )
    .subscribe(responseData => {
      console.log(responseData);
    }, error => {
      console.log(error.message);
    });
  }

  fetchBlogs(): Observable<BlogModel[]> {
    let searchParams = new HttpParams();
    return this.http.get<{[key: string]: BlogModel}>(this.url,
      {
        responseType: 'json'
      }
    )
    .pipe(map(
      (responseData) => {
        const blogsArray: BlogModel[] = [];
        for (const key in responseData){
          if(responseData.hasOwnProperty(key)){
            blogsArray.push({ ...responseData[key], _id: key });
          }
        }
        return blogsArray;
      }),
      catchError(errorRes => {
        //Send to analetics server e.g.
        return throwError(errorRes);
      })
    
    );
  }

  clearBlog(id: string){
    return this.http.delete(this.fireUrl(id),
      {
        observe: 'events',
        responseType: 'text'
      }
    )
    .pipe(
      catchError((error) => {
        return throwError(error);
      })
    ).subscribe(responseData => {
      console.log(responseData);
    });
  }

  updateBlog(id: string, blog: BlogModel): any {
    return this.http.put(this.fireUrl(id), blog,
      {
        observe: 'response'
      }
    )
    .pipe(map(
      (responseData) => {
        const blogsArray: BlogModel[] = [];
        for (const key in responseData){
          if(responseData.hasOwnProperty(key)){
            blogsArray.push({ ...responseData[key], _id: key });
          }
        }
        return blogsArray;
      }),
      catchError(errorRes => {
        //Send to analetics server e.g.
        return throwError(errorRes);
      })
    );
    // .subscribe(responseData => {
    //   console.log(responseData);
    // }, error => {
    //   console.log(error.message);
    // });
  }

  fireUrl(id){
    return this.url.substr(0,this.url.length-5) + '/' +id+ '.json';
  }
}
