import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleService } from 'app/shared/auth/role.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-role-modal',
  templateUrl: './add-role-modal.component.html',
  styleUrls: ['./add-role-modal.component.scss']
})
export class AddRoleModalComponent implements OnInit {

  public roleform = this.formBuilder.group({
    role:["",Validators.required]
  })
  
  constructor(public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder , private rolesService : RoleService , public toastr: ToastrService) { }

  ngOnInit(): void {
  }

  submitForm() {
    this.activeModal.close(this.roleform.value);
  }

}
