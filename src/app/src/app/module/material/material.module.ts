import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatDialogModule,
  MatTooltipModule,
  MatSnackBarModule,
  MatPaginatorModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatToolbarModule
  ],
  declarations: [],
  exports: [
    MatDialogModule,
    MatTooltipModule,
    MatPaginatorModule,
    MatToolbarModule
  ]
})
export class MaterialModule { }
