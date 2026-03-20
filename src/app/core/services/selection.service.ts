import {Injectable, signal, computed} from '@angular/core';
import {MenuItem} from '../models/menu-item.model';

@Injectable({
  providedIn: 'root',
})
export class SelectionService {
  private selectedItems = signal<MenuItem[]>([]);

  count = computed(() => this.selectedItems().length);
  totalPrice = computed(() => this.selectedItems().reduce((acc, item) => acc + item.price, 0));
  items = this.selectedItems.asReadonly();

  addItem(item: MenuItem) {
    this.selectedItems.update(items => {
      if (items.find(i => i.id === item.id)) return items;
      return [...items, item];
    });
  }

  removeItem(itemId: string) {
    this.selectedItems.update(items => items.filter(i => i.id !== itemId));
  }

  clear() {
    this.selectedItems.set([]);
  }
}
