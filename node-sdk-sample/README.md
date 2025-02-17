# Zowe Node SDK Sample

## Requirements

You can clone the repository using `git`:

```
git clone https://github.com/zowe/zowe-client-samples.git
```

Extract the `node-sdk-sample` directory from the cloned repository to a new project.

You can install the requirements in a virtual environment with following commands:

```shell
cd node-sdk-sample
npm install
npm run build
```

## Quickstart

After you install the package, import the class SampleSdk from modules.

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

With `~/node-sdk-sample` as the working directory, issue the following command to run the sample:

```shell
npm start
```

## Running Integration and Unit Tests

With `~/node-sdk-sample` as the working directory, issue the following command to run integration and unit tests:

```shell
npx jest tests/
```