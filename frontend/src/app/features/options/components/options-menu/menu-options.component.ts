import { Component } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { CaptureSettingsService } from "../../services/capture-settings.service";

@Component({
    selector: 'webcap-option-menu',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './menu-options.component.html',
    styleUrl: './menu-options.component.css',
})

export class OptionsMenuComponent {
    framerate: number;
    resolution: number;
    delay: number;
    videoformat: string;
    imageformat: string

    constructor(private _captureSettingsService: CaptureSettingsService) {
        const settings = this._captureSettingsService.getSettings()
        this.framerate = settings.framerate;
        this.resolution = settings.resolution;
        this.delay = settings.delay;
        this.videoformat = settings.videoformat;
        this.imageformat = settings.imageformat;
    }

    saveOptions() {
        this._captureSettingsService.setSettings({
            framerate: this.framerate,
            resolution: this.resolution,
            delay: this.delay,
            videoformat: this.videoformat,
            imageformat: this.imageformat
        })
    }

}
