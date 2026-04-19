import { Injectable, signal, computed } from '@angular/core';
import { createClient } from '@sanity/client';
import { MenuItem } from '../models/menu-item.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  // 1. Sanity Client Configuration
  private client = createClient({
    projectId: 'q4duhjks', // Your verified Project ID
    dataset: 'production',
    useCdn: true,
    apiVersion: '2024-03-01',
  });

  // 2. State Management (Items start empty)
  private items = signal<MenuItem[]>([]);
  
  // 3. UI State Signals (Keep your original logic)
  selectedCategory = signal<string>('All');
  searchQuery = signal<string>('');
  language = signal<'en' | 'am'>('en');

  categories = signal<{ en: string; am: string }[]>([
    { en: 'All', am: 'ሁሉም' },
    { en: 'Coffee & Tea', am: 'ቡና እና ሻይ' },
    { en: 'Pastries & Sweets', am: 'ኬኮች እና ጣፋጮች' },
    { en: 'Breakfast & Brunch', am: 'ቁርስ እና ምሳ' },
    { en: 'Cold Drinks', am: 'ቀዝቃዛ መጠጦች' },
    { en: 'Specials', am: 'ልዩ ቅናሾች' }
  ]);

  constructor() {
    this.loadMenuItems();
  }

  // 4. Fetch data from Sanity
  async loadMenuItems() {
    console.log('--- Sanity Fetch Started ---');
    try {
      const query = `*[_type == "menuItem"]{
        "id": _id,
        name,
        description,
        price,
        category,
        "image": image.asset->url,
        isSpecial,
        rating,
        tags
      }`;
  
      const data = await this.client.fetch(query);
      console.log('Raw Data from Sanity:', data);
  
      if (data.length === 0) {
        console.warn('Connected to Sanity, but the database is EMPTY. Did you Publish your items?');
      }
  
      this.items.set(data);
      console.log('Signal Updated with:', this.items());
    } catch (err) {
      console.error('CRITICAL CONNECTION ERROR:', err);
    }
  }

  // 5. Computed Signals (Original logic, now working with live data)
  specialItems = computed(() => this.items().filter(item => item.isSpecial));

  filteredItems = computed(() => {
    const items = this.items();
    const category = this.selectedCategory();
    const query = this.searchQuery().toLowerCase().trim();
    const lang = this.language();

    return items.filter(item => {
      let matchesCategory = false;
      if (category === 'All') {
        matchesCategory = true;
      } else if (category === 'Specials') {
        matchesCategory = !!item.isSpecial;
      } else {
        // Match against the English category name string
        matchesCategory = item.category.en === category;
      }

      if (!matchesCategory) return false;
      if (!query) return true;

      const searchFields = [
        item.name[lang],
        item.description[lang],
        item.name.en,
        item.description.en
      ];

      return searchFields.some(field => field?.toLowerCase().includes(query));
    });
  });

  // 6. Helper Methods
  getItemById(id: string) {
    return this.items().find(item => item.id === id);
  }

  // Note: Rating update logic would typically need a Sanity Mutation to persist
  updateRating(itemId: string, rating: number) {
    this.items.update(items => items.map(item => 
      item.id === itemId ? { ...item, rating: rating } : item
    ));
  }

  setCategory(category: string) { this.selectedCategory.set(category); }
  setSearchQuery(query: string) { this.searchQuery.set(query); }
  toggleLanguage() { this.language.update(l => l === 'en' ? 'am' : 'en'); }
}