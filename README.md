# Sai Bhargavi | Portfolio

Personal portfolio of Sai Bhargavi Chebrolu, AI / Machine Learning Engineer.

Built with TanStack Start, React 19, TypeScript, Tailwind CSS 4 and Framer Motion. This project is connected to [Lovable](https://lovable.dev/projects/25c40f98-0494-4865-bf85-3e0bb9572dd4).

## Development

```sh
npm i
npm run dev      # local dev server
npm test         # unit and component tests
npm run build    # production build
```

## Editing content

All content lives in [`src/data/portfolio.ts`](src/data/portfolio.ts). You should not need to touch a component to change text.

| To change | Edit |
| --- | --- |
| Email, phone, GitHub, LinkedIn, LeetCode | `profile` |
| CV | Add the PDF to `public/cv/` and set `profile.cvUrl`, e.g. `/cv/Sai-Bhargavi-Chebrolu-CV.pdf` |
| Skills | `skillCategories` |
| Projects and case studies | `projects` |
| Experience, education | `experience`, `education` |
| Research, writing, achievements links | `proofLinks` |
| Contact form delivery | `contactConfig.formEndpoint` (e.g. Formspree) |
| Production URL, enables canonical and social image tags | `site.url` |

An empty string means "not added yet". The link then shows as unavailable instead of going somewhere broken.

### Adding a project

Add an object to `projects`, or fill in one of the placeholders. `group` sets where and how it appears:

| `group` | Section | Display |
| --- | --- | --- |
| `featured-ai-research` | Featured AI Research Project | Dark flagship card |
| `professional-real-world` | Professional Experience Projects | The first is the lead card, the rest are compact cards |
| `personal-ai-research` | Personal AI & Research Projects | A row that expands once it has details |
| `personal-software` | Personal Software Projects | Full-width card |

`status` is `in-progress`, `completed` or `details-pending`. Leave it out if it is not verified. Set `caseStudyPage: true` to give a project its own page; all case study fields are optional, and unwritten ones are hidden. The order of the groups comes from `projectGroups`.

To finish a personal AI project, replace its `pendingAiProject(...)` call with a full object, using the Skin Lesion project as a model. To complete a professional placeholder, replace `professionalPlaceholder(n)` the same way.

Set `site.showDraftProjects` to `false` to hide projects that have nothing but a title and summary. Set `site.showEmptyCaseStudySections` to `true` while drafting to see which case study sections are empty.

### Changing the colours or type

Colours are the variables in `:root` in [`src/styles.css`](src/styles.css). Text styles are the `type-*` utilities in the same file, and `section-y` sets the vertical spacing of sections.

### Adding a technology logo

Put an SVG in `public/logos/` and reference its filename as `logo`. Concepts without a brand mark use `glyph` with a Lucide icon instead.

### Changing the photo

Replace the files in `src/assets/profile/` using the same names (4:5 portrait), and update `profile.photo.alt`.
