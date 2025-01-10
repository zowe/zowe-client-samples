"use strict";
/*
* This program and the accompanying materials are made available under the terms of the
* Eclipse Public License v2.0 which accompanies this distribution, and is available at
* https://www.eclipse.org/legal/epl-v20.html
*
* SPDX-License-Identifier: EPL-2.0
*
* Copyright Contributors to the Zowe Project.
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
exports.SampleSdk = void 0;
const imperative_1 = require("@zowe/imperative");
class SampleSdk {
    constructor(session) {
        this.session = session;
    }
    listPosts() {
        return __awaiter(this, void 0, void 0, function* () {
            return imperative_1.RestClient.getExpectJSON(this.session, SampleSdk.POSTS_URI);
        });
    }
    getPost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = `${SampleSdk.POSTS_URI}/${id}`;
            return imperative_1.RestClient.getExpectJSON(this.session, resource);
        });
    }
    createPost(post) {
        return __awaiter(this, void 0, void 0, function* () {
            return imperative_1.RestClient.postExpectJSON(this.session, SampleSdk.POSTS_URI, post);
        });
    }
    updatePost(id, post) {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = `${SampleSdk.POSTS_URI}/${id}`;
            return imperative_1.RestClient.putExpectJSON(this.session, resource, post, "");
        });
    }
    deletePost(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const resource = `${SampleSdk.POSTS_URI}/${id}`;
            return imperative_1.RestClient.deleteExpectJSON(this.session, resource);
        });
    }
}
exports.SampleSdk = SampleSdk;
SampleSdk.POSTS_URI = "/posts";
