webpackJsonp([2],{1134:function(n,t,e){e(979),n.exports=e(978)},978:function(n,t){/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
!function(){setInterval(function(){sendAction((new Date).getTime(),"This is a date")},1e3)}()},979:function(n,t){/*
 *  @license
 *  Copyright Hôpitaux Universitaires de Genève. All Rights Reserved.
 *
 *  Use of this source code is governed by an Apache-2.0 license that can be
 *  found in the LICENSE file at https://github.com/DSI-HUG/dejajs-components/blob/master/LICENSE
 */
window.sendAction=function(){function n(){for(var n=[],t=0;t<arguments.length;t++)n[t-0]=arguments[t];"function"==typeof GlobalEventEmmitter&&GlobalEventEmmitter.instance.emit("sendaction",n)}return n}()}},[1134]);