var engine = require("xslt-engine");
for (var key in engine) {
    exports[key] = engine[key];
}

if (require.main === module) {
    print("i'm main!")
}
