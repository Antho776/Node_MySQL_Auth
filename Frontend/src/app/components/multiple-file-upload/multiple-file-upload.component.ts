import { Component, OnInit } from '@angular/core';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from 'src/app/services/file-upload.service'

@Component({
  selector: 'app-multiple-file-upload',
  templateUrl: './multiple-file-upload.component.html',
  styleUrls: ['./multiple-file-upload.component.scss']
})
export class MultipleFileUploadComponent implements OnInit {
  selectedFiles?: FileList;
  progressInfos: any[] = [];
  message: string[] = [];
  fileInfos?: Observable<any>;
  
  constructor(private uploadService: FileUploadService) { }

  ngOnInit(): void {
    this.fileInfos = this.uploadService.getFiles();
  }

selectFiles(event): void {
  this.message = [];
  this.progressInfos = [];
  this.selectedFiles = event.target.files;
}


uploadFiles(): void {
  this.message = [];
  if (this.selectedFiles) {
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.upload(i, this.selectedFiles[i]);
    }
  }
}


upload(idx: number, file: File): void {
  this.progressInfos[idx] = { value: 0, fileName: file.name };
  if (file) {
    this.uploadService.upload(file).subscribe({
      next: (event: any) => {
        if (event.type === HttpEventType.UploadProgress) {
          this.progressInfos[idx].value = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          const msg = 'Uploaded the file successfully: ' + file.name;
          this.message.push(msg);
          this.fileInfos = this.uploadService.getFiles();
        }
      },
      error: (err: any) => {
        this.progressInfos[idx].value = 0;
        const msg = 'Could not upload the file: ' + file.name;
        this.message.push(msg);
        this.fileInfos = this.uploadService.getFiles();
      }
    });
  }
}
}