"use strict";

/* -------------------------------------------------

Dynamic cursor

--------------------------------------------------- */
var cursorSettings = {
  'class': 'dynamicCursor',
  'size': '18',
  'expandedSize': '50',
  'expandSpeed': 0.4,
  'background': 'rgba(161, 142, 218, 0.4)',
  'opacity': '1',
  'transitionTime': '1.4s',
  'transitionEase': 'cubic-bezier(0.075, 0.820, 0.165, 1.000)',
  'borderWidth': '0',
  'borderColor': 'black',
  'iconSize': '11px',
  'iconColor': 'white',
  'triggerElements': {
    'trigger1': {
      'className': 'blog-slider__content',
      'icon': '<i class="fa fa-child fa-3x"></i>'
    },
    'trigger2': {
      'className': 'recent-post-info',
      'icon': '<i class="fa fa-external-link-square fa-flip-horizontal fa-3x"></i>'
    },
    'trigger3': {
      'className': 'categoryBar-list-item',
      'icon': '<i class="fa fa-arrows-v fa-3x"></i>'
    },
    'trigger4': {
      'className': 'post_bg',
      'icon': '<i class="fa fa-external-link-square fa-flip-horizontal fa-3x"></i>'
    },
    'trigger5': {
      'className': 'illo',
      'icon': '<i class="fa fa-arrows fa-3x"></i>'
    }
  }
};

function dynamicCursor(options) {
  // document.write('<link rel="stylesheet" href="从fonts/line-awesome/1.1/css/line-awesome-font-awesome.min.css">');
  var hold;
  cursor = document.createElement('div');
  var cursorIcon = document.createElement('div');
  cursorIcon.classList.add('cursorIcon');
  cursorIcon.style.position = 'absolute';
  cursorIcon.style.fontFamily = 'Raleway';
  cursorIcon.style.textTransform = 'uppercase';
  cursorIcon.style.fontWeight = '800';
  cursorIcon.style.textAlign = 'center';
  cursorIcon.style.top = '50%';
  cursorIcon.style.width = '100%';
  cursorIcon.style.transform = 'translateY(-50%)';
  cursorIcon.style.color = options.iconColor;
  cursorIcon.style.fontSize = options.iconSize;
  cursorIcon.style.opacity = 0;
  cursorIcon.style.transition = "opacity ".concat(options.expandSpeed, "s");
  cursor.classList.add(options["class"]);
  cursor.style.boxSizing = 'border-box';
  cursor.style.width = "".concat(options.size, "px");
  cursor.style.height = "".concat(options.size, "px");
  cursor.style.borderRadius = "".concat(options.expandedSize, "px");
  cursor.style.opacity = 0;
  cursor.style.pointerEvents = 'none';
  cursor.style.zIndex = 999;
  cursor.style.transition = "transform ".concat(options.transitionTime, " ").concat(options.transitionEase, ", width ").concat(options.expandSpeed, "s .2s, height ").concat(options.expandSpeed, "s .2s, opacity 1s .2s");
  cursor.style.border = "".concat(options.borderWidth, "px solid ").concat(options.borderColor);
  cursor.style.position = 'fixed';
  cursor.style.background = options.background;
  cursor.appendChild(cursorIcon);
  document.body.appendChild(cursor);
  setTimeout(function () {
    cursor.style.opacity = options.opacity;
  }, 500);
  var idle;
  var idle1;

  document.onmousemove = function (e) {
    e = e || window.e;
    console.log('test');
    x = e.pageX;
    y = e.clientY; //  event.pageY || scroll().top 

    cursor.style.opacity = options.opacity;
    clearInterval(idle);
    clearInterval(idle1);
    idle1 = setInterval(function () {}, 10);
    idle = setTimeout(function () {
      cursor.style.opacity = 0;
    }, 4000);
    cursor.style.top = '0';
    cursor.style.left = '0';
    cursor.style.transform = "translateX(calc(".concat(x, "px)) translateY(calc(").concat(y, "px))");
  };

  console.log('testover');

  var _loop = function _loop() {
    var trigger = $(".".concat(options.triggerElements[i].className));
    console.log(trigger);
    var icon = options.triggerElements[i].icon;

    if (!trigger) {
      console.warn('You dont have any triggers');
    } else {
      trigger.each(function (el) {
        var _this = this;

        console.log();
        trigger[el].style.cursor = 'default';
        trigger[el].addEventListener('mouseover', function () {
          console.log('over');
          cursor.style.width = "".concat(options.expandedSize, "px");
          cursor.style.height = "".concat(options.expandedSize, "px");
          cursorIcon.innerHTML = icon;
          cursorIcon.style.opacity = 1;
          console.log($(_this));
        });
        trigger[el].addEventListener('mouseout', function () {
          cursor.style.width = "".concat(options.size, "px");
          cursor.style.height = "".concat(options.size, "px");
          cursorIcon.style.opacity = 0;
        });
      });
    }
  };

  for (i in options.triggerElements) {
    _loop();
  }
}

dynamicCursor(cursorSettings);
$('.back').click(function () {
  $(this).parent().parent().removeClass('expand');
});