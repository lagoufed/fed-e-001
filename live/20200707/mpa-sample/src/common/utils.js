import $ from 'jquery'

$(($) => {
  const $body = $('html, body')

  $('[data-scroll-top]').on('click', () => {
    $body.animate({ scrollTop: 0 }, 600)
    return false
  })
})