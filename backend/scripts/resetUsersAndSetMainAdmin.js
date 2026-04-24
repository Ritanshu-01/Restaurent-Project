require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function run() {
  await mongoose.connect(process.env.MONGO_URI);

  const deleted = await User.deleteMany({});
  const mainAdminEmail = (process.env.MAIN_ADMIN_EMAIL || process.env.ADMIN_EMAIL || '').toLowerCase().trim();
  const mainAdminPassword = process.env.MAIN_ADMIN_PASSWORD || process.env.ADMIN_PASSWORD;
  const mainAdminName = process.env.ADMIN_NAME || 'Main Admin';

  let createdAdmin = null;
  if (mainAdminEmail && mainAdminPassword) {
    const passwordHash = await bcrypt.hash(mainAdminPassword, 10);
    createdAdmin = await User.create({
      name: mainAdminName,
      email: mainAdminEmail,
      password: passwordHash,
      isAdmin: true
    });
  }

  console.log(
    JSON.stringify(
      {
        deletedUsers: deleted.deletedCount,
        createdMainAdmin: createdAdmin ? createdAdmin.email : null
      },
      null,
      2
    )
  );
}

run()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    try {
      await mongoose.connection.close();
    } catch (_e) {}
  });
