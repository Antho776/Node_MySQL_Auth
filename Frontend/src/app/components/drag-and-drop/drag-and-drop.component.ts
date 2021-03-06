import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray } from '@angular/forms';
import { DragAndDropService } from '../../services/drag-and-drop.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-drag-and-drop',
  templateUrl: './drag-and-drop.component.html',
  styleUrls: ['./drag-and-drop.component.scss'],
})
export class DragAndDropComponent implements OnInit {
  fileArr: any[] = [];
  imgArr: any[] = [];
  fileObj: any[] = [];
  form: FormGroup;
  msg!: string;
  progress: any = 0;

  constructor(
    public fb: FormBuilder,
    private sanitizer: DomSanitizer,
    public dragAndDropService: DragAndDropService
  ) {
    this.form = this.fb.group({
      avatar: [null],
    });
  }

  ngOnInit() {}

  upload(e: any) {
    const fileListAsArray = Array.from(e);
    fileListAsArray.forEach((item, i) => {
      const file = e as HTMLInputElement;
      const url = URL.createObjectURL(file[i]);
      this.imgArr.push(url);
      this.fileArr.push({ item, url: url });
    });

    this.fileArr.forEach((item) => {
      this.fileObj.push(item.item);
    });

    // Set files form control
    this.form.patchValue({
      avatar: this.fileObj,
    });

    this.form.get('avatar')?.updateValueAndValidity();

    // Upload to server
    this.dragAndDropService
      .addFiles(this.form.value.avatar)
      .subscribe((event: HttpEvent<any>) => {
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round((event.loaded / event.total) * 100);
            console.log(`Uploaded! ${this.progress}%`);
            break;
          case HttpEventType.Response:
            console.log('File uploaded successfully!', event.body);
            setTimeout(() => {
              this.progress = 0;
              this.fileArr = [];
              this.fileObj = [];
              this.msg = 'File uploaded successfully!';
            }, 3000);
        }
      });
  }

  // Clean Url
  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}