/**
 * @file dna-sequence-process
 * @namespace dna
 * @licence GNU GPL v3
 * @copyright Copyright (c) 2014.
 * Created by samuel on 17/06/14.
 */
/**
 *
 * @global
 * @enum
 * @type {{N: string, W: string, S: string, E: string, NW: string, NE: string, SE: string, SW: string}}
 */
window.dna.Connected = {
    /**
     * &#8593; north
     * @type {string}
     */
    N: "N",
    /**
     * &#8592; west
     * @type {string}
     */
    W: "W",
    /**
     * &#8595; south
     * @type {string}
     */
    S: "S",
    /**
     * &#8594; east
     * @type {string}
     */
    E: "E",
    /**
     * &#8598; northwest
     * @type {string}
     */
    NW: "NW",
    /**
     * &#8599; northeast
     * @type {string}
     */
    NE: "NE",
    /**
     * &#8600; southeast
     * @type {string}
     */
    SE: "SE",
    /**
     * &#8601; southwest
     * @type {string}
     */
    SW: "SW"
};

/**
 * @global
 * @enum
 * @type {{GLOBAL: string, LOCAL: string}}
 */
window.dna.MethodSequencing = {
    /**
     * NEEDLEMAN-WUNSCH
     * @type {string}
     */
    GLOBAL: "GLOBAL",
    /**
     * SMITH-WATERMAN
     * @type {string}
     */
    LOCAL: "LOCAL",
    /**
     * SEMI-GLOBAL
     * @type {string}
     */
    SEMIGLOBAL: "SEMIGLOBAL"
};

/**
 * @global
 * @enum
 * @type {{PROTEIN: string, NUCLEOTIDE: string}}
 */
window.dna.TypeElement = {
    /**
     * PROTEIN
     * @type {string}
     */
    PROTEIN: "PROTEIN",
    /**
     * NUCLEOTIDE
     * @type {string}
     */
    NUCLEOTIDE: "NUCLEOTIDE"
};