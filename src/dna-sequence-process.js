/**
 * @file dna-sequence-process
 * @namespace dna
 * @licence GNU GPL v3
 * @copyright Copyright (c) 2014.
 */

/**
 * this {Array}
 * @param item
 * @param from
 * @returns {boolean}
 */
Array.prototype.contains = function (item, from) {

    return this.indexOf(item, from) !== -1;
};

/**
 * @ignore
 */
if (!window.dna) {
    window.dna = {};
}
