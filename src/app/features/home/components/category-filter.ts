import {ChangeDetectionStrategy, Component, input, output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-category-filter',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="md:sticky top-20 z-40 bg-cafe-cream/90 backdrop-blur-md border-b border-cafe-dark/5">
      <div class="max-w-6xl mx-auto px-6 py-6 space-y-6">
        <!-- Search Bar -->
        <div class="relative group max-w-2xl mx-auto">
          <mat-icon class="absolute left-5 top-1/2 -translate-y-1/2 text-cafe-dark/30 group-focus-within:text-cafe-gold transition-colors">search</mat-icon>
          <input 
            type="text" 
            [value]="searchQuery()"
            (input)="onSearch($event)"
            [placeholder]="language() === 'en' ? 'What are you craving today?' : 'ምን መቅመስ ይፈልጋሉ?'"
            class="w-full pl-14 pr-6 py-4 bg-white border border-cafe-dark/10 rounded-[2rem] text-base focus:outline-none focus:ring-4 focus:ring-cafe-gold/5 focus:border-cafe-gold transition-all shadow-sm placeholder:text-cafe-dark/30"
          >
        </div>

        <!-- Category Filter -->
        <div class="overflow-x-auto no-scrollbar flex justify-start md:justify-center gap-2 md:gap-3 pb-2 px-4 md:px-0">
          @for (cat of categories(); track cat.en) {
            <button 
              (click)="selectCategory.emit(cat.en)"
              class="category-pill"
              [class.bg-cafe-dark]="selectedCategory() === cat.en"
              [class.text-white]="selectedCategory() === cat.en"
              [class.border-cafe-dark]="selectedCategory() === cat.en"
              [class.bg-white]="selectedCategory() !== cat.en"
              [class.text-cafe-dark/60]="selectedCategory() !== cat.en"
              [class.border-cafe-dark/10]="selectedCategory() !== cat.en"
              [class.hover:border-cafe-dark/30]="selectedCategory() !== cat.en"
            >
              {{ language() === 'en' ? cat.en : cat.am }}
            </button>
          }
        </div>
      </div>
    </div>
  `
})
export class CategoryFilter {
  categories = input.required<{en: string, am: string}[]>();
  selectedCategory = input.required<string>();
  searchQuery = input.required<string>();
  language = input.required<'en' | 'am'>();

  selectCategory = output<string>();
  searchQueryChange = output<string>();

  onSearch(event: Event) {
    this.searchQueryChange.emit((event.target as HTMLInputElement).value);
  }
}
