/**
 * @file dna-sequence-process
 * @namespace dna
 * @licence GNU GPL v3
 * @copyright Copyright (c) 2014.
 * Created by samuel on 18/06/14.
 */

/**
 * @global
 * @param {Matrix} _matrix
 * @constructor
 */
window.dna.OrganizeNode = function (_matrix) {

    /**
     *
     * @type {Connected|Window.dna.Connected|*}
     */
    var Connected = window.dna.Connected;

    /**
     *
     * @type {window.dna.Matrix}
     */
    this.matrix = _matrix;
    /**
     *
     * @type {Array}
     */
    this.controllers = [];

    /**
     *
     * @param nodeController
     */
    this.addNodeController = function (nodeController) {
        this.controllers[this.getValuePosController(nodeController)] = nodeController;
    };

    /**
     *
     * @param node
     */
    this.execute = function (node) {
        if (this.controllers[this.getValuePosController(node)]) {
            this.executeController(this.controllers[this.getValuePosController(node)]);
        }
    };

    /**
     *
     * @param node
     */
    this.executeController = function (node) {
        for (var c in Connected) {
            if (Connected.hasOwnProperty(c)) {
                var nodeFound = this.searchNode(node, c);
                if (nodeFound !== null) {
                    node.setNodeController(c, nodeFound);
                    node.setNode(c, nodeFound.getNode());
                }
            }
        }

        node.setSequenceNode("A", this.getValuesSequence("A", node));
        node.setSequenceNode("B", this.getValuesSequence("B", node));

    };

    /**
     *
     * @param value
     * @param nodeController
     * @returns {String}
     */
    this.getValuesSequence = function (value, nodeController) {
        if (value === "A") {
            if (nodeController.positionA === 0) {
                return "";
            }

            return this.sequenceA[nodeController.positionA - 1];
        } else if (value === "B") {
            if (nodeController.positionB === 0) {
                return "";
            }

            return this.sequenceB[nodeController.positionB - 1];
        }

        return "";
    };

    /**
     *
     * @param node
     * @param value
     * @returns {window.dna.NodeController}
     */
    this.searchNode = function (node, value) {
        var posA = node.positionA;
        var posB = node.positionB;
        var nodes = this.matrix.nodes;

        try {

            switch (value) {
                case Connected.N:
                    posB -= 1;
                    break;
                case Connected.S:
                    posB += 1;
                    break;
                case Connected.W:
                    posA -= 1;
                    break;
                case Connected.E:
                    posA += 1;
                    break;
                case Connected.NW:
                    posA -= 1;
                    posB -= 1;
                    break;
                case Connected.NE:
                    posA += 1;
                    posB -= 1;
                    break;
                case Connected.SW:
                    posA -= 1;
                    posB += 1;
                    break;
                case Connected.SE:
                    posA += 1;
                    posB += 1;
                    break;
            }

//                    if (posA < 0 || posB < 0 || this.sequenceB.length < posB || this.sequenceA.length < posA) {
//
//                        return null;
//                    }

            var nodeFound;

            try {
                nodeFound = nodes[posA][posB];
            } catch (e) {
            }

            if (nodeFound) {
                return this.controllers[this.getValuePosController(nodeFound)];
            }
            return null;
        } catch (exception) {
            //TODO
            console.log(exception);
        }
        return null;
    };

    /**
     *
     * @param nodeController
     * @returns {string}
     */
    this.getValuePosController = function (nodeController) {
        if (nodeController) {
            if (nodeController.positionA !== undefined) {
                return nodeController.positionA + "-" + nodeController.positionB;
            }
            if (nodeController.x !== undefined) {
                return nodeController.x + "-" + nodeController.y;
            }
        }
    };
};

/**
 *
 * @type {{addNode: addNode, organize: organize, matrix: *, sequenceA: *, sequenceB: *, getController: getController}}
 */
window.dna.OrganizeNode.prototype = {
    /**
     *
     * @param node
     * @param positionA
     * @param positionB
     */
    addNode: function (node, positionA, positionB) {
        this.addNodeController(new window.dna.NodeController(node, positionA, positionB));
    },

    /**
     * @description organize
     */
    organize: function () {

        var nodes = this.matrix.nodes;
        var i;
        var j;
        for (i = 0; i < nodes.length; i++) {
            for (j = 0; j < nodes[i].length; j++) {
                this.addNode(nodes[i][j], i, j);
            }
        }
        for (i = 0; i < nodes.length; i++) {
            for (j = 0; j < nodes[i].length; j++) {
                this.execute(nodes[i][j]);
            }
        }

    },
    matrix: this.matrix,
    sequenceA: this.sequenceA,
    sequenceB: this.sequenceB,
    /**
     *
     * @returns {window.dna.NodeController}
     */
    getController: function () {
        if (arguments && arguments.length > 0) {
            if (arguments.length > 1) {
                return this.controllers[arguments[0] + "-" + arguments[1]];
            } else {
                return this.controllers[this.getValuePosController(arguments[0])];
            }
        }
    },
    /**
     *
     * @returns [window.dna.NodeController]
     */
    getArrayMaxNodeControllerSemiGlobal: function () {

        var arrayMax = [];

        var nodes = this.matrix.nodes;
        var i = 0;
        /**
         *
         * @type {window.dna.Node}
         */
        var node = null;


        for (i = 0; i < nodes.length; i++) {
            node = nodes[i][nodes[0].length - 1];
            if (arrayMax.length === 0) {
                arrayMax.push(node);
            } else {
                if (parseInt(arrayMax[0].value) === parseInt(node.value)) {
                    arrayMax.push(node);
                } else if (parseInt(arrayMax[0].value) < parseInt(node.value)) {
                    arrayMax = [];
                    arrayMax.push(node);
                }
            }
        }
        for (i = 0; i < nodes[0].length; i++) {
            node = nodes[nodes.length - 1][i];
            if (arrayMax.length === 0) {
                arrayMax.push(node);
            } else {
                if (parseInt(arrayMax[0].value) === parseInt(node.value)) {
                    arrayMax.push(node);
                } else if (parseInt(arrayMax[0].value) < parseInt(node.value)) {
                    arrayMax = [];
                    arrayMax.push(node);
                }
            }
        }


        return arrayMax;
    }

};