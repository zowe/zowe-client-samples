import { SampleSdk } from "./main";

(async () => {
    const sdk = new SampleSdk();

    try {
        // console.log("=== Creating a Post ===");
        // const createdPost = await sdk.createPost({ title: "foo", body: "bar", userId: 10 });
        // console.log("Created Post:", createdPost);

        console.log("\n=== Listing All Posts ===");
        const allPosts = await sdk.listPosts();
        console.log("All Posts:", allPosts);

        // const postId = createdPost.id;

        // console.log("\n=== Retrieving a Single Post ===");
        // const singlePost = await sdk.getPost(postId);
        // console.log("Single Post:", singlePost);

        // console.log("\n=== Updating a Post ===");
        // const updatedPost = await sdk.updatePost(postId, { title: "updated foo", body: "updated bar", userId: 10 });
        // console.log("Updated Post:", updatedPost);

        // console.log("\n=== Deleting a Post ===");
        // const deletedPost = await sdk.deletePost(postId);
        // console.log("Deleted Post Response:", deletedPost);

    } catch (error) {
        console.error("An error occurred:", error);
    }
})();
