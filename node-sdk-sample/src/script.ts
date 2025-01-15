/*
* This program tests the functionality of SampleSdk by interacting with the
* JSONPlaceholder REST API.
*/

import { Session } from "@zowe/imperative";
import { SampleSdk, IPost } from "./main";

(async () => {
    // Create a session for the RestClient
    const session: Session = new Session({
        hostname: "jsonplaceholder.typicode.com",
    });

    const sdk = new SampleSdk(session);

    try {
        // List all posts
        console.log("\n=== Listing All Posts ===");
        const allPosts = await sdk.listPosts();
        console.log("All Posts:", allPosts.slice(0, 5));

        // Create a new post
        console.log("\n=== Creating a Post ===");
        const newPost: IPost = { title: "Test Post", body: "This is a test post.", userId: 1 };
        const createdPost = await sdk.createPost(newPost);
        console.log("Created Post:", createdPost);

        // Get the newly created post by ID
        console.log("\n=== Retrieving a Single Post ===");
        const singlePost = await sdk.getPost(1);
        console.log("Single Post:", singlePost);

        // Update the created post
        console.log("\n=== Updating the Post ===");
        const updatedPost: IPost = await sdk.updatePost(1, { title: "Updated Title" });
        console.log("Updated Post:", updatedPost);

        // Delete the created post
        console.log("\n=== Deleting the Post ===");
        const deleteResponse = await sdk.deletePost(1);
        console.log("Deleted Post Response:", deleteResponse);

    } catch (error) {
        console.error("An error occurred:", error);
    }
})();
