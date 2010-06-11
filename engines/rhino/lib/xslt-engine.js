var fs = require("file");

java.lang.System.setProperty(
    "javax.xml.transform.TransformerFactory",
    "net.sf.saxon.TransformerFactoryImpl"
);

var transformerFactory = javax.xml.transform.TransformerFactory.newInstance();

exports.compile = function(input) {
    if (input instanceof javax.xml.transform.stream.StreamResult) {
        input = new java.io.ByteArrayInputStream(
            input.getOutputStream().toByteArray()
        );
    }
    else if (input instanceof fs.Path) {
        input = new java.io.File(input);
    }
    return transformerFactory.newTemplates(
        new javax.xml.transform.stream.StreamSource(input)
    );
};

exports.execute = function(template, input) {
    if (template instanceof fs.Path || typeof template === "string") {
        template = exports.compile(string);
    }
    
    if (input instanceof javax.xml.transform.stream.StreamResult) {
        input = new java.io.ByteArrayInputStream(
            input.getOutputStream().toByteArray()
        );
    }
    if (typeof input === "xml") input = input.toXMLString();
    if (typeof input === "string") {
        input = java.io.StringBufferInputStream(input);
    }
    input = new javax.xml.transform.stream.StreamSource(input);
    var output = new javax.xml.transform.stream.StreamResult(
        new java.io.ByteArrayOutputStream()
    );
    template.newTransformer().transform(input, output);
    return ""+(new java.lang.String(output.getOutputStream().toByteArray()));
};

