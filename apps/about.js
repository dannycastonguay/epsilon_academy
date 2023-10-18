import { ask, commandNames } from '../common.js';

export async function about() {
  const commandList = commandNames.map(cmd => `\`${cmd}\``).join('\n- ');

  return `
# Epsilon Academy: Ignite Your Infinite Curiosity

Welcome to Epsilon Academy 📚✨. Our focus is on fostering an enduring passion for learning.

## The Name Epsilon 

In mathematics, the symbol ℇ (Epsilon) is used to denote a small positive number. We find this symbolism fitting for our mission. Our goal is to ignite a spark of curiosity that, while small at the onset, has the potential to grow infinitely over time.
## Founders

- 🦉 **Danny**: The servant leader of the pack and clown in chief for this circus. He is a grown up now with a [resume](https://resume.dannycastonguay.com) and a [blog](https://blog.dannycastonguay.com).
- 🐘 **Pascale**: Named in honor of Blaise Pascal and Pierre de Fermat, whose groundbreaking work in probability theory laid the foundation for modern statistics and machine learning. Without their contributions, advanced technologies like GPT models would not be possible.
- 🐧 **Linus**: Inspired by Linus Torvalds, who exemplifies the profound impact one motivated individual can have. His work on Linux and Git underpins much of the modern internet, serving as an inspiration for our commitment to ambitious, collaborative projects.
- 🦋 **Ada**:  In homage to Ada Lovelace, the world's first programmer who worked with Charles Babbage on the Analytical Engine. As the daughter of the famed poet Lord Byron, Ada Lovelace brings a unique blend of arts and sciences, symbolizing our dedication to a diverse and interdisciplinary approach to technology.

## What We Do

We are learning about design, math, and science by buildling a product - this website. We meticulously and organically craft and publish this based on what we learn, following a semi-random walk.

## Commands to Try

- ${commandList}
  `;
}