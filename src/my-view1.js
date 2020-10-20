/**
 * @license
 * Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 * This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 * The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 * The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 * Code distributed by Google as part of the polymer project is also
 * subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */

import { PolymerElement, html } from "@polymer/polymer/polymer-element.js";
import "./shared-styles.js";

class MyView1 extends PolymerElement {
  static get template() {
    return html`
      <style include="shared-styles">
        :host {
          display: block;

          padding: 10px;
        }
      </style>

      <div class="card">
        <button on-click="first">BIG STUFF</button>
        <div class="circle">1</div>
        <h1>View One</h1>
        ${ currentPlateau.forEach(row => { createTableRow(); row.forEach(item => createTableCell(item ? 'red' : 'transparent'))})}
      </div>
    `;
  }

  constructor() {
    super();
    this.direction = ["N", "E", "S", "W"];
    this.currentDirection = "";
    this.currentPlateau = [];
    this.proxyDirection = new Proxy(this.direction, {
      get(target, prop) {
          if (!isNaN(prop)) {
              prop = parseInt(prop, 10);
              if (prop < 0) {
                  prop += target.length;
              }
          }
          return target[prop];
      }
  });
  }
  
  first() {
    let movement = [
      [5, 5],
      [1, 2, "N"],
      ["L", "M", "L", "M", "L", "M", "L", "M", "M"],
    ];

    this.currentPlateau = [movement[1][0], movement[1][1]];
    this.currentDirection = movement[1][2];

    let mvmntChange = movement[2];

    for (let i = 0; i < mvmntChange.length; i++) {
      if (mvmntChange[i].toUpperCase() == "M") {
        this.move();
        continue
      }

      if (mvmntChange[i].toUpperCase() == "R") {
        this.currentDirection = this.proxyDirection[((this.direction.indexOf(this.currentDirection)) + 1)]
        continue
      }

      if (mvmntChange[i].toUpperCase() == "L") {
        this.currentDirection = this.proxyDirection[((this.direction.indexOf(this.currentDirection)) - 1)]
        continue
      }
    }
    console.log("Last position of Rover:" + this.currentPlateau + "|", "And he is facing:" + this.currentDirection)
  }

  moveW() {
    --this.currentPlateau[0]
    return;
  }
  moveE() {
    ++this.currentPlateau[0]
    return;

  }
  moveN() {
    ++this.currentPlateau[1]
    return;
  }

  moveS() {
    --this.currentPlateau[1]
    return;
  }

  move() {
    switch (this.currentDirection) {
      case "N":
        this.moveN();
        break;
      case "E":
        this.moveE();
        break;
      case "S":
        this.moveS();
        break;
      case "W":
        this.moveW();
        break;
      default:
        console.error("RUN!!! PANIC");
    }
  }
}

window.customElements.define("my-view1", MyView1);
