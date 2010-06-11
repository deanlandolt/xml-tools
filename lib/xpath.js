var engine = require("xpath-engine");
for (var key in engine) {
    exports[key] = engine[key];
}

if (require.main === module) {
    var fs = require("file"),
        Document = require("./dom").Document;
    var fixtures = fs.Path(fs.resolve(require.module.path, ".."))
        .join("resources");
    var doc = new Document(fixtures.join("a.xml"));
    
    print("//c/d", engine.execute("//c/d", doc).toSource());
    print("//c", engine.execute("//c", doc).toSource());
    print("//b", engine.execute("//b", doc).toSource());
    print("//a", engine.execute("//a", doc).toSource());
}
