import { InjectionToken } from '@angular/core';

export const FILE_MANAGER_SERVICE_TOKEN = new InjectionToken<IFileFormatConverter>('VideoManagerService');

export interface IFileFormatConverter {
    converteFileFormat(file: Blob, format: string): void
    convertFileListFormat(fileList: File[], format: string, func?: Function): void
}
