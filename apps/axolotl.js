import { ask } from '../common.js';

export async function axolotl() {
    const gender = await ask("You have been reincarnated as an axolotl. Are you a [boy](cmd://boy), a [girl](cmd://girl), or something else (for instance: a [banana](cmd://banana))?");
    const axolotlType = await ask(`Okay, you are a ${gender}. Are you a [Wild Type](cmd://wild type), [Leucistic](cmd://leucistic), [Albino](cmd://albino), [Golden](cmd://golden), [Melanoid](cmd://melanoid), [Piebald](cmd://piebald), [Chimera](cmd://chimera), [Copper](cmd://copper), [Green Fluorescent Protein](cmd://green fluorescent protein), or [Axanthic](cmd://axanthic)?`);

    switch (axolotlType.toLowerCase()) {
        case "wild type":
        return "Your skin is natural, with dark pigmentation and specks of lighter color.";
        case "leucistic":
        return "Your skin is pale or white, don't forget to put sunscreen on! And those red gills match well your rosy shoes! :-)";
        case "albino":
        return "You're completely white with pinkish gills and red eyes, like a little axolotl ghost!";
        case "golden":
        return "You shine with a golden-yellow skin, you're the axolotl with the Midas touch!";
        case "melanoid":
        return "You're dark and mysterious, almost like the Batman of axolotls!";
        case "piebald":
        return "You have irregular patches of white on a dark background, like a fashionable axolotl in polka dots!";
        case "chimera":
        return "You're a double dose of style, with two distinct color patterns on one body!";
        case "copper":
        return "You're unique with your copper-colored skin, quite the metalhead axolotl!";
        case "green fluorescent protein":
        return "You glow under UV light thanks to a special gene, you're the axolotl party light!";
        case "axanthic":
        return "You lack yellow pigment, giving you a cool grayish appearance, like a silver axolotl!";
        default:
        return `What's a ${axolotlType}? You're not even an axolotl!!`;
    }
}