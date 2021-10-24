import { Component, OnInit, ViewChild, AfterViewInit, OnChanges } from '@angular/core';
import { User } from '../../../core/models/user.class';
import { Constant } from '../../../share/constants/constant.class';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { NotificationService } from '../../../core/services/notification.service';
import { CustomValidator } from '../../../share/custom-validator/noWhitespace.class';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService, } from 'ng-zorro-antd/message';
import { Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cookie } from 'ng2-cookies/ng2-cookies';
import { AuthService } from '../../auth/auth.service';
import { UrlConstant } from '../../../share/constants/url.class';
import { UploadImageComponent } from '../../../share/component/upload-image/upload-image.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit, AfterViewInit {
  readonly uploadAvatarUrl = '/core/' + UrlConstant.UPLOAD_AVATAR;

  selectedTabIndex = 1;
  userInfo: User;
  formProfile!: FormGroup;
  formChangePassword!: FormGroup;
  submitted = false;
  pSubmitted = false;
  loading = false;
  avatarUrl?: string;
  imageUrl?: string;
  uploadFileName = '';
  sub: Subscription;
  isTotpLoginType = false;
  isOtpLoginType = false;

  @ViewChild(UploadImageComponent) uploadImageComponent: UploadImageComponent;

  constructor(
    private notificationService: NotificationService,
    private translate: TranslateService,
    private fb: FormBuilder,
    private fbChangePassword: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private msg: NzMessageService,
    private http: HttpClient,
    private authService: AuthService,
    private routeDriect: Router,
  ) {
    this.formProfile = this.fb.group({
      name: [null, [Validators.required]],
      email: [[null], [Validators.required, CustomValidator.cannotContainSpace,
      Validators.minLength(6), Validators.email, Validators.maxLength(100)]],
      phone: [[null], [Validators.required]],
    });

    this.formChangePassword = this.fbChangePassword.group({
      oldPassword: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      password: [null, [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
      checkPassword: [null, [Validators.required, this.confirmationValidator, Validators.minLength(6)]],
    });
  }
  ngOnInit(): void {
    const pageType = this.route.snapshot.paramMap.get('tabName');
    if (pageType !== 'change-password') {
      this.selectedTabIndex = 0;
    } else {
      this.selectedTabIndex = 1;
    }
    this.userInfo = new User();
    this.userInfo.name = 'Hello world';
    this.userInfo = JSON.parse(localStorage.getItem(Constant.USER_INFO));
    this.checkLoginType(this.userInfo.requireOtp);
    // this.imageUrl = this.userInfo.imageUrl;

  }

  checkLoginType(loginType: number) {
    switch (loginType) {
      case 1: {
        this.isOtpLoginType = true;
        this.isTotpLoginType = false;
        break;
      }
      case 2: {
        this.isTotpLoginType = true;
        this.isOtpLoginType = false;
        break;
      }
      default: {
        this.isTotpLoginType = false;
        this.isOtpLoginType = false;
        break;
      }
    }
  }

  ngAfterViewInit() {
    this.formProfile.addControl('imageUrl', this.uploadImageComponent.form.controls.imageUrl);
    this.uploadImageComponent.form.setParent(this.formProfile);
    this.pathValue();
  }

  pathValue() {
    this.formProfile.patchValue({
      userId: this.userInfo.userId,
      email: this.userInfo.email,
      name: this.userInfo.name,
      userName: this.userInfo.userName,
      phone: this.userInfo.phoneNumber,
      imageUrl: this.userInfo.imageUrl
    });
  }
  get f() { return this.formProfile.controls; }
  get fChangePass() { return this.formChangePassword.controls; }
  submitFormChangePassword(): void {
    this.pSubmitted = true;
    if (this.formChangePassword.valid) {
      const formVal = this.formChangePassword.value;
      console.log(formVal);
      const payload = { newpassword: formVal.password, oldpassword: formVal.oldPassword, repassword: formVal.checkPassword };
      this.userService.changePassword(payload).subscribe(res => {
        // console.log('res', res);
        if (res !== null && res.IsValid === true) {
          this.notificationService.showNotification(Constant.SUCCESS, this.translate.instant(Constant.MESSAGE_UPDATE_SUCCESS));
          setTimeout(() => {
            this.logout();
          }, 1500);
        } else {
          // this.notificationService.showNotification(Constant.ERROR, res.Errors[0].ErrorMessage);
          this.notificationService.showNotification(Constant.ERROR, res.Errors[0].ErrorMessage);
        }
      }, error => {
        this.notificationService.showNotification(Constant.ERROR, 'Có lỗi gì đó');
      });
    }
  }
  submitForm(): void {
    this.submitted = true;
    if (this.formProfile.valid) {
      this.userService.updateProfile(this.formProfile.value).subscribe(res => {
        if (res !== null) {

          localStorage.setItem(Constant.USER_INFO, JSON.stringify(res));
          this.notificationService.showNotification(Constant.SUCCESS, this.translate.instant(Constant.MESSAGE_UPDATE_SUCCESS));
        }
      }, error => {
        // this.notificationService.showNotification(Constant.SUCCESS, Constant,);
      });
    }
  }
  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.formChangePassword.controls.checkPassword.updateValueAndValidity());
  }
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value !== this.formChangePassword.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  }
  // beforeUpload = (file: UploadFile, _fileList: UploadFile[]) => {

  //   return new Observable((observer: Observer<boolean>) => {
  //     const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  //     if (!isJpgOrPng) {
  //       this.msg.error('You can only upload JPG/PNG file!');
  //       observer.complete();
  //       return;
  //     }
  //     const isLt2M = file.size! / 1024 / 1024 < 2;
  //     if (!isLt2M) {
  //       this.msg.error('Image must smaller than 2MB!');
  //       observer.complete();
  //       return;
  //     }
  //     observer.next(isJpgOrPng && isLt2M);
  //     observer.complete();
  //   });
  // };

  // private getBase64(img: File, callback: (img: string) => void): void {
  //   const reader = new FileReader();
  //   reader.addEventListener('load', () => callback(reader.result!.toString()));
  //   reader.readAsDataURL(img);
  // }

  // handleChange(info: { file: UploadFile }): void {
  //   switch (info.file.status) {
  //     case 'uploading':
  //       this.loading = true;
  //       break;
  //     case 'done':
  //       this.loading = false;
  //       this.imageUrl = info.file.response.thumbUrl;
  //       break;
  //     case 'error':
  //       this.msg.error('Network error');
  //       this.loading = false;
  //       break;
  //   }
  // }
  // handleUpload = (item: any) => {
  //   this.loading = true;
  //   const formData = new FormData();

  //   formData.append('file', item.file as any);
  //   this.userService.uploadAvatar(formData).subscribe(res => {
  //     this.loading = false;
  //     this.imageUrl = res.fileDownloadUri;
  //     this.formProfile.patchValue({
  //       imageUrl: this.imageUrl
  //     });
  //   }, error => {
  //     this.notificationService.showNotification(Constant.ERROR, error.message.toString());
  //   });
  // }
  logout() {
    this.sub = this.authService.logout().subscribe(res => {
      if (res) {
        localStorage.clear();
        this.routeDriect.navigate(['/login']);
      }
    });
  }
}
