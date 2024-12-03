import * as Client from "ssh2-sftp-client";
import * as vscode from "vscode";
import * as zosfiles from "@zowe/zos-files-for-zowe-sdk";
import { ZosUssProfile } from "@zowe/zos-uss-for-zowe-sdk";
import { imperative, MainframeInteraction } from "@zowe/zowe-explorer-api";

export class SshUssApi implements MainframeInteraction.IUss {
    public constructor(public profile?: imperative.IProfileLoaded) {}

    public getProfileTypeName(): string {
        return ZosUssProfile.type;
    }

    public getSession(profile?: imperative.IProfileLoaded): imperative.Session {
        const sessCfg: imperative.ISession = {};
        imperative.ConnectionPropsForSessCfg.resolveSessCfgProps(sessCfg, (profile || this.profile)?.profile as any);
        return new imperative.Session(sessCfg);
    }

    public async getStatus(profile: imperative.IProfileLoaded, profileType?: string): Promise<string> {
        if (profileType === ZosUssProfile.type) {
            try {
                return await this.withClient(this.getSession(profile), () => Promise.resolve("active"));
            } catch (err) {
                vscode.window.showErrorMessage((err as Error).toString());
                return Promise.resolve("inactive");
            }
        }
        return Promise.resolve("unverified");
    }

    public async fileList(ussFilePath: string): Promise<zosfiles.IZosFilesResponse> {
        return this.withClient(this.getSession(), async (client) => {
            const response = [];
            if ((await client.stat(ussFilePath)).isDirectory) {
                for (const fileInfo of await client.list(ussFilePath)) {
                    response.push({
                        name: fileInfo.name,
                        mode: fileInfo.type + fileInfo.owner + fileInfo.group + fileInfo.rights.other,
                        size: fileInfo.size,
                        uid: fileInfo.owner,
                        gid: fileInfo.group,
                        mtime: fileInfo.modifyTime,
                    });
                }
            }
            return this.buildZosFilesResponse({ items: response });
        });
    }

    public isFileTagBinOrAscii(ussFilePath: string): Promise<boolean> {
        return Promise.resolve(false);
    }

    public async getContents(ussFilePath: string, options: zosfiles.IDownloadSingleOptions): Promise<zosfiles.IZosFilesResponse> {
        return this.withClient(this.getSession(), async (client) => {
            if (options.file != null) {
                imperative.IO.createDirsSyncFromFilePath(options.file);
                await client.fastGet(ussFilePath, options.file);
            } else if (options.stream != null) {
                options.stream.write(await client.get(ussFilePath));
                options.stream.end();
            }
            return this.buildZosFilesResponse({ etag: ussFilePath });
        });
    }

    public uploadFromBuffer(buffer: Buffer, filePath: string, _options?: zosfiles.IUploadOptions): Promise<zosfiles.IZosFilesResponse> {
        return this.withClient(this.getSession(), async (client) => {
            const response = await client.put(buffer, filePath);
            return this.buildZosFilesResponse(response);
        });
    }

    public async putContent(inputFilePath: string, ussFilePath: string): Promise<zosfiles.IZosFilesResponse> {
        return this.withClient(this.getSession(), async (client) => {
            const response = await client.fastPut(inputFilePath, ussFilePath);
            return this.buildZosFilesResponse(response);
        });
    }

    public async uploadDirectory(
        inputDirectoryPath: string,
        ussDirectoryPath: string,
        options: zosfiles.IUploadOptions
    ): Promise<zosfiles.IZosFilesResponse> {
        return this.withClient(this.getSession(), async (client) => {
            const response = await client.uploadDir(inputDirectoryPath, ussDirectoryPath);
            return this.buildZosFilesResponse(response);
        });
    }

    public async create(ussPath: string, type: string, mode?: string | undefined): Promise<zosfiles.IZosFilesResponse> {
        return this.withClient(this.getSession(), async (client) => {
            const response = type === "directory" ? await client.mkdir(ussPath) : await client.append(Buffer.from(""), ussPath, { mode });
            return this.buildZosFilesResponse(response);
        });
    }

    public async delete(ussPath: string, recursive?: boolean | undefined): Promise<zosfiles.IZosFilesResponse> {
        return this.withClient(this.getSession(), async (client) => {
            const response = recursive ? await client.rmdir(ussPath, true) : await client.delete(ussPath);
            return this.buildZosFilesResponse(response);
        });
    }

    public async rename(currentUssPath: string, newUssPath: string): Promise<zosfiles.IZosFilesResponse> {
        return this.withClient(this.getSession(), async (client) => {
            const response = await client.rename(currentUssPath, newUssPath);
            return this.buildZosFilesResponse(response);
        });
    }

    private buildZosFilesResponse(apiResponse: any, success = true): zosfiles.IZosFilesResponse {
        return { apiResponse, commandResponse: "", success };
    }

    private async withClient<T>(session: imperative.Session, callback: (client: Client) => Promise<T>): Promise<T> {
        const client = new Client();
        try {
            await client.connect({
                host: session.ISession.hostname,
                port: session.ISession.port,
                username: session.ISession.user,
                password: session.ISession.password,
            });
            return await callback(client);
        } catch (err) {
            console.error(err);
            return Promise.reject<T>(err);
        } finally {
            await client.end();
        }
    }
}
