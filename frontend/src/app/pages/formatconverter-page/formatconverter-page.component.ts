import { Component, Inject} from '@angular/core';
import HeaderComponent from '../../components/header/header.component';
import { FileConverterModule } from '../../features/file-converter/file-converter.module';
import { FILE_MANAGER_SERVICE_TOKEN, IFileFormatConverter } from '../../features/file-converter/services/file-format-converter.interface';
import { VideoManagerGolangService } from '../../features/file-converter/services/video-manager-golang.service';

@Component({
    selector: 'app-formatconverter-page',
    standalone: true,
    templateUrl: './formatconverter-page.component.html',
    styleUrls: ['./formatconverter-page.component.css'],
    providers: [{provide: FILE_MANAGER_SERVICE_TOKEN, useClass: VideoManagerGolangService}],
    imports: [
        HeaderComponent,
        FileConverterModule
    ],
})

export class FormatconverterPageComponent {

    constructor(@Inject(FILE_MANAGER_SERVICE_TOKEN) protected  videoManager: IFileFormatConverter){

    }   

    


}
