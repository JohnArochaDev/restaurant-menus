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
        // TODO - write test
        expect('NO TEST').toEqual('EXPECTED DATA')
    });

    test('can find Menus', async () => {
        // TODO - write test
        expect('NO TEST').toEqual('EXPECTED DATA')
    });

    test('can delete Restaurants', async () => {
        // TODO - write test
        expect('NO TEST').toEqual('EXPECTED DATA')
    });
})