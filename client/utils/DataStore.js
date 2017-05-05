import Immutable from 'immutable';

let instance = null;
class DataStore {
  constructor() {
    if (!instance) {
      instance = this;
      this.data = Immutable.Map();
    }
    return instance;
  }
}

export default DataStore;
