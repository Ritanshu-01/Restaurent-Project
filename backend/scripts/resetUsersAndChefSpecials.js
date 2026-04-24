require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/User');
const FoodItem = require('../models/FoodItem');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  const userResult = await User.deleteMany({});

  const specials = [
    {
      name: 'Morning Fresh',
      price: 249,
      image:
        'https://images.unsplash.com/photo-1669277038743-066083326c32?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
      ratingAverage: 4.2
    },
    {
      name: 'Lunch Special',
      price: 349,
      image:
        'https://images.unsplash.com/photo-1651707515427-eda0666ce222?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
      ratingAverage: 4.8
    },
    {
      name: 'Dinner Delight',
      price: 429,
      image:
        'https://images.unsplash.com/photo-1639280150666-4f01f0e02f7b?ixlib=rb-4.0.3&auto=format&fit=crop&w=870&q=80',
      ratingAverage: 4.6
    }
  ];

  for (const special of specials) {
    await FoodItem.updateOne(
      { name: new RegExp(`^${special.name}$`, 'i') },
      {
        $set: {
          name: special.name,
          price: special.price,
          image: special.image,
          description: 'Chef curated premium signature dish.',
          category: 'Main Course',
          featured: true,
          available: true,
          ratingAverage: special.ratingAverage,
          discountPercent: 0
        }
      },
      { upsert: true }
    );
  }

  const adjustResult = await FoodItem.updateMany(
    { featured: true, price: { $lte: 100 } },
    { $set: { price: 149 } }
  );
  const featuredCount = await FoodItem.countDocuments({ featured: true });

  console.log(
    JSON.stringify(
      {
        deletedUsers: userResult.deletedCount,
        adjustedFeatured: adjustResult.modifiedCount,
        featuredCount
      },
      null,
      2
    )
  );
}

run()
  .catch((err) => {
    console.error(err);
    process.exitCode = 1;
  })
  .finally(async () => {
    try {
      await mongoose.connection.close();
    } catch (_e) {}
  });
