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
window.dna.AbstractCalculation = function (_inputAlign) {

    this.inputAlign = _inputAlign;
    this.outputAlign = null;
    this.outputResultAlign = null;
    this.inputResultAlign = null;
    /**
     *
     * @type {window.dna.OrganizeNode}
     */
    this.organizeNode = null;
    this.gap = null;
    this.match = null;
    this.misMatch = null;
    /**
     *
     * @type {Array}
     */
    this.arrayMisMatch = null;

    /**
     * @private
     * @param {Node} node
     * @param {int} pointer
     * @returns {string}
     */
    this.getCalcNode = function (node, pointer) {
        if (node) {
            var value = node.value + pointer;
            return "" + node.value + " + (" + pointer + ") = " + value;
        } else {
            return "";
        }
    };

    /**
     * @private
     * @param {NodeController} nodeController
     * @param {Connected} connected
     * @returns {NodeController}
     */
    this.align = function (nodeController, connected) {

        if (nodeController && nodeController.getNode() && nodeController.getNode().connected !== null && nodeController.getNode().connected.contains(connected)) {
            return nodeController.getNodeControle(connected);
        }

        return null;
    };

    /**
     * @private
     * @returns {Matrix}
     */
    this.createMatrix = function () {
        var matrix = new window.dna.Matrix();

        var arrayA = this.inputAlign.sequenceA;
        var arrayB = this.inputAlign.sequenceB;
        var nodes = [];

        for (var i = 0; i < arrayA.length + 1; i++) {
            for (var j = 0; j < arrayB.length + 1; j++) {

                var n = new window.dna.Node();
                n.x = (i);
                n.y = (j);
                try {
                    n.charSeqA = (arrayA[i - 1]);
                } catch (exception) {
                    n.charSeqA = (" ");
                }

                try {
                    n.charSeqB = (arrayB[j - 1]);
                } catch (exception) {
                    n.charSeqB = (" ");
                }

                if (!nodes[i]) {
                    nodes[i] = [];
                }

                nodes[i][j] = n;
            }
        }

        matrix.nodes = (nodes);
        matrix.sequenceA = (arrayA);
        matrix.sequenceB = (arrayB);

        return matrix;
    };

    /**
     * @public
     * @param {Matrix}
     */
    this.executeOrganizeNode = function (_matrix) {
        this.organizeNode = new window.dna.OrganizeNode(_matrix);
        this.organizeNode.sequenceA = (this.inputAlign.sequenceA);
        this.organizeNode.sequenceB = (this.inputAlign.sequenceB);
        this.organizeNode.organize();
    };

    /**
     * @public
     * @param {Array.<Node>} _listNode
     * @param {NodeController} _nodeController
     * @param {Array.<Connected>} _listConnecteds
     * @param {String} sequence
     */
    this.findAlignNode = function (_listNode, _nodeController, _listConnecteds, sequence) {

        var node = _nodeController.getNode();

        if (node.candidate) {
            var nextNode = null;
            var Connected = window.dna.Connected;

            for (var key in _listConnecteds) {
                if (key) {
                    nextNode = this.align(_nodeController, _listConnecteds[key]);
                    if (nextNode) {

                        if (_listConnecteds[key] === Connected.W) {
                            sequence.sbSeqA.insert(0, node.charSeqA);
                            sequence.sbSeqB.insert(0, "_");
                            sequence.score += this.gap;
                        } else if (_listConnecteds[key] === Connected.N) {
                            sequence.sbSeqA.insert(0, "_");
                            sequence.sbSeqB.insert(0, node.charSeqB);
                            sequence.score += this.gap;
                        } else if (_listConnecteds[key] === Connected.NW) {
                            sequence.sbSeqA.insert(0, node.charSeqA);
                            sequence.sbSeqB.insert(0, node.charSeqB);
                            if (node.charSeqA === node.charSeqB) {
                                sequence.score += this.match;
                            } else {
                                sequence.score += this.misMatch;
                            }

                        } else {
                            sequence.sbSeqA.insert(0, "_");
                            sequence.sbSeqB.insert(0, "_");
                        }

                        _listNode.push(nextNode.getNode());
                        this.findAlignNode(_listNode, nextNode, _listConnecteds, sequence);
                        break;
                    }
                }
            }
        }
    };
};

/**
 * @type {Calculation}
 */
window.dna.AbstractCalculation.prototype = new window.dna.Calculation();

/**
 * @type {window.dna.AbstractCalculation}
 */
