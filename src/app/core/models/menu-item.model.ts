export interface MenuItem {
  id: string;
  name: { en: string; am: string };
  description: { en: string; am: string };
  price: number;
  category: string; // MUST be string to match Sanity data
  image: string;
  isSpecial?: boolean;
  rating?: number;
  tags?: any;
}