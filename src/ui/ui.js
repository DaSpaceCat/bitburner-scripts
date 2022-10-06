let rhiUIint = `const rhiUI = {
  createElement: function (type) {
    return document.createElement(type);
  },
  floatWindow: function(id, head, width, height, padding, bWeight, bRadius, content) {
    let div = document.createElement("div");
    let iDiv = document.createElement("div");
    div.style.position = "absolute";
    div.style.padding = "0px";
    div.style.top = "0px";
    div.style.left = "0px";
    div.style.width = width + "px";
    div.style.height = height + "px";
    div.style.backgroundColor = "rgba(20, 20, 20, 1)";
    div.style.color = "white";
    div.style.zIndex = "9999";
    div.style.border = bWeight + "px solid rgb(68, 68, 68)";
    div.style.borderRadius = bRadius + "px";
    div.id = id;
    div.classList.add("rhiUI");
    iDiv.style.padding = padding + "px";
    iDiv.id = id + "in";
    let header = document.createElement("div");
    header.style.backgroundColor = "rgba(40, 40, 40, 1)";
    header.innerHTML = '<h3 id="' + id + 'head" style="margin: 0px; pointer-events: none;"> ' + head + ' </h3>';
    header.style.color = "white";
    header.id = id + "header";
    header.style.cursor = "move";
    header.style.padding = padding + "px";
    header.style.borderRadius = bRadius + "px " + bRadius + "px 0px 0px";
    header.style.borderBottom = bWeight + "px solid rgb(68, 68, 68)";
    //create minimize button
    let min = document.createElement("a");
    min.id = id + "min";
    min.innerHTML = "🗕";
    min.style.color = "white";
    min.style.textDecoration = "none";
    min.style.float = "right";
    min.style.display = "inline-block";
    min.onclick = function() {document.getElementById(id + "in").style.display = "none"; document.getElementById(id + "min").innerHTML = "gay";};
    div.appendChild(header);
    iDiv.innerHTML = content;
    div.appendChild(iDiv);
    document.body.appendChild(div);
    //we have to do this after we add the element to the doc, otherwise we get issues
    let heado = document.getElementById(id + "head");
    heado.appendChild(min);
    this.dragElement(div);
    return div;
  },
  createGlobalScript: function (id, script) {
    let s = document.createElement("script");
    s.id = id;
    s.innerHTML = script;
    document.head.appendChild(s);
  },
  dragElement: function(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      elmnt.onmousedown = dragMouseDown;
    }
    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      document.onmousemove = elementDrag;
    }
    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
      elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
  }
}`

export function initRhiUI() {
  let doc = eval("document");
  if (doc.getElementById("rhiUI") == null) {
    let scr = doc.createElement("script");
    scr.innerHTML = rhiUIint;
    scr.id = "rhiUI";
    doc.head.appendChild(scr);
  } else {
    console.log("rhiUI already initialized, reloading..");
    doc.getElementById("rhiUI").innerHTML = rhiUIint;
  }
}