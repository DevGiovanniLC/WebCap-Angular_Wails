import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";
import { WarningMobileDialogComponent } from "./features/info-dialogs/components/warning-mobile-dialog/warning-mobile-dialog.component";
import { NavigatorInfoService } from "./features/info-dialogs/services/navigator-info.service";

@Component({
    selector: 'app-root',
    standalone: true,
    providers: [NavigatorInfoService],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [RouterOutlet]
})
export class AppComponent implements OnInit {

    constructor(private _matDialog: MatDialog, private navigatorInfoService: NavigatorInfoService) {}

    ngOnInit(): void {

        if (this.navigatorInfoService.DetectUserTypeDevice()) {
            this.openModal()
        }
    }

    private openModal() {
        this._matDialog.open(WarningMobileDialogComponent, {
            width: '65%',
        })
    }
}
