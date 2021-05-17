import HeroLandingPage from '@app/@pages/landing-page/hero';
import SectionOneLandingPage from '@app/@pages/landing-page/section-one';
import SectionTwoLandingPage from '@app/@pages/landing-page/section-two';
import React from 'react';

function LandingPage(): JSX.Element {
  return (
    <>
      <HeroLandingPage />
      <SectionOneLandingPage />
      <SectionTwoLandingPage />
    </>
  );
}

export default LandingPage;
