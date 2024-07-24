import {  Component } from "@angular/core";
import { FormsModule } from '@angular/forms';
import { ScreenshotTaker } from '../../services/screenshot-taker.service';
import { CaptureSettingsService } from "../../../capture-settings/services/capture-settings.service";

@Component({
    selector: 'webcap-screenshot-button',
    standalone: true,
    imports: [FormsModule],
    templateUrl: './screenshot-button.component.html',
    styleUrl: './screenshot-button.component.css',
})
export class ScreenshotButtonComponent {

    constructor(private screenshotTaker: ScreenshotTaker, private _captureSettingsService: CaptureSettingsService) { }

    screenshotEvent(): void {
        const {imageformat, delay} = this._captureSettingsService.getSettings();
        this.screenshotTaker.take(imageformat, delay);
    }
}
