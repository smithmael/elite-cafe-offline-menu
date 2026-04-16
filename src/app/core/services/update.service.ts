import { Injectable, inject, ApplicationRef } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { concat, interval } from 'rxjs';
import { filter, first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UpdateService {
  private swUpdate = inject(SwUpdate);
  private appRef = inject(ApplicationRef);

  constructor() {
    this.initUpdateCheck();
  }

  private initUpdateCheck() {
    if (!this.swUpdate.isEnabled) {
      return;
    }

    // Allow the app to stabilize before starting the update check
    const appIsStable$ = this.appRef.isStable.pipe(first(isStable => isStable === true));
    // Check for updates every hour (or any preferred interval)
    const everyHour$ = interval(60 * 60 * 1000);
    const everyHourOnceAppIsStable$ = concat(appIsStable$, everyHour$);

    everyHourOnceAppIsStable$.subscribe(() => {
      this.swUpdate.checkForUpdate().catch(err => console.error('Error checking for updates:', err));
    });

    this.swUpdate.versionUpdates
      .pipe(filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'))
      .subscribe(evt => {
        const currentHash = evt.latestVersion.hash;
        const lastHash = sessionStorage.getItem('sw-update-hash');

        // Only trigger reload if we haven't already reloaded for this specific version hash
        if (lastHash !== currentHash) {
          sessionStorage.setItem('sw-update-hash', currentHash);
          
          // Activate the update and then reload the page
          this.swUpdate.activateUpdate().then(() => {
            // Using window.location.reload() to ensure the new version is loaded
            window.location.reload();
          }).catch(err => {
            console.error('Error activating update:', err);
            // Even if activation fails, we might want to reload as a fallback, 
            // but we should be careful about loops. 
            // Since we set the hash in sessionStorage above, it won't loop immediately.
          });
        } else {
          console.log('Update available but already reloaded for this version:', currentHash);
        }
      });
  }
}
