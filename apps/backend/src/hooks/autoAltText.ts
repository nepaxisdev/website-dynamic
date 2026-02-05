import type { CollectionBeforeChangeHook } from 'payload'

export const autoAltText: CollectionBeforeChangeHook = ({ data, req }) => {
  if (data.alt) return data

  const filename = req.file?.name
  if (filename) {
    const formattedAlt = filename
      .split('.')?.[0]
      .replace(/[-_]/g, ' ')
      .replace(/\b\w/g, (l) => l.toUpperCase())

    return {
      ...data,
      alt: formattedAlt,
    }
  }

  return data
}
