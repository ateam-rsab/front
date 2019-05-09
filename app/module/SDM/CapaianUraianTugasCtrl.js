define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('CapaianUraianTugasCtrl', ['$rootScope', '$scope', '$state','ModelItem', '$window', '$timeout', 'DateHelper', 'ManageSdm', 'RekamDataPegawai', '$document', 'CetakHelper',
        function ($rootScope, $scope, $state, ModelItem, $window, $timeout, DateHelper, ManageSdm, RekamDataPegawai, $document, CetakHelper) {
            function init(){
                $scope.now = new Date();
                $scope.item = {};
                $scope.item.until = $scope.item.waktu = $scope.now;
                $scope.item.pegawai = ModelItem.getPegawai();
                $scope.isRouteLoading = true;
                $scope.getUraianTugas();
                $scope.listAtasan = [];
            };
			$scope.opsiGridUraianTugas = {
				columns: [{
					"field": "rincianKegiatanId",
					"title": "Id",
					width:1,
					visible: false
				}, {
					"field": "rincianKegiatan",
					"title": "Uraian Tugas"
				}, {
					"field": "target",
					"title": "<center>Target<br/>(/Bulan)</center>",
					"template": "<span class=\"pull-right\"> #= target # </span>",
					"width": 60
				}, {
					"field": "bobot",
					"title": "<center>Bobot</center>",
					"template": "<span class=\"pull-right\"> #= bobot # </span>",
					"width": 60
				}, {
					"field": "capaian",
					"title": "<center>Capaian</center>",
					"template": "<span class=\"pull-right\"> #= capaian # </span>",
					"width": 60
				}, {
					"field": "satuan",
					"title": "<center>Satuan</center>",
					"width": 120
				}],
				// editable: "true",
				editable: true,
				// edit: function (e) {
				// 	var columnIndex = this.cellIndex(e.container);
        		// 	var fieldName = this.thead.find("th").eq(columnIndex).data("field");

				// 	if (!isEditable(fieldName, e.model)) {
				// 		this.closeCell(); // prevent editing
				// 	}
				// }
            };
            $scope.$watch('item.pegawai', function(e){
                if(!e) return;
                ManageSdm.getItem("sdm/get-pegawai-atasan/" + e.id).then(function(data){
                    if(data.data.data[0]){
                        $scope.listAtasan.push({
                            id: data.data.data[0].idAtasanLangsung,
                            namaLengkap: data.data.data[0].namaAtasanLangsung,
                        })
                        $scope.item.atasanLangsung = $scope.listAtasan[0];
                    }
                    // $scope.listAtasan = 
                })
            });
			$scope.monthSelectorOptions = {
				start: "year",
                depth: "year",
                format: "MMM yyyy",
                value: new Date(),
                max: new Date(),
			};
            $scope.$watch('item.atasanLangsung', function(e){
                if(!e) return;
                ManageSdm.getItem("sdm/get-data-pegawai?pegawaiId="+e.id, true).then(function(dat){
					$scope.item.jabatan = dat.data.data.jabatan;
				});
            })
            // $scope.getDataPegawai = function () {
            //     debugger;
			// 	// $scope.pegawaiId = $scope.item.pegawai.id;
			// 	ManageSdm.getItem("sdm/get-data-pegawai?pegawaiId="+$scope.item.namaAtasanLangsung.id, true).then(function(dat){
			// 		$scope.item.jabatan = dat.data.data.jabatan;
			// 	});
			// }
			$scope.getUraianTugas = function(){
				var awal  = moment($scope.item.waktu).format("YYYY-MM-DD");
				ManageSdm.getOrderList("sdm/get-uraian-kerja-dan-capaian/"+awal).then(function(dat){
					// $scope.daftarBahanLinen = dat.data.data;
					$scope.gridUraianTugas = new kendo.data.DataSource({
						data: dat.data.data,
						schema: {
							model: {
								fields: {
									capaian: { type : "number", validation: { min: 0, required: false }},
									rincianKegiatan: {editable: false},
									target: {editable: false}
								}
							}
						},
						aggregate: {
							field: "capaian", aggregate: "sum"
						}
					});
                    $scope.isRouteLoading = false;
				}, (error) => {
                    $scope.isRouteLoading = false;
                    throw error;
                });	
			}
            $scope.yearSelected = {
                start: "year",
                depth: "year"
            };
            init();
            $scope.cetakLapBook = function() {
				var periode = DateHelper.formatDate($scope.item.until, "YYYY-MM");
				var urlLaporan = CetakHelper.open("reporting/lapLogbookPegawai?idPegawai="+$scope.item.atasanLangsung.id+"&periode="+periode);
                window.open(urlLaporan, '_blank');
				$scope.winCetakLogbook.close();
			};
            $scope.cetakLapCapaian = function() {
				var periode = DateHelper.formatDate($scope.item.until, "YYYY-MM-DD");// 2017-08-01 & dr. Toto Wisnu Hendrarto
				var urlLaporan = CetakHelper.open("reporting/lapCapaianKinerja?idAtasan="+$scope.item.atasanLangsung.id+"&date="+periode);
                window.open(urlLaporan, '_blank');
                $scope.winCetakCapaian.close();
            };
            $scope.Save = function () {
				var detail = $scope.gridUraianTugas._data;
                var detailHV = [];
                
				$scope.gridUraianTugas._data.forEach(function(el){
                    var tmpdat = {
						"rincianKegiatan": {"id":""	},
						"hasil":"",
						"periode":"",
						"total":"",
						"pegawai":{	"id":""	},
						"detailUraianTugas": [{
							"capaian": el.capaian,
							"rincianKegiatan": {
								"id": el.rincianKegiatanId
							},
							"pegawai": {
								"id": $scope.item.pegawai.id
							},
							"tanggal": DateHelper.getPeriodeFormatted($scope.item.waktu)
						}]
					}
					detailHV.push(tmpdat);
                })
				var data1 = {
					"uraianTugas": detailHV
				}
				ManageSdm.saveDataUji(data1,"sdm/save-uraian-tugas-transaksi/").then(function (e) {
					$scope.getUraianTugas();
				});
			};
        }
    ]);


});