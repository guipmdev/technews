import myPosts from './index'

export function updateSocialButtonsStatus() {
  const socialButtons = document.querySelectorAll(
    'button[data-button-type="like"], button[data-button-type="save"]',
  )

  socialButtons.forEach((button) => {
    const { buttonType } = button.dataset
    const { postIdentifier } = button.dataset
    const respectivePostList = myPosts[buttonType + 'd']

    if (respectivePostList.includes(postIdentifier)) {
      button.classList.add('active')
    }

    button.addEventListener('click', () => {
      if (button.className.includes('active')) {
        button.classList.remove('active')

        const postToRemoveIndex = respectivePostList.indexOf(postIdentifier)
        respectivePostList.splice(postToRemoveIndex, 1)
      } else {
        button.classList.add('active')

        respectivePostList.push(postIdentifier)
      }

      localStorage.setItem(
        '@html-and-bootstrap-blog:my-posts-1.0.0',
        JSON.stringify(myPosts),
      )
    })
  })
}
