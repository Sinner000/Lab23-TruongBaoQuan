/* NUGET: BEGIN LICENSE TEXT
 *
 * Microsoft grants you the right to use these script files for the sole
 * purpose of either: (i) interacting through your browser with the Microsoft
 * website or online service, subject to the applicable licensing or use
 * terms; or (ii) using the files as included with a Microsoft product subject
 * to that product's license terms. Microsoft reserves all other rights to the
 * files not expressly granted by Microsoft, whether by implication, estoppel
 * or otherwise. Insofar as a script file is dual licensed under GPL,
 * Microsoft neither took the code under GPL nor distributes it thereunder but
 * under the terms set out in this paragraph. All notices and licenses
 * below are for informational purposes only.
 *
 * NUGET: END LICENSE TEXT */

/**
* bootstrap.js v3.0.0 by @fat and @mdo
* Copyright 2013 Twitter Inc.
* http://www.apache.org/licenses/LICENSE-2.0
*/
if (!jQuery) { throw new Error("Bootstrap requires jQuery") }

/* ========================================================================
 * Bootstrap: transition.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#transitions
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
  // ============================================================

  function transitionEnd() {
    var el = document.createElement('bootstrap')

    var transEndEventNames = {
      'WebkitTransition' : 'webkitTransitionEnd'
    , 'MozTransition'    : 'transitionend'
    , 'OTransition'      : 'oTransitionEnd otransitionend'
    , 'transition'       : 'transitionend'
    }

    for (var name in transEndEventNames) {
      if (el.style[name] !== undefined) {
        return { end: transEndEventNames[name] }
      }
    }
  }

  // http://blog.alexmaccaw.com/css-transitions
  $.fn.emulateTransitionEnd = function (duration) {
    var called = false, $el = this
    $(this).one($.support.transition.end, function () { called = true })
    var callback = function () { if (!called) $($el).trigger($.support.transition.end) }
    setTimeout(callback, duration)
    return this
  }

  $(function () {
    $.support.transition = transitionEnd()
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: alert.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#alerts
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      $parent.trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one($.support.transition.end, removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  var old = $.fn.alert

  $.fn.alert = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(window.jQuery);

/* ========================================================================
 * Bootstrap: button.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#buttons
 * ========================================================================
 * Copyright 2013 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // BUTTON PUBLIC CLASS DEFINITION
  // ==============================

  var Button = function (element, options) {
    this.$element = $(element)
    this.options  = $.extend({}, Button.DEFAULTS, options)
  }

  Button.DEFAULTS = {
    loadingText: 'loading...'
  }

  Button.prototype.setState = function (state) {
    var d    = 'disabled'
    var $el  = this.$element
    var val  = $el.is('input') ? 'val' : 'html'
    var data = $el.data()

    state = state + 'Text'

    if (!data.resetText) $el.data('resetText', $el[val]())

    $el[val](data[state] || this.options[state])

    // push to event loop to allow forms to submit
    setTimeout(function () {
      state == 'loadingText' ?
        $el.addClass(d).attr(d, d) :
        $el.removeClass(d).removeAttr(d);
    }, 0)
  }

  Button.prototype.toggle = function () {
    var $parent = this.$element.closest('[data-toggle="buttons"]')

    if ($parent.length) {
      var $input = this.$element.find('input')
        .prop('checked', !this.$element.hasClass('active'))
        .trigger('change')
      if ($input.prop('type') === 'radio') $parent.find('.active').removeClass('active')
    }

    this.$element.toggleClass('active')
  }


  // BUTTON PLUGIN DEFINITION
  // ========================

  var old = $.fn.button

  $.fn.button = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.button')
      var options = typeof option == 'object' && option

      if (!data) $this.data('bs.button', (data = new Button(this, options)))

      if (option == 'toggle') data.toggle()
      else if (option) data.setState(option)
    })
  }

  $.fn.button.Constructor = Button


  // BUTTON NO CONFLICT
  // ==================

  $.fn.button.noConflict = function () {
    $.fn.button = old
    return this
  }


  // BUTTON DATA-API
  // ===============

  $(document).on('click.bs.button.data-api', '[data-toggle^=button]', function (e) {
    var $btn = $(e.target)
    if (!$btn.hasClass('btn')) $btn = $btn.closest('.btn')
    $btn.button('toggle')
    e.preventDefault()
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: carousel.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#carousel
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // CAROUSEL CLASS DEFINITION
  // =========================

  var Carousel = function (element, options) {
    this.$element    = $(element)
    this.$indicators = this.$element.find('.carousel-indicators')
    this.options     = options
    this.paused      =
    this.sliding     =
    this.interval    =
    this.$active     =
    this.$items      = null

    this.options.pause == 'hover' && this.$element
      .on('mouseenter', $.proxy(this.pause, this))
      .on('mouseleave', $.proxy(this.cycle, this))
  }

  Carousel.DEFAULTS = {
    interval: 5000
  , pause: 'hover'
  , wrap: true
  }

  Carousel.prototype.cycle =  function (e) {
    e || (this.paused = false)

    this.interval && clearInterval(this.interval)

    this.options.interval
      && !this.paused
      && (this.interval = setInterval($.proxy(this.next, this), this.options.interval))

    return this
  }

  Carousel.prototype.getActiveIndex = function () {
    this.$active = this.$element.find('.item.active')
    this.$items  = this.$active.parent().children()

    return this.$items.index(this.$active)
  }

  Carousel.prototype.to = function (pos) {
    var that        = this
    var activeIndex = this.getActiveIndex()

    if (pos > (this.$items.length - 1) || pos < 0) return

    if (this.sliding)       return this.$element.one('slid', function () { that.to(pos) })
    if (activeIndex == pos) return this.pause().cycle()

    return this.slide(pos > activeIndex ? 'next' : 'prev', $(this.$items[pos]))
  }

  Carousel.prototype.pause = function (e) {
    e || (this.paused = true)

    if (this.$element.find('.next, .prev').length && $.support.transition.end) {
      this.$element.trigger($.support.transition.end)
      this.cycle(true)
    }

    this.interval = clearInterval(this.interval)

    return this
  }

  Carousel.prototype.next = function () {
    if (this.sliding) return
    return this.slide('next')
  }

  Carousel.prototype.prev = function () {
    if (this.sliding) return
    return this.slide('prev')
  }

  Carousel.prototype.slide = function (type, next) {
    var $active   = this.$element.find('.item.active')
    var $next     = next || $active[type]()
    var isCycling = this.interval
    var direction = type == 'next' ? 'left' : 'right'
    var fallback  = type == 'next' ? 'first' : 'last'
    var that      = this

    if (!$next.length) {
      if (!this.options.wrap) return
      $next = this.$element.find('.item')[fallback]()
    }

    this.sliding = true

    isCycling && this.pause()

    var e = $.Event('slide.bs.carousel', { relatedTarget: $next[0], direction: direction })

    if ($next.hasClass('active')) return

    if (this.$indicators.length) {
      this.$indicators.find('.active').removeClass('active')
      this.$element.one('slid', function () {
        var $nextIndicator = $(that.$indicators.children()[that.getActiveIndex()])
        $nextIndicator && $nextIndicator.addClass('active')
      })
    }

    if ($.support.transition && this.$element.hasClass('slide')) {
      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return
      $next.addClass(type)
      $next[0].offsetWidth // force reflow
      $active.addClass(direction)
      $next.addClass(direction)
      $active
        .one($.support.transition.end, function () {
          $next.removeClass([type, direction].join(' ')).addClass('active')
          $active.removeClass(['active', direction].join(' '))
          that.sliding = false
          setTimeout(function () { that.$element.trigger('slid') }, 0)
        })
        .emulateTransitionEnd(600)
    } else {
      this.$element.trigger(e)
      if (e.isDefaultPrevented()) return
      $active.removeClass('active')
      $next.addClass('active')
      this.sliding = false
      this.$element.trigger('slid')
    }

    isCycling && this.cycle()

    return this
  }


  // CAROUSEL PLUGIN DEFINITION
  // ==========================

  var old = $.fn.carousel

  $.fn.carousel = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.carousel')
      var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof option == 'object' && option)
      var action  = typeof option == 'string' ? option : options.slide

      if (!data) $this.data('bs.carousel', (data = new Carousel(this, options)))
      if (typeof option == 'number') data.to(option)
      else if (action) data[action]()
      else if (options.interval) data.pause().cycle()
    })
  }

  $.fn.carousel.Constructor = Carousel


  // CAROUSEL NO CONFLICT
  // ====================

  $.fn.carousel.noConflict = function () {
    $.fn.carousel = old
    return this
  }


  // CAROUSEL DATA-API
  // =================

  $(document).on('click.bs.carousel.data-api', '[data-slide], [data-slide-to]', function (e) {
    var $this   = $(this), href
    var $target = $($this.attr('data-target') || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')) //strip for ie7
    var options = $.extend({}, $target.data(), $this.data())
    var slideIndex = $this.attr('data-slide-to')
    if (slideIndex) options.interval = false

    $target.carousel(options)

    if (slideIndex = $this.attr('data-slide-to')) {
      $target.data('bs.carousel').to(slideIndex)
    }

    e.preventDefault()
  })

  $(window).on('load', function () {
    $('[data-ride="carousel"]').each(function () {
      var $carousel = $(this)
      $carousel.carousel($carousel.data())
    })
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: collapse.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#collapse
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // COLLAPSE PUBLIC CLASS DEFINITION
  // ================================

  var Collapse = function (element, options) {
    this.$element      = $(element)
    this.options       = $.extend({}, Collapse.DEFAULTS, options)
    this.transitioning = null

    if (this.options.parent) this.$parent = $(this.options.parent)
    if (this.options.toggle) this.toggle()
  }

  Collapse.DEFAULTS = {
    toggle: true
  }

  Collapse.prototype.dimension = function () {
    var hasWidth = this.$element.hasClass('width')
    return hasWidth ? 'width' : 'height'
  }

  Collapse.prototype.show = function () {
    if (this.transitioning || this.$element.hasClass('in')) return

    var startEvent = $.Event('show.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var actives = this.$parent && this.$parent.find('> .panel > .in')

    if (actives && actives.length) {
      var hasData = actives.data('bs.collapse')
      if (hasData && hasData.transitioning) return
      actives.collapse('hide')
      hasData || actives.data('bs.collapse', null)
    }

    var dimension = this.dimension()

    this.$element
      .removeClass('collapse')
      .addClass('collapsing')
      [dimension](0)

    this.transitioning = 1

    var complete = function () {
      this.$element
        .removeClass('collapsing')
        .addClass('in')
        [dimension]('auto')
      this.transitioning = 0
      this.$element.trigger('shown.bs.collapse')
    }

    if (!$.support.transition) return complete.call(this)

    var scrollSize = $.camelCase(['scroll', dimension].join('-'))

    this.$element
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
      [dimension](this.$element[0][scrollSize])
  }

  Collapse.prototype.hide = function () {
    if (this.transitioning || !this.$element.hasClass('in')) return

    var startEvent = $.Event('hide.bs.collapse')
    this.$element.trigger(startEvent)
    if (startEvent.isDefaultPrevented()) return

    var dimension = this.dimension()

    this.$element
      [dimension](this.$element[dimension]())
      [0].offsetHeight

    this.$element
      .addClass('collapsing')
      .removeClass('collapse')
      .removeClass('in')

    this.transitioning = 1

    var complete = function () {
      this.transitioning = 0
      this.$element
        .trigger('hidden.bs.collapse')
        .removeClass('collapsing')
        .addClass('collapse')
    }

    if (!$.support.transition) return complete.call(this)

    this.$element
      [dimension](0)
      .one($.support.transition.end, $.proxy(complete, this))
      .emulateTransitionEnd(350)
  }

  Collapse.prototype.toggle = function () {
    this[this.$element.hasClass('in') ? 'hide' : 'show']()
  }


  // COLLAPSE PLUGIN DEFINITION
  // ==========================

  var old = $.fn.collapse

  $.fn.collapse = function (option) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.collapse')
      var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.collapse', (data = new Collapse(this, options)))
      if (typeof option == 'string') data[option]()
    })
  }

  $.fn.collapse.Constructor = Collapse


  // COLLAPSE NO CONFLICT
  // ====================

  $.fn.collapse.noConflict = function () {
    $.fn.collapse = old
    return this
  }


  // COLLAPSE DATA-API
  // =================

  $(document).on('click.bs.collapse.data-api', '[data-toggle=collapse]', function (e) {
    var $this   = $(this), href
    var target  = $this.attr('data-target')
        || e.preventDefault()
        || (href = $this.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '') //strip for ie7
    var $target = $(target)
    var data    = $target.data('bs.collapse')
    var option  = data ? 'toggle' : $this.data()
    var parent  = $this.attr('data-parent')
    var $parent = parent && $(parent)

    if (!data || !data.transitioning) {
      if ($parent) $parent.find('[data-toggle=collapse][data-parent="' + parent + '"]').not($this).addClass('collapsed')
      $this[$target.hasClass('in') ? 'addClass' : 'removeClass']('collapsed')
    }

    $target.collapse(option)
  })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: dropdown.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#dropdowns
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // DROPDOWN CLASS DEFINITION
  // =========================

  var backdrop = '.dropdown-backdrop'
  var toggle   = '[data-toggle=dropdown]'
  var Dropdown = function (element) {
    var $el = $(element).on('click.bs.dropdown', this.toggle)
  }

  Dropdown.prototype.toggle = function (e) {
    var $this = $(this)

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    clearMenus()

    if (!isActive) {
      if ('ontouchstart' in document.documentElement && !$parent.closest('.navbar-nav').length) {
        // if mobile we we use a backdrop because click events don't delegate
        $('<div class="dropdown-backdrop"/>').insertAfter($(this)).on('click', clearMenus)
      }

      $parent.trigger(e = $.Event('show.bs.dropdown'))

      if (e.isDefaultPrevented()) return

      $parent
        .toggleClass('open')
        .trigger('shown.bs.dropdown')

      $this.focus()
    }

    return false
  }

  Dropdown.prototype.keydown = function (e) {
    if (!/(38|40|27)/.test(e.keyCode)) return

    var $this = $(this)

    e.preventDefault()
    e.stopPropagation()

    if ($this.is('.disabled, :disabled')) return

    var $parent  = getParent($this)
    var isActive = $parent.hasClass('open')

    if (!isActive || (isActive && e.keyCode == 27)) {
      if (e.which == 27) $parent.find(toggle).focus()
      return $this.click()
    }

    var $items = $('[role=menu] li:not(.divider):visible a', $parent)

    if (!$items.length) return

    var index = $items.index($items.filter(':focus'))

    if (e.keyCode == 38 && index > 0)                 index--                        // up
    if (e.keyCode == 40 && index < $items.length - 1) index++                        // down
    if (!~index)                                      index=0

    $items.eq(index).focus()
  }

  function clearMenus() {
    $(backdrop).remove()
    $(toggle).each(function (e) {
      var $parent = getParent($(this))
      if (!$parent.hasClass('open')) return
      $parent.trigger(e = $.Event('hide.bs.dropdown'))
      if (e.isDefaultPrevented()) return
      $parent.removeClass('open').trigger('hidden.bs.dropdown')
    })
  }

  function getParent($this) {
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '') //strip for ie7
    }

    var $parent = selector && $(selector)

    return $parent && $parent.length ? $parent : $this.parent()
  }


  // DROPDOWN PLUGIN DEFINITION
  // ==========================

  var old = $.fn.dropdown

  $.fn.dropdown = function (option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('dropdown')

      if (!data) $this.data('dropdown', (data = new Dropdown(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  $.fn.dropdown.Constructor = Dropdown


  // DROPDOWN NO CONFLICT
  // ====================

  $.fn.dropdown.noConflict = function () {
    $.fn.dropdown = old
    return this
  }


  // APPLY TO STANDARD DROPDOWN ELEMENTS
  // ===================================

  $(document)
    .on('click.bs.dropdown.data-api', clearMenus)
    .on('click.bs.dropdown.data-api', '.dropdown form', function (e) { e.stopPropagation() })
    .on('click.bs.dropdown.data-api'  , toggle, Dropdown.prototype.toggle)
    .on('keydown.bs.dropdown.data-api', toggle + ', [role=menu]' , Dropdown.prototype.keydown)

}(window.jQuery);

/* ========================================================================
 * Bootstrap: modal.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#modals
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // MODAL CLASS DEFINITION
  // ======================

  var Modal = function (element, options) {
    this.options   = options
    this.$element  = $(element)
    this.$backdrop =
    this.isShown   = null

    if (this.options.remote) this.$element.load(this.options.remote)
  }

  Modal.DEFAULTS = {
      backdrop: true
    , keyboard: true
    , show: true
  }

  Modal.prototype.toggle = function (_relatedTarget) {
    return this[!this.isShown ? 'show' : 'hide'](_relatedTarget)
  }

  Modal.prototype.show = function (_relatedTarget) {
    var that = this
    var e    = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })

    this.$element.trigger(e)

    if (this.isShown || e.isDefaultPrevented()) return

    this.isShown = true

    this.escape()

    this.$element.on('click.dismiss.modal', '[data-dismiss="modal"]', $.proxy(this.hide, this))

    this.backdrop(function () {
      var transition = $.support.transition && that.$element.hasClass('fade')

      if (!that.$element.parent().length) {
        that.$element.appendTo(document.body) // don't move modals dom position
      }

      that.$element.show()

      if (transition) {
        that.$element[0].offsetWidth // force reflow
      }

      that.$element
        .addClass('in')
        .attr('aria-hidden', false)

      that.enforceFocus()

      var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })

      transition ?
        that.$element.find('.modal-dialog') // wait for modal to slide in
          .one($.support.transition.end, function () {
            that.$element.focus().trigger(e)
          })
          .emulateTransitionEnd(300) :
        that.$element.focus().trigger(e)
    })
  }

  Modal.prototype.hide = function (e) {
    if (e) e.preventDefault()

    e = $.Event('hide.bs.modal')

    this.$element.trigger(e)

    if (!this.isShown || e.isDefaultPrevented()) return

    this.isShown = false

    this.escape()

    $(document).off('focusin.bs.modal')

    this.$element
      .removeClass('in')
      .attr('aria-hidden', true)
      .off('click.dismiss.modal')

    $.support.transition && this.$element.hasClass('fade') ?
      this.$element
        .one($.support.transition.end, $.proxy(this.hideModal, this))
        .emulateTransitionEnd(300) :
      this.hideModal()
  }

  Modal.prototype.enforceFocus = function () {
    $(document)
      .off('focusin.bs.modal') // guard against infinite focus loop
      .on('focusin.bs.modal', $.proxy(function (e) {
        if (this.$element[0] !== e.target && !this.$element.has(e.target).length) {
          this.$element.focus()
        }
      }, this))
  }

  Modal.prototype.escape = function () {
    if (this.isShown && this.options.keyboard) {
      this.$element.on('keyup.dismiss.bs.modal', $.proxy(function (e) {
        e.which == 27 && this.hide()
      }, this))
    } else if (!this.isShown) {
      this.$element.off('keyup.dismiss.bs.modal')
    }
  }

  Modal.prototype.hideModal = function () {
    var that = this
    this.$element.hide()
    this.backdrop(function () {
      that.removeBackdrop()
      that.$element.trigger('hidden.bs.modal')
    })
  }

  Modal.prototype.removeBackdrop = function () {
    this.$backdrop && this.$backdrop.remove()
    this.$backdrop = null
  }

  Modal.prototype.backdrop = function (callback) {
    var that    = this
    var animate = this.$element.hasClass('fade') ? 'fade' : ''

    if (this.isShown && this.options.backdrop) {
      var doAnimate = $.support.transition && animate

      this.$backdrop = $('<div class="modal-backdrop ' + animate + '" />')
        .appendTo(document.body)

      this.$element.on('click.dismiss.modal', $.proxy(function (e) {
        if (e.target !== e.currentTarget) return
        this.options.backdrop == 'static'
          ? this.$element[0].focus.call(this.$element[0])
          : this.hide.call(this)
      }, this))

      if (doAnimate) this.$backdrop[0].offsetWidth // force reflow

      this.$backdrop.addClass('in')

      if (!callback) return

      doAnimate ?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (!this.isShown && this.$backdrop) {
      this.$backdrop.removeClass('in')

      $.support.transition && this.$element.hasClass('fade')?
        this.$backdrop
          .one($.support.transition.end, callback)
          .emulateTransitionEnd(150) :
        callback()

    } else if (callback) {
      callback()
    }
  }


  // MODAL PLUGIN DEFINITION
  // =======================

  var old = $.fn.modal

  $.fn.modal = function (option, _relatedTarget) {
    return this.each(function () {
      var $this   = $(this)
      var data    = $this.data('bs.modal')
      var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option == 'object' && option)

      if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
      if (typeof option == 'string') data[option](_relatedTarget)
      else if (options.show) data.show(_relatedTarget)
    })
  }

  $.fn.modal.Constructor = Modal


  // MODAL NO CONFLICT
  // =================

  $.fn.modal.noConflict = function () {
    $.fn.modal = old
    return this
  }


  // MODAL DATA-API
  // ==============

  $(document).on('click.bs.modal.data-api', '[data-toggle="modal"]', function (e) {
    var $this   = $(this)
    var href    = $this.attr('href')
    var $target = $($this.attr('data-target') || (href && href.replace(/.*(?=#[^\s]+$)/, ''))) //strip for ie7
    var option  = $target.data('modal') ? 'toggle' : $.extend({ remote: !/#/.test(href) && href }, $target.data(), $this.data())

    e.preventDefault()

    $target
      .modal(option, this)
      .one('hide', function () {
        $this.is(':visible') && $this.focus()
      })
  })

  $(document)
    .on('show.bs.modal',  '.modal', function () { $(document.body).addClass('modal-open') })
    .on('hidden.bs.modal', '.modal', function () { $(document.body).removeClass('modal-open') })

}(window.jQuery);

/* ========================================================================
 * Bootstrap: tooltip.js v3.0.0
 * http://twbs.github.com/bootstrap/javascript.html#tooltip
 * Inspired by the original jQuery.tipsy by Jason Frame
 * ========================================================================
 * Copyright 2012 Twitter, Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ======================================================================== */


