bka.onclick = function() {
  var s = taA.value;
  var o = JSON.parse(s);
  var keys = jsonKeys(o);
  p.innerHTML = keys.join('<br/>');
};

bkb.onclick = function() {
  var s = taB.value;
  var o = JSON.parse(s);
  var keys = jsonKeys(o);
  p.innerHTML = keys.join('<br/>');
};

bdab.onclick = function() {
  var sA = taA.value;
  var oA = JSON.parse(sA);
  var sB = taB.value;
  var oB = JSON.parse(sB);
  var kA = jsonKeys(oA);
  var kB = jsonKeys(oB);
  var res = jsonDiff(oA, oB, kA, kB);
  p.innerHTML = JSON.stringify(res, null, '  ');
};

bj2j.onclick = function() {
  var s = taA.value;
  var o = JSON.parse(s);
  p.innerHTML = json2js(o);
};
