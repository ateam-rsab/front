define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('MonitoringBiayaSDMCtrl', ['$rootScope', '$scope', 'ModelItem','ManageSdm',
		function($rootScope, $scope, ModelItem,ManageSdm) {
			ModelItem.get("Gizi/MasterSiklusMenu").then(function(data) {
				$scope.item = data;
				$scope.now = new Date();
				$scope.dataVOloaded = true;
			}, function errorCallBack(err) {});
			ManageSdm.getOrderList("service/list-generic/?view=UnitKerja&select=id,namaExternal", true).then(function (dat) {
				$scope.ListUnitKerja = dat.data;
			});

			$scope.daftarkendaraan = new kendo.data.DataSource({
				pageSize: 10,
    			data:$scope.source
				// debugger;
			})
			//List Tahun
			$scope.listTahun = [];
            for (var i = 2014; i <= new Date().getFullYear(); i++)
                $scope.listTahun.push({ id: i });
            
            $scope.selectedTahun = $scope.listTahun[$scope.listTahun.length - 1];

			$scope.Gridkendaraan= {
                pageable: false,
                scrollable:false,
                columns: [{
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
                pageable: false,
                scrollable:false,
                columns: [{
					"field": "noPenambahanKerja",
					"title": "No" 
				},
				{
					"field": "unitKerja",
					"title": "Unit Kerja" 
				},
				{
					"field": "slta",
					title: "<span class='verticalText'>SLTA</span>"
				},
				{
					"field": "perumahsakitan",
					"title": "<span class='verticalText'>D3 Perumahsakitan</span>"
				},
				{
					"field": "kebidanan",
					"title": "<span class='verticalText'>D3 Kebidanan</span>" 
				},
				{
					"field": "keperawatanGigi",
					"title": "<span class='verticalText'>D3 Keperawatan Gigi</span>" 
				},
				{
					"field": "anestesi",
					"title": "<span class='verticalText'>D3 Anestesi</span>" 
				},
				{
					"field": "nurse",
					"title": "<span class='verticalText'>Nurse </span>" 
				},
				{
					"field": "kesehatanlainumum",
					"title": "<span class='verticalText'>D3 Kesehatan Lain/Umum </span>" 
				},
				{
					"field": "kesehatanlain",
					"title": "<span class='verticalText'>S1 Kesehatan Lain</span>" 
				},
				{
					"field": "umum",
					"title": "<span class='verticalText'>S1 Umum</span>" 
				},
				{
					"field": "jumlah",
					"title": "<span class='verticalText'>Jumlah</span>" 
				},
				{
					"field": "rekrutmen",
					"title": "Rekrutmen" 
				},
				{
					"field": "rekrutmen",
					"title": "Program Orientasi" 
				},
				{
					"field": "remunerasi",
					"title": "Remunerasi" 
				},
				{
					"field": "jumlahRp",
					"title": "Jumlah (Rp)" 
				}
				]
			}
			
			
			
				$scope.daftarpangkat = new kendo.data.DataSource({
				pageSize: 10,
    			data:$scope.source
				// debugger;
			})

			$scope.Gridpangkat= {
                pageable: false,
                scrollable:false,
                columns: [{
					"field": "noPengembangan",
					"title": "No"
				},
				{
					"field": "unitKerjaPengembangan",
					"title": "Unit Kerja"
				},
				{
					"field": "dir",
					"title": "DIR"
				},
				{
					"field": "ms",
					"title": "MS"
				},
				{
					"field": "m",
					"title": "M"
				},
				{
					"field": "sl",
					"title": "SL"
				},
				{
					"field": "ol",
					"title": "OL"
				},
				{
					"field": "ns",
					"title": "NS"
				},
				{
					"field": "pm",
					"title": "PM"
				},
				{
					"field": "os",
					"title": "OS"
				},
				{
					"field": "gr",
					"title": "GR"
				},
				{
					"field": "pegawai",
					"title": "&#8721;"
				},{
					
					title: "Medical Check Up Unit Risiko Tinggi",
					columns: [
					{
						"field": "resikoTinggi",
						"title": "Unit Resiko Tinggi"
					},{
						"field": "usia",
						"title": "Usia > 40"
					}]
				},
				{
					"field": "jumlah",
					"title": "JUMLAH"
				}]
			}
			
			$scope.daftarperjalanan = new kendo.data.DataSource({
				pageSize: 10,
    			data:$scope.source
				// debugger;
			})

			$scope.mainGridOptions = {
                pageable: false,
                scrollable:false,
                columns: [{
					"field": "noPengembangan",
					"title": "No"
				},
				{
					"field": "unitKerjaPengembangan",
					"title": "Unit Kerja"
				},
				{
					"field": "dir",
					"title": "DIR"
				},
				{
					"field": "ms",
					"title": "MS"
				},
				{
					"field": "m",
					"title": "M"
				},
				{
					"field": "sl",
					"title": "SL"
				},
				{
					"field": "ol",
					"title": "OL"
				},
				{
					"field": "ns",
					"title": "NS"
				},
				{
					"field": "pm",
					"title": "PM"
				},
				{
					"field": "os",
					"title": "OS"
				},
				{
					"field": "gr",
					"title": "GR"
				},
				{
					"field": "pegawai",
					"title": "&#8721; Pegawai"
				},
				{
					"field": "dir",
					"title": "DIR"
				},
				{
					"field": "ms",
					"title": "MS"
				},
				{
					"field": "m",
					"title": "M"
				},
				{
					"field": "sl",
					"title": "SL"
				},
				{
					"field": "ol",
					"title": "OL"
				},
				{
					"field": "ns",
					"title": "NS"
				},
				{
					"field": "pm",
					"title": "PM"
				},
				{
					"field": "os",
					"title": "OS"
				},
				{
					"field": "gr",
					"title": "GR"
				},
				{
					"field": "pegawai",
					"title": "Jumlah Point"
				},{
					
					title: "Pemenuhan Kompetensi",
					columns: [
					{
						"field": "pendidikanFormal",
						"title": "Pendidikan Formal"
					},{
						"field": "pelatihan",
						"title": "Pelatihan"
					}]
				},
				{
					"field": "pemeliharaanKompetensi",
					"title": "Pemeliharaan Kompetensi"
				},
				{
					"field": "pengembanganKompetensi",
					"title": "Pengembangan Kompetensi"
				},
				{
					"field": "jumlah",
					"title": "JUMLAH"
				},
				{
					"field": "alokasiBiaya",
					"title": "Alokasi Biaya"
				},
				{
					"field": "sisaSaldo",
					"title": "Sisa Saldo"
				},
				{
					"field": "keterangan",
					"title": "Keterangan"
				}]
		}
			
			$scope.daftarjabatan = new kendo.data.DataSource({
				pageSize: 10,
    			data:$scope.source
				// debugger;
			})

			$scope.Gridjabatan = {
                pageable: false,
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
                pageable: false,
                scrollable:false,
                columns: [{
					"field": "noPengembangan",
					"title": "No"
				},
				{
					"field": "unitKerjaPengembangan",
					"title": "Unit Kerja"
				},
				{
					"field": "dir",
					"title": "DIR"
				},
				{
					"field": "ms",
					"title": "MS"
				},
				{
					"field": "m",
					"title": "M"
				},
				{
					"field": "sl",
					"title": "SL"
				},
				{
					"field": "ol",
					"title": "OL"
				},
				{
					"field": "ns",
					"title": "NS"
				},
				{
					"field": "pm",
					"title": "PM"
				},
				{
					"field": "os",
					"title": "OS"
				},
				{
					"field": "gr",
					"title": "GR"
				},
				{
					"field": "pegawai",
					"title": "&#8721; Pegawai"
				} ,
				{
					"field": "assesmentBudaya",
					"title": "Assesment Budaya"
				},
				{
					"field": "nilaiStratejik",
					"title": "Merumuskan Nilai Stratejik"
				},
				{
					"field": "changeAgnet",
					"title": "Pembekalan Change Agnet"
				},
				{
					"field": "nilaiBudaya",
					"title": "Implementasi Nilai2 Budaya"
				},
				{
					"field": "capacityBuilding",
					"title": "Capacity Building"
				},
				{
					"field": "biaya",
					"title": "&#8721; Biaya"
				},
				{
					"field": "alokasibiaya",
					"title": "Alokasi Biaya"
				},
				{
					"field": "sisaSaldo",
					"title": "Sisa Saldo"
				},
				{
					"field": "keterangan",
					"title": "Keterangan"
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