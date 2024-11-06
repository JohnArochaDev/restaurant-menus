const {sequelize} = require('./db')
const {Restaurant, Menu} = require('./models/index')
const {
    seedRestaurant,
    seedMenu,
  } = require('./seedData');

describe('Restaurant and Menu Models', () => {
    /**
     * Runs the code prior to all tests
     */
    beforeAll(async () => {
        // the 'sync' method will create tables based on the model class
        // by setting 'force:true' the tables are recreated each time the 
        // test suite is run
        await sequelize.sync({ force: true });
    });

    test('can create a Restaurant', async () => {
        const restaurant = await Restaurant.create({ name: 'Test Restaurant', location: 'Test Location', cuisine: 'Test Cuisine' });
        expect(restaurant.name).toEqual('Test Restaurant');
        expect(restaurant.location).toEqual('Test Location');
        expect(restaurant.cuisine).toEqual('Test Cuisine');
    });

    test('can create a Menu', async () => {
        const menu = await Menu.create({title: 'Test Item'})
        expect(menu.title).toEqual('Test Item')
    });

    test('can find Restaurants', async () => {
        let foundRestaurants = await Restaurant.findAll();

        expect(foundRestaurants.length).toBeGreaterThan(0);
        expect(foundRestaurants[0].name).toEqual('Test Restaurant');
        expect(foundRestaurants[0].location).toEqual('Test Location');
        expect(foundRestaurants[0].cuisine).toEqual('Test Cuisine');
    });

    test('can find Menus', async () => {
        let foundMenus = await Menu.findAll();

        expect(foundMenus.length).toBeGreaterThan(0);
        expect(foundMenus[0].title).toEqual('Test Item');
    });

    test('can delete Restaurants', async () => {
        await Restaurant.destroy({
            where: {
                name: 'Test Restaurant'
            }
        });

        const foundRestaurants = await Restaurant.findAll();
        expect(foundRestaurants.length).toEqual(0);
    });
})