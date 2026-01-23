export interface Product {
    id: number;
    name: string;
    price: number;
    image: string;
    category: string;
    description?: string;
    color?: string;
    colors?: string[];
    sizes?: string[];
    selectedColor?: string;
    selectedSize?: string;
    inStock: boolean;
}
