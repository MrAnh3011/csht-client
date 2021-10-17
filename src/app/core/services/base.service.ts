import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConfigService } from './app-config.service';
import { Constant } from '../../share/constants/constant.class';

@Injectable()
export class BaseService {

    constructor(
        public httpClient: HttpClient,
        protected configService: AppConfigService
    ) {
    }

    get(url: string, params?: {}, responseType?: string): Observable<any> {
        switch (responseType) {
            case 'text':
                return this.httpClient.get(this.configService.getConfig().api.baseUrl + url, {
                    headers: this.createHeaders().set('skipLoading', 'true') || {},
                    params,
                    responseType: 'text',
                });
            case 'blob':
                return this.httpClient.get(this.configService.getConfig().api.baseUrl + url, {
                    headers: this.createHeaders().set('skipLoading', 'true') || {},
                    params,
                    responseType: 'blob',
                });
            default:
                return this.httpClient.get(this.configService.getConfig().api.baseUrl + url, {
                    headers: this.createHeaders().set('skipLoading', 'true') || {},
                    params
                });
        }
    }

    async getWithAsync(url: string, params?: {}, responseType?: string) {
        switch (responseType) {
            case 'text':
                return await this.httpClient.get(this.configService.getConfig().api.baseUrl + url, {
                    headers: this.createHeaders().set('skipLoading', 'true') || {},
                    params,
                    responseType: 'text',
                }).toPromise();
            case 'blob':
                return await this.httpClient.get(this.configService.getConfig().api.baseUrl + url, {
                    headers: this.createHeaders().set('skipLoading', 'true') || {},
                    params,
                    responseType: 'blob',
                }).toPromise();
            case 'arraybuffer':
                return await this.httpClient.post(this.configService.getConfig().api.baseUrl + url, {
                    headers: this.createHeaders() || {},
                    responseType: 'arraybuffer',
                    params
                }).toPromise();
            default:
                return await this.httpClient.get(this.configService.getConfig().api.baseUrl + url, {
                    headers: this.createHeaders().set('skipLoading', 'true') || {},
                    params
                }).toPromise();
        }
    }

    post(url: string, data: any, params?: {}, responseType?: string): Observable<any> {
        switch (responseType) {
            case 'text':
                return this.httpClient.post(this.configService.getConfig().api.baseUrl + url, data, {
                    headers: this.createHeaders().set('skipLoading', 'true') || {},
                    responseType: 'text',
                    params
                });
            case 'blob':
                return this.httpClient.post(this.configService.getConfig().api.baseUrl + url, data, {
                    headers: this.createHeaders().set('skipLoading', 'true') || {},
                    responseType: 'blob',
                    params
                });
            default:
                return this.httpClient.post(this.configService.getConfig().api.baseUrl + url, data, {
                    headers: this.createHeaders().set('skipLoading', 'true') || {},
                    params
                });
        }
    }

    /**
     * Update an entity.
     */
    put(url: string, data: any, responseType?: string): Observable<any> {
        switch (responseType) {
            case 'text':
                return this.httpClient.put(this.configService.getConfig().api.baseUrl + url, data, {
                    headers: this.createHeaders() || {},
                    responseType: 'text'
                });
            default:
                return this.httpClient.put(this.configService.getConfig().api.baseUrl + url, data, {
                    headers: this.createHeaders() || {},
                });
        }
    }

    /**
     * Delete an entity.
     */
    delete(url: string, id: any, responseType?: string): Observable<any> {
        switch (responseType) {
            case 'text':
                return this.httpClient.delete(this.configService.getConfig().api.baseUrl + url + "/" + id, {
                    headers: this.createHeaders() || {},
                    responseType: 'text'
                });
            default:
                return this.httpClient.delete(this.configService.getConfig().api.baseUrl + url + "/" + id, {
                    headers: this.createHeaders() || {},
                });
        }
    }

    public createHeaders() {
        // Why "authorization": see CustomLogoutSuccessHandler on server
        return new HttpHeaders().set(Constant.AUTHORIZED_KEY.HEADER, this.getToken());
    }

    private getToken() {
        return localStorage.getItem(Constant.CACHE_KEY.TOKEN) as string | string[];
    }

}
