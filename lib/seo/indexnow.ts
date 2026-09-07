const INDEXNOW_KEY = "7a3e9c1f2b4d680e5a19c0d8f6e247b1";

export async function submitIndexNow(urls, host = "www.neohubspaces.in") {
  const list = (urls || []).filter(Boolean).slice(0, 100);
  if (!list.length) return { skipped: true };

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host,
      key: INDEXNOW_KEY,
      keyLocation: `https://${host}/${INDEXNOW_KEY}.txt`,
      urlList: list,
    }),
  });

  return { status: res.status, ok: res.ok || res.status === 202, host };
}
