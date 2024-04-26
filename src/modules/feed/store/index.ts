// import {observable, action} from 'mobx';
import {makeObservable, spy} from 'mobx';
import {createMobxDebugger} from 'mobx-flipper';
import {observable, computed, action, flow} from 'mobx';
import {PureSpyEvent} from 'mobx/dist/internal';
class CounterStore {
  value: number = 0;

  constructor() {
    makeObservable(this, {
      value: observable,
      double: computed,
      increment: action,
      decrease: action,
    });
  }

  get double() {
    return this.value * 2;
  }

  increment() {
    this.value++;
  }

  decrease() {
    if (this.value > 0) {
      this.value--;
    }
  }
}

const counterStore = new CounterStore();
if (__DEV__) {
  //   const mobxDebugger = createMobxDebugger(counterStore);
  //   const handleEvent = (event: PureSpyEvent) => {
  //     mobxDebugger(event);
  //   };
  //   spy(handleEvent);
  spy(createMobxDebugger(counterStore));
}

export default counterStore;
