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
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const path = require("path");
const fs = require("./fs");
const mos_1 = require("./mos");
const gcc_1 = require("./gcc");
function maybeUpdateIncludes(channel, showMessage) {
    return __awaiter(this, void 0, void 0, function* () {
        channel.appendLine('Starting include paths update...');
        const mosConfigs = yield vscode.workspace.findFiles('mos.yml');
        yield Promise.all(mosConfigs.map(maybeupdateIncludeForProject(channel)));
        channel.appendLine('All include paths updated');
        if (showMessage) {
            vscode.window.showInformationMessage('Mongoose OS: C/C++ include paths updated');
        }
    });
}
exports.maybeUpdateIncludes = maybeUpdateIncludes;
const maybeupdateIncludeForProject = (channel) => (uri) => __awaiter(this, void 0, void 0, function* () {
    const workspace = yield vscode.workspace.getWorkspaceFolder(uri);
    if (!workspace) {
        return;
    }
    channel.appendLine(`Starting update for workspace: ${workspace.uri.fsPath}`);
    const gccSearchPath = yield gcc_1.getGccSearchPaths();
    const mosModulePaths = yield mos_1.getMosModulePaths(workspace);
    const propsFile = yield getPropsFile(workspace);
    const platforms = yield mos_1.getMosPlatforms(workspace);
    for (const platformName of platforms) {
        const mosIncludes = yield mos_1.getMosIncludes(workspace, platformName);
        const mosDefines = yield mos_1.getMosDefines(workspace, platformName);
        const platformConfig = getPlatformConfig(propsFile.configurations, platformName);
        const platformIncludes = [
            path.join(workspace.uri.fsPath, 'build', 'gen'),
            ...mosIncludes /*.map(relativeTo(workspace))*/,
            ...gccSearchPath,
            ...mosModulePaths /*.map(relativeTo(workspace))*/,
        ].map(path.normalize);
        platformConfig.defines = [...mosDefines];
        platformConfig.browse.path = [...platformIncludes];
        platformConfig.includePath = [...platformIncludes];
    }
    yield savePropsFile(workspace, propsFile);
    channel.appendLine(`Finished update for workspace: ${workspace.uri.fsPath}`);
});
function getPropsFile(workspace) {
    return __awaiter(this, void 0, void 0, function* () {
        const base = workspace.uri.fsPath;
        const dir = path.join(base, '.vscode');
        const file = path.join(dir, 'c_cpp_properties.json');
        let config = yield fs.tryReadAsync(file);
        if (!config) {
            yield fs.mkdirp(dir);
            yield fs.write(file, JSON.stringify({
                configurations: [],
                version: 4,
            }, null, 2));
            config = (yield fs.tryReadAsync(file));
        }
        return JSON.parse(config);
    });
}
function savePropsFile(workspace, props) {
    return __awaiter(this, void 0, void 0, function* () {
        const base = workspace.uri.fsPath;
        const dir = path.join(base, '.vscode');
        const file = path.join(dir, 'c_cpp_properties.json');
        yield fs.write(file, JSON.stringify(props, null, 2));
    });
}
function getPlatformConfig(configurations, platform) {
    let config = configurations.find(c => (c.mos && c.mos.platform === platform) || false);
    if (!config) {
        config = {
            name: `Mongoose OS (${platform})`,
            browse: {
                path: [],
                limitSymbolsToIncludedHeaders: true,
            },
            includePath: [],
            defines: [],
            cStandard: 'c11',
            cppStandard: 'c++17',
            intelliSenseMode: 'clang-x64',
            mos: { platform },
        };
        configurations.push(config);
    }
    return config;
}
//# sourceMappingURL=generator.js.map