const inputNumber = document.getElementById('inp-num')
const resultDistance = document.getElementById('res-dist')
const resultRoad = document.getElementById('res-road')
const submitButton = document.getElementById('submit')





function get_link(v, D) {
    var x = [];
    for (var i = 0; i < D[v].length; i++) {
        if (D[v][i] > 0) {
            x.push(i);
        }
    }
    return x;
}

function arg_min(T, S) {
    var amin = -1;
    var m = Infinity;
    for (var i = 0; i < T.length; i++) {
        if (T[i] < m && !S.has(i)) {
            m = T[i];
            amin = i;
        }
    }
    return amin;
}

var D = [[0, 3, 4, 2, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 3, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 6, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 3, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 8, 0, 7, 0],
        [0, 0, 0, 0, 0, 0, 6, 12, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 14],
        [0, 0, 0, 0, 0, 0, 0, 0, 6, 11],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 3],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        ];

var N = D.length;
var T = new Array(N).fill(Infinity);
var v = 0;
var S = new Set();
T[v] = 0;
var P = new Array(N).fill('')
P[v] = '1';

while (v !== -1) {
    var links = get_link(v, D);
    for (var j = 0; j < links.length; j++) {
        var link = links[j];
        if (!S.has(link)) {
            var w = T[v] + D[v][link];
            var p = P[v] + '->' + String(link + 1);
            if (w < T[link]) {
                T[link] = w;
                P[link] = p;
            }
        }
    }
    v = arg_min(T, S);
    if (v >= 0) {
        S.add(v);
    }
}





submitButton.onclick = function () {
    const i = Number(inputNumber.value) - 1
    resultDistance.textContent = T[i]
    resultRoad.textContent = P[i]
}