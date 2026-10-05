// 배포본과 저장소 프로토타입을 같은 7개 화면으로 찍어 픽셀 단위로 비교한다.
// 애니메이션은 멈추고 캐럿은 숨긴다. 차이가 하나라도 있으면 실패(종료 코드 1).
import { chromium } from "playwright";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const DEPLOYED = process.env.DEPLOYED_URL || "https://01-ml-mercari-price-2608.vercel.app/redesign/";
const PROTO = process.env.PROTO_PATH || path.resolve(here, "../prototype/index.html");
const OUT = path.join(here, "out");
const FREEZE = "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}";
const SHOTS = ["01_asis", "02_proposal", "03_proposal_modal", "05_proposal_toast", "04_input", "06_input_twostep2", "07_after_submit"];

async function capture(url, dir) {
  fs.mkdirSync(dir, { recursive: true });
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true });
  const page = await ctx.newPage();
  await page.goto(url, { waitUntil: "networkidle" });
  await page.addStyleTag({ content: FREEZE });
  await page.waitForTimeout(2500);
  const shot = (n) => page.screenshot({ path: path.join(dir, n + ".png") });
  await shot("01_asis");
  await page.click("#dgAsIs"); await page.waitForTimeout(6000); await shot("02_proposal");
  await page.click("#aiExplanationBtn"); await page.waitForTimeout(1200); await shot("03_proposal_modal");
  await page.click("#closeInfoModal").catch(() => {}); await page.waitForTimeout(800);
  await page.click("#applyAiPriceBtn"); await page.waitForTimeout(500); await shot("05_proposal_toast");
  await page.waitForTimeout(3000);
  await page.click("#priceDisplayBox"); await page.waitForTimeout(1500); await shot("04_input");
  await page.evaluate(() => goToTwoStep(2)); await page.waitForTimeout(1200); await shot("06_input_twostep2");
  await page.click("#backToProposalChip").catch(() => {}); await page.waitForTimeout(1200);
  await page.click("#submitPriceBtn").catch(() => {}); await page.waitForTimeout(1500); await shot("07_after_submit");
  await browser.close();
}

function diffCount(aPath, bPath) {
  const a = PNG.sync.read(fs.readFileSync(aPath)), b = PNG.sync.read(fs.readFileSync(bPath));
  if (a.width !== b.width || a.height !== b.height) return { size: `${a.width}x${a.height} vs ${b.width}x${b.height}`, count: -1 };
  const out = new PNG({ width: a.width, height: a.height });
  const count = pixelmatch(a.data, b.data, out.data, a.width, a.height, { threshold: 0 });
  return { count };
}

const dep = path.join(OUT, "deployed"), pro = path.join(OUT, "proto");
await capture(DEPLOYED, dep);
await capture(pathToFileURL(PROTO).href, pro);
let failed = 0;
for (const s of SHOTS) {
  const r = diffCount(path.join(dep, s + ".png"), path.join(pro, s + ".png"));
  const ok = r.count === 0;
  if (!ok) failed++;
  console.log(`${ok ? "SAME" : "DIFF"}  ${s}  ${r.size ? "size " + r.size : "px " + r.count}`);
}
console.log(failed === 0 ? "\n결과: 7개 화면 전부 배포본과 픽셀 차이 0" : `\n결과: ${failed}개 화면에서 차이`);
process.exit(failed === 0 ? 0 : 1);
