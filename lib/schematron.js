var fs = require("file"),
    xslt = require("./xslt"),
    Document = require("./dom").Document;

var resources = fs.Path(fs.resolve(require.module.path, ".."))
    .join("resources", "schematron");

var templates = exports.templates = [
    "iso_dsdl_include.xsl",
    "iso_abstract_expand.xsl",
    "iso_schematron_skeleton_for_xslt1.xsl"
].map(function(template) {
    return xslt.compile(resources.join(template));
});



exports.compile = function(stylesheet) {
    templates.forEach(function(template) {
        stylesheet = xslt.execute(template, stylesheet);
    });
    return xslt.compile(stylesheet);
}

exports.validate = function(stylesheet, input) {
    input = Document(input);
    stylesheet = Document(stylesheet);
    // TODO export a Schematron class so compile can do an instanceof check
    if (stylesheet instanceof fs.Path || typeof stylesheet === "string") {
        stylesheet = exports.compile(stylesheet);
    }
    var results = xslt.execute(stylesheet, input)
        .replace(/<\?xml.*?\?>\s*/, "")
        .split(/\s*\r?\n\s*/)
        .filter(function(line) {
            return line;
        });
    if (results.length)
        throw new Error(results.join("\n"));
        //TODO throw new ValidationError(results.join("\n"));
    return input;
}

if (require.main === require.module) {
    print(templates[1]);
}
