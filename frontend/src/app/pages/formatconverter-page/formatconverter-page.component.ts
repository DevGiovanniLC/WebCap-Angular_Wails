import { Component} from '@angular/core';
import HeaderComponent from '../../components/header/header.component';
import { FileConverterModule } from '../../features/file-converter/file-converter.module';

@Component({
    selector: 'app-formatconverter-page',
    standalone: true,
    templateUrl: './formatconverter-page.component.html',
    styleUrls: ['./formatconverter-page.component.css'],
    imports: [
        HeaderComponent,
        FileConverterModule
    ],
})
export class FormatconverterPageComponent {

    constructor() { }


}
