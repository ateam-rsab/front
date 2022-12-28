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
                .then((data)=>{
                    loadLabel();
                })
                .then((data)=>{
                    laodDetail();
                })
            }

            OnInit();

            setInterval(() => {
                loadInterval();
            },30*1000);

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

            const loadLabel=()=>{
                let html='',indexNum=1;
                $scope.item.kelas.forEach(kelas => {
                    if(indexNum==1){
                        html += '<div class="tabby-tab" id="tab-'+indexNum+'-box">'+
                                '<input type="radio" id="tab-'+indexNum+'" name="tabby-tabs" checked>'+
                                '<label for="tab-'+indexNum+'">'+kelas.namakelas+'</label>'+
                                '<div class="tabby-content" id="content-'+indexNum+'">'+
                                '</div>'+
                            '</div>';
                    }else{
                        html += '<div class="tabby-tab" id="tab-'+indexNum+'-box">'+
                            '<input type="radio" id="tab-'+indexNum+'" name="tabby-tabs">'+
                            '<label for="tab-'+indexNum+'">'+kelas.namakelas+'</label>'+
                            '<div class="tabby-content" id="content-'+indexNum+'">'+
                            '</div>'+
                        '</div>';
                    }
                    indexNum++;
                });
                $('#nav-tab-kelas').html(html)
            }

            const laodDetail=()=>{
                let indexNum=1;
                $scope.item.kelas.forEach(kelas => {
                    let dataFilter = $scope.item.bed.filter(e=>e.kodekelas==kelas.kodekelas);
                    if(indexNum==1){
                        let html = '<table>';
                        html += '<tr><th colspan="4"><span style="color:#000000;font-weight: bold;">'+kelas.namakelas+'</span></th></tr><tr><th>Nama Ruang</th><th>Kapasitas</th><th>Ketersediaan</th><th>Terakhir Update</th></tr>';
                        dataFilter.forEach(dataFilter => {
                            html += '<tr>';
                            html += '<td>'+dataFilter.namaruang+'</td>'
                            html += '<td>'+dataFilter.kapasitas+'</td>'
                            html += '<td>'+dataFilter.tersedia+'</td>'
                            html += '<td>'+dataFilter.lastupdate+'</td>'
                            html += '</tr>';
                        });
                        html += '</table>';
                        $('#content-'+indexNum).html(html);
                    }else{
                        let html = '<table>';
                        html += '<tr><th colspan="4"><span style="color:#000000;font-weight: bold;">'+kelas.namakelas+'</span></th></tr><tr><th>Nama Ruang</th><th>Kapasitas</th><th>Ketersediaan</th><th>Terakhir Update</th></tr>';
                        dataFilter.forEach(dataFilter => {
                            html += '<tr>';
                            html += '<td>'+dataFilter.namaruang+'</td>'
                            html += '<td>'+dataFilter.kapasitas+'</td>'
                            html += '<td>'+dataFilter.tersedia+'</td>'
                            html += '<td>'+dataFilter.lastupdate+'</td>'
                            html += '</tr>';
                        });
                        html += '</table>';
                        $('#content-'+indexNum).html(html);
                    }
                    indexNum++;
                });
            }

            const loadInterval=()=>{
                let lengthkelas=$scope.item.kelas.length,dataChecked='';
                for(let i=1;i<=lengthkelas;i++){
                    let activeTab = $('#tab-'+i).is(':checked');
                    if(activeTab){
                        dataChecked=i;                       
                    }
                }

                if(dataChecked===lengthkelas){
                    $('#tab-1').prop( "checked", true );
                    $('#content-1').css({"display":""});
                    $('#content-'+i).css({"display":"none"});
                }
                else{
                    let iNow = dataChecked+1;
                    $('#tab-'+iNow).prop( "checked", true );
                    $('#content-'+iNow).css({"display":""});
                    $('#content-'+dataChecked).css({"display":"none"});
                }
            }


        }
    ])
})