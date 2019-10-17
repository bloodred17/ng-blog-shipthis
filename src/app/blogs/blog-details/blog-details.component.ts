import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BlogModel } from 'src/app/interfaces/blog-model';
import { ApiConnectionService } from 'src/app/services/api-connection.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css']
})
export class BlogDetailsComponent implements OnInit {
  id: string;
  blogs$: Observable<BlogModel[]>;
  editorDisplayStatus: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private api: ApiConnectionService
  ) { }

  ngOnInit() {
  // -------------Getting ID from url
    this.id = this.route.snapshot.params['id'];
  //If id is not retrieveable using snapshot trying subscription
    if(this.id === undefined || this.id === null){
      this.route.params.subscribe((params: Router) => {
        this.id = params['id'];
      });
    } 
    this.blogs$ = this.api.fetchFromServer();
  }

  // ---------------Displays Editor on clicking Edit
  onEdit(){
    this.editorDisplayStatus = true;
    console.log(this.editorDisplayStatus);
  }

  onShowEditor(eventData){
    // this.editorDisplayStatus = eventData;
    console.log(eventData);
    setTimeout(() => {
      window.location.reload();
    },500);
  }
}
