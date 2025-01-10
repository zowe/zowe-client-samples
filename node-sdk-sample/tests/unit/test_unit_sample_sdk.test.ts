import { SampleSdk } from "../../src/main";
import { AbstractSession, RestClient } from "@zowe/imperative";

jest.mock("@zowe/imperative");

describe("SampleSdk", () => {
    let sdk: SampleSdk;
    let mockSession: jest.Mocked<AbstractSession>;

    beforeEach(() => {
        mockSession = {} as jest.Mocked<AbstractSession>;
        sdk = new SampleSdk(mockSession);
    });

    it("createPost should create a post and return the created post", async () => {
        const mockPost = { title: "foo", body: "bar", userId: 10, id: 101 };
        jest.spyOn(RestClient, "postExpectJSON").mockResolvedValue(mockPost);

        const newPost = { title: "foo", body: "bar", userId: 10 };
        const result = await sdk.createPost(newPost);

        expect(result).toEqual(mockPost);
        expect(RestClient.postExpectJSON).toHaveBeenCalledWith(
            mockSession,
            SampleSdk.POSTS_URI,
            newPost
        );
    });

    it("updatePost should update a post and return the updated post", async () => {
        const mockUpdatedPost = { id: 1, title: "Updated Title", body: "bar", userId: 10 };
        jest.spyOn(RestClient, "putExpectJSON").mockResolvedValue(mockUpdatedPost);

        const updatedPost = { title: "Updated Title", body: "bar", userId: 10 };
        const result = await sdk.updatePost(1, updatedPost);

        expect(result).toEqual(mockUpdatedPost);
        expect(RestClient.putExpectJSON).toHaveBeenCalledWith(
            mockSession,
            `${SampleSdk.POSTS_URI}/1`,
            updatedPost,
            ""
        );
    });

    it("getPost should retrieve a post by ID", async () => {
        const mockPost = { id: 1, title: "foo", body: "bar", userId: 10 };
        jest.spyOn(RestClient, "getExpectJSON").mockResolvedValue(mockPost);

        const result = await sdk.getPost(1);

        expect(result).toEqual(mockPost);
        expect(RestClient.getExpectJSON).toHaveBeenCalledWith(
            mockSession,
            `${SampleSdk.POSTS_URI}/1`
        );
    });

    it("listPosts should return an array of posts", async () => {
        const mockPosts = [
            { id: 1, title: "Post 1", body: "Content 1", userId: 1 },
            { id: 2, title: "Post 2", body: "Content 2", userId: 2 },
        ];
        jest.spyOn(RestClient, "getExpectJSON").mockResolvedValue(mockPosts);

        const result = await sdk.listPosts();

        expect(result).toEqual(mockPosts);
        expect(RestClient.getExpectJSON).toHaveBeenCalledWith(mockSession, SampleSdk.POSTS_URI);
    });

    it("deletePost should delete a post and return an empty response", async () => {
        jest.spyOn(RestClient, "deleteExpectJSON").mockResolvedValue({});

        const result = await sdk.deletePost(1);

        expect(result).toEqual({});
        expect(RestClient.deleteExpectJSON).toHaveBeenCalledWith(
            mockSession,
            `${SampleSdk.POSTS_URI}/1`
        );
    });
});
