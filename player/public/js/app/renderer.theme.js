angular.module('genie-canvas.theme',[])
.directive('menu', function() {
      return {
        restrict: 'E',
        templateUrl: 'templates/menu.html'
    }
})
.directive('navigationButtons', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/navigation-buttons.html'
    }
})
.directive('creditsPopup', function() {
    return {
        restrict: 'E',
        templateUrl: 'templates/credits.html'
    }
})
.controller('ContentHomeCtrl', function($scope, $rootScope, $http, $cordovaFile, $cordovaToast, $ionicPopover, $state, ContentService, $stateParams) {
    $rootScope.showMessage = false;
    if (GlobalContext.config.appInfo && GlobalContext.config.appInfo.identifier) {
        $scope.playContent = function(content) {
            $state.go('playContent', {
                'itemId': content.identifier
            });
        };

        $scope.updateContent = function(content) {
            ContentService.getContent(content.identifier)
                .then(function(data) {
                    $scope.$apply(function() {
                        $scope.item = data;
                    });
                    $rootScope.stories = [data];
                })
                .catch(function(err) {
                    contentNotAvailable();
                });
        }

        $scope.startGenie = function() {
            console.log("Start Genie.");
            exitApp();
        };

        $scope.updateContent(GlobalContext.config.appInfo);
        $rootScope.$on('show-message', function(event, data) {
            if (data.message && data.message != '') {
                $rootScope.showMessage = true;
                $rootScope.message = data.message;
                $rootScope.$apply();
            }
            if (data.timeout) {
                setTimeout(function() {
                    $rootScope.showMessage = false;
                    $rootScope.$apply();
                    if (data.callback) {
                        data.callback();
                    }
                }, data.timeout);
            }
        });

        $rootScope.$on('process-complete', function(event, result) {
            $scope.$apply(function() {
                $scope.item = result.data;
            });
        });
    } else {
        alert('Sorry. Could not find the content.');
        startApp();
    }
})
.controller('EndPageCtrl', function($scope, $rootScope, $state, ContentService, $stateParams) {

    $scope.updateContent(GlobalContext.config.appInfo);
    $rootScope.$on('show-message', function(event, data) {
        if (data.message && data.message != '') {
            $rootScope.showMessage = true;
            $rootScope.message = data.message;
            $rootScope.$apply();
        }
        if (data.timeout) {
            setTimeout(function() {
                $rootScope.showMessage = false;
                $rootScope.$apply();
                if (data.callback) {
                    data.callback();
                }
            }, data.timeout);
        }
    });

    $rootScope.$on('process-complete', function(event, result) {
        $scope.$apply(function() {
            $scope.item = result.data;
        });
    });
 
})
.controller('OverlayCtrl', function($scope, $rootScope){
    $rootScope.hasPrevious = false;
    $rootScope.hasNext = false;
    $scope.showCreditPopup = false;

    $scope.openMenu = function(){
        //display a layer to disable clicking and scrolling on the gameArea while menu is shown
        
        if(jQuery('.menu-overlay').css('display') == "block"){
            $scope.hideMenu();
            return;
        }

        jQuery('.menu-overlay').css('display', 'block');
        jQuery(".gc-menu").show();
        jQuery(".gc-menu").animate({"marginLeft": ["0%", 'easeOutExpo']}, 700, function(){
        });

        console.log("Open Menu..");
        jQuery('.menu-overlay').click(function(){
            jQuery(".gc-menu").animate({"marginLeft": ["-30%", 'easeOutExpo']}, 700, function(){

            });
            jQuery('.menu-overlay').css('display', 'none');
        });
    }

    $scope.hideMenu = function(){
        jQuery('.menu-overlay').css('display', 'none');
        jQuery(".gc-menu").animate({"marginLeft": ["-30%", 'easeOutExpo']}, 700, function(){
        });
        jQuery('.menu-overlay').css('display', 'none');
    }

    $scope.showCreditPop = function(){
        $scope.showCreditPopup = true;
    }

    $scope.hideCreditPop = function(){
       $scope.showCreditPopup = false;
    }

    $scope.navigate = function(to) {
        var navigation = [];
        TelemetryService.interact("TOUCH", to, null, {stageId : Renderer.theme._currentStage});
        if (!_.isEmpty(Renderer.theme._currentScene._data.param)) {
            navigation = (_.isArray(Renderer.theme._currentScene._data.param)) ? Renderer.theme._currentScene._data.param : [Renderer.theme._currentScene._data.param];
            var direction = _.findWhere(navigation, {name: to});
            var action = {
                    "asset": Renderer.theme._id,
                    "command": "transitionTo",
                    "duration": "100",
                    "ease": "linear",
                    "effect": "fadeIn",
                    "type": "command",
                    "value": direction.value
                };
            if ("previous" == to) {
                action.transitionType = "previous";
            }
            Renderer.theme.transitionTo(action);
            $rootScope.hasPrevious = false;
            $rootScope.hasNext = false;
        }
    };
});