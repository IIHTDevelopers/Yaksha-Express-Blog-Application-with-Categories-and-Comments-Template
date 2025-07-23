// tests/postController.test.js

const request = require('supertest');
const app = require('../../app');  // Import your Express app
const Post = require('../../models/post');
const Category = require('../../models/category');
const Comment = require('../../models/comment');

// Clean up posts and comments before and after each test
beforeEach(() => {
    // Reset the in-memory posts and comments before each test
    Post.posts = [];
    Post.currentId = 1;
    Comment.comments = [];
    Comment.currentId = 1;
    Category.categories = [];
    Category.currentId = 1;
});

let postBoundaryTest = `PostController boundary test`;

describe('Post Controller', () => {
    describe('boundary', () => {
        // Test for the index route ("/")
        it(`${postBoundaryTest} should return a 200 status and render posts with categories`, async () => {
            // Add a category and a post to test
            const category = Category.create('Technology');
            Post.create('Post 1', 'This is a test post', category.id);

            const response = await request(app).get('/');
            expect(response.status).toBe(200);
            expect(response.text).toContain('Post 1');  // Check if post title is rendered
            expect(response.text).toContain('Technology');  // Check if category is rendered
        });

        // Test for the show route ("/post/:id")
        it(`${postBoundaryTest} should return a 200 status and render a post with comments`, async () => {
            const category = Category.create('Technology');
            const post = Post.create('Post 1', 'This is a test post', category.id);
            Comment.create(post.id, 'John Doe', 'This is a comment.');

            const response = await request(app).get(`/post/${post.id}`);
            expect(response.status).toBe(200);
            expect(response.text).toContain('Post 1');  // Check if the post title is rendered
            expect(response.text).toContain('This is a comment.');  // Check if the comment is rendered
        });

        // Test for the createForm route ("/create")
        it(`${postBoundaryTest} should return a 200 status and render the create form`, async () => {
            const response = await request(app).get('/create');
            expect(response.status).toBe(200);
            expect(response.text).toContain('Create a New Post');  // Ensure the form is shown
        });

        // Test for the editForm route ("/edit/:id")
        it(`${postBoundaryTest} should return a 200 status and render the edit form for an existing post`, async () => {
            const category = Category.create('Technology');
            const post = Post.create('Post 1', 'This is a test post', category.id);

            const response = await request(app).get(`/edit/${post.id}`);
            expect(response.status).toBe(200);
            expect(response.text).toContain('Edit Post');  // Ensure the form is shown
        });

        // Test for the delete route ("/delete/:id")
        it(`${postBoundaryTest} should delete a post and redirect to the homepage`, async () => {
            const category = Category.create('Technology');
            const post = Post.create('Post 1', 'This is a test post', category.id);

            const response = await request(app).get(`/delete/${post.id}`);
            expect(response.status).toBe(302);  // Expecting redirection after deletion
            expect(response.headers.location).toBe('/');  // Redirect to homepage after deletion

            // Verify that the post was deleted
            const posts = Post.getAll();
            expect(posts.length).toBe(0);  // There should be no posts left
        });
    });
});
