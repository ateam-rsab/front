define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PenilaianResikoJatuhPasienDewasaCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'FindPasien', '$state',
		function($rootScope, $scope, ModelItem, dateHelper, findPasien, $state) {
			$scope.cek = "PenilaianResikoJatuhPasienCtrl";
			$scope.dataVOloaded = true;

			ModelItem.getDataDummyGeneric("Pasien/PenilaianResiko/DataPenilaianResikoDewasa", false).then(function(data) {
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
			ModelItem.get("Pasien/PenilaianResikoJatuhPasienDewasa").then(function(data) {
                $scope.item = data;
                /*findPasien.getDataPenilaianResikoJatuhPasienDewasa($state.params.noCM, $state.params.tanggal).then(function(e) {
                    $scope.item = e.data;
                    if (e.data.status === false)
                        $scope.isShowForm = true;
                });*/
                $rootScope.dataVOloaded = true;
                $scope.item.penilaianRisikoDewasa = [];
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
					var currentData = _.find($scope.item.penilaianRisikoDewasa, function(arr){ return arr.parameter.id == data.id; });
					var indexArray = _.indexOf($scope.item.penilaianRisikoDewasa, currentData);

					$scope.item.penilaianRisikoDewasa[indexArray].parameter = data;
					$scope.item.penilaianRisikoDewasa[indexArray].kriteria = child;

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


					$scope.item.penilaianRisikoDewasa.push(dataPenilaianRisiko);

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
						
						if($scope.totalScore > 0 && $scope.totalScore <= 24)
						{
							$scope.keteranganScore = ModelItem.translate("Tingkat Risiko : Tidak berisiko, lakukan perawatan yang baik", 1);
						}
						else if($scope.totalScore > 25 && $scope.totalScore <= 50)
						{
							$scope.keteranganScore = ModelItem.translate("Risiko Rendah : lakukan interviensi jatuh standar", 1);
						}
						else 
						{
							$scope.keteranganScore = ModelItem.translate("Risiko Tinggi : lakukan intervensi jatuh risiko tinggi", 1);
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

				$scope.item.penilaianRisikoDewasa.pop();
				$scope.arrTempScore.pop();

			}

			$scope.pagePrev = function(data)
			{
				$scope.totalScore -= $scope.arrTempScore[$scope.arrTempScore.length-1];

				$scope.item.penilaianRisikoDewasa.pop();
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
				for(var i=0; i < $scope.item.penilaianRisikoDewasa.length; i++)
				{
					delete $scope.item.penilaianRisikoDewasa[i].parameter.children;
					delete $scope.item.penilaianRisikoDewasa[i].parameter.statVisible;
					delete $scope.item.penilaianRisikoDewasa[i].parameter.score;
				}

				$scope.item.totalScore = $scope.totalScore;
				$scope.item.keteranganScore = $scope.keteranganScore;
				console.log(JSON.stringify($scope.item));
            	
			}
		}
	]);
});