define(['initialize'], function (initialize) {
    'use strict';
    initialize.controller('LogbookKinerjaDokterCtrl', ['$q', 'ManagePegawai', 'FindPegawai', 'DateHelper', 'FindSdm', 'ModelItem', 'ManageSdm', 'ManageSdmNew', '$state', '$rootScope', '$scope',
        function ($q, managePegawai, findPegawai, dateHelper, findSdm, modelItem, manageSdm, ManageSdmNew, $state, $rootScope, $scope) {
            $scope.item = {};
            $scope.isRouteLoading = false;
            $scope.monthSelectorOptions = {
                start: "year",
                depth: "year"
            };
            $scope.grandTotal = 0;
            $scope.dataSource = [];
            $scope.item.periode = new Date();

            let groupJSON = function (xs, key) {
                return xs.reduce(function (rv, x) {
                    
                    (rv[x[key]] = rv[x[key]] || []).push(x);
                    return rv;
                }, {});
            };

            let getHeaderTable = () => {
                $scope.headerTable = [];
                var dt = new Date($scope.item.periode);
                var month = dt.getMonth() + 1;
                var year = dt.getFullYear();
                $scope.daysInMonth = new Date(year, month, 0).getDate();

                $scope.headerTable = [
                    // {
                    //     width: "300px",
                    //     title: "Indikator"
                    // },
                    // {
                    //     width: "300px",
                    //     title: "Kegiatan"
                    // }
                ];

                for (let i = 0; i < $scope.daysInMonth; i++) {
                    $scope.headerTable.push({
                        width: "20px",
                        title: i + 1
                    });
                }
            }

            let init = () => {
                ManageSdmNew.getListData(`service/list-generic/?view=Pegawai&select=id,namaLengkap&criteria=statusEnabled,namaLengkap&values=true,!'-'&order=namaLengkap:asc`).then(res => {
                    $scope.listPegawai = res.data;
                })
                getHeaderTable();
            }
            init();

            $scope.getDataLogbook = () => {
                getHeaderTable();

                if (!$scope.item.pegawai) {
                    toastr.info("Harap pilih pegawai terlebih dahulu");
                    return;
                }
                $scope.isRouteLoading = true;
                let dataTemp = [];
                // ${$scope.item.periode ? dateHelper.toTimeStamp($scope.item.periode) : dateHelper.toTimeStamp(new Date())}
                // ${$scope.item.pegawai.id}
                ManageSdmNew.getListData(`iki-remunerasi/get-logbook-skoring-dokter?bulan=${$scope.item.periode ? dateHelper.toTimeStamp($scope.item.periode) : dateHelper.toTimeStamp(new Date())}&pegawaiId=${$scope.item.pegawai.id}`).then(res => {

                    for (let i = 0; i < res.data.data.length; i++) {
                        dataTemp.push({
                            namaIndikator: res.data.data[i].namaIndikator,
                            namaProduk: res.data.data[i].namaProduk,
                            skor: res.data.data[i].skor,
                            totalSkor: res.data.data[i].tSkor,
                            jumlah: res.data.data[i].jumlah,
                            dataDetail: []
                        });

                        for (let ii = 0; ii < $scope.daysInMonth; ii++) {
                            dataTemp[i].dataDetail.push({
                                tgl: ii + 1,
                                jmlLayanan: 0
                            })

                        }

                    }

                    for (let i = 0; i < res.data.data.length; i++) {
                        for (let ii = 0; ii < res.data.data[i].detail.length; ii++) {
                            for (let iii = 0; iii < dataTemp[i].dataDetail.length; iii++) {
                                let tglPelayanan = res.data.data[i].detail[ii].tglPelayanan.split('-');
                                if (parseInt(tglPelayanan[2]) === iii + 1) {
                                    dataTemp[i].dataDetail[iii].jmlLayanan = res.data.data[i].detail[ii].jumlah;
                                    break;
                                }
                            }

                        }
                    }

                    // $scope.dataSource = dataTemp;
                    let groupedJSON = groupJSON(dataTemp, 'namaIndikator');
                    let formattedJSON = Object.keys(groupedJSON).map((key) => [(key), groupedJSON[key]]);
                    let dataGet = [];
                    
                    for(let i = 0; i < formattedJSON.length; i++) {
                        dataGet.push({
                            label:formattedJSON[i][0],
                            detail: [],
                            subTotalSkor:0,
                            subJumlah: 0,
                            subSkor: 0
                        })

                        for(let ii = 0; ii < formattedJSON[i][1].length; ii++) {
                            dataGet[i].detail.push(formattedJSON[i][1][ii]);
                            dataGet[i].subJumlah += formattedJSON[i][1][ii].totalSkor;
                            dataGet[i].subSkor += formattedJSON[i][1][ii].skor;
                            dataGet[i].subTotalSkor += formattedJSON[i][1][ii].totalSkor;
                        }
                        $scope.grandTotal = dataGet[i].subTotalSkor + $scope.grandTotal;
                    }   
                    $scope.dataSource = dataGet;
                    $scope.isRouteLoading = false;
                })
            }
            // $scope.getDataLogbook();
        }
    ])
});