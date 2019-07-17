define(['initialize'], function(initialize) {'use strict';
	initialize.controller('DashbboardSDMCtrl', ['$q', '$parse', 'LoginService', 'socket', '$rootScope', '$scope', 'ModelItem', '$state', 'DateHelper','ManageSdm','ReportHelper','CetakHelper', 'FindSdm', 'CetakHelper',
		function($q, $parse, loginService, socket, $rootScope, $scope, ModelItem, $state,  DateHelper, ManageSdm
			, reportHelper, CetakHelper, FindSdm, cetakHelper) {
		$scope.now = new Date();
		$scope.isIT = true;
		var userLogin = JSON.parse(localStorage.getItem('datauserlogin'));
		$scope.item ={
			from: $scope.now,
			until: $scope.now,
			waktu: $scope.now,
			periode: $scope.now,
			periodeFee: $scope.now,
			periodeRekap: $scope.now,
		};
		var idPgw=0;
		if(userLogin.kdUser === 'admin.it') {
			$scope.isIT = false;
		} else {
			$state.go('UnderMaintenance',  { namaForm: 'Dashboard Logbook SDM dan FFS' });
			$scope.isIT = true;
		}
		// $scope.item.from = $scope.now;
		// $scope.item.until = $scope.now;
		// $scope.item.waktu = $scope.now;
		$scope.monthSelectorOptions = {
			start: "year",
			depth: "year"
		};
		
		$scope.showCetakLogbook = false; // hide button cetak logbookKinerja;
		$scope.yearSelected = {
			start: "year", 
			depth: "year",
			format: "MMMM yyyy"
		};
		var getUserLogin = function(){
			/* used for conditionally disable / enable cell editing in grid */
			var isEditable;
			$scope.item.pegawai = ModelItem.getPegawai();
			if ($scope.item.pegawai.ruangan != undefined) {
				if ($scope.item.pegawai.ruangan.departemenId === 42){
					isEditable = true;
				} else {
					isEditable = false;
				}
			} else {
				isEditable = false
			}
			
			return isEditable;
		}
		getUserLogin();
		$scope.tanggal = new Date();
		$scope.isRouteLoading = true;
		$q.all([
			ManageSdm.getOrderList("sdm/get-uraian-kerja", true),
			ManageSdm.getOrderList("sdm/get-id-pgw"),
			ManageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true")
			]).then(function(res){
				if(res[0].statResponse){
					$scope.daftarBahanLinen = new kendo.data.DataSource({
						data:  res[0].data.data,
						schema: {
							model: {
								fields: {
									capaian: { type : "number", validation: { min: 0, required: true } }
								}
							}
						}      
					});
				}
				if(res[1].statResponse){
					idPgw = res[1].data.data.id;
				}
				if(res[2].statResponse){
					$scope.listPegawai = res[2].data;
				}
				$scope.isRouteLoading = false;
			}, (error) => {
				$scope.isRouteLoading = false;
				throw(error);
			})
		// ManageSdm.getOrderList("sdm/get-uraian-kerja", true).then(function(dat) {
		// 	$scope.daftarBahanLinen = new kendo.data.DataSource({
		// 		data:  dat.data.data,
		// 		schema: {
		// 			model: {
		// 				fields: {
		// 					capaian: { type : "number", validation: { min: 0, required: true } }
		// 				}
		// 			}
		// 		}      
		// 	});
		// });
		// ManageSdm.getOrderList("sdm/get-id-pgw").then(function(dat) {
		// 	idPgw = dat.data.data.id; 
		// });

		$scope.pie={
			title: {
				text: "Pengelompokan " 
			},
			legend: {
				position: "top"
			},
			seriesDefaults: {
				labels: {
					template: "#= category # - #= kendo.format('{0:P}', percentage)#",
					position: "outsideEnd",
					visible: true,
					background: "transparent"
				}
			},
			series: [{
				type: "pie",
				field:"persen",
				categoryField:"namaProduk"
			}],
			tooltip: {
				visible: true,
				template: "#= category # - #= kendo.format('{0:P}', percentage) #"
			}
		};

		
		
		$scope.Column = [
		
		{
			field: "no",
			title: "No",
			width: 50
		},

		{
			field: "tglPelayanan",
			title: "Tanggal Aktivitas",
			template: "#= new moment(new Date(tglPelayanan)).format('DD-MM-YYYY HH:mm:ss') #"
		},

		{
			field: "namaProduk",
			title: "Keterangan",
		}
		];

		

		$scope.getDataPegawai = function () {
			$scope.pegawaiId = $scope.item.pegawai.id;
			ManageSdm.getItem("sdm/get-data-pegawai?pegawaiId="+$scope.pegawaiId, true).then(function(dat){
				$scope.item.jabatan = dat.data.data.jabatan;
			});
		}
		$scope.toogleEditCell = function(items){
			
			var editableCell;
			if (items.rincianKegiatanId === 10){
				editableCell = true;
			} else {
				editableCell = false;
			}
			return editableCell;
		}
		$scope.cari = function() {
			
			var search={};
			var awal  =   moment($scope.item.from).format("YYYY-MM-DD");
			var akhir = moment($scope.item.until).format("YYYY-MM-DD");

			search.goleti=function(){
				ManageSdm.getOrderList("sdm/get-persen-uraian-kerja/"+awal+"/"+akhir).then(function(dat){
					$scope.sourceyes = dat.data.data;
				});	
			};

			search.find=function(){
				ManageSdm.getOrderList("sdm/get-tindakan-by-user-id/"+awal+"/"+akhir).then(function(dat){
					$scope.patienGrids = dat.data.data;

					var i=0;

					if($scope.patienGrids!=undefined){
						for(i=0;i<$scope.patienGrids.length;i++)
						$scope.patienGrids[i].no=i+1;
					}

					if($scope.patienGrids.length!=0){
						$scope.jmlDataPasien="Jumlah data : " + $scope.patienGrids.length;
					}else{
						$scope.jmlDataPasien="";
					}
					

				});	

				

			};	

			search.goleti();
			search.find ();

			
			

		}

		$scope.mencari = function() {
			
			var awal  =  moment($scope.item.waktu).format("YYYY-MM-DD");
			$scope.tanggal = moment($scope.item.waktu).format("YYYY-MM-DD");
			ManageSdm.getOrderList("sdm/get-uraian-kerja-dan-capaian/"+awal).then(function(dat){
				// $scope.daftarBahanLinen = dat.data.data;
				$scope.daftarBahanLinen2 = new kendo.data.DataSource({
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
					change: function(e){
						if (e.items.length > 0) {
							e.items.forEach(function(elemen){
								$scope.toogleEditCell(elemen)
							})
						}
					},
					aggregate: 
					{ field: "capaian", aggregate: "sum" }
				});
			});	
		}
		
		$scope.getUraianTugas = function(){
			// var awal  = moment($scope.item.waktu).format("YYYY-MM-DD");
			var listRawRequired = [
			"item.waktu|k-ng-model|Periode",
			"item.pegawai|k-ng-model|Pegawai"
			];

			

			var isValid = ModelItem.setValidation($scope, listRawRequired);
			if(isValid.status){
				$scope.isRouteLoading = true;
				ManageSdm.getOrderList("sdm/get-rekapitulasi-capaian/"+DateHelper.getFormatMonthPicker($scope.item.periodeFee)+"/" + $scope.item.pegawai.id).then(function(dat){
					
					var i=0;

					if(dat.data.data.uraianTugas!=undefined){
						for(i=0;i<dat.data.data.uraianTugas.length;i++)
						dat.data.data.uraianTugas[i].no=i+1;
					}

					if(dat.data.data.uraianTugas.length!=0){
						$scope.jmlDataUraianTugas="Jumlah data : " + dat.data.data.uraianTugas.length;
					}else{
						$scope.jmlDataUraianTugas="";
					}

					$scope.opsiGridUraianTugas = {
						selectable: "row",
						scrollable: true,
						
						columns: [
						

						{ "field": "rincianKegiatanId", "title": "Id", width:1, visible: false },
						{ "field": "rincianKegiatan", "title": "Uraian Tugas", "width": 420},
						{ "field": "target", "title": "<center>Target<br/>(/Bulan)</center>", "template": "<span class=\"pull-right\"> #= target # </span>", "width": 60},
						{ "field": "bobot", "title": "<center>Bobot</center>", "template": "<span class=\"pull-right\"> #= bobot # </span>", "width": 60 },
						{"field": "satuan", "title": "<center>Satuan</center>", "width": 60 },
							// { "field": "capaian", "title": "<center>Capaian</center>", "template": "<span class=\"pull-right\"> #= capaian # </span>", "width": 60 }, 
							{ "headerTemplate": getHeader(), "columns": $scope.generateDateUraianTugas(), "attributes": { "style": "text-align:center"}},
							{ field: "total", title: "Total", width: "100px", format: "{0:n2}", attributes: { "class": "table-cell-right" }},
							{ field: "nilai", title: "Nilai", "width": "100px", format: "{0:n2}", attributes: { style: "text-align: right;" }},
							{ field: "hasil", title: "Hasil", width: "100px", format: "{0:n2}", attributes: { style: "text-align: right;" }, aggregates: ["sum"],
							footerTemplate: " #= kendo.toString(sum,'0.00')#", 	footerAttributes: {
								"class": "table-footer-cell",
								style: "text-align: right;"
							}  }
							],
							editable: false,
							dataBound: $scope.onBoundGridUraiantgs
						};
						$scope.gridUraianTugas = new kendo.data.DataSource({
							data: dat.data.data.uraianTugas,
							schema: {
								model: {
									id: "idRincianKegiatan",
									fields: {
										idRincianKegiatan: { editable: false},
										bobot: { type : "number" },
										total: { type : "number" },
										nilai: { type : "number" },
										hasil: { type : "number" },
										satuan: { type : "number" },
										capaian: { type : "number", validation: { min: 0, required: false }},
										rincianKegiatan: {editable: false},
										target: {type : "number", editable: false}
									}
								}
							},
							aggregate: {
								field: "hasil", aggregate: "sum"
							}
						});
						$scope.isRouteLoading = false;
					}, function(error){
						$scope.isRouteLoading = false;
					});
			} else {
				ModelItem.showMessages(isValid.messages);
			}
		}

		$scope.cari();

		// $scope.getUraianTugas();

		// $scope.columnLaporanUjiHasil = [
		// 	{
		// 		"field": "rincianKegiatanId",
		// 		"title": "Id",
		// 		width:1,
		// 		visible: false
		// 	}, {
		// 		"field": "rincianKegiatan",
		// 		"title": "Uraian Tugas"
		// 	}, {
		// 		"field": "target",
		// 		"title": "<center>Target<br/>(/Bulan)</center>",
		// 		"template": "<span class=\"pull-right\"> #= target # </span>",
		// 		"width": 60
		// 	}, {
		// 		"field": "bobot",
		// 		"title": "<center>Bobot</center>",
		// 		"template": "<span class=\"pull-right\"> #= bobot # </span>",
		// 		"width": 60
		// 	}, {
		// 		"field": "capaian",
		// 		"title": "<center>Nilai</center>",
		// 		"template": "<span class=\"pull-right\"> #= capaian # </span>",
		// 		"width": 60
		// 	}, {
		// 		"field": "satuan",
		// 		"title": "<center>Satuan</center>",
		// 		"width": 120
		// 	}
		// ];
		function editorCapaian (container, options) {
			$('<input data-bind="value:' + options.field + '"/>')
			.appendTo(container)
			.kendoNumericTextBox({
				decimals: 0,
				format: "n0"
			});
		}
		$scope.generateDateUraianTugas = function () {
			var year = parseInt(moment($scope.item.waktu).format("Y"))
			var month = parseInt(moment($scope.item.waktu).format("M"))
			var tempDate = new Date(year, month, 0);
			var list = [];
			for (var i = 0; i < tempDate.getDate(); i++) {
				var data = {
					field: "[" + (i + 1) + "]",
					title: (i + 1).toString(),
					// format: "{0:n2}",
					width: "50px",
					// editor: editorCapaian,
					// format: "{0:n0}"
					attributes: {
						"class": "table-cell", style: "text-align: right;  "//font-size: 14px"
					}
					
				};
				list.push(data);
			}
			return list;
		}
		function getHeader(){
			var kolomTitle = "Capaian : " + DateHelper.getBulanFormatted(new Date($scope.item.waktu));
			return kolomTitle;
		}

		// $scope.Save = function () {
		// 	var detail = $scope.gridUraianTugas._data;
		// 	var detailHV = [];
		// 	console.log(detail);
		// 	
		// 	var data;
		// 	for(var x = 0 ; x < detail.length;x++){
		// 		console.log(detail[x]);
		// 		var tmpdat = {
		// 			"rincianKegiatan": {"id":""	},
		// 			"hasil":"",
		// 			"periode":"",
		// 			"total":"",
		// 			"pegawai":{	"id":""	},
		// 			"detailUraianTugas": [
		// 			{
		// 				"capaian": detail[x].capaian,
		// 				"rincianKegiatan": {
		// 					"id": detail[x].rincianKegiatanId
		// 				},
		// 				"pegawai": {
		// 					"id": idPgw
		// 				},
		// 				"tanggal": $scope.tanggal
		// 			}
		// 			]
		// 		}
		// 		detailHV.push(tmpdat);
		// 	}
		// 	//get TypeError: Cannot read property 'forEach' of undefined

		// 	//	console.log(detailHV)
		// 	var data1 = {
		// 		"uraianTugas": detailHV
		// 	}
		// 	//console.log(JSON.stringify(data1));
		// 	ManageSdm.saveDataUji(data1,"sdm/save-uraian-tugas-transaksi/").then(function (e) {
		// 		//console.log(JSON.stringify(e.data));
		// 		//$scope.Back();
		// 	});

		// 	//	$scope.daftarBahanLinen = [];
		// };

		// ManageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true").then(function (dat) {
		// 	$scope.listPegawai = dat.data;
		// });

		$scope.isShowPopUp = false;
		$scope.openWindow = function(){
			
			var myWindow = $("#winPopUp");
			myWindow.data("kendoWindow").open();
			$scope.isShowPopUp = true;	
		}

		$scope.isShowPopUp2 = false;
		$scope.openWindow2 = function(){
			
			var myWindow = $("#winPopUp2");
			myWindow.data("kendoWindow").open();
			$scope.isShowPopUp2 = true;
		}

		$scope.cetakLapBook = function() {
			
			var periode = DateHelper.formatDate($scope.item.until, "YYYY-MM");
			var urlLaporan = CetakHelper.openURLReporting("reporting/lapLogbookPegawai?idPegawai="+$scope.item.pegawai.id+"&periode="+periode);
			window.open(urlLaporan, '_blank');
		};

		$scope.cetakLapCapaian = function() {
			
			var periode = DateHelper.formatDate($scope.item.until, "YYYY-MM-DD");// 2017-08-01 & dr. Toto Wisnu Hendrarto
			var urlLaporan = CetakHelper.openURLReporting("reporting/lapCapaianKinerja?idAtasan="+$scope.item.pegawai.id+"&date="+periode);
			window.open(urlLaporan, '_blank');
		};	

		$scope.cancelData = function(){
			var myWindow = $("#winPopUp");
			myWindow.data("kendoWindow").close();

			//isi codingan buat cancel data yang di edit
		}

		$scope.cancelData2 = function(){
			var myWindow = $("#winPopUp2");
			myWindow.data("kendoWindow").close();

			//isi codingan buat cancel data yang di edit
		}
		// function getPoinLogBook(){
		// 	var gridKinerja = $("#gridOrder").data("kendoGrid");
		// 	var totalPoinCapaian = gridKinerja.dataSource.aggregates();
		// 	
		// 	console.log(JSON.stringify(totalPoinCapaian.pointQty.sum));
		// }
		$scope.cariLogbookKinerja = function() {
			var listRawRequired = [
			"item.pegawai|k-ng-model|Nama pegawai",
			"item.periode|k-ng-model|Periode"
			]
			var isValid = ModelItem.setValidation($scope, listRawRequired);
			if(isValid.status){
				$scope.isRouteLoading = true;
				FindSdm.getDataLogbookKinerja(DateHelper.getDateTimeFormatted3($scope.item.periode), $scope.item.pegawai.id).then(function(dat) {
					var dataGrid = [];
					if(!dat.data.data) {
						$scope.isRouteLoading = false;
						return toastr.success('Data tidak ditemukan', 'Info');
					};
					dat.data.data.forEach(function(element){
						var customData = {};
						for (var key in element){
							switch (key) {
								case "datas" :
								var lisObjek = element.datas;
								lisObjek.forEach(function(subElement){
									var tgl = subElement.tanggal;
									var key = tgl.slice(-2);
									if(key[0] === "0"){
										key = key.slice(-1);
										customData[key] = subElement["count"];
									} else {
										customData[key] = subElement["count"];
									};
								});
								break;
								default :
								customData[key] = element[key];
								break;
							}
						};

						dataGrid.push(customData);


						var i=0;

						if(dataGrid!=undefined){
							for(i=0;i<dataGrid.length;i++)
							dataGrid[i].no=i+1;
						}

						if(dataGrid.length!=0){
							$scope.jmlDataOrder="Jumlah data : " + dataGrid.length;
						}else{
							$scope.jmlDataOrder="";
						}

					});
					$scope.mainGridOption = {
						dataSource: {
							data: dataGrid,
							aggregate: [
							{ field: "totalTindakan", aggregate: "sum"},
							{ field: "pointQty", aggregate: "sum"}
							]
						},				
						toolbar: [
						"excel", 
						],
						excel: {
							fileName: "lapLogbookPegawai "+ $scope.item.pegawai.namaLengkap + " " +DateHelper.getFormatMonthPicker($scope.item.periode) +".xlsx",
							allPages: true,
						},
						excelExport: function(e){
							var sheet = e.workbook.sheets[0];
							sheet.frozenRows = 2;
							sheet.mergedCells = ["A1:AK1"];
							sheet.name = "Orders";

							var myHeaders = [{
								value:"Logbook " + $scope.item.pegawai.namaLengkap + $scope.item.pegawai.namaLengkap  + " ( Periode " + dateHelper.getFormatMonthPicker($scope.item.periode) +" )",
								fontSize: 20,
								textAlign: "center",
								background:"#ffffff",
                         // color:"#ffffff"
                     }];

                     sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 70});
                 },
                 editable: false,
                 scrollable: true,
                 selectable: "row",
                 columns: [
							// { field: "tanggal", title: "Tanggal", aggregates: ["count"], groupHeaderTemplate: "Tanggal: #= value # (Jumlah: #= count#)" },
							{ field: "namaProduk", title: "Tugas", width: 400},
							{ field: "namaKelas", title: "Kelas", width: 100  },
							{ field: "produkId", title: "idProduk", hidden: true },
							// { field: "detailId", title: "idDetailProduk", hidden: true },
							// { field: "idJenisProduk", title: "idJenisProduk", hidden: true },
							{ field: "poin", title: "Poin",  headerAttributes: { style: "text-align: center"}, width: 80, format: "{0:n2}", attributes: {
								"class": "table-cell", style: "text-align: right;"
							}},
							{ field: "hargaKelas1", title: "Tarif (Rp.)", "template" : '# if( hargaKelas1 != null ) {# #= hargaKelas1# #} else {# #= harga# #} #', format: "{0:n0}", width: 100, headerAttributes: { style: "text-align: center"}, attributes: {
								"class": "table-cell", style: "text-align: right;  "//font-size: 14px;"
							} },
							// { field: "Pencapaian", headerAttributes: { style: "text-align: center"}, columns: $scope.generateGridColumn() },
							{ title: "Total",  headerAttributes: { style: "text-align: center"}, columns: [
							{ field: "totalTindakan", title: "Tindakan", width: 80, 
							headerAttributes: { style: "text-align: center"}, attributes: { style: "text-align: right;" }, aggregates: ["sum"],  
							footerTemplate: "#= sum #",
							footerAttributes: {
								"class": "table-footer-cell",
								style: "text-align: right;"
							}   },
							{ field: "pointQty", title: "Poin", width: 80, headerAttributes: { style: "text-align: center"},
							attributes: { style: "text-align: right;" }, 
							aggregates: ["sum"], format: "{0:n2}", 
							footerTemplate: " #= kendo.toString(sum, 'n2') #", 
							footerAttributes: {
								"class": "table-footer-cell",
								style: "text-align: right;"
							}   },
								// { field: "pointQty", title: "Poin", aggregates: ["sum"], headerAttributes: { style: "text-align: center"}, footerTemplate: "<b>Total Poin:</b>  #= kendo.toString(sum, 'n2') #", template: "#= kendo.toString(pointQty, 'n2') #", attributes: {
								// "class": "table-cell", style: "text-align: right;  "//font-size: 14px"
								// } }

								]},{ field: "idKelas", title: "idKelas", hidden: true  }
								],
								dataBound: $scope.onDataBound
							};
							$scope.dataSource = new kendo.data.DataSource({
								data: dataGrid,
								aggregate: [
								{ field: "totalTindakan", aggregate: "sum"},
								{ field: "pointQty", aggregate: "sum"}
								]
							});
					// if(dataGrid.length > 0){
						$scope.showCetakLogbook = true;
					// } else {
					// 	$scope.showCetakLogbook = false;
					// }
					// getPoinLogBook();
					$scope.isRouteLoading = false;
				},(error) => {
					$scope.isRouteLoading = false;
					throw(error);
				});
} else {
	ModelItem.showMessages(isValid.messages);
}
};



$scope.generateGridColumn =  function(){
	var year = $scope.item.periode.getYear();
	var month = $scope.item.periode.getMonth();
	var dateInMonth = new Date(year, month + 1, 0);
	var listDay = [];
	for(var i=0; i<dateInMonth.getDate(); i++){
		var data = {
			field: "["+(i+1)+"]",
			title: (i+1).toString()  ,
			width: "50px", attributes: { style: "text-align: right;" },
					 headerAttributes: { style: "text-align: center;  "}//font-size: 14px"} 
					};
					listDay.push(data);
				}
				return listDay;
			}
			$scope.onDataBound = function(e){
				var closestGridElement = e.sender.element.closest('[data-role="grid"]');
				var gridId = closestGridElement.attr('id');
			// console.log(id);
			var grid = $("#" + gridId).data("kendoGrid");
			var model = $parse(gridId);
			var value = grid.dataSource.aggregates().pointQty.sum;
			model.assign($scope, value.toFixed(2));
			$(grid.tbody).on("click", "td", function (e) {
				e.stopImmediatePropagation();
				if (e.currentTarget.innerText === "") return; // disable show popup on empty cell date value
				var row = $(this).closest("tr");
				var selectedData = grid.dataItem(row);
				// var rowIdx = $("tr", grid.tbody).index(row);
				var colIdx = $("td", row).index(this);
				// if (colIdx >= 5){
				if (colIdx == 5){
					// disable show popup if cell index < 5
					var colDateIdx = colIdx - 5;
					var colName = $("#" + gridId + ' tr').eq(1).find('th').eq(colDateIdx).text();

					// if(colName.length === 1){
					// 	colName = "0" + colName;
					// }
					// if (colName.length <= 2){
					if (colName == "Tindakan"){
						// show detail on date cell click only
						if(gridId === "gridOrder"){
							// var akhir = DateHelper.getFormatMonthPicker($scope.item.periode) + "-" + colName;
							var akhir = DateHelper.getDateTimeFormatted3($scope.item.periode);
							var ffs = false;
						} else if (gridId === "gridOrderService"){
							// var akhir = DateHelper.getFormatMonthPicker($scope.item.periodeFee) + "-" + colName;
							var akhir = DateHelper.getDateTimeFormatted3($scope.item.periodeFee);
							var ffs = true;
						}
						
						$scope.showDetail(selectedData.idProduk, selectedData.idKelas, $scope.item.pegawai.id, akhir,ffs );
					}
					
				}
				
				// var colIdx = colIdx.toString();
				
				// if (colIdx.length === 1){
				// 	colIdx = "0" + colIdx
				// }
				// var akhir  =  moment($scope.item.akhir).format("YYYY-MM");
				// akhir = akhir + "-" + colIdx;
				// // alert(rowIdx + '-' + colIdx);
				// // findSdm.getDetilPoin(akhir, $scope.item.pegawai.id).then(function(data){
				// // 	$scope.dats = data.data.data;
				// // }).then(function(){
				// // 	if ($scope.dats.listData.length == 0) return;
				// 	$scope.showDetail(akhir, $scope.item.pegawai.id);
				// // });
			});
		}
		$scope.showDetail = function(idProduk, idKelas, idPegawai, tgl, ffs){
			$scope.isRouteLoading = true;
			FindSdm.getDetilLogbookKinerja(idProduk, idKelas, idPegawai, tgl, ffs).then(function(data){
				$scope.dats = data.data.data;
				$scope.dats.tgl = DateHelper.formatDate(tgl, "dd-MM-yyyy");
				$scope.detilGridOptions = {
					scrollable: true,
					columns: [{
						"field": "namaProduk",
						"title": "Nama Tindakan",
						"width": 400
					}, {
						"field": "tglpelayanan",
						"title": "Tanggal",
						"template": "#= kendo.toString(kendo.parseDate(new Date(tglpelayanan)), 'dd-MM-yyyy') #",
						"width": 90,
						"attibutes": {
							"class": "table-cell",
							"style": "text-align: center;"
						}
					}, {
						"field": "tglpelayanan",
						"title": "Jam",
						"template": "#= kendo.toString(kendo.parseDate(new Date(tglpelayanan)), 'HH:mm') #",
						"width": 90,
						"attibutes": {
							"class": "table-cell",
							"style": "text-align: center;"
						}
					}, {
						"field": "ruangan",
						"title": "Ruangan",
						"width": 200
					}, {
						"field": "namaKelas",
						"title": "Kelas",
						"width": 100
					}, {
						"field": "harga",
						"title": "Harga",
						"template": "#= kendo.toString(harga, 'n0') #",
						"width": 120,
						"attibutes": {
							"class": "table-cell",
							"style": "text-align: right;"
						}
					}, {
						"title": "Pasien",
						"columns": [
						{ "field": "noCm", "title": "No. CM", "width": 100},
						{ "field": "noRegistrasi", "title": "No. Reg", "width": 150},
						{ "field": "namapasien", "title": "Nama", "width": 300}
						]
					}, { 
						"field": "jenisPetugas", "title": "Petugas", "width": 150
					}]
				}
				$scope.dataDetil = new kendo.data.DataSource({
					data: data.data.data,
					// aggregate: [
					//     { field: "point", aggregate: "sum" }
					// ]
				});
				$scope.isRouteLoading = false;
				$scope.winDialog.center().open();
			}, (error) => {
				$scope.isRouteLoading = false;
			})
		}
		$scope.cetakLogBookKinerja = function(){
			var listRawRequired = [
			"item.pegawai|k-ng-model|Nama pegawai",
			"item.periodeCetak|k-ng-model|Periode"
			]
			var isValid = ModelItem.setValidation($scope, listRawRequired);
			if(isValid.status){
				var fixUrlLaporan = cetakHelper.openURLReporting("reporting/lapLogbookKinerjaStaffMedis?idDokter="+$scope.item.pegawai.id+"&periode=" + DateHelper.getFormatMonthPicker($scope.item.periodeCetak));
				window.open(fixUrlLaporan, '', 'width=800,height=600')
			} else {
				ModelItem.showMessages(isValid.messages);
			}
		}
		
		$scope.cetakDaftarLogBookKinerja = function(){
			var listRawRequired = [
			"item.pegawai|k-ng-model|Nama pegawai",
			"item.periode|k-ng-model|Periode"
			]
			var isValid = ModelItem.setValidation($scope, listRawRequired);
			if(isValid.status){ 
				var fixUrlLaporan = cetakHelper.openURLReporting("reporting/lapLogbookPegawaiVer2?idPegawai="+$scope.item.pegawai.id+"&periode=" + DateHelper.getFormatMonthPicker($scope.item.periode) + "&isFFS=false");
				window.open(fixUrlLaporan, '', 'width=800,height=600')
			} else {
				ModelItem.showMessages(isValid.messages);
			}
		}
		
		$scope.cetakDaftarLogBookKinerjaFFS = function(){
			var listRawRequired = [
			"item.pegawai|k-ng-model|Nama pegawai",
			"item.periodeFee|k-ng-model|Periode"
			]
			var isValid = ModelItem.setValidation($scope, listRawRequired);
			if(isValid.status){ 
				var fixUrlLaporan = cetakHelper.openURLReporting("reporting/lapLogbookPegawaiVer2?idPegawai="+$scope.item.pegawai.id+"&periode=" + DateHelper.getFormatMonthPicker($scope.item.periodeFee) + "&isFFS=true");
				window.open(fixUrlLaporan, '', 'width=800,height=600')
			} else {
				ModelItem.showMessages(isValid.messages);
			}
		}
		
		$scope.cetakDaftarLogBookKinerjaRekap = function(){
			var listRawRequired = [
			"item.pegawai|k-ng-model|Nama pegawai",
			"item.periodeRekaps|k-ng-model|Periode"
			]
			var isValid = ModelItem.setValidation($scope, listRawRequired);
			if(isValid.status){ 
				var fixUrlLaporan = cetakHelper.openURLReporting("reporting/lapLogbookPegawaiRekap?idPegawai="+$scope.item.pegawai.id+"&periode=" + DateHelper.getFormatMonthPicker($scope.item.periodeRekaps) );
				window.open(fixUrlLaporan, '', 'width=800,height=600')
			} else {
				ModelItem.showMessages(isValid.messages);
			}
		}

		$scope.cetakDaftarLogBookKinerjaRekapWithPasien = function(){
			var listRawRequired = [
			"item.pegawai|k-ng-model|Nama pegawai",
			"item.periode|k-ng-model|Periode"
			]
			var isValid = ModelItem.setValidation($scope, listRawRequired);
			if(isValid.status){ 
				var fixUrlLaporan = cetakHelper.openURLReporting("reporting/logbookTindakanDokterDetailPasien?periode=" + DateHelper.getFormatMonthPicker($scope.item.periode) +"&idPegawai="+$scope.item.pegawai.id+"&ffs=false" );
				window.open(fixUrlLaporan, '', 'width=800,height=600')
			} else {
				ModelItem.showMessages(isValid.messages);
			}
		}

		$scope.cetakDaftarLogBookKinerjaRekapWithPasienFFs = function(){
			var listRawRequired = [
			"item.pegawai|k-ng-model|Nama pegawai",
			"item.periodeFee|k-ng-model|Periode"
			]
			var isValid = ModelItem.setValidation($scope, listRawRequired);
			if(isValid.status){ 
				var fixUrlLaporan = cetakHelper.openURLReporting("reporting/logbookTindakanDokterDetailPasien?periode=" + DateHelper.getFormatMonthPicker($scope.item.periodeFee) +"&idPegawai="+$scope.item.pegawai.id+"&ffs=true" );
				window.open(fixUrlLaporan, '', 'width=800,height=600')
			} else {
				ModelItem.showMessages(isValid.messages);
			}
		}

		$scope.getFeeService = function() {
			var listRawRequired = [
			"item.pegawai|k-ng-model|Nama pegawai",
			"item.periodeFee|k-ng-model|Periode"
			]
			var isValid = ModelItem.setValidation($scope, listRawRequired);
			if(isValid.status){
				$scope.isRouteLoading = true;
				FindSdm.getFeeForServiceDokter(DateHelper.getFormatMonthPicker($scope.item.periodeFee), $scope.item.pegawai.id).then(function(dat) {
					var dataGrid = [];
					if(!dat.data.data) {
						$scope.isRouteLoading = false;
						return toastr.success('Data tidak ditemukan', 'Info');
					};
					dat.data.data.forEach(function(element){
						var customData = {};
						for (var key in element){
							switch (key) {
								case "datas" :
								var lisObjek = element.datas;
								lisObjek.forEach(function(subElement){
									var tgl = subElement.tanggal;
									var key = tgl.slice(-2);
									if(key[0] === "0"){
										key = key.slice(-1);
										customData[key] = subElement["count"];
									} else {
										customData[key] = subElement["count"];
									};
								});
								break;
								default :
								customData[key] = element[key];
								break;
							}
						};

						dataGrid.push(customData);

						var i=0;

						if(dataGrid!=undefined){
							for(i=0;i<dataGrid.length;i++)
							dataGrid[i].no=i+1;
						}

						if(dataGrid.length!=0){
							$scope.jmlDataOrderService="Jumlah data : " + dataGrid.length;
						}else{
							$scope.jmlDataOrderService="";
						}

					});
					$scope.gridFeeService = {
						dataSource: {
							data: dataGrid,
							aggregate: [
							{ field: "totalTindakan", aggregate: "sum"},
							{ field: "pointQty", aggregate: "sum"}
							]
						},			
						toolbar: [
						"excel", 
						],
						excel: {
							fileName: "lapFeeForServicePegawai "+ $scope.item.pegawai.namaLengkap + " " +DateHelper.getFormatMonthPicker($scope.item.periodeFee) +".xlsx",
							allPages: true,
						},
						excelExport: function(e){
							var sheet = e.workbook.sheets[0];
							sheet.frozenRows = 2;
							sheet.mergedCells = ["A1:AK1"];
							sheet.name = "Orders";

							var myHeaders = [{
								value:"Logbook " + $scope.item.pegawai.namaLengkap  + " ( Periode " + dateHelper.getFormatMonthPicker($scope.item.periodeFee) +" )",
								fontSize: 20,
								textAlign: "center",
								background:"#ffffff",
                         // color:"#ffffff"
                     }];

                     sheet.rows.splice(0, 0, { cells: myHeaders, type: "header", height: 70});
                 },
                 editable: false,
                 scrollable: true,
                 selectable: "row",
                 columns: [
							// { field: "tanggal", title: "Tanggal", aggregates: ["count"], groupHeaderTemplate: "Tanggal: #= value # (Jumlah: #= count#)" },
							{ field: "namaProduk", title: "Tugas", width: 400},
							{ field: "namaKelas", title: "Kelas", width: 100  },
							{ field: "produkId", title: "idProduk", hidden: true },
							// { field: "detailId", title: "idDetailProduk", hidden: true },
							// { field: "idJenisProduk", title: "idJenisProduk", hidden: true },
							{ field: "poin", title: "Poin",  headerAttributes: { style: "text-align: center"}, width: 80, format: "{0:n2}", attributes: {
								"class": "table-cell", style: "text-align: right;"
							}},
							{ field: "hargaKelas1", title: "Tarif (Rp.)", "template" : '# if( hargaKelas1 != null ) {# #= hargaKelas1# #} else {# #= harga# #} #', format: "{0:n0}", width: 100, headerAttributes: { style: "text-align: center"}, attributes: {
								"class": "table-cell", style: "text-align: right;  "//font-size: 14px;"
							} },
							{ field: "Pencapaian", headerAttributes: { style: "text-align: center"}, columns: $scope.generateKolomFeeService() },
							{ title: "Total",  headerAttributes: { style: "text-align: center"}, columns: [
							{ field: "totalTindakan", title: "Tindakan", width: 80,
							headerAttributes: { style: "text-align: center"}, aggregates: ["sum"], attributes: { style: "text-align: right;" },
							footerTemplate: "#= sum #", 	footerAttributes: {
								"class": "table-footer-cell",
								style: "text-align: right;"
							}  },
							{ field: "pointQty", title: "Poin", width: 80,
							headerAttributes: { style: "text-align: center"}, attributes: { style: "text-align: right;" }, aggregates: ["sum"], format: "{0:n2}",
							footerTemplate: "#= kendo.toString(sum, 'n2') #", 	footerAttributes: {
								"class": "table-footer-cell",
								style: "text-align: right;"
							}   },
								// { field: "pointQty", title: "Poin", aggregates: ["sum"], headerAttributes: { style: "text-align: center"}, footerTemplate: "<b>Total Poin:</b>  #= kendo.toString(sum, 'n2') #", template: "#= kendo.toString(pointQty, 'n2') #", attributes: {
								// "class": "table-cell", style: "text-align: right;  "//font-size: 14px"
								// } }

								]},{ field: "idKelas", title: "idKelas", hidden: true  }
								],
								dataBound: $scope.onDataBound
							};
							$scope.isRouteLoading = false;
						},(error) => {
							$scope.isRouteLoading = false;
							throw(error);
						});
} else {
	ModelItem.showMessages(isValid.messages);
}
};
		$scope.generateKolomFeeService =  function()
		{
			var year = $scope.item.periodeFee.getYear();
			var month = $scope.item.periodeFee.getMonth();
			var dateInMonth = new Date(year, month + 1, 0);
			var listDay = [];
			for(var i=0; i<dateInMonth.getDate(); i++){
				var data = {
					field: "["+(i+1)+"]",
					title:  (i+1).toString()  ,
					width: "50px",attributes: { style: "text-align: right;" }, headerAttributes: { style: "text-align: center; "}  };								
					listDay.push(data);
				}
				return listDay;
			} 
	$scope.onBoundGridUraiantgs = function(e){
			// $scope.items = {};
			var grid = $("#gridUraianTugas").data("kendoGrid");
			$(grid.tbody).on("click", "td", function (e) {
				if (e.currentTarget.innerText === "") return; // disable show popup on empty cell date value
				var row = $(this).closest("tr"),
				selectedData = grid.dataItem(row),
				colIdx = $("td", row).index(this);
				if (colIdx >= 5){
					// only enable popup on date column cell click
					var colDateIdx = colIdx - 5,
					colName = $('#gridUraianTugas tr').eq(1).find('th').eq(colDateIdx).text(),
					capaian = selectedData[colDateIdx];
					if(colName.length === 1){
						colName = "0" + colName;
					}

					if (colName.length <= 2){
						// show detail on date cell click only
						selectedData.tglInput = new Date(DateHelper.getFormatMonthPicker($scope.item.waktu) + "-" + colName);
						selectedData.capaian = capaian;
						$scope.items = selectedData;
						$scope.inputCapaian.center().open();
					}
				}
			});
		}
		
		$scope.formatInt ={
			format: "n0",
			min: 0
		}

		$scope.mainGridOptions = { 
			 dataBound: function() {
                          this.pager
                          	.element
                          	.append(
                            	'<span class="k-pager-info k-label">' + 
                            		this.dataSource.total() + 
                            	' items</span>'
                          	);
                        },
		};
		
		$scope.simpanCapaian = function(data){
			var item = {
				"uraianTugas": [
				{
					"detailUraianTugas": [
					{
						"capaian": data.capaian,
						"rincianKegiatan": {
							"id": data.idRincianKegiatan
						},
						"pegawai": {
							"id": $scope.item.pegawai.id
						},
						"tanggal": data.tglInput.getTime()
					}
					]
				}
				]
			}
			ManageSdm.saveDataUji(item,"sdm/save-uraian-tugas-transaksi/").then(function (e) {
				$scope.getUraianTugas();
				$scope.inputCapaian.close();
			}, function(error){
				throw error;
			});
		}
	}
	])
});