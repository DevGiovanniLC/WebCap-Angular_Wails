import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogContent } from "@angular/material/dialog";
import { VIDEO_MANAGER_SERVICE_TOKEN } from "../../../../services/video-manager/video-manager.interface";
import { VideoManagerGolangService } from "../../../../services/video-manager/video-manager-golang.service";


@Component({
    selector: 'webcap-preview-dialog',
    standalone: true,
    providers: [{provide:VIDEO_MANAGER_SERVICE_TOKEN, useClass: VideoManagerGolangService}],
    imports: [
        MatDialogContent,
        MatDialogClose
    ],
    templateUrl: './preview-dialog.component.html',
    styleUrl: './preview-dialog.component.css'
})
export class PreviewDialogComponent {
    VideoUrl: string

    constructor(@Inject(VIDEO_MANAGER_SERVICE_TOKEN) private videoManager, @Inject(MAT_DIALOG_DATA) public data) {
        this.VideoUrl = URL.createObjectURL(this.data.blobData)
    }

    async downloadVideo(): Promise<void> {
        this.videoManager.proccessVideo(this.data.blobData, this.data.format, false)
    }
}
