"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const { DataTypes } = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require("./user")(sequelize, DataTypes);
db.Address = require("./address")(sequelize, DataTypes);
db.Brand = require("./brand")(sequelize, DataTypes);
db.Cart = require("./cart")(sequelize, DataTypes);
db.CartItem = require("./cartitem")(sequelize, DataTypes);
db.Category = require("./category")(sequelize, DataTypes);
db.Color = require("./color")(sequelize, DataTypes);
db.DiscountCode = require("./discountcode")(sequelize, DataTypes);
db.Group = require("./group")(sequelize, DataTypes);
db.Order = require("./order")(sequelize, DataTypes);
db.OrderItem = require("./orderitem")(sequelize, DataTypes);
db.Product = require("./product")(sequelize, DataTypes);
db.ProductImage = require("./productimage")(sequelize, DataTypes);
db.ProductItem = require("./productitem")(sequelize, DataTypes);
db.ProductSpecification = require("./productspecification")(
  sequelize,
  DataTypes
);
db.ProductVariation = require("./productvariation")(sequelize, DataTypes);
db.Review = require("./review")(sequelize, DataTypes);
db.ShippingType = require("./shippingtype")(sequelize, DataTypes);
db.SizeCategory = require("./sizecategory")(sequelize, DataTypes);
db.SizeOption = require("./sizeoption")(sequelize, DataTypes);
db.SpecificationOption = require("./specificationoption")(sequelize, DataTypes);
db.SubCategory = require("./subcategory")(sequelize, DataTypes);

//Category associations
db.Group.hasMany(db.Category, {
  foreignKey: "uGroupId",
  onDelete: "cascade",
});
db.SizeCategory.hasMany(db.Category, {
  foreignKey: "uSizeCategoryId",
  onDelete: "cascade",
});

db.Category.belongsTo(db.Group, {
  foreignKey: "uGroupId",
});
db.Category.belongsTo(db.SizeCategory, {
  foreignKey: "uSizeCategoryId",
});

//SubCategory Associations
db.Category.hasMany(db.SubCategory, {
  foreignKey: "uCategoryId",
  onDelete: "cascade",
});
db.SubCategory.belongsTo(db.Category, {
  foreignKey: "uCategoryId",
});

//Product Associations
db.Brand.hasMany(db.Product, {
  foreignKey: "uBrandId",
  onDelete: "cascade",
});
db.SubCategory.hasMany(db.Product, {
  foreignKey: "uSubCategoryId",
  onDelete: "cascade",
});
db.Product.belongsTo(db.Brand, {
  foreignKey: "uBrandId",
});
db.Product.belongsTo(db.SubCategory, {
  foreignKey: "uSubCategoryId",
});

//ProductItem Associations
db.Product.hasMany(db.ProductItem, {
  foreignKey: "uProductId",
  onDelete: "cascade",
});
db.Color.hasMany(db.ProductItem, {
  foreignKey: "uColorId",
  onDelete: "cascade",
});

db.ProductItem.belongsTo(db.Product, {
  foreignKey: "uProductId",
});
db.ProductItem.hasMany(db.Color, {
  foreignKey: "uColorId",
});

//SizeOption Associaitons
db.SizeCategory.hasMany(db.SizeOption, {
  foreignKey: "uSizeCategoryId",
  onDelete: "Cascade",
});
db.SizeOption.belongsTo(db.SizeCategory, {
  foreignKey: "uSizeCategoryId",
});

//ProductVariation Associations
db.ProductItem.hasMany(db.ProductVariation, {
  foreignKey: "uProductItemId",
  onDelete: "cascade",
});
db.SizeOption.hasMany(db.ProductVariation, {
  foreignKey: "uSizeOptionId",
  onDelete: "cascade",
});
db.ProductVariation.belongsTo(db.ProductItem, {
  foreignKey: "uProductItemId",
});
db.ProductVariation.belongsTo(db.SizeOption, {
  foreignKey: "uSizeOptionId",
});

