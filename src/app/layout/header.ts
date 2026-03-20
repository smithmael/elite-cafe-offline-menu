import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {Logo} from './logo';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule, Logo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <nav class="glass-header">
      <div class="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <app-logo></app-logo>

         

          <div class="flex items-center gap-2">
          <!-- Language Switcher -->
          <button 
            (click)="toggleLanguage.emit()"
            class="px-4 py-2 rounded-full border border-cafe-dark/10 text-[10px] font-black uppercase tracking-widest hover:bg-cafe-dark hover:text-white transition-all mr-2"
          >
            {{ language() === 'en' ? 'አማርኛ' : 'English' }}
          </button>

          <button 
            mat-icon-button 
            (click)="shareMenu.emit()" 
            [disabled]="isSharing()"
            class="hover:bg-cafe-dark/5 transition-colors"
          >
            <mat-icon class="text-cafe-dark/70">{{ isSharing() ? 'check' : 'ios_share' }}</mat-icon>
          </button>
          
          <div class="relative ml-2">
            <button 
              (click)="scrollToSelection.emit()" 
              class="w-10 h-10 rounded-full bg-cafe-dark text-white flex items-center justify-center shadow-lg shadow-cafe-dark/20 hover:scale-105 transition-transform"
            >
              <mat-icon class="scale-75">shopping_bag</mat-icon>
              @if (selectionCount() > 0) {
                <span class="absolute -top-1 -right-1 w-4 h-4 bg-cafe-gold text-white text-[8px] font-black rounded-full flex items-center justify-center border-2 border-white">
                  {{ selectionCount() }}
                </span>
              }
            </button>
          </div>
        </div>
      </div>
  
  </nav>
  `
})
export class Header {
  language = input.required<'en' | 'am'>();
  selectionCount = input.required<number>();
  isSharing = input.required<boolean>();

  toggleLanguage = output();
  shareMenu = output();
  scrollToSelection = output();
  scrollToFooter = output();
}
