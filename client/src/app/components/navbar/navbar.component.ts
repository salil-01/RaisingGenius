import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  navActive: boolean = false;
  showMenu: boolean = false;
  constructor(private router: Router, public authService: AuthService) {}
  handleShowMenu() {
    this.showMenu = !this.showMenu;
  }
  handleLogout(): void {
    this.authService.logOut();
  }
  handleRegister() {
    this.router.navigate(['/signup']);
  }
}
