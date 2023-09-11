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
    const postsContainer = document.querySelector('.post-listing')

    button.addEventListener('click', async (event) => {
      const clickedButton = event.currentTarget

      const nextPage = parseInt(postsContainer.getAttribute('data-page')) + 1
      const totalPages = parseInt(
        postsContainer.getAttribute('data-totalPages'),
      )

      clickedButton.classList.add('disabled')

      const requestUrl = `${window.location.pathname}page/` + nextPage

      await fetch(requestUrl)
        .then((response) => {
          return response.text()
        })
        .then((text) => {
          const parser = new DOMParser()
          const html = parser.parseFromString(text, 'text/html')

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
          clickedButton.classList.remove('disabled')
        })

      clickedButton.classList.remove('disabled')
    })
  })
}
