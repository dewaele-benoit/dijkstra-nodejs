const dijkstra2 = require("./algo2/index")
const dijkstra3 = require("./algo3/index")

const graph = {
    A: {B: 1, C: 2},
    B: {A: 1, D: 2, F: 3},
    C: {A: 2, D: 3, E: 4},
    D: {B: 2, F: 3, C: 3, E: 2, G: 3},
    E: {C: 4, D: 2, G: 5},
    F: {B: 3, D: 3, G: 4},
    G: {F: 4, D: 3, E: 5}
}

console.time("F2");
console.log("Algo de dijksta 2", dijkstra2(graph, "A", "G"))
console.timeEnd("F2")


console.time("F3");
console.log("Algo de dijksta 3", dijkstra3.find_path(graph, "A", "G"))
console.timeEnd("F3")