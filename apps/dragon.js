import { ask } from '../common.js';

export async function dragon() {
  const gender = await ask(`
  # Dragon 🐲🐲

  ## Character creation

  ### Gender

  You have been reincarnated as a dragon. Are you a [boy](cmd://boy), a [girl](cmd://girl), or something else?`);

  let happy = "no"
  let dragonType;

  while(happy !== "yes") {
    dragonType = (await ask(`
### Dragon type

Okay, you are a ${gender}. Are you a [Seawing](cmd://seawing), [Rainwing](cmd://rainwing), [Nightwing](cmd://nightwing), [Mudwing](cmd://mudwing), [Sandwing](cmd://sandwing), or [Skywing](cmd://skywing)?`)).toLowerCase();

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

    happy = (await ask(`You have chosen to be a ${dragonType}.\n${description}\nAre you sure you want to be this dragon [yes](cmd://yes) or [no](cmd://no)`)).toLowerCase();
  }

  const intro = (await ask(`
  ## The story begins

  You wake up as a ${gender} ${dragonType} dragon in your egg. What will you do? [Break](cmd://break) out of the egg or [Stay](cmd://stay) in the egg`));
//"break" isnt working
  switch (intro) {
    case "break" : return `You burst out of your egg, floating in the water. Your mother picks you up into her arms.

    # You stay`;
    case "stay" : return `You decide it's too scary and wait inside the egg for a while.

    # THE END`;
    default: return `# ERRORRRRRRRR
    That's not a story option. Bye!`;
  }

}
