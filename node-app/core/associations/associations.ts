// associations.ts
import { User } from '../../features/authentification/data/data_sources/postgres/models/user.model.ts';
import { Category } from '../../features/gallery_administration/data/models/category.model.js';
import { Image } from '../../features/gallery_administration/data/models/image.model.js';

User.hasMany(Category, {
  foreignKey: 'userId',
  as: 'categories'
});
Category.belongsTo(User, {
  foreignKey: 'userId'
});

Category.hasMany(Image, {
  foreignKey: 'categoryId',
  as: 'images'
});
Image.belongsTo(Category, {
  foreignKey: 'categoryId'
});
