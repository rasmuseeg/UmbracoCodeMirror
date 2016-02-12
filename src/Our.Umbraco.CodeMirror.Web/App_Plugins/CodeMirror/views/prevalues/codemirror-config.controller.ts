﻿module CodeMirror {
    export interface IPrevalueConfiguration extends EditorConfiguration {
        indentWithTabs: boolean; // Wether to indent with tabs
        lineWrapping: boolean; // break long lines
        tabSize: number; // indent size
        lineNumbers: boolean; // wether to show line numbers
        viewportMargin: number;
        mode: IModeInfo;

        hideFilename: boolean; // hides the filename input.
        hideActions: boolean; // hides the actions
    }

    interface IConfigController {

    }

    interface IConfigScope {
        model: {
            value: IPrevalueConfiguration;
        }

        modes: CodeMirror.IModeInfo[];
        viewportMargin: number;
        viewportMarginChange: () => void;

        mode: string;
        modeChange: () => void;
    }

    class ConfigController implements IConfigController {
        static $inject: string[] = ["$scope", "$timeout"];

        constructor(private $scope: IConfigScope) {
            if (typeof $scope.model.value === 'string')
                $scope.model.value = JSON.parse(<any>$scope.model.value);

            if (angular.isObject($scope.model.value) == false)
                $scope.model.value = <IPrevalueConfiguration>{};

            $scope.modes = CodeMirror.modeInfo;

            $scope.model.value = angular.extend(<IPrevalueConfiguration>{
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
            $scope.viewportMarginChange = () => {
                if ($scope.viewportMargin == 0)
                    $scope.model.value.viewportMargin = Infinity;
                else
                    $scope.model.value.viewportMargin = $scope.viewportMargin;
            }

            if (typeof $scope.model.value.mode === 'string')
                $scope.model.value.mode = CodeMirror.findModeByName(<any>$scope.model.value.mode);

            // Changing mode
            // We are using mime as identity
            //if ($scope.model.value.mode)
            //    $scope.mode = CodeMirror.findModeByName($scope.model.value.mode.name).mime;
            //$scope.modeChange = () => {
            //    $scope.model.value.mode = CodeMirror.findModeByMIME($scope.model.);
            //};
        }
    }

    angular.module("umbraco").controller("CodeMirror.PrevalueConfigController", ConfigController);
}