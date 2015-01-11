/**
 * @file dna-sequence-process
 * @namespace dna
 * @licence GNU GPL v3
 * @copyright Copyright (c) 2014.
 * Created by samuel on 23/08/14.
 */

/**
 * @global
 * @constructor
 */
window.dna.NodeDetail = function () {

};

window.dna.NodeDetail.prototype = {
    /**
     * @global
     * @memberOf NodeDetail
     * @instance
     * @type {Node}
     */
    node: null,
    /**
     * @global
     * @memberOf NodeDetail
     * @instance
     * @type {Node}
     */
    nodeW: null,
    /**
     * @global
     * @memberOf NodeDetail
     * @instance
     * @type {Node}
     */
    nodeNW: null,
    /**
     * @global
     * @memberOf NodeDetail
     * @instance
     * @type {Node}
     */
    nodeN: null,
    /**
     * @global
     * @memberOf NodeDetail
     * @instance
     * @type {String}
     */
    nodeCalcW: null,
    /**
     * @global
     * @memberOf NodeDetail
     * @instance
     * @type {String}
     */
    nodeCalcNW: null,
    /**
     * @global
     * @memberOf nodeSumN
     * @instance
     * @type {String}
     */
    nodeSumN : null,
    /**
     * @global
     * @memberOf nodeSumW
     * @instance
     * @type {String}
     */
    nodeSumW : null,
    /**
     * @global
     * @memberOf nodeSumNW
     * @instance
     * @type {String}
     */
    nodeSumNW : null
};