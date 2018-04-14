const fs = require('fs');
const tldjs = require('tldjs')

var disposable = fs.readFileSync('../assets/data/disposable.txt').toString().split('\n');
var free = fs.readFileSync('../assets/data/free.txt').toString().split('\n');

function isFree(email) {
    if (typeof email !== 'string') throw new TypeError('email must be a string');
    var domain = tldjs.getDomain(email.split('@').pop());
    return free.indexOf(domain) !== -1;
}

function isDisposable(email) {
    if (typeof email !== 'string') throw new TypeError('email must be a string');
    var domain = tldjs.getDomain(email.split('@').pop());
    return disposable.indexOf(domain) !== -1;
}

module.exports = {
    isFree: isFree,
    isDisposable: isDisposable
};