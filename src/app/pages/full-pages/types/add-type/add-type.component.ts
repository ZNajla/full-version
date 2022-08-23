import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Workflow } from 'app/shared/Models/WorkflowModel';
import { WorkflowService } from 'app/shared/services/workflow.service';

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.scss']
})
export class AddTypeComponent implements OnInit {

  public processList : Workflow[] = [];
  public typeForm = this.formBuilder.group({
    Nom: ['', Validators.required],
    ProcessId:['']
  });

  constructor(private processService : WorkflowService , private formBuilder: FormBuilder , public activeModal: NgbActiveModal) { }

  getListProcess(){
    this.processService.getAllWorkFlows().subscribe((data)=>{
      this.processList = data ;
    })
  }

  onSubmit() {
    console.log("work!!!!"+this.typeForm);
    this.activeModal.close(this.typeForm.value);
  }

  ngOnInit(): void {
    this.getListProcess();  }

}
