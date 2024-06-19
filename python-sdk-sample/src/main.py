"""
This program and the accompanying materials are made available and may be used, at your option, under either:
* Eclipse Public License v2.0, available at https://www.eclipse.org/legal/epl-v20.html, OR
* Apache License, version 2.0, available at http://www.apache.org/licenses/LICENSE-2.0

SPDX-License-Identifier: EPL-2.0 OR Apache-2.0

Copyright Contributors to the Zowe Project.
"""

from zowe.core_for_zowe_sdk import SdkApi


class SampleSdk(SdkApi):
    """
    Class used to represent the sample API.

    ...

    Attributes
    ----------
    connection
        Connection object
    """

    def __init__(self, connection):
        """
        Construct a sample SDK object.

        Parameters
        ----------
        connection
            The connection object
        """
        super().__init__(connection, "https://jsonplaceholder.typicode.com", logger_name=__name__)
        self.request_endpoint = self.default_service_url

    def create_post(self, post):
        custom_args = self._create_custom_request_arguments()
        custom_args["json"] = post
        custom_args["url"] = f"{self.request_endpoint}/posts"
        response_json = self.request_handler.perform_request("POST", custom_args, expected_code=[201])
        return response_json

    def update_post(self, id, post):
        custom_args = self._create_custom_request_arguments()
        custom_args["json"] = post
        custom_args["url"] = f"{self.request_endpoint}/posts/{id}"
        response_json = self.request_handler.perform_request("PUT", custom_args, expected_code=[200])
        return response_json

    def get_post(self, id):
        custom_args = self._create_custom_request_arguments()
        custom_args["url"] = f"{self.request_endpoint}/posts/{id}"
        response_json = self.request_handler.perform_request("GET", custom_args, expected_code=[200])
        return response_json

    def list_post(self):
        custom_args = self._create_custom_request_arguments()
        custom_args["url"] = f"{self.request_endpoint}/posts"
        response_json = self.request_handler.perform_request("GET", custom_args, expected_code=[200])
        self.logger.info("Listed all posts")
        return response_json

    def delete_post(self, id):
        custom_args = self._create_custom_request_arguments()
        custom_args["url"] = f"{self.request_endpoint}/posts/{id}"
        response_json = self.request_handler.perform_request("DELETE", custom_args, expected_code=[200])
        return response_json
