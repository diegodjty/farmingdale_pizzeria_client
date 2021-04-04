"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const execa = require("execa");
const path = require("path");
function getMosPlatforms(workspace) {
    return __awaiter(this, void 0, void 0, function* () {
        // await execa('mos', ['build', '--platform', 'esp8266', '--local']);
        const json = yield execa.stdout('mos', ['-X', 'eval-manifest-expr', '--platform', 'esp8266', 'platforms'], {
            cwd: workspace.uri.fsPath,
        });
        return JSON.parse(json);
    });
}
exports.getMosPlatforms = getMosPlatforms;
function getMosModulePaths(workspace) {
    return __awaiter(this, void 0, void 0, function* () {
        const base = yield execa.stdout('mos', ['-X', 'get-mos-repo-dir'], {
            cwd: workspace.uri.fsPath,
        });
        return [
            path.join(base, 'fw', 'include'),
            path.join(base, 'fw', 'src'),
            path.join(base, 'frozen'),
            base,
        ];
    });
}
exports.getMosModulePaths = getMosModulePaths;
function getMosIncludes(workspace, platformName) {
    return __awaiter(this, void 0, void 0, function* () {
        const json = yield execa.stdout('mos', ['-X', 'eval-manifest-expr', '--platform', platformName, 'includes'], { cwd: workspace.uri.fsPath });
        return JSON.parse(json);
    });
}
exports.getMosIncludes = getMosIncludes;
function getMosDefines(workspace, platformName) {
    return __awaiter(this, void 0, void 0, function* () {
        const json = yield execa.stdout('mos', ['-X', 'eval-manifest-expr', '--platform', platformName, 'build_vars'], { cwd: workspace.uri.fsPath });
        const build_vars = JSON.parse(json);
        return Object.keys(build_vars).filter(k => build_vars[k] === '1');
    });
}
exports.getMosDefines = getMosDefines;
//# sourceMappingURL=mos.js.map