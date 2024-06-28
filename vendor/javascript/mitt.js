function mitt(t){return{all:t=t||new Map,on:function(n,e){var i=t.get(n);i?i.push(e):t.set(n,[e])},off:function(n,e){var i=t.get(n);i&&(e?i.splice(i.indexOf(e)>>>0,1):t.set(n,[]))},emit:function(n,e){var i=t.get(n);i&&i.slice().map((function(t){t(e)})),(i=t.get("*"))&&i.slice().map((function(t){t(n,e)}))}}}export{mitt as default};

