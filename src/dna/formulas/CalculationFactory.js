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
 * @type {{createCalculation: createCalculation}}
 */
window.dna.CalculationFactory = {
    /**
     *
     * @static
     * @memberOf CalculationFactory
     * @returns {Calculation}
     */
    createCalculation: function (inputAlign) {
        if (inputAlign) {
            switch (inputAlign.methodSequencing) {
                case window.dna.MethodSequencing.GLOBAL:
                    return new window.dna.CalculationGlobal(inputAlign);
                case window.dna.MethodSequencing.LOCAL:
                    return new window.dna.CalculationLocal(inputAlign);
                case window.dna.MethodSequencing.SEMIGLOBAL:
                    return new window.dna.CalculationSemiGlobal(inputAlign);
            }
        }
        throw ("Method Sequencing not defined");
    }
};