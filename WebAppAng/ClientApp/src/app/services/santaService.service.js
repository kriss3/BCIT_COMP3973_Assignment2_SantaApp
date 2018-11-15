"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SantaService = /** @class */ (function () {
    function SantaService(http) {
        this.http = http;
        this.baseUrl = 'http://localhost:5001/';
    }
    SantaService.prototype.getChildren = function () {
        //return this.http.get<Child[]>(this.baseUrl);
        return "Calling http apin GET Children";
    };
    SantaService.prototype.deleteChild = function (id) {
        return this.http.delete(this.baseUrl + id);
    };
    SantaService.prototype.createChild = function (_child) {
        return this.http.post(this.baseUrl, _child);
    };
    SantaService.prototype.getChildById = function (id) {
        return this.http.get(this.baseUrl + '/' + id);
    };
    SantaService.prototype.updateChild = function (_child) {
        return this.http.put(this.baseUrl + '/' + _child.Id, _child);
    };
    return SantaService;
}());
exports.SantaService = SantaService;
//# sourceMappingURL=santaService.service.js.map