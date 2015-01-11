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
window.dna.OutputResultAlign = function () {

};

/**
 *
 * @type {{nodes: Array, resultSequenceA: {String}, resultSequenceB: {String}, score: {int}}}
 */
window.dna.OutputResultAlign.prototype = {
    /**
     * @global
     * @memberOf OutputResultAlign
     * @instance
     * @type {Array.<Node>}
     */
    nodes: [],
    /**
     * @global
     * @memberOf OutputResultAlign
     * @instance
     * @type {String}
     */
    resultSequenceA: null,
    /**
     * @global
     * @memberOf OutputResultAlign
     * @instance
     * @type {String}
     */
    resultSequenceB: null,
    /**
     * @global
     * @memberOf OutputResultAlign
     * @instance
     * @type {int}
     */
    score: null
};