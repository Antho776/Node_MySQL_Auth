import { Directive } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { HostListener } from '@angular/core';


@Directive({
  selector: '[appDropFileZone]'
})
export class DropFileZoneDirective {

  @Output() onDropFile = new EventEmitter<File>();
  constructor() { }

  @HostListener('dragover', ['$event'])
  allowDrop(event:any) {
    event.stopPropagation();
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  }

  @HostListener('drop', ['$event'])
  async onDrop(event:any) {
    event.stopPropagation();
    event.preventDefault();
    let fileList = event.dataTransfer.files; // Array of all files
    const fileExists: boolean = fileList.length > 0;
    if (!fileExists) {
      return;
    }
    this.onDropFile.emit(fileList);
  }
}