window.dna.AbstractCalculation.prototype.constructor = window.dna.AbstractCalculation;

/**
 *
 * @memberOf AbstractCalculation
 * @returns {OutputAlign}
 */
window.dna.AbstractCalculation.prototype.getOutputAlign = function () {
    return this.outputAlign;
};

/**
 * @memberOf AbstractCalculation
 * @returns {OutputResultAlign}
 */
window.dna.AbstractCalculation.prototype.getOutputResultAlign = function () {
    return this.outputResultAlign;
};

/**
 * @memberOf AbstractCalculation
 * @param {InputResultAlign} _inputResultAlign
 */
window.dna.AbstractCalculation.prototype.setInputResultAlign = function (_inputResultAlign) {
    this.inputResultAlign = _inputResultAlign;
};

/**
 * @memberOf AbstractCalculation
 * @description calculationNode
 */
window.dna.AbstractCalculation.prototype.calculationNode = function () {
    this.outputAlign = new window.dna.OutputAlign();
    var list = [];
    var matrix = this.createMatrix();
    list.push(matrix);
    this.executeOrganizeNode(matrix);
    this.outputAlign.matrixs = list;
};

/**
 * @memberOf AbstractCalculation
 */
window.dna.AbstractCalculation.prototype.findAligns = function () {

};

/**
 * @memberOf AbstractCalculation
 */
window.dna.AbstractCalculation.prototype.findAlign = function () {

    var listNode = [];
    var listConnecteds = this.inputResultAlign.connecteds;
    this.outputResultAlign = new window.dna.OutputResultAlign();

    var nodeController = null;

    if (this.inputResultAlign.node) {
        nodeController = this.organizeNode.getController(this.inputResultAlign.node);
    } else {
        var nodes = this.outputAlign.matrixs[0].nodes;
        nodeController = this.organizeNode.getController(nodes[nodes.length - 1][nodes[0].length - 1]);
    }

    var sequence = {
        sbSeqA: new window.StringBuffer(),
        sbSeqB: new window.StringBuffer(),
        score: 0
    };

    listNode.push(nodeController.getNode());
    this.findAlignNode(listNode, nodeController, listConnecteds, sequence);

    this.outputResultAlign.nodes = (listNode);
    this.outputResultAlign.resultSequenceA = (sequence.sbSeqA.toString());
    this.outputResultAlign.resultSequenceB = (sequence.sbSeqB.toString());
    this.outputResultAlign.score = sequence.score;
};

/**
 * @memberOf AbstractCalculation
 * @param nodeController
 * @returns {Node}
 */
window.dna.AbstractCalculation.prototype.findAlignsNode = function (nodeController) {


    var Connected = window.dna.Connected;

    var node = nodeController.getNode();

    if (!node.candidate) {
        node.candidate = (true);
        var nextNode = null;

        nextNode = this.align(nodeController, Connected.W);
        if (nextNode) {
            this.findAlignsNode(nextNode);
        }
        nextNode = this.align(nodeController, Connected.N);
        if (nextNode) {
            this.findAlignsNode(nextNode);
        }
        nextNode = this.align(nodeController, Connected.NW);
        if (nextNode) {
            this.findAlignsNode(nextNode);
        }
        return nextNode;
    }

    return null;
};

/**
 *  @memberOf AbstractCalculation
 * @description setGaps
 *
 */
window.dna.AbstractCalculation.prototype.setGaps = function () {

    this.gap = -1;
    this.match = 2;
    this.misMatch = -2;
    this.arrayMisMatch = {};

    /**
     *
     * @type {InputAlignGlobalLocal|*|window.dna.AbstractCalculation.inputAlign}
     */
    var inputAlignGlobalLocal = this.inputAlign;

    if (inputAlignGlobalLocal.gap) {
        this.gap = parseInt(inputAlignGlobalLocal.gap);
    }
    if (inputAlignGlobalLocal.match) {
        this.match = parseInt(inputAlignGlobalLocal.match);
    }

    if (inputAlignGlobalLocal.misMatch) {
        this.misMatch = parseInt(inputAlignGlobalLocal.misMatch);
    }

    if (inputAlignGlobalLocal.arrayMisMatch) {
        this.arrayMisMatch = inputAlignGlobalLocal.arrayMisMatch;
    }

};

/**
 *
 * @memberOf AbstractCalculation
 * @param dataRetorn
 * @param {Node} nodeOld
 * @param {Node} node
 * @returns {*}
 */
