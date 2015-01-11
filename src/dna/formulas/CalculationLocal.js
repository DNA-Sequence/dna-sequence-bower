/**
 * @file dna-sequence-process
 * @namespace dna
 * @licence GNU GPL v3
 * @copyright Copyright (c) 2014.
 * Created by samuel on 17/06/14.
 */

/**
 * @global
 * @param {InputAlign} _inputAlign
 * @extends {Calculation}
 * @constructor
 */
window.dna.CalculationLocal = function (_inputAlign) {
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
     * @private
     * @param {Node} node
     * @param {int} pointer
     * @returns {string}
     */
    this.getCalcNode = function (node, pointer) {
        if (node) {
            var value = node.value + pointer;

            var _retorn = "";

            _retorn += "" + node.value;
            _retorn += " + (" + pointer + ") = ";

            if (value < 0) {
                _retorn += "(" + value;
                _retorn += " < 0) = 0";
            } else {
                _retorn += "" + value;
            }

            return _retorn;
        } else {
            return "";
        }
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

        _nodeController.getNode().connected = (connecteds);

        if (nnw === null && nn === null && nw === null) {
            _nodeController.getNode().value = (0);
            return;
        }

        if (nw === null) {
            var value = (nn.getNode().value + this.gap);
            if (value < 0) {
                value = 0;
            }

            _nodeController.getNode().value = value;
            connecteds.push(Connected.N);
            return;
        }

        if (nn === null) {
            var _value = (nw.getNode().value + this.gap);
            if (_value < 0) {
                _value = 0;
            }

            _nodeController.getNode().value = _value;
            connecteds.push(Connected.W);
            return;
        }

        var valueN = nn.getNode().value + this.gap;
        var valueW = nw.getNode().value + this.gap;
        var valueNW = 0;

        if (valueN < 0) {
            valueN = 0;
        }
        if (valueW < 0) {
            valueW = 0;
        }

        if (_nodeController.valueA === _nodeController.valueB) {
            valueNW = nnw.getNode().value + this.match;
        } else {
            valueNW = window.dna.AbstractCalculation.prototype.getValueArrayMisMatch.call(this, nnw.getNode().value, _nodeController.valueA, _nodeController.valueB);
//            valueNW = nnw.getNode().value + this.misMatch;
        }

        if (valueNW < 0) {
            valueNW = 0;
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
    };
};

/**
 *
 * @type {window.dna.AbstractCalculation}
 */
window.dna.CalculationLocal.prototype = new window.dna.AbstractCalculation();
/**
 *
 * @type {CalculationLocal}
 */
window.dna.CalculationLocal.prototype.constructor = window.dna.CalculationLocal;

/**
 * @description calculationNode
 */
window.dna.CalculationLocal.prototype.calculationNode = function () {
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
 */
window.dna.CalculationLocal.prototype.findAligns = function () {
    var nodes = this.getOutputAlign().matrixs[0].nodes;

    var posx = nodes.length;
    var posy = nodes[0].length;
    var nodeController = null;
    var i;
    for (i = 1; i < posx; i++) {
        nodeController = this.organizeNode.getController(nodes[i][posy - 1]);
        this.findAlignsNode(nodeController);
    }

    for (i = 1; i < posy - 1; i++) {
        nodeController = this.organizeNode.getController(nodes[posx - 1][i]);
        this.findAlignsNode(nodeController);
    }

};

/**
 *
 * @type {MethodSequencing.LOCAL|*}
 */
window.dna.CalculationLocal.prototype.methodSequencing = window.dna.MethodSequencing.LOCAL;