// class PriorityQueue {
//     constructor() {
//         this.nodes = [];
//     }
//
//     enqueue(node, priority) {
//         this.nodes.push({ node, priority });
//         this.sort();
//     }
//
//     dequeue() {
//         return this.nodes.shift().node;
//     }
//
//     sort() {
//         this.nodes.sort((a, b) => a.priority - b.priority);
//     }
//
//     isEmpty() {
//         return !this.nodes.length;
//     }
// }
//
// module.exports = PriorityQueue;