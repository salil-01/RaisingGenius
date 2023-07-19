import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  navActive: boolean = false;
  constructor() {}
  navToggle() {
    this.navActive = !this.navActive;
  }
}
