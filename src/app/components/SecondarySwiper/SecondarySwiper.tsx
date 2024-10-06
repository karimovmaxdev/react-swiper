'use client';
import {Swiper, SwiperSlide} from 'swiper/react';
import SwiperType from 'swiper';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './styles.module.scss';

import {IEvent} from "@/app/components/MainSwiper/types";
import Arrow from "@/app/svg/Arrow";
import {useEffect, useRef, useState} from "react";
export default function SecondarySwiper(props: {data:IEvent[]}) {
    const swiperRef = useRef<SwiperType | null>(null);
    const [show, setShow] = useState<boolean>(false);

    useEffect(() => {
        setShow(false);
        setTimeout(() => {
            swiperRef.current?.slideTo(0);
            setShow(true);
        }, 300);
    }, [props.data])

    return (
        <div className={`${styles.swiperWrapper} ${show ? styles.show : ''}`}>
            <Swiper
                modules={[Navigation, Pagination]}
                navigation={{
                    nextEl: '#sNext',
                    prevEl: '#sPrev',
                }}
                spaceBetween={50}
                pagination={{clickable: true}}
                slidesPerView={3}
                draggable={true}
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                    setShow(true)
                }}

                breakpoints={{
                    325: {
                        slidesPerView: 'auto',
                        spaceBetween: 20,
                    },
                }}
            >
                {props.data.map((item, idx) =>
                    <SwiperSlide className={styles.swiperItem} key={idx}>
                        <div className={styles.wrapper}>
                            <p className={styles.title}>{item.year}</p>
                            <p className={styles.text}>{item.info}</p>
                        </div>
                    </SwiperSlide>
                )}
            </Swiper>

            <div className={styles.controls}>
                <button id={'sPrev'}><Arrow/></button>
                <button id={'sNext'}><Arrow/></button>
            </div>
        </div>
    );
}
