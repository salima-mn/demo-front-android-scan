import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CompareService} from "../../services/compare.service";
import {ResultFile} from "../../models/ResultFile";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

//import jsPDF from 'jspdf';

@Component({
  selector: 'app-compare-files',
  templateUrl: './compare-files.component.html',
  styleUrls: ['./compare-files.component.scss']
})
export class CompareFilesComponent implements OnInit {

  @ViewChild('input') public Input: ElementRef;
  @ViewChild('originalInput', {static: false}) public originalInput: ElementRef;
  @ViewChild('htmlData') htmlData:ElementRef;


  fileData: File = null;
  originalfileData: File = null;
  previewUrl: any = null;
  fileUploadProgress: string = null;
  listResult: ResultFile[]=[];
  constructor(private compareService:CompareService) { }

  ngOnInit(): void {
  }

    fileProgress(fileInput: any) {
      this.fileData = <File>fileInput.target.files[0];
      console.log('the file : ',this.fileData)
      this.uploadFileToDirectory();

    }

   originalFileProgress(fileInput: any) {
    this.originalfileData = <File>fileInput.target.files[0];
     console.log('the original file : ',this.originalfileData)
    this.uploadFileToDirectory();

  }

  uploadFileToDirectory() {
    const formData = new FormData();
    var mimeType = this.fileData.type;
    formData.append('file', this.fileData);

   /* formData.append('dir',   this.mailFolder+'/recue');
    this.dematerialService.upload(formData).subscribe(events => {
      this.dematerialService.files('/' + this.mailFolder).subscribe(data => {
        this.fileUploads = data as Array<FileParams>;
        this.showFile = true;
      }, err => {
        console.log(err);
      });
    }, err => {
      console.log(err);
    })*/
  }

  compare() {

    const formData = new FormData();
    var mimeType = this.fileData.type;
    formData.append('file', this.fileData);
    formData.append('original-file', this.originalfileData);
    formData.append('mimeType', mimeType);

    this.compareService.uploadAndcompareFiles(formData).
    subscribe(res => {
        console.log("res compare files : ", res)
        this.listResult = res;
        document.getElementById('refrsh').click();
    })

  }

  public convetToPDF() {
    var data = document.getElementById('contentToConvert');
    html2canvas(data).then(canvas => {
        // Few necessary setting options
        var imgWidth = 208;
        var pageHeight = 295;
        var imgHeight = canvas.height * imgWidth / canvas.width;
        var heightLeft = imgHeight;

        const contentDataURL = canvas.toDataURL('image/png')
        let pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
        var position = 0;
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        pdf.save('new-file.pdf'); // Generated PDF
    });
}

public openPDF():void {
  let DATA = document.getElementById('htmlData');
      
  html2canvas(DATA).then(canvas => {
      
      let fileWidth = 208;
      let fileHeight = canvas.height * fileWidth / canvas.width;
      
      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight)
      
      PDF.save('angular-demo.pdf');
  });     
  }

  /* public downloadPDF():void {
    let DATA = this.htmlData.nativeElement;
    let doc = new jsPDF('p','pt', 'a4');

    let handleElement = {
      '#editor':function(element,renderer){
        return true;
      }
    };
    doc.fromHTML(DATA.innerHTML,15,15,{
      'width': 200,
      'elementHandlers': handleElement
    });

    doc.save('angular-demo.pdf');
  }  */

  refresh() {
    console.log("refeshing ....")
  }
}
