import { div, textInput, paragraph } from "../utils/html";
import Person = require("../models/person");

function createPersonView(person: Person) {
    return div([
        textInput(person.firstName),
        textInput(person.lastName),
        paragraph(person.fullNameRx())
    ]);
}

export = createPersonView;
