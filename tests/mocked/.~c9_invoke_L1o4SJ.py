import unittest
from get_tracks import get_artist_url
import unittest.mock as mock
from unittest.mock import patch
import os
import sys

sys.path.append(os.path.abspath('../../'))
from db_function import add_user
import models

INPUT = "input"
EXPECTED_OUTPUT = "expected"

INITIAL_USERNAME = "test1"
class UpdateUserTest(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                INPUT: 'Akshit'
                EXPECTED_OUTPUT: [INITIAL_USERNAME, 'Akshit']
            }    
        ]
 
        initial_person = models.Player(userName=INITIAL_USERNAME, score=100)
        
        self.initial_db_mock = [initial_person]
    def test_add_user(self):
        for test in self.success_test_params:
            with patch("db_function.DB.session.add")
            w
            actual_result = add_user(test[INPUT])
            expected_result = test[EXPECTED_OUTPUT]
            
            self.assertEqual(len(actual_result), len(expected_result))
            self.assertEqual(actual_result[1], expected_result[1])
                

if __name__ == '__main__':
    unittest.main()