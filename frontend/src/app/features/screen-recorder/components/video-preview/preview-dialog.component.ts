import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogClose, MatDialogContent } from "@angular/material/dialog";

@Component({
    selector: 'webcap-preview-dialog',
    standalone: true,
    providers: [],
    imports: [
        MatDialogContent,
        MatDialogClose
    ],
    templateUrl: './preview-dialog.component.html',
    styleUrl: './preview-dialog.component.css'
})
export class PreviewDialogComponent {
    VideoUrl: string

    constructor(@Inject(MAT_DIALOG_DATA) public data) {
        this.VideoUrl = URL.createObjectURL(this.data.blobData)
    }

    async downloadVideo(): Promise<void> {
        //this.httpVideo.sendVideo(this.data.blobData, this.data.format)
    }
}
