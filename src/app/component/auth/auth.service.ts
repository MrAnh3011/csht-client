import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Constant } from '../../share/constants/constant.class';
import { AppConfigService } from '../../core/services/app-config.service';
import { UrlConstant } from '../../share/constants/url.class';

@Injectable()
export class AuthService {
    tokenString!: string;
    constructor(private httpClient: HttpClient, private configService: AppConfigService) {
    }

    login(payload: any): Observable<any> {
        return this.httpClient.post(this.configService.getConfig().api.ossUserUrl + '/auth/login', payload);
    }

    casLogin() {
        window.location.href = this.configService.getConfig().api.casUrl;
    }

    logout(): Observable<any> {
        const headers = this.createHeaders();
        return this.httpClient.post(this.configService.getConfig().api.baseUrl + UrlConstant.LOGOUT, AuthService.getToken(), { headers });
    }

    loginToken(userToken: any): Observable<any> {
        return this.httpClient.post(this.configService.getConfig().api.baseUrl + '/loginOTP', userToken);
    }

    loginTotp(userToken: any): Observable<any> {
        return this.httpClient.post(this.configService.getConfig().api.baseUrl + '/loginTOTP', userToken);
    }

    public createHeaders() {
        return new HttpHeaders().set(Constant.AUTHORIZED_KEY.HEADER, AuthService.getToken());
    }

    private static getToken() {
        return localStorage.getItem(Constant.CACHE_KEY.TOKEN) as string | string[];
    }

}
