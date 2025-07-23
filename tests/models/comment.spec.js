// tests/commentModel.test.js

const Comment = require('../../models/comment');  // Import the Comment model

// Clean up comments before each test
beforeEach(() => {
    // Reset the in-memory comments before each test
    Comment.comments = [];
    Comment.currentId = 1;
});

let commentBoundaryTest = `Comment boundary test`;

describe('Comment', () => {
    describe('boundary', () => {
        // Test 1: Check if the create method works
        it(`${commentBoundaryTest} should create a new comment`, () => {
            const postId = 1;
            const author = 'John Doe';
            const content = 'This is a test comment.';

            // Call the create method to add a comment
            const newComment = Comment.create(postId, author, content);

            // Verify that the comment was added correctly
            expect(newComment).toHaveProperty('id');  // Comment should have an ID
            expect(newComment.postId).toBe(postId);  // Check if the postId is correct
            expect(newComment.author).toBe(author);  // Check if the author is correct
            expect(newComment.content).toBe(content);  // Check if the content is correct
            expect(Comment.comments.length).toBe(1);  // Ensure there is 1 comment in the array
        });

        // Test 2: Check if the getByPostId method works
        it(`${commentBoundaryTest} should return comments for a given postId`, () => {
            // Create comments for postId 1 and 2
            const post1 = 1;
            const post2 = 2;
            Comment.create(post1, 'John Doe', 'Comment for post 1');
            Comment.create(post2, 'Jane Doe', 'Comment for post 2');

            // Fetch comments for postId 1
            const commentsForPost1 = Comment.getByPostId(post1);

            expect(commentsForPost1.length).toBe(1);  // There should be 1 comment for post 1
            expect(commentsForPost1[0].content).toBe('Comment for post 1');  // Check content

            // Fetch comments for postId 2
            const commentsForPost2 = Comment.getByPostId(post2);

            expect(commentsForPost2.length).toBe(1);  // There should be 1 comment for post 2
            expect(commentsForPost2[0].content).toBe('Comment for post 2');  // Check content
        });

        // Test 3: Check if the getByPostId method returns an empty array for non-existent postId
        it(`${commentBoundaryTest} should return an empty array for a non-existent postId`, () => {
            // Create a comment for postId 1
            Comment.create(1, 'John Doe', 'Comment for post 1');

            // Fetch comments for non-existent postId 999
            const commentsForNonExistentPost = Comment.getByPostId(999);

            expect(commentsForNonExistentPost.length).toBe(0);  // No comments for postId 999
        });
    });
});
