import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Inject, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IVideoManager, VIDEO_MANAGER_SERVICE_TOKEN } from '../../../../services/interfaces/video-manager.interface';
import { VideoManagerGolangService } from '../../../../services/video-manager-golang.service';

@Component({
    selector: 'webcap-file-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './file-list.component.html',
    styleUrls: ['./file-list.component.css'],
    providers: [{ provide: VIDEO_MANAGER_SERVICE_TOKEN, useClass: VideoManagerGolangService }]
})
export class FileListComponent implements OnInit {
    @Input() inputFiles: EventEmitter<FileList>

    protected fileList = []
    protected format: string;


    constructor(@Inject(VIDEO_MANAGER_SERVICE_TOKEN) private videoManager: IVideoManager) {
        this.format = "mp4";
    }

    ngOnInit() {

        this.inputFiles.subscribe(files => {

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

    convertFiles() {
        for (let file of this.fileList) {

            this.videoManager.proccessVideo(file, this.format, () => {
                this.fileList.splice(this.fileList.indexOf(file), 1);
            })
        }
    }

    private isVideoFormat(file: File) {
        return /^video\//.test(file.type);
    }

}

