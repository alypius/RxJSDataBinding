import { IObservable, createObservable } from "../utils/knockout";

class Person implements Rx.IDisposable {
    private _firstName: IObservable<string>;
    private _lastName: IObservable<string>;

    constructor(args: { firstName: string; lastName: string }) {
        this._firstName = createObservable(args.firstName);
        this._lastName = createObservable(args.lastName);
    }

    public get firstName() {
        return this._firstName;
    }

    public get lastName() {
        return this._lastName;
    }

    public dispose() {
        this.firstName.dispose();
        this.lastName.dispose();
    }

    public fullNameRx() {
        return this.firstName.rx.combineLatest(this.lastName.rx,
            (firstName, lastName) => `${firstName} ${lastName}`);
    }
}

export = Person;
