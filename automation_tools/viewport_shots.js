var casper = require('casper').create();
var fs = require('fs');

if(fs.exists('./page_rendering/config.json') && fs.exists('./page_rendering/data.json')){
    var data = require('./page_rendering/data.json');
    var config = require('./page_rendering/config.json');
} else {
    casper.exit();
}

var urls = data.urls;
var viewportSizes = config.viewportSizes;


casper.start();
var counter = 0;
casper.repeat(viewportSizes.length, function(){
    var viewportSize = viewportSizes[counter];
    casper.viewport(viewportSize, 1000).each(urls, function(self, item, index){
        self.thenOpen(item, function(){
            var title = this.getTitle();
            this.wait(2000, function(){
                this.capture('./images/screenshot_' + index + '_' + viewportSize + '.png');            
            })
        });
    });
    counter++;
});


casper.run();
