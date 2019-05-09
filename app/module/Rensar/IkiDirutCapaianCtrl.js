define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('IkiDirutCapaianCtrl', ['$q', 'CacheHelper', '$scope', '$state', 'DataHelper', '$timeout', 'ManagePhp', 'ModelItemAkuntansi', 'ModelItem',
        function ($q, cacheHelper, $scope, $state, dataHelper, $timeout, managePhp, modelItemAkuntansi, ModelItem) {
            $scope.isRouteLoading = false;
            $scope.item = {};
            $scope.cari = {}
            var cookie = document.cookie.split(';');
            cookie = cookie[0].split('=');
            var bln = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
                'October', 'November', 'December']
            managePhp.getData('rensar/get-combo').then(function (e) {
                $scope.Indikator = e.data.indikator
                $scope.listJenisIndikator = e.data.jenisindikator
                if (cookie[1] === 'dokter') {
                    for (let i = 0; i < $scope.listIndikator.length; i++) {
                        if ($scope.listIndikator[i].indikator.indexOf('VAP') > -1) {
                            $scope.cari.indikator = $scope.listIndikator[i]
                            $scope.item.indikator = $scope.listIndikator[i]
                            $scope.disabledIndikator = true
                            break
                        }
                    }
                }
                init();
            })

            function postWTPL() {
                var data = {}
                $q.all([
                    managePhp.postData2('rensar/post-waktu-tunggu-pelayanan-lab', data),
                    managePhp.postData2('rensar/post-waktu-tunggu-pelayanan-rad', data),
                ]).then(function (res) {
                })
            }

            $scope.monthUngkul = {
                start: "year",
                depth: "year"
            }
            $scope.yearUngkul = {
                start: "decade",
                depth: "decade"
            }
            $scope.optionGridMaster = {
                // toolbar: [{
                //     name: "create", text: "Tambah",
                //     template: '<button ng-click="Tambah()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Tambah</button>'
                // }],
                pageable: true,
                selectable: "row",
                columns: [
                    { field: "no", title: "No", width: 40 },
                    { field: "jenisindikator", title: "Jenis", width: 150 },
                    { field: "indikator", title: "Indikator", width: 200 },// template: "#= pegawai.namaLengkap #"},
                    // { field: "satuan", title: "Kelas", width: 100 }, //template: "#= atasanLangsung.namaLengkap #"},
                    { field: "capaian", title: "Capaian", width: 100 },// template: "#= atasanPejabatPenilai.namaLengkap #"},
                    { field: "target", title: "Target", width: 100 },
                    { field: "bulan", title: "Bulan", width: 100 },
                    { field: "tahun", title: "Tahun", width: 100 },
                    { field: "pic", title: "PIC", width: 100 },
                    // { command: [{ name: "edit", text: "Edit", click: editRow }, { text: "Hapus", click: deleteRow }], title: "&nbsp;", width: 120 }
                ],

            }
            modelItemAkuntansi.getDataDummyPHP("pelatihan/get-combo-produk-part", true, true, 10).then(function (data) {
                $scope.listProduk = data;
            });
            $scope.cariFilter = function () {
                init()
            }
            function init() {

                $scope.isRouteLoading = true;
                var indikator = ''
                if ($scope.cari.indikator != undefined)
                    indikator = $scope.cari.indikator.id
                var blns = ''
                if ($scope.cari.bulan != undefined) {
                    var _bulan = new Date($scope.cari.bulan).getMonth();
                    var bulan = bln[_bulan]
                    blns = bulan
                }
                var tahun = ''
                if ($scope.cari.tahun != undefined)
                    tahun = moment($scope.cari.tahun).format('YYYY')

                var target = ''
                if ($scope.cari.target != undefined)
                    target = $scope.cari.target
                var capaian = ''
                if ($scope.cari.capaian != undefined)
                    target = $scope.cari.capaian
                var jenisindikatorfk = ''
                if ($scope.cari.jenisIndikator != undefined)
                    jenisindikatorfk = $scope.cari.jenisIndikator.id
                $q.all([
                    managePhp.getData("rensar/get-indikator?indikator=" + indikator
                        + "&bulan=" + blns
                        + "&tahun=" + tahun
                        + "&target=" + target
                        + "&capaian=" + capaian
                        + "&jenisindikatorfk=" + jenisindikatorfk),
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
                postWTPL()
            }
            $scope.Tambah = function () {
                $scope.norec = undefined
                $scope.item ={}
                $scope.dialogPopup.center().open()
            }
            $scope.clickedPopup = function () {
                $scope.dialogPopup.close();
            }
            $scope.Batal = function () {
                $scope.dialogPopup.close();
            }
            $scope.getComboIndikator = function(data){
                $scope.listIndikator = []
                for (var i = 0; i < $scope.Indikator.length; i++) {
                   if( $scope.Indikator[i].jenisindikatorfk ==data.id){
                        $scope.listIndikator.push( $scope.Indikator[i])
                   }
                }
                if( $scope.listIndikator.length == 0)
                    toastr.info('Tidak ada indikator','Info')
            }
            $scope.$watch('item.indikator', function (newValue, oldValue) {
                if (newValue != oldValue) {
                    for (let i = 0; i < $scope.listIndikator.length; i++) {
                        if ($scope.listIndikator[i].id == newValue.id) {
                            $scope.item.pic = $scope.listIndikator[i].pic
                            $scope.item.satuan = $scope.listIndikator[i].satuan
                            // for (var j = 0; j < $scope.listJenisIndikator.length; j++) {
                            //     if( $scope.listJenisIndikator[j].id ==  $scope.listIndikator[i].jenisindikatorfk){
                            //            $scope.item.jenis =$scope.listJenisIndikator[j].kodeexternal
                            //            break
                            //     }
                            // }
                         
                        }
                    }
                }
            });
            $scope.Save = function () {
                var listRawRequired = [
                    "item.indikator|k-ng-model|Indikator",
                    "item.bulan|k-ng-model|Bulan",
                    "item.tahun|k-ng-model|Tahun",
                    // "item.target|ng-model|Target",
                    "item.capaian|ng-model|Capaian",

                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    var _bulan = new Date($scope.item.bulan).getMonth();
                    var bulan = bln[_bulan]
                    var data = {
                        "norec": $scope.norec != undefined ? $scope.norec : '',
                        "indikatorfk": $scope.item.indikator.id,
                        "bulan": bulan,
                        "tahun": moment($scope.item.bulan).format('YYYY'),
                        // "target": $scope.item.target,
                        "capaian": $scope.item.capaian,
                        "tgl": moment($scope.item.bulan).format('YYYY-MM-DD HH:mm'),
                        // "tglberlakuakhir": moment($scope.item.tglBerlakuAkhir).format('YYYY-MM-DD HH:mm'),
                        // "tglberlakuawal": moment($scope.item.tglBerlakuAwal).format('YYYY-MM-DD HH:mm'),
                    }
                    managePhp.postData2("rensar/save-indikator", data).then(function (e) {
                        init();
                        $scope.item = {}
                    });
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }

            $scope.resetFilter = function () {
                $scope.cari = {};
                init()
            }
            $scope.hapus = function(){
                if($scope.dataSelect == undefined){
                    toastr.error('Pilih data dulu')
                    return
                }
                var data = {
                    "norec": $scope.dataSelect.norec,
                }

                managePhp.postData2("rensar/delete-indikator", data).then(function (e) {
                    init()
                    $scope.item = {}
                })
            }
            $scope.edit = function(){
                if($scope.dataSelect == undefined){
                    toastr.error('Pilih data dulu')
                    return
                }
                $scope.item = {}
                $scope.norec = $scope.dataSelect.norec
                // $scope.item.indikator = { id: $scope.dataSelect.indikatorfk, indikator: $scope.dataSelect.indikator }
                $scope.listIndikator = []
                $scope.listIndikator.push({id:$scope.dataSelect.indikatorfk , indikator:$scope.dataSelect.indikator }) 
                $scope.norec = $scope.dataSelect.norec
                $scope.item.indikator =   $scope.listIndikator[0]
                $scope.item.jenisIndikator = { id: $scope.dataSelect.jenisindikatorfk   ,jenisindikator:$scope.dataSelect.jenisindikator}
                $scope.item.capaian = $scope.dataSelect.capaian
                $scope.item.pic = $scope.dataSelect.pic
                $scope.item.bulan = new Date($scope.dataSelect.tgl)
                $scope.item.tahun = $scope.dataSelect.tahun

                $scope.dialogPopup.center().open()
            }
            function deleteRow(e) {
                e.preventDefault();

                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                var data = {
                    "norec": dataItem.norec,
                }

                managePhp.postData2("rensar/delete-indikator", data).then(function (e) {
                    init()
                    $scope.item = {}
                })
            }
            function editRow(e) {
                e.preventDefault();
                $scope.item = {}
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));
                $scope.norec = dataItem.norec
                $scope.item.indikator = { id: dataItem.indikatorfk, indikator: dataItem.indikator }
                $scope.item.capaian = dataItem.capaian
                $scope.item.pic = dataItem.pic
                $scope.item.bulan = new Date(dataItem.tgl)
                $scope.item.tahun = dataItem.tahun

                $scope.dialogPopup.center().open()
            }
          
            $scope.formatTanggalAjah = function (tanggal) {
                return moment(tanggal).format('DD-MM-YYYY');
            }
        }
    ])
})