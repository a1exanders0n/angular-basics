import { Component, Input } from '@angular/core';
import { Currency } from 'src/app/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @Input() currencies!: Currency[];
  constructor() {}
}
