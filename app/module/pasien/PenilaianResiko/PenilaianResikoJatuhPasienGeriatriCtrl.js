define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PenilaianResikoJatuhPasienGeriatriCtrl', ['$rootScope', '$scope', 'ModelItem', 'DateHelper', 'FindPasien', '$state',
		function($rootScope, $scope, ModelItem, dateHelper, findPasien, $state) {
			$scope.cek = "PenilaianResikoJatuhPasienGeriatriCtrl";
			$scope.dataVOloaded = true;

			ModelItem.getDataDummyGeneric("Pasien/PenilaianResiko/DataPenilaianResikoGeriatri", false).then(function(data) {
                $scope.listDataPenilaianResiko = data;

                for(var i = 0; i < $scope.listDataPenilaianResiko.length; i++)
                {
                	$scope.listDataPenilaianResiko[i].chekVisible = false;
                }
			});

			$scope.item = {};
			ModelItem.get("Pasien/PenilaianResikoJatuhPasienGeriatri").then(function(data) {
                $scope.item = data;
                /*findPasien.getDataPenilaianResikoJatuhPasienGeriatri($state.params.noCM, $state.params.tanggal).then(function(e) {
                    $scope.item = e.data;
                    if (e.data.status === false)
                        $scope.isShowForm = true;
                });*/
                $rootScope.dataVOloaded = true;
                $scope.item.penilaianRisikoGeriatri = [];
            }, function errorCallBack(err) {});

			
			$scope.isLastPage = false;
			$scope.tanggalHariIni = dateHelper.getTanggalFormatted(new Date());
			$scope.totalScore = 0;
			$scope.keteranganScore = "";

			$scope.risikoSelected = function(data) {
				var dataPenilaianRisiko = {
					"risiko": data
				}

				if(data.chekVisible)
				{
					$scope.totalScore -= data.score;
					data.chekVisible = false;

					var currentData = _.find($scope.item.penilaianRisikoGeriatri, function(arr){ return arr.risiko.id == data.id; });
					$scope.item.penilaianRisikoGeriatri = _.without($scope.item.penilaianRisikoGeriatri, currentData);
				}
				else
				{
					$scope.totalScore += data.score;

					data.chekVisible = true;
					$scope.item.penilaianRisikoGeriatri.push(dataPenilaianRisiko);
				}
            }

            $scope.toTotalScore = function()
			{
				$scope.isInfo = false;

				if($scope.totalScore >= 4)
				{
					$scope.keteranganScore = ModelItem.translate("Risiko Tinggi : lakukan intervensi Risiko Tinggi", 1);
				}
				else
				{
					$scope.keteranganScore = ModelItem.translate("Risiko Rendah : lakukan intervensi Risiko Rendah", 1);
				}
			}

			$scope.showInfo = function()
			{
				$scope.isLastPage = true;
				$scope.isInfo = true;
			}

			$scope.backToPenilaian = function()
			{
				$scope.isLastPage = false;
				$scope.isInfo = false;
			}

			$scope.Save = function()
			{

				//remove atribut yang ga ke pake
				for(var i=0; i < $scope.item.penilaianRisikoGeriatri.length; i++)
				{
					delete $scope.item.penilaianRisikoGeriatri[i].risiko.chekVisible;
				}

				$scope.item.totalScore = $scope.totalScore;
				$scope.item.keteranganScore = $scope.keteranganScore;
				console.log(JSON.stringify($scope.item));
            	//hasilnya :
				/*
					{
					    "penilaianRisikoGeriatri": [
					        {
					            "risiko": "Kebingunan setiap saat Nokturia / Inkontinen",
					            "skala": 3,
					            "$$hashKey": "object:445"
					        },
					        {
					            "risiko": "Obat-obat berisiko tinggi (diuretik, narkoti, sedatif, anti, pskoti, laksatif, vasodilator, antiaritmia, antihipertensi, obat hipoglikemik, antidepresan, neuroleptik, NSAID",
					            "skala": 2,
					            "$$hashKey": "object:452"
					        },
					        {
					            "risiko": "Riwayat jatuh daam waktu 12 bulan sebelumnya",
					            "skala": 2,
					            "$$hashKey": "object:456"
					        },
					        {
					            "risiko": "Gangguan pendengaran dan atau penglihatan",
					            "skala": 2,
					            "$$hashKey": "object:460"
					        },
					        {
					            "risiko": "Usia 70 tahun ke atas",
					            "skala": 1,
					            "$$hashKey": "object:464"
					        },
					        {
					            "risiko": "Gangguan pendengaran dan atau penglihatan",
					            "skala": 1,
					            "$$hashKey": "object:468"
					        }
					    ],
					    "totalScore": 11,
					    "keteranganScore": "Risiko   Tinggi   :  lakukan  intervensi   Risiko   Tinggi "
					}
				*/
			}
			
		}
	]);
});