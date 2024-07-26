import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from '@angular/router';
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector: 'app-root',
    standalone: true,
    providers: [],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    imports: [RouterOutlet]
})
export class AppComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {

    }

}
