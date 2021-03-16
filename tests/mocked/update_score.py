import unittest
import unittest.mock as mock
from unittest.mock import patch
import os
import sys

sys.path.append(os.path.abspath('../../'))
from db_function import get_all_users, update_score
import models

KEY_INPUT = "user_name"
KEY_EXPECTED = "expected"

INITIAL_USERNAME = "test1"
class UpdateUserTest(unittest.TestCase):
    def setUp(self):
        self.success_test_params = [
            {
                KEY_INPUT: {
                    'dic':{
                        'winnerName': 'Manali',
                        'opponentName': 'Yang',
                    }
                },
                KEY_EXPECTED: {
                    'users' : ['Manali', INITIAL_USERNAME, 'Jay', 'Yang'],
                    'score' : [103, 100, 100, 97]
                },
            },    
        ]
        
        initial_person = models.Player(id=1, userName=INITIAL_USERNAME, score=100)
        self.initial_db_mock = [initial_person]
        
    def mocked_db_session_add(self, userName):
        self.initial_db_mock.append(userName)
    
    def mocked_db_session_commit(self):
        pass
    
    def mocked_player_query_all(self):
        return self.initial_db_mock
    
    def test_add_user(self):
        for test in self.success_test_params:
            update_score(test[KEY_INPUT])
            with patch("db_function.DB.session.add", self.mocked_db_session_add):
                with patch("db_function.DB.session.commit", self.mocked_db_session_commit):
                    with patch("models.Player.query") as mocked_query:
                            mocked_query.all = self.mocked_player_query_all
                            actual_result = get_all_users()
                            self.mocked_db_session_add(test[KEY_INPUT])
                            #print('actual_result')
                            #print(actual_result)
                            expected_result = test[KEY_EXPECTED]
                            self.assertEqual(len(actual_result), len(expected_result))
                            self.assertEqual(actual_result, expected_result)
                

if __name__ == '__main__':
    unittest.main()