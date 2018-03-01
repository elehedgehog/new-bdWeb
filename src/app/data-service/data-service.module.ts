import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DateTimePickerModule } from 'ng-pick-datetime';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {
  DataServiceComponent
} from './data-service/data-service.component';
import {
  MultiSelectComponent
} from './multi-select/multi-select.component';
import {
  SingleSelectComponent
} from './single-select/single-select.component';
import { SimpleInputComponent } from './simple-input/simple-input.component';
import { FormsModule } from '@angular/forms';
import { DateSelectComponent } from './date-select/date-select.component';
import { GroupNavComponent } from './group-nav/group-nav.component';
import { ItemNavComponent } from './item-nav/item-nav.component';
import { HeadNavigationComponent } from '../components/head-navigation/head-navigation.component';
import {
  MultiLevelSelectComponent
} from '../data-server/multi-level-select/multi-level-select.component';
import { DataServiceService } from './data-service.service';
import { ArgDistributeComponent } from './arg-distribute/arg-distribute.component';
import { NgxJsonViewerModule } from 'ngx-json-viewer';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    DateTimePickerModule,
    NgxJsonViewerModule,
    RouterModule.forRoot([
      { path: 'dataService', component: DataServiceComponent }
    ])
  ],
  declarations: [
    DataServiceComponent,
    MultiSelectComponent,
    SingleSelectComponent,
    SimpleInputComponent,
    DateSelectComponent,
    GroupNavComponent,
    ItemNavComponent,
    HeadNavigationComponent,
    MultiLevelSelectComponent,
    ArgDistributeComponent
  ],
  exports: [
    HeadNavigationComponent
  ],
  entryComponents: [
    DataServiceComponent,
    MultiSelectComponent,
    SingleSelectComponent,
    SimpleInputComponent,
    DateSelectComponent,
    GroupNavComponent,
    ItemNavComponent
  ],
  providers: [DataServiceService]
})
export class DataServiceModule { }
