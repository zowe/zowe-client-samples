/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright Contributors to the Zowe Project.
*/

import { AbstractSession, RestClient } from "@zowe/imperative";

interface IPost {
    userId: number;
    id?: number;
    title: string;
    body: string;
}

export class SampleSdk {
    public static readonly POSTS_URI = "/posts";

    private session: AbstractSession;

    constructor(session: AbstractSession) {
        this.session = session;
    }

    public async listPosts(): Promise<IPost[]> {
        return RestClient.getExpectJSON<IPost[]>(this.session, SampleSdk.POSTS_URI);
    }

    public async getPost(id: number): Promise<IPost> {
        const resource = `${SampleSdk.POSTS_URI}/${id}`;
        return RestClient.getExpectJSON<IPost>(this.session, resource);
    }

    public async createPost(post: any): Promise<IPost> {
        return RestClient.postExpectJSON<IPost>(this.session, SampleSdk.POSTS_URI, post);
    }

    public async updatePost(id: number, post: any): Promise<IPost> {
        const resource = `${SampleSdk.POSTS_URI}/${id}`;
        return RestClient.putExpectJSON<IPost>(this.session, resource, post, "");
    }

    public async deletePost(id: number): Promise<unknown> {
        const resource = `${SampleSdk.POSTS_URI}/${id}`;
        return RestClient.deleteExpectJSON(this.session, resource);
    }
}
