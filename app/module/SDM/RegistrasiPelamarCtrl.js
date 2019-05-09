define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RegistrasiPelamarCtrl', ['$timeout', '$window', '$rootScope', '$scope', 'ModelItem', '$state', 'ManageSdm','DateHelper',
        function($timeout, $window, $rootScope, $scope, ModelItem, $state, ManageSdm, DateHelper) {
            $scope.dataVOloaded = true;
            $scope.now = new Date();
            $scope.item ={};

            // ModelItem.get("Kesling/LaporanUjiHasil").then(function(data) {
            //     $scope.now = new Date();
            //     $scope.dataVOloaded = true;
            // }, function errorCallBack(err) {});
            // $scope.no = 1;
            // $scope.isSnap = true;
            // $scope.myChannel = {
            //     // the fields below are all optional
            //     videoWidth: '100%',
            //     videoHeight: '161',
            //     video: null // Will reference the video element on success
            // };
            // $scope.patOpts = { x: 0, y: 0, w: 25, h: 25 };
            // $scope.onSuccess = function() {
            //     // The video element contains the captured camera data
            //     $scope.$apply(function() {
            //         $scope.patOpts.w = $scope.myChannel.video.width;
            //         $scope.patOpts.h = $scope.myChannel.video.height;
            //         $scope.showDemos = true;
            //     });
            // };
            // $scope.retake = function() {
            //     $scope.isSnap = true;
            // }
            // $scope.makeSnapshot = function makeSnapshot() {
            //     $scope.isSnap = false;
            //     var patCanvas = document.querySelector('#snapshot');
            //     if (!patCanvas) return;
            //     patCanvas.width = $("#webcam").width();
            //     patCanvas.height = $("#webcam").height();
            //     var ctxPat = patCanvas.getContext('2d');
            //     var idata = getVideoData($scope.patOpts.x, $scope.patOpts.y, $("#webcam").width(), $("#webcam").height());
            //     ctxPat.putImageData(idata, 0, 0);

            //     sendSnapshotToServer(patCanvas.toDataURL());

            //     //  patData = idata;
            // };
            // var sendSnapshotToServer = function sendSnapshotToServer(imgBase64) {
            //     $scope.snapshotData = imgBase64;
            // };
            // var getVideoData = function getVideoData(x, y, w, h) {
            //     var hiddenCanvas = document.createElement('canvas');
            //     hiddenCanvas.width = $("#webcam").width();
            //     hiddenCanvas.height = $("#webcam").height();
            //     var ctx = hiddenCanvas.getContext('2d');
            //     ctx.drawImage($scope.myChannel.video, 0, 0, $("#webcam").width(), $("#webcam").height());
            //     return ctx.getImageData(x, y, w, h);
            // };
            // if ($state.params.noRec !== "") {
            //     $scope.item = JSON.parse($state.params.noRec);
            //     if ($scope.item.picture !== undefined) {

            //         $timeout(function() {
            //             $scope.isSnap = false;
            //             var patCanvas = document.querySelector('#snapshot');
            //             var canvas = patCanvas;
            //             var ctx = canvas.getContext("2d");
            //             ctx.width = 215;
            //             ctx.height = 164;
            //             var image = new Image();
            //             image.onload = function() {
            //                 ctx.drawImage(image, 0, 0);
            //             };
            //             image.src = $scope.item.picture;
            //             //debugger;
            //         })
            //     }
            //     $scope.isDisable = true;
            // } else {
            //     $scope.item = {};
            // }


            //adi tgl 07-jul-17, menambahkan fungsi untuk memanggil data di combobox 
            ManageSdm.getOrderList("rekrutmen-online/get-agama", true).then(function (dat) {
                $scope.listAgama = dat.data.data;
                // debugger;
            });

            ManageSdm.getOrderList("rekrutmen-online/get-jenis-kelamin", true).then(function (dat) {
                $scope.listJenisKelamin = dat.data.data;
                // debugger;
            });

            ManageSdm.getOrderList("rekrutmen-online/get-status-perkawinan", true).then(function (dat) {
                $scope.listStatusPerkawinan = dat.data.data;
                // debugger;
            });

            ManageSdm.getOrderList("rekrutmen-online/get-posisi-lamar", true).then(function (dat) {
                $scope.listPosisiLamar = dat.data.data;
                // debugger;
            });
            ManageSdm.getOrderList("rekrutmen-online/get-degree", true).then(function (dat) {
                $scope.listDegree = dat.data.data;
                // debugger;
            });
            ManageSdm.getOrderList("rekrutmen-online/get-jenis-organisasi", true).then(function (dat) {
                $scope.listJenisOrganisasi = dat.data.data;
                // debugger;
            });






        
            $scope.columnRiwayatPendidikan =
            {
            toolbar: [
                {name:"create", text:"Tambah"}
            ],
            columns:[
            {
                "field": "degree",
                "title": "Degree",
                "width": "15%",
                // "editable": false,
                "editor": degreeDropDown,
                "template": "#=degree.namaPendidikan#"
                // "template": "<input kendo-drop-down-list k-ng-model=\"item.degree\" k-data-text-field=\"'namaPendidikan'\" k-data-value-field=\"'id'\" k-data-source=\"listDegree\" style=\"width: 100%\" />"
            },
            {
                "field": "sekolah",
                "title": "Sekolah / Universitas",
                "width": "15%"
            },
            {
                "field": "jurusan",
                "title": "Jurusan",
                "width": "15%"
            },
            {
                "field": "tahunMasuk",
                "title": "Tahun Masuk",
                "width": "15%",
                "format": "{0:yyyy}",
                // "editor": $scope.tahunMDropDown
                "editor": tahunMDropDown,
                // "template": "#=tahunMasuk#"
                // "template": "<input kendo-drop-down-list k-ng-model=\"dataItem.tahunMasuk\" k-data-text-field=\"'tahunM'\" k-data-value-field=\"'idT'\" k-data-source=\"listTahunMasuk\"  k-on-change=\"\" style=\"width: 100%\" ></input>"
            },
            {
                "field": "tahunLulus",
                "title": "Tahun Lulus",
                "width": "15%",
                "format": "{0:yyyy}",
                "editor": $scope.tahunLDropDown
                // "template": "<input kendo-drop-down-list k-ng-model=\"dataItem.tahunLulus\" k-data-text-field=\"'tahunL'\" k-data-value-field=\"'idL'\" k-data-source=\"listTahunLulus\"  k-on-change=\"\" style=\"width: 100%\" ></input>"
            },
            {
                "field": "nilai",
                "title": "Nilai",
                "width": "15%"
            },
             {
                "command": "destroy",
                "title": "&nbsp;",
                "width": "10%"
            }
            ],
            editable:true
            };



            function degreeDropDown (container, options){
                // $("<input kendo-drop-down-list ng-model=\"item.degree\" name='" + options.field + "' k-data-text-field= \"'namaPendidikan'\" k-data-value-field=\"'namaPendidikan'\" k-data-source=\"listDegree\"  style=\"width: 100%\" >").appendTo(container)
                $('<input required name="' + options.field + '" />')
                    .appendTo(container)
                    .kendoDropDownList({
                        autoBind: false,
                        dataTextField: "namaPendidikan",
                        dataValueField: "id",
                        dataSource: $scope.listDegree
                    });
            }


            function tahunMDropDown (container, options){
                // $("<input kendo-drop-down-list name='" + options.field + "' k-ng-model=\"item.tahunMasuk\" k-data-text-field=\"'tahunM'\" k-data-value-field=\"'tahunM'\" k-data-source=\"listTahunMasuk\"  style=\"width: 100%\" >").appendTo(container)
                // $("<input kendo-date-picker k-options=\"yearSelected\" k-value=\"now\" k-ng-model=\"item.tahunMasuk\" k-format=\"'yyyy'\" style=\"width: 100%;\">").appendTo(container)
                // '<input k-ng-model=\"item.tahunMasuk\" data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>'
                $('<input k-ng-model=\"item.tahunMasuk\" data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>')
                    .appendTo(container)
                    .kendoDateTimePicker({
                         start: "decade",
                         depth: "decade"
                    });
            }

            $scope.tahunLDropDown = function (container, options){
                // $("<input kendo-drop-down-list name='" + options.field + "' k-ng-model=\"item.tahunLulus\" k-data-text-field=\"'tahunL'\" k-data-value-field=\"'tahunL'\" k-data-source=\"listTahunLulus\"  style=\"width: 100%\" >").appendTo(container)
                 $('<input k-ng-model=\"item.tahunKeluar\" data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>')
                    .appendTo(container)
                    .kendoDateTimePicker({
                         start: "decade",
                         depth: "decade"
                    });
            };


            $scope.gridRiwayatPd = new kendo.data.DataSource({
                data:[],
                schema:{
                    model:{
                        fields:{
                            degree:{
                                // editable:true,
                                // validation: {required:true},
                                defaultValue :  {id: 13, namaPendidikan: "--Pilih"}
                            },
                            sekolah:{type:"string", validation: {required:true}},
                            jurusan:{type:"string", validation: {required:true}},
                            tahunMasuk:{
                                editable:true,
                                validation: {required: true}
                            },
                            tahunLulus:{
                                editable:true,
                                validation: {required: true}
                            },
                            nilai:{type:"number", min:0, validation: {required:true}}
                        }
                    }
                }

            });



            $scope.columnRiwayatOrganisasi = 
            {
            toolbar: [
                {name:"create", text:"Tambah"}
            ],
            columns: [
            {
                "field": "namaOrganisasi",
                "title": "Nama Organisasi",
                "width": "15%"
            },
            {
                "field": "jenisOrganisasi",
                "title": "Jenis Organisasi",
                "width": "15%",
                "editor": jenisOrgDropDown,
                "template": "#=jenisOrganisasi.jenisOrganisasi#"
            },
            {
                "field": "jabatan",
                "title": "Jabatan",
                "width": "15%"
            },
            {
                "field": "tanggalMasuk",
                "title": "Tanggal Masuk",
                "width": "15%",
                "format": "{0:dd-MMM-yyyy}",
                "editor": $scope.tglMDropDown
                // "template": "<input kendo-drop-down-list k-ng-model=\"dataItem.tglMasuk\" k-data-text-field=\"'tglMasuk'\" k-data-value-field=\"'id'\" k-data-source=\"listTglMasuk\"  k-on-change=\"\" style=\"width: 100%\" ></input>"
            },
            {
                "field": "tanggalKeluar",
                "title": "Tanggal Keluar",
                "width": "15%",
                "format": "{0:dd-MMM-yyyy}",
                "editor": $scope.tglKDropDown
                // "template": "<input kendo-drop-down-list k-ng-model=\"dataItem.tglKeluar\" k-data-text-field=\"'tglKeluar'\" k-data-value-field=\"'id'\" k-data-source=\"listTglKeluar\"  k-on-change=\"\" style=\"width: 100%\" ></input>"
            },
             {
                "command": "destroy",
                "title": "&nbsp;",
                "width": "10%"
            }
            ],
            editable: true
            };

             $scope.gridRiwayatOrg = new kendo.data.DataSource({
                data:[],
                schema:{
                    model:{
                        fields:{
                            namaOrganisasi:{type:"string", validation: {required:true}},
                            jenisOrganisasi:{
                                defaultValue :  {id: 0, jenisOrganisasi: "--Pilih"}
                            },
                            jabatan:{type:"string", validation: {required:true}},
                            tanggalMasuk:{
                                editable:true,
                                // type:"string",
                                validation: {required: true}
                            },
                            tanggalKeluar:{
                                editable:true,
                                // type:"string",
                                validation: {required: true}
                            }
                        }
                    }
                }

            });


            function jenisOrgDropDown (container, options){
               
                $('<input required name="' + options.field + '" />')
                    .appendTo(container)
                    .kendoDropDownList({
                        autoBind: false,
                        dataTextField: "jenisOrganisasi",
                        dataValueField: "id",
                        dataSource: $scope.listJenisOrganisasi
                    });
            }




             $scope.tglMDropDown = function (container, options){
                // $("<input kendo-drop-down-list name='" + options.field + "' k-ng-model=\"dataItem.tahunMasuk\" k-data-text-field=\"'tglMasuk'\" k-data-value-field=\"'tglMasuk'\" k-data-source=\"listTglMasuk\"  style=\"width: 100%\" >").appendTo(container)
                $('<input k-ng-model=\"item.tglMasuk\" data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>')
                    .appendTo(container)
                    .kendoDateTimePicker({
                         // start: "decade",
                         // depth: "decade"
                    });
             }
             $scope.tglKDropDown = function (container, options){
                // $("<input kendo-drop-down-list name='" + options.field + "' k-ng-model=\"dataItem.tahunlLulus\" k-data-text-field=\"'tglKeluar'\" k-data-value-field=\"'tglKeluar'\" k-data-source=\"listTglKeluar\"  style=\"width: 100%\" >").appendTo(container)
                $('<input k-ng-model=\"item.tglKeluar\" data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>')
                    .appendTo(container)
                    .kendoDateTimePicker({
                         // start: "decade",
                         // depth: "decade"
                    });
             }



            $scope.columnRiwayatPekerjaan =
            {
            toolbar: [
                {name:"create", text:"Tambah"}
            ],
            columns: [
            {
                "field": "namaInstansi",
                "title": "Nama Instansi",
                "width": "15%"
            },
            {
                "field": "alamatInstansi",
                "title": "Alamat Instansi",
                "width": "15%"
            },
            {
                "field": "noTlpInstansi",
                "title": "No Tlp Instansi",
                "width": "13%"
                // "editor": $scope.noPhoneInputT
            },
            {
                "field": "jabatan",
                "title": "Jabatan",
                "width": "15%"
            },
            {
                "field": "departemen",
                "title": "Departemen",
                "width": "15%"
            },
            {
                "field": "gajiPerBln",
                "title": "Gaji / Bln",
                "width": "10%"
            },
            {
                "field": "tglMasuk",
                "title": "Tgl Masuk",
                "width": "15%",
                "format": "{0:dd-MMM-yyyy}",
                "editor": $scope.tglMKerjaDropDown 
                // "template": "<input kendo-drop-down-list k-ng-model=\"dataItem.tglMasuk\" k-data-text-field=\"'tglMasuk'\" k-data-value-field=\"'id'\" k-data-source=\"listTglMasuk\"  k-on-change=\"\" style=\"width: 100%\" ></input>"
            },
            {
                "field": "tglKeluar",
                "title": "Tgl Keluar",
                "width": "15%",
                "format": "{0:dd-MMM-yyyy}",
                "editor": $scope.tglKkerjaDropDown
                // "template": "<input kendo-drop-down-list k-ng-model=\"dataItem.tglKeluar\" k-data-text-field=\"'tglKeluar'\" k-data-value-field=\"'id'\" k-data-source=\"listTglKeluar\"  k-on-change=\"\" style=\"width: 100%\" ></input>"
            },
            {
                "field": "alasanKeluar",
                "title": "Alasan Keluar",
                "width": "15%"
            },
             {
                "command": "destroy",
                "title": "&nbsp;",
                "width": "10%"
            }
            ],
            editable:true
            };



             $scope.gridRiwayatPkj = new kendo.data.DataSource({
                data:[],
                schema:{
                    model:{
                        fields:{
                            namaInstansi:{type:"string", validation: {required:true}},
                            alamatInstansi:{type:"string", validation: {required:true}},
                            noTlpInstansi:{ type:"numeric", validation: {required:true}},
                            jabatan:{type:"string", validation: {required:true}},
                            departemen:{type:"string", validation: {required:true}},
                            gajiPerBln:{type:"number", validation: {required:true}},
                            tglMasuk:{
                                editable:true,
                                //type:"string",
                                validation: {required: true}
                            },
                            tglKeluar:{
                                editable:true,
                                //type:"string",
                                validation: {required: true}
                            },
                            alasanKeluar:{type:"string", validation: {required:true}}
                        }
                    }
                }

            });




             $scope.tglMKerjaDropDown = function (container, options){
                // $("<input kendo-drop-down-list name='" + options.field + "' k-ng-model=\"item.tahunMasukKerja\" k-data-text-field=\"'tglMasuk'\" k-data-value-field=\"'tglMasuk'\" k-data-source=\"listTglMasukKerja\"  style=\"width: 100%\" >").appendTo(container)
                $('<input k-ng-model=\"item.tglMasukKerja\" data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>')
                    .appendTo(container)
                    .kendoDateTimePicker({
                    });
             }
             $scope.tglKkerjaDropDown = function (container, options){
                // $("<input kendo-drop-down-list name='" + options.field + "' k-ng-model=\"item.tahunlKeluarKerja\" k-data-text-field=\"'tglKeluar'\" k-data-value-field=\"'tglKeluar'\" k-data-source=\"listTglKeluarKerja\"  style=\"width: 100%\" >").appendTo(container)
                $('<input k-ng-model=\"item.tglKeluarKerja\" data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>')
                    .appendTo(container)
                    .kendoDateTimePicker({
                    });
             }

             $scope.noPhoneInputT = function (container, options){
                $("<input c-text-box type=\"input\" filter=\"'numeric'\" id=\"noPhone\" data-text-field=\"noTlpInstansi\" k-data-value-field=\"noTlpInstansi\" name='"+ options.field +"'/>")
                .appendTo(container)
             }
             



            $scope.columnRiwayatPrestasi = 
             {
            toolbar: [
                {name:"create", text:"Tambah"}
            ],
            columns: [
            {
                "field": "namaPenghargaan",
                "title": "Nama Penghargaan",
                "width": "15%"
            },
            {
                "field": "deskripsiPenghargaan",
                "title": "Deskripsi Penghargaan",
                "width": "15%"
            },
            {
                "field": "tanggalTddPiagam",
                "title": "Tanggal TTD Piagam",
                "width": "15%",
                "format": "{0:dd-MMM-yyyy}",
                "editor": $scope.tglPiagamDropDown
                // "template": "<input kendo-drop-down-list k-ng-model=\"dataItem.tglTddPiagam\" k-data-text-field=\"'tglTtdPiagam'\" k-data-value-field=\"'id'\" k-data-source=\"listTglTddPiagam\"  k-on-change=\"\" style=\"width: 100%\" ></input>"
            },
            {
                "field": "totalHadiah",
                "title": "Total Hadiah",
                "width": "15%"
            },
            {
                "field": "namaInstansiPemberi",
                "title": "Nama Instansi Pemberi",
                "width": "15%"
            },
            {
                "field": "tglPemberian",
                "title": "Tgl Pemberian",
                "width": "15%",
                "format": "{0:dd-MMM-yyyy}",
                "editor": $scope.tglPemDropDown
                // "template": "<input kendo-drop-down-list k-ng-model=\"dataItem.tglPemberian\" k-data-text-field=\"'tglPemberian'\" k-data-value-field=\"'id'\" k-data-source=\"listTglPemberian\"  k-on-change=\"\" style=\"width: 100%\" ></input>"
            },
            {
                "field": "lokasiTempatPemberian",
                "title": "Lokasi Tempat Pemberian",
                "width": "15%"
            },
             {
                "command": "destroy",
                "title": "&nbsp;",
                "width": "10%"
            }
            ],
            editable:true
            };

            $scope.gridRiwayatPs = new kendo.data.DataSource({
                data:[],
                schema:{
                    model:{
                        fields:{
                            namaPenghargaan:{type:"string", validation: {required:true}},
                            deskripsiPenghargaan:{type:"string", validation: {required:true}},
                            tanggalTddPiagam:{
                                editable:true, 
                                //type:"string",
                                validation: {required:true}
                            },
                            totalHadiah:{type:"number", validation: {required:true}},
                            namaInstansiPemberi:{type:"string", validation: {required:true}},
                            tglPemberian:{
                                editable:true,
                                //type:"string",
                                validation: {required:true}
                            },
                            lokasiTempatPemberian:{type:"string", validation: {required:true}}
                        }
                    }
                }

            });


            $scope.tglPiagamDropDown = function (container, options){
                // $("<input kendo-drop-down-list name='" + options.field + "' k-ng-model=\"item.tglPiagam\" k-data-text-field=\"'tglTddPiagam'\" k-data-value-field=\"'tglTddPiagam'\" k-data-source=\"listTglPiagam\"  style=\"width: 100%\" >").appendTo(container)
                $('<input k-ng-model=\"item.tglPiagam\" data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>')
                    .appendTo(container)
                    .kendoDateTimePicker({
                    });
             }
             $scope.tglPemDropDown = function (container, options){
                // $("<input kendo-drop-down-list name='" + options.field + "' k-ng-model=\"item.tglPemberian\" k-data-text-field=\"'tglPemberian'\" k-data-value-field=\"'tglPemberian'\" k-data-source=\"listTglPemberian\"  style=\"width: 100%\" >").appendTo(container)
                $('<input k-ng-model=\"item.tglPemberian\" data-text-field="' + options.field + '" data-value-field="' + options.field + '" data-bind="value:' + options.field + '" data-format="' + options.format + '"/>')
                    .appendTo(container)
                    .kendoDateTimePicker({
                });
             }






            $scope.monthSelectorOptions = {
                start: "year",
                depth: "year"
            };



            $("#dHide").hide();
            // $scope.show = function(){
            //     $("#bupload").on('click',function(){
            //         $("#dHide").show();
            //     });
            // };

            //fungsi ambil tahun format yyyy
            $scope.yearSelected = { 
                start: "decade", 
                depth: "decade" 
            };


            $scope.upload = function() {

                var files = document.getElementById("filePicker");
                var file = files.files[0];
                //debugger;

                if (files && file) {
                    var reader = new FileReader();

                    reader.onload = function(readerEvt) {
                        var binaryString = readerEvt.target.result;
                        var fileInput = {
                            "fileInput" : btoa(binaryString)
                            
                        } 
                            //debugger; 
                            var kategoripegawai   = $scope.item.statusPegawai.id ;  
                            var jenisgaji  =  $scope.item.jenisGaji.id; 
                            var periode =  moment($scope.item.periode).format("MM-YYYY");   

                            //debugger;                        
                            PengajuanUsulanAnggaranService.savePengajuan(fileInput,"pay-roll/import-uang-makan?idKategoryPegawai="+kategoripegawai+"&idJenisGaji="+jenisgaji+"&periode="+periode).then(function(dat){
                            //debugger;
                            console.log(fileInput);
                            $scope.sourceOrder =new kendo.data.DataSource({
                                    data: dat.data.data
                            }); 
                            
                            $scope.item.nomorUangMakan = dat.data.data[0].noGaji;

                            
                        })
                    };

                    reader.readAsBinaryString(file);
                }
            };



            $scope.onSelect = function(e){

                //debugger;
                var datex = $.map(e.files, function(file){ return file.extension; });
                var datr = $.map(e.files, function(file){return file.rawFile; });
                var files = datex[0];
                var file = datr[0];

                if (files && file){
                    var reader = new FileReader();
                    reader.onload = function(readerEvt){
                        var binaryString = readerEvt.target.result;
                        $scope.item.urlDokumen = btoa(binaryString);
                        // $scope.item.extension = files.substring(1);
                    };
                }
                reader.readAsBinaryString(file);

            };

            $scope.save = function(){
                var listRawRequired = [
                    // "item.noPeserta|ng-model|No Peserta",
                    "item.namaLengkap|ng-model|Nama Lengkap",
                    "item.jenisKelamin|k-ng-model|Jenis Kelamin",
                    "item.noKTP|ng-model|No KTP yang Berlaku",
                    "item.tempatLahir|ng-model|Tempat Lahir",
                    "item.tanggalLahir|k-ng-model|Tanggal Lahir",
                    "item.agama|k-ng-model|Agama",
                    "item.status|k-ng-model|Status Pernikahan",
                    "item.alamat|ng-model|Alamat",
                    "item.nomorHP|ng-model|No HP",
                    "item.email|ng-model|Email",
                    "item.posisiLamar|k-ng-model|Posisi yang Dilamar",
                    "item.periodeLamaran|k-ng-model|Periode lamaran"
                ];

                //validasi inputannya
                var isValid = ModelItem.setValidation($scope, listRawRequired);

                if (isValid.status){
                     //debugger;
                    var datPd = $scope.gridRiwayatPd._data;
                    var datPo = $scope.gridRiwayatOrg._data;
                    var datPk = $scope.gridRiwayatPkj._data;
                    var datPs = $scope.gridRiwayatPs._data; 
                    var data;
                    var data2;
                    var data3;
                    var data4;
                    var i=0;
                    var j=0;
                    var k=0;
                    var m=0;
                    var dataGridPd = [];
                    var dataGridPo = [];
                    var dataGridPk = [];
                    var dataGridPs = [];


                    datPd.forEach(function(data) {
                       var datas ={
                                "degreeId":data.degree.id,
                                "degree":data.degree.namaPendidikan,
                                "universitas":data.sekolah,
                                "jurusan":data.jurusan,
                                "tahunMasuk":moment(data.tahunMasuk).format("YYYY"),
                                "tahunLulus":moment(data.tahunLulus).format("YYYY"),
                                "nilai":data.nilai
                            }
                            dataGridPd[i]=datas;
                            i++;
                           
                    });


                    datPo.forEach(function(data2){
                        var dataPo ={
                            "namaOrganisasi":data2.namaOrganisasi,
                            "jenisOrganisasiId":data2.jenisOrganisasi.id,
                            "jenisOrganisasi":data2.jenisOrganisasi.jenisOrganisasi,
                            "jabatan":data2.jabatan,
                            "tglMasuk":moment(data2.tanggalMasuk).format("YYYY-MM-DD"),
                            "tglKeluar": moment(data2.tanggalKeluar).format("YYYY-MM-DD")
                        }
                        dataGridPo[j]=dataPo;
                        j++; 
                    })

                    datPk.forEach(function(data3){
                        var dataPk = {
                            "namaInstansi":data3.namaInstansi,
                            "alamatInstansi":data3.alamatInstansi,
                            "noTelpInstansi":data3.noTlpInstansi,
                            "jabatanInstansi":data3.jabatan,
                            "departemenInstansi":data3.departemen,
                            "private Double gajiPerBulan":data3.gajiPerBln,
                            "tglMasuk":moment(data3.tglMasuk).format("YYYY-MM-DD"),
                            "tglKeluar":moment(data3.tglKeluar).format("YYYY-MM-DD"),
                            "alasanKeluar":data3.alasanKeluar,
                        }
                        dataGridPk[k]=dataPk;
                        k++;

                    })

                    datPs.forEach(function(data4){
                        var dataPs = {
                            "namaPenghargaan":data4.namaPenghargaan,
                            "deskripsiPenghargaan":data4.deskripsiPenghargaan,
                            "private Double totalHadiah":"",
                            "namaInstansiPemberi":data4.namaInstansiPemberi,
                            "tglPemberian":moment(data4.tglPemberian).format("YYYY-MM-DD"),
                            "tglTtPiagam":moment(data4.tanggalTddPiagam).format("YYYY-MM-DD"),
                            "lokasiTempatPemberian":data4.lokasiTempatPemberian
                        }
                        dataGridPs[m]=dataPs;
                        m++;
                    })

                    var dataAll = {
                        "namaLengkap":$scope.item.namaLengkap,
                        "jenisKelaminId":$scope.item.jenisKelamin.id,
                        "jenisKelamin":$scope.item.jenisKelamin.jenisKelamin,
                        "noKtp":$scope.item.noKTP,
                        "tempatLahir":$scope.item.tempatLahir,
                        "tglLahir":moment($scope.item.tanggalLahir).format("YYYY-MM-DD"),
                        "agamaId":$scope.item.agama.id,
                        "agama":$scope.item.agama.agama,
                        "statusPerkawinanId":$scope.item.status.id,
                        "statusPerkawinan":$scope.item.status.statusPerkawinan,
                        "alamat":$scope.item.alamat,
                        "noHp":$scope.item.nomorHP,
                        "email":$scope.item.email,
                        "posisiLamarId":$scope.item.posisiLamar.id,
                        "posisiLamar":$scope.item.posisiLamar.posisiLamar,
                        "periodeLamar":moment($scope.item.periodeLamaran).format("MM-YYYY"),
                        "setDokumenLamaran" : [
                            {
                                "namaDokumen":$scope.item.urlDokumen
                            }   
                        ],
                        "setRiwayatPendidikan":dataGridPd,
                        "setRiwayatOrganisasiDto":dataGridPo,
                        "setRiwayatPekerjaanDto":dataGridPk,
                        "setRiwayatPrestasiDto":dataGridPs
                    }

                    ManageSdm.savePelaksanaanSeleksi(dataAll,"rekrutmen-online/save-registrasi-pelamar").then(function(e) {

                         $timeout(function () {
                            $window.location.reload();
                        }, 5500);

                     });


                } else{
                    ModelItem.showMessages(isValid.messages);
                }

               
            };



        }
    ]);
});