import { languages, type Language } from "../data/languages";

type MetricKey =
  | "performance"
  | "memoryEfficiency"
  | "learnability"
  | "devSpeed"
  | "ecosystem"
  | "concurrency"
  | "typeStrength";

interface MetricDefinition {
  key: MetricKey;
  label: string;
}

export interface ComparisonPair {
  left: Language;
  right: Language;
  slug: string;
}

export interface ComparisonInsight {
  key: MetricKey;
  metric: string;
  leader: Language | null;
  delta: number;
}

export const metricDefinitions: MetricDefinition[] = [
  { key: "performance", label: "Performance" },
  { key: "memoryEfficiency", label: "Memory Efficiency" },
  { key: "learnability", label: "Learnability" },
  { key: "devSpeed", label: "Development Speed" },
  { key: "ecosystem", label: "Ecosystem" },
  { key: "concurrency", label: "Concurrency" },
  { key: "typeStrength", label: "Type Safety" },
];

export const siteName = "Langs Compare";
export const siteUrl = "https://langscompare.site";

export const featuredComparisonIds = [
  ["python", "javascript"],
  ["rust", "go"],
  ["python", "rust"],
  ["typescript", "javascript"],
  ["java", "csharp"],
  ["c", "cpp"],
] as const;

export function getLanguageById(id: string): Language | undefined {
  return languages.find((language) => language.id === id);
}

export function getComparisonSlug(leftId: string, rightId: string): string {
  const [first, second] = [leftId, rightId].sort((a, b) => a.localeCompare(b));
  return `${first}-vs-${second}`;
}

export function getComparisonPath(leftId: string, rightId: string): string {
  return `/compare/${getComparisonSlug(leftId, rightId)}`;
}

export function getComparePlaygroundPath(leftId: string, rightId: string): string {
  return `/playground?left=${leftId}&right=${rightId}`;
}

export function getAllComparisonPairs(): ComparisonPair[] {
  const pairs: ComparisonPair[] = [];

  for (let index = 0; index < languages.length; index += 1) {
    for (let innerIndex = index + 1; innerIndex < languages.length; innerIndex += 1) {
      const left = languages[index];
      const right = languages[innerIndex];
      pairs.push({
        left,
        right,
        slug: getComparisonSlug(left.id, right.id),
      });
    }
  }

  return pairs;
}

export function getFeaturedComparisonPairs(): ComparisonPair[] {
  return featuredComparisonIds
    .map(([leftId, rightId]) => {
      const left = getLanguageById(leftId);
      const right = getLanguageById(rightId);
      if (!left || !right) return null;

      return {
        left,
        right,
        slug: getComparisonSlug(left.id, right.id),
      };
    })
    .filter((pair): pair is ComparisonPair => pair !== null);
}

export function getComparisonInsights(left: Language, right: Language): ComparisonInsight[] {
  return metricDefinitions
    .map(({ key, label }) => {
      const leftValue = left[key];
      const rightValue = right[key];
      return {
        key,
        metric: label,
        leader:
          leftValue === rightValue ? null : leftValue > rightValue ? left : right,
        delta: Math.abs(leftValue - rightValue),
      };
    })
    .sort((a, b) => b.delta - a.delta);
}

export function getComparisonSummary(left: Language, right: Language) {
  const insights = getComparisonInsights(left, right);
  const decisiveWins = insights.filter((item) => item.leader && item.delta >= 2);
  const balancedMetrics = insights.filter((item) => item.delta === 0).map((item) => item.metric);
  const leftWins = insights.filter((item) => item.leader?.id === left.id).length;
  const rightWins = insights.filter((item) => item.leader?.id === right.id).length;

  const overallLeader =
    leftWins === rightWins ? null : leftWins > rightWins ? left : right;

  const leftEdge = decisiveWins.find((item) => item.leader?.id === left.id);
  const rightEdge = decisiveWins.find((item) => item.leader?.id === right.id);

  return {
    insights,
    decisiveWins,
    balancedMetrics,
    overallLeader,
    leftWins,
    rightWins,
    leftEdge,
    rightEdge,
  };
}

