import { ask } from '../common.js';

export async function dragon() {
    const gender = await ask("You have been reincarnated as a dragon. Are you a [boy], a [girl], or something_else?");
    const dragonType = (await ask(`Okay, you are a ${gender}. Are you a [Seawing], [Rainwing], [Nightwing], [Mudwing], [Sandwing], or [Skywing]?`)).toLowerCase();

    let description;

    switch (dragonType) {
      case "seawing":
        description = "A seawing is a dragon that can breathe underwater, they have glowing scales to communicate.";
        break;
      case "rainwing":
        description = "A rainwing has color-changing scales, and can spit venom. But they have to have their suntime during the day.";
        break;
      case "nightwing":
        description = "Nightwings are nocturnal dragons, they are black to mimic the night sky with stars below their wings. And can breathe fire.";
        break;
      case "mudwing":
        description = "Mudwings are large and bulky dragons, they like to stay in a pack with their siblings and can breathe underwater for 2 hours.";
        break;
      case "sandwing":
        description = "These dragons are specially accustomed to the desert, they have a poisonous barb on their tail and their scales generate warmth.";
        break;
      case "skywing":
        description = "Skywings are tall dragons with large wings, they are the fastest flying dragons, they can breathe fire.";
        break;
      default:
        description = `What's a ${dragonType}? You aren't even a dragon!!`;
    }

    const option = await ask(`You have chosen to be a ${dragonType}.\n${description}\nAre you sure you want to be this dragon [yes] or [no]`);
    if (option.toLowerCase() === "yes") {
      const result = await story(gender, dragonType);
      console.log(result);
    } else {
      const newDragonType = (await ask("Are you a [Seawing], [Rainwing], [Nightwing], [Mudwing], [Sandwing], or [Skywing]?")).toLowerCase();
      dragon(newDragonType); // Recursive call with the new choice // @p: wow you are using recursions!
    }
}

// @p: this is hilarious that you call story from inside dragon. There's a more elegant way to achieve your objectives
async function story(gender, dragonType) {
    const intro = (await ask(`You wake up as a ${gender} ${dragonType} dragon in your egg.\nWhat will you do?\n[1] Break out of the egg\n[2] Stay in the egg`)).trim();

    switch (intro) {
      case "one":description = "You burst out of your egg, floating in the water. Your mother picks you up into her arms.";
      case "two":description = "You decide it's too scary and wait inside the egg for a while.";
    }
}
