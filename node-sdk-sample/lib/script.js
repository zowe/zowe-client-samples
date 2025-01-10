"use strict";
/*
* This program tests the functionality of SampleSdk by interacting with the
* JSONPlaceholder REST API.
*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const imperative_1 = require("@zowe/imperative");
const main_1 = require("./main");
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Create a session for the RestClient
    const session = new imperative_1.Session({
        hostname: "jsonplaceholder.typicode.com",
    });
    const sdk = new main_1.SampleSdk(session);
    try {
        // List all posts
        console.log("\n=== Listing All Posts ===");
        const allPosts = yield sdk.listPosts();
        console.log("All Posts:", allPosts.slice(0, 5));
        // Create a new post
        console.log("\n=== Creating a Post ===");
        const newPost = { title: "Test Post", body: "This is a test post.", userId: 1 };
        const createdPost = yield sdk.createPost(newPost);
        console.log("Created Post:", createdPost);
        // Get the newly created post by ID
        console.log("\n=== Retrieving a Single Post ===");
        const singlePost = yield sdk.getPost(1);
        console.log("Single Post:", singlePost);
        // Update the created post
        console.log("\n=== Updating the Post ===");
        const updatedPost = yield sdk.updatePost(1, { title: "Updated Title" });
        console.log("Updated Post:", updatedPost);
        // Delete the created post
        console.log("\n=== Deleting the Post ===");
        const deleteResponse = yield sdk.deletePost(1);
        console.log("Deleted Post Response:", deleteResponse);
    }
    catch (error) {
        console.error("An error occurred:", error);
    }
}))();
