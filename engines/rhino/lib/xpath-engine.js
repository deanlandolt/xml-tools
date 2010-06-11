var fs = require("file"),
    dom = require("./dom");

var factory = javax.xml.xpath.XPathFactory.newInstance();
var xpath = factory.newXPath();

exports.execute = function(expr, doc) {
    expr = xpath.compile(expr); // TODO instanceof first?
    var val = expr.evaluate(doc._dom, javax.xml.xpath.XPathConstants.NODESET);
    var results = [];
    for (var i = 0; i < val.length; i++) {
        results.push((""+val.item(i).getTextContent()).trim());
    }
    return results;
}
