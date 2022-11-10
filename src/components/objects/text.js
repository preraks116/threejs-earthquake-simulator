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
      // textAlign: this.textAlign,
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
    
    // this.container.lookAt(0,0,0);
    // console.log(this.container);
    this.scene.add(this.container);

    for (let key in this.text) {
      let text = this.text[key];
      this.container.add(
        new ThreeMeshUI.Text({
          content: text.content,
          fontSize: text.fontSize,
          justifyContent: "center",
        })
      );
    }
  }
  update() {
    
  }
}

export { Text };


// text: new Text(
//   {
//     width: 10.2,
//     height: 8.5,
//     padding: 1.5,
//     justifyContent: "center",
//     textAlign: "left",
//     fontFamily: FontJSON,
//     fontTexture: FontImage,
//     position: { x: 25, y: 25, z: 80.8 },
//     rotation: { x: 0, y: 0.3, z: 0 },
//     text: [
//       {
//         content: "This library supports line-break-friendly-characters,",
//         fontSize: 0.555,
//       },
//       {
//         content:
//           "As well as multi-font-size lines with consistent vertical spacing.",
//         fontSize: 0.58,
//       },
//       {
//         content: "This library supports line-break-friendly-characters,",
//         fontSize: 0.56,
//       },
//     ],
//   },
//   scene
// ),