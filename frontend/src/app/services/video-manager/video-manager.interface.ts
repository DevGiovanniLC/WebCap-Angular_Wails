import { InjectionToken } from '@angular/core';

export const VIDEO_MANAGER_SERVICE_TOKEN = new InjectionToken<IVideoManager>('VideoManagerService');




export interface IVideoManager {
    proccessVideo(file: Blob, format: string, func?: Function): void

    downloadVideo(data: Blob): Promise<void>
}
