define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DaftarAntrianSusterRajalCtrl', ['SaveToWindow', '$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'DateHelper', 'socket', 'ManagePasien', '$mdDialog', '$window', 'ManageSarprasPhp','CacheHelper', '$q', 'ManagePhp',
        function(saveToWindow, $rootScope, $scope, ModelItem, $state, findPasien, dateHelper, socket, managePasien, $mdDialog, window, manageSarprasPhp, cacheHelper, $q, ManagePhp) {
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item = {};
            $scope.dataLogin = JSON.parse(localStorage.getItem('pegawai'))
            // $scope.dataPasienSelected = {};
            $scope.item.periodeAwal = new Date();
            // $scope.item.periodeAwal = dateHelper.setJamAwal(new Date());
            $scope.item.periodeAkhir = new Date();
            $scope.dataPasienSelected = {};
            $scope.isRouteLoading=false;
            $rootScope.isOpen = true;
            $scope.cboUbahDokter= true;
            // $scope.title = "ini page pencarian pasien";
            // $scope.kodeRuangan = $state.params.kodeRuangan;
            // $scope.isCalling = false;
            $scope.pegawai = ModelItem.getPegawai();
            loadCombo();
            loadData();
            loadKonsul();
            postRensarWTRJ();
            function postRensarWTRJ() {
                manageSarprasPhp.saveDataTransaksi('rensar/post-waktu-tunggu-rj')
                .then(function (res) {
                })
            }
            // loadData()
            $scope.SearchEnter = function () {
                loadData()
            }

            function loadKonsul(){
                ManagePhp.getData("rekam-medis/get-order-konsul").then(function(e){
                  var res = e.data.data
                  for (var i = res.length - 1; i >= 0; i--) {
                    if( res[i].norec_apd != null) {
                        res.splice([i],1)
                    }
                }
                if(res.length > 0) {
                    $scope.showNotif = true
                    $scope.lengthKonsul = res.length;
                } else {
                    $scope.showNotif = false;
                }
                    $scope.sourceKonsul = new kendo.data.DataSource({
                        data: res,
                        pageSize: 20,
                    });
                })
            }

            $scope.konsul = function(){
                loadKonsul();
                $scope.winKonsul.center().open();
            }

            // function loadGridKonsul(){
            //     ManagePhp.getData("rekam-medis/get-order-konsul").then(function(e){
            //         var result = e.data.data
            //         if(result.length > 0){
            //             $scope.item.dokterTujuan = result[0].namalengkap
            //             for (var i = 0; i < result.length; i++) {
            //                 result[i].no = i + 1
            //                 if(result[i].norec_apd != null)
            //                     result[i].status = 'Selesai'
            //                 else
            //                     result[i].status = '-'
            //             }
            //         }
            //         $scope.sourceKonsul = new kendo.data.DataSource({
            //             data: result,
            //             pageSize: 20,
            //         });
            //     }, (error) => {
            //         throw error;
            //     })
            // }

            $scope.konsulOpt = {
                pageable: true,
                scrollable: true,
                columns: [
                    // { field: "rowNumber", title: "#", width: 40, width: 40, attributes: { style: "text-align:right; padding-right: 15px;"}, hideMe: true},
                    // { field: "no", title: "No", width: 40, headerAttributes: { style: "text-align : center" }},
                    { field: "noregistrasi", title: "No Registrasi", width: 100, headerAttributes: { style: "text-align : center" }},
                    { field: "nocm", title: "No RM", width: 80, headerAttributes: { style: "text-align : center" }},
                    { field: "namapasien", title: "Nama Pasien", width: 150, headerAttributes: { style: "text-align : center" }},
                    { field: "tglorder", title: "Tanggal", width: 120, headerAttributes: { style: "text-align : center" }},
                    { field: "ruanganasal", title: "Ruangan Asal", width: 120, headerAttributes: { style: "text-align : center" }},
                    { field: "ruangantujuan", title: "Ruangan Tujuan", width: 150, headerAttributes: { style: "text-align : center" } },
                    { field: "namalengkap", title: "Dokter<br> Asal", width: 120, headerAttributes: { style: "text-align : center" }},
                    { field: "pengonsul", title: "Dokter<br> Tujuan", width: 120, headerAttributes: { style: "text-align : center" }},
                    // { field: "keteranganorder", title: "Keterangan", width: 120, headerAttributes: { style: "text-align : center" }},
                    // { field: "status", title: "Status", width: 120, headerAttributes: { style: "text-align : center" }},
                    { command: [ { name: "Edit", text: "Detail", click: verif }], title: "&nbsp;", width: 120, attributes: { style: "text-align:center;valign=middle" }}
                ],
            };

            $scope.verifikasiKonsultasiDokter = function () {
                var length = $scope.sourceKonsul._data.length + 1;
                var dataKonsul = {
                    "kelasfk":  6,
                    "noantrian": length,
                    "norec_so": $scope.noRecKonsultasi,
                    "norec_pd": $scope.noRecPdKonsultasi,
                    "dokterfk": $scope.pegawaiFkKonsultasi,
                    "objectruangantujuanfk": $scope.objectRuanganFkTujuanKonsultasi,
                    "objectruanganasalfk": $scope.objectRuanganFkKonsultasi,
                    "kesan": $scope.item.kesan
                }
                console.log(dataKonsul)
                // ManagePhp.postData2('rekam-medis/save-konsul-from-order',dataKonsul).then(function(e){
                //     loadGridKonsul()
                //     loadData();
                //     loadKonsul()
                //     $scope.saveLogKonsul();
                
                    
                // })
            }

            $scope.tutup = function (data) {
                if(data == 1) {
                    $scope.popUpHasilKonsul.close();
                }
            }

            $scope.searchDataPegawai = function() {
                ManagePhp.getData("rekam-medis/get-order-konsul?" + $scope.item.paramDokter).then(function(res){
                    var data = res;
                    // load
                    $scope.sourceKonsul = new kendo.data.DataSource({
                        data: res,
                        pageSize: 20,
                    });
                });
            }

            function verif(e){
                e.preventDefault();
                var dataItem = this.dataItem($(e.currentTarget).closest("tr"));

                if(dataItem.status == 'Selesai'){
                    $scope.isVerify = true;
                }
                $scope.item.dokterPengonsul = dataItem.pengonsul;
                $scope.item.dokterTarget = dataItem.namalengkap
                $scope.item.keteranganOrder = dataItem.keteranganorder;
                $scope.item.keteranganKeperluan = dataItem.keterangankeperluan
                $scope.statusKonsultasi = dataItem.status;
                $scope.noRecKonsultasi = dataItem.norec;
                $scope.noRecPdKonsultasi = dataItem.norec_pd;
                $scope.pegawaiFkKonsultasi = dataItem.pegawaifk;
                $scope.objectRuanganFkTujuanKonsultasi = dataItem.objectruangantujuanfk;
                $scope.objectRuanganFkKonsultasi = dataItem.objectruanganfk;
                $scope.popUpHasilKonsul.center().open();
            
            }

            function loadCombo(){
                var chacePeriode = cacheHelper.get('DaftarAntrianDokterRajalCtrl');
                if(chacePeriode != undefined){
                    //debugger;
                    var arrPeriode = chacePeriode.split('~');
                    $scope.item.periodeAwal = new Date(arrPeriode[0]);
                    $scope.item.periodeAkhir = new Date(arrPeriode[1]); 
                    // $scope.item.tglpulang = new Date(arrPeriode[2]);                
                }else{
                    $scope.item.periodeAwal = $scope.now;
                    $scope.item.periodeAkhir = $scope.now;
                    // $scope.item.tglpulang = $scope.now;                 
                }
                manageSarprasPhp.getDataTableTransaksi("dokter/get-data-combo-dokter", false).then(function(data) {
                    $scope.listRuangan = data.data.ruanganRajal;
                });

                manageSarprasPhp.getDataTableTransaksi("pasien/get-dokters-combos", false).then(function(data) {
                    $scope.listDokter = data.data.dokter;
                });
            }

            function loadData(){
                $scope.isRouteLoading = true;
                var tglAwal = moment($scope.item.periodeAwal).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.item.periodeAkhir).format('YYYY-MM-DD HH:mm:ss');

                var nocm =""
                if ($scope.item.noCm != undefined){
                    var nocm ="&norm="+$scope.item.noCm
                }   
                var nama =""
                if ($scope.item.namaPasien != undefined){
                    var nama ="&nama="+$scope.item.namaPasien
                }
                var noRegistrasi =""
                if ($scope.item.noRegistrasi != undefined){
                    var noRegistrasi ="&noreg="+$scope.item.noRegistrasi
                }
                var dokId=""
                if ($scope.pegawai.id != undefined){
                   var dokId = "&dokId="+$scope.pegawai.id
                }
                var ruangId=""
                if ($scope.item.ruangan != undefined){
                   var ruangId = "&ruangId="+$scope.item.ruangan.id
                }

                $q.all([
                   manageSarprasPhp.getDataTableTransaksi("dokter/get-daftar-antrian-rajal?"+
                    "&tglAwal="+tglAwal+
                    "&tglAkhir="+tglAkhir+
                    "&norm="+nocm+
                    "&noreg="+noRegistrasi+
                    "&nama="+nama
                    +ruangId),
                    ]).then(function(data) {
                    $scope.isRouteLoading = false;
                    var datas = data[0].data;
                    for (var i = 0; i < datas.length; i++) {
                        datas[i].no = i+1
                        var tanggal = $scope.now;
                        var tanggalLahir = new Date(datas[i].tgllahir);
                        var umurzz = dateHelper.CountAge(tanggalLahir, tanggal);
                        datas[i].umurzz =umurzz.year + ' thn ' + umurzz.month + ' bln ' + umurzz.day + ' hari'
                    }
                        $scope.GridPasien = new kendo.data.DataSource({
                            data: datas,
                            group: $scope.group,
                            pageSize: 10,
                            total: data.length,
                            serverPaging: false,
                            schema: {
                                model: {
                                    fields: {
                                    }
                                }
                            }
                        });
                        var chacePeriode = tglAwal + "~" + tglAkhir;
                        cacheHelper.set('DaftarAntrianDokterRajalCtrl', chacePeriode);
                    });
            }

            $scope.klikGrid = function(dataPasienSelected){            
                // loadCombo();
                // $scope.item.periodeAwal = dateHelper.setJamAwal(new Date());
                // $scope.item.periodeAkhir = $scope.now;
                if (dataPasienSelected != undefined) {
                    $scope.item.pilihDokter = {id:dataPasienSelected.objectpegawaifk,namalengkap:dataPasienSelected.namadokter}
                }
            }
            
            $scope.group = {
                field: "namaruangan",
                aggregates: [
                // {
                //     field: "pasien",
                //     aggregate: "count"
                // }, 
                {
                    field: "namaruangan",
                    aggregate: "count"
                }]
            };
            $scope.aggregate = [
            // {
            //     field: "pasien",
            //     aggregate: "count"
            // }, 
            {
                field: "namaruangan",
                aggregate: "count"
            }]
            $scope.ColumnPasien = [
            {
                "field":"no",
                "title":"No",
                "width":"40px",
            },
            {
                "field":"tglregistrasi",
                "title":"Tgl Registrasi",
                "template": "#= new moment(new Date(tglregistrasi)).format('DD-MM-YYYY HH:mm') #",
                "width":"80px"
            }, 
            {
                "field":"noregistrasi",
                "title":"No Registrasi",
                "width":"80px"
            },
            {
                "field":"nocm",
                "title":"No. Rekam Medis",
                "width":"80px"               
            },
            {
                "field":"namapasien",
                "title":"Nama Pasien",
                "width":"100px"
            }, 
            {
                "field":"umurzz",
                "title":"Umur",
                "width":"100px"      
            }, 
            {
                "field":"namadokter",
                "title":"Dokter",
                "width":"100px"     
            }, 
            {
                "field": "jeniskelamin",
                "title": "Jenis Kelamin",
                "width":"100px"
            },
            {
                "field": "kelompokpasien",
                "title": "Tipe Pembayaran",
                "width":"80px"
            }, 
            {
                "field": "namakelas",
                "title": "Kelas",
                "width": "80px"
            },
            // {
            //     field: "statusAntrian",
            //     title: "Status",
            //     aggregates: ["count"]
            // }, 
            {
                hidden: true,
                field: "namaruangan",
                title: "Nama Ruangan",
                aggregates: ["count"],
                groupHeaderTemplate: "Ruangan #= value # (Jumlah: #= count#)"
            }];

            $scope.Page = {
                refresh: true,
                pageSizes: true,
                buttonCount: 5
            }

            $scope.diagnosaICD10 = function() {
                debugger;
                if ($scope.dataPasienSelected.nocm ==null && $scope.dataPasienSelected.norec_apd == null)
                   {
                        window.messageContainer.error("Pilih Dahulu Pasien!")
                        return
                    }
                var arrStr ={ 0 : $scope.dataPasienSelected.nocm ,
                    1 : $scope.dataPasienSelected.namapasien,
                    2 : $scope.dataPasienSelected.jeniskelamin,
                    3 : $scope.dataPasienSelected.noregistrasi, 
                    4 : $scope.dataPasienSelected.umurzz,
                    5 : $scope.dataPasienSelected.kelompokpasien,
                    6 : $scope.dataPasienSelected.tglregistrasi,
                    7 : $scope.dataPasienSelected.norec_apd,
                    8 : $scope.dataPasienSelected.norec_pd,
                    9 : $scope.dataPasienSelected.idkelas,
                    10 : $scope.dataPasienSelected.namakelas,
                    11 : $scope.dataPasienSelected.objectruanganfk,
                    12 : $scope.dataPasienSelected.namaruangan
                }
                cacheHelper.set('DiagnosaDokterCtrl', arrStr);
                $state.go('DiagnosaDokter')
            }
            $scope.diagnosaICD9 = function() {
                debugger;
                // $state.go('RiwayatRegistrasi3', {
                //     nocm: $scope.dataPasienSelected.nocm,
                //     noregistrasi: $scope.dataPasienSelected.noregistrasi
                // });
                if ($scope.dataPasienSelected.nocm ==null && $scope.dataPasienSelected.norec_apd == null)
                   {
                        window.messageContainer.error("Pilih Dahulu Pasien!")
                        return
                    }
                // debugger;
                var arrStr ={ 0 : $scope.dataPasienSelected.nocm ,
                    1 : $scope.dataPasienSelected.namapasien,
                    2 : $scope.dataPasienSelected.jeniskelamin,
                    3 : $scope.dataPasienSelected.noregistrasi, 
                    4 : $scope.dataPasienSelected.umurzz,
                    5 : $scope.dataPasienSelected.kelompokpasien,
                    6 : $scope.dataPasienSelected.tglregistrasi,
                    7 : $scope.dataPasienSelected.norec_apd,
                    8 : $scope.dataPasienSelected.norec_pd,
                    9 : $scope.dataPasienSelected.idkelas,
                    10 : $scope.dataPasienSelected.namakelas,
                    11 : $scope.dataPasienSelected.objectruanganfk,
                    12 : $scope.dataPasienSelected.namaruangan
                }
                cacheHelper.set('DiagnosaDokterICD9Ctrl', arrStr);
                $state.go('DiagnosaDokterICD9')
            }
            $scope.showInputDiagnosaDokter=function(){
                 if ($scope.dataPasienSelected.nocm ==null && $scope.dataPasienSelected.norec_apd == null)
                   {
                        window.messageContainer.error("Pilih Dahulu Pasien!")
                        return
                    }
                // debugger;
                var arrStr ={ 0 : $scope.dataPasienSelected.nocm ,
                    1 : $scope.dataPasienSelected.namapasien,
                    2 : $scope.dataPasienSelected.jeniskelamin,
                    3 : $scope.dataPasienSelected.noregistrasi, 
                    4 : $scope.dataPasienSelected.umurzz,
                    5 : $scope.dataPasienSelected.kelompokpasien,
                    6 : $scope.dataPasienSelected.tglregistrasi,
                    7 : $scope.dataPasienSelected.norec_apd,
                    8 : $scope.dataPasienSelected.norec_pd,
                    9 : $scope.dataPasienSelected.idkelas,
                    10 : $scope.dataPasienSelected.namakelas,
                    11 : $scope.dataPasienSelected.objectruanganfk,
                    12 : $scope.dataPasienSelected.namaruangan + '`'
                }
                cacheHelper.set('CacheInputDiagnosaDokter', arrStr);
                $state.go('InputDiagnosaDokter')

            }
            $scope.rekamMedisElektronik=function(){
                if ($scope.dataPasienSelected.nocm ==null && $scope.dataPasienSelected.norec_apd == null)
                   {
                        window.messageContainer.error("Pilih Dahulu Pasien!");
                        return;
                    }
                // debugger;
                var arrStr = { 0 : $scope.dataPasienSelected.nocm ,
                    1 : $scope.dataPasienSelected.namapasien,
                    2 : $scope.dataPasienSelected.jeniskelamin,
                    3 : $scope.dataPasienSelected.noregistrasi, 
                    4 : $scope.dataPasienSelected.umurzz,
                    5 : $scope.dataPasienSelected.kelompokpasien,
                    6 : $scope.dataPasienSelected.tglregistrasi,
                    7 : $scope.dataPasienSelected.norec_apd,
                    8 : $scope.dataPasienSelected.norec_pd,
                    9 : $scope.dataPasienSelected.idkelas,
                    10 : $scope.dataPasienSelected.namakelas,
                    11 : $scope.dataPasienSelected.objectruanganfk,
                    12 : $scope.dataPasienSelected.namaruangan + '`'
                }
               cacheHelper.set('cacheRMelektronik', arrStr);
               $state.go('RekamMedis',{
                norecAPD: $scope.dataPasienSelected.norec_apd,
                noRec: $scope.dataPasienSelected.norec_apd
               })

           }


            $scope.resep = function() {
                if ($scope.dataPasienSelected.nocm ==null && $scope.dataPasienSelected.norec_apd == null)
                   {
                        window.messageContainer.error("Pilih Dahulu Pasien!");
                        return;
                    }
                // debugger;
                var arrStr ={ 0 : $scope.dataPasienSelected.nocm ,
                    1 : $scope.dataPasienSelected.namapasien,
                    2 : $scope.dataPasienSelected.jeniskelamin,
                    3 : $scope.dataPasienSelected.noregistrasi, 
                    4 : $scope.dataPasienSelected.umurzz,
                    5 : $scope.dataPasienSelected.kelompokpasien,
                    6 : $scope.dataPasienSelected.tglregistrasi,
                    7 : $scope.dataPasienSelected.norec_apd,
                    8 : $scope.dataPasienSelected.norec_pd,
                    9 : $scope.dataPasienSelected.idkelas,
                    10 : $scope.dataPasienSelected.namakelas,
                    11 : $scope.dataPasienSelected.objectruanganfk,
                    12 : $scope.dataPasienSelected.namaruangan + '`'
                }
                cacheHelper.set('InputResepApotikOrderRevCtrl', arrStr);
                $state.go('InputResepApotikOrderRev')
            }

            $scope.laboratorium = function() {
                debugger;
                if ($scope.dataPasienSelected.nocm ==null && $scope.dataPasienSelected.norec_apd == null)
                   {
                        window.messageContainer.error("Pilih Dahulu Pasien!")
                        return
                    }
                // debugger;
                var arrStr ={ 0 : $scope.dataPasienSelected.nocm ,
                    1 : $scope.dataPasienSelected.namapasien,
                    2 : $scope.dataPasienSelected.jeniskelamin,
                    3 : $scope.dataPasienSelected.noregistrasi, 
                    4 : $scope.dataPasienSelected.umurzz,
                    5 : $scope.dataPasienSelected.kelompokpasien,
                    6 : $scope.dataPasienSelected.tglregistrasi,
                    7 : $scope.dataPasienSelected.norec_apd,
                    8 : $scope.dataPasienSelected.norec_pd,
                    9 : $scope.dataPasienSelected.idkelas,
                    10 : $scope.dataPasienSelected.namakelas,
                    11 : $scope.dataPasienSelected.objectruanganfk,
                    12 : $scope.dataPasienSelected.namaruangan + '`'
                }
                cacheHelper.set('TransaksiPelayananLaboratoriumDokterRevCtrl', arrStr);
                $state.go('TransaksiPelayananLaboratoriumDokterRev')
            }

            $scope.radiologi = function() {
                debugger;
                if ($scope.dataPasienSelected.nocm ==null && $scope.dataPasienSelected.norec_apd == null)
                   {
                        window.messageContainer.error("Pilih Dahulu Pasien!")
                        return
                    }
                // debugger;
                var arrStr ={ 0 : $scope.dataPasienSelected.nocm ,
                    1 : $scope.dataPasienSelected.namapasien,
                    2 : $scope.dataPasienSelected.jeniskelamin,
                    3 : $scope.dataPasienSelected.noregistrasi, 
                    4 : $scope.dataPasienSelected.umurzz,
                    5 : $scope.dataPasienSelected.kelompokpasien,
                    6 : $scope.dataPasienSelected.tglregistrasi,
                    7 : $scope.dataPasienSelected.norec_apd,
                    8 : $scope.dataPasienSelected.norec_pd,
                    9 : $scope.dataPasienSelected.idkelas,
                    10 : $scope.dataPasienSelected.namakelas,
                    11 : $scope.dataPasienSelected.objectruanganfk,
                    12 : $scope.dataPasienSelected.namaruangan + '`'
                }
                cacheHelper.set('TransaksiPelayananRadiologiDokterRevCtrl', arrStr);
                $state.go('TransaksiPelayananRadiologiDokterRev')
            }

            $scope.inputTindakanDokter = function() {
                debugger;
                if ($scope.dataPasienSelected.nocm ==null && $scope.dataPasienSelected.norec_apd == null)
                   {
                        window.messageContainer.error("Pilih Dahulu Pasien!")
                        return
                    }
                // debugger;
                var arrStr ={ 0 : $scope.dataPasienSelected.nocm ,
                    1 : $scope.dataPasienSelected.namapasien,
                    2 : $scope.dataPasienSelected.jeniskelamin,
                    3 : $scope.dataPasienSelected.noregistrasi, 
                    4 : $scope.dataPasienSelected.umurzz,
                    5 : $scope.dataPasienSelected.kelompokpasien,
                    6 : $scope.dataPasienSelected.tglregistrasi,
                    7 : $scope.dataPasienSelected.norec_apd,
                    8 : $scope.dataPasienSelected.norec_pd,
                    9 : $scope.dataPasienSelected.idkelas,
                    10 : $scope.dataPasienSelected.namakelas,
                    11 : $scope.dataPasienSelected.objectruanganfk,
                    12 : $scope.dataPasienSelected.namaruangan + '`'
                }
                cacheHelper.set('InputTindakanPelayananDokterRevCtrl', arrStr);
                // $state.go('inputTindakanDokterRev')

                 $state.go('InputTindakanPelayananDokterRev',{
                        norecPD:$scope.dataPasienSelected.norec_pd,
                        norecAPD: $scope.dataPasienSelected.norec_apd,
                      
                    });
            }
            
            $scope.Monitoring = function() {
                $state.go('MonitoringPasien', { 
                    noCm: $scope.dataPasienSelected.nocm 
                });
            }

            $scope.PengkajianAwal = function(){
                var cookie = document.cookie.split(';');
                var statusCode = ModelItem.getStatusUser();
                var objValid = $scope.cekStatusBeforePemeriksaan(statusCode, $scope.item.statusAntrian);
                // if (objValid.status) {
                    saveToWindow.setItemToWindowChace("isRawatInap", false);
                    cookie = cookie[0].split('=');
                    // if ($scope.item.isKajianAwal || cookie[1] === 'suster') {
                        $state.go('dashboardpasien.DashboardPAP', {
                            noCM:  $scope.dataPasienSelected.nocm,
                            tanggal: moment(new Date( $scope.dataPasienSelected.tglregistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                            noRec:  $scope.dataPasienSelected.norec_apd,
                            ruangana:  $scope.dataPasienSelected.objectruanganfk
                        });
                    // } else {
                    //     $state.go('dashboardpasien.DashboardPAP', {
                    //         noCM: $scope.item.nocm,
                    //         tanggal: moment(new Date($scope.item.nocm .tglregistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                    //         noRec: $scope.item.noRec,
                    //         ruangana:$scope.item.ruangan.id
                    //     });
                    // }
                // } else {
                //     window.messageContainer.error(objValid.msg);
                // }
            }

            $scope.PengkajianMedis = function(){
                var cookie = document.cookie.split(';');
                var statusCode = ModelItem.getStatusUser();
                var objValid = $scope.cekStatusBeforePemeriksaan(statusCode, $scope.item.statusAntrian);
                // if (objValid.status) {
                    saveToWindow.setItemToWindowChace("isRawatInap", false);
                    cookie = cookie[0].split('=');
                    // if ($scope.item.isKajianAwal || cookie[1] === 'suster') {
                        $state.go('dashboardpasien.PengkajianMedis', {
                            noCM:  $scope.dataPasienSelected.nocm,
                            tanggal: moment(new Date( $scope.dataPasienSelected.tglregistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                            noRec:  $scope.dataPasienSelected.norec_apd,
                            ruangana:  $scope.dataPasienSelected.objectruanganfk
                        });
                    // } else {
                //         $state.go('dashboardpasien.PengkajianMedis', {
                //             noCM: $scope.item.pasien.noCm,
                //             tanggal: moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                //             noRec: $scope.item.noRec,
                //             ruangana:$scope.item.ruangan.id
                //         });
                //     }
                // } else {
                //     window.messageContainer.error(objValid.msg);
                // }
            }

            $scope.detailOrder = function() {
                if ($scope.dataPasienSelected.nocm ==null && $scope.dataPasienSelected.norec_apd == null){
                    window.messageContainer.error("Pilih Dahulu Pasien!")
                    return
                }else{
                    $state.go('dashboardpasien.BillingDetail', {
                        noRecRegistrasi:  $scope.dataPasienSelected.norec_pd,
                        noRec: $scope.dataPasienSelected.norec_apd
                    });
                }
            }

            $scope.detailPasien = function() {
                var cookie = document.cookie.split(';');
                var statusCode = ModelItem.getStatusUser();
                var objValid = $scope.cekStatusBeforePemeriksaan(statusCode, $scope.item.statusAntrian);
                // if (objValid.status) {
                    saveToWindow.setItemToWindowChace("isRawatInap", false);
                    cookie = cookie[0].split('=');
                    // if ($scope.item.isKajianAwal || cookie[1] === 'suster') {
                        $state.go('dashboardpasien.pasien', {
                            noCM:  $scope.dataPasienSelected.nocm,
                            tanggal: moment(new Date( $scope.dataPasienSelected.tglregistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                            noRec:   $scope.dataPasienSelected.norec_apd
                        });
                //     } else {
                //         $state.go('dashboardpasien.pasien', {
                //             noCM: $scope.item.pasien.noCm,
                //             tanggal: moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                //             noRec: $scope.item.noRec
                //         });
                //     }
                // } else {
                //     window.messageContainer.error(objValid.msg);
                // }
            }

            $scope.PengkajianLanjutan = function() {                
                var cookie = document.cookie.split(';');
                var statusCode = ModelItem.getStatusUser();
                var objValid = $scope.cekStatusBeforePemeriksaan(statusCode, $scope.item.statusAntrian);
                // if (objValid.status) {
                    saveToWindow.setItemToWindowChace("isRawatInap", false);
                    cookie = cookie[0].split('=');
                    // if ($scope.item.isKajianAwal || cookie[1] === 'suster') {
                        $state.go('dashboardpasien.pengkajianLanjutan', {
                            noCM:  $scope.dataPasienSelected.nocm,
                            tanggal: moment(new Date( $scope.dataPasienSelected.tglregistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                            noRec:  $scope.dataPasienSelected.norec_apd,
                            ruangana:  $scope.dataPasienSelected.objectruanganfk
                        });
                //     } else {
                //         $state.go('dashboardpasien.pengkajianLanjutan', {
                //             noCM: $scope.item.pasien.noCm,
                //             tanggal: moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                //             noRec: $scope.item.noRec,
                //             ruangana:$scope.item.ruangan.id
                //         });
                //     }
                // } else {
                //     window.messageContainer.error(objValid.msg);
                // }
            }            

            $scope.findData = function() {
               loadData()
            }

            $scope.pemeriksaanPasien = function() {
                var cookie = document.cookie.split(';');

                var statusCode = ModelItem.getStatusUser();
                var objValid = $scope.cekStatusBeforePemeriksaan(statusCode, $scope.item.statusAntrian);
                if (objValid.status) {
                    saveToWindow.setItemToWindowChace("isRawatInap", false);
                    cookie = cookie[0].split('=');
                    if ($scope.item.isKajianAwal || cookie[1] === 'suster') {
                        $state.go('dashboardpasien.pengkajianUtama', {
                            noCM:  $scope.dataPasienSelected.nocm,
                            tanggal: moment(new Date( $scope.dataPasienSelected.tglregistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                            noRec: $scope.dataPasienSelected.norec_apd
                        });
                    } else {
                        $state.go('dashboardpasien.pengkajianUtama', {
                            noCM:  $scope.dataPasienSelected.pasien.nocm,
                            tanggal: moment(new Date( $scope.dataPasienSelected.tglregistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                            noRec: dataPasienSelected.norec_apd
                        });
                    }
                } else {
                    window.messageContainer.error(objValid.msg);
                }
            }

            $scope.cekStatusBeforePemeriksaan = function(statusCode, statusAntrian) {
                var obj = {
                    "msg": "",
                    "status": true
                }
                switch (statusCode) {
                    case "suster":
                        switch (statusAntrian) {
                            case "DIPANGGIL_DOKTER":
                                obj.msg = "Pasien sudah di panggil dokter";
                                obj.status = false;
                                break;
                            case "DIPANGGIL_SUSTER":
                                obj.status = true;
                                break;
                            case "MENUNGGU":
                                obj.msg = "Pasien harus di panggil suster terlebih dahulu";
                                obj.status = false;
                                break;
                        };
                        break;
                    case "dokter":
                        switch (statusAntrian) {
                            case "DIPANGGIL_DOKTER":
                                obj.status = true;
                                break;
                            case "DIPANGGIL_SUSTER":
                                obj.msg = "Pasien harus di panggil dokter terlebih dahulu";
                                obj.status = false;
                                break;
                            case "MENUNGGU":
                                obj.msg = "Pasien harus di panggil suster terlebih dahulu";
                                obj.status = false;
                                break;
                        };
                        break;
                }

                return obj;
            }

            $scope.cekStatusBeforePanggil = function(statusCode, statusAntrian) {
                var obj = {
                    "msg": "",
                    "status": false,
                    "statusAntrian": 0
                }

                switch (statusCode) {
                    case "suster":
                        switch (statusAntrian) {
                            case "DIPANGGIL_DOKTER":
                                obj.msg = "Pasien sudah di panggil dokter";
                                obj.status = false;
                                break;
                            case "DIPANGGIL_SUSTER":
                                obj.msg = "Pasien sudah di panggil suster";
                                obj.status = false;
                                break;
                            case "MENUNGGU":
                                obj.status = true;
                                obj.statusAntrian = 1;
                                break;
                        };
                        break;
                    case "dokter":
                        switch (statusAntrian) {
                            case "DIPANGGIL_DOKTER":
                                obj.msg = "Pasien sudah di panggil dokter";
                                obj.status = false;
                                break;
                            case "DIPANGGIL_SUSTER":
                                obj.status = true;
                                obj.statusAntrian = 2;
                                break;
                            case "MENUNGGU":
                                obj.msg = "Pasien harus di panggil suster terlebih dahulu";
                                obj.status = false;
                                break;
                        };
                        break;
                }

                return obj;
            }

            //  $scope.batal = function() {
            //     $scope.showAlert();
            //  }
            // $("#confirmBtn").on("click", function () {
            //     window.myconfirm("Anda Yakin akan membatalkan pasien?").then(function () {
            //       window.myalert("Operation done!");
            //     }, function () {
            //       window.myalert("You chose to Cancel action.");
            //     });
            // });
            // function myconfirm(content){
            //     return $("<div></div>").kendoConfirm({
            //       title: "My Title",
            //       content: content
            //     }).data("kendoConfirm").open().result;
            // }
             $scope.batalPanggil = function() {
                if ($scope.item.statusAntrian !== "SELESAI_DIPERIKSA") {
                  
                    if ($scope.item !== undefined && $scope.item.pasienDaftar !== undefined) {  
      
                        var dataJson = {
                        "norec_apd": $scope.item.noRec
                        // "idRuangan": $scope.item.ruangan.id
                         }
                         manageSarprasPhp.pasienBatalPanggil(dataJson)
                        .then(function(e) {
                           $scope.findData();

                        });
                    } else {
                        window.messageContainer.error('Pasien belum di pilih');
                    }
                    } else {
                    messageContainer.error('Pasien sudah selesai diperiksa')
                }
                }
               
            $scope.UbahDokter = function() {
                if ( $scope.dataPasienSelected == undefined){
                    alert("Pilih Pasien Dahulu!!!")
                    return;
                }else{
                    $scope.item.pilihDokter = {id:$scope.dataPasienSelected.objectpegawaifk,namalengkap:$scope.dataPasienSelected.namadokter}
                    $scope.winDialogss.center().open();
                }
            }
            $scope.simpanDokter = function() {
                  // 
                // var listRawRequired = [
                //     "items.pilihDokter|k-ng-model|Dokter"
                // ];
                // var isValid = ModelItem.setValidation($scope, listRawRequired);

                // if(isValid.status){
                    // munculkan nama dokter di grid
                   // items.pilihDokter = data.data.dokter.namalengkap;

                    // save dokter yang dipilih
                    var tmpData = {
                        norec_apd: $scope.dataPasienSelected.norec_apd,
                        // iddokter: dataPasienSelected.pilihDokter.id
                        iddokter: $scope.item.pilihDokter.id
                    }
                    manageSarprasPhp.updateDokters(tmpData).then(function(e){
                        // update status antrian
                        $scope.winDialogss.close();
                        loadData();
                        // $scope.findData(); 
                        $scope.item.pilihDokter='';
                       
                    });
                // } else {
                //     ModelItem.showMessages(isValid.messages);
                // }
            }
        

            $scope.batalPeriksa = function() {
                if ($scope.item.statusAntrian === "MENUNGGU") {
                    if ($scope.item !== undefined && $scope.item.pasienDaftar !== undefined) {
                        
                        findPasien.getListData('service/list-generic/?view=Pembatal&select=*').then(function(e){
                            $scope.listPembatalan = e.data;
                        })
                        $scope.listRuangan = [];
                        $scope.listRuangan.push($scope.item.ruangan);
                        $scope.items.ruangan = $scope.listRuangan[0];
                        // $scope.item.pasienDaftar.tglRegistrasi = dateHelper.formatDate($scope.item.pasienDaftar.tglRegistrasi, 'DD-MM-YYYY');
                        $scope.winDialog.center().open();
                    } else {
                        window.messageContainer.error('Pasien belum di pilih');
                    }
                } else {
                    messageContainer.error('Pasien sudah diperiksa')
                }
            }
            $scope.lanjutBatal = function(data, batal) {
                 var listRawRequired = [
                    "items.pembatalan|k-ng-model|Pembatalan",
                    "items.alasanBatal|ng-model|Alasan pembatalan"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);

                if(isValid.status){
                    
                    var pegawai = JSON.parse(window.localStorage.getItem('pegawai'));
                    var tmpData = {  
                        "tanggalPembatalan":dateHelper.formatDate(new Date(), 'YYYY-MM-DD'),
                        "alasanPembatalan":batal.alasanBatal,
                        "pasienDaftar":{  
                            "noRec": data.pasienDaftar.noRec
                        },
                        "pegawai":{  
                            "id": pegawai.id
                        },
                        "pembatalan":{  
                            "id":batal.pembatalan.id
                        }
                    }
                    var grid = $("#grid").data('kendoGrid');
                    grid._data.forEach(function(items){
                        if (items.noRec === data.noRec){
                            // delete selected grid row 
                            grid.dataSource.remove(items);
                            grid.dataSource.sync();
                        }
                    })
                    // console.log(JSON.stringify(tmpData));
                    managePasien.batalPeriksa(tmpData).then(function(e){
                        $scope.items = {};
                        $scope.winDialog.close();
                    })
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
                // var raw = $scope.patienGrids.data();
                // raw.forEach(function(item){
                //     if (item.pasien.id === id){
                //         raw.remove(item);
                //         $scope.item = {};
                //         $scope.winDialog.close();
                //         //TODO call remote service to delete item....
                //     }
                // })
            }
            $scope.CetakSumList = function() {
                if($scope.item != undefined){
                    // var fixUrlLaporan = cetakHelper.open("reporting/lapResume?noCm=" + $scope.item.pasien.noCm + "&tglRegistrasi=" + new moment($scope.item.pasienDaftar.tglRegistrasi).format('DD-MM-YYYY'));
                    // window.open(fixUrlLaporan, '', 'width=800,height=600')

                    //cetakan langsung service VB6 by grh    
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-summarylist=1&norec=' + $scope.item.pasien.noCm + '&view=false', function(response) {
                        // do something with response
                    });


                }
            }
            $scope.cetakBuktiLayanan = function() {
                if($scope.item != undefined){
                    
                    // var fixUrlLaporan = cetakHelper.open("reporting/lapBuktiPelayanan?noRegistrasi=" + $scope.item.pasienDaftar.noRegistrasi);
                    // window.open(fixUrlLaporan, '', 'width=800,height=600')
                    //cetakan langsung service VB6 by grh
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-buktilayanan=1&norec=' + $scope.item.pasienDaftar.noRegistrasi + '&strIdPegawai=' + $scope.pegawai.id + '&view=false', function(response) {
                       
                    });

                }
            }
            $scope.cetakGelang = function() {
                if($scope.item != undefined){
                    var fixUrlLaporan = cetakHelper.open("registrasi-pelayanan/gelangPasien?id=" + $scope.item.pasien.id);
                    window.open(fixUrlLaporan, '', 'width=800,height=600')
                }
            }
            $scope.cetakHelper = function() {
                if($scope.item != undefined){
                    // var fixUrlLaporan = cetakHelper.open("reporting/lapTracer?noRegistrasi=" + $scope.item.pasienDaftar.noRegistrasi);
                    // window.open(fixUrlLaporan, '', 'width=800,height=600')
                    
                    //cetakan langsung service VB6 by grh    
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-tracer=1&norec=' + $scope.item.pasienDaftar.noRegistrasi + '&view=false', function(response) {
                        // do something with response
                    });            


                }
            }
            $scope.formatNum = {
                format: "#.#",
                decimals: 0
            }
            $scope.cetakLabel = function() {
                // if($scope.item != undefined){
                //     var fixUrlLaporan = cetakHelper.open("reporting/labelPasien?noCm=" + $scope.item.pasien.noCm);
                //     window.open(fixUrlLaporan, '', 'width=800,height=600')
                // }
                $scope.dats = {
                    qty: 0
                }
                $scope.dialogCetakLabel.center().open();
            }
            $scope.pilihQty = function(data) {
                var listRawRequired = [
                    "dats.qty|k-ng-model|kuantiti"
                ];
                var isValid = ModelItem.setValidation($scope, listRawRequired);

                if(isValid.status){
                    var qty = data.qty;
                    if(qty !== undefined){
                        // var fixUrlLaporan = cetakHelper.open("reporting/labelPasien?noCm=" + $scope.item.pasienDaftar.noRegistrasi + "&qty=" + qty);
                        // window.open(fixUrlLaporan, '', 'width=800,height=600')
                        //cetakan langsung service VB6 by grh
                        var client = new HttpClient();
                        client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-labelpasien=1&norec=' + $scope.item.pasienDaftar.noRegistrasi + '&view=false&qty=' + qty, function(response) {
                            // do something with response
                        });

                    }
                    $scope.dialogCetakLabel.close();
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            };
            $scope.cetakNoAntrian = function() {
                if($scope.item != undefined){
                    
                    // var fixUrlLaporan = cetakHelper.open("registrasi-pelayanan/antrianPasienDiperiksa?noRec=" + $scope.item.noRec);
                    // window.open(fixUrlLaporan, '', 'width=800,height=600')
                    //cetakan langsung service VB 6 by grh   
                    var client = new HttpClient();
                                
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-buktipendaftaran=1&norec=' + $scope.item.pasienDaftar.noRegistrasi + '&view=false', function(response) {
                        // do something with response
                    });


                }
            }
            $scope.cetakKartu = function() {
                if($scope.item != undefined){
                    // var fixUrlLaporan = cetakHelper.open("registrasi-pelayanan/kartuPasien?id=" + $scope.item.pasien.id);
                    // window.open(fixUrlLaporan, '', 'width=800,height=600')
                
                    //cetakan langsung service VB 6 by grh   
                    var client = new HttpClient();
                                
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-kartupasien=1&norec=' + $scope.item.pasien.id + '&view=false', function(response) {
                        // do something with response
                    });


                }
            }
            // $scope.sourceJenisDiagnosisPrimer = [{
            //     "statusEnabled": true,
            //     "namaExternal": "Diagnosa Awal",
            //     "kdProfile": 0,
            //     "qJenisDiagnosa": 5,
            //     "reportDisplay": "Diagnosa Pasca Bedah",
            //     "jenisDiagnosa": "Diagnosa Awal",
            //     "id": 5,
            //     "kodeExternal": "05",
            //     "kdJenisDiagnosa": 5,
            //     "noRec": "5                               "
            // }]
            $scope.openCetakRmk = function(){
                if($scope.item != undefined){
                    findPasien.getDiagnosaNyNoRec($scope.item.noRec).then(function(e){
                        if (e.data.data.DiagnosaPasien.length > 0) {
                            $scope.cetakBro();
                        } else {
                            $scope.item.jenisDiagnosis = $scope.sourceJenisDiagnosisPrimer[4];
                            ModelItem.getDataDummyGeneric("Diagnosa", true, true, 10).then(function(data) {
                                $scope.sourceDiagnosisPrimer = data;
                            });
                            $scope.icd10.center().open();
                        }
                    })
                    // $scope.item.jenisDiagnosis = $scope.sourceJenisDiagnosisPrimer[0];
                    // ModelItem.getDataDummyGeneric("Diagnosa", true, true, 10).then(function(data) {
                    //     $scope.sourceDiagnosisPrimer = data;
                    // });
                    // $scope.icd10.center().open();
                }
            }
            $scope.cetakRMK = function() {
                var listRawRequired = [
                    "item.diagnosisPrimer|k-ng-model|Diagnosa awal"
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);

                if(isValid.status){
                    if($scope.item != undefined){
                        var saveData = {
                            pasien: {
                                id: $scope.item.pasien.id
                            },
                            tanggalPendaftaran: $scope.item.pasienDaftar.tglRegistrasi,
                            diagnosis: [{
                                diagnosa: {
                                    id: $scope.item.diagnosisPrimer.id
                                },
                                jenisDiagnosa: $scope.item.jenisDiagnosis,
                                keterangan: $scope.item.keteranganDiagnosis
                            }],
                            noRecPasienDaftar: $scope.item.noRec
                        }
                        // console.log(JSON.stringify(saveData));
                        managePasien.saveDiagnosaRmk(saveData).then(function(e){
                            $scope.icd10.close();
                            $scope.cetakBro();
                            // var fixUrlLaporan = cetakHelper.open("reporting/lapRingkasanKeluarMasuk?noRegistrasi=" + $scope.item.pasien.pasienDaftar.noRegistrasi);
                            // window.open(fixUrlLaporan, '', 'width=800,height=600')

                            // var client = new HttpClient();
                            // client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-lembarmasukkeluar-byNorec=1&norec=' + $scope.item.noRec + '&view=false', function(response) {
                            //         // do something with response
                            // });

                            // var client = new HttpClient();
                            // client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-lembarmasukkeluar=1&norec=' + $scope.item.pasienDaftar.noRegistrasi + '&view=false', function(response) {
                            //     // do something with response
                            // }); 
                        })
                    }
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
                
            }
            $scope.cetakBro = function(){
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-lembarmasukkeluar-byNorec=1&norec=' + $scope.item.noRec + '&view=false', function(response) {
                        // do something with response
                });
            }
            // //*cetak SEP
            // $scope.CetakSEP = function() {
            //     if($scope.item != undefined){
            //         var fixUrlLaporan = cetakHelper.open("asuransi/asuransiBPJS?noSep=" + $scope.model.noSep);
            //         window.open(fixUrlLaporan, '_blank')
            //     }
            // }

            $scope.inputTindakan = function(){
                if ($scope.item){
                    $state.go('dashboardpasien.InputBilling',{
                        noAntrianPasien: $scope.item.noRec,
                        noRegister: $scope.item.pasienDaftar.noRec,
                        noRec: $scope.item.noRec   
                    });
                } else {
                    messageContainer.error('Pasien belum di pilih')
                }
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

            $scope.cetakSEP = function() {
                if($scope.item != undefined && $scope.item.kelompokPasien !== "Umum/Pribadi"){
                    // var noSep = e.data.data === null ? "2423432" : e.data.data;
                    // var fixUrlLaporan = cetakHelper.open("asuransi/asuransiBPJS?noSep=" + $scope.model.noSep);
                    // window.open(fixUrlLaporan, '', 'width=800,height=600')

                    //http://127.0.0.1:1237/printvb/Pendaftaran?cetak-sep=1&norec=1708000087&view=true   
                    //cetakan langsung service VB6 by grh    
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?cetak-sep=1&norec=' + $scope.item.pasienDaftar.noRegistrasi + '&view=false', function(response) {
                        // do something with response
                    });
                }
            }

            // edit data registrasi pasien
            $scope.cekStatusBeforeEdit = function(statusAntrian){
                var obj = {
                    "msg": "",
                    "status": true
                }
                
                switch (statusAntrian) {
                    case "DIPANGGIL_DOKTER":
                        obj.msg = "Pasien sudah di panggil dokter";
                        obj.status = false;
                        break;
                    case "DIPANGGIL_SUSTER":
                        obj.msg = "Pasien sudah di panggil dokter";
                        obj.status = false;
                        break;
                    case "MENUNGGU":
                        obj.status = true;
                        break;
                }
                return obj;
            }
            $scope.editRegistrasi = function(){
                // var objValid = $scope.cekStatusBeforeEdit($scope.item.statusAntrian);
                // if (objValid.status) {
                    $state.go('editRegistrasiPelayanan', {
                        noCm: $scope.item.pasien.noCm,
                        noRec: $scope.item.pasienDaftar.noRec
                    });
                // } else {
                //     window.messageContainer.error(objValid.msg);
                // }
            }
            $scope.formatJam24 = {
                value: new Date(),			//set default value
                format: "dd-MM-yyyy HH:mm",	//set date format
                timeFormat: "HH:mm",		//set drop down time format to 24 hours
            }
            $scope.toogleKlikDiagnosa = function(){
                $scope.klikDiagnosa = !$scope.klikDiagnosa;
            }
            $scope.findDiagnosaPasien = function(){
                $scope.currentNorec = $scope.item.noRec;
                findPasien.getDiagnosaNyNoRec($scope.currentNorec).then(function(data) {
                    if (data.data.data.DiagnosaPasien === undefined) return;
                    if (data.data.data.DiagnosaPasien.length === 0) return;
                    $scope.listDiagnosa = ModelItem.beforePost(data.data.data.DiagnosaPasien[data.data.data.DiagnosaPasien.length - 1].diagnosis, true);
                    // $scope.item.noRec = data.data.data.DiagnosaPasien[0].noRec;
                    var temp = [];
                    var i = 1;
                    for (var key in $scope.listDiagnosa) {
                        if ($scope.listDiagnosa.hasOwnProperty(key)) {
                            var element = $scope.listDiagnosa[key];
                            temp.push({
                                jenisDiagnosis: element.jenisDiagnosa,
                                kdDiagnosa: element.diagnosa.kdDiagnosa,
                                namaDiagnosa: element.diagnosa.namaDiagnosa,
                                id: element.diagnosa.id,
                                // no: i
                            });
                            i++;
                        }
                    }
                    $scope.dataDiagnosisPrimer = new kendo.data.DataSource({
                        data: temp,
                        change: function(e) {
                            var row = 0;
                            e.items.forEach(function(data){
                                data.rowNumber = ++row;
                            })
                        }
                    });
                });
            }
            $scope.inputDiagnosa = function(){
                if($scope.item != undefined){
                    $scope.item.pasienDaftar.tglRegistrasi = new Date($scope.item.pasienDaftar.tglRegistrasi);
                    $scope.findDiagnosaPasien();
                    $scope.isLoadingDiagnosis = false;
                    $scope.findBy = 0;
                    $scope.toogleKlikDiagnosa();
                    // $scope.item.jenisDiagnosis = $scope.sourceJenisDiagnosisPrimer[0];
                    // ModelItem.getDataDummyGeneric("Diagnosa", true, true, 10).then(function(data) {
                    //     $scope.sourceDiagnosisPrimer = data;
                    // });
                    // $scope.WinInputDiagnosa.center().open();
                }
            }
            $scope.removeDiagnosa = function(e) {
                e.preventDefault();
                var grid = this;
                var row = $(e.currentTarget).closest("tr");

                var selectedItem = grid.dataItem(row);

                $scope.dataDiagnosisPrimer.remove(selectedItem);
            }
            $scope.klikInputData = function(){
                $scope.inputDataDiagnosis = !$scope.inputDataDiagnosis;
            }
            $scope.gridDiagnosa = {
                columns: [{
                    "field": "rowNumber", title: "#", "width": 40
                }, {
                    "field": "jenisDiagnosis.jenisDiagnosa",
                    "title": "Jenis Diagnosis",
                    "width": 150
                }, {
                    "field": "kdDiagnosa",
                    "title": "Kode Diagnosa",
                    "width": 150
                }, {
                    "field": "namaDiagnosa",
                    "title": "Nama Diagnosa"
                }, {
                    "field": "ketDiagnosis",
                    "title": "Keterangan",
                    "width": 150
                }, {
                    command: {
                        text: "Hapus",
                        click: $scope.removeDiagnosa
                    },
                    title: "&nbsp;",
                    width: "100px"
                }]
            }
            $scope.gridDiagnosaBaru = {
                columns: [{
                    "field": "rowNumber", title: "#", "width": 40
                }, {
                    "field": "jenisDiagnosis.jenisDiagnosa",
                    "title": "Jenis Diagnosis",
                    "width": 150
                }, {
                    "field": "diagnosisPrimer.kdDiagnosa",
                    "title": "Kode Diagnosa",
                    "width": 150
                }, {
                    "field": "diagnosisPrimer.namaDiagnosa",
                    "title": "Nama Diagnosa"
                }, {
                    "field": "ketDiagnosis",
                    "title": "Keterangan",
                    "width": 150
                }, {
                    command: {
                        text: "Hapus",
                        click: $scope.removeDiagnosa
                    },
                    title: "&nbsp;",
                    width: "100px"
                }]
            }
            $scope.listInputDiagnosis = new kendo.data.DataSource({
                data: [],
                change: function(e) {
                    var row = e.index;
                    e.items.forEach(function(data){
                        data.rowNumber = ++row;
                    })
                }
            });
            $scope.addDataDiagnosisPrimer = function(){
                var listRawRequired = [
                    "item.jenisDiagnosis|k-ng-model|Jenis Diagnosa",
                    "item.diagnosisPrimer|k-ng-model|Diagnosa",
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if(isValid.status){
                    $scope.listInputDiagnosis.add({
                        "jenisDiagnosis" : $scope.item.jenisDiagnosis,
                        "diagnosisPrimer" : $scope.item.diagnosisPrimer,
                        "ketDiagnosis" : $scope.item.keteranganDiagnosis
                    });
                    delete $scope.item.jenisDiagnosis;
                    delete $scope.item.diagnosisPrimer;
                    delete $scope.item.keteranganDiagnosis;
                } else {
                    ModelItem.showMessages(isValid.messages);
                }
            }
            $scope.simpanDiagnosa = function(){
                if($scope.item != undefined){
                    if ($scope.listInputDiagnosis._data.length >0){
                        var dataDiagnosis = [];
                        $scope.listInputDiagnosis._data.forEach(function(elemen){
                            dataDiagnosis.push({
                                diagnosa: {
                                    id: elemen.diagnosisPrimer.id
                                },
                                jenisDiagnosa: elemen.jenisDiagnosis,
                                keterangan: elemen.ketDiagnosis
                            })
                        });
                        var saveData = {
                            pasien: {
                                id: $scope.item.pasien.id
                            },
                            tanggalPendaftaran: $scope.item.pasienDaftar.tglRegistrasi,
                            // diagnosis: [{
                            //     diagnosa: {
                            //         id: $scope.item.diagnosisPrimer.id
                            //     },
                            //     jenisDiagnosa: $scope.item.jenisDiagnosis
                            // }],
                            diagnosis: dataDiagnosis,
                            noRecPasienDaftar: $scope.item.noRec
                        }
                        // console.log(JSON.stringify(saveData));
                        managePasien.saveDiagnosaRmk(saveData).then(function(e){
                            // $scope.WinInputDiagnosa.close();
                            $scope.findDiagnosaPasien();
                            $scope.klikInputData();
                        }, function(error){
                            console.log(JSON.stringify(error))
                        })
                    } else {
                        messageContainer.error('Data diagnosis belum ada');
                        return;
                    }
                } else {
                    messageContainer.error('Data belum dipilih');
                    return;
                }
            }
            $scope.updateKelasPelayanan = function(){
                if ($scope.item) {
                    $state.go('editKelasPelayanan', {
                        noCm: $scope.item.pasien.noCm,
                        noRec: $scope.item.pasienDaftar.noRec
                    });
                }
            }

            $scope.Detail = function(){
                if($scope.dataPasienSelected.noregistrasi != undefined){
                    var obj = {
                        noRegistrasi : $scope.dataPasienSelected.noregistrasi
                    }

                    $state.go('RincianTagihanTataRekening', {
                        dataPasien: JSON.stringify(obj)
                    });
                }else{
                    toastr.error('Data belum dipilih','Info');
                }

            }

            $scope.TransaksiLayanan = function(){
                // debugger;
                if ($scope.dataPasienSelected.norec_apd == null) {
                    toastr.error('Pilih Pasien dulu','Info');
                    return
                }else{
                     $state.go('DashboardPasien', {
                        noregistrasi: $scope.dataPasienSelected.noregistrasi,
                        norec_pd: $scope.dataPasienSelected.norec_pd,
                        norec_apd: $scope.dataPasienSelected.norec_apd,
                        umur: $scope.dataPasienSelected.umurzz,
                        idpegawai: $scope.pegawai.id
                    });
                }
            }

            $scope.OrderGizi =function(){
                  $state.go('OrderMenuGiziRev');
            }

            $scope.skriningGizi = function() {
                // debugger
                var cookie = document.cookie.split(';');
                var statusCode = ModelItem.getStatusUser();
                var objValid = $scope.cekStatusBeforePemeriksaan(statusCode, $scope.item.statusAntrian);
                if (objValid.status) {
                    saveToWindow.setItemToWindowChace("isRawatInap", false);
                    cookie = cookie[0].split('=');
                    if ($scope.item.isKajianAwal || cookie[1] === 'suster') {
                        $state.go('dashboardpasien.pengkajianLanjutan', {
                            noCM: $scope.item.pasien.noCm,
                            tanggal: moment(new Date($scope.item.pasienDaftar.tglRegistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                            noRec: $scope.item.noRec,
                            ruangana: $scope.item.ruangan.id
                        });
                    } else {
                        $state.go('dashboardpasien.pengkajianLanjutan', {
                            noCM: $scope.dataPasienSelected.nocm,
                            tanggal: moment(new Date($scope.dataPasienSelected.tglregistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                            noRec: $scope.dataPasienSelected.norec_pd,
                            ruangana:$scope.dataPasienSelected.objectruanganfk
                        });
                    }
                } else {
                    window.messageContainer.error(objValid.msg);
                }
            }
            $scope.pengkajianMedis = function() {
                if ($scope.dataPasienSelected == undefined){
                    toastr.error('Pilih Data dulu')
                    return
                }
                var cookie = document.cookie.split(';');
                var statusCode = ModelItem.getStatusUser();
                var objValid = $scope.cekStatusBeforePemeriksaan(statusCode, $scope.item.statusAntrian);
                if (objValid.status) {
                    saveToWindow.setItemToWindowChace("isRawatInap", false);
                    cookie = cookie[0].split('=');
                    if ($scope.item.isKajianAwal || cookie[1] === 'suster') {
                        $state.go('dashboardpasien.PengkajianMedis', {
                            noCM: $scope.dataPasienSelected.nocm,
                            tanggal: moment(new Date($scope.dataPasienSelected.tglregistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                            noRec: $scope.dataPasienSelected.norec_pd,
                            ruangana:$scope.dataPasienSelected.objectruanganfk
                        });
                    } else {
                        $state.go('dashboardpasien.PengkajianMedis', {
                            noCM: $scope.dataPasienSelected.nocm,
                            tanggal: moment(new Date($scope.dataPasienSelected.tglregistrasi)).format('YYYY-MM-DD HH:mm:ss'),
                            noRec: $scope.dataPasienSelected.norec_pd,
                            ruangana:$scope.dataPasienSelected.objectruanganfk
                        });
                    }
                } else {
                    window.messageContainer.error(objValid.msg);
                }
            }
              // **** Kejadian pasien jatuh
              $scope.dialog ={
                tglJatuh :   $scope.now 
            }
            $scope.pasienJatuh = function(){
                if(!$scope.dataPasienSelected.norec_pd){
                    toastr.error('Pilih data dulu')
                    return
                }
                $scope.dialog.nocm = $scope.dataPasienSelected.nocm
                $scope.dialog.namapasien = $scope.dataPasienSelected.namapasien
                $scope.dialog.norec_pd = $scope.dataPasienSelected.norec_pd
                $scope.dialog.nocm = $scope.dataPasienSelected.nocm
              
                $scope.dialogPasienJatuh.center().open()
            }
            $scope.simpanJatuh = function(data){
                var objsave = {
                    "norec" :  "",
                    "statusenabled" : true,
                    "nocm" :    $scope.dialog.nocm,
                    "noregistrasifk" :    $scope.dialog.norec_pd,
                    "jumlah" :    $scope.dialog.jumlah != undefined?   $scope.dialog.jumlah: 0 ,
                    "tgljatuh" :  moment(data.tglJatuh).format('YYYY-MM-DD HH:mm'),
                    "keterangan" :  data.keterangan != undefined?data.keterangan : '-',
                }
                manageSarprasPhp.saveDataTransaksi('rensar/save-pasien-jatuh',objsave ).then(function(e){
                    $scope.dialog ={}
                })
            }
            $scope.panggil = function(){
                if ($scope.dataPasienSelected == undefined){
                    toastr.error('Pilih Data dulu')
                    return
                }
                var cookie = document.cookie.split(';');
                cookie = cookie[0].split('=');
                var data ={
                    "norec_apd" : $scope.dataPasienSelected.norec_apd,
                    "kelompokUser" : cookie[1]
                }
                manageSarprasPhp.saveDataTransaksi('dokter/save-panggil',data)
                .then(function (res) {
                })
            }
        }

    ]);
});