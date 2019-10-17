import { Component, OnInit, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { BlogModel } from '../interfaces/blog-model';
import { EditorService } from '../services/editor.service';
import { ApiConnectionService } from '../services/api-connection.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-blog-add',
  templateUrl: './blog-add.component.html',
  styleUrls: ['./blog-add.component.css']
})
export class BlogAddComponent implements OnInit {
  @Input() blogToBeUpdated: BlogModel;
  @Input() updateEditorMode: boolean = false;
  @Output() showEditor = new EventEmitter<boolean>();
  // ToDo: Formal FORM VALIDATION
  flag:boolean = true;
  submitted: boolean = false;
  messages: string[];
  @ViewChild('f', {static: false}) blogInputData: NgForm;
  @ViewChild('textarea', { static: false }) textarea: ElementRef;
  @ViewChild('title', { static: false }) title: ElementRef;
  @ViewChild('tags', { static: false }) tags: ElementRef;

  constructor(
    private editorService: EditorService,
    private api: ApiConnectionService
  ) { }
  blog: BlogModel = {
    title: '',
    content: '',
    dateCreated: undefined,
    dateModified: undefined,
    tags: []
  }
  ngOnInit() {
  }

  onSubmit(){
    this.flag = true;
    this.messages = [];
    console.log('flag: '+this.flag+', submitted: '+this.submitted);
    console.log('Form submitted');
    console.log(this.blogInputData);

    const form = this.blogInputData.form.value;
    if(this.title.nativeElement.value.length < 3){
      this.flag = false;
      this.messages.push('Title should be more than 3 characters long.');
    }else{
      this.blog.title = form.title;
    }
    if(this.textarea.nativeElement.value.length < 30){
      this.flag = false;
      this.messages.push('Content should be more than 30 characters long.')
    }else{
      this.blog.content = form.content;
    }
    this.blog.dateCreated = new Date();
    this.blog.dateModified = this.blog.dateCreated;
    this.blog.tags = this.editorService.tagsAdder(this.blog.tags, form.tags);
    for(let key in this.blog){
      if(this.blog[key] === ''){
        this.flag = false;
        break;
      }
    }
    if(this.flag){
      console.log(this.blog);
      this.postBlog(this.blog);
    }
    this.submitted = true;

  }

  postBlog(data){
    this.api.addToServer(data);
    console.log('Requst to POST...');
  }

  onClear(){
    this.textarea.nativeElement.value = '';
    this.title.nativeElement.value = '';
    this.tags.nativeElement.value = '';
    this.flag = true;
    this.submitted = false;
  }

  onCancel(){
    this.showEditor.emit(false);
  }

  onUpdate(): BlogModel{
    const blogUpdate: BlogModel = {
      _id: this.blogToBeUpdated._id,
      content: this.textarea.nativeElement.value,
      title: this.title.nativeElement.value,
      dateCreated: undefined,
      dateModified: undefined,
      tags: this.editorService.tagsAdder(this.blogToBeUpdated.tags,this.tags.nativeElement.value)
    }
    // blogUpdate.tags = 
    blogUpdate.dateCreated = this.blogToBeUpdated.dateCreated;
    blogUpdate.dateModified = new Date();
    // console.log(blogUpdate);
    return blogUpdate;
  }

  onPublish(){
    const blogData = this.onUpdate();
    this.api.updateToServer(blogData);
  }

  onCopy(){
    this.title.nativeElement.value = this.blogToBeUpdated.title;
    this.textarea.nativeElement.value = this.blogToBeUpdated.content;
    this.tags.nativeElement.value = this.blogToBeUpdated.tags.join(',');
  }
}
