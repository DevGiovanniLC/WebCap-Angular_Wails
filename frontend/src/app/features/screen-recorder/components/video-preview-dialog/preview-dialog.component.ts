import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogContent, MatDialogRef } from "@angular/material/dialog";
import { VIDEO_MANAGER_SERVICE_TOKEN } from "../../../video-converter/services/video-manager.interface";
import { VideoManagerGolangService } from "../../../video-converter/services/video-manager-golang.service";


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
    isProcessing: boolean;

    constructor(@Inject(VIDEO_MANAGER_SERVICE_TOKEN) private videoManager, @Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<PreviewDialogComponent>) {
        this.VideoUrl = URL.createObjectURL(this.data.blobData)
        this.isProcessing = false
    }

    closeModal() {
        this.dialogRef.close()
    }

    async downloadVideo(): Promise<void> {
        this.isProcessing = true
        await this.videoManager.proccessVideo(this.data.blobData, this.data.format, false)
        this.isProcessing = false
    }
}
