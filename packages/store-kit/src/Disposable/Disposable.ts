interface Subscription {
  unsubscribe: () => void;
}

abstract class Disposable {
  private subscriptions: Subscription[] = [];

  public bind(subscription: Subscription) {
    this.subscriptions.push(subscription);
  }

  public dispose() {
    this.subscriptions.forEach(subscription => {
      subscription.unsubscribe();
    });
  }
}

export default Disposable;
