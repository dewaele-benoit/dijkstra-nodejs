'use strict';
const PriorityQueue = require("./PriorityQueue")
const dijkstra = {
    single_source_shortest_paths: function(graph, s, d) {
        // Predecessor map for each node that has been encountered.
        // node ID => predecessor node ID
        var predecessors = {};

        // Costs of shortest paths from s to all nodes encountered.
        // node ID => cost
        var costs = {};
        costs[s] = 0;

        // Costs of shortest paths from s to all nodes encountered; differs from
        // `costs` in that it provides easy access to the node that currently has
        // the known shortest path from s.
        // XXX: Do we actually need both `costs` and `open`?
        var open = PriorityQueue.make();
        open.push(s, 0);
        var closest, u, v, cost_of_s_to_u, adjacent_nodes, cost_of_e, cost_of_s_to_u_plus_cost_of_e, cost_of_s_to_v, first_visit;

        // Ajouter une variable pour stocker la somme des coûts
        var totalCost = 0;

        while (!open.empty()) {
            // In the nodes remaining in graph that have a known cost from s,
            // find the node, u, that currently has the shortest path from s.
            closest = open.pop();
            u = closest.value;
            cost_of_s_to_u = closest.cost;

            // Get nodes adjacent to u...
            adjacent_nodes = graph[u] || {};

            // ...and explore the edges that connect u to those nodes, updating
            // the cost of the shortest paths to any or all of those nodes as
            // necessary. v is the node across the current edge from u.
            for (v in adjacent_nodes) {
                if (adjacent_nodes.hasOwnProperty(v)) {
                    // Get the cost of the edge running from u to v.
                    cost_of_e = adjacent_nodes[v];

                    // Cost of s to u plus the cost of u to v across e--this is *a*
                    // cost from s to v that may or may not be less than the current
                    // known cost to v.
                    cost_of_s_to_u_plus_cost_of_e = cost_of_s_to_u + cost_of_e;

                    // If we haven't visited v yet OR if the current known cost from s to
                    // v is greater than the new cost we just found (cost of s to u plus
                    // cost of u to v across e), update v's cost in the cost list and
                    // update v's predecessor in the predecessor list (it's now u).
                    cost_of_s_to_v = costs[v];
                    first_visit = (typeof costs[v] === 'undefined');
                    if (first_visit || cost_of_s_to_v > cost_of_s_to_u_plus_cost_of_e) {
                        costs[v] = cost_of_s_to_u_plus_cost_of_e;
                        open.push(v, cost_of_s_to_u_plus_cost_of_e);
                        predecessors[v] = u;
                        totalCost = cost_of_s_to_u_plus_cost_of_e;
                    }
                }
            }
        }

        if (typeof d !== 'undefined' && typeof costs[d] === 'undefined') {
            var msg = ['Could not find a path from ', s, ' to ', d, '.'].join('');
            throw new Error(msg);
        }

        // Retourner les prédécesseurs et la somme des coûts
        return {
            predecessors: predecessors,
            totalCost: totalCost
        };
    },

    extract_shortest_path_from_predecessor_list: function(predecessors, d) {
        var nodes = [];
        var u = d;
        var predecessor;
        while (u) {
            nodes.push(u);
            predecessor = predecessors[u];
            u = predecessors[u];
        }
        nodes.reverse();
        return nodes;
    },

    find_path: function(graph, s, d, option = {}) {
        var result = dijkstra.single_source_shortest_paths(graph, s, d);
        var totalCost = result.totalCost;
        if (option.cost) {
            return {
                path: dijkstra.extract_shortest_path_from_predecessor_list(result.predecessors, d),
                totalCost: totalCost
            }
        }
        return dijkstra.extract_shortest_path_from_predecessor_list(result.predecessors, d)
    }
};

module.exports = dijkstra

const graph = {
    A: {B: 1, C: 2},
    B: {A: 1, D: 2, F: 3},
    C: {A:2, D: 3, E: 4},
    D: {B: 2, F: 3, C:3, E:2, G:3},
    E: {C: 4, D:2, G: 5},
    F: {B: 3, D:3, G:4},
    G: {F: 4, D: 3, E: 5}
}

// console.time("F3");
// console.log("Algo de dijksta 3", dijkstra.find_path(graph, "A", "G", {cost: true}))
// console.timeEnd("F3")