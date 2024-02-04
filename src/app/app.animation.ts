import {
  trigger,
  animate,
  transition,
  style,
  group,
  query,
} from '@angular/animations';

export const slideInAnimation = trigger('slideInAnimation', [
  // Transition between any two states
  transition('* <=> *', [
    // Events to apply
    // Defined style and animation function to apply
    // Config object with optional set to true to handle when element not yet added to the DOM
    query(
      ':enter, :leave',
      style({ position: 'fixed', width: '100%', zIndex: 2 }),
      { optional: true }
    ),
    // group block executes in parallel
    // group([
    //   query(':enter', [
    //     style({ transform: 'translateX(100%)' }),
    //     animate('1s ease-out', style({ transform: 'translateX(0%)' }))
    //   ], { optional: true }),
    //   query(':leave', [
    //     style({ transform: 'translateX(0%)' }),
    //     animate('1s ease-out', style({ transform: 'translateX(-100%)' }))
    //   ], { optional: true })
    // ])
    group([
      query(':enter', [style({ opacity: 0 })], { optional: true }),
      query(
        ':leave',
        [style({ opacity: 1 }), animate('1.5s', style({ opacity: 0 }))],
        { optional: true }
      ),
      query(
        ':enter',
        [style({ opacity: 0 }), animate('1.5s', style({ opacity: 1 }))],
        { optional: true }
      )
    ]),
  ]),
]);
