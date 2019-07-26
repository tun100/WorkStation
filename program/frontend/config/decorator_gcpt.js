module.exports = componentClass => {
  Object.setPrototypeOf(componentClass.prototype, new React.Component())
  return componentClass
}