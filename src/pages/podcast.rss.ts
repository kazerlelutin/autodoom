import rss, { pagesGlobToRssItems } from '@astrojs/rss'

/**
 *
 * @param context
 * @description This function is called by Astro to generate the RSS feed for the podcast
 * @returns XML for the RSS podcast feed
 */
export async function get(context: any) {
  // It's a iTunes tag, not a RSS tag
  const customData = `<itunes:category text="Technology"></itunes:category>`

  return rss({
    title: 'Buzz’s Blog',
    description: 'A humble Astronaut’s guide to the stars',
    site: context.site,

    customData,

    items: [
      {
        link: 'test',
        content: 'sdsd',
        pubDate: new Date(),
        title: 'test',
        author: 'moi',
        description: 'une desc',
      },
    ],
  })
}
