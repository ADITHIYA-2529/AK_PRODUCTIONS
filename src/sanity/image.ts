import imageUrlBuilder from "@sanity/image-url";
import { client } from "./client";

const builder = imageUrlBuilder(client);

/**
 * Robust urlFor image builder helper.
 * Safely handles null/undefined inputs, direct URL strings, and Sanity image asset objects.
 */
export const urlFor = (source: any) => {
  if (!source) {
    return {
      width: () => ({ height: () => ({ url: () => '' }), url: () => '' }),
      height: () => ({ width: () => ({ url: () => '' }), url: () => '' }),
      url: () => '',
    } as any;
  }

  // If source is already a full URL string (e.g. fallback or Cloudinary link)
  if (typeof source === 'string') {
    return {
      width: () => ({ height: () => ({ url: () => source }), url: () => source }),
      height: () => ({ width: () => ({ url: () => source }), url: () => source }),
      url: () => source,
    } as any;
  }

  // If source is an object but missing asset reference
  if (typeof source === 'object' && !source.asset && !source._ref && !source._id) {
    return {
      width: () => ({ height: () => ({ url: () => '' }), url: () => '' }),
      height: () => ({ width: () => ({ url: () => '' }), url: () => '' }),
      url: () => '',
    } as any;
  }

  try {
    return builder.image(source);
  } catch {
    return {
      width: () => ({ height: () => ({ url: () => '' }), url: () => '' }),
      height: () => ({ width: () => ({ url: () => '' }), url: () => '' }),
      url: () => '',
    } as any;
  }
};

