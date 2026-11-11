(function () {
  const nav = document.querySelector('.nav_bar')
  if (!nav) return

  try {
    const profile = JSON.parse(localStorage.getItem('glitchbucket-profile') || 'null')
    if (profile && typeof profile.name === 'string' && /^https:\/\/cdn\.discordapp\.com\//.test(profile.avatar)) {
      const user = nav.querySelector('.user')
      user.querySelector('.avatar').src = profile.avatar
      user.querySelector('.name').textContent = profile.name
      user.hidden = false
      nav.querySelector('.login').hidden = true
    }
  } catch (e) {}

  const toggle = nav.querySelector('.menu_toggle')
  const set = (open) => {
    nav.classList.toggle('open', open)
    toggle.setAttribute('aria-expanded', String(open))
  }
  toggle.addEventListener('click', (event) => {
    event.stopPropagation()
    set(!nav.classList.contains('open'))
  })
  document.addEventListener('click', (event) => {
    if (!nav.contains(event.target)) set(false)
  })
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') set(false)
  })
})()
