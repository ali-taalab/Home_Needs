export type Product = { id: string; name: string; emoji: string; categoryId: string; custom?: boolean };
export type Category = { id: string; name: string; emoji: string; color: string };

export const CATEGORIES: Category[] = [
  { id: 'produce', name: 'Fruits & Vegetables', emoji: '🥦', color: '#E3F4E1' },
  { id: 'dairy', name: 'Dairy & Eggs', emoji: '🥛', color: '#E6F0FB' },
  { id: 'bakery', name: 'Bakery', emoji: '🍞', color: '#FBEEDD' },
  { id: 'meat', name: 'Meat & Poultry', emoji: '🍗', color: '#FBE3E1' },
  { id: 'seafood', name: 'Fish & Seafood', emoji: '🐟', color: '#E0F3F7' },
  { id: 'pantry', name: 'Pantry & Grains', emoji: '🍚', color: '#F6F0DC' },
  { id: 'canned', name: 'Canned & Sauces', emoji: '🥫', color: '#F8E6DC' },
  { id: 'spices', name: 'Spices & Oils', emoji: '🧂', color: '#F1EADF' },
  { id: 'breakfast', name: 'Breakfast', emoji: '🥣', color: '#FFF3D6' },
  { id: 'snacks', name: 'Snacks & Sweets', emoji: '🍫', color: '#F3E5DA' },
  { id: 'beverages', name: 'Beverages', emoji: '🧃', color: '#FFF0E0' },
  { id: 'frozen', name: 'Frozen', emoji: '🧊', color: '#E5F1FA' },
  { id: 'cleaning', name: 'Cleaning', emoji: '🧽', color: '#E4F6F0' },
  { id: 'personal', name: 'Personal Care', emoji: '🧴', color: '#F3E7F6' },
  { id: 'baby', name: 'Baby', emoji: '🍼', color: '#FCE8F0' },
  { id: 'household', name: 'Household & Paper', emoji: '🧻', color: '#EEEEF3' },
  { id: 'pets', name: 'Pets', emoji: '🐾', color: '#EFEDE4' },
];

