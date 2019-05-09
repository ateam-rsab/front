define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('LegalDraftMonitoringDanEvaluasiPerundanganCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', '$document', 'R', '$state',
		function ($rootScope, $scope, ModelItem, DateHelper, $document, r, $state) {
			$scope.now = new Date();
			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.disableUserId = true;
			$scope.disableNamaPeraturan = true;


			ModelItem.get("Hukor/LegalDraftMonitoringDanEvaluasiPerundangan").then(function (data) {
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

			$scope.listPetugas = [{
				"pegawai": {
					"id": "",
					"namaLengkap": "asd"
				}
			}];


		}
	]);
});