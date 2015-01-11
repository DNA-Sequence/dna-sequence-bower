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
window.dna.InputAlign = function () {

};


window.dna.InputAlign.prototype = {
    /**
     * @global
     * @memberOf InputAlign
     * @instance
     * @type {int}
     */
    id: null,
    /**
     * @global
     * @memberOf InputAlign
     * @instance
     * @type {String}
     */
    sequenceA: null,
    /**
     * @global
     * @memberOf InputAlign
     * @instance
     * @type {String}
     */
    sequenceB: null,
    /**
     * @global
     * @memberOf InputAlign
     * @instance
     * @type {TypeElement}
     */
    typeElement: null,
    /**
     * @global
     * @memberOf InputAlign
     * @instance
     * @type {MethodSequencing}
     */
    methodSequencing: null
};