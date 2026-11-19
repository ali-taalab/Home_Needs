# Home Needs 🛒

A shopping list app for Android and iPhone that you browse like a supermarket app. You pick items from supermarket categories, and instead of placing a delivery order the app gives you a **checklist** to take to the supermarket.

## Features
- **Shop**: 17 supermarket categories (Fruits & Vegetables, Dairy, Bakery, Meat, Cleaning, Personal Care, Baby, Pets…) with ~150 common items, plus search.
- **Add your own items** in any category. Long-press an item you added to delete it.
- **Basket**: change quantities with − / +, then tap **Create checklist**.
- **Checklists**: items are grouped in aisle order. Tick them off as you shop and a progress bar shows how many you have.
- **Share / Export**: sends the list as text with ☐ / ☑ boxes to WhatsApp, Notes, SMS, email and so on.
- **More…**: uncheck all, put the unchecked items back into the basket, or delete the list.
- Everything is saved on the phone and works offline.

## Run it on your phone
1. Install [Node.js](https://nodejs.org) (LTS).
2. Install **Expo Go** from the Play Store or the App Store.
3. In this folder run:
   ```bash
   npm install
   npx expo start
   ```
4. Scan the QR code with Expo Go (Android) or the Camera app (iPhone).

## Build installable apps
```bash
npx eas-cli@latest build -p android   # APK/AAB
npx eas-cli@latest build -p ios       # needs an Apple Developer account
```

## Customize
The categories and items are in `src/catalog.ts`. Edit that file to match your local supermarket.
