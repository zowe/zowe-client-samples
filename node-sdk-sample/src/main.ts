/**
 * This program and the accompanying materials are made available and may be used, at your option, under either:
 * Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
 * Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0
 *
 * SPDX-License-Identifier: EPL-2.0 OR Apache-2.0
 *
 * Copyright Contributors to the Zowe Project.
 */

import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export interface Post {
    title: string;
    body: string;
    userId: number;
}

export class SampleSdk {
    private requestHandler: AxiosInstance;
    private logger: Console;
    private readonly requestEndpoint: string = "/";

    constructor() {
        this.requestHandler = axios.create({
            baseURL: "https://jsonplaceholder.typicode.com",
            auth: {
                username: "fake",
                password: "fake",
            },
        });
        this.logger = console;
    }

    private createCustomRequestArguments(): AxiosRequestConfig {
        return {
            headers: {
                "Content-Type": "application/json",
            },
        };
    }

    async createPost(post: Post): Promise<any> {
        const customArgs = this.createCustomRequestArguments();
        customArgs.data = post;
        customArgs.url = `${this.requestEndpoint}posts`;
        const response = await this.requestHandler.post(customArgs.url, customArgs.data, customArgs);
        return response.data;
    }

    async updatePost(id: number, post: Post): Promise<any> {
        const customArgs = this.createCustomRequestArguments();
        customArgs.data = post;
        customArgs.url = `${this.requestEndpoint}posts/${id}`;
        const response = await this.requestHandler.put(customArgs.url, customArgs.data, customArgs);
        return response.data;
    }

    async getPost(id: number): Promise<any> {
        const customArgs = this.createCustomRequestArguments();
        customArgs.url = `${this.requestEndpoint}posts/${id}`;
        const response = await this.requestHandler.get(customArgs.url, customArgs);
        return response.data;
    }

    async listPosts(): Promise<any[]> {
        const customArgs = this.createCustomRequestArguments();
        customArgs.url = `${this.requestEndpoint}posts`;
        const response = await this.requestHandler.get(customArgs.url, customArgs);
        this.logger.info("Listed all posts");
        return response.data;
    }

    async deletePost(id: number): Promise<any> {
        const customArgs = this.createCustomRequestArguments();
        customArgs.url = `${this.requestEndpoint}posts/${id}`;
        const response = await this.requestHandler.delete(customArgs.url, customArgs);
        return response.data;
    }
}
