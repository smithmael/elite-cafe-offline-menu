import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {RouterModule} from '@angular/router';
import {UpdateService} from './core/services/update.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule],
  template: `<router-outlet></router-outlet>`,
})
export class App {
  private updateService = inject(UpdateService);
}
