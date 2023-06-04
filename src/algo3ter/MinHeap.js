const MinHeap = {
    make: function (sorter) {
        var heap = {};
        var minHeap = MinHeap;
        for (var key in minHeap) {
            if (minHeap.hasOwnProperty(key)) {
                heap[key] = minHeap[key];
            }
        }
        heap.sorter = sorter;
        heap.container = [];

        return heap;
    },
    /**
     * Finding parents or children with indexes.
     */
    get_left_child_index(parent_index) {
        return (2 * parent_index) + 1;
    },
    get_right_child_index(parent_index) {
        return (2 * parent_index) + 2;
    },
    get_parent_index(child_index) {
        return Math.floor((child_index - 1) / 2);
    },
    has_parent(child_index) {
        return this.get_parent_index(child_index) >= 0;
    },
    has_left_child(parent_index) {
        return this.get_left_child_index(parent_index) < this.container.length;
    },
    has_right_child(parent_index) {
        return this.get_right_child_index(parent_index) < this.container.length;
    },
    left_child(parent_index) {
        return this.container[this.get_left_child_index(parent_index)];
    },
    right_child(parent_index) {
        return this.container[this.get_right_child_index(parent_index)];
    },
    parent(child_index) {
        return this.container[this.get_parent_index(child_index)];
    },
    swap(first, second) {
        var tmp = this.container[second];
        this.container[second] = this.container[first];
        this.container[first] = tmp;
    },

    /**
     * Returns element with the highest priority.
     */
    pop() {
        if (this.container.length === 1) {
            return this.container.pop();
        }

        var head_index = 0;
        var last_element = this.container.pop();
        var first_element = this.container[head_index];

        this.container[head_index] = last_element;
        this.heapify_down(head_index);

        return first_element;
    },

    insert(value) {
        this.container.push(value);
        this.heapify_up(this.container.length - 1);
    },

    heapify_up(start_index) {
        var current_index = start_index || this.container.length - 1;

        while (
            this.has_parent(current_index) &&
            !this.pair_is_in_correct_order(
                this.parent(current_index),
                this.container[current_index])
            ) {
            this.swap(current_index, this.get_parent_index(current_index));
            current_index = this.get_parent_index(current_index);
        }
    },

    heapify_down(start_index = 0) {
        var current_index = start_index;
        var next_index = null;

        while (this.has_left_child(current_index)) {
            if (
                this.has_parent(current_index) &&
                this.pair_is_in_correct_order(
                    this.right_child(current_index),
                    this.left_child(current_index))
            ) {
                next_index = this.get_right_child_index(current_index);
            } else {
                next_index = this.get_left_child_index(current_index);
            }

            if (this.pair_is_in_correct_order(
                this.container[current_index],
                this.container[next_index]
            )) {
                break;
            }

            this.swap(current_index, next_index);
            current_index = next_index;
        }
    },
    empty() {
        return this.container.length === 0;
    },
    pair_is_in_correct_order(a, b) {
        return this.sorter(a, b) < 0;
    }
}

module.exports = MinHeap;