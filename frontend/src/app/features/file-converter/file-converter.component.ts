import { Component, OnInit, signal, viewChild, } from '@angular/core';
import { FileListComponent } from './components/file-list/file-list.component';
import { FrameUploaderComponent } from './components/frame-uploader/frame-uploader.component';

@Component({
    selector: 'webcap-file-converter',
    templateUrl: './file-converter.component.html',
    styleUrls: ['./file-converter.component.css']
})
export class FileConverterComponent implements OnInit {
    fileType$: string;
    isFileListEmpty$ = signal<boolean>(true);

    fileListComponent = viewChild<FileListComponent>('fileList');
    dropZoneComponent = viewChild<FrameUploaderComponent>('dropzone');


    constructor() {
        this.fileType$ = "video"
    }

    ngOnInit(): void {

        if (this.fileListComponent == undefined || this.dropZoneComponent == undefined) return

        this.fileListComponent().getActualFileList().subscribe((fileListLength) => {
            (fileListLength == 0) ? this.isFileListEmpty$.set(true) : this.isFileListEmpty$.set(false)
        })

        this.dropZoneComponent().getUploadedFiles().subscribe((uploudedFileList) => {

            if (uploudedFileList == undefined) return

            if (uploudedFileList.length == 0) return

            for (let i = 0; i < uploudedFileList.length; i++) {

                console.log(this.fileListComponent().addFile(uploudedFileList[i]))

            }
        })
    }

}
