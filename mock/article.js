const Mock = require('mockjs')

const List = []
const count = 2 

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

ids = [0,1]
author = ['taco', 'boke']
reviewer = ['boke', 'taco']
title = ['devil', 'angel']
requirementno = [1, 2]
requirement = ['req1', 'req2']
reason = ['reason1', 'reason2']
specificationno = [1, 2]
specification = ['spec1', 'spec2']
content_short = ['mock data']
content = baseContent
forecast = [0.1,0.2]
importance = [1,2]

for (let i = 0; i < count; i++) {
  List.push(
      {
      id: ids[i],
      author: author[i],
      reviewer: reviewer[i],
      title: title[i],
      requirementno: requirementno[i],
      requirement: requirement[i],
      reason: reason[i],
      specificationno: specificationno[i],
      specification: specification[i],
      content_short: 'mock data',
      content: baseContent,
      forecast: forecast[i],
      importance: importance[i],
      comment_disabled: true
      }
    )
}


/*
for (let i = 0; i < count; i++) {
  List.push(
    Mock.mock(
      {
      id: '@increment',
      author: '@first',
      reviewer: '@first',
      title: '@requirement',
      requirementno: '@requirementno',
      requirement: '@requirement',
      reason: '@reason',
      specificationno: '@specificationno',
      specification: '@specification',
      content_short: 'mock data',
      content: baseContent,
      forecast: '@float(0, 100, 2, 2)',
      importance: '@integer(1, 3)',
      'type|1': ['CN', 'US', 'JP', 'EU'],
      'status|1': ['published', 'draft'],
      display_time: '@datetime',
      comment_disabled: true,
      pageviews: '@integer(300, 5000)',
      image_uri,
      platforms: ['a-platform']
      }
    )
  )
}
*/

console.log("mock start")
//console.log(List)

/*
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    id: '@increment',
    timestamp: +Mock.Random.date('T'),
    author: '@first',
    reviewer: '@first',
    title: '@title(5, 5)',
    content_short: 'mock data',
    content: baseContent,
    forecast: '@float(0, 100, 2, 2)',
    importance: '@integer(1, 3)',
    'type|1': ['CN', 'US', 'JP', 'EU'],
    'status|1': ['published', 'draft'],
    display_time: '@datetime',
    comment_disabled: true,
    pageviews: '@integer(300, 5000)',
    image_uri,
    platforms: ['a-platform']
  }))
}
*/

module.exports = [
  {
    url: '/vue-element-admin/article/list',
    type: 'get',
    response: config => {
      const { importance, type, title, specification, page = 1, limit = 20, sort } = config.query

      let mockList = List.filter(item => {
        if (importance && item.importance !== +importance) return false
        if (type && item.type !== type) return false
        if (title && item.title.indexOf(title) < 0) return false
        return true
      })

      console.log("mockmock");
      //console.log(mockList);

      if (sort === '-id') {
        mockList = mockList.reverse()
      }

      const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

      return {
        code: 20000,
        data: {
          total: mockList.length,
          items: pageList
        }
      }
    }
  },

  {
    url: '/vue-element-admin/article/detail',
    type: 'get',
    response: config => {
      const { id } = config.query
      for (const article of List) {
        if (article.id === +id) {
          return {
            code: 20000,
            data: article
          }
        }
      }
    }
  },

  {
    url: '/vue-element-admin/article/pv',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: {
          pvData: [
            { key: 'PC', pv: 1024 },
            { key: 'mobile', pv: 1024 },
            { key: 'ios', pv: 1024 },
            { key: 'android', pv: 1024 }
          ]
        }
      }
    }
  },

  {
    url: '/vue-element-admin/article/create',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },

  {
    url: '/vue-element-admin/article/update',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]

