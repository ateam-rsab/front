define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('LegalDraftPerancanganPerundanganCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R', '$state','ManageSarpras',
		function ($rootScope, $scope, ModelItem, DateHelper, $document, r, $state,ManageSarpras) {
			$scope.now = new Date();
			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.disableIdUser = true; 
			ModelItem.get("Hukor/LegalDraftPerancanganPerundangan").then(function (data) {
				$scope.item = data;
				$scope.item.userId = ModelItem.getPegawai().namaLengkap;
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) { });

			$scope.arrPegawai = [{
				"pegawai": {
					"id": "",
					"namaLengkap": ""
				}
			}];

            $scope.addPegawai = function () {
				var newData = {
					"pegawai": {
						"id": "",
						"namaLengkap": ""
					}
				}
				$scope.arrPegawai.push(newData);
            }

			$scope.removePegawai = function (data) {
				
				$scope.arrPegawai.splice(data,1);
            }
            
			ManageSarpras.getListData("Pegawai&select=id,namaLengkap").then(function (dat) {
				$scope.listPenanggungJawab = dat.data;
			});
			
			
		}
	]);
});