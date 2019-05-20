// Copyright 2014 The Oppia Authors. All Rights Reserved.
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
 * @fileoverview Controllers for the creator dashboard.
 */

// TODO(vojtechjelinek): this block of requires should be removed after we
// introduce webpack for /extensions
require('directives/AngularHtmlBindDirective.ts');
require('directives/MathjaxBindDirective.ts');
require('filters/CamelCaseToHyphensFilter.ts');
require('filters/CapitalizeFilter.ts');
require('filters/ConvertToPlainTextFilter.ts');
require('filters/FormatRtePreviewFilter.ts');
require('filters/NormalizeWhitespaceFilter.ts');
require('filters/NormalizeWhitespacePunctuationAndCaseFilter.ts');
require('filters/ParameterizeRuleDescriptionFilter.ts');
require('filters/RemoveDuplicatesInArrayFilter.ts');
require('filters/ReplaceInputsWithEllipsesFilter.ts');
require('filters/TruncateFilter.ts');
require('filters/TruncateAndCapitalizeFilter.ts');
require('filters/TruncateAtFirstEllipsisFilter.ts');
require('filters/TruncateAtFirstLineFilter.ts');
require('filters/TruncateInputBasedOnInteractionAnswerTypeFilter.ts');
require('filters/UnderscoresToCamelCaseFilter.ts');
require('filters/WrapTextWithEllipsisFilter.ts');
require('components/RatingComputationService.ts');
require('components/forms/ConvertUnicodeWithParamsToHtmlFilter.ts');
require('components/forms/ConvertHtmlToUnicodeFilter.ts');
require('components/forms/ConvertUnicodeToHtmlFilter.ts');
require('components/forms/validators/IsAtLeastFilter.ts');
require('components/forms/validators/IsAtMostFilter.ts');
require('components/forms/validators/IsFloatFilter.ts');
require('components/forms/validators/IsIntegerFilter.ts');
require('components/forms/validators/IsNonemptyFilter.ts');
require('components/forms/ApplyValidationDirective.ts');
require('components/forms/RequireIsFloatDirective.ts');
require('components/forms/schema_editors/SchemaBasedBoolEditorDirective.ts');
require('components/forms/schema_editors/SchemaBasedChoicesEditorDirective.ts');
require('components/forms/schema_editors/SchemaBasedCustomEditorDirective.ts');
require('components/forms/schema_editors/SchemaBasedDictEditorDirective.ts');
require('components/forms/schema_editors/SchemaBasedEditorDirective.ts');
require(
  'components/forms/schema_editors/SchemaBasedExpressionEditorDirective.ts');
require('components/forms/schema_editors/SchemaBasedFloatEditorDirective.ts');
require('components/forms/schema_editors/SchemaBasedHtmlEditorDirective.ts');
require('components/forms/schema_editors/SchemaBasedIntEditorDirective.ts');
require('components/forms/schema_editors/SchemaBasedListEditorDirective.ts');
require('components/forms/schema_editors/SchemaBasedUnicodeEditorDirective.ts');
require('components/forms/schema_viewers/SchemaBasedCustomViewerDirective.ts');
require('components/forms/schema_viewers/SchemaBasedDictViewerDirective.ts');
require('components/forms/schema_viewers/SchemaBasedHtmlViewerDirective.ts');
require('components/forms/schema_viewers/SchemaBasedListViewerDirective.ts');
require(
  'components/forms/schema_viewers/SchemaBasedPrimitiveViewerDirective.ts');
