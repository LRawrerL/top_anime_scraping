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
        const title = document.querySelector(".ranking-list").innerHTML;
        return {title};
    });

    console.log(firstTitle);
    await browser.close();
}

getTitles();