//ProductImage Associations
db.ProductItem.hasMany(db.ProductImage, {
  foreignKey: "uProductItemId",
  onDelete: "cascade",
});
db.ProductImage.belongsTo(db.ProductItem, {
  foreignKey: "uProductItemId",
});

//ProductSpecification Associations
db.Product.hasMany(db.ProductSpecification, {
  foreignKey: "uProductId",
  onDelete: "cascade",
});
db.SpecificationOption.hasMany(db.ProductSpecification, {
  foreignKey: "uSpecificationOptionId",
  onDelete: "cascade",
});
db.ProductSpecification.belongsTo(db.Product, {
  foreignKey: "uProductId",
});
db.ProductSpecification.belongsTo(db.SpecificationOption, {
  foreignKey: "uSpecificationOptionId",
});

//Cart Associations
db.User.hasOne(db.Cart, {
  foreignKey: "uUserId",
  onDelete: "cascade",
});
db.ShippingType.hasMany(db.Cart, {
  foreignKey: "uShippingTypeId",
  onDelete: "cascade",
});
db.DiscountCode.hasMany(db.Cart, {
  foreignKey: "uDiscountCodeId",
});
db.Cart.belongsTo(db.ShippingType, {
  foreignKey: "uShippingTypeId",
});
db.Cart.belongsTo(db.User, {
  foreignKey: "uUserId",
});

//CartItem Associations
db.Cart.hasMany(db.CartItem, {
  foreignKey: "uCartId",
  onDelete: "cascade",
});
db.ProductItem.hasMany(db.CartItem, {
  foreignKey: "uProductItemId",
  onDelete: "cascade",
});
db.CartItem.belongsTo(db.Cart, {
  foreignKey: "uCartId",
});
db.CartItem.belongsTo(db.ProductItem, {
  foreignKey: "uProductItemId",
});

//Address Associations
db.User.hasMany(db.Address, {
  foreignKey: "uUserId",
  onDelete: "cascade",
});
db.Address.belongsTo(db.User, {
  foreignKey: "uUserId",
});

//Order Associations
db.User.hasMany(db.Order, {
  foreignKey: "uUserId",
});
db.DiscountCode.hasMany(db.Order, {
  foreignKey: "uDiscountCodeId",
});
db.ShippingType.hasMany(db.Order, {
  foreignKey: "uShippingTypeId",
});
db.Address.hasMany(db.Order, {
  foreignKey: "uShippingAddressId",
  as: "ShippingAddress",
});
db.Address.hasMany(db.Order, {
  foreignKey: "uBillingAddressId",
  as: "BillingAddress",
});
db.Order.belongsTo(db.User, {
  foreignKey: "uUserId",
});
db.Order.belongsTo(db.ShippingType, {
  foreignKey: "uShippingTypeId",
});
db.Order.belongsTo(db.Address, {
  
  foreignKey: "uShippingAddressId",
});
db.Order.belongsTo(db.Address, {
  foreignKey: "uBillingAddressId",
});

//OrderItem Associations
db.Order.hasMany(db.OrderItem, {
  foreignKey: "uOrderId",
  onDelete: "cascade",
});
db.ProductItem.hasMany(db.OrderItem, {
  foreignKey: "uProductItemId",
});
db.OrderItem.belongsTo(db.Order, {
  foreignKey: "uOrderId",
});
db.OrderItem.belongsTo(db.ProductItem, {
  foreignKey: "uProductItemId",
});

//Review Associations
db.User.hasMany(db.Review, {
  foreignKey: "uUserId",
});
db.ProductItem.hasMany(db.Review, {
  foreignKey: "uProductItemId",
});
db.Review.belongsTo(db.User, {
  foreignKey: "uUserId",
});
db.Review.belongsTo(db.ProductItem, {
  foreignKey: "uProductItemId",
});

module.exports = db;
