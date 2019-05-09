define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarPasienLabRadCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper','DateHelper','ManageServicePhp',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper,dateHelper,manageServicePhp) {
            $scope.item = {};
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            // $scope.item.tglAwal = $scope.now;
            // $scope.item.tglAkhir = $scope.now;

            var data2 = [];
            $scope.PegawaiLogin2 ={};
            var namaRuangan = '';
            var namaRuanganFk = '';
            $scope.item.qty=1;
            $scope.tombolSimpanVis=true;
            LoadCache();
            loadCombo();
            function LoadCache(){
              var chacePeriode = cacheHelper.get('DaftarPasienLaboratoriumCtrl');
              if(chacePeriode != undefined){
               //var arrPeriode = chacePeriode.split(':');
               $scope.item.tglAwal = new Date(chacePeriode[0]);
               $scope.item.tglAkhir = new Date(chacePeriode[1]);
               $scope.item.namaPasien = chacePeriode[2];
               $scope.item.noMr = chacePeriode[3];
               $scope.item.noReg = chacePeriode[4];
               
               init();
           }
           else{
               $scope.item.tglAwal = $scope.now;
               $scope.item.tglAkhir = $scope.now;
               init();
           }
       }
       function loadCombo(){
        manageLogistikPhp.getDataTableTransaksi("logistik/get-datacombo_dp", true).then(function(dat){
            $scope.listDepartemen = dat.data.departemen;
            $scope.listKelompokPasien = dat.data.kelompokpasien;
        });
    }
    function init() {
     var ins =""
     if ($scope.item.instalasi != undefined){
        var ins ="&deptId=" +$scope.item.instalasi.id
    }
    var rg =""
    if ($scope.item.ruangan != undefined){
        var rg ="&ruangId=" +$scope.item.ruangan.id
    }
    var kp =""
    if ($scope.item.kelompokPasien != undefined){
        var kp ="&kelId=" +$scope.item.kelompokPasien.id
    }

    var reg =""
    if ($scope.item.noReg != undefined){
        var reg ="&noregistrasi=" +$scope.item.noReg
    }
    var rm =""
    if ($scope.item.noMr != undefined){
        var rm ="&nocm=" +$scope.item.noMr
    }
    var nm =""
    if ($scope.item.namaPasien != undefined){
        var nm ="&namapasien=" +$scope.item.namaPasien
    }

    var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD');
    var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD');
    manageLogistikPhp.getDataTableTransaksi("lab-radiologi/get-daftar-pasien?"+
        "tglAwal=" + tglAwal + 
        "&tglAkhir=" + tglAkhir +
        reg +
        rm +
        nm +
        ins+rg+kp
        , true).then(function(dat){
            for (var i = 0; i < dat.data.length; i++) {
                dat.data[i].no = i+1
                var tanggal = $scope.now;
                var tanggalLahir = new Date(dat.data[i].tgllahir);
                var umur = dateHelper.CountAge(tanggalLahir, tanggal);
                dat.data[i].umur =umur.year + ' thn ' + umur.month + ' bln ' + umur.day + ' hari'
                        //itungUsia(dat.data[i].tgllahir)
                    }
                    $scope.dataGrid = dat.data;
                });




    }
    $scope.getRuangan = function(){
        $scope.listRuangan = $scope.item.instalasi.ruangan;
    }
    $scope.cariFilter = function(){

        init();

        var tglAwal = moment($scope.item.tglAwal).format('YYYY-MM-DD');
        var tglAkhir = moment($scope.item.tglAkhir).format('YYYY-MM-DD');
        var chacePeriode ={ 0 : tglAwal ,
            1 : tglAkhir,
            2 : $scope.item.namaPasien,
            3 : $scope.item.noMr,
            4 : $scope.item.noReg,
            5 : '',
            6 : ''
        }
        cacheHelper.set('DaftarPasienLaboratoriumCtrl', chacePeriode);
    }

    $scope.OrderPelayanan = function(){

            if($scope.dataSelected == undefined){
                toastr.error('Pilih data dulu')
                return
            }

             manageLogistikPhp.getDataTableTransaksi("lab-radiologi/get-data-combo?objectkelasfk="+ $scope.dataSelected.klid,true).then(function(dat){
                $scope.listRuanganTujuan = dat.data.ruangantujuan;
                $scope.listLayanan = dat.data.produk;
                $scope.listDokter = dat.data.dokter;
            })
             $scope.item.ruanganAsal= $scope.dataSelected.namaruangan
             $scope.TransaksiPelayananPopUp.center().open();
             var actions = $scope.TransaksiPelayananPopUp.options.actions;
                // Remove "Close" button
             actions.splice(actions.indexOf("Close"), 1);
                // Set the new options
             $scope.TransaksiPelayananPopUp.setOptions({ actions : actions });
            

                //   var arrStr ={ 0 : $scope.dataSelected.nocm,
                //     1 : $scope.dataSelected.namapasien,
                //     2 : $scope.dataSelected.jeniskelamin,
                //     3 : $scope.dataSelected.noregistrasi, 
                //     4 : $scope.dataSelected.umur,
                //     5 : $scope.dataSelected.klid,
                //     6 : $scope.dataSelected.namakelas,
                //     7 : $scope.dataSelected.tglregistrasi,
                //     8 : $scope.dataSelected.norec,
                //     9 : $scope.dataSelected.namaruangan,
                //     10 : $scope.dataSelected.ruid,
                //     11 : $scope.dataSelected.norec_pd,
                //     12 : "",//nor
                //     13 :  $scope.dataSelected.kelompokpasien
                // }
                // cacheHelper.set('editOrderCache', arrStr);
                // $state.go('TransaksiPelayananLabRad')
            }

            // $scope.tambah = function(){
            //  $state.go('Produk')
            // }
            $scope.formatTanggal = function(tanggal){
                return moment(tanggal).format('DD-MMM-YYYY');
            }


            $scope.columnGrid = [
            {
                "field": "no",
                "title": "No",
                "width" : "30px",
            },
          
            {
                "field": "noregistrasi",
                "title": "No Registrasi",
                "width" : "80px",
            },
            {
                "field": "nocm",
                "title": "No MR",
                "width" : "70px",
            },
            {
                "field": "namapasien",
                "title": "Nama Pasien",
                "width" : "150px",
            },
              {
                "field": "namaruangan",
                "title": "Nama Ruangan",
                "width" : "130px",
            },
            {
                "field": "jeniskelamin",
                "title": "Jenis Kelamin",
                "width" : "70px",
            },
            {
                "field": "umur",
                "title": "Umur",
                "width" : "100px"
            },
            {
                "field": "tgllahir",
                "title": "Tgl Lahir",
                "width" : "100px"
            },
            {
                "field": "kelompokpasien",
                "title": "Kelompok Pasien",
                "width" : "100px",
            },
            // {
            //     "field": "namarekanan",
            //     "title": "namarekanan",
            //     "width" : "100px"//,
            //     //"template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
            // },
            {
                "field": "namakelas",
                "title": "Nama Kelas",
                "width" : "80px",
            },
            {
                "field": "tglregistrasi",
                "title": "Tgl Registrasi",
                "width" : "100px",
            },
            {
                "field": "tglpulang",
                "title": "Tgl Pulang",
                "width" : "100px",
            }
            ];
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
            $scope.formatTanggal = function(tanggal){
              return moment(tanggal).format('DD/MM/YYYY');
          }
          function itungUsia(tgl){
            debugger;
                // var tg = parseInt(form.elements[0].value);
                // var bl = parseInt(form.elements[1].value);
                // var th = parseInt(form.elements[2].value);
                var tanggal = $scope.now;
                var tglLahir = new Date(tgl);
                var selisih = Date.parse(tanggal.toGMTString()) - Date.parse(tglLahir.toGMTString());
                var thn = Math.round(selisih/(1000*60*60*24*365));
                //var bln = Math.round((selisih % 365)/(1000*60*60*24));
                return thn + ' thn '// + bln + ' bln'
            }
            $scope.columnGridOrder = [
            {
                "field": "no",
                "title": "No",
                "width" : "30px",
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
            $scope.add = function(){
                if ($scope.item.qty == 0) {
                    toastr.error("Qty harus di isi!")
                    return;
                }
                if ($scope.item.ruangantujuan == undefined) {
                    toastr.error("Pilih Ruangan Tujuan terlebih dahulu!!")
                    return;
                }
                if ($scope.item.layanan == undefined) {
                    toastr.error("Pilih Layanan terlebih dahulu!!")
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
                            data.objectruanganfk = $scope.dataSelected.ruid
                            data.objectruangantujuanfk = $scope.item.ruangantujuan.id
                            data.objectkelasfk=  $scope.dataSelected.klid

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
                        objectruanganfk:$scope.dataSelected.ruid,
                        objectruangantujuanfk:$scope.item.ruangantujuan.id,
                        objectkelasfk: $scope.dataSelected.klid
                    }
                    data2.push(data)
                // $scope.dataGrid.add($scope.dataSelected)
                $scope.dataGridOrder = new kendo.data.DataSource({
                    data: data2
                });
            }
            kosongkan()
        }
        function kosongkan(){
            $scope.item.no=undefined
            $scope.item.layanan=''
            $scope.item.qty=1
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
        }
        $scope.hapus = function(){
            if ($scope.item.qty == 0) {
                toastr.error("Qty harus di isi!")
                return;
            }
            if ($scope.item.ruangantujuan == undefined) {
                toastr.error("Pilih Ruangan Tujuan terlebih dahulu!!")
                return;
            }
            if ($scope.item.layanan == undefined) {
                toastr.error("Pilih Layanan terlebih dahulu!!")
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
        }
        $scope.batal = function(){
            $scope.item.layanan =''
            $scope.item.qty =''
            $scope.item.no=undefined
        }
        $scope.BatalOrder= function(){
            $scope.TransaksiPelayananPopUp.close();
            data2=[]
            $scope.dataGridOrder = new kendo.data.DataSource({
                data: data2
            });
            // $scope.CmdOrderPelayanan = true;
            // $scope.OrderPelayanan = false;
        }
        $scope.Simpan= function(){
            var norec_so='';
            if ($scope.dataSelected.norec_so!=undefined){
                norec_so=$scope.dataSelected.norec_so
            }
            if ($scope.item.ruangantujuan == undefined) {
                toastr.error("Pilih Ruangan Tujuan terlebih dahulu!!")
                return
            }
            if (data2.length == 0) {
                toastr.error("Pilih layanan terlebih dahulu!!")
                return
            }
         
            var objSave = {
                norec_apd: $scope.dataSelected.norec,
                norec_pd: $scope.dataSelected.norec_pd,
                norec_so: norec_so,
                qtyproduk: data2.length,//
                objectruanganfk:$scope.dataSelected.ruid,
                objectruangantujuanfk: $scope.item.ruangantujuan.id,
                departemenfk:$scope.item.ruangantujuan.departemenfk,
                pegawaiorderfk:$scope.item.dokter.id,
                details:data2
               }
            $scope.tombolSimpanVis=false;
            manageServicePhp.postOrderLayanan(objSave).then(function(e) {
                        // init()
                        $scope.tombolSimpanVis=true;
            })
        }
//***********************************

}
]);
});
