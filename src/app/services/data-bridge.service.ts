import { Injectable } from '@angular/core';
import { ApiConnectionService } from './api-connection.service';
import { BlogModel } from '../interfaces/blog-model';
import { from, Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { on } from 'cluster';

@Injectable({
  providedIn: 'root'
})
export class DataBridgeService {
  private blogs: BlogModel[] = [];
  private blog: Observable<BlogModel>;
  private blogs$: Observable<BlogModel[]>;
  constructor(
    private api: ApiConnectionService
  ) { }

  fillBlogsData(): void {
    this.api.fetchFromServer().subscribe((result) => {
      // this.blogs = [];
      this.blogs = result;
      console.log('dataService Blogs');
      console.log(this.blogs);
    });
  }

  provideBlogsObservable(): Observable<BlogModel> {
    // return this.api.fetchFromServer().pipe(
    //   map((data) => {
    //     console.log(data);
    //   }),
    //   catchError(errorRes => {
    //     return throwError(errorRes);
    //   })
    // );

    this.api.fetchFromServer().subscribe((result) => {
      // this.blogs = [];
      this.blogs = result;
      console.log('dataService Blogs');
      console.log(this.blogs);
    });
    return from(this.blogs);
  }

  provideBlogs(): BlogModel[] {
    // this.fillBlogsData();
    return this.blogs;
  }

}
