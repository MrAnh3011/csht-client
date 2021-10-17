import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user-view/user.component';
import { AuthGuard } from '../../share/guards/auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';



const routes: Routes = [
    { path: '', component: UserComponent, canActivate: [AuthGuard] },
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
