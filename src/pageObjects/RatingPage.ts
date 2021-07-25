import Page from './page';

class RatingPage extends Page {

  get ratingLikes() {
    return browser.$$('//td[contains(@class, "has-text-success")]');
  }

  get ratingDislikes() {
    return browser.$$('//td[contains(@class, "has-text-danger")]');
  }


  open() {
    return super.open(`rating`);
  }

  waitForLoaded() {
    super.waitForLoaded();
    return browser.waitUntil(async () => {
      return (await browser.$('//table[contains(@class, "rating")]')).isExisting();
    });
  }
}

export default new RatingPage('Страница рейтинга имён');