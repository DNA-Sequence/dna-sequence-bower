/**
 * @file dna-sequence-process
 * @namespace dna
 * @licence GNU GPL v3
 * @copyright Copyright (c) 2014.
 * Created by samuel on 17/06/14.
 */

/**
 * @global
 * @constructor
 */
window.dna.Node = function () {

};

/**
 *
 * @type {{value: {int}, connected: Array, candidate: boolean, x: {int}, y: {int}, charSeqA: {String}, charSeqB: {String}}}
 */
window.dna.Node.prototype = {
    /**
     * @global
     * @memberOf Node
     * @instance
     * @type {int}
     */
    value: null,
    /**
     * @global
     * @memberOf Node
     * @instance
     * @type {Array.<Connected>}
     */
    connected: [],
    /**
     * @global
     * @memberOf Node
     * @instance
     * @type {boolean}
     */
    candidate: false,
    /**
     * @global
     * @memberOf Node
     * @instance
     * @type {int}
     */
    x: null,
    /**
     * @global
     * @memberOf Node
     * @instance
     * @type {int}
     */
    y: null,
    /**
     * @global
     * @memberOf Node
     * @instance
     * @type {String}
     */
    charSeqA: null,
    /**
     * @global
     * @memberOf Node
     * @instance
     * @type {String}
     */
    charSeqB: null
};