window.dna.AbstractCalculation.prototype.nodeVicinity = function (dataRetorn, nodeOld, node) {

    if (dataRetorn === null) {
        dataRetorn = {
            arrayNode: null,
            arrayNodeAlign: [],
            score: 0,
            sbSeqA: new window.StringBuffer(),
            sbSeqB: new window.StringBuffer()
        };
    }

    var nodeController = this.organizeNode.getController(node);

    if (nodeOld) {

        dataRetorn.arrayNodeAlign.push(node);
        var nodeOldController = this.organizeNode.getController(nodeOld);

        if (nodeController.getNode() !== nodeOldController.getNode()) {

            if (nodeOldController.nodeW === nodeController.getNode()) {
                dataRetorn.sbSeqA.insert(0, nodeOld.charSeqA ? nodeOld.charSeqA : "_");
                dataRetorn.sbSeqB.insert(0, "_");
                dataRetorn.score += this.gap;
            } else if (nodeOldController.nodeN === nodeController.getNode()) {
                dataRetorn.sbSeqA.insert(0, "_");
                dataRetorn.sbSeqB.insert(0, nodeOld.charSeqB ? nodeOld.charSeqB : "_");
                dataRetorn.score += this.gap;
            } else if (nodeOldController.nodeNW === nodeController.getNode()) {
                dataRetorn.sbSeqA.insert(0, nodeOld.charSeqA ? nodeOld.charSeqA : "_");
                dataRetorn.sbSeqB.insert(0, nodeOld.charSeqB ? nodeOld.charSeqB : "_");
                if (nodeOld.charSeqA && nodeOld.charSeqB) {
                    if (nodeOld.charSeqA === nodeOld.charSeqB) {
                        dataRetorn.score += this.match;
                    } else {
                        dataRetorn.score += this.misMatch;
                    }
                }
            } else {
                dataRetorn.sbSeqA.insert(0, "_");
                dataRetorn.sbSeqB.insert(0, "_");
            }
        }


    }

    dataRetorn.arrayNode = [];

    if (node && node.connected) {
        for (var i = 0; i < node.connected.length; i++) {
            dataRetorn.arrayNode.push(nodeController["node" + node.connected[i]]);
        }
    }


    return dataRetorn;
};

/**
 *
 * @memberOf AbstractCalculation
 * @param node
 * @returns {NodeDetail}
 */
window.dna.AbstractCalculation.prototype.nodeDetail = function (node) {
    var nodeController = this.organizeNode.getController(node);

    /**
     *
     * @type {Window.dna.NodeDetail}
     */
    var nodeDetail = new window.dna.NodeDetail();

    nodeDetail.node = node;
    nodeDetail.nodeN = nodeController.nodeN;
    nodeDetail.nodeNW = nodeController.nodeNW;
    nodeDetail.nodeW = nodeController.nodeW;

    nodeDetail.nodeCalcN = this.getCalcNode(nodeController.nodeN, this.gap);
    nodeDetail.nodeCalcW = this.getCalcNode(nodeController.nodeW, this.gap);

    nodeDetail.nodeSumN = "GAP = " + this.gap;
    nodeDetail.nodeSumW = "GAP = " + this.gap;


    if (node.charSeqA === node.charSeqB) {
        nodeDetail.nodeCalcNW = this.getCalcNode(nodeController.nodeNW, this.match);
        nodeDetail.nodeSumNW = "MATCH = " + this.match;
    } else {
        nodeDetail.nodeCalcNW = this.getCalcNode(nodeController.nodeNW, this.getArrayMisMatch(node.charSeqA, node.charSeqB));
        nodeDetail.nodeSumNW = "MISMATCH = " + this.getArrayMisMatch(node.charSeqA, node.charSeqB);
    }

    return nodeDetail;
};


window.dna.AbstractCalculation.prototype.getArrayMisMatch = function (charA, charB) {
    /**
     * @type {window.dna.InputAlignGlobalLocal}
     */
    var arrayMisMatch = this.inputAlign.arrayMisMatch;

    if (arrayMisMatch) {
        if (arrayMisMatch[charA + "-" + charB]) {
            return arrayMisMatch[charA + "-" + charB];
        }
    }

    return this.misMatch;
};

/**
 * @memberOf AbstractCalculation
 * @param {int} value
 * @param {char} charA
 * @param {char} charB
 */
window.dna.AbstractCalculation.prototype.getValueArrayMisMatch = function (value, charA, charB) {
    return value + this.getArrayMisMatch(charA, charB);
};