import { Injectable } from '@angular/core';
import { IFileFormatConverter } from './file-format-converter.interface';
import { ConvertFileFormat, ConvertFileBufferFormat, WindowsNotification } from '../../../../../wailsjs/go/main/App';

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

    public async convertFileListFormat(fileList: File[], format: string, func?: Function): Promise<void> {
        const fileListCopied = [].concat(fileList);
        for (let file of fileListCopied) {
            let data = new Uint8Array(await file.arrayBuffer());
            await ConvertFileBufferFormat(file.name, Array.from(data), format);
            if (func) func(fileList, file);
            WindowsNotification(file.name +' converted to '+ format, 'The video was saved successfully in the path: User/Videos/WebCapVideos')
        }
    }
}
