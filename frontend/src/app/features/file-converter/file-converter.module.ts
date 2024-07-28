import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileConverterComponent } from './file-converter.component';
import { FrameUploaderComponent } from './components/frame-uploader/frame-uploader.component';
import { FileListComponent } from './components/file-list/file-list.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [FileConverterComponent, FrameUploaderComponent, FileListComponent ],
    exports: [FileConverterComponent]
})
export class FileConverterModule { }
