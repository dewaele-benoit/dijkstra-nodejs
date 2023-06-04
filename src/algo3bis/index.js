const dijkstrajs = require('dijkstrajs');

function dijkstra(graph, startNode, endNode) {
    return dijkstrajs.find_path(graph, startNode, endNode);
}

module.exports = {
    dijkstra
}

const graph = {
    A: {B: 1, C: 2},
    B: {A: 1, D: 2, F: 3},
    C: {A: 2, D: 3, E: 4},
    D: {B: 2, F: 3, C: 3, E: 2, G: 3},
    E: {C: 4, D: 2, G: 5},
    F: {B: 3, D: 3, G: 4},
    G: {F: 4, D: 3, E: 5}
}

const shortestPaths = dijkstra(graph, "A", "G");

// console.log("shortestPaths: ", shortestPaths);
//
// // Calculer et afficher la somme des poids
// let sumOfWeights = 0;
// for (let node in shortestPaths) {
//     if (shortestPaths[node] !== Infinity) {
//         sumOfWeights += shortestPaths[node];
//     }
// }
// console.log("Somme des poids : ", sumOfWeights);
