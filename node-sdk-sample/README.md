# Zowe Node SDK Sample

## Requirements

You can clone the repository using `git`:

```
git clone https://github.com/zowe/zowe-client-samples.git
```

You can install the requirements in a virtual environment with following commands:

```shell
cd node-sdk-sample
npm install
npm run build
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

## Running The Sample

/zowe-client-sample/node-sdk-sample should be the working directory

```shell
npx tsx src/script.ts
```

## Running Integration and Unit Tests

/zowe-client-sample/node-sdk-sample should be the working directory

```shell
npx jest tests/
```