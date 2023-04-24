export function darkenColor(color, v = -40) {
  if (color.length > 6) {
    color = color.substring(1, color.length);
  }
  var rgb = parseInt(color, 16);
  var r = Math.abs(((rgb >> 16) & 0xff) + v);
  if (r > 255) r = r - (r - 255);
  var g = Math.abs(((rgb >> 8) & 0xff) + v);
  if (g > 255) g = g - (g - 255);
  var b = Math.abs((rgb & 0xff) + v);
  if (b > 255) b = b - (b - 255);
  r = Number(r < 0 || isNaN(r)) ? 0 : (r > 255 ? 255 : r).toString(16);
  if (r.length === 1) r = "0" + r;
  g = Number(g < 0 || isNaN(g)) ? 0 : (g > 255 ? 255 : g).toString(16);
  if (g.length === 1) g = "0" + g;
  b = Number(b < 0 || isNaN(b)) ? 0 : (b > 255 ? 255 : b).toString(16);
  if (b.length === 1) b = "0" + b;
  return "#" + r + g + b;
}

export function formatAddress(address) {
  if (!address) return;
  return address.slice(0, 6) + "..." + address.slice(address.length - 4);
}
