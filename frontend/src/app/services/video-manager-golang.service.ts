import { Injectable } from '@angular/core';
import { IVideoManager } from './interfaces/video-manager.interface';

@Injectable({
    providedIn: 'root'
})
export class VideoManagerGolangService implements IVideoManager {

    constructor() { }

    proccessVideo(file: Blob, format: string, func?: Function): void {
        throw new Error('Method not implemented.');
    }

    public async downloadVideo(data: Blob): Promise<void> {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(data);
        link.download = 'video'
        link.click();
    }

}
