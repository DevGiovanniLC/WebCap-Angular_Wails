import { Injectable } from '@angular/core';
import { IFileFormatConverter } from './file-format-converter.interface';
import { ConvertFileFormat, ConvertFileBufferFormat} from '../../../../../wailsjs/go/main/App';

@Injectable({
    providedIn: 'root'
})

export class VideoManagerGolangService implements IFileFormatConverter {

    constructor() { }
    
    public async converteFileFormat(file: Blob, format: string): Promise<void> {
        const arrayBuffer = await file.arrayBuffer()
        const numbers = new Uint8Array(arrayBuffer);

        await ConvertFileFormat(Array.from(numbers), format)
    }

    public async convertFileListFormat(fileList: File[] , format: string, func?: Function): Promise<void> {
        for (let i = 0; i < fileList.length; i++) {
            let data = new Uint8Array( await fileList[i].arrayBuffer());
            await ConvertFileBufferFormat(fileList[i].name, Array.from(data), format);
        }
    }
}
