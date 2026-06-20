import React from 'react';
import JsonLd from './JsonLd';
import { getLocalBusinessSchema, getOrganizationSchema } from '@/lib/seo/schema';

export default function LocalBusinessSchema() {
  const businessSchema = getLocalBusinessSchema();
  const orgSchema = getOrganizationSchema();

  return (
    <>
      <JsonLd data={businessSchema} />
      <JsonLd data={orgSchema} />
    </>
  );
}
