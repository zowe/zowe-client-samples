/*
 * Jest tests for SampleSdk to verify interaction with REST API endpoints.
 */

import { AbstractSession, RestClient } from "@zowe/imperative";
import { SampleSdk } from "../../src/main";

jest.mock("@zowe/imperative", () => ({
    ...jest.requireActual("@zowe/imperative"),
    RestClient: {
        getExpectJSON: jest.fn(),
        postExpectJSON: jest.fn(),
        putExpectJSON: jest.fn(),
        deleteExpectJSON: jest.fn(),
    },
}));

const mockedRestClient = RestClient as jest.Mocked<typeof RestClient>;

describe("SampleSdk", () => {
    let sdk: SampleSdk;
    let mockSession: AbstractSession;

    beforeEach(() => {
        mockSession = {} as AbstractSession;
        sdk = new SampleSdk(mockSession);
    });

    it("listPosts should return an array of posts", async () => {
        const mockPosts = [
            { id: 1, title: "Post 1", body: "Content 1", userId: 1 },
            { id: 2, title: "Post 2", body: "Content 2", userId: 2 },
        ];
        mockedRestClient.getExpectJSON.mockResolvedValue(mockPosts);

        const result = await sdk.listPosts();
        expect(result).toEqual(mockPosts);
        expect(mockedRestClient.getExpectJSON).toHaveBeenCalledWith(mockSession, SampleSdk.POSTS_URI);
    });

    it("getPost should retrieve a post by ID", async () => {
        const mockPost = { id: 1, title: "Post 1", body: "Content 1", userId: 1 };
        mockedRestClient.getExpectJSON.mockResolvedValue(mockPost);

        const result = await sdk.getPost(1);
        expect(result).toEqual(mockPost);
        expect(mockedRestClient.getExpectJSON).toHaveBeenCalledWith(mockSession, `${SampleSdk.POSTS_URI}/1`);
    });

    it("createPost should create a post and return the created post", async () => {
        const newPost = { title: "New Post", body: "Content", userId: 1 };
        const mockCreatedPost = { ...newPost, id: 101 };
        mockedRestClient.postExpectJSON.mockResolvedValue(mockCreatedPost);

        const result = await sdk.createPost(newPost);
        expect(result).toEqual(mockCreatedPost);
        expect(mockedRestClient.postExpectJSON).toHaveBeenCalledWith(mockSession, SampleSdk.POSTS_URI, newPost);
    });

    it("updatePost should update a post and return the updated post", async () => {
        const updatedPost = { title: "Updated Title", body: "Updated Content", userId: 1 };
        const mockUpdatedPost = { ...updatedPost, id: 1 };
        mockedRestClient.putExpectJSON.mockResolvedValue(mockUpdatedPost);

        const result = await sdk.updatePost(1, updatedPost);
        expect(result).toEqual(mockUpdatedPost);
        expect(mockedRestClient.putExpectJSON).toHaveBeenCalledWith(
            mockSession,
            `${SampleSdk.POSTS_URI}/1`,
            updatedPost,
            ""
        );
    });

    it("deletePost should delete a post and return a success response", async () => {
        const mockDeleteResponse = {};
        mockedRestClient.deleteExpectJSON.mockResolvedValue(mockDeleteResponse);

        const result = await sdk.deletePost(1);
        expect(result).toEqual(mockDeleteResponse);
        expect(mockedRestClient.deleteExpectJSON).toHaveBeenCalledWith(mockSession, `${SampleSdk.POSTS_URI}/1`);
    });
});
