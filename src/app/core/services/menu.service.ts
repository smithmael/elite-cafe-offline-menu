import { Injectable, signal, computed } from '@angular/core';
import { createClient } from '@sanity/client';
import { MenuItem } from '../models/menu-item.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private client = createClient({
    projectId: 'q4duhjks', 
    dataset: 'production',
    useCdn: true,
    apiVersion: '2024-03-01',
  });

  private items = signal<MenuItem[]>([]);
  selectedCategory = signal<string>('ALL');
  searchQuery = signal<string>('');
  language = signal<'en' | 'am'>('en');

  categories = signal<{ en: string; am: string }[]>([
    { en: 'ALL', am: 'ሁሉም' },
    { en: 'COFFEE & TEA', am: 'ቡና እና ሻይ' },
    { en: 'PASTRIES & SWEETS', am: 'ኬኮች እና ጣፋጮች' },
    { en: 'BREAKFAST & BRUNCH', am: 'ቁርስ እና ምሳ' },
    { en: 'COLD DRINKS', am: 'ቀዝቃዛ መጠጦች' },
    { en: 'SPECIALS', am: 'ልዩ ቅናሾች' }
  ]);

  constructor() {
    this.loadMenuItems();
  }

// 1. Improved Normalization
private normalize(text: any): string {
  if (!text) return '';
  return String(text)
    .toUpperCase()
    .replace(/&/g, ' AND ')      // Convert & to AND so they match
    .replace(/[^A-Z0-9\s]/g, '') // Strip symbols
    .replace(/\bAND\b/g, '')     // Remove the word AND entirely
    .trim()
    .replace(/\s+/g, ' ');       // Fix double spaces
}

// 2. Updated Query to handle multiple data formats
async loadMenuItems() {
  // Check if we are in the browser to avoid "localStorage is not defined" error
  const isBrowser = typeof window !== 'undefined';

  try {
    const query = `*[_type == "menuItem"]{
      "id": _id,
      name,
      description,
      price,
      "category": coalesce(category.en, category, ""), 
      "image": image.asset->url,
      isSpecial,
      rating,
      tags
    }`;
    const data = await this.client.fetch(query);
    
    this.items.set(data);

    // Only save to cache if we are in the browser
    if (isBrowser) {
      localStorage.setItem('elite_menu_cache', JSON.stringify(data));
      console.log('✅ Online: Data cached');
    }
  } catch (err) {
    console.warn('⚠️ Connection failed. Checking for offline cache...');
    
    if (isBrowser) {
      const cachedData = localStorage.getItem('elite_menu_cache');
      if (cachedData) {
        this.items.set(JSON.parse(cachedData));
        console.log('📱 Offline: Loaded from LocalStorage');
      }
    } else {
      console.error('❌ Fetch failed and no browser context available.');
    }
  }
}

  // FIXED: Re-added missing properties required by components
  specialItems = computed(() => this.items().filter(item => item.isSpecial));

  // src/app/core/services/menu.service.ts

filteredItems = computed(() => {
  const allItems = this.items();
  const activeCategory = this.selectedCategory(); // e.g., 'ALL' or 'COLD DRINKS'
  const searchTerm = this.searchQuery().toLowerCase().trim();

  return allItems.filter(item => {
    // 1. Category Logic
    const matchesCategory = 
      activeCategory === 'ALL' || 
      this.normalize(item.category) === this.normalize(activeCategory);

    // 2. Search Logic
    const matchesSearch = 
      searchTerm === '' || 
      item.name.en?.toLowerCase().includes(searchTerm) || 
      item.name.am?.toLowerCase().includes(searchTerm) ||
      item.description.en?.toLowerCase().includes(searchTerm);

    // BOTH must be true
    return matchesCategory && matchesSearch;
  });
});

  // FIXED: Re-added missing helper methods
  getItemById(id: string) {
    return this.items().find(item => item.id === id);
  }

  updateRating(itemId: string, rating: number) {
    this.items.update(items => items.map(item => 
      item.id === itemId ? { ...item, rating: rating } : item
    ));
  }

  setCategory(category: string) { this.selectedCategory.set(category); }
  setSearchQuery(query: string) { this.searchQuery.set(query); }
  toggleLanguage() { this.language.update(l => l === 'en' ? 'am' : 'en'); }
}