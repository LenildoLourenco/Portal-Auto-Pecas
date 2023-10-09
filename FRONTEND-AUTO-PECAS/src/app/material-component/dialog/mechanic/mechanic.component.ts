import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MechanicService } from 'src/app/services/mechanic.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-mechanic',
  templateUrl: './mechanic.component.html',
  styleUrls: ['./mechanic.component.scss']
})
export class MechanicComponent implements OnInit {
  onAddMechanic = new EventEmitter();
  onEditMechanic = new EventEmitter();
  mechanicForm: any = FormGroup;
  dialogAction: any = "Adicionar";
  action: any = "Adicionar";
  responseMessage: any;
  disabled: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
  private formBuilder: FormBuilder,
  private mechanicService: MechanicService,
  public dialogRef: MatDialogRef<MechanicComponent>,
  private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.mechanicForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      specialty: [null, [Validators.required]]
    });
    if (this.dialogData.action === 'Editar') {
      this.dialogAction = "Editar";
      this.action = "Editar";
      this.disabled = true;
      this.mechanicForm.patchValue(this.dialogData.data);
    }
  }

  handleSubmit() {
    if (this.dialogAction === "Editar") {
      this.edit();
    }
    else {
      this.add();
    }
  }

  add() {
    var formData = this.mechanicForm.value;
    var data = {
      name: formData.name,
      specialty: formData.specialty
    }
    this.mechanicService.add(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onAddMechanic.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    }, (error: any) => {
      this.dialogRef.close();
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

  edit() {
    var formData = this.mechanicForm.value;
    var data = {
      id: this.dialogData.data.id,
      name: formData.name,
      specialty: formData.specialty
    }
    this.mechanicService.update(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onEditMechanic.emit();
      this.responseMessage = response.message;
      this.snackbarService.openSnackBar(this.responseMessage, "success");
    }, (error: any) => {
      this.dialogRef.close();
      if (error.error?.message) {
        this.responseMessage = error.error?.message;
      }
      else {
        this.responseMessage = GlobalConstants.genericError;
      }
      this.snackbarService.openSnackBar(this.responseMessage, GlobalConstants.error);
    })
  }

}
