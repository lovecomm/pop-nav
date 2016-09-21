(function($) {
	'use strict'
	$(document).ready(function() {

    const nav = {
      self: $('#header'),
      clone: '',
      trigger: $('.waypoint-hero'),
      isDuplicated: false,
      isShowing: false,
      pastHeader: false,
      scrollLast: 0,
      init: () => {
        nav.scrollPosition()
        nav.waypoint()
      },
      scrollPosition: () => {
        $(window).scroll((event) => {
          let st = $(this).scrollTop()
          if (st < nav.scrollLast && nav.pastHeader && !nav.isDuplicated) { // is scrolling up & is past header, not yet duplicated – want to clone menu
            nav.addClone()
          } else if (st < nav.scrollLast && nav.pastHeader && nav.isDuplicated && !nav.isShowing) { // scrolling up, is duplicated, is past header, clone isn't currently showing  – add showing class
            nav.showClone()
          } else if (st >= nav.scrollLast && nav.isDuplicated && nav.pastHeader && nav.isShowing) { // is scrolling down, duplicated nav, past the header, clone is currently showing – add hiding class
            nav.hideClone()
          } 
          nav.scrollLast = st
        })
      },
      waypoint: () => {
        const waypointDown = $(nav.trigger).waypoint({
          handler: (direction) => {
            if (direction === 'down') { 
              nav.pastHeader = true
            } else { // time to remove cloned copy, if coppied
              nav.pastHeader = false
              if (nav.isDuplicated === true) {
                nav.removeClone()
              }
            } 
          } 
        })
      },
      addClone: () => {
        // Create clone of header, change ID, add hiding styles
        nav.clone = $(nav.self).clone(true).attr('id', 'header-clone').addClass('header-clone')
        // Update header nav toggles so that they are different from the original, thus not triggering each other's nav menus
        $(nav.clone).find('.navbar-collapse').attr('id', 'nav-mobile-toggle-clone')
        $(nav.clone).find('.navbar-toggle').attr('data-target', '#nav-mobile-toggle-clone')
        // Prepend to body, make sure it's hidden first but then is reveleaed
        nav.hideClone()
        setTimeout(() => {
          $('body').prepend(nav.clone)
          nav.showClone()
        }, 150)
        nav.isDuplicated = true
      },
      removeClone: () => {
        $(nav.clone).removeClass('header-clone')
        $(nav.clone).animate({
          opacity: 0,
        }, 150, () => {
          $(nav.clone).remove()
        })
        nav.isShowing = false
        nav.isDuplicated = false 
      },
      hideClone: () => {
        $(nav.clone).animate({
          top: -1 * $(nav.clone).outerHeight(),
          opacity: 0,
        }, 150)
        nav.isShowing = false
      },
      showClone: () => {
        $(nav.clone).animate({
          top: 0,
          opacity: 1,
        }, 150)
        nav.isShowing = true
      }
    }

    nav.init()
	})
})(jQuery)
