from unittest import TestCase, mock
from zowe.core_for_zowe_sdk import ProfileManager

import sys
import os

current_dir = os.path.dirname(os.path.abspath(__file__))

# Add the parent directory of B to sys.path
sys.path.append(os.path.join(current_dir, "../../src"))

from main import SampleSdk

class TestSampleSDK(TestCase):

    @mock.patch("requests.Session.send")
    def test_create_post(self, mock_send_request):
        mock_send_request.return_value = mock.Mock(headers={"Content-Type": "application/json"}, status_code=201)
        profile = ProfileManager().load(profile_type="zosmf", validate_schema=False)
        my_console = SampleSdk(profile)
        result = my_console.create_post({"title": "foo", "body": "bar", "userId": 10})