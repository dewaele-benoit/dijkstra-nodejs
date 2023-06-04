class Dijkstra {
    static countDijkstra = 0;

    constructor() {
        //rien à faire
    }

    execute(pStart, pCodeRegroupement) {
        Dijkstra.countDijkstra++;

        let aNodeInfos;
        let file = [];

        this._startNode = pStart;

        for (const [key, node] of Object.entries(this._graph.getNodes())) {
            this.init(node);
        }

        file.push(pStart);
        aNodeInfos = pStart.getInfos();
        if (aNodeInfos !== null) {
            aNodeInfos.weight = 0;
            aNodeInfos.distance = 0;
            aNodeInfos.formula = 0;
        }

        let aNode;
        let goodEdges = [];
        while (file.length > 0) {
            aNode = this.keepBestNode(file, pCodeRegroupement);

            aNodeInfos = aNode.getInfos();
            if (aNodeInfos !== null) {
                aNodeInfos.couleur = "__NOIR";
            }

            let edges = aNode.getEdges(false);
            this.keepBestEdges(pCodeRegroupement, aNodeInfos, edges, goodEdges);

            let aEdge;
            let edgeInfos;
            let equipementPrecedent = "";
            let currentCodeRegroupement = "";
            for (const edge of goodEdges) {
                aEdge = edge;
                try {
                    edgeInfos = aEdge.getInfos();
                    currentCodeRegroupement = edgeInfos.codeRegroupement;
                } catch (e) {
                    throw new Exception("Dijkstra", "execute", e.message);
                }

                if (Rules.rule19(aEdge)) {
                    if (Rules.rule41(aNode, equipementPrecedent, currentCodeRegroupement)) {
                        if (pCodeRegroupement === "TTE" && aNodeInfos.usedEdge !== null) {
                            try {
                                equipementPrecedent = aNodeInfos.usedEdge.getInfos().codeRegroupement;
                            } catch (e) {
                                throw new Exception("Dijkstra", "execute", e.message);
                            }
                        }
                        this.suite(aEdge, aNode, file, pCodeRegroupement, equipementPrecedent);
                    }
                }
            }
        }

        goodEdges.length = 0;
        file.length = 0;
    }

    getPathBetween(pEnd, pPath) {
        let currentNode = pEnd;
        let currentInfos = currentNode.getInfos();

        pPath.unshift(currentNode);

        while (currentInfos.previous !== null) {
            currentNode = currentInfos.previous;
            currentInfos = currentNode.getInfos();
            pPath.unshift(currentNode);
        }

        if (pPath.length === 1) {
            pPath.length = 0;
        }
    }

    displayPathBetween(pEnd) {
        let itineraire = [];
        this.getPathBetween(pEnd, itineraire);

        if (itineraire.length === 0) {
            console.log("aucun itineraire possible");
        } else {
            for (let i = 0; i < itineraire.length; i++) {
                if (i !== 0) {
                    process.stdout.write("->");
                }
                process.stdout.write(itineraire[i].getName());
            }
            console.log();
        }

        itineraire.length = 0;
    }

    getStartNode() {
        return this._startNode;
    }

    init(pNode) {
        if (pNode !== null) {
            let nodeInfos = pNode.getInfos();
            if (node.infos === null) {
                nodeInfos = {
                    poids: Infinity,
                    distance: Infinity,
                    formule: Infinity,
                    couleur: "__BLANC",
                    previous: null,
                    usedEdge: null
                };
                pNode.setInfos(nodeInfos);
            } else {
                nodeInfos.poids = Infinity;
                nodeInfos.distance = Infinity;
                nodeInfos.formule = Infinity;
                nodeInfos.couleur = "__BLANC";
                nodeInfos.previous = null;
                nodeInfos.usedEdge = null;
            }
        }
    }

    keepBestNode(pFile, pCodeRegroupement) {
        let bestNode = null;
        let bestWeight = Infinity;
        for (const node of pFile) {
            const nodeInfos = node.getInfos();
            if (
                nodeInfos !== null &&
                nodeInfos.couleur === "__BLANC" &&
                nodeInfos.poids <= bestWeight &&
                this.verifyRules(pCodeRegroupement, nodeInfos.usedEdge)
            ) {
                bestNode = node;
                bestWeight = nodeInfos.poids;
            }
        }

        return bestNode;
    }

    verifyRules(pCodeRegroupement, pEdge) {
        if (pCodeRegroupement === "TTE" && pEdge !== null) {
            const edgeInfos = pEdge.getInfos();
            return edgeInfos.codeRegroupement === "TTE";
        }
        return true;
    }

    keepBestEdges(pCodeRegroupement, pNodeInfos, pEdges, pGoodEdges) {
        pGoodEdges.length = 0;
        for (const edge of pEdges) {
            const edgeInfos = edge.getInfos();
            if (this.verifyRules(pCodeRegroupement, edge)) {
                if (Rules.rule19(edge)) {
                    if (Rules.rule41(pNodeInfos, pGoodEdges, edgeInfos.codeRegroupement)) {
                        pGoodEdges.push(edge);
                    }
                }
            }
        }
    }

    suite(pEdge, pNode, pFile, pCodeRegroupement, pEquipementPrecedent) {
        const edgeInfos = pEdge.getInfos();
        const nodeInfos = pNode.getInfos();
        const weight = edgeInfos.poids;
        if (weight < nodeInfos.poids) {
            nodeInfos.poids = weight;
            nodeInfos.distance = nodeInfos.distance + weight;
            nodeInfos.formule = nodeInfos.distance + nodeInfos.poids;
            nodeInfos.previous = pNode;
            nodeInfos.usedEdge = pEdge;
            pFile.push(pEdge.getToNode());
        } else if (
            weight === nodeInfos.poids &&
            nodeInfos.usedEdge !== null &&
            pCodeRegroupement === "TTE" &&
            pEquipementPrecedent === "TTE" &&
            edgeInfos.codeRegroupement === "TTE"
        ) {
            nodeInfos.poids = weight;
            nodeInfos.distance = nodeInfos.distance + weight;
            nodeInfos.formule = nodeInfos.distance + nodeInfos.poids;
            nodeInfos.previous = pNode;
            nodeInfos.usedEdge = pEdge;
            pFile.push(pEdge.getToNode());
        }
    }
}

module.exports = Dijkstra;