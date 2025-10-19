import { useMemo, useState } from "react";

type StockStatus = "在庫あり" | "残りわずか" | "入荷待ち";

type Item = {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  stock: StockStatus;
  tags: string[];
  href: string;
};

type SortOption = "default" | "price-asc" | "price-desc" | "stock";

const items: Item[] = [
  {
    id: 1,
    name: "スタンダードパッケージ",
    description: "基本機能を備えた標準プラン。小規模プロジェクトの検証に最適です。",
    category: "プラン",
    price: 12000,
    stock: "在庫あり",
    tags: ["スターター", "コア機能", "月額"],
    href: "https://masa-org-jp.github.io/itemdetail/1",
  },
  {
    id: 2,
    name: "エンタープライズパッケージ",
    description: "大規模導入に向けた拡張機能と優先サポートを含むハイグレードプラン。",
    category: "プラン",
    price: 68000,
    stock: "残りわずか",
    tags: ["高負荷対応", "SLA", "年額"],
    href: "https://masa-org-jp.github.io/itemdetail/2",
  },
  {
    id: 3,
    name: "モバイル体験キット",
    description: "Android 端末向けに最適化された UI コンポーネントとテストシナリオのセット。",
    category: "キット",
    price: 24000,
    stock: "在庫あり",
    tags: ["Android", "テスト", "UI"],
    href: "https://masa-org-jp.github.io/itemdetail/7?android_app=true",
  },
  {
    id: 4,
    name: "デスクトップ体験キット",
    description: "デスクトップ向けのレスポンシブレイアウトとアクセシビリティ対応パターン。",
    category: "キット",
    price: 22000,
    stock: "在庫あり",
    tags: ["レイアウト", "アクセシビリティ"],
    href: "https://masa-org-jp.github.io/itemdetail/4",
  },
  {
    id: 5,
    name: "UX リサーチレポート",
    description: "最新リリースに関するユーザー調査サマリーと改善提案をまとめた資料。",
    category: "ドキュメント",
    price: 9800,
    stock: "入荷待ち",
    tags: ["リサーチ", "改善案", "PDF"],
    href: "https://masa-org-jp.github.io/itemdetail/5",
  },
  {
    id: 6,
    name: "QA シナリオ集",
    description: "主要ユーザーフローを網羅するテストケース。自動化スクリプトのひな型付き。",
    category: "ドキュメント",
    price: 15000,
    stock: "残りわずか",
    tags: ["QA", "テスト", "シナリオ"],
    href: "https://masa-org-jp.github.io/itemdetail/6",
  },
  {
    id: 7,
    name: "API エンドポイントリファレンス",
    description: "主要 API のエンドポイント、レスポンス例、利用制限を一覧化したリファレンス。",
    category: "ドキュメント",
    price: 0,
    stock: "在庫あり",
    tags: ["API", "参照", "無料"],
    href: "https://masa-org-jp.github.io/itemdetail/7",
  },
  {
    id: 8,
    name: "アクセシビリティチェックリスト",
    description: "WCAG を軸にした開発・レビュー時の確認観点をまとめたチェックリスト。",
    category: "ドキュメント",
    price: 5800,
    stock: "在庫あり",
    tags: ["アクセシビリティ", "チェックリスト"],
    href: "https://masa-org-jp.github.io/itemdetail/8",
  },
];

const stockBadgeStyles: Record<StockStatus, string> = {
  在庫あり: "bg-emerald-500/15 text-emerald-200 border-emerald-500/40",
  残りわずか: "bg-amber-500/15 text-amber-200 border-amber-500/40",
  入荷待ち: "bg-slate-500/20 text-slate-200 border-slate-500/40",
};

const statCardToneStyles: Record<"default" | "amber" | "sky", string> = {
  default:
    "border-slate-800 bg-gradient-to-br from-slate-950/70 via-slate-900/60 to-slate-900/40 text-slate-200",
  amber:
    "border-amber-500/30 bg-amber-500/10 text-amber-100",
  sky: "border-sky-500/30 bg-sky-500/10 text-sky-100",
};

type StatCardProps = {
  label: string;
  value: string;
  helper: string;
  tone?: "default" | "amber" | "sky";
};

