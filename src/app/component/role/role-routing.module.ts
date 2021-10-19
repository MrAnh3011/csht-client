import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViewRoleComponent } from './view-role/view-role.component';
import { AuthGuard } from 'src/app/share/guards/auth.guard';

const routes: Routes = [
  { path: '', component: ViewRoleComponent , canActivate: [AuthGuard]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RoleRoutingModule { }
