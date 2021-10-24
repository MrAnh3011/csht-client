import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { iconsData } from './icon-data';

@Injectable({
  providedIn: 'root'
})
export class IconSelectService {

  constructor() { }
  getIcons(): Observable<string[]> {
    return of(iconsData);
  }
}
