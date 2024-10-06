import {MutableRefObject, useEffect, useRef, useState, Dispatch, SetStateAction} from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperType from 'swiper';
import { Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './styles.module.scss';

import Arrow from "@/app/svg/Arrow";

import {ICategory, IMainSwiperProps} from "@/app/components/MainSwiper/types";

export default function MainSwiper(props: IMainSwiperProps) {
    const [activeData, setActiveData] = useState<ICategory>(props.data[0]);
    const swiperRef = useRef<SwiperType | null>(null);

    const [startYear, setStartYear] = useState<number>(activeData.yearStart);
    const [endYear, setEndYear] = useState<number>(activeData.yearEnd);

    const prevStartYear = useRef<number>(activeData.yearStart);
    const prevEndYear = useRef<number>(activeData.yearEnd);


    useEffect(() => {
        const interval = invokeInterval(activeData.yearStart, prevStartYear, setStartYear);
        return () => clearInterval(interval);
    }, [activeData.yearStart]);

    useEffect(() => {
        const interval = invokeInterval(activeData.yearEnd, prevEndYear, setEndYear);
        return () => clearInterval(interval);
    }, [activeData.yearEnd]);

    useEffect(() => {
        swiperRef.current?.slideTo(props.activeIndex);
    }, [props.activeIndex])

    const handleSlideChange = (swiper: SwiperType) => {
        setActiveData(props.data[swiper.activeIndex]);
        props.emitIndex(swiper.activeIndex);
    };

    const invokeInterval = (
        current: number,
        prevRef: MutableRefObject<number>,
        setValueCb: Dispatch<SetStateAction<number>>
    ): NodeJS.Timeout => {
        const duration = 300; // ms
        let difference = current > prevRef.current
            ? current - prevRef.current
            : prevRef.current - current;
        const stepTime = Math.abs(Math.floor(duration / difference)); // время между шагами

        let value = prevRef.current // промежуточное значение
        const interval = setInterval(() => {
            if (difference != 0) {
                if(value > current) {
                    value -= 1
                } else {
                    value += 1;
                }
                difference -= 1;
                setValueCb(value);
            } else {
                prevRef.current = current;
                clearInterval(interval);
            }
        }, stepTime);

        return interval
    }

    return (
        <div className={styles.swiperWrapper}>
            <Swiper
                modules={[Pagination]}
                pagination={{clickable: false}}
                spaceBetween={50}
                slidesPerView={1}
                onSlideChange={handleSlideChange}
                onSwiper={(swiper) => swiperRef.current = swiper}
            >
                {props.data.map((item, idx) =>
                    <SwiperSlide key={idx} />
                )}
            </Swiper>

            <div className={styles.slideContent}>
                <span>{startYear}</span>
                <span>{endYear}</span>
            </div>

            <div className={styles.controlsWraper}>
                <div className={styles.pagination}>
                    <span>
                        {(swiperRef.current?.activeIndex || 0) + 1}
                    </span>
                    /
                    <span>{props.data.length}</span>
                </div>
                <div className={styles.controls}>
                    <button
                        id={'prev'}
                        onClick={() => {
                            swiperRef.current?.slidePrev();
                        }}
                    >
                        <Arrow/>
                    </button>
                    <button
                        id={'next'}
                        onClick={() => {
                            swiperRef.current?.slideNext();
                        }}
                    >
                        <Arrow/>
                    </button>
                </div>
            </div>
        </div>
    );
};
