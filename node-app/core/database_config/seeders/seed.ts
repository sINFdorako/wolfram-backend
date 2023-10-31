/** @type {import('sequelize-cli').Migration} */
export async function seedTestUp(queryInterface: any, Sequelize: any) {
  // 1. Seed the users table
  const users = await queryInterface.bulkInsert('users', [{
    email: 'demo@user.com',
    password: 'demoPassword',  // NOTE: Always hash passwords before seeding. This is a placeholder.
    role: 'user',  // assuming 'USER' is one of the values in UserRole
    company: 'Demo Company',
    position: 'Developer',
    prename: 'Demo',
    surname: 'User',
    createdAt: new Date(),
    updatedAt: new Date()
  }], { returning: true });

  const demoUserId = users[0].id;

  // 2. Seed the categories table
  const categories = await queryInterface.bulkInsert('categories', [
    {
      creationDate: new Date(),
      lastModifiedDate: new Date(),
      userId: demoUserId,
      name: 'Category 1',
      description: 'This is category 1'
    },
    {
      creationDate: new Date(),
      lastModifiedDate: new Date(),
      userId: demoUserId,
      name: 'Category 2',
      description: 'This is category 2'
    }
  ], { returning: true });

  // 3. Seed the images table
  await queryInterface.bulkInsert('images', [
    {
      uploadDate: new Date(),
      lastModifiedDate: new Date(),
      userId: demoUserId,
      categoryId: categories[0].id,
      url: 'http://example.com/image1.jpg',
      filename: 'image1.jpg',
      originalFilename: 'original_image1.jpg',
      fileSize: 1024,
      mimeType: 'image/jpeg'
    },
    {
      uploadDate: new Date(),
      lastModifiedDate: new Date(),
      userId: demoUserId,
      categoryId: categories[1].id,
      url: 'http://example.com/image2.jpg',
      filename: 'image2.jpg',
      originalFilename: 'original_image2.jpg',
      fileSize: 2048,
      mimeType: 'image/jpeg'
    }
  ]);

  // 4. Seed the fotodesk_settings table
  await queryInterface.bulkInsert('fotodesk_settings', [{
    updatedAt: new Date(),
    createdAt: new Date(),
    packages: ['package1', 'package2'],
    appSizeInGB: 5,
    userId: demoUserId,
    trialInMonths: 1,
    pricePerMonth: 9.99
  }]);
}

export async function seedTestDown(queryInterface: any, Sequelize: any) {
  await queryInterface.bulkDelete('fotodesk_settings', null, {});
  await queryInterface.bulkDelete('images', null, {});
  await queryInterface.bulkDelete('categories', null, {});
  await queryInterface.bulkDelete('users', null, {});
}
