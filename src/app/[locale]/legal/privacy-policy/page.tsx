import React from 'react';
import { useTranslations } from 'next-intl';
import LegalPage from '@/components/legal/LegalPage';

export default function PrivacyPolicy() {
  const t = useTranslations('legal.privacyPolicy');

  const sections = [
    {
      title: t('sections.informationWeCollect.title'),
      content: [
        t('sections.informationWeCollect.content'),
        ...t.raw('sections.informationWeCollect.list')
      ]
    },
    {
      title: t('sections.howWeUseInformation.title'),
      content: [
        t('sections.howWeUseInformation.content'),
        ...t.raw('sections.howWeUseInformation.list')
      ]
    },
    {
      title: t('sections.dataProtection.title'),
      content: t('sections.dataProtection.content')
    }
  ];

  return <LegalPage title={t('title')} sections={sections} />;
} 