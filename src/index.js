const Benchmark = require("benchmark")

const dijkstra2 = require("./algo2/index")
const dijkstra3 = require("./algo3/index")
const dijkstra3bis = require("./algo3bis/index")
const dijkstra3ter = require("./algo3ter/index")
const dijkstra4 = require("./algo4/index")

const graph = {
    A: {B: 1, C: 2},
    B: {A: 1, D: 2, F: 3},
    C: {A: 2, D: 3, E: 4},
    D: {B: 2, F: 3, C: 3, E: 2, G: 3},
    E: {C: 4, D: 2, G: 5},
    F: {B: 3, D: 3, G: 4},
    G: {F: 4, D: 3, E: 5}
}

const suite = new Benchmark.Suite();


suite.add('F2', () => {
    dijkstra2(graph, "A", "G")
});

suite.add('F3', () => {
    dijkstra3.find_path(graph, "A", "G", {cost: true})
});

suite.add("F3ter", () => {
    dijkstra3ter.find_path(graph, "A", "G", {cost: true})
})

suite.add("F3bis", () => {
    dijkstra3bis.dijkstra(graph, "A", "G")
})

suite.add("F4", () => {
    dijkstra4.dijkstra(graph, "A", "G")
})


suite
    .on('cycle', (event) => {
        console.log(String(event.target));
    })
    .on('complete', function () {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
        console.log('Terminé!');
    })
    .run({ async: true });

// console.time("F2");
// console.log("Algo de dijksta 2", dijkstra2(graph, "A", "G"))
// console.timeEnd("F2")
//
//
// console.time("F3");
// console.log("Algo de dijksta 3", dijkstra3.find_path(graph, "A", "G"))
// console.timeEnd("F3")
//
// console.time("F3BIS");
// console.log("Algo de dijksta 3bis", dijkstra3bis.dijkstra(graph, "A", "G"))
// console.timeEnd("F3BIS")
//
// console.time("F4");
// console.log("Algo de dijksta 4", dijkstra4.dijkstra(graph, "A", "G"))
// console.timeEnd("F4")



// var suite = new Benchmark.Suite;
//
// // add tests
// suite.add('RegExp#test', function() {
//     /o/.test('Hello World!');
// })
//     .add('String#indexOf', function() {
//         'Hello World!'.indexOf('o') > -1;
//     })
//     // add listeners
//     .on('cycle', function(event) {
//         console.log(String(event.target));
//     })
//     .on('complete', function() {
//         console.log('Fastest is ' + this.filter('fastest').map('name'));
//     })
//     // run async
//     .run({ 'async': true });