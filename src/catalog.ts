export type Product = { id: string; name: string; emoji: string; categoryId: string; sub?: string; custom?: boolean };
export type Category = { id: string; name: string; emoji: string; color: string };

/**
 * Catalog modelled on the departments of Egyptian hypermarkets (Carrefour, Fathallah, Seoudi).
 * Each sub-section: [name, default emoji, items separated by "|"].
 * An item can override the emoji with "Name~emoji".
 */
type Sub = [string, string, string];
type Dept = Category & { subs: Sub[] };

const DEPTS: Dept[] = [
  {
    id: 'produce', name: 'Fruits & Vegetables', emoji: '🥦', color: '#E3F4E1',
    subs: [
      ['Vegetables', '🥕', 'Tomatoes~🍅|Cherry tomatoes~🍅|Potatoes~🥔|Sweet potatoes~🍠|Onions~🧅|Red onions~🧅|Green onions~🧅|Garlic~🧄|Cucumbers~🥒|Carrots|Zucchini (Kousa)~🥒|Eggplant (Black)~🍆|Eggplant (White)~🍆|Bell peppers green~🫑|Bell peppers colored~🫑|Hot chili peppers~🌶️|Okra (Bamia)~🫛|Green beans (Fasolia)~🫛|Peas (Besella)~🫛|Cauliflower~🥦|Broccoli~🥦|Cabbage (White)~🥬|Red cabbage~🥬|Artichoke|Taro (Colcasia)~🥔|Beetroot|Turnips|Radish|Corn on the cob~🌽|Mushrooms~🍄|Pumpkin~🎃|Ginger~🫚|Lemons (Baladi)~🍋|Celery~🥬|Leeks|Fava beans fresh~🫛|Avocado~🥑'],
      ['Leafy greens & herbs', '🌿', 'Lettuce (Romaine)~🥬|Iceberg lettuce~🥬|Arugula (Gargeer)~🥬|Spinach~🥬|Molokhia (fresh)|Parsley|Coriander (Cilantro)|Dill|Mint|Basil|Rosemary|Thyme fresh|Watercress|Chard (Salq)~🥬'],
      ['Fruits', '🍎', 'Bananas~🍌|Apples red~🍎|Apples green~🍏|Apples yellow~🍏|Oranges~🍊|Navel oranges~🍊|Tangerines (Yusuf Afandi)~🍊|Lemons~🍋|Limes~🍋|Grapes white~🍇|Grapes red~🍇|Strawberries~🍓|Watermelon~🍉|Cantaloupe~🍈|Mango~🥭|Guava|Pomegranate|Peaches~🍑|Apricots~🍑|Plums|Pears~🍐|Kiwi~🥝|Pineapple~🍍|Figs|Prickly pear (Teen shoky)|Persimmon (Kaki)|Cherries~🍒|Blueberries~🫐|Fresh dates (Balah)~🌴|Coconut~🥥|Grapefruit~🍊|Dragon fruit'],
      ['Ready & pre-cut', '🥗', 'Salad mix|Cut fruit cup~🍉|Peeled garlic~🧄|Chopped molokhia~🌿|Soup vegetables mix~🥕|Shredded cabbage~🥬|Stuffing vegetables (Mahshi)~🫑'],
    ],
  },
  {
    id: 'bakery', name: 'Bakery', emoji: '🍞', color: '#FBEEDD',
    subs: [
      ['Bread', '🍞', 'Baladi bread~🫓|Shami bread~🫓|Brown bread|Fino bread~🥖|Toast bread white|Toast bread brown|Multigrain bread|Pita bread~🫓|Tortilla wraps~🌯|Burger buns~🍔|Hot dog buns~🌭|Baguette~🥖|Ciabatta|Sourdough|Bran bread|Gluten-free bread|Kaiser rolls'],
      ['Pastries', '🥐', 'Croissants plain|Croissants chocolate|Croissants cheese|Pate (Feteer)|Feteer meshaltet|Danish pastries|Muffins~🧁|Donuts~🍩|Cinnamon rolls|Mini pizzas~🍕|Sambousek~🥟'],
      ['Rusks & biscuits', '🥨', 'Rusks (Bakssamat)|Breadsticks|Ka\'ak with sesame|Ka\'ak with dates|Petit four~🍪|Ghorayeba~🍪|Biscuits (Baladi)~🍪|Toast (Rusk) brown'],
      ['Cakes & oriental sweets', '🍰', 'Cake slices|Birthday cake~🎂|Swiss roll|Brownies|Basbousa|Konafa|Baklava|Qatayef|Zalabya (Lokma)|Om Ali|Cheesecake'],
    ],
  },
  {
    id: 'dairy', name: 'Dairy & Eggs', emoji: '🥛', color: '#E6F0FB',
    subs: [
      ['Milk', '🥛', 'Full cream milk|Low fat milk|Skimmed milk|Fresh milk (pasteurized)|Long life milk (UHT)|Lactose free milk|Chocolate milk|Strawberry milk|Flavored milk|Powdered milk|Almond milk|Oat milk|Soy milk'],
      ['Laban & Rayeb', '🥛', 'Rayeb|Laban (buttermilk)|Kefir|Ayran|Drinkable yogurt'],
      ['Yogurt', '🍶', 'Plain yogurt|Low fat yogurt|Greek yogurt|Fruit yogurt|Zabadi baladi|Yogurt with honey~🍯|Labneh~🥣|Protein yogurt'],
      ['Cheese', '🧀', 'White cheese (Feta)|Istanbuli cheese|Domiati cheese|Areesh cheese|Old cheese (Mish)|Roumi cheese|Cheddar cheese|Cheddar slices|Mozzarella|Shredded mozzarella|Cream cheese|Processed cheese triangles|Cheese spread jar|Halloumi|Gouda|Edam|Emmental|Parmesan|Ricotta|Cottage cheese|Blue cheese|Brie|Camembert|Smoked cheese|Kashkaval|Mixed shredded cheese|Cheese for pizza~🍕'],
      ['Butter, ghee & margarine', '🧈', 'Butter salted|Butter unsalted|Ghee (Samna baladi)|Vegetable ghee (Samna)|Margarine|Butter spread'],
      ['Cream', '🥛', 'Cooking cream|Whipping cream|Eshta (clotted cream)|Sour cream|Breakfast cream (Qishta can)|Spray cream'],
      ['Eggs', '🥚', 'White eggs|Brown eggs (Baladi)|Organic eggs|Omega-3 eggs|Quail eggs|Eggs tray (30)'],
      ['Chilled desserts', '🍮', 'Rice pudding (Roz bel laban)|Mehalabeya|Chocolate pudding|Caramel pudding|Jelly cups|Custard cups|Om Ali cup|Mousse'],
    ],
  },
  {
    id: 'deli', name: 'Deli & Cold Cuts', emoji: '🥓', color: '#F9E6E1',
    subs: [
      ['Cold cuts', '🥓', 'Basterma|Luncheon meat (Beef)|Luncheon meat (Chicken)|Smoked turkey~🦃|Turkey breast slices~🦃|Chicken breast slices~🍗|Salami|Pepperoni~🍕|Roast beef slices|Mortadella|Frankfurters~🌭|Hot dogs~🌭|Smoked beef|Sogo\' (Sujuk)'],
      ['Olives & pickles', '🫒', 'Green olives|Black olives|Stuffed olives|Kalamata olives|Pickled cucumbers~🥒|Mixed pickles (Torshi)|Pickled lemons~🍋|Pickled carrots~🥕|Pickled turnips|Pickled peppers~🌶️|Pickled eggplant (Bitingan mekhallel)~🍆|Jalapenos~🌶️|Capers'],
      ['Dips & ready salads', '🥣', 'Tahina salad|Baba ghanoug~🍆|Hummus|Mutabbal|Tabbouleh~🥗|Coleslaw~🥗|Potato salad~🥔|Pasta salad~🍝|Rocket salad~🥗|Garlic dip (Toum)~🧄|Spicy tomato dip'],
      ['Ready meals', '🍱', 'Koshari|Grilled chicken~🍗|Shawarma~🌯|Mahshi ready|Moussaka|Macarona bechamel~🍝|Hawawshi|Falafel (Ta\'meya)|Ful medames (fresh)~🫘|Sandwiches~🥪|Sushi~🍣|Soup~🍲'],
    ],
  },
  {
    id: 'meat', name: 'Meat & Poultry', emoji: '🍗', color: '#FBE3E1',
    subs: [
      ['Beef & veal', '🥩', 'Minced beef|Beef cubes|Beef steak|Beef fillet|Entrecote|Roast beef|Veal escalope|Veal cubes|Shank (Kawareh)|Oxtail|Ribs|Beef liver|Kidneys|Tongue|Brain|Tripe (Kersha)|Bone marrow|Soup bones~🦴'],
      ['Lamb', '🍖', 'Lamb chops|Leg of lamb|Lamb shoulder|Lamb cubes|Minced lamb|Lamb ribs|Lamb liver|Lamb head (Mombar/Kawareh)'],
      ['Chicken', '🍗', 'Whole chicken~🐔|Chicken breasts (fillet)|Chicken thighs|Chicken drumsticks|Chicken wings|Chicken legs|Chicken quarters|Chicken liver|Chicken gizzards|Minced chicken|Chicken pane (breaded)|Chicken strips|Shish tawook|Chicken kofta|Chicken shawarma (raw)|Spiced grilled chicken'],
      ['Other poultry', '🦆', 'Duck|Pigeons (Hamam)~🕊️|Turkey whole~🦃|Turkey breast~🦃|Rabbit~🐇|Quail|Geese'],
      ['Ready to cook', '🍔', 'Beef burger|Chicken burger|Kofta|Sausages (Sogo\')~🌭|Hawawshi meat mix|Marinated steak~🥩|Kebab~🍢|Meatballs (Kofta Dawood Basha)|Mombar (stuffed)'],
    ],
  },
  {
    id: 'seafood', name: 'Fish & Seafood', emoji: '🐟', color: '#E0F3F7',
    subs: [
      ['Fresh fish', '🐟', 'Tilapia (Bolti)|Mullet (Bouri)|Sea bream (Denise)|Sea bass (Ka\'ros)|Loot|Mackerel|Sardines|Grouper (Wakar)|Sole (Moussa)|Red mullet (Barbouni)|Salmon~🍣|Tuna fresh|Catfish (Karmout)|Fish fillet|Bayad|Mergan (Red snapper)'],
      ['Seafood', '🦐', 'Shrimp large|Shrimp medium|Shrimp peeled|Calamari~🦑|Crab~🦀|Mussels|Clams|Lobster~🦞|Octopus~🐙|Sea food mix'],
      ['Salted & smoked', '🐟', 'Fesikh|Renga (Smoked herring)|Salted sardines|Smoked salmon~🍣|Batarekh (Bottarga)|Anchovies|Smoked mackerel'],
    ],
  },
  {
    id: 'frozen', name: 'Frozen Food', emoji: '🧊', color: '#E5F1FA',
    subs: [
      ['Frozen vegetables', '🥦', 'Frozen molokhia~🌿|Frozen okra (Bamia)~🫛|Frozen peas~🫛|Frozen peas & carrots~🥕|Frozen mixed vegetables|Frozen green beans~🫛|Frozen spinach~🥬|Frozen artichoke|Frozen taro (Colcasia)~🥔|Frozen corn~🌽|Frozen broccoli|Frozen cauliflower|Frozen fava beans~🫛|Frozen stir fry vegetables'],
      ['Frozen fries & potatoes', '🍟', 'French fries|Crinkle fries|Potato wedges~🥔|Hash browns~🥔|Curly fries'],
      ['Frozen meat & poultry', '🍗', 'Chicken nuggets|Chicken strips|Chicken pane frozen|Frozen chicken breasts|Frozen whole chicken~🐔|Frozen beef burger~🍔|Frozen chicken burger~🍔|Frozen kofta|Frozen hot dogs~🌭|Frozen minced beef~🥩|Frozen liver|Frozen shish tawook'],
      ['Frozen seafood', '🦐', 'Frozen shrimp|Frozen fish fillet~🐟|Fish fingers~🐟|Frozen calamari rings~🦑|Frozen salmon~🍣|Frozen seafood mix'],
      ['Frozen pastry & dough', '🥟', 'Sambousek cheese|Sambousek meat|Spring rolls|Puff pastry sheets~🥐|Phyllo (Goulash) dough|Konafa dough|Pizza dough~🍕|Frozen croissants~🥐|Frozen paratha~🫓|Frozen kobeba|Frozen falafel mix'],
      ['Frozen meals & pizza', '🍕', 'Frozen pizza|Frozen lasagna~🍝|Frozen mahshi|Frozen dumplings~🥟|Frozen ready meals~🍱'],
      ['Ice cream & ice', '🍦', 'Ice cream tub|Ice cream cones|Ice cream sticks|Ice cream sandwich|Frozen yogurt|Ice cubes~🧊|Popsicles'],
    ],
  },
  {
    id: 'grains', name: 'Rice, Pasta & Pulses', emoji: '🍚', color: '#F6F0DC',
    subs: [
      ['Rice', '🍚', 'Egyptian rice (short grain)|Basmati rice|Long grain rice|Jasmine rice|Brown rice|Sushi rice|Rice for risotto|Wild rice'],
      ['Pasta & noodles', '🍝', 'Spaghetti|Penne|Macaroni (Elbow)|Fusilli|Rigatoni|Lasagna sheets|Vermicelli (She\'reya)|Lisan asfour (Orzo)|Shell pasta|Tagliatelle|Fettuccine|Whole wheat pasta|Instant noodles~🍜|Egg noodles~🍜|Rice noodles~🍜|Couscous'],
      ['Pulses & grains', '🫘', 'Yellow lentils|Brown lentils|Red lentils|Fava beans (dry, for Ful)|Split fava beans (for Ta\'meya)|White beans (Fasolia)|Red kidney beans|Chickpeas (Hummus)|Black-eyed peas (Lobia)|Freekeh~🌾|Bulgur (Fine)~🌾|Bulgur (Coarse)~🌾|Oats~🥣|Quinoa~🌾|Barley~🌾|Corn grits~🌽|Mung beans|Fenugreek seeds (Helba)'],
      ['Flour & starch', '🌾', 'White flour|Whole wheat flour|Self-raising flour|Semolina (fine)|Semolina (coarse)|Corn starch|Corn flour|Rice flour|Bread crumbs~🍞|Fried bread for fatta~🍞'],
    ],
  },
  {
    id: 'cooking', name: 'Cooking Ingredients', emoji: '🫒', color: '#F1EADF',
    subs: [
      ['Oils', '🫒', 'Sunflower oil~🌻|Corn oil~🌽|Mixed oil~🛢️|Olive oil extra virgin|Olive oil (pomace)|Soybean oil~🛢️|Cottonseed oil~🛢️|Sesame oil|Coconut oil~🥥|Avocado oil~🥑|Frying oil~🛢️|Cooking spray'],
      ['Tomato & paste', '🥫', 'Tomato paste|Tomato sauce|Crushed tomatoes|Peeled tomatoes|Tomato puree|Sun-dried tomatoes~🍅'],
      ['Salt & vinegar', '🧂', 'Table salt|Sea salt|Iodized salt|Coarse salt|Himalayan salt|White vinegar~🍶|Apple cider vinegar~🍎|Balsamic vinegar~🍶|Grape vinegar~🍇|Lemon juice bottle~🍋'],
      ['Spices', '🌶️', 'Cumin|Coriander powder|Black pepper|White pepper|Paprika|Chili powder|Red pepper flakes|Turmeric|Cinnamon|Cinnamon sticks|Cardamom|Cloves|Bay leaves~🍃|Allspice|Nutmeg|Ginger powder|Garlic powder~🧄|Onion powder~🧅|Dried mint~🌿|Oregano~🌿|Thyme~🌿|Rosemary dried~🌿|Basil dried~🌿|Mixed spices|Kofta spices|Shawarma spices|Chicken spices|Fish spices|Seven spices|Curry powder|Sumac|Dukkah|Za\'atar~🌿|Anise seeds|Fennel seeds|Mastic (Mistika)|Saffron|Molokhia dried~🌿|Fried onions (crispy)~🧅'],
      ['Stock & seasoning', '🍲', 'Chicken stock cubes|Beef stock cubes|Vegetable stock cubes|Maggi seasoning|Ready soup packs|Instant soup (Mushroom)|Instant soup (Chicken)|MSG (Seasoning)'],
      ['Sauces & condiments', '🍶', 'Ketchup~🍅|Mayonnaise~🥚|Mustard~🌭|Hot sauce~🌶️|Sweet chili sauce~🌶️|BBQ sauce|Soy sauce|Worcestershire sauce|Ranch dressing~🥗|Caesar dressing~🥗|Thousand island~🥗|Pesto~🌿|Garlic sauce~🧄|Burger sauce~🍔|Pasta sauce~🍝|Pizza sauce~🍕|White sauce mix (Bechamel)|Teriyaki sauce|Sriracha~🌶️|Oyster sauce'],
      ['Tahini & molasses', '🫙', 'Tahini|Sesame seeds|Black molasses (Asal eswed)|Pomegranate molasses|Date molasses (Dibs)|Carob molasses'],
    ],
  },
  {
    id: 'canned', name: 'Canned & Jarred', emoji: '🥫', color: '#F8E6DC',
    subs: [
      ['Canned beans & vegetables', '🥫', 'Ful medames can~🫘|Ful with spices can~🫘|Chickpeas can|White beans in tomato sauce|Baked beans|Red kidney beans can|Sweet corn can~🌽|Mushrooms can~🍄|Peas can~🫛|Peas & carrots can|Green beans can|Mixed vegetables can|Artichoke hearts|Palm hearts|Okra can'],
      ['Canned fish & meat', '🐟', 'Tuna chunks|Tuna solid|Tuna in water|Tuna in oil|Spicy tuna~🌶️|Sardines can|Salmon can~🍣|Mackerel can|Anchovies can|Luncheon meat can|Corned beef'],
      ['Canned fruit', '🍑', 'Fruit cocktail|Peaches can|Pineapple slices~🍍|Mango pulp~🥭|Cherries jar~🍒|Lychee can'],
      ['Other jars', '🫙', 'Coconut milk~🥥|Grape leaves (Wara\' Enab)~🍃|Stuffed vine leaves jar|Roasted peppers jar~🫑|Ready falafel mix'],
    ],
  },
  {
    id: 'baking', name: 'Sugar & Home Baking', emoji: '🧁', color: '#FCEBF0',
    subs: [
      ['Sugar & sweeteners', '🍬', 'White sugar|Brown sugar|Powdered (icing) sugar|Sugar cubes|Stevia sweetener|Diet sweetener|Honey (cooking)~🍯|Glucose syrup|Maple syrup'],
      ['Baking essentials', '🧁', 'Baking powder|Baking soda|Instant yeast|Dry yeast|Vanilla powder|Vanilla extract|Cocoa powder~🍫|Chocolate chips~🍫|Cooking chocolate~🍫|Gelatin|Food coloring|Sprinkles|Rose water|Orange blossom water|Cake molds paper'],
      ['Mixes & desserts', '🍮', 'Cake mix (Vanilla)~🍰|Cake mix (Chocolate)~🍰|Brownie mix|Pancake mix~🥞|Custard powder|Jelly powder|Pudding powder|Mehalabeya mix|Cream caramel mix|Whipped cream powder|Sahlab mix|Basbousa mix|Konafa mix'],
      ['Milk & cream for baking', '🥛', 'Sweetened condensed milk|Evaporated milk|Cream (can)|Coconut flakes~🥥|Ground almonds~🌰|Raisins for baking|Dried coconut~🥥'],
    ],
  },
  {
    id: 'breakfast', name: 'Breakfast & Spreads', emoji: '🥣', color: '#FFF3D6',
    subs: [
      ['Cereals & oats', '🥣', 'Corn flakes|Chocolate cereal|Honey cereal|Muesli|Granola|Oats (rolled)|Instant oats|Kids cereal|Bran flakes|Cereal bars|Granola bars|Protein bars'],
      ['Honey & jam', '🍯', 'Bee honey|Clover honey|Citrus honey|Manuka honey|Strawberry jam~🍓|Apricot jam~🍑|Fig jam|Orange marmalade~🍊|Mixed fruit jam|Diet jam|Black molasses'],
      ['Sweet spreads', '🍫', 'Halawa plain|Halawa with nuts|Halawa with chocolate|Chocolate hazelnut spread|Peanut butter~🥜|Crunchy peanut butter~🥜|Lotus spread~🍪|Pistachio spread|Tahini with molasses'],
      ['Savory breakfast', '🍳', 'Ful mix (ready)~🫘|Ta\'meya mix (falafel powder)|Shakshuka mix|Pancake syrup~🥞|Cheese spread~🧀'],
    ],
  },
  {
    id: 'hotdrinks', name: 'Tea, Coffee & Hot Drinks', emoji: '☕', color: '#EFE6DC',
    subs: [
      ['Tea', '🍵', 'Black tea (loose)|Black tea bags|Green tea|Green tea with mint|Earl grey|Mint tea|Lemon tea~🍋|Fruit tea|Iced tea powder'],
      ['Herbal', '🌿', 'Anise (Yansoon)|Chamomile|Hibiscus (Karkade)~🌺|Mint (Ne\'na\') dried|Fenugreek (Helba)|Cinnamon tea|Ginger tea~🫚|Sage (Maryamiya)|Caraway (Karawya)|Fennel tea|Mixed herbs tea|Moringa'],
      ['Coffee', '☕', 'Turkish coffee plain|Turkish coffee with cardamom|Turkish coffee light roast|Turkish coffee dark roast|Instant coffee|3-in-1 coffee mix|Cappuccino mix|Coffee beans|Ground espresso|Coffee capsules|French coffee|Arabic coffee|Decaf coffee|Iced coffee'],
      ['Hot chocolate & others', '🍫', 'Hot chocolate powder|Sahlab|Malted drink powder|Coffee creamer|Coffee mate|Chocolate drink powder'],
    ],
  },
  {
    id: 'beverages', name: 'Beverages', emoji: '🧃', color: '#FFF0E0',
    subs: [
      ['Water', '💧', 'Water small bottles (330ml)|Water bottles (600ml)|Water 1.5L|Water large (6L/19L)|Sparkling water~🫧|Flavored water|Mineral water carton'],
      ['Soft drinks', '🥤', 'Cola|Diet cola|Orange soda~🍊|Lemon-lime soda~🍋|Apple soda~🍎|Cream soda|Ginger ale|Tonic water|Soda water~🫧|Soft drinks cans pack|Soft drinks 1L|Soft drinks family size'],
      ['Juices', '🧃', 'Orange juice~🍊|Mango juice~🥭|Guava juice|Apple juice~🍎|Mixed fruit juice|Cocktail juice|Pineapple juice~🍍|Strawberry juice~🍓|Grape juice~🍇|Pomegranate juice|Lemon mint juice~🍋|Fresh juice|Juice small boxes (kids)|Juice powder (instant)|Vegetable juice~🥕'],
      ['Malt, energy & sports', '⚡', 'Malt drink (non-alcoholic)~🍺|Flavored malt drink~🍺|Energy drink|Sports drink|Iced tea~🍵|Iced coffee can~☕|Coconut water~🥥|Protein shake'],
      ['Syrups & Ramadan drinks', '🍹', 'Tamarind (Tamr Hindi)|Qamar El Din|Sobia mix|Kharoub (Carob) drink|Hibiscus syrup~🌺|Rose syrup~🌹|Lemon syrup~🍋|Strawberry syrup~🍓|Grenadine'],
    ],
  },
  {
    id: 'snacks', name: 'Snacks & Sweets', emoji: '🍫', color: '#F3E5DA',
    subs: [
      ['Chips & crisps', '🍟', 'Potato chips salted|Potato chips cheese|Potato chips ketchup|Potato chips spicy|Corn chips|Tortilla chips|Nachos|Puffed corn snacks|Pretzels~🥨|Popcorn~🍿|Microwave popcorn~🍿|Rice cakes|Crackers|Cheese crackers'],
      ['Biscuits & cookies', '🍪', 'Plain biscuits|Digestive biscuits|Tea biscuits|Chocolate chip cookies|Sandwich cookies|Butter cookies|Wafers|Chocolate wafers|Date bars|Fig bars|Marie biscuits|Sugar-free biscuits|Oat biscuits|Kids biscuits'],
      ['Cakes & croissants', '🧁', 'Packaged cupcakes|Packaged croissants~🥐|Swiss roll~🍰|Sponge cake~🍰|Cake bars|Mini muffins|Pies'],
      ['Chocolate', '🍫', 'Milk chocolate bar|Dark chocolate|White chocolate|Chocolate with nuts|Chocolate bars (multi-pack)|Chocolate box (gift)~🎁|Chocolate covered biscuits|Chocolate eggs~🥚|Kids chocolate'],
      ['Candy & gum', '🍬', 'Hard candy|Toffee|Gummies|Marshmallows|Lollipops~🍭|Chewing gum|Mints|Turkish delight (Malban)|Cotton candy|Sesame candy (Simsimiya)|Peanut candy (Fouliya)|Coconut candy|Halawa sticks'],
      ['Nuts & seeds', '🥜', 'Peanuts roasted|Peanuts salted|Almonds~🌰|Cashews|Pistachios|Hazelnuts~🌰|Walnuts~🌰|Mixed nuts|Sunflower seeds (Lib Soury)~🌻|Pumpkin seeds (Lib Abyad)~🎃|Watermelon seeds (Lib Asmar)~🍉|Melon seeds|Chickpeas roasted (Hummus Sham)|Coated peanuts|Pecans'],
      ['Dates & dried fruit', '🌴', 'Dates (Agwa)|Dates (Siwi)|Dates (Medjool)|Dates paste (Agwa block)|Stuffed dates|Dried figs|Dried apricots~🍑|Raisins~🍇|Golden raisins~🍇|Prunes|Dried cranberries|Dried mango~🥭|Qamar El Din sheets|Mixed dried fruit (Khoshaf)'],
    ],
  },
  {
    id: 'baby', name: 'Baby Care', emoji: '🍼', color: '#FCE8F0',
    subs: [
      ['Diapers & wipes', '👶', 'Diapers size 1 (Newborn)|Diapers size 2|Diapers size 3|Diapers size 4|Diapers size 5|Diapers size 6|Pull-up pants|Baby wipes~🧻|Sensitive baby wipes~🧻|Changing mats'],
      ['Baby food', '🍼', 'Infant formula stage 1|Infant formula stage 2|Growing up milk stage 3|Baby cereal (Cerelac)~🥣|Baby food jars~🥣|Fruit puree pouches~🍎|Baby biscuits~🍪|Baby rusks|Baby water~💧|Baby juice~🧃'],
      ['Baby bath & skin', '🧴', 'Baby shampoo|Baby soap~🧼|Baby lotion|Baby oil|Baby powder|Diaper rash cream|Baby cologne|Baby cotton buds|Baby wash & bath'],
      ['Feeding & accessories', '🍼', 'Feeding bottles|Bottle nipples (teats)|Pacifiers|Teethers|Sippy cups|Bibs|Baby spoons~🥄|Bottle brush|Breast pads|Sterilizer tablets'],
    ],
  },
  {
    id: 'personal', name: 'Personal Care', emoji: '🧴', color: '#F3E7F6',
    subs: [
      ['Hair care', '💇', 'Shampoo|Anti-dandruff shampoo|Conditioner|Hair mask|Hair oil|Leave-in cream|Hair gel|Hair spray|Hair wax|Hair dye|Hair serum|Hair bands & clips|Hair brush & comb'],
      ['Oral care', '🪥', 'Toothpaste|Whitening toothpaste|Kids toothpaste|Toothbrush|Electric toothbrush heads|Mouthwash|Dental floss|Denture tablets|Miswak'],
      ['Bath & body', '🛁', 'Soap bars~🧼|Liquid hand wash~🧼|Shower gel|Body scrub|Loofah|Bath salts|Body lotion|Body oil|Hand sanitizer|Talc powder'],
      ['Deodorants & fragrance', '🌸', 'Deodorant spray (men)|Deodorant spray (women)|Roll-on deodorant|Deodorant stick|Body mist|Cologne|Perfume'],
      ['Shaving & hair removal', '🪒', 'Disposable razors|Razor blades|Shaving foam|Shaving gel|After shave|Hair removal cream|Wax strips|Sugaring (Halawa) wax|Trimmer'],
      ['Skin & face care', '🧴', 'Face wash|Micellar water|Face cream|Moisturizer|Sunscreen~☀️|Night cream|Face masks|Lip balm~💋|Vaseline|Hand cream~🤲|Foot cream~🦶|Makeup remover wipes|Cotton pads~☁️|Cotton buds'],
      ['Feminine care', '🌸', 'Sanitary pads (day)|Sanitary pads (night)|Panty liners|Tampons|Intimate wash'],
      ['Men\'s grooming', '🧔', 'Beard oil|Beard balm|Men\'s face wash|Hair clippers oil'],
    ],
  },
  {
    id: 'health', name: 'Health & First Aid', emoji: '🩹', color: '#E8F1EC',
    subs: [
      ['First aid', '🩹', 'Band-aids (plasters)|Gauze|Medical tape|Bandage roll|Antiseptic (Betadine)|Medical alcohol|Hydrogen peroxide|Cotton roll|Burn cream|Thermometer~🌡️|Face masks (medical)~😷|Disposable gloves~🧤'],
      ['Wellness', '💊', 'Vitamin C|Multivitamins|Vitamin D|Omega 3 capsules|Effervescent tablets|Throat lozenges|Saline nasal spray|Eye drops|Muscle rub|Heat patches|Pain relief gel'],
    ],
  },
  {
    id: 'cleaning', name: 'Cleaning & Laundry', emoji: '🧽', color: '#E4F6F0',
    subs: [
      ['Laundry', '🧺', 'Laundry powder (automatic)|Laundry powder (hand wash)|Liquid detergent|Detergent for colors|Detergent for blacks|Detergent for baby clothes|Fabric softener|Laundry capsules|Stain remover|Bleach (Clorox)~🧪|Color-safe bleach|Laundry starch|Laundry bar soap~🧼|Ironing spray|Laundry net bags|Clothes pegs'],
      ['Dishwashing', '🍽️', 'Dish soap|Dish soap lemon~🍋|Dishwasher tablets|Dishwasher powder|Dishwasher salt|Rinse aid|Dishwasher cleaner'],
      ['Household cleaners', '🧴', 'Floor cleaner|Multi-purpose cleaner|Kitchen degreaser|Bathroom cleaner|Toilet cleaner|Toilet blocks|Glass cleaner~🪟|Disinfectant (Dettol)|Oven cleaner|Drain cleaner|Furniture polish|Carpet shampoo|Limescale remover|Stainless steel cleaner|Marble cleaner|Chlorine tablets'],
      ['Pest control & air', '🦟', 'Insect spray (flying)|Cockroach spray|Ant powder|Mosquito plug-in|Mosquito coils|Mosquito liquid refill|Rat poison & traps|Moth balls|Air freshener spray~🌸|Air freshener plug-in~🌸|Car air freshener~🚗|Bakhoor (incense)|Scented candles~🕯️'],
      ['Cleaning tools', '🧹', 'Sponges~🧽|Scouring pads|Steel wool (Silk)|Microfiber cloths|Kitchen cloths|Floor cloth (Fouta)|Mop|Mop refill|Broom|Dustpan|Bucket~🪣|Squeegee|Toilet brush|Rubber gloves~🧤|Spray bottle|Window wiper'],
    ],
  },
  {
    id: 'household', name: 'Household & Paper', emoji: '🧻', color: '#EEEEF3',
    subs: [
      ['Paper products', '🧻', 'Toilet paper|Kitchen paper towels|Facial tissues~🤧|Pocket tissues~🤧|Napkins|Wet wipes|Toilet seat covers'],
      ['Food wrap & storage', '🛍️', 'Aluminum foil|Cling wrap (plastic wrap)|Baking paper|Food bags|Freezer bags|Zipper bags|Sandwich bags|Food containers~🍱|Aluminum trays|Ice cube bags~🧊|Garbage bags small~🗑️|Garbage bags large~🗑️|Drawstring garbage bags~🗑️'],
      ['Disposables', '🥤', 'Plastic cups|Paper cups|Plastic plates|Paper plates|Plastic cutlery|Straws|Toothpicks|Party supplies~🎉|Table cover'],
      ['Batteries & electrics', '🔋', 'AA batteries|AAA batteries|9V battery|Button batteries|Light bulbs (LED)~💡|Extension cord~🔌|Phone charger~🔌|Charging cable~🔌|Flashlight~🔦|Adapter plug~🔌'],
      ['Home essentials', '🏠', 'Matches|Lighter|Candles~🕯️|Charcoal (BBQ)|Charcoal (Shisha)|Shisha tobacco|Super glue|Tape|Sewing kit~🧵|Hangers|Shoe polish~👞|Umbrella~☂️|Key rings'],
    ],
  },
  {
    id: 'kitchen', name: 'Kitchen & Dining', emoji: '🍳', color: '#F4ECE4',
    subs: [
      ['Cookware', '🍳', 'Frying pan|Cooking pot|Pressure cooker|Baking tray|Cake mold|Grill pan|Tea kettle (Barrad)~🫖|Turkish coffee pot (Kanaka)~☕'],
      ['Utensils', '🥄', 'Kitchen knives~🔪|Cutting board|Spatula|Ladle|Whisk|Peeler|Grater|Can opener|Strainer|Measuring cups|Kitchen scissors|Rolling pin|Mahshi corer'],
      ['Tableware', '🍽️', 'Plates|Bowls|Glasses|Mugs~☕|Tea cups|Cutlery set|Serving trays|Thermos|Water jug|Lunch box~🍱|Water bottle~💧'],
    ],
  },
  {
    id: 'pets', name: 'Pet Supplies', emoji: '🐾', color: '#EFEDE4',
    subs: [
      ['Cats', '🐱', 'Dry cat food|Wet cat food|Kitten food|Cat treats|Cat litter|Litter box|Cat toys'],
      ['Dogs', '🐶', 'Dry dog food|Wet dog food|Puppy food|Dog treats~🦴|Dog chews~🦴|Dog shampoo|Leash'],
      ['Birds & fish', '🐦', 'Bird seeds|Fish food~🐠|Bird cage accessories'],
    ],
  },
  {
    id: 'stationery', name: 'Stationery & School', emoji: '✏️', color: '#EAF0F8',
    subs: [
      ['Writing', '✏️', 'Pens (blue)~🖊️|Pens (black)~🖊️|Pencils|Erasers|Sharpener|Markers~🖍️|Highlighters~🖍️|Colored pencils~🖍️|Crayons~🖍️'],
      ['Paper & school', '📒', 'Notebooks|Copybooks (Korasat)|A4 paper|Sticky notes|Envelopes~✉️|Glue stick|Scissors~✂️|Ruler~📏|Book covers|School bag~🎒|Pencil case'],
    ],
  },
];

export const CATEGORIES: Category[] = DEPTS.map(({ subs, ...c }) => c);

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

export const BUILTIN_PRODUCTS: Product[] = (() => {
  const seen = new Set<string>();
  const out: Product[] = [];
  for (const d of DEPTS) {
    for (const [sub, subEmoji, items] of d.subs) {
      for (const raw of items.split('|')) {
        const [name, emoji] = raw.split('~');
        let id = `${d.id}:${slug(name)}`;
        if (seen.has(id)) id = `${id}-${slug(sub)}`;
        seen.add(id);
        out.push({ id, name: name.trim(), emoji: emoji || subEmoji, categoryId: d.id, sub });
      }
    }
  }
  return out;
})();

export const subsOf = (categoryId: string) => DEPTS.find((d) => d.id === categoryId)?.subs.map((s) => s[0]) ?? [];

export const categoryById = (id: string) => CATEGORIES.find((c) => c.id === id);
