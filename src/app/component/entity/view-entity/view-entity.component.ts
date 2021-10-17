import {Component, Input, OnInit} from '@angular/core';
import {ActionsSubject} from '@ngrx/store';
import {FormBuilder, FormGroup} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {NzModalService} from 'ng-zorro-antd';
import {TableSelectionAbstract} from 'src/app/shared/component/table/table-selection.abstract';

import {NotificationService} from '../../../service/notification.service';
import {LoaderService} from '../../../service/loader.service';
import {AppConfigService} from '../../../../app-config.service';
import {EntityAddModel, EntityDto, EntityFilter} from "../../../model/entity.class";
import {EntityService} from "../../../service/entity.service";
import {Util} from "../../../shared/utils/util.class";
import {AuthGuard} from "../../../shared/guards/guards.class";

@Component({
  selector: 'app-view-entity',
  templateUrl: './view-entity.component.html',
  styleUrls: ['./view-entity.component.scss']
})
export class ViewEntityComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
