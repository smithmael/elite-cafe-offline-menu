import {ChangeDetectionStrategy, Component, input, output, inject, signal, effect} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MenuItem} from '../../../core/models/menu-item.model';
import {GeminiService} from '../../../core/services/gemini.service';

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
              
              <!-- Floating Add Button -->
              <button 
                (click)="onAdd()"
                class="absolute bottom-12 right-12 w-20 h-20 rounded-full bg-cafe-gold text-cafe-dark flex flex-col items-center justify-center shadow-2xl hover:bg-white transition-all duration-500 group/add active:scale-90 z-20"
              >
                <mat-icon class="group-hover/add:rotate-12 transition-transform scale-110">add</mat-icon>
                <span class="text-[8px] font-black uppercase tracking-widest mt-1">{{ language() === 'en' ? 'Eat' : 'ይመገቡ' }}</span>
              </button>

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

              <!-- AI Insight Section -->
              <div class="pt-8 border-t border-cafe-dark/5">
                <div class="flex items-center gap-2 mb-3">
                  <mat-icon class="text-cafe-gold text-xs">auto_awesome</mat-icon>
                  <h4 class="text-[9px] font-black uppercase tracking-[0.4em] text-cafe-gold">
                    {{ language() === 'en' ? 'AI Insight' : 'የAI እይታ' }}
                  </h4>
                </div>
                <p class="text-cafe-dark/60 text-sm font-light leading-relaxed italic min-h-[3em]">
                  @if (aiInsight()) {
                    {{ aiInsight() }}
                  } @else {
                    <span class="animate-pulse">...</span>
                  }
                </p>
              </div>
            </div>

            <div class="mt-auto sticky bottom-0 bg-cafe-cream pt-8 pb-2 border-t border-cafe-dark/5">
              <div class="flex items-center justify-between">
                <div>
                  <p class="text-[10px] font-black uppercase tracking-[0.4em] text-cafe-gold mb-2">
                    {{ language() === 'en' ? 'Investment' : 'ዋጋ' }}
                  </p>
                  <p class="text-4xl md:text-5xl font-serif italic tracking-tighter text-cafe-dark">
                    \${{ item().price.toFixed(2) }}
                  </p>
                </div>
                <div class="text-right">
                  <p class="text-[7px] font-black uppercase tracking-widest text-cafe-dark/20">Source</p>
                  <p class="text-[8px] font-mono text-cafe-dark/30 truncate max-w-[120px]">{{ appUrl }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    @keyframes slide-up {
      from { opacity: 0; transform: translateY(40px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .animate-slide-up { animation: slide-up 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
  `]
})
export class ItemDetailModal {
  private geminiService = inject(GeminiService);
  
  item = input.required<MenuItem>();
  language = input.required<'en' | 'am'>();
  closeModal = output();
  add = output<void>();

  aiInsight = signal<string>('');
  appUrl = this.geminiService.getAppUrl();

  constructor() {
    effect(() => {
      const itemName = this.item().name[this.language()];
      const lang = this.language();
      this.aiInsight.set('');
      this.geminiService.generateMenuDescription(itemName, lang).then(insight => {
        this.aiInsight.set(insight);
      });
    });
  }

  onAdd() {
    this.add.emit();
    this.closeModal.emit();
  }
}
