define(['initialize'], function(initialize) {
	'use strict';
	initialize.controller('InputUraianTugasPegawaiLoginCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', 'ManageSdm', 'DateHelper', '$state','$mdDialog','CetakHelper',
		function($q, $rootScope, $scope, ModelItem, ManageSdm, DateHelper, $state,$mdDialog,CetakHelper) {
			$scope.now = new Date();
			$scope.item = {
				tanggal: $scope.now,
				periode: $scope.now
			};
			$scope.dataGridUraiantugas = {
				toolbar: [{
					name: "create", text: "Tambah"
				}],
				editable: { mode: "popup", window: {
					title: "Uraian Tugas Pegawai",
					width: "auto"
				} },
				columns: [
					{
						field: "noRec",
						title: "",
						hidden: true, hideMe: true
					},
					// {
					// 	field: "namaPegawai",
					// 	title: "Nama Pegawai",
					// 	hideMe: true
					// },
					{
						field: "idPegawai",
						title: "Pegawai",
						hidden: true, 
						editor: pegawaiDropDownEditor
					},{
						field: "rincianKegiatan",
						title: "Nama Kegiatan"
					},
					{
						field: "waktu",
						title: "Waktu(mnt)",
						width: "5%"
					},
					{
						field: "volume",
						title: "Volume",
						width: "5%"
					},
					{
						field: "satuan",
						title: "Satuan",
						width: "5%"
					},
					{
						field: "namaAtasan",
						title: "Nama Atasan", 
						hideMe: true
					},
					{
						field: "approvalStatus",
						title: "Status",
						template: "#if(approvalStatus){# #: 'disetujui' # #} else {# #: '-' # #}#",
						hideMe: true
					},
					{command: [{name: "edit", text: "Edit"}], title: "&nbsp;", width: "6%" }
				],
				pageable: true,
				scrollable: false,
				selectable: "row",
				edit: function(e){
                    var editWindow = this.editable.element.data("kendoWindow");
                    editWindow.wrapper.css({ width: 600 });

					e.sender.columns.forEach(function (element, index /*, array */) {
						if (element.hideMe) {
							e.container.find(".k-edit-label:eq(" + index + "), "
								+ ".k-edit-field:eq( " + index + ")"
							).hide();
						}
					});
				},
				save: function(e){
					$scope.Save(e.model);
				}
			}
			$scope.dataGridUraiantugasVerif = {
				columns: [
					{
						field: "noRec",
						title: "",
						hidden: true, hideMe: true
					},
					// {
					// 	field: "namaPegawai",
					// 	title: "Nama Pegawai",
					// 	hideMe: true
					// },
					{
						field: "idPegawai",
						title: "Pegawai",
						hidden: true, 
						editor: pegawaiDropDownEditor
					},{
						field: "rincianKegiatan",
						title: "Nama Kegiatan"
					},
					{
						field: "waktu",
						title: "Waktu(mnt)",
						width: "5%"
					},
					{
						field: "volume",
						title: "Volume",
						width: "5%"
					},
					{
						field: "satuan",
						title: "Satuan",
						width: "5%"
					},
					{
						field: "namaAtasan",
						title: "Nama Atasan", 
						hideMe: true
					},
					{
						field: "approvalStatus",
						title: "Status",
						template: "#if(approvalStatus){# #: 'disetujui' # #} else {# #: '-' # #}#",
						hideMe: true
					},
					// {command: [{name: "edit", text: "Edit"}], title: "&nbsp;", width: "6%" }
				],
				pageable: true,
				scrollable: false,
				selectable: "row",
				// edit: function(e){
                //     var editWindow = this.editable.element.data("kendoWindow");
                //     editWindow.wrapper.css({ width: 600 });

				// 	e.sender.columns.forEach(function (element, index /*, array */) {
				// 		if (element.hideMe) {
				// 			e.container.find(".k-edit-label:eq(" + index + "), "
				// 				+ ".k-edit-field:eq( " + index + ")"
				// 			).hide();
				// 		}
				// 	});
				// },
				// save: function(e){
				// 	$scope.Save(e.model);
				// }
			}
			$q.all([
				ManageSdm.getOrderList("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true"),
				ModelItem.getPegawai()
			]).then(function(result){
				$scope.listPegawai = result[0].data;
				$scope.pegawai = result[1];
			}, function(error){
				console.log(error);
			}).then(function(){
				ManageSdm.getItem("sdm/get-pegawai-atasan/" + $scope.pegawai.id).then(function(res){
					if(res.data.data.length > 0){
						$scope.item.atasanLangsung = {
							id: res.data.data[0].idAtasanLangsung,
							namaLengkap: res.data.data.namaAtasanLangsung
						};
						$scope.item.atasanPejabatPenilai = {
							id: res.data.data[0].idAtasanPejabatPenilai,
							namaLengkap: res.data.data.namaAtasanPejabatPenilai
						};
						$scope.isMappingAtasan = true;
					} else {
						$scope.isMappingAtasan = false;
						messageContainer.log('Data mapping atasan belum tersedia');
					}
					$scope.loadGrid();
					$scope.loadGridVerif();
				})
			})
			$scope.loadGrid = function(){
				ManageSdm.getItem("sdm/get-list-uraian-tugas-flexible-by-date/"+$scope.pegawai.id+"/"+ DateHelper.getDateTimeFormatted3($scope.item.tanggal)).then(function(result){
					var tempData = result.data.data, gridData = [];
					$scope.dataSource = new kendo.data.DataSource({
						pageSize: 15,
						data: tempData,
						schema: {
							model: {
								id: "noRec",
								fields: {
									noRec: {editable: false},
									rincianKegiatan: {editable: true, validation: { 
										validasiKomponenRincianK: function (input) {
										if (input.is("[name='rincianKegiatan']") && input.val() === "") {                        
											return false;
										}
										return true;
										}
									}},
									approvalStatus: {editable: false},
									volume: {editable: true, validation: { 
										validasiKomponenVolume: function (input) {
										if (input.is("[name='volume']") && input.val() === "") {                        
											return false;
										}
										return true;
										}
									}},
									satuan: {editable: true, validation: { 
										validasiKomponenSatuan: function (input) {
										if (input.is("[name='satuan']") && input.val() === "") {                        
											return false;
										}
										return true;
										}
									}},
									// tgl: {editable: true, validation: { 
									// 	validasiKomponenTgl: function (input) {
									// 	if (input.is("[name='tgl']") && input.val() === "") {                        
									// 		return false;
									// 	}
									// 	return true;
									// 	}
									// }},
									waktu: {editable: true, validation: { 
										validasiKomponenWaktu: function (input) {
										if (input.is("[name='waktu']") && input.val() === "") {                        
											return false;
										}
										return true;
										}
									}},
									idPegawai: {editable: true, validation: { 
										validasiKomponenPegawai: function (input) {
										if (input.is("[name='idPegawai']") && input.val() === "") {                        
											return false;
										}
										return true;
										}
									}, defaultValue: $scope.pegawai.id},
									idAtasan: {editable: true, validation: { 
										validasiKomponenAtasan: function (input) {
										if (input.is("[name='idAtasan']") && input.val() === "") {                        
											return false;
										}
										return true;
										}
									}, defaultValue: $scope.item.atasanLangsung.id},
									idAtasan: {editable: false},
									namaAtasan: {editable: false},
								}
							}
						}
					});
				})
			}
			$scope.loadGridVerif = function(){
				ManageSdm.getItem("sdm/get-list-uraian-tugas-verified-monthly/"+$scope.pegawai.id+"/"+ DateHelper.getFormatMonthPicker($scope.item.periode)).then(function(result){
					var tempData = result.data.data, gridData = [];
					$scope.dataSourceVerif = new kendo.data.DataSource({
						pageSize: 15,
						data: tempData
					});
				})
			}
			function pegawaiDropDownEditor(container, options) {
                $('<input required name="' + options.field + '" style="width:100%" disabled="isMappingAtasan"/>')
                    .appendTo(container)
                    .kendoDropDownList({
                        dataTextField: "namaLengkap",
                        dataValueField: "id",
                        dataSource: $scope.listPegawai
                    });
			}
			$scope.Save = function(item){
				var item = {
					"noRec": item.noRec,
					"rincianKegiatan": item.rincianKegiatan,
					"waktu": item.waktu,
					"volume": item.volume,
					"satuan": item.satuan,
					// "atasan": {
					// 	"id": item.idAtasan
					// },
					"tgl": DateHelper.getDateTimeFormatted3(new Date()),
					"pegawai": {
							"id": item.idPegawai
					},
					"statusEnabled": true,
					"approvalStatus": ""
				}
				ManageSdm.saveDataList("sdm/save-uraian-tugas-flexible", item).then(function(e){
					$scope.loadGrid();
				})
				// alert(JSON.stringify(item));
				
				
			}
			$scope.monthSelectorOptions = {
				value: $scope.now,
				start: "year",
                depth: "year",
                format: "MMM yyyy"
			};
		}
	]);
});
