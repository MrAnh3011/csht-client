import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { LoaderService } from './core/services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewChecked, AfterViewInit {
  isLoading: Subject<boolean> = this.loaderService.isLoading;
  title: Function;
  //showSplash = true;
  constructor(private loaderService: LoaderService, private cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }
  ngAfterViewChecked(): void {
    this.cdRef.detectChanges();
  }
  ngAfterViewInit(): void {
  } 
}
