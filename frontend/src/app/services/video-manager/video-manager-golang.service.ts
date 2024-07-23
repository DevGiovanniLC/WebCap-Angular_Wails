import { Injectable } from '@angular/core';
import { IVideoManager } from './video-manager.interface';
import { ProcessVideo, VideoBufferConverter } from '../../../../wailsjs/go/main/App';

@Injectable({
    providedIn: 'root'
})

export class VideoManagerGolangService implements IVideoManager {

    constructor() { }
    
    public async proccessVideo(file: Blob, format: string): Promise<void> {
        const arrayBuffer = await this.blobToArrayBuffer(file);
        const numbers = new Uint8Array(arrayBuffer);

        await ProcessVideo(Array.from(numbers), format)
    }

    public async convertVideoBufferFormat(name: string, file: Blob, format: string, func?: Function): Promise<void> {
        const arrayBuffer = await this.blobToArrayBuffer(file);
        const numbers = new Uint8Array(arrayBuffer);

        VideoBufferConverter(name, Array.from(numbers), format);

        if (func) func();
    }



    public async downloadVideo(data: Blob): Promise<void> {
        const link = document.createElement('a');
        link.href = URL.createObjectURL(data);
        link.download = 'video'
        link.click();
    }

    private blobToArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                resolve(reader.result as ArrayBuffer);
            };
            reader.onerror = reject;
            reader.readAsArrayBuffer(blob);
        });
    }

}
