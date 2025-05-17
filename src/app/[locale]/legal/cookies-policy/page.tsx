import React from 'react';
import { useTranslations } from 'next-intl';
import LegalPage from '@/components/legal/LegalPage';

export default function CookiesPolicy() {
  const t = useTranslations('legal.cookiesPolicy');

  const sections = [
    {
      title: t('sections.whatAreCookies.title'),
      content: t('sections.whatAreCookies.content')
    },
    {
      title: t('sections.howWeUseCookies.title'),
      content: [
        t('sections.howWeUseCookies.content'),
        ...t.raw('sections.howWeUseCookies.list')
      ]
    },
    {
      title: t('sections.managingCookies.title'),
      content: t('sections.managingCookies.content')
    }
  ];

  return <LegalPage title={t('title')} sections={sections} />;
} 