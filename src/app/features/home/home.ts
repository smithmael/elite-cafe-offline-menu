import {ChangeDetectionStrategy, Component, inject, signal, effect, ElementRef, viewChild, PLATFORM_ID} from '@angular/core';
import {CommonModule, isPlatformBrowser} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatChipsModule} from '@angular/material/chips';
import {MatSnackBar, MatSnackBarModule} from '@angular/material/snack-bar';
import {MatMenuModule} from '@angular/material/menu';
import {animate, stagger} from 'motion';

// Core Services & Models
import {MenuService} from '../../core/services/menu.service';
import {SelectionService} from '../../core/services/selection.service';
import {MenuItem} from '../../core/models/menu-item.model';

// Layout Components
import {Header} from '../../layout/header';
import {Footer} from '../../layout/footer';

// Feature Components
import {Hero} from './components/hero';
import {CategoryFilter} from './components/category-filter';
import {MenuCard} from './components/menu-card';
import {ReviewModal} from './components/review-modal';
import {ItemDetailModal} from './components/item-detail-modal';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule, 
    FormsModule,
    RouterModule,
    MatIconModule, 
    MatButtonModule, 
    MatChipsModule,
    MatSnackBarModule,
    MatMenuModule,
    Header,
    Footer,
    Hero,
    CategoryFilter,
    MenuCard,
    ReviewModal,
    ItemDetailModal
  ],
  templateUrl: './home.html',
  styleUrl: '../../app.css',
})
export class Home {
  public menuService = inject(MenuService);
  private selectionService = inject(SelectionService);
  private snackBar = inject(MatSnackBar);
  private platformId = inject(PLATFORM_ID);
  
  filteredItems = this.menuService.filteredItems;
  specialItems = this.menuService.specialItems;
  categories = this.menuService.categories;
  selectedCategory = this.menuService.selectedCategory;
  searchQuery = this.menuService.searchQuery;
  language = this.menuService.language;
  selectionCount = this.selectionService.count;
  selectedItems = this.selectionService.items;
  totalPrice = this.selectionService.totalPrice;
  
  isSharing = signal(false);
  showReview = signal(false);
  selectedItemForDetail = signal<MenuItem | null>(null);
  menuGrid = viewChild<ElementRef>('menuGrid');
  selectionSection = viewChild<ElementRef>('selectionSection');
  footer = viewChild('footer', { read: ElementRef });

  constructor() {
    effect(() => {
      if (!isPlatformBrowser(this.platformId)) return;
      
      this.filteredItems();
      this.specialItems();
      const grid = this.menuGrid();
      if (grid) {
        setTimeout(() => {
          const cards = grid.nativeElement.querySelectorAll('.reveal-item');
          if (cards.length > 0) {
            animate(
              cards,
              { y: [20, 0] },
              { delay: stagger(0.1), duration: 0.6, ease: 'easeOut' }
            );
          }
        }, 0);
      }
    });
  }

  // --- NEW: Reset Filters Logic ---
  clearAllFilters() {
    this.menuService.selectedCategory.set('ALL');
    this.menuService.setSearchQuery('');
  }

  rateItem(item: MenuItem, rating: number) {
    this.menuService.updateRating(item.id, rating);
    this.snackBar.open(
      this.language() === 'en' 
        ? `You rated ${item.name.en} ${rating} stars!` 
        : `${item.name.am}ን ${rating} ኮከብ ሰጥተዋል!`, 
      'Close', 
      { duration: 2000 }
    );
  }

  addToSelection(item: MenuItem) {
    this.selectionService.addItem(item);
    this.snackBar.open(
      this.language() === 'en'
        ? `${item.name.en} is ready to eat!`
        : `${item.name.am} ለመመገብ ዝግጁ ነው!`,
      'Close',
      { duration: 2000 }
    );
  }

  selectCategory(category: string) {
    this.menuService.setCategory(category);
  }

  onSearch(event: Event) {
    const query = (event.target as HTMLInputElement).value;
    this.menuService.setSearchQuery(query);
  }

  toggleLanguage() {
    this.menuService.toggleLanguage();
  }

  scrollToMenu() {
    // Try both ViewChild and direct ID lookup for reliability
    const element = this.menuGrid()?.nativeElement || document.getElementById('menuGrid');
    element?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  scrollToSelection() {
    const section = this.selectionSection();
    if (section) {
      section.nativeElement?.scrollIntoView({ behavior: 'smooth' });
    } else {
      this.scrollToFooter();
    }
  }

  scrollToFooter() {
    this.footer()?.nativeElement?.scrollIntoView({ behavior: 'smooth' });
  }

  removeItem(itemId: string) {
    this.selectionService.removeItem(itemId);
  }

  clearSelection() {
    this.selectionService.clear();
    this.showReview.set(false);
  }

  toggleReview() {
    if (this.selectionCount() > 0) {
      this.showReview.update(v => !v);
    }
  }

  openDetail(item: MenuItem) {
    this.selectedItemForDetail.set(item);
  }

  closeDetail() {
    this.selectedItemForDetail.set(null);
  }

  confirmOrder() {
    this.snackBar.open(
      this.language() === 'en' 
        ? 'Order received! We are preparing your selection.' 
        : 'ትዕዛዝዎ ደርሶናል! በማዘጋጀት ላይ ነን።', 
      'Close', 
      { duration: 5000 }
    );
    this.clearSelection();
  }

  contactUs() {
    this.snackBar.open('Contact us at: +251 911 000 000', 'Close', { duration: 5000 });
  }

  async shareMenu() {
    if (!isPlatformBrowser(this.platformId)) return;

    try {
      this.isSharing.set(true);
      await navigator.clipboard.writeText(window.location.href);
      this.snackBar.open('Menu link copied to clipboard!', 'Close', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['cafe-snackbar']
      });
    } catch (err) {
      console.error('Failed to copy: ', err);
      this.snackBar.open('Failed to copy link.', 'Close', { duration: 3000 });
    } finally {
      setTimeout(() => this.isSharing.set(false), 500);
    }
  }

  trackById(index: number, item: MenuItem) {
    return item.id;
  }
}