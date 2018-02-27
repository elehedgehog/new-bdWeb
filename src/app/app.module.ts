import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { DateTimePickerModule } from 'ng-pick-datetime';

import { TaskMonitorService } from './service/task-monitor.service';
import { HomeService } from './service/home.service';
import { HomePageService } from './service/home-page.service';
import { LoginService } from './service/login.service';
import { DataStorageService } from './service/data-storage.service';

import { AppComponent } from './app.component';
import { TaskMonitorComponent } from './components/task-monitor/task-monitor.component';
import { HomeComponent } from './components/home/home.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import {LoginComponent } from './components/login/login.component';
import {
  ProcessingStateComponent
} from './components/home/processing-state/processing-state.component';
import {
  TaskScheduleComponent
} from './components/home/task-schedule/task-schedule.component';
import {
  ProcessingCollectionComponent
} from './components/home/processing-collection/processing-collection.component';
import {
  ProcessingStatisticsComponent
} from './components/home/processing-statistics/processing-statistics.component';
import {
  CollectionRecordComponent
} from './components/collection-record/collection-record.component';
import { HeadNavigationComponent } from './components/head-navigation/head-navigation.component';
import { MaterialModule } from './src/app/module/material/material.module';
import {
  CollectingDetailDialogComponent
} from './components/collecting-detail-dialog/collecting-detail-dialog.component';
import { FormsModule } from '@angular/forms';
import { FilterSelectorComponent } from './components/filter-selector/filter-selector.component';
import { DiverFilterPipe } from './pipe/diver-filter.pipe';
import { MyPaginatorIntl } from './service/paginator.service';
import { MatPaginatorIntl } from '@angular/material';
import { CollectingEditComponent } from './components/collecting-edit/collecting-edit.component';
import { CollectingEditDetailComponent } from './components/collecting-edit-detail/collecting-edit-detail.component';

import { UserManagementComponent } from './components/user-management/user-management.component';
import { DataStorageComponent } from './components/data-storage/data-storage.component';
import {
  PowerManageComponent
} from './components/user-management/power-manage/power-manage.component';
import {
  RoleManageComponent
} from './components/user-management/role-manage/role-manage.component';
import {
  ServerManageComponent
} from './components/user-management/server-manage/server-manage.component';
import {
  UserAudictComponent
} from './components/user-management/user-audict/user-audict.component';
import {
  UserRoleChangeComponent
} from './components/user-management/user-role-change/user-role-change.component';
import {
  CreateUserComponent
} from './components/user-management/create-user/create-user.component';
import {
  DriverManageComponent
} from './components/user-management/driver-manage/driver-manage.component';
import {
  UploadDriverComponent
} from './components/user-management/upload-driver/upload-driver.component';
import { PowerManagementService } from './service/power-management.service';
import {
  CreateRoleComponent
} from './components/user-management/create-role/create-role.component';
import { DataServiceModule } from './data-service/data-service.module';
import { DataServiceComponent } from './data-service/data-service/data-service.component';
import { DialogModule } from './dialog/dialog.module';


@NgModule({
  declarations: [
    AppComponent,
    TaskMonitorComponent,
    HomeComponent,
    HomePageComponent,
    LoginComponent,
    ProcessingStateComponent,
    TaskScheduleComponent,
    ProcessingCollectionComponent,
    ProcessingStatisticsComponent,
    CollectionRecordComponent,
    CollectingDetailDialogComponent,
    CollectingEditDetailComponent,
    FilterSelectorComponent,
    DiverFilterPipe,
    CollectingEditComponent,
    UserManagementComponent,
    DataStorageComponent,
    PowerManageComponent,
    RoleManageComponent,
    ServerManageComponent,
    UserAudictComponent,
    UserRoleChangeComponent,
    CreateUserComponent,
    DriverManageComponent,
    UploadDriverComponent,
    CreateRoleComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MaterialModule,
    FormsModule,
    DateTimePickerModule,
    DataServiceModule,
    DialogModule,
    RouterModule.forRoot([
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', component: LoginComponent },
      // { path: '', pathMatch: 'full', redirectTo: 'home' },
      { path: 'home', component: HomeComponent },
      { path: 'homePage', component: HomePageComponent },
      { path: 'taskMonitor', component: TaskMonitorComponent },
      { path: 'collectionRecord', component: CollectionRecordComponent },
      { path: 'dataService', component: DataServiceComponent },
      { path: 'dataStorage', component: DataStorageComponent },
      {
        path: 'manage', component: UserManagementComponent, children: [
          { path: '', pathMatch: 'full', redirectTo: 'power' },
          { path: 'power', component: PowerManageComponent },
          { path: 'role', component: RoleManageComponent },
          { path: 'server', component: ServerManageComponent },
          { path: 'audict', component: UserAudictComponent },
          { path: 'driver', component: DriverManageComponent }
        ]
      }
    ])
  ],
  providers: [
    TaskMonitorService,
    { provide: MatPaginatorIntl, useClass: MyPaginatorIntl },
    HomeService,
    HomePageService,
    LoginService,
    DataStorageService,
    PowerManagementService
  ],
  exports: [
    HeadNavigationComponent
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    CollectingDetailDialogComponent,
    CollectingEditComponent,
    CreateUserComponent,
    UserRoleChangeComponent,
    UploadDriverComponent,
    CreateRoleComponent
  ]
})
export class AppModule { }
