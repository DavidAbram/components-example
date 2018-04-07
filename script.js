const state = {
  content: "Porukica!",
  helloWorld: "Hello world!",
  button: "Press this!",
};

const listeners = [];

function stateChange() {
	const handler = {
		get(target, property, receiver) {
			try {
				return new Proxy(target[property], handler);
			} catch (err) {
				return Reflect.get(target, property, receiver);
			}
		},
		defineProperty(target, property, descriptor) {
			listeners.forEach(listen => {
        listen(property, descriptor.value);
      });
			return Reflect.defineProperty(target, property, descriptor);
		},
		deleteProperty(target, property) {
			listeners.forEach(listen => {
        listen(property, descriptor.value);
      });
			return Reflect.deleteProperty(target, property);
		}
	};

	return new Proxy(state, handler);
};

const changableState = stateChange();


const actions = {
  changeContent: (content) => {
    changableState.content = content;
  }
}
