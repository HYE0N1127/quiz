export function alertAndMovePage(message: string, url: string) {
  alert(message);
  window.location.href = url;
}

export function movePage(url: string) {
  window.location.href = url;
}
