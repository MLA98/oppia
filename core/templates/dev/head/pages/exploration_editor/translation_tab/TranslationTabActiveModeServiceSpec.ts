// Copyright 2019 The Oppia Authors. All Rights Reserved.
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
 * @fileoverview Unit test for the Translation tab active mode service.
 */

require(
  'pages/exploration_editor/translation_tab/' +
  'TranslationTabActiveModeService.ts'
);

describe('Translation tab active mode service', function() {
  beforeEach(angular.mock.module('oppia'));
  var ttams = null;

  beforeEach(angular.mock.inject(function($injector) {
    ttams = $injector.get('TranslationTabActiveModeService');
  }));

  it('should correctly activate translation mode', function() {
    expect(ttams.isTranslationModeActive()).toBeFalsy();
    ttams.activateTranslationMode();
    expect(ttams.isTranslationModeActive()).toBeTruthy();
  });

  it('should correctly activate voiceover mode', function() {
    expect(ttams.isVoiceoverModeActive()).toBeFalsy();
    ttams.activateVoiceoverMode();
    expect(ttams.isVoiceoverModeActive()).toBeTruthy();
  });

  it('should correctly report the active mode', function() {
    expect(ttams.isVoiceoverModeActive()).toBeFalsy();
    expect(ttams.isTranslationModeActive()).toBeFalsy();

    ttams.activateVoiceoverMode();

    expect(ttams.isVoiceoverModeActive()).toBeTruthy();
    expect(ttams.isTranslationModeActive()).toBeFalsy();

    ttams.activateTranslationMode();

    expect(ttams.isVoiceoverModeActive()).toBeFalsy();
    expect(ttams.isTranslationModeActive()).toBeTruthy();
  });
});
