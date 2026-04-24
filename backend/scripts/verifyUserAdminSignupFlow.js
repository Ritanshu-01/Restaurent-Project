require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);
  const before = await User.countDocuments();

  const password = await bcrypt.hash('Temp123!', 10);
  const createdUser = await User.create({
    name: 'Temp User',
    email: 'temp_user_check@example.com',
    password,
    isAdmin: false
  });
  const createdAdmin = await User.create({
    name: 'Temp Admin',
    email: 'temp_admin_check@example.com',
    password,
    isAdmin: true
  });

  await User.deleteMany({
    email: {
      $in: ['temp_user_check@example.com', 'temp_admin_check@example.com']
    }
  });

  const after = await User.countDocuments();
  console.log(
    JSON.stringify(
      {
        before,
        created: [createdUser.email, createdAdmin.email],
        after
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
