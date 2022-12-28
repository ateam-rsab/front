define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('DashboardPasienCtrlNew', ['$q', '$rootScope', '$scope', '$mdDialog', 'ModelItem', '$state', 'CacheHelper', 'DateHelper', 'FindPasien', 'ManagePasien', 'ManageServicePhp', 'ManageSarprasPhp','ModelItemAkuntansi','$parse','ManageLogistikPhp',
        function($q, $rootScope, $scope,  $mdDialog, ModelItem, $state, cacheHelper, dateHelper, FindPasien, ManagePasien, manageServicePhp, manageSarprasPhp,modelItemAkuntansi, $parse, manageLogistikPhp) {
        $rootScope.listActive = {};
        $scope.item = {};
        $scope.itemDiagnosa={};
        $scope.model = {};
        $scope.itemObat={};
        $scope.itemLab={};
        $scope.itemRad={};
        $scope.data = {};
        var responData='';
        var nocmfk='';    
        var keterangan1='';
        var status='';
        var alergi="";
        var umur="";
        var norec_apd = ''
        var norec_pd = ''
        var nocm_str=''
        var detail = ''
        var noregistrasi=''
        var ruanganfk=''
        var kelasid=''
        var idpegawai=''
        var nocm_str = '';
        var dataProdukDetail=[];
        var noTerima ='';
        var data2 = [];
        var detail = ''
        var hrg1 = 0
        var hrgsdk = 0
        var diffDays=1
        var namaRuangan = ''
        var namaRuanganFk = ''
        var noreg = ''
        $scope.now = new Date();
        $scope.item.tglPelayanan = $scope.now;
        $scope.isNext=true;
        $scope.isKembali=false;
        $scope.isBatal=true;
        $scope.isDokter=true;
        $scope.PegawaiLogin2 ={};
        $scope.currentNorec_pd = $state.params.norec_pd;
        $scope.currentNorec_apd = $state.params.norec_apd;
        norec_apd = $state.params.norec_apd;
        norec_pd = $state.params.norec_pd;
        noreg = $state.params.noregistrasi;
        $scope.findBy = "1"
        umur = $state.params.umur;
        idpegawai = $state.params.idpegawai;
        $scope.disabled=true;
        $scope.now = new Date();
        $scope.itemObat.rke =1;
        $scope.itemObat.tglresep = $scope.now;
        $scope.itemObat.tglresepAkhir = $scope.now;
        $scope.itemObat.nilaiKonversi = 0
        $scope.itemObat.jumlah =1
        $scope.itemObat.totalSubTotal = 0
        $scope.itemObat.stok = 0
        $scope.itemObat.hargaSatuan = 0
        $scope.itemObat.total = 0
        $scope.itemObat.qty = 1
        $scope.item.qty = 1
        $scope.riwayatForm = false
        $scope.inputOrder = true
        $scope.CmdOrderPelayanan= true;
        $scope.OrderPelayanan = false;
        var detail = ''
        var date1 = new Date($scope.itemObat.tglresep);
        var date2 = new Date($scope.itemObat.tglresepAkhir);
        diffDays = date2.getDate() - date1.getDate(); 
        diffDays =  diffDays + 1
        $scope.kAngka=diffDays    
        firstLoad();         
        loadPertama();
        init();
        initLab();
        initRad();
        $scope.isRouteLoading = false;

        function firstLoad(){
            $scope.isRouteLoading = true;
            manageServicePhp.getDataTableTransaksi("operator/get-data-header-pasiennew?norec="
              +$scope.currentNorec_apd
            ).then(function (e) {
                   var datas = e.data[0]; 
                   $scope.item.noregistrasi=datas.noregistrasi;
                   $scope.item.nocm=datas.nocm;
                   $scope.item.namapasien=datas.namapasien;
                   $scope.item.tglregistrasi=datas.tglregistrasi;
                   $scope.item.jeniskelamin=datas.jeniskelamin;
                   $scope.item.alamatlengkap=datas.alamatlengkap;
                   $scope.item.tgllahir=datas.tgllahir;
                   $scope.item.Umur=umur;
                   $scope.item.namaruangan=datas.namaruangan;
                   $scope.item.notelepon=datas.notelepon;
                   $scope.item.jenispelayanan= datas.jenispelayanan;
                   $scope.item.tipePasien= datas.kelompokpasien;
                   ruanganfk=datas.objectruanganlastfk;
                   kelasid=datas.objectkelasfk;
                   $scope.isRouteLoading = false;                     
            });
        }

        $rootScope.showMenuPengkajianLanjutan = true;    
        $scope.nav = function(state) {
            $scope.activeMenuPengkajianLanjutan = state;
            localStorage.setItem('activeMenuPengkajianLanjutan', state);
            // $state.go(state, $state.params);
        }

        $scope.showDiagnosis = function(){

            if ($scope.showDiagnosa == undefined){
                $scope.showDiagnosa = true;
            }else if($scope.showDiagnosa == false){
                $scope.showDiagnosa = true;
            }else if($scope.showDiagnosa == true){
                $scope.showDiagnosa = false;
            }else{
                $scope.showDiagnosa = false;
            }

            $scope.pelayanan=false;
            $scope.inputObatOrder=false;
            $scope.Obatshow=false;
            $scope.inputLab = false;
            $scope.OrderLab = false;
            $scope.OrderRad = false;
            $scope.inputRad = false;
        }

        $scope.ShowPelayanan=function(){
            if ($scope.pelayanan == undefined){
                $scope.pelayanan = true;
            }else if($scope.pelayanan == false){
                $scope.pelayanan = true;
            }else if($scope.pelayanan == true){
                $scope.pelayanan = false;
            }else{
                $scope.pelayanan = false;
            }

            $scope.showDiagnosa = false
            $scope.inputObatOrder=false;
            $scope.Obatshow=false;
            $scope.inputLab = false;
            $scope.OrderLab = false;
            $scope.OrderRad = false;
            $scope.inputRad = false;
        }

        $scope.showObat=function(){
            //debugger;
            if ($scope.inputObatOrder == undefined){
                $scope.inputObatOrder = true;
                $scope.Obatshow = true;
            }else if($scope.inputObatOrder == false){
                $scope.inputObatOrder = true;
                 $scope.Obatshow = true;
            }else if($scope.inputObatOrder == true){
                $scope.inputObatOrder = false;
                 $scope.Obatshow = false;
            }else{
                $scope.inputObatOrder = false;
                $scope.Obatshow = false;
            }
             $scope.pelayanan=false;
            $scope.showDiagnosa = false
            // $scope.inputObatOrder=false;
            // $scope.Obatshow=false;
            $scope.inputLab = false;
            $scope.OrderLab = false;
            $scope.OrderRad = false;
            $scope.inputRad = false;
        }

        $scope.ShowLab=function(){
            //debugger;
            if ($scope.inputLab == undefined){
                $scope.inputLab = true;
                $scope.OrderLab = true;
            }else if($scope.inputLab == false){
                $scope.inputLab = true;
                 $scope.OrderLab = true;
            }else if($scope.inputLab == true){
                $scope.inputLab = false;
                 $scope.OrderLab = false;
            }else{
                $scope.inputLab = false;
                $scope.OrderLab = false;
            }
            $scope.pelayanan=false;
            $scope.showDiagnosa = false
            $scope.inputObatOrder=false;
            $scope.Obatshow=false;
            // $scope.inputLab = false;
            // $scope.OrderLab = false;
            $scope.OrderRad = false;
            $scope.inputRad = false;
        }

        $scope.ShowRad=function(){
            //debugger;
            if ($scope.OrderRad == undefined){
                $scope.OrderRad = true;
                $scope.inputRad = true;
            }else if($scope.OrderRad == false){
                $scope.OrderRad = true;
                 $scope.inputRad = true;
            }else if($scope.OrderRad == true){
                $scope.OrderRad = false;
                 $scope.inputRad = false;
            }else{
                $scope.OrderRad = false;
                $scope.inputRad = false;
            }
            $scope.pelayanan=false;
            $scope.showDiagnosa = false
            $scope.inputObatOrder=false;
            $scope.Obatshow=false;
            $scope.inputLab = false;
            $scope.OrderLab = false;
            // $scope.OrderRad = false;
            // $scope.inputRad = false;
        }

        // * Start Input Diagnosa
            $scope.isLoadingDiagnosis = true;
            modelItemAkuntansi.getDataDummyPHP("pasien/get-combo-icd9", true, true, 10).then(function(data) {
                 $scope.listDiagnosaTindakan= data;
             });

              ModelItem.getDataDummyGeneric("JenisDiagnosa", true, true, 10).then(function (data) {
                $scope.listJenisDiagnosa = data;
            });
            ModelItem.getDataDummyGeneric("Diagnosa", true, true, 10).then(function(data) {
                $scope.listDiagnosa = data;
            });
            $scope.klikIcd9=function(dataIcd9Selected){
                $scope.itemDiagnosa.diagnosaTindakan = {
                    id: dataIcd9Selected.id,
                    namaDiagnosaTindakan: dataIcd9Selected.namadiagnosatindakan,
                    kdDiagnosaTindakan: dataIcd9Selected.kddiagnosatindakan
                }
                $scope.itemDiagnosa.ketTindakan=dataIcd9Selected.keterangantindakan
                $scope.findBy = "1";
            }
             $scope.klikIcd10=function(dataIcd10Selected){
                $scope.itemDiagnosa.jenisDiagnosis = { 
                    id: dataIcd10Selected.objectjenisdiagnosafk, 
                    jenisDiagnosa: dataIcd10Selected.jenisdiagnosa 
                }

                $scope.itemDiagnosa.diagnosa = {
                    id: dataIcd10Selected.id,
                    namaDiagnosa: dataIcd10Selected.namadiagnosa,
                    kdDiagnosa: dataIcd10Selected.kddiagnosa
                }
                $scope.itemDiagnosa.keterangan = dataIcd10Selected.keterangan
                $scope.findBy = "1";
            }
            loadDiagnosa();
            function loadDiagnosa() {
                $scope.isRouteLoading = true;
                var norReg = ""
                if ($scope.item.noregistrasi != undefined) {
                    norReg = "noReg=" + $scope.item.noregistrasi;
                }
                manageSarprasPhp.getDataTableTransaksi("pasien/get-diagnosapasienbynoregicd9?"
                    + $state.params.noregistrasi
                ).then(function (data) {
                    $scope.isRouteLoading = false;
                    var dataICD9 = data.data.datas;
                    $scope.dataSourceDiagnosaIcd9 = new kendo.data.DataSource({
                        data: dataICD9,
                        pageSize: 10
                    });
                });

                manageSarprasPhp.getDataTableTransaksi("pasien/get-diagnosapasienbynoreg?"
                    + $state.params.noregistrasi
                ).then(function (data) {
                    // $scope.isRouteLoading = false;
                    var dataICD10 = data.data.datas;
                    $scope.dataSourceDiagnosaIcd10 = new kendo.data.DataSource({
                        data: dataICD10,
                        pageSize: 10
                    });
                });
            }

            $scope.columnDiagnosaIcd9= [{
                "title": "No",
                "template": "{{dataSourceDiagnosaIcd9.indexOf(dataItem) + 1}}",
                "width": "30px"
            }, {
                "field": "kddiagnosatindakan",
                "title": "Kode ICD 9",
                "width": "100px"
            }, {
                "field": "namadiagnosatindakan",
                "title": "Nama ICD 9",
                "width": "300px"
            }, {
                "field": "keterangantindakan",
                "title": "Keterangan",
                "width": "200px"
            }, {
                "field": "namaruangan",
                "title": "Ruangan",
                "width": "200px"
            }];
            $scope.columnDiagnosaIcd10 = [{
                "title": "No",
                "template": "{{dataSourceDiagnosaIcd10.indexOf(dataItem) + 1}}",
                "width": "30px"
            }, {
                "field": "jenisdiagnosa",
                "title": "Jenis Diagnosa",
                "width": "150px"
                }, {
                "field": "kddiagnosa",
                "title": "Kode ICD 10",
                "width": "100px"
            }, {
                "field": "namadiagnosa",
                "title": "Nama ICD 10",
                "width": "300px"
            }, {
                "field": "keterangan",
                "title": "Keterangan",
                "width": "200px"
            }, {
                "field": "namaruangan",
                "title": "Ruangan",
                "width": "150px"
            }];
            $scope.batal=function(){
                delete $scope.itemDiagnosa.diagnosaTindakan;
                delete $scope.itemDiagnosa.ketTindakan;
                delete $scope.itemDiagnosa.jenisDiagnosis;
                delete $scope.itemDiagnosa.diagnosa;
                delete $scope.itemDiagnosa.keterangan;
            }

            function validasi(){
                var listRawRequired = [
                    "itemDiagnosa.diagnosaTindakan|k-ng-model|kode / Nama Diagnosa"
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    var norec_diagnosapasien = "";
                    if ($scope.dataIcd9Selected != undefined) {
                        norec_diagnosapasien = $scope.dataIcd9Selected.norec_diagnosapasien
                    }
                    var ketTindakans="";
                    if($scope.itemDiagnosa.ketTindakan!=undefined){
                        ketTindakans=$scope.itemDiagnosa.ketTindakan
                    }
                    var data = {
                        norec_dp: norec_diagnosapasien,
                        objectpasienfk:$scope.currentNorec_apd,
                        tglpendaftaran: $scope.item.tglregistrasi,
                        objectdiagnosatindakanfk: $scope.itemDiagnosa.diagnosaTindakan.id,
                        keterangantindakan:ketTindakans
                    }
                    
                    $scope.objSave =
                    {
                        detaildiagnosatindakanpasien: data,
                    }
                }else{
                    ModelItem.showMessages(isValid.messages)
                }
            } 
            
            $scope.saveIcd9 = function() {
                validasi();
                console.log(JSON.stringify($scope.objSave));
                manageSarprasPhp.postDataDiagnosaTIndakan($scope.objSave).then(function (e) {
                    delete $scope.itemDiagnosa.diagnosaTindakan;
                    delete $scope.itemDiagnosa.ketTindakan;
                    delete $scope.dataIcd9Selected;
                    loadDiagnosa()
                })
            }

            $scope.deleteIcd9 = function () {
                if ($scope.itemDiagnosa.diagnosaTindakan == undefined) {
                    alert("Pilih data yang mau di hapus!!")
                    return
                }
                var diagnosa = {
                    norec_dp: $scope.dataIcd9Selected.norec_diagnosapasien
                }
                var objDelete =
                    {
                        diagnosa: diagnosa,
                    }
                manageSarprasPhp.deleteDataDiagnosaTindakan(objDelete).then(function (e) {
                    delete $scope.itemDiagnosa.diagnosaTindakan;
                    delete $scope.itemDiagnosa.ketTindakan;
                    $scope.dataIcd9Selected = {};
                    loadDiagnosa()
                })
            }
            function validasiIcd10(){
                var listRawRequired = [
                    "itemDiagnosa.diagnosa|k-ng-model|kode / Nama Diagnosa",
                    "itemDiagnosa.jenisDiagnosis|k-ng-model|kode / Jenis Diagnosa"
                ]
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                if (isValid.status) {
                    var norec_diagnosapasien = "";
                    var tglinput = "";
                    if ($scope.dataIcd10Selected != undefined) {
                        norec_diagnosapasien = $scope.dataIcd10Selected.norec_diagnosapasien
                        tglinput = $scope.dataIcd10Selected.tglinputdiagnosa
                    }else{
                        tglinput = moment($scope.now).format('YYYY-MM-DD hh:mm:ss')
                    }
                    var keterangan ="";
                    if ($scope.itemDiagnosa.keterangan == undefined){
                        keterangan = "-"
                    }
                    else{
                        keterangan = $scope.itemDiagnosa.keterangan
                    }

                    $scope.now = new Date();
                    var data = {
                        norec_dp: norec_diagnosapasien,
                        noregistrasifk:$scope.currentNorec_apd,
                        tglregistrasi: moment($scope.item.tglregistrasi).format('YYYY-MM-DD hh:mm:ss'),
                        objectdiagnosafk: $scope.itemDiagnosa.diagnosa.id,
                        objectjenisdiagnosafk: $scope.itemDiagnosa.jenisDiagnosis.id,
                        tglinputdiagnosa: tglinput,
                        keterangan: keterangan
                    }
                    
                    $scope.objSave =
                    {
                        detaildiagnosapasien: data,
                    }
                }else{
                    ModelItem.showMessages(isValid.messages)
                }
            } 
             $scope.saveIcd10 = function() {
                validasiIcd10();
                console.log(JSON.stringify($scope.objSave));
                manageSarprasPhp.postDataDiagnosa($scope.objSave).then(function (e) {
                    delete $scope.itemDiagnosa.jenisDiagnosis;
                    delete $scope.itemDiagnosa.diagnosa;
                    delete $scope.itemDiagnosa.keterangan;
                    delete $scope.dataIcd10Selected;
                    loadDiagnosa()
                })
            }

            $scope.deleteIcd10 = function () {
                if ($scope.itemDiagnosa.diagnosa == undefined) {
                    alert("Pilih data yang mau di hapus!!")
                    return
                }
                var diagnosa = {
                    norec_dp: $scope.dataIcd10Selected.norec_diagnosapasien
                }
                var objDelete =
                    {
                        diagnosa: diagnosa,
                    }
                manageSarprasPhp.deleteDataDiagnosa(objDelete).then(function (e) {
                    delete $scope.itemDiagnosa.jenisDiagnosis;
                    delete $scope.itemDiagnosa.diagnosa;
                    delete $scope.itemDiagnosa.keterangan;
                    $scope.dataIcd10Selected = {};
                    loadDiagnosa()
                })
            }
        // * End Input Diagnosa

        // * Start Input Tindakan

        function loadPertama(){
            $scope.isRouteLoading=true;
            manageServicePhp.getDataTableTransaksi("registrasipasien/get-pasien-bynorec/"
            +$scope.currentNorecPD
            +"/"
            +$scope.currentNorecAPD)         
            .then(function (e) {
             $scope.isRouteLoading = false;
             $scope.item.pasien=e.data[0]; 
             manageServicePhp.getDataTableTransaksi("inputtindakan/get-tindakan?idRuangan="
              +ruanganfk
              +"&idKelas="
              +kelasid          
              )         
             .then(function (x) {
               $scope.listProduk=x.data.data;
             })

           });
        }

        $scope.getHargaTindakan = function () {
            $scope.item.hargaTindakan = $scope.item.namaProduk.hargasatuan;
            $scope.item.jumlah = 1;
            getKomponenHarga();
        }

        function getKomponenHarga(){
           if ($scope.item.namaProduk!=undefined){
                manageServicePhp.getDataTableTransaksi("inputtindakan/get-komponenharga?idRuangan=" 
                      + ruanganfk
                      + "&idKelas=" + kelasid
                      + "&idProduk=" + $scope.item.namaProduk.id
                      // + "&idJenisPelayanan=" + $scope.item.pasien.objectjenispelayananfk 
                     ).then(function(dat){
                $scope.listKomponen = dat.data.data;

                })          
            }
        }
                   

        manageServicePhp.getDataTableTransaksi("inputtindakan/get-combo").then(function (da) {
            
            $scope.listJenisPelaksana=da.data.jenispelaksana;
            $scope.item.jenisPelaksana={id:$scope.listJenisPelaksana[4].id,jenispetugaspe:$scope.listJenisPelaksana[4].jenispetugaspe}

        })


        function getPegawaiById(id, input, output){
        //debugger;
        var selectedData = $parse(output);
        selectedData.assign($scope, []);
        var model = $parse(input);
        manageServicePhp.getDataTableTransaksi("inputtindakan/get-pegawaibyjenispetugas?idJenisPetugas=" + id, true).then(function(dat){
          $scope.listPegawai = new kendo.data.DataSource({
            data: dat.data.jenispelaksana
          });
      
          $scope.pegawaiLogin = ModelItem.getPegawai();
          model.assign($scope, $scope.listPegawai);          
          $scope.selectedPegawai=[({id:$scope.pegawaiLogin.id,namalengkap:$scope.pegawaiLogin.namaLengkap})]       
        });
      }
     
        $scope.listYaTidak = [
          {
            "id": 1, "name":"Ya"
          },
          {
            "id": 0, "name":"Tidak"
          }
        ]
       $scope.dataPetugas = []; // data untus petugas Set
            $scope.dataSelectedRow = {};
            $scope.dataTindakan = new kendo.data.DataSource({
                autoSync: false,
                aggregate: [
                    { field: "subTotal", aggregate: "sum" }
                ],
                editable: true,
                schema: {
                    model: {
                        rowNumber: "id",
                        fields: {
                            rowNumber: { editable: false},
                            tglPelayanan: { editable: false, defaultValue: $scope.now},
                            produk: { validation: { 
                                productnamevalidation: function (input) {
                                if (input.is("[name='produk']") && input.val() === "") {                        
                                    return false;
                                }
                                return true;
                                }
                            } },
                            hargaSatuan: {type: "number", editable: false},
                            qty: { type: "number", validation: { 
                                productqtyvalidation: function (input) {
                                if (input.is("[name='qty']") && input.val() === "0") {                        
                                    return false;
                                }
                                return true;
                                }
                            } },
                            subTotal: {type: "number", editable: false}
                        }
                    }
                }});

                $scope.tambahTindakans= function () { 
                      if ($scope.item.namaProduk==undefined)
                      {
                        messageContainer.error("Tindakan harus di isi")
                        return
                      }
                       if ($scope.item.jumlah==0)
                      {
                        messageContainer.error("Jumlah tidak boleh nol")
                        return
                      }
                      
                      var nomor =0
                      if ($scope.dataTindakan == undefined) {
                              nomor = 1
                      }else{
                              nomor = data2.length+1
                      }
                      var data={};
                      data={
                                rowNumber:nomor,
                                tglPelayanan:$scope.item.tglPelayanan,
                                produk:$scope.item.namaProduk,//$scope.item.noRegistrasi,
                                qty:$scope.item.jumlah,
                                hargaSatuan:$scope.item.hargaTindakan,
                                subTotal: ($scope.item.hargaTindakan)*($scope.item.jumlah),
                                listKomponen:   $scope.listKomponen 
                      }
                      data2.push(data)
                      $scope.dataTindakan = new kendo.data.DataSource({
                            data: data2
                      });                            
                            if ($scope.item.jenisPelaksana && $scope.selectedPegawai){
                                var arrPegawai = $scope.selectedPegawai
                               for (var i =arrPegawai.length - 1; i >= 0; i--) {
                                  if( arrPegawai[i].objectjenispetugaspefk== undefined){
                                    var resultSlice=  arrPegawai.slice(1)
                                  }
                                }
                                var pushData = {
                                    "idParent":data.rowNumber,
                                    "jenisPetugas": {
                                        "id": $scope.item.jenisPelaksana.id,
                                        "jenisPelaksana": $scope.item.jenisPelaksana.jenispetugaspe
                                    },
                                    "listPetugas": resultSlice === undefined ?$scope.selectedPegawai:resultSlice
                                }
                                $scope.gridPetugasPelaksana.add(pushData);
                              
                            }
                            if ($scope.item.jenisPelaksana2 && $scope.selectedPegawai2){
                                var pushData = {
                                    "idParent": data.rowNumber,
                                    "jenisPetugas": {
                                        "id": $scope.item.jenisPelaksana2.id,
                                        "jenisPelaksana": $scope.item.jenisPelaksana2.jenispetugaspe
                                    },
                                    "listPetugas": $scope.selectedPegawai2
                                }
                                $scope.gridPetugasPelaksana.add(pushData);
                                $scope.showJenisPelaksana2 = false;
                                delete $scope.item.jenisPelaksana2;
                            }
                            if ($scope.item.jenisPelaksana3 && $scope.selectedPegawai3){
                                var pushData = {
                                    "idParent":data.rowNumber,
                                    "jenisPetugas": {
                                        "id": $scope.item.jenisPelaksana3.id,
                                        "jenisPelaksana": $scope.item.jenisPelaksana3.jenispetugaspe
                                    },
                                    "listPetugas": $scope.selectedPegawai3
                                }
                                $scope.gridPetugasPelaksana.add(pushData);
                                $scope.showJenisPelaksana3 = false;
                                delete $scope.item.jenisPelaksana3;
                            }
                            if ($scope.item.jenisPelaksana4 && $scope.selectedPegawai4){
                                var pushData = {
                                    "idParent": data.rowNumber,
                                    "jenisPetugas": {
                                        "id": $scope.item.jenisPelaksana4.id,
                                        "jenisPelaksana": $scope.item.jenisPelaksana4.jenispetugaspe
                                    },
                                    "listPetugas": $scope.selectedPegawai4
                                }
                                $scope.gridPetugasPelaksana.add(pushData);
                                $scope.showJenisPelaksana4 = false;
                                delete $scope.item.jenisPelaksana4;
                            }
                            if ($scope.item.jenisPelaksana5 && $scope.selectedPegawai5){
                                var pushData = {
                                    "idParent": data.rowNumber,
                                    "jenisPetugas": {
                                        "id": $scope.item.jenisPelaksana5.id,
                                        "jenisPelaksana": $scope.item.jenisPelaksana5.jenispetugaspe
                                    },
                                    "listPetugas": $scope.selectedPegawai5
                                }
                                $scope.gridPetugasPelaksana.add(pushData);
                                $scope.showJenisPelaksana5 = false;
                                delete $scope.item.jenisPelaksana5;
                            }
                            if ($scope.item.jenisPelaksana6 && $scope.selectedPegawai6){
                                var pushData = {
                                    "idParent":data.rowNumber,
                                    "jenisPetugas": {
                                        "id": $scope.item.jenisPelaksana6.id,
                                        "jenisPelaksana": $scope.item.jenisPelaksana6.jenispetugaspe
                                    },
                                    "listPetugas": $scope.selectedPegawai6
                                }
                                $scope.gridPetugasPelaksana.add(pushData);
                                $scope.showJenisPelaksana6 = false;
                                delete $scope.item.jenisPelaksana6;
                            }
                            if ($scope.item.jenisPelaksana7 && $scope.selectedPegawai7){
                                var pushData = {
                                    "idParent": data.rowNumber,
                                    "jenisPetugas": {
                                        "id": $scope.item.jenisPelaksana7.id,
                                        "jenisPelaksana": $scope.item.jenisPelaksana7.jenispetugaspe
                                    },
                                    "listPetugas": $scope.selectedPegawai7
                                }
                                $scope.gridPetugasPelaksana.add(pushData);
                                $scope.showJenisPelaksana7 = false;
                                delete $scope.item.jenisPelaksana7;
                            }
                            if ($scope.item.jenisPelaksana8 && $scope.selectedPegawai8){
                                var pushData = {
                                    "idParent": data.rowNumber,
                                    "jenisPetugas": {
                                        "id": $scope.item.jenisPelaksana8.id,
                                        "jenisPelaksana": $scope.item.jenisPelaksana8.jenispetugaspe
                                    },
                                    "listPetugas": $scope.selectedPegawai8
                                }
                                $scope.gridPetugasPelaksana.add(pushData);
                                $scope.showJenisPelaksana8 = false;
                                delete $scope.item.jenisPelaksana8;
                            }
                            if ($scope.item.jenisPelaksana9 && $scope.selectedPegawai9){
                                var pushData = {
                                    "idParent": data.rowNumber,
                                    "jenisPetugas": {
                                        "id": $scope.item.jenisPelaksana9.id,
                                        "jenisPelaksana": $scope.item.jenisPelaksana9.jenispetugaspe
                                    },
                                    "listPetugas": $scope.selectedPegawai9
                                }
                                $scope.gridPetugasPelaksana.add(pushData);
                                $scope.showJenisPelaksana9 = false;
                                delete $scope.item.jenisPelaksana9;
                            }
                            if ($scope.item.jenisPelaksana10 && $scope.selectedPegawai10){
                                var pushData = {
                                    "idParent":data.rowNumber,
                                    "jenisPetugas": {
                                        "id": $scope.item.jenisPelaksana10.id,
                                        "jenisPelaksana": $scope.item.jenisPelaksana10.jenispetugaspe
                                    },
                                    "listPetugas": $scope.selectedPegawai10
                                }
                                $scope.gridPetugasPelaksana.add(pushData);
                                $scope.showJenisPelaksana10 = false;
                                delete $scope.item.jenisPelaksana10;
                            }
                            console.log(JSON.stringify(data));
                            $scope.show = true;
                            kosongkan();

                       
                }
            $scope.gridPetugasPelaksana = new kendo.data.DataSource({
                data:[]
            })

            var onChange = function(e) {
                var grid = $(this).data("mainGridOptions");
            }
            $scope.mainGridOptions = {
                sortable: true,              
                autoSync: true,
                change:onChange,
                batch: true,
                selectable:'row',
                pageable: {
                    refresh: true,
                    pageSizes: true,
                    buttonCount: 5
                },
                columns: [
                    {
                        "field": "rowNumber", 
                        "title": "<h3 align=center>#</h3>", 
                        "width": 20
                    },
                    {
                        "field": "tglPelayanan",
                        "title": "<h3 align=center>Tanggal</h3>",
                        "template": "#= new moment(new Date(tglPelayanan)).format('DD-MM-YYYY') #",
                        "width": "60px"
                    },
                    {
                        "field": "tglPelayanan",
                        "title": "<h3 align=center>Jam</h3>",
                        "template": "#= new moment(new Date(tglPelayanan)).format('HH:mm') #",
                        "width": "40px"
                    },
                    {
                        "field": "produk.namaproduk",
                        "title": "<h3 align=center>Tindakan</h3>",
                        "width": "300px"
                    },
                    {
                        "field": "hargaSatuan",
                        "title": "<h3 align=center>Harga Netto</h3>",
                        "width": "150px",
                         "template": "{{formatRupiah('#: hargaSatuan #', 'Rp.')}}",          
                        "attributes": {align:"center"}
                    },
                    {
                        "field": "qty",
                        "title": "<h3 align=center>Qty</h3>",
                        "width": "70px",
                        "attributes": {align:"center"}
                    },
                    {
                        "field": "subTotal",
                        "title": "<h3 align=center>SubTotal</h3>",
                        "width": "150px",
                         "template": "{{formatRupiah('#: subTotal #', 'Rp.')}}",          
                        "attributes": {align:"center"}
                    },                     
                    {
                          command: { 
                              text: "Hapus",
                              width:"50px", 
                              align:"center",
                              attributes: {align:"center"},
                              click: removeRowTindakan
                              },
                              title: "",
                              width: "80px",
                    }
                ],
          
            };

            function removeRowTindakan(e){
                  e.preventDefault();
                var grid = this;
                var row = $(e.currentTarget).closest("tr");
                var tr = $(e.target).closest("tr");
                var dataItem = this.dataItem(tr); 
                $scope.tempDataTindakan = $scope.dataTindakan
                .filter(function(el){
                  return el.name !== grid[0].name;
                });
                grid.removeRow(row);
                var data ={};
                if (dataItem != undefined){
                    for (var i = data2.length - 1; i >= 0; i--) {
                        if (data2[i].rowNumber ==  dataItem.rowNumber){ 
                            data2.splice(i, 1);
                            for (var i = data2.length - 1; i >= 0; i--) {
                               
                                data2[i].rowNumber = i+1
                            }
                            $scope.dataTindakan = new kendo.data.DataSource({
                                data: data2
                            });
                        }
                    }
                }
                var gridPetugas=$scope.gridPetugasPelaksana._data;
                    for (var i = gridPetugas.length - 1; i >= 0; i--) {
                        if (gridPetugas[i].idParent ==  dataItem.rowNumber){                            
                            gridPetugas.splice(i, 1);
                            for (var i = gridPetugas.length - 1; i >= 0; i--) {
                          
                                gridPetugas[i].idParent = i+1
                            }
                              $scope.gridPetugasPelaksana.add(gridPetugas);
                        }
                    }
           }
       
         $scope.hapusAll = function(){
               data2=[];
               $scope.dataTindakan=new kendo.data.DataSource({
                    data: data2
               });
               var pushData=[];
              $scope.gridPetugasPelaksana=new kendo.data.DataSource({
                    data: pushData
               });
     
          };
            $scope.detailGridOptions = function(dataItem) {
                return {
                    dataSource: {
                        data: $scope.gridPetugasPelaksana._data,
                        filter: { field: "idParent", operator: "eq", value: dataItem.rowNumber }
                    },
                    columns: [
                        {
                            field: "jenisPetugas.jenisPelaksana",
                            title: "Jenis Pelaksana",
                            width: "100px",
                            template: "#= jenisPetugas.jenisPelaksana #"
                        },
                        {
                            field: "listPetugas[0].namalengkap",
                            title: "Nama Pegawai",
                            width: "200px",
                        }
                    ]
                };
            };

            $scope.formatRupiah = function(value, currency) {
              return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            } 

              $scope.refreshDetilTagihan = function(){
                findPasien.findDetailPelayanan(responData.noRec).then(function(e) {
                  $scope.listData = e.data.data.orders;
                  var data = e.data.data.orders;
                  for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                      var element = data[key];
                      element.tglPelayanan = moment(element.tglPelayanan).format('DD MMM YYYY');
                    }
                  }
                   

                    $scope.total = _.reduce(data, function(memo, num) {
                      if (num.nilaiNormal === 0)
                        return memo + (num.jumlah * num.hargaSatuan * -1);
                      return memo + (num.jumlah * num.hargaSatuan);
                    }, 0);
                  });
              }   

              $scope.isInArray = function(value, array){
                return array.indexOf(value) > -1;
              }
              function getGenericPegawai(input, output){
                var selectedData = $parse(output);
                selectedData.assign($scope, []);
                var model = $parse(input);
              findPasien.getListData("service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled&values=true").then(function(dat){
                  $scope.listPegawai = new kendo.data.DataSource({
                    data: dat.data
                  });
                  model.assign($scope, $scope.listPegawai);
                });
              }
              $scope.listIdPetugas = [13827,176873]
              $scope.$watch('item.jenisPelaksana', function(e) {
                if (e === undefined) return;
                     var id = $scope.item.jenisPelaksana.id;
                    var model = 'dataSource';
                    var listArray = 'selectedPegawai';
                    var isInList =  $scope.isInArray(id, $scope.listIdPetugas);
                    if(isInList){
                      getGenericPegawai(model, listArray);
                    } else {
                      getPegawaiById(id, model, listArray);
              
                    }
            });

              $scope.selectedPegawai = [];
              $scope.init2 = function () {
                var id = $scope.item.jenisPelaksana2.id;
                var model = 'dataSource2';
                var listArray = 'selectedPegawai2';
                var isInList =  $scope.isInArray(id, $scope.listIdPetugas);
                if(isInList){
                  getGenericPegawai(model, listArray);
                } else {
                  getPegawaiById(id, model, listArray);
                }
              };
              $scope.selectedPegawai2 = [];
              $scope.init3 = function () {
                var id = $scope.item.jenisPelaksana3.id;
                var model = 'dataSource3';
                var listArray = 'selectedPegawai3';
                var isInList =  $scope.isInArray(id, $scope.listIdPetugas);
                if(isInList){
                  getGenericPegawai(model, listArray);
                } else {
                  getPegawaiById(id, model, listArray);
                }
              };
              $scope.selectedPegawai3 = [];
              $scope.init4 = function () {
                var id = $scope.item.jenisPelaksana4.id;
                var model = 'dataSource4';
                var listArray = 'selectedPegawai4';
                var isInList =  $scope.isInArray(id, $scope.listIdPetugas);
                if(isInList){
                  getGenericPegawai(model, listArray);
                } else {
                  getPegawaiById(id, model, listArray);
                }
              };
              $scope.selectedPegawai4 = [];
              $scope.init5 = function () {
                var id = $scope.item.jenisPelaksana5.id;
                var model = 'dataSource5';
                var listArray = 'selectedPegawai5';
                var isInList =  $scope.isInArray(id, $scope.listIdPetugas);
                if(isInList){
                  getGenericPegawai(model, listArray);
                } else {
                  getPegawaiById(id, model, listArray);
                }
              };
              $scope.selectedPegawai5 = [];
              $scope.init6 = function () {
                var id = $scope.item.jenisPelaksana6.id;
                var model = 'dataSource6';
                var listArray = 'selectedPegawai6';
                var isInList =  $scope.isInArray(id, $scope.listIdPetugas);
                if(isInList){
                  getGenericPegawai(model, listArray);
                } else {
                  getPegawaiById(id, model, listArray);
                }
              };
              $scope.selectedPegawai6 = [];
              $scope.init7 = function () {
                var id = $scope.item.jenisPelaksana7.id;
                var model = 'dataSource7';
                var listArray = 'selectedPegawai7';
                var isInList =  $scope.isInArray(id, $scope.listIdPetugas);
                if(isInList){
                  getGenericPegawai(model, listArray);
                } else {
                  getPegawaiById(id, model, listArray);
                }
              };
              $scope.selectedPegawai7 = [];
              $scope.init8 = function () {
                var id = $scope.item.jenisPelaksana8.id;
                var model = 'dataSource8';
                var listArray = 'selectedPegawai8';
                var isInList =  $scope.isInArray(id, $scope.listIdPetugas);
                if(isInList){
                  getGenericPegawai(model, listArray);
                } else {
                  getPegawaiById(id, model, listArray);
                }
              };
              $scope.selectedPegawai8 = [];
              $scope.init9 = function () {
                var id = $scope.item.jenisPelaksana9.id;
                var model = 'dataSource9';
                var listArray = 'selectedPegawai9';
                var isInList =  $scope.isInArray(id, $scope.listIdPetugas);
                if(isInList){
                  getGenericPegawai(model, listArray);
                } else {
                  getPegawaiById(id, model, listArray);
                }
              };
              $scope.selectedPegawai9 = [];
              $scope.init10 = function () {
                var id = $scope.item.jenisPelaksana10.id;
                var model = 'dataSource10';
                var listArray = 'selectedPegawai10';
                var isInList =  $scope.isInArray(id, $scope.listIdPetugas);
                if(isInList){
                  getGenericPegawai(model, listArray);
                } else {
                  getPegawaiById(id, model, listArray);
                }
              };
              $scope.selectedPegawai10 = [];
              $scope.showTambah1 = true;
              $scope.show = true;
              $scope.tambah = function () {
                $scope.showJenisPelaksana2 = true;
                $scope.show = false;
                $scope.show2 = true;
              };
              $scope.hapus= function () {
                $scope.show = true;
                $scope.show2 = false;
                $scope.showJenisPelaksana2 = false;
                $scope.item.jenisPelaksana2 = "";
                $scope.selectedPegawai2 = [];
              };

              $scope.tambah2 =function () {
                $scope.showJenisPelaksana3 = true;
                $scope.show3 = true;
                $scope.show2 = false;
              }
              $scope.hapus2= function () {
                $scope.showJenisPelaksana3 = false;
                $scope.show2 = true;
                $scope.show3 = false;
                $scope.item.jenisPelaksana3 = "";
                $scope.selectedPegawai3 = [];
              };

              $scope.tambah3 =function () {
                $scope.showJenisPelaksana4 = true;
                $scope.show3 = false;
                $scope.show4 = true;
              }
              $scope.hapus3 = function () {
                $scope.showJenisPelaksana4 = false;
                $scope.show3 = true;
                $scope.show4 = false;
                $scope.item.jenisPelaksana4 = "";
                $scope.selectedPegawai4 = [];
              };

              $scope.tambah4 = function () {
                $scope.showJenisPelaksana5 = true;
                $scope.show4 = false;
                $scope.show5 = true;
              }
              $scope.hapus4 = function () {
                $scope.showJenisPelaksana5 = false;
                $scope.show4 = true;
                $scope.show5 = false;
                $scope.item.jenisPelaksana5 = "";
                $scope.selectedPegawai5 = [];
              };

              $scope.tambah5 = function () {
                $scope.showJenisPelaksana6 = true;
                $scope.show5 = false;
                $scope.show6 = true;
              }
              $scope.hapus5 = function () {
                $scope.showJenisPelaksana6 = false;
                $scope.show5 = true;
                $scope.show6 = false;
                $scope.item.jenisPelaksana5 = "";
                $scope.selectedPegawai5 = [];
              };

              $scope.tambah6 = function () {
                $scope.showJenisPelaksana7 = true;
                $scope.show6 = false;
                $scope.show7 = true;
              }
              $scope.hapus6 = function () {
                $scope.showJenisPelaksana7 = false;
                $scope.show6 = true;
                $scope.show7 = false;
                $scope.item.jenisPelaksana6 = "";
                $scope.selectedPegawai6 = [];
              };

              $scope.tambah7 = function () {
                $scope.showJenisPelaksana8 = true;
                $scope.show7 = false;
                $scope.show8 = true;
              }
              $scope.hapus7 = function () {
                $scope.showJenisPelaksana8 = false;
                $scope.show7 = true;
                $scope.show8 = false;
                $scope.item.jenisPelaksana7 = "";
                $scope.selectedPegawai7 = [];
              };

              $scope.tambah8 = function () {
                $scope.showJenisPelaksana9 = true;
                $scope.show8 = false;
                $scope.show9 = true;
              }
              $scope.hapus8 = function () {
                $scope.showJenisPelaksana9 = false;
                $scope.show8 = true;
                $scope.item.jenisPelaksana8 = "";
                $scope.selectedPegawai8 = [];
              };

              $scope.tambah9 = function () {
                $scope.showJenisPelaksana10 = true;
                $scope.show9 = false;
                $scope.show10 = true;
              }
              $scope.hapus9 = function () {
                $scope.showJenisPelaksana10 = false;
                $scope.show9 = true;
                $scope.show10 = false;
                $scope.item.jenisPelaksana9 = "";
                $scope.selectedPegawai9 = [];
              };

              $scope.selectOptions = {
                placeholder: "Pilih Pegawai...",
                dataTextField: "namaLengkap",
                dataValueField: "id",
                filter: "contains"
              };

              function kosongkan(){
                    $scope.item.namaProduk = "";
                    $scope.item.hargaTindakan = "";
                    $scope.item.jumlah = "";
                    // $scope.item.jenisPelaksana = "";
                    $scope.item.petugasPelaksana = "";
                    $scope.item.jenisPelaksana2 = "";
                    $scope.item.petugasPelaksana2 = "";
                    $scope.item.jenisPelaksana3 = "";
                    $scope.item.petugasPelaksana3 = "";
                    $scope.item.jenisPelaksana4 = "";
                    $scope.item.petugasPelaksana4 = "";
                    // $scope.selectedPegawai = [];
                    $scope.selectedPegawai1 = [];
                    $scope.selectedPegawai2 = [];
                    $scope.selectedPegawai3 = [];
                    $scope.selectedPegawai4 = [];
                    $scope.selectedPegawai5 = [];
                }

            // function simpan tindakan
            $scope.Save=function(){
                var dataTindakanFix = [];
                $scope.dataTindakan._data.forEach(function(e){

                   if (e.listKomponen.length<=0){
                         window.messageContainer.error("Simpan Gagal, Komponen Tindakan tidak ada");
                         return
                   }
                   else
                   {
                    var petugasLayanan = [];
                    $scope.gridPetugasPelaksana._data.forEach(function(a){
                        if(e.rowNumber === a.idParent){
                            petugasLayanan.push({
                                "objectjenispetugaspefk": a.jenisPetugas.id,
                                "listpegawai": a.listPetugas
                            });
                        }
                    })
                       dataTindakanFix.push({
                        "noregistrasifk": norec_apd, //$scope.currentNorecAPD,
                        "tglregistrasi": $scope.item.tglregistrasi,
                        "tglpelayanan": new moment(e.tglPelayanan).format('YYYY-MM-DD HH:mm'),
                        "ruangan" : e.ruangan,
                        "produkfk": e.produk.id,
                        "hargasatuan": e.hargaSatuan,
                        "hargajual": e.hargaSatuan,
                        "harganetto": e.hargaSatuan,
                        "jumlah" : e.qty,
                        "kelasfk" : kelasid,
                        "pelayananpetugas": petugasLayanan,
                        "komponenharga":e.listKomponen
                      
                    });
                }
               })      
               var objSave={ 
                    pelayananpasien:dataTindakanFix

                  } 
                manageServicePhp.saveTindakanPelayanan(JSON.stringify(objSave)).then(function(e){
                        $scope.hapusAll();
                  }, function(error){
                })
            }

          $scope.Back=function(){
            $scope.pelayanan = false;
          }

          $scope.Detail = function(){
            if(  $scope.item.noregistrasi != undefined){
                var obj = {
                    noRegistrasi :  $scope.item.noregistrasi
                }

                $state.go('RincianTagihanTataRekening', {
                    dataPasien: JSON.stringify(obj)
                });
            }
          }
        // * End Input Tindakan

        // * Start Input Obat

            function init() {
                $scope.isRouteLoading=true;
                manageLogistikPhp.getDataTableTransaksi("logistik/get-datacombo", true).then(function(dat){
                    $scope.isRouteLoading=false;
                    // $scope.listPenulisResep = dat.data.penulisresep;
                    $scope.listRuangan = dat.data.ruanganfarmasi;
                    $scope.listJenisKemasan = dat.data.jeniskemasan;
                    $scope.listProdukObat = dat.data.produk;
                    $scope.listAsalProduk = dat.data.asalproduk;
                    // $scope.listRoute = dat.data.route;
                    $scope.listAturanPakai = dat.data.signa;
                    $scope.listJenisRacikan = dat.data.jenisracikan;
                    $scope.itemObat.ruangan= dat.data.ruanganfarmasi[0];
                    $scope.itemObat.jenisKemasan = dat.data.jeniskemasan[0];
                });
                manageLogistikPhp.getDataTableTransaksi("get-data-login", true).then(function(dat){
                    $scope.listPenulisResep = dat.data;
                    $scope.itemObat.penulisResep ={id:dat.data[0].id,namalengkap:dat.data[0].namalengkap};
                });
                manageLogistikPhp.getDataTableTransaksi('logistik/get-daftar-detail-order?norec_apd='+norec_apd).then(function(e) {
                    for (var i = e.data.length - 1; i >= 0; i--) {
                        e.data[i].no=i+1
                    }
                    $scope.dataGridRiwayat = new kendo.data.DataSource({
                        data: e.data,
                        pageSize:10
                    });


                });

            }

            $scope.getSatuan = function(){
                GETKONVERSI()
            }
            function GETKONVERSI(){
                $scope.listSatuan = $scope.itemObat.produkObat.konversisatuan
                if ($scope.listSatuan.length == 0) {
                    $scope.listSatuan = ([{ssid:$scope.itemObat.produkObat.ssid,satuanstandar:$scope.itemObat.produkObat.satuanstandar}])
                }
                $scope.itemObat.satuan = {ssid:$scope.itemObat.produkObat.ssid,satuanstandar:$scope.itemObat.produkObat.satuanstandar}
                $scope.itemObat.nilaiKonversi = 1// $scope.itemObat.satuan.nilaikonversi
                if ($scope.itemObat.ruangan == undefined) {
                    //alert("Pilih Ruangan terlebih dahulu!!")
                    return;
                }
                // if ($scope.item.asal == undefined) {
                //     //alert("Pilih asal terlebih dahulu!!")
                //     return;
                // }
                $scope.isRouteLoading=false;
                manageLogistikPhp.getDataTableTransaksi("logistik/get-produkdetail?"+
                    "produkfk="+ $scope.itemObat.produkObat.id +
                    "&ruanganfk="+ $scope.itemObat.ruangan.id , true).then(function(dat){
                        $scope.isRouteLoading=false;
                        dataProdukDetail =dat.data.detail;
                        $scope.itemObat.stok =dat.data.jmlstok / $scope.itemObat.nilaiKonversi 
                        gettotal();
                        // $scope.item.dosis =$scope.dataSelected.dosis
                        // $scope.item.jumlahxmakan =parseFloat($scope.dataSelected.jumlah) / parseFloat($scope.item.dosis)

                        $scope.itemObat.nilaiKonversi = $scope.dataSelected.nilaikonversi
                        // $scope.item.satuan = {ssid:$scope.dataSelected.satuanstandarfk,satuanstandar:$scope.dataSelected.satuanstandar}
                        $scope.itemObat.stok = $scope.dataSelected.jmlstok //* $scope.item.nilaiKonversi 
                        $scope.itemObat.jumlah = $scope.dataSelected.jumlah
                        $scope.itemObat.hargaSatuan = $scope.dataSelected.hargasatuan
                        // $scope.item.hargadiskon = $scope.dataSelected.hargadiscount
                        $scope.itemObat.total = $scope.dataSelected.total
                });
            }
            $scope.getNilaiKonversi = function(){
                $scope.itemObat.nilaiKonversi =  $scope.itemObat.satuan.nilaikonversi
            }
            $scope.$watch('itemObat.nilaiKonversi', function(newValue, oldValue) {
                if (newValue != oldValue  ) {
                    if ($scope.itemObat.stok > 0) {
                        $scope.itemObat.stok =parseFloat($scope.itemObat.stok) * (parseFloat(oldValue)/ parseFloat(newValue))
                        $scope.itemObat.jumlah =1//parseFloat($scope.item.jumlah) / parseFloat(newValue)
                        $scope.itemObat.hargaSatuan =0//hrg1 * parseFloat(newValue)
                        // $scope.item.hargadiskon =0//hrgsdk * parseFloat(newValue)
                        $scope.itemObat.total =0// parseFloat(newValue) * 
                               // (hrg1-hrgsdk)
                    }
                }
            });
            $scope.$watch('itemObat.tglresepAkhir', function(newValue, oldValue) {
                if (newValue != oldValue  ) {
                    var date1 = new Date($scope.itemObat.tglresep);
                    var date2 = new Date($scope.itemObat.tglresepAkhir);
                    diffDays = date2.getDate() - date1.getDate(); 
                    diffDays =  diffDays + 1
                    $scope.kAngka=diffDays
                }
            });
      
            $scope.$watch('itemObat.jenisKemasan.jeniskemasan', function(newValue, oldValue) {
                if (newValue != oldValue  ) {
                    if (newValue == 'Racikan') {
                       $scope.showRacikanDose = true
                    }else{
                       $scope.showRacikanDose = false
                    }
                }
            });
            $scope.$watch('itemObat.jumlah', function(newValue, oldValue) {
                debugger
                if (newValue != oldValue  ) {
                    gettotal()
                }
            });

            function gettotal(){
                if ($scope.itemObat.stok == 0 ) {
                    $scope.itemObat.jumlah = 1
                    //alert('Stok kosong')

                    return;
                }                
                var ada = false;
                for (var i = 0; i < dataProdukDetail.length; i++) {
                    ada = false
                    if (parseFloat($scope.itemObat.jumlah * parseFloat($scope.itemObat.nilaiKonversi) ) <= parseFloat(dataProdukDetail[i].qtyproduk) ){
                        hrg1 = Math.round(parseFloat(dataProdukDetail[i].hargajual)* parseFloat($scope.itemObat.nilaiKonversi))
                        $scope.itemObat.hargaSatuan = parseFloat(hrg1)  
                        $scope.itemObat.total =parseFloat((parseFloat($scope.itemObat.jumlah) * (hrg1)))//+tarifJasa
                        noTerima = dataProdukDetail[i].norec
                        ada=true;
                        break;
                    }
                }
                if (ada == false) {
                    $scope.itemObat.hargaSatuan = 0
                    $scope.itemObat.total = 0
                    
                    noTerima = ''
                }
                if ($scope.itemObat.jumlah == 0) {
                    $scope.itemObat.hargaSatuan = 0
                }
                // if ($scope.item.stok > 0) {
                //     $scope.item.stok =parseFloat($scope.item.stok) * (parseFloat(oldValue)/ parseFloat(newValue))
                // }
            }
            $scope.hapus1 = function(){
                if ($scope.itemObat.jumlah == 0) {
                    alert("Jumlah harus di isi!")
                    return;
                }
                if ($scope.itemObat.total == 0) {
                    alert("Stok tidak ada harus di isi!")
                    return;
                }
                if ($scope.itemObat.jenisKemasan == undefined) {
                    alert("Pilih Jenis Kemasan terlebih dahulu!!")
                    return;
                }
                // if ($scope.item.asal == undefined) {
                //     alert("Pilih Asal Produk terlebih dahulu!!")
                //     return;
                // }
                if ($scope.itemObat.produk == undefined) {
                    alert("Pilih Produk terlebih dahulu!!")
                    return;
                }
                if ($scope.itemObat.satuan == undefined) {
                    alert("Pilih Satuan terlebih dahulu!!")
                    return;
                }
                // var nomor =0
                // if ($scope.dataGrid == undefined) {
                //     nomor = 1
                // }else{
                //     nomor = data2.length+1
                // }
                var data ={};
                if ($scope.itemObat.no != undefined){
                    for (var i = data2.length - 1; i >= 0; i--) {
                        if (data2[i].no ==  $scope.itemObat.no){                            

                            //data2[i] = data;
                            // delete data2[i]
                            data2.splice(i, 1);

                            var subTotal = 0 ;
                            for (var i = data2.length - 1; i >= 0; i--) {
                                subTotal=subTotal+ parseFloat(data2[i].total)
                                data2[i].no = i+1
                            }
                            // data2.length = data2.length -1
                            $scope.dataGrid = new kendo.data.DataSource({
                                data: data2
                            });
                            // for (var i = data2.length - 1; i >= 0; i--) {
                            //     subTotal=subTotal+ parseFloat(data2[i].total)
                            // }
                            // $scope.item.totalSubTotal=parseFloat(subTotal).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,")
                            $scope.itemObat.totalSubTotal=subTotal
                        }
                        // break;
                    }

                }
                Kosongkan()
            }
            $scope.formatTanggal = function(tanggal){
                return moment(tanggal).format('DD-MMM-YYYY');
            }

            $scope.tambahObat = function () {
                if ($scope.itemObat.jumlah == 0) {
                    alert("Jumlah harus di isi!")
                    return;
                }
                if ($scope.itemObat.total == 0) {
                    alert("Stok tidak ada harus di isi!")
                    return;
                }
                if ($scope.itemObat.jenisKemasan == undefined) {
                    alert("Pilih Jenis Kemasan terlebih dahulu!!")
                    return;
                }
                if ($scope.itemObat.produkObat == undefined) {
                    alert("Pilih Produk terlebih dahulu!!")
                    return;
                }
                if ($scope.itemObat.satuan == undefined) {
                    alert("Pilih Satuan terlebih dahulu!!")
                    return;
                }
                var nomor =0
                if ($scope.dataGridObat == undefined) {
                    nomor = 1
                }else{
                    nomor = data2.length+1
                }
                var data = {};
                if ($scope.item.no != undefined){
                    for (var i = data2.length - 1; i >= 0; i--) {
                        if (data2[i].no ==  $scope.itemObat.no){
                            data.no = $scope.itemObat.no

                            data.noregistrasifk = norec_apd//$scope.item.noRegistrasi
                            //data.tglregistrasi = $scope.item.tglregistrasi
                            data.generik = null
                            data.hargajual = $scope.itemObat.hargaSatuan
                            data.jenisobatfk = null
                            //data.kelasfk = $scope.item.kelas.id
                            data.stock = $scope.itemObat.stok
                            data.harganetto = $scope.itemObat.hargaSatuan
                            data.nostrukterimafk = noTerima
                            data.ruanganfk = $scope.itemObat.ruangan.id

                            data.rke = $scope.item.rke
                            data.jeniskemasanfk = $scope.itemObat.jenisKemasan.id
                            data.jeniskemasan = $scope.itemObat.jenisKemasan.jeniskemasan
                            data.aturanpakaifk = $scope.itemObat.aturanPakai.id
                            data.aturanpakai = $scope.itemObat.aturanPakai.name
                            data.asalprodukfk = 0//$scope.item.asal.id
                            data.asalproduk = ''//$scope.item.asal.asalproduk
                            data.produkfk = $scope.itemObat.produkObat.id
                            data.namaproduk = $scope.itemObat.produkObat.namaproduk
                            data.nilaikonversi = $scope.itemObat.nilaiKonversi
                            data.satuanstandarfk = $scope.itemObat.satuan.ssid
                            data.satuanstandar = $scope.itemObat.satuan.satuanstandar
                            data.satuanviewfk = $scope.itemObat.satuan.ssid
                            data.satuanview = $scope.itemObat.satuan.satuanstandar
                            data.jmlstok = $scope.itemObat.stok
                            data.jumlah = $scope.itemObat.jumlah
                            data.hargasatuan = $scope.itemObat.hargaSatuan
                            data.hargadiscount = 0
                            data.total = $scope.itemObat.total

                            data2[i] = data;
                            $scope.dataGridObat = new kendo.data.DataSource({
                                data: data2
                            });

                        }
                    }

                }else{
                    data={
                            no:nomor,
                            generik:null,
                            hargajual:$scope.itemObat.hargaSatuan,
                            jenisobatfk:null,
                            //kelasfk:$scope.item.kelas.id,
                            stock:$scope.itemObat.stok,
                            harganetto:$scope.itemObat.hargaSatuan,
                            nostrukterimafk:noTerima,
                            ruanganfk:$scope.itemObat.ruangan.id,//£££
                            rke:$scope.itemObat.rke,
                            jeniskemasanfk:$scope.itemObat.jenisKemasan.id,
                            jeniskemasan:$scope.itemObat.jenisKemasan.jeniskemasan,
                            aturanpakaifk:$scope.itemObat.aturanPakai.id,
                            aturanpakai:$scope.itemObat.aturanPakai.name,
                            asalprodukfk:0,//$scope.item.asal.id,
                            asalproduk:'',//$scope.item.asal.asalproduk,
                            produkfk:$scope.itemObat.produkObat.id,
                            namaproduk:$scope.itemObat.produkObat.namaproduk,
                            nilaikonversi:$scope.itemObat.nilaiKonversi,
                            satuanstandarfk:$scope.itemObat.satuan.ssid,
                            satuanstandar:$scope.itemObat.satuan.satuanstandar,
                            satuanviewfk:$scope.itemObat.satuan.ssid,
                            satuanview:$scope.itemObat.satuan.satuanstandar,
                            jmlstok:$scope.itemObat.stok,
                            jumlah:$scope.itemObat.jumlah,
                            hargasatuan:$scope.itemObat.hargaSatuan,
                            hargadiscount: 0,
                            total:$scope.itemObat.total
                        }
                    data2.push(data)
                    // $scope.dataGrid.add($scope.dataSelected)
                    $scope.dataGridObat = new kendo.data.DataSource({
                        data: data2
                    });
                    var subTotal = 0 ;
                    for (var i = data2.length - 1; i >= 0; i--) {
                        subTotal=subTotal+ parseFloat(data2[i].total)
                    }
                    $scope.itemObat.totalSubTotal=subTotal
                }
                 Kosongkan();
                 clear();
            }

            $scope.klikGridObat = function(dataSelectedObat){
                debugger;
                var dataProduk =[];
                //no:no,
                $scope.itemObat.no = dataSelectedObat.no
                $scope.itemObat.rke = dataSelectedObat.rke
                $scope.itemObat.jenisKemasan = {id:dataSelectedObat.jeniskemasanfk,jeniskemasan:dataSelectedObat.jeniskemasan}
                $scope.itemObat.aturanPakai = {id:dataSelectedObat.aturanpakaifk,name:dataSelectedObat.aturanpakai}
                $scope.itemObat.asal = {id:dataSelectedObat.asalprodukfk,asalproduk:dataSelectedObat.asalproduk}
                for (var i = $scope.listProdukObat.length - 1; i >= 0; i--) {
                    if ($scope.listProdukObat[i].id == dataSelectedObat.produkfk){
                        dataProduk = $scope.listProdukObat[i]
                        break;
                    }
                }
                $scope.itemObat.produkObat = dataProduk//{id:dataSelected.produkfk,namaproduk:dataSelected.namaproduk}
                GETKONVERSI()
                
            }
            function Kosongkan(){
                $scope.itemObat.produkObat =''  
                $scope.itemObat.satuan=''
                $scope.itemObat.nilaiKonversi=0
                $scope.itemObat.stok=0
                $scope.itemObat.jumlah=1
                $scope.itemObat.no=undefined
                $scope.itemObat.total=0
                $scope.itemObat.hargaSatuan=0
            }
            function clear(){
                $scope.itemObat.jenisRacikan=''
                $scope.itemObat.aturanPakai=''
            }
            function cleargrid(){
                for (var i = 0; i < data2.length; i++) {                            
                    data2.splice(i, 1);

                    var subTotal = 0 ;
                    for (var i = data2.length - 1; i >= 0; i--) {
                        subTotal=subTotal+ parseFloat(data2[i].total)
                    }
                    $scope.dataGrid = new kendo.data.DataSource({
                        data: data2
                    });
                    $scope.itemObat.totalSubTotal=subTotal
                }
            }
            $scope.batal1 = function(){
                Kosongkan();
                clear();
            }
            $scope.batal = function(){
                Kosongkan();
                clear();
                cleargrid();
            }

            $scope.columnGridObat = [
            {
                "field": "no",
                "title": "No",
                "width" : "30px",
            },
            {
                "field": "rke",
                "title": "R/ke",
                "width" : "40px",
            },
            {
                "field": "jeniskemasan",
                "title": "Kemasan",
                "width" : "70px",
            },
            {
                "field": "aturanpakai",
                "title": "Aturan Pakai",
                "width" : "100px",
            },
            {
                "field": "namaproduk",
                "title": "Deskripsi",
                "width" : "200px",
            },
            {
                "field": "satuanstandar",
                "title": "Satuan",
                "width" : "80px",
            },
            {
                "field": "jumlah",
                "title": "Qty",
                "width" : "70px",
            },
            {
                "field": "hargasatuan",
                "title": "Harga Satuan",
                "width" : "100px",
                "template": "<span class='style-right'>{{formatRupiah('#: hargasatuan #', '')}}</span>"
            },
            {
                "field": "total",
                "title": "Total",
                "width" : "100px",
                "template": "<span class='style-right'>{{formatRupiah('#: total #', '')}}</span>"
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
                    "field": "namalengkap",
                    "title": "Dokter",
                    "width" : "100px"
                },
                {
                    "field": "namaruangan",
                    "title": "Apotik",
                    "width" : "70px",
                },
                {
                    "field": "statusorder",
                    "title": "Status",
                    "width" : "70px",
                }
                ];
                $scope.detailGridOptions = function(dataItem) {
                    return {
                        dataSource: new kendo.data.DataSource({
                            data: dataItem.details
                        }),
                        columns: [
                        {
                            field: "rke",
                            title: "Rke",
                            width:"30px",
                        },
                        {
                            field: "jeniskemasan",
                            title: "Jenis Kemasan",
                            width:"100px",
                        },
                        {
                            field: "namaproduk",
                            title: "Deskripsi",
                            width:"200px"
                        },
                        {
                            field: "satuanstandar",
                            title: "Satuan",
                            width:"100px"
                        },
                        {
                            field: "aturanpakai",
                            title: "Aturan Pakai",
                            width:"100px"
                        },
                        {
                            field: "jumlah",
                            title: "Qty",
                            width:"100px"
                        }]
                    };
                };
                $scope.formatRupiah = function(value, currency) {
                    return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                }
                $scope.kembali=function(){
                    //$state.go("TransaksiPelayananApotik")
                    window.history.back();
                }

                $scope.simpanObat = function(){
                    //debugger;
                    if (data2.length == 0) {
                        alert("Pilih Produk terlebih dahulu!!")
                        return
                    } 
                    if (diffDays < 1) {
                        alert("Tanggal Akhir tidak boleh lebih kecil!!")
                        return
                    }

                    var tglResepHari =''
                    for (var i = diffDays - 1; i >= 0; i--) {
                        var someDate = moment($scope.itemObat.tglresep).toDate();//new Date(moment($scope.item.tglresep).format('YYYY-MM-DD hh:mm:ss'));
                        var numberOfDaysToAdd = i;
                        tglResepHari = moment(someDate.setDate(someDate.getDate() + numberOfDaysToAdd)).format('YYYY-MM-DD hh:mm:ss'); 
                        var strukorder = {
                                    tglresep: tglResepHari,//moment($scope.item.tglAwal).format('YYYY-MM-DD hh:mm:ss'),
                                    penulisresepfk: $scope.itemObat.penulisResep.id,
                                    ruanganfk: $scope.itemObat.ruangan.id,
                                    noregistrasifk: norec_apd,
                                    qtyproduk: $scope.dataGridObat._data.length
                                }
                        var objSave = [
                            {
                                strukorder:strukorder,
                                orderfarmasi:data2
                            }
                        ]
                        manageLogistikPhp.postorderpelayananapotiknew(objSave).then(function(e) {
                            $scope.itemObat.resep = e.data.noresep.noorder
                            init();
                            $scope.batal();
                        })
                    }
                }
                
                $scope.riwayat = function(){
                    $scope.riwayatForm =true
                    $scope.Obatshow = false;
                }
                $scope.newOrder = function(){
                    $scope.riwayatForm =false
                    $scope.Obatshow = true;
                }
                $scope.back=function(){
                    $state.go('DaftarAntrianDokterRajal')
                }

            // * End Input Obat

            // * Start Input Lab

            function initLab() {
                //debugger;
                manageLogistikPhp.getDataTableTransaksi("pelayanan/get-order-penunjang?departemenfk=3&nocm="+$scope.item.nocm+'&norec_apd='+norec_apd, true).then(function(dat){
                    $scope.itemLab.ruanganAsal = dat.data.data[0].namaruangan
                    $scope.listRuanganTujuan = dat.data.ruangantujuan;
                    $scope.itemLab.ruangantujuan = {
                        id: dat.data.ruangantujuan[2].id,
                        namaruangan : dat.data.ruangantujuan[2].namaruangan
                    }
                    $scope.listLayanan = dat.data.produk;
                    namaRuanganFk = ruanganfk;
                });
                manageLogistikPhp.getDataTableTransaksi("get-detail-login", true).then(function(dat){
                   $scope.PegawaiLogin2=dat.data
                });
                manageLogistikPhp.getDataTableTransaksi('laporan/get-order-lab?noregistrasi='+noreg, true).then(function(e) {
                    //debugger;
                    for (var i = e.data.daftar.length - 1; i >= 0; i--) {
                        e.data.daftar[i].no=i+1
                    }
                    $scope.dataGridRiwayatOrder = new kendo.data.DataSource({
                        data: e.data.daftar,
                        pageSize:10
                    });
                });
            }


            $scope.columnGridOrderLab = [
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

            $scope.columnGridOrderLab = [
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
            $scope.columnGridRiwayatOrder = [
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
                $scope.detailGridOptionsOrder = function(dataItem) {
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
                if ($scope.itemLab.qty == 0) {
                    alert("Qty harus di isi!")
                    return;
                }
                if ($scope.itemLab.ruangantujuan == undefined) {
                    alert("Pilih Ruangan Tujuan terlebih dahulu!!")
                    return;
                }
                if ($scope.itemLab.layanan == undefined) {
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
                if ($scope.itemLab.no != undefined){
                    for (var i = data2.length - 1; i >= 0; i--) {
                        if (data2[i].no ==  $scope.itemLab.no){
                            data.no = $scope.itemLab.no

                            data.produkfk = $scope.itemLab.layanan.id
                            data.namaproduk = $scope.itemLab.layanan.namaproduk
                            data.qtyproduk =parseFloat($scope.itemLab.qty)
                            data.objectruanganfk = namaRuanganFk
                            data.objectruangantujuanfk = $scope.itemLab.ruangantujuan.id

                            data2[i] = data;
                            $scope.dataGridOrder = new kendo.data.DataSource({
                                data: data2
                            });
                        }
                    }

                }else{
                    data={
                            no:nomor,
                            produkfk:$scope.itemLab.layanan.id,
                            namaproduk:$scope.itemLab.layanan.namaproduk,
                            qtyproduk:parseFloat($scope.itemLab.qty),
                            objectruanganfk:namaRuanganFk,
                            objectruangantujuanfk:$scope.itemLab.ruangantujuan.id
                        }
                    data2.push(data)
                    $scope.dataGridOrder = new kendo.data.DataSource({
                        data: data2
                    });
                }
                $scope.batal();
            }
            $scope.klikGridOrder = function(dataSelectedOrder){
                var dataProduk =[];
                //no:no,
                $scope.item.no = dataSelectedOrder.no
                for (var i = $scope.listLayanan.length - 1; i >= 0; i--) {
                    if ($scope.listLayanan[i].id == dataSelectedOrder.produkfk){
                        dataProduk = $scope.listLayanan[i]
                        break;
                    }
                }
                $scope.itemLab.layanan = dataProduk;//{id:dataSelected.produkfk,namaproduk:dataSelected.namaproduk}
                // $scope.item.stok = dataSelected.jmlstok //* $scope.item.nilaiKonversi 

                $scope.itemLab.qty = dataSelectedOrder.qtyproduk
            }
            $scope.hapus = function(){
                if ($scope.itemLab.qty == 0) {
                    alert("Qty harus di isi!")
                    return;
                }
                if ($scope.itemLab.ruangantujuan == undefined) {
                    alert("Pilih Ruangan Tujuan terlebih dahulu!!")
                    return;
                }
                if ($scope.itemLab.layanan == undefined) {
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
                $scope.itemLab.layanan =''
                $scope.itemLab.qty =1
                $scope.itemLab.no=undefined
            }
            $scope.BatalOrder= function(){
                data2=[]
                $scope.dataGridOrder = new kendo.data.DataSource({
                    data: data2
                });
                $scope.CmdOrderPelayanan = true;
                $scope.OrderPelayanan = false;
            }
            $scope.riwayatOrder = function(){
                $scope.riwayatForm =true
                $scope.OrderLab = false;
            }
            $scope.newOrderLab = function(){
                $scope.riwayatForm =false
                $scope.OrderLab = true;
            }
            $scope.SimpanOrder= function(){
                if ($scope.itemLab.ruangantujuan == undefined) {
                        alert("Pilih Ruangan Tujuan terlebih dahulu!!")
                        return
                    }
                    if (data2.length == 0) {
                        alert("Pilih layanan terlebih dahulu!!")
                        return
                    }
                    var objSave = {
                                norec_apd: norec_apd,
                                norec_pd: norec_pd,
                                qtyproduk: data2.length,
                                objectruanganfk:namaRuanganFk,
                                objectruangantujuanfk: $scope.itemLab.ruangantujuan.id,
                                departemenfk:3,
                                pegawaiorderfk:$scope.PegawaiLogin2.pegawai[0].id,
                                details:data2
                            }
                    
                    manageLogistikPhp.postorderlayanan(objSave).then(function(e) {
                        initLab();
                        $scope.BatalOrder();
                    })
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

            // * End Input Lab


            // * Start Input Radiologi

            function initRad() {
                manageLogistikPhp.getDataTableTransaksi("pelayanan/get-order-penunjang?departemenfk=27&nocm="+$scope.item.nocm+'&norec_apd='+norec_apd, true).then(function(dat){
                    $scope.itemRad.ruanganAsal = dat.data.data[0].namaruangan
                    $scope.listRuanganTujuan = dat.data.ruangantujuan;
                    $scope.itemRad.ruangantujuan = {
                        id:dat.data.ruangantujuan[0].id,
                        namaruangan:dat.data.ruangantujuan[0].namaruangan
                    };
                    $scope.listLayanan = dat.data.produk;
                    namaRuanganFk = dat.data.data[0].objectruanganfk
                    norec_pd = dat.data.data[0].noregistrasifk
                });
                manageLogistikPhp.getDataTableTransaksi("get-detail-login", true).then(function(dat){
                   $scope.PegawaiLogin2=dat.data
                });
                manageLogistikPhp.getDataTableTransaksi('laporan/get-order-rad?noregistrasi='+noreg).then(function(e) {
                    //debugger;
                    for (var i = e.data.daftar.length - 1; i >= 0; i--) {
                        e.data.daftar[i].no=i+1
                    }
                    $scope.dataGridRiwayatRad = new kendo.data.DataSource({
                        data: e.data.daftar,
                        pageSize:10
                    });

                });

            }

            $scope.columnGrid = [
            {
                "field": "no",
                "title": "No",
                "width" : "30px",
            },
            {
                "field": "tglpelayanan",
                "title": "Tgl Pelayanan",
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

            $scope.columnGridOrderRad = [
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
            $scope.columnGridRiwayatRad = [
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
                $scope.detailGridOptionsRad = function(dataItemRad) {
                return {
                    dataSource: new kendo.data.DataSource({
                        data: dataItemRad.details
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
            $scope.addRad = function(){
                if ($scope.itemRad.qty == 0) {
                    alert("Qty harus di isi!")
                    return;
                }
                if ($scope.itemRad.ruangantujuan == undefined) {
                    alert("Pilih Ruangan Tujuan terlebih dahulu!!")
                    return;
                }
                if ($scope.itemRad.layanan == undefined) {
                    alert("Pilih Layanan terlebih dahulu!!")
                    return;
                }
                var nomor =0
                if ($scope.dataGridOrderRad == undefined) {
                    nomor = 1
                }else{
                    nomor = data2.length+1
                }
                var data ={};
                if ($scope.itemRad.no != undefined){
                    for (var i = data2.length - 1; i >= 0; i--) {
                        if (data2[i].no ==  $scope.item.no){
                            data.no = $scope.item.no

                            data.produkfk = $scope.itemRad.layanan.id
                            data.namaproduk = $scope.itemRad.layanan.namaproduk
                            data.qtyproduk =parseFloat($scope.itemRad.qty)
                            data.objectruanganfk = namaRuanganFk
                            data.objectruangantujuanfk = $scope.itemRad.ruangantujuan.id

                            data2[i] = data;
                            $scope.dataGridOrderRad = new kendo.data.DataSource({
                                data: data2
                            });
                        }
                    }

                }else{
                    data={
                            no:nomor,
                            produkfk:$scope.itemRad.layanan.id,
                            namaproduk:$scope.itemRad.layanan.namaproduk,
                            qtyproduk:parseFloat($scope.itemRad.qty),
                            objectruanganfk:namaRuanganFk,
                            objectruangantujuanfk:$scope.itemRad.ruangantujuan.id
                        }
                    data2.push(data)
                    // $scope.dataGrid.add($scope.dataSelected)
                    $scope.dataGridOrderRad = new kendo.data.DataSource({
                        data: data2
                    });
                }
                $scope.batal();
            }
            $scope.klikGrid = function(dataSelectedOrderRad){
                var dataProduk =[];
                //no:no,
                $scope.item.no = dataSelectedOrderRad.no
                for (var i = $scope.listLayanan.length - 1; i >= 0; i--) {
                    if ($scope.listLayanan[i].id == dataSelectedOrderRad.produkfk){
                        dataProduk = $scope.listLayanan[i]
                        break;
                    }
                }
                $scope.itemRad.layanan = dataProduk;
                $scope.itemRad.qty = dataSelected.qtyproduk
            }
            $scope.hapusRad = function(){
                if ($scope.itemRad.qty == 0) {
                    alert("Qty harus di isi!")
                    return;
                }
                if ($scope.itemRad.ruangantujuan == undefined) {
                    alert("Pilih Ruangan Tujuan terlebih dahulu!!")
                    return;
                }
                if ($scope.itemRad.layanan == undefined) {
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
                if ($scope.itemRad.no != undefined){
                    for (var i = data2.length - 1; i >= 0; i--) {
                        if (data2[i].no ==  $scope.item.no){
                            data2.splice(i, 1); 
                            for (var i = data2.length - 1; i >= 0; i--) {
                                data2[i].no = i+1
                            }
                            // data2[i] = data;
                            $scope.dataGridOrderRad = new kendo.data.DataSource({
                                data: data2
                            });
                        }
                    }
                }
                $scope.batal();
            }
            $scope.batalRad = function(){
                $scope.itemRad.layanan =''
                $scope.itemRad.qty =1
                $scope.itemRad.no=undefined
            }
            $scope.BatalOrderRad= function(){
                data2=[]
                $scope.dataGridOrderRad = new kendo.data.DataSource({
                    data: data2
                });
                $scope.CmdOrderPelayanan = true;
                $scope.OrderPelayanan = false;
            }
            $scope.riwayatRad = function(){
                    $scope.riwayatFormRad =true
                    $scope.inputRad = false;
                }
            $scope.newOrderRad = function(){
                $scope.riwayatFormRad =false
                $scope.inputRad = true;
            }
            $scope.SimpanRad= function(){
                if ($scope.itemRad.ruangantujuan == undefined) {
                        alert("Pilih Ruangan Tujuan terlebih dahulu!!")
                        return
                    }
                    if (data2.length == 0) {
                        alert("Pilih layanan terlebih dahulu!!")
                        return
                    }
                    var objSave = {
                                norec_apd: norec_apd,
                                norec_pd: norec_pd,
                                qtyproduk: data2.length,//
                                objectruanganfk:namaRuanganFk,
                                objectruangantujuanfk: $scope.itemRad.ruangantujuan.id,
                                departemenfk:27,
                                pegawaiorderfk:$scope.PegawaiLogin2.pegawai[0].id,
                                details:data2
                            }
                    
                    manageLogistikPhp.postorderlayanan(objSave).then(function(e) {
                        initRad();
                        $scope.BatalOrder();
                    })
            }

                $scope.click=function(dataSelectedRiwayat){
                    if(dataSelectedRiwayatRad!=undefined){
                        $scope.noOrder=dataSelectedRiwayatRad.noorder;
                        manageLogistikPhp.getDataTableTransaksi("dokter/get-acc-number-radiologi?noOrder="+ $scope.noOrder)
                            .then(function(e){
                                $scope.dataRisOrder=e.data.data[0]

                            })
                    }
                }

                $scope.lihatHasilRad=function(){
                    if ($scope.dataRisOrder!=undefined){
                          $window.open("http://pacs1.rsabhk.co.id:8080/URLCall.do?LID=dok&LPW=dok&LICD=003&PID="+$scope.item.noMr +'&ACN='+$scope.dataRisOrder.accession_num , "_blank");
                    }else{
                        toastr.error('Pilih data dulu')
                        
                    }

                }

            // * ENd Input Radiologi

        }
    ]);
        // }
});