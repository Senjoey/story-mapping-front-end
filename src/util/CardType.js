class CardType {
    constructor(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }
}

CardType.STORY = new CardType('story');
CardType.TASK = new CardType('task');
CardType.ACTIVITY = new CardType('activity');

Object.freeze(CardType);               // 冻结对象，防止修改

export {CardType}
