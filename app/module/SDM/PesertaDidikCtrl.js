define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('PesertaDidikCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManagePhp',
		function($rootScope, $scope, ModelItem, managePhp) {
			$scope.item = {};

			init();
			function init() {
				managePhp.getMaster("pendidikan/get-daftar-pesertadidik?nimOrNama=").then(function(dat){
					$scope.dataGrid = dat.data.data;
					// $scope.dataGrid.forEach(function (data) {
					// 	data.ttl = data.tempatlahir +", "+data.tgllahir
					// })
					$scope.dataGridPesertaDidik = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.dataGrid
					});
				});
				managePhp.getMaster("pendidikan/get-dcbo-pesertadidik").then(function(dat){
					$scope.listJenisKelamin = dat.data.dataJenisKelamin
					$scope.listAgama = dat.data.dataAgama
					$scope.listInstitusiPendidikan = dat.data.dataInstitusipPendidikan
					$scope.listJurusan = dat.data.dataJurusan
					$scope.listProgramStudi = dat.data.datafakultas
				});
				$scope.listPeriode = [
					{'id':1,'periode':'2017/2018'},
					{'id':2,'periode':'2018/2019'},
					{'id':3,'periode':'2019/2020'},
					{'id':4,'periode':'2020/2021'},
					{'id':5,'periode':'2021/2022'}
				]
			}; 
			$scope.cari = function () {
				managePhp.getMaster("pendidikan/get-daftar-pesertadidik?nimOrNama=").then(function(dat){
					$scope.dataGrid = dat.data.data;
					// $scope.dataGrid.forEach(function (data) {
					// 	data.ttl = data.tempatLahir +", "+data.tglLahir
					// })
					$scope.dataGridPesertaDidik = new kendo.data.DataSource({
						pageSize: 10,
						data: $scope.dataGrid
					});
				});
			}
			// $scope.columnGridPesertaDidik = { 
			// 	// pageable: true,
			// 	// columns: [
			// 	// { field:"periodeTahunAjaran",title:"Periode Tahun Ajaran",width:100},
			// 	{ field:"nim",title:"NIM",width:100 },
			// 	{ field:"nama",title:"Nama Lengkap",width:100 },
			// 	{ field:"jeniskelamin",title:"Jenis Kelamin",width:100 },
			// 	{ field:"agama",title:"Agama",width:100},
			// 	{ field:"nomorhp",title:"No Hp",width:100 },
			// 	{ field:"ttl",title:"Tempat/Tanggal Lahir",width:200 },
			// 	{ field:"alamat",title:"Alamat",width:300 },
			// 	{ field:"institusipendidikan",title:"Institusi Pendidikan",width:200 
			// // }],
			// // 	editable: false,
			// };
			$scope.columnGridPesertaDidik = {
				// toolbar: [
				// 	"excel",
					
				// 	],
				// 	excel: {
				// 		fileName: "DaftarRegistrasiPasien.xlsx",
				// 		allPages: true,
				// 	},
				// 	excelExport: function(e){
				// 		var sheet = e.workbook.sheets[0];
				// 		sheet.frozenRows = 2;
				// 		sheet.mergedCells = ["A1:M1"];
				// 		sheet.name = "Orders";

				// 		var myHeaders = [{
				// 			value:"Daftar Registrasi Pasien",
				// 			fontSize: 20,
				// 			textAlign: "center",
				// 			background:"#ffffff",
	   //                   // color:"#ffffff"
	   //               }];

	   //               sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 70});
	   //           },
				selectable: 'row',
				pageable: true,
	            columns:
	            [
	            	{
						"field": "nim",
						"title": "NIM",
						"width":"70px"
					},
					{
						"field": "nama",
						"title": "Nama",
						"width":"120px"
					},
					{
						"field": "jeniskelamin",
						"title": "JK",
						"width":"70px"
					},
					{
						"field": "agama",
						"title": "Agama",
						"width":"80px"
						// "template": "<span class='style-left'>#: namapasien #</span>"
					},
					{
						"field": "nomorhp",
						"title": "No Telepon",
						"width":"90px"
					},
					{
						"field": "ttl",
						"title": "Tempat Tgl Lahir",
						"width":"120px"
					},
					{
						"field": "alamat",
						"title": "Alamat",
						"width":"100px"
					},
					{
						"field": "institusipendidikan",
						"title": "Institusi Pendidikan",
						"width":"100px"
					}
				]
			};
			$scope.klikGrid = function(dataSelected){
				$scope.item.norec = dataSelected.norec
				$scope.item.nim = dataSelected.nim
				$scope.item.nama = dataSelected.nama
				$scope.item.jenisKelamin = {'id':dataSelected.jeniskelaminfk,'jeniskelamin':dataSelected.jeniskelamin}
				$scope.item.agama = {'id':dataSelected.agamafk,'agama':dataSelected.agama}
				$scope.item.noHp = dataSelected.nomorhp
				$scope.item.tempatLahir = dataSelected.tempatlahir
				$scope.item.tanggalLahir = dataSelected.tanggallahir
				$scope.item.alamat = dataSelected.alamat
				$scope.item.institusiPendidikan = {'id':dataSelected.institusipendidikanfk,'institusipendidikan':dataSelected.institusipendidikan}
				$scope.item.jurusan = {'id':dataSelected.jurusanpeminatanfk,'jurusanpeminatan':dataSelected.jurusanpeminatan}
				$scope.item.programStudi = {'id':dataSelected.fakultasfk,'fakultas':dataSelected.fakultas}
			}
			$scope.simpan = function () {
				// var listRawRequired = [
				// "item.nim|ng-model|NIM",
				// "item.nama|ng-model|Nama Lengkap",
				// "item.jenisKelamin|k-ng-model|Jenis Kelamin",
				// "item.agama|k-ng-model|Agama",
				// "item.noHp|ng-model|No HP",
				// "item.tempatLahir|ng-model|Tampat Lahir",
				// "item.tanggalLahir|k-ng-model|Tanggal Lahir",
				// "item.alamat|ng-model|Alamat",
				// "item.institusiPendidikan|k-ng-model|Institusi Pendidikan",
				// "item.jurusan|k-ng-model|Jurusan",
				// "item.programStudi|k-ng-model|Program Studi"
				// ];

				// var isValid = ModelItem.setValidation($scope, listRawRequired);
				// if(isValid.status){
					var tempData = {
						"norec":$scope.item.norec,
						"nim":$scope.item.nim,
						"nama":$scope.item.nama,
						"jeniskelaminfk":$scope.item.jenisKelamin.id,
						"agamafk":$scope.item.agama.id,
						"nomorhp":$scope.item.noHp,
						"tempatlahir":$scope.item.tempatLahir,
						"tanggallahir":kendo.toString(new Date($scope.item.tanggalLahir), "yyyy-MM-dd"),
						"alamat":$scope.item.alamat,
						"institusipendidikanfk":$scope.item.institusiPendidikan.id,
						"jurusanpeminatanfk":$scope.item.jurusan.id,
						"fakultasfk":$scope.item.programStudi.id
					}
					managePhp.postData2("pendidikan/save-pesertadidik",tempData).then(function(e) {
						$scope.item = {};
						init();
					});
				// } else {
				// 	ModelItem.showMessages(isValid.messages);
				// }
				
			}
			$scope.batal = function () {
				$scope.item = {};
			}
		}
		]);
});
