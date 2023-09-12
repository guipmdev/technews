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
