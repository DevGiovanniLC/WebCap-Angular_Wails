import { CommonModule } from '@angular/common';
import { Component, Inject, input, OnInit, OutputEmitterRef } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IVideoManager, VIDEO_MANAGER_SERVICE_TOKEN } from '../../../../services/video-manager/video-manager.interface';
import { VideoManagerGolangService } from '../../../../services/video-manager/video-manager-golang.service';

@Component({
    selector: 'webcap-file-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './file-list.component.html',
    styleUrls: ['./file-list.component.css'],
    providers: [{ provide: VIDEO_MANAGER_SERVICE_TOKEN, useClass: VideoManagerGolangService }]
})
export class FileListComponent implements OnInit {
    inputFiles = input.required<OutputEmitterRef<FileList>>()

    protected fileList = new Array<File>();
    protected format: string;


    constructor(@Inject(VIDEO_MANAGER_SERVICE_TOKEN) private videoManager: IVideoManager) {
        this.format = "mp4";
    }

    ngOnInit() {
        this.inputFiles().subscribe((files) => {
            if (files == undefined) return;

            for (let i = 0; i < files.length; i++) {
                if (this.isVideoFormat(files[i])) {
                    this.fileList.push(files[i]);
                }
            }
        })

    }

    deleteFile(file: File) {
        this.fileList.splice(this.fileList.indexOf(file), 1);
    }

    async convertFiles() {
        for (let file of this.fileList) {
            this.videoManager.convertVideoBufferFormat(file.name, this.getBlobFromFile(file), this.format, () => {
                this.deleteFile(file);
            })
        }
    }

    private isVideoFormat(file: File) {
        return /^video\//.test(file.type);
    }

    private getBlobFromFile(file: File): Blob {
        return new Blob([file]);
    }

}

