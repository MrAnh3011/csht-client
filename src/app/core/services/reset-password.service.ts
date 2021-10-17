import { UrlConstant } from 'src/app/shared/constants/url.class';
import { Injectable } from '@angular/core';
import { BaseService } from '../shared/base-service/base-service.service';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService extends BaseService {
    sendEmailResetPW(email) {
      return this.post(UrlConstant.RESET_PASSWORD.SEND_EMAIL_RESER_PW,email);
    }

    checkToken(token) {
      return this.post(UrlConstant.RESET_PASSWORD.CHECK_TOKEN, token);
    }

    resetPassword(data) {
      return this.post(UrlConstant.RESET_PASSWORD.RESET_PW, data);
    }
}
