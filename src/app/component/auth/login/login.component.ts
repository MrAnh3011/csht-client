import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { Constant } from '../../../share/constants/constant.class';
import { Util } from '../../../share/utils/util.class';
import { AuthService } from '../auth.service';
import { User } from '../../../core/models/user.class';
import { AuthModel, MenuLoginModel, UserInfo } from '../../../core/models/auth.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {
  validateForm: FormGroup;
  returnUrl: string;
  messageError: string;
  sub: Subscription;
  user: User;
  auth: AuthModel;
  userInfo: UserInfo;
  menu: MenuLoginModel;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private translate: TranslateService,
    //private store: Store<fromAuth.AppState>,
    private route: ActivatedRoute,
    private authService: AuthService) { }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      userName: [null, [Validators.required]],
      password: [null, [Validators.required]],
      loginType: 1,
      requestId: Util.genRequestId(),
      requestDate: Util.genRequestDate()
    });
    // this.returnUrl = this.route.snapshot.queryParams.returnUrl || Constant.WELCOME;
    // const currentUser = localStorage.getItem(Constant.TOKEN);
    // if (currentUser) {
    //   this.router.navigate([Constant.WELCOME]);
    // }
  }

  submitForm(): void {
    this.sub = this.authService.login(this.validateForm.value).subscribe(res => {

      if (res !== null) {
        this.userInfo = res.userInfo;
        this.menu = res.menuDtoList;

        localStorage.setItem(Constant.CACHE_KEY.TOKEN, res.token);
        localStorage.setItem(Constant.CACHE_KEY.USER_INFO, JSON.stringify(this.userInfo));
        localStorage.setItem(Constant.CACHE_KEY.MENU, JSON.stringify(this.menu));
        localStorage.setItem(Constant.CACHE_KEY.ROLES, JSON.stringify(this.userInfo.roles));

        this.auth = res;
        this.router.navigate([res.userInfo.redirectUrl]);
      }
    }, error => {
      this.messageError = this.translate.instant(Constant.LOGIN_FAIL);
    });
  }
  casLogin(): void {
    this.messageError = this.translate.instant(Constant.AUTH_MSG_KEY.CAS_DISABLE)
    // this.authService.casLogin();
  }
}
