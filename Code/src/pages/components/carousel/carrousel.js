import React, { useState } from 'react';

import {Card} from "@progress/kendo-react-layout";

import {
    Carousel,
    CarouselItem,
    CarouselControl,
    CarouselIndicators,
    CarouselCaption
} from 'reactstrap';

import {
    isMobile
} from "react-device-detect";

import graph from "./carousel-images/graph.PNG"
import graphm from "./carousel-images/graphm.jpg"
import hist from "./carousel-images/hist.PNG"
import histm from "./carousel-images/histm.jpg"
import info from "./carousel-images/info.PNG"
import infom from "./carousel-images/infom.jpg"
import logo from "./carousel-images/logodesk.png"
import logom from "./carousel-images/logom.png"
import github from "./carousel-images/github.png"
import githubm from "./carousel-images/githubm.png"

import "./carousel.css"

const items = [
    {
        src: logo,
        altText: 'Slide 1',
        caption: 'Smart telemedicine platform, based on IoT devices that provide Vital signs and historical values. This to transform the way telemedicine is provided and solve the biggest problem in relation to distance check-ups, which is taking biometrics.',
        url: "",
        mod:"disabled"
    },
    {
        src: graph,
        altText: 'Slide 1',
        caption: 'Real time ECG, Oxygen Saturation and Temperature monitor through IoT devices.',
        url: "",
        mod:"disabled"
    },
    {
        src: info,
        altText: 'Slide 2',
        caption: 'Electronic medical record of the patient for follow-up consultations. Including patient summary, SOAP format and ECG analysis tab for caridologists.',
        url: "",
        mod:"disabled"
    },
    {
        src: hist,
        altText: 'Slide 3',
        caption: "Historical of the patient's vital signs by date. Indispensable to see the evolution of the patient.",
        url: "",
        mod:"disabled"
    },
    {
        src: github,
        altText: 'Slide 3',
        caption: "Test and Demo: Click on the image",
        url: "https://github.com/altaga/Scup",
        mod:""
    }
];

const itemm = [
    {
        src: logom,
        altText: 'Slide 1',
        caption: 'Smart telemedicine platform, based on IoT devices that provide Vital signs and historical values. This to transform the way telemedicine is provided and solve the biggest problem in relation to distance check-ups, which is taking biometrics.',
        url: "",
        mod:"disabled"
    },
    {
        src: graphm,
        altText: 'Slide 1',
        caption: 'Real time ECG, Oxygen Saturation and Temperature monitor through IoT devices.',
        url: "",
        mod:"disabled"
    },
    {
        src: infom,
        altText: 'Slide 2',
        caption: 'Electronic medical record of the patient for follow-up consultations. Including patient summary, SOAP format and ECG analysis tab for caridologists.',
        url: "",
        mod:"disabled"
    },
    {
        src: histm,
        altText: 'Slide 3',
        caption: "Historical of the patient's vital signs by date. Indispensable to see the evolution of the patient.",
        url: "",
        mod:"disabled"
    },
    {
        src: githubm,
        altText: 'Slide 3',
        caption: "Test and Demo: Click on the image",
        url: "https://github.com/altaga/Scup",
        mod:""
    }
];

const Carrousel = (props) => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [animating, setAnimating] = useState(false);

    const next = () => {
        if (animating) return;
        const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
        setActiveIndex(nextIndex);
    }

    const previous = () => {
        if (animating) return;
        const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
        setActiveIndex(nextIndex);
    }

    const goToIndex = (newIndex) => {
        if (animating) return;
        setActiveIndex(newIndex);
    }

    if (isMobile) {
        const ratio = ["100vh", "100vw"]
        const slides = itemm.map((item) => {
            return (
                <CarouselItem
                    onExiting={() => setAnimating(true)}
                    onExited={() => setAnimating(false)}
                    key={item.src}
                >
                    <Card style={{ height: ratio[0], width: ratio[1] }}>
                        <div id="overlay">
                            <a href={item.url}>
                                <img id="center" src={item.src} alt={item.altText} style={{ opacity: "1", height: "45vh", width: "60vw" }} />
                            </a>
                            <CarouselCaption captionHeader={<div id="borderm" style={{ color: `rgba(9, 44, 116, 1)`, textAlign: "justify", fontSize: "3rem" }}>{item.caption}</div>} />
                        </div>
                    </Card>
                </CarouselItem>
            );
        }
        );
        return (
            <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
            >
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>
        )
    }
    else {
        const slides = items.map((item) => {
            return (
                <CarouselItem
                    onExiting={() => setAnimating(true)}
                    onExited={() => setAnimating(false)}
                    key={item.src}
                >
                    <Card id="overlay" style={{ height: "100vh", width: "100vw" }}>
                        <div>
                            <a href={item.url} target="_blank" className={item.mod}>
                                <img id="center" src={item.src} alt={item.altText} style={{ opacity: "1", height: "60vh", width: "60vw" }} />
                            </a>
                            <CarouselCaption captionHeader={<div id="border" style={{ color: `rgba(9, 44, 116, 1)`, textAlign: "justify", fontSize: "1.5rem", font: "helvetica" }}>{item.caption}</div>} />
                        </div>
                    </Card>
                </CarouselItem>
            );
        }
        );
        return (
            <Carousel
                activeIndex={activeIndex}
                next={next}
                previous={previous}
            >
                <CarouselIndicators items={items} activeIndex={activeIndex} onClickHandler={goToIndex} />
                {slides}
                <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
                <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
            </Carousel>
        )
    }
}

export default Carrousel;