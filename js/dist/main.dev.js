"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

document.addEventListener('DOMContentLoaded', function () {
  var $blogName = document.getElementById('site-name');
  var blogNameWidth = $blogName && $blogName.offsetWidth;
  var $menusEle = document.querySelector('#menus .menus_items');
  var menusWidth = $menusEle && $menusEle.offsetWidth;
  var $searchEle = document.querySelector('#search-button');
  var searchWidth = $searchEle && $searchEle.offsetWidth;

  var adjustMenu = function adjustMenu() {
    var change = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

    if (change) {
      blogNameWidth = $blogName && $blogName.offsetWidth;
      menusWidth = $menusEle && $menusEle.offsetWidth;
      searchWidth = $searchEle && $searchEle.offsetWidth;
    }

    var $nav = document.getElementById('nav');
    var t;
    if (window.innerWidth < 768) t = true;else t = blogNameWidth + menusWidth + searchWidth > $nav.offsetWidth - 120;

    if (t) {
      $nav.classList.add('hide-menu');
    } else {
      $nav.classList.remove('hide-menu');
    }
  }; // 初始化header


  var initAdjust = function initAdjust() {
    adjustMenu();
    document.getElementById('nav').classList.add('show');
  }; // sidebar menus


  var sidebarFn = function sidebarFn() {
    var $toggleMenu = document.getElementById('toggle-menu');
    var $mobileSidebarMenus = document.getElementById('sidebar-menus');
    var $menuMask = document.getElementById('menu-mask');
    var $body = document.body;

    function openMobileSidebar() {
      btf.sidebarPaddingR();
      $body.style.overflow = 'hidden';
      btf.fadeIn($menuMask, 0.5);
      $mobileSidebarMenus.classList.add('open');
    }

    function closeMobileSidebar() {
      $body.style.overflow = '';
      $body.style.paddingRight = '';
      btf.fadeOut($menuMask, 0.5);
      $mobileSidebarMenus.classList.remove('open');
    }

    $toggleMenu.addEventListener('click', openMobileSidebar);
    $menuMask.addEventListener('click', function (e) {
      if ($mobileSidebarMenus.classList.contains('open')) {
        closeMobileSidebar();
      }
    });
    window.addEventListener('resize', function (e) {
      if (btf.isHidden($toggleMenu)) {
        if ($mobileSidebarMenus.classList.contains('open')) closeMobileSidebar();
      }
    });
  };
  /**
  * 首頁top_img底下的箭頭
  */


  var scrollDownInIndex = function scrollDownInIndex() {
    var $scrollDownEle = document.getElementById('scroll-down');
    $scrollDownEle && $scrollDownEle.addEventListener('click', function () {
      btf.scrollToDest(document.getElementById('content-inner').offsetTop, 300);
    });
  };
  /**
  * 代碼
  * 只適用於Hexo默認的代碼渲染
  */


  var addHighlightTool = function addHighlightTool() {
    var highLight = GLOBAL_CONFIG.highlight;
    if (!highLight) return;
    var isHighlightCopy = highLight.highlightCopy;
    var isHighlightLang = highLight.highlightLang;
    var isHighlightShrink = GLOBAL_CONFIG_SITE.isHighlightShrink;
    var highlightHeightLimit = highLight.highlightHeightLimit;
    var isShowTool = isHighlightCopy || isHighlightLang || isHighlightShrink !== undefined;
    var $figureHighlight = highLight.plugin === 'highlighjs' ? document.querySelectorAll('figure.highlight') : document.querySelectorAll('pre[class*="language-"]');
    if (!((isShowTool || highlightHeightLimit) && $figureHighlight.length)) return;
    var isPrismjs = highLight.plugin === 'prismjs';
    var highlightShrinkEle = '';
    var highlightCopyEle = '';
    var highlightShrinkClass = isHighlightShrink === true ? 'closed' : '';

    if (isHighlightShrink !== undefined) {
      highlightShrinkEle = "<i class=\"fas fa-angle-down expand ".concat(highlightShrinkClass, "\"></i>");
    }

    if (isHighlightCopy) {
      highlightCopyEle = '<div class="copy-notice"></div><i class="fas fa-paste copy-button"></i>';
    }

    var copy = function copy(text, ctx) {
      if (document.queryCommandSupported && document.queryCommandSupported('copy')) {
        document.execCommand('copy');

        if (GLOBAL_CONFIG.Snackbar !== undefined) {
          btf.snackbarShow(GLOBAL_CONFIG.copy.success);
        } else {
          var prevEle = ctx.previousElementSibling;
          prevEle.innerText = GLOBAL_CONFIG.copy.success;
          prevEle.style.opacity = 1;
          setTimeout(function () {
            prevEle.style.opacity = 0;
          }, 700);
        }
      } else {
        if (GLOBAL_CONFIG.Snackbar !== undefined) {
          btf.snackbarShow(GLOBAL_CONFIG.copy.noSupport);
        } else {
          ctx.previousElementSibling.innerText = GLOBAL_CONFIG.copy.noSupport;
        }
      }
    }; // click events


    var highlightCopyFn = function highlightCopyFn(ele) {
      var $buttonParent = ele.parentNode;
      $buttonParent.classList.add('copy-true');
      var selection = window.getSelection();
      var range = document.createRange();
      if (isPrismjs) range.selectNodeContents($buttonParent.querySelectorAll('pre code')[0]);else range.selectNodeContents($buttonParent.querySelectorAll('table .code pre')[0]);
      selection.removeAllRanges();
      selection.addRange(range);
      var text = selection.toString();
      copy(text, ele.lastChild);
      selection.removeAllRanges();
      $buttonParent.classList.remove('copy-true');
    };

    var highlightShrinkFn = function highlightShrinkFn(ele) {
      var $nextEle = _toConsumableArray(ele.parentNode.children).slice(1);

      ele.firstChild.classList.toggle('closed');

      if (btf.isHidden($nextEle[$nextEle.length - 1])) {
        $nextEle.forEach(function (e) {
          e.style.display = 'block';
        });
      } else {
        $nextEle.forEach(function (e) {
          e.style.display = 'none';
        });
      }
    };

    var highlightToolsFn = function highlightToolsFn(e) {
      var $target = e.target.classList;
      if ($target.contains('expand')) highlightShrinkFn(this);else if ($target.contains('copy-button')) highlightCopyFn(this);
    };

    var expandCode = function expandCode() {
      this.classList.toggle('expand-done');
    };

    function createEle(lang, item, service) {
      var fragment = document.createDocumentFragment();

      if (isShowTool) {
        var hlTools = document.createElement('div');
        hlTools.className = "highlight-tools ".concat(highlightShrinkClass);
        hlTools.innerHTML = highlightShrinkEle + lang + highlightCopyEle;
        hlTools.addEventListener('click', highlightToolsFn);
        fragment.appendChild(hlTools);
      }

      if (highlightHeightLimit && item.offsetHeight > highlightHeightLimit + 30) {
        var ele = document.createElement('div');
        ele.className = 'code-expand-btn';
        ele.innerHTML = '<i class="fas fa-angle-double-down"></i>';
        ele.addEventListener('click', expandCode);
        fragment.appendChild(ele);
      }

      if (service === 'hl') {
        item.insertBefore(fragment, item.firstChild);
      } else {
        item.parentNode.insertBefore(fragment, item);
      }
    }

    if (isHighlightLang) {
      if (isPrismjs) {
        $figureHighlight.forEach(function (item) {
          var langName = item.getAttribute('data-language') ? item.getAttribute('data-language') : 'Code';
          var highlightLangEle = "<div class=\"code-lang\">".concat(langName, "</div>");
          btf.wrap(item, 'figure', {
            "class": 'highlight'
          });
          createEle(highlightLangEle, item);
        });
      } else {
        $figureHighlight.forEach(function (item) {
          var langName = item.getAttribute('class').split(' ')[1];
          if (langName === 'plain' || langName === undefined) langName = 'Code';
          var highlightLangEle = "<div class=\"code-lang\">".concat(langName, "</div>");
          createEle(highlightLangEle, item, 'hl');
        });
      }
    } else {
      if (isPrismjs) {
        $figureHighlight.forEach(function (item) {
          btf.wrap(item, 'figure', {
            "class": 'highlight'
          });
          createEle('', item);
        });
      } else {
        $figureHighlight.forEach(function (item) {
          createEle('', item, 'hl');
        });
      }
    }
  };
  /**
  * PhotoFigcaption
  */


  function addPhotoFigcaption() {
    document.querySelectorAll('#article-container img').forEach(function (item) {
      var parentEle = item.parentNode;
      var altValue = item.alt;

      if (altValue && !parentEle.parentNode.classList.contains('justified-gallery')) {
        var ele = document.createElement('div');
        ele.className = 'img-alt is-center';
        ele.textContent = altValue;
        parentEle.insertBefore(ele, item.nextSibling);
      }
    });
  }
  /**
  * justified-gallery 圖庫排版
  * 需要 jQuery
  */


  var detectJgJsLoad = false;

  var runJustifiedGallery = function runJustifiedGallery(ele) {
    var $justifiedGallery = $(ele);
    var $imgList = $justifiedGallery.find('img');
    $imgList.unwrap();

    if ($imgList.length) {
      $imgList.each(function (i, o) {
        if ($(o).attr('data-lazy-src')) $(o).attr('src', $(o).attr('data-lazy-src'));
        $(o).wrap('<div></div>');
      });
    }

    if (detectJgJsLoad) btf.initJustifiedGallery($justifiedGallery);else {
      $('head').append("<link rel=\"stylesheet\" type=\"text/css\" href=\"".concat(GLOBAL_CONFIG.source.justifiedGallery.css, "\">"));
      $.getScript("".concat(GLOBAL_CONFIG.source.justifiedGallery.js), function () {
        btf.initJustifiedGallery($justifiedGallery);
      });
      detectJgJsLoad = true;
    }
  };
  /**
  * fancybox和 mediumZoom
  */


  var addFancybox = function addFancybox(ele) {
    var runFancybox = function runFancybox(ele) {
      ele.each(function (i, o) {
        var $this = $(o);
        var lazyloadSrc = $this.attr('data-lazy-src') || $this.attr('src');
        var dataCaption = $this.attr('alt') || '';
        $this.wrap("<a href=\"".concat(lazyloadSrc, "\" data-fancybox=\"group\" data-caption=\"").concat(dataCaption, "\" class=\"fancybox\"></a>"));
      });
      $().fancybox({
        selector: '[data-fancybox]',
        loop: true,
        transitionEffect: 'slide',
        protect: true,
        buttons: ['slideShow', 'fullScreen', 'thumbs', 'close'],
        hash: false
      });
    };

    if (typeof $.fancybox === 'undefined') {
      $('head').append("<link rel=\"stylesheet\" type=\"text/css\" href=\"".concat(GLOBAL_CONFIG.source.fancybox.css, "\">"));
      $.getScript("".concat(GLOBAL_CONFIG.source.fancybox.js), function () {
        runFancybox($(ele));
      });
    } else {
      runFancybox($(ele));
    }
  };

  var addMediumZoom = function addMediumZoom() {
    var zoom = mediumZoom(document.querySelectorAll('#article-container :not(a):not(.flink-item-icon) > img'));
    zoom.on('open', function (e) {
      var photoBg = document.documentElement.getAttribute('data-theme') === 'dark' ? '#121212' : '#fff';
      zoom.update({
        background: photoBg
      });
    });
  };

  var jqLoadAndRun = function jqLoadAndRun() {
    var $fancyboxEle = GLOBAL_CONFIG.lightbox === 'fancybox' ? document.querySelectorAll('#article-container :not(a):not(.gallery-group):not(.flink-item-icon) > img, #article-container > img') : [];
    var fbLengthNoZero = $fancyboxEle.length > 0;
    var $jgEle = document.querySelectorAll('#article-container .justified-gallery');
    var jgLengthNoZero = $jgEle.length > 0;

    if (jgLengthNoZero || fbLengthNoZero) {
      btf.isJqueryLoad(function () {
        jgLengthNoZero && runJustifiedGallery($jgEle);
        fbLengthNoZero && addFancybox($fancyboxEle);
      });
    }
  };
  /**
  * 滾動處理
  */


  var scrollFn = function scrollFn() {
    var $rightside = document.getElementById('rightside');
    var innerHeight = window.innerHeight + 56; // 當滾動條小于 56 的時候

    if (document.body.scrollHeight <= innerHeight) {
      $rightside.style.cssText = 'opacity: 1; transform: translateX(-38px)';
      return;
    } // find the scroll direction


    function scrollDirection(currentTop) {
      var result = currentTop > initTop; // true is down & false is up

      initTop = currentTop;
      return result;
    }

    var initTop = 0;
    var isChatShow = true;
    var $header = document.getElementById('page-header');
    var isChatBtnHide = typeof chatBtnHide === 'function';
    var isChatBtnShow = typeof chatBtnShow === 'function';

    window.scrollCollect = function () {
      return btf.throttle(function (e) {
        var currentTop = window.scrollY || document.documentElement.scrollTop;
        var isDown = scrollDirection(currentTop);

        if (currentTop > 56) {
          if (isDown) {
            if ($header.classList.contains('nav-visible')) $header.classList.remove('nav-visible');

            if (isChatBtnShow && isChatShow === true) {
              chatBtnHide();
              isChatShow = false;
            }
          } else {
            if (!$header.classList.contains('nav-visible')) $header.classList.add('nav-visible');

            if (isChatBtnHide && isChatShow === false) {
              chatBtnShow();
              isChatShow = true;
            }
          }

          $header.classList.add('nav-fixed');

          if (window.getComputedStyle($rightside).getPropertyValue('opacity') === '0') {
            $rightside.style.cssText = 'opacity: 1; transform: translateX(-38px)';
          }
        } else {
          if (currentTop === 0) {
            $header.classList.remove('nav-fixed', 'nav-visible');
          }

          $rightside.style.cssText = "opacity: ''; transform: ''";
        }

        if (document.body.scrollHeight <= innerHeight) {
          $rightside.style.cssText = 'opacity: 1; transform: translateX(-38px)';
        }
      }, 200)();
    };

    window.addEventListener('scroll', scrollCollect);
  };
  /**
  *  toc
  */


  var tocFn = function tocFn() {
    var $cardTocLayout = document.getElementById('card-toc');
    var $cardToc = $cardTocLayout.getElementsByClassName('toc-content')[0];
    var $tocLink = $cardToc.querySelectorAll('.toc-link');
    var $article = document.getElementById('article-container'); // main of scroll

    window.tocScrollFn = function () {
      return btf.throttle(function () {
        var currentTop = window.scrollY || document.documentElement.scrollTop;
        scrollPercent(currentTop);
        findHeadPosition(currentTop);
      }, 100)();
    };

    window.addEventListener('scroll', tocScrollFn);

    var scrollPercent = function scrollPercent(currentTop) {
      var docHeight = $article.clientHeight;
      var winHeight = document.documentElement.clientHeight;
      var headerHeight = $article.offsetTop;
      var contentMath = docHeight > winHeight ? docHeight - winHeight : document.documentElement.scrollHeight - winHeight;
      var scrollPercent = (currentTop - headerHeight) / contentMath;
      var scrollPercentRounded = Math.round(scrollPercent * 100);
      var percentage = scrollPercentRounded > 100 ? 100 : scrollPercentRounded <= 0 ? 0 : scrollPercentRounded;
      $cardToc.setAttribute('progress-percentage', percentage);
    }; // anchor


    var isAnchor = GLOBAL_CONFIG.isanchor;

    var updateAnchor = function updateAnchor(anchor) {
      if (window.history.replaceState && anchor !== window.location.hash) {
        if (!anchor) anchor = location.pathname;
        var title = GLOBAL_CONFIG_