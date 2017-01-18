/*! grafana - v2.5.0 - 2015-10-28
 * Copyright (c) 2015 Torkel Ödegaard; Licensed Apache-2.0 */

define(["angular"],function(a){"use strict";var b=a.module("grafana.controllers");b.controller("OrgApiKeysCtrl",["$scope","$http","backendSrv",function(a,b,c){a.roleTypes=["Viewer","Editor","Admin"],a.token={role:"Viewer"},a.init=function(){a.getTokens()},a.getTokens=function(){c.get("/api/auth/keys").then(function(b){a.tokens=b})},a.removeToken=function(b){c["delete"]("/api/auth/keys/"+b).then(a.getTokens)},a.addToken=function(){c.post("/api/auth/keys",a.token).then(function(b){var c=a.$new(!0);c.key=b.key,a.appEvent("show-modal",{src:"./app/features/org/partials/apikeyModal.html",scope:c}),a.getTokens()})},a.init()}])});