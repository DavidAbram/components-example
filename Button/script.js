class Button extends HTMLElement {

  constructor() {
    super();
    this.currentDocument = document.currentScript.ownerDocument;
    this.state = {};
    this.changeState = this.changeState.bind(this);
    listeners.push(this.changeState);
    this.addEventListener('click', e => {
      this.click();
    });
  }

  click() {
    const action = this.getAttribute('click');
    actions[action]('ABC');
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const template = this.currentDocument.querySelector('#button-template');
    const instance = template.content.cloneNode(true);
    shadowRoot.appendChild(instance);
    const prop = this.getAttribute('content');
    this.state = { content: changableState[prop] };
    this.render();
  }

  changeState(property, value) {
    const prop = this.getAttribute('content');
    if(property === prop && this.state.content !== value) {
      this.state = { content: value };
      this.render();
    }
  }

  render() {
    this.shadowRoot.querySelector('.button__content').value = this.state.content;
  }
}

customElements.define('button-custom', Button);