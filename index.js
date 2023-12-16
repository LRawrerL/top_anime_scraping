import puppeteer from "puppeteer";

const getTitles =  async () => {

    const browser = await puppeteer.launch({
        headless: false,
        defaultViewport: null,
    });

    const page = await browser.newPage();

    await page.goto("https://myanimelist.net/topanime.php" ,{
        waitUntil: "domcontentloaded",
    });

    const firstTitle = await page.evaluate(() => {
        const data = document.querySelector(".ranking-list");
        const rank = data.querySelector(".top-anime-rank-text").innerHTML;
        const title = data.querySelector(".anime_ranking_h3").innerText;
        const score = data.querySelector(".score-label").innerText;
        const information = data.querySelector(".information").innerText
        return {rank, title, score, information};
    });

    console.log(firstTitle);
    await browser.close();
}

getTitles();