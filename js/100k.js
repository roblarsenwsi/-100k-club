angular.module("comicsApp",["comicsApp.controllers"]),angular.module("comicsApp.controllers",["comicFilters","comicsFactories"]).controller("comicsCtrl",["$scope","$http",function(a,b){"use strict";b({method:"GET",url:"/data/books.json"}).success(function(b){a.items=b.books;for(var c=[],d=[],e=[],f=[],g=0;g<a.items.length;g++)if(_.contains(c,a.items[g].title)||c.push(a.items[g].title),a.items[g].pedigree&&(_.contains(d,a.items[g].pedigree)||d.push(a.items[g].pedigree)),a.items[g].publisher&&(_.contains(e,a.items[g].publisher)||e.push(a.items[g].publisher)),a.items[g].sales.length)for(var h=0;h<a.items[g].sales.length;h++)_.contains(f,a.items[g].sales[h].venue)||f.push(a.items[g].sales[h].venue);null!=document.location.search&&(a.search=document.location.search.slice(1,document.location.search.length)),a.sort=["title","issue","-grade"],a.titles=c,a.publishers=e,a.pedigrees=d,a.venues=f,a.uid=b.books.length}),a.sales=[],a.addItem=function(c){c.sales=a.sales,c.uid=a.uid,a.uid++,a.items.push(c),a.item={},a.sales=[],c.pedigree&&(_.contains(a.pedigrees,c.pedigree)||a.pedigrees.push(c.pedigree)),c.publisher&&(_.contains(a.publishers,c.publisher)||a.publishers.push(c.publisher)),_.contains(a.titles,c.title)||a.titles.push(c.title);for(var d=a.items,e=d.length,f=0;e>f;f++)delete d[f].$$hashKey;b.post("/data/index.php",angular.toJson(d)).success(function(){})},a.addSale=function(b){a.sales.push(_.clone(b));for(var c in b)b.hasOwnProperty(c)&&delete b[c]},a.sorter=function(b){if(a.sort[0].indexOf(b)>-1&&"-"===a.sort[0].charAt(0)&&(a.sort[0]=b.slice(1)),a.sort[0].indexOf(b)>-1&&-1===a.sort[0].indexOf("-"))a.sort[0]="-"+b;else{var c=[];c[0]=b;for(var d=0;d<a.sort[0].length;d++)a.sort[d]!==b&&c.push(a.sort[d]);a.sort=c}}}]).controller("chartCtrl",["$scope","dataService",function(a,b){"use strict";a.items=b,a.tooltip={price:0},a.updateTooltip=function(b){a.tooltip={price:b.price||0,venue:b.venue,date:b.date,title:b.title,issue:b.issue,pedigree:b.pedigree,collection:b.collection,provenance:b.provenance,grade_src:b.grade_src,grade:b.grade}},a.colorPicker=function(b){switch(b){case"Heritage":return a.colors[0];case"ComicConnect":return a.colors[1];case"Comiclink":return a.colors[2];case"Pedigree":return a.colors[3];case"Metropolis":return a.colors[4];case"JP The Mint":return a.colors[5];case"Mastronet":return a.colors[6];case"PGCMint":return a.colors[7];default:return a.colors[8]}},a.colors=["#ECD078","#D95B43","#C02942","#542437","#53777A","#69D2E7","#FA6900","#FE4365","#666666"]}]).controller("recordCtrl",["$scope","dataService",function(a,b){"use strict";a.items=b,a.sort="-price",null!=document.location.search&&(a.search=document.location.search.slice(1,document.location.search.length)),a.sorter=function(b){a.sort.indexOf(b)>-1&&"-"===a.sort.charAt(0)&&(a.sort=b.slice(1)),a.sort=a.sort.indexOf(b)>-1&&-1===a.sort.indexOf("-")?"-"+b:b}}]).controller("saCtrl",["$scope","$http",function(a,b){"use strict";b({method:"GET",url:"/data/sa-pedigrees.json"}).success(function(b){a.items=b.books,a.keys=b.keys})}]).controller("actionTecChartCtrl",["$scope","tecService",function(a,b){"use strict";a.items=b,a.tooltip={price:0},a.updateTooltip=function(b){a.tooltip={price:b.price||0,venue:b.venue,date:b.date,title:b.title,issue:b.issue,pedigree:b.pedigree,collection:b.collection,provenance:b.provenance,grade_src:b.grade_src,grade:b.grade}},a.colorPicker=function(b){switch(b){case"Action Comics":return a.colors[0];case"Detective Comics":return a.colors[1]}},a.colors=["#D95B43","#3A05FA"]}]),angular.module("comicFilters",[]).filter("srcFilter",function(){return function(a){return("cgc"===a||"pgx"===a||"cbcs"===a)&&(a=a.toUpperCase()),a}}).filter("capitalize",function(){"use strict";return function(a){return a?a.charAt(0).toUpperCase()+a.slice(1):void 0}}).filter("saneDate",function(){"use strict";return function(a){return a?a.replace(/-/g,"/"):void 0}}).filter("xDate",function(){"use strict";return function(a){if(void 0!==a){var b=a.split("-"),c=b[0]-1990,d=12*c+parseInt(b[1]);return 64+3*d}}}).filter("yPrice",function(){"use strict";return function(a){return a?673-a/5263.15789473684:void 0}}).filter("gradeFilter",function(){"use strict";return function(a){return a?2*a:void 0}}),angular.module("comicsFactories",[]).factory("dataService",["$http",function(a){"use strict";var b=[];return a({method:"GET",url:"/data/books.json"}).success(function(a){for(var c=0,d=a.books.length;d>c;c++)if(a.books[c].sales.length)for(var e=0,f=a.books[c].sales.length;f>e;e++)parseFloat(a.books[c].sales[e].price)>=1e5&&b.push({title:a.books[c].title,issue:a.books[c].issue,pedigree:a.books[c].pedigree,collection:a.books[c].collection,provenance:a.books[c].provenance,grade:a.books[c].grade,grade_src:a.books[c].grade_src,uid:Math.floor(a.books[c].uid),date:a.books[c].sales[e].sale_date,venue:a.books[c].sales[e].venue,price:Math.floor(a.books[c].sales[e].price),link:a.books[c].sales[e].link})}),b}]).factory("tecService",["$http",function(a){"use strict";var b=[];return a({method:"GET",url:"/data/books.json"}).success(function(a){for(var c=0,d=a.books.length;d>c;c++)if(a.books[c].sales.length&&("Detective Comics"==a.books[c].title&&"27"==a.books[c].issue||"Action Comics"==a.books[c].title&&"1"==a.books[c].issue))for(var e=0,f=a.books[c].sales.length;f>e;e++)parseFloat(a.books[c].sales[e].price)>=1e5&&b.push({title:a.books[c].title,issue:a.books[c].issue,pedigree:a.books[c].pedigree,collection:a.books[c].collection,provenance:a.books[c].provenance,grade:a.books[c].grade,grade_src:a.books[c].grade_src,uid:Math.floor(a.books[c].uid),date:a.books[c].sales[e].sale_date,venue:a.books[c].sales[e].venue,price:Math.floor(a.books[c].sales[e].price),link:a.books[c].sales[e].link})}),b}]);