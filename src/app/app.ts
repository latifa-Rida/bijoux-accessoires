import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from "./component/navbar/navbar";
import { routeAnimations } from './animations';
import { NavbarComponent } from "./component/navbar/navbar";
import { routeAnimations } from './animations';

@Component({

  selector: 'app-root',
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.css',
  animations: [routeAnimations]
  styleUrl: './app.css',
  animations: [routeAnimations]
})
export class App {

  protected readonly title = signal('bijoux');

  getRouteAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }

  getRouteAnimationData(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}
