import { Component, input} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IFileFormatConverter } from '../../services/file-format-converter.interface';

@Component({
    selector: 'webcap-file-list',
    templateUrl: './file-list.component.html',
    styleUrls: ['./file-list.component.css'],
    providers: []
})

export class FileListComponent {
    fileListLength : BehaviorSubject<number>
    protected fileList: File[]
    protected format: string

    fileConverter = input<IFileFormatConverter>(undefined)
    fileType = input.required<string>()

    constructor() {
        this.format = "mp4";
        this.fileList = [];
        this.fileListLength = new BehaviorSubject<number>(this.fileList.length); 
    }

    public getActualFileList() {
        return this.fileListLength
    }

    public addFile(file: File) {
        if (!this.isCorrectFileType(this.fileType(), file)) return false

        if (this.fileList.some((listFile) => listFile.name == file.name)) return false

        this.fileListLength.next(this.fileList.push(file));
        return true
    }

    protected deleteFile(file: File) {
        this.fileList.splice(this.fileList.indexOf(file), 1);
        this.fileListLength.next(this.fileList.length);
    }

    protected onFileSelected(event: Event) {
        for (let i = 0; i < (event.target as HTMLInputElement).files.length; i++) {
            this.addFile((event.target as HTMLInputElement).files[i])
        }
        (event.target as HTMLInputElement).value = '';
    }

    private isCorrectFileType(type: string, file: File) {
        return RegExp(`^${type}/`).test(file.type)
    }

    protected emptyList() {
        this.fileList = [];
        this.fileListLength.next(this.fileList.length);
    }

    protected convertFiles() {
        this.fileConverter().convertFileListFormat(this.fileList, this.format, this.deleteFile)
    }



}

