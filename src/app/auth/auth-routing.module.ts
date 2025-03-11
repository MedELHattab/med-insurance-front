import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyComponent } from './verify/verify.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent }, // Route for login
  { path: 'register', component: RegisterComponent }, // Route for register
  { path: 'verify', component: VerifyComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)], // Importing RouterModule with routes
  exports: [RouterModule], // Exporting RouterModule for use in AuthModule
})
export class AuthRoutingModule {}
