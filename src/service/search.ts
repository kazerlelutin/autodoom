// Internals
import { BRAVE_TOKEN_SEARCH, BRAVE_TOKEN_SUGGEST, BRAVE_DATA_AI } from '@/lib'

// Interfaces --------------------------------------------

interface Thumbnail {
  src: string //The served url where the image.
  width: number //The height of the image.
  height: number //The width of the image.
  bg_color: string //The background color of the image.
  original: string // The original url of the image.
  logo: string // Whether the image is a logo.
  duplicated: string //Whether the image is duplicated.
  theme: string // The theme associated with the image.
}
interface MetaUrl {
  scheme: string //The protocol scheme extracted from the url.
  netloc: string //The network location part extracted from the url.
  hostname: string //The lowercased domain name extracted from the url.
  favicon: string //The favicon used for the url.
  path: string //The hierarchical path of the url useful as a display string.
}

interface VideoData {
  duration: string //A time string representing the duration of the video.
  views: string //The number of views of the video.
  creator: string //The creator of the video.
  publisher: string //The publisher of the video.
  thumbnail: Thumbnail //A thumbnail associated with the video.
}
interface Rating {
  ratingValue: number //The current value of the rating.
  bestRating: number //Best rating received.
  reviewCount: number //The number reviews for the rating.
  profile: any //The profile associated with the rating.
  is_tripadvisor: boolean //Is the rating coming from trip advisor.
}

interface Review {
  type: 'review' //A type identifying a review. The value is always review.
  name: string //The review title for the review.
  thumbnail: Thumbnail //The thumbnail associated with the reviewer.
  description: string //A description of the review.
  rating: Rating //The ratings associated with the review.
}

interface MovieData {
  name: string //Name of the movie.
  description: string //A short plot summary for the movie.
  url: string //A url serving a movie profile page.
  thumbnail: Thumbnail //A thumbnail for a movie poster.
  release: string //The release date for the movie.
  directors: any //A list of people responsible for directing the movie.
  actors: any //A list of actors in the movie.
  rating: Rating //Rating provided to the movie from various sources.
  duration: string //The runtime of the movie. The format is HH:MM:SS.
  genre: string[] //List of genres in which the movie can be classified.
  query: string //The query that resulted in the movie result.
}

interface QA {
  question: string //The question being asked.
  answer: string //The answer to the question.
  title: string //The title of the post.
  url: string //The url pointing to the post.
  meta_url: MetaUrl //Aggregated information about the url.
}

interface QAPage {
  question: string //The question being asked.
  answer: Answer //The answer to the question.
}

interface Answer {
  text: string //The main content of the answer.
  author: string //A name string for the author of the answer.
  upvoteCount: number //Number of up votes on the answer.
  downvoteCount: number //The number of down votes on the answer.
}

interface FAQ {
  type: 'faq' //The FAQ result type identifier. The value is always faq.
  results: QA[] //A list of aggregated question answer results relevant to the query.
}

interface Person {
  type: 'person' //A type identifying a person. The value is always person.
  name: string //The name of the person.
  url: string //A profile url for the person.
  thumbnail: Thumbnail //Thumbnail associated with the person.
}

interface Organization {
  type: 'organization' //A type identifying an organization. The value is always organization.
}

interface Article {
  author: Person[] //The author of the article.
  date: string //The date when the article was published.
  publisher: Organization //The name of the publisher for the article.
  thumbnail: Thumbnail //A thumbnail associated with the article.
  isAccessibleForFree: boolean //Whether the article is free to read or is behind a paywall.
}

interface Profile {
  name: string //The name of the profile.
  long_name: string //The long name of the profile.
  url: string //The original url where the profile is available.
  img: string //The served image url representing the profile.
}

interface Result {
  title: string //The title of the web page.
  url: string //The url where the page is served.
  is_source_local: boolean //Whether the source of the web page is local.
  is_source_both: boolean //Whether the source of the web page is both.
  description: string //A description for the web page.
  page_age: string //A date representing the age of the web page.
  page_fetched: string //A date representing when the web page was last fetched.
  profile: Profile //A profile associated with the web page.
  language: string //A language classification for the web page.
  family_friendly: boolean //Whether the web page family friendly
}

interface Software {
  name: string //The name of the software product.
  author: string //The author of software product.
  version: string //The latest version of the software product.
  codeRepository: string //The code repository where the software product is currently available or maintained.
  homepage: string //The home page of the software product.
  datePublisher: string //The date when the software product was published.
  is_npm: boolean //Whether the software product is available on npm.
  is_pypi: boolean //Whether the software product is available on pypi.
  stars: number //The number of stars on the repository.
  forks: number //The numbers of forks of the repository.
  ProgrammingLanguage: string //The programming language spread on the software product.
}

interface PictureResults {
  viewMoreUrl: string //A url to view more pictures.
  results: Thumbnail[] //A list of thumbnail results.
}

interface PostalAddress {
  type: 'postaladdress' //A type identifying a postal address. The value is always postaladdress
  country: string //The country associated with the location.
  postalCode: string //The postal code associated with the location.
  streetAddress: string //The street address associated with the location.
  addressRegion: string //The region associated with the location. This is usually a state.
  addressLocality: string //The address locality or subregion associated with the location.
  displayAddress: string //The displayed address string.
}

