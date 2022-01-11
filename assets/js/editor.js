import { FontLoader } from './tools';

const fonts = new FontLoader([
    { name: 'Scene', weight: 700 },
    { name: 'Scene', weight: 600 },
    { name: 'Scene', weight: 400 },
    { name: 'Scene', weight: 300 }
]);

fonts.load();