import { Injectable } from '@angular/core';
import { IVideoManager } from './video-manager.interface';
import { VideoConverter } from '../../../../wailsjs/go/main/App';
import { Console } from 'console';

@Injectable({
    providedIn: 'root'
})

export class VideoManagerGolangService implements IVideoManager {

    constructor() { }

    public async proccessVideo(file: Blob, format: string, func?: Function): Promise<void> {
        const arrayBuffer = await this.blobToArrayBuffer(file);
        const numbers = new Uint8Array(arrayBuffer);

        await VideoConverter(Array.from(numbers), format)

        alert('Done!')

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