function pickBestUseCases(language: Language, count = 3): string[] {
  return language.useCases.slice(0, count);
}

function pickBestDrawbacks(language: Language, count = 3): string[] {
  return language.cons.slice(0, count);
}

export function getComparisonMeta(left: Language, right: Language) {
  const summary = getComparisonSummary(left, right);
  const title = `${left.name} vs ${right.name}: Which Language Should You Choose in 2026?`;

  const descriptionParts = [
    `Compare ${left.name} vs ${right.name} across performance, memory efficiency, learnability, developer speed, ecosystem, concurrency, and jobs.`,
  ];

  if (summary.leftEdge) {
    descriptionParts.push(
      `${left.name} leads in ${summary.leftEdge.metric.toLowerCase()}.`,
    );
  }

  if (summary.rightEdge) {
    descriptionParts.push(
      `${right.name} leads in ${summary.rightEdge.metric.toLowerCase()}.`,
    );
  }

  return {
    title,
    description: descriptionParts.join(" "),
  };
}

export function getComparisonIntro(left: Language, right: Language): string {
  const summary = getComparisonSummary(left, right);

  if (!summary.overallLeader) {
    return `${left.name} and ${right.name} are closely matched overall, but they win for different reasons. This comparison focuses on where each language creates a practical advantage so you can pick based on workload, team shape, and long-term maintainability.`;
  }

  const leader = summary.overallLeader;
  const lagger = leader.id === left.id ? right : left;
  const strongestEdge =
    summary.decisiveWins.find((item) => item.leader?.id === leader.id) ?? summary.insights[0];

  return `${leader.name} comes out ahead overall in this ${left.name} vs ${right.name} comparison because it has a clearer edge in ${strongestEdge.metric.toLowerCase()}. ${lagger.name} still makes sense when your team values ${lagger.devSpeed >= leader.devSpeed ? "faster delivery" : "different runtime tradeoffs"} and the use cases it already dominates.`;
}

export function getRecommendationBullets(left: Language, right: Language) {
  const summary = getComparisonSummary(left, right);

  return {
    left: [
      `Choose ${left.name} for ${pickBestUseCases(left).join(", ")}.`,
      summary.leftEdge
        ? `${left.name} has the clearest quantitative lead in ${summary.leftEdge.metric.toLowerCase()}.`
        : `${left.name} is the better fit if you already optimize around its ecosystem and tooling.`,
      `Watch out for ${pickBestDrawbacks(left, 1)[0].toLowerCase()}.`,
    ],
    right: [
      `Choose ${right.name} for ${pickBestUseCases(right).join(", ")}.`,
      summary.rightEdge
        ? `${right.name} pulls ahead most clearly in ${summary.rightEdge.metric.toLowerCase()}.`
        : `${right.name} is the better fit if you need its libraries, hiring market, or operating model.`,
      `Watch out for ${pickBestDrawbacks(right, 1)[0].toLowerCase()}.`,
    ],
  };
}

export function getRelatedComparisons(currentLeftId: string, currentRightId: string, limit = 4) {
  const currentIds = new Set([currentLeftId, currentRightId]);

  return getAllComparisonPairs()
    .filter((pair) => pair.left.id === currentLeftId || pair.right.id === currentLeftId || pair.left.id === currentRightId || pair.right.id === currentRightId)
    .filter((pair) => !(currentIds.has(pair.left.id) && currentIds.has(pair.right.id)))
    .slice(0, limit);
}

export function getTopLanguagesByMetric(metric: MetricKey, limit = 5): Language[] {
  return [...languages]
    .sort((a, b) => b[metric] - a[metric])
    .slice(0, limit);
}

export function buildWebPageSchema({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: title,
    description,
    url: new URL(path, siteUrl).toString(),
    isPartOf: {
      "@type": "WebSite",
      name: siteName,
      url: siteUrl,
    },
  };
}
