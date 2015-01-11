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
window.dna.Matrix = function () {

};

window.dna.Matrix.prototype = {
    /**
     * @memberOf Matrix
     * @instance
     * @type {Array.<Node>}
     */
    nodes: [],
    /**
     * @memberOf Matrix
     * @instance
     * @type {Array.<string>}
     */
    sequenceA: [],
    /**
     * @memberOf Matrix
     * @instance
     * @type {Array.<string>}
     */
    sequenceB: []
};