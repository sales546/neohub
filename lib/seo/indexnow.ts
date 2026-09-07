const INDEXNOW_KEY = "7a3e9c1f2b4d680e5a19c0d8f6e247b1";
const HOST = "www.neohubspaces.in";
const KEY_LOCATION = `https://${HOST}/${INDEXNOW_KEY}.txt`;

export async function submitIndexNow(urls) {
  const list = (urls || []).filter(Boolean).slice(0, 100);
  if (!list.length) return { skipped: true };

  const res = await fetch("https://api.indexnow.org/indexnow", {
    method: "POST",
    headers: { "content-type": "application/json; charset=utf-8" },
    body: JSON.stringify({
      host: HOST,
      key: INDEXNOW_KEY,
      keyLocation: KEY_LOCATION,
      urlList: list,
    }),
  });

  return { status: res.status, ok: res.ok || res.status === 202 };
}
