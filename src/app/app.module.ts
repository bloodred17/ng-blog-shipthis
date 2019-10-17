import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BlogsComponent } from './blogs/blogs.component';
import { HolderComponent } from './holder/holder.component';
import { ShortenPipe } from './pipes/shorten.pipe';
import { BlogDetailsComponent } from './blogs/blog-details/blog-details.component';
import { DatemodifiedPipe } from './pipes/datemodified.pipe';
import { DatecreatedPipe } from './pipes/datecreated.pipe';
import { BlogAddComponent } from './blog-add/blog-add.component';

@NgModule({
  declarations: [
    AppComponent,
    BlogsComponent,
    HolderComponent,
    ShortenPipe,
    BlogDetailsComponent,
    DatemodifiedPipe,
    DatecreatedPipe,
    BlogAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
