import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  navActive: boolean = false;
  @ViewChild('profilemenu', { static: true }) myElementRef!: ElementRef;
  constructor(private router: Router, public authService: AuthService) {}
  handleShowMenu() {
    const myElement = this.myElementRef.nativeElement as HTMLElement;
    myElement.classList.toggle('hidden');
  }
  handleLogout(): void {
    this.authService.logOut();
    this.handleShowMenu();
  }
  handleRegister() {
    this.router.navigate(['/signup']);
  }
}
