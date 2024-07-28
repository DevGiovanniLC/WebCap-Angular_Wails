import { Injectable } from '@angular/core';
import { IFileFormatConverter } from './file-format-converter.interface';
import { ProcessVideo, VideoBufferConverter } from '../../../../../wailsjs/go/main/App';

@Injectable({
    providedIn: 'root'
})

export class VideoManagerGolangService implements IFileFormatConverter {

    constructor() { }
    
    public async converteFileFormat(file: Blob, format: string): Promise<void> {
        const arrayBuffer = await this.blobToArrayBuffer(file);
        const numbers = new Uint8Array(arrayBuffer);

        await ProcessVideo(Array.from(numbers), format)
    }

    public async convertFileListFormat(fileList: File[] , format: string, func?: Function): Promise<void> {
        for (let file of fileList) {
            const arrayBuffer = await this.blobToArrayBuffer(file);
            const numbers = new Uint8Array(arrayBuffer);
    
            VideoBufferConverter(file.name, Array.from(numbers), format);
    
            if (func) func(file);
        }
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
