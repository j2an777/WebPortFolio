import Image from "next/image";
import Link from "next/link";
import { projectGroups, type Project } from "@/content/portfolio";
import { Arrow } from "./ui";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article className={`project-card tone-${project.tone}`} data-reveal>
      <Link
        href={`/work/${project.slug}`}
        data-transition
        className="project-image-link"
        aria-label={`${project.name} 프로젝트 자세히 보기`}
      >
        <div className="project-image-frame" data-image-motion>
          <div className="project-motion-layer" data-parallax-layer>
            <Image
              src={project.image}
              alt={project.imageAlt}
              width={1440}
              height={890}
              sizes="(max-width: 700px) 100vw, (max-width: 1200px) 50vw, 620px"
              className="project-image"
            />
          </div>
        </div>
        <span className="project-open">
          <Arrow />
        </span>
        {project.illustration && (
          <span className="illustration-label">구조 설명 이미지</span>
        )}
      </Link>
      <div className="project-caption">
        <p className="project-affiliation">{projectGroups.find((group) => group.id === project.group)?.name}</p>
        <div className="project-meta mono">
          <span>
            {String(index + 1).padStart(2, "0")} / {project.category}
          </span>
          <span>{project.year}</span>
        </div>
        <div className="project-title-row">
          <h3>
            <Link href={`/work/${project.slug}`} data-transition>
              {project.name}
            </Link>
          </h3>
          <Arrow />
        </div>
        <p>{project.summary}</p>
      </div>
    </article>
  );
}
