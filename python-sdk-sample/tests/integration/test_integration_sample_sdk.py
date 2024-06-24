from unittest import TestCase, mock
import unittest
from zowe.core_for_zowe_sdk import ProfileManager # type: ignore

import sys
import os

current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.join(current_dir, "../../src"))
from main import SampleSdk

class TestSampleSDK(TestCase):

    def setUp(self):
        self.expected = {"title": "foo", "body": "bar", "userId": 10}

    def is_subset(self, dict1, dict2):
        for key, value in dict1.items():
            if key not in dict2 or dict2[key] != value:
                return False
        return True

    def test_create_post(self):
        sdk = SampleSdk()
        result = sdk.create_post(self.expected)
        self.assertTrue(self.is_subset(self.expected, result))

    def test_get_post(self):
        sdk = SampleSdk()
        result = sdk.get_post(1)
        self.assertEqual(result.get("id"), 1)

    def test_update_post(self):
        sdk = SampleSdk()
        result = sdk.update_post(1, self.expected)
        self.assertTrue(self.is_subset(self.expected, result))

    def test_delete_post(self):
        sdk = SampleSdk()
        result = sdk.delete_post(1)
        self.assertEqual(result, {})

    def test_list_post(self):
        sdk = SampleSdk()
        result = sdk.list_post()
        self.assertIsInstance(result, list)
        self.assertIsInstance(result[0], dict)
