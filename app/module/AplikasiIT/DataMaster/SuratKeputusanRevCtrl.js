define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('SuratKeputusanRevCtrl', ['$rootScope', '$scope', 'ModelItem', 'ManagePegawai', 'FindPegawai', '$timeout', 'ManagePhp',
        function ($rootScope, $scope, ModelItem, ManagePegawai, FindPegawai, $timeout, managePhp) {
            $scope.title = "Surat Keputusan";
            $scope.now = new Date();

            $scope.item = {
                // periodeAwal : $scope.now,
                // periodeAkhir :  $scope.now,
            }
            $scope.pop = {}
            $scope.pegawaiLogin = JSON.parse(localStorage.getItem('pegawai'))
            $scope.itempop = {}
            $scope.opsiGrid = {
                toolbar: [{
                    name: "create", text: "Tambah", template: '<button ng-click="Tambah()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Tambah</button>'
                }],
                pageable: true,
                selectable: "row",
                columns: [
                    { field: "id", hidden: "true" },
                    { field: "rowNumber", title: "#", width: "40px" },
                    { field: "tglberlakuawal", title: "Tgl Berlaku Awal", width: "150px", template: "<span class='style-center'>{{formatTanggal('#: tglberlakuawal #')}}</span>" },
                    { field: "tglberlakuakhir", title: "Tgl Berlaku Akhir", width: "150px", template: "<span class='style-center'>{{formatTanggal('#: tglberlakuakhir #')}}</span>" },
                    { field: "nosk", title: "No SK", width: "180px" },
                    { field: "nosk_intern", title: "No SK Intern", width: "100px" },
                    { field: "namask", title: "Nama SK", width: "120px" },
                    { field: "jeniskeputusan", title: "Jenis Keputusan" },
                    { field: "pegawaittd", title: "Pegawai TT", width: "150px" },
                    { field: "namajuduldokumen", title: "Dokumen" },
                    { field: "jenisproduk", title: "Jenis Produk" },
                    { field: "komponenharga", title: "Komponen Harga" },
                    { field: "namaruangan", title: "Ruangan" },
                    { field: "keteranganlainnya", title: "Keterangan" },
                    {
                        command: [{ text: "Hapus", click: hapusData, imageClass: "k-icon k-delete" },
                        { text: "Edit", click: editData, imageClass: "k-icon k-i-pencil" }], title: "&nbsp;", width: 160
                    }
                    // { command: [{ name: "destroy", text: "Hapus" }, { name: "edit", text: "Edit" }], title: "&nbsp;", width: 160 }
                ],
                // editable: { mode: "popup", window: { title: "Surat Keputusan" }, template: kendo.template($("#popup-editor").html()) },
                dataBound: function (e) {
                    e.sender._data.forEach(function (elemen, index) {
                        elemen.rowNumber = ++index;
                    })
                },
                // save: function (e) {
                //     $scope.Save(e.model);
                // }
            };
            function hapusData(e) {
                e.preventDefault();
                var dataSelected = this.dataItem($(e.currentTarget).closest("tr"));
                var itemDelete = {
                    "id": dataSelected.id
                }
                managePhp.postMaster(itemDelete, 'sk/delete-sk').then(function (e) {
                    if (e.status === 201) {
                        init();
                    }
                })
            }
            function editData(e) {
                e.preventDefault();
                var dataSelected = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.pop.id = dataSelected.id
                $scope.pop.kodeExternal = dataSelected.kodeexternal
                $scope.pop.namaExternal = dataSelected.namaexternal
                $scope.pop.reportDisplay = dataSelected.reportdisplay
                $scope.pop.jenisProduk = { id: dataSelected.objectjenisprodukloanfk, jenisproduk: dataSelected.jenisproduk }
                $scope.pop.cicilanKeLast = dataSelected.cicilankelast
                $scope.pop.deskripsiLoan = dataSelected.deskripsiloan
                $scope.pop.dokumen = { id: dataSelected.objectdokumenfk, namajuduldokumen: dataSelected.namajuduldokumen }
                $scope.pop.hargaSatunCicilan = dataSelected.hargasatuancicilan
                $scope.pop.jenisKeputusan = { id: dataSelected.objectjeniskeputusanfk, jeniskeputusan: dataSelected.jeniskeputusan }
                $scope.pop.keterangan = dataSelected.keteranganlainnya
                $scope.pop.komponenHargaGaji = { id: dataSelected.objectkomponenhargagajifk, komponenharga: dataSelected.komponenharga }
                $scope.pop.namaSK = dataSelected.namask
                $scope.pop.noSBKLast = dataSelected.nosbklast
                $scope.pop.noSBMLast = dataSelected.nosbmlast
                $scope.pop.noSK = dataSelected.nosk
                $scope.pop.noSK_Intern = dataSelected.nosk_intern
                //  $scope.pegawaiLogin.id,
                $scope.pop.pegawaiTTD = { id: dataSelected.objectpegawaittfk, namalengkap: dataSelected.pegawaittd }
                $scope.pop.pencairanKeLast = dataSelected.pencairankelast
                $scope.pop.qtyCicilan = dataSelected.qtycicilan
                $scope.pop.qtyPencairanLoan = dataSelected.qtypencairanloan
                $scope.pop.ruangan = { id: dataSelected.objectruanganfk, namaruangan: dataSelected.namaruangan }
                $scope.pop.berlakuAwal = dataSelected.tglberlakuakhir
                $scope.pop.berlakuAkhir = dataSelected.tglberlakuawal
                $scope.pop.tglJatuhTempo = dataSelected.tgljatuhtempo
                $scope.pop.tglTTD = dataSelected.tglttsk
                $scope.pop.totalLoan = dataSelected.totalloan
                $scope.pop.totalSudahDicairkan = dataSelected.totalsudahdicairkan
                showPopUp()

            }
            $scope.formatTanggal = function (tanggal) {
                if (tanggal == "null")
                    return '-'
                else
                    return moment(tanggal).format('DD-MM-YYYY HH:mm');
            }
            function getCombo() {
                managePhp.getMaster("sk/get-data-combo").then(function (res) {
                    $scope.listJenisKeputusan = res.data.jeniskeputusan
                    $scope.listPegawai = res.data.pegawai
                    $scope.listRuangan = res.data.ruangan
                    $scope.listKomponenHarga = res.data.komponenharga
                    $scope.listJenisProduk = res.data.jenisproduk
                    $scope.listDokumen = res.data.dokumen
                })
            }
            function init() {
                $scope.isRouteLoading = true;
                var tglAwal = ""
                if ($scope.item.periodeAwal != undefined) {
                    tglAwal = "tglAwal=" + moment($scope.item.periodeAwal).format('YYYY-MM-DD HH:mm:ss');
                }
                var tglAkhir = ""
                if ($scope.item.periodeAkhir != undefined) {
                    tglAkhir = "&tglAkhir=" + moment($scope.item.periodeAkhir).format('YYYY-MM-DD HH:mm:ss');
                }

                var noSK = ""
                if ($scope.item.noSK != undefined) {
                    noSK = "&noSK=" + $scope.item.noSK
                }

                var noSKIntern = ""
                if ($scope.item.noSKIntern != undefined) {
                    noSKIntern = "&noSKIntern=" + $scope.item.noSKIntern
                }
                var namaSK = ""
                if ($scope.item.namaSK != undefined) {
                    namaSK = "&namaSK=" + $scope.item.namaSK
                }
                var jenisKeputusan = ""
                if ($scope.item.jenisKeputusan != undefined) {
                    jenisKeputusan = "&jenisKeputusanfk=" + $scope.item.jenisKeputusan
                }

                managePhp.getMaster("sk/get-daftar-sk?"
                    + tglAwal
                    + tglAkhir
                    + noSK
                    + noSKIntern
                    + namaSK
                    + jenisKeputusan).then(function (res) {
                        var result = res.data.data;
                        result.forEach(function (item, index) {
                            item.rowNumber = ++index;
                        })
                        $scope.dataGrid = new kendo.data.DataSource({
                            data: res.data.data,
                            schema: {
                                model: {
                                    id: "id",
                                    fields: {
                                        id: { editable: false },
                                        rowNumber: { editable: false },
                                        name: {
                                            editable: true, validation: {
                                                validasiKomponen: function (input) {
                                                    if (input.is("[name='kedudukan']") && input.val() === "") {
                                                        return false;
                                                    }
                                                    return true;
                                                }
                                            }
                                        },
                                    }
                                }
                            },
                            pageSize: 20,
                            change: function (e) {
                                if (e.action === "itemchange") {
                                    if (e.items[0].id) {
                                        e.items.state = "edit"
                                    } else {
                                        e.items.state = "add"
                                    }
                                } else if (e.action === "remove") {
                                    var item = e.items[0];
                                    if (item.name !== "") {
                                        item.action = e.action;
                                        $scope.Save(item);
                                    } else {
                                        $scope.dataGrid.sync(); // call sync function to auto update row number w/o click on grid
                                    }
                                }
                            }
                        });
                        $scope.isRouteLoading = false;
                    }, (error) => {
                        $scope.isRouteLoading = false;
                        throw error;
                    })
            }
            init();
            getCombo();
            $scope.Save = function (data) {
                var item = {
                    "id": data.id,
                    "statusEnabled": true,
                    "namaExternal": data.name,
                    "name": data.name,
                    "reportDisplay": data.name,
                }
                if (data.action && data.action === "remove") {
                    item.statusEnabled = false;
                }
                ManagePegawai.saveMasterData("sdm/save-kedudukan", item).then(function (res) {
                    debugger;
                }, (error) => {
                    throw error;
                })
            }
            {
                // var timeoutPromise;
                // $scope.$watch('item.namaKedudukan', function(newVal, oldVal){
                // 	$timeout.cancel(timeoutPromise);
                // 	timeoutPromise = $timeout(function(){
                // 		if(newVal && newVal !== oldVal){
                // 			applyFilter("name", newVal);
                // 		}
                // 	}, 500)
                // })
                // function applyFilter(filterField, filterValue){
                // 	var gridData = $("#gridKedudukan").data("kendoGrid");
                // 	var currFilterObj = gridData.dataSource.filter();
                // 	var currentFilters = currFilterObj ? currFilterObj.filters : [];

                // 	if(currentFilters && currentFilters.length > 0){
                // 		for(var i = 0; i < currentFilters.length; i++){
                // 			if(currentFilters[i].field == filterField){
                // 				currentFilters.splice(i, 1);
                // 				break;
                // 			}
                // 		}
                // 	}

                // 	if(filterValue !== ""){
                // 		currentFilters.push({
                // 			field: filterField,
                // 			operator: "contains",
                // 			value: filterValue
                // 		})
                // 	}

                // 	gridData.dataSource.filter({
                // 		logic: "and",
                // 		filters: currentFilters
                // 	})
                // }
            }
            $scope.resetFilter = function () {
                var dataGrid = $("#gridKedudukan").data("kendoGrid");
                dataGrid.dataSource.filter({});
                $scope.item = {
                    // periodeAwal : $scope.now,
                    // periodeAkhir :  $scope.now,
                }
            }
            $scope.cariFilter = function () {
                init()
            }
            $scope.Tambah = function () {
                // kosongkan()


                showPopUp()
            };
            function showPopUp (){
                $scope.popUpTambah.center().open();
                // Get current actions
                var actions = $scope.popUpTambah.options.actions;
                // Remove "Close" button
                actions.splice(actions.indexOf("Close"), 1);
                if (actions.indexOf("Maximize") > -1) {

                } else
                    actions.push('Maximize')

                // Set the new options
                $scope.popUpTambah.setOptions({ actions: actions });
            }
            $scope.batal = function () {
                $scope.pop = {}
                $scope.popUpTambah.close()
            }

            $scope.save = function () {
                var idSK = ""
                if ($scope.pop.id)
                    idSK = $scope.pop.id
                if ($scope.pop.namaSK == undefined) {
                    toastr.error('Nama SK harus di isi')
                    return
                }
                if ($scope.pop.namaSK == undefined) {
                    toastr.error('Nama SK harus di isi')
                    return
                }
                if ($scope.pop.jenisKeputusan == undefined) {
                    toastr.error('Jenis Keputusan harus di isi')
                    return
                }

                var sk = {
                    "id": idSK,
                    "kodeexternal": $scope.pop.kodeExternal != undefined ? $scope.pop.kodeExternal : "",
                    "namaexternal": $scope.pop.namaExternal != undefined ? $scope.pop.namaExternal : "",
                    "reportdisplay": $scope.pop.reportDisplay != undefined ? $scope.pop.reportDisplay : "",
                    "objectjenisprodukloanfk": $scope.pop.jenisProduk != undefined ? $scope.pop.jenisProduk.id : null,
                    "cicilankelast": $scope.pop.cicilanKeLast != undefined ? $scope.pop.cicilanKeLast : null,
                    "deskripsiloan": $scope.pop.deskripsiLoan != undefined ? $scope.pop.deskripsiLoan : null,
                    "objectdokumenfk": $scope.pop.dokumen != undefined ? $scope.pop.dokumen.id : null,
                    "hargasatuancicilan": $scope.pop.hargaSatunCicilan != undefined ? $scope.pop.hargaSatunCicilan : null,
                    "objectjeniskeputusanfk": $scope.pop.jenisKeputusan.id,
                    "keteranganlainnya": $scope.pop.keterangan != undefined ? $scope.pop.keterangan : "",
                    "objectkomponenhargagajifk": $scope.pop.komponenHargaGaji != undefined ? $scope.pop.komponenHargaGaji.id : null,
                    "namask": $scope.pop.namaSK,
                    "nosbklast": $scope.pop.noSBKLast != undefined ? $scope.pop.noSBKLast : null,
                    "nosbmlast": $scope.pop.noSBMLast != undefined ? $scope.pop.noSBMLast : null,
                    // "nosk": $scope.pop.noSK,
                    "nosk_intern": $scope.pop.noSK_Intern != undefined ? $scope.pop.noSK_Intern : null,
                    "objectpegawaiobjekskfk": $scope.pegawaiLogin.id,
                    "objectpegawaittfk": $scope.pop.pegawaiTTD != undefined ? $scope.pop.pegawaiTTD.id : null,
                    "pencairankelast": $scope.pop.pencairanKeLast != undefined ? $scope.pop.pencairanKeLast : null,
                    "qtycicilan": $scope.pop.qtyCicilan != undefined ? $scope.pop.qtyCicilan : null,
                    "qtypencairanloan": $scope.pop.qtyPencairanLoan != undefined ? $scope.pop.qtyPencairanLoan : null,
                    "objectruanganfk": $scope.pop.ruangan != undefined ? $scope.pop.ruangan.id : null,
                    "tglberlakuakhir": $scope.pop.berlakuAwal != undefined ? moment($scope.pop.berlakuAwal).format('YYYY-MM-DD HH:mm') : null,
                    "tglberlakuawal": $scope.pop.berlakuAkhir != undefined ? moment($scope.pop.berlakuAkhir).format('YYYY-MM-DD HH:mm') : null,
                    "tgljatuhtempo": $scope.pop.tglJatuhTempo != undefined ? moment($scope.pop.tglJatuhTempo).format('YYYY-MM-DD HH:mm') : null,
                    "tglttsk": $scope.pop.tglTTD != undefined ? $scope.pop.tglTTD : null,
                    "totalloan": $scope.pop.totalLoan != undefined ? $scope.pop.totalLoan : null,
                    "totalsudahdicairkan": $scope.pop.totalSudahDicairkan != undefined ? $scope.pop.totalSudahDicairkan : null,

                }
                var data = {
                    "suratkeputusan": sk
                }
                managePhp.postMaster(data, 'sk/save-sk').then(function (res) {
                    init()
                    $scope.pop = {}
                })

            }
        }
    ]);
});