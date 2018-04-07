class Text extends HTMLElement {

  constructor() {
    super();
    this.currentDocument = document.currentScript.ownerDocument;
    this.state = {};
    this.changeState = this.changeState.bind(this);
    listeners.push(this.changeState);
  }

  connectedCallback() {
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const template = this.currentDocument.querySelector('#text-template');
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
    this.shadowRoot.querySelector('.text__content').innerHTML = this.state.content;
  }
}

customElements.define('text-custom', Text);