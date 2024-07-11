import {  CanDeactivateFn } from '@angular/router';

export const disableBackGuard: CanDeactivateFn<unknown> = () => {
  return false;
};
