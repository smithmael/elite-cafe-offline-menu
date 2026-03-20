import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MenuItem} from '../../../core/models/menu-item.model';

@Component({
  selector: 'app-menu-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="menu-card reveal-item group h-full flex flex-col rounded-[1.5rem] md:rounded-[2.5rem] cursor-pointer">
      <div class="relative aspect-[4/3] md:aspect-square overflow-hidden bg-stone-100">
        <img 
          [src]="item().image" 
          [alt]="item().name[language()]"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
          referrerpolicy="no-referrer"
        >
        <!-- Price Tag -->
        <div class="absolute top-3 left-3 md:top-6 md:left-6 bg-white/90 backdrop-blur-md text-cafe-dark px-2 md:px-4 py-1 md:py-2 rounded-full text-[10px] md:text-xs font-black shadow-xl">
          \${{ item().price.toFixed(2) }}
        </div>

        <!-- Add Button (Floating) -->
        <button 
          (click)="$event.stopPropagation(); add.emit()"
          class="absolute bottom-3 right-3 md:bottom-6 md:right-6 w-10 h-10 md:w-14 md:h-14 rounded-full bg-cafe-gold text-cafe-dark flex items-center justify-center hover:bg-cafe-dark hover:text-white transition-all shadow-2xl shadow-cafe-gold/40 z-10"
          aria-label="Add to selection"
        >
          <mat-icon class="text-xl md:text-2xl">add</mat-icon>
        </button>
      </div>
      <div class="p-3 md:p-10 flex-1 flex flex-col">
        <div class="flex items-center gap-2 mb-1 md:mb-4">
          <span class="text-[7px] md:text-[9px] font-black uppercase tracking-[0.1em] md:tracking-[0.4em] text-cafe-gold">
            {{ language() === 'en' ? item().category.en : item().category.am }}
          </span>
          <span class="w-1 h-1 rounded-full bg-cafe-gold/30"></span>
          <div class="flex items-center gap-0.5">
            <mat-icon class="text-cafe-gold text-[10px] scale-50 md:scale-75">star</mat-icon>
            <span class="text-[7px] md:text-[9px] font-black text-cafe-dark/40">{{ item().rating || 0 }}</span>
          </div>
        </div>

        <h3 class="text-base md:text-3xl font-serif italic tracking-tighter text-cafe-dark mb-1 md:mb-4 group-hover:text-cafe-gold transition-colors line-clamp-1">
          {{ item().name[language()] }}
        </h3>
        
        <p class="text-cafe-dark/50 text-[9px] md:text-sm leading-tight mb-3 md:mb-8 line-clamp-2 font-light">
          {{ item().description[language()] }}
        </p>

        <div class="mt-auto pt-3 md:pt-6 border-t border-cafe-dark/5 flex justify-center">
          <div class="flex items-center bg-cafe-dark/5 rounded-full px-2 py-1">
            @for (star of [1, 2, 3, 4, 5]; track star) {
              <button (click)="$event.stopPropagation(); rate.emit(star)" class="hover:scale-110 transition-transform p-0.5">
                <mat-icon 
                  [class.text-cafe-gold]="star <= (item().rating || 0)"
                  [class.text-cafe-dark/10]="star > (item().rating || 0)"
                  class="text-[12px] md:text-lg"
                >star</mat-icon>
              </button>
            }
          </div>
        </div>
      </div>
    </div>
  `
})
export class MenuCard {
  item = input.required<MenuItem>();
  language = input.required<'en' | 'am'>();
  rate = output<number>();
  add = output();
}
