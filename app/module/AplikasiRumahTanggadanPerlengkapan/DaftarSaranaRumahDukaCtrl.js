define(['initialize'], function (initialize) {
	'use strict';
	initialize.controller('DaftarSaranaRumahDukaCtrl', ['$q', '$rootScope', '$scope', 'ModelItem', 'DateHelper', 'ManageSarpras', '$state', '$window',
		function ($q, $rootScope, $scope, ModelItem, DateHelper, ManageSarpras, $state, $window) {
			function init(){
				$scope.dataVOloaded = true;
				$scope.item = {};
				$scope.isRouteLoading = true;
                $scope.gridOptions = {
                    toolbar: [{text: "Input Baru", name: "create"}],
                    editable: "popup",
                    scrollable: false,
                    pageable: true,
                    columns: [
                        { field: "id", hideMe: true, hidden: true },
                        { field: "rowNumber", title: "<h3 align=center>#<h3>", attributes: {style: "text-align:right"} , width: 20, hideMe: true },
                        { field: "namaKebutuhan", title: "<h3 align=center>Nama Barang<h3>"},
                        { field: "jumlah", title: "<h3 align=center>Jumlah<h3>", width: 80, attributes: {style: "text-align:right"} },
                        { field: "satuan", title: "<h3 align=center>Satuan<h3>", width: 80 },
                        { field: "harga", title: "<h3 align=center>Harga (Rp)<h3>", aggregates: ["sum"], width: 80, format: "{0:n0}", attributes: {style: "text-align:right"}},
                        { command: [{text: "Edit", click: clickDetilSarana}, {text:"Hapus", click: clickDetilSarana}], width: 160}
                    ],
                    dataBound: function(e) {
                        e.sender._data.forEach(function(elemen, index){
                            elemen.rowNumber = ++index;
                        })
                    },
                    edit: function(e){
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
                };
				$q.all([
					ManageSarpras.getOrderList("pemakaian-rumah-duka/find-kamar-rumah-duka/")
				]).then(function(res){
                    $scope.sourceKamar = res[0].data.data;
					$scope.isRouteLoading = false;
				}, (err) => {
					$scope.isRouteLoading = false;
					throw err;
				}).then(function(){
                    $scope.item.kamar = $scope.sourceKamar[0];
                });
            };
            $scope.getDetilSarana = function(req){
                if(!req && !req.idKamar) return;
                $scope.isRouteLoading = true;
                ManageSarpras.getOrderList("map-kebutuhan-sarana-to-kamar/get-all-data?idKamar="+req.idKamar).then(function(res){
                    // debugger;
                    var data = res.data.data?res.data.data:[];
                    var grid = $("#gridSarana").data("kendoGrid");
                    var ds = new kendo.data.DataSource({
                        data: data,
                        schema: {
                            model: {
                                id: "id",
                                fields: {
                                    id: {editable: false},
                                    rowNumber: {editable: false},
                                    namaKebutuhan: { editable: true, nullable: false, validation: { required: true } },
                                    jumlah: { type: "number", nullable: false, validation: { min: 0, required: true } },
                                    satuan: { nullable: false, validation: { required: true } },
                                    harga: { type: "number", nullable: false, validation: { min: 0, required: true } },
                                }
                            }
                        },
                        pageSize: 12,
                    });
                    grid.setDataSource(ds);
                    grid.dataSource.read();
                    if(grid.dataSource._data.length==0) toastr.warning('Belum ada data tersimpan.','Info');
                    $scope.isRouteLoading = false;
                }, (err) => {
                    $scope.isRouteLoading = false;
                    throw err;
                });
            };
            function clickDetilSarana(e){
                e.preventDefault();
                toastr.warning("Fitur " + e.currentTarget.innerText + " masih dalam pengembangan tim kami.", "Mohon maaf,");
                // if(e.currentTarget.innerText == "Edit"){
                //     alert("Fitur " + e.currentTarget.innerText + " daftar sarana masih dalam pengembangan tim kami.")
                // } else if (e.currentTarget.innerText == "Hapus") {

                // } else {
                //     alert("Inner text button nya tidak terdefinisi")
                // }
                // var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                // alert(JSON.stringify(dataItem));
            }
            $scope.Save = function(data){
                var data = {
                    "id": data.id ? data.id : null,
                    "kamarId" : $scope.item.kamar.idKamar,
                    "jumlah" : data.jumlah,
                    "satuan":  data.satuan,
                    "harga" :  data.harga,
                    "namaExternal" :  data.namaKebutuhan,
                    "statusEnabled" : data.statusEnabled ? data.statusEnabled : "true"
                };
                // console.log(JSON.stringify(data)); map-kebutuhan-sarana-to-kamar/save/
                ManageSarpras.saveDataSarPras(data, "map-kebutuhan-sarana-to-kamar/save/").then(function(res){
                    $scope.getDetilSarana($scope.item.kamar);
                });
            }
            init();
		}	
	]);
});