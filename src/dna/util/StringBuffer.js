/**
 * @file dna-sequence-process
 * @namespace dna
 * @licence GNU GPL v3
 * @copyright Copyright (c) 2014.
 * Created by samuel on 17/06/14.
 */

/**
 *
 * @param _string
 * @constructor
 */
window.StringBuffer = function (_string) {
    this.string = "";
    if (_string) {
        this.string = _string;
    }
};

/**
 *
 * @type {{insert: insert, toString: toString}}
 */
window.StringBuffer.prototype = {
    /**
     *
     * @param index
     * @param _s
     * @returns {string}
     */
    insert: function (index, _s) {

        if (index > 0) {
            this.string = this.string.substring(0, index) + _s + this.string.substring(index, this.string.length);
        } else {
            this.string = _s + this.string;
        }

        return this.string;
    },
    /**
     *
     * @returns {string}
     */
    toString: function () {
        return this.string;
    }
};
