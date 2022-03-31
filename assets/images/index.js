// Requires all images in current folder
const regexPattern = /\.(png|jpe?g|gif|svg|webp)$/i;
const requireAllImages = require.context('./', true, regexPattern);
requireAllImages.keys().forEach(requireAllImages);
