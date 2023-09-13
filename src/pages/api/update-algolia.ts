import algoliasearch from 'algoliasearch';
import sanityclient from '@sanity/client'
import indexer, { flattenBlocks } from 'sanity-algolia';

const algolia = algoliasearch('DMWGABW9JT', '3e1c623ff93d694a4f8c92fb7d3076b7');
const sanity = sanityclient({
  projectId: '98z6fzay',
  dataset: 'production',
  // Other Sanity configuration options
});

export default function handler(req:any, res:any) {
  const sanityAlgolia = indexer(
    {
      post: {
        index: algolia.initIndex('posts'),
      },
    },
    (document) => {
      switch (document._type) {
        case 'post':
          return {
            title: document.title,
            path: document.slug.current,
            publishedAt: document.publishedAt,
            excerpt: flattenBlocks(document.excerpt),
          };
        default:
          throw new Error(`Unknown type: ${document._type}`);
      }
    }
  );

  return sanityAlgolia
    .webhookSync(sanity, req.body)
    .then(() => res.status(200).send('Webhook processed successfully'))
    .catch((error) => {
      console.error('Webhook error:', error);
      res.status(500).send('Webhook error');
    });
}