interface DataProvider {
  type: 'external' //A type representing the source of data. This is usually external.
  name: string //The name of the data provider. This can be a domain.
  url: string //The url where the information is coming from.
  long_name: string //The long name for the data provider.
  img: string //The served url for the image data.
}

interface LocationResult {
  type: 'location_result' //A type identifying a location result. The value is always location_result.
  provider_url: string //The complete url of the provider.
  coordinates: number[] //A list of coordinates associated with the location. This is a lat long represented as a floating point.
  zoom_level: number //The zoom level on the map.
  thumbnail: Thumbnail //The thumbnail associated with the location.
  postal_address: PostalAddress //The postal address associated with the location.
  opening_hours: any //The opening hours, if it is a business, associated with the location .
  contact: any //The contact of the business associated with the location.
  price_range: string //A display string used to show the price classification for the business.
  rating: Rating //The ratings of the business.
  distance: any //The distance from the location to the search query.
  profiles: DataProvider[] //The associated profiles with the business.
  reviews: Review[] //Aggregated reviews from various sources relevant to the business.
  pictures: PictureResults //A bunch of pictures associated with the business.
}

interface SearchResult {
  type: 'search_result' //A type identifying a web search result. The value is always search_result.
  subtype: 'generic' //A sub type identifying the web search result type.
  deep_results: any //Gathered information on a web search result.
  schemas: any //A list of schemas extracted from the web search result.
  meta_url: MetaUrl //Aggregated information on the url associated with the web search result.
  thumbnail: Thumbnail //The thumbnail of the web search result.
  age: string //A string representing the age of the web search result.
  language: string //The main language on the web search result.
  restaurant: any //If a location result, associated restaurant information.
  locations: LocationResult[] //The locations associated with the web search result.
  video: VideoData //The video associated with the web search result.
  movie: MovieData //The movie associated with the web search result.
  faq: FAQ //Any frequently asked questions associated with the web search result.
  qa: QAPage //Any question answer information associated with the web search result page.
  book: any //Any book information associated with the web search result page.
  rating: Rating //Rating found for the web search result page.
  article: Article //An article found for the web search result page.
  product: any //The main product and a review that is found on the web search result page.
  product_cluster: any //A list of products and reviews that are found on the web search result page.
  cluster_type: string //A type representing a cluster. The value can be product_cluster.
  cluster: Result[] //A list of web search results.
  creative_work: any //Aggregated information on the creative work found on the web search result.
  music_recording: any //Aggregated information on music recording found on the web search result.
  review: Review //Aggregated information on the review found on the web search result.
  software: Software //Aggregated information on a software product found on the web search result page.
  content_type: string //The content type associated with the search result page.
  extra_snippets: string[] //A list of extra alternate snippets for the web page
}

interface VideoResult {
  type: 'video_result' //The type identifying the video result. The value is always video_result.
  data: VideoData // Meta data for the video.
  meta_url: MetaUrl //Aggregated information on the URL
  thumbnail: Thumbnail //The thumbnail for the video.
  age: number //A string representing the age of the video.
}

interface Videos {
  type: 'videos' //The type representing the videos. The value is always videos.
  results: VideoResult[] // Array of video results.
  mutated_by_goggles: boolean // Whether the videos result where changed by a goggle.
}

interface Web {
  type: 'search' //A type identifying web search results. The value is always search.
  results: SearchResult[] //A list of search results.
  family_friendly: boolean //Whether the results are family friendly.
}

interface SuggestResult {
  query: string //Suggested query.
  is_entity: boolean //Whether the suggested enriched query is an entity.
  title: string //The suggested query enriched title.
  description: string //The suggested query enriched description.
  img: string //The suggested query enriched image url.
}

interface Suggest {
  type: 'suggest' //The type of search api result. The value is always suggest.
  query: string //Suggest search query string. Only the original query is returned.
  results: SuggestResult[] //The list of suggestions for given query.
}

// Functions ---------------------------------------------

/**
 *
 * @param query search query, Max words: 40, Max characters: 300
 * @returns  web: Array of web results, videos: Array of video results
 */
export async function search(
  query: string
): Promise<{ web: Web; videos: Videos }> {
  const response = await fetch(
    `https://api.search.brave.com/res/v1/web/search?q=${query}&freshness=yes&count=20`,
    {
      headers: {
        'X-Subscription-Token': BRAVE_TOKEN_SEARCH,
      },
    }
  )

  const { web, videos } = await response.json()

  return { web, videos }
}

/**
 *
 * @param query search query, Max words: 40, Max characters: 300
 * @description This function uses the Brave Search API to suggest queries for a given query
 * @returns suggest: Array of suggestions for given query
 */
export async function suggest(query: string): Promise<Suggest> {
  const response = await fetch(
    `https://api.search.brave.com/res/v1/suggest/search?q=${query}&count=20`,
    {
      headers: {
        'X-Subscription-Token': BRAVE_TOKEN_SUGGEST,
      },
    }
  )
  return await response.json()
}

/**
 *
 * @param query search query, Max words: 40, Max characters: 300
 * @description This function uses the Brave Search API to get data for AI, NOT AVAILABLE FOR PUBLIC USE
 * @returns
 */
export async function dataForAi(query: string) {
  const response = await fetch(
    `https://api.search.brave.com/res/v1/web/search?q=${query}&freshness=yes&count=20`,
    {
      headers: {
        'X-Subscription-Token': BRAVE_DATA_AI,
      },
    }
  )

  const { web, videos, discussions } = await response.json()
  return { web, videos, discussions }
}
