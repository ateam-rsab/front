define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('SiklusGiziCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManageGizi', 'FindPasienGizi',
		function($rootScope, $scope, ModelItem, ManageGizi, FindPasienGizi) {
			ModelItem.get("Gizi/MasterSiklusMenu").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});

			FindPasienGizi.getGizi("service/list-generic/?view=JenisWaktu&select=id,jenisWaktu").then(function(dat){
				$scope.SourceJenisWaktu = dat.data;
				// debugger;
			})
			FindPasienGizi.getGizi("service/list-generic/?view=Kelas&select=id,namaKelas").then(function(dat){
				$scope.SourceKelas = dat.data;
				// debugger;
			})

			FindPasienGizi.getGizi("service/list-generic/?view=Kelas&select=id,namaKelas", false).then(function(dat){
				$scope.SourceKelas2 = dat.data;
				// debugger;
			})

			FindPasienGizi.getGizi("service/list-generic/?view=KategoryDiet&select=id,kategoryDiet").then(function(dat){
				$scope.SourceKategoryDiet = dat.data;
				// debugger;
			})

			FindPasienGizi.getGizi("bentuk-produk/get-bentuk-gizi/").then(function(dat){
				$scope.SourceBentukProduk = dat.data.data;
			})

			FindPasienGizi.getGizi("kategory-produk/get-kategory-produk-gizi/").then(function(dat){
				$scope.SourceKategoryProduk = dat.data.data;
			})

			$scope.SourceHariKe = new kendo.data.DataSource({
				data:[
					{
						"hariKe": 1
					},
					{
						"hariKe": 2
					},
					{
						"hariKe": 3
					},
					{
						"hariKe": 4
					},
					{
						"hariKe": 5
					},
					{
						"hariKe": 6
					},
					{
						"hariKe": 7
					},
					{
						"hariKe": 8
					},
					{
						"hariKe": 9
					},
					{
						"hariKe": 10
					},
					{
						"hariKe": 31
					}
				]
			})

			$scope.daftarSiklus = new kendo.data.DataSource({
				pageSize: 10,
    			data:$scope.source
				// debugger;
			})

			$scope.mainGridOptions = {
                pageable: true,
                scrollable:false,
                columns: [{
					"field": "kodeSiklus",
					"title": "<h3 align=center>Kode Siklus</h3>",
					"width": "10%"
				},
				{
					"field": "namaSiklus",
					"title": "<h3 align=center>Nama Siklus</h3>",
					"width": "30%"
				},
				{
					"field": "jmlHariSiklus",
					"title": "<h3 align=center>Jumlah Hari</h3>",
					"width": "10%"
				},
				{
					"field": "deskripsi",
					"title": "<h3 align=center>Deskripsi</h3>",
					"width": "30%"
				},
				{
					"field": "statusAktif",
					"title": "<h3 align=center>Status Aktif</h3>",
					"width": "10%"
				},
				{
					command: { text: "Hapus", click: $scope.removeSiklus },
			        title: "&nbsp",
			        width: "10%"
				}]
			}

			$scope.addSiklus = function() {

				// 
				var tempSiklus = {
					"kodeSiklus":$scope.item.kodeSiklus,
					"namaSiklus":$scope.item.namaSiklus,
					"jmlHariSiklus":$scope.item.jmlHariSiklus,
					"deskripsi":$scope.item.deskripsi
				}

				$scope.daftarSiklus.add(tempSiklus);
			}

			$scope.removeSiklus = function(e) {
				e.preventDefault();
 
			    var grid = this;
			    var row = $(e.currentTarget).closest("tr");
			    $scope.tempSiklus== $scope.daftarSiklus
			    .filter(function(el){
			    	return el.name !== grid._data[0].name;
			    });
			    grid.removeRow(row);

			};

			$scope.group = {
                field: "ruangan.namaRuangan",
                aggregates: [{
                    field: "pasien",
                    aggregate: "count"
                }, {
                    field: "ruangan.namaRuangan",
                    aggregate: "count"
                }]
            };
            $scope.aggregate = [{
                field: "pasien",
                aggregate: "count"
            }, {
                field: "ruangan.namaRuangan",
                aggregate: "count"
            }]
            $scope.Column = [{
                field: "noAntrian",
                title: "No.",
                width: 50,
                aggregates: ["count"]
            }, {
                field: "menu",
                title: "Menu",
                aggregates: ["count"]
            }, {
                field: "pasien.noCm",
                title: "No. Rekam Medis",
                aggregates: ["count"]
            }, {
                field: "pasien.umur",
                title: "Umur",
                aggregates: ["count"]
            }, {
                field: "jenisKelamin",
                title: "Jenis Kelamin",
                aggregates: ["count"]
            }, {
                field: "kelompokPasien",
                title: "Tipe Pembayaran",
                aggregates: ["count"]
            }, {
                field: "kelas.namaKelas",
                title: "Kelas",
                aggregates: ["count"]
            }, {
                field: "statusAntrian",
                title: "Status",
                aggregates: ["count"]
            }, {
                hidden: true,
                field: "ruangan.namaRuangan",
                title: "Nama Ruangan",
                aggregates: ["count"],
                groupHeaderTemplate: "Ruangan #= value # (Jumlah: #= count#)"
            }];

            $scope.Page = {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            }
            var arrFieldSelectVoPekerjaan = ['id', 'namaRuangan'];
            ModelItem.getDataDummyGeneric("Ruangan", true, undefined, 10).then(function(data) {
                $scope.ruangans = data;
            });
		}
	]);
});