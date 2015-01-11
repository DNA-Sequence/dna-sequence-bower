/**
 * @file dna-sequence-process
 * @namespace dna
 * @licence GNU GPL v3
 * @copyright Copyright (c) 2014.
 * Created by samuel on 17/06/14.
 */

/**
 * @global
 * @extends {Calculation}
 * @param {InputAlign} _inputAlign
 * @constructor
 */
window.dna.CalculationSemiGlobal = function (_inputAlign) {
    /**
     * @description call AbstractCalculation
     */
    window.dna.AbstractCalculation.call(this, _inputAlign);

    /**
     *
     * @param {NodeController} _nodeController
     */
    this.calculationNodeGlobal = function (_nodeController) {
        this.setGaps();
        this.saveValue(_nodeController);
    };

    /**
     *
     * @param {NodeController} _nodeController
     */
    this.saveValue = function (_nodeController) {

        var Connected = window.dna.Connected;

        var nnw = _nodeController.nodeControllerNW;
        var nn = _nodeController.nodeControllerN;
        var nw = _nodeController.nodeControllerW;

        if (nnw && nnw.getNode().value === null) {
            return;
        }

        if (nn && nn.getNode().value === null) {
            return;
        }

        if (nw && nw.getNode().value === null) {
            return;
        }

        var connecteds = [];

        try {
            if (nnw === null && nn === null && nw === null) {
                _nodeController.getNode().value = 0;
                return;
            }

            if (nw === null) {
                _nodeController.getNode().value = 0;
                return;
            }

            if (nn === null) {
                _nodeController.getNode().value = 0;
                return;
            }

            var valueN = nn.getNode().value + this.gap;
            var valueW = nw.getNode().value + this.gap;
            var valueNW = 0;

            if (_nodeController.valueA === _nodeController.valueB) {
                valueNW = nnw.getNode().value + this.match;
            } else {
//                valueNW = nnw.getNode().value + this.misMatch;
                valueNW = window.dna.AbstractCalculation.prototype.getValueArrayMisMatch.call(this, nnw.getNode().value, _nodeController.valueA, _nodeController.valueB);
            }


            if (valueN >= valueNW && valueN >= valueW) {
                connecteds.push(Connected.N);
            }

            if (valueW >= valueNW && valueW >= valueN) {
                connecteds.push(Connected.W);
            }

            if (valueNW >= valueW && valueNW >= valueN) {
                connecteds.push(Connected.NW);
            }

            if (connecteds.contains(Connected.N)) {
                _nodeController.getNode().value = (valueN);
                return;
            }

            if (connecteds.contains(Connected.NW)) {
                _nodeController.getNode().value = (valueNW);
                return;
            }

            if (connecteds.contains(Connected.W)) {
                _nodeController.getNode().value = (valueW);
                return;
            }
        } finally {
            _nodeController.getNode().connected = connecteds;
        }

    };

};


/**
 *
 * @type {AbstractCalculation}
 */
window.dna.CalculationSemiGlobal.prototype = new window.dna.AbstractCalculation();
/**
 *
 * @type {CalculationGlobal}
 */
window.dna.CalculationSemiGlobal.prototype.constructor = window.dna.CalculationSemiGlobal;

/**
 * @description calculationNode
 *
 */
window.dna.CalculationSemiGlobal.prototype.calculationNode = function () {
    window.dna.AbstractCalculation.prototype.calculationNode.call(this);

    var nodes = this.getOutputAlign().matrixs[0].nodes;

    for (var i = 0; i < nodes.length; i++) {
        for (var j = 0; j < nodes[i].length; j++) {
            this.calculationNodeGlobal(this.organizeNode.getController(nodes[i][j]));
        }
    }
};

/**
 * @description findAligns
 *
 */
window.dna.CalculationSemiGlobal.prototype.findAligns = function () {
    var nodes = this.getOutputAlign().matrixs[0].nodes;
    var nodeController = this.organizeNode.getController(nodes[nodes.length - 1][nodes[0].length - 1]);
    this.findAlignsNode(nodeController);
};

/**
 *
 * @param dataRetorn
 * @param nodeOld
 * @param node
 */
window.dna.CalculationSemiGlobal.prototype.nodeVicinity = function (dataRetorn, nodeOld, node) {

    if (!nodeOld && !node) {
        if (dataRetorn === null) {
            dataRetorn = {
                arrayNode: null,
                arrayNodeAlign: [],
                score: 0,
                sbSeqA: new window.StringBuffer(),
                sbSeqB: new window.StringBuffer()
            };
        }

        dataRetorn.arrayNode = this.getMaxNodeStart();

        return dataRetorn;
    } else {
        /**
         * @description call AbstractCalculation
         */
        return window.dna.AbstractCalculation.prototype.nodeVicinity.call(this, dataRetorn, nodeOld, node);
    }
};

window.dna.CalculationSemiGlobal.prototype.getMaxNodeStart = function () {
    return this.organizeNode.getArrayMaxNodeControllerSemiGlobal();
};

/**
 *
 * @type {MethodSequencing}
 */
window.dna.CalculationSemiGlobal.prototype.methodSequencing = window.dna.MethodSequencing.SEMIGLOBAL;