define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('OrderJadwalBedahCtrl', ['$q', '$rootScope', '$scope', '$state','CacheHelper','ManagePhp',
        function($q, $rootScope, $scope,$state,cacheHelper,managePhp) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item.tglOperasi = new Date();
            var norec_apd = ''
            var norec_pd = ''
            var nocm_str=''
            $scope.item.qty = 1
            $scope.riwayatForm = false
            $scope.inputOrder = true
            $scope.CmdOrderPelayanan= true;
            $scope.OrderPelayanan = false;
            $scope.showTombol = false
            $scope.header.DataNoregis ='';
            var myVar = 0
            var detail = ''
            $scope.showInputan = false;

            var data2 = [];
            $scope.PegawaiLogin2 ={};
            var namaRuangan = ''
            var namaRuanganFk = ''

            LoadCacheHelper();
            function LoadCacheHelper(){
                var chacePeriode = cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl');
                if(chacePeriode != undefined){
                   //var arrPeriode = chacePeriode.split(':');
                   $scope.item.noMr = chacePeriode[0]
                   nocm_str = chacePeriode[0]
                   $scope.item.namaPasien = chacePeriode[1]
                   $scope.item.jenisKelamin = chacePeriode[2]
                   $scope.item.noregistrasi = chacePeriode[3]
                   $scope.item.umur = chacePeriode[4]
                   $scope.item.kelompokPasien = chacePeriode[5]
                   $scope.item.tglRegistrasi = chacePeriode[6]
                   norec_apd = chacePeriode[7]
                   norec_pd = chacePeriode[8]
                   $scope.item.idKelas = chacePeriode[9]
                   $scope.item.kelas =chacePeriode[10]
                   $scope.item.idRuangan =chacePeriode[11]
                   $scope.item.namaRuangan =chacePeriode[12]
                   $scope.header.DataNoregis =chacePeriode[13]
                    if ($scope.header.DataNoregis == undefined) {
                        $scope.header.DataNoregis = false;
                    }
                    // if ($scope.item.namaRuangan.substr($scope.item.namaRuangan.length - 1) == '`') {
                    //     $scope.showTombol = true
                    // }
                    managePhp.getData("tatarekening/get-sudah-verif?noregistrasi="+
                       $scope.item.noregistrasi, true).then(function(dat){
                          $scope.item.statusVerif=dat.data.status
                    });
                }
                init()
           }

            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;
           //  LoadCache();
           //  function LoadCache(){
           //      var chacePeriode = cacheHelper.get('TransaksiPelayananLaboratoriumDokterCtrl');
           //      if(chacePeriode != undefined){
           //          norec_apd = chacePeriode[0]
           //          nocm_str = chacePeriode[1]
           //          // $scope.item.ruanganAsal = namaRuangan;
           //          // manageSarprasPhp.getDataTableTransaksi("logistik/get_detailPD?norec_apd="+norec_apd, true).then(function(data_ih){
           //          //     $scope.item.jenisPenjamin = data_ih.data.detailPD[0].namarekanan
           //          //     $scope.item.kelompokPasien = data_ih.data.detailPD[0].kelompokpasien
           //          //     $scope.item.beratBadan = data_ih.data.detailPD[0].beratbadan
           //          // });
           //          init()
           //     }else{

           //     }

           // }
        function init() {
            
            managePhp.getData("pelayanan/get-order-penunjang?departemenfk=25&nocm="+nocm_str+'&norec_apd='+norec_apd, true).then(function(dat){
 
                $scope.item.ruanganAsal = dat.data.data[0].namaruangan
                $scope.listRuanganTujuan = dat.data.ruangantujuan;
                $scope.item.ruangantujuan = {
                    id: dat.data.ruangantujuan[0].id,
                    namaruangan : dat.data.ruangantujuan[0].namaruangan
                }
                $scope.listLayanan = dat.data.produk;
                namaRuanganFk = dat.data.data[0].objectruanganfk
                norec_pd = dat.data.data[0].noregistrasifk
            });
             managePhp.getData("rekam-medis/get-emr-transaksi?norec_apd="+norec_apd, true).then(function(dat){
                $scope.dataDaftar = new kendo.data.DataSource({
                    data: dat.data.data,
                    pageSize: 10,
                    serverPaging: false,
                    schema: {
                        model: {
                            fields: {
                            }
                        }
                    }
                });
            });
            managePhp.getData("get-detail-login", true).then(function(dat){
               $scope.PegawaiLogin2=dat.data
            });

            if ($scope.header.DataNoregis == true) {
                managePhp.getData('laporan/get-order-ok?noregistrasi='+$scope.item.noregistrasi).then(function(e) {
                    for (var i = e.data.daftar.length - 1; i >= 0; i--) {
                        e.data.daftar[i].no=i+1
                    }
                    $scope.dataGridRiwayat = new kendo.data.DataSource({
                        data: e.data.daftar,
                        pageSize:10
                    });

                });
            }else{
                managePhp.getData('laporan/get-order-ok?NoCM='+$scope.item.noMr).then(function(e) {
                    for (var i = e.data.daftar.length - 1; i >= 0; i--) {
                        e.data.daftar[i].no=i+1
                    }
                    $scope.dataGridRiwayat = new kendo.data.DataSource({
                        data: e.data.daftar,
                        pageSize:10
                    });

                });
            }
            $scope.treeSourceRuangan=[];
            managePhp.getData("rekam-medis/get-menu-rekam-medis-dynamic?namaemr=bedah").then(function (e) {
                var inlineDefault = new kendo.data.HierarchicalDataSource({
                    data: e.data.data,
                    schema: {
                        model: {
                            children: "child",
                            expanded: true
                        }
                    }
                });
                $scope.treeSourceBedah = inlineDefault;
                $scope.mainTreeViewBedahOption = {
                    dataTextField: ["caption"],
                    datakKeyField: ["id"],
                    select: onSelect,
                    dragAndDrop: true,
                    checkboxes: false
                }
                // var treeview = $("#treeview").data("kendoTreeView");
                // .expandPath([2, 5])
            })

            

        }
        // $scope.klikBedah = function(tree){
        //     $state.go("RekamMedis.OrderJadwalBedah.PersetujuanTindakanAnestesiA");
        // }
        $scope.showInput = function(namaEMR, noEMR) {
            $state.go("RekamMedis.OrderJadwalBedah.ProsedurKeselamatan", {
                namaEMR : namaEMR,
                nomorEMR : noEMR
            });
            $scope.showData = true;
        }
        $scope.Lihat = function(){
            $scope.myVar = 2

            var noemr2 = '-'
            if ($scope.dataSelected != undefined) {
                noemr2 = $scope.dataSelected.noemr
            }
            $state.go("RekamMedis.OrderJadwalBedah.ProsedurKeselamatan", {
                namaEMR : 1,
                nomorEMR : noemr2
            });

            var arrStr = {
                    0: noemr2
                }
            cacheHelper.set('cacheNomorEMR', arrStr);
        }
        $scope.create = function(){
            $scope.myVar = 2

            var noemr2 = '-'
            $state.go("RekamMedis.OrderJadwalBedah.ProsedurKeselamatan", {
                namaEMR : 1,
                nomorEMR : noemr2
            });
            var arrStr = {
                    0: noemr2
                }
            cacheHelper.set('cacheNomorEMR', arrStr);
        }

         $scope.LihatHasil = function(data) {
            //debugger;
            if ($scope.dataSelectedRiwayat==undefined){
                toastr.error('Pilih data dulu');
                return
            }
            var arrStr =cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl');
            cacheHelper.set('cacheHasilLaboratorium', arrStr);
            $state.go('HasilLaboratorium', {
                norecPd:$scope.dataSelectedRiwayat.norecpd,
                noOrder:  $scope.dataSelectedRiwayat.noorder,
                norecApd:$scope.dataSelectedRiwayat.norecapd,
            })
                // $state.go(data ? data : 'DashboardLaboratoriumCtrlInputHasil', {
                //     noRegistrasi: $scope.dataSelectedRiwayat.norecpd,
                //     noOrder: $scope.dataSelectedRiwayat.noorder,
                //     noAntrianPasien: $scope.dataSelectedRiwayat.norecapd,
                //     status : "hasil"
                // })
            }

        $scope.formatTanggal = function(tanggal){
            return moment(tanggal).format('DD-MMM-YYYY');
        }


        $scope.columnGrid = [
        {
            "field": "no",
            "title": "No",
            "width" : "10px",
        },
        {
            "field": "tglorder",
            "title": "Tgl Order",
            "width" : "90px",
        },
        {
            "field": "ruangan",
            "title": "Nama Ruangan",
            "width" : "140px"
        },
        {
            "field": "produkfk",
            "title": "Kode",
            "width" : "40px",
        },
        {
            "field": "namaproduk",
            "title": "Layanan",
            "width" : "160px",
        },
        {
            "field": "jumlah",
            "title": "Qty",
            "width" : "40px",
        },
        {
            "field": "hargasatuan",
            "title": "Harga Satuan",
            "width" : "80px",
            "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
        },
        {
            "field": "hargadiscount",
            "title": "Diskon",
            "width" : "80px",
            "template": "<span class='style-right'>{{formatRupiah('#: hargadiscount #', '')}}</span>"
        },
        {
            "field": "total",
            "title": "Total",
            "width" : "80px",
            "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
        },
        {
            "field": "nostruk",
            "title": "No Struk",
            "width" : "80px"
        }
        ];

        $scope.columnGridOrder = [
            {
                "field": "no",
                "title": "No",
                "width" : "10px",
            },
            {
                "field": "namaproduk",
                "title": "Layanan",
                "width" : "160px",
            },
            {
                "field": "qtyproduk",
                "title": "Qty",
                "width" : "40px",
            }
        ];
        $scope.columnGridRiwayat = [
            {
                "field": "no",
                "title": "No",
                "width" : "20px",
            },
            {
                "field": "tglorder",
                "title": "Tgl Order",
                "width" : "50px",
            },
            {
                "field": "noorder",
                "title": "No Order",
                "width" : "60px",
            },
            {
                "field": "dokter",
                "title": "Dokter",
                "width" : "100px"
            },
            {
                "field": "namaruangantujuan",
                "title": "Ruangan",
                "width" : "100px",
            },
            {
                "field": "statusorder",
                "title": "Status",
                "width" : "70px",
            }
            ];
        $scope.mainGridOptions = {
            pageable: true,
            columns: [{
                "field": "kdpap",
                "title": "Kode PAP",
                "width": "15%"
            }, {
                "field": "tglinput",
                "title": "Tgl Pengkajian Awal",
                "width": "20%",
                template: "#= new moment(tglinput).format(\'DD-MM-YYYY HH:mm\') #",
            }, {
                "field": "noregistrasi",
                "title": "No Registrasi",
                "width": "15%"
            },
            {
                "field": "namaruangan",
                "title": "Ruangan",
                "width": "25%"
            },
            {
                "field": "namalengkap",
                "title": "Petugas",
                "width": "25%"
            },
            {
                "command": [{
                    text: "Hapus",
                    click: hapusData,
                    imageClass: "k-icon k-delete"
                }],
                title: "",
                width: "100px",
            }]
        };

        $scope.inputBaru = function() {
            $scope.showInputan = true;
        }

        $scope.columnDaftar = {
            toolbar: [{
                name: "create", text: "Input Baru",
                template: '<button ng-click="inputBaru()" class="k-button k-button-icontext k-grid-upload" href="\\#"><span class="k-icon k-i-plus"></span>Buat Baru</button>'
            }],
            selectable: 'row',
            pageable: true,
            columns: [
                {
                    "field": "tglemr",
                    "title": "<h3>Tanggal EMR</h3>",
                    "width":"80px",
                    "template": "<span class='style-left'>{{formatTanggal('#: tglemr #')}}</span>"
                },
                {
                    "field": "noemr",
                    "title": "<h3>No. EMR</h3>",
                    "width":"80px"
                },
                {
                    "field": "noregistrasi",
                    "title": "<h3>No. Registrasi</h3>",
                    "width":"150px",
                    "template": "<span class='style-left'>#: noregistrasi #</span>"
                },
                {
                    "field": "namaruangan",
                    "title": "<h3>Nama Ruangan</h3>",
                    "width":"150px",
                    "template": "<span class='style-left'>#: namaruangan #</span>"
                },
                {
                    command: [
                        {text: "Edit", click: editData, imageClass: "k-icon k-i-pencil"}, 
                        {text: "Hapus", click: hapusData, imageClass: "k-icon k-i-cancel"}
                    ], title: "", width: 90}
            ]
        };

        function editData() {

        }
        
        function hapusData(e) {
            // // if (loginITI ==false){
            // //  toastr.error('Tidak Bisa Menghapus Data','Info')
            // //  return
            // // }
            // e.preventDefault();
            // var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

            // if (!dataItem) {
            //     toastr.error("Data Tidak Ditemukan");
            //     return;
            // }
            // var itemDelete = {
            //     "norec": dataItem.norec
            // }

            // managePhp.postData(itemDelete, 'rekam-medis/hapus-pengkajianpasien').then(function (e) {
            //     if (e.status === 201) {
            //         loadGrid()

            //         grid.removeRow(row);
            //     }
            // })

        }
            $scope.detailGridOptions = function(dataItem) {
            return {
                dataSource: new kendo.data.DataSource({
                    data: dataItem.details
                }),
                columns: [
                {
                    field: "namaproduk",
                    title: "Deskripsi",
                    width:"300px"
                },
                {
                    field: "qtyproduk",
                    title: "Qty",
                    width:"100px"
                }]
            };
        };
        $scope.back = function(){
            window.history.back();
        }
        $scope.order = function(){
            $scope.CmdOrderPelayanan = false;
            $scope.OrderPelayanan = true;
        }
        $scope.Batal = function(){
            
        }
        
        $scope.add = function(){
           if ($scope.item.statusVerif == true) {
                  toastr.error("Data Sudah Diclosing, Hubungi Tatarekening!");
                  return;
              }
            if ($scope.item.qty == 0) {
                alert("Qty harus di isi!")
                return;
            }
            if ($scope.item.ruangantujuan == undefined) {
                alert("Pilih Ruangan Tujuan terlebih dahulu!!")
                return;
            }
            if ($scope.item.layanan == undefined) {
                alert("Pilih Layanan terlebih dahulu!!")
                return;
            }
            var nomor =0
            if ($scope.dataGridOrder == undefined) {
                nomor = 1
            }else{
                nomor = data2.length+1
            }
            var data ={};
            if ($scope.item.no != undefined){
                for (var i = data2.length - 1; i >= 0; i--) {
                    if (data2[i].no ==  $scope.item.no){
                        data.no = $scope.item.no

                        data.produkfk = $scope.item.layanan.id
                        data.namaproduk = $scope.item.layanan.namaproduk
                        data.qtyproduk =parseFloat($scope.item.qty)
                        data.objectruanganfk = namaRuanganFk
                        data.objectruangantujuanfk = $scope.item.ruangantujuan.id
                        data.pemeriksaanluar =   $scope.item.pemeriksaanKeluar === true ? 1 : 0,
                        data.objectkelasfk = $scope.item.idKelas

                        data2[i] = data;
                        $scope.dataGridOrder = new kendo.data.DataSource({
                            data: data2
                        });
                    }
                }

            }else{
                data={
                        no:nomor,
                        produkfk:$scope.item.layanan.id,
                        namaproduk:$scope.item.layanan.namaproduk,
                        qtyproduk:parseFloat($scope.item.qty),
                        objectruanganfk:namaRuanganFk,
                        objectruangantujuanfk:$scope.item.ruangantujuan.id,
                        pemeriksaanluar:$scope.item.pemeriksaanKeluar === true ? 1 : 0,
                        objectkelasfk :  $scope.item.idKelas
                    }
                data2.push(data)
                // $scope.dataGrid.add($scope.dataSelected)
                $scope.dataGridOrder = new kendo.data.DataSource({
                    data: data2
                });
            }
            $scope.batal();
        }
        $scope.klikGrid = function(dataSelected){
            var dataProduk =[];
            //no:no,
            $scope.item.no = dataSelected.no
            for (var i = $scope.listLayanan.length - 1; i >= 0; i--) {
                if ($scope.listLayanan[i].id == dataSelected.produkfk){
                    dataProduk = $scope.listLayanan[i]
                    break;
                }
            }
            $scope.item.layanan = dataProduk;//{id:dataSelected.produkfk,namaproduk:dataSelected.namaproduk}
            // $scope.item.stok = dataSelected.jmlstok //* $scope.item.nilaiKonversi 

            $scope.item.qty = dataSelected.qtyproduk
            $scope.item.pemeriksaanKeluar = dataSelected.pemeriksaanluar == 1 ? true :false
        }

        $scope.Batal = function () {
            $scope.showInputan = false
        }

        $scope.hapus = function(){
            if ($scope.item.qty == 0) {
                alert("Qty harus di isi!")
                return;
            }
            if ($scope.item.ruangantujuan == undefined) {
                alert("Pilih Ruangan Tujuan terlebih dahulu!!")
                return;
            }
            if ($scope.item.layanan == undefined) {
                alert("Pilih Layanan terlebih dahulu!!")
                return;
            }
            var nomor =0
            if ($scope.dataGrid == undefined) {
                nomor = 1
            }else{
                nomor = data2.length+1
            }
            var data ={};
            if ($scope.item.no != undefined){
                for (var i = data2.length - 1; i >= 0; i--) {
                    if (data2[i].no ==  $scope.item.no){
                        data2.splice(i, 1); 
                        for (var i = data2.length - 1; i >= 0; i--) {
                            data2[i].no = i+1
                        }
                        // data2[i] = data;
                        $scope.dataGridOrder = new kendo.data.DataSource({
                            data: data2
                        });
                    }
                }

            }
            $scope.batal();
        }
        $scope.batal = function(){
            $scope.item.layanan =''
            $scope.item.qty =1
            $scope.item.no=undefined
        }
        $scope.BatalOrder= function(){
            data2=[]
            $scope.dataGridOrder = new kendo.data.DataSource({
                data: data2
            });
            $scope.CmdOrderPelayanan = true;
            $scope.OrderPelayanan = false;
        }
        $scope.riwayat = function(){
                $scope.riwayatForm =true
                $scope.inputOrder = false;
            }
            $scope.newOrder = function(){
                $scope.riwayatForm =false
                $scope.inputOrder = true;
            }
        $scope.Simpan= function(){
            if ($scope.item.ruangantujuan == undefined) {
                    alert("Pilih Ruangan Tujuan terlebih dahulu!!")
                    return
                }
                if (data2.length == 0) {
                    alert("Pilih layanan terlebih dahulu!!")
                    return
                }
                var objSave = {
                            norec_so:'',
                            norec_apd: norec_apd,
                            norec_pd: norec_pd,
                            qtyproduk: data2.length,//
                            objectruanganfk:namaRuanganFk,
                            objectruangantujuanfk: $scope.item.ruangantujuan.id,
                            departemenfk:25,
                            pegawaiorderfk:$scope.PegawaiLogin2.pegawai[0].id,
                            tgloperasi:moment($scope.item.tglOperasi).format('YYYY-MM-DD hh:mm'),
                            details:data2
                        }
                
                managePhp.postOrderLaboratRad(objSave).then(function(e) {
                    // init();
                    $scope.BatalOrder();
                    // $scope.showInputan = false;
                    managePhp.postLogging('Order Jadwal Bedah', 'Norec strukorder_t',e.data.strukorder.norec, 'Menu Dokter').then(function (res) {
                    })
                })
        }
            // $scope.mainGridOptions = { 
            //     pageable: true,
            //     columns: $scope.columnProduk,
            //     editable: "popup",
            //     selectable: "row",
            //     scrollable: false
            // };
            $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }
            // $scope.back=function(){
            //     //$state.go("DaftarPasienApotik")
            //     window.history.back();
            // }
            // $scope.TambahObat =function(){
            //      ////debugger;
            //     var arrStr ={ 0 : $scope.item.noMr ,
            //         1 : $scope.item.namaPasien,
            //         2 : $scope.item.jenisKelamin,
            //         3 : $scope.item.noregistrasi, 
            //         4 : $scope.item.umur,
            //         5 : $scope.item.kelas.id,
            //         6 : $scope.item.kelas.namakelas,
            //         7 : $scope.item.tglRegistrasi,
            //         8 : norec_apd,
            //         9 : '',
            //         10 : $scope.item.jenisPenjamin,
            //         11 : $scope.item.kelompokPasien,
            //         12 : $scope.item.beratBadan,
            //         13 : $scope.item.AlergiYa
            //     }
            //     cacheHelper.set('InputResepApotikCtrl', arrStr);
            //     $state.go('InputResepApotik')
            // }
            // $scope.EditResep =function(){
            //      ////debugger;
            //     var arrStr ={ 0 : $scope.item.noMr ,
            //         1 : $scope.item.namaPasien,
            //         2 : $scope.item.jenisKelamin,
            //         3 : $scope.item.noregistrasi, 
            //         4 : $scope.item.umur,
            //         5 : $scope.item.kelas.id,
            //         6 : $scope.item.kelas.namakelas,
            //         7 : $scope.item.tglRegistrasi,
            //         8 : norec_apd,
            //         9 : 'EditResep',
            //         10 : $scope.item.jenisPenjamin,
            //         11 : $scope.item.kelompokPasien,
            //         12 : $scope.item.beratBadan,
            //         13 : $scope.item.AlergiYa,
            //         14 : $scope.dataSelected.norec_resep
            //     }
            //     cacheHelper.set('InputResepApotikCtrl', arrStr);
            //     $state.go('InputResepApotik')
            // }

            // $scope.orderApotik =function(){
            //     $state.go("InputResepApotikOrder")
            // }
            // $scope.HapusResep = function(){
            //     var objDelete = {norec:$scope.dataSelected.norec_resep}
            //     manageSarprasPhp.posthapuspelayananapotik(objDelete).then(function(e) {
            //         init();
            //     })
            // }
            // $scope.cetakEtiket = function(){
            //     var client = new HttpClient();
            //     client.get('http://127.0.0.1:1237/printvb/farmasiApotik?cetak-label-etiket=1&norec='+$scope.dataSelected.norec_resep+'&cetak=1', function(response) {
            //         // aadc=response;
            //     });
            // }
            $scope.cetakResep = function(){
                if ($scope.dataSelected == undefined) {
                    alert('Pilih resep yg akan di cetak')
                    return;
                }
                var stt = 'false'
                if (confirm('View resep? ')) {
                    // Save it!
                    stt='true';
                } else {
                    // Do nothing!
                    stt='false'
                }
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/farmasiApotik?cetak-strukresep=1&nores='+$scope.dataSelected.norec_resep+'&view='+stt+'&user='+$scope.dataSelected.detail.userData.namauser, function(response) {
                    // aadc=response;
                });
            }
            var HttpClient = function() {
                this.get = function(aUrl, aCallback) {
                    var anHttpRequest = new XMLHttpRequest();
                    anHttpRequest.onreadystatechange = function() { 
                        if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                            aCallback(anHttpRequest.responseText);
                    }

                    anHttpRequest.open( "GET", aUrl, true );            
                    anHttpRequest.send( null );
                }
            }
            $scope.back=function(){
                $state.go('DaftarAntrianDokterRajal')
            }
            
            $scope.showInputDiagnosaDokter=function(){
                var arrStr =cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl');
                cacheHelper.set('CacheInputDiagnosaDokter', arrStr);
                $state.go('InputDiagnosaDokter')
            }
            $scope.resep = function() {
                var arrStr = cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl');
                cacheHelper.set('InputResepApotikOrderRevCtrl', arrStr);
                $state.go('InputResepApotikOrderRev')
            }
            $scope.inputTindakanDokter = function() {
                var arrStr =cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl')
                cacheHelper.set('InputTindakanPelayananDokterRevCtrl', arrStr);
                 $state.go('InputTindakanPelayananDokterRev',{
                        norecPD:norec_pd,
                        norecAPD: norec_apd,
                      
                    });
            }
            $scope.laboratorium = function() {
                var arrStr =cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl')
                cacheHelper.set('TransaksiPelayananLaboratoriumDokterRevCtrl', arrStr);
                $state.go('TransaksiPelayananLaboratoriumDokterRev')
            }
            $scope.radiologi = function() {
                var arrStr =cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl')
                cacheHelper.set('TransaksiPelayananRadiologiDokterRevCtrl', arrStr);
                $state.go('TransaksiPelayananRadiologiDokterRev')
            }
            $scope.rekamMedisElektronik=function(){
                var arrStr =cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl');
                cacheHelper.set('cacheRMelektronik', arrStr);
                $state.go('RekamMedisElektronik')
            }
            $scope.inputCPPT = function () {
                var arrStr = cacheHelper.get('TransaksiPelayananLaboratoriumDokterRevCtrl');
                cacheHelper.set('cacheCPPT', arrStr);
                $state.go('CPPT')
            }
            $scope.hapusOrder = function(){
                if ($scope.dataSelectedRiwayat== undefined){
                    toastr.error('Pilih data yang mau dihapus')
                    return
                }
                if ($scope.dataSelectedRiwayat.statusorder!= 'PENDING'){
                    toastr.error('Tidak bisa dihapus')
                    return
                }
                var data= {
                    norec_order:$scope.dataSelectedRiwayat.norec
                }
                // managePhp.saveDataProduk2(data,"lab-radiologi/delete-orderlabrad")
                //     .then(function(e){
                //         init()

                //     })
            }
            // ,
            //                     "child": [
            //                         {
            //                             "id": "RekamMedis.OrderJadwalBedah.PersetujuanTindakanAnestesiB",
            //                             "title": "Informasi Anestesi"
            //                         },
            //                         {
            //                             "id": "RekamMedis.OrderJadwalBedah.PersetujuanTindakanAnestesiC",
            //                             "title": "Persetujuan Tindakan Anestesi"
            //                         },
            //                         {
            //                             "id": "RekamMedis.OrderJadwalBedah.PersetujuanTindakanAnestesiD",
            //                             "title": "Persetujuan Transfusi Darah"
            //                         }
            //                     ]

            
            // manageSarprasPhp.getDataTableTransaksi("pegawai/data-map-login-usertoruangan?jenis=departemenruangan", true).then(function(dat){
                // $scope.listInstalasi = dat.data
                // var inlineDefault = new kendo.data.HierarchicalDataSource({
                //     data: [
                //             {
                //                 "id": "d1",
                //                 "title": "Catatan Anestesi"
                //             },
                //             {
                //                 "id": "RekamMedis.OrderJadwalBedah.PersetujuanTindakanAnestesiA",
                //                 "title": "Persetujuan Tindakan Anestesi"
                //             },
                //             {
                //                 "id": "RekamMedis.OrderJadwalBedah.ProsedurKeselamatan",
                //                 "title": "Checklist Prosedur Keselamatan Pasien di Kamar Operasi",
                //                 "child":[
                //                     {
                //                         "id": 1,
                //                         "title": "Check In",
                //                     },
                //                     {
                //                         "id": "PKPSignIn",
                //                         "title": "Sign In",
                //                     },
                //                     {
                //                         "id": "PKPTimeOut",
                //                         "title": "Time Out",
                //                     },
                //                     {
                //                         "id": "PKPSignOut",
                //                         "title": "Sign Out",
                //                     },
                //                     {
                //                         "id": "PKPCheckOut",
                //                         "title": "Check Out",
                //                     }
                //                 ]
                //             },
                //             {
                //                 "id": "d4",
                //                 "title": "Laporan Perhitungan Kassa dan Alat Operasi",
                //             },
                //             {
                //                 "id": "d5",
                //                 "title": "Formulir Pra-Anestesi/Sedasi",
                //             },
                //             {
                //                 "id": "d6",
                //                 "title": "Asuhan Keperawatan Peri Operatif di Kamar Operasi"
                //             }
                //         ],
                //     // check: onCheck,
                //     schema: {
                //         model: {
                //             children: "child"
                //         }
                //     }
                // });
                // $scope.treeSourceBedah = inlineDefault
                // $scope.mainTreeViewBedahOption = {
                //     dataTextField: ["title"],
                //     datakKeyField: ["id"],
                //     select: onSelect,
                //     dragAndDrop: true,
                //     checkboxes: false
                // }

            // });
            function onSelect(e) {
                var data3 = e.sender.dataSource._data
                // var itm = findObjectByKey(data3, 'uid', "245421fd-68db-4d25-8afc-dbe1d20a2056");
                var uid_select = e.node.dataset.uid
                var idTree = '';
                var urlTrue = null;
                for (var i = data3.length - 1; i >= 0; i--) {
                    if (uid_select == data3[i].uid) {
                        idTree = data3[i].id
                        urlTrue = data3[i].reportdisplay
                        break;
                    }
                    if (data3[i].child != undefined) {
                        for (var ii = data3[i].child.length - 1; ii >= 0; ii--) {
                            if (uid_select == data3[i].child[ii].uid) {
                                idTree = data3[i].child[ii].id
                                urlTrue = data3[i].child[ii].reportdisplay
                                break;
                            }
                            if (data3[i].child[ii].child != undefined) {
                                for (var iii = data3[i].child[ii].child.length - 1; iii >= 0; iii--) {
                                    if (uid_select == data3[i].child[ii].child[iii].uid) {
                                        idTree = data3[i].child[ii].child[iii].id
                                        urlTrue = data3[i].child[ii].child[iii].reportdisplay
                                        break;
                                    }
                                }
                            }
                            
                        }
                    }
                    
                }
                var noemr = '-'
                if ($scope.dataSelected != undefined) {
                    noemr = $scope.dataSelected.noemr
                }
                if (urlTrue == null) {
                    $state.go("RekamMedis.OrderJadwalBedah.ProsedurKeselamatan", {
                        namaEMR : idTree,
                        nomorEMR : noemr
                    });
                }else{
                    $state.go(urlTrue);
                }
                

                
                
            }
//***********************************

}
]);
});

// http://127.0.0.1:1237/printvb/farmasiApotik?cetak-label-etiket=1&norec=6a287c10-8cce-11e7-943b-2f7b4944&cetak=1