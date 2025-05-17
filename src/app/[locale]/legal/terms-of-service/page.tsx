import React from 'react';
import { useTranslations } from 'next-intl';
import LegalPage from '@/components/legal/LegalPage';

export default function TermsOfService() {
  const t = useTranslations('legal.termsOfService');

  const sections = [
    {
      title: t('sections.agreementToTerms.title'),
      content: t('sections.agreementToTerms.content')
    },
    {
      title: t('sections.userResponsibilities.title'),
      content: [
        t('sections.userResponsibilities.content'),
        ...t.raw('sections.userResponsibilities.list')
      ]
    },
    {
      title: t('sections.serviceModifications.title'),
      content: t('sections.serviceModifications.content')
    }
  ];

  return <LegalPage title={t('title')} sections={sections} />;
} 