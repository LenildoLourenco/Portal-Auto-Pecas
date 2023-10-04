import { Component, EventEmitter, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ClientService } from 'src/app/services/client.service';
import { SnackbarService } from 'src/app/services/snackbar.service';
import { GlobalConstants } from 'src/app/shared/global-constants';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {
  onAddClient = new EventEmitter();
  onEditClient = new EventEmitter();
  clientForm: any = FormGroup;
  dialogAction: any = "Adicionar";
  action: any = "Adicionar";
  responseMessage: any;
  disabled: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private clientService: ClientService,
    public dialogRef: MatDialogRef<ClientComponent>,
    private snackbarService: SnackbarService) { }

  ngOnInit(): void {
    this.clientForm = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.pattern(GlobalConstants.emailRegex)]],
      cpf: [null, [Validators.required]],
      contactNumber: [null, [Validators.required, Validators.pattern(GlobalConstants.contactNumberRegex)]],
      address: [null, [Validators.required]]
    });
    if (this.dialogData.action === 'Editar') {
      this.dialogAction = "Editar";
      this.action = "Editar";
      this.disabled = true;
      this.clientForm.patchValue(this.dialogData.data);
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
    var formData = this.clientForm.value;
    var data = {
      name: formData.name,
      email: formData.email,
      cpf: formData.cpf,
      contactNumber: formData.contactNumber,
      address: formData.address
    }
    this.clientService.add(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onAddClient.emit();
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
    var formData = this.clientForm.value;
    var data = {
      id: this.dialogData.data.id,
      name: formData.name,
      email: formData.email,
      cpf: formData.cpf,
      contactNumber: formData.contactNumber,
      address: formData.address
    }
    this.clientService.update(data).subscribe((response: any) => {
      this.dialogRef.close();
      this.onEditClient.emit();
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
