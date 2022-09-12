import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Task } from 'app/shared/Models/TaskModel';
import { DocumentService } from 'app/shared/services/document.service';

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
  constructor(private formBuilder: FormBuilder , public activeModal: NgbActiveModal , private docService : DocumentService) { }

  ngOnInit(): void {
    console.log(this.task);
  }

  openFile(){
    this.docService.downloadFile(this.task.Document.id).subscribe(response => {
      let fileName = this.task.Document.titre;
      let blob:Blob = response.body as Blob ;
      let downloadLink = document.createElement('a');
      downloadLink.download = fileName ;
      downloadLink.href = window.URL.createObjectURL(blob);
      window.open(
        downloadLink.href,
        '_blank',
      );
    });
  }

  saveFile(): void {
    this.docService.downloadFile(this.task.Document.id).subscribe(response => {
      let fileName = this.task.Document.titre;
      let blob:Blob = response.body as Blob ;
      let downloadLink = document.createElement('a');
      downloadLink.download = fileName ;
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.click();
    });
    
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
