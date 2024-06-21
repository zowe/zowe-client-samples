# Zowe Client Samples

This repository contains sample code demonstrating Zowe client tools.

## Samples

- [Zowe Python SDK Sample](./zowe-python-sdk-sample)

## Requirements

The sample code has dependencies on the packages listed below:

```
black
isort
zowe.core-for-zowe-sdk~=1.0.0.dev
```

## Quickstart

After you install the package, import the class SampleSDK from modules
Create a dictionary to handle communication with the plug-in:

```python
    profile = {
        "host": "example.com",
        "port": 443,
        "user": "<user>",
        "password": "<password>"
    }

```
