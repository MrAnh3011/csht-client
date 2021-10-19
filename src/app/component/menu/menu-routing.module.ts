import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ViewMenuComponent } from './view-menu/view-menu.component';
import { AuthGuard } from 'src/app/share/guards/auth.guard';

const routes: Routes = [
  { path: '', component: ViewMenuComponent , canActivate: [AuthGuard]}
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MenuRoutingModule { }
