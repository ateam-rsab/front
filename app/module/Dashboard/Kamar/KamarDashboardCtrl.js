define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('KamarDashboardCtrl', ['socket', '$rootScope', '$scope', 'ModelItem', '$state',
        function(socket, $rootScope, $scope, ModelItem, $state) {
            $scope.item={};
        
            $scope.gridMaster= [
                {
                    field: "namaruang",
                    title: "Nama Ruangan",
                    width: "300px",
                },
                {
                    field: "kapasitas",
                    title: "Kapasitas",
                    attributes:  { "style":"text-align:right;" },
                    aggregates: ["sum"],
                    groupFooterTemplate: "<div style='text-align:right'>#=sum#</div>",
                    width: "100px"
                },
                {
                    field: "tersedia",
                    title: "Ketersediaan",
                    attributes:  { "style":"text-align:right;" },
                    aggregates:["sum"],
                    groupFooterTemplate: "<div style='text-align:right'>#=sum#</div>",
                    width: "100px"	
                },
                {
                    field: "lastupdate",
                    title: "Update",
                    width: "300px"
                },
            ];

            const OnInit=()=>{
                fetch('http://172.16.44.33:8980/api/get-bed?start=1&limit=100')
                .then((response) => response.json())
                .then((data) =>{
                    $scope.item.bed = data.response.list;
                    return data;
                })
                .then((data)=>{
                    $scope.item.kelas = $scope.item.bed.filter((arr, index, self) => index === self.findIndex((t) => (t.kodekelas == arr.kodekelas)));
                    return data;
                })
                // .then((data)=>{
                //     loadKelas();
                //     return data;
                // })
                .then((data)=>{
                    loadInterval();
                })
                .then((data)=>{
                    laodDetail();
                })
            }

            OnInit();

            // setInterval(() => {
            //     OnInit();
            // },1000);

            const loadKelas=()=>{
                $scope.sourceBed = new kendo.data.DataSource({
                    data: $scope.item.bed,
                    sortable: true,
                    scrollable: false,
                    pageable: true,
                    schema: {
                        model: {
                            fields: {
                                kapasitas: { type: "number"},
                                tersedia: { type: "number"},
                            }
                        }
                    },
                    group:[
                        {
                            field: "namakelas",aggregates:[
                                {field:"kapasitas",aggregate:"sum"},
                                {field:"tersedia",aggregate:"sum"}
                            ]
                        }
                    ],
                    aggregate:[
                        {field:"kapasitas",aggregate:"sum"},
                        {field:"tersedia",aggregate:"sum"}
                    ],
                    columns:$scope.gridMaster,
                    pageSize: 5,
                });
            }

            const loadInterval=()=>{
                let htmlKelas='',indexNum=1;
                $scope.item.kelas.forEach(kelas => {
                    if(indexNum==1){
                        htmlKelas += '<li class="nav-item"><a class="nav-link active" id="nav-'+indexNum+'-tab" data-toggle="tab" href="#nav-'+indexNum+'" role="tab" aria-controls="nav-'+indexNum+'" aria-selected="true">'+kelas.namakelas+'</a></li>';
                    }else{
                        htmlKelas += '<li class="nav-item"><a class="nav-link" id="nav-'+indexNum+'-tab" data-toggle="tab" href="#nav-'+indexNum+'" role="tab" aria-controls="nav-'+indexNum+'" aria-selected="true">'+kelas.namakelas+'</a></li>';
                    }
                    indexNum++;
                });
                $('#nav-tab-kelas').html(htmlKelas)
            }

            const laodDetail=()=>{
                let htmlDetail='',indexNum=1;
                $scope.item.kelas.forEach(kelas => {
                    let dataFilter = $scope.item.bed.filter(e=>e.kodekelas==kelas.kodekelas);
                    if(indexNum==1){
                        htmlDetail += '<div role="tabpanel" class="tab-pane fade in active" id="nav-'+indexNum+'" aria-labelledby="nav-'+indexNum+'-tab">';
                        dataFilter.forEach(dataFilter => {

                        });
                        htmlDetail +='</div>';
                    }else{
                        htmlDetail += '<div role="tabpanel" class="tab-pane fade" id="nav-'+indexNum+'" aria-labelledby="nav-'+indexNum+'-tab">';
                        dataFilter.forEach(dataFilter => {
                            
                        });
                        htmlDetail +='</div>';
                    }
                    indexNum++;
                });
                $("#nav-tabContent").html(htmlDetail);
            }
        }
    ])
})