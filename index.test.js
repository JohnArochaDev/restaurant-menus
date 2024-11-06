const {sequelize} = require('./db')
const {Restaurant, Menu, Item} = require('./models/index')
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

    test('can create an Item', async () => {
        const item = await Item.create({name: 'Test Name', image: 'Test Image', price: 1, vegetarian: false})
        expect(item.name).toEqual('Test Name')
        expect(item.image).toEqual('Test Image')
        expect(item.price).toEqual(1)
        expect(item.vegetarian).toEqual(false)
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

    test('can find Items', async () => {
        let foundItems = await Item.findAll();

        expect(foundItems.length).toBeGreaterThan(0);
        expect(foundItems[0].name).toEqual('Test Name');
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

    test('can delete Menus', async () => {
        await Menu.destroy({
            where: {
                title: 'Test Item'
            }
        });

        const foundMenus = await Menu.findAll();
        expect(foundMenus.length).toEqual(0);
    });

    test('can delete Items', async () => {
        await Item.destroy({
            where: {
                name: 'Test Name'
            }
        });

        const foundItems = await Item.findAll();
        expect(foundItems.length).toEqual(0);
    });
})

describe('Testing Association', () => {

    test('Restaurant has many Menus', async () => {
        const restaurant = await Restaurant.create({ name: 'Test Restaurant', location: 'Test Location', cuisine: 'Test Cuisine' });
        const menu1 = await Menu.create({ title: 'Test Menu 1', RestaurantId: restaurant.id });
        const menu2 = await Menu.create({ title: 'Test Menu 2', RestaurantId: restaurant.id });

        const menus = await restaurant.getMenus();
        expect(menus.length).toEqual(2);
        expect(menus[0].title).toEqual('Test Menu 1');
        expect(menus[1].title).toEqual('Test Menu 2');
    });

    test('Menu belongs to a Restaurant', async () => {
        const restaurant = await Restaurant.create({ name: 'Test Restaurant', location: 'Test Location', cuisine: 'Test Cuisine' });
        const menu = await Menu.create({ title: 'Test Menu', RestaurantId: restaurant.id });

        const menuRestaurant = await menu.getRestaurant();
        expect(menuRestaurant.name).toEqual('Test Restaurant');
        expect(menuRestaurant.location).toEqual('Test Location');
        expect(menuRestaurant.cuisine).toEqual('Test Cuisine');
    });

    test('Menu has many Items', async () => {
        const menu = await Menu.create({ title: 'Test Title' });
        const item1 = await Item.create({name: 'Test Name 1', image: 'Test Image 1', price: 1, vegetarian: false, MenuId: menu.id});
        const item2 = await Item.create({name: 'Test Name 2', image: 'Test Image 2', price: 2, vegetarian: false, MenuId: menu.id});

        const items = await menu.getItems();
        expect(items.length).toEqual(2);
        expect(items[0].name).toEqual('Test Name 1');
        expect(items[1].image).toEqual('Test Image 2');
        expect(items[0].price).toEqual(1);
        expect(items[1].vegetarian).toEqual(false);
    });
})

describe('Eager loading test', () => {
    test('Eager loads Restaurant with its Menus', async () => {
        const restaurant = await Restaurant.create({ name: 'Test Restaurant', location: 'Test Location', cuisine: 'Test Cuisine' });
        const menu1 = await Menu.create({ title: 'Test Menu 1', RestaurantId: restaurant.id });
        const menu2 = await Menu.create({ title: 'Test Menu 2', RestaurantId: restaurant.id });
    
        const restaurantWithMenus = await Restaurant.findOne({
            where: { id: restaurant.id },
            include: [Menu]
        });

        expect(restaurantWithMenus.Menus.length).toEqual(2);
        expect(restaurantWithMenus.Menus[0].title).toEqual('Test Menu 1');
        expect(restaurantWithMenus.Menus[1].title).toEqual('Test Menu 2');
    });
});

