// export default PubSub=(function (root) {
const PubSub = {
  subscribeCallback: {},
  subscribe(name, callback) {
    if (!Array.isArray(this.subscribeCallback[name])) {
      this.subscribeCallback[name] = [];
    }
    this.subscribeCallback[name].push(callback);
  },
  publish(name, value) {
    this.subscribeCallback[name].forEach((item) => {
      item(value);
    });
  },
};

// return PubSub
// PubSub.__proto__.subscribeCallback = {};
export default PubSub;
// root.PubSub = PubSub;
// })(this);
