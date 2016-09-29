/*eslint evil:true */

(function(global) {
  'use strict';

  function traverse(o, aux, fn) {
    if (typeof o === 'object') {
      var aux2;
      if (o instanceof Array) {
        for (var k in o) {
          aux2 = aux + "[" + k + "]";
          fn(aux2);
          traverse(o[k], aux2, fn);
        }
      } else {
        for (var k in o) {
          if ((/[ -]/).test(k)) {
            aux2 = aux + "['" + k + "']";
          } else {
            aux2 = aux + "." + k;
          }
          fn(aux2);
          traverse(o[k], aux2, fn);
        }
      }
    }
  }

  function jsonKeys(o) {
    var results = [];
    function fn(k) {
      results.push(k);
    }
    traverse(o, '', fn);
    return results;
  }

  function jsonDiff(oA, oB, kA, kB) {
    var onlyA = {};
    var onlyB = {};
    var both = {};
    var both2 = {};
    var k, i, vA, vB;
    for (i in kA) {
      k = kA[i];
      if (kB.indexOf(k) !== -1) {
        both[k] = true;
      } else {
        onlyA[k] = eval('oA' + k);
      }
    }
    for (i in kB) {
      k = kB[i];
      if (kA.indexOf(k) === -1) {
        onlyB[k] = eval('oB' + k);
      }
    }
    both = Object.keys(both);
    for (i in both) {
      k = both[i];
      vA = eval('oA' + k);
      vB = eval('oB' + k);
      if (vA !== vB && typeof vA !== 'object' && typeof vB !== 'object') {
        both2[k] = {a:vA, b:vB};
      }
    }
    var res = {
      onlyA: onlyA,
      onlyB: onlyB,
      valuesDiffer: both2
    };
    return res;
  }

  function repeat(s, times) {
    return new Array(times + 1).join(s);
  }

  var GAP = '  ';
  var NL = '\n';
  var DELIM = "'";
  function traverse2(o, indent) {
    if (typeof o === 'object') {
      var res = [];
      var k, complexKey;
      if (o instanceof Array) {
        /*res.push(repeat(GAP, indent));*/ res.push('['); res.push(NL);
        for (k in o) {
          res.push(repeat(GAP, indent+1)); res.push( traverse2(o[k], indent+1) ); res.push(',\n');
        }
        res.pop(); res.push(NL);
        res.push(repeat(GAP, indent)); res.push(']'); // res.push(NL);
      } else {
        /*res.push(repeat(GAP, indent));*/ res.push('{'); res.push(NL);
        for (k in o) {
          complexKey = (/[ -]/).test(k);
          res.push(repeat(GAP, indent+1));

          if (complexKey) { res.push(DELIM) };
          res.push(k);
          if (complexKey) { res.push(DELIM) };
          res.push(': ');

          res.push( traverse2(o[k], indent+1) ); res.push(',\n');
        }
        res.pop(); res.push(NL);
        res.push(repeat(GAP, indent)); res.push('}'); //res.push(NL);
      }
      return res.join('');
    }
    var v = JSON.stringify(o);
    if (v[0] === '"') {
      v = "'" + v.substring(1, v.length - 1) + "'";
    }
    return v;
  }

  function json2js(o) {
    return traverse2(o, 0);
  }



  global.jsonKeys = jsonKeys;

  global.jsonDiff = function(oA, oB) {
    var kA = jsonKeys(oA);
    var kB = jsonKeys(oB);
    return jsonDiff(oA, oB, kA, kB);
  }

  global.json2js = json2js;

})(this);
