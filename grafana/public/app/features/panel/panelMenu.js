/*! grafana - v2.5.0 - 2015-10-28
 * Copyright (c) 2015 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","jquery","lodash"],function(a,b,c){"use strict";a.module("grafana.directives").directive("panelMenu",["$compile","linkSrv",function(d,e){function f(a){var b='<div class="panel-menu small">';return b+='<div class="panel-menu-row">',a.panel.links&&c.each(a.panel.links,function(c){var d=e.getPanelLinkAnchorInfo(c,a.panel.scopedVars);b+='<a class="panel-menu-link" href="'+d.href+'" target="'+d.target+'">'+d.title+"</a>"}),b}function g(a){var b='<div class="panel-menu small">';return a.dashboardMeta.canEdit&&(b+='<div class="panel-menu-inner">',b+='<div class="panel-menu-row">',b+='<a class="panel-menu-icon pull-left" ng-click="updateColumnSpan(-1)"><i class="fa fa-minus"></i></a>',b+='<a class="panel-menu-icon pull-left" ng-click="updateColumnSpan(1)"><i class="fa fa-plus"></i></a>',b+='<a class="panel-menu-icon pull-right" ng-click="removePanel(panel)"><i class="fa fa-remove"></i></a>',b+='<div class="clearfix"></div>',b+="</div>"),b+='<div class="panel-menu-row">',b+='<a class="panel-menu-link" gf-dropdown="extendedMenu"><i class="fa fa-bars"></i></a>',c.each(a.panelMeta.menu,function(c){("Editor"!==c.role||a.dashboardMeta.canEdit)&&(b+='<a class="panel-menu-link" ',c.click&&(b+=' ng-click="'+c.click+'"'),c.editorLink&&(b+=' dash-editor-link="'+c.editorLink+'"'),b+=">",b+=c.text+"</a>")}),b+="</div>",b+="</div>",b+="</div>"}function h(b){var c=a.copy(b.panelMeta.extendedMenu);return c}var i='<span class="panel-title drag-handle pointer"><span class="panel-title-text drag-handle">{{panel.title | interpolateTemplateVars:this}}</span><span class="panel-links-btn"><i class="fa fa-external-link"></i></span><span class="panel-time-info" ng-show="panelMeta.timeInfo"><i class="fa fa-clock-o"></i> {{panelMeta.timeInfo}}</span></span>';return{restrict:"A",link:function(a,c){function e(b,c){return clearTimeout(n),n=null,b?void(n=setTimeout(e,b)):c!==!0&&(o.is(":hover")||a.dashboard.$$panelDragging)?void e(2200):void(m&&(o.unbind(),o.remove(),m.$destroy(),m=null,o=null,l.removeClass("panel-highlight")))}var j=b(i),k=j.find(".panel-links-btn"),l=c.parents(".panel-container"),m=null,n=null,o=null;c.append(j),a.$watchCollection("panel.links",function(b){var c=(b?b.length>0:!1)&&""!==a.panel.title;k.toggle(c)});var p=function(i){if(b.contains(document,i.target)){if(o)return void e();var j;j=b(i.target).hasClass("fa-external-link")?f(a):g(a),o=b(j),o.mouseleave(function(){e(1e3)}),m=a.$new(),m.extendedMenu=h(a),m.dismiss=function(){e(null,!0)},b(".panel-container").removeClass("panel-highlight"),l.toggleClass("panel-highlight"),b(".panel-menu").remove(),c.append(o),a.$apply(function(){d(o.contents())(m);var a=o[0].offsetWidth,e=o[0].offsetHeight,f=b(window).width(),g=b(c).offset().left,h=b(c).width(),i=h/2-a/2,j=g+i+a-f;j>0&&(i-=j+10),0>g+i&&(i=0),o.css({left:i,top:-e})}),e(2200)}};c.click(p),d(c.contents())(a)}}}])});