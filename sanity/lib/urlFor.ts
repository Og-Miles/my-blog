import React from 'react'
import {client} from './client'
import imageUrlBuilder from '@sanity/image-url'

const builder = imageUrlBuilder(client)

function urlFor(source: string) {
  return builder.image(source)
}

export default urlFor;