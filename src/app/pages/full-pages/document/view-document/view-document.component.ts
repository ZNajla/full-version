import { Component, OnInit } from '@angular/core';
import { NgbPanelChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Documents } from 'app/shared/Models/DocModel';
import { DocumentService } from 'app/shared/services/document.service';

@Component({
  selector: 'app-view-document',
  templateUrl: './view-document.component.html',
  styleUrls: ['./view-document.component.scss']
})
export class ViewDocumentComponent implements OnInit {

  document : Documents ;
  states : any ;
  docUrl : any ;

  constructor(private docService : DocumentService) { }

  public beforeChange($event: NgbPanelChangeEvent) {
    if ($event.panelId === 'preventchange-2') {
      $event.preventDefault();
    }
    if ($event.panelId === 'preventchange-3' && $event.nextState === false) {
      $event.preventDefault();
    }
  };
  
  getDocumentStates(){
    this.docService.getDocStates(this.document.ID).subscribe((data)=>{
      this.states = data ;
      console.log(this.states);
    })
  }

  openFile(){
    this.docService.downloadFile(this.document.ID).subscribe(response => {
      let fileName = this.document.Titre;
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
    this.docService.downloadFile(this.document.ID).subscribe(response => {
      let fileName = this.document.Titre;
      let blob:Blob = response.body as Blob ;
      let downloadLink = document.createElement('a');
      downloadLink.download = fileName ;
      downloadLink.href = window.URL.createObjectURL(blob);
      downloadLink.click();
    });
    
}

  ngOnInit(): void {
    this.document = JSON.parse(localStorage.getItem('Document'));
    console.log(this.document);
    this.getDocumentStates();
  }

}