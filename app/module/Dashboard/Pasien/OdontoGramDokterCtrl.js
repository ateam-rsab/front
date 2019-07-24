define(['initialize'], function(initialize) {
    'use strict';
    initialize.controller('OdontoGramDokterCtrl', ['$q', '$rootScope', '$scope', 'ManageLogistikPhp','$state','CacheHelper', '$window','$location',
        function($q, $rootScope, $scope,manageLogistikPhp,$state,cacheHelper, $window,$location) {
            // if( window.location.href != $location.$$absUrl ){
            //     window.location.href= $location.$$absUrl
            //     window.location.reload()  
            // }
         
            $scope.item = {};
            $scope.dataVOloaded = false;
            $scope.now = new Date();
            var norec_apd = ''
            var norec_pd = ''
            var nocm_str = ''
            $scope.item.qty =1
            $scope.riwayatForm = false
            $scope.inputOrder = true
            $scope.CmdOrderPelayanan= true;
            $scope.OrderPelayanan = false;
            $scope.showTombol = false        
            var dokter = '';
            var idUser = '';
            var data2 = [];
            $scope.PegawaiLogin2 ={};
            var namaRuangan = ''
            var namaRuanganFk = ''            
            var detail = ''

            var data2 = []
            var isianColor = "white"
            var kdColorKaries = "#B8B7B7" 
            var kdColorTambalanLogam = "#F544ED" 
            var kdColorTambalanNonLogam = "#82D9D9" 
            var kdColorMahkotaLogam = "#014C0A" 
            var kdColorMahkotaNonLogam = "#40F5F9"
            var typeIsian = ""

            $scope.BelumErupsi = function(){
                typeIsian = "UE"
            }
            $scope.ErupsiSebagian = function(){
                typeIsian = "PE"
            }
            $scope.AnomaliBentuk = function(){
                typeIsian = "A"
            }
            $scope.NonVital = function(){
                typeIsian = "/"
            }
            $scope.Karies = function(){
                isianColor = kdColorKaries
                typeIsian = "selai"
            }
            $scope.TambalanLogam = function(){
                isianColor = kdColorTambalanLogam
                typeIsian = "selai"
            }
            $scope.TambalanNonLogam = function(){
                isianColor = kdColorTambalanNonLogam
                typeIsian = "selai"
            }
            $scope.MahkotaLogam = function(){
                isianColor = kdColorMahkotaLogam
                typeIsian = "selai"
            }
            $scope.MahkotaNonLogam = function(){
                isianColor = kdColorMahkotaNonLogam
                typeIsian = "selai"
            }
            $scope.SisaAkar = function(){
                typeIsian = "SisaAkar"
            }
            $scope.GigiHilang = function(){
                typeIsian = "GigiHilang"
            }
            $scope.Jembatan = function(){
                typeIsian = "Jembatan"
            }
            $scope.GigiTiruanLepas = function(){
                typeIsian = "GigiTiruanLepas"
            }
            $scope.Clear = function(){
                isianColor = "white"
                typeIsian = "selai"
            }

            //{//load kotak-kotak tea as@epic 2019-03-07
                var elem = document.getElementById('myCanvas'),
                    elemLeft = elem.offsetLeft,
                    elemTop = elem.offsetTop,
                    context = elem.getContext('2d'),
                    //context2 = elem.getContext('2d'),
                    elements = [];
                     


                // Add event listener for `click` events.
                elem.addEventListener('click', function(event) {
                    var x = event.pageX - elemLeft,
                        y = event.pageY - elemTop;
                    console.log(x, y);
                    elements.forEach(function(element) {
                        if (y > element.top + 165 && y < element.top + 165 + element.height && x > element.left && x < element.left + element.width) {
                            isiColor(element)
                        }
                    });

                }, false);

                var listSrc = [
                    {id: 1, no : '18'},
                    {id: 2, no : '17'},
                    {id: 3, no : '16'},
                    {id: 4, no : '15'},
                    {id: 5, no : '14'},
                    {id: 6, no : '13'},
                    {id: 7, no : '12'},
                    {id: 8, no : '11'},

                    {id: 9, no : '21'},
                    {id: 10, no : '22'},
                    {id: 11, no : '23'},
                    {id: 12, no : '24'},
                    {id: 13, no : '25'},
                    {id: 14, no : '26'},
                    {id: 15, no : '27'},
                    {id: 16, no : '28'},

                    {id: 17, no : '55'},
                    {id: 18, no : '54'},
                    {id: 19, no : '53'},
                    {id: 20, no : '52'},
                    {id: 21, no : '51'},

                    {id: 22, no : '61'},
                    {id: 23, no : '62'},
                    {id: 24, no : '63'},
                    {id: 25, no : '64'},
                    {id: 26, no : '65'},
                
                    {id: 27, no : '85'},
                    {id: 28, no : '84'},
                    {id: 29, no : '83'},
                    {id: 30, no : '82'},
                    {id: 31, no : '81'},
                   
                    {id: 32, no : '71'},
                    {id: 33, no : '72'},
                    {id: 34, no : '73'},
                    {id: 35, no : '74'},
                    {id: 36, no : '75'},

                    {id: 37, no : '48'},
                    {id: 38, no : '47'},
                    {id: 39, no : '46'},
                    {id: 40, no : '45'},
                    {id: 41, no : '44'},
                    {id: 42, no : '43'},
                    {id: 43, no : '42'},
                    {id: 44, no : '41'},
                    
                    {id: 45, no : '31'},
                    {id: 46, no : '32'},
                    {id: 47, no : '33'},
                    {id: 48, no : '34'},
                    {id: 49, no : '35'},
                    {id: 50, no : '36'},
                    {id: 51, no : '37'},
                    {id: 52, no : '38'}
                ]



                var nextKotak = 0
                var besarKotak = 65
                var spc = 0
                var ididKlik = 0
                var idSrc = 0

                //sayur kol 1
                for (var i = 0; i < 16; i++) {
                    if(i == 8){
                        spc = 20
                    }
                    context.moveTo(40 + (i * besarKotak) + spc,40);
                    context.lineTo(100 + (i * besarKotak) + spc,40);
                    context.lineTo(100 + (i * besarKotak) + spc,100);
                    context.lineTo(40 + (i * besarKotak) + spc,100);
                    context.lineTo(40 + (i * besarKotak) + spc,40);

                    context.lineTo(55 + (i * besarKotak) + spc,55);
                    context.lineTo(55 + (i * besarKotak) + spc,85);
                    context.lineTo(40 + (i * besarKotak) + spc,100);

                    context.moveTo(55 + (i * besarKotak) + spc,85);
                    context.lineTo(85 + (i * besarKotak) + spc,85);
                    context.lineTo(100 + (i * besarKotak) + spc,100);

                    context.moveTo(85 + (i * besarKotak) + spc,85);
                    context.lineTo(85 + (i * besarKotak) + spc,55);
                    context.lineTo(100 + (i * besarKotak) + spc,40);

                    context.moveTo(85 + (i * besarKotak) + spc,55);
                    context.lineTo(55 + (i * besarKotak) + spc,55);

                    context.stroke();  


                    context.font = "20px Tahoma";
                    context.fillStyle = "black";
                    context.fillText(listSrc[idSrc].no, 57 + (i * besarKotak) + spc,120);

                    idSrc = idSrc+1

                    elements.push(
                        //A1
                        {
                            colour: 'red',
                            width: 30,height: 15,
                            top: 40,left: 55+ (i * besarKotak) + spc,
                            id : ididKlik +1,
                            brs : 1, kol : i + 1, seg : 1
                        },
                        {
                            colour: 'red',
                            width: 15,height: 30,
                            top: 55,left: 85+ (i * besarKotak) + spc,
                            id : ididKlik +2,
                            brs : 1, kol : i + 1, seg : 2
                        },
                        {
                            colour: 'red',
                            width: 30,height: 15,
                            top: 85,left: 55+ (i * besarKotak) + spc,
                            id : ididKlik +3,
                            brs : 1, kol : i + 1, seg : 3
                        },
                        {
                            colour: 'red',
                            width: 15,height: 30,
                            top: 55,left: 40+ (i * besarKotak) + spc,
                            id : ididKlik +4,
                            brs : 1, kol : i + 1, seg : 4
                        },
                        {
                            colour: 'yellow',
                            width: 30,height: 30,
                            top: 55,left: 55+ (i * besarKotak) + spc,
                            id : ididKlik +5,
                            brs : 1, kol : i + 1, seg : 5
                        }
                    );    
                    ididKlik = ididKlik +5
                }
                
                spc = 0
                //sayur kol 2
                for (var i = 0; i < 10; i++) {
                    if(i == 5){
                        spc = 20
                    }
                    context.moveTo(235 + (i * besarKotak) + spc,150);
                    context.lineTo(235 + (i * besarKotak) + spc,210);
                    context.lineTo(295 + (i * besarKotak) + spc,210);
                    context.lineTo(295 + (i * besarKotak) + spc,150);
                    context.lineTo(235 + (i * besarKotak) + spc,150);

                    context.moveTo(235 + (i * besarKotak) + spc,150);
                    context.lineTo(250 + (i * besarKotak) + spc,165);
                    context.lineTo(250 + (i * besarKotak) + spc,195);
                    context.lineTo(235 + (i * besarKotak) + spc,210);

                    context.moveTo(250 + (i * besarKotak) + spc,195);
                    context.lineTo(280 + (i * besarKotak) + spc,195);
                    context.lineTo(295 + (i * besarKotak) + spc,210);

                    context.moveTo(280 + (i * besarKotak) + spc,195);
                    context.lineTo(280 + (i * besarKotak) + spc,165);
                    context.lineTo(295 + (i * besarKotak) + spc,150);

                    context.moveTo(280 + (i * besarKotak) + spc,165);
                    context.lineTo(250 + (i * besarKotak) + spc,165);

                    context.stroke();      

                    context.font = "20px Tahoma";
                    context.fillStyle = "black";
                    context.fillText(listSrc[idSrc].no, 252 + (i * besarKotak) + spc,230);

                    idSrc = idSrc+1

                    elements.push(
                        {
                            colour: 'red',
                            width: 30,height: 15,
                            top: 150,left: 250+ (i * besarKotak) + spc,
                            id : ididKlik +1,
                            brs : 2, kol : i + 1, seg : 1
                        },
                        {
                            colour: 'red',
                            width: 15,height: 30,
                            top: 165,left: 280+ (i * besarKotak) + spc,
                            id : ididKlik +2,
                            brs : 2, kol : i + 1, seg : 2
                        },
                        {
                            colour: 'red',
                            width: 30,height: 15,
                            top: 195,left: 250+ (i * besarKotak) + spc,
                            id : ididKlik +3,
                            brs : 2, kol : i + 1, seg : 3
                        },
                        {
                            colour: 'red',
                            width: 15,height: 30,
                            top: 165,left: 235+ (i * besarKotak) + spc,
                            id : ididKlik +4,
                            brs : 2, kol : i + 1, seg : 4
                        },
                        {
                            colour: 'yellow',
                            width: 30,height: 30,
                            top: 165,left: 250+ (i * besarKotak) + spc,
                            id : ididKlik +5,
                            brs : 2, kol : i + 1, seg : 5
                        }
                    );    
                    ididKlik = ididKlik +5
                }
                
                spc = 0
                //sayur kol 3
                for (var i = 0; i < 10; i++) {
                    if(i == 5){
                        spc = 20
                    }
                    context.moveTo(235 + (i * besarKotak) + spc,260);
                    context.lineTo(235 + (i * besarKotak) + spc,320);
                    context.lineTo(295 + (i * besarKotak) + spc,320);
                    context.lineTo(295 + (i * besarKotak) + spc,260);
                    context.lineTo(235 + (i * besarKotak) + spc,260);

                    context.moveTo(235 + (i * besarKotak) + spc,260);
                    context.lineTo(250 + (i * besarKotak) + spc,275);
                    context.lineTo(250 + (i * besarKotak) + spc,305);
                    context.lineTo(235 + (i * besarKotak) + spc,320);

                    context.moveTo(250 + (i * besarKotak) + spc,305);
                    context.lineTo(280 + (i * besarKotak) + spc,305);
                    context.lineTo(295 + (i * besarKotak) + spc,320);

                    context.moveTo(280 + (i * besarKotak) + spc,305);
                    context.lineTo(280 + (i * besarKotak) + spc,275);
                    context.lineTo(295 + (i * besarKotak) + spc,260);

                    context.moveTo(280 + (i * besarKotak) + spc,275);
                    context.lineTo(250 + (i * besarKotak) + spc,275);

                    context.stroke();  

                    context.font = "20px Tahoma";
                    context.fillStyle = "black";
                    context.fillText(listSrc[idSrc].no, 252 + (i * besarKotak) + spc,340);

                    idSrc = idSrc+1   


                    elements.push(
                        {
                            colour: 'red',
                            width: 30,height: 15,
                            top: 260,left: 250+ (i * besarKotak) + spc,
                            id : ididKlik +1,
                            brs : 3, kol : i + 1, seg : 1
                        },
                        {
                            colour: 'red',
                            width: 15,height: 30,
                            top: 275,left: 280+ (i * besarKotak) + spc,
                            id : ididKlik +2,
                            brs : 3, kol : i + 1, seg : 2
                        },
                        {
                            colour: 'red',
                            width: 30,height: 15,
                            top: 305,left: 250+ (i * besarKotak) + spc,
                            id : ididKlik +3,
                            brs : 3, kol : i + 1, seg : 3
                        },
                        {
                            colour: 'red',
                            width: 15,height: 30,
                            top: 275,left: 235+ (i * besarKotak) + spc,
                            id : ididKlik +4,
                            brs : 3, kol : i + 1, seg : 4
                        },
                        {
                            colour: 'yellow',
                            width: 30,height: 30,
                            top: 275,left: 250+ (i * besarKotak) + spc,
                            id : ididKlik +5,
                            brs : 3, kol : i + 1, seg : 5
                        }
                    );    
                    ididKlik = ididKlik +5 
                }
                
                spc = 0
                //sayur kol 4
                for (var i = 0; i < 16; i++) {
                    if(i == 8){
                        spc = 20
                    }
                    context.moveTo(40 + (i * besarKotak) + spc,430);
                    context.lineTo(100 + (i * besarKotak) + spc,430);
                    context.lineTo(100 + (i * besarKotak) + spc,370);
                    context.lineTo(40 + (i * besarKotak) + spc,370);
                    context.lineTo(40 + (i * besarKotak) + spc,430);

                    context.moveTo(40 + (i * besarKotak) + spc,370);
                    context.lineTo(55 + (i * besarKotak) + spc,385);
                    context.lineTo(55 + (i * besarKotak) + spc,415);
                    context.lineTo(40 + (i * besarKotak) + spc,430);

                    context.moveTo(55 + (i * besarKotak) + spc,415);
                    context.lineTo(85 + (i * besarKotak) + spc,415);
                    context.lineTo(100 + (i * besarKotak) + spc,430);

                    context.moveTo(85 + (i * besarKotak) + spc,415);
                    context.lineTo(85 + (i * besarKotak) + spc,385);
                    context.lineTo(100 + (i * besarKotak) + spc,370);

                    context.moveTo(85 + (i * besarKotak) + spc,385);
                    context.lineTo(55 + (i * besarKotak) + spc,385);

                    context.stroke();   

                    context.font = "20px Tahoma";
                    context.fillStyle = "black";
                    context.fillText(listSrc[idSrc].no, 57 + (i * besarKotak) + spc,450);

                    idSrc = idSrc+1

                    elements.push(
                        {
                            colour: 'red',
                            width: 30,height: 15,
                            top: 370,left: 55+ (i * besarKotak) + spc,
                            id : ididKlik +1,
                            brs : 3, kol : i + 1, seg : 1
                        },
                        {
                            colour: 'red',
                            width: 15,height: 30,
                            top: 385,left: 85+ (i * besarKotak) + spc,
                            id : ididKlik +2,
                            brs : 3, kol : i + 1, seg : 2
                        },
                        {
                            colour: 'red',
                            width: 30,height: 15,
                            top: 415,left: 55+ (i * besarKotak) + spc,
                            id : ididKlik +3,
                            brs : 3, kol : i + 1, seg : 3
                        },
                        {
                            colour: 'red',
                            width: 15,height: 30,
                            top: 385,left: 40+ (i * besarKotak) + spc,
                            id : ididKlik +4,
                            brs : 3, kol : i + 1, seg : 4
                        },
                        {
                            colour: 'yellow',
                            width: 30,height: 30,
                            top: 385,left: 55+ (i * besarKotak) + spc,
                            id : ididKlik +5,
                            brs : 3, kol : i + 1, seg : 5
                        }
                    );    
                    ididKlik = ididKlik +5 

                }

                
                function isiColor(element){
                    if (typeIsian == "selai") {
                        if (element.seg == 1) {
                            context.beginPath();
                            context.moveTo(element.left - 15,element.top);
                            context.lineTo(element.left - 15 + 60,element.top);
                            context.lineTo(element.left - 15 + 60 - 15,element.top + 15);
                            context.lineTo(element.left - 15 + 60 - 15 - 30,element.top + 15);
                            context.lineTo(element.left  - 15,element.top);
                            context.closePath();
                            context.lineWidth = "1";
                            context.strokeStyle = "black";
                            context.stroke();
                            context.fillStyle = isianColor;
                            context.fill();
                        }
                        if (element.seg == 2) {
                            context.beginPath();
                            context.moveTo(element.left + 15 ,element.top- 15);
                            context.lineTo(element.left + 15,element.top- 15 + 60);
                            context.lineTo(element.left + 15 - 15,element.top- 15 + 60 - 15);
                            context.lineTo(element.left + 15 - 15,element.top- 15 + 60 - 15 -30);
                            context.lineTo(element.left + 15 ,element.top- 15);
                            context.closePath();
                            context.lineWidth = "1";
                            context.strokeStyle = "black";
                            context.stroke();
                            context.fillStyle = isianColor;
                            context.fill();
                        }
                        if (element.seg == 3) {
                            context.beginPath();
                            context.moveTo(element.left - 15 ,element.top + 15);
                            context.lineTo(element.left,element.top);
                            context.lineTo(element.left + 30,element.top);
                            context.lineTo(element.left +30 + 15,element.top+ 15);
                            context.lineTo(element.left - 15 ,element.top+ 15);
                            context.closePath();
                            context.lineWidth = "1";
                            context.strokeStyle = "black";
                            context.stroke();
                            context.fillStyle = isianColor;
                            context.fill();
                        }
                        if (element.seg == 4) {
                            context.beginPath();
                            context.moveTo(element.left ,element.top - 15);
                            context.lineTo(element.left + 15 ,element.top - 15 + 15);
                            context.lineTo(element.left + 15,element.top - 15 + 15 + 30);
                            context.lineTo(element.left + 15 - 15,element.top - 15 + 15 + 30 + 15);
                            context.lineTo(element.left ,element.top - 15);
                            context.closePath();
                            context.lineWidth = "1";
                            context.strokeStyle = "black";
                            context.stroke();
                            context.fillStyle = isianColor;
                            context.fill();
                        }
                        if (element.seg == 5) {
                            context.beginPath();
                            context.moveTo(element.left ,element.top);
                            context.lineTo(element.left + 30 ,element.top );
                            context.lineTo(element.left + 30,element.top  + 30);
                            context.lineTo(element.left ,element.top  + 30);
                            context.lineTo(element.left ,element.top);
                            context.closePath();
                            context.lineWidth = "1";
                            context.strokeStyle = "black";
                            context.stroke();
                            context.fillStyle = isianColor;
                            context.fill();
                        }
                        element.type = typeIsian
                        element.color = isianColor
                    }
                    if (element.seg == 5 && typeIsian != "selai") {
                        if (typeIsian == "UE") {
                            context.font = "20px Tahoma";
                            context.fillStyle = "black";
                            context.fillText("UE", element.left +3 ,element.top + 24);
                        }
                        if (typeIsian == "PE") {
                            context.font = "20px Tahoma";
                            context.fillStyle = "black";
                            context.fillText("PE", element.left +3,element.top + 24);
                        }
                        if (typeIsian == "A") {
                            context.font = "20px Tahoma";
                            context.fillStyle = "green";
                            context.fillText("A", element.left +8,element.top + 24);
                        }
                        if (typeIsian == "/") {
                            context.font = "25px Tahoma";
                            context.fillStyle = "red";
                            context.fillText("/", element.left +10,element.top + 24);
                        }
                        if (typeIsian == "SisaAkar") {
                            context.font = "25px Tahoma";
                            context.fillStyle = "blue";
                            context.fillText("√", element.left +4,element.top + 27);
                        }
                        if (typeIsian == "GigiHilang") {
                            context.font = "35px Tahoma";
                            context.fillStyle = "Red";
                            context.fillText("X", element.left +3,element.top +28);
                        }
                        if (typeIsian == "Jembatan") {
                            context.beginPath();
                            context.lineWidth = "7";
                            context.strokeStyle = "green";
                            context.moveTo(element.left +2,element.top + 20);
                            context.lineTo(element.left + 28,element.top +20);
                            context.stroke();
                        }
                        if (typeIsian == "GigiTiruanLepas") {
                            context.beginPath();
                            context.lineWidth = "7";
                            context.strokeStyle = "#EED63F";
                            context.moveTo(element.left + 2 ,element.top + 20);
                            context.lineTo(element.left +28,element.top + 20);
                            context.stroke();
                        }
                        element.type = typeIsian
                        element.color = "black"
                    }
                    if (element.type != '' ) {
                        if (element.type != 'white') {
                            data2.push(element)                            
                        }
                    }
                    
                }


                // Render elements.
                  // elements.forEach(function(element) {
                  //     context.fillStyle = element.colour;
                  //     context.fillRect(element.left, element.top, element.width, element.height);
                  // });

            //}

            // $scope.dataTransaksi = [
            //     {
            //     "colour": "yellow",
            //     "width": 30,
            //     "height": 30,
            //     "top": 385,
            //     "left": 510,
            //     "id": 220,
            //     "brs": 3,
            //     "kol": 8,
            //     "seg": 5,
            //     "type": "SisaAkar",
            //     "color": "black"
            //     },
            //     {
            //     "colour": "yellow",
            //     "width": 30,
            //     "height": 30,
            //     "top": 385,
            //     "left": 250,
            //     "id": 200,
            //     "brs": 3,
            //     "kol": 4,
            //     "seg": 5,
            //     "type": "SisaAkar",
            //     "color": "black"
            //     },
            //     {
            //     "colour": "red",
            //     "width": 30,
            //     "height": 15,
            //     "top": 370,
            //     "left": 445,
            //     "id": 211,
            //     "brs": 3,
            //     "kol": 7,
            //     "seg": 1,
            //     "type": "selai",
            //     "color": "#F544ED"
            //     },
            //     {
            //     "colour": "red",
            //     "width": 30,
            //     "height": 15,
            //     "top": 415,
            //     "left": 445,
            //     "id": 213,
            //     "brs": 3,
            //     "kol": 7,
            //     "seg": 3,
            //     "type": "selai",
            //     "color": "#F544ED"
            //     },
            //     {
            //     "colour": "yellow",
            //     "width": 30,
            //     "height": 30,
            //     "top": 275,
            //     "left": 595,
            //     "id": 160,
            //     "brs": 3,
            //     "kol": 6,
            //     "seg": 5,
            //     "type": "UE",
            //     "color": "black"
            //     },
            //     {
            //     "colour": "yellow",
            //     "width": 30,
            //     "height": 30,
            //     "top": 275,
            //     "left": 660,
            //     "id": 165,
            //     "brs": 3,
            //     "kol": 7,
            //     "seg": 5,
            //     "type": "UE",
            //     "color": "black"
            //     }
            // ]

            
            function isikeunColor(){
                var eel = [];
                manageLogistikPhp.getDataTableTransaksi('emr/get-data-odontogram?nocm=' + $scope.item.noMr).then(function (e) {
                    $scope.dataTransaksi = e.data.data
                    for (var i = 0; i < $scope.dataTransaksi.length; i++) {
                        typeIsian = $scope.dataTransaksi[i].type
                        isianColor = $scope.dataTransaksi[i].color
                        eel = $scope.dataTransaksi[i]
                        isiColor(eel)
                    }
                });
                
                
            }

            






            $scope.kliknol = function(data){
                data.src ="images/odontogram/1.jpg"
            }

            
            
            var HttpClient = function () {
                this.get = function (aUrl, aCallback) {
                    var anHttpRequest = new XMLHttpRequest();
                    anHttpRequest.onreadystatechange = function () {
                        if (anHttpRequest.readyState == 4 && anHttpRequest.status == 200)
                            aCallback(anHttpRequest.responseText);
                    }

                    anHttpRequest.open("GET", aUrl, true);
                    anHttpRequest.send(null);
                }
            }

            LoadCacheHelper();
            function LoadCacheHelper(){
                var chacePeriode = cacheHelper.get('OdontoGramDokterCtrl');
                if(chacePeriode != undefined){
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

                   $scope.dat2Head = chacePeriode
                   
                   if ($scope.item.namaRuangan.substr($scope.item.namaRuangan.length - 1) == '`') {
                        $scope.showTombol = true
                   }

                }
                isikeunColor()
            }

            $scope.save = function(){
                var objHead = {}
                objHead = {
                    'norec_pd' : norec_pd,
                    'nocm' : $scope.item.noMr,
                    'namapasien' : $scope.item.namaPasien,
                    'jeniskelamin' : $scope.item.jenisKelamin,
                    'noregistrasi' : $scope.item.noregistrasi,
                    'umur' : $scope.item.umur,
                    'kelompokpasien' : $scope.item.kelompokPasien,
                    'tglregistrasi' : $scope.item.tglRegistrasi,
                    'norec' : norec_apd,//norec_apd
                    'tglregistrasi' : $scope.item.tglRegistrasi,
                    'namakelas' : $scope.item.kelas,
                    'namaruangan' : $scope.item.namaRuangan
                }
                var objsave = {}
                objsave = {
                    'head' : objHead,
                    'data' : data2
                }
                //postpost
                manageLogistikPhp.postpost('emr/save-data-odontogram',objsave).then(function (e) {
                    
                });
            }

            function init() { 
               
                var client = new HttpClient();
                client.get('http://127.0.0.1:1237/formvb/rawat-jalan?form-odontogram'+'&norec_apd='+norec_apd+'&DokterId='+dokter+'&idUser='+idUser, function (response) {
                    // do something with response
                });
            }

            $scope.formatTanggal = function(tanggal){
                return moment(tanggal).format('DD-MMM-YYYY');
            }

            $scope.formatRupiah = function(value, currency) {
                return currency + " " + parseFloat(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
            }                       

//***********************************

}
]);
});

// http://127.0.0.1:1237/printvb/farmasiApotik?cetak-label-etiket=1&norec=6a287c10-8cce-11e7-943b-2f7b4944&cetak=1