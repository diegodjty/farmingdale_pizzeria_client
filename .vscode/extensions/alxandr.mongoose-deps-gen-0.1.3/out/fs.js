"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const _mkdirp = require("mkdirp");
exports.existsAsync = (p) => new Promise(resolve => fs.exists(p, resolve));
exports.tryReadAsync = (p) => new Promise((resolve, reject) => {
    fs.readFile(p, 'utf-8', (err, content) => {
        if (err && err.code === 'ENOENT') {
            return resolve(null);
        }
        if (err) {
            return reject(err);
        }
        return resolve(content);
    });
});
exports.mkdirp = (p) => new Promise((resolve, reject) => _mkdirp(p, err => {
    if (err) {
        return reject(err);
    }
    return resolve();
}));
exports.write = (p, content) => new Promise((resolve, reject) => fs.writeFile(p, content, 'utf-8', err => {
    if (err) {
        return reject(err);
    }
    return resolve();
}));
//# sourceMappingURL=fs.js.map