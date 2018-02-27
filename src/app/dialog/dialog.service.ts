import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { MatDialog, MatDialogRef } from '@angular/material';
import { ConfirmComponent } from './confirm/confirm.component';
import { TipComponent } from './tip/tip.component';

@Injectable()
export class DialogService {

  constructor(
    private dialog: MatDialog
  ) {
    this.addTipMessageStackEvent();
  }

  tipMessageArray: BehaviorSubject<{
    type: 'warn' | 'error' | 'success'
    tip: string
  }> = new BehaviorSubject(null);
  tipDialogHolder: MatDialogRef<TipComponent> = null;
  delayCloseTipDialogHolder = null;

  openConfirm(type: string, title: string, des: string) {
    return new Promise(resolve => {
      const dialogRef = this.dialog.open(ConfirmComponent, {
        data: {
          type,
          title,
          des
        }
      });
      dialogRef.afterClosed().subscribe(() => {
        resolve(dialogRef.componentInstance.isConfirm);
      });
    });
  }

  displayTip(type: 'warn' | 'error' | 'success', tip: string) {
    this.tipMessageArray.next({
      type,
      tip
    });
  }

  private addTipMessageStackEvent() {
    this.tipMessageArray.subscribe(val => {
      if (!val) {
        return;
      }
      if (this.tipDialogHolder) {
        this.tipDialogHolder.close();
        if (this.delayCloseTipDialogHolder) {
          clearTimeout(this.delayCloseTipDialogHolder);
          this.delayCloseTipDialogHolder = null;
        }
        this.delayCloseTipDialogHolder = setTimeout(() => {
          this.tipDialogHolder = this.dialog.open(TipComponent, {
            data: {
              type: val.type,
              tip: val.tip
            }
          });
          this.tipDialogHolder.afterClosed().subscribe(() => this.tipDialogHolder = null);
        }, 300);
        return;
      }
      this.tipDialogHolder = this.dialog.open(TipComponent, {
        data: {
          type: val.type,
          tip: val.tip
        }
      });
      this.tipDialogHolder.afterClosed().subscribe(() => this.tipDialogHolder = null);
    });
  }
}
