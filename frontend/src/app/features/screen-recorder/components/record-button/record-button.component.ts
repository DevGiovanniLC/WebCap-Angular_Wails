import { Component} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OptionsMenuComponent } from '../../../options/components/options-menu/menu-options.component';
import { PreviewDialogComponent } from '../video-preview/preview-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ScreenRecorder } from '../../services/screen-recorder.service';
import { OptionDialogComponent } from '../../../options/components/options-dialog/dialog-options.component';
import { CaptureSettingsService } from '../../../options/services/capture-settings.service';

@Component({
    selector: 'webcap-record-button',
    standalone: true,
    providers: [ScreenRecorder],
    imports: [FormsModule, OptionsMenuComponent],
    templateUrl: './record-button.component.html',
    styleUrl: './record-button.component.css',
})
export class RecordButtonComponent {
    protected isRecording: boolean;
    protected isMicrophoneEnabled: boolean;
    private icons:any

    protected $iconRecord: string;
    protected $recordingButtonDisabled: boolean;

    protected $iconMicro: string;
    protected $microphoneButtonDisabled: boolean;

    constructor(private _matDialog: MatDialog, private videoRecorder: ScreenRecorder, private _captureSettingsService: CaptureSettingsService) {
        this.icons = {
            STOPPED: 'url(/assets/stopped_state.webp)',
            RECORDING: 'url(/assets/recording_state.webp)',
            MICROENABLED: 'url(/assets/micro_enable.webp)',
            MICROCLOSED: 'url(/assets/micro_disable.webp)',
        }

        this.isRecording = false;
        this.isMicrophoneEnabled = true
    }

    ngOnInit(): void {
        this.videoRecorder.getMediaRecorder().subscribe((mediarecorder) => {
            if (mediarecorder != null) this.handleMediaRecorderEvents(mediarecorder);
        })
    }

    private openModal(data: Blob, format: string) {
        this._matDialog.open(PreviewDialogComponent, {
            width: '65%',
            data: {
                blobData: data,
                format: format
            }
        })
    }

    async toggleRecording(): Promise<void> {
        if (this.videoRecorder.isRecording()) {
            await this.videoRecorder.stop();
        } else {
            this.videoRecorder.toggleMicrophone(this.isMicrophoneEnabled);
            const { framerate, resolution, delay} = this._captureSettingsService.getSettings();
            await this.videoRecorder.start(framerate, resolution, delay,()=>{
                this.$recordingButtonDisabled = true
            });
        }
    }

    private handleMediaRecorderEvents(recorder: MediaRecorder): void {
        recorder.addEventListener('start', () => {
            this.isRecording = true;
            this.updateButtonStyle();
            this.$recordingButtonDisabled = false
        }
        );
        recorder.addEventListener('dataavailable', (event: BlobEvent) => {
            this.isRecording = false
            this.updateButtonStyle()
            const { videoformat} = this._captureSettingsService.getSettings();
            this.openModal(event.data, videoformat);
        });
    }

    private updateButtonStyle(): void {

        if (this.isRecording) {
            this.$iconRecord = this.icons.RECORDING
            this.$microphoneButtonDisabled = true;
        } else {
            this.$iconRecord = this.icons.STOPPED
            this.$microphoneButtonDisabled = false
        }
    }

    protected toggleMicrophone() {
        this.isMicrophoneEnabled = !this.isMicrophoneEnabled
        this.$iconMicro = (this.isMicrophoneEnabled) ? this.icons.MICROENABLED : this.icons.MICROCLOSED;
    }


    openOptions(): void {
        const dialogRef = this._matDialog.open(OptionDialogComponent, {
            width: '65%',
        });
    }

}
