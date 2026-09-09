"use client";

import { ArrowDown } from "lucide-react";
import { frontPage } from "@/data/siteContent";
import HeroScene from "./HeroScene";
import styles from "./ArcticHero.module.css";

export default function Hero() {
  return (
    <section className={`hero ${styles.hero}`} aria-labelledby="hero-heading">
      <div className={styles.stage}>
        <HeroScene />
        <div className={styles.copy}>
          <h1 id="hero-heading" className={styles.title} aria-label="김민석">
            <span className={styles.name} data-text="KIM MINSEOK" aria-hidden="true">KIM MINSEOK</span>
          </h1>
          <div className={styles.statement}>
            {frontPage.headline.map((line, index) => (
              <p key={index}>{line.map((part) => part.text).join("")}</p>
            ))}
          </div>
          <p className={styles.identity}>
            김민석 <span>/</span> 백엔드 개발자
          </p>
        </div>
        <div className={styles.actions}>
          <a className={`button button-primary ${styles.primary}`} href="#work">
            프로젝트 살펴보기 <ArrowDown size={18} aria-hidden="true" />
          </a>
          <a className={`hero-contact ${styles.contact}`} href="#contact">
            연락하기 <ArrowDown size={17} aria-hidden="true" />
          </a>
        </div>
        <div className={styles.caption}>
          <span className={styles.indicator} />
          <span>복잡한 맥락을 하나의 흐름으로 정리합니다.</span>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>
          BACKEND <span>/</span> AI ENGINEERING <span>/</span> REAL-WORLD
          IMPACT
        </p>
        <a href="#about">
          스크롤하여 더 알아보기 <ArrowDown size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
