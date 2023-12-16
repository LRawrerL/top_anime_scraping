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

    const firstTitle = async () => {
        return await page.evaluate(() => {
            const data = document.querySelector(".ranking-list");
            const rank = data.querySelector(".top-anime-rank-text").innerHTML;
            const title = data.querySelector(".anime_ranking_h3").innerText;
            const score = data.querySelector(".score-label").innerText;
            const information = data.querySelector(".information").innerText
            return {rank, title, score, information};
        });
    };
    
    const getTitlesFromPage = async () => {
        return await page.evaluate(() => {
            const data = document.querySelectorAll(".ranking-list");
            
            return Array.from(data).map((show) => {
                const rank = show.querySelector(".top-anime-rank-text").innerHTML;
                const title = show.querySelector(".anime_ranking_h3").innerText;
                const score = show.querySelector(".score-label").innerText;
                const information = show.querySelector(".information").innerText
                return {rank, title, score, information};
            });
        });
    };
    
    let pages = 1;
    while(pages < 6) {
        let allTitlesInaPage = await getTitlesFromPage();
        console.log(allTitlesInaPage);
        //waits for selector to load incase it doesn't
        await page.waitForSelector(".next");
        await page.click(".next");
        //waits to give time for context to load
        await Promise.race([
            new Promise(resolve => setTimeout(resolve, 5000))
        ]);
        pages++;
    }
    await browser.close();
}
getTitles();