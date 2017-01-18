/*! grafana - v2.5.0 - 2015-10-28
 * Copyright (c) 2015 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","lodash","jquery"],function(a,b,c){"use strict";var d=a.module("grafana.controllers");d.controller("AnnotationsEditorCtrl",["$scope","datasourceSrv",function(d,e){var f={name:"",datasource:null,showLine:!0,iconColor:"#C0C6BE",lineColor:"rgba(255, 96, 96, 0.592157)",iconSize:13,enable:!0};d.init=function(){d.mode="list",d.datasources=e.getAnnotationSources(),d.annotations=d.dashboard.annotations.list,d.reset(),d.$watch("mode",function(a){"new"===a&&d.reset()})},d.datasourceChanged=function(){d.currentDatasource=b.findWhere(d.datasources,{name:d.currentAnnotation.datasource}),d.currentDatasource||(d.currentDatasource=d.datasources[0])},d.edit=function(a){d.currentAnnotation=a,d.currentIsNew=!1,d.datasourceChanged(),d.mode="edit",c(".tooltip.in").remove()},d.reset=function(){d.currentAnnotation=a.copy(f),d.currentIsNew=!0,d.datasourceChanged(),d.currentAnnotation.datasource=d.currentDatasource.name},d.update=function(){d.reset(),d.mode="list",d.broadcastRefresh()},d.add=function(){d.annotations.push(d.currentAnnotation),d.reset(),d.mode="list",d.updateSubmenuVisibility(),d.broadcastRefresh()},d.removeAnnotation=function(a){var c=b.indexOf(d.annotations,a);d.annotations.splice(c,1),d.updateSubmenuVisibility(),d.broadcastRefresh()}}])});