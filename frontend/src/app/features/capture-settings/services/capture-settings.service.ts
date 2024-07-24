import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class CaptureSettingsService {
    framerate: number;
    resolution: number;
    delay: number;
    videoformat: string;
    imageformat: string

    constructor() {
        this.framerate = 60;
        this.resolution = 1080;
        this.videoformat = "mp4";
        this.imageformat = "png";
        this.delay = 0;
    }

    getSettings() {
        return {
            framerate: this.framerate,
            resolution: this.resolution,
            delay: this.delay,
            videoformat: this.videoformat,
            imageformat: this.imageformat
        };
    }

    setSettings(settings: any) {
        this.framerate = settings.framerate;
        this.resolution = settings.resolution;
        this.delay = settings.delay;
        this.videoformat = settings.videoformat;
        this.imageformat = settings.imageformat;
    }
}
