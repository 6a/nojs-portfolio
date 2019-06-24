(function (document, window) {
  function toggleBodyScroll (lock) {
    if (lock) {
      document.documentElement.style.overflowY = 'hidden'
    } else {
      document.documentElement.style.overflowY = 'initial'
    }
  }

  function isInBounds (scrollBase, referenceY, element) {
    var rect = element.getBoundingClientRect()
    var top = rect.y + scrollBase
    var bottom = top + rect.height

    return referenceY > top && referenceY < bottom
  }

  function handleScroll (sections) {
    var scrollPos = window.scrollY || window.scrollTop || document.getElementsByTagName('html')[0].scrollTop
    var screenMid = Math.max(document.documentElement.clientHeight, window.innerHeight || 0) / 2
    var currentReferencePosition = scrollPos + screenMid

    for (var index = 0; index < sections.length; index++) {
      if (isInBounds(scrollPos, currentReferencePosition, sections[index])) {
        sections[index].targetElement.classList.add('force-highlight')
      } else {
        sections[index].targetElement.classList.remove('force-highlight')
      }
    }
  }

  var HAMBURGER = document.getElementById('hamburger')

  HAMBURGER.addEventListener('focus', function (e) {
    toggleBodyScroll(true)
  })

  HAMBURGER.addEventListener('focusout', function (e) {
    toggleBodyScroll(false)
  })

  window.addEventListener('hashchange', function (e) {
    HAMBURGER.blur()
  })

  var SECTIONS = document.getElementsByClassName('scrolltarget')
  for (var index = 0; index < SECTIONS.length; index++) {
    SECTIONS[index].targetElement = document.getElementById(SECTIONS[index].getAttribute('data-navtarget'))
  }

  window.addEventListener('scroll', function (e) {
    handleScroll(SECTIONS)
  })

  handleScroll(SECTIONS)
})(document, window)
