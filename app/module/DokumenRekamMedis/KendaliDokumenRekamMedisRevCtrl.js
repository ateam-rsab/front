define(['initialize', 'Configuration'], function(initialize, configuration) {
    'use strict';
    initialize.controller('KendaliDokumenRekamMedisRevCtrl', ['$q', '$scope', 'ManageSarprasPhp', 'ModelItem', '$state', '$rootScope', '$timeout', '$window', 'ManagePasien', 'FindPasien', 'DateHelper', 'CetakHelper', 'ModelItem',
        function($q, $scope,manageSarprasPhp, modelItem, $state, $rootScope, $timeout, $window, managePasien, findPasien, dateHelper, cetakHelper, ModelItem) {
            $scope.title = "Kendali Dokumen Rekam Medis";
            $scope.subTitleKiri = "Registrasi";
            $scope.now = new Date();
            $scope.items = {
                start: $scope.now,
                end: $scope.now,
            }
             $scope.dataItem={};
            $scope.isRouteLoading=false;
            $scope.item={};
            $scope.editable = true;
            postRensarPRM();
            function postRensarPRM() {
                $q.all([
                    manageSarprasPhp.saveDataTransaksi('rensar/post-pengembalian-dok-rm'),
                ]).then(function (res) {
                })
            }
            // ModelItem.getDataDummyGeneric("StatusKendaliDokumen").then(function(data){
            // // $scope.listStatus = data
            // // $scope.dataItem.statusKendaliDokumen={id:$scope.listStatus[2].id,name:$scope.listStatus[2].name}
            // })
                $scope.tglKembaliSkrg = new Date();
          

            $scope.reloadGridKendali = function(noRm){
                findPasien.getDaftarKendali(noRm, '', '', '', '').then(function(e){
                    $scope.gridDaftarKendali =  new kendo.data.DataSource({
                        data: e.data.data.data,
                        pageable: true,
                        pagesize: 20,
                        schema: {
                            model: {
                                id: "noRec",
                                fields: {
                                    noRec: {editable: false},
                                    statusEnabled: {editable: false, defaultValue: true},
                                    keUnit: {type: "string", validation: { required: true }},
                                    dariUnit: {type: "string", validation: { required: true }},
                                    tglUpdate: {validation: { required: true }},
                                    kdProfile: {type: "number", editable: false, defaultValue: 0},
                                    statusKendaliDokumen: {validation: { required: true }},
                                    pasienId: {editable: false, type: "number", validation: { required: true }},
                                    tglKembali: {nullable: true }
                                }
                            }
                        }
                    })
                })
            }
         
            $scope.findBynoCM = function(){

                loadData()
               //   $scope.cboDiagnosa=false;
               //   $scope.cboDiagnosa1=false;
               // $scope.cboInputDiagnosa = true;
            }

            function loadData(){

                $scope.isRouteLoading=true;
                var noCm =""
                if ( $scope.noCm != undefined){
                    var noCm ="noCm=" + $scope.noCm
                }
                
                manageSarprasPhp.getDataTableTransaksi("dokumenrm/get-data-combo-kdrm?", false).then(function(data) {
                    $scope.listRuangan = data.data.ruangan;
                    $scope.listRuangan2 = data.data.ruangan;
                    $scope.listRuangan3 = data.data.ruangan;                    
                    $scope.listRuangan1 = data.data.ruangan;
                    $scope.listStatus = data.data.dataStatusKendali
                })
                // var noReg =""
                // if ($scope.item.noRegistrasi != undefined){
                //     var noReg ="noReg=" +$item.noRegistrasi
                // }   

                $q.all([
                    manageSarprasPhp.getDataTableTransaksi("dokumenrm/get-pasien-by-nocm?"
                       +noCm),
                    ]).then(function(e) {
                      
                        // var datas = e[0].data.datas;
                        var datas = e[0].data;
                        $scope.item.namaPasien = datas.namapasien;
                        $scope.item.tempatLahir = datas.tempatlahir;
                        $scope.item.tglLahir = datas.tgllahir;
                        $scope.item.alamatLengkap = datas.alamatlengkap;
                        $scope.item.noTelepon = datas.notelepon;
                        $scope.item.namaKeluarga = datas.namakeluarga;
                        $scope.item.namaIbu = datas.namaibu;
                        $scope.noCMFK = datas.nocmfk;
                        getPasienDaftar();
                        getDaftarKendaliDok();
                                            
                    });
                    function getPasienDaftar(){
                         var nocmfk="nocmfk="+ $scope.noCMFK;
                            manageSarprasPhp.getDataTableTransaksi("dokumenrm/get-daftar-registrasi?"
                               +nocmfk).then(function(dat) {                           
                                $scope.listRegis = new kendo.data.DataSource({
                                    data: dat.data.data,
                                    pagesize: 5,
                                });

                        });
                    }
                      function getDaftarKendaliDok(){
                        var nocmfk="nocmfk="+ $scope.noCMFK;
                        manageSarprasPhp.getDataTableTransaksi("dokumenrm/get-daftar-kendali-dokumen?"
                               +  nocmfk).then(function(datz) {    
                                 $scope.isRouteLoading=false;                       
                                $scope.gridDaftarKendali = new kendo.data.DataSource({
                                    data: datz.data.data,
                                    pagesize:5,
                                });

                        });
                               $scope.getdataKdrm= $scope.gridDaftarKendali;
                    }
                };
                $scope.gridDaftarRegistrasis = [
                {
                    field: "noregistrasi",
                    title: "No. Registrasi",
                    width: "100px"
                }, 
                {
                    field: "tglregistrasi", 
                    title: "Tgl Registrasi",
                     width: "100px",
                     template: "#if (tglregistrasi) {# #= new moment(tglregistrasi).format(\'DD-MM-YYYY HH:mm\')# #} else {# - #} #",
                }, 
                {
                    field: "namaruangan",
                    title: "Ruangan Pelayanan",
                    // aggregates: ["count"],
                    // groupHeaderTemplate: "Ruangan #= value # (Jumlah: #= count#)",
               
                }
               
            ];
            // $scope.find = function(noRm){
            //     $scope.currentRm = noRm;
            //     if (noRm) {
            //         $q.all([findPasien.findByNoCM(noRm),
            //             findPasien.getAntrianKendali(noRm, '', ''),
            //             findPasien.getDaftarKendali(noRm, '', '', '', '')
            //         ]).then(function(e){
            //             if (e[0].statResponse) {
            //                 $scope.item = e[0].data.data;
            //                 $scope.item.tglLahir = new Date($scope.item.tglLahir);
            //             }
            //             if (e[1].statResponse) {
            //                 $scope.listRegistrasi = new kendo.data.DataSource({
            //                     data: e[1].data.data,
            //                     pageable: true,
            //                     pagesize: 20
            //                 })
            //             }
            //             if (e[2].statResponse) {
            //                 $scope.gridDaftarKendali =  new kendo.data.DataSource({
            //                     data: e[2].data.data.data,
            //                     pageable: true,
            //                     pagesize: 20,
            //                     schema: {
            //                         model: {
            //                             id: "noRec",
            //                             fields: {
            //                                 noRec: {editable: false},
            //                                 statusEnabled: {editable: false, defaultValue: true},
            //                                 keUnit: {type: "string", validation: { required: true }},
            //                                 dariUnit: {type: "string", validation: { required: true }},
            //                                 tglUpdate: {validation: { required: true }, default: $scope.now},
            //                                 kdProfile: {type: "number", editable: false, defaultValue: 0},
            //                                 statusKendaliDokumen: {validation: { required: true }},
            //                                 pasienId: {editable: false, type: "number", validation: { required: true }},
            //                                 tglKembali: {nullable: true }
            //                             }
            //                         }
            //                     }
            //                 })
            //             }
            //        });
            //        $scope.editable = true;
            //     } else {
            //         messageContainer.error('No CM belum diisi')
            //     }
            // }
            $scope.findRekap = function(){

                $scope.isRouteLoading=true;
                var tglAwal = moment($scope.items.start).format('YYYY-MM-DD HH:mm:ss');
                var tglAkhir = moment($scope.items.end).format('YYYY-MM-DD HH:mm:ss');

                var cm =""
                if ($scope.items.noCm != undefined){
                    var cm ="&noCm=" +$scope.items.noCm
                }   
                var ruangan =""
                if ($scope.items.ruangan != undefined){
                    var ruangan ="&unit=" +$scope.items.ruangan
                }
                var statusId =""
                if ($scope.items.status != undefined){
                    var statusId ="&statusId=" +$scope.items.status.id
                }
                manageSarprasPhp.getDataTableTransaksi("dokumenrm/get-daftar-kendali-dokumen?"+
                        "tglAwal="+tglAwal+
                        "&tglAkhir="+tglAkhir+
                        cm+ruangan+statusId).then(function(datazz) {
                        $scope.isRouteLoading=false;
                        $scope.gridDaftarKendali = new kendo.data.DataSource({
                                    data: datzz.data.data,
                                    pagesize:5,
                                });

                        // $scope.gridDaftarKendali = datazz.data.data;
                   
                    });

            
                // var noCm = $scope.items.noCm,
                //     start = $scope.items.start,
                //     end = $scope.items.end,
                //     ruangan = $scope.items.ruangan,
                //     status = $scope.items.status;

                // if (!noCm) {
                //    noCm = ''
                // }
                // if (!start) {
                //    start = ''
                // } else {
                //     start = dateHelper.formatDate(start, 'YYYY-MM-DD HH:mm')
                // }
                // if (!end) {
                //    end = ''
                // } else {
                //     end = dateHelper.formatDate(end, 'YYYY-MM-DD HH:mm')
                // }
                // if (!ruangan) {
                //     ruangan = ''
                // }
                // if (!status) {
                //     status = ''
                // } else {
                //     status = status.id 
                // }
                // findPasien.getDaftarKendali(noCm, start, end, ruangan, status).then(function(e){
                //     $scope.gridDaftarKendali =  new kendo.data.DataSource({
                //         data: e.data.data.data,
                //         pageable: true,
                //         pagesize: 20,
                //         schema: {
                //             model: {
                //                 id: "noRec",
                //                 fields: {
                //                     noRec: {editable: false},
                //                     statusEnabled: {editable: false, defaultValue: true},
                //                     keUnit: {type: "string", validation: { required: true }},
                //                     dariUnit: {type: "string", validation: { required: true }},
                //                     tglUpdate: {validation: { required: true }},
                //                     kdProfile: {type: "number", editable: false, defaultValue: 0},
                //                     statusKendaliDokumen: {validation: { required: true }},
                //                     pasienId: {editable: false, type: "number", validation: { required: true }},
                //                     tglKembali: {nullable: true }
                //                 }
                //             }
                //         }
                //     })
                // })
                // $scope.editable = false;
            }

            $scope.gridKendaliDokRM = {
                dataSource:$scope.gridDaftarKendali,
                pageable: true,
                selectable: "row",
                save: function(e){
                    var tglUpdate = e.model.tglupdate,
                        tglKembali = $scope.tglKembaliSkrg;
                    var data = {
                        "norec_kdr": e.model.norec_kdr,
                        "keunit": $scope.item.keUnit,
                        "dariunit": $scope.item.dariUnit,
                        "tglupdate":  moment(tglUpdate).format('YYYY-MM-DD HH:mm:ss'),
                        // "statusEnabled":e.model.statusEnabled,
                        // "kdProfile": e.model.kdProfile,
                        "objectstatuskendalidokumenfk":$scope.item.statusKendaliDokumen.id,
                        "nocmfk": e.model.nocmfk,
                        "tglkembali": moment(tglKembali).format('YYYY-MM-DD HH:mm:ss'),
                    };
                 
                    // manageSarprasPhp.saveKendaliDokumenRm(data).then(function(e){
                    //         $scope.findBynoCM(); 
                    //     // if (e.data.data.norec){
                    //     //     debugger;
                    //     //     $scope.reloadGridKendali($scope.currentRm);   
                    //     // }
                    //     // delete $scope.dataItem;
                    //     // $scope.winDialog.close();
                    // })
                },
                columns: [{
                    "field": "tglkeluar",
                    "title": "Tgl/Jam Keluar",
                    // "template": "#= kendo.toString(new Date(tglkeluar), 'dd-MM-yyyy HH:mm') #",
                    "width": 120
                }, 
                {
                    "field": "nocm",
                    "title": "No. MR",
                  
                }, 
                // {
                //     "field": "dariunit",
                //     "title": "Unit Asal"
                // }, 
                // {
                //     "field": "keunit",
                //     "title": "Unit Tujuan"
                // }, 
                {
                    "field": "ruanganasal",
                    "title": "Unit Asal",
                    "width": 100
                }, 
                {
                    "field": "ruangantujuan",
                    "title": "Unit Tujuan",
                    "width": 100
                },
                {
                    "field": "catatan",
                    "title": "Catatan",
                    "width": 150
                },
                {
                    "field": "name",
                    "title": "Status",
                    // "template": '# if( name==null) {# - # } else {# #= statusKendaliDokumen.name # #} #'
                }, {
                    "field": "kembali",
                    "title": "Kembali",
                    // "template": '# if( tglKembali==null) {#<span class="center">Belum<span># } else {#<span class="center">Sudah<span>#} #'
                }, {
                    "field": "tglkembali",
                    "title": "Tgl/Jam Kembali",
                    // "template": '# if( tglkembali==null) {#<span class="center">-<span># } else {#<span>#= kendo.toString(new Date(tglkembali), "dd-MM-yyyy HH:mm") #<span>#} #',
                    "width": 120
                },
                // }, { 
                //     command: { text: "Edit", click: editGrid },

                //     // "command": ["edit"],
                //     title: " ",
                //     width: "80px" 
                // }],
                ],
                toolbar: [
                {
                    "name": "add",
                    "text": "Tambah Kendali",
                    "template": '<a ng-click="onClick()" class="k-button k-button-icontext k-grid-upload">Tambah Kendali</a>'	
                },
                 {
                    "name": "edit",
                    "text": "Edit",
                    "template": '<a ng-click="editGrid()" class="k-button k-button-icontext k-grid-upload">Edit Kendali</a>'   
                }
                ],
                editable: {
                    mode: "popup",
                    window: {
                        title: "Update Data Kendali Dokumen",
                        // resizable: true,
                        // modal: false,
                        // draggable: true,
                        // visible: true
                    },
                    // template: kendo.template($("#popup_editor").html())
                }
            }
            $scope.editGrid=function(){
                    if ($scope.current==undefined){
                        window.messageContainer.error("Pilih data dulu")
                        return
                    }
                    else
                    {
                        manageSarprasPhp.getDataTableTransaksi("dokumenrm/get-data?+norec="+$scope.current.norec_kdr, false).then(function(data) {
                            var datakendali = data.data.datakendali[0]

                            $scope.item.dariUnit=$scope.current.dariunit;
                            $scope.item.keUnit=$scope.current.keunit;
                            // $scope.item.statusKendaliDokumen= {id:datakendali.objectstatuskendalidokumenfk, name:datakendali.name}
                            $scope.item.statusKendaliDokumen={id:$scope.listStatus[6].id,name:$scope.listStatus[6].name};
                            $scope.item.ruangan2={id:datakendali.objectruanganasalfk, namaruangan:datakendali.ruanganasal}
                            $scope.item.ruangan3={id:datakendali.objectruangantujuanfk, namaruangan:datakendali.ruangantujuan}
                            $scope.item.Catatan = datakendali.catatan
                            $scope.tglJamSkrg = new Date();                                
                        })
                      
                      $scope.popup_editor.center().open(); 
                    }

           }
            $scope.update = function() {
                    var tglUpdate = $scope.current.tglupdate;

                    var catatan="-";
                    if ($scope.item.Catatan != undefined) {
                        catatan=$scope.item.Catatan;
                    } 

                    var nocmfk=''
                    if ($scope.noCMFK!=undefined)
                        nocmfk=$scope.noCMFK;
                    else
                        nocmfk='';

                    var tglkembali=null;
                    if ($scope.item.statusKendaliDokumen.name == "SELESAI") {
                         tglkembali=moment($scope.item.tglKembaliSkrg).format('YYYY-MM-DD HH:mm');
                    }

                    var tglkeluar=null;
                    if ($scope.item.statusKendaliDokumen.name != "SELESAI") {
                        tglkeluar=moment($scope.item.tglKembaliSkrg).format('YYYY-MM-DD HH:mm');
                    }    

                    if($scope.item.statusKendaliDokumen.name == "SELESAI"){
                            var data = {
                            "norec_kdr": $scope.current.norec_kdr,
                            "keunit": $scope.item.keUnit,
                            "dariunit": $scope.item.dariUnit,
                            "tglupdate":  moment($scope.tglJamSkrg).format('YYYY-MM-DD HH:mm:ss'),
                            "objectruanganasalfk": $scope.item.ruangan2.id,
                            "objectruangantujuanfk": $scope.item.ruangan3.id,
                            // "statusEnabled":e.model.statusEnabled,
                            // "kdProfile": e.model.kdProfile,
                            "objectstatuskendalidokumenfk":$scope.item.statusKendaliDokumen.id,
                            "nocmfk": $scope.current.nocmfk,
                            "tglkembali": tglkembali,
                            "catatan": catatan
                            // "tglkeluar": tglkeluar
                        };
                    }else if($scope.item.statusKendaliDokumen.name != "SELESAI"){
                        var data = {
                            "norec_kdr": $scope.current.norec_kdr,
                            "keunit": $scope.item.keUnit,
                            "dariunit": $scope.item.dariUnit,
                            "tglupdate":  moment($scope.tglJamSkrg).format('YYYY-MM-DD HH:mm:ss'),
                            "objectruanganasalfk": $scope.item.ruangan2.id,
                            "objectruangantujuanfk": $scope.item.ruangan3.id,
                            // "statusEnabled":e.model.statusEnabled,
                            // "kdProfile": e.model.kdProfile,
                            "objectstatuskendalidokumenfk":$scope.item.statusKendaliDokumen.id,
                            "nocmfk": $scope.current.nocmfk,
                            "tglkembali": tglkembali,
                            "tglkeluar": tglkeluar,
                            "catatan": catatan
                        };
                    }
                    
                 
                    manageSarprasPhp.saveKendaliDokumenRm(data).then(function(e){
                            $scope.findBynoCM(); 
                        // if (e.data.data.norec){
                        //     debugger;
                        //     $scope.reloadGridKendali($scope.currentRm);   
                        // }
                        // delete $scope.dataItem;
                        // $scope.winDialog.close();
                    })
              
                    $scope.popup_editor.close();
            }
           $scope.batalupdate=function(){
              $scope.popup_editor.close(); 
           }
            $scope.formatJam24 = {
                value: new Date(),			//set default value
                format: "dd-MM-yyyy HH:mm",	//set date format
                timeFormat: "HH:mm",		//set drop down time format to 24 hours
                dateInput: true
            }
            // $scope.listStatus = new kendo.data.DataSource({
            //     data: [{"id":1, "name": "dipinjam"},{"id":1, "name": "selesai"},{"id":1, "name": "diteruskan"}]
            // })
            $scope.kl=function (current) {
             if (current != undefined) {
                  // $scope.item.dariUnit=current.dariunit;
                  // $scope.item.keUnit=current.keunit;
                  $scope.item.statusKendaliDokumen={id:current.objectstatuskendalidokumenfk, name:current.name};
                  $scope.item.ruangan2={id:current.objectruanganasalfk, namaruangan:current.ruanganasal};
                  $scope.item.ruangan3={id:current.objectruangantujuanfk, namaruangan:current.ruangantujuan};
                  $scope.tglJamSkrg = new Date();
                  // console.log($scope.tglJamSkrg);

                
              
               }
            }
            $scope.onClick = function(){
                var tglAwal = moment($scope.items.start).format('YYYY-MM-DD 00:00');
                var tglAkhir = moment($scope.items.end).format('YYYY-MM-DD 23:59');
                if (!$scope.item && !$scope.editable){
                    messageContainer.error('No CM belum dipilih');
                    return;
                }
                manageSarprasPhp.getDataTableTransaksi("dokumenrm/get-data-kendali?+nocm="+$scope.noCm+
                        "&tglAwal="+tglAwal+
                        "&tglAkhir="+tglAkhir,false).then(function(data) {
                    var datakendali = data.data.datakendali
                        if(datakendali.length == 0){
                            $scope.dataItem = {
                                tglUpdate:$scope.now,
                                ruangan:{id:data.data.rak[0].id,namaruangan:data.data.rak[0].namaruangan},
                                statusKendaliDokumen:{id:$scope.listStatus[0].id,name:$scope.listStatus[0].name}
                            }
                            // $scope.tglUpdate=$scope.now;
                            // $scope.item.ruangan={id:data.data.rak[0].id, namaruangan:data.data.rak[0].namaruangan};
                            // $scope.item.statusKendaliDokumen={id:$scope.listStatus[2].id,name:$scope.listStatus[2].name};
                        }else{
                            $scope.dataItem= {
                                tglUpdate:$scope.now,
                                ruangan:{id:data.data.rak[0].id,namaruangan:data.data.rak[0].namaruangan},
                                ruangan1:{id:datakendali[0].kdruangan,namaruangan:datakendali[0].ruangdaftar},
                                statusKendaliDokumen:{id:$scope.listStatus[0].id,name:$scope.listStatus[0].name}
                            }
                        }
                })
                // $scope.dataItem = {
                //     tglUpdate:$scope.now,
                //     // dariUnit:'RAK',
                //     // ruangan:{id:$scope.listRuangan[0].id,namaruangan:$scope.listRuangan[0].namaruangan},
                //     statusKendaliDokumen:{id:$scope.listStatus[2].id,name:$scope.listStatus[2].name}

                // }
                // $scope.listStatus = new kendo.data.DataSource({
                //     data: [{"name": "dipinjam"},{"name": "selesai"},{"name": "diteruskan"}]
                // })
                // $scope.selectOptions1 = {
                //     dataSource: $scope.listStatus,
                //     template: "<div>#:name#</div>",
                //     autoBind: false
                // };
                $scope.winDialog.center().open();
            }
            $scope.tambahData = function(items){
                var listRawRequired = [ 
                    "dataItem.tglUpdate|k-ng-model|Tanggal update",
                    "dataItem.ruangan|ng-model|Unit asal",
                    "dataItem.ruangan1|ng-model|Unit tujuan",
                    "dataItem.statusKendaliDokumen|k-ng-model|Status dokumen",
                    // "dataItem.Catatan|k-ng-model|Catatan",
                ];
                // manageSarprasPhp.getDataTableTransaksi("dokumenrm/get-data-kendali?+nocm="+$scope.noCm, false).then(function(data) {
                //     var datakendali = data.data.datakendali
                //         if(datakendali.lenght == null){
                //             items.tglUpdate=$scope.now;
                //             items.ruangan={id:data.data.rak[0].id, namaruangan:data.data.rak[0].namaruangan};
                //             items.statusKendaliDokumen={id:$scope.listStatus[2].id,name:$scope.listStatus[2].name};
                //         }
                // })


                var nocmfk=''
                if ($scope.noCMFK!=undefined)
                    nocmfk=$scope.noCMFK;
                else
                    nocmfk='';

                var tglkeluar =null;
                if (items.statusKendaliDokumen.name != "SELESAI") {

                    tglkeluar=moment(items.tglKembali).format('YYYY-MM-DD HH:mm');
                }

                var tglkembali=null;
                if (items.statusKendaliDokumen.name == "SELESAI") {
                     tglkembali=moment(items.tglKembali).format('YYYY-MM-DD HH:mm');
                }  

                var Cat="-"
                if ($scope.dataItem.Catatan != undefined) {
                    Cat = $scope.dataItem.Catatan
                } 
               
                var isValid = ModelItem.setValidation($scope, listRawRequired);
                    if(isValid.status){
                        if(items.statusKendaliDokumen.name == "SELESAI"){
                             var data = {
                                        "norec_kdr": '',
                                        "objectruangantujuanfk": items.ruangan1.id,
                                        "objectruanganasalfk": items.ruangan.id,
                                        "tglupdate": moment(items.tglUpdate).format('YYYY-MM-DD HH:mm'), //items.tglUpdate,//.getTime(), 
                                        "objectstatuskendalidokumenfk":  items.statusKendaliDokumen.id,
                                        "nocmfk": nocmfk,
                                        // "tglkeluar": tglkeluar,
                                        "catatan": Cat,
                                        "tglkembali": tglkembali
                                    };
                        }else if(items.statusKendaliDokumen.name != "SELESAI"){
                             var data = {
                                        "norec_kdr": '',
                                        "objectruangantujuanfk": items.ruangan1.id,
                                        "objectruanganasalfk": items.ruangan.id,
                                        "tglupdate": moment(items.tglUpdate).format('YYYY-MM-DD HH:mm'), //items.tglUpdate,//.getTime(), 
                                        "objectstatuskendalidokumenfk":  items.statusKendaliDokumen.id,
                                        "nocmfk": nocmfk,
                                        "tglkeluar": tglkeluar,
                                        "catatan": Cat
                                        // "tglkembali": tglkembali
                                    };
                        }
                   
                    manageSarprasPhp.saveKendaliDokumenRm(data).then(function(e){
                        // update status antrian
                        $scope.findBynoCM(); 
                          // $scope.items.pilihDokter='';
                    });
                    $scope.winDialog.close();
                    } else {
                        ModelItem.showMessages(isValid.messages);
                    }
            }
            $scope.batal = function(){
                $scope.winDialog.close();
            }
        }]
    )
})