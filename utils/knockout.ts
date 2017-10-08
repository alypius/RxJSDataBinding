export interface IObservable<T> extends Rx.IDisposable {
    (): T;
    (val: T): void;
    rx: Rx.Observable<T>;
}

export function createObservable<T>(value: T): IObservable<T> {
    let subject: Rx.BehaviorSubject<T> | null = null;

    const ko = <IObservable<T>>function knockoutObservable(newVal?: T): T | void {
        if (newVal === undefined)
            return value;

        value = newVal;
        if (subject)
            subject.onNext(value);
    };

    Object.defineProperty(ko, "rx", {
        get: function rx() {
            if (!subject)
                subject = new Rx.BehaviorSubject(value);
            return subject;
        }
    });

    ko.dispose = function dispose() {
        if (subject) {
            subject.dispose();
            subject = null;
        }
    }

    return ko;
}
