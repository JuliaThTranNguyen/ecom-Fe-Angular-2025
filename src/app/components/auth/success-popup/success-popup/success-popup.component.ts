import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-popup',
  templateUrl: './success-popup.component.html',
  standalone: false,
})
export class SuccessPopupComponent {
  constructor(
    public dialogRef: MatDialogRef<SuccessPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { message: string }
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.closeDialog();
    }, 2000);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