const raw: Record<string, [string, string][]> = {
  produce: [
    ['Tomatoes', '🍅'], ['Potatoes', '🥔'], ['Onions', '🧅'], ['Garlic', '🧄'], ['Cucumbers', '🥒'],
    ['Carrots', '🥕'], ['Lettuce', '🥬'], ['Bell peppers', '🫑'], ['Lemons', '🍋'], ['Bananas', '🍌'],
    ['Apples', '🍎'], ['Oranges', '🍊'], ['Grapes', '🍇'], ['Strawberries', '🍓'], ['Watermelon', '🍉'],
    ['Avocado', '🥑'], ['Eggplant', '🍆'], ['Zucchini', '🥒'], ['Mushrooms', '🍄'], ['Herbs (parsley, mint)', '🌿'],
  ],
  dairy: [
    ['Milk', '🥛'], ['Eggs', '🥚'], ['Butter', '🧈'], ['Yogurt', '🍶'], ['Cheese', '🧀'],
    ['Feta cheese', '🧀'], ['Cream cheese', '🧀'], ['Cooking cream', '🥛'], ['Labneh', '🥣'], ['Mozzarella', '🧀'],
  ],
  bakery: [
    ['Bread', '🍞'], ['Pita bread', '🫓'], ['Toast bread', '🍞'], ['Croissants', '🥐'], ['Baguette', '🥖'],
    ['Buns', '🍔'], ['Tortillas', '🌯'], ['Cake', '🍰'],
  ],
  meat: [
    ['Chicken breast', '🍗'], ['Whole chicken', '🐔'], ['Minced beef', '🥩'], ['Beef steak', '🥩'],
    ['Lamb', '🍖'], ['Sausages', '🌭'], ['Turkey slices', '🦃'], ['Burgers', '🍔'],
  ],
  seafood: [['Fish fillet', '🐟'], ['Salmon', '🍣'], ['Shrimp', '🦐'], ['Tuna steak', '🐟'], ['Calamari', '🦑']],
  pantry: [
    ['Rice', '🍚'], ['Pasta', '🍝'], ['Flour', '🌾'], ['Sugar', '🍬'], ['Lentils', '🫘'],
    ['Chickpeas', '🫘'], ['Oats', '🥣'], ['Bulgur', '🌾'], ['Noodles', '🍜'], ['Bread crumbs', '🍞'],
  ],
  canned: [
    ['Tomato paste', '🥫'], ['Canned tuna', '🐟'], ['Canned beans', '🥫'], ['Canned corn', '🌽'],
    ['Ketchup', '🍅'], ['Mayonnaise', '🥚'], ['Mustard', '🌭'], ['Soy sauce', '🍶'], ['Pasta sauce', '🍝'],
  ],
  spices: [
    ['Salt', '🧂'], ['Black pepper', '🌶️'], ['Cumin', '🫙'], ['Paprika', '🌶️'], ['Cinnamon', '🫙'],
    ['Olive oil', '🫒'], ['Vegetable oil', '🛢️'], ['Vinegar', '🍶'], ['Baking powder', '🧁'],
  ],
  breakfast: [
    ['Cereal', '🥣'], ['Honey', '🍯'], ['Jam', '🍓'], ['Peanut butter', '🥜'], ['Chocolate spread', '🍫'],
    ['Tea', '🍵'], ['Coffee', '☕'], ['Halawa', '🍬'],
  ],
  snacks: [
    ['Chips', '🍟'], ['Chocolate', '🍫'], ['Biscuits', '🍪'], ['Nuts', '🥜'], ['Popcorn', '🍿'],
    ['Candy', '🍬'], ['Ice cream', '🍦'], ['Dates', '🌴'],
  ],
  beverages: [
    ['Water', '💧'], ['Juice', '🧃'], ['Soft drinks', '🥤'], ['Sparkling water', '🫧'],
    ['Energy drinks', '⚡'], ['Milk drinks', '🥛'],
  ],
  frozen: [
    ['Frozen vegetables', '🥦'], ['Frozen fries', '🍟'], ['Frozen pizza', '🍕'], ['Frozen chicken', '🍗'],
    ['Frozen berries', '🫐'], ['Ice', '🧊'],
  ],
  cleaning: [
    ['Dish soap', '🧼'], ['Laundry detergent', '🧺'], ['Fabric softener', '🧴'], ['Bleach', '🧪'],
    ['Floor cleaner', '🧹'], ['Glass cleaner', '🪟'], ['Sponges', '🧽'], ['Trash bags', '🗑️'], ['Dishwasher tablets', '🍽️'],
  ],
  personal: [
    ['Shampoo', '🧴'], ['Conditioner', '🧴'], ['Body wash', '🛁'], ['Soap bar', '🧼'], ['Toothpaste', '🪥'],
    ['Toothbrush', '🪥'], ['Deodorant', '🧴'], ['Razors', '🪒'], ['Hand cream', '🤲'], ['Cotton pads', '☁️'],
  ],
  baby: [['Diapers', '👶'], ['Baby wipes', '🧻'], ['Baby formula', '🍼'], ['Baby food', '🥣'], ['Baby shampoo', '🧴']],
  household: [
    ['Toilet paper', '🧻'], ['Paper towels', '🧻'], ['Tissues', '🤧'], ['Aluminum foil', '🪙'],
    ['Plastic wrap', '🎞️'], ['Batteries', '🔋'], ['Light bulbs', '💡'], ['Food bags', '🛍️'],
  ],
  pets: [['Cat food', '🐱'], ['Dog food', '🐶'], ['Cat litter', '🪣'], ['Pet treats', '🦴']],
};

export const BUILTIN_PRODUCTS: Product[] = Object.entries(raw).flatMap(([categoryId, items]) =>
  items.map(([name, emoji], i) => ({ id: `${categoryId}-${i}`, name, emoji, categoryId })),
);

export const categoryById = (id: string) => CATEGORIES.find((c) => c.id === id);
