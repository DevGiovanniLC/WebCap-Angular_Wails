import { Component } from "@angular/core";
import { Router, RouterLink, NavigationEnd } from "@angular/router";
import { MatDialog } from "@angular/material/dialog";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'webcap-header',
    standalone: true,
    imports: [RouterLink, FormsModule, CommonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})

export default class HeaderComponent {
    currentPage: string;

    constructor(private router: Router, private dialog: MatDialog) {

        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.currentPage = event.url;
            }
        });
    }

}
