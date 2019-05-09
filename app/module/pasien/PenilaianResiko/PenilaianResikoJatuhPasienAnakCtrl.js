define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PenilaianResikoJatuhPasienAnakCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'FindPasien', '$state',
		function($rootScope, $scope, ModelItem, dateHelper, findPasien, $state) {
			$scope.cek = "PenilaianResikoJatuhPasienCtrl";
			$scope.dataVOloaded = true;

			ModelItem.getDataDummyGeneric("Pasien/PenilaianResiko/DataPenilaianResikoAnak", false).then(function(data) {
                $scope.listDataPenilaianResiko = data;

                for(var i = 0; i < $scope.listDataPenilaianResiko.length; i++)
                {
                	if(i == 0)
                	{
                		$scope.listDataPenilaianResiko[i].statVisible = true;
                	}
                	else
                	{
                		$scope.listDataPenilaianResiko[i].statVisible = false;
                	}
                	
                }

                
			});

			$scope.item = {};

			ModelItem.get("Pasien/PenilaianResikoJatuhPasienAnak").then(function(data) {
                $scope.item = data;
                /*findPasien.getDataPenilaianResikoJatuhPasienAnak($state.params.noCM, $state.params.tanggal).then(function(e) {
                    $scope.item = e.data;
                    if (e.data.status === false)
                        $scope.isShowForm = true;
                });*/
                $rootScope.dataVOloaded = true;
                $scope.item.penilaianRisikoAnak = [];
            }, function errorCallBack(err) {});

			

			$scope.totalScore = 0; 
			$scope.tanggalHariIni = dateHelper.getTanggalFormatted(new Date());
			$scope.keteranganScore = "";
			$scope.arrTempScore = [];
			$scope.isFirstPage = true;
			$scope.isLastPage = false;
			$scope.isInfo = false;
			$scope.isEditMode = false;

			$scope.chooseKriteria = function(data, child)
			{
				if($scope.isEditMode)
				{
					var currentData = _.find($scope.item.penilaianRisikoAnak, function(arr){ return arr.parameter.id == data.id; });
					var indexArray = _.indexOf($scope.item.penilaianRisikoAnak, currentData);

					$scope.item.penilaianRisikoAnak[indexArray].parameter = data;
					$scope.item.penilaianRisikoAnak[indexArray].kriteria = child;

					var indexArrayBase = _.indexOf($scope.listDataPenilaianResiko, data);
					
					$scope.isLastPage = true;
					$scope.isInfo = true;
					$scope.listDataPenilaianResiko[indexArrayBase].statVisible = false;

					$scope.isEditMode = false;
				}
				else
				{
					var dataPenilaianRisiko = {
						"parameter": data,
						"kriteria": child
					}

					$scope.item.penilaianRisikoAnak.push(dataPenilaianRisiko);

					$scope.arrTempScore.push(child.score);

					$scope.totalScore += child.score;

					var indexArray = _.indexOf($scope.listDataPenilaianResiko, data);

					if(indexArray != $scope.listDataPenilaianResiko.length-1)
					{
						$scope.listDataPenilaianResiko[indexArray].statVisible = false;
						$scope.listDataPenilaianResiko[indexArray+1].statVisible = true;

						if(indexArray == 0)
						{
							$scope.isFirstPage = false;
						}
					}
					else
					{
						$scope.isLastPage = true;
						$scope.isInfo = true;

						$scope.listDataPenilaianResiko[indexArray].statVisible = false;
						
						if($scope.totalScore >= 12)
						{
							$scope.keteranganScore = ModelItem.translate("Risiko Tinggi untuk jatuh", 1);
						}
						else
						{
							$scope.keteranganScore = ModelItem.translate("Risiko Rendah untuk jatuh", 1);
						}
					}
				}
			}

			$scope.backToPenilaian = function()
			{
				$scope.isEditMode = false;
				$scope.isLastPage = false;
				$scope.isInfo = false;
				$scope.listDataPenilaianResiko[$scope.listDataPenilaianResiko.length-1].statVisible = true;
				$scope.totalScore -= $scope.arrTempScore[$scope.arrTempScore.length-1];

				$scope.item.penilaianRisikoAnak.pop();
				$scope.arrTempScore.pop();

			}

			$scope.pagePrev = function(data)
			{
				$scope.totalScore -= $scope.arrTempScore[$scope.arrTempScore.length-1];

				$scope.item.penilaianRisikoAnak.pop();
				$scope.arrTempScore.pop();

				var indexArray = _.indexOf($scope.listDataPenilaianResiko, data);

				$scope.listDataPenilaianResiko[indexArray].statVisible = false;
				$scope.listDataPenilaianResiko[indexArray-1].statVisible = true;

				if(indexArray == 1)
				{
					$scope.isFirstPage = true;
				}
			}

			$scope.toTotalScore = function()
			{
				$scope.isInfo = false;
			}

			$scope.getEditData = function(data)
			{
				$scope.isEditMode = true;

				var currentData = _.find($scope.listDataPenilaianResiko, function(arr){ return arr.id == data.parameter.id; });
				var indexArray = _.indexOf($scope.listDataPenilaianResiko, currentData);

				$scope.isLastPage = false;
				$scope.isInfo = false;
				$scope.listDataPenilaianResiko[indexArray].statVisible = true;
			}

			$scope.Save = function()
			{
				//remove atribut yang ga ke pake
				for(var i=0; i < $scope.item.penilaianRisikoAnak.length; i++)
				{
					delete $scope.item.penilaianRisikoAnak[i].parameter.children;
					delete $scope.item.penilaianRisikoAnak[i].parameter.statVisible;
					delete $scope.item.penilaianRisikoAnak[i].parameter.score;
				}

				$scope.item.totalScore = $scope.totalScore;
				$scope.item.keteranganScore = $scope.keteranganScore;
				console.log(JSON.stringify($scope.item));
            	
			}

		}
	]);
});