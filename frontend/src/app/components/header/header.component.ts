import { Component } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ButtonStyledComponent } from "../button-styled/button-styled.component";


@Component({
    selector: 'webcap-header',
    standalone: true,
    imports: [RouterLink, ButtonStyledComponent],
    templateUrl: './header.component.html',
    styleUrl: './header.component.css',
})

export default class HeaderComponent {

    constructor() { }

}
