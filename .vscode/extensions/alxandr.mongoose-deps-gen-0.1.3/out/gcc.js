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
// import * as vscode from 'vscode';
const execa = require("execa");
const fs = require("fs");
const memoizeAsync = (asyncFn) => {
    let p = null;
    return () => {
        if (p !== null) {
            return p;
        }
        p = asyncFn();
        return p;
    };
};
const verboseGcc = memoizeAsync(() => __awaiter(this, void 0, void 0, function* () {
    const proc = execa('gcc', ['-xc++', '-E', '-v', '-'], {
        stdin: 'pipe',
    });
    proc.stdin.end();
    const { stderr } = yield proc;
    return stderr;
}));
const parseGcc = (output) => {
    const lines = output
        .trim()
        .replace(/\r\n/g, '\n')
        .split('\n')
        .filter(s => s.trim().length > 0);
    const paths = [];
    let reading = false;
    for (const line of lines) {
        if (reading) {
            if (!line.startsWith(' ')) {
                reading = false;
            }
            else {
                const path = line.trim();
                if (fs.existsSync(path)) {
                    paths.push(path);
                }
                continue;
            }
        }
        if (line.trim().endsWith('search starts here:')) {
            reading = true;
        }
    }
    return paths;
};
exports.getGccSearchPaths = memoizeAsync(() => __awaiter(this, void 0, void 0, function* () {
    const gccOutput = yield verboseGcc();
    return parseGcc(gccOutput);
}));
//# sourceMappingURL=gcc.js.map