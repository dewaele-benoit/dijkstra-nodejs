function dijkstra(graph, start, end) {
    // Initialisation des distances et des noeuds précédents
    const distances = {};
    const previousNodes = {};
    for (const node in graph) {
        distances[node] = Infinity;
        previousNodes[node] = null;
    }
    distances[start] = 0;

    // Liste des noeuds non visités
    const unvisitedNodes = Object.assign({}, graph);

    while (Object.keys(unvisitedNodes).length > 0) {
        // Trouver le noeud non visité avec la plus petite distance
        let smallestNode = null;
        for (const node in unvisitedNodes) {
            if (smallestNode === null || distances[node] < distances[smallestNode]) {
                smallestNode = node;
            }
        }

        // Si le noeud courant est le noeud d'arrivée, on peut s'arrêter
        if (smallestNode === end) {
            break;
        }

        // Mettre à jour les distances et les noeuds précédents pour chaque voisin non visité du noeud courant
        const neighbors = graph[smallestNode];
        for (const neighbor in neighbors) {
            const newDistance = distances[smallestNode] + neighbors[neighbor];
            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
                previousNodes[neighbor] = smallestNode;
            }
        }

        // Marquer le noeud courant comme visité
        delete unvisitedNodes[smallestNode];
    }

    // Retourner la distance et le chemin le plus court
    const path = [];
    let currentNode = end;
    while (previousNodes[currentNode] !== null) {
        path.unshift(currentNode);
        currentNode = previousNodes[currentNode];
    }
    path.unshift(start);

    return {distance : distances[end], path};
}

module.exports = dijkstra

// const graphBIs = {
//     A: { B: 1 },
//     B: { A: 1, C: 2 },
//     C: { B: 2 }
// };
//
// const graph = {
//     A: {B: 1, C: 2},
//     B: {A: 1, D: 2, F: 3},
//     C: {A:2, D: 3, E: 4},
//     D: {B: 2, F: 3, C:3, E:2, G:3},
//     E: {C: 4, D:2, G: 5},
//     F: {B: 3, D:3, G:4},
//     G: {F: 4, D: 3, E: 5}
// }
//
// console.time("F2");
// console.log("Algo de dijksta 2", dijkstra(graph, "A", "G"))
// console.timeEnd("F2")