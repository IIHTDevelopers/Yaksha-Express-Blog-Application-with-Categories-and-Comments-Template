// tests/category.test.js

const Category = require('../../models/category');  // Import the Category model

beforeEach(() => {
    // Reset the in-memory categories before each test
    Category.categories = [];
    Category.currentId = 1;
});

let categoryBoundaryTest = `Category boundary test`;

describe('Category', () => {
    describe('boundary', () => {
        // Test 1: Check if the create method works
        it(`${categoryBoundaryTest} should create a new category`, () => {
            const categoryName = 'Technology';

            // Call the create method
            const newCategory = Category.create(categoryName);

            // Verify that the new category was created correctly
            expect(newCategory).toHaveProperty('id');
            expect(newCategory.name).toBe(categoryName);  // Check the category name
            expect(Category.categories.length).toBe(1);  // There should be 1 category in the array
        });

        // Test 2: Check if the getAll method works
        it(`${categoryBoundaryTest} should return all categories`, () => {
            Category.create('Technology');
            Category.create('Lifestyle');

            const allCategories = Category.getAll();

            expect(allCategories.length).toBe(2);  // There should be 2 categories
            expect(allCategories[0].name).toBe('Technology');
            expect(allCategories[1].name).toBe('Lifestyle');
        });

        // Test 3: Check if the getById method works
        it(`${categoryBoundaryTest} should return a category by ID`, () => {
            const category1 = Category.create('Technology');
            const category2 = Category.create('Lifestyle');

            // Fetch category by ID
            const fetchedCategory = Category.getById(category1.id);

            expect(fetchedCategory).toBeDefined();  // It should return the category object
            expect(fetchedCategory.name).toBe('Technology');  // Check if the name is correct
        });

        // Test 4: Check if getById returns undefined for non-existent IDs
        it(`${categoryBoundaryTest} should return undefined for non - existent category ID`, () => {
            Category.create('Technology');
            const nonExistentCategory = Category.getById(999);  // Pass an invalid ID

            expect(nonExistentCategory).toBeUndefined();  // It should return undefined for a non-existent category
        });
    });
});
