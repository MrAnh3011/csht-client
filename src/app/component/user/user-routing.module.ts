import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserViewComponent } from './user-view/user-view.component';
import { AuthGuard } from '../../share/guards/auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
    { path: '', component: UserViewComponent, canActivate: [AuthGuard] },
    {
        path: 'profile', component: UserProfileComponent, canActivate: [AuthGuard], data: {
            pagename: 'profile_page_name',
            breadcrumb: 'Profile'
        }
    },
    {
        path: 'profile/:tabName', component: UserProfileComponent, canActivate: [AuthGuard], data: {
            pagename: 'profile_page_name',
            breadcrumb: 'Profile'
        }
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class UserRoutingModule { }
