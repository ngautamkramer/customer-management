// dialog-example.component.ts
import { Component } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { Inject } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-confirm-box',
  template: `
    <h2 mat-dialog-title>{{data?.title}}</h2>
    <mat-dialog-content>
      <p>{{ data?.content }}</p>
    </mat-dialog-content>
    <mat-dialog-actions align="end">
      <button class="btn btn-default" mat-button mat-dialog-close style="gap: 15px;">Close</button>
      <button class="btn btn-primary" mat-button (click)="confirm()">Confirm</button>
    </mat-dialog-actions>
  `,
  styleUrl: './confirm-box.component.css',
  imports: [MatDialogModule], // Import MatDialogModule here
})
export class ConfirmBoxComponent {
  constructor(
    private dialogRef: MatDialogRef<ConfirmBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  confirm() {
    this.dialogRef.close(true);
  }
}
