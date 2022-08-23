import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from 'app/shared/Models/TaskModel';

@Component({
  selector: 'app-view-task',
  templateUrl: './view-task.component.html',
  styleUrls: ['./view-task.component.scss']
})
export class ViewTaskComponent implements OnInit {

  @Input() public task : Task;
  public taskForm = this.formBuilder.group({
    comment: ['', Validators.required],
  });
  constructor(private formBuilder: FormBuilder , public activeModal: NgbActiveModal) { }

  ngOnInit(): void {
  }

  public onAccept(){
    const result = {
      StateDocument : 3,
      Comment : this.taskForm.controls['comment'].value,
      StepNumber : this.task.Document.currentNumberState,
      DocId : this.task.Document.id
    }
    console.log(result);
    this.activeModal.close(result);
  }

  public onReject(){
    const result = {
      StateDocument : 4,
      Comment : this.taskForm.controls['comment'].value,
      StepNumber : this.task.Document.currentNumberState,
      DocId : this.task.Document.id
    }
    console.log(result);
    this.activeModal.close(result);
  }
}
