import { Component, output } from '@angular/core';


@Component({
    selector: 'webcap-frame-uploader',
    standalone: true,
    templateUrl: './frame-uploader.component.html',
    styleUrls: ['./frame-uploader.component.css']
})

export class FrameUploaderComponent {

    fileList_event = output<FileList>();

    fileList: FileList

    constructor() {}

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
