"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Virgo = void 0;
// Virgo, a browser JS library that approximates user location (and distance) based on timezone.
var timezone_centroids_json_1 = __importDefault(require("../lib/timezone_centroids.json"));
var timezone_links_json_1 = __importDefault(require("../lib/timezone_links.json"));
var Virgo = /** @class */ (function () {
    function Virgo() {
    }
    Virgo.toRadians = function (degrees) {
        return degrees * (Math.PI / 180);
    };
    Virgo.getLocation = function (timeZone) {
        var defaultTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
        var selectedTimeZone = timeZone || defaultTimeZone;
        if (Object.keys(timezone_centroids_json_1.default).includes(selectedTimeZone)) {
            return this.timezoneCentroids[selectedTimeZone];
        }
        else if (Object.keys(timezone_links_json_1.default).includes(selectedTimeZone)) {
            console.info("Time zone '".concat(selectedTimeZone, "' links to ").concat(timezone_links_json_1.default[selectedTimeZone]));
            return this.timezoneCentroids[timezone_links_json_1.default[selectedTimeZone]];
        }
        else {
            console.warn("Time zone '".concat(selectedTimeZone, "' is not supported. Location not found."));
            return { latitude: Infinity, longitude: Infinity };
        }
    };
    Virgo.getDistances = function (params) {
        var radius = 6371; // Radius of the earth in km
        var distances = [];
        var origin;
        if (!(params === null || params === void 0 ? void 0 : params.from)) {
            origin = this.getLocation(); // Default to callers location when undefined
        }
        else if (typeof params.from === "string") {
            origin = this.getLocation(params.from); // Lookup timezone string
        }
        else {
            origin = params.from; // Accept the coordinates
        }
        for (var _i = 0, _a = params.to; _i < _a.length; _i++) {
            var destination = _a[_i];
            if (typeof destination === "string") {
                destination = this.getLocation(destination); // Lookup timezone string
            }
            var deltaLat = this.toRadians(destination.latitude - origin.latitude);
            var deltaLon = this.toRadians(destination.longitude - origin.longitude);
            var distanceFactor = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
                Math.cos(this.toRadians(origin.latitude)) *
                    Math.cos(this.toRadians(destination.latitude)) *
                    Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
            var arc = 2 * Math.atan2(Math.sqrt(distanceFactor), Math.sqrt(1 - distanceFactor));
            distances.push(radius * arc);
        }
        return distances;
    };
    Virgo.timezoneCentroids = timezone_centroids_json_1.default;
    return Virgo;
}());
exports.Virgo = Virgo;
