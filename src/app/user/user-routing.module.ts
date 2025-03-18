import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { UserClaimsComponent } from './myclaims/user-claims.component';

const routes: Routes = [
  { path: 'profile', component: ProfileComponent },
  {path:'claims', component:UserClaimsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
