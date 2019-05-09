define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PelaksanaanPencegahanJatuhPasienDewasaCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'FindPasien', '$state',
		function($rootScope, $scope, ModelItem, dateHelper, findPasien, $state) {
			$scope.cek = "PelaksaanPencegahanJatuhPasienDewasaCtrl";
			$scope.dataVOloaded = true;


			var skorPelaksanaanPencegahanJatuh = 11;
			var strDataUrl = "";

			if(skorPelaksanaanPencegahanJatuh >= 12)
			{
				strDataUrl  = "Pasien/PelaksanaanPencegahan/DataPelaksanaanPencegahanDewasaStandarResikoTinggi";
			}
			else
			{
				strDataUrl  = "Pasien/PelaksanaanPencegahan/DataPelaksanaanPencegahanDewasaIntervensiJatuhStandar";
			}

			ModelItem.getDataDummyGeneric(strDataUrl, false).then(function(data) {
                $scope.listDataPelaksanaanPencegahan = data;

                for(var i = 0; i < $scope.listDataPelaksanaanPencegahan.length; i++)
                {
                	if(i == 0)
                	{
                		$scope.listDataPelaksanaanPencegahan[i].statVisible = true;
                	}
                	else
                	{
                		$scope.listDataPelaksanaanPencegahan[i].statVisible = false;
                	}
                	
                }
			});

			$scope.item = {};
			ModelItem.get("Pasien/PelaksanaanPencegahanJatuhPasienDewasa").then(function(data) {
                $scope.item = data;
                /*findPasien.getDataPelaksanaanPencegahanJatuhPasienDewasa($state.params.noCM, $state.params.tanggal).then(function(e) {
                    $scope.item = e.data;
                    if (e.data.status === false)
                        $scope.isShowForm = true;
                });*/
                $rootScope.dataVOloaded = true;

                $scope.item.penilaianPencegahanDewasa = [];
            }, function errorCallBack(err) {});


			$scope.isFirstPage = true;
			$scope.isLastPage = false;
			$scope.isInfo = false;
			$scope.isEditMode = false;

			$scope.chooseKriteria = function(data, child)
			{
				if($scope.isEditMode)
				{
					var currentData = _.find($scope.item.penilaianPencegahanDewasa, function(arr){ return arr.parameter.id == data.id; });
					var indexArray = _.indexOf($scope.item.penilaianPencegahanDewasa, currentData);

					$scope.item.penilaianPencegahanDewasa[indexArray].parameter = data;
					$scope.item.penilaianPencegahanDewasa[indexArray].kriteria = child;

					var indexArrayBase = _.indexOf($scope.listDataPelaksanaanPencegahan, data);
					
					$scope.isLastPage = true;
					$scope.isInfo = true;
					$scope.listDataPelaksanaanPencegahan[indexArrayBase].statVisible = false;

					$scope.isEditMode = false;
				}
				else
				{
					var dataPelaksanaanPencegahanJatuh= {
						"parameter": data,
						"kriteria": child
					}

					$scope.item.penilaianPencegahanDewasa.push(dataPelaksanaanPencegahanJatuh);

					var indexArray = _.indexOf($scope.listDataPelaksanaanPencegahan, data);

					if(indexArray != $scope.listDataPelaksanaanPencegahan.length-1)
					{
						$scope.listDataPelaksanaanPencegahan[indexArray].statVisible = false;
						$scope.listDataPelaksanaanPencegahan[indexArray+1].statVisible = true;

						if(indexArray == 0)
						{
							$scope.isFirstPage = false;
						}
					}
					else
					{
						$scope.isLastPage = true;
						$scope.isInfo = true;

						$scope.listDataPelaksanaanPencegahan[indexArray].statVisible = false;
						
					}
				}
			}

			$scope.backToPenilaian = function()
			{
				$scope.isEditMode = false;
				$scope.isLastPage = false;
				$scope.isInfo = false;
				$scope.listDataPelaksanaanPencegahan[$scope.listDataPelaksanaanPencegahan.length-1].statVisible = true;
			
				$scope.item.penilaianPencegahanDewasa.pop();

			}

			$scope.pagePrev = function(data)
			{
				$scope.item.penilaianPencegahanDewasa.pop();

				var indexArray = _.indexOf($scope.listDataPelaksanaanPencegahan, data);

				$scope.listDataPelaksanaanPencegahan[indexArray].statVisible = false;
				$scope.listDataPelaksanaanPencegahan[indexArray-1].statVisible = true;

				if(indexArray == 1)
				{
					$scope.isFirstPage = true;
				}
			}

			$scope.getEditData = function(data)
			{
				$scope.isEditMode = true;

				var currentData = _.find($scope.listDataPelaksanaanPencegahan, function(arr){ return arr.id == data.parameter.id; });
				var indexArray = _.indexOf($scope.listDataPelaksanaanPencegahan, currentData);

				$scope.isLastPage = false;
				$scope.isInfo = false;
				$scope.listDataPelaksanaanPencegahan[indexArray].statVisible = true;
			}

			$scope.Save = function()
			{
				//remove atribut yang ga ke pake
				for(var i=0; i < $scope.item.penilaianPencegahanDewasa.length; i++)
				{
					delete $scope.item.penilaianPencegahanDewasa[i].parameter.children;
					delete $scope.item.penilaianPencegahanDewasa[i].parameter.statVisible;
					delete $scope.item.penilaianPencegahanDewasa[i].parameter.score;
					delete $scope.item.penilaianPencegahanDewasa[i].kriteria.score;
				}

				console.log(JSON.stringify($scope.item));
            	
			}

		}
	]);
});