export const ATTRIBUTES = {
  disabled: 'disabled',
};

export const ATTRIBUTE_METHODS = {
  set: 'set',
  remove: 'remove',
  toggle: 'toggle',
};

export const handleAttributeMethods = (attr, method, elements) => {
  if (!Array.isArray(elements)) {
    elements = [elements];
  }

  switch (method) {
    case ATTRIBUTE_METHODS.toggle:
      elements.forEach(element => element.toggleAttribute(attr));
      break;

    case ATTRIBUTE_METHODS.set:
      elements.forEach(element => element.setAttribute(attr, ''));
      break;

    case ATTRIBUTE_METHODS.remove:
      elements.forEach(element => element.removeAttribute(attr));
      break;

    default:
      console.error('Invalid attribute passed to handleAttributeMethods');
  }
};
