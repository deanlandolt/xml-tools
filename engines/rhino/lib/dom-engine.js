var fs = require("file");

var domFactory = javax.xml.parsers.DocumentBuilderFactory.newInstance(),
    domBuilder = domFactory.newDocumentBuilder();

var Document = exports.Document = function(input) {
};

exports.Document = function(input) {
    if (input instanceof Document) return input;
    
    if (typeof input === "xml") input = input.toXMLString();
    if (typeof input === "string") {
        this._dom = domBuilder.parse(
            java.io.StringBufferInputStream(input)
        );
    }
    else if (input instanceof fs.Path) {
        this._dom = domBuilder.parse(""+input);
    }
}
