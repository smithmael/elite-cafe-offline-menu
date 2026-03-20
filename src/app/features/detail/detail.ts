import {ChangeDetectionStrategy, Component, inject, signal, input} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ActivatedRoute, RouterModule, Router} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';

// Core Services & Models
import {MenuService} from '../../core/services/menu.service';
import {SelectionService} from '../../core/services/selection.service';
import {MenuItem} from '../../core/models/menu-item.model';

// Layout Components
import {Header} from '../../layout/header';
import {Footer} from '../../layout/footer';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-detail',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    MatIconModule, 
    MatButtonModule, 
    MatSnackBarModule,
    Header,
    Footer
  ],
  template: `
    <div class="min-h-screen bg-cafe-cream flex flex-col selection:bg-cafe-gold/20">
      <app-header 
        [language]="language()" 
        [selectionCount]="selectionCount()"
        [isSharing]="isSharing()"
        (toggleLanguage)="toggleLanguage()"
        (shareMenu)="shareMenu()"
        (scrollToSelection)="goBack()"
      ></app-header>

      <main class="flex-grow">
        @if (item(); as item) {
          <!-- Hero Section: Split Layout -->
          <div class="flex flex-col lg:flex-row min-h-[calc(100vh-5rem)]">
            
            <!-- Left: Immersive Image -->
            <div class="w-full lg:w-1/2 h-[60vh] lg:h-auto relative overflow-hidden group">
              <img 
                [src]="item.image" 
                [alt]="item.name[language()]" 
                class="w-full h-full object-cover transition-transform duration-[2000ms] group-hover:scale-110" 
                referrerpolicy="no-referrer"
              >
              <div class="absolute inset-0 bg-gradient-to-t from-cafe-dark/40 via-transparent to-transparent"></div>
              
              <!-- Floating Price Badge -->
              <div class="absolute bottom-12 right-12 w-32 h-32 bg-cafe-gold rounded-full flex items-center justify-center shadow-2xl animate-pulse-slow">
                <span class="text-white font-black text-2xl tracking-tighter">\${{ item.price.toFixed(2) }}</span>
              </div>

              <!-- Vertical Rail Text -->
              <div class="absolute left-10 top-1/2 -translate-y-1/2 hidden xl:block">
                <span class="writing-vertical-rl rotate-180 text-[10px] font-black uppercase tracking-[1em] text-white/30">
                  ARTISANAL • ROASTERY • SELECTION
                </span>
              </div>
            </div>

            <!-- Right: Editorial Content -->
            <div class="w-full lg:w-1/2 p-8 md:p-16 lg:p-24 flex flex-col justify-center bg-cafe-cream relative min-h-[50vh]">
              <!-- Back Button -->
              <button (click)="goBack()" class="absolute top-8 left-8 lg:top-12 lg:left-12 flex items-center gap-3 text-cafe-dark/30 hover:text-cafe-gold transition-all group z-20">
                <mat-icon class="scale-75 transition-transform group-hover:-translate-x-1">arrow_back</mat-icon>
                <span class="text-[9px] font-black uppercase tracking-[0.4em]">{{ language() === 'en' ? 'Back' : 'ተመለስ' }}</span>
              </button>

              <div class="max-w-xl mx-auto lg:mx-0">
                <div class="flex items-center gap-4 mb-8">
                  <span class="px-4 py-1.5 rounded-full bg-cafe-gold/10 text-cafe-gold text-[9px] font-black uppercase tracking-[0.3em] border border-cafe-gold/5">
                    {{ item.category[language()] }}
                  </span>
                  <div class="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-cafe-dark/5 shadow-sm">
                    <mat-icon class="text-cafe-gold text-xs">star</mat-icon>
                    <span class="text-[9px] font-black tracking-tighter">{{ item.rating || 0 }}</span>
                  </div>
                </div>

                <h1 class="text-6xl md:text-8xl xl:text-9xl font-serif italic tracking-tighter text-cafe-dark leading-[0.85] mb-12">
                  {{ item.name[language()] }}
                </h1>

                <p class="text-xl md:text-2xl text-cafe-dark/60 leading-relaxed font-light italic mb-16">
                  "{{ item.description[language()] }}"
                </p>

                <div class="flex flex-wrap gap-3 mb-20">
                  @for (tag of item.tags?.[language()] || []; track tag) {
                    <span class="px-5 py-2.5 bg-white rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-cafe-dark/40 border border-cafe-dark/5 hover:border-cafe-gold/30 transition-colors cursor-default">
                      {{ tag }}
                    </span>
                  }
                </div>

                <div class="hidden lg:flex flex-col sm:flex-row items-center gap-6">
                  <button 
                    (click)="addToSelection(item)"
                    class="w-full sm:flex-grow py-8 bg-cafe-dark text-white rounded-full font-black uppercase tracking-[0.5em] text-[10px] hover:bg-cafe-gold hover:text-cafe-dark transition-all shadow-2xl shadow-cafe-dark/20 flex items-center justify-center gap-4 group"
                  >
                    <mat-icon class="group-hover:scale-125 transition-transform">add_circle</mat-icon>
                    {{ language() === 'en' ? 'Add to Selection' : 'ወደ ምርጫዬ ጨምር' }}
                  </button>
                  <button class="w-24 h-24 rounded-full border border-cafe-dark/10 flex items-center justify-center hover:border-cafe-gold hover:text-cafe-gold transition-all group">
                    <mat-icon class="group-hover:scale-110 transition-transform">favorite_border</mat-icon>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Secondary Details / Story Section -->
          <section class="bg-white py-32 border-y border-cafe-dark/5">
            <div class="max-w-7xl mx-auto px-8">
              <div class="grid grid-cols-1 md:grid-cols-3 gap-20">
                <div class="space-y-6">
                  <h4 class="text-[10px] font-black uppercase tracking-[0.5em] text-cafe-gold">Origin</h4>
                  <p class="text-cafe-dark/60 font-light leading-relaxed">
                    {{ language() === 'en' ? 'Sourced from the high-altitude regions of Ethiopia, where the climate and soil create a unique profile found nowhere else on earth.' : 'ከኢትዮጵያ ከፍተኛ ቦታዎች የተገኘ፣ የአየሩ ጠባይ እና አፈሩ በምድር ላይ በሌላ ቦታ የማይገኝ ልዩ ጣዕም ይፈጥራሉ።' }}
                  </p>
                </div>
                <div class="space-y-6">
                  <h4 class="text-[10px] font-black uppercase tracking-[0.5em] text-cafe-gold">Process</h4>
                  <p class="text-cafe-dark/60 font-light leading-relaxed">
                    {{ language() === 'en' ? 'Our master roasters use a slow-roasting technique to preserve the delicate floral notes and complex acidity of each bean.' : 'የእኛ የቡና አቆላል ባለሙያዎች የእያንዳንዱን ፍሬ ጥሩ መዓዛ እና ጣዕም ለመጠበቅ ረጋ ያለ የአቆላል ዘዴን ይጠቀማሉ።' }}
                  </p>
                </div>
                <div class="space-y-6">
                  <h4 class="text-[10px] font-black uppercase tracking-[0.5em] text-cafe-gold">Experience</h4>
                  <p class="text-cafe-dark/60 font-light leading-relaxed">
                    {{ language() === 'en' ? 'Best enjoyed in a quiet moment. Let the layers of flavor unfold as the temperature shifts, revealing new depths in every sip.' : 'በጸጥታ ጊዜ ቢጠጣ ይመረጣል። የሙቀት መጠኑ ሲቀየር የጣዕሙ ንብርብሮች ሲገለጡ በእያንዳንዱ ስኒ ውስጥ አዲስ ጥልቀት ያገኛሉ።' }}
                  </p>
                </div>
              </div>
            </div>
          </section>
        } @else {
          <div class="flex flex-col items-center justify-center py-40 min-h-[60vh]">
            <div class="w-24 h-24 bg-cafe-dark/5 rounded-full flex items-center justify-center mb-8">
              <mat-icon class="text-cafe-dark/20 text-4xl">inventory_2</mat-icon>
            </div>
            <h2 class="text-4xl font-serif italic text-cafe-dark mb-8">Item not found</h2>
            <button (click)="goBack()" class="px-12 py-6 bg-cafe-dark text-white rounded-full font-black uppercase tracking-widest text-[10px]">Return Home</button>
          </div>
        }
      </main>

      <app-footer [language]="language()"></app-footer>

      <!-- Mobile Sticky Action Bar -->
      <div class="lg:hidden sticky bottom-0 left-0 right-0 p-4 bg-cafe-cream/80 backdrop-blur-xl border-t border-cafe-dark/5 z-50">
        @if (item(); as item) {
          <button 
            (click)="addToSelection(item)"
            class="w-full py-6 bg-cafe-dark text-white rounded-full font-black uppercase tracking-[0.5em] text-[10px] hover:bg-cafe-gold hover:text-cafe-dark transition-all shadow-2xl shadow-cafe-dark/20 flex items-center justify-center gap-4 group"
          >
            <mat-icon class="group-hover:scale-125 transition-transform">add_circle</mat-icon>
            {{ language() === 'en' ? 'Add to Selection' : 'ወደ ምርጫዬ ጨምር' }}
          </button>
        }
      </div>
    </div>
  `,
  styleUrl: '../../app.css',
})
export class Detail {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private menuService = inject(MenuService);
  private selectionService = inject(SelectionService);
  private snackBar = inject(MatSnackBar);

  id = input<string>();
  item = signal<MenuItem | null>(null);
  language = this.menuService.language;
  selectionCount = this.selectionService.count;
  isSharing = signal(false);

  constructor() {
    const itemId = this.route.snapshot.paramMap.get('id');
    if (itemId) {
      const found = this.menuService.getItemById(itemId);
      this.item.set(found || null);
    }
  }

  addToSelection(item: MenuItem) {
    this.selectionService.addItem(item);
    this.snackBar.open(`${item.name[this.language()]} added to selection!`, 'Close', { duration: 2000 });
  }

  toggleLanguage() {
    this.menuService.toggleLanguage();
  }

  goBack() {
    this.router.navigate(['/']);
  }

  shareMenu() {
    this.isSharing.set(true);
    navigator.clipboard.writeText(window.location.href);
    this.snackBar.open('Link copied!', 'Close', { duration: 2000 });
    setTimeout(() => this.isSharing.set(false), 2000);
  }
}
