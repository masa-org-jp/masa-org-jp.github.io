type ResourceLink = {
  id: string;
  label: string;
  href: string;
  description: string;
};
const stripProtocol = (href: string) => href.replace(/^https?:\/\//, "");

const resources: ResourceLink[] = [
  {
    id: "item-list",
    label: "アイテム一覧",
    href: "https://masa-org-jp.github.io/itemlist",
    description: "プロジェクトで現在利用できるアイテムの一覧を確認できます。",
  },
  {
    id: "item-detail",
    label: "アイテム詳細",
    href: "https://masa-org-jp.github.io/itemdetail/7",
    description: "アイテム #7 の本番相当データとレイアウトを確認できます。",
  },
  {
    id: "item-detail-android",
    label: "アイテム詳細（Android）",
    href: "https://masa-org-jp.github.io/itemdetail/7?android_app=true",
    description: "Android 向けのクエリパラメーター付きで同じ詳細ルートを開きます。",
  },
  {
    id: "missing-route",
    label: "近日公開のルート",
    href: "https://masa-org-jp.github.io/notexist",
    description: "公開前に 404 の挙動を検証するためのプレースホルダーです。",
  },
];

const ResourceCard = ({ resource }: { resource: ResourceLink }) => {
  const baseClass =
    "group relative flex h-full w-full flex-col gap-3 rounded-xl border border-slate-800 bg-slate-900/60 px-5 py-5 shadow-sm transition-colors hover:border-slate-600 hover:bg-slate-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 sm:px-6";

  const content = (
    <>
      <h3 className="text-base font-semibold text-white sm:text-lg">{resource.label}</h3>
      <p className="text-sm leading-relaxed text-slate-300 sm:text-base sm:leading-relaxed">
        {resource.description}
      </p>
      <div className="flex flex-wrap items-center justify-between gap-y-1 text-xs text-slate-400 sm:flex-nowrap">
        <span className="max-w-full truncate font-mono text-[11px] sm:text-xs">
          {stripProtocol(resource.href)}
        </span>
        <span className="inline-flex items-center gap-1 text-sm font-medium text-sky-300">
          開く <span aria-hidden>→</span>
        </span>
      </div>
    </>
  );

  return (
    <a
      href={resource.href}
      target="_blank"
      rel="noreferrer noopener"
      className={baseClass}
    >
      {content}
    </a>
  );
};

function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center px-4 py-10 sm:px-6 sm:py-12">
      <div className="w-full max-w-5xl space-y-8 sm:space-y-10">
        <header className="space-y-4 text-center sm:text-left">
          <span className="inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/60 px-4 py-1 text-xs font-medium uppercase tracking-[0.35em] text-slate-300">
            MASA Org リンク
          </span>
          <h1 className="text-balance text-2xl font-semibold text-white sm:text-3xl md:text-4xl">
            必要なルートへすぐアクセス
          </h1>
          <p className="text-balance text-sm text-slate-300 sm:text-base">
            公開中のエクスペリエンスに素早く移動し、プレビュービルドを試し、今後の計画もチェックできます。
          </p>
        </header>

        <section>
          <div className="grid gap-4">
            {resources.map((resource) => (
              <ResourceCard key={resource.id} resource={resource} />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

export default App;
