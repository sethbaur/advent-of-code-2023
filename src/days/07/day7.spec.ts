import { parseData } from "../../shared";
import { createHand, Card, compareHands, HandType, evaluateHand, getWinnings } from "./part1";
import { Card as Card2, evalHand, getWinnings as getWinnings2, createHand as createHand2 } from "./part2";

const sampleData = `
32T3K 765
T55J5 684
KK677 28
KTJJT 220
QQQJA 483
`;

const data = parseData(sampleData);

describe("day 7, part 1", () => {
  test("createHand", () => {
    expect(createHand("32T3K 765")).toEqual({
      cards: [Card.Three, Card.Two, Card.Ten, Card.Three, Card.King],
      bid: 765,
      type: HandType.Pair,
    });
  });

  test("compareHands (equal)", () => {
    const hand1 = createHand("32T3K 765")
    const hand2 = createHand("32T3K 765")
    expect(compareHands(hand1, hand2)).toBe(0);
  });

  test("compareHands (matching type)", () => {
    const hand1 = createHand("44223 765");
    const hand2 = createHand("AAKKJ 765");
    expect(compareHands(hand1, hand2)).toBe(-1);

    const hand3 = createHand("3K223 765");
    const hand4 = createHand("33KKJ 765");
    expect(compareHands(hand3, hand4)).toBe(1);
  });

  test("compareHands (first wins)", () => {
    const hand1 = createHand("22222 765");
    const hand2 = createHand("32T3K 765");
    expect(compareHands(hand1, hand2)).toBe(1);
  });

  test("compareHands (second wins)", () => {
    const hand1 = createHand("32T3K 765");
    const hand2 = createHand("AAAKK 765");
    expect(compareHands(hand1, hand2)).toBe(-1);
  });

  test("evaluateHand", () => {
    expect(evaluateHand([Card.Three, Card.Two, Card.Ten, Card.Three, Card.King])).toBe(HandType.Pair);
    expect(evaluateHand([Card.Two, Card.Two, Card.Two, Card.Two, Card.Two])).toBe(HandType.FiveOfAKind);
    expect(evaluateHand([Card.King, Card.Two, Card.Two, Card.Two, Card.Two])).toBe(HandType.FourOfAKind);
    expect(evaluateHand([Card.King, Card.Two, Card.Jack, Card.Two, Card.Two])).toBe(HandType.ThreeOfAKind);
    expect(evaluateHand([Card.King, Card.Two, Card.Jack, Card.Jack, Card.Two])).toBe(HandType.TwoPair);
    expect(evaluateHand([Card.Jack, Card.Two, Card.Jack, Card.Jack, Card.Two])).toBe(HandType.FullHouse);
    expect(evaluateHand([Card.Queen, Card.Two, Card.Ten, Card.Three, Card.King])).toBe(HandType.High);
  });

  test("part 1", () => {
    expect(getWinnings(data)).toBe(6440);
  });
});

describe("day 7, part 2", () => {
  test.only("evalHandWithJoker", () => {
    expect(evalHand([Card2.Joker, Card2.Two, Card2.Joker, Card2.Joker, Card2.Two])).toBe(HandType.FiveOfAKind);
    expect(evalHand([Card2.Joker, Card2.Joker, Card2.Joker, Card2.Five, Card2.Two])).toBe(HandType.FourOfAKind);
    expect(evalHand([Card2.Joker, Card2.Joker, Card2.Five, Card2.Five, Card2.Six])).toBe(HandType.FourOfAKind);
    expect(evalHand([Card2.Five, Card2.Joker, Card2.Seven, Card2.King, Card2.Six])).toBe(HandType.Pair);
    expect(evalHand([Card2.Five, Card2.Joker, Card2.Five, Card2.King, Card2.Six])).toBe(HandType.ThreeOfAKind);
    expect(evalHand([Card2.Joker, Card2.Joker, Card2.Five, Card2.King, Card2.Six])).toBe(HandType.ThreeOfAKind);
    expect(evalHand([Card2.Joker, Card2.Five, Card2.Five, Card2.Six, Card2.Six])).toBe(HandType.FullHouse);
    expect(evalHand([Card2.Ten, Card2.Five, Card2.Five, Card2.Joker, Card2.Five])).toBe(HandType.FourOfAKind);
    expect(evalHand([Card2.Joker, Card2.Joker, Card2.Five, Card2.Six, Card2.Seven])).toBe(HandType.ThreeOfAKind);
  });

  test("compareHands", () => {
    const hand1 = createHand2("JJJJJ 765")
    const hand2 = createHand2("44444 765")
    expect(compareHands(hand1, hand2)).toBe(-1);

    const hand3 = createHand2("JJJJJ 765")
    const hand4 = createHand2("22244 765")
    expect(compareHands(hand3, hand4)).toBe(1);
  });

  test("part 2", () => {
    expect(getWinnings2(data)).toBe(5905);
  });
});
