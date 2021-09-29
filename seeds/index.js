const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect(
    'mongodb://localhost:27017/yelp-camp',
    async(err)=>{
        if(err) throw err;
        console.log("conncted to db")
    }
)

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '5f5c330c2cd79d538f2c66d9',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`, 
            price: price,
            image: 'https://source.unsplash.com/collection/483251',
            description:"helloooo whatts uppp"
        })
        await camp.save();
    }
}

seedDB();
// seedDB().then(() => {
//     mongoose.connection.close();
// })