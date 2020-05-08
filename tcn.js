/*jslint indent: 2, maxlen: 80, continue: false, unparam: false, node: true */
/* -*- tab-width: 2 -*- */
'use strict';

var EX;

function lookupOneStyle(s) {
  var n = EX.styleNums[s];
  return (Number.isFinite(n) ? n : '');
}
EX = lookupOneStyle;

function truthyOrZero(x) { return ((x === 0) || x); }

function words(s) { return String(s || '').match(words.rx); }
words.rx = /\b\w+\b/g;
function each(l, f) { if (l && f) { l.forEach(f); } }

EX.esc = function combo(s) {
  var w = words(s);
  if (!w) { return ''; }
  w = w.map(lookupOneStyle).filter(truthyOrZero).join(';');
  if (!w) { return ''; }
  return ('\u001B[' + w + 'm');
};

function reys(spec) {
  return spec.replace(/\w*G\b/g, function (m) {
    m = m.toLowerCase();
    return (m + 'rey ' + m + 'ray');
  });
}

EX.colorColumns = [
  { d: 'black', b: reys('darkG dimG dim') },
  { c: 'red', },
  { c: 'green', },
  { c: 'yellow', },
  { c: 'blue', },
  { c: 'purple violet', },
  { c: 'cyan turquoise', },
  { d: reys('brG G'), b: 'white' },
];

function lookupByNum(n) {
  var a = lookupByNum[n];
  return (Array.isArray(a) && a);
}
EX.names = lookupByNum;

function addName(dict, name, num) {
  dict[name] = num;
  var l = lookupByNum[num];
  if (l) {
    l.push(name);
  } else {
    lookupByNum[num] = [name];
  }
}

function declareColorName(dict, name, digit, fgBase, bgBase) {
  addName(dict, name, digit + fgBase);
  addName(dict, 'bg' + name, digit + (bgBase || (fgBase + 10)));
}

EX.colorNums = {};
EX.greyNums = {};

EX.colorColumns.forEach(function (spec, digit) {
  each(words(spec.d), function addDark(w) {
    declareColorName(EX.greyNums, w, digit, 30);
  });
  each(words(spec.b), function addBright(w) {
    declareColorName(EX.greyNums, w, digit, 90);
  });
  each(words(spec.c), function addColor(w) {
    declareColorName(EX.colorNums, w, digit, 30);
    declareColorName(EX.colorNums, 'br' + w, digit, 90);
  });
});

EX.styleNums = {};
addName(EX.styleNums, 'reset', 0);
addName(EX.styleNums, 'bold', 1);
addName(EX.styleNums, 'reverse', 7);
Object.assign(EX.styleNums, EX.colorNums, EX.greyNums);






module.exports = EX;
