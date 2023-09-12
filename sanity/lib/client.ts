import { Any, createClient } from 'next-sanity'
import algoliasearch from 'algoliasearch/lite';
import { apiVersion, dataset, projectId, useCdn } from '../env'


export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
})



//Pagination
export async function fetchPaginatedData(page : number, postSize : number) {
  const query = `*[_type == 'post'] | order(_createdAt desc) [${(page - 1) * postSize}..${page * postSize - 1}]`;
  const result = await client.fetch(query);
  return result;
}

