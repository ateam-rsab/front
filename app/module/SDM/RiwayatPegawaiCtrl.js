define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('RiwayatPegawaiCtrl', ['$rootScope', '$scope', 'ModelItem',
		function($rootScope, $scope, ModelItem) {
			ModelItem.get("Gizi/MasterSiklusMenu").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			
			$scope.daftarkendaraan = new kendo.data.DataSource({
				pageSize: 10,
    			data:$scope.source
				// debugger;
			})

			$scope.Gridkendaraan= {
                pageable: true,
                scrollable:false,
                columns: []
			}
			
			
			
				$scope.daftarpangkat = new kendo.data.DataSource({
				pageSize: 10,
    			data:$scope.source
				// debugger;
			})

			

			$scope.daftarpendidikan = new kendo.data.DataSource({
				pageSize: 10,
    			data:$scope.source
				// debugger;
			})

			$scope.GridOk= {
                pageable: true,
                scrollable:false,
                columns: [{
					"field": "kodeSiklus",
					"title": "No",
					"width": "10%"
				},
				{
					"field": "namaSiklus",
					"title": "Pendidikan",
					"width": "30%"
				},
				{
					"field": "jmlHariSiklus",
					"title": "Nama Sekolah",
					"width": "10%"
				},
				{
					"field": "deskripsi",
					"title": "Jurusan",
					"width": "30%"
				},
				{
					"field": "statusAktif",
					"title": "Tahun Lulus",
					"width": "10%"
				},
				{
					"field": "statusAktif",
					"title": "Nilai",
					"width": "10%"
				},
				{
					"field": "statusAktif",
					"title": "No Ijazah",
					"width": "10%"
				}]
			}
			
			
			
				$scope.daftarpangkat = new kendo.data.DataSource({
				pageSize: 10,
    			data:$scope.source
				// debugger;
			})

			$scope.Gridpangkat= {
                pageable: true,
                scrollable:false,
                columns: [{
					"field": "kodeSiklus",
					"title": "No",
					"width": "10%"
				},
				{
					"field": "namaSiklus",
					"title": "Pangkat",
					"width": "30%"
				},
				{
					"field": "jmlHariSiklus",
					"title": "Golongan",
					"width": "10%"
				},
				{
					"field": "deskripsi",
					"title": "No SK",
					"width": "30%"
				},
				{
					"field": "statusAktif",
					"title": "Tanggal SK",
					"width": "10%"
				},
				{
					"field": "statusAktif",
					"title": "TMT",
					"width": "10%"
				},
				{
					"field": "statusAktif",
					"title": "Keterangan",
					"width": "10%"
				}]
			}
			
			$scope.daftarperjalanan = new kendo.data.DataSource({
				pageSize: 10,
    			data:$scope.source
				// debugger;
			})

			$scope.mainGridOptions = {
                pageable: true,
                scrollable:false,
                columns: [{
					"field": "kodeSiklus",
					"title": "No",
					"width": "10%"
				},
				{
					"field": "namaSiklus",
					"title": "Kota Tujuan",
					"width": "30%"
				},
				{
					"field": "jmlHariSiklus",
					"title": "Negara Tujuan",
					"width": "10%"
				},
				{
					"field": "deskripsi",
					"title": "Tujuan Kunjungan",
					"width": "30%"
				},
				{
					"field": "statusAktif",
					"title": "Tgl Pergi",
					"width": "10%"
				},
				{
					"field": "statusAktif",
					"title": "Tgl Pulang",
					"width": "10%"
				},
				{
					"field": "kodeSiklus",
					"title": "Kendaraan",
					"width": "10%"
				},
				{
					"field": "namaSiklus",
					"title": "Penyandang Dana",
					"width": "30%"
				},
				{
					"field": "jmlHariSiklus",
					"title": "Keterangan",
					"width": "10%"
				}]
			}
			
			$scope.daftarjabatan = new kendo.data.DataSource({
				pageSize: 10,
    			data:$scope.source
				// debugger;
			})

			$scope.Gridjabatan = {
                pageable: true,
                scrollable:false,
                columns: [{
					"field": "kodeSiklus",
					"title": "Ruangan",
					"width": "10%"
				},
				{
					"field": "namaSiklus",
					"title": "Satuan Kerja",
					"width": "30%"
				},
				{
					"field": "jmlHariSiklus",
					"title": "Jabatan",
					"width": "10%"
				},
				{
					"field": "deskripsi",
					"title": "Eselon",
					"width": "30%"
				},
				{
					"field": "statusAktif",
					"title": "Tgl SK",
					"width": "10%"
				},
				{
					"field": "statusAktif",
					"title": "No SK",
					"width": "10%"
				},
				{
					"field": "statusAktif",
					"title": "Tanggal Mulai Berlaku",
					"width": "10%"
				},
				{
					"field": "statusAktif",
					"title": "Keterangan",
					"width": "10%"
				}]
			}
			
			
			$scope.daftarhukuman = new kendo.data.DataSource({
				pageSize: 10,
    			data:$scope.source
				// debugger;
			})

			$scope.Gridhukuman = {
                pageable: true,
                scrollable:false,
                columns: [{
					"field": "kodeSiklus",
					"title": "No",
					"width": "10%"
				},
				{
					"field": "namaSiklus",
					"title": "Jenis Hukuman",
					"width": "30%"
				},
				{
					"field": "jmlHariSiklus",
					"title": "No SK",
					"width": "10%"
				},
				{
					"field": "deskripsi",
					"title": "Tanggal SK",
					"width": "30%"
				},
				{
					"field": "statusAktif",
					"title": "Tanggal Mulai",
					"width": "10%"
				},
				{
					"field": "statusAktif",
					"title": "Tanggal Selesai",
					"width": "10%"
				},
				{
					"field": "statusAktif",
					"title": "Keterangan",
					"width": "10%"
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