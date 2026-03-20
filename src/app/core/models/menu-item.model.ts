export interface MenuItem {
  id: string;
  name: {
    en: string;
    am: string;
  };
  description: {
    en: string;
    am: string;
  };
  price: number;
  category: {
    en: string;
    am: string;
  };
  image: string;
  isSpecial?: boolean;
  rating?: number;
  tags?: {
    en: string[];
    am: string[];
  };
}
