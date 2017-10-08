import Person = require("models/person");
import createPersonView = require("views/person_view");
import { appendChild, button, disposeViewSubscriptions } from "utils/html";

export function launch() {
    const element = document.querySelector(".content");
    if (element) {
        const person = new Person({ firstName: "Bob", lastName: "Smith" });

        const personView = createPersonView(person);

        const disposeButton = button("Dispose", () => {
            disposeViewSubscriptions();
            person.dispose();
        });

        appendChild(element, personView);
        appendChild(element, disposeButton);
    }
}