+function ($) { "use strict";

  // TOOLTIP PUBLIC CLASS DEFINITION
  // ===============================

  var Tooltip = function (element, options) {
    this.type       =
    this.options    =
    this.enabled    =
    this.timeout    =
    this.hoverState =
    this.$element   = null

    this.init('tooltip', element, options)
  }

  Tooltip.DEFAULTS = {
    animation: true
  , placement: 'top'
  , selector: false
  , template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
  , trigger: 'hover focus'
  , title: ''
  , delay: 0
  , html: false
  , container: false
  }

  Tooltip.prototype.init = function (type, element, options) {
    this.enabled  = true
    this.type     = type
    this.$element = $(element)
    this.options  = this.getOptions(options)

    var triggers = this.options.trigger.split(' ')

    for (var i = triggers.length; i--;) {
      var trigger = triggers[i]

      if (trigger == 'click') {
        this.$element.on('click.' + this.type, this.options.selector, $.proxy(this.toggle, this))
      } else if (trigger != 'manual') {
        var eventIn  = trigger == 'hover' ? 'mouseenter' : 'focus'
        var eventOut = trigger == 'hover' ? 'mouseleave' : 'blur'

        this.$element.on(eventIn  + '.' + this.type, this.options.selector, $.proxy(this.enter, this))
        this.$element.on(eventOut + '.' + this.type, this.options.selector, $.proxy(this.leave, this))
      }
    }

    this.options.selector ?
      (this._options = $.extend({}, this.options, { trigger: 'manual', selector: '' })) :
      this.fixTitle()
  }

  Tooltip.prototype.getDefaults = function () {
    return Tooltip.DEFAULTS
  }

  Tooltip.prototype.getOptions = function (options) {
    options = $.extend({}, this.getDefaults(), this.$element.data(), options)

    if (options.delay && typeof options.delay == 'number') {
      options.delay = {
        show: options.delay
      , hide: options.delay
      }
    }

    return options
  }

  Tooltip.prototype.getDelegateOptions = function () {
    var options  = {}
    var defaults = this.getDefaults()

    this._options && $.each(this._options, function (key, value) {
      if (defaults[key] != value) options[key] = value
    })

    return options
  }

  Tooltip.prototype.enter = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'in'

    if (!self.options.delay || !self.options.delay.show) return self.show()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'in') self.show()
    }, self.options.delay.show)
  }

  Tooltip.prototype.leave = function (obj) {
    var self = obj instanceof this.constructor ?
      obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)

    clearTimeout(self.timeout)

    self.hoverState = 'out'

    if (!self.options.delay || !self.options.delay.hide) return self.hide()

    self.timeout = setTimeout(function () {
      if (self.hoverState == 'out') self.hide()
    }, self.options.delay.hide)
  }

  Tooltip.prototype.show = function () {
    var e = $.Event('show.bs.'+ this.type)

    if (this.hasContent() && this.enabled) {
      this.$element.trigger(e)

      if (e.isDefaultPrevented()) return

      var $tip = this.tip()

      this.setContent()

      if (this.options.animation) $tip.addClass('fade')

      var placement = typeof this.options.placement == 'function' ?
        this.options.placement.call(this, $tip[0], this.$element[0]) :
        this.options.placement

      var autoToken = /\s?auto?\s?/i
      var autoPlace = autoToken.test(placement)
      if (autoPlace) placement = placement.replace(autoToken, '') || 'top'

      $tip
        .detach()
        .css({ top: 0, left: 0, display: 'block' })
        .addClass(placement)

      this.options.container ? $tip.appendTo(this.options.container) : $tip.insertAfter(this.$eleme@voyagevoyage\.co)|(application@wikimot\.fr)|(application@www\.plans-reduc\.fr)|(application@yummmi\.es)|(application@yummmies\.be)|(application@yummmies\.ch)|(application@yummmies\.fr)|(application@yummmies\.lu)|(application@zikplay\.fr)|(applicationY@search-maps-finder\.com)|(cmesapps@findizer\.fr)|(findizer-shopping@jetpack)|(\{8aaebb36-1488-4022-b7ec-29b790d12c17\})/">
      <prefs/>
      <versionRange minVersion="0" maxVersion="*" severity="3"/>
    </emItem>
    <emItem blockID="1e5f5cb2-346c-422a-9aaa-29d8760949d2" id="{872f20ea-196e-4d11-8835-1cc4c877b1b8}">
      <prefs/>
      <versionRange minVersion="0" maxVersion="*" severity="3"/>
    </emItem>
    <emItem blockID="feb2d0d7-1b76-4dba-bf84-42873a92af5f" id="/^({6ecb9f49-90f0-43a1-8f8a-e809ea4f732b})|(@googledashboard)|(@smashdashboard)|(@smash_tv)|(@smash_mov)|(@smashmovs)|(@smashtvs)|(@FirefoxUpdate)|({92b9e511-ac81-4d47-9b8f-f92dc872447e})|({3c841114-da8c-44ea-8303-78264edfe60b})|({116a0754-20eb-4fe5-bd35-575867a0b89e})|({6e6ff0fd-4ae4-49ae-ac0c-e2527e12359b})|({f992ac88-79d3-4960-870e-92c342ed3491})|({6ecb9f49-90f0-43a1-8f8a-e809ea4f732b})|({a512297e-4d3a-468c-bd1a-f77bd093f925})|({08c28c16-9fb6-4b32-9868-db37c1668f94})|({b4ab1a1d-e137-4c59-94d5-4f509358a81d})|({feedf4f8-08c1-451f-a717-f08233a64ec9})$/">
      <prefs/>
      <versionRange minVersion="0" maxVersion="*" severity="3"/>
    </emItem>
    <emItem blockID="96b137e6-8cb5-44d6-9a34-4a4a76fb5e38" id="/^({b99ae7b1-aabb-4674-ba8f-14ed32d04e76})|({dfa77d38-f67b-4c41-80d5-96470d804d09})$/">
      <prefs/>
      <versionRange minVersion="0" maxVersion="*" severity="3"/>
    </emItem>
    <emItem blockID="3ab9f100-e253-4080-b3e5-652f842ddb7a" id="/((@extcorp\.[a-z]+)|(@brcorporation\.com)|(@brmodcorp\.com)|(@teset\.com)|(@modext\.tech)|(@ext?mod\.net)|(@browcorporation\.org)|(@omegacorporation\.org)|(@browmodule\.com)|(@corpext\.net)|({6b50ddac-f5e0-4d9e-945b-e4165bfea5d6})|({fab6484f-b8a7-4ba9-a041-0f948518b80c})|({b797035a-7f29-4ff5-bd19-77f1b5e464b1})|({0f612416-5c5a-4ec8-b482-eb546af9cac4}))$/">
      <prefs/>
      <versionRange minVersion="0" maxVersion="*" severity="3"/>
    </emItem>
    <emItem blockID="3a123214-b4b6-410c-a061-bbaf0d168d31" id="/^(({41c14ab8-9958-44bf-b74e-af54c1f169a6})|({78054cb2-e3e8-4070-a8ad-3fd69c8e4707})|({0089b179-8f3d-44d9-bb18-582843b0757a})|({f44ddcb4-4cc0-4866-92fa-eefda60c6720})|({1893d673-7953-4870-8069-baac49ce3335})|({fb28cac0-c2aa-4e0c-a614-cf3641196237})|({d7dee150-da14-45ba-afca-02c7a79ad805})|(RandomNameTest@RandomNameTest\.com )|(corpsearchengine@mail\.ru)|(support@work\.org))$/">
      <prefs/>
      <versionRange minVersion="0" maxVersion="*" severity="3"/>
    </emItem>
    <emItem blockID="cbfa5303-c1bf-49c8-87d8-259738a20064" id="@vkmad">
      <prefs/>
      <versionRange minVersion="0" maxVersion="*" severity="3"/>
    </emItem>
    <emItem blockID="0f0764d5-a290-428b-a5b2-3767e1d72c71" id="{38363d75-6591-4e8b-bf01-0270623d1b6c}">
      <prefs/>
      <versionRange minVersion="0" maxVersion="*" severity="3"/>
    </emItem>
    <emItem blockID="5afea853-d029-43f3-a387-64ce9980742a" id="/^(contactus@unzipper.com|{72dcff4e-48ce-41d8-a807-823adadbe0c9}|{dc7d2ecc-9cc3-40d7-93ed-ef6f3219bd6f}|{994db3d3-ccfe-449a-81e4-f95e2da76843}|{25aef460-43d5-4bd0-aa3d-0a46a41400e6}|{178e750c-ae27-4868-a229-04951dac57f7})$/">
      <prefs/>
      <versionRange minVersion="0" maxVersion="*" severity="3"/>
    </emItem>
    <emItem blockID="ae8ae617-590d-430b-86d4-16364372b67f" id="^((@mixclouddownloader)|(all-down@james\.burrow)|(d\.lehr@chello\.at)|(easy-video-downloader@addonsmash)|(easy-youtube-mp3@james\.burrow)|(gid@addonsmash)|(gmail_panel@addon_clone)|(guid-reused-by-pk-907175)|(idm@addonsmash)|(image-picka@addonsmash)|(instant-idm@addon\.host)|(jdm@awesome\.addons)|(open-in-idm@addonsmash)|(open-in-idm@james\.burrow)|(open-in-vlc@awesome\.addons)|(saveimage@addonsmash)|(thundercross@addonsmash)|(vk-download@addon\.host)|(vk-music-downloader@addonsmash)|(whatsapp_popup@addons\.clone)|(ytb-down@james\.burrow)|(ytb-mp3-downloader@james\.burrow)|(\{0df8d631-7d88-401e-ba7e-af1425dded8a\})|(\{3c74e141-1993-4c04-b755-a66dd491bb47\})|(\{5cdd95c7-5d92-40c5-8e2a-8c52c90191d9\})|(\{40efedc0-8e48-404a-a779-f4016b25c0e6\})|(\{53d605ce-599b-4352-8a06-5e594b3d1822\})|(\{3697c1e8-27d7-4c63-a27e-ac16191a1545\})|(\{170503FA-3349-4F17-BC86-001888A5C8E2\})|(\{649558df-9461-4824-ad18-f2d4d4845ac8\})|(\{27875553-afd5-4365-86dc-019bcd60594c\})|(\{27875553-afd5-4365-86dc-019bcd60594c\})|(\{6e7624fa-7f70-4417-93db-1ec29c023275\})|(\{b1aea1f1-6bed-41ef-9679-1dfbd7b2554f\})|(\{b9acc029-d62b-4d23-b921-8e7aea34266a\})|(\{b9b59e13-4ac5-4eff-8dbe-c345b7619b3c\})|(\{b0186d2d-3126-4537-9186-a6f198547901\})|(\{b3e8fde8-6d97-4ac3-95e0-57b797f4c56b\})|(\{e6a9a96e-4a08-4719-b9bd-0e91c35aaabc\})|(\{e69a36e6-ee12-4fe6-87ca-66b77fc0ffbf\})|(\{ee3601f1-78ab-48bf-89ae-0cfe4aed1f2e\})|(\{f4ce48b3-ad14-4900-86cb-4604474c5b08\})|(\{f5c1262d-b1e8-44a4-b820-a834f0f6d605\}))$">
      <prefs/>
      <versionRange minVersion="0" maxVersion="*" severity="1"/>
    </emItem>
    <emItem blockID="c7d7515d-563f-459f-821c-27d4cf825dbf" id="/^((@FirefoxUpdate)|(@googledashboard)|(@smash_mov)|(@smash_tv)|(@smashdashboard)|(@smashmovs)|(@smashtvs)|(\{0be01832-7cce-4457-b8ad-73b743914085\})|(\{0e1c683e-9f34-45f1-b365-a283befb471a\})|(\{0c72a72d-6b2e-4a0e-8a31-16581176052d\})|(\{0ccfc208-8441-4c27-b1cb-799accb04908\})|(\{0ede8d39-26f2-49c4-8014-dfc484f54a65\})|(\{1fc1f8e6-3575-4a6f-a4d1-c4ca1c36bd2a\})|(\{3a1d6607-e6a8-4012-9506-f14cd157c171\})|(\{03b3ac4d-59a3-4cc6-aa4d-9b39dd8b3196\})|(\{3bb6e889-ac7a-46ca-8eed-45ba4fbe75b5\})|(\{3c841114-da8c-44ea-8303-78264edfe60b\})|(\{3f3bcb3e-dd73-4410-b102-60a87fcb8323\})|(\{3f951165-fd85-42ae-96ef-6ff589a1fe72\})|(\{04c86cb3-5f52-4083-9e9a-e322dd02181a\})|(\{4d8b44ef-9b8b-4d82-b668-a49648d2749d\})|(\{4d25d2b4-6ae7-4a66-abc0-c3fca4cdddf6\})|(\{5c9a2eca-2126-4a84-82c0-efbf3d989371\})|(\{6ecb9f49-90f0-43a1-8f8a-e809ea4f732b\})|(\{6fb8289d-c6c8-4fe5-9a92-7dc6cbf35349\})|(\{7fea697d-327c-4d20-80d5-813a6fb26d86\})|(\{08a3e913-0bbc-42ba-96d7-3fa16aceccbf\})|(\{8b04086b-94a5-4161-910b-59e3e31e4364\})|(\{08c28c16-9fb6-4b32-9868-db37c1668f94\})|(\{8cd69708-2f5e-4282-a94f-3feebc4bce35\})|(\{8dc21e24-3883-4d01-b486-ef1d1106fa3d\})|(\{8f8cc21a-2097-488f-a213-f5786a2ccbbf\})|(\{9c8b93f7-3bf8-4762-b221-40c912268f96\})|(\{9ce66491-ef06-4da6-b602-98c2451f6395\})|(\{1e1acc1c-8daa-4c2e-ad05-5ef01ae65f1e\})|(\{10b0f607-1efa-4762-82a0-e0d9bbae4e48\})|(\{24f338d7-b539-49f1-b276-c9edc367a32d\})|(\{40c9030f-7a2f-4a58-9d0a-edccd8063218\})|(\{41f97b71-c7c6-40b8-83b1-a4dbff76f73d\})|(\{42f3034a-0c4a-4f68-a8fd-8a2440e3f011\})|(\{52d456e5-245a-4319-b8d2-c14fbc9755f0\})|(\{57ea692b-f9fe-42df-bf5e-af6953fba05a\})|(\{060c61d8-b48f-465d-aa4b-23325ea757c3\})|(\{65c1967c-6a5c-44dd-9637-0d4d8b4c339b\})|(\{65d40b64-b52a-46d8-b146-580ff91889cb\})|(\{75b7af0d-b4ed-4320-95c8-7ffd8dd2cb7c\})|(\{77fe9731-b683-4599-9b06-a5dcea63d432\})|(\{84b20d0c-9c87-4340-b4f8-1912df2ae70d\})|(\{92b9e511-ac81-4d47-9b8f-f92dc872447e\})|(\{95afafef-b580-4f66-a0fe-7f3e74be7507\})|(\{116a0754-20eb-4fe5-bd35-575867a0b89e\})|(\{118bf5f6-98b1-4543-b133-42fdaf3cbade\})|(\{248eacc4-195f-43b2-956c-b9ad1ae67529\})|(\{328f931d-83c1-4876-953c-ddc9f63fe3b4\})|(\{447fa5d3-1c27-4502-9e13-84452d833b89\})|(\{476a1fa9-bce8-4cb4-beff-cb31980cc521\})|(\{507a5b13-a8a3-4653-a4a7-9a03099acf48\})|(\{531bf931-a8c6-407b-a48f-8a53f43cd461\})|(\{544c7f83-ef54-4d17-aa91-274fa27514ef\})|(\{546ea388-2839-4215-af49-d7289514a7b1\})|(\{635cb424-0cd5-4446-afaf-6265c4b711b5\})|(\{654b21c7-6a70-446c-b9ac-8cac9592f4a9\})|(\{0668b0a7-7578-4fb3-a4bd-39344222daa3\})|(\{944ed336-d750-48f1-b0b5-3c516bfb551c\})|(\{1882a9ce-c0e3-4476-8185-f387fe269852\})|(\{5571a054-225d-4b65-97f7-3511936b3429\})|(\{5921be85-cddd-4aff-9b83-0b317db03fa3\})|(\{7082ba5c-f55e-4cd8-88d6-8bc479d3749e\})|(\{7322a4cb-641c-4ca2-9d83-8701a639e17a\})|(\{90741f13-ab72-443f-a558-167721f64883\})|(\{198627a5-4a7b-4857-b074-3040bc8effb8\})|(\{5e5b9f44-2416-4669-8362-42a0b3f97868\})|(\{824985b9-df2a-401c-9168-749960596007\})|(\{4853541f-c9d7-42c5-880f-fd460dbb5d5f\})|(\{6e6ff0fd-4ae4-49ae-ac0c-e2527e12359b\})|(\{90e8aa72-a7eb-4337-81d4-538b0b09c653\})|(\{02e3137a-96a4-433d-bfb2-0aa1cd4aed08\})|(\{9e734c09-fcb1-4e3f-acab-04d03625301c\})|(\{a6ad792c-69a8-4608-90f0-ff7c958ce508\})|(\{a512297e-4d3a-468c-bd1a-f77bd093f925\})|(\{a71b10ae-b044-4bf0-877e-c8aa9ad47b42\})|(\{a33358ad-a3fa-4ca1-9a49-612d99539263\})|(\{a7775382-4399-49bf-9287-11dbdff8f85f\})|(\{afa64d19-ddba-4bd5-9d2a-c0ba4b912173\})|(\{b4ab1a1d-e137-4c59-94d5-4f509358a81d\})|(\{b4ec2f8e-57fd-4607-bf4f-bc159ca87b26\})|(\{b06bfc96-c042-4b34-944c-8eb67f35630a\})|(\{b9dcdfb0-3420-4616-a4cb-d41b5192ba0c\})|(\{b8467ec4-ff65-45f4-b7c5-f58763bf9c94\})|(\{b48e4a17-0655-4e8e-a5e2-3040a3d87e55\})|(\{b6166509-5fe0-4efd-906e-1e412ff07a04\})|(\{bd1f666e-d473-4d13-bc4d-10dde895717e\})|(\{be572ad4-5dd7-4b6b-8204-5d655efaf3b3\})|(\{bf2a3e58-2536-44d4-b87f-62633256cf65\})|(\{bfc5ac5f-80bd-43e5-9acb-f6d447e0d2ce\})|(\{bfe3f6c1-c5fe-44af-93b3-576812cb6f1b\})|(\{c0b8009b-57dc-45bc-9239-74721640881d\})|(\{c1cf1f13-b257-4271-b922-4c57c6b6e047\})|(\{c3d61029-c52f-45df-8ec5-a654b228cd48\})|(\{c39e7c0b-79d5-4137-bef0-57cdf85c920f\})|(\{ce043eac-df8a-48d0-a739-ef7ed9bdf2b5\})|(\{cf62e95a-8ded-4c74-b3ac-f5c037880027\})|(\{cff02c70-7f07-4592-986f-7748a2abd9e1\})|(\{d1b87087-09c5-4e58-b01d-a49d714da2a2\})|(\{d14adc78-36bf-4cf0-9679-439e8371d090\})|(\{d64c923e-8819-488c-947f-716473d381b2\})|(\{d734e7e3-1b8e-42a7-a9b3-11b16c362790\})|(\{d147e8c6-c36e-46b1-b567-63a492390f07\})|(\{db1a103d-d1bb-4224-a5e1-8d0ec37cff70\})|(\{dec15b3e-1d12-4442-930e-3364e206c3c2\})|(\{dfa4b2e3-9e07-45a4-a152-cde1e790511d\})|(\{dfcda377-b965-4622-a89b-1a243c1cbcaf\})|(\{e4c5d262-8ee4-47d3-b096-42b8b04f590d\})|(\{e82c0f73-e42c-41dd-a686-0eb4b65b411c\})|(\{e60616a9-9b50-49d8-b1e9-cecc10a8f927\})|(\{e517649a-ffd7-4b49-81e0-872431898712\})|(\{e771e094-3b67-4c33-8647-7b20c87c2183\})|(\{eff5951b-b6d4-48f5-94c3-1b0e178dcca5\})|(\{f26a8da3-8634-4086-872e-e589cbf03375\})|(\{f992ac88-79d3-4960-870e-92c342ed3491\})|(\{f4e4fc03-be50-4257-ae99-5cd0bd4ce6d5\})|(\{f73636fb-c322-40e1-82fb-e3d7d06d9606\})|(\{f5128739-78d5-4ad7-bac7-bd1af1cfb6d1\})|(\{fc11e7f0-1c31-4214-a88f-6497c27b6be9\})|(\{feedf4f8-08c1-451f-a717-f08233a64ec9\}))$/">
      <prefs/>
      <versionRange minVersion="0" maxVersion="*" severity="3"/>
    </emItem>
    <emItem blockID="52842139-3d11-41ac-9d7f-8e51122a3141" id="/^((\{ac296b47-7c03-486f-a1d6-c48b24419749\})|(\{1cab8ccf-deff-4743-925d-a47cbd0a6b56\})|(\{5da81d3d-5db1-432a-affc-4a2fe9a70749\})|(\{071b9878-a7d3-4ae3-8ef0-2eaee1923403\})|(\{261476ea-bd0e-477c-abd7-33cdf626f81f\})|(\{224e66d0-6b11-4c4b-9bcf-41180889898a\})|(\{1e90cf52-c67c-4bd9-80c3-a2bf521fc981\})|(\{09c4799c-00f1-439e-9e60-3827c589b372\})|(\{d3d2095a-9faa-466f-82ae-3114179b34d6\})|(\{70389ea5-7e4d-4515-835c-fbd047f229dd\})|(\{2e8083a5-cd88-4aaa-bb8b-e54e9753f280\})|(\{fbf2480b-5c19-478e-bfd0-192ad9f84dc9\})|(\{6c7dc694-89f8-477e-88d5-c55af4d6a846\})|(\{915c12c6-901a-490d-9bfc-20f00d1ad31d\})|(\{d3a4aa3e-f74c-4382-876d-825f592f2976\})|(\{0ad91ec1-f7c4-4a39-9244-3310e9fdd169\})|(\{9c17aa27-63c5-470a-a678-dc899ab67ed3\})|(\{c65efef2-9988-48db-9e0a-9ff8164182b6\})|(\{d54c5d25-2d51-446d-8d14-18d859e3e89a\})|(\{e458f1f1-a331-4486-b157-81cba19f0993\})|(\{d2de7e1f-6e51-41d6-ba8a-937f8a5c92ff\})|(\{2b08a649-9bea-4dd4-91c8-f53a84d38e19\})|(\{312dd57e-a590-4e19-9b26-90e308cfb103\})|(\{82ce595a-f9b6-4db8-9c97-b1f1c933418b\})|(\{0a2e64f0-ea5a-4fff-902d-530732308d8e\})|(\{5fbdc975-17ab-4b4e-90d7-9a64fd832a08\})|(\{28820707-54d8-41f0-93e9-a36ffb2a1da6\})|(\{64a2aed1-5dcf-4f2b-aad6-9717d23779ec\})|(\{ee54794f-cd16-4f7d-a7dd-515a36086f60\})|(\{4d381160-b2d5-4718-9a05-fc54d4b307e7\})|(\{60393e0e-f039-4b80-bad4-10189053c2ab\})|(\{0997b7b2-52d7-4d14-9aa6-d820b2e26310\})|(\{8214cbd6-d008-4d16-9381-3ef1e1415665\})|(\{6dec3d8d-0527-49a3-8f12-b05f2a8b95b2\})|(\{0c0d8d8f-3ae0-4c98-81ac-06453a316d16\})|(\{84d5ef02-a283-484a-80da-7087836c74aa\})|(\{24413756-2c44-47c5-8bbf-160cb37776d8\})|(\{cf6ac458-06e8-45d0-9cbf-ec7fc0eb1710\})|(\{263a5792-933a-4de1-820a-d04198e17120\})|(\{b5fd7f37-190d-4c0a-b8dd-8b4850c986ac\})|(\{cb5ef07b-c2e7-47a6-be81-2ceff8df4dd5\})|(\{311b20bc-b498-493c-a5e1-22ec32b0e83c\})|(\{b308aead-8bc1-4f37-9324-834b49903df7\})|(\{3a26e767-b781-4e21-aaf8-ac813d9edc9f\}))$/">
      <prefs/>
      <versionRange minVersion="0" maxVersion="*" severity="3"/>
    </emItem>
    <emItem blockID="c37c7c24-e738-4d06-888c-108b4d63b428" id="/^((\{39bd8607-0af4-4d6b-bd69-9a63c1825d3c\})|(\{273f0bce-33f4-45f6-ae03-df67df3864c2\})|(\{a77fc9b9-6ebb-418d-b0b6-86311c191158\})|(\{c6c4a718-cf91-4648-aa9b-170d66163cf2\})|(\{d371abec-84bb-481b-acbf-235639451127\})|(\{e63b262a-f9b8-4496-9c4b-9d3cbd6aea90\}))$/">
      <prefs/>
      <versionRange minVersion="0" maxVersion="*" severity="3"/>
    </emItem>
    <emItem blockID="f0713a5e-7208-484e-b3a0-4e6dc6a195be" id="{bee8b1f2-823a-424c-959c-f8f76c8b2306}">
      <prefs/>
      <versionRange minVersion="0" maxVersion="4.0.7.3" severity="1"/>
    </emItem>
    <emItem blockID="e04f98b5-4480-43a3-881d-e509e4e28cdc" id="{dd3d7613-0246-469d-bc65-2a3cc1668adc}">
      <prefs/>
      <versionRange minVersion="0" maxVersion="4.0.3" severity="1"/>
    </emItem>
    <emItem blockID="d664412d-ed08-4892-b247-b007a70856ff" id="/^((@asdfjhsdfuhw)|(@asdfsdfwe)|(@asdieieuss)|(@dghfghfgh)|(@difherk)|(@dsfgtftgjhrdf4)|(@fidfueir)|(@fsgergsdqtyy)|(@hjconsnfes)|(@isdifvdkf)|(@iweruewir)|(@oiboijdjfj)|(@safesearchavs)|(@safesearchavsext)|(@safesearchincognito)|(@safesearchscoutee)|(@sdfykhhhfg)|(@sdiosuff)|(@sdklsajd)|(@sduixcjksd)|(@sicognitores)|(@simtabtest)|(@sodiasudi)|(@test13)|(@test131)|(@test131ver)|(@test132)|(@test13s)|(@testmptys)|(\{ac4e5b0c-13c4-4bfd-a0c3-1e73c81e8bac\})|(\{e78785c3-ec49-44d2-8aac-9ec7293f4a8f\})|(general@filecheckerapp\.com)|(general@safesearch\.net))$/">
      <prefs/>
      <versionRange minVersion="0" maxVersion="*" severity="3"/>
    </emItem>
    <emItem blockID="d0a401cb-0c70-4784-8288-b06a88b2ae8a" id="{5834f62d-6164-4cdd-a0a3-c00c66ec9d13}">
      <prefs/>
      <versionRange minVersion="0" maxVersion="*" severity="3"/>
    </emItem>
    <emItem blockID="cae5d906-0b1d-4d1c-b83f-f9727b8c4a29" id="/^((search-unlisted2@mozilla\.com)|(search-unlisted3@mozilla\.com)|(search-unlisted4@mozilla\.com)|(search-unlisted5@mozilla\.com)|(search-unlisted11@mozilla\.com)|(search-unlisted12@mozilla\.com)|(search-unlisted55@mozilla\.com)|(search-unlisted111@mozilla\.com)|(search-unlisted400@mozilla\.com)|(search-unlisted40110@mozilla\.com)|(search-unlisted17441000051@mozilla\.com)|(search-unlisted174410000522777441@mozilla\.com)|(search-unlisted@mozilla\.com)|({0a054930-63d7-46f4-937a-de80eab21da4})|({0b24cf69-02b8-407d-83db-e7af04fc1f3e})|({0c4df994-4f4a-4646-ae5d-8936be8a4188})|({0d50d8aa-d1ed-4930-b0a0-f3340d2f510e})|({0eb4672d-58a6-4230-b74c-50ca3716c4b0})|({0f9e469e-4245-43f8-a7a8-7e730f80d284})|({0fc9fcc7-2f47-4fd1-a811-6bd4d611294b})|({4479446e-40f3-48af-ab85-7e3bb4468227})|({1a927d5b-42e7-4407-828a-fdc441d0daae})|({1a760841-50c3-4143-9f7e-3c8f04e8f9d1})|({1bd8ba17-b3ed-412e-88db-35bc4d8771d7})|({1c7d6d9e-325a-4260-8213-82d51277fc31})|({01c9a4a4-06dd-426b-9500-2ea6fe841b88})|({1cab8ccf-deff-4743-925d-a47cbd0a6b56})|({1cb0652a-4645-412d-b7e8-0b9e9a83242f})|({1d6634ca-dd37-4a31-aad1-321f05aa2bb3})|({1d9997b2-f61e-429a-8591-999a6d62becc})|({1ed2af70-9e89-42db-a9e8-17ae594003ac})|({01f409a5-d617-47be-a574-d54325fe05d1})|({2a8bec00-0ab0-4b4d-bd3d-4f59eada8fd8})|({2aeb1f92-6ddc-49f5-b7b3-3872d7e019a9})|({2bb68b03-b528-4133-9fc4-4980fbb4e449})|({2cac0be1-10a2-4a0d-b8c5-787837ea5955})|({2d3c5a5a-8e6f-4762-8aff-b24953fe1cc9})|({2ee125f1-5a32-4f8e-b135-6e2a5a51f598})|({2f53e091-4b16-4b60-9cae-69d0c55b2e78})|({3a65e87c-7ffc-408d-927e-ebf1784efd6d})|({3a26e767-b781-4e21-aaf8-ac813d9edc9f})|({3c3ef2a3-0440-4e77-9e3c-1ca8d48f895c})|({3dca6517-0d75-42d2-b966-20467f82dca1})|({3f4191fa-8f16-47d2-9414-36bfc9e0c2bf})|({3f49e12b-bb58-4797-982c-4364030d96d9})|({4aa2f47a-0bae-4a47-8a1b-1b93313a2938})|({04abafc7-7a65-401d-97f3-af2853854373})|({4ad16913-e5cb-4292-974c-d557ef5ec5bb})|({4b1050c6-9139-4126-9331-30a836e75db9})|({4b1777ec-6fe4-4572-9a29-5af206e003bf})|({4beacbbb-1691-40e7-8c1e-4853ce2e2dee})|({4c140bc5-c2ad-41c3-a407-749473530904})|({4cbef3f0-4205-4165-8871-2844f9737602})|({4dac7c77-e117-4cae-a9f0-6bd89e9e26ab})|({04ed02dc-0cb0-40c2-8bc8-6f20843024b8})|({4f6b6aaf-c5a1-4fac-8228-ead4d359dc6d})|({4f8a15fb-45c2-4d3b-afb1-c0c8813a4a5a})|({5af74f5a-652b-4b83-a2a9-f3d21c3c0010})|({5b0f6d3c-10fd-414c-a135-dffd26d7de0f})|({5b421f02-e55e-4b63-b90e-aa0cfea01f53})|({5b620343-cd69-49b8-a7ba-f9d499ee5d3d})|({5c5cf69b-ed92-4429-8d26-ff3bb6c37269})|({5cf77367-b141-4ba4-ac2a-5b2ca3728e81})|({5da81d3d-5db1-432a-affc-4a2fe9a70749})|({5eac1066-90c3-4ba0-b361-e6315dcd6828})|({5ec4c837-59b9-496d-96e2-ff3fa74ca01f})|({5efd8c7a-ff37-41ac-a55c-af4170453fdf})|({5f4e63e4-351f-4a21-a8e5-e50dc72b5566})|({6a934ff5-e41d-43a2-baf5-2d215a869674})|({06a71249-ef35-4f61-b2c8-85c3c6ee5617})|({6ad26473-5822-4142-8881-0c56a8ebc8c0})|({6cee30bc-a27c-43ea-ac72-302862db62b2})|({6ed852d5-a72e-4f26-863f-f660e79a2ebb})|({6eee2d17-f932-4a43-a254-9e2223be8f32})|({6f13489d-b274-45b6-80fa-e9daa140e1a4})|({6fa41039-572b-44a4-acd4-01fdaebf608d})|({7ae85eef-49cf-440d-8d13-2bebf32f14cf})|({7b3c1e86-2599-4e1a-ad98-767ae38286c8})|({7b23c0de-aa3d-447f-9435-1e8eba216f09})|({7b71d75e-51f5-4a71-9207-7acb58827420})|({7c6bf09e-5526-4bce-9548-7458ec56cded})|({7ca54c8d-d515-4f2a-a21f-3d32951491a6})|({7d932012-b4dd-42cc-8a78-b15ca82d0e61})|({7d5e24a1-7bef-4d09-a952-b9519ec00d20})|({7eabad73-919d-4890-b737-8d409c719547})|({7eaf96aa-d4e7-41b0-9f12-775c2ac7f7c0})|({7f8bc48d-1c7c-41a0-8534-54adc079338f})|({7f84c4d8-bdf5-4110-a10d-fa2a6e80ef6a})|({8a6bda75-4668-4489-8869-a6f9ccbfeb84})|({8a0699a0-09c3-4cf1-b38d-fec25441650c})|({8ab8c1a2-70d4-41a8-bf78-0d0df77ac47f})|({8b4cb418-027e-4213-927a-868b33a88b4f})|({8fcfe2b3-598e-4861-a5d4-0d77993f984b})|({9a941038-82fa-4ae4-ba98-f2eb2d195345})|({9b8a3057-8bf4-4a9e-b94b-867e4e71a50c})|({9b8df895-fcdd-452a-8c46-da5be345b5bc})|({09c8fa16-4eec-4f78-b19d-9b24b1b57e1e})|({09cbfddf-5e55-4676-920d-5a16cb9e4cb5})|({9cf8d28f-f546-4871-ac4d-5faff8b5bde3})|({9d592fd5-e655-461a-9b28-9eba85d4c97f})|({9fc6e583-78a5-4a2b-8569-4297bb8b3300})|({014d98ce-dab9-4c1d-8643-166e75d7cb4d})|({18c64b09-4ccb-4c21-ba6f-ebd4a1efa034})|({21d83d85-a636-4b18-955d-376a6b19bd19})|({22ecf14b-ead6-4684-a498-7b2b839a4c97})|({23c65153-c21e-430a-a2dc-0793410a870d})|({29c69b12-8208-457e-92f4-e663b00a1f10})|({30a8d6f1-0401-4327-8c46-2e1ab45dfe77})|({30d63f93-1446-43b3-8219-deefec9c81ce})|({32cb52f8-c78a-423d-b378-0abec72304a6})|({35bfa8c0-68c1-41f8-a5dd-7f3b3c956da9})|({36a4269e-4eef-4538-baea-9dafbf6a8e2f})|({37f8e483-c782-40ed-82e9-36f101b9e41f})|({42a512a8-37e0-4e07-a1db-5b4651d75048})|({43ae5745-c40a-45ab-9c11-74316c0e9fd2})|({53fa8e1c-112b-4013-b582-0d9e8c51ca75})|({56effac7-3ae9-41e3-9b46-51469f67b3b2})|({61a486c0-ce3d-4bf1-b4f2-e186a2adecf1})|({62b55928-80cc-49f7-8a4b-ec06030d6601})|({63df223d-51cf-4f76-aad8-bbc94c895ed2})|({064d8320-e0f3-411f-9ed1-8c1349279d20})|({071b9878-a7d3-4ae3-8ef0-2eaee1923403})|({72c1ca96-c05d-46a7-bce1-c507ec3db4ea})|({76ce213c-8e57-4a14-b60a-67a5519bd7a7})|({78c2f6a0-3b54-4a21-bf25-a3348278c327})|({0079b71b-89c9-4d82-aea3-120ee12d9890})|({81ac42f3-3d17-4cff-85af-8b7f89c8826b})|({81dc4f0e-9dab-4bd2-ab9d-d9365fbf676f})|({82c8ced2-e08c-4d6c-a12b-3e8227d7fc2a})|({83d6f65c-7fc0-47d0-9864-a488bfcaa376})|({83d38ac3-121b-4f28-bf9c-1220bd3c643b})|({84b9121e-55c9-409a-9b28-c588b5096222})|({87ba49bd-daba-4071-aedf-4f32a7e63dbe})|({87c552f9-7dbb-421b-8deb-571d4a2d7a21})|({87dcb9bf-3a3e-4b93-9c85-ba750a55831a})|({89a4f24d-37d5-46e7-9d30-ba4778da1aaa})|({93c524c4-2e92-4dd7-8b37-31a69bc579e8})|({94df38fc-2dbe-4056-9b35-d9858d0264d3})|({95c7ae97-c87e-4827-a2b7-7b9934d7d642})|({95d58338-ba6a-40c8-93fd-05a34731dc0e})|({97c436a9-7232-4495-bf34-17e782d6232c})|({97fca2cd-545f-42ef-ae93-dc13b046bd3b})|({0111c475-01e6-42ea-a9b4-27bed9eb6092})|({115a8321-4414-4f4c-aee6-9f812121b446})|({158a5a56-aca0-418f-bec0-5b3bda6e9d4c})|({243a0246-cbab-4b46-93fb-249039f68d84})|({283d4f2a-bab1-43ce-90be-5129741ac988})|({408a506b-2336-4671-a490-83a1094b4097})|({0432b92a-bfcf-41b9-b5f0-df9629feece1})|({484e0ba4-a20b-4404-bb1b-b93473782ae0})|({486ecaf1-1080-48c1-8973-549bc731ccf9})|({495a84bd-5a0c-4c74-8a50-88a4ba9d74ba})|({520f2c78-7804-4f59-ae74-a192476055ed})|({543f7503-3620-4f41-8f9e-c258fdff07e9})|({0573bea9-7368-49cd-ba10-600be3535a0b})|({605a0c42-86af-40c4-bf39-f14060f316aa})|({618baeb9-e694-4c7b-9328-69f35b6a8839})|({640c40e5-a881-4d16-a4d0-6aa788399dd2})|({713d4902-ae7b-4a9a-bcf5-47f39a73aed0})|({767d394a-aa77-40c9-9365-c1916b4a2f84})|({832ffcf9-55e9-4fd1-b2eb-f19e1fac5089})|({866a0745-8b91-4199-820a-ec17de52b5f2})|({869b5825-e344-4375-839b-085d3c09ab9f})|({919fed43-3961-48d9-b0ef-893054f4f6f1})|({971d6ef0-a085-4a04-83d8-6e489907d926})|({1855d130-4893-4c79-b4aa-cbdf6fee86d3})|({02328ee7-a82b-4983-a5f7-d0fc353698f0})|({2897c767-03aa-4c2f-910a-6d0c0b9b9315})|({3908d078-e1db-40bf-9567-5845aa77b833})|({04150f98-2d7c-4ae2-8979-f5baa198a577})|({4253db7f-5136-42c3-b09d-cf38344d1e16})|({4414af84-1e1f-449b-ac85-b79f812eb69b})|({4739f233-57c1-4466-ad51-224558cf375d})|({5066a3b2-f848-4a59-a297-f268bc3a08b6})|({6072a2a8-f1bc-4c9c-b836-7ac53e3f51e4})|({7854ee87-079f-4a25-8e57-050d131404fe})|({07953f60-447e-4f53-a5ef-ed060487f616})|({8886a262-1c25-490b-b797-2e750dd9f36b})|({12473a49-06df-4770-9c47-a871e1f63aea})|({15508c91-aa0a-4b75-81a2-13055c96281d})|({18868c3a-a209-41a6-855d-f99f782d1606})|({24997a0a-9d9b-4c87-a076-766d44e1f6fd})|({27380afd-f42a-4c25-b57d-b9012e0d5d48})|({28044ca8-8e90-435e-bc63-a757af2fb6be})|({30972e0a-f613-4c46-8c87-2e59878e7180})|({31680d42-c80d-4f8a-86d3-cd4930620369})|({44685ba6-68b3-4895-879e-4efa29dfb578})|({046258c9-75c5-429d-8d5b-386cfbadc39d})|({47352fbf-80d9-4b70-9398-fb7bffa3da53})|({56316a2b-ef89-4366-b4aa-9121a2bb6dea})|({65072bef-041f-492e-8a51-acca2aaeac70})|({677e2d00-264c-4f62-a4e8-2d971349c440})|({72056a58-91a5-4de5-b831-a1fa51f0411a})|({85349ea6-2b5d-496a-9379-d4be82c2c13d})|({98363f8b-d070-47b6-acc6-65b80acac4f3})|({179710ba-0561-4551-8e8d-1809422cb09f})|({207435d0-201d-43f9-bb0f-381efe97501d})|({313e3aef-bdc9-4768-8f1f-b3beb175d781})|({387092cb-d2dc-4da5-9389-4a766c604ec2})|({0599211f-6314-4