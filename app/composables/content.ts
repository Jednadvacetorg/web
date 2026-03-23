export const useDataBlogCategories = () => {
  return useAsyncData('blog-categories', () => {
    return queryCollection('blogCategories')
      .select('stem', 'path', 'title')
      .all()
  })
}

export const useDataCommunities = () => {
  return useAsyncData('communities', () => {
    return queryCollection('communities')
      .select('path', 'title')
      .all()
  })
}
