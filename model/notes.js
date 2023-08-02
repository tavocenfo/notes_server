const tags = require("./tags");

var notes = [
    { id: 1, title: "Android Room", description: "Clase donde veremos como crear un local database", date_created: 1, tag: tags[0] },
    { id: 2, title: "Limpiar Cuarto", description: "Ordernar y botar cosas innecesarias", date_created: 1, tag: tags[1] },
    { id: 3, title: "Android Retrofit", description: "Clase donde veremos como crear conexiones a un server", date_created: 1, tag: tags[0] }
];

module.exports = notes;

