import {Injectable} from '@angular/core';
import {BaseService} from '../shared/base-service/base-service.service';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ImgUploadService extends BaseService {

  imgUpload(url: string, formData: FormData): Observable<any> {
    return this.post(url, formData);
  }
}
