import RatingPage from '../../src/pageObjects/RatingPage';
import allureReporter from "@wdio/allure-reporter";

describe('Проверка рейтинга котов', async() => {

  beforeEach(async () => {
    await RatingPage.open();
  });

  it('Проверка ТОП-10 лайков', async() => {
    const rating = await RatingPage.ratingLikes;

    const likesArray: number[] = [];
    for (const likes of rating) {
      const likesStr = await likes.getText();
      const likesNum = +likesStr;
      likesArray.push(likesNum);
    }
    console.log(`Исходный рейтинг лайков: ${likesArray}`);
    const likesSorted = likesArray.sort((a, b) => b-a);
    console.log(`Отсортированный по убыванию рейтинг лайков: ${likesSorted}`);

    allureReporter.startStep('Сравнение ТОП-10 лайков');
    allureReporter.addAttachment('Ожидаемое значение', `[ ${likesSorted.join(', ')} ]`, 'text/plain');
    allureReporter.addAttachment('Фактическое значение', `[ ${likesSorted.join(', ')} ]`, 'text/plain');
    expect(likesArray).toEqual(likesSorted);
    allureReporter.endStep();
  });

  it('Проверка ТОП-10 дизлайков', async() => {
    const rating = await RatingPage.ratingDislikes;

    const dislikesArray: number[] = [];
    for (const dislikes of rating) {
      const dislikesStr = await dislikes.getText();
      const dislikesNum = +dislikesStr;
      dislikesArray.push(dislikesNum);
    }
    console.log(`Исходный рейтинг дизлайков: ${dislikesArray}`);
    const dislikesSorted = dislikesArray.sort((a, b) => b-a);
    console.log(`Отсортированный по убыванию рейтинг дизлайков: ${dislikesSorted}`);

    allureReporter.startStep('Сравнение ТОП-10 дизлайков');
    allureReporter.addAttachment('Ожидаемое значение', `[ ${dislikesSorted.join(', ')} ]`, 'text/plain');
    allureReporter.addAttachment('Фактическое значение', `[ ${dislikesSorted.join(', ')} ]`, 'text/plain');
    expect(dislikesArray).toEqual(dislikesSorted);
    allureReporter.endStep();
  });
});