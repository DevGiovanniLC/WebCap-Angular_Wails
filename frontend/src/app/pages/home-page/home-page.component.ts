import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { RecordButtonComponent } from '../../features/screen-recorder/components/record-button/record-button.component';
import HeaderComponent from '../../components/header/header.component';
import { OptionsMenuComponent } from '../../features/options/components/options-menu/menu-options.component';
import { ScreenshotButtonComponent } from '../../features/screen-capture/components/screenshot-button/screenshot-button.component';

@Component({
    selector: 'app-home-page',
    standalone: true,
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.css'],
    imports: [
        RouterOutlet,
        RouterLink,
        RecordButtonComponent,
        HeaderComponent,
        OptionsMenuComponent,
        ScreenshotButtonComponent,
    ]
})
export class HomePageComponent implements OnInit {
    options: any = {
        framerate: 60, // Valores predeterminados
        resolution: 1080,
        delay: 0,
        videoformat: 'mp4',
        imageformat: 'png'
    };
    constructor() { }

    ngOnInit() {
    }


}
