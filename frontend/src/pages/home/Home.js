import React, { Fragment } from "react";
import MetaTags from "react-meta-tags";
import MainLayout from "../../layouts/MainLayout";
import SectionTitleTwo from "../../components/section-title/SectionTitleTwo";
import HowItWorks from '../../components/home/HowItWorks'
import MainSection from "../../components/home/MainSection";
import MainFeatures from '../../components/home/MainFeatures'

const Home = () => {
  return (
    <Fragment>
      <MetaTags>
        <title>КармаН | Отзывы по номеру телефона</title>
        <meta
          name='description'
          content='Скажи спасибо человеку за прекрасно выполненную работу'
        />
      </MetaTags>
      <MainLayout
        headerContainerClass='container'
        headerPaddingClass='header-padding-2'
        headerTop='visible'
      >
        
        <MainSection />

        <SectionTitleTwo
          titleText='Как это работает'
          positionClass='text-center'
          spaceClass='mb-60'
        />
        <HowItWorks />

        <SectionTitleTwo
          titleText='Основной функционал'
          positionClass='text-center'
        />

        <MainFeatures />
      </MainLayout>
    </Fragment>
  )
};

export default Home;
