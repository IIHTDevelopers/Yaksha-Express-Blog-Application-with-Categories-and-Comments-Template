// tests/routes.test.js

const request = require('supertest');
const app = require('../../app');  // Import the Express app
const Post = require('../../models/post');
const Category = require('../../models/category');
const Comment = require('../../models/comment');

// Clean up posts, categories, and comments before and after each test
beforeEach(() => {
    // Reset the in-memory posts, categories, and comments before each test
    Post.posts = [];
    Post.currentId = 1;
    Comment.comments = [];
    Comment.currentId = 1;
    Category.categories = [];
    Category.currentId = 1;
});

let routesBoundaryTest = `Routes boundary test`;

describe('Routes', () => {
    describe('boundary', () => {
        // Test for the home route ("/")
        it(`${routesBoundaryTest} should render all posts and categories`, async () => {
            const category = Category.create('Technology');
            Post.create('Post 1', 'This is the first post', category.id);
            Post.create('Post 2', 'This is the second post', category.id);

            const response = await request(app).get('/');
            expect(response.status).toBe(200);
            expect(response.text).toContain('Post 1');  // Check if post title is rendered
            expect(response.text).toContain('Technology');  // Check if category is rendered
        });

        // Test for the show route ("/post/:id")
        it(`${routesBoundaryTest} should render a single post with comments`, async () => {
            const category = Category.create('Technology');
            const post = Post.create('Post 1', 'This is the first post', category.id);
            Comment.create(post.id, 'John Doe', 'This is a comment.');

            const response = await request(app).get(`/post/${post.id}`);
            expect(response.status).toBe(200);
            expect(response.text).toContain('Post 1');  // Check if post title is rendered
            expect(response.text).toContain('This is a comment.');  // Check if the comment is rendered
        });

        // Test for the create route ("/create")
        it(`${routesBoundaryTest} should render the create post form`, async () => {
            const response = await request(app).get('/create');
            expect(response.status).toBe(200);
            expect(response.text).toContain('Create a New Post');  // Ensure the form is rendered
        });

        // Test for creating a new post (POST /create)
        it(`${routesBoundaryTest} should create a new post and redirect to the homepage`, async () => {
            const category = Category.create('Technology');
            const postData = {
                title: 'New Post',
                content: 'This is a newly created post.',
                categoryId: category.id
            };

            const response = await request(app).post('/create').send(postData);
            expect(response.status).toBe(302);  // Expect redirection after post creation
            expect(response.headers.location).toBe('/');  // Redirect to homepage after creation

            // Verify that the post is created
            const posts = Post.getAll();
            expect(posts.length).toBe(1);  // Ensure there is 1 post
        });

        // Test for the edit route ("/edit/:id")
        it(`${routesBoundaryTest} should render the edit form for an existing post`, async () => {
            const category = Category.create('Technology');
            const post = Post.create('Post 1', 'This is the first post', category.id);

            const response = await request(app).get(`/edit/${post.id}`);
            expect(response.status).toBe(200);
            expect(response.text).toContain('Edit Post');  // Ensure the edit form is rendered
        });

        // Test for updating an existing post (POST /edit/:id)
        it(`${routesBoundaryTest} should update an existing post and redirect to the updated post`, async () => {
            const category = Category.create('Technology');
            const post = Post.create('Post 1', 'This is the first post', category.id);
            const updatedPostData = {
                title: 'Updated Post Title',
                content: 'Updated content for the post',
                categoryId: category.id
            };

            const response = await request(app).post(`/edit/${post.id}`).send(updatedPostData);
            expect(response.status).toBe(302);  // Expecting redirection after update
            expect(response.headers.location).toBe(`/post/${post.id}`);  // Redirect to updated post
        });

        // Test for deleting a post (GET /delete/:id)
        it(`${routesBoundaryTest} should delete a post and redirect to the homepage`, async () => {
            const category = Category.create('Technology');
            const post = Post.create('Post 1', 'This is a test post', category.id);

            const response = await request(app).get(`/delete/${post.id}`);
            expect(response.status).toBe(302);  // Expect redirection after deletion
            expect(response.headers.location).toBe('/');  // Redirect to homepage after deletion

            // Verify that the post is deleted
            const posts = Post.getAll();
            expect(posts.length).toBe(0);  // There should be no posts left
        });

        // Test for the create category route (GET /createCategory)
        it(`${routesBoundaryTest} should render the create category form`, async () => {
            const response = await request(app).get('/createCategory');
            expect(response.status).toBe(200);
            expect(response.text).toContain('Create a New Category');  // Ensure the form is rendered
        });

        // Test for creating a new category (POST /createCategory)
        it(`${routesBoundaryTest} should create a new category and redirect to the homepage`, async () => {
            const categoryData = { name: 'New Category' };

            const response = await request(app).post('/createCategory').send(categoryData);
            expect(response.status).toBe(302);  // Expect redirection after category creation
            expect(response.headers.location).toBe('/');  // Redirect to homepage after creation

            // Verify that the category is created
            const categories = Category.getAll();
            expect(categories.length).toBe(1);  // Ensure there is 1 category
        });
    });
});
