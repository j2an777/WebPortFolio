import { navigation, profile, projects } from "@/content/portfolio";
import { getSiteConfig } from "@/lib/seo";
export const dynamic = "force-static";
export function GET() {
  const { origin } = getSiteConfig();
  const text = `# ${profile.name} · ${profile.englishName}\n\n> ${profile.intro}\n\n${profile.description}\n\n## Pages\n${navigation.map((item) => `- [${item.label}](${origin}${item.href})`).join("\n")}\n\n## Project case studies\n${projects.map((project) => `- [${project.name}](${origin}/work/${project.slug}): ${project.summary} 역할: ${project.role}`).join("\n")}\n\n## Contact\n- Email: ${profile.email}\n- GitHub: ${profile.github}\n\n## Evidence\n- 프로젝트 참여 기간과 역할은 각 사례에 표시되어 있습니다.\n- 회사 PR 링크는 접근 권한이 필요합니다.\n- 문서에 기록된 수치는 사례 당시의 조건에 한정됩니다.\n- 클라이언트 프로젝트와 직접 고용 경력을 구분합니다.\n`;
  return new Response(text, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Robots-Tag": "noindex",
    },
  });
}
