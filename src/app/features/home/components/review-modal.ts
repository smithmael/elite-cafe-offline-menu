import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {SelectionItem} from '../../../core/services/selection.service';

@Component({
  selector: 'app-review-modal',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="fixed inset-0 z-[100] overflow-y-auto">
      <!-- Backdrop -->
      <div 
        class="fixed inset-0 bg-cafe-dark/95 backdrop-blur-2xl animate-fade-in cursor-pointer"
        (click)="closeModal.emit()"
        (keydown.enter)="closeModal.emit()"
        tabindex="0"
        role="button"
        aria-label="Close modal"
      ></div>
      
      <!-- Modal Content Container -->
      <div class="flex min-h-full items-center justify-center p-4 md:p-12">
        <div class="relative w-full max-w-2xl bg-cafe-cream rounded-[3rem] md:rounded-[4rem] overflow-hidden shadow-[0_50px_100px_rgba(0,0,0,0.3)] animate-slide-up">
          <div class="p-8 md:p-16 lg:p-20">
            <div class="flex items-center justify-between mb-12">
              <div>
                <h2 class="text-4xl md:text-5xl font-serif italic tracking-tighter text-cafe-dark leading-none mb-2">
                  {{ language() === 'en' ? 'Review' : 'ገምግም' }}
                </h2>
                <p class="text-cafe-dark/40 text-xs font-black uppercase tracking-[0.4em]">Your Selection</p>
              </div>
              <button (click)="closeModal.emit()" class="w-12 h-12 rounded-full bg-cafe-dark/5 flex items-center justify-center hover:bg-cafe-dark hover:text-white transition-all">
                <mat-icon>close</mat-icon>
              </button>
            </div>

            <div class="space-y-6 max-h-[40vh] md:max-h-[50vh] overflow-y-auto mb-8 pr-4 custom-scrollbar">
              @for (item of items(); track item.id) {
                <div class="flex items-center justify-between py-4 border-b border-cafe-dark/5 group">
                  <div class="flex items-center gap-6">
                    <div class="w-16 h-16 rounded-2xl overflow-hidden bg-white border border-cafe-dark/5 shadow-sm relative">
                      <img [src]="item.image" [alt]="item.name[language()]" class="w-full h-full object-cover" referrerpolicy="no-referrer">
                    </div>
                    <div>
                      <h4 class="font-serif italic text-xl text-cafe-dark">{{ item.name[language()] }}</h4>
                      <div class="flex items-center gap-2 mt-1">
                        <p class="text-[9px] text-cafe-gold font-black uppercase tracking-[0.4em]">{{ item.category }}</p>
                      </div>
                    </div>
                  </div>
                  <span class="font-black text-cafe-dark tracking-tighter">\${{ (item.price * item.quantity).toFixed(2) }}</span>
                </div>
              }
            </div>

            <div class="sticky bottom-0 bg-cafe-cream pt-6 pb-2 mt-auto">
              <div class="bg-white rounded-[3rem] p-8 md:p-10 space-y-6 mb-8 shadow-sm border border-cafe-dark/5">
                <div class="flex justify-between items-center">
                  <span class="text-2xl font-serif italic tracking-tighter text-cafe-dark">{{ language() === 'en' ? 'Grand Total' : 'ጠቅላላ ድምር' }}</span>
                  <span class="text-4xl font-black text-cafe-gold tracking-tighter">\${{ totalPrice().toFixed(2) }}</span>
                </div>
              </div>

              <button 
                (click)="confirm.emit()"
                class="w-full py-8 bg-cafe-dark text-white rounded-full font-black uppercase tracking-[0.5em] text-[10px] hover:bg-cafe-gold hover:text-cafe-dark transition-all shadow-2xl shadow-cafe-dark/20"
              >
                {{ language() === 'en' ? 'Confirm & Order' : 'አረጋግጥ እና እዘዝ' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ReviewModal {
  items = input.required<SelectionItem[]>();
  totalPrice = input.required<number>();
  language = input.required<'en' | 'am'>();
  closeModal = output();
  confirm = output();
}
