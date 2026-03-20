import {Injectable, signal, computed} from '@angular/core';
import {MenuItem} from '../models/menu-item.model';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private items = signal<MenuItem[]>([
    {
      id: '1',
      name: { en: 'Signature Espresso', am: 'ልዩ ኤስፕሬሶ' },
      description: { 
        en: 'Rich, full-bodied espresso with notes of dark chocolate and caramel.', 
        am: 'ጥቁር ቸኮሌት እና ካራሚል ጣዕም ያለው ጥልቅ ኤስፕሬሶ።' 
      },
      price: 3.5,
      category: { en: 'Coffee & Tea', am: 'ቡና እና ሻይ' },
      image: 'https://picsum.photos/seed/espresso/400/300',
      isSpecial: true,
      rating: 4.8,
    },
    {
      id: '2',
      name: { en: 'Velvet Latte', am: 'ቬልቬት ላቴ' },
      description: { 
        en: 'Smooth steamed milk poured over our signature espresso, topped with a light foam.', 
        am: 'በልዩ ኤስፕሬሶ ላይ የተጨመረ ለስላሳ ወተት።' 
      },
      price: 4.5,
      category: { en: 'Coffee & Tea', am: 'ቡና እና ሻይ' },
      image: 'https://picsum.photos/seed/latte/400/300',
      rating: 4.5,
    },
    {
      id: '3',
      name: { en: 'Almond Croissant', am: 'የአልሞንድ ክሮይሰንት' },
      description: { 
        en: 'Flaky, buttery pastry filled with sweet almond cream and topped with toasted almonds.', 
        am: 'በአልሞንድ ክሬም የተሞላ ጣፋጭ ኬክ።' 
      },
      price: 4.0,
      category: { en: 'Pastries & Sweets', am: 'ኬኮች እና ጣፋጮች' },
      image: 'https://picsum.photos/seed/croissant/400/300',
      isSpecial: true,
      rating: 4.9,
    },
    {
      id: '4',
      name: { en: 'Avocado Sourdough', am: 'አቮካዶ ሳውርዶው' },
      description: { 
        en: 'Fresh avocado mash, chili flakes, and a poached egg on toasted sourdough.', 
        am: 'ትኩስ አቮካዶ እና እንቁላል በዳቦ ላይ።' 
      },
      price: 12.0,
      category: { en: 'Breakfast & Brunch', am: 'ቁርስ እና ምሳ' },
      image: 'https://picsum.photos/seed/avocado/400/300',
      rating: 4.7,
    },
    {
      id: '5',
      name: { en: 'Cold Brew', am: 'ቀዝቃዛ ቡና' },
      description: { 
        en: 'Steeped for 24 hours for a smooth, low-acid coffee experience.', 
        am: 'ለ24 ሰዓታት ተዘፍዝፎ የተዘጋጀ ለስላሳ ቀዝቃዛ ቡና።' 
      },
      price: 5.0,
      category: { en: 'Cold Drinks', am: 'ቀዝቃዛ መጠጦች' },
      image: 'https://picsum.photos/seed/coldbrew/400/300',
      rating: 4.6,
    },
    {
      id: '6',
      name: { en: 'Blueberry Muffin', am: 'ብሉቤሪ መፊን' },
      description: { 
        en: 'Bursting with fresh blueberries and topped with a crunchy streusel.', 
        am: 'በትኩስ ብሉቤሪ የተሰራ ጣፋጭ መፊን።' 
      },
      price: 3.5,
      category: { en: 'Pastries & Sweets', am: 'ኬኮች እና ጣፋጮች' },
      image: 'https://picsum.photos/seed/muffin/400/300',
      rating: 4.4,
    },
    {
      id: '7',
      name: { en: 'Classic Chai Latte', am: 'ክላሲክ ሻይ ላቴ' },
      description: { 
        en: 'Spiced black tea blended with steamed milk for a warming treat.', 
        am: 'ቅመም ያለው ጥቁር ሻይ ከወተት ጋር።' 
      },
      price: 4.75,
      category: { en: 'Coffee & Tea', am: 'ቡና እና ሻይ' },
      image: 'https://picsum.photos/seed/chai/400/300',
      rating: 4.3,
    },
    {
      id: '8',
      name: { en: 'Berry Smoothie Bowl', am: 'የቤሪ ስሙዝ ቦውል' },
      description: { 
        en: 'Mixed berries, banana, and granola topped with fresh fruit and honey.', 
        am: 'የተለያዩ ቤሪዎች እና ሙዝ ከማር ጋር።' 
      },
      price: 10.5,
      category: { en: 'Breakfast & Brunch', am: 'ቁርስ እና ምሳ' },
      image: 'https://picsum.photos/seed/smoothie/400/300',
      isSpecial: true,
      rating: 4.9,
    }
  ]);

  categories = signal<{ en: string; am: string }[]>([
    { en: 'All', am: 'ሁሉም' },
    { en: 'Coffee & Tea', am: 'ቡና እና ሻይ' },
    { en: 'Pastries & Sweets', am: 'ኬኮች እና ጣፋጮች' },
    { en: 'Breakfast & Brunch', am: 'ቁርስ እና ምሳ' },
    { en: 'Cold Drinks', am: 'ቀዝቃዛ መጠጦች' },
    { en: 'Specials', am: 'ልዩ ቅናሾች' }
  ]);
  
  selectedCategory = signal<string>('All');
  searchQuery = signal<string>('');
  language = signal<'en' | 'am'>('en');

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
        matchesCategory = item.category.en === category;
      }

      if (!matchesCategory) return false;
      if (!query) return true;

      // Search in current language and English fallback
      const searchFields = [
        item.name[lang],
        item.description[lang],
        item.name.en,
        item.description.en
      ];

      return searchFields.some(field => field.toLowerCase().includes(query));
    });
  });

  getItemById(id: string) {
    return this.items().find(item => item.id === id);
  }

  updateRating(itemId: string, rating: number) {
    this.items.update(items => items.map(item => 
      item.id === itemId ? { ...item, rating: rating } : item
    ));
  }

  setCategory(category: string) {
    this.selectedCategory.set(category);
  }

  setSearchQuery(query: string) {
    this.searchQuery.set(query);
  }

  toggleLanguage() {
    this.language.update(l => l === 'en' ? 'am' : 'en');
  }
}
