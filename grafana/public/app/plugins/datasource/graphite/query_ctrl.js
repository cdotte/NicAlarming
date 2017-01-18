/*! grafana - v2.5.0 - 2015-10-28
 * Copyright (c) 2015 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular","lodash","config","./gfunc","./parser"],function(a,b,c,d,e){"use strict";var f=a.module("grafana.controllers");f.controller("GraphiteQueryCtrl",["$scope","uiSegmentSrv","templateSrv",function(a,c,f){function g(){if(a.functions=[],a.segments=[],delete a.parserError,!a.target.textEditor){var b=new e(a.target.target),c=b.getAst();if(null===c)return void k(0);if("error"===c.type)return a.parserError=c.message+" at position: "+c.pos,void(a.target.textEditor=!0);try{i(c)}catch(d){console.log("error parsing target:",d.message),a.parserError=d.message,a.target.textEditor=!0}k(a.segments.length-1)}}function h(a,b,c,d){d&&(c=Math.max(c-1,0)),a.params[c]=b}function i(e,f,g){if(null===e)return null;switch(e.type){case"function":var j=d.createFuncInstance(e.name,{withDefaultParams:!1});b.each(e.params,function(a,b){i(a,j,b)}),j.updateText(),a.functions.push(j);break;case"series-ref":h(f,e.value,g,a.segments.length>0);break;case"bool":case"string":case"number":if(g-1>=f.def.params.length)throw{message:"invalid number of parameters to method "+f.def.name};h(f,e.value,g,!0);break;case"metric":if(a.segments.length>0){if(1!==e.segments.length)throw{message:"Multiple metric params not supported, use text editor."};h(f,e.segments[0].value,g,!0);break}a.segments=b.map(e.segments,function(a){return c.newSegment(a)})}}function j(c){var d=a.segments.slice(0,c);return b.reduce(d,function(a,b){return a?a+"."+b.value:b.value},"")}function k(b){if(0===b)return void a.segments.push(c.newSelectMetric());var d=j(b+1);return a.datasource.metricFindQuery(d).then(function(e){if(0===e.length)return void(""!==d&&(a.segments=a.segments.splice(0,b),a.segments.push(c.newSelectMetric())));if(e[0].expandable){if(a.segments.length!==b)return k(b+1);a.segments.push(c.newSelectMetric())}}).then(null,function(b){a.parserError=b.message||"Failed to issue metric query"})}function l(c){b.each(a.segments,function(a,b){a.focus=c===b})}function m(a,b){return b.render(a)}a.init=function(){a.target&&(a.target.target=a.target.target||"",g())},a.toggleEditorMode=function(){a.target.textEditor=!a.target.textEditor,g()},a.getAltSegments=function(d){var e=0===d?"*":j(d)+".*";return a.datasource.metricFindQuery(e).then(function(a){var d=b.map(a,function(a){return c.newSegment({value:a.text,expandable:a.expandable})});return 0===d.length?d:(b.each(f.variables,function(a){d.unshift(c.newSegment({type:"template",value:"$"+a.name,expandable:!0}))}),d.unshift(c.newSegment("*")),d)}).then(null,function(b){return a.parserError=b.message||"Failed to issue metric query",[]})},a.segmentValueChanged=function(b,c){return delete a.parserError,a.functions.length>0&&a.functions[0].def.fake&&(a.functions=[]),b.expandable?k(c+1).then(function(){l(c+1),a.targetChanged()}):(a.segments=a.segments.splice(0,c+1),l(c+1),void a.targetChanged())},a.targetTextChanged=function(){g(),a.get_data()},a.targetChanged=function(){if(!a.parserError){var c=a.target.target,d=j(a.segments.length);a.target.target=b.reduce(a.functions,m,d),a.target.target!==c&&a.$parent.get_data()}},a.removeFunction=function(c){a.functions=b.without(a.functions,c),a.targetChanged()},a.addFunction=function(b){var c=d.createFuncInstance(b,{withDefaultParams:!0});c.added=!0,a.functions.push(c),a.moveAliasFuncLast(),a.smartlyHandleNewAliasByNode(c),1===a.segments.length&&a.segments[0].fake&&(a.segments=[]),!c.params.length&&c.added&&a.targetChanged()},a.moveAliasFuncLast=function(){var c=b.find(a.functions,function(a){return"alias"===a.def.name||"aliasByNode"===a.def.name||"aliasByMetric"===a.def.name});c&&(a.functions=b.without(a.functions,c),a.functions.push(c))},a.smartlyHandleNewAliasByNode=function(b){if("aliasByNode"===b.def.name)for(var c=0;c<a.segments.length;c++)if(a.segments[c].value.indexOf("*")>=0)return b.params[0]=c,b.added=!1,void a.targetChanged()},a.toggleMetricOptions=function(){a.panel.metricOptionsEnabled=!a.panel.metricOptionsEnabled,a.panel.metricOptionsEnabled||delete a.panel.cacheTimeout},a.init()}])});