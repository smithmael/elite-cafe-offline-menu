import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MenuItem} from '../../../core/models/menu-item.model';

@Component({
  selector: 'app-item-detail-modal',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed inset-0 z-[100] overflow-y-auto">
      <!-- Backdrop with immersive blur -->
      <div 
        class="fixed inset-0 bg-cafe-dark/95 backdrop-blur-2xl transition-opacity duration-700 cursor-pointer" 
        (click)="closeModal.emit()"
        (keydown.enter)="closeModal.emit()"
        tabindex="0"
        role="button"
        aria-label="Close modal"
      ></div>
      
      <!-- Modal Content Container -->
      <div class="flex min-h-full items-center justify-center p-4 md:p-8 lg:p-12">
        <!-- Modal Content: Split Editorial Layout -->
        <div class="relative w-full max-w-5xl bg-cafe-cream rounded-[3rem] md:rounded-[5rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row animate-slide-up mx-auto">
          
          <!-- Close Button: Floating Minimalist -->
          <button 
            (click)="closeModal.emit()"
            class="absolute top-6 right-6 md:top-8 md:right-8 z-50 w-12 h-12 md:w-14 md:h-14 rounded-full bg-cafe-dark/10 backdrop-blur-xl text-cafe-dark flex items-center justify-center hover:bg-cafe-gold hover:text-cafe-dark transition-all duration-500 border border-cafe-dark/5 group"
          >
            <mat-icon class="group-hover:rotate-90 transition-transform duration-500 scale-75 md:scale-100">close</mat-icon>
          </button>

          <!-- Image Section: Immersive with Overlay -->
          <div class="w-full lg:w-1/2 relative h-[40vh] lg:h-auto overflow-hidden group">
            <img 
              [src]="item().image" 
              [alt]="item().name[language()]" 
              class="w-full h-full object-cover scale-105 group-hover:scale-110 transition-transform duration-1000" 
              referrerpolicy="no-referrer"
            >
            <div class="absolute inset-0 bg-gradient-to-t from-cafe-dark/60 via-transparent to-transparent"></div>
            
            <!-- Vertical Label on Image -->
            <div class="absolute left-8 bottom-12 hidden lg:block">
              <span class="writing-vertical-rl rotate-180 text-[10px] font-black uppercase tracking-[0.8em] text-white/40">
                CRAFTED • WITH • PASSION
              </span>
            </div>
          </div>

          <!-- Info Section: Refined Typography -->
          <div class="w-full lg:w-1/2 p-10 md:p-16 lg:p-20 flex flex-col bg-cafe-cream">
            <div class="flex items-center justify-between mb-10">
              <div class="flex items-center gap-4">
                <span class="px-5 py-2 rounded-full bg-cafe-gold/10 text-cafe-gold text-[10px] font-black uppercase tracking-[0.3em] border border-cafe-gold/5">
                  {{ language() === 'en' ? item().category.en : item().category.am }}
                </span>
                <div class="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-cafe-dark/5 shadow-sm">
                  <mat-icon class="text-cafe-gold text-sm">star</mat-icon>
                  <span class="text-[10px] font-black tracking-tighter">{{ item().rating || 0 }}</span>
                </div>
              </div>
            </div>

            <h2 class="text-5xl md:text-7xl font-serif italic tracking-tighter text-cafe-dark mb-8 leading-[0.9]">
              {{ item().name[language()] }}
            </h2>

            <div class="space-y-8 mb-16">
              <p class="text-cafe-dark/60 text-lg md:text-xl font-light leading-relaxed italic">
                "{{ item().description[language()] }}"
              </p>
              
              <!-- Advanced Details Section -->
              <div class="grid grid-cols-2 gap-8 pt-8 border-t border-cafe-dark/5">
                <div>
                  <h4 class="text-[9px] font-black uppercase tracking-[0.4em] text-cafe-gold mb-3">
                    {{ language() === 'en' ? 'Notes' : 'ማስታወሻ' }}
                  </h4>
                  <p class="text-cafe-dark/40 text-xs font-medium tracking-tight">
                    {{ language() === 'en' ? 'Artisanal, Organic, Ethically Sourced' : 'ጥበባዊ፣ ኦርጋኒክ፣ በታማኝነት የተገኘ' }}
                  </p>
                </div>
                <div>
                  <h4 class="text-[9px] font-black uppercase tracking-[0.4em] text-cafe-gold mb-3">
                    {{ language() === 'en' ? 'Brew Time' : 'የዝግጅት ጊዜ' }}
                  </h4>
                  <p class="text-cafe-dark/40 text-xs font-medium tracking-tight">
                    {{ language() === 'en' ? '4-6 Minutes' : 'ከ4-6 ደቂቃዎች' }}
                  </p>
                </div>
              </div>
            </div>

            <div class="mt-auto sticky bottom-0 bg-cafe-cream pt-8 pb-2 border-t border-cafe-dark/5 flex flex-col sm:flex-row items-center justify-between gap-8">
              <div>
                <p class="text-[10px] font-black uppercase tracking-[0.4em] text-cafe-gold mb-2">
                  {{ language() === 'en' ? 'Investment' : 'ዋጋ' }}
                </p>
                <p class="text-4xl md:text-5xl font-serif italic tracking-tighter text-cafe-dark">
                  \${{ item().price.toFixed(2) }}
                </p>
              </div>
              
              <button 
                (click)="add.emit(); closeModal.emit()"
                class="w-full sm:w-auto px-12 py-7 bg-cafe-dark text-white text-[10px] font-black uppercase tracking-[0.4em] rounded-full hover:bg-cafe-gold hover:text-cafe-dark transition-all duration-500 shadow-2xl shadow-cafe-dark/20 flex items-center justify-center gap-4 group"
              >
                <mat-icon class="group-hover:scale-125 transition-transform duration-500">add_circle_outline</mat-icon>
                {{ language() === 'en' ? 'Add to Selection' : 'ወደ ምርጫ ጨምር' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ItemDetailModal {
  item = input.required<MenuItem>();
  language = input.required<'en' | 'am'>();
  closeModal = output();
  add = output();
}
