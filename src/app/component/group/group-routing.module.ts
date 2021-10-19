import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViewGroupComponent } from './view-group/view-group.component';
import { AuthGuard } from 'src/app/share/guards/auth.guard';

const routes: Routes = [
  { path: '', component: ViewGroupComponent, canActivate: [AuthGuard] }

]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRoutingModule { }
