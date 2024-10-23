// 23 Oct 2024
Object.constructor.prototype.new = (function() {
  var obj = Object.create(this.prototype);
  this.apply(obj, arguments);
  return obj;
});


angleMode = "radians";

Math.TAU = Math.PI * 2;
// get distance or if within dist
var getDist = function(x1, y1, x2, y2, dst) {
  return dst ?
    (((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2)) <= dst * dst) :
    Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
};
var distSq = function(x1, y1, x2, y2) {
  return ((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2));
};
function hasProp(obj, prop) {
  return obj.hasOwnProperty(prop);
}
Object.constructor.prototype.hasProp = hasProp;


var mouse = (function() {
  var mouse = {
    clicked: false, // mouseClicked
    clickActive: false, // If a click has been used
    initialPressed: false, // 
    initialPressedPos: [undefined, undefined],
    down: false,
    up: true,
    pressed: false, // mousePressed
    released: false, // mouseReleased
    dragged: false, // mouseDragged
    out: true, // mouseOut
    availableClick: true, // 
    focused: focused, // Is the mouse focused on the canvas

    doubleClicked: false, // isDoubleClicked
    startDoubleClickTimer: false, // If to start the timer
    doubleClickTimer: 0, // The timer
    resetDoubleClick: function() {
      mouse.startDoubleClickTimer = false;
      mouse.doubleClickTimer = 0;
    }, // To reset the properties
  };
  mouseClicked = function() {
    mouse.clicked = !false;
    (function /*isDoubleClicked*/() {
      if (mouse.doubleClickTimer >= 0 && mouse.startDoubleClickTimer) {
        mouse.doubleClicked = true;
        mouse.resetDoubleClick();
      }
      if (!mouse.startDoubleClickTimer) {
        mouse.startDoubleClickTimer = true;
        mouse.doubleClickTimer = 20;
      }
    })();
  };
  mousePressed = function() {
    mouse.initialPressed = true;
    mouse.initialPressedPos = [mouseX, mouseY];
    mouse.pressed = true;
  };
  mouseReleased = function() {
    mouse.pressed = false;
    mouse.released = true;
  };
  mouseDragged = function() {
    mouse.dragged = true;
  };
  mouseOver = function() {
    mouse.over = true;
  };
  mouseOut = function() {
    mouse.over = false;
  };
  return mouse;
})();

var keys = (function() {
  /** Properties of keys
   * 
   *   pressed        -  If a key has been pressed down.
   *                     Lasts for only a single frame.
   *                     Different from keys.down.
   * 
   *   released       -  If a key has been released.
   *                     Lasts for only a single frame.
   *                     Different from keys.up.
   * 
   *   down           -  If a key is being held down.
   *                     Lasts until the key is released.
   * 
   *   up             -  If all keys are released.
   *                     Lasts until a key is pressed.
   * 
   *   pressedCode    -  The keycode of the pressed key.
   *                     Lasts for only a single frame.
   * 
   *   pressedKey     -  The character of the pressed key.
   *                     Lasts for only a single frame.
   * 
   *   releasedCode   -  The keycode of the released key.
   *                     Lasts for only a single frame.
   * 
   *   releasedKey    -  The character of the pressed key.
   *                     Lasts for only a single frame.
   */
  var keys = {};
  keyPressed = function() {
    keys['_' + key.toString().toLowerCase()] = true;
    keys[keyCode] = true;
    keys.pressed = true;
    keys.down = true;
    keys.up = false;
    keys.pressedCode = keyCode;
    keys.pressedKey = key.toString().toLowerCase();
  };
  keyReleased = function() {
    keys['_' + key.toString().toLowerCase()] = false;
    keys[keyCode] = false;
    keys.released = true;
    keys.down = false;
    keys.up = true;
    keys.releasedCode = keyCode;
    keys.releasedKey = key.toString().toLowerCase();
  };
  return keys;
})();

function newConstr(constrProps) {
  constrProps = constrProps || {};
  function newClass(classProps) {
    var self = this;
    classProps = classProps || {};
    Object.keys(classProps).forEach(function(keyName) {
      self[keyName] = classProps[keyName];
    });
    // if (classProps.methods) {
    //     Object.assign(self, classProps.methods);
    // }
    if (self.onInit) {
      self.onInit();
    }
  }
  if (constrProps.initialProps) {
    Object.assign(newClass.constructor.prototype, constrProps.initialProps);
  }
  if (constrProps.inheritFrom) {
    if (typeof constrProps.inheritFrom === "function") {
      Object.assign(newClass.constructor.prototype, constrProps.inheritFrom.constructor.prototype);
    } else if (constrProps.inheritFrom instanceof Array) {
      constrProps.inheritFrom.forEach(function(elem, indx) {
        Object.assign(newClass.constructor.prototype, constrProps.inheritFrom.constructor.prototype);
      });

    }

  }

  return newClass;
}

function NewID() {

}

var elems = [];

var Elem = newConstr({
  initialProps: function() {

  },
});
var Page = newConstr({
  initialProps: function() {

  },
  inheritFrom: [Elem],
});





draw = function() {
  for (var i = elems.length - 1; i >= 0; i--) {
    var self = elem[i]
    self.exec()
  }
  ellipse(0, 0, 100, 100)
};
