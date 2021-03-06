// Copyright 2018 The Oppia Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Factory for creating new frontend instances of question
   suggestion domain objects.
 */

require('domain/question/QuestionObjectFactory.ts');

oppia.factory('QuestionSuggestionObjectFactory', [
  'QuestionObjectFactory', function(QuestionObjectFactory) {
    var Suggestion = function(
        suggestionType, suggestionId, targetType, targetId, status, authorName,
        lastUpdated, question, skillId) {
      this.suggestionType = suggestionType;
      this.suggestionId = suggestionId;
      this.targetType = targetType;
      this.targetId = targetId;
      this.status = status;
      this.authorName = authorName;
      this.lastUpdated = lastUpdated;
      this.question = question;
      this.skillId = skillId;
    };

    Suggestion.prototype.getThreadId = function() {
      return this.suggestionId;
    };

    // TODO (ankita240796) Remove the bracket notation once Angular2 gets in.
    /* eslint-disable dot-notation */
    Suggestion['createFromBackendDict'] = function(suggestionBackendDict) {
    /* eslint-enable dot-notation */
      var question = QuestionObjectFactory.createFromBackendDict(
        suggestionBackendDict.change.question_dict);
      return new Suggestion(
        suggestionBackendDict.suggestion_type,
        suggestionBackendDict.suggestion_id, suggestionBackendDict.target_type,
        suggestionBackendDict.target_id, suggestionBackendDict.status,
        suggestionBackendDict.author_name, suggestionBackendDict.last_updated,
        question, suggestionBackendDict.change.skill_id);
    };

    return Suggestion;
  }
]);
