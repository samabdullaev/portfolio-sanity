import homePage from './singletons/homePage'
import aboutPage from './singletons/aboutPage'
import siteSettings from './singletons/siteSettings'
import project from './documents/project'
import blogSeries from './documents/blogSeries'
import blogArticle from './documents/blogArticle'
import resource from './documents/resource'
import resourceCategory from './documents/resourceCategory'
import resourceTopic from './documents/resourceTopic'
import certificate from './documents/certificate'
import certificateIssuer from './documents/certificateIssuer'
import travelDestination from './documents/travelDestination'
import yearlyReview from './documents/yearlyReview'
import journeyUpdate from './documents/journeyUpdate'
import mentorshipArticle from './documents/mentorshipArticle'
import galleryItem from './objects/galleryItem'
import socialLink from './objects/socialLink'

export const schemaTypes = [
  homePage, aboutPage, siteSettings,
  project, blogSeries, blogArticle, resource, resourceCategory, resourceTopic, certificate, certificateIssuer,
  travelDestination, yearlyReview, journeyUpdate, mentorshipArticle,
  galleryItem, socialLink,
]
