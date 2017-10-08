import Knockout = require("./knockout");

export function appendChild(rootElement: Element, childElement: Element) {
    rootElement.appendChild(childElement);
}

export function div(children: Element[]) {
    const element = document.createElement("div");
    children.forEach(child => {
        appendChild(element, child);
    });
    return element;
}

export function paragraph(rx: Rx.Observable<string>) {
    const element = document.createElement("p");

    _subscriptionManager.subscribe(rx, text => {
        element.textContent = text;
    });

    return element;
}

export function textInput(ko: Knockout.IObservable<string>) {
    const element = document.createElement("input");
    element.type = "text";

    _subscriptionManager.subscribe(ko.rx, text => {
        element.value = text;
    });

    const keyupRx = Rx.Observable.fromEvent<{ target: HTMLInputElement }>(element, "keyup");
    _subscriptionManager.subscribe(keyupRx, ev => {
        ko(ev.target.value);
    });

    return element;
}

export function button(label: string, onClick: () => void) {
    const element = document.createElement("button");
    element.textContent = label;
    element.onclick = onClick;
    return element;
}


class SubscriptionManager implements Rx.IDisposable {
    private _disposables: Rx.IDisposable[] = [];

    public subscribe<T>(rx: Rx.Observable<T>, fn: (val: T) => void) {
        this._disposables.push(rx.subscribe(fn));
    }

    public dispose() {
        this._disposables.forEach(disposable => disposable.dispose());
        this._disposables.splice(0);
    }
}

const _subscriptionManager = new SubscriptionManager();

export function disposeViewSubscriptions() {
    _subscriptionManager.dispose();
}
