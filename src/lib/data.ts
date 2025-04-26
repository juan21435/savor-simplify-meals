
export type Recipe = {
  id: string;
  title: string;
  description: string;
  image: string;
  prepTime: number;
  cookTime: number;
  servings: number;
  category: string;
  ingredients: string[];
  instructions: string[];
  isFavorite: boolean;
};

export type Category = {
  id: string;
  name: string;
  image: string;
};

export type MealPlan = {
  id: string;
  date: string;
  recipes: { 
    breakfast?: string;
    lunch?: string;
    dinner?: string;
  };
};

export type ShoppingItem = {
  id: string;
  name: string;
  checked: boolean;
  category: string;
};

export const categories: Category[] = [
  { id: "breakfast", name: "Breakfast", image: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?q=80&w=300" },
  { id: "lunch", name: "Lunch", image: "https://images.unsplash.com/photo-1600335895229-6e75511892c8?q=80&w=300" },
  { id: "dinner", name: "Dinner", image: "https://images.unsplash.com/photo-1592861956120-e524fc739696?q=80&w=300" },
  { id: "dessert", name: "Dessert", image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=300" },
  { id: "vegetarian", name: "Vegetarian", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?q=80&w=300" },
  { id: "quick", name: "Quick & Easy", image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=300" },
];

export const recipes: Recipe[] = [
  {
    id: "1",
    title: "Avocado Toast with Poached Egg",
    description: "A delicious and healthy breakfast option featuring creamy avocado and perfectly poached eggs on toasted sourdough bread.",
    image: "https://images.unsplash.com/photo-1603046891744-76321571b7c1?q=80&w=600",
    prepTime: 10,
    cookTime: 5,
    servings: 2,
    category: "breakfast",
    ingredients: [
      "2 slices sourdough bread",
      "1 ripe avocado",
      "2 eggs",
      "1 tbsp vinegar",
      "Salt and pepper to taste",
      "Red pepper flakes (optional)",
      "1 tbsp olive oil"
    ],
    instructions: [
      "Toast the sourdough bread until golden brown.",
      "Mash the avocado and spread it on the toast. Season with salt and pepper.",
      "Bring water to a gentle simmer in a pot, add vinegar.",
      "Create a whirlpool in the water and crack an egg into the center. Cook for 3 minutes.",
      "Remove the poached egg with a slotted spoon and place on top of the avocado toast.",
      "Season with salt, pepper, and red pepper flakes if desired.",
      "Drizzle with olive oil and serve immediately."
    ],
    isFavorite: true
  },
  {
    id: "2",
    title: "Spaghetti Carbonara",
    description: "A classic Italian pasta dish made with eggs, cheese, pancetta, and black pepper.",
    image: "https://images.unsplash.com/photo-1612874742237-6526221588e3?q=80&w=600",
    prepTime: 15,
    cookTime: 20,
    servings: 4,
    category: "dinner",
    ingredients: [
      "400g spaghetti",
      "150g pancetta or guanciale, diced",
      "4 egg yolks",
      "1 whole egg",
      "100g Pecorino Romano cheese, grated",
      "50g Parmigiano Reggiano, grated",
      "Freshly ground black pepper",
      "Salt"
    ],
    instructions: [
      "Bring a large pot of salted water to boil and cook the spaghetti until al dente.",
      "While pasta is cooking, sauté pancetta in a large pan until crispy.",
      "In a bowl, whisk together egg yolks, whole egg, and grated cheeses.",
      "When pasta is done, reserve 1/2 cup of pasta water, then drain pasta.",
      "With the heat off, add hot pasta to the pan with pancetta and toss.",
      "Quickly add the egg and cheese mixture and stir vigorously.",
      "Add a splash of pasta water to create a creamy sauce.",
      "Finish with freshly ground black pepper and serve immediately."
    ],
    isFavorite: true
  },
  {
    id: "3",
    title: "Greek Salad",
    description: "A refreshing Mediterranean salad with crisp vegetables, feta cheese, and Kalamata olives.",
    image: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?q=80&w=600",
    prepTime: 15,
    cookTime: 0,
    servings: 4,
    category: "lunch",
    ingredients: [
      "1 cucumber, diced",
      "4 large tomatoes, cut into chunks",
      "1 red onion, thinly sliced",
      "1 green bell pepper, diced",
      "200g feta cheese, cubed",
      "100g Kalamata olives",
      "2 tbsp extra virgin olive oil",
      "1 tbsp red wine vinegar",
      "1 tsp dried oregano",
      "Salt and pepper to taste"
    ],
    instructions: [
      "Combine cucumber, tomatoes, red onion, and bell pepper in a large bowl.",
      "Add Kalamata olives and feta cheese cubes.",
      "In a small bowl, whisk together olive oil, red wine vinegar, oregano, salt, and pepper.",
      "Pour the dressing over the salad and toss gently.",
      "Let the salad sit for 10 minutes to allow flavors to meld.",
      "Serve with crusty bread or as a side dish."
    ],
    isFavorite: false
  },
  {
    id: "4",
    title: "Classic Chocolate Chip Cookies",
    description: "The perfect chocolate chip cookie – crispy on the outside, chewy on the inside, and loaded with chocolate chips.",
    image: "https://images.unsplash.com/photo-1499636136210-6f4ee915583e?q=80&w=600",
    prepTime: 20,
    cookTime: 10,
    servings: 24,
    category: "dessert",
    ingredients: [
      "2 1/4 cups all-purpose flour",
      "1 tsp baking soda",
      "1 tsp salt",
      "1 cup unsalted butter, softened",
      "3/4 cup granulated sugar",
      "3/4 cup packed brown sugar",
      "2 large eggs",
      "2 tsp vanilla extract",
      "2 cups semi-sweet chocolate chips"
    ],
    instructions: [
      "Preheat oven to 375°F (190°C).",
      "In a small bowl, mix flour, baking soda, and salt.",
      "In a large bowl, cream together butter and both sugars until light and fluffy.",
      "Beat in eggs one at a time, then stir in vanilla.",
      "Gradually blend in the dry ingredients.",
      "Fold in chocolate chips.",
      "Drop by rounded tablespoons onto ungreased baking sheets.",
      "Bake for 9-11 minutes or until golden brown.",
      "Let stand for 2 minutes before removing to cooling racks."
    ],
    isFavorite: true
  },
  {
    id: "5",
    title: "Vegetable Stir-Fry",
    description: "A colorful and nutritious stir-fry loaded with fresh vegetables and a flavorful sauce.",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?q=80&w=600",
    prepTime: 15,
    cookTime: 10,
    servings: 4,
    category: "vegetarian",
    ingredients: [
      "2 tbsp vegetable oil",
      "2 cloves garlic, minced",
      "1 tbsp ginger, grated",
      "1 bell pepper, sliced",
      "1 carrot, julienned",
      "1 cup broccoli florets",
      "1 cup snap peas",
      "1 cup mushrooms, sliced",
      "2 tbsp soy sauce",
      "1 tbsp sesame oil",
      "1 tsp brown sugar",
      "Sesame seeds for garnish",
      "Cooked rice for serving"
    ],
    instructions: [
      "Heat vegetable oil in a large wok or skillet over high heat.",
      "Add garlic and ginger, stir for 30 seconds until fragrant.",
      "Add carrots and broccoli, stir-fry for 2 minutes.",
      "Add bell pepper, snap peas, and mushrooms, continue stir-frying for 3-4 minutes.",
      "In a small bowl, mix soy sauce, sesame oil, and brown sugar.",
      "Pour sauce over vegetables and toss to coat evenly.",
      "Cook for an additional 1-2 minutes until vegetables are tender-crisp.",
      "Sprinkle with sesame seeds and serve over cooked rice."
    ],
    isFavorite: false
  },
  {
    id: "6",
    title: "15-Minute Quesadillas",
    description: "Quick and satisfying quesadillas filled with cheese, beans, and vegetables.",
    image: "https://images.unsplash.com/photo-1599789197514-47270cd526b4?q=80&w=600",
    prepTime: 5,
    cookTime: 10,
    servings: 2,
    category: "quick",
    ingredients: [
      "4 flour tortillas",
      "2 cups shredded cheddar cheese",
      "1 cup black beans, drained and rinsed",
      "1 bell pepper, diced",
      "1/2 red onion, finely chopped",
      "2 tbsp olive oil",
      "Salt and pepper to taste",
      "Sour cream for serving",
      "Guacamole for serving (optional)",
      "Salsa for serving (optional)"
    ],
    instructions: [
      "Heat a large skillet over medium heat.",
      "Lay out tortillas and sprinkle cheese evenly over half of each tortilla.",
      "Add black beans, diced bell pepper, and chopped onion on top of the cheese.",
      "Season with salt and pepper.",
      "Fold tortillas in half to create a half-moon shape.",
      "Brush the outside of each tortilla with olive oil.",
      "Cook quesadillas in the skillet for 2-3 minutes per side until golden brown and crispy.",
      "Cut into wedges and serve with sour cream, guacamole, and salsa."
    ],
    isFavorite: true
  }
];

export const mealPlans: MealPlan[] = [
  {
    id: "1",
    date: "2025-04-26",
    recipes: {
      breakfast: "1",
      lunch: "3",
      dinner: "2"
    }
  },
  {
    id: "2",
    date: "2025-04-27",
    recipes: {
      breakfast: "1",
      dinner: "5"
    }
  }
];

export const shoppingList: ShoppingItem[] = [
  { id: "1", name: "Avocados", checked: false, category: "Produce" },
  { id: "2", name: "Eggs", checked: false, category: "Dairy" },
  { id: "3", name: "Sourdough bread", checked: false, category: "Bakery" },
  { id: "4", name: "Spaghetti", checked: false, category: "Pasta & Rice" },
  { id: "5", name: "Pancetta", checked: false, category: "Meat" },
  { id: "6", name: "Pecorino Romano cheese", checked: false, category: "Dairy" },
  { id: "7", name: "Cucumber", checked: false, category: "Produce" },
  { id: "8", name: "Tomatoes", checked: true, category: "Produce" },
  { id: "9", name: "Feta cheese", checked: true, category: "Dairy" },
  { id: "10", name: "Kalamata olives", checked: false, category: "Canned Goods" },
];

// Helper functions
export const getRecipeById = (id: string): Recipe | undefined => {
  return recipes.find(recipe => recipe.id === id);
};

export const getRecipesByCategory = (categoryId: string): Recipe[] => {
  return recipes.filter(recipe => recipe.category === categoryId);
};

export const getFavoriteRecipes = (): Recipe[] => {
  return recipes.filter(recipe => recipe.isFavorite);
};

export const getMealPlanByDate = (date: string): MealPlan | undefined => {
  return mealPlans.find(plan => plan.date === date);
};
