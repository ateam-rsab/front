define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RiwayatPendidikanFormalCtrl', ['$rootScope', '$scope', 'ModelItem','DateHelper',
		function($rootScope, $scope, ModelItem,DateHelper) {
			$scope.now = new Date();
			$scope.item = {};
			ModelItem.get("RiwayatPendidikanFormal/RiwayatPendidikanFormal").then(function(data) {
				$scope.item = data;


				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			ModelItem.getDataDummyGeneric("RiwayatPendidikanFormal/Pendidikan", true).then(function(data) {
				$scope.listPendidikan = data;
			})
			ModelItem.getDataDummyGeneric("RiwayatPendidikanFormal/TingkatKelulusan", true).then(function(data) {
				$scope.listTingkatKelulusan = data;
			})
			$scope.tempItem = {};
			$scope.dataRiwayatPendidikanFormal = new kendo.data.DataSource({
				data: []
			});
			$scope.columnRiwayatPendidikanFormal = [{
				"field": "no",
				"title": "No. Urut",
				 width: "75px"
			},
			{
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
				"field": "kelulusan",
				"title": "Kelulusan",
				width: "100px"
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
				"field": "tandaTangan",
				"title": "Tanda Tangan",
				width: "100px"
			},
			{
				"field": "almtSekolah",
				"title": "Alamat Sekolah",
				width: "150px"
			},
			{
				"field": "pimpinanSekolah",
				"title": "Pimpinan Sekolah",
				width: "100px"
			},
			{
				"field": "keterangan",
				"title": "Keterangan",
				width: "100px"
			},
			{
				command: {text: "Delete", click:$scope.removeRiwayatPendidikanFormal},
				title : "&nbsp;",
				width: "110px"
			}
			];
			$scope.now = new Date();
			$scope.addDataRiwayatPendidikanFormal = function() {
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

                    var DatariwayatPendidikanFormal = {
                        "no" : $scope.tempItem.no,
                        "id" : $scope.tempItem.Pendidikan.id,
                        "pendidikan" : $scope.tempItem.Pendidikan.name,
                        "namaSekolah" : $scope.tempItem.NamaTempatPendidikan,
                        "jurusan" : $scope.tempItem.Jurusan,
                        "tglMasuk" : $scope.tempItem.TanggalMasuk,
                        "tglLulus" : $scope.tempItem.TanggalLulus,
                        "ipk" : $scope.tempItem.NilaiIPK,
                        "id" : $scope.tempItem.TingkatKelulusan.id,
                        "kelulusan" : $scope.tempItem.TingkatKelulusan.name,
                        "noIjazah" : $scope.tempItem.NoIjazah,
                        "tglIjazah" : $scope.tempItem.TanggalIjazah,
                        "tandaTangan" : $scope.tempItem.TandaTanganIjazah,
                        "almtSekolah" : $scope.tempItem.AlamatTempatPendidikan,
                        "pimpinanSekolah" : $scope.tempItem.PimpinanPendidikan,
                        "keterangan" : $scope.tempItem.Keterangan



                    }
                    $scope.dataRiwayatPendidikanFormal.add(DatariwayatPendidikanFormal);
                    onsole.log(JSON.stringify($scope.tempItem));

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