import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class NavigatorInfoService {

    constructor() { }

    public DetectUserTypeDevice() {
        return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
}
