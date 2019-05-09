define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('DaftarPencatatanSuhuMesinCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("CSSD/DaftarPencatatanSuhuMesin").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
				$scope.dataSource = new kendo.data.DataSource({
                    pageSize: 20,
                    data: $scope.dataPencatatanSuhuMesin,
                    autoSync: true,
                    batch: true,
                    /*schema: {
                        model: {
                            id: "asetId",
                            fields: {
                                "pengecekanPeralatanMapping.bagianAlat": { editable: false },
                                pemeriksaanFisik: { defaultValue: { id: 1, nama: "Baik"} },
                                pemeriksaanFungsi: { defaultValue: { id: 1, nama: "Baik"} }
                            }         
                        }
                    }*/
                });
                $scope.gridPencatatanSuhuMesin = { 
                    pageable: true,
                    
                    columns: [
                		{ field:"tgl", title:"<center>Tanggal"},
	                    { field:"mesin",title:"<center>Mesin"},
	                    { field:"programMesin",title:"<center>Pogram Mesin/Cycle"},
	                    { field:"waktu",title:"<center>Waktu",
	                    columns:
	                    [
	                    	{ field:"mulai",title:"<center>Mulai"},
	                    	{ field:"selesai",title:"<center>Selesai"},
	                    ]},
	                    { field:"suhu",title:"<center>Suhu"},
	                    { field:"tekanan",title:"<center>Tekanan"},
	                    { field:"lamaProses",title:"<center>Lama Proses"},
	                    { field:"petugas",title:"<center>Petugas"}
                    ],
                    editable: false
                };
			}, function errorCallBack(err) {});
		}
	]);
});