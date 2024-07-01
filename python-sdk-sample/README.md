# Zowe Python SDK Sample

## Requirements

The sample SDK has the following requirements:
```
black
isort
zowe.core-for-zowe-sdk~=1.0.0.dev
pytest==7.1.2
```
You can install the requirements in a virtual environment with following commands:

```shell
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

You can clone the repository using `git`:

```
git clone https://github.com/zowe/zowe-client-samples.git
```

## Quickstart

After you install the package, import the class SampleSDK from modules.

Below is a simple script of how to run the sample SDK, assuming the script file is located under the `python-sdk-sample` folder:

```python
from org.sample_for_zowe_sdk import SampleSdk

t = SampleSdk()
result = t.create_post({"title": "foo", "body": "bar", "userId": 10})
print(result)
```
