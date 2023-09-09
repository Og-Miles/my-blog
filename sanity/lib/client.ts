import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, useCdn } from '../env'

export const client = createClient({
  apiVersion,
  dataset,
  projectId,
  useCdn,
})

export async function fetchPaginatedData(page : any, pageSize : any) {
  const query = `*[_type == 'post'] | order(_createdAt desc) [${(page - 1) * pageSize}..${page * pageSize - 1}]`;
  const result = await client.fetch(query);
  return result;
}
