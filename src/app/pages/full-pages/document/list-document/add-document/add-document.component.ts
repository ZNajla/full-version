import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ResponseModel } from 'app/shared/Models/ResponseModel';
import { Types } from 'app/shared/Models/TypesModal';
import { DocumentService } from 'app/shared/services/document.service';
import { TypesService } from 'app/shared/services/types.service';

@Component({
  selector: 'app-add-document',
  templateUrl: './add-document.component.html',
  styleUrls: ['./add-document.component.scss']
})
export class AddDocumentComponent implements OnInit {

  ErrorMessage : string ;
  public types : Types[] = [];

  public docForm = this.formBuilder.group({
    Reference: ['', Validators.required],
    Titre: ['', [Validators.required, Validators.email]],
    NbPage: ['', Validators.required],
    MotCle: ['', Validators.required],
    Version: ['', [Validators.required]],
    TypesId: ['', Validators.required],
    CurrentState : [false]
  });

  progress: number;
  onUploadFinished: any;
  fileName : string;
  fileNbPage : number;
  filePath : string;
  formData = new FormData();

  constructor(public activeModal: NgbActiveModal , private typesService : TypesService , private docService : DocumentService ,private formBuilder: FormBuilder , public router: Router , private httpClient: HttpClient) { }

  getListTypes(){
    this.typesService.getAllTypes().subscribe((data:Types[])=>{
      this.types = data;
        console.log("work!!!",this.types);
      })
  }

  uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    const reader = new FileReader();
    let fileToUpload = <File>files[0];
    this.formData.append('file', fileToUpload, fileToUpload.name);
    this.fileName = fileToUpload.name;
    this.docForm.controls['Titre'].setValue(this.fileName);
    this.fileNbPage = fileToUpload.size;
    console.log(this.fileNbPage);
  }

  submitDoc(){
    console.log(this.docForm.controls['CurrentState'].value);
    this.httpClient.post<ResponseModel>('https://localhost:7268/api/Document/upload', this.formData)
    .subscribe({
      next: (event) => {
        console.log(event);
        if(event.responseCode == 1){
          console.log('Upload success.');
          this.filePath = event.dateSet ;
          console.log(this.filePath);
           let CurrentState : number ;
          if(this.docForm.controls['CurrentState'].value == true){
            CurrentState = 1;
          }else{
            CurrentState = 0;
          }
          let result = {
            file : this.filePath ,
            Reference : this.docForm.controls['Reference'].value,
            Titre : this.fileName,
            NbPage : this.docForm.controls['NbPage'].value,
            MotCle : this.docForm.controls['MotCle'].value,
            Version : this.docForm.controls['Version'].value,
            CurrentState : CurrentState ,
            TypesId : this.docForm.controls['TypesId'].value,
          };
          this.activeModal.close(result);
        }else{
          console.log(event.responseMessage);
        }}
  });
   
  }

  ngOnInit(): void {
    this.getListTypes();
  }

}