require('components/forms/schema_viewers/SchemaBasedUnicodeViewerDirective.ts');
require('components/forms/schema_viewers/SchemaBasedViewerDirective.ts');
require('components/forms/Select2DropdownDirective.ts');
require('components/forms/ImageUploaderDirective.ts');
require('components/forms/AudioFileUploaderDirective.ts');
require('pages/question_editor/QuestionEditorDirective.ts');
require('components/state/AnswerGroupEditorDirective.ts');
require('components/state/HintEditorDirective.ts');
require('components/state/OutcomeEditorDirective.ts');
require('components/state/OutcomeDestinationEditorDirective.ts');
require('components/state/OutcomeFeedbackEditorDirective.ts');
require('components/state/ResponseHeaderDirective.ts');
require('components/state/RuleEditorDirective.ts');
require('components/state/RuleTypeSelectorDirective.ts');
require('components/state/SolutionEditorDirective.ts');
require('components/state/SolutionExplanationEditorDirective.ts');
require('components/forms/HtmlSelectDirective.ts');
require('services/AutoplayedVideosService.ts');
// ^^^ this block of requires should be removed ^^^

require('components/share/SharingLinksDirective.ts');
require('components/background/BackgroundBannerDirective.ts');
require('components/summary_tile/CollectionSummaryTileDirective.ts');
require('pages/exploration_player/PlayerConstants.ts');
require('pages/exploration_editor/feedback_tab/ThreadTableDirective.ts');

require('components/ExplorationCreationService.ts');
require('components/RatingComputationService.ts');
require('domain/creator_dashboard/CreatorDashboardBackendApiService.ts');
require('domain/question/QuestionObjectFactory.ts');
require('domain/suggestion/SuggestionObjectFactory.ts');
require('domain/suggestion/SuggestionThreadObjectFactory.ts');
require(
  'domain/topics_and_skills_dashboard/' +
  'TopicsAndSkillsDashboardBackendApiService.ts'
);
require('pages/exploration_editor/feedback_tab/ThreadStatusDisplayService.ts');
require('pages/suggestion_editor/ShowSuggestionModalForCreatorViewService.ts');
require('domain/utilities/UrlInterpolationService.ts');
require('services/AlertsService.ts');
require('services/DateTimeFormatService.ts');
require('services/UserService.ts');

oppia.constant('EXPLORATION_DROPDOWN_STATS', {
  OPEN_FEEDBACK: 'open_feedback'
});

oppia.constant('EXPLORATIONS_SORT_BY_KEYS', {
  TITLE: 'title',
  RATING: 'ratings',
  NUM_VIEWS: 'num_views',
  OPEN_FEEDBACK: 'num_open_threads',
  LAST_UPDATED: 'last_updated_msec'
});

oppia.constant('HUMAN_READABLE_EXPLORATIONS_SORT_BY_KEYS', {
  TITLE: 'I18N_DASHBOARD_EXPLORATIONS_SORT_BY_TITLE ',
  RATING: 'I18N_DASHBOARD_EXPLORATIONS_SORT_BY_AVERAGE_RATING',
  NUM_VIEWS: 'I18N_DASHBOARD_EXPLORATIONS_SORT_BY_TOTAL_PLAYS',
  OPEN_FEEDBACK: 'I18N_DASHBOARD_EXPLORATIONS_SORT_BY_OPEN_FEEDBACK',
  LAST_UPDATED: 'I18N_DASHBOARD_EXPLORATIONS_SORT_BY_LAST_UPDATED'
});

oppia.constant('SUBSCRIPTION_SORT_BY_KEYS', {
  USERNAME: 'subscriber_username',
  IMPACT: 'subscriber_impact'
});

oppia.constant('HUMAN_READABLE_SUBSCRIPTION_SORT_BY_KEYS', {
  USERNAME: 'Username',
  IMPACT: 'Impact'
});

