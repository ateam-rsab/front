define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('ClinicalPathwayCtrl', ['$q', 'CacheHelper', '$scope', '$state', 'DataHelper', '$timeout', 'ManagePhp', 'ModelItemAkuntansi', 'ModelItem',
        function ($q, cacheHelper, $scope, $state, dataHelper, $timeout, managePhp, modelItemAkuntansi, ModelItem) {
            $scope.isRouteLoading = false;
            $scope.item = {};
            $scope.cari = {}
            var bln = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September',
                      'Oktober','November','Desember']
            managePhp.getMaster('pelatihan/get-combo').then(function (e) {
                $scope.listIndikator = e.data.indikator
             
            })
            $scope.monthUngkul = {
                start: "year",
                depth: "year"
            }
            $scope.yearUngkul = {
                start: "decade",
                depth: "decade"
            }
            $scope.optionGridMaster = {
                toolbar: [{
                    name: "create", text: "Tambah",
                    template: '<button ng-click="Tambah()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Tambah</button>'
                }],
                pageable: true,
                selectable: "row",
                columns: [
                    { field: "no", title: "No", width: 40 },
                    { field: "namaindikator", title: "Indikator", width: 200 },// template: "#= pegawai.namaLengkap #"},
                    // { field: "satuan", title: "Kelas", width: 100 }, //template: "#= atasanLangsung.namaLengkap #"},
                    { field: "capaian", title: "Capaian", width: 100 },// template: "#= atasanPejabatPenilai.namaLengkap #"},
                    { field: "target", title: "Target", width: 100 },
                    { field: "bulan", title: "Bulan", width: 100 },
                    { field: "tahun", title: "Tahun", width: 100 },     
                    { command: [{ name: "edit", text: "Edit", click: editRow }, { text: "Hapus", click: deleteRow }], title: "&nbsp;", width: 120 }
                ],

            }
            modelItemAkuntansi.getDataDummyPHP("pelatihan/get-combo-produk-part", true, true, 10).then(function (data) {
                $scope.listProduk = data;
            });
            $scope.cariFilter = function(){
                init()
            }
            function init() {
           
                $scope.isRouteLoading = true;
                var indikator = ''
                if($scope.cari.indikator != undefined)
                    indikator = $scope.cari.indikator.namaindikator
                var blns = ''
                if($scope.cari.bulan != undefined){
                    var _bulan = new Date($scope.cari.bulan).getMonth();
                    var bulan = bln[_bulan]
                    blns =bulan
                }
                var tahun = ''
                if($scope.cari.tahun != undefined)
                    tahun =moment( $scope.cari.tahun).format('YYYY')

                var target = ''
                if($scope.cari.target != undefined)
                    target = $scope.cari.target
                var capaian = ''
                if($scope.cari.capaian != undefined)
                    target = $scope.cari.capaian
                $q.all([
                    managePhp.getData("rensar/get-indikator?indikator="+ indikator
                        +"&bulan=" +blns
                        +"&tahun=" +tahun
                        +"&target=" +target 
                        +"&capaian=" +capaian ),
                ]).then(function (res) {
                    $scope.isRouteLoading = false;
                    if (res[0].statResponse) {
                        var data = res[0].data.data
                        if (data.length > 0) {
                            for (let index = 0; index < data.length; index++) {
                                data[index].no = index + 1;
                            }
                        }
                        $scope.dataSource = new kendo.data.DataSource({
                            data: data,
                            pageSize: 20,
                        })
                    }
                }, function (error) {
                    $scope.isRouteLoading = false;
                    throw error;
                })
            }
            $scope.Tambah = function () {
                $scope.dialogPopup.center().open()
            }
            $scope.clickedPopup = function () {
                $scope.dialogPopup.close();
            }
            $scope.Batal = function () {
                $scope.dialogPopup.close();
            }
       
            $scope.Save = function(){
                var listRawRequired = [
                    "item.indikator|k-ng-model|Indikator",
                    "item.bulan|k-ng-model|Bulan",
                    "item.tahun|k-ng-model|Tahun",
                    "item.target|ng-model|Target",
                    "item.capaian|ng-model|Capaian",
            
              ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    var _bulan = new Date($scope.item.bulan).getMonth();
                    var bulan = bln[_bulan]
                    var data = {
                        "norec": $scope.norec != undefined ? $scope.norec : '',
                        "namaindikator": $scope.item.indikator.namaindikator,
                        "bulan":bulan,
                        "tahun":moment($scope.item.bulan).format('YYYY'),
                        "target": $scope.item.target,
                        "capaian": $scope.item.capaian ,
                        "tgl": moment($scope.item.bulan).format('YYYY-MM-DD HH:mm'),
                        // "tglberlakuakhir": moment($scope.item.tglBerlakuAkhir).format('YYYY-MM-DD HH:mm'),
                        // "tglberlakuawal": moment($scope.item.tglBerlakuAwal).format('YYYY-MM-DD HH:mm'),
                    }
                    managePhp.postData2( "rensar/save-indikator",data).then(function (e) {
                        init();
                        $scope.item= {}
                    });
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }
          
            $scope.resetFilter = function () {
                $scope.cari = {};
                init()
            }
            function deleteRow(e) {
                e.preventDefault();

                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                var data = {
                    "norec": dataItem.norec,
                }
                
                 managePhp.postData2( "rensar/delete-indikator",data).then(function (e) {
                    init()
                    $scope.item ={}
                })
            }
            function editRow(e) {
                e.preventDefault();
                $scope.item = {}
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.norec = dataItem.norec
                $scope.item.indikator = { id: dataItem.namaindikator, namaindikator: dataItem.namaindikator }
                $scope.item.capaian =dataItem.capaian
                $scope.item.target =dataItem.target
                $scope.item.bulan = new Date (dataItem.tgl)
                $scope.item.tahun = dataItem.tahun
                
                $scope.dialogPopup.center().open()
            }
            init();
            $scope.formatTanggalAjah = function (tanggal) {
                return moment(tanggal).format('DD-MM-YYYY');
            }
        }
    ])
})