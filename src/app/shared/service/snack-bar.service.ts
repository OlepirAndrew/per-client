import { inject, Injectable, ViewContainerRef } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { AriaLivePoliteness } from '@angular/cdk/a11y';
import { Direction } from '@angular/cdk/bidi';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {
  private _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, status: string) {
    const config = {
      // politeness: 'of', //AriaLivePoliteness; 'off' | 'polite' | 'assertive'
      // announcementMessage: 'announcementMessage',
      // viewContainerRef?: ViewContainerRef;
      // duration: 1000,
      // panelClass: 'snack-bar',
      // direction: 'ltr', //'ltr' | 'rtl';
      // data: new Date(),
      // horizontalPosition: 'start', //'start' | 'center' | 'end' | 'left' | 'right';
      // verticalPosition: 'top'  //'top' | 'bottom';
    };
    // snack-bar-success
    console.log('status',  `snack-bar-${status}`)

    this._snackBar.open(message, 'Close', {
      verticalPosition: 'bottom',
      panelClass: `${status}-snackbar`,
      // duration: 5000,
    });
  }
}

