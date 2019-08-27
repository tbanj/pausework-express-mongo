module.exports = {
  mongodb_url: process.env.MONGODB_URL,
  jwt_secret: process.env.JWT_SECRET,
  port: process.env.PORT || 6004,
  admin_key: process.env.ADMIN_KEY,
};
