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
window.dna.InputResultAlign = function () {

};

window.dna.InputResultAlign.prototype = {

    /**
     * @global
     * @memberOf InputResultAlign
     * @instance
     * @type {int}
     */
    idMatrix: null,
    /**
     * @global
     * @memberOf InputResultAlign
     * @instance
     * @type {Matrix}
     */
    matrix: null,
    /**
     * @global
     * @memberOf InputResultAlign
     * @instance
     * @type {Connected}
     */
    connecteds: null,
    /**
     * @global
     * @memberOf InputResultAlign
     * @instance
     * @type {int}
     */
    idPosX: null,
    /**
     * @global
     * @memberOf InputResultAlign
     * @instance
     * @type {int}
     */
    idPosY: null,
    /**
     * @global
     * @memberOf InputResultAlign
     * @instance
     * @type {Node}
     */
    node: null
};