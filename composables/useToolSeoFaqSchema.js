/**
 * Inject FAQPage JSON-LD alongside page-level useToolSEOAsync head tags.
 * @param {import('vue').MaybeRefOrGetter<Array<{ question: string, answer: string }>>} faqItems
 */
function stripHtml(html) {
  return String(html || '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

export function useToolSeoFaqSchema(faqItems) {
  useHead({
    script: computed(() => {
      const items = toValue(faqItems) || []
      if (!items.length) return []

      return [
        {
          key: 'faq-page-schema',
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: items.map((faq) => ({
              '@type': 'Question',
              name: stripHtml(faq.question),
              acceptedAnswer: {
                '@type': 'Answer',
                text: stripHtml(faq.answer)
              }
            }))
          })
        }
      ]
    })
  })
}
