import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
    selector: 'webcap-header',
    standalone: true,
    imports: [RouterLink, FormsModule, CommonModule],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})

export default class HeaderComponent {

    constructor() { }

}
