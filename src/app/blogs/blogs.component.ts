import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ApiConnectionService } from '../services/api-connection.service';
import { BlogModel } from '../interfaces/blog-model';
import { DataBridgeService } from '../services/data-bridge.service';
import { EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-blogs',
  templateUrl: './blogs.component.html',
  styleUrls: ['./blogs.component.css']
})
export class BlogsComponent implements OnInit {
  @ViewChild('remove', { static: false }) removeCheckbox: ElementRef;
  blogs$: Observable<BlogModel[]>;
  checkBlogData: EventEmitter<string> = new EventEmitter();
  message: string;
  messageStatus: boolean = false;
  remove: boolean = false;
  removeMessage: string = 'Nothing to remove.';
  

  constructor(
    private dataProvider: DataBridgeService,
    private api:ApiConnectionService,
    private route: ActivatedRoute,
    private elRef: ElementRef,
    private router: Router
  ) { }
  
  ngOnInit() {
    console.log("%cInitializing Blogs Component", "color:brown; font-size:18px");
    this.blogs$ = this.api.fetchFromServer();
    
    this.route.queryParams.subscribe((data) => {
      this.remove = data.remove? true: false;
    });
    console.log(this.remove);

    this.message = 'No Blog to display. Go ahead and add some.';
    console.log(this.message);
    this.displayMessage();
  }

  async displayMessage(){
    let blogs = await this.blogs$.toPromise().then(result => {
      return result;
    });
    console.log(blogs);
    this.messageStatus = (blogs.length < 1)? true: false;
    // this.remove = (blogs.length < 1)? false: true;
  }

  removeBlog(){
    // console.log(this.removeCheckbox);
    // console.log(this.elRef.nativeElement.firstElementChild.nextElementSibling);
    const container = this.elRef.nativeElement.firstElementChild.nextElementSibling;
    const cards = container.children;
    const cardsArr = [...cards];
    console.log(cardsArr);
    const blogsToRemove = cardsArr.map((blog) => {
      const checkbox = blog.firstElementChild.firstElementChild.nextElementSibling;
      const id = checkbox.id;
      if(checkbox.checked){
        return id;
      }else{
        return '';
      }
    }).filter((blog) => {
      return (blog === '')? false: true;
    });
    console.log(blogsToRemove);
    this.api.deleteManyFromServer(blogsToRemove);

    setTimeout(() => {
      window.location.reload();
    }, 2000);
  }

  

}
