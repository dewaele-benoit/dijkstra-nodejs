class PriorityQueue {
    constructor() {
        this.nodes = [];
    }

    enqueue(node, priority) {
        this.nodes.push({ node, priority });
        this.sort();
    }

    dequeue() {
        return this.nodes.shift().node;
    }

    sort() {
        this.nodes.sort((a, b) => a.priority - b.priority);
    }

    isEmpty() {
        return !this.nodes.length;
    }
}

function dijkstra(graph, start, end) {
    const distances = new Array(Object.keys(graph).length).fill(Infinity);
    const previousNodes = new Array(Object.keys(graph).length).fill(null);
    distances[start] = 0;

    const queue = new PriorityQueue();
    queue.enqueue(start, 0);

    while (!queue.isEmpty()) {
        const currentNode = queue.dequeue();

        if (currentNode === end) {
            break;
        }

        const neighbors = graph[currentNode];

        for (const neighbor in neighbors) {
            const distance = distances[currentNode] + neighbors[neighbor];

            if (distance < distances[neighbor]) {
                distances[neighbor] = distance;
                previousNodes[neighbor] = currentNode;

                queue.enqueue(neighbor, distance);
            }
        }
    }

    const path = [];
    let currentNode = end;

    while (previousNodes[currentNode] !== null) {
        path.unshift(currentNode);
        currentNode = previousNodes[currentNode];
    }

    path.unshift(start);

    return [distances[end], path];
}


const graph = {
    A: { B: 1 },
    B: { A: 1, C: 2 },
    C: { B: 2 }
};


console.log("Algo de dijksta 1", dijkstra(graph, "A", "C"))