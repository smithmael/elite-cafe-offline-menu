import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {Logo} from './logo';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, Logo],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <footer class="bg-cafe-cream py-32">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-20 mb-32">
          <div class="col-span-1 md:col-span-2">
            <app-logo class="mb-12 block"></app-logo>
            <p class="text-cafe-dark/40 text-lg font-light leading-relaxed max-w-sm">
              {{ language() === 'en' ? 'Dedicated to the pursuit of the perfect cup. Every bean tells a story of heritage, passion, and precision.' : 'ፍጹም የሆነ የቡና ስኒ ለማቅረብ የተሰጠ። እያንዳንዱ ፍሬ የቅርስ፣ የፍላጎት እና የጥንቃቄ ታሪክ ይናገራል።' }}
            </p>
          </div>
          <div>
            <h4 class="text-[10px] font-black uppercase tracking-[0.4em] text-cafe-gold mb-10">
              {{ language() === 'en' ? 'Sanctuary' : 'መገኛችን' }}
            </h4>
            <ul class="space-y-6 text-cafe-dark/60 font-light">
              <li class="flex flex-col">
                <span class="text-cafe-dark font-bold mb-1 italic">The Roastery</span>
                123 Artisan Way, Flavor Town
              </li>
              <li class="flex flex-col">
                <span class="text-cafe-dark font-bold mb-1 italic">Hours</span>
                {{ language() === 'en' ? 'Mon - Sun: 7am - 9pm' : 'ሰኞ - እሁድ፡ ከጥዋቱ 1 - ከምሽቱ 3 ሰዓት' }}
              </li>
            </ul>
          </div>
          <div>
            <h4 class="text-[10px] font-black uppercase tracking-[0.4em] text-cafe-gold mb-10">
              {{ language() === 'en' ? 'Dialogue' : 'ግንኙነት' }}
            </h4>
            <div class="flex flex-col gap-6">
              <a href="#" class="text-cafe-dark/60 hover:text-cafe-gold transition-colors italic font-serif text-xl">Instagram</a>
              <a href="#" class="text-cafe-dark/60 hover:text-cafe-gold transition-colors italic font-serif text-xl">Facebook</a>
              <a href="#" class="text-cafe-dark/60 hover:text-cafe-gold transition-colors italic font-serif text-xl">Twitter</a>
            </div>
          </div>
        </div>
        
        <div class="pt-12 border-t border-cafe-dark/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div class="text-[10px] font-black uppercase tracking-[0.4em] text-cafe-dark/20">
            &copy; 2026 Vibrant Roastery. {{ language() === 'en' ? 'All rights reserved.' : 'መብቱ በህግ የተጠበቀ ነው።' }}
          </div>
          <div class="flex gap-12 text-[10px] font-black uppercase tracking-[0.4em] text-cafe-dark/30">
            <a href="#" class="hover:text-cafe-gold transition-colors">Privacy</a>
            <a href="#" class="hover:text-cafe-gold transition-colors">Terms</a>
            <a href="#" class="hover:text-cafe-gold transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  `
})
export class Footer {
  language = input.required<'en' | 'am'>();
}
