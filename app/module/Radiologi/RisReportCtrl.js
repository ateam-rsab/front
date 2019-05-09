define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('RisReportCtrl', ['$rootScope', '$scope', 'ModelItem', '$state', 'FindPasien', 'DateHelper', 'socket', 'ManagePasien', 'FindPegawai', 'FindPasienRadiologi',
        function($rootScope, $scope, ModelItem, $state, findPasien, dateHelper, socket, managePasien, findPegawai, findPasienRadiologi) {
            $scope.isRouteLoading = true;
            $scope.isCalling = true;
            $scope.tglhariIni = " ";
            $scope.items = {};
            $scope.now = new Date();
            $scope.reset = function(){
                //  $scope.noCm = '';
                //  $scope.ruangan = '';
                 $scope.from = $scope.now;
                 $scope.until = $scope.now;
            };
            $scope.reset();
            $scope.isLoading = false;
            $scope.nav = function(item) {
                $state.go('antrianPasien', { id: item.id, nama: item.namaRuangan });
            }
            $scope.now = new Date();
            // $scope.from = dateHelper.setDefaultHour(new Date());
            // $scope.until = new Date();
            $scope.group = {
                field: "confirmDoctor",
                aggregates: [{
                    field: "createDate",
                    aggregate: "count"
                }, {
                    field: "confirmDoctor",
                    aggregate: "count"
                }]
            };
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
            function removeZero(id) {
                id.replace(/\b0+/g, '');
                return id;
            }
            $scope.risView = function(dataItem){
                if (dataItem.confirmDate && dataItem.confirmDoctor){
                    var idPasien = removeZero(dataItem.patientId);
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?RIS=1&norec=' + idPasien + '&vPID=V' , function(response) {
                        // do something with response
                    });
                    // var url = "zetta://URL=http://192.168.12.11&LID=dok&LPW=dok&LICD=003&PID="+idPasien+"&VTYPE=V"
                    // window.open(url,'_blank');
                } else {
                    messageContainer.error('Report belum terkonfirmasi')
                }
                
            }
            $scope.risWorklist = function(dataItem){
                if (dataItem.confirmDate && dataItem.confirmDoctor){
                    var idPasien = removeZero(dataItem.patientId);
                    var client = new HttpClient();
                    client.get('http://127.0.0.1:1237/printvb/Pendaftaran?RIS=1&norec=' + idPasien + '&vPID=W' , function(response) {
                        // do something with response
                    });
                    // var url = "zetta://URL=http://192.168.12.11&LID=dok&LPW=dok&LICD=003&PID="+idPasien+"&VTYPE=W"
                    // window.open(url,'_blank');
                } else {
                    messageContainer.error('Report belum terkonfirmasi')
                }
            }
            $scope.mainGridOptions = {
                sortable: true,
                pageable: true,
                selectable: "row",
                scrollable: false,
                columns: [{
                    field: "conclusion",
                    title: "Conclusion",
                }, {
                    field: "confirmDate",
                    title: "Confirm Date",
                    width: 140
                }, {
                    field: "confirmDoctor",
                    title: "Confirm Doctor",
                    aggregates: ["count"]
                }, {
                    field: "reportText",
                    title: "Report Text",
                }, {
                    field: "createDate",
                    title: "Create Date",
                    width: 140,
                    aggregates: ["count"]
                }, {
                    field: "readDate",
                    title: "Read Date",
                    width: 140
                }, {
                  template: '<button class="btn k-button k-button-primary" ng-click="risView(dataItem)">View</button',
                  width: 80
                }, {
                  template: '<button class="btn k-button k-button-primary" ng-click="risWorklist(dataItem)">Worklist</button',
                  width: 80
                }, {
                    hidden: true,
                    field: "confirmDoctor",
                    title: "Dokter",
                    aggregates: ["count"],
                    groupHeaderTemplate: "Dokter #= value # (Jumlah: #= count#)"
                }]
            }
            // $scope.Column = [
            //     {
            //         field: "conclusion",
            //         title: "Kesimpulan",
            //     }, {
            //         field: "confirmDate",
            //         title: "Tgl Konfirmasi",
            //         template: "#= dateHelper.stringToDateTime(confirmDate) #",
            //         aggregates: ["count"]
            //     }, {
            //         field: "confirmDoctor",
            //         title: "Dokter",
            //         aggregates: ["count"]
            //     }, {
            //         field: "reportText",
            //         title: "Kesimpulan",
            //     }, {
            //         field: "createDate",
            //         title: "Tgl Konfirmasi",
            //         template: "#= dateHelper.stringToDateTime(createDate) #",
            //         aggregates: ["count"]
            //     }, {
            //         field: "readDate",
            //         title: "Tgl Konfirmasi",
            //         template: "#= dateHelper.stringToDateTime(createDate) #",
            //         aggregates: ["count"]
            //     }
            // ];
            $scope.findData = function() {
                $scope.isRouteLoading = false;
                $scope.isLoading === false;
                findPasienRadiologi.getRisReport(dateHelper.formatDate($scope.from, 'YYYY-MM-DD'), dateHelper.formatDate($scope.until, 'YYYY-MM-DD')).then(function(e) {
                    // debugger;
                    var data = [];
                    for (var key in e.data.data) {
                        if (e.data.data.hasOwnProperty(key)) {
                            var element = e.data.data[key];
                            if (element.confirmDate !== "") element.confirmDate = dateHelper.stringToDateTime(element.confirmDate);
                            if (element.createDate !== "") element.createDate = dateHelper.stringToDateTime(element.createDate);
                            if (element.readDate !== "") element.readDate = dateHelper.stringToDateTime(element.readDate);
                            data.push(element);
                        }
                    }
                    var ds = new kendo.data.DataSource({
                        data: data,
                        group: $scope.group,
                        pageSize: 5
                    });
                    var grid = $('#gridRisReport').data("kendoGrid");
                    grid.setDataSource(ds);
                    $scope.isRouteLoading = false;
                    $scope.isLoading === false;
                }, function(err){
                    $scope.isRouteLoading = false;
                    $scope.isLoading === false;
                });

            }
            $scope.findData();
            $scope.detailOrder = function() {
                
                $state.go('dashboardpasien.BillingDetail', {
                    noRecRegistrasi: $scope.item.pasienDaftar.noRec,
                    noRec: $scope.item.noRec
                });
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
                                // obj.msg = "Pasien sudah di panggil dokter";
                                obj.status = true;
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
        }
    ]);
});