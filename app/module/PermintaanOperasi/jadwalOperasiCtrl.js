define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('jadwalOperasiCtrl', ['$rootScope', '$scope', '$state', 'ManagePasien', 'FindPasien', 'ModelItem', 'DateHelper',
        function($rootScope, $scope, $state, managePasien, findPasien, ModelItem, DateHelper) { 
	        $scope.title = "Jadwal Operasi" ;
	        $scope.subtitle = "Data Permintaan Operasi" ;

	        $scope.items = {};

	        $("#grid").on("dblclick", " tbody > tr", function () {
			    // var grid =  $("#grid").data("kendoGrid");
			    // $scope.items = grid.dataItem($(this));
			    // $(this).addClass('k-state-selected');
			    $scope.items = $scope.model;
			    $scope.checked = true;
			});

	        $scope.listKamarOperasi = [
	        	// select from kamar where objectruanganfk = 44 (ruangan Operasi sentral (OK))
	        	{id: 1, nama: "Kamar 1"},
	        	{id: 2, nama: "Kamar 2"},
	        	{id: 3, nama: "Kamar 3"},
	        	{id: 4, nama: "Kamar 4"},
	        	{id: 5, nama: "Kamar 5"}
	        ]

	        $scope.listDokter = [
	        	{id: 1, nama: "Dokter 1"},
	        	{id: 2, nama: "Dokter 2"},
	        	{id: 3, nama: "Dokter 3"},
	        	{id: 4, nama: "Dokter 4"},
	        	{id: 5, nama: "Dokter 5"},
	        	{id: 6, nama: "Dokter 6"},
	        ]

	        $scope.dataPermintaan = new kendo.data.DataSource({
	        	data: [
	        		{noCm: "0000000001",  namaPasien: "Aliya Chandra", jenisKelamin: "P",  namaRuangan: "Soka", noPendaftaran: "0000000001", noIbs: "-", tglRencanaOperasi: "2017-04-22 12:00"},
	        		{noCm: "0000000002",  namaPasien: "Chandra Soekamti", jenisKelamin: "L",  namaRuangan: "Anggrek", noPendaftaran: "0000000002", noIbs: "-", tglRencanaOperasi: "2017-04-22 12:00"}
	        	]
	        })

	        $scope.onChange = function(args){
	        	$scope.model = this.dataItem(this.select());
	        }

            $scope.optionsDataPengiriman = {
            	dataSource: $scope.dataPermintaan,
            	change: $scope.onChange,
                filterable: {
                    extra: false,
                    operators: {
                        string: {
                            contains: "Contains",
                            startswith: "Starts with"
                        }
                    }
                },
                sortable: true,
                pageable: true,
                editable: false,
                selectable: "row",
                columns: [{
                    "field": "noCm",
                    "title": "No CM",
                    "width": 100,
                    filterable: false
                }, {
                    "field": "namaPasien",
                    "title": "Nama Pasien",
                    "width": 250,
                    filterable: false
                }, {
                    "field": "jenisKelamin",
                    "title": "JK",
                    "width": 50,
                    filterable: false
                }, {
                    "field": "namaRuangan",
                    "title": "Nama Ruangan",
                    "width": 200,
                    filterable: false
                }, {
                    "field": "noPendaftaran",
                    "title": "No.Pendaftaran",
                    "width": 120,
                    filterable: false
                }, {
                    "field": "noIbs",
                    "title": "No.IBS",
                    "width": 120,
                    filterable: false
                }, {
                    "field": "tglRencanaOperasi",
                    "title": "Rencana Operasi",
                    "width": 180,
                    filterable: false,
                    attributes: {
                        style: "text-align:center"
                    }
                }]
            };

            $scope.cari = function(){
            	var listRawRequired = [
					"item.noCm|ng-model|No CM"
				];

				var isValid = ModelItem.setValidation($scope, listRawRequired);
					
				if(isValid.status){
					// jalankan fungsi cari data berdasarkan no CM
				} else {
					ModelItem.showMessages(isValid.messages);
				}
            }

            $scope.Save = function(){
            	var listRawRequired = [
					"items.rencanaOperasi|k-ng-model|Tanggal rencana operasi",
					"items.mulaiAnastesi|k-ng-model|Mulai Anastesi",
					"items.selesaiAnastesi|k-ng-model|Selesai Anastesi",
					"items.mulaiOperasi|k-ng-model|Mulai Operasi",
					"items.selesaiOperasi|k-ng-model|Selesai Operasi",
					"items.kamarOperasi|k-ng-model|Kamar Operasi",
					"items.dokterOperator1|k-ng-model|Dokter Operator",
					"items.dokterOperator2|k-ng-model|Dokter Operator",
					"items.dokterAnastesi|k-ng-model|Dokter Anastesi",
					"items.dokterPendamping|k-ng-model|Dokter Pendamping",
					"items.paramedis|k-ng-model|Paramedik"
				];

				var isValid = ModelItem.setValidation($scope, listRawRequired);
					
				if(isValid.status){
					console.log(JSON.stringify($scope.items));
					$scope.isNext = true;
					// jalankan fungsi cari data berdasarkan no CM
				} else {
					ModelItem.showMessages(isValid.messages);
				}
            }
            $scope.batal = function(){

            }
	    }
    ])
})