const StatCard = ({ label, value, helper, tone = "default" }: StatCardProps) => (
  <div
    className={`rounded-2xl border px-4 py-5 shadow-sm transition-colors ${statCardToneStyles[tone]}`}
  >
    <p className="text-xs uppercase tracking-[0.3em] text-slate-400">{label}</p>
    <p className="mt-3 text-2xl font-semibold text-white">{value}</p>
    <p className="mt-2 text-xs text-slate-400">{helper}</p>
  </div>
);

const toCurrency = (value: number) =>
  new Intl.NumberFormat("ja-JP", { style: "currency", currency: "JPY" }).format(value);

const ItemList = () => {
  const [query, setQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("すべて");
  const [sortOption, setSortOption] = useState<SortOption>("default");

  const categories = useMemo(
    () => ["すべて", ...Array.from(new Set(items.map((item) => item.category)))],
    []
  );

  const stats = useMemo(() => {
    const total = items.length;
    const uniqueCategories = new Set(items.map((item) => item.category)).size;
    const lowStock = items.filter((item) => item.stock === "残りわずか").length;
    const backOrder = items.filter((item) => item.stock === "入荷待ち").length;
    const averagePrice =
      total === 0
        ? 0
        : Math.round(
            items.reduce((sum, item) => sum + item.price, 0) / Math.max(1, total)
          );

    return {
      total,
      uniqueCategories,
      lowStock,
      backOrder,
      averagePrice,
    };
  }, []);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    const filtered = items.filter((item) => {
      const matchesCategory =
        categoryFilter === "すべて" || item.category === categoryFilter;

      if (!normalizedQuery) {
        return matchesCategory;
      }

      const matchesQuery = [item.name, item.description, ...item.tags]
        .join(" ")
        .toLowerCase()
        .includes(normalizedQuery);

      return matchesCategory && matchesQuery;
    });

    if (sortOption === "price-asc" || sortOption === "price-desc") {
      const direction = sortOption === "price-asc" ? 1 : -1;
      return filtered.slice().sort((a, b) => (a.price - b.price) * direction);
    }

    if (sortOption === "stock") {
      const priority: Record<StockStatus, number> = {
        在庫あり: 2,
        残りわずか: 0,
        入荷待ち: 1,
      };
      return filtered
        .slice()
        .sort((a, b) => priority[a.stock] - priority[b.stock] || a.id - b.id);
    }

    return filtered;
  }, [categoryFilter, query, sortOption]);

  const sortOptions: { value: SortOption; label: string; description: string }[] = [
    { value: "default", label: "おすすめ順", description: "元の並び順" },
    { value: "price-asc", label: "価格が安い順", description: "低価格を優先" },
    { value: "price-desc", label: "価格が高い順", description: "高価格を優先" },
    { value: "stock", label: "在庫状況順", description: "残りわずかを優先" },
  ];

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center px-4 py-10 sm:px-6 sm:py-12">
      <div className="w-full max-w-6xl space-y-10">
        <header className="space-y-4 text-center sm:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-1 text-xs font-medium uppercase tracking-[0.35em] text-slate-300">
            アイテム一覧
          </span>
          <h1 className="text-balance text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
            必要なリソースを検索・比較できます
          </h1>
          <p className="text-balance text-sm text-slate-300 sm:text-base">
            キーワード検索やカテゴリーで絞り込み、各アイテムの詳細ページへ直接移動できます。
          </p>
        </header>

        <section className="grid gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow-lg sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="登録アイテム"
            value={`${stats.total}件`}
            helper="公開中のコンテンツ"
          />
          <StatCard
            label="カテゴリー数"
            value={`${stats.uniqueCategories}種`}
            helper="多角的に検索"
          />
          <StatCard
            label="残りわずか"
            value={`${stats.lowStock}件`}
            helper="優先確認をおすすめ"
            tone="amber"
          />
          <StatCard
            label="平均価格"
            value={stats.averagePrice === 0 ? "無料" : toCurrency(stats.averagePrice)}
            helper="概算の相場感"
            tone="sky"
          />
        </section>

        <section className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 shadow-lg">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <label className="flex w-full flex-col gap-2 text-left lg:max-w-md">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">
                キーワード検索
              </span>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="アイテム名、説明、タグで検索"
                className="w-full rounded-lg border border-slate-700 bg-slate-950 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:border-sky-500 focus:outline-none focus:ring-2 focus:ring-sky-500/50"
              />
            </label>

            <div className="flex flex-col gap-2 text-left text-xs text-slate-400 sm:flex-row sm:items-center sm:justify-end sm:gap-4">
              <div>
                カテゴリー: {categoryFilter === "すべて" ? "全件" : categoryFilter}
              </div>
              <div>検索結果: {filteredItems.length}件</div>
              <label className="flex w-full max-w-[220px] items-center gap-2 rounded-lg border border-slate-700 bg-slate-950 px-3 py-2 text-slate-300 focus-within:border-sky-500 focus-within:ring-2 focus-within:ring-sky-500/50">
                <span className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                  Sort
                </span>
                <select
                  value={sortOption}
                  onChange={(event) => setSortOption(event.target.value as SortOption)}
                  className="w-full bg-transparent text-xs font-medium text-slate-100 focus:outline-none"
                >
                  {sortOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          </div>

          <div className="flex gap-2 overflow-x-auto rounded-lg border border-slate-800 bg-slate-950/60 p-2">
            {categories.map((category) => {
              const isActive = category === categoryFilter;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setCategoryFilter(category)}
                  className={`whitespace-nowrap rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/60 ${
                    isActive
                      ? "border-sky-500 bg-sky-500/20 text-sky-100"
                      : "border-slate-700 bg-slate-900 text-slate-300 hover:border-slate-500 hover:text-slate-100"
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </section>

        <section>
          {filteredItems.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-900/40 px-6 py-12 text-center text-sm text-slate-400">
              条件に一致するアイテムが見つかりませんでした。検索ワードやカテゴリーを変更してみてください。
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {filteredItems.map((item) => (
                <article
                  key={item.id}
                  className="flex h-full flex-col gap-5 rounded-2xl border border-slate-800 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-950/80 p-6 shadow-sm transition-transform hover:-translate-y-1 hover:border-sky-500/40 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-2">
                      <h2 className="text-lg font-semibold text-white sm:text-xl">
                        {item.name}
                      </h2>
                      <span className="inline-flex items-center rounded-full border border-slate-700 bg-slate-900 px-2.5 py-1 text-xs font-medium text-slate-300">
                        {item.category}
                      </span>
                    </div>
                    <span
                      className={`inline-flex items-center gap-2 rounded-full border px-2.5 py-1 text-xs font-semibold ${stockBadgeStyles[item.stock]}`}
                    >
                      {item.stock}
                    </span>
                  </div>

                  <p className="flex-1 text-sm leading-relaxed text-slate-300">
                    {item.description}
                  </p>

                  <dl className="grid gap-3 text-sm text-slate-300">
                    <div className="flex items-center justify-between rounded-lg border border-slate-800 bg-slate-950/40 px-3 py-2 text-slate-100">
                      <dt className="text-xs uppercase tracking-[0.2em] text-slate-400">
                        価格
                      </dt>
                      <dd className="text-base font-semibold text-sky-200">
                        {item.price === 0 ? "無料" : toCurrency(item.price)}
                      </dd>
                    </div>
                    <div className="space-y-2 text-xs text-slate-400">
                      <dt className="uppercase tracking-[0.2em] text-slate-500">
                        タグ
                      </dt>
                      <dd className="flex flex-wrap gap-2">
                        {item.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full border border-slate-700 bg-slate-900 px-3 py-1 text-[11px] text-slate-300"
                          >
                            {tag}
                          </span>
                        ))}
                      </dd>
                    </div>
                  </dl>

                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="inline-flex items-center justify-center gap-2 rounded-lg border border-sky-500/50 bg-sky-500/10 px-4 py-2 text-sm font-semibold text-sky-100 transition-all hover:-translate-y-px hover:bg-sky-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/60"
                  >
                    詳細ページへ <span aria-hidden>↗</span>
                  </a>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default ItemList;
