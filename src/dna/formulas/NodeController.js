/**
 * Created by samuel on 18/06/14.
 */
/**
 * Created by samuel on 17/06/14.
 */

/**
 *
 * @global
 * @param {Node} _node
 * @param {String} _positionA
 * @param {String} _positionB
 * @constructor
 */
window.dna.NodeController = function (_node, _positionA, _positionB) {
    this.node = _node;
    this.positionA = _positionA;
    this.positionB = _positionB;
};

window.dna.NodeController.prototype = {
    /**
     * @type {String}
     */
    valueA: null,
    /**
     * @type {String}
     */
    valueB: null,
    /**
     * @type {Node}
     */
    nodeN: null,
    /**
     * @type {Node}
     */
    nodeW: null,
    /**
     * @type {Node}
     */
    nodeS: null,
    /**
     * @type {Node}
     */
    nodeE: null,
    /**
     * @type {Node}
     */
    nodeNE: null,
    /**
     * @type {Node}
     */
    nodeNW: null,
    /**
     * @type {Node}
     */
    nodeSE: null,
    /**
     * @type {Node}
     */
    nodeSW: null,
    /**
     * @type {NodeController}
     */
    nodeControllerN: null,
    /**
     * @type {NodeController}
     */
    nodeControllerW: null,
    /**
     * @type {NodeController}
     */
    nodeControllerS: null,
    /**
     * @type {NodeController}
     */
    nodeControllerE: null,
    /**
     * @type {NodeController}
     */
    nodeControllerNE: null,
    /**
     * @type {NodeController}
     */
    nodeControllerNW: null,
    /**
     * @type {NodeController}
     */
    nodeControllerSE: null,
    /**
     * @type {NodeController}
     */
    nodeControllerSW: null,
    /**
     *
     * @returns {boolean}
     */
    isPossibleN_NW_W: function () {

        if (this.node.value !== null) {
            return false;
        }

        if (this.nodeN !== null) {
            if (this.nodeN.value === null) {
                return false;
            }
        }

        if (this.nodeNW !== null) {
            if (this.nodeNW.value === null) {
                return false;
            }
        }

        if (this.nodeW !== null) {
            if (this.nodeW.value === null) {
                return false;
            }
        }

        return true;
    },
    /**
     *
     * @param {Connected} connected
     * @returns {NodeController}
     */
    getNodeControle: function (connected) {

        var Connected = window.dna.Connected;

        switch (connected) {
            case Connected.N:
                return this.nodeControllerN;
            case Connected.S:
                return this.nodeControllerS;
            case Connected.W:
                return this.nodeControllerW;
            case Connected.E:
                return this.nodeControllerE;
            case Connected.NE:
                return this.nodeControllerNE;
            case Connected.NW:
                return this.nodeControllerNW;
            case Connected.SE:
                return this.nodeControllerSE;
            case Connected.SW:
                return this.nodeControllerSW;
        }

        return null;
    },
    /**
     *
     * @returns {Node}
     */
    getNode: function () {
        return this.node;
    },
    /**
     *
     * @param {Connected} connected
     * @param {Node} node
     */
    setNode: function (connected, node) {
        var Connected = window.dna.Connected;

        switch (connected) {

            case Connected.N:
                this.nodeN = node;
                break;
            case Connected.W:
                this.nodeW = node;
                break;
            case Connected.S:
                this.nodeS = node;
                break;
            case Connected.E:
                this.nodeE = node;
                break;
            case Connected.NE:
                this.nodeNE = node;
                break;
            case Connected.NW:
                this.nodeNW = node;
                break;
            case Connected.SE:
                this.nodeSE = node;
                break;
            case Connected.SW:
                this.nodeSW = node;
                break;
        }
    },
    /**
     *
     * @param {Connected} connected
     * @param {NodeController} nodeController
     */
    setNodeController: function (connected, nodeController) {

        var Connected = window.dna.Connected;

        switch (connected) {
            case Connected.N:
                this.nodeControllerN = nodeController;
                break;
            case Connected.W:
                this.nodeControllerW = nodeController;
                break;
            case Connected.S:
                this.nodeControllerS = nodeController;
                break;
            case Connected.E:
                this.nodeControllerE = nodeController;
                break;
            case Connected.NE:
                this.nodeControllerNE = nodeController;
                break;
            case Connected.NW:
                this.nodeControllerNW = nodeController;
                break;
            case Connected.SE:
                this.nodeControllerSE = nodeController;
                break;
            case Connected.SW:
                this.nodeControllerSW = nodeController;
                break;
        }
    },
    /**
     *
     * @param {String} sequenceNodeType
     * @param {String} value
     */
    setSequenceNode: function (sequenceNodeType, value) {

        switch (sequenceNodeType) {
            case "A":
                this.valueA = value;
                break;
            case "B":
                this.valueB = value;
                break;
        }
    }
};