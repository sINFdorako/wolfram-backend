import { User } from '../../features/authentification/data/data_sources/postgres/models/user.model';
import { Category } from '../../features/gallery_administration/data/models/category.model';
import { ImageModel } from '../../features/gallery_administration/data/models/image.model';
import { LandingpageModel } from '../../features/landingpage/data/models/landingpage.model';

export const setupAssociations = () => {
    User.hasMany(Category, {
      foreignKey: 'userId',
      as: 'categories'
    });
    Category.belongsTo(User, {
      foreignKey: 'userId'
    });

    Category.hasMany(ImageModel, {
      foreignKey: 'categoryId',
      as: 'images'
    });

    ImageModel.belongsTo(Category, {
      foreignKey: 'categoryId'
    });

    LandingpageModel.hasMany(ImageModel, {
      foreignKey: 'landingpageId',
      as: 'images'
    });

    ImageModel.belongsTo(LandingpageModel, {
      foreignKey: 'landingpageId'
    });
}
