export class Dish {
    id: number;
    name: string;
    cuisine: string;
    category: string;
    price: number;
    type: string;
    ingredients: string;
    amountOfDishes: number;
    description: string;
    imageUrl: string;
    rating: number;

    constructor(id: number, name: string, cuisine: string, category: string, type: string, ingredients: string,
        amountOfDishes: number, price: number, description: string, imageUrl: string) {


        this.id = id;
        this.name = name;
        this.cuisine = cuisine;
        this.category = category;
        this.type = type;
        this.ingredients = ingredients;
        this.amountOfDishes = amountOfDishes;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}