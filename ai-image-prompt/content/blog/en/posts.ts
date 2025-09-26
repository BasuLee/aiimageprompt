import { BlogPost } from "@/types/blog";

export const EN_BLOG_POSTS: BlogPost[] = [
  {
    slug: "writing-precision-prompts-nano-banana",
    title: "Writing Precision Prompts for Nano Banana",
    excerpt: "A field-tested playbook for sculpting Nano Banana prompts that stay consistent across complex editing tasks.",
    author: "AI Image Prompt Team",
    publishDate: "2025-09-20",
    tags: ["prompting", "nano-banana", "consistency"],
    sections: [
      {
        paragraphs: [
          "Working with Nano Banana feels like directing a hyper-creative studio team: the model is brilliant, fast, and surprisingly sensitive to nuance. That brilliance can backfire when prompts are vague, so our playbook starts with ruthless clarity. Before writing a single word, we define the output role—are we editing a portrait, fusing multiple references, or rebuilding a scene from a sketch? Nano Banana excels at identity preservation, so grounding the prompt in specific subjects, timelines, or camera moves prevents the model from improvising in unwanted directions.",
          "We lean on three guiding questions. What are the non-negotiable elements? Where can the model improvise? How will we evaluate the result? Turning those answers into crisp language is the difference between “close enough” and “pixel perfect.” When we describe hairstyles, fabrics, light rigs, or props, we do it in the format the model likes—short, declarative clauses with verbs up front. \"Render a waist-up portrait. Preserve freckles. Replace street clothes with reflective raincoat.\" Nano Banana digests that sequence, understands the hierarchy of edits, and keeps the subject’s identity intact."],
      },
      {
        heading: "Translate creative intent into model-friendly language",
        paragraphs: [
          "Nano Banana reads long prompts, but we see better retention when each sentence covers a single concept. We write from macro to micro: start with composition, then lighting, then styling, and close with mood or post-processing notes. If a reference image supplies the base composition, we explicitly say, \"Respect camera framing from reference.\" For multi-image fusion, we label each source. Example: \"Source A governs face structure and outfit silhouette. Source B defines color palette and accessories.\" That little bit of bookkeeping dramatically raises success rates across cross-view generation and pose transfer tasks.",
          "Tone words matter. Adjectives like \"soft\" or \"cinematic\" are subjective unless paired with measurable cues. Instead of \"dramatic lighting,\" we specify \"single key light from camera left, falloff to 15% within two meters,\" or \"top-lit with cool temperature to highlight metallic textures.\" When we need motion blur or volumetric fog, we describe the physics: shutter speed, density, direction. Nano Banana follows physical descriptions more reliably than mood-oriented poetry."],
      },
      {
        heading: "Structure prompts with the Nano Blueprint",
        paragraphs: [
          "Our production team codified a repeatable structure we call the Nano Blueprint. It keeps prompts readable for humans and digestible for the model, even when we are orchestrating fifteen edits at once. The blueprint has four movements, each written on its own line for quick scanning."],
        bullets: [
          "Context line: subject identity, viewpoint, frame size, camera or lens notes.",
          "Transformation block: numbered edits, each starting with an action verb (\"Replace\", \"Blend\", \"Add\").",
          "Reference directives: how to treat uploaded assets, including priority order and protected regions.",
          "Quality safeguards: resolution, color pipeline, prohibited artifacts, and final format."],
      },
      {
        heading: "Iterate with surgical passes",
        paragraphs: [
          "Nano Banana gives fast feedback, so we iterate like a colorist grading film dailies. The first pass checks identity—the eyes, jawline, skin tone, and posture. If anything drifts, we add a corrective micro-prompt that focuses solely on that feature, often tightening phrasing like \"Lock irises to hazel\" or \"Maintain original brow thickness.\" The second pass verifies environment coherence. Here we may append instructions such as \"Align shadows with key light vector\" or \"Keep reflections on the marble floor at 65% intensity.\" \n\nA third pass addresses storytelling details: props, wardrobe microtextures, text overlays if applicable. Because Nano Banana respects edit order, we attach refinements as new steps rather than rewriting the whole prompt. That keeps regression risk low and speeds up approval."],
      },
      {
        heading: "Quality assurance checklist",
        paragraphs: [
          "Every deliverable goes through a shared QA checklist. We confirm the prompt references only assets available to the model and matches the filename conventions in our dataset JSON. We read the text aloud to catch tongue-twisters that create ambiguity. Finally, we share the prompt with a teammate who has not seen the brief. If they can predict the output by reading the prompt alone, we know the instructions are sufficiently precise. When they cannot, we adjust until the prompt and the intended image snap into alignment."],
        bullets: [
          "Identity anchors: mention posture, hairline, distinguishing marks, or signature accessories.",
          "Spatial cues: camera distance, focal length, horizon placement, vanishing points.",
          "Material fidelity: describe fabrics, reflectivity, and surface roughness with technical vocabulary.",
          "Negative rules: explicitly ban logo mutations, text artifacts, or double shadows that recur in past failures.",
          "Export expectations: aspect ratio, upscaling method, color space, and compression settings."],
      },
      {
        paragraphs: [
          "Prompts are living documents. Every time our curators publish a new Nano Banana case—whether it is a holographic exhibition mock-up or a pose transfer experiment—we log what succeeded, what needed manual cleanup, and which phrases unlocked identity consistency. That wisdom feeds back into the blueprint, ensuring that your next prompt hits target faster. Treat Nano Banana like a collaborator who thrives on clarity, and the model will reward you with edits that look impossibly handcrafted."],
      },
    ],
  },
  {
    slug: "curating-ai-gallery-sourcing-to-quality",
    title: "From Sourcing to Spotlight: How We Curate This AI Prompt Gallery",
    excerpt: "Behind the scenes of transforming raw community experiments into a trustworthy prompt library.",
    author: "AI Image Prompt Team",
    publishDate: "2025-09-22",
    tags: ["curation", "workflow", "quality"],
    sections: [
      {
        paragraphs: [
          "Our gallery is often mistaken for a passive mirror of social media trends. In reality, every entry is the product of a deliberate, auditable curation pipeline. We start upstream by scouting creators across X, Xiaohongshu, and Discord communities who repeatedly demonstrate technical command of Nano Banana or GPT-4o. We maintain a contributor ledger that tracks authorship, licensing signals, and communication notes so we can verify attribution quickly when updates are needed.",
          "Once a promising case surfaces, we request the original prompt text, any parameter overrides, and raw reference assets. Screenshots alone are never enough; we need the underlying process to confirm the example is reproducible. If reference files are proprietary or time-limited, we redact sensitive data and substitute anonymised placeholders in the JSON dataset while preserving the structural intent. Transparency beats mystery hacks every time."],
      },
      {
        heading: "Data hygiene and translation",
        paragraphs: [
          "Curation is a bilingual effort. The Nano Banana repository ships with seven README translations, so we cross-check terminology to keep English and Chinese entries aligned. When we load a case into our dataset generator, we strip emoji noise, convert smart quotes to ASCII, and normalise spacing. We also assign canonical slugs that include the model name to avoid collisions between repositories. This frictionless naming scheme is what allows the website to generate sitemap entries, canonical URLs without .html suffixes, and analytics tags automatically.",
          "Every text asset passes through our consistency glossary. For example, \"reference image\" and \"source A\" must be used in the same way across cases, or users will misinterpret the instructions. When creators provide multilingual notes, we store both versions and mark which was authored first; that helps translators prioritise nuance rather than performing literal word swaps."],
      },
      {
        heading: "Visual verification lab",
        paragraphs: [
          "After textual cleanup comes visual verification. We reproduce each prompt using the declared model build. For Nano Banana edits, we pay special attention to identity retention across sequences—if twenty hairstyles share the same subject, we render them in batches to ensure the facial geometry remains locked. For GPT-4o graphics, we test the prompt at multiple resolutions to observe where composition drifts or text rendering fails. Any systemic quirks are documented in the notes field so readers know when they may need to adjust seeds or sampling steps.",
          "We also convert outputs to WebP and run lossless compression benchmarks. Although the PRD allows JPEG, we strive to publish assets that load instantly on mobile. Lazy loading is enabled on the website, but high-quality compression reduces dependence on network speed."],
      },
      {
        heading: "Metadata and SEO alignment",
        paragraphs: [
          "A curated gallery is only useful if people can find what they need. Every case is tagged with style and theme metadata derived from the prompt vocabulary. Those tags feed the filter UI on the homepage and the sitemap generator. We craft alt text following the \"AI image prompt – Title (input/output)\" convention so screen readers communicate context while keeping search engines happy. Canonical URLs omit .html to align with our SEO guidelines, and every page description starts with \"#1\" to satisfy the specification our stakeholders set for this project.",
          "We monitor performance metrics like LCP and CLS to ensure the waterfall layout remains snappy. Larger inputs are preloaded when necessary, and we stagger animations to avoid jank. The result is a cyberpunk aesthetic that still respects accessibility."],
      },
      {
        heading: "Ethics and update cadence",
        paragraphs: [
          "Curation is a living responsibility. We respect takedown requests, credit corrections, and new licensing information promptly. If a creator releases updated prompt notes, we regenerate the JSON and redeploy through our Cloudflare pipeline. Every case page lists its author handle and links back to the original post so traffic flows to the source community. By treating curatorship as both archival work and platform stewardship, we keep the gallery trustworthy for practitioners who rely on it for production inspiration."],
      },
    ],
  },
  {
    slug: "prompt-formulas-for-high-quality-generation",
    title: "Prompt Formulas That Deliver High-Quality AI Images",
    excerpt: "Reusable formulas, checkpoints, and scoring rubrics to help you draft prompts that survive real-world deadlines.",
    author: "AI Image Prompt Team",
    publishDate: "2025-09-24",
    tags: ["prompt-formula", "workflow", "qa"],
    sections: [
      {
        paragraphs: [
          "Time pressure is the enemy of thoughtful prompting. When you have to ship mood boards, marketing mockups, and explainer visuals in the same afternoon, you cannot rely on inspiration alone. That is where prompt formulas earn their keep. We maintain a library of modular templates—think LEGO bricks—that combine scene framing, subject descriptors, lighting rigs, and post-processing cues. Instead of starting from a blank page, we slot relevant bricks together and customise the deltas. This approach keeps quality high even when the creative team is juggling multiple projects."],
      },
      {
        heading: "The 4C formula",
        paragraphs: [
          "One of our go-to templates is the 4C formula: Character, Context, Camera, and Controls. Each component gets a dedicated sentence.",
          "By isolating the 4Cs, we can swap modules quickly. Need to transform a product hero shot into a cyberpunk billboard? Swap the Context sentence while keeping Character and Camera intact. Need to flip from Nano Banana to GPT-4o? Adjust the Controls sentence to reflect each model’s strengths, like realistic text rendering for GPT-4o or identity retention for Nano Banana."],
        bullets: [
          "Character: who or what anchors the scene, including emotion, motion, and defining traits.",
          "Context: environment, props, era, or narrative hook that frames the subject.",
          "Camera: composition, lens, depth of field, and motion cues.",
          "Controls: technical directives—lighting schema, render engine, resolution, negative prompts."],
      },
      {
        heading: "Scoring prompts with the RISE rubric",
        paragraphs: [
          "To keep our formulas honest, we score drafts using the RISE rubric: Relevance, Instruction density, Specificity, and Evidence. Relevance checks whether every clause maps to the final objective. Instruction density asks if sentences overload the model with multiple actions—if so, we break them apart. Specificity measures how many parameters are quantitative versus subjective; we aim for a 70/30 split in favour of objective values. Evidence prompts us to reference concrete artifacts (reference filenames, palette codes, staging diagrams) so the model has anchors."],
      },
      {
        heading: "Building formula stacks for complex sequences",
        paragraphs: [
          "For storyboard or sequence work we stack formulas. The opening frame might follow 4C, the transitional frame might use a Motion formula that focuses on temporal continuity (\"Track subject left to right; blur trailing hand 20%; maintain wardrobe continuity from Frame 1\"), and the culmination frame might invoke a Lighting formula that choreographs multiple light sources. Because every formula is documented, teammates can pick up where we left off without reverse-engineering cryptic prose."],
      },
      {
        heading: "Checklist before hitting generate",
        paragraphs: [
          "Even with formulas, we pause for a 90-second preflight check. We confirm model version numbers, verify that aspect ratios match deployment targets, and add copy-ready text markers if GPT-4o typography is required. We run prompts through an LLM to detect ambiguous pronouns or contradictory verbs. Finally, we cross-check the sitemap manifest to ensure each new case will slot into the right category tags on the site. A prompt that survives this gauntlet rarely needs more than one revision round."],
        bullets: [
          "Run a dry read to ensure verbs align (\"replace\" vs \"retain\").",
          "Confirm negative directives (no watermark, no extra limbs) appear at the end.",
          "Note any parameters that conflict with the model’s capabilities and adjust (e.g., avoid tiny text with Nano Banana).",
          "Document seed values if deterministic results are required for A/B testing."],
      },
      {
        paragraphs: [
          "Formulas do not replace artistry, but they remove the friction that keeps teams from shipping. When the scaffolding is solid, you are free to spend creative energy on storytelling, color psychology, or animation handoff packages. Pair these formulas with the dataset in our gallery, and you will have a dependable springboard for every briefing cycle."],
      },
    ],
  },
];

export default EN_BLOG_POSTS;
