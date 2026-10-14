// Turns "/about/?x=1#top" into "/about" so we can find the page in our SEO list.

export function cleanPath(url) {
  let path = url.split("?")[0].split("#")[0];
  if (path.length > 1 && path.endsWith("/")) {
    path = path.slice(0, -1); // remove the slash at the end
  }
  return path;
}
