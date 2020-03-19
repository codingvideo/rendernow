#!/usr/bin/env node

var fs = require('fs');

function getArg(key){
  let i = process.argv.indexOf(key) + 1;
  return process.argv[i];
}

fs.readFile(getArg('-js'), 'utf8', function(err, function_file) {
  fs.readFile(getArg('-i'), 'utf8', function(err, in_file) {
    let matched_lines = [];
    let lines = in_file.split("\n");
    let exps = [];
    let results = [];
    lines.forEach(function(l, i){
      let match = l.match(/\<\!\-\-\s*\{\{\s*.+\s*\}\}\s*\-\-\>/)
      if(match !== null){
        matched_lines.push(i);
        let exp = 'results['+i+']='+l.trim().split(/\<\!\-\-\s*\{\{\s*/)[1].split(/\s*\}\}\s*\-\-\>/)[0];
        exps.push(exp);
      }
    });
    eval(function_file);
    exps.forEach(function(exp){
      eval(exp);
    });
    matched_lines.forEach(function(match){
      let line = lines[match];
      line = line.replace(/\<\!\-\-\s*\{\{\s*.+\s*\}\}\s*\-\-\>/, results[match]);
      lines[match] = line;
    });
    fs.writeFile(getArg('-o'), lines.join("\n"), function(){});
  });
});
