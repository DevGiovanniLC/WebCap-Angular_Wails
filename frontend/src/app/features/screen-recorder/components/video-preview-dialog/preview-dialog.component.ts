import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogContent, MatDialogRef } from "@angular/material/dialog";
import { FILE_MANAGER_SERVICE_TOKEN } from "../../../file-converter/services/file-format-converter.interface";
import { VideoManagerGolangService } from "../../../file-converter/services/video-manager-golang.service";
import { ButtonStyledComponent } from "../../../../components/button-styled/button-styled.component";


@Component({
    selector: 'webcap-preview-dialog',
    standalone: true,
    providers: [{provide:FILE_MANAGER_SERVICE_TOKEN, useClass: VideoManagerGolangService}],
    imports: [
        MatDialogContent,
        MatDialogClose,
        ButtonStyledComponent
    ],
    templateUrl: './preview-dialog.component.html',
    styleUrl: './preview-dialog.component.css'
})
export class PreviewDialogComponent {
    VideoUrl: string
    isProcessing: boolean;

    constructor(@Inject(FILE_MANAGER_SERVICE_TOKEN) private videoManager, @Inject(MAT_DIALOG_DATA) public data, public dialogRef: MatDialogRef<PreviewDialogComponent>) {
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
