const Graph = require('node-dijkstra');

function dijkstra(graph, startNode, endNode) {
    const route = new Graph(graph);
    return route.path(startNode, endNode,{ cost: true });
}

// const shortestPaths = dijkstra(graph, 'A', 'G');

module.exports = {
    dijkstra
}

// Créez le graphe et ajoutez les sommets et les arêtes

// const graph = {
//     A: {B: 1, C: 2},
//     B: {A: 1, D: 2, F: 3},
//     C: {A: 2, D: 3, E: 4},
//     D: {B: 2, F: 3, C: 3, E: 2, G: 3},
//     E: {C: 4, D: 2, G: 5},
//     F: {B: 3, D: 3, G: 4},
//     G: {F: 4, D: 3, E: 5}
// }
// console.log(shortestPaths);
