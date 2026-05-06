import {registerSeeder} from './helpers.js'
import type {SanityClient} from '@sanity/client'

registerSeeder({
  name: 'mentorship',
  async up(client: SanityClient) {
    await client.createOrReplace({
      _id: 'mentorship-1',
      _type: 'mentorshipArticle',
      title: "Universitetingizni qanchalik yaxshi bilasiz?",
      task: "Task 1",
      date: "2026-03-18",
      externalUrl: "https://publink.uz/education/universitetingizni-qanchalik-yaxshi-bilasiz",
    })
    console.log('     Created mentorship article')
  },
  async down(client: SanityClient) {
    await client.delete({query: '*[_type == "mentorshipArticle"]'})
  },
})
