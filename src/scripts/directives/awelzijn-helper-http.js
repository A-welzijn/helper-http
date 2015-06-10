'use strict';
(function(module) {
  try {
    module = angular.module('awelzijn.helper-http');
  } catch (e) {
    module = angular.module('awelzijn.helper-http', ['$http', '$q', '$rootScope', 'aWelzijnBase64Encoding', 'aWelzijnNotificationService']);
  }
  module.factory('awelzijnHelperHttp', [function ($http, $q, $rootScope, Base64, notificationService) {
          function createServiceCall(httpVerb, requesturl, options, data) {
			var deferred = $q.defer();

			var httpConfig = { method: httpVerb, url: requesturl };
			if (data) httpConfig.data = data;
			if (options.params) httpConfig.params = options.params;
			if (options.transform) httpConfig.transformResponse = appendTransform($http.defaults.transformResponse, function (value) { return options.transform(value); });

			$http(httpConfig).
				success(function (data, status, headers, config, statusText) {
					deferred.resolve(data);
				}).
				error(function (data, status, headers, config, statusText) {
					notificationService.createErrorMessages(data, status, requesturl);
					deferred.reject();
				});
			return deferred.promise;
		};

		function appendTransform(defaults, transform) {
			defaults = angular.isArray(defaults) ? defaults : [defaults];
			return defaults.concat(transform);
		}

		function _createServiceCallGET(requesturl, options) {
			return createServiceCall('GET', requesturl, options || {});
		};

		function _createServiceCallPOST(requesturl, data, options) {
			return createServiceCall('POST', requesturl, options || {}, data);
		};

		function _createServiceCallPUT(requesturl, data, options) {
			return createServiceCall('PUT', requesturl, options || {}, data);
		};

		function _createServiceCallDELETE(requesturl, options) {
			return createServiceCall('DELETE', requesturl, options || {});
		};

		function _uploadFile(requesturl, files) {
			var formData = new FormData();
			for (var i = 0; i < files.length; i++) {
				formData.append("bijlage" + i, files[i]);
			}
			var httpRequest = new XMLHttpRequest();
			httpRequest.open("POST", requesturl);
			httpRequest.send(formData);
		}

		return {
			get: _createServiceCallGET,
			post: _createServiceCallPOST,
			put: _createServiceCallPUT,
			delete: _createServiceCallDELETE,
			uploadFile: _uploadFile
		};
  }]);
})();
