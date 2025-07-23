// tests/commentController.test.js

const request = require('supertest');
const app = require('../../app');
const Comment = require('../../models/comment');  // Import the Comment model

// Clean up comments before and after each test
beforeEach(() => {
    // Reset the in-memory comments array before each test
    Comment.comments = [];
    Comment.currentId = 1;
});

let commentBoundaryTest = `CommentController boundary test`;

describe('Comment Controller', () => {
    describe('boundary', () => {
        // Test 1: Check if .create method exists in Comment model
        it(`${commentBoundaryTest} should have a create method in the Comment model`, () => {
            expect(Comment.create).toBeDefined();  // Check if .create is defined in Comment model
            expect(typeof Comment.create).toBe('function');  // Ensure .create is a function
        });

        // Test 2: Check if the .create method adds a comment
        it(`${commentBoundaryTest} should add a comment to the in-memory store`, async () => {
            const postId = 1;
            const commentData = {
                postId: postId,
                author: 'John Doe',
                content: 'This is a test comment.',
            };

            // Call the .create method directly
            Comment.create(commentData.postId, commentData.author, commentData.content);

            // Verify that the comment was added to the in-memory store
            const comments = Comment.getByPostId(postId);
            expect(comments.length).toBe(1);  // There should be 1 comment for the post
            expect(comments[0].author).toBe(commentData.author);  // Verify author
            expect(comments[0].content).toBe(commentData.content);  // Verify content
        });

    });
});
