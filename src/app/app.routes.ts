import {Routes} from '@angular/router';
import {Home} from './features/home/home';
import {Detail} from './features/detail/detail';

export const routes: Routes = [
  {path: '', component: Home, pathMatch: 'full'},
  {path: 'detail/:id', component: Detail},
  {path: '**', redirectTo: ''}
];
