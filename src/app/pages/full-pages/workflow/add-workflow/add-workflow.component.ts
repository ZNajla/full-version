import { User } from 'app/shared/Models/UserModel';
import { Detail_Processus } from './../../../../shared/Models/Detail-ProcessusModel';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from 'app/shared/auth/users.service';
import { WorkflowService } from 'app/shared/services/workflow.service';
import { DetailWorkflowService } from 'app/shared/services/detail-workflow.service';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-add-workflow',
  templateUrl: './add-workflow.component.html',
  styleUrls: ['./add-workflow.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddWorkflowComponent implements OnInit, AfterViewInit {

  workFlowFormSubmitted = false;
  detailSubmitted = false;

  public workFlowForm = this.formBuilder.group({
    workflowname: ['', Validators.required],
    description: ['', Validators.required],
  });

  public usersList : User[] = [];
  public tempdata : Detail_Processus[] = [];
  public user : User;
  public user2 : User;


  public detail = this.formBuilder.group({
    action: ["", Validators.required],
    idUser: [ User , Validators.required]
  });

  public i = 0 ;
  public detailProcess : Detail_Processus;

  constructor(private ref: ChangeDetectorRef, private router:Router,private formBuilder: FormBuilder,private usersService:UsersService , private workflowService:WorkflowService , private detailProcessService:DetailWorkflowService , public activeModal: NgbActiveModal) { 
    
  }

  get rf() {
    return this.workFlowForm.controls;
  }

  get rf2() {
    return this.detail.controls;
  }

  getAllUser(){
    this.usersService.getAllUsers().subscribe((data:User[])=>{
    this.usersList = data;
    console.log(data);
    })
  }

  public AddDetail(){
    this.detailSubmitted = true;
    if (this.detail.invalid) {
      return;
    }
    const user = this.detail.value;
    console.log(user);
    this.user2 = user.idUser;
    console.log(this.user2);
    this.tempdata.push(new Detail_Processus(this.detail.controls["action"].value , this.i+1 , "waiting" , "" , this.user2 , "" ));
    this.i++;
    console.log(this.tempdata);
    this.detail.reset();
  }

  SubmitForms(){
    console.log(this.workFlowForm.value);
    const result = {
      workflowForm : this.workFlowForm.value ,
      details : this.tempdata ,
    }
    this.activeModal.close(result);
  }

  ngOnInit(): void {
    this.getAllUser();
  }


  ngAfterViewInit() {
    setTimeout(() => {
      this.ref.detectChanges();
    }, 100);

  }

}
