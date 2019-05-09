define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('gapkompetensiCtrl', ['$rootScope', '$scope', 'ModelItem','$state','ManageSdm',
		function($rootScope, $scope, ModelItem,$state,ManageSdm) {
			$scope.item={};
			$scope.now = new Date();
			$scope.dataVOloaded = true;
			$scope.yearSelected = { 
					start: "year", 
					depth: "year" 
				};

			ManageSdm.getOrderList("service/list-generic/?view=Ruangan&select=id,namaRuangan").then(function(dat){
				$scope.listUnitKerja = dat.data; 
			});	   

			$scope.cari = function(){
				if($scope.item.tanggalGAP === undefined)return;
				if($scope.item.unitKerja.id === undefined)return;
				ManageSdm.getOrderList("sdm/get-kompetensi-by-ruangan/"+ $scope.item.unitKerja.id).then(function(dat){
					 $scope.gapkompetensiGridCol = [];
					 $scope.gapkompetensiGridCol = dat.data.data;
				});
				ManageSdm.getOrderList("sdm/get-gap-kompetensi/"+ $scope.item.unitKerja.id  +"/" + moment($scope.item.tanggalGAP).format("YYYY-MM")).then(function(dat){
					console.log(JSON.stringify(dat.data.data));
					$scope.gapkompetensiGrid = new kendo.data.DataSource({ 
						data: dat.data.data
					});
				});	 
			}


///json sample untuk dynamic header, header dibuat dari sisi backend
/*		var data = 
   
    {
      "columns": [
        {
          "field": "no",
          "title": "No.",
          "width": "3%",
          "headerAttributes": {
            "style": "text-align: center;"
          }
        },
        {
          "field": "namaJabatan",
          "title": "Jabatan.",
          "width": "20%",
          "headerAttributes": {
            "style": "text-align: center;"
          }
        },
        {
          "field": "namaJabatan",
          "title": "Jabatan.",
          "width": "20%",
          "headerAttributes": {
            "style": "text-align: center;"
          }
        },
        {
          "title": "Kepemimpinan",
          "columns": [
            {
              "field": "Visioner",
              "title": "<span class='verticalText'>Visioner</span>",
              "headerAttributes": {
                "style": "width: 15px !important;"
              }
            },
            {
              "field": "MengelolaPerubahan",
              "title": "<span class='verticalText'>Mengelola Perubahan</span>",
              "headerAttributes": {
                "style": "width: 15px !important;"
              }
            },
            {
              "field": "MempengaruhiOrangLain",
              "title": "<span class='verticalText'>Mempengaruhi Orang Lain</span>",
              "headerAttributes": {
                "style": "width: 15px !important;"
              }
            },
            {
              "field": "Pemberdayaan",
              "title": "<span class='verticalText'>Pemberdayaan</span>",
              "headerAttributes": {
                "style": "width: 15px !important;"
              }
            },
            {
              "field": "MengembangkanBawahan",
              "title": "<span class='verticalText'>Mengembangkan Bawahan</span>",
              "headerAttributes": {
                "style": "width: 15px !important;"
              }
            },
            {
              "field": "MengelolaPerformance",
              "title": "<span class='verticalText'>Mengelola Performance</span>",
              "headerAttributes": {
                "style": "width: 15px !important;"
              }
            },
            {
              "field": "Memotivasi",
              "title": "<span class='verticalText'>Memotivasi</span>",
              "headerAttributes": {
                "style": "width: 15px !important;"
              }
            }
          ],
          "headerAttributes": {
            "style": "height: 10px !important;text-align: center;"
          }
        },
        {
          "title": "General",
          "columns": [
            {
              "field": "OrientasiHasil",
              "title": "<span class='verticalText'>Orientasi Hasil</span>",
              "headerAttributes": {
                "style": "width: 15px !important;"
              }
            },
            {
              "field": "OrientasiPelanggan",
              "title": "<span class='verticalText'>Orientasi Pelanggan</span>",
              "headerAttributes": {
                "style": "width: 15px !important;"
              }
            },
            {
              "field": "Komunikasi",
              "title": "<span class='verticalText'>Komunikasi</span>",
              "headerAttributes": {
                "style": "width: 15px !important;"
              }
            },
            {
              "field": "TeamWork",
              "title": "<span class='verticalText'>Team Work</span>",
              "headerAttributes": {
                "style": "width: 15px !important;"
              }
            },
            {
              "field": "Inisiatif",
              "title": "<span class='verticalText'>Inisiatif</span>",
              "headerAttributes": {
                "style": "width: 15px !important;"
              }
            },
            {
              "field": "Teliti",
              "title": "<span class='verticalText'>Teliti</span>",
              "headerAttributes": {
                "style": "width: 15px !important;"
              }
            },
            {
              "field": "Tegas",
              "title": "<span class='verticalText'>Tegas</span>",
              "headerAttributes": {
                "style": "width: 15px !important;"
              }
            },
            {
              "field": "PercayaDiri",
              "title": "<span class='verticalText'>Percaya Diri</span>",
              "headerAttributes": {
                "style": "width: 15px !important;"
              }
            },
            {
              "field": "Kredibilitas",
              "title": "<span class='verticalText'>Kredibilitas</span>",
              "headerAttributes": {
                "style": "width: 15px !important;"
              }
            },
            {
              "field": "Fleksibel",
              "title": "<span class='verticalText'>Fleksibel</span>",
              "headerAttributes": {
                "style": "width: 15px !important;"
              }
            }
          ],
          "headerAttributes": {
            "style": "height: 10px !important;text-align: center;"
          }
        },
        {
          "title": "Spesifik",
          "columns": [
            {
              "field": "KonsepdanSistemPengelolaanSumberDayaManusia",
              "title": "<span class='verticalText'>Konsep dan Sistem Pengelolaan Sumber Daya Manusia</span>",
              "headerAttributes": {
                "style": "width: 15px !important;"
              }
            },
            {
              "field": "KeterampilanKomputer",
              "title": "<span class='verticalText'>Keterampilan Komputer</span>",
              "headerAttributes": {
                "style": "width: 15px !important;"
              }
            },
            {
              "field": "SistemInformasi",
              "title": "<span class='verticalText'>Sistem Informasi</span>",
              "headerAttributes": {
                "style": "width: 15px !important;"
              }
            },
            {
              "field": "PengelolaanData",
              "title": "<span class='verticalText'>Pengelolaan Data</span>",
              "headerAttributes": {
                "style": "width: 15px !important;"
              }
            },
            {
              "field": "InputdanAnalisisData",
              "title": "<span class='verticalText'>Input dan Analisis Data</span>",
              "headerAttributes": {
                "style": "width: 15px !important;"
              }
            },
            {
              "field": "ManajemenPeralatan",
              "title": "<span class='verticalText'>Manajemen Peralatan</span>",
              "headerAttributes": {
                "style": "width: 15px !important;"
              }
            },
            {
              "field": "KemampuanMengorganisir",
              "title": "<span class='verticalText'>Kemampuan Mengorganisir</span>",
              "headerAttributes": {
                "style": "width: 15px !important;"
              }
            },
            {
              "field": "KebijakanPelayananSDM",
              "title": "<span class='verticalText'>Kebijakan Pelayanan SDM</span>",
              "headerAttributes": {
                "style": "width: 15px !important;"
              }
            },
            {
              "field": "PengelolaanProyek",
              "title": "<span class='verticalText'>Pengelolaan Proyek</span>",
              "headerAttributes": {
                "style": "width: 15px !important;"
              }
            },
            {
              "field": "KeterampilanAdministrasi",
              "title": "<span class='verticalText'>Keterampilan Administrasi</span>",
              "headerAttributes": {
                "style": "width: 15px !important;"
              }
            }
          ],
          "headerAttributes": {
            "style": "height: 10px !important;text-align: center;"
          }
        },
        {
          "title": "Fungsional",
          "columns": [],
          "headerAttributes": {
            "style": "height: 10px !important;text-align: center;"
          }
        }
      ]
    }
 */
		 			
		}
	]);
});