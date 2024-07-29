import { Component, Inject, input} from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FILE_MANAGER_SERVICE_TOKEN, IFileFormatConverter } from '../../services/file-format-converter.interface';
import { VideoManagerGolangService } from '../../services/video-manager-golang.service';

@Component({
    selector: 'webcap-file-list',
    templateUrl: './file-list.component.html',
    styleUrls: ['./file-list.component.css'],
    providers: [{provide: FILE_MANAGER_SERVICE_TOKEN, useClass: VideoManagerGolangService}],
})

export class FileListComponent {
    fileListLength : BehaviorSubject<number>
    protected fileList: File[]
    protected format: string
    fileType = input.required<string>()

    constructor(@Inject(FILE_MANAGER_SERVICE_TOKEN) protected  fileConverter: IFileFormatConverter) {
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

    protected deleteFile(fileList: File[],file: File) {
        fileList.splice(fileList.indexOf(file), 1);
    }

    deleteFileUpdateFileList(file: File) {
        this.deleteFile(this.fileList, file)

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
        this.fileConverter.convertFileListFormat(this.fileList, this.format, this.deleteFile)
        this.fileListLength.next(this.fileList.length);
        this.emptyList()
    }



}

