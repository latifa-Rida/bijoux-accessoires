import { trigger, state, style, transition, animate, query, group } from '@angular/animations';

export const routeAnimations = trigger('routeAnimations', [
  transition('* <=> *', [
    // Set a default  style for enter and leave
    query(':enter, :leave', [
      style({
        position: 'absolute',
        left: 0,
        width: '100%',
        opacity: 0,
        transform: 'translateY(30px)'
      })
    ], { optional: true }),
    // Animate the new page in
    query(':enter', [
      animate('600ms ease-in-out', style({
        opacity: 1,
        transform: 'translateY(0)'
      }))
    ], { optional: true }),
    // Animate the old page out
    query(':leave', [
      animate('300ms ease-in-out', style({
        opacity: 0,
        transform: 'translateY(-30px)'
      }))
    ], { optional: true })
  ])
]);

export const fadeInUp = trigger('fadeInUp', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(30px)' }),
    animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
  ])
]);

export const fadeInLeft = trigger('fadeInLeft', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-30px)' }),
    animate('600ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
  ])
]);

export const fadeInRight = trigger('fadeInRight', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(30px)' }),
    animate('600ms ease-out', style({ opacity: 1, transform: 'translateX(0)' }))
  ])
]);

export const fadeOutDown = trigger('fadeOutDown', [
  transition(':leave', [
    animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(30px)' }))
  ])
]);

export const fadeOutUp = trigger('fadeOutUp', [
  transition(':leave', [
    animate('300ms ease-in', style({ opacity: 0, transform: 'translateY(-30px)' }))
  ])
]);

export const fadeOutLeft = trigger('fadeOutLeft', [
  transition(':leave', [
    animate('300ms ease-in', style({ opacity: 0, transform: 'translateX(-30px)' }))
  ])
]);

export const fadeOutRight = trigger('fadeOutRight', [
  transition(':leave', [
    animate('300ms ease-in', style({ opacity: 0, transform: 'translateX(30px)' }))
  ])
]);
