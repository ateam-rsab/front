define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('HasilPemeriksaanUscomCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'DateHelper', 'socket', 'ManagePasien', '$mdDialog',
		function($rootScope, $scope, ModelItem, $state, findPasien, dateHelper, socket, managePasien, $mdDialog) {
			$scope.dataVOloaded = true;
			$scope.item = {};
			$scope.title="Hasil Pemeriksaan USCOM";

			$scope.now = new Date();
			$scope.sourceData=[];

			var pegawai = ModelItem.getPegawai();

			if ($state.params.noRec !== '-' && $state.params.noRec !== undefined) {
                $scope.noRec = $state.params.noRec;
                findPasien.getByNoRegistrasi($state.params.noRec).then(function(data) {
                    $scope.data = ModelItem.beforePost(data.data, true);
                    $scope.item.usia = $scope.data.pasien.umur;
                });
            }

			function dateTimeEditor(container, options) {
			    $('<input data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>')
		            .appendTo(container)
		            .kendoDateTimePicker({});
			}

			function cariData(){
				debugger;
				findPasien.getUscom($state.params.noRec).then(function(data) {
                    $scope.dataFixUSCOM = data.data;
                    $scope.item.luasPermukaanTubuh=$scope.dataFixUSCOM.luasPermukaanTubuh;
                    $scope.item.diagnosa=$scope.dataFixUSCOM.diagnosa;
                    var a = $scope.dataFixUSCOM
                    var data = [];
					if(a.uskom != undefined){
						for(var i=0; i<a.uskom.length; i++){
						 	data.push({
						 		"noRec": $scope.dataFixUSCOM.noRec,
						 		"tanggal": moment(a.uskom[i].tanggal).format('DD-MM-YYYY HH:mm'),
						 		"sistoleDistole": a.uskom[i].sistoleDistole,
						 		"frekuensiNadi" : a.uskom[i].frekuensiNadi,
						 		"saturasi": a.uskom[i].saturasi,
						 		"hemoglobin": a.uskom[i].hemoglobin,
						 		"nilaiNormalCI": a.uskom[i].nilaiNormalCI,
						 		"nilaiCI": a.uskom[i].nilaiCI,
						 		"nilaiNormalSVI": a.uskom[i].nilaiNormalSVI,
						 		"nilaiSVI": a.uskom[i].nilaiSVI,
						 		"nilaiNormalFTc": a.uskom[i].nilaiNormalFTc,
						 		"nilaiFTc": a.uskom[i].nilaiFTc,
						 		"nilaiNormalSVV": a.uskom[i].nilaiNormalSVV,
						 		"nilaiSVV": a.uskom[i].nilaiSVV,
						 		"nilaiNormalINO": a.uskom[i].nilaiNormalINO,
						 		"nilaiINO": a.uskom[i].nilaiINO,
						 		"nilaiNormalVpk": a.uskom[i].nilaiNormalVpk,
						 		"nilaiVpk": a.uskom[i].nilaiVpk,
						 		"nilaiNormalSVRI": a.uskom[i].nilaiNormalSVRI,
						 		"nilaiSVRI": a.uskom[i].nilaiSVRI,
						 		"nilaiNormalPKR": a.uskom[i].nilaiNormalPKR,
						 		"nilaiPKR": a.uskom[i].nilaiPKR,
						 		"nilaiNormalDO2I": a.uskom[i].nilaiNormalDO2I,
						 		"nilaiDO2I": a.uskom[i].nilaiDO2I
						 	})
						}
					 	$scope.sourceData = data;
					 	init();
					}
                });
			};
			cariData()

			function tambahData(){
				debugger;
				findPasien.getNilaiNormalUscom($state.params.noRec).then(function(data) {
                    $scope.dataUSCOM = data.data.uskom;

                    var a = $scope.dataUSCOM[0];
					var i = 1;
					if(a != undefined){
						var data={
					 		"id": i,
					 		"idCI": a.idCI,
							"idDO2I": a.idDO2I,
							"idFTc": a.idFTc,
							"idPKR": a.idPKR,
							"idSVI": a.idSVI,
							"idSVRI": a.idSVRI,
							"idSVV": a.idSVV,
							"idVpk": a.idVpk,
					 		"nilaiNormalCI": a.nilaiNormalCI,
					 		"nilaiNormalSVI": a.nilaiNormalSVI,
					 		"nilaiNormalFTc": a.nilaiNormalFTc,
					 		"nilaiNormalSVV": a.nilaiNormalSVV,
					 		"nilaiNormalINO": a.nilaiNormalINO,
					 		"nilaiNormalVpk": a.nilaiNormalVpk,
					 		"nilaiNormalSVRI": a.nilaiNormalSVRI,
					 		"nilaiNormalPKR": a.nilaiNormalPKR,
					 		"nilaiNormalDO2I": a.nilaiNormalDO2I
						}
						$scope.sourceData.push(data);
					 	init();
					}
				})
			};

			$scope.dataSelectedRow = {};
			$scope.dataModelGrid = {};
			// dataus();
			function init(){
				$scope.sourceUSCOM = new kendo.data.DataSource({
					data: $scope.sourceData,
					pageSize : 10
				});
			}
			var noID = 1;
	        $scope.tambahTransaksi = function(){
	        	debugger;
	        	tambahData();
		    };
			// debugger;
			$scope.mainGridOptions = {
                pageable: true,
                toolbar: "<button class='btnTemplate1' style='width:10%' ng-click='tambahTransaksi()'>Tambah Data</button>",
                editable : true,
                scrollable: true,
                columns: [{
                	"field": "tanggal",
					"title": "<center><b>Tanggal</b></center>",
					"width": "200px",
					"editor": dateTimeEditor,
					// "template": "<input c-text-box type='date' class='k-textbox' ng-model='dataModelGrid[#: id #].tanggal'/>",
					"format": "{0:dd-MM-yyyy HH:mm}"

				}, {
					"field": "sistoleDistole",
					"title": "<center><b>Sistole / Diastole <br>(mmHg)</b></center>",
					"width": "150px",
					"attributes": {align:"center"}
					// "template": "<input c-text-box type='input' filter='numeric' class='k-textbox' ng-model='dataModelGrid[#: id #].sistole'/>"
				}, {
					"title": "<center><b>Tekanan Darah</b></center>",		
					"columns":[{
						"field": "frekuensiNadi",
						"title": "<center><b>Frekuensi Nadi <br>(kali/menit)</b></center>",
						"width": "150px",
						"attributes": {align:"center"}
						// "template": "<input c-text-box type='input' filter='numeric' class='k-textbox' ng-model='dataModelGrid[#: id #].frekuensiNadi'/>"
					},{
						"field": "saturasi",
						"title": "<center><b>Saturasi O2 <br> (%)</b></center>",
						"width": "150px",
						"attributes": {align:"center"}
						// "template": "<input c-text-box type='input' filter='numeric' class='k-textbox' ng-model='dataModelGrid[#: id #].saturasiO2'/>"
					},{
						"field": "hemoglobin",
						"title": "<center><b>Hemoglobin<br>(g/dL)</b></center>",
						"width": "150px",
						"attributes": {align:"center"}
						// "template": "<input c-text-box type='input' filter='numeric' class='k-textbox' ng-model='dataModelGrid[#: id #].hemoglobin'/>"
					}]
				}, {
					"title": "<center><b>Cardiac Output</b></center>",
					"columns":[{
						"title": "<center><b>CI</b></center>",
						"width": "150px",
						"columns":[{
							"field": "nilaiNormalCI",
							"title": "<center><b>Nilai Normal</b></center>",
							"width": "150px",
							"attributes": {align:"center"}
							// "template": "<input c-text-box type='input' filter='numeric' class='k-textbox' ng-model='dataModelGrid[#: id #].nilaiNormalCI'/>"
						},{
							"field": "nilaiCI",
							"title": "<center><b>Nilai</b></center>",
							"width": "150px",
							"attributes": {align:"center"}
							// "template": "<input c-text-box type='input' filter='numeric' class='k-textbox' ng-model='dataModelGrid[#: id #].nilaiCI'/>"
						}]
					},{
						"title": "<center><b>SVI</b></center>",
						"width": "150px",
						"columns":[{
							"field": "nilaiNormalSVI",
							"title": "<center><b>Nilai Normal</b></center>",
							"width": "150px",
							"attributes": {align:"center"}
							// "template": "<input c-text-box type='input' filter='numeric' class='k-textbox' ng-model='dataModelGrid[#: id #].nilaiNormalSVI'/>"
						},{
							"field": "nilaiSVI",
							"title": "<center><b>Nilai</b></center>",
							"width": "150px",
							"attributes": {align:"center"}
							// "template": "<input c-text-box type='input' filter='numeric' class='k-textbox' ng-model='dataModelGrid[#: id #].nilaiSVI'/>"
						}]
					}]
				}, {
					"title": "<center><b>Preload</b></center>",
					"columns":[{
						"title": "<center><b>FTc</b></center>",
						"width": "150px",
						"columns":[{
							"field": "nilaiNormalFTc",
							"title": "<center><b>Nilai Normal</b></center>",
							"width": "150px",
							"attributes": {align:"center"}
							// "template": "<input c-text-box type='input' filter='numeric' class='k-textbox' ng-model='dataModelGrid[#: id #].nilaiNormalFTc'/>"
						},{
							"field": "nilaiFTc",
							"title": "<center><b>Nilai</b></center>",
							"width": "150px",
							"attributes": {align:"center"}
							// "template": "<input c-text-box type='input' filter='numeric' class='k-textbox' ng-model='dataModelGrid[#: id #].nilaiFTc'/>"
						}]
					},{
						"title": "<center><b>SVV</b></center>",
						"width": "150px",
						"columns":[{
							"field": "nilaiNormalSVV",
							"title": "<center><b>Nilai Normal</b></center>",
							"width": "150px",
							"attributes": {align:"center"}
							// "template": "<input c-text-box type='input' filter='numeric' class='k-textbox' ng-model='dataModelGrid[#: id #].nilaiNormalSVV'/>"
						},{
							"field": "nilaiSVV",
							"title": "<center><b>Nilai</b></center>",
							"width": "150px",
							"attributes": {align:"center"}
							// "template": "<input c-text-box type='input' filter='numeric' class='k-textbox' ng-model='dataModelGrid[#: id #].nilaiSVV'/>"
						}]
					}]
				}, {
					"title": "<center><b>Contractility</b></center>",
					"columns":[{
						"title": "<center><b>INO</b></center>",
						"width": "150px",
						"columns":[{
							"field": "nilaiNormalINO",
							"title": "<center><b>Nilai Normal</b></center>",
							"width": "150px",
							"attributes": {align:"center"}
							// "template": "<input c-text-box type='input' filter='numeric' class='k-textbox' ng-model='dataModelGrid[#: id #].nilaiNormalINO'/>"
						},{
							"field": "nilaiINO",
							"title": "<center><b>Nilai</b></center>",
							"width": "150px",
							"attributes": {align:"center"}
							// "template": "<input c-text-box type='input' filter='numeric' class='k-textbox' ng-model='dataModelGrid[#: id #].nilaiINO'/>"
						}]
					},{
						"title": "<center><b>Vpk</b></center>",
						"width": "150px",
						"columns":[{
							"field": "nilaiNormalVpk",
							"title": "<center><b>Nilai Normal</b></center>",
							"width": "150px",
							"attributes": {align:"center"}
							// "template": "<input c-text-box type='input' filter='numeric' class='k-textbox' ng-model='dataModelGrid[#: id #].nilaiNormalVpk'/>"
						},{
							"field": "nilaiVpk",
							"title": "<center><b>Nilai</b></center>",
							"width": "150px",
							"attributes": {align:"center"}
							// "template": "<input c-text-box type='input' filter='numeric' class='k-textbox' ng-model='dataModelGrid[#: id #].nilaiVpk'/>"
						}]
					}]
				}, {
					"title": "<center><b>After Load</b></center>",
					"columns":[{
						"title": "<center><b>SVRI</b></center>",
						"width": "150px",
						"columns":[{
							"field": "nilaiNormalSVRI",
							"title": "<center><b>Nilai Normal</b></center>",
							"width": "150px",
							"attributes": {align:"center"}
							// "template": "<input c-text-box type='input' filter='numeric' class='k-textbox' ng-model='dataModelGrid[#: id #].nilaiNormalSVRI'/>"
						},{
							"field": "nilaiSVRI",
							"title": "<center><b>Nilai</b></center>",
							"width": "150px",
							"attributes": {align:"center"}
							// "template": "<input c-text-box type='input' filter='numeric' class='k-textbox' ng-model='dataModelGrid[#: id #].nilaiSVRI'/>"
						}]
					},{
						"title": "<center><b>PKR</b></center>",
						"width": "150px",
						"columns":[{
							"field": "nilaiNormalPKR",
							"title": "<center><b>Nilai Normal</b></center>",
							"width": "150px",
							"attributes": {align:"center"}
							// "template": "<input c-text-box type='input' filter='numeric' class='k-textbox' ng-model='dataModelGrid[#: id #].nilaiNormalPKR'/>"
						},{
							"field": "nilaiPKR",
							"title": "<center><b>Nilai</b></center>",
							"width": "150px",
							"attributes": {align:"center"}
							// "template": "<input c-text-box type='input' filter='numeric' class='k-textbox' ng-model='dataModelGrid[#: id #].nilaiPKR'/>"
						}]
					}]
				}, {
					"title": "<center><b>Perfusi</b></center>",
					"columns":[{
						"title": "<center><b>DO2I</b></center>",
						"width": "150px",
						"columns":[{
							"field": "nilaiNormalDO2I",
							"title": "<center><b>Nilai Normal</b></center>",
							"width": "150px",
							"attributes": {align:"center"}
							// "template": "<input c-text-box type='input' filter='numeric' class='k-textbox' ng-model='dataModelGrid[#: id #].nilaiNormalDO2I'/>"
						},{
							"field": "nilaiDO2I",
							"title": "<center><b>Nilai</b></center>",
							"width": "150px",
							"attributes": {align:"center"}
							// "template": "<input c-text-box type='input' filter='numeric' class='k-textbox' ng-model='dataModelGrid[#: id #].nilaiDO2I'/>"
						}]
					}]
				},{
	                title: "<center><b>Action</b></center>",
	                width: "100px",
	                attributes: {align:"center"},
	              	template: "<button class='c-button cancel' style='width:80%' ng-click='hapusTransaksi()'>Hapus</button>"
	            }]
		    };

		    $scope.hapusTransaksi = function()
		    {
		    	if($scope.dataSelectedRow)
                {
                    if(this.dataItem.id != $scope.dataSelectedRow.id)
                    {
                        alert("Data Belum Dipilih !!!");
                    }else
                    {
                    	var grid = $('#gridUSCOM').data("kendoGrid");
		    			grid.dataSource.remove($scope.dataSelectedRow);
		    			removeDataModelGrid(this.dataItem.id);
                    }
                }
		    };

		    $scope.Save=function(){
            	var confirm = $mdDialog.confirm()
			          .title('Validasi')
			          .textContent('Apakah anda yakin akan menyimpan data ini?')
			          .ariaLabel('Lucky day')
			          .ok('Ya')
			          .cancel('Tidak')

			    $mdDialog.show(confirm).then(function() {
			    	$scope.Simpan();
            	})
            };
            
            $scope.Simpan = function(){
            	debugger;
            	var grid = $('#gridUSCOM').data("kendoGrid");
				var listUSCOM = [];
				for(var i=0; i<grid._data.length; i++){
					listUSCOM.push({
						"tanggal": grid._data[i].tanggal,
						"sistoleDistole": grid._data[i].sistoleDistole,
						"frekuensiNadi": grid._data[i].frekuensiNadi,
						"saturasi": grid._data[i].saturasi,
						"hemoglobin": grid._data[i].hemoglobin,
						"pegawai":{
				 			"id": pegawai.id
				 		},
						"uskomJenisPemeriksaan":[
				 			{
				 				"uskomNilaiNormal":{
				 					"id":grid._data[i].idCI
				 				},
				 				"nilai": grid._data[i].nilaiCI
				 			},
				 			{
				 				"uskomNilaiNormal":{
				 					"id":grid._data[i].idSVI
				 				},
				 				"nilai":grid._data[i].nilaiSVI
				 			},
				 			{
				 				"uskomNilaiNormal":{
				 					"id":grid._data[i].idFTc
				 				},
				 				"nilai":grid._data[i].nilaiFTc
				 			},
				 			{
				 				"uskomNilaiNormal":{
				 					"id":grid._data[i].idSVV
				 				},
				 				"nilai":grid._data[i].nilaiSVV
				 			},
				 			// {
				 			// 	"uskomNilaiNormal":{
				 			// 		"id":13
				 			// 	},
				 			// 	"nilai":grid._data[i].nilaiINO
				 			// },
				 			{
				 				"uskomNilaiNormal":{
				 					"id":grid._data[i].idVpk
				 				},
				 				"nilai":grid._data[i].nilaiVpk
				 			},
				 			{
				 				"uskomNilaiNormal":{
				 					"id":grid._data[i].idSVRI
				 				},
				 				"nilai":grid._data[i].nilaiSVRI
				 			},
				 			{
				 				"uskomNilaiNormal":{
				 					"id":grid._data[i].idPKR
				 				},
				 				"nilai":grid._data[i].nilaiPKR
				 			},
				 			{
				 				"uskomNilaiNormal":{
				 					"id":grid._data[i].idDO2I
				 				},
				 				"nilai":grid._data[i].nilaiDO2I
				 			}
				 		]
				 	})
				 }

		    	if($scope.dataFixUSCOM.noRec===undefined){
		    		var data ={
						"luasPermukaanTubuh": $scope.item.luasPermukaanTubuh,
						"diagnosa": $scope.item.diagnosa,
						"noRegistrasi":{
							"noRec": $state.params.noRec
						},
						"uskomListPemeriksaan": listUSCOM
					}
				}else{
					var data ={
						"noRec": $scope.dataFixUSCOM.noRec,
						"luasPermukaanTubuh": $scope.item.luasPermukaanTubuh,
						"diagnosa": $scope.item.diagnosa,
						"noRegistrasi":{
							"noRec": $state.params.noRec
						},
						"uskomListPemeriksaan": listUSCOM
						
					}
				}
				console.log(JSON.stringify(data));
				managePasien.saveUSCOM(data,"uskom/save-pemeriksaan-uskom").then(function(e) {
					cariData();
                });
		    };
		}
	]);
});