import { Injectable } from '@angular/core';
import { BaseService } from './base.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileDownloadService extends BaseService{

  download(url: string, data: any, param?: {}): Observable<any> {
    return this.post(url, data, param, 'blob');
  }

  downloadGet(url: string, data: any, param?: {}): Observable<any> {
    return this.get(url, param, 'blob');
  }
}
