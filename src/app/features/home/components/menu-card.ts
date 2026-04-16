import {ChangeDetectionStrategy, Component, input, output, signal} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MenuItem} from '../../../core/models/menu-item.model';

@Component({
  selector: 'app-menu-card',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="menu-card reveal-item group h-full flex flex-col rounded-[1.5rem] md:rounded-[2.5rem] cursor-pointer relative">
      <div class="relative aspect-[4/3] md:aspect-square overflow-hidden bg-stone-100">
        <img 
          [src]="item().image" 
          [alt]="item().name[language()]"
          class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 ease-out"
          referrerpolicy="no-referrer"
        >
        <!-- Price Tag: Subtle Glassmorphism -->
        <div class="absolute top-4 left-4 bg-white/20 backdrop-blur-md text-cafe-gold border border-white/20 px-3 py-1.5 rounded-full text-[10px] font-black shadow-xl">
          \${{ item().price.toFixed(2) }}
        </div>

        <!-- Floating Add Button -->
        <button 
          (click)="onAdd(); $event.stopPropagation()"
          class="absolute bottom-4 right-4 w-14 h-14 rounded-full bg-cafe-gold text-cafe-dark flex flex-col items-center justify-center shadow-2xl hover:bg-white transition-all duration-500 scale-0 group-hover:scale-100 active:scale-90 z-20"
          aria-label="Add to selection"
        >
          <mat-icon class="text-xl">add</mat-icon>
          <span class="text-[7px] font-black uppercase tracking-widest mt-0.5">{{ language() === 'en' ? 'Eat' : 'ይመገቡ' }}</span>
        </button>
      </div>

      <div class="p-6 md:p-10 flex-1 flex flex-col">
        <div class="flex items-center justify-between mb-4">
          <span class="text-[9px] font-black uppercase tracking-[0.4em] text-cafe-gold">
            {{ language() === 'en' ? item().category.en : item().category.am }}
          </span>
          <div class="flex items-center gap-1 px-2 py-1 bg-cafe-dark/5 rounded-full">
            <mat-icon class="text-cafe-gold text-[10px] scale-75">star</mat-icon>
            <span class="text-[9px] font-black text-cafe-dark/40">{{ item().rating || 0 }}</span>
          </div>
        </div>

        <h3 class="text-xl md:text-3xl font-serif italic tracking-tighter text-cafe-dark mb-2 group-hover:text-cafe-gold transition-colors line-clamp-1">
          {{ item().name[language()] }}
        </h3>
        
        <p class="text-cafe-dark/50 text-[10px] md:text-sm leading-relaxed mb-8 line-clamp-2 font-light">
          {{ item().description[language()] }}
        </p>

        <!-- Action Row: Integrated at the bottom -->
        <div class="mt-auto space-y-6">
          <!-- Subtle Rating Interaction -->
          <div class="pt-4 border-t border-cafe-dark/5 flex justify-center">
            @if (showRatingConfirm()) {
              <div class="text-[8px] font-black uppercase tracking-[0.2em] text-cafe-gold animate-fade-in">
                {{ language() === 'en' ? 'Thank you!' : 'እናመሰግናለን!' }}
              </div>
            } @else {
              <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                @for (star of [1, 2, 3, 4, 5]; track star) {
                  <button 
                    (click)="onRate(star, $event)" 
                    (keydown.enter)="onRate(star, $event)"
                    class="hover:scale-125 transition-transform p-1"
                    [attr.aria-label]="'Rate ' + star + ' stars'"
                  >
                    <mat-icon 
                      [class.text-cafe-gold]="star <= (item().rating || 0)"
                      [class.text-cafe-dark/10]="star > (item().rating || 0)"
                      class="text-[14px]"
                    >star</mat-icon>
                  </button>
                }
              </div>
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
  add = output<void>();

  showRatingConfirm = signal(false);

  onAdd() {
    this.add.emit();
  }

  onRate(stars: number, event: Event) {
    event.stopPropagation();
    this.rate.emit(stars);
    this.showRatingConfirm.set(true);
    setTimeout(() => this.showRatingConfirm.set(false), 3000);
  }
}
