import React from 'react';
import JsonLd from './JsonLd';
import { getBreadcrumbSchema } from '@/lib/seo/schema';
import { BreadcrumbItem } from '@/types/seo';

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[];
}

export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  if (!items || items.length === 0) return null;
  const schema = getBreadcrumbSchema(items);
  return <JsonLd data={schema} />;
}
