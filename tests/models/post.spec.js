// tests/postModel.test.js

const Post = require('../../models/post');  // Import the Post model

// Clean up posts before each test
beforeEach(() => {
    // Reset the in-memory posts before each test
    Post.posts = [];
    Post.currentId = 1;
});

let postBoundaryTest = `Post boundary test`;

describe('Post', () => {
    describe('boundary', () => {
        // Test 1: Check if the create method works
        it(`${postBoundaryTest} should create a new post`, () => {
            const categoryId = 1;
            const title = 'New Post';
            const content = 'This is a test post';

            // Call the create method to add a new post
            const newPost = Post.create(title, content, categoryId);

            // Verify that the post was added correctly
            expect(newPost).toHaveProperty('id');  // Post should have an ID
            expect(newPost.title).toBe(title);  // Check if the title is correct
            expect(newPost.content).toBe(content);  // Check if the content is correct
            expect(newPost.categoryId).toBe(categoryId);  // Check if the categoryId is correct
            expect(Post.posts.length).toBe(1);  // Ensure there is 1 post in the array
        });

        // Test 2: Check if the getAll method works
        it(`${postBoundaryTest} should return all posts`, () => {
            Post.create('Post 1', 'This is the first post', 1);
            Post.create('Post 2', 'This is the second post', 2);

            const allPosts = Post.getAll();

            expect(allPosts.length).toBe(2);  // There should be 2 posts
            expect(allPosts[0].title).toBe('Post 1');  // Check the title of the first post
            expect(allPosts[1].title).toBe('Post 2');  // Check the title of the second post
        });

        // Test 3: Check if the getById method works
        it(`${postBoundaryTest} should return a post by ID`, () => {
            const post1 = Post.create('Post 1', 'This is the first post', 1);
            const post2 = Post.create('Post 2', 'This is the second post', 2);

            // Fetch post by ID
            const fetchedPost = Post.getById(post1.id);

            expect(fetchedPost).toBeDefined();  // It should return the post object
            expect(fetchedPost.title).toBe('Post 1');  // Check if the title is correct
        });

        // Test 4: Check if the getByCategory method works
        it(`${postBoundaryTest} should return posts filtered by categoryId`, () => {
            const category1 = 1;
            const category2 = 2;

            Post.create('Post 1', 'This is the first post', category1);
            Post.create('Post 2', 'This is the second post', category1);
            Post.create('Post 3', 'This is the third post', category2);

            const postsInCategory1 = Post.getByCategory(category1);

            expect(postsInCategory1.length).toBe(2);  // There should be 2 posts in category 1
            expect(postsInCategory1[0].categoryId).toBe(category1);  // Check if the categoryId is correct
            expect(postsInCategory1[1].categoryId).toBe(category1);  // Check if the categoryId is correct
        });

        // Test 5: Check if the update method works
        it(`${postBoundaryTest} should update an existing post`, () => {
            const post = Post.create('Post 1', 'This is the first post', 1);
            const updatedTitle = 'Updated Post Title';
            const updatedContent = 'Updated content for the post';

            // Update the post
            const updatedPost = Post.update(post.id, updatedTitle, updatedContent);

            expect(updatedPost).toBeDefined();  // Ensure the updated post is returned
            expect(updatedPost.title).toBe(updatedTitle);  // Check if the title was updated
            expect(updatedPost.content).toBe(updatedContent);  // Check if the content was updated
        });

        // Test 6: Check if the update method returns null for non-existent post
        it(`${postBoundaryTest} should return null for a non-existent post on update`, () => {
            const updatedPost = Post.update(999, 'Non-existent Post', 'This post does not exist');
            expect(updatedPost).toBeNull();  // Should return null as the post doesn't exist
        });

        // Test 7: Check if the delete method works
        it(`${postBoundaryTest} should delete a post and return true`, () => {
            const post = Post.create('Post 1', 'This is a test post', 1);

            // Delete the post
            const success = Post.delete(post.id);

            expect(success).toBe(true);  // Should return true for successful deletion
            expect(Post.posts.length).toBe(0);  // Ensure there are no posts left
        });

        // Test 8: Check if the delete method returns false for non-existent post
        it(`${postBoundaryTest} should return false for a non-existent post on delete`, () => {
            const success = Post.delete(999);  // Attempt to delete a non-existent post
            expect(success).toBe(false);  // Should return false as the post doesn't exist
        });
    });
});
