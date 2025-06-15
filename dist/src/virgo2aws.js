"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Virgo2AWS = void 0;
var virgo_1 = require("./virgo");
var aws_coordinates_json_1 = __importDefault(require("../lib/aws_coordinates.json"));
var Virgo2AWS = /** @class */ (function (_super) {
    __extends(Virgo2AWS, _super);
    function Virgo2AWS() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Virgo2AWS.getClosestRegion = function (options) {
        var _this = this;
        var origin = (options === null || options === void 0 ? void 0 : options.origin) || this.getLocation();
        var regions = (options === null || options === void 0 ? void 0 : options.regions) || this.awsDefaultRegions;
        var regionCoordinates = regions.map(function (region) {
            var awsRegion = _this.awsCoordinates.find(function (awsRegion) { return awsRegion.region === region; });
            if (!awsRegion)
                throw new Error("AWS region '".concat(region, "' not found"));
            return awsRegion.coordinates;
        });
        var distances = this.getDistances(regionCoordinates, origin);
        var minDistanceIndex = distances.indexOf(Math.min.apply(Math, distances));
        return {
            closestRegion: regions[minDistanceIndex],
            distance: distances[minDistanceIndex]
        };
    };
    Virgo2AWS.awsCoordinates = aws_coordinates_json_1.default;
    Virgo2AWS.awsDefaultRegions = [
        "ap-northeast-1",
        "ap-northeast-2",
        "ap-south-1",
        "ap-southeast-1",
        "ap-southeast-2",
        "ca-central-1",
        "eu-central-1",
        "eu-west-1",
        "eu-west-2",
        "eu-west-3",
        "sa-east-1",
        "us-east-1",
        "us-east-2",
        "us-west-1",
        "us-west-2"
    ];
    return Virgo2AWS;
}(virgo_1.Virgo));
exports.Virgo2AWS = Virgo2AWS;
