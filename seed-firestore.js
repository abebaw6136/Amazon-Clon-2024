const admin = require('firebase-admin');
const axios = require('axios');

// Firebase config from client - for service account, use download from console
const serviceAccount = require('./serviceAccountKey.json'); // Download from Firebase Console > Project Settings > Service Accounts

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  projectId: 'clone-2024',
});

const db = admin.firestore();

async function seedProducts() {
  try {
    console.log('Fetching products from FakeStore API...');
    const response = await axios.get('https://fakestoreapi.com/products');
    const products = response.data.map(product => ({
      id: product.id,
      title: product.title,
      description: product.description,
      category: product.category,
      image: product.image,
      price: product.price,
      rating: product.rating,
    }));

    console.log(`Seeding ${products.length} products to Firestore...`);

    // Batch write to avoid rate limits
    const batch = db.batch();
    products.forEach(product => {
      const docRef = db.collection('products').doc(product.id.toString());
      batch.set(docRef, product);
    });

    await batch.commit();
    console.log('✅ Products seeded successfully!');
  } catch (error) {
    console.error('❌ Seed failed:', error);
  }
}

seedProducts();

