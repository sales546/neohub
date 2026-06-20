import React from 'react';
import JsonLd from './JsonLd';
import { getFAQPageSchema } from '@/lib/seo/schema';
import { FAQItem } from '@/types/seo';

interface FAQSchemaProps {
  items: FAQItem[];
}

export default function FAQSchema({ items }: FAQSchemaProps) {
  if (!items || items.length === 0) return null;
  const schema = getFAQPageSchema(items);
  return <JsonLd data={schema} />;
}
