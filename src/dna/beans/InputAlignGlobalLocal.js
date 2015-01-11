/**
 * @file dna-sequence-process
 * @namespace dna
 * @licence GNU GPL v3
 * @copyright Copyright (c) 2014.
 * Created by samuel on 17/06/14.
 */

/**
 * @global
 * @extends {InputAlign}
 * @constructor
 */
window.dna.InputAlignGlobalLocal = window.dna.InputAlign;

/**
 * @global
 * @memberOf window.dna.InputAlignGlobalLocal
 * @instance
 * @type {InputAlign}
 */
window.dna.InputAlignGlobalLocal.prototype = window.dna.InputAlign.prototype;

/**
 * @global
 * @memberOf InputAlignGlobalLocal
 * @instance
 * @type {int}
 */
window.dna.InputAlignGlobalLocal.prototype.gap = null;
/**
 * @global
 * @memberOf InputAlignGlobalLocal
 * @instance
 * @type {int}
 */
window.dna.InputAlignGlobalLocal.prototype.match = null;
/**
 * @global
 * @memberOf window.dna.InputAlignGlobalLocal
 * @instance
 * @type {int}
 */
window.dna.InputAlignGlobalLocal.prototype.misMatch = null;

/**
 * @global
 * @memberOf window.dna.InputAlignGlobalLocal
 * @instance
 * @type {Array}
 */
window.dna.InputAlignGlobalLocal.prototype.arrayMisMatch = null;