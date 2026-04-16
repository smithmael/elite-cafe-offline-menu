import {Injectable, signal, computed} from '@angular/core';
import {MenuItem} from '../models/menu-item.model';

export interface SelectionItem extends MenuItem {
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class SelectionService {
  private selectedItems = signal<SelectionItem[]>([]);

  count = computed(() => this.selectedItems().reduce((acc, item) => acc + item.quantity, 0));
  totalPrice = computed(() => this.selectedItems().reduce((acc, item) => acc + (item.price * item.quantity), 0));
  items = this.selectedItems.asReadonly();

  addItem(item: MenuItem, quantity = 1) {
    this.selectedItems.update(items => {
      const existing = items.find(i => i.id === item.id);
      if (existing) {
        return items.map(i => i.id === item.id ? {...i, quantity: i.quantity + quantity} : i);
      }
      return [...items, {...item, quantity}];
    });
  }

  updateQuantity(itemId: string, quantity: number) {
    if (quantity <= 0) {
      this.removeItem(itemId);
      return;
    }
    this.selectedItems.update(items => 
      items.map(i => i.id === itemId ? {...i, quantity} : i)
    );
  }

  removeItem(itemId: string) {
    this.selectedItems.update(items => items.filter(i => i.id !== itemId));
  }

  clear() {
    this.selectedItems.set([]);
  }
}
