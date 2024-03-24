import { Component } from '@angular/core';
import { Comp1Component } from "../comp1/comp1.component";


@Component({
    selector: 'app-board',
    standalone: true,
    templateUrl: './board.component.html',
    styleUrl: './board.component.scss',
    imports: [Comp1Component]
})
export class BoardComponent {


}
