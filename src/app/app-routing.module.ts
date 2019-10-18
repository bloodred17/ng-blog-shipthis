import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HolderComponent } from './holder/holder.component';
import { BlogDetailsComponent } from './blogs/blog-details/blog-details.component';
import { BlogsComponent } from './blogs/blogs.component';
import { AppComponent } from './app.component';
import { BlogAddComponent } from './blog-add/blog-add.component';


const routes: Routes = [
  { path: '', component: BlogsComponent },
  { path: 'blog/:id', component: BlogDetailsComponent },
  { path: 'add', component: BlogAddComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
