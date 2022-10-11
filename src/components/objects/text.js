import ThreeMeshUI from "three-mesh-ui";

// text class
class Text {
  constructor(props, scene) {
    this.width = props.width;
    this.height = props.height;
    this.padding = props.padding;
    this.justifyContent = props.justifyContent;
    this.textAlign = props.textAlign;
    this.fontFamily = props.fontFamily;
    this.fontTexture = props.fontTexture;
    this.position = props.position;
    this.rotation = props.rotation;
    this.text = props.text;
    this.scene = scene;

    this.container = new ThreeMeshUI.Block({
      width: this.width,
      height: this.height,
      padding: this.padding,
      justifyContent: this.justifyContent,
      textAlign: this.textAlign,
      fontFamily: this.fontFamily,
      fontTexture: this.fontTexture,
    });
  }
  render() {
    this.container.position.set(
      this.position.x,
      this.position.y,
      this.position.z
    );
    this.container.rotation.set(
      this.rotation.x,
      this.rotation.y,
      this.rotation.z
    );
    this.scene.add(this.container);

    for (let key in this.text) {
      let text = this.text[key];
      this.container.add(
        new ThreeMeshUI.Text({
          content: text.content,
          fontSize: text.fontSize,
        })
      );
    }
  }
  update() {
    
  }
}

export { Text };
