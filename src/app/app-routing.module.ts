import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./component/layout.module').then(m => m.LayoutModule),
    data: { breadcrumb: 'Home' }
  },
  { 
    path: 'login',
    loadChildren: () => import('./component/auth/auth.module').then (m => m.AuthModule)
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
