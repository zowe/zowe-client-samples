from unittest import TestCase, mock
import unittest
from zowe.core_for_zowe_sdk import ProfileManager # type: ignore

import sys
import os

current_dir = os.path.dirname(os.path.abspath(__file__))
sys.path.append(os.path.join(current_dir, "../../src"))
from main import SampleSdk

class TestSampleSDK(TestCase):

    @mock.patch("requests.Session.send")
    def test_create_post(self, mock_send_request):
        mock_send_request.return_value = mock.Mock(headers={"Content-Type": "application/json"}, status_code=201)
        profile = ProfileManager().load(profile_type="zosmf", validate_schema=False)
        post = SampleSdk(profile)
        result = post.create_post({"title": "foo", "body": "bar", "userId": 10})
        mock_send_request.assert_called()

    @mock.patch("requests.Session.send")
    def test_update_post(self, mock_send_request):
        mock_send_request.return_value = mock.Mock(headers={"Content-Type": "application/json"}, status_code=200)
        profile = ProfileManager().load(profile_type="zosmf", validate_schema=False)
        post = SampleSdk(profile)
        result = post.update_post(1, {"title": "foo", "body": "bar", "userId": 10})
        mock_send_request.assert_called()

    @mock.patch("requests.Session.send")
    def test_get_post(self, mock_send_request):
        mock_send_request.return_value = mock.Mock(headers={"Content-Type": "application/json"}, status_code=200)
        profile = ProfileManager().load(profile_type="zosmf", validate_schema=False)
        post = SampleSdk(profile)
        result = post.get_post(1)
        mock_send_request.assert_called()

    @mock.patch("requests.Session.send")
    def test_list_post(self, mock_send_request):
        mock_send_request.return_value = mock.Mock(headers={"Content-Type": "application/json"}, status_code=200)
        profile = ProfileManager().load(profile_type="zosmf", validate_schema=False)
        post = SampleSdk(profile)
        result = post.list_post()
        mock_send_request.assert_called()

    @mock.patch("requests.Session.send")
    def test_delete_post(self, mock_send_request):
        mock_send_request.return_value = mock.Mock(headers={"Content-Type": "application/json"}, status_code=200)
        profile = ProfileManager().load(profile_type="zosmf", validate_schema=False)
        post = SampleSdk(profile)
        result = post.delete_post(1)
        mock_send_request.assert_called()
    

if __name__ == '__main__':
    unittest.main()