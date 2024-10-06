'use client';
import styles from './styles.module.scss'
import {ICircleSwiper} from './types';
import {useEffect, useRef, useState} from "react";
export default function CircleSwiper(props: ICircleSwiper) {
    const [isMounted, setMounted] = useState(false);
    const {data, emitIndex, activeIndex} = props;
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const [currentAngle, setCurrentAngle] = useState(-55); // угол для положения активного элемента

    const totalItems = data.length;
    const angleStep = 360 / totalItems;
    const radius = 150;

    useEffect(() => {
        updatePositions();
    }, []);

    useEffect(() => {
       if(!isMounted) {
           setMounted(true);
           return
        }
        updateChildrenRotate();
    }, [currentAngle, activeIndex]);

    useEffect(() => {
        handleClick(activeIndex)
    }, [activeIndex]);

    const updatePositions = () => {
        if (wrapperRef.current) {
            const arr: HTMLDivElement[] = Array.from(wrapperRef.current?.children || []) as HTMLDivElement[];
            if(arr.length) {
                arr.forEach((elem, index) => {
                    const angle = index * angleStep + currentAngle;
                    const x = radius * Math.cos((angle * Math.PI) / 180);
                    const y = radius * Math.sin((angle * Math.PI) / 180);

                    if(elem?.style) {
                        elem.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
                        setTimeout(() => {
                            elem.style.transition = 'width .3s, height .3s, transform .3s'
                        },300)
                    }
                });
            }
        }
    };

    const updateChildrenRotate = () => {
        if (wrapperRef.current) {
            const arr: HTMLDivElement[] = Array.from(wrapperRef.current?.children || []) as HTMLDivElement[];
            if(arr.length) {
                arr.forEach((elem) => {
                    const styles = elem.style.transform.replace(/rotate\([^\)]+\)\s*/, '');
                    elem.style.transform = `${styles} rotate(${-currentAngle}deg)`;
                });
            }
        }
    }

    const handleClick = (index: number) => {
        const targetAngle = 0;
        const newAngle = targetAngle - (index * angleStep);
        setCurrentAngle(newAngle);
        emitIndex(index); // выкидываем наверх индекс

        const currentWrapper = wrapperRef.current as HTMLDivElement;
        if (currentWrapper) {
            currentWrapper.style.transition = 'transform 1s ease';
            currentWrapper.style.transform = `rotate(${newAngle}deg)`;
        }
    };


    return (
        <div ref={wrapperRef} className={`${styles.wrapper} ${isMounted ? styles.show : ''}`}>
            {data.map((item, idx) =>
                <div
                    onClick={() => handleClick(idx)}
                    className={`${styles.item} ${idx === activeIndex ? styles.active : ''}`}
                    key={idx}
                >
                    <span>{idx}</span>
                    <p>{data[idx].category}</p>
                </div>
            )}
        </div>
    );
}
