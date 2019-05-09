define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RiwayatPendidikanPegawaiCtrl', ['$rootScope', '$scope'
		, 'ModelItem','DateHelper', 'ManageSdm',
		function($rootScope, $scope, ModelItem,DateHelper,ManageSdm,) {
			$scope.now = new Date();
			$scope.item = {};
			$scope.kdPegawai=1;

			ManageSdm.getItem("service/list-generic/?view=Pendidikan&select=id,namaPendidikan").then(function(dat) {
				$scope.listPendidikan = dat.data;
			});

			ManageSdm.getItem("service/list-generic/?view=TingkatKelulusan&select=id,tingkatKelulusan").then(function(dat) {
				$scope.listTingkatKelulusan = dat.data;
			});


			$scope.tempItem = {};
			$scope.dataRiwayatPendidikanFormal = new kendo.data.DataSource({
				data: []
			});
			$scope.columnRiwayatPendidikanFormal = [ 
			{
				"field": "noSk",
				"title": "No SK",
				width: "150px"
			},{
				"field": "pendidikan",
				"title": "Pendidikan",
				width: "150px"
			},
			{
				"field": "namaSekolah",
				"title": "Nama Sekolah",
				width: "150px"
			},
			{
				"field": "jurusan",
				"title": "Jurusan",
				width: "200px"
			},
			{
				"field": "tglMasuk",
				"title": "Tgl. Masuk",
				width: "100px"
			},
			{
				"field": "tglLulus",
				"title": "Tgl. Lulus",
				width: "100px"
			},
			{
				"field": "ipk",
				"title": "IPK",
				width: "75px"
			},
			{
				"field": "noIjazah",
				"title": "No. Ijazah",
				width: "100px"
			},
			{
				"field": "tglIjazah",
				"title": "Tgl. Ijazah",
				width: "100px"
			},
			{
				command: {text: "Delete", click:$scope.removeRiwayatPendidikanFormal},
				title : "&nbsp;",
				width: "110px"
			}
			];
			$scope.now = new Date();
			$scope.Save = function() {
				if($scope.tempItem.NoIjazah != "" && $scope.tempItem.NoIjazah != undefined)
				{
					for(var i=0; i < $scope.dataRiwayatPendidikanFormal._data.length; i++)
					{

						if($scope.dataRiwayatPendidikanFormal._data[i].no == $scope.tempItem.no)
						{
							return;
						}
					}
                     /*var tanggalMsk = DateHelper.getTanggalFormatted($scope.tempItem.TanggalMasuk);
                     var tanggalLulus = DateHelper.getTanggalFormatted($scope.tempItem.TanggalLulus);
                     var tanggalIjazah = DateHelper.getTanggalFormatted($scope.tempItem.TanggalIjazah);*/

                     var DatariwayatPendidikanFormal =  
                     {
                     	"pegawai" :{
                     		"id":$scope.kdPegawai
                     	},
                     	"pegawaiId" :$scope.kdPegawai,
                     	"noUrut" :0,
                     	"pendidikan" :{
                     		"id":$scope.tempItem.Pendidikan.id
                     	},
                     	"pendidikanId" :$scope.tempItem.Pendidikan.id,
                     	"namaTempatPendidikan" :$scope.tempItem.NamaTempatPendidikan,
                     	"jurusan" :$scope.tempItem.Jurusan,
                     	"tglMasuk" :$scope.tempItem.TanggalMasuk,
                     	"tglLulus" :$scope.tempItem.TanggalLulus,
                     	"nilaiIPK" :$scope.tempItem.NilaiIPK,
                     	"tingkatKelulusan" :{
                     		"id":$scope.tempItem.TingkatKelulusan.id
                     	},
                     	"tingkatKelulusanId" :$scope.tempItem.TingkatKelulusan.id,
                     	"noIjazah" :$scope.tempItem.NoIjazah,
                     	"tglIjazah" :$scope.tempItem.TanggalIjazah,
                     	"ttdIjazah" :$scope.tempItem.TandaTanganIjazah,
                     	"pimpinanPendidikan" : $scope.tempItem.PimpinanPendidikan,
                     	"alamatTempatPendidikan" : $scope.tempItem.AlamatTempatPendidikan,
                     	"keterangan" :$scope.tempItem.Keterangan,
                     	"noSK":$scope.item.noSk,
                     	"strukHistori" :{
                     		"tglAwal":$scope.tempItem.tanggalBerlakuAwal,
                     		"tglAhir":$scope.tempItem.tanggalBerlakuAkhir
                     	},
                     	"strukHistoriFk" :""
                     }
                     ManageSdm.saveRiwayatPegawai(DatariwayatPendidikanFormal).then(function(dat) {
                     	//$scope.dataRiwayatPendidikanFormal.add(DatariwayatPendidikanFormal);
                     	console.log(JSON.stringify($scope.tempItem));
                     })


                 }
             }
             $scope.removeRiwayatPendidikanFormal = function(e) {

                /*e.preventDefault();
 
			    var grid = this;
			    var row = $(e.currentTarget).closest("tr");

			    var selectedItem = grid.dataItem(row);

			    $scope.dataRiwayatPenyakitOrObat.remove(selectedItem);*/

			    e.preventDefault();

			    var grid = this;
			    var row = $(e.currentTarget).closest("tr");

			    $scope.DatariwayatPendidikanFormal = $scope.dataRiwayatPendidikanFormal
			    .filter(function (el) {
			    	return el.name !== grid._data[0].name;
			    });

			    grid.removeRow(row);
			};

		}
		]);
});