oppia.controller('CreatorDashboard', [
  '$http', '$log', '$q', '$rootScope', '$scope', '$uibModal', '$window',
  'AlertsService', 'CreatorDashboardBackendApiService', 'DateTimeFormatService',
  'ExplorationCreationService', 'QuestionObjectFactory',
  'RatingComputationService', 'ShowSuggestionModalForCreatorViewService',
  'SuggestionObjectFactory', 'SuggestionThreadObjectFactory',
  'ThreadStatusDisplayService', 'TopicsAndSkillsDashboardBackendApiService',
  'UrlInterpolationService', 'UserService', 'EXPLORATIONS_SORT_BY_KEYS',
  'EXPLORATION_DROPDOWN_STATS', 'FATAL_ERROR_CODES',
  'HUMAN_READABLE_EXPLORATIONS_SORT_BY_KEYS',
  'HUMAN_READABLE_SUBSCRIPTION_SORT_BY_KEYS', 'SUBSCRIPTION_SORT_BY_KEYS',
  function(
      $http, $log, $q, $rootScope, $scope, $uibModal, $window,
      AlertsService, CreatorDashboardBackendApiService, DateTimeFormatService,
      ExplorationCreationService, QuestionObjectFactory,
      RatingComputationService, ShowSuggestionModalForCreatorViewService,
      SuggestionObjectFactory, SuggestionThreadObjectFactory,
      ThreadStatusDisplayService, TopicsAndSkillsDashboardBackendApiService,
      UrlInterpolationService, UserService, EXPLORATIONS_SORT_BY_KEYS,
      EXPLORATION_DROPDOWN_STATS, FATAL_ERROR_CODES,
      HUMAN_READABLE_EXPLORATIONS_SORT_BY_KEYS,
      HUMAN_READABLE_SUBSCRIPTION_SORT_BY_KEYS, SUBSCRIPTION_SORT_BY_KEYS) {
    var EXP_PUBLISH_TEXTS = {
      defaultText: (
        'This exploration is private. Publish it to receive statistics.'),
      smText: 'Publish the exploration to receive statistics.'
    };

    var userDashboardDisplayPreference =
      constants.ALLOWED_CREATOR_DASHBOARD_DISPLAY_PREFS.CARD;

    $scope.DEFAULT_EMPTY_TITLE = 'Untitled';
    $scope.EXPLORATION_DROPDOWN_STATS = EXPLORATION_DROPDOWN_STATS;
    $scope.EXPLORATIONS_SORT_BY_KEYS = EXPLORATIONS_SORT_BY_KEYS;
    $scope.HUMAN_READABLE_EXPLORATIONS_SORT_BY_KEYS = (
      HUMAN_READABLE_EXPLORATIONS_SORT_BY_KEYS);
    $scope.SUBSCRIPTION_SORT_BY_KEYS = SUBSCRIPTION_SORT_BY_KEYS;
    $scope.HUMAN_READABLE_SUBSCRIPTION_SORT_BY_KEYS = (
      HUMAN_READABLE_SUBSCRIPTION_SORT_BY_KEYS);
    $scope.DEFAULT_TWITTER_SHARE_MESSAGE_DASHBOARD = (
      GLOBALS.DEFAULT_TWITTER_SHARE_MESSAGE_DASHBOARD);

    $scope.canCreateCollections = null;
    $rootScope.loadingMessage = 'Loading';
    var userInfoPromise = UserService.getUserInfoAsync();
    userInfoPromise.then(function(userInfo) {
      $scope.canCreateCollections = userInfo.canCreateCollections();
    });

    var dashboardDataPromise = (
      CreatorDashboardBackendApiService.fetchDashboardData());
    dashboardDataPromise.then(
      function(response) {
        var responseData = response.data;
        $scope.currentSortType = EXPLORATIONS_SORT_BY_KEYS.OPEN_FEEDBACK;
        $scope.currentSubscribersSortType = SUBSCRIPTION_SORT_BY_KEYS.USERNAME;
        $scope.isCurrentSortDescending = true;
        $scope.isCurrentSubscriptionSortDescending = true;
        $scope.explorationsList = responseData.explorations_list;
        $scope.collectionsList = responseData.collections_list;
        $scope.subscribersList = responseData.subscribers_list;
        $scope.dashboardStats = responseData.dashboard_stats;
        $scope.lastWeekStats = responseData.last_week_stats;
        $scope.myExplorationsView = responseData.display_preference;
        $scope.topicSummaries = responseData.topic_summary_dicts;
        var numberOfCreatedSuggestions = (
          responseData.threads_for_created_suggestions_list.length);
        var numberOfSuggestionsToReview = (
          responseData.threads_for_suggestions_to_review_list.length);
        $scope.mySuggestionsList = [];
        for (var i = 0; i < numberOfCreatedSuggestions; i++) {
          if (responseData.created_suggestions_list.length !==
              numberOfCreatedSuggestions) {
            $log.error('Number of suggestions does not match number of ' +
                       'suggestion threads');
          }
          for (var j = 0; j < numberOfCreatedSuggestions; j++) {
            var suggestion = SuggestionObjectFactory.createFromBackendDict(
              responseData.created_suggestions_list[j]);
            var threadDict = (
              responseData.threads_for_created_suggestions_list[i]);
            if (threadDict.thread_id === suggestion.getThreadId()) {
              var suggestionThread = (
                SuggestionThreadObjectFactory.createFromBackendDicts(
                  threadDict, responseData.created_suggestions_list[j]));
              $scope.mySuggestionsList.push(suggestionThread);
            }
          }
        }
        $scope.suggestionsToReviewList = [];
        for (var i = 0; i < numberOfSuggestionsToReview; i++) {
          if (responseData.suggestions_to_review_list.length !==
              numberOfSuggestionsToReview) {
            $log.error('Number of suggestions does not match number of ' +
                       'suggestion threads');
          }
          for (var j = 0; j < numberOfSuggestionsToReview; j++) {
            var suggestion = SuggestionObjectFactory.createFromBackendDict(
              responseData.suggestions_to_review_list[j]);
            var threadDict = (
              responseData.threads_for_suggestions_to_review_list[i]);
            if (threadDict.thread_id === suggestion.getThreadId()) {
              var suggestionThread = (
                SuggestionThreadObjectFactory.createFromBackendDicts(
                  threadDict, responseData.suggestions_to_review_list[j]));
              $scope.suggestionsToReviewList.push(suggestionThread);
            }
          }
        }

        if ($scope.dashboardStats && $scope.lastWeekStats) {
          $scope.relativeChangeInTotalPlays = (
            $scope.dashboardStats.total_plays - $scope.lastWeekStats.total_plays
          );
        }

        if ($scope.explorationsList.length === 0 &&
          $scope.collectionsList.length > 0) {
          $scope.activeTab = 'myCollections';
        } else if ($scope.explorationsList.length === 0 && (
          $scope.mySuggestionsList.length > 0 ||
          $scope.suggestionsToReviewList.length > 0)) {
          $scope.activeTab = 'suggestions';
        } else {
          $scope.activeTab = 'myExplorations';
        }
      },
      function(errorResponse) {
        if (FATAL_ERROR_CODES.indexOf(errorResponse.status) !== -1) {
          AlertsService.addWarning('Failed to get dashboard data');
        }
      }
    );

    $q.all([userInfoPromise, dashboardDataPromise]).then(function() {
      $rootScope.loadingMessage = '';
    });

    $scope.getAverageRating = RatingComputationService.computeAverageRating;
    $scope.createNewExploration = (
      ExplorationCreationService.createNewExploration);
    $scope.getLocaleAbbreviatedDatetimeString = (
      DateTimeFormatService.getLocaleAbbreviatedDatetimeString);
    $scope.enableQuestionSuggestions = constants.ENABLE_NEW_STRUCTURE_PLAYERS;
    $scope.getHumanReadableStatus = (
      ThreadStatusDisplayService.getHumanReadableStatus);

    $scope.emptyDashboardImgUrl = UrlInterpolationService.getStaticImageUrl(
      '/general/empty_dashboard.svg');
    $scope.canReviewActiveThread = null;

    $scope.setActiveTab = function(newActiveTabName) {
      $scope.activeTab = newActiveTabName;
    };

    $scope.getExplorationUrl = function(explorationId) {
      return '/create/' + explorationId;
    };

    $scope.getCollectionUrl = function(collectionId) {
      return '/collection_editor/create/' + collectionId;
    };

    $scope.setMyExplorationsView = function(newViewType) {
      $http.post('/creatordashboardhandler/data', {
        display_preference: newViewType,
      }).then(function() {
        $scope.myExplorationsView = newViewType;
      });
      userDashboardDisplayPreference = newViewType;
    };

    $scope.checkMobileView = function() {
      return ($window.innerWidth < 500);
    };

    $scope.showUsernamePopover = function(subscriberUsername) {
      // The popover on the subscription card is only shown if the length of
      // the subscriber username is greater than 10 and the user hovers over
      // the truncated username.
      if (subscriberUsername.length > 10) {
        return 'mouseenter';
      } else {
        return 'none';
      }
    };

    $scope.updatesGivenScreenWidth = function() {
      if ($scope.checkMobileView()) {
        // For mobile users, the view of the creators
        // exploration list is shown only in
        // the card view and can't be switched to list view.
        $scope.myExplorationsView = (
          constants.ALLOWED_CREATOR_DASHBOARD_DISPLAY_PREFS.CARD);
        $scope.publishText = EXP_PUBLISH_TEXTS.smText;
      } else {
        // For computer users or users operating in larger screen size
        // the creator exploration list will come back to its previously
        // selected view (card or list) when resized from mobile view
        $scope.myExplorationsView = userDashboardDisplayPreference;
        $scope.publishText = EXP_PUBLISH_TEXTS.defaultText;
      }
    };

    $scope.updatesGivenScreenWidth();
    angular.element($window).bind('resize', function() {
      $scope.updatesGivenScreenWidth();
    });

    $scope.setExplorationsSortingOptions = function(sortType) {
      if (sortType === $scope.currentSortType) {
        $scope.isCurrentSortDescending = !$scope.isCurrentSortDescending;
      } else {
        $scope.currentSortType = sortType;
      }
    };

    $scope.setSubscriptionSortingOptions = function(sortType) {
      if (sortType === $scope.currentSubscribersSortType) {
        $scope.isCurrentSubscriptionSortDescending = (
          !$scope.isCurrentSubscriptionSortDescending);
      } else {
        $scope.currentSubscribersSortType = sortType;
      }
    };

    $scope.sortSubscriptionFunction = function(entity) {
      // This function is passed as a custom comparator function to `orderBy`,
      // so that special cases can be handled while sorting subscriptions.
      var value = entity[$scope.currentSubscribersSortType];
      if ($scope.currentSubscribersSortType ===
          SUBSCRIPTION_SORT_BY_KEYS.IMPACT) {
        value = (value || 0);
      }
      return value;
    };

    var _fetchMessages = function(threadId) {
      $http.get('/threadhandler/' + threadId).then(function(response) {
        var allThreads = $scope.mySuggestionsList.concat(
          $scope.suggestionsToReviewList);
        for (var i = 0; i < allThreads.length; i++) {
          if (allThreads[i].threadId === threadId) {
            allThreads[i].setMessages(response.data.messages);
            break;
          }
        }
      });
    };

    $scope.clearActiveThread = function() {
      $scope.activeThread = null;
    };

    $scope.setActiveThread = function(threadId) {
      _fetchMessages(threadId);
      for (var i = 0; i < $scope.mySuggestionsList.length; i++) {
        if ($scope.mySuggestionsList[i].threadId === threadId) {
          $scope.activeThread = $scope.mySuggestionsList[i];
          $scope.canReviewActiveThread = false;
          break;
        }
      }
      if (!$scope.activeThread) {
        for (var i = 0; i < $scope.suggestionsToReviewList.length; i++) {
          if ($scope.suggestionsToReviewList[i].threadId === threadId) {
            $scope.activeThread = $scope.suggestionsToReviewList[i];
            $scope.canReviewActiveThread = true;
            break;
          }
        }
      }
    };

    $scope.showSuggestionModal = function() {
      ShowSuggestionModalForCreatorViewService.showSuggestionModal(
        $scope.activeThread.suggestion.suggestionType,
        {
          activeThread: $scope.activeThread,
          suggestionsToReviewList: $scope.suggestionsToReviewList,
          clearActiveThread: $scope.clearActiveThread,
          canReviewActiveThread: $scope.canReviewActiveThread
        }
      );
    };

    $scope.sortByFunction = function(entity) {
      // This function is passed as a custom comparator function to `orderBy`,
      // so that special cases can be handled while sorting explorations.
      var value = entity[$scope.currentSortType];
      if (entity.status === 'private') {
        if ($scope.currentSortType === EXPLORATIONS_SORT_BY_KEYS.TITLE) {
          value = (value || $scope.DEFAULT_EMPTY_TITLE);
        } else if ($scope.currentSortType !==
                   EXPLORATIONS_SORT_BY_KEYS.LAST_UPDATED) {
          value = 0;
        }
      } else if ($scope.currentSortType === EXPLORATIONS_SORT_BY_KEYS.RATING) {
        var averageRating = $scope.getAverageRating(value);
        value = (averageRating || 0);
      }
      return value;
    };

    $scope.getCompleteThumbnailIconUrl = function(iconUrl) {
      return UrlInterpolationService.getStaticImageUrl(iconUrl);
    };

    $scope.showCreateQuestionModal = function() {
      var question = QuestionObjectFactory.createDefaultQuestion();
      var topicSummaries = $scope.topicSummaries;
      $uibModal.open({
        templateUrl: UrlInterpolationService.getDirectiveTemplateUrl(
          '/pages/creator_dashboard/create_question_modal_directive.html'),
        backdrop: 'static',
        keyboard: false,
        size: 'lg',
        resolve: {},
        controller: [
          '$scope', '$uibModalInstance', function(
              $scope, $uibModalInstance) {
            $scope.question = question;
            $scope.topicId = null;
            $scope.topicSummaries = topicSummaries;
            $scope.misconceptions = [];
            $scope.errorMessage = null;

            $scope.isValidQuestion = function() {
              var errorMessage = $scope.question.validate([]);
              if (!$scope.topicId) {
                $scope.errorMessage = 'Please choose a topic before submitting';
              } else if (errorMessage === false) {
                $scope.errorMessage = null;
              } else {
                $scope.errorMessage = errorMessage;
              }
              return ($scope.question.validate([]) === false);
            };

            $scope.dismissModal = function() {
              $uibModalInstance.dismiss();
            };

            $scope.createQuestion = function() {
              var errorMessage = question.validate([]);
              if (!$scope.topicId) {
                $scope.errorMessage = 'Please choose a topic before submitting';
              } else if (errorMessage === false) {
                $scope.errorMessage = null;
                $uibModalInstance.close({
                  question: question,
                  topicId: $scope.topicId
                });
              } else {
                $scope.errorMessage = errorMessage;
              }
            };
          }
        ]
      }).result.then(function(result) {
        var topicVersion = null;
        for (var i = 0; i < topicSummaries.length; i++) {
          if (topicSummaries[i].id === result.topicId) {
            topicVersion = topicSummaries[i].version;
            break;
          }
        }
        if (!topicVersion) {
          $log.error('Unable to match topic id selected with topic choices.');
        }
        $http.post('/suggestionhandler/', {
          suggestion_type: 'add_question',
          target_type: 'topic',
          target_id: result.topicId,
          target_version_at_submission: topicVersion,
          change: {
            cmd: 'create_new_fully_specified_question',
            question_dict: result.question.toBackendDict(true),
            skill_id: null
          },
          description: null
        });
      }, function() {
        $log.error('Error while submitting question');
      });
    };
  }
]);
