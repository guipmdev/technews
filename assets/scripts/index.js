import { updateSocialButtonsStatus } from './socialButtonsStatus'

export const myPosts = JSON.parse(
  localStorage.getItem('@html-and-bootstrap-blog:my-posts-1.0.0'),
) || {
  liked: [],
  saved: [],
}

updateSocialButtonsStatus()
