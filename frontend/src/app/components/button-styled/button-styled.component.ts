import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'webcap-button-styled',
    standalone: true,
    templateUrl: './button-styled.component.html',
    styleUrls: ['./button-styled.component.css'],
    imports: [RouterLink]
})
export class ButtonStyledComponent{
    buttonClass = input<string>("principal");
    buttonDisabled = input<boolean>(false)
    href = input<string>(null)
    buttonClick = output();

    constructor() { 
        
    }

    onClick() {
        this.buttonClick.emit(); 
    }

}
