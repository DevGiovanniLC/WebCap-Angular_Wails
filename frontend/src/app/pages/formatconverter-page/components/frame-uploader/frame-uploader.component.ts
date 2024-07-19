import { Component, EventEmitter, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'webcap-frame-uploader',
    standalone: true,
    templateUrl: './frame-uploader.component.html',
    styleUrls: ['./frame-uploader.component.css']
})

export class FrameUploaderComponent {

    @Output() fileList_event: EventEmitter<FileList> = new EventEmitter<FileList>();

    fileList: FileList

    constructor(private http: HttpClient) {}

    onDrop(event: DragEvent) {
        event.preventDefault();
        this.fileList = event.dataTransfer.files;
        this.fileList_event.emit(this.fileList);
    }

    onDragOver(event: DragEvent) {
        event.preventDefault();
    }

    onDragLeave(event: DragEvent) {
        event.preventDefault();
    }

    onFileSelected(event: Event) {
        this.fileList = (event.target as HTMLInputElement).files;
        this.fileList_event.emit(this.fileList);
    }

}
