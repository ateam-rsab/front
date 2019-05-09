 define(['Configuration'], function(config) {

     var httpServiceDataMaster = angular.module('HttpServicesDataMaster', []);
     httpServiceDataMaster.service('ModelItemDataMaster', ['$mdDialog', '$q', '$http', '$resource', 'TextHelper',
         function($mdDialog, $q, $http, $resource, textHelper) {

            var beforeSubmit =
                 function(data, back) {
                     var item = {};
                     if ($.isFunction(data)) return;
                     if (data instanceof Array)
                         item = [];
                     for (var key in data) {
                         if (key === '$$hashKey') continue;
                         if (key === '_events') continue;
                         if (key === '_handlers') continue;
                         if (key === 'uid') continue;
                         if (key === 'dirty') continue;
                         if (key === 'parent') continue; //
                         if (key === 'attributes') continue;
                         if (data.hasOwnProperty(key)) {
                             var element = data[key];
                             if (element instanceof Array) {
                                 var temp = [];
                                 for (var i in element) {
                                     if (element.hasOwnProperty(i)) {
                                         var detailElement = element[i];
                                         temp.push(beforeSubmit(detailElement, back));
                                     }
                                 }
                                 if (data instanceof Array)
                                     item.push(temp);
                                 else
                                     item[key] = temp;
                             } else {
                                 if (key.indexOf('tanggal') > -1 || key.indexOf('tgl') > -1) {
                                     if (back) {

                                     } else {
                                         if (element === undefined) {
                                             item[key] = null;
                                         } else
                                         if (element === 0 || element === null)
                                             item[key] = undefined;
                                         else
                                         if (isNaN(Date.parse(element)))
                                             item[key] = new Date(element)
                                         else
                                             item[key] = Date.parse(element);
                                     }
                                 } else {
                                     if (data instanceof Array) {
                                         var temp = element;
                                         if (temp instanceof Object)
                                             temp = beforeSubmit(temp, back);
                                         item.push(temp);
                                     } else if (element instanceof Object) {
                                         item[key] = beforeSubmit(element, back);
                                     } else
                                         item[key] = element;
                                 }
                             }
                         }
                     }
                     return item;
                 }
             var items = [];

             return {
                 beforePost: function(data) {
                     return beforeSubmit(data);
                 },

                setValidation:function(scope, listRawRequired){
                    var listFixRequired = [];
                    var msg = "";

                    for(var i=0; i<listRawRequired.length; i++){
                        var arr = listRawRequired[i].split("|");
                        var arrModel = arr[0].split(".");
                        var obj = {
                            ngModel : scope[arrModel[0]][arrModel[1]],
                            ngModelText : arr[0],
                            type : arr[1],
                            label : arr[2]
                        };

                        listFixRequired.push(obj);
                    }

                    for(var i=0; i<listFixRequired.length; i++){
                        if(listFixRequired[i].ngModel === undefined || listFixRequired[i].ngModel === ""){
                            this.cekValidation(listFixRequired[i].type, listFixRequired[i].ngModelText, false);
                            msg += listFixRequired[i].label + " tidak boleh kosong|";
                        }
                        else
                        {
                            this.cekValidation(listFixRequired[i].type, listFixRequired[i].ngModelText, true);
                        }
                    }

                    var result = {};
                    if(msg == ""){
                        result = {
                            status : true
                        };
                    }
                    else
                    {
                        result = {
                            status : false,
                            messages : msg
                        };
                    }

                    return result;
                 },

                 cekEnableDisableButton: function(buttonDisabled) {

                     if(!buttonDisabled)
                     {
                        var element = angular.element('[class="btnTemplate1"]');
                        element.addClass("button-disabled");
                     }
                     else
                     {
                        var element = angular.element('[class="btnTemplate1 button-disabled"]');
                        element.removeClass("button-disabled")
                     }
                 },

                 cekValidation: function(ngModelType, ngModelName, statusValidation) {
                     var element = angular.element('['+ngModelType+'="'+ngModelName+'"]');

                     if(!statusValidation)
                     {
                        element.addClass("validation-error");
                     }
                     else
                     {
                        element.removeClass("validation-error")
                     }
                 },

                 showMessages: function(messages){
                    var arrMsgError = messages.split("|");
                    for(var i=0; i<arrMsgError.length-1; i++){
                        window.messageContainer.error(arrMsgError[i]);
                    }
                 },

                 showAlertDialog : function(title, textContent, labelOk, labelCancel){
                    if(labelCancel == undefined){
                        return $mdDialog.confirm()
                          .title(title)
                          .textContent(textContent)
                          .ariaLabel('Lucky day')
                          .ok(labelOk)
                          .cancel(labelCancel)
                    }
                    else
                    {
                        return $mdDialog.confirm()
                          .title(title)
                          .textContent(textContent)
                          .ariaLabel('Lucky day')
                          .ok(labelOk)
                    }
                 }
            };
         }
     ]);
     httpServiceDataMaster.service('R_DataMaster', ['$q', '$http', function($q, $http) {
         return {
             get: function(obj) {
                 var deffer = $q.defer();
                 if (obj.method === undefined)
                     obj.method = "GET";
                 var authorization = "";
                 var arr = document.cookie.split(';')
                 for (var i = 0; i < arr.length; i++) {
                     var element = arr[i].split('=');
                     if (element[0].indexOf('authorization') > 0) {
                         authorization = element[1];
                     }
                 }
                 var url = "";
                 if (obj.url.indexOf("?") >= 0) {
                     url = obj.url + "&X-AUTH-TOKEN=" + authorization;
                 } else
                     url = obj.url + "?X-AUTH-TOKEN=" + authorization;

                 $http.get(url, {
                     headers: {
                         'Content-Type': 'application/json',
                         'X-AUTH-TOKEN': authorization
                     }
                 }).then(function successCallback(response) {
                     response.statResponse = true;
                     deffer.resolve(response);
                 }, function errorCallback(response, err, da) {
                     response.statResponse = false;
                     deffer.reject(response);
                 });
                 return deffer.promise;
             },
             post: function(obj, data) {
                 console.log(JSON.stringify(data));
                 var deffer = $q.defer();
                 if (obj.method === undefined)
                     obj.method = "GET";
                 var authorization = "";
                 var arr = document.cookie.split(';')
                 for (var i = 0; i < arr.length; i++) {
                     var element = arr[i].split('=');
                     if (element[0].indexOf('authorization') > 0) {
                         authorization = element[1];
                     }
                 }
                 var url = "";
                 if (obj.url.indexOf("?") >= 0) {
                     url = obj.url + "&X-AUTH-TOKEN=" + authorization;
                 } else
                     url = obj.url + "?X-AUTH-TOKEN=" + authorization;
                 var req = {
                     method: 'POST',
                     url: url,
                     headers: {
                         'Content-Type': 'application/json',
                         'X-AUTH-TOKEN': authorization
                     },
                     data: data
                 }
                 $http(req).then(function successCallback(response) {
                     if (response.data.data !== null) {
                         if (response.data.data.message != undefined) {
                             var msg = response.data.data.message;
                             window.messageContainer.log(msg);
                         } else if (response.data.messages) {
                             var msg = response.data.messages;
                             window.messageContainer.log(msg['label-success']);
                         } else if (response.data.messages != undefined) {
                             var msg = response.data.messages;
                             window.messageContainer.log(msg['label-success']);
                         }
                     }
                     deffer.resolve(response);
                 }, function errorCallback(response) {
                     var msgError = "";
                     if (response.data.fieldErrors != undefined) {

                         for (var i = 0; i < response.data.fieldErrors.length; i++) {
                             msgError = response.data.fieldErrors[i].message;
                             window.messageContainer.error(msgError);
                         }
                     } else {
                         msgError = response.statusText;
                         window.messageContainer.error(msgError);
                     }

                     deffer.reject(response);
                 });
                 return deffer.promise;
             }
         }
     }]);
 });