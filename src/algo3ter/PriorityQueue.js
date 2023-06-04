const MinHeap = require("./MinHeap");
/**
 * A very naive priority queue implementation.
 */
const PriorityQueue = {
    make(opts) {
        var T = this,
            t = {},
            key;
        opts = opts || {};
        for (key in T) {
            if (T.hasOwnProperty(key)) {
                t[key] = T[key];
            }
        }
        t.queue = MinHeap.make(T.default_sorter.bind(t));
        t.priorities = {};
        return t;
    },

    default_sorter(a, b) {
        return this.priorities[a] - this.priorities[b];
    },

    /**
     * Add a new item to the queue and ensure the highest priority element
     * is at the front of the queue.
     */
    push(value, cost) {
        this.priorities[value] = cost;
        this.queue.insert(value);
    },

    /**
     * Return the highest priority element in the queue.
     */
    pop() {
        var next_node_value = this.queue.pop();
        var next_node_cost = this.priorities[next_node_value];
        delete this.priorities[next_node_value];

        var next_node = {
            value: next_node_value,
            cost: next_node_cost
        };
        return next_node;
    },

    empty() {
        return this.queue.empty();
    }
}

module.exports = PriorityQueue;