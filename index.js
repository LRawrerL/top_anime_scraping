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

    let isTherePage = true;

    while(isTherePage){
        const allTitlesInaPage = await page.evaluate(() => {
            const data = document.querySelectorAll(".ranking-list");
            
            return Array.from(data).map((show) => {
                const rank = show.querySelector(".top-anime-rank-text").innerHTML;
                const title = show.querySelector(".anime_ranking_h3").innerText;
                const score = show.querySelector(".score-label").innerText;
                const information = show.querySelector(".information").innerText
                return {rank, title, score, information};
            });
        });
        console.log(allTitlesInaPage);
        isTherePage = await page.$(".next");
        await page.click(".next");
    }
}

getTitles();