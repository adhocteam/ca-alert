function makeElement(tagName, text) {
  const el = document.createElement(tagName);
  const textNode = document.createTextNode(text);
  el.appendChild(textNode);
  return el;
}

const h1 = text => makeElement("h1", text);

document.body.appendChild(h1("Hello, world"));
