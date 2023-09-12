import { updateSocialButtonsStatus } from './socialButtonsStatus.js'

export function getMyPosts() {
  return (
    JSON.parse(
      localStorage.getItem('@html-and-bootstrap-blog:my-posts-1.0.0'),
    ) || {
      liked: [],
      saved: [],
    }
  )
}

export function loadMorePosts() {
  const loadMoreButtons = document.querySelectorAll(
    'button[data-button-type="load-more"]',
  )

  loadMoreButtons.forEach((button) => {
    button.addEventListener('click', handleLoadMorePosts)
  })
}

async function handleLoadMorePosts(event) {
  const clickedButton = event.currentTarget

  clickedButton.classList.add('disabled')
  clickedButton.removeEventListener('click', handleLoadMorePosts)

  const postsContainer = document.querySelector('.post-listing')

  const nextPage = parseInt(postsContainer.getAttribute('data-page')) + 1
  const totalPages = parseInt(postsContainer.getAttribute('data-totalPages'))

  const currentWindowLocation = window.location.pathname
  const requestUrl =
    `${
      currentWindowLocation.includes('page/')
        ? currentWindowLocation.split('page/')[0]
        : currentWindowLocation
    }page/` + nextPage

  await fetch(requestUrl)
    .then((response) => {
      return response.text()
    })
    .then((text) => {
      const parser = new DOMParser()
      const html = parser.parseFromString(text, 'text/html')

      updateSocialButtonsStatus(html)
      const posts = html.querySelectorAll('li > div.post-card')

      postsContainer.setAttribute('data-page', nextPage)

      posts.forEach((post) => {
        postsContainer.appendChild(post)
      })

      if (totalPages == nextPage) {
        clickedButton.remove()
      }
    })
    .catch((error) => {
      console.log(error)

      postsContainer.setAttribute('data-page', nextPage - 1)

      clickedButton.classList.remove('disabled')
    })

  clickedButton.classList.remove('disabled')
  clickedButton.addEventListener('click', handleLoadMorePosts)
}
