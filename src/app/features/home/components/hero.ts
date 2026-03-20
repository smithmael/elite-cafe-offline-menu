import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <section class="relative min-h-[80vh] flex flex-col justify-center bg-cafe-dark overflow-hidden">
      <!-- Content -->
      <div class="max-w-7xl mx-auto w-full text-white flex flex-col justify-center px-8 md:px-20 py-32 relative z-10">
        <div class="max-w-3xl">
          <div class="flex items-center gap-4 mb-12 animate-fade-in">
            <span class="w-12 h-px bg-cafe-gold"></span>
            <span class="text-[10px] font-black uppercase tracking-[0.6em] text-cafe-gold">
              {{ language() === 'en' ? 'Artisanal Roastery' : 'ጥበባዊ ሮስተሪ' }}
            </span>
          </div>
          
          <h2 class="text-6xl sm:text-8xl md:text-[140px] font-serif italic tracking-tighter leading-[0.85] mb-12 animate-slide-up">
            {{ language() === 'en' ? 'The' : 'የ' }} <br>
            <span class="text-cafe-gold">{{ language() === 'en' ? 'Essence' : 'ዋናው' }}</span> <br>
            {{ language() === 'en' ? 'of Coffee' : 'ቡና' }}
          </h2>
          
          <p class="text-white/40 text-xl leading-relaxed mb-16 max-w-xl animate-fade-in-delayed">
            {{ language() === 'en' ? 'Experience the rare fusion of Ethiopian heritage and modern artisanal roasting techniques.' : 'የኢትዮጵያን ቅርስ እና ዘመናዊ የቡና አቆላል ጥበብን በአንድ ላይ ይለማመዱ።' }}
          </p>
          
        <div class="flex flex-col sm:flex-row gap-6 animate-fade-in-delayed">
          <button 
              (click)="scrollToMenu.emit()"
               class="px-12 py-6 bg-cafe-gold text-cafe-dark rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white transition-all shadow-2xl shadow-cafe-gold/10"
                              >
               {{ language() === 'en' ? 'Discover Menu' : 'ሜኑውን ይመርምሩ' }}
         </button>

            <button 
                (click)="scrollToFooter.emit()"
            type="button"
             class="px-12 py-6 border border-white/10 text-white rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white/10 transition-all cursor-pointer"
                     >
                        {{ language() === 'en' ? 'Our Heritage' : 'ስለ ቅርሳችን' }}
                         </button>
          </div>
        </div>

        <!-- Vertical Rail Text -->
        <div class="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block">
          <span class="writing-vertical-rl rotate-180 text-[10px] font-black uppercase tracking-[0.8em] text-white/10">
            ESTABLISHED • TWENTY • TEN
          </span>
        </div>
      </div>

      <!-- Decorative background elements -->
      <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-cafe-gold/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-[120px]"></div>
    </section>
  `
})
export class Hero {
  language = input.required<'en' | 'am'>();
  scrollToMenu = output();
  scrollToFooter = output();
}
