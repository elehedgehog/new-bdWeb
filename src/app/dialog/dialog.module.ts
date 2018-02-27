import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmComponent } from './confirm/confirm.component';
import { TipComponent } from './tip/tip.component';
import { DialogService } from './dialog.service';
import { MaterialModule } from '../src/app/module/material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [ConfirmComponent, TipComponent],
  providers: [
    DialogService
  ],
  entryComponents: [
    TipComponent,
    ConfirmComponent
  ]
})
export class DialogModule {
  constructor() {
    console.log('constructor DialogModule');
  }
}
