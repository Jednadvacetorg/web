export const useBlogCategories = () => {
  return useAsyncData('blog-categories', () => {
    return queryCollection('blogCategories')
      .select('stem', 'path', 'title')
      .all()
  })
}
