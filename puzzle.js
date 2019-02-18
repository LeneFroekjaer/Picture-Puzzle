"use strict";
let dragged;
const imageAddress =
  "https://ichef.bbci.co.uk/news/660/cpsprodpb/567C/production/_104004122_c4abcb73-3a21-4403-b8bd-ff96cb4e312c.jpg";

// Her bliver billedet loadet
document.addEventListener("DOMContentLoaded", startTheScript);

function startTheScript() {
  document.querySelector("button").addEventListener("click", loadTheImage);
}

function loadTheImage() {
  document.querySelector("img").src = imageAddress;
  document.querySelector("img").onload = theDropZone;
}

// Her laves drop-zonen
function theDropZone() {
  let container_height = document.querySelector("img").naturalHeight;
  let container_width = document.querySelector("img").naturalWidth;
  const numOfXPieces = document.querySelector("#numberHeight").value;
  const numOfYPieces = document.querySelector("#numberWidth").value;
  document.querySelector(
    "#container"
  ).style.gridTemplateColumns = `repeat(${numOfXPieces}, 1fr)`;
  document.querySelector("#container").style.width = `${container_width}px`;
  for (let y = 0; y < numOfYPieces; y++) {
    for (let x = 0; x < numOfXPieces; x++) {
      let piece = document.createElement("div");

      piece.style.height = container_height / numOfYPieces + "px";

      /////////////////////////////////////////
      document.querySelector(
        "#brikker"
      ).style.gridTemplateColumns = `repeat(${numOfXPieces}, 1fr)`;
      document.querySelector("#brikker").style.width = `${container_width}px`;

      let brik = document.createElement("div");

      brik.style.height = container_height / numOfYPieces + "px";
      brik.style.width = container_width / numOfXPieces + "px";

      brik.style.color = "red";
      brik.classList.add("brik");
      brik.draggable = "true";
      //const brikNavn = brik.setAttribute("id", "id" + counter);

      brik.style.backgroundPosition = `${(x / (numOfXPieces - 1)) * 100}% ${(y /
        (numOfYPieces - 1)) *
        100}%`;

      //console.log(x);
      console.log((x / numOfXPieces) * 100);
      document.querySelector("#brikker").appendChild(brik);
      document.addEventListener("drag", function(event) {});

      document.addEventListener("dragstart", function(event) {
        // store a ref. on the dragged elem
        dragged = event.target;
        // make it half transparent
        event.target.style.opacity = 0.5;
      });

      document.addEventListener("dragend", function(event) {
        // reset the transparency
        event.target.style.opacity = "";
      });

      /* events fired on the drop targets */
      document.addEventListener("dragover", function(event) {
        // prevent default to allow drop
        event.preventDefault();
      });

      document.querySelectorAll(".brik").forEach(eachDot => {
        eachDot.style.left = `${Math.random() * 500 + 250}px`;
      });

      ////////////////////////////////////////

      //piece.textContent = `${x}${y}`;
      piece.classList.add("piece");

      document.querySelector("#container").appendChild(piece);
      document.addEventListener("drop", function(event) {
        // prevent default action (open as link for some elements)
        event.preventDefault();
        console.log("DROP", event.target.className);
        // move dragged elem to the selected drop target
        if (event.target.className == "piece") {
          event.target.style.background = "";
          dragged.parentNode.removeChild(dragged);
          event.target.appendChild(dragged);
          dragged.style.left = event.target.style.left;
          dragged.style.top = event.target.style.top;
        } else if (event.target.className == "theBody") {
          // park the dragged elem somewhere on the body
          dragged.style.left = event.pageX + "px";
          dragged.style.top = event.pageY + "px";
        }
      });
    }
  }
  //hverBrik(numOfXPieces, numOfYPieces, container_width, container_height);
}
