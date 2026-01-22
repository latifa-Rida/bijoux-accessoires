import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../navbar/navbar';

@Component({
    selector: 'app-client-layout',
    standalone: true,
    imports: [RouterOutlet, NavbarComponent],
    template: `
    <app-navbar></app-navbar>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
    styles: [`
    main {
      min-height: calc(100-vh - 80px);
    }
  `]
})
export class ClientLayoutComponent { }
