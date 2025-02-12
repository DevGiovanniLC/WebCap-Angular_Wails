import { Component, viewChild} from "@angular/core";
import { OptionsMenuComponent } from "../options-menu/menu-options.component";
import { MatDialogRef } from "@angular/material/dialog";
import { ButtonStyledComponent } from "../../../../components/button-styled/button-styled.component";

@Component({
    selector: 'app-option-dialog',
    standalone: true,
    imports: [
    OptionsMenuComponent,
    ButtonStyledComponent
],
    templateUrl: './dialog-options.component.html',
    styleUrl: './dialog-options.component.css'
})

export class OptionDialogComponent {
    optionsMenuComponent = viewChild<OptionsMenuComponent | undefined>('options');

    constructor(public dialogRef: MatDialogRef<OptionDialogComponent>) {}


    closeModal() {
        this.dialogRef.close()
    }

    saveSettings(): void {
        const selectedOptions = this.optionsMenuComponent().saveOptions();
        this.dialogRef.close(selectedOptions);
    }
}
