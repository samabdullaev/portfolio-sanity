import homePage from './singletons/homePage'
import aboutPage from './singletons/aboutPage'
import siteSettings from './singletons/siteSettings'
import project from './documents/project'
import projectCategory from './documents/projectCategory'
import blogSeries from './documents/blogSeries'
import blogArticle from './documents/blogArticle'
import resource from './documents/resource'
import resourceCategory from './documents/resourceCategory'
import resourceTopic from './documents/resourceTopic'
import certificate from './documents/certificate'
import certificateIssuer from './documents/certificateIssuer'
import course from './documents/course'
import courseTopic from './documents/courseTopic'
import application from './documents/application'
import applicationStatus from './documents/applicationStatus'
import platform from './documents/platform'
import travelDestination from './documents/travelDestination'
import yearlyReview from './documents/yearlyReview'
import journeyUpdate from './documents/journeyUpdate'
import journeyYear from './documents/journeyYear'
import mentorshipArticle from './documents/mentorshipArticle'
import galleryVideo from './objects/galleryVideo'
import socialLink from './objects/socialLink'

export const schemaTypes = [
  homePage, aboutPage, siteSettings,
  project, projectCategory, blogSeries, blogArticle, resource, resourceCategory, resourceTopic, certificate, certificateIssuer, course, courseTopic,
  travelDestination, yearlyReview, journeyUpdate, journeyYear, mentorshipArticle,
  application, applicationStatus, platform,
  galleryVideo, socialLink,
]
