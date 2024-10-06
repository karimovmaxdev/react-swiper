'use client';
import {useState} from "react";
import styles from "./page.module.css";
import './vars.module.scss';

import MainSwiper from './components/MainSwiper/MainSwiper';
import Title from './components/title/Title';
import SecondarySwiper from "@/app/components/SecondarySwiper/SecondarySwiper";
import CircleSwiper from "@/app/components/CircleSwiper/CircleSwiper";

import DATA from './data/index.json';

export default function Home() {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className={styles.page}>
        <div className={styles.wrapper}>
            <Title title={'Исторические даты'} />
            <CircleSwiper data={DATA} activeIndex={activeIndex} emitIndex={setActiveIndex}></CircleSwiper>
            <MainSwiper data={DATA} emitIndex={setActiveIndex} activeIndex={activeIndex} />
            <SecondarySwiper data={DATA[activeIndex].events} />
        </div>
    </div>
  );
}
