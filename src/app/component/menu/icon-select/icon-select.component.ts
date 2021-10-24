import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IconSelectService } from './icon-select.service';
import { FormGroup, FormBuilder } from '@angular/forms';
@Component({
  selector: 'app-icon-select',
  templateUrl: './icon-select.component.html',
  styleUrls: ['./icon-select.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class IconSelectComponent implements OnInit {
  form: FormGroup;
  icons: Observable<string[]> = this.iconSelectService.getIcons();
  isLoading = false;
  optionList: string[] = [];
  selectedIcon: any = null;
  constructor(private fb: FormBuilder, private iconSelectService: IconSelectService) {
    this.form = this.fb.group({
      icon: [null],
    });
  }

  ngOnInit(): void {
    this.loadMore();
  }

  loadMore(): void {
    this.isLoading = true;
    this.icons.subscribe(data => {
      this.isLoading = false;
      this.optionList = [...this.optionList, ...data];
    });
  }
}
