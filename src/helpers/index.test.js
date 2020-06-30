import {getLetterMatchCount} from './index';


describe('getLetterMatchCount',() => {
    const secretWord ='party';
    test("returns the correct count when there are no matching letters", () => {
        const LetterMatchCount = getLetterMatchCount("bones", secretWord);
        expect(LetterMatchCount).toBe(0);
    });
    test("returns the correct count when there are 3 matching letters", () => {
        const LetterMatchCount = getLetterMatchCount("train", secretWord);
        expect(LetterMatchCount).toBe(3);
    });
    test("returns the correct count when there are duplicate letters letters", () => {
        const LetterMatchCount = getLetterMatchCount("parka", secretWord);
        expect(LetterMatchCount).toBe(3);
    });
})
