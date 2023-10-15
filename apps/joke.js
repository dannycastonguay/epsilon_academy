import { ask } from '../common.js';

export async function joke() {
    const j = Math.floor(Math.random() * 11) + 1;
    switch (j) {
      case 1:
        return "Knock, knock. Who's there? Copycat. Copycat who? Copycat who?";
      case 2:
        return "Why was the math book sad? Because it had too many problems.";
      case 3:
        return "How do you organize a space party? You “planet”!";
      case 4:
        return "What do you call a fish with no eyes? Fsh.";
      case 5:
        return "How does a penguin build its house? Igloos it together.";
      case 6:
        return "What did one wall say to the other wall? “I'll meet you at the corner!”";
      case 7:
        return "Why did the scarecrow win an award? Because he was outstanding in his field!";
      case 8:
        return "What kind of tree fits in your hand? A palm tree.";
      case 9:
        return "What's the best thing about Switzerland? I don't know, but the flag is a big plus.";
      case 10:
        return "Why do we tell actors to “break a leg?” Because every play has a cast";
      case 11:
        return "Hah! Jokes on YOU.";
      default:
        return "Invalid number.";
    }
}

