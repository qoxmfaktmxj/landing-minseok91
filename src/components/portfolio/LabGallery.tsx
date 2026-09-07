"use client";

import Image from "next/image";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { labAds } from "@/data/siteContent";

const previews: Record<string, string> = {
  "vibe-hr": "/images/hr-thumb-new.png",
  "vibe-grid": "/images/grid-thumb-new.png",
  "hire-flow": "/images/rec-thumb-new.png",
  maru: "/images/shop-thumb-new.png",
};

export default function LabGallery() {
  const [active, setActive] = useState(labAds[0].id);
  const selected = labAds.find((project) => project.id === active) ?? labAds[0];
  return (
    <div className="lab-gallery">
      <div className="lab-preview" aria-hidden="true">
        {labAds.map((project) =>
          previews[project.id] ? (
            <Image
              key={project.id}
              src={previews[project.id]}
              alt=""
              fill
              sizes="(min-width: 900px) 40vw, 1px"
              className={active === project.id ? "is-active" : ""}
            />
          ) : (
            <div
              key={project.id}
              className={`lab-type-preview ${active === project.id ? "is-active" : ""}`}
            >
              <span>2002</span>
              <span className="lab-orbit" />
              <span>2026</span>
            </div>
          ),
        )}
        <span className="lab-preview-caption">{selected.name}</span>
      </div>
      <div className="lab-list">
        {[
          { title: "업무를 위한 도구", projects: labAds.slice(0, 3) },
          { title: "관심에서 시작한 실험", projects: labAds.slice(3) },
        ].map((group) => (
          <div className="lab-group" key={group.title}>
            <h3>{group.title}</h3>
            {group.projects.map((project) => (
              <a
                key={project.id}
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`lab-link ${active === project.id ? "is-active" : ""}`}
                onMouseEnter={() => setActive(project.id)}
                onFocus={() => setActive(project.id)}
              >
                <div>
                  <h4>{project.name}</h4>
                  <p>{project.description}</p>
                </div>
                <span className="lab-link-action">
                  <ArrowUpRight size={23} aria-hidden="true" />
                  <span className="link-destination">새 탭</span>
                </span>
              </a>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
