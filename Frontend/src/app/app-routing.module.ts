import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './services/auth-guard.service';

import { NavigationComponent } from './components/navigation/navigation.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { PostsComponent } from './components/posts/posts.component';
import { FileUploadComponent } from './components/file-upload/file-upload.component';
import { MultipleFileUploadComponent } from './components/multiple-file-upload/multiple-file-upload.component';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';


const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "posts", component: PostsComponent, canActivate: [AuthGuard] },
  { path: "file-upload", component: FileUploadComponent, canActivate: [AuthGuard] },
  { path: "multiple-file-upload", component: MultipleFileUploadComponent, canActivate: [AuthGuard] },
  { path: "drag-and-drop", component: UploadFilesComponent, canActivate: [AuthGuard] },
  { path: "login", component: LoginComponent },
  { path: "signup", component: SignupComponent },
  { path: "**", redirectTo: "" }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
