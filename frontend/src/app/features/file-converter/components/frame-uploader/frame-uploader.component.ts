import { Component, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Component({
    selector: 'webcap-frame-uploader',
    templateUrl: './frame-uploader.component.html',
    styleUrls: ['./frame-uploader.component.css']
})

export class FrameUploaderComponent {

    private filesToUpload = new BehaviorSubject<FileList>(undefined);

    constructor() {}

    protected onDrop(event: DragEvent) {
        event.preventDefault();
        this.filesToUpload.next(event.dataTransfer.files);
    }

    protected onFileSelected(event: Event) {
        this.filesToUpload.next((event.target as HTMLInputElement).files);
        (event.target as HTMLInputElement).value = '';
    }

    public getUploadedFiles() {
        return this.filesToUpload;
    }

}
