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
    console.log('Sanity Data Loaded:', data);
  } catch (err) {
    console.error('Fetch Error:', err);
  }
}

  // FIXED: Re-added missing properties required by components
  specialItems = computed(() => this.items().filter(item => item.isSpecial));

  filteredItems = computed(() => {
    const items = this.items();
    const selection = this.normalize(this.selectedCategory());
    const query = this.searchQuery().toLowerCase().trim();
    const lang = this.language();

    return items.filter(item => {
      if (selection === 'ALL') return true;
      if (selection === 'SPECIALS') return !!item.isSpecial;
      const itemCat = this.normalize(item.category);
      if (itemCat !== selection) return false;

      if (!query) return true;
      const searchFields = [item.name?.[lang], item.description?.[lang], item.name?.en, item.description?.en];
      return searchFields.some(field => field?.toLowerCase().includes(query));
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