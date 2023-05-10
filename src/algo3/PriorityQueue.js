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
        t.queue = [];
        t.sorter = opts.sorter || T.default_sorter;
        return t;
    },

    default_sorter(a, b) {
        return a.cost - b.cost;
    },

    /**
     * Add a new item to the queue and ensure the highest priority element
     * is at the front of the queue.
     */
    push(value, cost) {
        var item = {value: value, cost: cost};
        this.queue.push(item);
        this.queue.sort(this.sorter);
    },

    /**
     * Return the highest priority element in the queue.
     */
    pop() {
        return this.queue.shift();
    },

    empty() {
        return this.queue.length === 0;
    }
}

module.exports = PriorityQueue;