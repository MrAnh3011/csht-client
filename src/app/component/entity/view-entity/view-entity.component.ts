import { Component, Input, OnInit } from '@angular/core';
import { ActionsSubject } from '@ngrx/store';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TableSelectionAbstract } from '../../../share/component/table/table-selection.abstract';
import { NotificationService } from '../../../core/services/notification.service';
import { LoaderService } from '../../../core/services/loader.service';
import { AppConfigService } from '../../../core/services/app-config.service';
import { EntityAddModel, EntityDto, EntityFilter } from "../../../core/models/entity.class";
import { EntityService } from "../entity.service";
import { Util } from "../../../share/utils/util.class";
import { AuthGuard } from "../../../share/guards/auth.guard";

@Component({
  selector: 'app-entity',
  templateUrl: './view-entity.component.html',
  styleUrls: ['./view-entity.component.scss']
})
export class ViewEntityComponent extends TableSelectionAbstract implements OnInit {
  data: EntityDto[] = [];
  formSearch: FormGroup;
  loading: boolean;
  page: any;
  defaultPage: any;
  pageSize: any;
  @Input() isView = false;
  nzCanceText: string;
  nzOkText: string;
  submitted: boolean;
  isVisibleAdd = false;
  isVisibleUpdate = false;
  isVisibleDelete = false;
  isDisplayUpdateModal = false;
  total: number;
  entityFilter = new EntityFilter();
  entityAddModel = new EntityAddModel();

  constructor(
    public translate: TranslateService,
    private modalService: NzModalService,
    private notificationService: NotificationService,
    private actionsSubject$: ActionsSubject,
    public loaderService: LoaderService,
    private configService: AppConfigService,
    private fb: FormBuilder,
    private entityService: EntityService,
  ) {
    super('id');
    this.formSearch = this.fb.group({
      name: '',
      status: -99
    });
  }

  ngOnInit(): void {
    this.pageSize = this.configService.getConfig().defaultPage;
    this.page = this.configService.getConfig().page;
    this.defaultPage = this.configService.getConfig().defaultPage;
    this.entityFilter.page = this.page;
    this.entityFilter.pageSize = this.pageSize;

    this.isVisibleAdd = AuthGuard.checkRole('ENTITY_ADD');
    this.isVisibleUpdate = AuthGuard.checkRole('ENTITY_UPDATE');
    this.isVisibleDelete = AuthGuard.checkRole('ENTITY_DELETE');
    this.filterEntity();
  }


  get() {
    this.translate.use(this.translate.currentLang).subscribe(data => {
      this.data = data;
    });
  }

  getRowIndex(index: number, pageIndex: number, pageSize: number) {
    return index + 1 + pageSize * (pageIndex - 1);
  }

  searchData(reset: boolean = false): void {
    this.loading = true;
    if (reset) {
      this.entityFilter.page = 1;
    }

    this.entityService.filter(this.entityFilter).subscribe((res) => {
      this.total = res.totalRow;
      this.data = res.entityDtoList;
      if (this.total !== 0) {
        this.data.forEach(obj => obj.strStatus = Util.convertStatus(obj.status));
        super.setListOfAllData(this.data);
      }
      this.total = res.totalRow;
      this.loading = false;
    }, error => {
      this.loading = false;
      this.notificationService.showMessage('error', error.error.message);
    });
  }


  filterEntity() {
    this.entityFilter.name = this.formSearch.get('name').value;
    this.entityFilter.status = this.formSearch.get('status').value;
    this.entityFilter.page = this.page;
    this.entityFilter.pageSize = this.defaultPage;
    this.searchData(true);
  }

  deleteEntity(data: any) {
    if (data != undefined && data.entityId != undefined) {
      this.entityService.deleteEntity(data.entityId).subscribe(res => {
        this.filterEntity();
        this.notificationService.showMessage('success', 'Xóa đối tượng thành công');
      }, error => {
        this.notificationService.showMessage('error', error.error.message);
      });
    }
  }

  showModalAdd() {
    this.isDisplayUpdateModal = true;
  }

  closeModelAdd(value: any) {
    this.isDisplayUpdateModal = value;
    this.filterEntity();
  }

}
