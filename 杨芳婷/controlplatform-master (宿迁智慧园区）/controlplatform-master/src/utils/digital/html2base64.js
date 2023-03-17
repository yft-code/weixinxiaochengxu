import html2canvas from "html2canvas";

async function toBase64ForDefaultValue(htmlID, color = null) {
  var element = document.getElementById(htmlID);
  let img = await html2canvas(element, {
    dpi: 1000,
    backgroundColor: color
  }).then(function (canvas) {
    let image = canvas.toDataURL("png");
    return image;
  });
  return img;
}
export default toBase64ForDefaultValue;
