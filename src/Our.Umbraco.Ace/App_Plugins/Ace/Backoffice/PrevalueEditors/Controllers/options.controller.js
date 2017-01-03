var OurCodeMirror;
(function (OurCodeMirror) {
    var PrevalueEditors;
    (function (PrevalueEditors) {
        var OptionsController = (function () {
            function OptionsController($scope) {
                this.$scope = $scope;
                if (typeof $scope.model.value === 'string')
                    $scope.model.value = JSON.parse($scope.model.value);
                if (angular.isObject($scope.model.value) == false)
                    $scope.model.value = {};
                $scope.modes = CodeMirror.modeInfo;
                $scope.model.value = angular.extend({
                    mode: null,
                    lineNumbers: true,
                    lineWrapping: false,
                    indentWithTabs: false,
                    hideActions: false,
                    hideFilename: false,
                    viewportMargin: 10,
                    tabSize: 4
                }, $scope.model.value);
                // Viewport
                $scope.viewportMargin = $scope.model.value.viewportMargin;
                $scope.viewportMarginChange = function () {
                    if ($scope.viewportMargin == 0)
                        $scope.model.value.viewportMargin = Infinity;
                    else
                        $scope.model.value.viewportMargin = $scope.viewportMargin;
                };
                if (typeof $scope.model.value.mode === 'string')
                    $scope.model.value.mode = CodeMirror.findModeByName($scope.model.value.mode);
                // Changing mode
                // We are using mime as identity
                //if ($scope.model.value.mode)
                //    $scope.mode = CodeMirror.findModeByName($scope.model.value.mode.name).mime;
                //$scope.modeChange = () => {
                //    $scope.model.value.mode = CodeMirror.findModeByMIME($scope.model.);
                //};
            }
            OptionsController.$inject = ["$scope", "$timeout"];
            return OptionsController;
        }());
        PrevalueEditors.OptionsController = OptionsController;
        angular.module("umbraco").controller("OurCodeMirror.PrevalueEditors.OptionsController", OptionsController);
    })(PrevalueEditors = OurCodeMirror.PrevalueEditors || (OurCodeMirror.PrevalueEditors = {}));
})(OurCodeMirror || (OurCodeMirror = {}));