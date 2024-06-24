# Zowe Client Samples

This repository contains sample code demonstrating Zowe client tools.

## Samples

- [Zowe Python SDK Sample](./zowe-python-sdk-sample)

## Requirements

The sample SDK has the following requirements:
```
black
isort
zowe.core-for-zowe-sdk~=1.0.0.dev
```

You can clone the repository using `git`:

```
git clone https://github.com/zowe/zowe-client-samples.git
```

## Quickstart

After you install the package, import the class SampleSDK from modules
Below is a simple script of how to run the sample SDK:

```python
t = SampleSdk()
result = t.create_post({"title": "foo", "body": "bar", "userId": 10})
print(result)
```
