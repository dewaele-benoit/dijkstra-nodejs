const Dijkstra = require("../index");

describe('Dijkstra', () => {
    let dijkstra;

    beforeEach(() => {
        dijkstra = new Dijkstra();
    });

    describe('execute', () => {
        it('should update node infos and calculate shortest paths', () => {
            // Créer le graphe de test
            const nodeA = { id: 'A' };
            const nodeB = { id: 'B' };
            const nodeC = { id: 'C' };

            const edgeAB = { fromNode: nodeA, toNode: nodeB, weight: 2 };
            const edgeBC = { fromNode: nodeB, toNode: nodeC, weight: 3 };

            nodeA.edges = [edgeAB];
            nodeB.edges = [edgeBC];
            nodeC.edges = [];

            const graph = [nodeA, nodeB, nodeC];

            // Exécuter la méthode execute
            dijkstra.execute(nodeA, 'TTE');

            // Vérifier les résultats
            const nodeAInfos = nodeA.getInfos();
            const nodeBInfos = nodeB.getInfos();
            const nodeCInfos = nodeC.getInfos();

            expect(Dijkstra.countDijkstra).toBe(1);

            expect(nodeAInfos).toEqual({
                poids: 0,
                distance: 0,
                formule: 0,
                couleur: '__NOIR',
                previous: null,
                usedEdge: null
            });

            expect(nodeBInfos).toEqual({
                poids: 2,
                distance: 2,
                formule: 2,
                couleur: '__NOIR',
                previous: nodeA,
                usedEdge: edgeAB
            });

            expect(nodeCInfos).toEqual({
                poids: 5,
                distance: 5,
                formule: 5,
                couleur: '__NOIR',
                previous: nodeB,
                usedEdge: edgeBC
            });
        });
    });

    describe('getPathBetween', () => {
        it('should populate the path array with nodes from end to start', () => {
            // Créer le graphe de test
            const nodeA = { id: 'A', getName: () => 'A' };
            const nodeB = { id: 'B', getName: () => 'B' };
            const nodeC = { id: 'C', getName: () => 'C' };

            const edgeAB = { fromNode: nodeA, toNode: nodeB, weight: 2 };
            const edgeBC = { fromNode: nodeB, toNode: nodeC, weight: 3 };

            nodeA.edges = [edgeAB];
            nodeB.edges = [edgeBC];
            nodeC.edges = [];

            const path = [];

            // Exécuter la méthode getPathBetween
            dijkstra.getPathBetween(nodeC, path);

            // Vérifier le résultat
            expect(path).toEqual([nodeA, nodeB, nodeC]);
        });

        it('should empty the path array if no path is found', () => {
            // Créer le graphe de test
            const nodeA = { id: 'A', getName: () => 'A' };
            const nodeB = { id: 'B', getName: () => 'B' };
            const nodeC = { id: 'C', getName: () => 'C' };

            const edgeAB = { fromNode: nodeA, toNode: nodeB, weight: 2 };
            const edgeBC = { fromNode: nodeB, toNode: nodeC, weight: 3 };

            nodeA.edges = [edgeAB];
            nodeB.edges = [edgeBC];
            nodeC.edges = [];

            const path = [nodeB];

            // Exécuter la méthode getPathBetween
            dijkstra.getPathBetween(nodeC, path);

            // Vérifier le résultat
            expect(path).toEqual([]);
        });
    });

    // Ajoutez d'autres tests pour les autres méthodes de la classe Dijkstra si nécessaire
});
