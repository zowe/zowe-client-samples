# Zowe Node SDK Sample

## Requirements

You can install the requirements in a virtual environment with following commands:

```shell
npm install
npm run build
```

You can clone the repository using `git`:

```
git clone https://github.com/zowe/zowe-client-samples.git
```

## Quickstart

After you install the package, import the class SampleSDK from modules.

Below is a simple script of how to run the sample SDK, assuming the script file is located under the `node-sdk-sample/src` folder:

```typescript
import { Session } from "@zowe/imperative";
import { SampleSdk } from "./main";

(async () => {
    const session: Session = new Session({
        hostname: "jsonplaceholder.typicode.com",
    });
    const sdk = new SampleSdk(session);
    console.log("\n=== Retrieving a Single Post ===");
    console.log(await sdk.getPost(1));
})();

```
