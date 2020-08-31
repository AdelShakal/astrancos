//=============================================================================
// VisuStella MZ - Battle Core
// VisuMZ_1_BattleCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_BattleCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.BattleCore = VisuMZ.BattleCore || {};
VisuMZ.BattleCore.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.01] [BattleCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Battle_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Battle Core plugin revamps the battle engine provided by RPG Maker MZ to
 * become more flexible, streamlined, and support a variety of features. The
 * updated battle engine allows for custom Action Sequences, battle layout
 * styles, and a lot of control over the battle mechanics, too.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Action Sequence Plugin Commands to give you full control over what happens
 *   during the course of a skill or item.
 * * Animated Sideview Battler support for enemies!
 * * Auto Battle options for party-wide and actor-only instances.
 * * Base Troop Events to quickly streamline events for all Troop events.
 * * Battle Command control to let you change which commands appear for actors.
 * * Battle Layout styles to change the way the battle scene looks.
 * * Casting animation support for skills.
 * * Critical Hit control over the success rate formula and damage multipliers.
 * * Custom target scopes added for skills and items.
 * * Damage formula control, including Damage Styles.
 * * Damage caps, both hard caps and soft caps.
 * * Damage traits such Armor Penetration/Reduction to bypass defenses.
 * * Elements & Status Menu Core support for traits.
 * * Multitude of JavaScript notetags and global Plugin Parameters to let you
 *   make a variety of effects across various instances during battle.
 * * Party Command window can be skipped/disabled entirely.
 * * Weather effects now show in battle.
 * * Streamlined Battle Log to remove redundant information and improve the
 *   flow of battle.
 * * Visual HP Gauges can be displayed above the heads of actors and/or enemies
 *   with a possible requirement for enemies to be defeated at least once first
 *   in order for them to show.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 1 ------
 *
 * This plugin is a Tier 1 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ library.
 *
 * ============================================================================
 * Major Changes
 * ============================================================================
 *
 * This plugin will overwrite some core parts of the RPG Maker MZ base code in
 * order to ensure the Battle Core plugin will work at full capacity. The
 * following are explanations of what has been changed.
 *
 * ---
 *
 * Action Sequences
 *
 * - Action sequences are now done either entirely by the Battle Log Window or
 * through common events if the <Custom Action Sequence> notetag is used.
 * In RPG Maker MZ by default, Action Sequences would be a mixture of using the
 * Battle Log Window, the Battle Manager, and the Battle Scene, making it hard
 * to fully grab control of the situation.
 *
 * ---
 *
 * Action Speed
 *
 * - Action speeds determine the turn order in the default battle system. The
 * AGI of a battle unit is also taken into consideration. However, the random
 * variance applied to the action speed system makes the turn order extremely
 * chaotic and hard for the player to determine. Thus, the random variance
 * aspect of it has been turned off. This can be reenabled by default through
 * Plugin Parameters => Mechanics Settings => Allow Random Speed?
 *
 * ---
 *
 * Animated Sideview Battler Support For Enemies
 *
 * - Enemies can now use Sideview Actor sprites for themselves! They will
 * behave like actors and can even carry their own set of weapons for physical
 * attacks. These must be set up using notetags. More information can be found
 * in the notetag section.
 *
 * - As the sprites are normally used for actors, some changes have been made
 * to Sprite_Actor to be able to support both actors and enemies. These changes
 * should have minimal impact on other plugins.
 *
 * ---
 *
 * Battle Sprite Updates
 *
 * - A lot of functions in Sprite_Battler, Sprite_Actor, and Sprite_Enemy have
 * been overwritten to make the new Action Sequence system added by this plugin
 * possible. These changes make it possible for the sprites to move anywhere on
 * the screen, jump, float, change visibility, and more.
 *
 * ---
 *
 * Change Battle Back in Battle
 * 
 * - By default, the Change Battle Back event command does not work in battle.
 * Any settings made to it will only reflect in the following battle. Now, if
 * the battle back event command is used during battle, it will reflect upon
 * any new changes immediately.
 *
 * ---
 *
 * Critical Hit - LUK Influence
 *
 * - The LUK Buffs now affect the critical hit rate based off how the formula
 * is now calculated. Each stack of a LUK Buff will double the critical hit
 * rate and compound upon that. That means a x1 LUK Buff stack will raise it by
 * x2, a x2 LUK Buff stack will raise the critical hit rate by x4, a x3 LUK
 * Buff Stack will raise the critical hit rate stack by x8, and so on.
 *
 * - LUK also plays a role in how much damage is dealt with critical hits. The
 * default critical hit multiplier has been reduced from x3 to x2. However, a
 * percentage of LUK will added on (based off the user's CRI rate) onto the
 * finalized critical damage. If the user's CRI rate is 4%, then 4% of the user
 * LUK value will also be added onto the damage.
 *
 * - This change can be altered through Plugin Parameters => Damage Settings =>
 * Critical Hits => JS: Rate Formula and JS: Damage Formula.
 *
 * ---
 * 
 * Damage Popups
 * 
 * - Damage popups are now formatted with + and - to determine healing and
 * damage. MP Damage will also include "MP" at the back. This is to make it
 * clearer what each colored variant of the damage popup means as well as help
 * color blind players read the on-screen data properly.
 * 
 * ---
 *
 * Force Action
 *
 * - Previously, Forced Actions would interrupt the middle of an event to
 * perform an action. However, with the addition of more flexible Action
 * Sequences, the pre-existing Force Action system would not be able to exist
 * and would require being remade.
 *
 * - Forced Actions now are instead, added to a separate queue from the action
 * battler list. Whenever an action and/or common event is completed, then if
 * there's a Forced Action battler queued, then the Forced Action battler will
 * have its turn. This is the cleanest method available and avoids the most
 * conflicts possible.
 *
 * - This means if you planned to make cinematic sequences with Forced Actions,
 * you will need to account for the queued Force Actions. However, in the case
 * of battle cinematics, we would highly recommend that you use the newly added
 * Action Sequence Plugin Commands instead as those give you more control than
 * any Force Action ever could.
 *
 * ---
 *
 * Random Scope
 *
 * - The skill and item targeting scopes for Random Enemy, 2 Random Enemies,
 * 3 Random Enemies, 4 Random Enemies will now ignore TGR and utilize true
 * randomness.
 *
 * ---
 *
 * Spriteset_Battle Update
 *
 * - The spriteset now has extra containers to separate battlers (actors and
 * enemies), animations, and damage. This is to make actors and enemy battler
 * sprites more efficient to sort (if enabled), so that animations won't
 * interfere with and cover damage sprites, and to make sure damage sprites are
 * unaffected by screen tints in order to ensure the player will always have a
 * clear read on the information relaying sprites.
 *
 * ---
 *
 * Weather Displayed in Battle
 *
 * - Previously, weather has not been displayed in battle. This means that any
 * weather effects placed on the map do not transfer over to battle and causes
 * a huge disconnect for players. The Battle Core plugin will add weather
 * effects to match the map's weather conditions. Any changes made to weather
 * through event commands midway through battle will also be reflected.
 *
 * ---
 *
 * ============================================================================
 * Base Troops
 * ============================================================================
 *
 * Base Troops can be found, declared, and modified in the Plugin Parameters =>
 * Mechanics Settings => Base Troop ID's. All of the listed Troop ID's here
 * will have their page events replicated and placed under all other troops
 * found in the database.
 *
 * ---
 *
 * This means that if you have an event that runs on Turn 1 of a Base Troop,
 * then for every troop out there, that same event will also run on Turn 1,
 * as well. This is useful for those who wish to customize their battle system
 * further and to reduce the amount of work needed to copy/paste said event
 * pages into every database troop object manually.
 *
 * ---
 *
 * ============================================================================
 * Damage Styles
 * ============================================================================
 *
 * Damage Styles are a new feature added through the Battle Core plugin. When
 * using certain Battle Styles, you can completely ignore typing in the whole
 * damage formula inside the damage formula input box, and instead, insert
 * either a power amount or a multiplier depending on the Damage Style. The
 * plugin will then automatically calculate damage using that value factoring
 * in ATK, DEF, MAT, MDF values.
 *
 * ---
 *
 * Here is a list of the Damage Styles that come with this plugin by default.
 * You can add in your own and even edit them to your liking.
 * Or just remove them if you want.
 *
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Style          Use Formula As   PH/MA Disparity   Stat Scale   Damage Scale
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Standard       Formula          No                Varies       Varies
 * ArmorScaling   Formula          No                Varies       Varies
 * CT             Multiplier       Yes               Low          Normal
 * D4             Multiplier       No                High         Normal
 * DQ             Multiplier       No                Low          Low
 * FF7            Power            Yes               Low          High
 * FF8            Power            Yes               Medium       Normal
 * FF9            Power            Yes               Low          Normal
 * FF10           Power            Yes               Medium       High
 * MK             Multiplier       No                Medium       Low
 * MOBA           Multiplier       No                Medium       Normal
 * PKMN           Power            No                Low          Normal
 *
 * Use the above chart to figure out which Damage Style best fits your game,
 * if you plan on using them.
 *
 * The 'Standard' style is the same as the 'Manual' formula input, except that
 * it allows for the support of <Armor Penetration> and <Armor Reduction>
 * notetags.
 *
 * The 'Armor Scaling' style allows you to type in the base damage calculation
 * without the need to type in any defending modifiers.
 *
 * NOTE: While these are based off the damage formulas found in other games,
 * not all of them are exact replicas. Many of them are adapted for use in
 * RPG Maker MZ since not all RPG's use the same set of parameters and not all
 * external multipliers function the same way as RPG Maker MZ.
 * 
 * ---
 *
 * Style:
 * - This is what the Damage Style is.
 *
 * Use Formula As:
 * - This is what you insert into the formula box.
 * - Formula: Type in the formula for the action just as you would normally.
 * - Multiplier: Type in the multiplier for the action.
 *     Use float values. This means 250% is typed out as 2.50
 * - Power: Type in the power constant for the action.
 *     Use whole numbers. Type in something like 16 for a power constant.
 * 
 * PH/MA Disparity:
 * - Is there a disparity between how Physical Attacks and Magical Attacks
 *   are calculated?
 * - If yes, then physical attacks and magical attacks will have different
 *   formulas used.
 * - If no, then physical attacks and magical attacks will share similar
 *   formulas for how they're calculated.
 *
 * Stat Scale:
 * - How much should stats scale throughout the game?
 * - Low: Keep them under 100 for the best results.
 * - Medium: Numbers work from low to mid 400's for best results.
 * - High: The numbers really shine once they're higher.
 *
 * Damage Scale:
 * - How much does damage vary depending on small parameter changes?
 * - Low: Very little increase from parameter changes.
 * - Normal: Damage scales close to proportionally with parameter changes.
 * - High: Damage can boost itself drastically with parameter changes.
 *
 * ---
 *
 * To determine what kind of parameters are used for the Damage Styles, they
 * will depend on two things: the action's 'Hit Type' (ie Physical Attack,
 * Magical Attack, and Certain Hit) and the action's 'Damage Type' (ie. Damage,
 * Recovery, or Drain).
 *
 * Certain Hit tends to use whichever value is higher: ATK or MAT, and then
 * ignores the target's defense values. Use Certain Hits for 'True Damage'.
 *
 * Use the chart below to figure out everything else:
 * 
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Hit Type      Damage Type   Attacker Parameter   Defender Parameter
 * - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - 
 * Physical      Damage        ATK                  DEF
 * Magical       Damage        MAT                  MDF
 * Certain Hit   Damage        Larger (ATK, MAT)    -Ignores-
 * Physical      Recover       DEF                  -Ignores-
 * Magical       Recover       MDF                  -Ignores-
 * Certain Hit   Recover       Larger (ATK, MAT)    -Ignores-
 * Physical      Drain         ATK                  DEF
 * Magical       Drain         MAT                  MDF
 * Certain Hit   Drain         Larger (ATK, MAT)    -Ignores-
 *
 * These can be modified within the Plugin Parameters in the individual
 * Damage Styles themselves.
 *
 * ---
 *
 * Skills and Items can use different Damage Styles from the setting you've
 * selected in the Plugin Parameters. They can be altered to have different
 * Damage Styles through the usage of a notetag:
 *
 * <Damage Style: name>
 *
 * This will use whichever style is found in the Plugin Parameters.
 *
 * If "Manual" is used, then no style will be used and all calculations will be
 * made strictly based off the formula found inside the formula box.
 *
 * ---
 *
 * ============================================================================
 * Notetags
 * ============================================================================
 *
 * The following are notetags that have been added through this plugin. These
 * notetags will not work with your game if this plugin is OFF or not present.
 * 
 * === HP Gauge-Related Notetags ===
 * 
 * The following notetags allow you to set whether or not HP Gauges can be
 * displayed by enemies regardless of Plugin Parameter settings.
 * 
 * ---
 *
 * <Show HP Gauge>
 *
 * - Used for: Enemy Notetags
 * - Will always show the HP Gauge for the enemy regardless of the defeat
 *   requirement setting.
 * - This does not bypass the player's Options preferences.
 * - This does not bypass disabling enemy HP Gauges as a whole.
 * 
 * ---
 *
 * <Hide HP Gauge>
 *
 * - Used for: Enemy Notetags
 * - Will always hide the HP Gauge for the enemy regardless of the defeat
 *   requirement setting.
 * - This does not bypass the player's Options preferences.
 * 
 * ---
 *
 * === Animation-Related Notetags ===
 *
 * The following notetags allow you to set animations to play at certain
 * instances and/or conditions.
 *
 * ---
 *
 * <Slip Animation: x>
 *
 * - Requires VisuMZ_0_CoreEngine!
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - During the phase at which the user regenerates HP, MP, or TP, this
 *   animation will play as long as the user is alive and visible.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * <Cast Animation: x>
 *
 * - Used for: Skill Notetags
 * - Plays a battle animation at the start of the skill.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * <Attack Animation: x>
 *
 * - Used for: Enemy Notetags
 * - Gives an enemy an attack animation to play for its basic attack.
 * - Replace 'x' with a number value representing the Animation ID to play.
 *
 * ---
 *
 * === Battleback-Related Notetags ===
 *
 * You can apply these notetags to have some control over the battlebacks that
 * appear in different regions of the map for random or touch encounters.
 *
 * ---
 *
 * <Region x Battleback1: filename>
 * <Region x Battleback2: filename>
 * 
 * - Used for: Map Notetags
 * - If the player starts a battle while standing on 'x' region, then the
 *   'filename' battleback will be used.
 * - Replace 'x' with a number representing the region ID you wish to use.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Castle1.png' will be only inserted
 *   as 'Castle1' without the '.png' at the end.
 * - *NOTE: This will override any specified battleback settings.
 *
 * ---
 *
 * === Battle Command-Related Notetags ===
 *
 * You can use notetags to change how the battle commands of playable
 * characters appear in battle as well as whether or not they can be used.
 *
 * ---
 *
 * <Seal Attack>
 * <Seal Guard>
 * <Seal Item>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Prevents specific battle commands from being able to be used.
 *
 * ---
 *
 * <Battle Commands>
 *  Attack
 *  Skills
 *  SType: x
 *  SType: name
 *  All Skills
 *  Skill: x
 *  Skill: name
 *  Guard
 *  Item
 *  Party
 *  Escape
 *  Auto Battle
 * </Battle Commands>
 *
 * - Used for: Class Notetags
 * - Changes which commands appear in the Actor Command Window in battle.
 *   If this notetag is not used, then the default commands determined in
 *   Plugin Parameters => Actor Command Window => Command List will be used.
 * - Add/remove/modify entries as needed.
 *
 * - Attack 
 *   - Adds the basic attack command.
 * 
 * - Skills
 *   - Displays all the skill types available to the actor.
 * 
 * - SType: x
 * - Stype: name
 *   - Adds in a specific skill type.
 *   - Replace 'x' with the ID of the skill type.
 *   - Replace 'name' with the name of the skill type (without text codes).
 *
 * - All Skills
 *   - Adds all usable battle skills as individual actions.
 * 
 * - Skill: x
 * - Skill: name
 *   - Adds in a specific skill as a usable action.
 *   - Replace 'x' with the ID of the skill.
 *   - Replace 'name' with the name of the skill.
 * 
 * - Guard
 *   - Adds the basic guard command.
 * 
 * - Item
 *   - Adds the basic item command.
 *
 * - Party
 *   - Requires VisuMZ_2_PartySystem.
 *   - Allows this actor to switch out with a different party member.
 * 
 * - Escape
 *   - Adds the escape command.
 * 
 * - Auto Battle
 *   - Adds the auto battle command.
 *
 * Example:
 *
 * <Battle Commands>
 *  Attack
 *  Skill: Heal
 *  Skills
 *  Guard
 *  Item
 *  Escape
 * </Battle Commands>
 *
 * ---
 *
 * <Command Text: x>
 *
 * - Used for: Skill Notetags
 * - When a skill is used in a <Battle Commands> notetag set, you can change
 *   the skill name text that appears to something else.
 * - Replace 'x' with the skill's name you want to shown in the Actor Battle
 *   Command window.
 * - Recommended Usage: Shorten skill names that are otherwise too big to fit
 *   inside of the Actor Battle Command window.
 *
 * ---
 *
 * <Command Icon: x>
 *
 * - Used for: Skill Notetags
 * - When a skill is used in a <Battle Commands> notetag set, you can change
 *   the skill icon that appears to something else.
 * - Replace 'x' with the ID of icon you want shown in the Actor Battle Command
 *   window to represent the skill.
 *
 * ---
 * 
 * <Command Show Switch: x>
 * 
 * <Command Show All Switches: x,x,x>
 * <Command Show Any Switches: x,x,x>
 * 
 * - Used for: Skill Notetags
 * - Determines if a battle command is visible or not through switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, item will be hidden until all
 *   switches are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, item will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 * - This can be applied to Attack and Guard commands, too.
 * 
 * ---
 * 
 * <Command Hide Switch: x>
 * 
 * <Command Hide All Switches: x,x,x>
 * <Command Hide Any Switches: x,x,x>
 * 
 * - Used for: Skill Notetags
 * - Determines if a battle command is visible or not through switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, item will be shown until all
 *   switches are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, item will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 * - This can be applied to Attack and Guard commands, too.
 * 
 * ---
 * 
 * <Battle Portrait: filename>
 *
 * - Used for: Actor
 * - This is used with the "Portrait" Battle Layout.
 * - Sets the battle portrait image for the actor to 'filename'.
 * - Replace 'filename' with a picture found within your game project's
 *   img/pictures/ folder. Filenames are case sensitive. Leave out the filename
 *   extension from the notetag.
 * - This will override any menu images used for battle only.
 * 
 * ---
 * 
 * === JavaScript Notetag: Battle Command-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if skill-based battle commands are visible or hidden.
 * 
 * ---
 * 
 * <JS Command Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Command Visible>
 * 
 * - Used for: Skill Notetags
 * - The 'visible' variable is the final returned variable to determine the
 *   skill's visibility in the Battle Command Window.
 * - Replace 'code' with JavaScript code to determine the skill's visibility in
 *   the Battle Command Window.
 * - The 'user' variable represents the user who will perform the skill.
 * - The 'skill' variable represents the skill to be used.
 * 
 * ---
 *
 * === Targeting-Related Notetags ===
 *
 * The following notetags are related to the targeting aspect of skills and
 * items and may adjust the scope of how certain skills/items work.
 *
 * ---
 *
 * <Always Hit>
 *
 * <Always Hit Rate: x%>
 *
 * - Used for: Skill, Item Notetags
 * - Causes the action to always hit or to always have a hit rate of exactly
 *   the marked x%.
 * - Replace 'x' with a number value representing the hit success percentage.
 *
 * ---
 *
 * <Repeat Hits: x>
 *
 * - Used for: Skill, Item Notetags
 * - Changes the number of hits the action will produce.
 * - Replace 'x' with a number value representing the number of hits to incur.
 *
 * ---
 *
 * <Target: x Random Any>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets can be both actors and enemies.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: x Random Enemies>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets are only enemies.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: x Random Allies>
 *
 * - Used for: Skill, Item Notetags
 * - Makes the skill pick 'x' random targets when used.
 * - Targets are only actors.
 * - Replace 'x' with a number value representing the number of random targets.
 *
 * ---
 *
 * <Target: All Allies But User>
 *
 * - Used for: Skill, Item Notetags
 * - Targets all allies with the exception of the user.
 *
 * ---
 *
 * === JavaScript Notetag: Targeting-Related ===
 *
 * ---
 * 
 * <JS Targets>
 *  code
 *  code
 *  targets = [code];
 * </JS Targets>
 *
 * - Used for: Skill, Item Notetags
 * - The 'targets' variable is an array that is returned to be used as a
 *   container for all the valid action targets.
 * - Replace 'code' with JavaScript code to determine valid targets.
 *
 * ---
 *
 * === Damage-Related Notetags ===
 *
 * ---
 *
 * <Damage Style: name>
 *
 * - Used for: Skill, Item Notetags
 * - Replace 'name' with a Damage Style name to change the way calculations are
 *   made using the damage formula input box.
 * - Names can be found in Plugin Parameters => Damage Settings => Style List
 *
 * ---
 *
 * <Armor Reduction: x>
 * <Armor Reduction: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   reduction properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor reduction properties
 *   when calculating one's own armor.
 * - Use the 'x' notetag variant to determine a flat reduction value.
 * - Use the 'x%' notetag variant to determine a percentile reduction value.
 *
 * ---
 *
 * <Armor Penetration: x>
 * <Armor Penetration: x%>
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, sets the current skill/item's armor
 *   penetration properties to 'x' and/or 'x%'.
 * - If used on trait objects, adds 'x' and/or 'x%' armor penetration
 *   properties when calculating a target's armor.
 * - Use the 'x' notetag variant to determine a flat penetration value.
 * - Use the 'x%' notetag variant to determine a percentile penetration value.
 *
 * ---
 *
 * <Bypass Damage Cap>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will cause the action to never have
 *   its damage capped.
 * - If used on trait objects, this will cause the affected unit to never have
 *   its damage capped.
 *
 * ---
 *
 * <Damage Cap: x>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will declare the hard damage cap to
 *   be the 'x' value.
 * - If used on trait objects, this will raise the affect unit's hard damage
 *   cap to 'x' value. If another trait object has a higher value, use that
 *   value instead.
 *
 * ---
 *
 * <Bypass Soft Damage Cap>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will cause the action to never have
 *   its damage scaled downward to the soft cap.
 * - If used on trait objects, this will cause the affected unit to never have
 *   its damage scaled downward to the soft cap.
 *
 * ---
 *
 * <Soft Damage Cap: +x%>
 * <Soft Damage Cap: -x%>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - If used on skills and/or items, this will increase/decrease the action's
 *   soft cap by x% where 'x' is a percentage value representing the increment
 *   changed by the hard cap value.
 * - If used on trait objects, this will raise the affect unit's soft damage
 *   limit by x% where 'x' is a percentage value representing the increment
 *   changed by the hard cap value.
 *
 * ---
 *
 * <Unblockable>
 *
 * - Used for: Skill, Item Notetags
 * - Using "Guard" against this skill will not reduce any damage.
 *
 * ---
 *
 * === Critical-Related Notetags ===
 *
 * The following notetags affect skill and item critical hit rates and the
 * critical damage multiplier.
 *
 * ---
 *
 * <Always Critical>
 *
 * - Used for: Skill, Item Notetags
 * - This skill/item will always land a critical hit regardless of the
 *   user's CRI parameter value.
 *
 * ---
 *
 * <Set Critical Rate: x%>
 *
 * - Used for: Skill, Item Notetags
 * - This skill/item will always have a x% change to land a critical hit
 *   regardless of user's CRI parameter value.
 * - Replace 'x' with a percerntage value representing the success rate.
 *
 * ---
 *
 * <Modify Critical Rate: x%>
 * <Modify Critical Rate: +x%>
 * <Modify Critical Rate: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - Modifies the user's CRI parameter calculation for this skill/item.
 * - The 'x%' notetag variant will multiply the user's CRI parameter value
 *   for this skill/item.
 * - The '+x%' and '-x%' notetag variants will incremenetally increase/decrease
 *   the user's CRI parameter value for this skill/item.
 *
 * ---
 *
 * <Modify Critical Multiplier: x%>
 * <Modify Critical Multiplier: +x%>
 * <Modify Critical Multiplier: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - These notetags determine the damage multiplier when a critical hit lands.
 * - The 'x%' notetag variant multiply the multiplier to that exact percentage.
 * - The '+x%' and '-x%' notetag variants will change the multiplier with an
 *   incremenetal rate for this skill/item.
 *
 * ---
 *
 * <Modify Critical Bonus Damage: x%>
 * <Modify Critical Bonus Damage: +x%>
 * <Modify Critical Bonus Damage: -x%>
 *
 * - Used for: Skill, Item Notetags
 * - These notetags determine the bonus damage added when a critical hit lands.
 * - The 'x%' notetag variant multiply the damage to that exact percentage.
 * - The '+x%' and '-x%' notetag variants will change the bonus damage with an
 *   incremenetal rate for this skill/item.
 *
 * ---
 *
 * === JavaScript Notetags: Critical-Related ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine how critical hit-related aspects are calculated.
 *
 * ---
 *
 * <JS Critical Rate>
 *  code
 *  code
 *  rate = code;
 * </JS Critical Rate>
 *
 * - Used for: Skill, Item Notetags
 * - The 'rate' variable is the final returned amount to determine the
 *   critical hit success rate.
 * - Replace 'code' with JavaScript code to determine the final 'rate' to be
 *   returned as the critical hit success rate.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Critical Damage>
 *  code
 *  code
 *  multiplier = code;
 *  bonusDamage = code;
 * </JS Critical Damage>
 *
 * - Used for: Skill, Item Notetags
 * - The 'multiplier' variable is returned later and used as the damage
 *   multiplier used to amplify the critical damage amount.
 * - The 'bonusDamage' variable is returned later and used as extra added
 *   damage for the critical damage amount.
 * - Replace 'code' with JavaScript code to determine how the 'multiplier' and
 *   'bonusDamage' variables are calculated.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * === Action Sequence-Related Notetags ===
 *
 * Action Sequences allow you full control over how a skill and/or item plays
 * through its course. These notetags give you control over various aspects of
 * those Action Sequences. More information is found in the Action Sequences
 * help section.
 *
 * ---
 *
 * <Custom Action Sequence>
 *
 * - Used for: Skill, Item Notetags
 * - Removes all automated Action Sequence parts from the skill.
 * - Everything Action Sequence-related will be done by Common Events.
 * - Insert Common Event(s) into the skill/item's effects list to make use of
 *   the Custom Action Sequences.
 * - This will prevent common events from loading in the Item Scene and Skill
 *   Scene when used outside of battle.
 *
 * ---
 *
 * <Display Icon: x>
 * <Display Text: string>
 *
 * - Used for: Skill, Item Notetags
 * - When displaying the skill/item name in the Action Sequence, determine the
 *   icon and/or text displayed.
 * - Replace 'x' with a number value representing the icon ID to be displayed.
 * - Replace 'string' with a text value representing the displayed name.
 *
 * ---
 *
 * === Animated Sideview Battler-Related Notetags ===
 *
 * Enemies can use Animated Sideview Actor graphics thanks to this plugin.
 * These notetags give you control over that aspect. Some of these also affect
 * actors in addition to enemies.
 *
 * ---
 *
 * <Sideview Battler: filename>
 *
 * <Sideview Battlers>
 *  filename: weight
 *  filename: weight
 *  filename: weight
 * </Sideview Battlers>
 *
 * - Used for: Enemy Notetags
 * - Replaces the enemy's battler graphic with an animated Sideview Actor
 *   graphic found in the img/sv_actors/ folder.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Actor1_1.png' will be only inserted
 *   as 'Actor1_1' without the '.png' at the end.
 * - If the multiple notetag vaiant is used, then a random filename is selected
 *   from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'filename'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'filename' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Battlers>
 *  Actor1_1: 25
 *  Actor1_3: 10
 *  Actor1_5
 *  Actor1_7
 * </Sideview Battlers>
 *
 * ---
 *
 * <Sideview Anchor: x, y>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets the sprite anchor positions for the sideview sprite.
 * - Replace 'x' and 'y' with numbers depicting where the anchors should be for
 *   the sideview sprite.
 * - By default, the x and y anchors are 0.5 and 1.0.
 *
 * ---
 * 
 * <Sideview Home Offset: +x, +y>
 * <Sideview Home Offset: -x, -y>
 * 
 * - Used for: Actor, Class, Weapon, Armor, State Notetags
 * - Offsets the sideview actor sprite's home position by +/-x, +/-y.
 * - Replace 'x' and 'y' with numbers depicting how much to offset each of the
 *   coordinates by. For '0' values, use +0 or -0.
 * - This notetag will not work if you remove it from the JavaScript code in
 *   Plugin Parameters > Actor > JS:  Home Position
 * 
 * ---
 * 
 * <Sideview Weapon Offset: +x, +y>
 * <Sideview Weapon Offset: -x, -y>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy State Notetags
 * - Offsets the sideview weapon sprite's position by +/-x, +/-y.
 * - Replace 'x' and 'y' with numbers depicting how much to offset each of the
 *   coordinates by. For '0' values, use +0 or -0.
 * 
 * ---
 *
 * <Sideview Show Shadow>
 * <Sideview Hide Shadow>
 *
 * - Used for: Actor, Enemy Notetags
 * - Sets it so the sideview battler's shadow will be visible or hidden.
 *
 * ---
 *
 * <Sideview Collapse>
 * <Sideview No Collapse>
 *
 * - Used for: Enemy Notetags
 * - Either shows the collapse graphic or does not show the collapse graphic.
 * - Collapse graphic means the enemy will 'fade away' once it's defeated.
 * - No collapse graphic means the enemy's corpse will remain on the screen.
 *
 * ---
 *
 * <Sideview Idle Motion: name>
 *
 * <Sideview Idle Motions>
 *  name: weight
 *  name: weight
 *  name: weight
 * </Sideview Idle Motions>
 *
 * - Used for: Enemy Notetags
 * - Changes the default idle motion for the enemy.
 * - Replace 'name' with any of the following motion names:
 *   - 'walk', 'wait', 'chant', 'guard', 'damage', 'evade', 'thrust', 'swing',
 *     'missile', 'skill', 'spell', 'item', 'escape', 'victory', 'dying',
 *     'abnormal', 'sleep', 'dead'
 * - If the multiple notetag vaiant is used, then a random motion name is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Idle Motions>
 *  walk: 25
 *  wait: 50
 *  guard
 *  victory
 *  abnormal
 * </Sideview Idle Motions>
 *
 * ---
 *
 * <Sideview Size: width, height>
 *
 * - Used for: Enemy Notetags
 * - When using a sideview battler, its width and height will default to the
 *   setting made in Plugin Parameters => Enemy Settings => Size: Width/Height.
 * - This notetag lets you change that value to something else.
 * - Replace 'width' and 'height' with numbers representing how many pixels
 *   wide/tall the sprite will be treated as.
 *
 * ---
 *
 * <Sideview Weapon: weapontype>
 *
 * <Sideview Weapons>
 *  weapontype: weight
 *  weapontype: weight
 *  weapontype: weight
 * </Sideview Weapons>
 *
 * - Used for: Enemy Notetags
 * - Give your sideview enemies weapons to use.
 * - Replace 'weapontype' with the name of the weapon type found under the
 *   Database => Types => Weapon Types list (without text codes).
 * - If the multiple notetag vaiant is used, then a random weapon type is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the weapontype
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'weapontype' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Sideview Weapons>
 *  Dagger: 25
 *  Sword: 25
 *  Axe
 * </Sideview Weapons>
 *
 * ---
 *
 * <traitname Sideview Battler: filename>
 *
 * <traitname Sideview Battlers>
 *  filename: weight
 *  filename: weight
 *  filename: weight
 * </traitname Sideview Battlers>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have a unique appearance.
 * - Replace 'filename' with the filename of the graphic to use. Do not insert
 *   any extensions. This means the file 'Actor1_1.png' will be only inserted
 *   as 'Actor1_1' without the '.png' at the end.
 * - If the multiple notetag vaiant is used, then a random filename is selected
 *   from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'filename'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'filename' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Male Sideview Battlers>
 *  Actor1_1: 25
 *  Actor1_3: 10
 *  Actor1_5
 *  Actor1_7
 * </Male Sideview Battlers>
 *
 * <Female Sideview Battlers>
 *  Actor1_2: 25
 *  Actor1_4: 10
 *  Actor1_6
 *  Actor1_8
 * </Female Sideview Battlers>
 *
 * ---
 *
 * <traitname Sideview Idle Motion: name>
 *
 * <traitname Sideview Idle Motions>
 *  name: weight
 *  name: weight
 *  name: weight
 * </traitname Sideview Idle Motions>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have unique idle motions.
 * - Replace 'name' with any of the following motion names:
 *   - 'walk', 'wait', 'chant', 'guard', 'damage', 'evade', 'thrust', 'swing',
 *     'missile', 'skill', 'spell', 'item', 'escape', 'victory', 'dying',
 *     'abnormal', 'sleep', 'dead'
 * - If the multiple notetag vaiant is used, then a random motion name is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Jolly Sideview Idle Motions>
 *  wait: 25
 *  victory: 10
 *  walk
 * </Jolly Sideview Idle Motions>
 *
 * <Serious Sideview Idle Motions>
 *  walk: 25
 *  guard: 10
 *  wait
 * </Jolly Sideview Idle Motions>
 *
 * ---
 *
 * <traitname Sideview Weapon: weapontype>
 *
 * <traitname Sideview Weapons>
 *  weapontype: weight
 *  weapontype: weight
 *  weapontype: weight
 * </traitname Sideview Weapons>
 *
 * - Used for: Enemy Notetags
 * - Requires VisuMZ_1_ElementStatusCore
 * - Allows certain Trait Sets to cause battlers to have unique weapons.
 * - Replace 'weapontype' with the name of the weapon type found under the
 *   Database => Types => Weapon Types list (without text codes).
 * - If the multiple notetag vaiant is used, then a random weapon type is
 *   selected from the list upon the enemy's creation.
 * - Replace 'weight' with a number value representing how often the weapontype
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'weapontype' instead.
 * - Add/remove lines as you see fit.
 *
 * Examples:
 *
 * <Male Sideview Weapons>
 *  Dagger: 25
 *  Sword: 25
 *  Axe
 * </Male Sideview Weapons>
 *
 * <Female Sideview Weapons>
 *  Dagger: 25
 *  Spear: 25
 *  Cane
 * </Female Sideview Weapons>
 *
 * ---
 *
 * === Enemy-Related Notetags ===
 *
 * ---
 *
 * <Battler Sprite Cannot Move>
 *
 * - Used for: Enemy Notetags
 * - Prevents the enemy from being able to move, jump, and/or float due to
 *   Action Sequences. Useful for rooted enemies.
 *
 * ---
 *
 * <Swap Enemies>
 *  name: weight
 *  name: weight
 *  name: weight
 * </Swap Enemies>
 *
 * - Used for: Enemy Notetags
 * - Causes this enemy database object to function as a randomizer for any of
 *   the listed enemies inside the notetag. When the enemy is loaded into the
 *   battle scene, the enemy is immediately replaced with one of the enemies
 *   listed. The randomization is based off the 'weight' given to each of the
 *   enemy 'names'.
 * - Replace 'name' with the database enemy of the enemy you wish to replace
 *   the enemy with.
 * - Replace 'weight' with a number value representing how often the 'name'
 *   would come up. The higher the weight, the more often. You may omit this
 *   and the colon(:) and just type in the 'name' instead.
 * - Add/remove lines as you see fit.
 *
 * Example:
 *
 * <Swap Enemies>
 *  Bat: 50
 *  Slime: 25
 *  Orc
 *  Minotaur
 * </Swap Enemies>
 *
 * ---
 *
 * === JavaScript Notetags: Mechanics-Related ===
 *
 * These JavaScript notetags allow you to run code at specific instances during
 * battle provided that the unit has that code associated with them in a trait
 * object (actor, class, weapon, armor, enemy, or state). How you use these is
 * entirely up to you and will depend on your ability to understand the code
 * used and driven for each case.
 *
 * ---
 *
 * <JS Pre-Start Battle>
 *  code
 *  code
 *  code
 * </JS Pre-Start Battle>
 *
 * <JS Post-Start Battle>
 *  code
 *  code
 *  code
 * </JS Post-Start Battle>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of battle aimed at the function:
 *   BattleManager.startBattle()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Start Turn>
 *  code
 *  code
 *  code
 * </JS Pre-Start Turn>
 *
 * <JS Post-Start Turn>
 *  code
 *  code
 *  code
 * </JS Post-Start Turn>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of a turn aimed at the function:
 *   BattleManager.startTurn()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Start Action>
 *  code
 *  code
 *  code
 * </JS Pre-Start Action>
 *
 * <JS Post-Start Action>
 *  code
 *  code
 *  code
 * </JS Post-Start Action>
 * 
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of an action aimed at the function:
 *   BattleManager.startAction()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Apply>
 *  code
 *  code
 *  code
 * </JS Pre-Apply>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code at the start of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Pre' runs before the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Apply as User>
 *  code
 *  code
 *  code
 * </JS Pre-Apply as User>
 *
 * <JS Pre-Apply as Target>
 *  code
 *  code
 *  code
 * </JS Pre-Apply as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the start of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Pre' runs before the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Damage>
 *  code
 *  code
 *  code
 * </JS Pre-Damage>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code before damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Pre' runs before the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Pre-Damage as User>
 *  code
 *  code
 *  code
 * </JS Pre-Damage as User>
 *
 * <JS Pre-Damage as Target>
 *  code
 *  code
 *  code
 * </JS Pre-Damage as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code before damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Pre' runs before the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Damage>
 *  code
 *  code
 *  code
 * </JS Post-Damage>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code after damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Damage as User>
 *  code
 *  code
 *  code
 * </JS Post-Damage as User>
 *
 * <JS Post-Damage as Target>
 *  code
 *  code
 *  code
 * </JS Post-Damage as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code after damage is dealt aimed at the function:
 *   Game_Action.prototype.executeDamage()
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Apply>
 *  code
 *  code
 *  code
 * </JS Post-Apply>
 * 
 * - Used for: Skill, Item Notetags
 * - Runs JavaScript code at the end of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Post' runs after the function runs.
 * - If used on skills and/or items, this will only apply to the skill/item
 *   being used and does not affect other skills and items.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one using the skill/item.
 * - The 'target' variable represents the one receiving the skill/item hit.
 *
 * ---
 *
 * <JS Post-Apply as User>
 *  code
 *  code
 *  code
 * </JS Post-Apply as User>
 *
 * <JS Post-Apply as Target>
 *  code
 *  code
 *  code
 * </JS Post-Apply as Target>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of an action hit aimed at the function:
 *   Game_Action.prototype.apply()
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - If the 'as User' notetag variant is used, this code will be run as a
 *   response to the action from the action user end.
 * - If the 'as Target' notetag variant is used, this code will be run as a
 *   response to the action from the action target end.
 * - Replace 'code' with JavaScript code to run desired effects.
 *
 * ---
 *
 * <JS Pre-End Action>
 *  code
 *  code
 *  code
 * </JS Pre-End Action>
 *
 * <JS Post-End Action>
 *  code
 *  code
 *  code
 * </JS Post-End Action>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of an action aimed at the function:
 *   BattleManager.endAction()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - If used on trait objects, this will apply to any skills/items used as long
 *   as the unit affected by the trait object has access to the trait object.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-End Turn>
 *  code
 *  code
 *  code
 * </JS Pre-End Turn>
 *
 * <JS Post-End Turn>
 *  code
 *  code
 *  code
 * </JS Post-End Turn>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code at the end of a turn aimed at the function:
 *   Game_Battler.prototype.onTurnEnd()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-Regenerate Turn>
 *  code
 *  code
 *  code
 * </JS Pre-Regenerate Turn>
 *
 * <JS Post-Regenerate Turn>
 *  code
 *  code
 *  code
 * </JS Post-Regenerate Turn>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a unit regenerates HP/MP aimed at the function:
 *   Game_Battler.prototype.regenerateAll()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Battle Victory>
 *  code
 *  code
 *  code
 * </JS Battle Victory>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a battle is won aimed at the function:
 *   BattleManager.processVictory()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Escape Success>
 *  code
 *  code
 *  code
 * </JS Escape Success>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when escaping succeeds aimed at the function:
 *   BattleManager.onEscapeSuccess()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Escape Failure>
 *  code
 *  code
 *  code
 * </JS Escape Failure>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when escaping fails aimed at the function:
 *   BattleManager.onEscapeFailure()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Battle Defeat>
 *  code
 *  code
 *  code
 * </JS Battle Defeat>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when a battle is lost aimed at the function:
 *   BattleManager.processDefeat()
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * <JS Pre-End Battle>
 *  code
 *  code
 *  code
 * </JS Pre-End Battle>
 *
 * <JS Post-End Battle>
 *  code
 *  code
 *  code
 * </JS Post-End Battle>
 * 
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs JavaScript code when the battle is over aimed at the function:
 *   BattleManager.endBattle()
 *   - 'Pre' runs before the function runs.
 *   - 'Post' runs after the function runs.
 * - Replace 'code' with JavaScript code to run desired effects.
 * - The 'user' variable represents the one affected by the trait object.
 *
 * ---
 *
 * ============================================================================
 * Action Sequence - Plugin Commands
 * ============================================================================
 *
 * Skills and items, when used in battle, have a pre-determined series of
 * actions to display to the player as a means of representing what's going on
 * with the action. For some game devs, this may not be enough and they would
 * like to get more involved with the actions themselves.
 *
 * Action Sequences, added through this plugin, enable this. To give a skill or
 * item a Custom Action Sequence, a couple of steps must be followed:
 *
 * ---
 *
 * 1. Insert the <Custom Action Sequence> notetag into the skill or item's
 *    notebox (or else this would not work as intended).
 * 2. Give that skill/item a Common Event through the Effects box. The selected
 *    Common Event will contain all the Action Sequence data.
 * 3. Create the Common Event with Action Sequence Plugin Commands and/or event
 *    commands to make the skill/item do what you want it to do.
 *
 * ---
 *
 * The Plugin Commands added through the Battle Core plugin focus entirely on
 * Action Sequences. However, despite the fact that they're made for skills and
 * items, some of these Action Sequence Plugin Commands can still be used for
 * regular Troop events and Common Events.
 *
 * ---
 *
 * === Action Sequence - Action Sets ===
 *
 * Action Sequence Action Sets are groups of commonly used
 * Action Sequence Commands put together for more efficient usage.
 *
 * ---
 *
 * ACSET: Setup Action Set
 * - The generic start to most actions.
 *
 *   Display Action:
 *   Immortal: On:
 *   Battle Step:
 *   Wait For Movement:
 *   Cast Animation:
 *   Wait For Animation:
 *   - Use this part of the action sequence?
 *
 * ---
 *
 * ACSET: All Targets Action Set
 * - Affects all targets simultaneously performing the following.
 *
 *   Perform Action:
 *   Wait Count:
 *   Action Animation:
 *   Wait For Animation:
 *   Action Effect:
 *   Immortal: Off:
 *   - Use this part of the action sequence?
 *   - Insert values for the Wait Count(s).
 *
 * ---
 *
 * ACSET: Each Target Action Set
 * - Goes through each target one by one to perform the following.
 *
 *   Perform Action:
 *   Wait Count:
 *   Action Animation:
 *   Wait Count:
 *   Action Effect:
 *   Immortal: Off:
 *   - Use this part of the action sequence?
 *   - Insert values for the Wait Count(s).
 *
 * ---
 *
 * ACSET: Finish Action
 * - The generic ending to most actions.
 *
 *   Wait For New Line:
 *   Wait For Effects:
 *   Clear Battle Log:
 *   Home Reset:
 *   Wait For Movement:
 *   - Use this part of the action sequence?
 *
 * ---
 *
 * === Action Sequences - Animations ===
 *
 * These Action Sequences are related to the 'Animations' that can be found in
 * the Animations tab of the Database.
 *
 * ---
 *
 * ANIM: Action Animation
 * - Plays the animation associated with the action.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Attack Animation
 * - Plays the animation associated with the user's weapon.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Cast Animation
 * - Plays the cast animation associated with the action.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Change Battle Portrait
 * - Changes the battle portrait of the actor (if it's an actor).
 * - Can be used outside of battle/action sequences.
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *   - Valid units can only be actors.
 *
 *   Filename:
 *   - Select the file to change the actor's portrait to.
 *
 * ---
 *
 * ANIM: Show Animation
 * - Plays the a specific animation on unit(s).
 *
 *   Targets:
 *   - Select unit(s) to play the animation on.
 *
 *   Animation ID:
 *   - Select which animation to play on unit(s).
 *
 *   Mirror Animation:
 *   - Mirror the animation?
 *
 *   Wait For Animation?:
 *   - Wait for animation to complete before performing next command?
 *
 * ---
 *
 * ANIM: Wait For Animation
 * - Causes the interpreter to wait for any animation(s) to finish.
 *
 * ---
 *
 * === Action Sequences - Battle Log ===
 *
 * These Action Sequences are related to the Battle Log Window, the window
 * found at the top of the battle screen.
 *
 * ---
 *
 * BTLOG: Add Text
 * - Adds a new line of text into the Battle Log.
 *
 *   Text:
 *   - Add this text into the Battle Log.
 *   - Text codes allowed.
 *
 * ---
 *
 * BTLOG: Clear Battle Log
 * - Clears all the text in the Battle Log.
 *
 * ---
 *
 * BTLOG: Display Action
 * - plays the current action in the Battle Log.
 *
 * ---
 *
 * BTLOG: Pop Base Line
 * - Removes the Battle Log's last added base line and  all text up to its
 *   former location.
 *
 * ---
 *
 * BTLOG: Push Base Line
 * - Adds a new base line to where the Battle Log currently is at.
 *
 * ---
 *
 * BTLOG: Refresh Battle Log
 * - Refreshes the Battle Log.
 *
 * ---
 *
 * BTLOG: UI Show/Hide
 * - Shows or hides the Battle UI (including the Battle Log).
 *
 *   Show/Hide?:
 *   - Shows/hides the Battle UI.
 *
 * ---
 *
 * BTLOG: Wait For Battle Log
 * - Causes the interpreter to wait for the Battle Log to finish.
 *
 * ---
 *
 * BTLOG: Wait For New Line
 * - Causes the interpreter to wait for a new line in the Battle Log.
 *
 * ---
 *
 * === Action Sequences - Camera ===
 *
 * These Action Sequences are battle camera-related.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * CAMERA: Clamp ON/OFF
 * - Turns battle camera clamping on/off.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Setting:
 *   - Turns camera clamping on/off.
 *
 * ---
 *
 * CAMERA: Focus Point
 * - Focus the battle camera on a certain point in the screen.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   X Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Y Coordinate:
 *   - Insert the point to focus the camera on.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Focus Target(s)
 * - Focus the battle camera on certain battler target(s).
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Targets:
 *   - Select unit(s) to focus the battle camera on.
 *
 *   Duration:
 *   - Duration in frames for camera focus change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Offset
 * - Offset the battle camera from the focus target.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Offset X:
 *   - How much to offset the camera X by.
 *   - Negative: left. Positive: right.
 *
 *   Offset Y:
 *   - How much to offset the camera Y by.
 *   - Negative: up. Positive: down.
 *
 *   Duration:
 *   - Duration in frames for offset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Reset
 * - Reset the battle camera settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Reset Focus?:
 *   - Reset the focus point?
 *
 *   Reset Offset?:
 *   - Reset the camera offset?
 *
 *   Duration:
 *   - Duration in frames for reset change.
 *
 *   Camera Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Camera?
 *   - Wait for camera changes to complete before performing next command?
 *
 * ---
 *
 * CAMERA: Wait For Camera
 * - Waits for camera changes to complete before performing next command.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * === Action Sequences - Dragonbones ===
 *
 * These Action Sequences are Dragonbones-related.
 * Requires VisuMZ_2_DragonbonesUnion!
 *
 * ---
 *
 * DB: Dragonbones Animation
 * - Causes the unit(s) to play a Dragonbones motion animation.
 * - Requires VisuMZ_2_DragonbonesUnion!
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion animation.
 *
 *   Motion Animation:
 *   - What is the name of the Dragonbones motion animation you wish to play?
 *
 * ---
 *
 * DB: Dragonbones Time Scale
 * - Causes the unit(s) to change their Dragonbones time scale.
 * - Requires VisuMZ_2_DragonbonesUnion!
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion animation.
 *
 *   Time Scale:
 *   - Change the value of the Dragonbones time scale to this.
 *
 * ---
 *
 * === Action Sequences - Elements ===
 *
 * These Action Sequences can change up the element(s) used for the action's
 * damage calculation midway through an action.
 *
 * They also require the VisuMZ_1_ElementStatusCore plugin to be present in
 * order for them to work.
 *
 * ---
 *
 * ELE: Add Elements
 * - Adds element(s) to be used when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 *   Elements:
 *   - Select which element ID to add onto the action.
 *   - Insert multiple element ID's to add multiple at once.
 *
 * ---
 *
 * ELE: Clear Element Changes
 * - Clears all element changes made through Action Sequences.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 * ---
 *
 * ELE: Force Elements
 * - Forces only specific element(s) when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 *   Elements:
 *   - Select which element ID to force in the action.
 *   - Insert multiple element ID's to force multiple at once.
 *
 * ---
 *
 * ELE: Null Element
 * - Forces no element to be used when calculating damage.
 * - Requires VisuMZ_1_ElementStatusCore!
 *
 * ---
 *
 * === Action Sequences - Mechanics ===
 *
 * These Action Sequences are related to various mechanics related to the
 * battle system.
 *
 * ---
 *
 * MECH: Action Effect
 * - Causes the unit(s) to take damage/healing from action and incurs any
 *   changes made such as buffs and states.
 *
 *   Targets:
 *   - Select unit(s) to receive the current action's effects.
 *
 * ---
 *
 * MECH: Add Buff/Debuff
 * - Adds buff(s)/debuff(s) to unit(s). 
 * - Determine which parameters are affected and their durations.
 *
 *   Targets:
 *   - Select unit(s) to receive the buff(s) and/or debuff(s).
 *
 *   Buff Parameters:
 *   - Select which parameter(s) to buff.
 *   - Insert a parameter multiple times to raise its stacks.
 *
 *   Debuff Parameters:
 *   - Select which parameter(s) to debuff.
 *   - Insert a parameter multiple times to raise its stacks.
 *
 *   Turns:
 *   - Number of turns to set the parameter(s) buffs to.
 *   - You may use JavaScript code.
 *
 * ---
 *
 * MECH: Add State
 * - Adds state(s) to unit(s).
 *
 *   Targets:
 *   - Select unit(s) to receive the buff(s).
 *
 *   States:
 *   - Select which state ID(s) to add to unit(s).
 *   - Insert multiple state ID's to add multiple at once.
 *
 * ---
 *
 * MECH: Armor Penetration
 * - Adds an extra layer of defensive penetration/reduction.
 * - You may use JavaScript code for any of these.
 *
 *   Armor/Magic Penetration:
 *
 *     Rate:
 *     - Penetrates an extra multiplier of armor by this value.
 *
 *     Flat:
 *     - Penetrates a flat amount of armor by this value.
 *
 *   Armor/Magic Reduction:
 *
 *     Rate:
 *     - Reduces an extra multiplier of armor by this value.
 *
 *     Flat:
 *     - Reduces a flat amount of armor by this value.
 *
 * ---
 * 
 * MECH: ATB Gauge
 * - Alters the ATB/TPB Gauges.
 * - Requires VisuMZ_2_BattleSystemATB!
 * 
 *   Targets:
 *   - Select unit(s) to alter the ATB/TPB Gauges for.
 * 
 *   Charging:
 *   
 *     Charge Rate:
 *     - Changes made to the ATB Gauge if it is currently charging.
 * 
 *   Casting:
 *   
 *     Cast Rate:
 *     - Changes made to the ATB Gauge if it is currently casting.
 *   
 *     Interrupt?:
 *     - Interrupt the ATB Gauge if it is currently casting?
 * 
 * ---
 *
 * MECH: Collapse
 * - Causes the unit(s) to perform its collapse animation if the unit(s)
 *   has died.
 *
 *   Targets:
 *   - Select unit(s) to process a death collapse.
 *
 *   Force Death:
 *   - Force death even if the unit has not reached 0 HP?
 *   - This will remove immortality.
 *
 *   Wait For Effect?:
 *   - Wait for the collapse effect to complete before performing next command?
 *
 * ---
 *
 * MECH: Damage Popup
 * - Causes the unit(s) to display the current state of damage received
 *   or healed.
 *
 *   Targets:
 *   - Select unit(s) to prompt a damage popup.
 *
 * ---
 *
 * MECH: Dead Label Jump
 * - If the active battler is dead, jump to a specific label in the
 *   common event.
 *
 *   Jump To Label:
 *   - If the active battler is dead, jump to this specific label in the
 *     common event.
 *
 * ---
 *
 * MECH: HP, MP, TP
 * - Alters the HP, MP, and TP values for unit(s).
 * - Positive values for healing. Negative values for damage.
 *
 *   Targets:
 *   - Select unit(s) to receive the current action's effects.
 *
 *   HP, MP, TP:
 *
 *     Rate:
 *     - Changes made to the parameter based on rate.
 *     - Positive values for healing. Negative values for damage.
 *
 *     Flat:
 *     - Flat changes made to the parameter.
 *     - Positive values for healing. Negative values for damage.
 *
 *   Damage Popup?:
 *   - Display a damage popup after?
 *
 * ---
 *
 * MECH: Immortal
 * - Changes the immortal flag of targets. If immortal flag is removed and a
 *   unit would die, collapse that unit.
 *
 *   Targets:
 *   - Alter the immortal flag of these groups. If immortal flag is removed and
 *     a unit would die, collapse that unit.
 *
 *   Immortal:
 *   - Turn immortal flag for unit(s) on/off?
 *
 * ---
 *
 * MECH: Multipliers
 * - Changes the multipliers for the current action.
 * - You may use JavaScript code for any of these.
 *
 *   Critical Hit%:
 *
 *     Rate:
 *     - Affects chance to land a critical hit by this multiplier.
 *
 *     Flat:
 *     - Affects chance to land a critical hit by this flat bonus.
 *
 *   Critical Damage
 *
 *     Rate:
 *     - Affects critical damage by this multiplier.
 *
 *     Flat:
 *     - Affects critical damage by this flat bonus.
 *
 *   Damage/Healing
 *
 *     Rate:
 *     - Sets the damage/healing multiplier for current action.
 *
 *     Flat:
 *     - Sets the damage/healing bonus for current action.
 *
 *   Hit Rate
 *
 *     Rate:
 *     - Affects chance to connect attack by this multiplier.
 *
 *     Flat:
 *     - Affects chance to connect attack by this flat bonus.
 *
 * ---
 *
 * MECH: Remove Buff/Debuff
 * - Removes buff(s)/debuff(s) from unit(s). 
 * - Determine which parameters are removed.
 *
 *   Targets:
 *   - Select unit(s) to have the buff(s) and/or debuff(s) removed.
 *
 *   Buff Parameters:
 *   - Select which buffed parameter(s) to remove.
 *
 *   Debuff Parameters:
 *   - Select which debuffed parameter(s) to remove.
 *
 * ---
 *
 * MECH: Remove State
 * - Remove state(s) from unit(s).
 *
 *   Targets:
 *   - Select unit(s) to have states removed from.
 *
 *   States:
 *   - Select which state ID(s) to remove from unit(s).
 *   - Insert multiple state ID's to remove multiple at once.
 *
 * ---
 * 
 * MECH: Text Popup
 * - Causes the unit(s) to display a text popup.
 * 
 *   Targets:
 *   - Select unit(s) to prompt a text popup.
 * 
 *   Text:
 *   - What text do you wish to display?
 * 
 *   Text Color:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Flash Duration:
 *   - What is the frame duration of the flash effect?
 * 
 * ---
 *
 * MECH: Wait For Effect
 * - Waits for the effects to complete before performing next command.
 *
 * ---
 *
 * === Action Sequences - Motion ===
 *
 * These Action Sequences allow you the ability to control the motions of
 * sideview sprites.
 *
 * ---
 *
 * MOTION: Motion Type
 * - Causes the unit(s) to play the selected motion.
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion.
 *
 *   Motion Type:
 *   - Play this motion for the unit(s).
 *
 *   Show Weapon?:
 *   - If using 'attack', 'thrust', 'swing', or 'missile', display the
 *     weapon sprite?
 *
 * ---
 *
 * MOTION: Perform Action
 * - Causes the unit(s) to play the proper motion based on the current action.
 *
 *   Targets:
 *   - Select which unit(s) to perform a motion.
 *
 * ---
 *
 * MOTION: Refresh Motion
 * - Cancels any set motions unit(s) has to do and use their most natural
 *   motion at the moment.
 *
 *   Targets:
 *   - Select which unit(s) to refresh their motion state.
 *
 * ---
 *
 * MOTION: Wait By Motion Frame
 * - Creates a wait equal to the number of motion frames passing.
 * - Time is based on Plugin Parameters => Actors => Motion Speed.
 *
 *   Motion Frames to Wait?:
 *   - Each "frame" is equal to the value found in 
 *     Plugin Parameters => Actors => Motion Speed
 *
 * ---
 *
 * === Action Sequences - Movement ===
 *
 * These Action Sequences allow you the ability to control the sprites of
 * actors and enemies in battle.
 *
 * ---
 *
 * MOVE: Battle Step
 * - Causes the unit(s) to move forward past their home position to prepare
 *   for action.
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Face Direction
 * - Causes the unit(s) to face forward or backward.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change direction.
 *
 *   Direction:
 *   - Select which direction to face.
 *
 * ---
 *
 * MOVE: Face Point
 * - Causes the unit(s) to face a point on the screen.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to change direction.
 *
 *   Point:
 *   - Select which point to face.
 *     - Home
 *     - Center
 *     - Point X, Y
 *       - Replace 'x' and 'y' with coordinates
 *
 *   Face Away From?:
 *   - Face away from the point instead?
 *
 * ---
 *
 * MOVE: Face Target(s)
 * - Causes the unit(s) to face other targets on the screen.
 * - Sideview-only!
 *
 *   Targets (facing):
 *   - Select which unit(s) to change direction.
 *
 *   Targets (destination):
 *   - Select which unit(s) for the turning unit(s) to face.
 *
 *   Face Away From?:
 *   - Face away from the unit(s) instead?
 *
 * ---
 *
 * MOVE: Float
 * - Causes the unit(s) to float above the ground.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to make float.
 *
 *   Desired Height:
 *   - Vertical distance to float upward.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total float amount.
 *
 *   Float Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Float?:
 *   - Wait for floating to complete before performing next command?
 *
 * ---
 *
 * MOVE: Home Reset
 * - Causes the unit(s) to move back to their home position(s) and face back to
 *   their original direction(s).
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Jump
 * - Causes the unit(s) to jump into the air.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to make jump.
 *
 *   Desired Height:
 *   - Max jump height to go above the ground
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total jump amount.
 *
 *   Wait For Jump?:
 *   - Wait for jumping to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move Distance
 * - Moves unit(s) by a distance from their current position(s).
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Distance Adjustment:
 *   - Makes adjustments to distance values to determine which direction to
 *     move unit(s).
 *     - Normal - No adjustments made
 *     - Horizontal - Actors adjust left, Enemies adjust right
 *     - Vertical - Actors adjust Up, Enemies adjust down
 *     - Both - Applies both Horizontal and Vertical
 *
 *     Distance: X:
 *     - Horizontal distance to move.
 *     - You may use JavaScript code.
 *
 *     Distance: Y:
 *     - Vertical distance to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move To Point
 * - Moves unit(s) to a designated point on the screen.
 * - Sideview-only! Points based off Graphics.boxWidth/Height.
 *
 *   Targets:
 *   - Select which unit(s) to move.
 *
 *   Destination Point:
 *   - Select which point to face.
 *     - Home
 *     - Center
 *     - Point X, Y
 *       - Replace 'x' and 'y' with coordinates
 *
 *   Offset Adjustment:
 *   - Makes adjustments to offset values to determine which direction to
 *     adjust the destination by.
 *
 *     Offset: X:
 *     - Horizontal offset to move.
 *     - You may use JavaScript code.
 *
 *     Offset: Y:
 *     - Vertical offset to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Move To Target(s)
 * - Moves unit(s) to another unit(s) on the battle field.
 * - Sideview-only!
 *
 *   Targets (Moving):
 *   - Select which unit(s) to move.
 *
 *   Targets (Destination):
 *   - Select which unit(s) to move to.
 *
 *     Target Location:
 *     - Select which part target group to move to.
 *       - front head
 *       - front center
 *       - front base
 *       - middle head
 *       - middle center
 *       - middle base
 *       - back head
 *       - back center
 *       - back base
 *
 *     Melee Distance:
 *     - The melee distance away from the target location in addition to the
 *       battler's width.
 *
 *   Offset Adjustment:
 *   - Makes adjustments to offset values to determine which direction to
 *     adjust the destination by.
 *
 *     Offset: X:
 *     - Horizontal offset to move.
 *     - You may use JavaScript code.
 *
 *     Offset: Y:
 *     - Vertical offset to move.
 *     - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for total movement amount.
 *
 *   Face Destination?:
 *   - Turn and face the destination?
 *
 *   Movement Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Movement Motion:
 *   - Play this motion for the unit(s).
 *
 *   Wait For Movement?:
 *   - Wait for movement to complete before performing next command?
 *
 * ---
 *
 * MOVE: Opacity
 * - Causes the unit(s) to change opacity.
 * - Sideview-only!
 *
 *   Targets:
 *   - Select which unit(s) to make float.
 *
 *   Desired Opacity:
 *   - Change to this opacity value.
 *   - You may use JavaScript code.
 *
 *   Duration:
 *   - Duration in frames for opacity change.
 *
 *   Opacity Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Opacity?:
 *   - Wait for opacity changes to complete before performing next command?
 *
 * ---
 *
 * MOVE: Wait For Float
 * - Waits for floating to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Jump
 * - Waits for jumping to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Movement
 * - Waits for movement to complete before performing next command.
 *
 * ---
 *
 * MOVE: Wait For Opacity
 * - Waits for opacity changes to complete before performing next command.
 *
 * ---
 *
 * === Action Sequences - Target ===
 *
 * If using a manual target by target Action Sequence, these commands will give
 * you full control over its usage.
 *
 * ---
 *
 * TARGET: Current Index
 * - Sets the current index to this value.
 * - Then decide to jump to a label (optional).
 *
 *   Set Index To:
 *   - Sets current targeting index to this value.
 *   - 0 is the starting index of a target group.
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Next Target
 * - Moves index forward by 1 to select a new current target.
 * - Then decide to jump to a label (optional).
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Previous Target
 * - Moves index backward by 1 to select a new current target.
 * - Then decide to jump to a label (optional).
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * TARGET: Random Target
 * - Sets index randomly to determine new currernt target.
 * - Then decide to jump to a label (optional).
 *
 *   Force Random?:
 *   - Index cannot be its previous index amount after random.
 *
 *   Jump To Label:
 *   - If a target is found after the index change, jump to this label in the
 *     Common Event.
 *
 * ---
 *
 * === Action Sequences - Zoom ===
 *
 * These Action Sequences are zoom-related.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * ZOOM: Reset
 * - Reset any zoom settings.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Scale
 * - Changes the zoom scale.
 * - Requires VisuMZ_3_ActSeqCamera!
 *
 *   Scale:
 *   - The zoom scale to change to.
 *
 *   Duration:
 *   - Duration in frames to reset battle zoom.
 *
 *   Zoom Easing:
 *   - Select which easing type you wish to apply.
 *   - Requires VisuMZ_0_CoreEngine.
 *
 *   Wait For Zoom?
 *   - Wait for zoom changes to complete before performing next command?
 *
 * ---
 *
 * ZOOM: Wait For Zoom
 * - Waits for zoom changes to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Auto Battle Settings
 * ============================================================================
 *
 * These Plugin Parameter settings allow you to change the aspects added by
 * this plugin that support Auto Battle and the Auto Battle commands.
 *
 * Auto Battle commands can be added to the Party Command Window and/or Actor
 * Command Window. The one used by the Party Command Window will cause the
 * whole party to enter an Auto Battle state until stopped by a button input.
 * The command used by the Actor Command Window, however, will cause the actor
 * to select an action based off the Auto Battle A.I. once for the current turn
 * instead.
 *
 * ---
 *
 * Battle Display
 * 
 *   Message:
 *   - Message that's displayed when Auto Battle is on.
 *     Text codes allowed. %1 - OK button, %2 - Cancel button
 * 
 *   OK Button:
 *   - Text used to represent the OK button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Cancel Button:
 *   - Text used to represent the Cancel button.
 *   - If VisuMZ_0_CoreEngine is present, ignore this.
 * 
 *   Background Type:
 *   - Select background type for Auto Battle window.
 *     - 0 - Window
 *     - 1 - Dim
 *     - 2 - Transparent
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this window.
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the Auto Battle options to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Startup Name:
 *   - Command name of the option.
 * 
 *   Style Name:
 *   - Command name of the option.
 * 
 *   OFF:
 *   - Text displayed when Auto Battle Style is OFF.
 * 
 *   ON:
 *   - Text displayed when Auto Battle Style is ON.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Damage Settings
 * ============================================================================
 *
 * These Plugin Parameters add a variety of things to how damage is handled in
 * battle. These range from hard damage caps to soft damage caps to how damage
 * popups appear, how the formulas for various aspects are handled and more.
 *
 * Damage Styles are also a feature added through this plugin. More information
 * can be found in the help section above labeled 'Damage Styles'.
 *
 * ---
 *
 * Damage Cap
 * 
 *   Enable Damage Cap?:
 *   - Put a maximum hard damage cap on how far damage can go?
 *   - This can be broken through the usage of notetags.
 * 
 *   Default Hard Cap:
 *   - The default hard damage cap used before applying damage.
 * 
 *   Enable Soft Cap?:
 *   - Soft caps ease in the damage values leading up to the  hard damage cap.
 *   - Requires hard Damage Cap enabled.
 * 
 *     Base Soft Cap Rate:
 *     - The default soft damage cap used before applying damage.
 * 
 *     Soft Scale Constant:
 *     - The default soft damage cap used before applying damage.
 *
 * ---
 *
 * Popups
 * 
 *   Popup Duration:
 *   - Adjusts how many frames a popup stays visible.
 * 
 *   Newest Popups Bottom:
 *   - Puts the newest popups at the bottom.
 * 
 *   Shift X:
 *   - Sets how much to shift the sprites by horizontally.
 * 
 *   Shift Y:
 *   - Sets how much to shift the sprites by vertically.
 * 
 *   Critical Flash Color:
 *   - Adjust the popup's flash color.
 *   - Format: [red, green, blue, alpha]
 * 
 *   Critical Duration:
 *   - Adjusts how many frames a the flash lasts.
 *
 * ---
 *
 * Formulas
 * 
 *   JS: Overall Formula:
 *   - The overall formula used when calculating damage.
 * 
 *   JS: Variance Formula:
 *   - The formula used when damage variance.
 * 
 *   JS: Guard Formula:
 *   - The formula used when damage is guarded.
 *
 * ---
 *
 * Critical Hits
 * 
 *   JS: Rate Formula:
 *   - The formula used to calculate Critical Hit Rates.
 * 
 *   JS: Damage Formula:
 *   - The formula used to calculate Critical Hit Damage modification.
 *
 * ---
 *
 * Damage Styles
 * 
 *   Default Style:
 *   - Which Damage Style do you want to set as default?
 *   - Use 'Manual' to not use any styles at all.
 *     - The 'Manual' style will not support <Armor Penetration> notetags.
 *     - The 'Manual' style will not support <Armor Reduction> notetags.
 * 
 *   Style List:
 *   - A list of the damage styles available.
 *   - These are used to calculate base damage.
 * 
 *     Name:
 *     - Name of this Damage Style.
 *     -Used for notetags and such.
 * 
 *     JS: Formula:
 *     - The base formula for this Damage Style.
 * 
 *     Items & Equips Core:
 * 
 *       HP Damage:
 *       MP Damage:
 *       HP Recovery:
 *       MP Recovery:
 *       HP Drain:
 *       MP Drain:
 *       - Vocabulary used for this data entry.
 * 
 *       JS: Damage Display:
 *       - Code used the data displayed for this category.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Mechanics Settings
 * ============================================================================
 *
 * Some of the base settings for the various mechanics found in the battle
 * system can be altered here in these Plugin Parameters. Most of these will
 * involve JavaScript code and require you to have to good understanding of
 * how the RPG Maker MZ code works before tampering with it.
 *
 * ---
 *
 * Action Speed
 * 
 *   Allow Random Speed?:
 *   - Allow speed to be randomized base off the user's AGI?
 * 
 *   JS: Calculate:
 *   - Code used to calculate action speed.
 *
 * ---
 *
 * Base Troop
 * 
 *   Base Troop ID's:
 *   - Select the Troop ID(s) to duplicate page events from for all
 *     other troops.
 *   - More information can be found in the dedicated Help section above.
 *
 * ---
 *
 * Escape
 * 
 *   JS: Calc Escape Ratio:
 *   - Code used to calculate the escape success ratio.
 * 
 *   JS: Calc Escape Raise:
 *   - Code used to calculate how much the escape success ratio raises upon
 *     each failure.
 * 
 * ---
 * 
 * Common Events
 * 
 *   Post-Battle Event:
 *   Victory Event:
 *   Defeat Event:
 *   Escape Success Event:
 *   Escape Fail Event:
 *   - Queued Common Event to run upon meeting the condition.
 *   - Use to 0 to not run any Common Event at all.
 *   - "Post-Battle Event" will always run regardless.
 *   - If any events are running before the battle, they will continue running
 *     to the end first before the queued Common Events will run.
 *
 * ---
 *
 * JS: Battle-Related
 * 
 *   JS: Pre-Start Battle:
 *   - Target function: BattleManager.startBattle()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Battle:
 *   - Target function: BattleManager.startBattle()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Battle Victory:
 *   - Target function: BattleManager.processVictory()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Escape Success:
 *   - Target function: BattleManager.onEscapeSuccess()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Escape Failure:
 *   - Target function: BattleManager.onEscapeFailure()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Battle Defeat:
 *   - Target function: BattleManager.processDefeat()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Pre-End Battle:
 *   - Target function: BattleManager.endBattle()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Battle:
 *   - Target function: BattleManager.endBattle()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * JS: Turn-Related
 * 
 *   JS: Pre-Start Turn:
 *   - Target function: BattleManager.startTurn()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Turn:
 *   - Target function: BattleManager.startTurn()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-End Turn:
 *   - Target function: Game_Battler.prototype.onTurnEnd()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Turn:
 *   - Target function: Game_Battler.prototype.onTurnEnd()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-Regenerate:
 *   - Target function: Game_Battler.prototype.regenerateAll()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Regenerate:
 *   - Target function: Game_Battler.prototype.regenerateAll()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * JS: Action-Related
 * 
 *   JS: Pre-Start Action:
 *   - Target function: BattleManager.startAction()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Start Action:
 *   - Target function: BattleManager.startAction()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-Apply:
 *   - Target function: Game_Action.prototype.apply()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Pre-Damage:
 *   - Target function: Game_Action.prototype.executeDamage()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-Damage:
 *   - Target function: Game_Action.prototype.executeDamage()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Post-Apply:
 *   - Target function: Game_Action.prototype.apply()
 *   - JavaScript code occurs after function is run.
 * 
 *   JS: Pre-End Action:
 *   - Target function: BattleManager.endAction()
 *   - JavaScript code occurs before function is run.
 * 
 *   JS: Post-End Action:
 *   - DescriTarget function: BattleManager.endAction()
 *   - JavaScript code occurs after function is run.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Layout Settings
 * ============================================================================
 *
 * The Battle Layout Settings Plugin Parameter gives you control over the look,
 * style, and appearance of certain UI elements. These range from the way the
 * Battle Status Window presents its information to the way certain windows
 * like the Party Command Window and Actor Command Window appear.
 *
 * ---
 *
 * Battle Layout Style
 * - The style used for the battle layout.
 * 
 *   Default:
 *   - Shows actor faces in Battle Status.
 * 
 *   List:
 *   - Lists actors in Battle Status.
 * 
 *   XP:
 *   - Shows actor battlers in a stretched Battle Status.
 * 
 *   Portrait:
 *   - Shows portraits in a stretched Battle Status.
 * 
 *   Border:
 *   - Displays windows around the screen border.
 *
 * ---
 *
 * List Style
 * 
 *   Show Faces:
 *   - Shows faces in List Style?
 *
 * ---
 *
 * XP Style
 * 
 *   Command Lines:
 *   - Number of action lines in the Actor Command Window for the XP Style.
 * 
 *   Sprite Height:
 *   - Default sprite height used when if the sprite's height has not been
 *     determined yet.
 * 
 *   Sprite Base Location:
 *   - Determine where the sprite is located on the Battle Status Window.
 *     - Above Name - Sprite is located above the name.
 *     - Bottom - Sprite is located at the bottom of the window.
 *     - Centered - Sprite is centered in the window.
 *     - Top - Sprite is located at the top of the window.
 *
 * ---
 *
 * Portrait Style
 * 
 *   Show Portraits?:
 *   - Requires VisuMZ_1_MainMenuCore.
 *   - Shows the actor's portrait instead of a face.
 * 
 *   Portrait Scaling:
 *   - If portraits are used, scale them by this much.
 *
 * ---
 *
 * Border Style
 * 
 *   Columns:
 *   - The total number of columns for Skill & Item Windows in the battle scene
 * 
 *   Show Portraits?:
 *   - Requires VisuMZ_1_MainMenuCore.
 *   - Shows the actor's portrait at the edge of the screen.
 * 
 *   Portrait Scaling:
 *   - If portraits are used, scale them by this much.
 *
 * ---
 *
 * Skill & Item Windows
 * 
 *   Middle Layout:
 *   - Shows the Skill & Item Windows in mid-screen?
 * 
 *   Columns:
 *   - The total number of columns for Skill & Item Windows in the battle scene
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Battle Log Settings
 * ============================================================================
 *
 * These Plugin Parameters give you control over how the Battle Log Window, the
 * window shown at the top of the screen in the battle layout, appears, its
 * various properties, and which text will be displayed.
 *
 * The majority of the text has been disabled by default with this plugin to
 * make the flow of battle progress faster.
 *
 * ---
 *
 * General
 * 
 *   Back Color:
 *   - Use #rrggbb for a hex color.
 * 
 *   Max Lines:
 *   - Maximum number of lines to be displayed.
 * 
 *   Message Wait:
 *   - Number of frames for a usual message wait.
 * 
 *   Text Align:
 *   - Text alignment for the Window_BattleLog.
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for the battle log.
 *
 * ---
 *
 * Start Turn
 * 
 *   Show Start Turn?:
 *   - Display turn changes at the start of the turn?
 * 
 *   Start Turn Message:
 *   - Message displayed at turn start.
 *   - %1 - Turn Count
 * 
 *   Start Turn Wait:
 *   - Number of frames to wait after a turn started.
 *
 * ---
 *
 * Display Action
 * 
 *   Show Centered Action?:
 *   - Display a centered text of the action name?
 * 
 *   Show Skill Message 1?:
 *   - Display the 1st skill message?
 * 
 *   Show Skill Message 2?:
 *   - Display the 2nd skill message?
 * 
 *   Show Item Message?:
 *   - Display the item use message?
 *
 * ---
 *
 * Action Changes
 * 
 *   Show Counter?:
 *   - Display counter text?
 * 
 *   Show Reflect?:
 *   - Display magic reflection text?
 * 
 *   Show Substitute?:
 *   - Display substitute text?
 *
 * ---
 *
 * Action Results
 * 
 *   Show No Effect?:
 *   - Display no effect text?
 * 
 *   Show Critical?:
 *   - Display critical text?
 * 
 *   Show Miss/Evasion?:
 *   - Display miss/evasion text?
 * 
 *   Show HP Damage?:
 *   - Display HP Damage text?
 * 
 *   Show MP Damage?:
 *   - Display MP Damage text?
 * 
 *   Show TP Damage?:
 *   - Display TP Damage text?
 *
 * ---
 *
 * Display States
 * 
 *   Show Added States?:
 *   - Display added states text?
 * 
 *   Show Removed States?:
 *   - Display removed states text?
 * 
 *   Show Current States?:
 *   - Display the currently affected state text?
 * 
 *   Show Added Buffs?:
 *   - Display added buffs text?
 * 
 *   Show Added Debuffs?:
 *   - Display added debuffs text?
 * 
 *   Show Removed Buffs?:
 *   - Display removed de/buffs text?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Party Command Window
 * ============================================================================
 *
 * These Plugin Parameters allow you control over how the Party Command Window
 * operates in the battle scene. You can turn disable it from appearing or make
 * it so that it doesn't 
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Party Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Party Command Window.
 * 
 *   Fight Icon:
 *   - The icon used for the Fight command.
 * 
 *   Add Auto Battle?:
 *   - Add the "Auto Battle" command to the Command Window?
 * 
 *     Auto Battle Icon:
 *     - The icon used for the Auto Battle command.
 * 
 *     Auto Battle Text:
 *     - The text used for the Auto Battle command.
 * 
 *   Add Options?:
 *   - Add the "Options" command to the Command Window?
 * 
 *     Options Icon:
 *     - The icon used for the Options command.
 * 
 *     Active TPB Message:
 *     - Message that will be displayed when selecting options during the
 *       middle of an action.
 * 
 *   Escape Icon:
 *   - The icon used for the Escape command.
 *
 * ---
 *
 * Access
 * 
 *   Skip Party Command:
 *   - DTB: Skip Party Command selection on turn start.
 *   - TPB: Skip Party Command selection at battle start.
 * 
 *   Disable Party Command:
 *   - Disable the Party Command Window entirely?
 *
 * ---
 *
 * Help Window
 * 
 *   Fight:
 *   - Text displayed when selecting a skill type.
 *   - %1 - Skill Type Name
 * 
 *   Auto Battle:
 *   - Text displayed when selecting the Auto Battle command.
 * 
 *   Options:
 *   - Text displayed when selecting the Options command.
 * 
 *   Escape:
 *   - Text displayed when selecting the escape command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Command Window
 * ============================================================================
 *
 * These Plugin Parameters allow you to change various aspects regarding the
 * Actor Command Window and how it operates in the battle scene. This ranges
 * from how it appears to the default battle commands given to all players
 * without a custom <Battle Commands> notetag.
 *
 * ---
 *
 * Command Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Actor Command Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Actor Command Window.
 * 
 *   Item Icon:
 *   - The icon used for the Item command.
 * 
 *   Normal SType Icon:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * 
 *   Magic SType Icon:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - Ignore if VisuMZ_1_SkillsStatesCore is installed.
 *
 * ---
 *
 * Battle Commands
 * 
 *   Command List:
 *   - List of battle commands that appear by default if the <Battle Commands>
 *     notetag isn't present.
 *
 *     - Attack 
 *       - Adds the basic attack command.
 * 
 *     - Skills
 *       - Displays all the skill types available to the actor.
 * 
 *     - SType: x
 *     - Stype: name
 *       - Adds in a specific skill type.
 *       - Replace 'x' with the ID of the skill type.
 *       - Replace 'name' with the name of the skill type (without text codes).
 *
 *     - All Skills
 *       - Adds all usable battle skills as individual actions.
 * 
 *     - Skill: x
 *     - Skill: name
 *       - Adds in a specific skill as a usable action.
 *       - Replace 'x' with the ID of the skill.
 *       - Replace 'name' with the name of the skill.
 * 
 *     - Guard
 *       - Adds the basic guard command.
 * 
 *     - Item
 *       - Adds the basic item command.
 * 
 *     - Escape
 *       - Adds the escape command.
 * 
 *     - Auto Battle
 *       - Adds the auto battle command.
 *
 * ---
 *
 * Help Window
 * 
 *   Skill Types:
 *   - Text displayed when selecting a skill type.
 *   - %1 - Skill Type Name
 * 
 *   Items:
 *   - Text displayed when selecting the item command.
 * 
 *   Escape:
 *   - Text displayed when selecting the escape command.
 * 
 *   Auto Battle:
 *   - Text displayed when selecting the Auto Battle command.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Actor Battler Settings
 * ============================================================================
 *
 * These Plugin Parameter settings adjust how the sideview battlers behave for
 * the actor sprites. Some of these settings are shared with enemies if they
 * use sideview battler graphics.
 *
 * ---
 *
 * Flinch
 * 
 *   Flinch Distance X:
 *   - The normal X distance when flinching.
 * 
 *   Flinch Distance Y:
 *   - The normal Y distance when flinching.
 * 
 *   Flinch Duration:
 *   - The number of frames for a flinch to complete.
 *
 * ---
 *
 * Sideview Battlers
 * 
 *   Anchor: X:
 *   - Default X anchor for Sideview Battlers.
 * 
 *   Anchor: Y:
 *   - Default Y anchor for Sideview Battlers.
 * 
 *   Motion Speed:
 *   - The number of frames in between each motion.
 * 
 *   Shadow Visible:
 *   - Show or hide the shadow for Sideview Battlers.
 * 
 *   JS: Home Position:
 *   - Code used to calculate the home position of actors.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Enemy Battler Settings
 * ============================================================================
 *
 * These Plugin Parameter settings adjust how enemies appear visually in the
 * battle scene. Some of these settings will override the settings used for
 * actors if used as sideview battlers. Other settings include changing up the
 * default attack animation for enemies, how the enemy select window functions,
 * and more.
 *
 * ---
 *
 * Visual
 * 
 *   Attack Animation:
 *   - Default attack animation used for enemies.
 *   - Use <Attack Animation: x> for custom animations.
 * 
 *   Emerge Text:
 *   - Show or hide the 'Enemy emerges!' text at the start of battle.
 *
 * ---
 *
 * Select Window
 * 
 *   FV: Right Priority:
 *   - If using frontview, auto select the enemy furthest right.
 * 
 *   SV: Right Priority:
 *   - If using sideview, auto select the enemy furthest right.
 * 
 *   Name: Font Size:
 *   - Font size used for enemy names.
 *
 * ---
 *
 * Sideview Battlers
 * 
 *   Allow Collapse:
 *   - Causes defeated enemies with SV Battler graphics to "fade away"
 *     when defeated?
 * 
 *   Anchor: X:
 *   - Default X anchor for Sideview Battlers.
 * 
 *   Anchor: Y:
 *   - Default Y anchor for Sideview Battlers.
 * 
 *   Motion: Idle:
 *   - Sets default idle animation used by Sideview Battlers.
 * 
 *   Shadow Visible:
 *   - Show or hide the shadow for Sideview Battlers.
 * 
 *   Size: Width:
 *   - Default width for enemies that use Sideview Battlers.
 * 
 *   Size: Height:
 *   - Default height for enemies that use Sideview Battlers.
 * 
 *   Weapon Type:
 *   - Sets default weapon type used by Sideview Battlers.
 *   - Use 0 for Bare Hands.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: HP Gauge Settings
 * ============================================================================
 *
 * Settings that adjust the visual HP Gauge displayed in battle.
 *
 * ---
 *
 * Show Gauges For
 * 
 *   Actors:
 *   - Show HP Gauges over the actor sprites' heads?
 *   - Requires SV Actors to be visible.
 * 
 *   Enemies:
 *   - Show HP Gauges over the enemy sprites' heads?
 *   - Can be bypassed with <Hide HP Gauge> notetag.
 * 
 *     Requires Defeat?:
 *     - Requires defeating the enemy once to show HP Gauge?
 *     - Can be bypassed with <Show HP Gauge> notetag.
 * 
 *       Battle Test Bypass?:
 *       - Bypass the defeat requirement in battle test?
 *
 * ---
 *
 * Settings
 * 
 *   Anchor X:
 *   Anchor Y:
 *   - Where do you want the HP Gauge sprite's anchor X/Y to be?
 * 
 *   Scale:
 *   - How large/small do you want the HP Gauge to be scaled?
 * 
 *   Offset X:
 *   Offset Y:
 *   - How many pixels to offset the HP Gauge's X/Y by?
 *
 * ---
 *
 * Options
 * 
 *   Add Option?:
 *   - Add the 'Show HP Gauge' option to the Options menu?
 * 
 *   Adjust Window Height:
 *   - Automatically adjust the options window height?
 * 
 *   Option Name:
 *   - Command name of the option.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Action Sequence Settings
 * ============================================================================
 *
 * Action Sequence Plugin Parameters allow you to decide if you want automatic
 * Action Sequences to be used for physical attacks, the default casting
 * animations used, how counters and reflects appear visually, and what the
 * default stepping distances are.
 *
 * ---
 *
 * Automatic Sequences
 * 
 *   Melee Single Target:
 *   - Allow this auto sequence for physical, single target actions?
 * 
 *   Melee Multi Target:
 *   - Allow this auto sequence for physical, multi-target actions?
 *
 * ---
 *
 * Cast Animations
 * 
 *   Certain Hit:
 *   - Cast animation for Certain Hit skills.
 * 
 *   Physical:
 *   - Cast animation for Physical skills.
 * 
 *   Magical:
 *   - Cast animation for Magical skills.
 *
 * ---
 *
 * Counter/Reflect
 * 
 *   Counter Back:
 *   - Play back the attack animation used?
 * 
 *   Reflect Animation:
 *   - Animation played when an action is reflected.
 * 
 *   Reflect Back:
 *   - Play back the attack animation used?
 *
 * ---
 *
 * Stepping
 * 
 *   Melee Distance:
 *   - Minimum distance in pixels for Movement Action Sequences.
 * 
 *   Step Distance X:
 *   - The normal X distance when stepping forward.
 * 
 *   Step Distance Y:
 *   - The normal Y distance when stepping forward.
 * 
 *   Step Duration:
 *   - The number of frames for a stepping action to complete.
 *
 * ---
 *
 * ============================================================================
 * Terms of Use
 * ============================================================================
 *
 * 1. These plugins may be used in free or commercial games provided that they
 * have been acquired through legitimate means at VisuStella.com and/or any
 * other official approved VisuStella sources. Exceptions and special
 * circumstances that may prohibit usage will be listed on VisuStella.com.
 * 
 * 2. All of the listed coders found in the Credits section of this plugin must
 * be given credit in your games or credited as a collective under the name:
 * "VisuStella".
 * 
 * 3. You may edit the source code to suit your needs, so long as you do not
 * claim the source code belongs to you. VisuStella also does not take
 * responsibility for the plugin if any changes have been made to the plugin's
 * code, nor does VisuStella take responsibility for user-provided custom code
 * used for custom control effects including advanced JavaScript notetags
 * and/or plugin parameters that allow custom JavaScript code.
 * 
 * 4. You may NOT redistribute these plugins nor take code from this plugin to
 * use as your own. These plugins and their code are only to be downloaded from
 * VisuStella.com and other official/approved VisuStella sources. A list of
 * official/approved sources can also be found on VisuStella.com.
 *
 * 5. VisuStella is not responsible for problems found in your game due to
 * unintended usage, incompatibility problems with plugins outside of the
 * VisuStella MZ library, plugin versions that aren't up to date, nor
 * responsible for the proper working of compatibility patches made by any
 * third parties. VisuStella is not responsible for errors caused by any
 * user-provided custom code used for custom control effects including advanced
 * JavaScript notetags and/or plugin parameters that allow JavaScript code.
 *
 * 6. If a compatibility patch needs to be made through a third party that is
 * unaffiliated with VisuStella that involves using code from the VisuStella MZ
 * library, contact must be made with a member from VisuStella and have it
 * approved. The patch would be placed on VisuStella.com as a free download
 * to the public. Such patches cannot be sold for monetary gain, including
 * commissions, crowdfunding, and/or donations.
 *
 * ============================================================================
 * Credits
 * ============================================================================
 * 
 * If you are using this plugin, credit the following people in your game:
 * 
 * Team VisuStella
 * - Yanfly
 * - Arisu
 * - Olivia
 * - Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.01:
 * * Bug Fixes!
 * ** Plugin Parameters > Damage Settings > Damage Formats are now fixed.
 *    Fix made by Olivia.
 * ** TPB Battle System with Disable Party Command fixed. Fix made by Olivia.
 * ** States now show in list format if faces are disabled. Fix made by Yanfly.
 * ** The default damage styles were missing the 'v' variable to allow for
 *    variable data input. These are back now. Fix made by Yanfly.
 * *** Users updating from version 1.00 will need to fix this problem by either
 *     removing the plugin from the Plugin Manager list and reinstalling it, or
 *     going to Plugin Parameters > Damage Settings > Style List > the style
 *     you want, and adding "const v = $gameVariables._data;" to JS: Formula
 * * New Notetags Added:
 * ** <Command Show Switch: x> added by Olivia
 * ** <Command Show All Switches: x,x,x> added by Olivia
 * ** <Command Show Any Switches: x,x,x> added by Olivia
 * ** <Command Hide Switch: x> added by Olivia
 * ** <Command Hide All Switches: x,x,x> added by Olivia
 * ** <Command Hide Any Switches: x,x,x> added by Olivia
 * ** <JS Command Visible> added by Olivia
 *
 * Version 1.00:
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceStart
 * @text -
 * @desc The following are Action Sequences commands/sets.
 * These Plugin Commands only work in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakSet
 * @text Action Sequence - Action Sets
 * @desc Action Sequence Action Sets are groups of commonly used
 * Action Sequence Commands put together for more efficient usage.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_SetupAction
 * @text ACSET: Setup Action Set
 * @desc The generic start to most actions.
 * 
 * @arg DisplayAction:eval
 * @text Display Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: On
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionStart:eval
 * @text Battle Step
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg CastAnimation:eval
 * @text Cast Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_WholeActionSet
 * @text ACSET: All Targets Action Set
 * @desc Affects all targets simultaneously performing the following.
 * 
 * @arg PerformAction:eval
 * @text Perform Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed
 * 
 * @arg ActionAnimation:eval
 * @text Action Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionEffect:eval
 * @text Action Effect
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_TargetActionSet
 * @text ACSET: Each Target Action Set
 * @desc Goes through each target one by one to perform the following.
 * 
 * @arg PerformAction:eval
 * @text Perform Action
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount1:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed
 * 
 * @arg ActionAnimation:eval
 * @text Action Animation
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitCount2:eval
 * @text Wait Count
 * @desc How many frames should the action sequence wait?
 * You may use JavaScript code.
 * @default Sprite_Battler._motionSpeed * 2
 * 
 * @arg ActionEffect:eval
 * @text Action Effect
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ApplyImmortal:eval
 * @text Immortal: Off
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Set_FinishAction
 * @text ACSET: Finish Action
 * @desc The generic ending to most actions.
 * 
 * @arg WaitForNewLine:eval
 * @text Wait For New Line
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForEffect:eval
 * @text Wait For Effects
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ClearBattleLog:eval
 * @text Clear Battle Log
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg ActionEnd:eval
 * @text Home Reset
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use this part of the action sequence?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceAnimation
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakAnimation
 * @text Action Sequences - Animations
 * @desc These Action Sequences are related to the 'Animations' that
 * can be found in the Animations tab of the Database.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ActionAnimation
 * @text ANIM: Action Animation
 * @desc Plays the animation associated with the action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_AttackAnimation
 * @text ANIM: Attack Animation
 * @desc Plays the animation associated with the user's weapon.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_CastAnimation
 * @text ANIM: Cast Animation
 * @desc Plays the cast animation associated with the action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["user"]
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ChangeBattlePortrait
 * @text ANIM: Change Battle Portrait
 * @desc Changes the battle portrait of the actor (if it's an actor).
 * Can be used outside of battle/action sequences.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to change the portraits for.
 * Valid units can only be actors.
 * @default ["user"]
 * 
 * @arg Filename:str
 * @text Filename
 * @type file
 * @dir img/pictures/
 * @desc Select the file to change the actor's portrait to.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_ShowAnimation
 * @text ANIM: Show Animation
 * @desc Plays the a specific animation on unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to play the animation on.
 * @default ["all targets"]
 * 
 * @arg AnimationID:num
 * @text Animation ID
 * @type animation
 * @desc Select which animation to play on unit(s).
 * @default 1
 * 
 * @arg Mirror:eval
 * @text Mirror Animation
 * @type boolean
 * @on Mirror
 * @off Normal
 * @desc Mirror the animation?
 * @default false
 * 
 * @arg WaitForAnimation:eval
 * @text Wait For Animation?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for animation to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Animation_WaitForAnimation
 * @text ANIM: Wait For Animation
 * @desc Causes the interpreter to wait for any animation(s) to finish.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceBattleLog
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakBattleLog
 * @text Action Sequences - Battle Log
 * @desc These Action Sequences are related to the Battle Log Window,
 * the window found at the top of the battle screen.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_AddText
 * @text BTLOG: Add Text
 * @desc Adds a new line of text into the Battle Log.
 * 
 * @arg Text:str
 * @text Text
 * @desc Add this text into the Battle Log.
 * Text codes allowed.
 * @default Insert text here.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_Clear
 * @text BTLOG: Clear Battle Log
 * @desc Clears all the text in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_DisplayAction
 * @text BTLOG: Display Action
 * @desc Displays the current action in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_PopBaseLine
 * @text BTLOG: Pop Base Line
 * @desc Removes the Battle Log's last added base line and 
 * all text up to its former location.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_PushBaseLine
 * @text BTLOG: Push Base Line
 * @desc Adds a new base line to where the Battle Log currently is at.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_Refresh
 * @text BTLOG: Refresh Battle Log
 * @desc Refreshes the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_UI
 * @text BTLOG: UI Show/Hide
 * @desc Shows or hides the Battle UI (including the Battle Log).
 * 
 * @arg ShowHide:eval
 * @text Show/Hide?
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows/hides the Battle UI.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_WaitForBattleLog
 * @text BTLOG: Wait For Battle Log
 * @desc Causes the interpreter to wait for the Battle Log to finish.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_BattleLog_WaitForNewLine
 * @text BTLOG: Wait For New Line
 * @desc Causes the interpreter to wait for a new line in the Battle Log.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceCamera
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Clamp
 * @text CAMERA: Clamp ON/OFF
 * @desc Turns battle camera clamping on/off.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Setting:eval
 * @text ON/OFF
 * @type boolean
 * @on ON
 * @off OFF
 * @desc Turns camera clamping on/off.
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_FocusPoint
 * @text CAMERA: Focus Point
 * @desc Focus the battle camera on a certain point in the screen.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg FocusX:eval
 * @text X Coordinate
 * @desc Insert the point to focus the camera on.
 * You may use JavaScript code.
 * @default Graphics.width / 2
 * 
 * @arg FocusY:eval
 * @text Y Coordinate
 * @desc Insert the point to focus the camera on.
 * You may use JavaScript code.
 * @default Graphics.height / 2
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for camera focus change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_FocusTarget
 * @text CAMERA: Focus Target(s)
 * @desc Focus the battle camera on certain battler target(s).
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to focus the battle camera on.
 * @default ["user"]
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for camera focus change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Offset
 * @text CAMERA: Offset
 * @desc Offset the battle camera from the focus target.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg OffsetX:eval
 * @text Offset X
 * @desc How much to offset the camera X by.
 * Negative: left. Positive: right.
 * @default +0
 * 
 * @arg OffsetY:eval
 * @text Offset Y
 * @desc How much to offset the camera Y by.
 * Negative: up. Positive: down.
 * @default +0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for offset change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_Reset
 * @text CAMERA: Reset
 * @desc Reset the battle camera settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg ResetFocus:eval
 * @text Reset Focus?
 * @type boolean
 * @on On
 * @off Off
 * @desc Reset the focus point?
 * @default true
 * 
 * @arg ResetOffset:eval
 * @text Reset Offset?
 * @type boolean
 * @on On
 * @off Off
 * @desc Reset the camera offset?
 * @default true
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for reset change.
 * @default 60
 *
 * @arg EasingType:str
 * @text Camera Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForCamera:eval
 * @text Wait For Camera?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for camera changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Camera_WaitForCamera
 * @text CAMERA: Wait For Camera
 * @desc Waits for camera to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 *
 * @command ActionSequenceSpaceDragonbones
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreaDragonbones
 * @text Action Sequences - Dragonbones
 * @desc These Action Sequences are Dragonbones-related.
 * Requires VisuMZ_2_DragonbonesUnion!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_DB_DragonbonesMotionAni
 * @text DB: Dragonbones Animation
 * @desc Causes the unit(s) to play a Dragonbones motion animation.
 * Requires VisuMZ_2_DragonbonesUnion!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion animation.
 * @default ["user"]
 *
 * @arg MotionAni:str
 * @text Motion Animation
 * @desc What is the name of the Dragonbones motion animation you wish to play?
 * @default attack
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_DB_DragonbonesTimeScale
 * @text DB: Dragonbones Time Scale
 * @desc Causes the unit(s) to change their Dragonbones time scale.
 * Requires VisuMZ_2_DragonbonesUnion!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion animation.
 * @default ["user"]
 *
 * @arg TimeScale:num
 * @text Time Scale
 * @desc Change the value of the Dragonbones time scale to this.
 * @default 1.0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceElements
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakElements
 * @text Action Sequences - Elements
 * @desc These Action Sequences are related to elements.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_AddElements
 * @text ELE: Add Elements
 * @desc Adds element(s) to be used when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @arg Elements:arraynum
 * @text Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which element ID to add onto the action.
 * Insert multiple element ID's to add multiple at once.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_Clear
 * @text ELE: Clear Element Changes
 * @desc Clears all element changes made through Action Sequences.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_ForceElements
 * @text ELE: Force Elements
 * @desc Forces only specific element(s) when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @arg Elements:arraynum
 * @text Elements
 * @type number[]
 * @min 1
 * @max 99
 * @desc Select which element ID to force in the action.
 * Insert multiple element ID's to force multiple at once.
 * @default ["1"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Element_NullElements
 * @text ELE: Null Element
 * @desc Forces no element to be used when calculating damage.
 * Requires VisuMZ_1_ElementStatusCore!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMechanics
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMechanics
 * @text Action Sequences - Mechanics
 * @desc These Action Sequences are related to various mechanics
 * related to the battle system.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_ActionEffect
 * @text MECH: Action Effect
 * @desc Causes the unit(s) to take damage/healing from action and
 * incurs any changes made such as buffs and states.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the current action's effects.
 * @default ["all targets"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AddBuffDebuff
 * @text MECH: Add Buff/Debuff
 * @desc Adds buff(s)/debuff(s) to unit(s). 
 * Determine which parameters are affected and their durations.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the buff(s) and/or debuff(s).
 * @default ["user"]
 * 
 * @arg Buffs:arraystr
 * @text Buff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which parameter(s) to buff.
 * Insert a parameter multiple times to raise its stacks.
 * @default ["ATK"]
 *
 * @arg Debuffs:arraystr
 * @text Debuff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which parameter(s) to debuff.
 * Insert a parameter multiple times to raise its stacks.
 * @default ["DEF"]
 * 
 * @arg Turns:eval
 * @text Turns
 * @desc Number of turns to set the parameter(s) buffs to.
 * You may use JavaScript code.
 * @default 5
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AddState
 * @text MECH: Add State
 * @desc Adds state(s) to unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the buff(s).
 * @default ["user"]
 * 
 * @arg States:arraynum
 * @text States
 * @type state[]
 * @desc Select which state ID(s) to add to unit(s).
 * Insert multiple state ID's to add multiple at once.
 * @default ["4"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_ArmorPenetration
 * @text MECH: Armor Penetration
 * @desc Adds an extra layer of defensive penetration/reduction.
 * You may use JavaScript code for any of these.
 *
 * @arg ArmorPenetration
 * @text Armor/Magic Penetration
 * 
 * @arg ArPenRate:eval
 * @text Rate
 * @parent ArmorPenetration
 * @desc Penetrates an extra multiplier of armor by this value.
 * @default 0.00
 * 
 * @arg ArPenFlat:eval
 * @text Flat
 * @parent ArmorPenetration
 * @desc Penetrates a flat amount of armor by this value.
 * @default 0
 *
 * @arg ArmorReduction
 * @text Armor/Magic Reduction
 * 
 * @arg ArRedRate:eval
 * @text Rate
 * @parent ArmorReduction
 * @desc Reduces an extra multiplier of armor by this value.
 * @default 0.00
 * 
 * @arg ArRedFlat:eval
 * @text Flat
 * @parent ArmorReduction
 * @desc Reduces a flat amount of armor by this value.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_AtbGauge
 * @text MECH: ATB Gauge
 * @desc Alters the ATB/TPB Gauges.
 * Requires VisuMZ_2_BattleSystemATB!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to alter the ATB/TPB Gauges for.
 * @default ["all targets"]
 *
 * @arg Charging
 * 
 * @arg ChargeRate:eval
 * @text Charge Rate
 * @parent Charging
 * @desc Changes made to the ATB Gauge if it is currently charging.
 * @default -0.00
 * 
 * @arg Casting
 * 
 * @arg CastRate:eval
 * @text Cast Rate
 * @parent Casting
 * @desc Changes made to the ATB Gauge if it is currently casting.
 * @default -0.00
 * 
 * @arg Interrupt:eval
 * @text Interrupt?
 * @parent Casting
 * @type boolean
 * @on Interrupt
 * @off Don't Interrupt
 * @desc Interrupt the ATB Gauge if it is currently casting?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Collapse
 * @text MECH: Collapse
 * @desc Causes the unit(s) to perform its collapse animation
 * if the unit(s) has died.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to process a death collapse.
 * @default ["all targets"]
 * 
 * @arg ForceDeath:eval
 * @text Force Death
 * @type boolean
 * @on On
 * @off Off
 * @desc Force death even if the unit has not reached 0 HP?
 * This will remove immortality.
 * @default false
 * 
 * @arg WaitForEffect:eval
 * @text Wait For Effect?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for the collapse effect to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_DamagePopup
 * @text MECH: Damage Popup
 * @desc Causes the unit(s) to display the current state of
 * damage received or healed.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a damage popup.
 * @default ["all targets"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_DeathBreak
 * @text MECH: Dead Label Jump
 * @desc If the active battler is dead, jump to a specific label in the common event.
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If the active battler is dead, jump to this specific label in the common event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_HpMpTp
 * @text MECH: HP, MP, TP
 * @desc Alters the HP, MP, and TP values for unit(s).
 * Positive values for healing. Negative values for damage.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to receive the current action's effects.
 * @default ["user"]
 *
 * @arg HP
 * 
 * @arg HP_Rate:eval
 * @text HP Rate
 * @parent HP
 * @desc Changes made to HP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg HP_Flat:eval
 * @text HP Flat
 * @parent HP
 * @desc Flat changes made to HP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 * 
 * @arg MP
 * 
 * @arg MP_Rate:eval
 * @text MP Rate
 * @parent MP
 * @desc Changes made to MP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg MP_Flat:eval
 * @text MP Flat
 * @parent MP
 * @desc Flat changes made to MP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 *
 * @arg TP
 * 
 * @arg TP_Rate:eval
 * @text TP Rate
 * @parent TP
 * @desc Changes made to TP based on rate.
 * Positive values for healing. Negative values for damage.
 * @default +0.00
 * 
 * @arg TP_Flat:eval
 * @text TP Flat
 * @parent TP
 * @desc Flat changes made to TP.
 * Positive values for healing. Negative values for damage.
 * @default +0
 * 
 * @arg ShowPopup:eval
 * @text Damage Popup?
 * @type boolean
 * @on On
 * @off Off
 * @desc Display a damage popup after?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Immortal
 * @text MECH: Immortal
 * @desc Changes the immortal flag of targets. If immortal flag is
 * removed and a unit would die, collapse that unit.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Alter the immortal flag of these groups. If immortal flag
 * is removed and a unit would die, collapse that unit.
 * @default ["user","all targets"]
 * 
 * @arg Immortal:eval
 * @text Immortal
 * @type boolean
 * @on On
 * @off Off
 * @desc Turn immortal flag for unit(s) on/off?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_Multipliers
 * @text MECH: Multipliers
 * @desc Changes the multipliers for the current action.
 * You may use JavaScript code for any of these.
 *
 * @arg CriticalHit
 * @text Critical Hit%
 * 
 * @arg CriticalHitRate:eval
 * @text Rate
 * @parent CriticalHit
 * @desc Affects chance to land a critical hit by this multiplier.
 * @default 1.00
 * 
 * @arg CriticalHitFlat:eval
 * @text Flat
 * @parent CriticalHit
 * @desc Affects chance to land a critical hit by this flat bonus.
 * @default +0.00
 *
 * @arg CriticalDmg
 * @text Critical Damage
 * 
 * @arg CriticalDmgRate:eval
 * @text Rate
 * @parent CriticalDmg
 * @desc Affects critical damage by this multiplier.
 * @default 1.00
 * 
 * @arg CriticalDmgFlat:eval
 * @text Flat
 * @parent CriticalDmg
 * @desc Affects critical damage by this flat bonus.
 * @default +0.00
 *
 * @arg Damage
 * @text Damage/Healing
 * 
 * @arg DamageRate:eval
 * @text Rate
 * @parent Damage
 * @desc Sets the damage/healing multiplier for current action.
 * @default 1.00
 * 
 * @arg DamageFlat:eval
 * @text Flat
 * @parent Damage
 * @desc Sets the damage/healing bonus for current action.
 * @default +0.00
 *
 * @arg HitRate
 * @text Hit Rate
 * 
 * @arg HitRate:eval
 * @text Rate
 * @parent HitRate
 * @desc Affects chance to connect attack by this multiplier.
 * @default 1.00
 * 
 * @arg HitFlat:eval
 * @text Flat
 * @parent HitRate
 * @desc Affects chance to connect attack by this flat bonus.
 * @default +0.00
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_RemoveBuffDebuff
 * @text MECH: Remove Buff/Debuff
 * @desc Removes buff(s)/debuff(s) from unit(s). 
 * Determine which parameters are removed.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to have the buff(s) and/or debuff(s) removed.
 * @default ["user"]
 * 
 * @arg Buffs:arraystr
 * @text Buff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which buffed parameter(s) to remove.
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @arg Debuffs:arraystr
 * @text Debuff Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @desc Select which debuffed parameter(s) to remove.
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_RemoveState
 * @text MECH: Remove State
 * @desc Remove state(s) from unit(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to have states removed from.
 * @default ["user"]
 * 
 * @arg States:arraynum
 * @text States
 * @type state[]
 * @desc Select which state ID(s) to remove from unit(s).
 * Insert multiple state ID's to remove multiple at once.
 * @default ["4"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_TextPopup
 * @text MECH: Text Popup
 * @desc Causes the unit(s) to display a text popup.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select unit(s) to prompt a text popup.
 * @default ["target"]
 * 
 * @arg Text:str
 * @text Text
 * @desc What text do you wish to display?
 * @default Text
 * 
 * @arg TextColor:str
 * @text Text Color
 * @parent Text:str
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #ffffff
 *
 * @arg FlashColor:eval
 * @text Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 * 
 * @arg FlashDuration:num
 * @text Flash Duration
 * @parent FlashColor:eval
 * @type Number
 * @desc What is the frame duration of the flash effect?
 * @default 60
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Mechanics_WaitForEffect
 * @text MECH: Wait For Effect
 * @desc Waits for the effects to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMotion
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMotion
 * @text Action Sequences - Motion
 * @desc These Action Sequences allow you the ability to control
 * the motions of sideview sprites.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_MotionType
 * @text MOTION: Motion Type
 * @desc Causes the unit(s) to play the selected motion.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion.
 * @default ["user"]
 *
 * @arg MotionType:str
 * @text Motion Type
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default attack
 *
 * @arg ShowWeapon:eval
 * @text Show Weapon?
 * @type combo
 * @type boolean
 * @on Show
 * @off Hide
 * @desc If using 'attack', 'thrust', 'swing', or 'missile',
 * display the weapon sprite?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_PerformAction
 * @text MOTION: Perform Action
 * @desc Causes the unit(s) to play the proper motion based
 * on the current action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to perform a motion.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_RefreshMotion
 * @text MOTION: Refresh Motion
 * @desc Cancels any set motions unit(s) has to do and use
 * their most natural motion at the moment.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to refresh their motion state.
 * @default ["user"]
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Motion_WaitMotionFrame
 * @text MOTION: Wait By Motion Frame
 * @desc Creates a wait equal to the number of motion frames passing.
 * Time is based on Plugin Parameters => Actors => Motion Speed.
 *
 * @arg MotionFrameWait:num
 * @text Motion Frames to Wait?
 * @type number
 * @min 1
 * @desc Each "frame" is equal to the value found in
 * Plugin Parameters => Actors => Motion Speed
 * @default 1
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceMovement
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakMovement
 * @text Action Sequences - Movement
 * @desc These Action Sequences allow you the ability to control
 * the sprites of actors and enemies in battle.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_BattleStep
 * @text MOVE: Battle Step
 * @desc Causes the unit(s) to move forward past their home position
 * to prepare for action.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FaceDirection
 * @text MOVE: Face Direction
 * @desc Causes the unit(s) to face forward or backward.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Direction:str
 * @text Direction
 * @type combo
 * @option forward
 * @option backward
 * @option random
 * @desc Select which direction to face.
 * @default forward
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FacePoint
 * @text MOVE: Face Point
 * @desc Causes the unit(s) to face a point on the screen.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Point:str
 * @text Point
 * @type combo
 * @option home
 * @option center
 * @option point x, y
 * @desc Select which point to face.
 * Replace 'x' and 'y' with coordinates
 * @default home
 * 
 * @arg FaceAway:eval
 * @text Face Away From?
 * @type boolean
 * @on Turn Away
 * @off Face Directly
 * @desc Face away from the point instead?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_FaceTarget
 * @text MOVE: Face Target(s)
 * @desc Causes the unit(s) to face other targets on the screen.
 * Sideview-only!
 * 
 * @arg Targets1:arraystr
 * @text Targets (facing)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to change direction.
 * @default ["user"]
 * 
 * @arg Targets2:arraystr
 * @text Targets (destination)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) for the turning unit(s) to face.
 * @default ["current target"]
 * 
 * @arg FaceAway:eval
 * @text Face Away From?
 * @type boolean
 * @on Turn Away
 * @off Face Directly
 * @desc Face away from the unit(s) instead?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Float
 * @text MOVE: Float
 * @desc Causes the unit(s) to float above the ground.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to make float.
 * @default ["user"]
 * 
 * @arg Height:eval
 * @text Desired Height
 * @desc Vertical distance to float upward.
 * You may use JavaScript code.
 * @default 100
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total float amount.
 * @default 12
 *
 * @arg EasingType:str
 * @text Float Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForFloat:eval
 * @text Wait For Float?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for floating to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_HomeReset
 * @text MOVE: Home Reset
 * @desc Causes the unit(s) to move back to their home position(s)
 * and face back to their original direction(s).
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["alive battlers"]
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Jump
 * @text MOVE: Jump
 * @desc Causes the unit(s) to jump into the air.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to make jump.
 * @default ["user"]
 * 
 * @arg Height:eval
 * @text Desired Height
 * @desc Max jump height to go above the ground
 * You may use JavaScript code.
 * @default 100
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total jump amount.
 * @default 12
 * 
 * @arg WaitForJump:eval
 * @text Wait For Jump?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for jumping to complete before performing next command?
 * @default false
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveBy
 * @text MOVE: Move Distance
 * @desc Moves unit(s) by a distance from their current position(s).
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 *
 * @arg DistanceAdjust:str
 * @text Distance Adjustment
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to distance values to determine
 * which direction to move unit(s).
 * @default horz
 * 
 * @arg DistanceX:eval
 * @text Distance: X
 * @parent DistanceAdjust:str
 * @desc Horizontal distance to move.
 * You may use JavaScript code.
 * @default 48
 * 
 * @arg DistanceY:eval
 * @text Distance: Y
 * @parent DistanceAdjust:str
 * @desc Vertical distance to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveToPoint
 * @text MOVE: Move To Point
 * @desc Moves unit(s) to a designated point on the screen.
 * Sideview-only! Points based off Graphics.boxWidth/Height.
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg Destination:str
 * @text Destination Point
 * @type combo
 * @option home
 * @option center
 * @option point x, y
 * @desc Select which point to face.
 * Replace 'x' and 'y' with coordinates
 * @default home
 *
 * @arg OffsetAdjust:str
 * @text Offset Adjustment
 * @parent Destination:str
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to offset values to determine
 * which direction to adjust the destination by.
 * @default horz
 * 
 * @arg OffsetX:eval
 * @text Offset: X
 * @parent OffsetAdjust:str
 * @desc Horizontal offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg OffsetY:eval
 * @text Offset: Y
 * @parent OffsetAdjust:str
 * @desc Vertical offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_MoveToTarget
 * @text MOVE: Move To Target(s)
 * @desc Moves unit(s) to another unit(s) on the battle field.
 * Sideview-only!
 * 
 * @arg Targets1:arraystr
 * @text Targets (Moving)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move.
 * @default ["user"]
 * 
 * @arg Targets2:arraystr
 * @text Targets (Destination)
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to move to.
 * @default ["all targets"]
 * 
 * @arg TargetLocation:str
 * @text Target Location
 * @parent Targets2:arraystr
 * @type combo
 * @option front head
 * @option front center
 * @option front base
 * @option middle head
 * @option middle center
 * @option middle base
 * @option back head
 * @option back center
 * @option back base
 * @desc Select which part target group to move to.
 * @default front base
 * 
 * @arg MeleeDistance:eval
 * @text Melee Distance
 * @parent TargetLocation:str
 * @desc The melee distance away from the target location
 * in addition to the battler's width.
 * @default 24
 *
 * @arg OffsetAdjust:str
 * @text Offset Adjustment
 * @parent Targets2:arraystr
 * @type select
 * @option Normal - No adjustments made
 * @value none
 * @option Horizontal - Actors adjust left, Enemies adjust right
 * @value horz
 * @option Vertical - Actors adjust Up, Enemies adjust down
 * @value vert
 * @option Both - Applies both Horizontal and Vertical
 * @value horz + vert
 * @desc Makes adjustments to offset values to determine
 * which direction to adjust the destination by.
 * @default horz
 * 
 * @arg OffsetX:eval
 * @text Offset: X
 * @parent OffsetAdjust:str
 * @desc Horizontal offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg OffsetY:eval
 * @text Offset: Y
 * @parent OffsetAdjust:str
 * @desc Vertical offset to move.
 * You may use JavaScript code.
 * @default 0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for total movement amount.
 * @default 12
 * 
 * @arg FaceDirection:eval
 * @text Face Destination?
 * @type boolean
 * @on Turn
 * @off Don't
 * @desc Turn and face the destination?
 * @default true
 *
 * @arg EasingType:str
 * @text Movement Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 *
 * @arg MotionType:str
 * @text Movement Motion
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option attack
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Play this motion for the unit(s).
 * @default walk
 * 
 * @arg WaitForMovement:eval
 * @text Wait For Movement?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for movement to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_Opacity
 * @text MOVE: Opacity
 * @desc Causes the unit(s) to change opacity.
 * Sideview-only!
 * 
 * @arg Targets:arraystr
 * @text Targets
 * @type combo[]
 * @option user
 * @option current target
 * @option prev target
 * @option next target
 * @option all targets
 * @option focus
 * @option not focus
 * @option 
 * @option alive friends
 * @option alive friends not user
 * @option alive friends not target
 * @option dead friends
 * @option friend index x
 * @option 
 * @option alive opponents
 * @option alive opponents not target
 * @option dead opponents
 * @option opponent index x
 * @option 
 * @option alive actors
 * @option alive actors not user
 * @option alive actors not target
 * @option dead actors
 * @option actor index x
 * @option actor ID x
 * @option 
 * @option alive enemies
 * @option alive enemies not user
 * @option alive enemies not target
 * @option dead enemies
 * @option enemy index x
 * @option enemy ID x
 * @option 
 * @option alive battlers
 * @option alive battlers not user
 * @option alive battlers not target
 * @option dead battlers
 * @option 
 * @desc Select which unit(s) to make float.
 * @default ["user"]
 * 
 * @arg Opacity:eval
 * @text Desired Opacity
 * @desc Change to this opacity value.
 * You may use JavaScript code.
 * @default 255
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames for opacity change.
 * @default 12
 *
 * @arg EasingType:str
 * @text Opacity Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default Linear
 * 
 * @arg WaitForOpacity:eval
 * @text Wait For Opacity?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for opacity changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForFloat
 * @text MOVE: Wait For Float
 * @desc Waits for floating to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForJump
 * @text MOVE: Wait For Jump
 * @desc Waits for jumping to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForMovement
 * @text MOVE: Wait For Movement
 * @desc Waits for movement to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Movement_WaitForOpacity
 * @text MOVE: Wait For Opacity
 * @desc Waits for opacity changes to complete before performing next command.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceTarget
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceBreakTarget
 * @text Action Sequences - Target
 * @desc If using a manual target by target Action Sequence,
 * these commands will give you full control over its usage.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_CurrentIndex
 * @text TARGET: Current Index
 * @desc Sets the current index to this value.
 * Then decide to jump to a label (optional).
 * 
 * @arg Index:eval
 * @text Set Index To
 * @desc Sets current targeting index to this value.
 * 0 is the starting index of a target group.
 * @default 0
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_NextTarget
 * @text TARGET: Next Target
 * @desc Moves index forward by 1 to select a new current target.
 * Then decide to jump to a label (optional).
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_PrevTarget
 * @text TARGET: Previous Target
 * @desc Moves index backward by 1 to select a new current target.
 * Then decide to jump to a label (optional).
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Target_RandTarget
 * @text TARGET: Random Target
 * @desc Sets index randomly to determine new currernt target.
 * Then decide to jump to a label (optional).
 * 
 * @arg ForceRandom:eval
 * @text Force Random?
 * @type boolean
 * @on On
 * @off Off
 * @desc Index cannot be its previous index amount after random.
 * @default false
 * 
 * @arg JumpToLabel:str
 * @text Jump To Label
 * @desc If a target is found after the index change,
 * jump to this label in the Common Event.
 * @default Untitled
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceZoom
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_Clear
 * @text ZOOM: Reset
 * @desc Reset any zoom settings.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to reset battle zoom.
 * @default 60
 *
 * @arg EasingType:str
 * @text Zoom Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForZoom:eval
 * @text Wait For Zoom?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for zoom changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_Scale
 * @text ZOOM: Scale
 * @desc Changes the zoom scale.
 * Requires VisuMZ_3_ActSeqCamera!
 * 
 * @arg Scale:eval
 * @text Scale
 * @desc The zoom scale to change to.
 * @default 1.0
 * 
 * @arg Duration:eval
 * @text Duration
 * @desc Duration in frames to change battle zoom.
 * @default 60
 *
 * @arg EasingType:str
 * @text Zoom Easing
 * @type combo
 * @option Linear
 * @option InSine
 * @option OutSine
 * @option InOutSine
 * @option InQuad
 * @option OutQuad
 * @option InOutQuad
 * @option InCubic
 * @option OutCubic
 * @option InOutCubic
 * @option InQuart
 * @option OutQuart
 * @option InOutQuart
 * @option InQuint
 * @option OutQuint
 * @option InOutQuint
 * @option InExpo
 * @option OutExpo
 * @option InOutExpo
 * @option InCirc
 * @option OutCirc
 * @option InOutCirc
 * @option InBack
 * @option OutBack
 * @option InOutBack
 * @option InElastic
 * @option OutElastic
 * @option InOutElastic
 * @option InBounce
 * @option OutBounce
 * @option InOutBounce
 * @desc Select which easing type you wish to apply.
 * Requires VisuMZ_0_CoreEngine.
 * @default InOutSine
 * 
 * @arg WaitForZoom:eval
 * @text Wait For Zoom?
 * @type boolean
 * @on On
 * @off Off
 * @desc Wait for zoom changes to complete before performing next command?
 * @default true
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActSeq_Zoom_WaitForZoom
 * @text ZOOM: Wait For Zoom
 * @desc Waits for zoom to complete before performing next command.
 * Requires VisuMZ_3_ActSeqCamera!
 *
 * @ --------------------------------------------------------------------------
 *
 * @command ActionSequenceSpaceEnd
 * @text -
 * @desc -
 *
 * @ --------------------------------------------------------------------------
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BattleCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param AutoBattle:struct
 * @text Auto Battle Settings
 * @type struct<AutoBattle>
 * @desc Settings pertaining to Auto Battle.
 * @default {"BattleDisplay":"","AutoBattleMsg:str":"Press %1 or %2 to stop Auto Battle","AutoBattleOK:str":"OK","AutoBattleCancel:str":"Cancel","AutoBattleBgType:num":"1","AutoBattleRect:func":"\"const width = Graphics.width;\\nconst height = this.calcWindowHeight(1, false);\\nconst x = 0;\\nconst y = (Graphics.height - height) / 2;\\nreturn new Rectangle(x, y, width, height);\"","Options":"","AddOption:eval":"true","AdjustRect:eval":"true","StartName:str":"Auto Battle Start","StyleName:str":"Auto Battle Style","StyleOFF:str":"Attack","StyleON:str":"Skills"}
 *
 * @param Damage:struct
 * @text Damage Settings
 * @type struct<Damage>
 * @desc Settings pertaining to damage calculations.
 * @default {"Cap":"","EnableDamageCap:eval":"false","DefaultHardCap:num":"9999","EnableSoftCap:eval":"false","DefaultSoftCap:num":"0.80","DefaultSoftScaler:num":"0.1275","Popups":"","PopupDuration:num":"128","NewPopupBottom:eval":"true","PopupShiftX:num":"8","PopupShiftY:num":"-28","hpDamageFmt:str":"-%1","hpHealingFmt:str":"+%1","mpDamageFmt:str":"-%1 %2","mpHealingFmt:str":"+%1 %2","CriticalColor:eval":"[255, 0, 0, 160]","CriticalDuration:num":"128","Formulas":"","OverallFormulaJS:func":"\"// Declare Constants\\nconst target = arguments[0];\\nconst critical = arguments[1];\\nconst item = this.item();\\n\\n// Get Base Damage\\nconst baseValue = this.evalDamageFormula(target);\\n\\n// Calculate Element Modifiers\\nlet value = baseValue * this.calcElementRate(target);\\n\\n// Calculate Physical and Magical Modifiers\\nif (this.isPhysical()) {\\n    value *= target.pdr;\\n}\\nif (this.isMagical()) {\\n    value *= target.mdr;\\n}\\n\\n// Apply Healing Modifiers\\nif (baseValue < 0) {\\n    value *= target.rec;\\n}\\n\\n// Apply Critical Modifiers\\nif (critical) {\\n    value = this.applyCritical(value);\\n}\\n\\n// Apply Variance and Guard Modifiers\\nvalue = this.applyVariance(value, item.damage.variance);\\nvalue = this.applyGuard(value, target);\\n\\n// Finalize Damage\\nvalue = Math.round(value);\\nreturn value;\"","VarianceFormulaJS:func":"\"// Declare Constants\\nconst damage = arguments[0];\\nconst variance = arguments[1];\\n\\n// Calculate Variance\\nconst amp = Math.floor(Math.max((Math.abs(damage) * variance) / 100, 0));\\nconst v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;\\n\\n// Return Damage\\nreturn damage >= 0 ? damage + v : damage - v;\"","GuardFormulaJS:func":"\"// Declare Constants\\nconst damage = arguments[0];\\nconst target = arguments[1];\\n\\n// Return Damage Early\\nconst note = this.item().note;\\nif (note.match(/<UNBLOCKABLE>/i)) return damage;\\nif (!target.isGuard()) return damage;\\nif (damage < 0) return damage;\\n\\n// Declare Guard Rate\\nlet guardRate = 0.5;\\nguardRate /= target.grd;\\n\\n// Return Damage\\nreturn damage * guardRate;\"","Critical":"","CriticalHitRateJS:func":"\"// Declare Constants\\nconst user = this.subject();\\nconst target = arguments[0];\\n\\n// Create Base Critical Rate\\nlet rate = this.subject().cri * (1 - target.cev);\\n\\n// Apply Notetags\\nconst note = this.item().note;\\nif (note.match(/<ALWAYS CRITICAL>/i)) {\\n    return 1;\\n}\\nif (note.match(/<SET CRITICAL RATE:[ ](\\\\d+)([%％])>/i)) {\\n    return Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL RATE:[ ](\\\\d+)([%％])>/i)) {\\n    rate *= Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL RATE:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    rate += Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<JS CRITICAL RATE>\\\\s*([\\\\s\\\\S]*)\\\\s*<\\\\/JS CRITICAL RATE>/i)) {\\n    const code = String(RegExp.$1);\\n    try {\\n        eval(code);\\n    } catch (e) {\\n        if ($gameTemp.isPlaytest()) console.log(e);\\n    }\\n}\\n\\n// Apply LUK Buffs/Debuffs\\nconst lukStack = this.subject().buff(7);\\nrate *= 2 ** lukStack;\\n\\n// Return Rate\\nreturn rate;\"","CriticalHitMultiplier:func":"\"// Declare Constants\\nconst user = this.subject();\\nlet damage = arguments[0];\\nlet multiplier = 2.0;\\nlet bonusDamage = this.subject().luk * this.subject().cri;\\n\\n// Apply Notetags\\nconst note = this.item().note;\\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ](\\\\d+)([%％])>/i)) {\\n    multiplier = Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    multiplier += Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ](\\\\d+)([%％])>/i)) {\\n    bonusDamage *= Number(RegExp.$1) / 100;\\n}\\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ]([\\\\+\\\\-]\\\\d+)([%％])>/i)) {\\n    bonusDamage += bonusDamage * (RegExp.$1) / 100;\\n}\\nif (note.match(/<JS CRITICAL DAMAGE>\\\\s*([\\\\s\\\\S]*)\\\\s*<\\\\/JS CRITICAL DAMAGE>/i)) {\\n    const code = String(RegExp.$1);\\n    try {\\n        eval(code);\\n    } catch (e) {\\n        if ($gameTemp.isPlaytest()) console.log(e);\\n    }\\n}\\n\\n// Return Damage\\nreturn damage * multiplier + bonusDamage;\"","DamageStyles":"","DefaultDamageStyle:str":"Standard","DamageStyleList:arraystruct":"[\"{\\\"Name:str\\\":\\\"Standard\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Declare Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Replace Formula\\\\\\\\nlet formula = item.damage.formula;\\\\\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = Math.max(eval(formula), 0);\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"return this.getItemDamageAmountTextOriginal();\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"Armor Scaling\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Declare Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Replace Formula\\\\\\\\nlet formula = item.damage.formula;\\\\\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = Math.max(eval(formula), 0);\\\\\\\\n\\\\\\\\n// Apply Defender's Defense Parameter\\\\\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\\\\\n\\\\\\\\n    // Calculate Base Armor\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\\\\\n\\\\\\\\n    // Apply Armor to Damage\\\\\\\\n    if (armor >= 0) {\\\\\\\\n        value *= 100 / (100 + armor);\\\\\\\\n    } else {\\\\\\\\n        value *= 2 - (100 / (100 - armor));\\\\\\\\n    }\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"return this.getItemDamageAmountTextOriginal();\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"CT\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\\\\\nlet attackStat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat =  a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nattackStat = (attackStat * 1.75) + (level ** 2 / 45.5);\\\\\\\\nvalue = attackStat * 4;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= Math.max(256 - armor, 0) / 256;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= Math.max(102.4 - armor, 0) / 128;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"D4\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nlet stat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n    armor = 0;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n    armor = 0;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage \\\\\\\\nlet value = 1.5 * Math.max(2 * stat * multiplier - armor, 1) * multiplier / 5;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"DQ\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nlet multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    let value = multiplier * Math.max(a.atk, a.mat);\\\\\\\\n    return (isNaN(value) ? 0 : value) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Get Primary Stats\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(b, armor);\\\\\\\\nlet stat = 1;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Check for Recovery\\\\\\\\nif (this.isRecover()) {\\\\\\\\n    let value = stat * multiplier * sign;\\\\\\\\n    return isNaN(value) ? 0 : value;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nlet value = 0;\\\\\\\\nif (stat < ((2 + armor) / 2)) {\\\\\\\\n    // Plink Damage\\\\\\\\n    let baseline = Math.max(stat - ((12 * (armor - stat + 1)) / stat), 5);\\\\\\\\n    value = baseline / 3;\\\\\\\\n} else {\\\\\\\\n    // Normal Damage\\\\\\\\n    let baseline = Math.max(stat - (armor / 2), 1);\\\\\\\\n    value = baseline / 2;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF7\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare base Damage\\\\\\\\nlet baseDamage = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    baseDamage = a.atk + ((a.atk + level) / 32) * ((a.atk * level) / 32);\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    baseDamage = 6 * (a.mat + level);\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    baseDamage = 6 * (a.def + level);\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    baseDamage = 6 * (a.mdf + level);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Final Damage\\\\\\\\nlet value = baseDamage;\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nif (this.isRecover()) {\\\\\\\\n    value += 22 * power;\\\\\\\\n} else {\\\\\\\\n    value = (power * Math.max(512 - armor, 1) * baseDamage) / (16 * 512);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF8\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Damage\\\\\\\\nlet Value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = a.atk ** 2 / 16 + a.atk;\\\\\\\\n    value *= Math.max(265 - armor, 1) / 256;\\\\\\\\n    value *= power / 16;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = a.mat + power;\\\\\\\\n    value *= Math.max(265 - armor, 1) / 4;\\\\\\\\n    value *= power / 256;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = (power + a.def) * power / 2;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = (power + a.mdf) * power / 2;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF9\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Constant\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Main Stats\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(b, armor);\\\\\\\\nlet stat = 1;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    stat = a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    stat = a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    stat = a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Base Damage\\\\\\\\nlet baseDamage = power;\\\\\\\\nif (this.isPhysical()) {\\\\\\\\n    baseDamage += stat;\\\\\\\\n}\\\\\\\\nif (this.isDamage() || this.isDrain()) {\\\\\\\\n    baseDamage -= armor;\\\\\\\\n    baseDamage = Math.max(1, baseDamage);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Declare Bonus Damage\\\\\\\\nlet bonusDamage = stat + (((a.level || a.luk) + stat) / 8);\\\\\\\\n\\\\\\\\n// Declare Final Damage\\\\\\\\nlet value = baseDamage * bonusDamage * sign;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"FF10\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Constant\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\nif (this.isCertainHit()) {\\\\\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Create Damage Offense Value\\\\\\\\nlet value = power;\\\\\\\\n\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = (((a.atk ** 3) / 32) + 32) * power / 16;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = power * ((a.mat ** 2 / 6) + power) / 4;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = power * ((a.def + power) / 2);\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = power * ((a.mdf + power) / 2);\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Apply Damage Defense Value\\\\\\\\nif (this.isDamage() || this.isDrain()) {\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(b, armor);\\\\\\\\n    armor = Math.max(armor, 1);\\\\\\\\n    value *= ((((armor - 280.4) ** 2) / 110) / 16) / 730;\\\\\\\\n    value *= (730 - (armor * 51 - (armor ** 2) / 11) / 10) / 730;\\\\\\\\n} else if (this.isRecover()) {\\\\\\\\n    value *= -1;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"MK\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Multiplier\\\\\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = this.applyArmorModifiers(target, armor);\\\\\\\\nconst denominator = Math.max(200 + armor, 1);\\\\\\\\n\\\\\\\\n// Calculate Damage \\\\\\\\nlet value = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = 200 * a.atk / denominator;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value = 200 * a.mat / denominator;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value = 200 * a.def / 200;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value = 200 * a.mdf / 200;\\\\\\\\n}\\\\\\\\nvalue *= multiplier;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"MOBA\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Damage Value\\\\\\\\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\\\\\\\\n\\\\\\\\n// Apply Attacker's Offense Parameter\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    value *= a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    value *= a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    value *= a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Apply Defender's Defense Parameter\\\\\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\\\\\n\\\\\\\\n    // Calculate Base Armor\\\\\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\\\\\n\\\\\\\\n    // Apply Armor to Damage\\\\\\\\n    if (armor >= 0) {\\\\\\\\n        value *= 100 / (100 + armor);\\\\\\\\n    } else {\\\\\\\\n        value *= 2 - (100 / (100 - armor));\\\\\\\\n    }\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn isNaN(value) ? 0 : value;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Multiplier\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Multiplier\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Multiplier\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    const value = Math.max(eval(formula), 0);\\\\\\\\n    return '%1%'.format(Math.round(value * 100));\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\",\"{\\\"Name:str\\\":\\\"PKMN\\\",\\\"Formula:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst user = this.subject();\\\\\\\\nconst target = arguments[0];\\\\\\\\nconst item = this.item();\\\\\\\\nconst a = this.subject();\\\\\\\\nconst b = target;\\\\\\\\nconst v = $gameVariables._data;\\\\\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\\\\\n\\\\\\\\n// Create Power\\\\\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\\\\\n\\\\\\\\n// Declare Values\\\\\\\\nlet value = 0;\\\\\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\\\\\nlet attackStat = 0;\\\\\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat = a.atk;\\\\\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\\\\\n    attackStat =  a.mat;\\\\\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.def;\\\\\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\\\\\n    attackStat =  a.mdf;\\\\\\\\n}\\\\\\\\n\\\\\\\\n// Calculate Damage\\\\\\\\nvalue = (((((2 * level) / 5) + 2) * power * (attackStat / armor)) / 50) + 2;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\\\\\"\\\",\\\"ItemsEquipsCore\\\":\\\"\\\",\\\"DamageType\\\":\\\"\\\",\\\"DamageType1:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType2:str\\\":\\\"%1 Damage Power\\\",\\\"DamageType3:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType4:str\\\":\\\"%1 Recovery Power\\\",\\\"DamageType5:str\\\":\\\"%1 Drain Power\\\",\\\"DamageType6:str\\\":\\\"%1 Drain Power\\\",\\\"DamageDisplay:func\\\":\\\"\\\\\\\"// Define Constants\\\\\\\\nconst item = this._item;\\\\\\\\nconst formula = item.damage.formula;\\\\\\\\nconst a = this._tempActorA;\\\\\\\\nconst b = this._tempActorB;\\\\\\\\nconst user = a;\\\\\\\\nconst target = b;\\\\\\\\n\\\\\\\\n// Return Value\\\\\\\\ntry {\\\\\\\\n    return formula;\\\\\\\\n} catch (e) {\\\\\\\\n    if ($gameTemp.isPlaytest()) {\\\\\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\\\\\n    }\\\\\\\\n    return '?????';\\\\\\\\n}\\\\\\\"\\\"}\"]"}
 *
 * @param Mechanics:struct
 * @text Mechanics Settings
 * @type struct<Mechanics>
 * @desc Settings pertaining to damage calculations.
 * @default {"ActionSpeed":"","AllowRandomSpeed:eval":"false","CalcActionSpeedJS:func":"\"// Declare Constants\\nconst agi = this.subject().agi;\\n\\n// Create Speed\\nlet speed = agi;\\nif (this.allowRandomSpeed()) {\\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\\n}\\nif (this.item()) {\\n    speed += this.item().speed;\\n}\\nif (this.isAttack()) {\\n    speed += this.subject().attackSpeed();\\n}\\n\\n// Return Speed\\nreturn speed;\"","BaseTroop":"","BaseTroopIDs:arraynum":"[\"1\"]","CommonEvents":"","BattleStartEvent:num":"0","BattleEndEvent:num":"0","VictoryEvent:num":"0","DefeatEvent:num":"0","EscapeSuccessEvent:num":"0","EscapeFailEvent:num":"0","Escape":"","CalcEscapeRatioJS:func":"\"// Calculate Escape Ratio\\nlet ratio = 0.5;\\nratio *= $gameParty.agility();\\nratio /= $gameTroop.agility();\\n\\n// Return Ratio\\nreturn ratio;\"","CalcEscapeRaiseJS:func":"\"// Calculate Escape Ratio\\nlet value = 0.1;\\nvalue += $gameParty.aliveMembers().length;\\n\\n// Return Value\\nreturn value;\"","BattleJS":"","PreStartBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostStartBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","BattleVictoryJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","EscapeSuccessJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","EscapeFailureJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","BattleDefeatJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreEndBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostEndBattleJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","TurnJS":"","PreStartTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostStartTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreEndTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostEndTurnJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PreRegenerateJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","PostRegenerateJS:func":"\"// Declare Constants\\nconst user = this;\\nconst target = user;\\nconst a = user;\\nconst b = user;\\n\\n// Perform Actions\\n\"","ActionJS":"","PreStartActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PostStartActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PreApplyJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PreDamageJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PostDamageJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PostApplyJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst target = arguments[1];\\nconst user = this.subject();\\nconst a = user;\\nconst b = target;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\\n// Return Value\\nreturn value;\"","PreEndActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\"","PostEndActionJS:func":"\"// Declare Constants\\nconst value = arguments[0];\\nconst user = this.subject();\\nconst target = user;\\nconst a = user;\\nconst b = user;\\nconst action = this;\\nconst item = this.item();\\nconst skill = this.item();\\n\\n// Perform Actions\\n\""}
 *
 * @param CmdWindows
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param BattleLayout:struct
 * @text Battle Layout Settings
 * @type struct<BattleLayout>
 * @desc Settings that adjust how the battle layout appears.
 * @default {"Style:str":"default","ListStyle":"","ShowFacesListStyle:eval":"true","XPStyle":"","XPActorCommandLines:num":"4","XPActorDefaultHeight:num":"64","XPSpriteYLocation:str":"name","PotraitStyle":"","ShowPortraits:eval":"true","PortraitScale:num":"0.5","BorderStyle":"","SkillItemBorderCols:num":"1","ShowPortraitsBorderStyle:eval":"true","PortraitScaleBorderStyle:num":"1.25","SkillItemWindows":"","SkillItemMiddleLayout:eval":"false","SkillItemStandardCols:num":"2"}
 *
 * @param BattleLog:struct
 * @text Battle Log Settings
 * @type struct<BattleLog>
 * @desc Settings that adjust how Window_BattleLog behaves.
 * @default {"General":"","BackColor:str":"#000000","MaxLines:num":"10","MessageWait:num":"16","TextAlign:str":"center","BattleLogRectJS:func":"\"const wx = 0;\\nconst wy = 0;\\nconst ww = Graphics.boxWidth;\\nconst wh = this.calcWindowHeight(10, false);\\nreturn new Rectangle(wx, wy, ww, wh);\"","StartTurn":"","StartTurnShow:eval":"true","StartTurnMsg:str":"Turn %1","StartTurnWait:num":"40","DisplayAction":"","ActionCenteredName:eval":"true","ActionSkillMsg1:eval":"false","ActionSkillMsg2:eval":"true","ActionItemMsg:eval":"false","ActionChanges":"","ShowCounter:eval":"true","ShowReflect:eval":"true","ShowSubstitute:eval":"true","ActionResults":"","ShowFailure:eval":"false","ShowCritical:eval":"false","ShowMissEvasion:eval":"false","ShowHpDmg:eval":"false","ShowMpDmg:eval":"false","ShowTpDmg:eval":"false","DisplayStates":"","ShowAddedState:eval":"false","ShowRemovedState:eval":"false","ShowCurrentState:eval":"false","ShowAddedBuff:eval":"false","ShowAddedDebuff:eval":"false","ShowRemovedBuff:eval":"false"}
 *
 * @param PartyCmd:struct
 * @text Party Command Window
 * @type struct<PartyCmd>
 * @desc Settings that alter the Party Command Window in battle.
 * @default {"Cmd":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","CmdIconFight:num":"76","CommandAddAutoBattle:eval":"true","CmdIconAutoBattle:num":"78","CmdTextAutoBattle:str":"Auto","CommandAddOptions:eval":"true","CmdIconOptions:num":"83","ActiveTpbOptionsMessage:str":"Options Menu queued after action is complete.","CmdIconEscape:num":"82","Access":"","SkipPartyCmd:eval":"true","DisablePartyCmd:eval":"false","HelpWindow":"","HelpFight:str":"Select actions to fight.","HelpAutoBattle:str":"Sets party to Auto Battle mode.","HelpOptions:str":"Opens up the Options Menu.","HelpEscape:str":"Attempt to escape the battle."}
 *
 * @param ActorCmd:struct
 * @text Actor Command Window
 * @type struct<ActorCmd>
 * @desc Settings that alter the Actor Command Window in battle.
 * @default {"Cmd":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","CmdIconItem:num":"176","IconStypeNorm:num":"78","IconStypeMagic:num":"79","BattleCmd":"","BattleCmdList:arraystr":"[\"attack\",\"skills\",\"guard\",\"item\",\"escape\"]","HelpWindow":"","HelpSkillType:str":"Opens up a list of skills under the \\C[16]%1\\C[0] category.","HelpItem:str":"Opens up a list of items that you can use.","HelpEscape:str":"Attempt to escape the battle.","HelpAutoBattle:str":"Automatically choose an action suitable for combat."}
 *
 * @param VisualBreak
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Actor:struct
 * @text Actor Battler Settings
 * @type struct<Actor>
 * @desc Settings that alter various properties for actors.
 * @default {"Flinch":"","FlinchDistanceX:num":"12","FlinchDistanceY:num":"0","FlinchDuration:num":"6","SvBattlers":"","AnchorX:num":"0.5","AnchorY:num":"1.0","MotionSpeed:num":"12","Shadow:eval":"true","HomePosJS:func":"\"// Declare Constants\\nconst sprite = this;\\nconst actor = this._actor;\\nconst index = arguments[0];\\n\\n// Make Calculations\\nlet x = Math.round((Graphics.width / 2) + 192)\\nx -= Math.floor((Graphics.width - Graphics.boxWidth) / 2);\\nx += index * 32;\\nlet y = (Graphics.height - 200) - ($gameParty.maxBattleMembers() * 48);\\ny -= Math.floor((Graphics.height - Graphics.boxHeight) / 2);\\ny += index * 48;\\n\\n// Home Position Offsets\\nconst offsetNote = /<SIDEVIEW HOME OFFSET:[ ]([\\\\+\\\\-]\\\\d+),[ ]([\\\\+\\\\-]\\\\d+)>/i;\\nconst xOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$1) : 0));\\nconst yOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$2) : 0));\\nx = xOffsets.reduce((r, offset) => r + offset, x);\\ny = yOffsets.reduce((r, offset) => r + offset, y);\\n\\n// Set Home Position\\nthis.setHome(x, y);\""}
 *
 * @param Enemy:struct
 * @text Enemy Battler Settings
 * @type struct<Enemy>
 * @desc Settings that alter various properties for enemies.
 * @default {"Visual":"","AttackAnimation:num":"1","EmergeText:eval":"false","SelectWindow":"","FrontViewSelect:eval":"false","SideviewSelect:eval":"true","NameFontSize:num":"22","SvBattlers":"","AllowCollapse:eval":"false","AnchorX:num":"0.5","AnchorY:num":"1.0","MotionIdle:str":"walk","Shadow:eval":"true","Width:num":"64","Height:num":"64","WtypeId:num":"0"}
 *
 * @param HpGauge:struct
 * @text HP Gauge Settings
 * @type struct<HpGauge>
 * @desc Settings that adjust the visual HP Gauge displayed in battle.
 * @default {"Display":"","ShowActorGauge:eval":"false","ShowEnemyGauge:eval":"true","RequiresDefeat:eval":"false","BTestBypass:eval":"true","Settings":"","AnchorX:num":"0.5","AnchorY:num":"1.0","Scale:num":"0.5","OffsetX:num":"0","OffsetY:num":"-3","Options":"","AddHpGaugeOption:eval":"true","AdjustRect:eval":"true","Name:str":"Show HP Gauge"}
 *
 * @param ActionSequence:struct
 * @text Action Sequence Settings
 * @type struct<ActionSequence>
 * @desc Settings that adjust how certain Action Sequences work.
 * @default {"AutoSequences":"","AutoMeleeSolo:eval":"true","AutoMeleeAoE:eval":"true","CastAnimations":"","CastCertain:num":"120","CastPhysical:num":"52","CastMagical:num":"51","CounterReflection":"","CounterPlayback:eval":"true","ReflectAnimation:num":"1","ReflectPlayback:eval":"true","Stepping":"","MeleeDistance:num":"24","StepDistanceX:num":"48","StepDistanceY:num":"0","StepDuration:num":"12"}
 *
 * @param BreakEnd1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param End Of
 * @default Plugin Parameters
 *
 * @param BreakEnd2
 * @text --------------------------
 * @default ----------------------------------
 *
 */
/* ----------------------------------------------------------------------------
 * Auto Battle Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~AutoBattle:
 *
 * @param BattleDisplay
 * @text Battle Display
 *
 * @param AutoBattleMsg:str
 * @text Message
 * @parent BattleDisplay
 * @desc Message that's displayed when Auto Battle is on.
 * Text codes allowed. %1 - OK button, %2 - Cancel button
 * @default Press %1 or %2 to stop Auto Battle
 *
 * @param AutoBattleOK:str
 * @text OK Button
 * @parent BattleDisplay
 * @desc Text used to represent the OK button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default OK
 *
 * @param AutoBattleCancel:str
 * @text Cancel Button
 * @parent BattleDisplay
 * @desc Text used to represent the Cancel button.
 * If VisuMZ_0_CoreEngine is present, ignore this.
 * @default Cancel
 *
 * @param AutoBattleBgType:num
 * @text Background Type
 * @parent BattleDisplay
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for Auto Battle window.
 * @default 1
 *
 * @param AutoBattleRect:func
 * @text JS: X, Y, W, H
 * @parent BattleDisplay
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.width;\nconst height = this.calcWindowHeight(1, false);\nconst x = 0;\nconst y = (Graphics.height - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param Options
 *
 * @param AddOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the Auto Battle options to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param StartName:str
 * @text Startup Name
 * @parent Options
 * @desc Command name of the option.
 * @default Auto Battle Start
 *
 * @param StyleName:str
 * @text Style Name
 * @parent Options
 * @desc Command name of the option.
 * @default Auto Battle Style
 *
 * @param StyleOFF:str
 * @text OFF
 * @parent StyleName:str
 * @desc Text displayed when Auto Battle Style is OFF.
 * @default Attack
 *
 * @param StyleON:str
 * @text ON
 * @parent StyleName:str
 * @desc Text displayed when Auto Battle Style is ON.
 * @default Skills
 *
 */
/* ----------------------------------------------------------------------------
 * Damage Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Damage:
 *
 * @param Cap
 * @text Damage Cap
 *
 * @param EnableDamageCap:eval
 * @text Enable Damage Cap?
 * @parent Cap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Put a maximum hard damage cap on how far damage can go?
 * This can be broken through the usage of notetags.
 * @default false
 *
 * @param DefaultHardCap:num
 * @text Default Hard Cap
 * @parent EnableDamageCap:eval
 * @type number
 * @min 1
 * @desc The default hard damage cap used before applying damage.
 * @default 9999
 *
 * @param EnableSoftCap:eval
 * @text Enable Soft Cap?
 * @parent Cap
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Soft caps ease in the damage values leading up to the 
 * hard damage cap. Requires hard Damage Cap enabled.
 * @default false
 *
 * @param DefaultSoftCap:num
 * @text Base Soft Cap Rate
 * @parent EnableSoftCap:eval
 * @desc The default soft damage cap used before applying damage.
 * @default 0.80
 *
 * @param DefaultSoftScaler:num
 * @text Soft Scale Constant
 * @parent EnableSoftCap:eval
 * @desc The default soft damage cap used before applying damage.
 * @default 0.1275
 *
 * @param Popups
 *
 * @param PopupDuration:num
 * @text Popup Duration
 * @parent Popups
 * @type number
 * @min 1
 * @desc Adjusts how many frames a popup stays visible.
 * @default 128
 *
 * @param NewPopupBottom:eval
 * @text Newest Popups Bottom
 * @parent Popups
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Puts the newest popups at the bottom.
 * @default true
 *
 * @param PopupShiftX:num
 * @text Shift X
 * @parent Popups
 * @desc Sets how much to shift the sprites by horizontally.
 * @default 8
 *
 * @param PopupShiftY:num
 * @text Shift Y
 * @parent Popups
 * @desc Sets how much to shift the sprites by vertically.
 * @default -28
 *
 * @param hpDamageFmt:str
 * @text HP Damage Format
 * @parent Popups
 * @desc Determines HP damage format for popup.
 * %1 - Value, %2 - HP Text
 * @default -%1
 *
 * @param hpHealingFmt:str
 * @text HP Healing Format
 * @parent Popups
 * @desc Determines HP healing format for popup.
 * %1 - Value, %2 - HP Text
 * @default +%1
 *
 * @param mpDamageFmt:str
 * @text MP Damage Format
 * @parent Popups
 * @desc Determines MP damage format for popup.
 * %1 - Value, %2 - MP Text
 * @default -%1 %2
 *
 * @param mpHealingFmt:str
 * @text MP Healing Format
 * @parent Popups
 * @desc Determines MP healing format for popup.
 * %1 - Value, %2 - MP Text
 * @default +%1 %2
 *
 * @param CriticalColor:eval
 * @text Critical Flash Color
 * @parent Popups
 * @desc Adjust the popup's flash color.
 * Format: [red, green, blue, alpha]
 * @default [255, 0, 0, 160]
 *
 * @param CriticalDuration:num
 * @text Critical Duration
 * @parent Popups
 * @type number
 * @min 1
 * @desc Adjusts how many frames a the flash lasts.
 * @default 128
 *
 * @param Formulas
 *
 * @param OverallFormulaJS:func
 * @text JS: Overall Formula
 * @parent Formulas
 * @type note
 * @desc The overall formula used when calculating damage.
 * @default "// Declare Constants\nconst target = arguments[0];\nconst critical = arguments[1];\nconst item = this.item();\n\n// Get Base Damage\nconst baseValue = this.evalDamageFormula(target);\n\n// Calculate Element Modifiers\nlet value = baseValue * this.calcElementRate(target);\n\n// Calculate Physical and Magical Modifiers\nif (this.isPhysical()) {\n    value *= target.pdr;\n}\nif (this.isMagical()) {\n    value *= target.mdr;\n}\n\n// Apply Healing Modifiers\nif (baseValue < 0) {\n    value *= target.rec;\n}\n\n// Apply Critical Modifiers\nif (critical) {\n    value = this.applyCritical(value);\n}\n\n// Apply Variance and Guard Modifiers\nvalue = this.applyVariance(value, item.damage.variance);\nvalue = this.applyGuard(value, target);\n\n// Finalize Damage\nvalue = Math.round(value);\nreturn value;"
 *
 * @param VarianceFormulaJS:func
 * @text JS: Variance Formula
 * @parent Formulas
 * @type note
 * @desc The formula used when damage variance.
 * @default "// Declare Constants\nconst damage = arguments[0];\nconst variance = arguments[1];\n\n// Calculate Variance\nconst amp = Math.floor(Math.max((Math.abs(damage) * variance) / 100, 0));\nconst v = Math.randomInt(amp + 1) + Math.randomInt(amp + 1) - amp;\n\n// Return Damage\nreturn damage >= 0 ? damage + v : damage - v;"
 *
 * @param GuardFormulaJS:func
 * @text JS: Guard Formula
 * @parent Formulas
 * @type note
 * @desc The formula used when damage is guarded.
 * @default "// Declare Constants\nconst damage = arguments[0];\nconst target = arguments[1];\n\n// Return Damage Early\nconst note = this.item().note;\nif (note.match(/<UNBLOCKABLE>/i)) return damage;\nif (!target.isGuard()) return damage;\nif (damage < 0) return damage;\n\n// Declare Guard Rate\nlet guardRate = 0.5;\nguardRate /= target.grd;\n\n// Return Damage\nreturn damage * guardRate;"
 *
 * @param Critical
 * @text Critical Hits
 *
 * @param CriticalHitRateJS:func
 * @text JS: Rate Formula
 * @parent Critical
 * @type note
 * @desc The formula used to calculate Critical Hit Rates.
 * @default "// Declare Constants\nconst user = this.subject();\nconst target = arguments[0];\n\n// Create Base Critical Rate\nlet rate = this.subject().cri * (1 - target.cev);\n\n// Apply Notetags\nconst note = this.item().note;\nif (note.match(/<ALWAYS CRITICAL>/i)) {\n    return 1;\n}\nif (note.match(/<SET CRITICAL RATE:[ ](\\d+)([%％])>/i)) {\n    return Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL RATE:[ ](\\d+)([%％])>/i)) {\n    rate *= Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL RATE:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    rate += Number(RegExp.$1) / 100;\n}\nif (note.match(/<JS CRITICAL RATE>\\s*([\\s\\S]*)\\s*<\\/JS CRITICAL RATE>/i)) {\n    const code = String(RegExp.$1);\n    try {\n        eval(code);\n    } catch (e) {\n        if ($gameTemp.isPlaytest()) console.log(e);\n    }\n}\n\n// Apply LUK Buffs/Debuffs\nconst lukStack = this.subject().buff(7);\nrate *= 2 ** lukStack;\n\n// Return Rate\nreturn rate;"
 *
 * @param CriticalHitMultiplier:func
 * @text JS: Damage Formula
 * @parent Critical
 * @type note
 * @desc The formula used to calculate Critical Hit Damage modification.
 * @default "// Declare Constants\nconst user = this.subject();\nlet damage = arguments[0];\nlet multiplier = 2.0;\nlet bonusDamage = this.subject().luk * this.subject().cri;\n\n// Apply Notetags\nconst note = this.item().note;\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ](\\d+)([%％])>/i)) {\n    multiplier = Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL MULTIPLIER:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    multiplier += Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ](\\d+)([%％])>/i)) {\n    bonusDamage *= Number(RegExp.$1) / 100;\n}\nif (note.match(/<MODIFY CRITICAL BONUS DAMAGE:[ ]([\\+\\-]\\d+)([%％])>/i)) {\n    bonusDamage += bonusDamage * (RegExp.$1) / 100;\n}\nif (note.match(/<JS CRITICAL DAMAGE>\\s*([\\s\\S]*)\\s*<\\/JS CRITICAL DAMAGE>/i)) {\n    const code = String(RegExp.$1);\n    try {\n        eval(code);\n    } catch (e) {\n        if ($gameTemp.isPlaytest()) console.log(e);\n    }\n}\n\n// Return Damage\nreturn damage * multiplier + bonusDamage;"
 *
 * @param DamageStyles
 * @text Damage Styles
 *
 * @param DefaultDamageStyle:str
 * @text Default Style
 * @parent DamageStyles
 * @desc Which Damage Style do you want to set as default?
 * Use 'Manual' to not use any styles at all.
 * @default Standard
 *
 * @param DamageStyleList:arraystruct
 * @text Style List
 * @parent DamageStyles
 * @type struct<DamageStyle>[]
 * @desc A list of the damage styles available.
 * These are used to calculate base damage.
 * @default ["{\"Name:str\":\"Standard\",\"Formula:func\":\"\\\"// Declare Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Replace Formula\\\\nlet formula = item.damage.formula;\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = Math.max(eval(formula), 0);\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"return this.getItemDamageAmountTextOriginal();\\\"\"}","{\"Name:str\":\"Armor Scaling\",\"Formula:func\":\"\\\"// Declare Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Replace Formula\\\\nlet formula = item.damage.formula;\\\\nif (SceneManager.isSceneBattle() && !this.isCertainHit()) {\\\\n    const fmt = 'Math.max(this.applyArmorModifiers(b, %1), 1)';\\\\n    formula = formula.replace(/b.def/g, fmt.format('b.def'));\\\\n    formula = formula.replace(/b.mdf/g, fmt.format('b.mdf'));\\\\n    formula = formula.replace(/b.agi/g, fmt.format('b.agi'));\\\\n    formula = formula.replace(/b.luk/g, fmt.format('b.luk'));\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = Math.max(eval(formula), 0);\\\\n\\\\n// Apply Defender's Defense Parameter\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\n\\\\n    // Calculate Base Armor\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\n\\\\n    // Apply Armor to Damage\\\\n    if (armor >= 0) {\\\\n        value *= 100 / (100 + armor);\\\\n    } else {\\\\n        value *= 2 - (100 / (100 - armor));\\\\n    }\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"return this.getItemDamageAmountTextOriginal();\\\"\"}","{\"Name:str\":\"CT\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\nlet attackStat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat =  a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    attackStat =  a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    attackStat =  a.mdf;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nattackStat = (attackStat * 1.75) + (level ** 2 / 45.5);\\\\nvalue = attackStat * 4;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= Math.max(256 - armor, 0) / 256;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= Math.max(102.4 - armor, 0) / 128;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"D4\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nlet stat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n    armor = 0;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n    armor = 0;\\\\n}\\\\n\\\\n// Calculate Damage \\\\nlet value = 1.5 * Math.max(2 * stat * multiplier - armor, 1) * multiplier / 5;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"DQ\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nlet multiplier = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    let value = multiplier * Math.max(a.atk, a.mat);\\\\n    return (isNaN(value) ? 0 : value) * sign;\\\\n}\\\\n\\\\n// Get Primary Stats\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(b, armor);\\\\nlet stat = 1;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n}\\\\n\\\\n// Check for Recovery\\\\nif (this.isRecover()) {\\\\n    let value = stat * multiplier * sign;\\\\n    return isNaN(value) ? 0 : value;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nlet value = 0;\\\\nif (stat < ((2 + armor) / 2)) {\\\\n    // Plink Damage\\\\n    let baseline = Math.max(stat - ((12 * (armor - stat + 1)) / stat), 5);\\\\n    value = baseline / 3;\\\\n} else {\\\\n    // Normal Damage\\\\n    let baseline = Math.max(stat - (armor / 2), 1);\\\\n    value = baseline / 2;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF7\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare base Damage\\\\nlet baseDamage = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    baseDamage = a.atk + ((a.atk + level) / 32) * ((a.atk * level) / 32);\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    baseDamage = 6 * (a.mat + level);\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    baseDamage = 6 * (a.def + level);\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    baseDamage = 6 * (a.mdf + level);\\\\n}\\\\n\\\\n// Calculate Final Damage\\\\nlet value = baseDamage;\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nif (this.isRecover()) {\\\\n    value += 22 * power;\\\\n} else {\\\\n    value = (power * Math.max(512 - armor, 1) * baseDamage) / (16 * 512);\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF8\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Damage\\\\nlet Value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = a.atk ** 2 / 16 + a.atk;\\\\n    value *= Math.max(265 - armor, 1) / 256;\\\\n    value *= power / 16;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = a.mat + power;\\\\n    value *= Math.max(265 - armor, 1) / 4;\\\\n    value *= power / 256;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = (power + a.def) * power / 2;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = (power + a.mdf) * power / 2;\\\\n}\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF9\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Constant\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\n}\\\\n\\\\n// Declare Main Stats\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(b, armor);\\\\nlet stat = 1;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    stat = a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    stat = a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    stat = a.mdf;\\\\n}\\\\n\\\\n// Declare Base Damage\\\\nlet baseDamage = power;\\\\nif (this.isPhysical()) {\\\\n    baseDamage += stat;\\\\n}\\\\nif (this.isDamage() || this.isDrain()) {\\\\n    baseDamage -= armor;\\\\n    baseDamage = Math.max(1, baseDamage);\\\\n}\\\\n\\\\n// Declare Bonus Damage\\\\nlet bonusDamage = stat + (((a.level || a.luk) + stat) / 8);\\\\n\\\\n// Declare Final Damage\\\\nlet value = baseDamage * bonusDamage * sign;\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"FF10\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Constant\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\nif (this.isCertainHit()) {\\\\n    return (isNaN(power) ? 0 : power) * sign;\\\\n}\\\\n\\\\n// Create Damage Offense Value\\\\nlet value = power;\\\\n\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = (((a.atk ** 3) / 32) + 32) * power / 16;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = power * ((a.mat ** 2 / 6) + power) / 4;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = power * ((a.def + power) / 2);\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = power * ((a.mdf + power) / 2);\\\\n}\\\\n\\\\n// Apply Damage Defense Value\\\\nif (this.isDamage() || this.isDrain()) {\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(b, armor);\\\\n    armor = Math.max(armor, 1);\\\\n    value *= ((((armor - 280.4) ** 2) / 110) / 16) / 730;\\\\n    value *= (730 - (armor * 51 - (armor ** 2) / 11) / 10) / 730;\\\\n} else if (this.isRecover()) {\\\\n    value *= -1;\\\\n}\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"MK\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Multiplier\\\\nconst multiplier = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = this.applyArmorModifiers(target, armor);\\\\nconst denominator = Math.max(200 + armor, 1);\\\\n\\\\n// Calculate Damage \\\\nlet value = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value = 200 * a.atk / denominator;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value = 200 * a.mat / denominator;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value = 200 * a.def / 200;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value = 200 * a.mdf / 200;\\\\n}\\\\nvalue *= multiplier;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"MOBA\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Damage Value\\\\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\\\\n\\\\n// Apply Attacker's Offense Parameter\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    value *= a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    value *= a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    value *= a.mdf;\\\\n}\\\\n\\\\n// Apply Defender's Defense Parameter\\\\nif (this.isDamage() && !this.isCertainHit()) {\\\\n\\\\n    // Calculate Base Armor\\\\n    let armor = this.isPhysical() ? b.def : b.mdf;\\\\n    armor = this.applyArmorModifiers(target, armor);\\\\n\\\\n    // Apply Armor to Damage\\\\n    if (armor >= 0) {\\\\n        value *= 100 / (100 + armor);\\\\n    } else {\\\\n        value *= 2 - (100 / (100 - armor));\\\\n    }\\\\n}\\\\n\\\\n// Return Value\\\\nreturn isNaN(value) ? 0 : value;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Multiplier\",\"DamageType2:str\":\"%1 Damage Multiplier\",\"DamageType3:str\":\"%1 Recovery Multiplier\",\"DamageType4:str\":\"%1 Recovery Multiplier\",\"DamageType5:str\":\"%1 Drain Multiplier\",\"DamageType6:str\":\"%1 Drain Multiplier\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    const value = Math.max(eval(formula), 0);\\\\n    return '%1%'.format(Math.round(value * 100));\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}","{\"Name:str\":\"PKMN\",\"Formula:func\":\"\\\"// Define Constants\\\\nconst user = this.subject();\\\\nconst target = arguments[0];\\\\nconst item = this.item();\\\\nconst a = this.subject();\\\\nconst b = target;\\\\nconst v = $gameVariables._data;\\\\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\\\\n\\\\n// Create Power\\\\nconst power = Math.max(eval(item.damage.formula), 0);\\\\n\\\\n// Declare Values\\\\nlet value = 0;\\\\nlet level = Math.max(a.level || a.luk, 1);\\\\nlet armor = this.isPhysical() ? b.def : b.mdf;\\\\narmor = Math.max(this.applyArmorModifiers(target, armor), 0);\\\\nlet attackStat = 0;\\\\nif (this.isPhysical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat = a.atk;\\\\n} else if (this.isMagical() && (this.isDamage() || this.isDrain())) {\\\\n    attackStat =  a.mat;\\\\n} else if (this.isPhysical() && this.isRecover()) {\\\\n    attackStat =  a.def;\\\\n} else if (this.isMagical() && this.isRecover()) {\\\\n    attackStat =  a.mdf;\\\\n}\\\\n\\\\n// Calculate Damage\\\\nvalue = (((((2 * level) / 5) + 2) * power * (attackStat / armor)) / 50) + 2;\\\\n\\\\n// Return Value\\\\nreturn (isNaN(value) ? 0 : value) * sign;\\\"\",\"ItemsEquipsCore\":\"\",\"DamageType\":\"\",\"DamageType1:str\":\"%1 Damage Power\",\"DamageType2:str\":\"%1 Damage Power\",\"DamageType3:str\":\"%1 Recovery Power\",\"DamageType4:str\":\"%1 Recovery Power\",\"DamageType5:str\":\"%1 Drain Power\",\"DamageType6:str\":\"%1 Drain Power\",\"DamageDisplay:func\":\"\\\"// Define Constants\\\\nconst item = this._item;\\\\nconst formula = item.damage.formula;\\\\nconst a = this._tempActorA;\\\\nconst b = this._tempActorB;\\\\nconst user = a;\\\\nconst target = b;\\\\n\\\\n// Return Value\\\\ntry {\\\\n    return formula;\\\\n} catch (e) {\\\\n    if ($gameTemp.isPlaytest()) {\\\\n        console.log('Damage Formula Error for %1'.format(this._item.name));\\\\n    }\\\\n    return '?????';\\\\n}\\\"\"}"]
 *
 */
/* ----------------------------------------------------------------------------
 * Damage Formula Style
 * ----------------------------------------------------------------------------
 */
/*~struct~DamageStyle:
 *
 * @param Name:str
 * @text Name
 * @desc Name of this Damage Style.
 * Used for notetags and such.
 * @default Untitled
 *
 * @param Formula:func
 * @text JS: Formula
 * @parent Name:str
 * @type note
 * @desc The base formula for this Damage Style.
 * @default "// Define Constants\nconst item = this.item();\nconst a = this.subject();\nconst b = target;\nconst sign = [3, 4].includes(item.damage.type) ? -1 : 1;\n\n// Create Damage Value\nlet value = Math.max(eval(item.damage.formula), 0) * sign;\n\n// Return Value\nreturn isNaN(value) ? 0 : value;"
 *
 * @param ItemsEquipsCore
 * @text Items & Equips Core
 *
 * @param DamageType
 * @text Damage Label
 * @parent ItemsEquipsCore
 *
 * @param DamageType1:str
 * @text HP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage Multiplier
 *
 * @param DamageType2:str
 * @text MP Damage
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Damage Multiplier
 *
 * @param DamageType3:str
 * @text HP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType4:str
 * @text MP Recovery
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Recovery Multiplier
 *
 * @param DamageType5:str
 * @text HP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Drain Multiplier
 *
 * @param DamageType6:str
 * @text MP Drain
 * @parent DamageType
 * @desc Vocabulary used for this data entry.
 * @default %1 Drain Multiplier
 *
 * @param DamageDisplay:func
 * @text JS: Damage Display
 * @parent ItemsEquipsCore
 * @type note
 * @desc Code used the data displayed for this category.
 * @default "// Define Constants\nconst item = this._item;\nconst formula = item.damage.formula;\nconst a = this._tempActorA;\nconst b = this._tempActorB;\nconst user = a;\nconst target = b;\n\n// Return Value\ntry {\n    const value = Math.max(eval(formula), 0);\n    return '%1%'.format(Math.round(value * 100));\n} catch (e) {\n    if ($gameTemp.isPlaytest()) {\n        console.log('Damage Formula Error for %1'.format(this._item.name));\n    }\n    return '?????';\n}"
 *
 */
/* ----------------------------------------------------------------------------
 * Mechanics Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Mechanics:
 *
 * @param ActionSpeed
 * @text Action Speed
 *
 * @param AllowRandomSpeed:eval
 * @text Allow Random Speed?
 * @parent ActionSpeed
 * @type boolean
 * @on Allow
 * @off Disable
 * @desc Allow speed to be randomized base off the user's AGI?
 * @default false
 *
 * @param CalcActionSpeedJS:func
 * @text JS: Calculate
 * @parent ActionSpeed
 * @type note
 * @desc Code used to calculate action speed.
 * @default "// Declare Constants\nconst agi = this.subject().agi;\n\n// Create Speed\nlet speed = agi;\nif (this.allowRandomSpeed()) {\n    speed += Math.randomInt(Math.floor(5 + agi / 4));\n}\nif (this.item()) {\n    speed += this.item().speed;\n}\nif (this.isAttack()) {\n    speed += this.subject().attackSpeed();\n}\n\n// Return Speed\nreturn speed;"
 *
 * @param BaseTroop
 * @text Base Troop
 *
 * @param BaseTroopIDs:arraynum
 * @text Base Troop ID's
 * @parent BaseTroop
 * @type troop[]
 * @desc Select the Troop ID(s) to duplicate page events from for all other troops.
 * @default ["1"]
 *
 * @param CommonEvents
 * @text Common Events
 *
 * @param BattleStartEvent:num
 * @text Pre-Battle Event
 * @parent CommonEvents
 * @type common_event
 * @desc Common Event to run before each battle.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param BattleEndEvent:num
 * @text Post-Battle Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run after each battle.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param VictoryEvent:num
 * @text Victory Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon victory.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param DefeatEvent:num
 * @text Defeat Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon defeat.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param EscapeSuccessEvent:num
 * @text Escape Success Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon escape success.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param EscapeFailEvent:num
 * @text Escape Fail Event
 * @parent CommonEvents
 * @type common_event
 * @desc Queued Common Event to run upon escape failure.
 * Use to 0 to not run any Common Event at all.
 * @default 0
 *
 * @param Escape
 *
 * @param CalcEscapeRatioJS:func
 * @text JS: Calc Escape Ratio
 * @parent Escape
 * @type note
 * @desc Code used to calculate the escape success ratio.
 * @default "// Calculate Escape Ratio\nlet ratio = 0.5;\nratio *= $gameParty.agility();\nratio /= $gameTroop.agility();\n\n// Return Ratio\nreturn ratio;"
 *
 * @param CalcEscapeRaiseJS:func
 * @text JS: Calc Escape Raise
 * @parent Escape
 * @type note
 * @desc Code used to calculate how much the escape success ratio raises upon each failure.
 * @default "// Calculate Escape Ratio\nlet value = 0.1;\nvalue += $gameParty.aliveMembers().length;\n\n// Return Value\nreturn value;"
 *
 * @param BattleJS
 * @text JS: Battle-Related
 * 
 * @param PreStartBattleJS:func
 * @text JS: Pre-Start Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.startBattle()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostStartBattleJS:func
 * @text JS: Post-Start Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.startBattle()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param BattleVictoryJS:func
 * @text JS: Battle Victory
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.processVictory()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param EscapeSuccessJS:func
 * @text JS: Escape Success
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.onEscapeSuccess()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param EscapeFailureJS:func
 * @text JS: Escape Failure
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.onEscapeFailure()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param BattleDefeatJS:func
 * @text JS: Battle Defeat
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.processDefeat()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 * 
 * @param PreEndBattleJS:func
 * @text JS: Pre-End Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.endBattle()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostEndBattleJS:func
 * @text JS: Post-End Battle
 * @parent BattleJS
 * @type note
 * @desc Target function: BattleManager.endBattle()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param TurnJS
 * @text JS: Turn-Related
 *
 * @param PreStartTurnJS:func
 * @text JS: Pre-Start Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: BattleManager.startTurn()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostStartTurnJS:func
 * @text JS: Post-Start Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: BattleManager.startTurn()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PreEndTurnJS:func
 * @text JS: Pre-End Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.onTurnEnd()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostEndTurnJS:func
 * @text JS: Post-End Turn
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.onTurnEnd()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PreRegenerateJS:func
 * @text JS: Pre-Regenerate
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.regenerateAll()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param PostRegenerateJS:func
 * @text JS: Post-Regenerate
 * @parent TurnJS
 * @type note
 * @desc Target function: Game_Battler.prototype.regenerateAll()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst user = this;\nconst target = user;\nconst a = user;\nconst b = user;\n\n// Perform Actions\n"
 *
 * @param ActionJS
 * @text JS: Action-Related
 *
 * @param PreStartActionJS:func
 * @text JS: Pre-Start Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.startAction()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PostStartActionJS:func
 * @text JS: Post-Start Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.startAction()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PreApplyJS:func
 * @text JS: Pre-Apply
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.apply()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PreDamageJS:func
 * @text JS: Pre-Damage
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.executeDamage()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PostDamageJS:func
 * @text JS: Post-Damage
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.executeDamage()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PostApplyJS:func
 * @text JS: Post-Apply
 * @parent ActionJS
 * @type note
 * @desc Target function: Game_Action.prototype.apply()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst target = arguments[1];\nconst user = this.subject();\nconst a = user;\nconst b = target;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n\n// Return Value\nreturn value;"
 *
 * @param PreEndActionJS:func
 * @text JS: Pre-End Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.endAction()
 * JavaScript code occurs before function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 * @param PostEndActionJS:func
 * @text JS: Post-End Action
 * @parent ActionJS
 * @type note
 * @desc Target function: BattleManager.endAction()
 * JavaScript code occurs after function is run.
 * @default "// Declare Constants\nconst value = arguments[0];\nconst user = this.subject();\nconst target = user;\nconst a = user;\nconst b = user;\nconst action = this;\nconst item = this.item();\nconst skill = this.item();\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLayout:
 *
 * @param Style:str
 * @text Battle Layout Style
 * @type select
 * @option Default - Shows actor faces in Battle Status.
 * @value default
 * @option List - Lists actors in Battle Status.
 * @value list
 * @option XP - Shows actor battlers in a stretched Battle Status.
 * @value xp
 * @option Portrait - Shows portraits in a stretched Battle Status.
 * @value portrait
 * @option Border - Displays windows around the screen border.
 * @value border
 * @desc The style used for the battle layout.
 * @default default
 *
 * @param ListStyle
 * @text List Style
 * @parent Style:str
 *
 * @param ShowFacesListStyle:eval
 * @text Show Faces
 * @parent ListStyle
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Shows faces in List Style?
 * @default true
 *
 * @param XPStyle
 * @text XP Style
 * @parent Style:str
 *
 * @param XPActorCommandLines:num
 * @text Command Lines
 * @parent XPStyle
 * @type number
 * @min 1
 * @desc Number of action lines in the Actor Command Window for the XP Style.
 * @default 4
 *
 * @param XPActorDefaultHeight:num
 * @text Sprite Height
 * @parent XPStyle
 * @type number
 * @min 1
 * @desc Default sprite height used when if the sprite's height has not been determined yet.
 * @default 64
 *
 * @param XPSpriteYLocation:str
 * @text Sprite Base Location
 * @parent XPStyle
 * @type select
 * @option Above Name - Sprite is located above the name.
 * @value name
 * @option Bottom - Sprite is located at the bottom of the window.
 * @value bottom
 * @option Centered - Sprite is centered in the window.
 * @value center
 * @option Top - Sprite is located at the top of the window.
 * @value top
 * @desc Determine where the sprite is located on the Battle Status Window.
 * @default name
 *
 * @param PotraitStyle
 * @text Portrait Style
 * @parent Style:str
 *
 * @param ShowPortraits:eval
 * @text Show Portraits?
 * @parent PotraitStyle
 * @type boolean
 * @on Portraits
 * @off Faces
 * @desc Requires VisuMZ_1_MainMenuCore.
 * Shows the actor's portrait instead of a face.
 * @default true
 *
 * @param PortraitScale:num
 * @text Portrait Scaling
 * @parent PotraitStyle
 * @desc If portraits are used, scale them by this much.
 * @default 0.5
 *
 * @param BorderStyle
 * @text Border Style
 * @parent Style:str
 *
 * @param SkillItemBorderCols:num
 * @text Columns
 * @parent BorderStyle
 * @type number
 * @min 1
 * @desc The total number of columns for Skill & Item Windows
 * in the battle scene.
 * @default 1
 *
 * @param ShowPortraitsBorderStyle:eval
 * @text Show Portraits?
 * @parent BorderStyle
 * @type boolean
 * @on Portraits
 * @off Faces
 * @desc Requires VisuMZ_1_MainMenuCore.
 * Shows the actor's portrait at the edge of the screen.
 * @default true
 *
 * @param PortraitScaleBorderStyle:num
 * @text Portrait Scaling
 * @parent BorderStyle
 * @desc If portraits are used, scale them by this much.
 * @default 1.0
 *
 * @param SkillItemWindows
 * @text Skill & Item Windows
 *
 * @param SkillItemMiddleLayout:eval
 * @text Middle Layout
 * @parent SkillItemWindows
 * @type boolean
 * @on Middle
 * @off Bottom
 * @desc Shows the Skill & Item Windows in mid-screen?
 * @default false
 *
 * @param SkillItemStandardCols:num
 * @text Columns
 * @parent SkillItemWindows
 * @type number
 * @min 1
 * @desc The total number of columns for Skill & Item Windows
 * in the battle scene.
 * @default 2
 *
 */
/* ----------------------------------------------------------------------------
 * Battle Log Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BattleLog:
 *
 * @param General
 *
 * @param BackColor:str
 * @text Back Color
 * @parent General
 * @desc Use #rrggbb for a hex color.
 * @default #000000
 *
 * @param MaxLines:num
 * @text Max Lines
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of lines to be displayed.
 * @default 10
 *
 * @param MessageWait:num
 * @text Message Wait
 * @parent General
 * @type number
 * @min 1
 * @desc Number of frames for a usual message wait.
 * @default 16
 *
 * @param TextAlign:str
 * @text Text Align
 * @parent General
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Window_BattleLog.
 * @default center
 *
 * @param BattleLogRectJS:func
 * @text JS: X, Y, W, H
 * @parent General
 * @type note
 * @desc Code used to determine the dimensions for the battle log.
 * @default "const wx = 0;\nconst wy = 0;\nconst ww = Graphics.boxWidth;\nconst wh = this.calcWindowHeight(10, false);\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param StartTurn
 * @text Start Turn
 *
 * @param StartTurnShow:eval
 * @text Show Start Turn?
 * @parent StartTurn
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display turn changes at the start of the turn?
 * @default false
 *
 * @param StartTurnMsg:str
 * @text Start Turn Message
 * @parent StartTurn
 * @desc Message displayed at turn start.
 * %1 - Turn Count
 * @default Turn %1
 *
 * @param StartTurnWait:num
 * @text Start Turn Wait
 * @parent StartTurn
 * @type number
 * @min 1
 * @desc Number of frames to wait after a turn started.
 * @default 40
 *
 * @param DisplayAction
 * @text Display Action
 *
 * @param ActionCenteredName:eval
 * @text Show Centered Action?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display a centered text of the action name?
 * @default true
 *
 * @param ActionSkillMsg1:eval
 * @text Show Skill Message 1?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the 1st skill message?
 * @default false
 *
 * @param ActionSkillMsg2:eval
 * @text Show Skill Message 2?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the 2nd skill message?
 * @default true
 *
 * @param ActionItemMsg:eval
 * @text Show Item Message?
 * @parent DisplayAction
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the item use message?
 * @default false
 *
 * @param ActionChanges
 * @text Action Changes
 *
 * @param ShowCounter:eval
 * @text Show Counter?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display counter text?
 * @default true
 *
 * @param ShowReflect:eval
 * @text Show Reflect?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display magic reflection text?
 * @default true
 *
 * @param ShowSubstitute:eval
 * @text Show Substitute?
 * @parent ActionChanges
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display substitute text?
 * @default true
 *
 * @param ActionResults
 * @text Action Results
 *
 * @param ShowFailure:eval
 * @text Show No Effect?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display no effect text?
 * @default false
 *
 * @param ShowCritical:eval
 * @text Show Critical?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display critical text?
 * @default false
 *
 * @param ShowMissEvasion:eval
 * @text Show Miss/Evasion?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display miss/evasion text?
 * @default false
 *
 * @param ShowHpDmg:eval
 * @text Show HP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display HP Damage text?
 * @default false
 *
 * @param ShowMpDmg:eval
 * @text Show MP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display MP Damage text?
 * @default false
 *
 * @param ShowTpDmg:eval
 * @text Show TP Damage?
 * @parent ActionResults
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display TP Damage text?
 * @default false
 *
 * @param DisplayStates
 * @text Display States
 *
 * @param ShowAddedState:eval
 * @text Show Added States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added states text?
 * @default false
 *
 * @param ShowRemovedState:eval
 * @text Show Removed States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display removed states text?
 * @default false
 *
 * @param ShowCurrentState:eval
 * @text Show Current States?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display the currently affected state text?
 * @default false
 *
 * @param ShowAddedBuff:eval
 * @text Show Added Buffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added buffs text?
 * @default false
 *
 * @param ShowAddedDebuff:eval
 * @text Show Added Debuffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display added debuffs text?
 * @default false
 *
 * @param ShowRemovedBuff:eval
 * @text Show Removed Buffs?
 * @parent DisplayStates
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Display removed de/buffs text?
 * @default false
 *
 */
/* ----------------------------------------------------------------------------
 * Party Command Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PartyCmd:
 *
 * @param Cmd
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Cmd
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Party Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Cmd
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Party Command Window.
 * @default left
 *
 * @param CmdIconFight:num
 * @text Fight Icon
 * @parent Cmd
 * @desc The icon used for the Fight command.
 * @default 76
 *
 * @param CommandAddAutoBattle:eval
 * @text Add Auto Battle?
 * @parent Cmd
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Auto Battle" command to the Command Window?
 * @default true
 *
 * @param CmdIconAutoBattle:num
 * @text Auto Battle Icon
 * @parent CommandAddAutoBattle:eval
 * @desc The icon used for the Auto Battle command.
 * @default 78
 *
 * @param CmdTextAutoBattle:str
 * @text Auto Battle Text
 * @parent CommandAddAutoBattle:eval
 * @desc The text used for the Auto Battle command.
 * @default Auto
 *
 * @param CommandAddOptions:eval
 * @text Add Options?
 * @parent Cmd
 * @type boolean
 * @on Add
 * @off Don't
 * @desc Add the "Options" command to the Command Window?
 * @default true
 *
 * @param CmdIconOptions:num
 * @text Options Icon
 * @parent CommandAddOptions:eval
 * @desc The icon used for the Options command.
 * @default 83
 *
 * @param ActiveTpbOptionsMessage:str
 * @text Active TPB Message
 * @parent CommandAddOptions:eval
 * @desc Message that will be displayed when selecting options during the middle of an action.
 * @default Options Menu queued after action is complete.
 *
 * @param CmdIconEscape:num
 * @text Escape Icon
 * @parent Cmd
 * @desc The icon used for the Escape command.
 * @default 82
 *
 * @param Access
 *
 * @param SkipPartyCmd:eval
 * @text Skip Party Command
 * @parent Access
 * @type boolean
 * @on Skip
 * @off Don't
 * @desc DTB: Skip Party Command selection on turn start.
 * TPB: Skip Party Command selection at battle start.
 * @default true
 *
 * @param DisablePartyCmd:eval
 * @text Disable Party Command
 * @parent Access
 * @type boolean
 * @on Disable
 * @off Don't
 * @desc Disable the Party Command Window entirely?
 * @default false
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpFight:str
 * @text Fight
 * @parent HelpWindow
 * @desc Text displayed when selecting a skill type.
 * %1 - Skill Type Name
 * @default Select actions to fight.
 *
 * @param HelpAutoBattle:str
 * @text Auto Battle
 * @parent HelpWindow
 * @desc Text displayed when selecting the Auto Battle command.
 * @default Sets party to Auto Battle mode.
 *
 * @param HelpOptions:str
 * @text Options
 * @parent HelpWindow
 * @desc Text displayed when selecting the Options command.
 * @default Opens up the Options Menu.
 *
 * @param HelpEscape:str
 * @text Escape
 * @parent HelpWindow
 * @desc Text displayed when selecting the escape command.
 * @default Attempt to escape the battle.
 *
 */
/* ----------------------------------------------------------------------------
 * Actor Command Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActorCmd:
 *
 * @param Cmd
 * @text Command Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent Cmd
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Actor Command Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent Cmd
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Actor Command Window.
 * @default left
 *
 * @param CmdIconItem:num
 * @text Item Icon
 * @parent Cmd
 * @desc The icon used for the Item command.
 * @default 176
 *
 * @param IconStypeNorm:num
 * @text Normal SType Icon
 * @parent Cmd
 * @desc Icon used for normal skill types that aren't assigned any
 * icons. Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Magic SType Icon
 * @parent Cmd
 * @desc Icon used for magic skill types that aren't assigned any
 * icons. Ignore if VisuMZ_1_SkillsStatesCore is installed.
 * @default 79
 *
 * @param BattleCmd
 * @text Battle Commands
 *
 * @param BattleCmdList:arraystr
 * @text Command List
 * @parent BattleCmd
 * @type combo[]
 * @option attack
 * @option skills
 * @option guard
 * @option item
 * @option party
 * @option escape
 * @option auto battle
 * @option stypes
 * @option stype: x
 * @option stype: name
 * @option all skills
 * @option skill: x
 * @option skill: name
 * @desc List of battle commands that appear by default
 * if the <Battle Commands> notetag isn't present.
 * @default ["attack","skills","guard","party","item"]
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpSkillType:str
 * @text Skill Types
 * @parent HelpWindow
 * @desc Text displayed when selecting a skill type.
 * %1 - Skill Type Name
 * @default Opens up a list of skills under the \C[16]%1\C[0] category.
 *
 * @param HelpItem:str
 * @text Items
 * @parent HelpWindow
 * @desc Text displayed when selecting the item command.
 * @default Opens up a list of items that you can use.
 *
 * @param HelpEscape:str
 * @text Escape
 * @parent HelpWindow
 * @desc Text displayed when selecting the escape command.
 * @default Attempt to escape the battle.
 *
 * @param HelpAutoBattle:str
 * @text Auto Battle
 * @parent HelpWindow
 * @desc Text displayed when selecting the Auto Battle command.
 * @default Automatically choose an action suitable for combat.
 *
 */
/* ----------------------------------------------------------------------------
 * Actor Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Actor:
 *
 * @param Flinch
 *
 * @param FlinchDistanceX:num
 * @text Flinch Distance X
 * @parent Flinch
 * @desc The normal X distance when flinching.
 * @default 12
 *
 * @param FlinchDistanceY:num
 * @text Flinch Distance Y
 * @parent Flinch
 * @desc The normal Y distance when flinching.
 * @default 0
 *
 * @param FlinchDuration:num
 * @text Flinch Duration
 * @parent Flinch
 * @desc The number of frames for a flinch to complete.
 * @default 6
 *
 * @param SvBattlers
 * @text Sideview Battlers
 *
 * @param AnchorX:num
 * @text Anchor: X
 * @parent SvBattlers
 * @desc Default X anchor for Sideview Battlers.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor: Y
 * @parent SvBattlers
 * @desc Default Y anchor for Sideview Battlers.
 * @default 1.0
 *
 * @param MotionSpeed:num
 * @text Motion Speed
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc The number of frames in between each motion.
 * @default 12
 *
 * @param Shadow:eval
 * @text Shadow Visible
 * @parent SvBattlers
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Show or hide the shadow for Sideview Battlers.
 * @default true
 *
 * @param HomePosJS:func
 * @text JS: Home Position
 * @parent SvBattlers
 * @type note
 * @desc Code used to calculate the home position of actors.
 * @default "// Declare Constants\nconst sprite = this;\nconst actor = this._actor;\nconst index = arguments[0];\n\n// Make Calculations\nlet x = Math.round((Graphics.width / 2) + 192)\nx -= Math.floor((Graphics.width - Graphics.boxWidth) / 2);\nx += index * 32;\nlet y = (Graphics.height - 200) - ($gameParty.maxBattleMembers() * 48);\ny -= Math.floor((Graphics.height - Graphics.boxHeight) / 2);\ny += index * 48;\n\n// Home Position Offsets\nconst offsetNote = /<SIDEVIEW HOME OFFSET:[ ]([\\+\\-]\\d+),[ ]([\\+\\-]\\d+)>/i;\nconst xOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$1) : 0));\nconst yOffsets = actor.traitObjects().map((obj) => (obj && obj.note.match(offsetNote) ? Number(RegExp.$2) : 0));\nx = xOffsets.reduce((r, offset) => r + offset, x);\ny = yOffsets.reduce((r, offset) => r + offset, y);\n\n// Set Home Position\nthis.setHome(x, y);"
 *
 */
/* ----------------------------------------------------------------------------
 * Enemy Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Enemy:
 *
 * @param Visual
 *
 * @param AttackAnimation:num
 * @text Attack Animation
 * @parent Visual
 * @type animation
 * @desc Default attack animation used for enemies.
 * Use <Attack Animation: x> for custom animations.
 * @default 1
 *
 * @param EmergeText:eval
 * @text Emerge Text
 * @parent Visual
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show or hide the 'Enemy emerges!' text at the start of battle.
 * @default false
 *
 * @param SelectWindow
 * @text Select Window
 *
 * @param FrontViewSelect:eval
 * @text FV: Right Priority
 * @parent SelectWindow
 * @type boolean
 * @on Right
 * @off Normal
 * @desc If using frontview, auto select the enemy furthest right.
 * @default false
 *
 * @param SideviewSelect:eval
 * @text SV: Right Priority
 * @parent SelectWindow
 * @type boolean
 * @on Right
 * @off Normal
 * @desc If using sideview, auto select the enemy furthest right.
 * @default true
 *
 * @param NameFontSize:num
 * @text Name: Font Size
 * @parent SelectWindow
 * @desc Font size used for enemy names.
 * @default 22
 *
 * @param SvBattlers
 * @text Sideview Battlers
 *
 * @param AllowCollapse:eval
 * @text Allow Collapse
 * @parent SvBattlers
 * @type boolean
 * @on Allow
 * @off Don't
 * @desc Causes defeated enemies with SV Battler graphics
 * to "fade away" when defeated?
 * @default false
 *
 * @param AnchorX:num
 * @text Anchor: X
 * @parent SvBattlers
 * @desc Default X anchor for Sideview Battlers.
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor: Y
 * @parent SvBattlers
 * @desc Default Y anchor for Sideview Battlers.
 * @default 1.0
 *
 * @param MotionIdle:str
 * @text Motion: Idle
 * @parent SvBattlers
 * @type combo
 * @option walk
 * @option wait
 * @option chant
 * @option guard
 * @option damage
 * @option evade
 * @option thrust
 * @option swing
 * @option missile
 * @option skill
 * @option spell
 * @option item
 * @option escape
 * @option victory
 * @option dying
 * @option abnormal
 * @option sleep
 * @option dead
 * @desc Sets default idle animation used by Sideview Battlers.
 * @default walk
 *
 * @param Shadow:eval
 * @text Shadow Visible
 * @parent SvBattlers
 * @type boolean
 * @on Visible
 * @off Hidden
 * @desc Show or hide the shadow for Sideview Battlers.
 * @default true
 *
 * @param Width:num
 * @text Size: Width
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc Default width for enemies that use Sideview Battlers.
 * @default 64
 *
 * @param Height:num
 * @text Size: Height
 * @parent SvBattlers
 * @type number
 * @min 1
 * @desc Default height for enemies that use Sideview Battlers.
 * @default 64
 *
 * @param WtypeId:num
 * @text Weapon Type
 * @parent SvBattlers
 * @type number
 * @min 0
 * @desc Sets default weapon type used by Sideview Battlers.
 * Use 0 for Bare Hands.
 * @default 0
 *
 */
/* ----------------------------------------------------------------------------
 * HP Gauge Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~HpGauge:
 *
 * @param Display
 * @text Show Gauges For
 *
 * @param ShowActorGauge:eval
 * @text Actors
 * @parent Display
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show HP Gauges over the actor sprites' heads?
 * Requires SV Actors to be visible.
 * @default true
 *
 * @param ShowEnemyGauge:eval
 * @text Enemies
 * @parent Display
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show HP Gauges over the enemy sprites' heads?
 * Can be bypassed with <Hide HP Gauge> notetag.
 * @default true
 *
 * @param RequiresDefeat:eval
 * @text Requires Defeat?
 * @parent ShowEnemyGauge:eval
 * @type boolean
 * @on Require Defeat First
 * @off No Requirement
 * @desc Requires defeating the enemy once to show HP Gauge?
 * Can be bypassed with <Show HP Gauge> notetag.
 * @default true
 *
 * @param BTestBypass:eval
 * @text Battle Test Bypass?
 * @parent RequiresDefeat:eval
 * @type boolean
 * @on Bypass
 * @off Don't Bypass
 * @desc Bypass the defeat requirement in battle test?
 * @default true
 *
 * @param Settings
 *
 * @param AnchorX:num
 * @text Anchor X
 * @parent Settings
 * @desc Where do you want the HP Gauge sprite's anchor X to be?
 * @default 0.5
 *
 * @param AnchorY:num
 * @text Anchor Y
 * @parent Settings
 * @desc Where do you want the HP Gauge sprite's anchor Y to be?
 * @default 1.0
 *
 * @param Scale:num
 * @text Scale
 * @parent Settings
 * @desc How large/small do you want the HP Gauge to be scaled?
 * @default 0.5
 *
 * @param OffsetX:num
 * @text Offset X
 * @parent Settings
 * @desc How many pixels to offset the HP Gauge's X by?
 * @default 0
 *
 * @param OffsetY:num
 * @text Offset Y
 * @parent Settings
 * @desc How many pixels to offset the HP Gauge's Y by?
 * @default -3
 *
 * @param Options
 * @text Options
 *
 * @param AddHpGaugeOption:eval
 * @text Add Option?
 * @parent Options
 * @type boolean
 * @on Add
 * @off Don't Add
 * @desc Add the 'Show HP Gauge' option to the Options menu?
 * @default true
 *
 * @param AdjustRect:eval
 * @text Adjust Window Height
 * @parent Options
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the options window height?
 * @default true
 *
 * @param Name:str
 * @text Option Name
 * @parent Options
 * @desc Command name of the option.
 * @default Show HP Gauge
 *
 */
/* ----------------------------------------------------------------------------
 * Action Sequence Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ActionSequence:
 *
 * @param AutoSequences
 * @text Automatic Sequences
 *
 * @param AutoMeleeSolo:eval
 * @text Melee Single Target
 * @parent AutoSequences
 * @type boolean
 * @on Allow
 * @off Ignore
 * @desc Allow this auto sequence for physical, single target actions?
 * @default true
 *
 * @param AutoMeleeAoE:eval
 * @text Melee Multi Target
 * @parent AutoSequences
 * @type boolean
 * @on Allow
 * @off Ignore
 * @desc Allow this auto sequence for physical, multi-target actions?
 * @default true
 *
 * @param CastAnimations
 * @text Cast Animations
 *
 * @param CastCertain:num
 * @text Certain Hit
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Certain Hit skills.
 * @default 120
 *
 * @param CastPhysical:num
 * @text Physical
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Physical skills.
 * @default 52
 *
 * @param CastMagical:num
 * @text Magical
 * @parent CastAnimations
 * @type animation
 * @desc Cast animation for Magical skills.
 * @default 51
 *
 * @param CounterReflection
 * @text Counter/Reflect
 *
 * @param CounterPlayback:eval
 * @text Counter Back
 * @parent CounterReflection
 * @type boolean
 * @on Play Back
 * @off Ignore
 * @desc Play back the attack animation used?
 * @default true
 *
 * @param ReflectAnimation:num
 * @text Reflect Animation
 * @parent CounterReflection
 * @type animation
 * @desc Animation played when an action is reflected.
 * @default 1
 *
 * @param ReflectPlayback:eval
 * @text Reflect Back
 * @parent CounterReflection
 * @type boolean
 * @on Play Back
 * @off Ignore
 * @desc Play back the attack animation used?
 * @default true
 *
 * @param Stepping
 *
 * @param MeleeDistance:num
 * @text Melee Distance
 * @parent Stepping
 * @desc Minimum distance in pixels for Movement Action Sequences.
 * @default 24
 *
 * @param StepDistanceX:num
 * @text Step Distance X
 * @parent Stepping
 * @desc The normal X distance when stepping forward.
 * @default 48
 *
 * @param StepDistanceY:num
 * @text Step Distance Y
 * @parent Stepping
 * @desc The normal Y distance when stepping forward.
 * @default 0
 *
 * @param StepDuration:num
 * @text Step Duration
 * @parent Stepping
 * @desc The number of frames for a stepping action to complete.
 * @default 12
 *
 */
//=============================================================================

const _0x2a19=['PreEndBattleJS','ReflectAnimation','dimColor1','Sprite_Enemy_updateBossCollapse','Window_BattleLog_displayTpDamage','Skills','ZZAOn','createStateSprite','PostRegenerateJS','_opacityWholeDuration','focus','FrontViewSelect','BaseTroopIDs','Window_PartyCommand_initialize','mLFhj','spriteId','battleStatusWindowAnimationContainer','RegExp','oAygc','VisuMZ_0_CoreEngine','drawSingleSkillCost','CriticalHitRate','displayEvasion','_createDamageContainer','_methods','all\x20targets','shadow','atCGp','JbHxu','GOgEp','createTargetsJS','recoverAll','_surprise','dMDyl','log','Game_Interpreter_updateWaitMode','HyyDa','RequiresDefeat','reduce','concat','Game_Enemy_setup','getConfigValue','escape','BattleManager_initMembers','Window_BattleLog_performCollapse','canAttackBattleCore','PreStartBattleJS','drawIcon','partyCommandWindowRectBorderStyle','faceWidth','ActSeq_Camera_Reset','hILWG','KyBYK','OffsetX','ActSeq_Mechanics_ArmorPenetration','cameraOffsetDuration','Text','_borderPortraitTargetX','extraHeight','EVAL','addImmortal','JiWSa','_animationCount','makeEscapeRatio','OffsetY','fillRect','BattleCmdList','setup','createBattleField','emerge','KEOzo','WklnP','AttackAnimation','CreateActionSequenceTargets','_enemyID','RxsKf','changeBattlebacks','isPreviousScene','Window_BattleLog_performReflection','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20targets\x20=\x20arguments[1];\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20targets\x20||\x20[];\x0a\x20\x20\x20\x20','filterArea','drawText','auto','Sprite_StateIcon_updateFrame','_subject','actionBattleCoreJS','gainTp','Window_SkillList_maxCols','statusText','canAddSkillCommand','unshift','Skill-%1-%2','extraPositionX','WaitCount','bitmap','KhbZF','lRvQO','_spriteset','Scene_Battle_terminate','drawBackgroundRect','egLTl','Scene_Battle_createActorCommandWindow','_duration','callUpdateHelp','yXBeE','jvAbs','displayReflection','XmWJW','canMove','makeTargetSprites','useItem','ClearBattleLog','NfNbR','faMwq','criticalHitRate','JMsiN','SkillItemStandardCols','showHelpWindow','filters','weaponTypes','Game_BattlerBase_addNewState','CmdIconFight','_battleCoreNoElement','fight','current\x20target','addedDebuffs','showNormalAnimation','loadBitmap','_enemyId','uSnUm','resizeWindowBorderStyle','displayMiss','center','svBattlerAnchorX','WtypeId','PerformAction','_commonEventQueue','onEnemyCancel','createJS','ActSeq_Set_FinishAction','Game_BattlerBase_canGuard','removeChild','updateWaitMode','Item-%1-%2','CriticalDmgRate','makeTargetsBattleCore','AxtuH','Width','movement','moveBattlerToPoint','setVisibleUI','PostDamageAsUserJS','autoBattleAtStart','performEvasion','makeCommandList','contentsOpacity','PostEndTurnJS','shouldPopupDamage','CfWBD','OVeBq','SkipPartyCmd','StyleON','changePaintOpacity','parse','MP_Flat','NameFontSize','Window_BattleLog_performRecovery','isCertainHit','Game_Action_evalDamageFormula','isBypassDamageCap','YMQBN','svAnchorY','WaitCount1','ActSeq_BattleLog_WaitForBattleLog','isOpponent','_battler','onRegeneratePlayStateAnimation','worldTransform','popupDamage','commandSymbol','isEscapeCommandEnabled','walk','_actorSprites','ChargeRate','some','MP_Rate','MotionType','lCJkK','damageContainer','sortDamageSprites','alive\x20actors\x20not\x20user','updatePositionBattleCore','ActSeq_DB_DragonbonesMotionAni','performActionMotions','basicGaugesY','WaitForZoom','performMoveToPoint','ShowHpDmg','GroupDigits','showPortraits','LHFTn','jbxmi','visualHpGauge','DTB','battleCommands','updateHelp','startJump','onDisabledPartyCommandSelection','commandNameWindowDrawBackground','isForRandomBattleCore','floor','Game_Battler_onBattleStart','gainMp','pages','isDead','createCommandNameWindow','DewHp','max','BattleManager_endBattle','setHelpWindow','createString','ORMAm','SKILLS','LbUVV','ECxVQ','loop','addBattleCoreAutoBattleStyleCommand','_additionalSprites','updateMain','partyCommandWindowRect','kINTr','animationShouldMirror','alive\x20enemies\x20not\x20target','ActSeq_Movement_FaceTarget','FywdN','type','hNiaz','lQyLf','_motionSpeed','HelpItem','currentClass','playEnemyAttack','startFloat','avIaW','onEscapeSuccess','addCommand','alive\x20enemies','AlphaFilter','#ffffff','displayStartMessages','processBorderActor','DistanceY','JS\x20%1START\x20BATTLE','_offsetY','AsTarget','criticalDmgFlat','forceMotion','default','autoMeleeSingleTargetActionSet','createActorCommandWindow','ykzaD','EscapeFailureJS','showEnemyAttackAnimation','displayType','commandNameWindowDrawText','changeAtbChargeTime','_homeY','TbtUt','showAnimation','ZVYco','_animationContainer','removeImmortal','PostStartBattleJS','innerWidth','ActionStart','frameVisible','alive\x20opponents','Scene_Battle_selectPreviousCommand','isSpriteVisible','PreEndTurnJS','_helpWindow','gainHp','startBattle','float','ActSeq_Mechanics_WaitForEffect','Scene_Battle_stop','Interrupt','drawItemImage','JumpToLabel','_svBattlerData','Scene_Battle_selectNextCommand','requestMotion','itemHit','isSceneChanging','yWyij','applySoftDamageCap','_colorType','commandNameWindowCenter','%1EndBattleJS','missed','maxTp','commandName','waitForEffect','addSkillCommands','canAttack','createChildSprite','UYIkP','Destination','createAnimationSprite','OffsetAdjust','DQRPK','iZkAp','FUNC','battleEffect','PkqBZ','nHpSE','Scene_Battle_onActorCancel','updateBorderStyle','ActSeq_Motion_MotionType','updateBattlebackBitmap','_targetIndex','StepDuration','AnchorY','FaceDirection','note','hQDAw','windowPadding','vgvuN','AGlAi','updateWeather','isAnyoneMoving','performDamage','ActionSequence','partyCommandWindowRectXPStyle','battleZoom','damageFlat','iATcQ','rdJGf','battler','updateStart','actorId','measureTextWidth','hrwOb','ShowAddedState','NpDRs','drawItemStyleIconText','ARRAYSTR','getLastPluginCommandInterpreter','isBusy','uHjDe','_active','Scene_Battle_onActorOk','_enemyWindow','maxBattleMembers','cancelTargetSelectionVisibility','MLJAc','displayAddedStates','attackSkillId','isForOpponentBattleCore','_autoBattle','Scene_Battle_onEnemyOk','activate','helpAreaHeight','maxLines','_floatHeight','setBattleCameraOffset','Sprite_Actor_createStateSprite','effect','VisuMZ_2_DragonbonesUnion','createBattleFieldBattleCore','compareEnemySprite','GtLnI','UuGou','_updateClientArea','dead','QBIEz','ShowPortraits','setupIconTextPopup','Game_BattlerBase_isStateResist','GCbEO','getNextSubjectFromPool','DefaultSoftScaler','Window_BattleLog_pushBaseLine','autoBattleStart','EPGZF','eUFEI','length','Scale','VarianceFormulaJS','JS\x20%1END\x20ACTION','Scene_Battle_startPartyCommandSelection','_battleCoreForcedElements','DamageFlat','nMorS','deathStateId','EscapeFail','StartName','Mechanics','updatePhase','DefaultSoftCap','refreshCursor','getInputButtonString','executeDamage','processPostBattleCommonEvents','performFlinch','QxkMJ','BattleLogRectJS','Sprite_Actor_update','_windowLayer','performMiss','cIEFr','rNcLN','jSzDD','targetActionSet','Sprite_Actor_setActorHome','stateMotionIndex','clone','BattleCore','naLjK','iconText','VisuMZ_1_SkillsStatesCore','grpjY','ARRAYJSON','BattleManager_startAction','join','kupTV','Linear','createDigits','%1Apply%2JS','isAnyoneFloating','isEnemy','Game_Action_isForOpponent','BattleManager_startInput','_logWindow','Sprite_Actor_moveToStartPosition','WxSbq','Opacity','getItemDamageAmountLabelBattleCore','addCustomCommands','isImmortal','_homeX','getTraitSetKeys','_back2Sprite','STRUCT','ActorCmd','SideviewSelect','Window_BattleLog_popBaseLine','_handlers','motionSpeed','SXzDJ','repositionCancelButtonBorderStyle','performAttack','_flashDuration','setupBattleback','ShowRemovedBuff','ggqRU','isShownOnBattlePortrait','statusWindowRectXPStyle','selectNextCommand','validTargets','exit','isGuardWaiting','onBattleStartBattleCore','setBattlerFacePoint','VhYqJ','bind','registerDefeatedEnemy','zcBeg','isMeleeSingleTargetAction','MeqIL','okTargetSelectionVisibility','isBorderStylePortraitShown','requestDragonbonesAnimation','autoBattleWindowRect','MgANa','frontviewSpriteY','Point','addLoadListener','loadPicture','Scene_Battle_logWindowRect','_cursorSprite','ActSeq_Movement_MoveBy','battleCoreResumeLaunchBattle','Game_BattlerBase_eraseState','BARE\x20HANDS','_autoBattleWindow','vOXEn','applyHardDamageCap','cUzIu','performReflection','JS\x20%1APPLY\x20%2','Game_Action_needsSelection','processRandomizedData','WkdqW','windowAreaHeight','launchBattle','friendsUnit','changeBattlerOpacity','iconIndex','floatBattler','battleCamera','_reflectionTarget','Immortal','mpDamageFmt','CriticalHitRateJS','rdGKf','addAutoBattleCommand','HLvqB','LDwRR','terminate','DisablePartyCmd','forceWeaponAnimation','createActorCommandWindowBattleCore','wSyEY','CalcEscapeRatioJS','gyEAS','updateCollapse','#%1','createActors','drawItem','OAzLU','ActSeq_Mechanics_Multipliers','AllowRandomSpeed','enemyId','PreApply%1JS','buffAdd','AS\x20TARGET','prototype','isBattleFlipped','ActSeq_Camera_FocusTarget','substitute','_cache','PreDamageAsUserJS','ActSeq_Movement_Jump','drawGauge','VisuMZ_1_ElementStatusCore','compareBattlerSprites','isSideButtonLayout','forceAction','AdjustRect','CoreEngine','clearMotion','close','addBattleCoreAutoBattleStartupCommand','VcYNH','jJNSc','updateCommandNameWindow','right','ForceRandom','_target','addItemCommand','Window_BattleLog_update','_preBattleCommonEvent','displayMpDamage','Window_BattleLog_displayFailure','AllowCollapse','hitRate','DistanceX','zBOkR','isMagicSkill','ShowMpDmg','ArRedFlat','cameraDuration','CmdIconAutoBattle','evade','CQMMe','_floatWholeDuration','TP_Rate','hBoHw','_lastPluginCommandInterpreter','performCounter','canGuardBattleCore','createBorderStylePortraitSprite','sort','_skillWindow','setWaitMode','subject','rRdqe','sortEnemies','eisbe','contents','HP_Rate','Scene_Options_maxCommands','updateVisibility','_battleCoreAddedElements','itemLineRect','BattleStartEvent','start','AvPsD','requestAnimation','_weather','okButtonText','DisplayAction','xGOXu','getBattlePortrait','RiQkq','cFzoh','getSkillIdWithName','_createCursorArea','ActSeq_Zoom_Clear','NUM','setCursorRect','ActSeq_Mechanics_RemoveState','zinPl','_scene','battleback1Name','LJIFQ','SkillItemMiddleLayout','addShowHpGaugeCommand','PostEndBattleJS','GmseZ','Scene_Battle_onEnemyCancel','PartyCmd','applyArmorModifiers','getMenuImage','_actor','destroy','skill','createKeyJS','AutoBattleOK','mpHealingFmt','ActSeq_Element_Clear','Actor-%1-%2','isFastForward','Name','TextAlign','alive\x20friends\x20not\x20user','ActSeq_Mechanics_TextPopup','itemHeight','isVisualHpGaugeDisplayed','Window_BattleLog_performEvasion','initVisibility','mhp','DamageType%1','clamp','ActSeq_Mechanics_Immortal','DefaultDamageStyle','JS\x20%1REGENERATE','TimeScale','Buffs','AGI','Mirror','_jumpMaxHeight','isMeleeMultiTargetAction','fqgCc','QSneG','HomePosJS','statusWindowRectBorderStyle','ActionEnd','updateBattlerContainer','missile','BattleManager_updatePhase','CounterPlayback','replace','ActSeq_Movement_FaceDirection','ZHiYf','yCLDd','PostDamage%1JS','drawLineText','startPartyCommandSelection','Game_Action_itemEffectAddNormalState','oVpAg','ActSeq_BattleLog_WaitForNewLine','addedBuffs','BattleManager_processDefeat','currentValue','AnchorX','onActorCancel','createContents','clearWeaponAnimation','Game_Action_itemEffectAddAttackState','PreStartActionJS','Game_Enemy_transform','traitObjects','PreStartTurnJS','Scene_Battle_createCancelButton','isFlipped','ANjbn','addSingleSkillCommand','BattleManager_processVictory','critical','isAutoBattle','push','selectPreviousCommand','FlashDuration','targetObjects','wJBEm','updateActors','_allTargets','QWgab','WaitCount2','UmETm','PostStartActionJS','ConfigManager_makeData','toLowerCase','setBackgroundType','oxKHb','onOpacityEnd','_damages','Window_BattleLog_clear','ShowFacesListStyle','prev\x20target','ULCop','opponentsUnit','_battlePortrait','jump','pop','ALL\x20SKILLS','zSvya','startDamagePopup','ntVJf','iconHeight','initBattlePortrait','updateShadowPosition','actor%1-portrait','_action','cancelButtonText','MAXHP','CriticalDmgFlat','removedBuffs','mmHpS','Game_Interpreter_terminate','_itemWindow','value','applyVariance','magicSkills','BattleVictoryJS','YbAiv','splice','isAtbChargingState','battleCommandIcon','Window_BattleEnemy_show','itemEffectAddNormalState','canInput','commandStyleCheck','addGuardCommand','applyData','CAoiR','ActSeq_Movement_MoveToTarget','lineRect','setupBattleCoreData','evaded','getEnemyIdWithName','_totalValue','cmlTh','sKdrR','bJOLE','cNsIU','NaXJz','initBattleCore','hyidg','_statusWindow','_skillIDs','drawTextEx','StyleName','_actorCommandWindow','hERBt','getNextSubject','processVictory','displayReflectionPlayBack','TargetLocation','performJump','Sprite_Battler_initMembers','ActSeq_Movement_MoveToPoint','addSkillTypeCommand','isUndecided','origin','Defeat','isBattleTest','isAnimationPlaying','oNeOA','FaceAway','lineHeight','StartTurnMsg','owCVP','Game_Interpreter_PluginCommand','MotionIdle','displayFailure','drawItemStatusListStyle','canBattlerMove','removeState','HelpFight','uDxzr','AutoMeleeSolo','UNTITLED','name','Sprite_Enemy_createStateIconSprite','UkRpt','frKyi','ShowActorGauge','SvWeaponSolo-%1-%2','isDisplayEmergedEnemies','_actions','addFightCommand','DwaNl','svBattlerData','createAllWindows','updateCancel','startMove','dying','Window_BattleLog_displayCritical','Fsump','createHelpWindowBattleCore','WnQUq','_floatEasing','DamageStyleList','loadSystem','Game_BattlerBase_refresh','ActSeq_Mechanics_HpMpTp','makeDeepCopy','isForFriend','isDTB','addState','Window_BattleLog_performActionEnd','TKPuV','requestFauxAnimation','weatherPower','updateStateSpriteBattleCore','Zshiw','isPreviousSceneBattleTransitionable','getItemDamageAmountTextBattleCore','alive\x20opponents\x20not\x20target','ShowTpDmg','playCancel','HelpOptions','_preemptive','speed','uoKlu','Game_Temp_requestAnimation','rZecY','random','startAction','dbPQU','enemyNames','KFiii','apply','text','createLowerLayer','faceRect','hYKew','iVnLt','fpNSm','-%1','rowSpacing','LbfLo','LzHjT','_defeatedEnemies','Spriteset_Battle_update','Turns','WsHqb','SvBattlerSolo-%1-%2','displayChangedBuffs','actorCommandAutoBattle','isAutoBattleCommandEnabled','isHidden','canGuard','_battleField','actorCommandEscape','PopupShiftX','startInput','retreat','_executedValue','updateBattleProcess','chant','constructor','createPartyCommandWindowBattleCore','HwPDr','PreDamageAsTargetJS','JS\x20ESCAPE\x20FAILURE','ShowEnemyGauge','_list','HelpSkillType','ActSeq_Motion_WaitMotionFrame','RQPMX','onFloatEnd','Scene_Map_launchBattle','Window_BattleLog_refresh','Bsxvi','TextColor','helpAreaBottom','Window_BattleLog_performSubstitute','PreRegenerateJS','stepForward','PopupShiftY','PdbTq','Settings','TwXsd','isCommandEnabled','updateShadow','item','CriticalDuration','Window_Options_addGeneralOptions','QRGSH','ActSeq_BattleLog_PopBaseLine','bsGTE','skillItemWindowRectMiddle','Spriteset_Battle_updateActors','getAttackMotion','addedStateObjects','CalcActionSpeedJS','addPartyCommand','ShowCritical','setHelpWindowItem','onJumpEnd','isStateResist','command357','_offsetX','isTurnBased','LGUfU','itemRect','makeDamageValue','wait','FPfjk','animationId','VisuMZ_3_ActSeqCamera','unXOd','addChildToBack','UDZgL','setupActionSet','isEffecting','MDF','ShowMissEvasion','collapse','adjustWeaponSpriteOffset','BattleManager_onEscapeFailure','Debuffs','commandAutoBattle','drawItemStyleIcon','gtyLn','skills','makeActions','_lines','AUTO\x20BATTLE','callNextMethod','stepBack','softDamageCap','_targetOpacity','_stateIconSprite','_attackAnimationId','wgNTH','vTIxq','min','skillId','WaitForNewLine','tDHaE','skillItemWindowRectBorderStyle','isForAll','createStateIconSprite','setupWeaponAnimation','AsUser','_phase','scope','StartTurnWait','Game_Battler_performActionStart','jsnrp','MHDKt','abnormal','power','PostApplyAsUserJS','arPenFlat','logWindowRect','Game_Battler_regenerateAll','isBattleSys','Post','zKPLv','SkillsStatesCore','_requestRefresh','GUARD','addBuff','show','_enemyNameContainer','skillTypes','Direction','setBattleCameraTargets','ArPenFlat','performCastAnimation','prepareBorderActor','PostApplyAsTargetJS','destroyDamageSprite','myUYr','_flinched','otIYm','IKmRn','weaponImageId','onEnemyOk','cWGxq','Game_BattlerBase_initMembers','zpDuj','CastAnimation','irsEA','IconStypeMagic','maxItems','IlQYg','setMoveEasingType','removeDamageSprite','addText','Zrbrs','vazzY','ForceDeath','PJfyW','mrSDI','startAttackWeaponAnimation','isTpb','ResetFocus','_hpGaugeSprite','Ldsbx','mJKFH','swapEnemyIDs','JLqTJ','battleback2Name','ShowSubstitute','QLCIn','finishActorInput','endAction','_stypeIDs','getNextDamagePopup','YqlJU','createWeather','initialize','waitCount','Window_BattleLog_performActionStart','xnwRl','cancel','WaitForAnimation','ActSeq_Movement_WaitForJump','%1EndActionJS','Game_Action_makeTargets','CriticalColor','arPenRate','itemWindowRect','drawActorFace','onEscapeFailure','AHAbC','CmdIconItem','updateFrame','kIlZK','allowRandomSpeed','centerFrontViewSprite','actionSplicePoint','Window_BattleStatus_drawItemImage','Game_Map_setupBattleback','parent','battleAnimation','VKuad','ActionCenteredName','CastPhysical','calcWindowHeight','vdWEg','regenerateAllBattleCore','autoSelect','uZgyn','currentSymbol','addAnimationSpriteToContainer','\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20','_motion','toUpperCase','sQWvB','startTurn','match','HpGauge','applyImmortal','onMoveEnd','autoMeleeMultiTargetActionSet','makeTargets','commandOptions','makeAutoBattleActions','_baseY','clear','setAttack','addDamageSprite','AddHpGaugeOption','States','ext','setHandler','createCancelButton','alive\x20actors\x20not\x20target','isSkill','setBattler','WiohH','ActSeq_Motion_RefreshMotion','stop','SvMotionIdleMass-%1-%2','updateTargetPosition','gfKKy','isLearnedSkill','textColor','statusWindowRect','criticalDmgRate','onTurnEnd','list','isActing','swing','playReflection','allowCollapse','battleCommandName','gFMjC','_multipliers','EscapeSuccess','Ktdlj','loadBattleback1','MessageWait','turn','optDisplayTp','alive\x20actors','autoBattleStyle','MIvfk','collapseType','BattleManager_startBattle','createInnerPortrait','battleCameraData','hpAffected','_jumpHeight','processBattleCoreJS','Window_BattleLog_performAction','XKbWA','_createEffectsContainer','fkKIX','slice','KHtkp','EnableSoftCap','_waitCount','_baseX','version','shift','_escapeRatio','ActSeq_BattleLog_DisplayAction','pushBaseLine','Spriteset_Battle_createBattleField','setBattlePortrait','waitForNewLine','height','findTargetSprite','numTargets','Scene_Battle_skillWindowRect','snapForBackground','_battlerName','_dimmerSprite','HelpAutoBattle','refreshActorPortrait','Game_Map_battleback2Name','SJLqS','TxtlK','ActSeq_Motion_PerformAction','isForOne','jlGeR','gtWqQ','SceneManager_isSceneChanging','RIKpn','removeBuff','hasSvBattler','displayItemMessage','JaOcX','_enemyIDs','anchorY','ShowRemovedState','isFloating','vHNWw','ShowPopup','gNViG','autoBattle','ActSeq_Mechanics_AddBuffDebuff','displayAction','status','displayCounter','ArRedRate','damageStyle','actor','_targetFloatHeight','canEscape','_battlerContainer','_enemies','initBattleGauges','isTriggered','_effectsContainer','remove','initElementStatusCore','-%1\x20MP','BUtBf','resetFontSettings','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','round','ActSeq_Camera_FocusPoint','battleFloat','_immortal','itemTextAlign','format','RepositionEnemies','wholeActionSet','setBattlerFlip','ActSeq_Camera_Clamp','gPQNG','Window_BattleLog_performMiss','forceSelect','damageOffsetY','Shadow','battleLayoutStyle','ActSeq_Mechanics_Collapse','HitFlat','Game_System_initialize','createCommandVisibleJS','setupHpGaugeSprite','ROfUU','deadMembers','MAXMP','_item','ealRS','displayRemovedStates','ActSeq_BattleLog_Refresh','updatePosition','hsRxm','svBattlerName','_isBattlerFlipped','isDeathStateAffected','_cancelButton','MotionSpeed','_animation','ATK','repeats','Game_Action_itemHit','svBattlerAnchorY','Window_BattleLog_performMagicEvasion','ATTACK','onBattleStart','_commandNameWindow','addOptionsCommand','icon','%1EndTurnJS','ActSeq_Element_AddElements','nameY','hLKjH','regenerateAll','anchor','Sprite_Battler_setBattler','setupBattlebackBattleCore','performRecovery','ApplyImmortal','loadSvActor','FZwPU','isOptionsCommandAdded','helpWindowRectBorderStyle','message2','waitForOpacity','isBattleMember','dead\x20friends','requestMotionRefresh','usePremadeActionSequence','ActionEffect','AutoBattleMsg','Scene_Battle_windowAreaHeight','Window_BattleLog_performCounter','enemy','clearRect','setActorHome','placeActorName','JaiwQ','UDkQA','pxzJE','BattleManager_startTurn','HitRate','ITEM','evalDamageFormula','_wtypeIDs','updateStatusWindowPosition','attack','needsSelection','isAlive','custom','updateBitmap','createDamageSprite','WaitForEffect','createSeparateDamagePopups','animation','Game_Action_executeDamage','Window_BattleStatus_initialize','skillWindowRect','processAnimationRequests','move','alive\x20battlers\x20not\x20user','_emptyBitmap','ActSeq_Zoom_Scale','setHome','boxHeight','_svBattlerSprite','placeGauge','NkstM','zcFAt','QoL','JJbTA','includes','performSubstitute','Armor-%1-%2','displayCurrentState','children','isFightCommandEnabled','updateStyleOpacity','battleDisplayText','battleOpacity','performAction','maxCols','setBattleZoom','ActSeq_Element_ForceElements','JS\x20ESCAPE\x20SUCCESS','sleep','gradientFillRect','_interpreter','setupDamagePopup','isCancelled','indexOf','BTestBypass','battlelog','isBuffAffected','magicReflection','_jumpDuration','wtfjo','opacity','endAnimation','updateFloat','ActionSkillMsg1','clearDamagePopup','PcDwj','_back1Sprite','CmdTextAlign','text\x20target','CmdIconOptions','maxCommands','Scene_ItemBase_applyItem','fontSize','action','mmp','MeleeDistance','vLMkZ','finishActionSet','MotionFrameWait','JS\x20BATTLE\x20VICTORY','getDamageStyle','applyEasing','animationWait','CastCertain','Targets2','setupTextPopup','Scene_Battle_itemWindowRect','isChanting','lXoFX','Sprite_Actor_setBattler','_updateCursorArea','EMMBY','_updateFilterArea','yGkod','Scene_Battle_createPartyCommandWindow','PostApply%1JS','PortraitScale','ZdrAV','isTPB','padding','AutoBattleBgType','ElementStatusCore','process_VisuMZ_BattleCore_Notetags','isAutoBattleCommandAdded','result','drawItemImagePortraitStyle','updateJump','isSkipPartyCommandWindow','Window_BattleLog_displayMpDamage','PostApplyJS','_borderPortraitSprite','makeTargetSelectionMoreVisible','CommandVisible','Scene_Battle_updateBattleProcess','traitSet','process_VisuMZ_BattleCore_CreateRegExp','setText','iterateBattler','Damage','AhOvW','JS\x20%1DAMAGE\x20%2','fOCJL','repeatTargets','weatherType','snZCe','wdYDw','Style','Scene_Battle_startActorSelection','transform','_regionBattleback2','process_VisuMZ_BattleCore_DamageStyles','HiQvh','alive\x20battlers\x20not\x20target','waitForJump','removeAnimation','dimColor2','Enemy-%1-%2','innerHeight','ActSeq_Animation_ShowAnimation','gtTYs','_jumpWholeDuration','updateFlip','_cursorArea','StepDistanceY','ActSeq_Target_PrevTarget','Game_Battler_performDamage','EscapeSuccessJS','autoBattleUseSkills','displayHpDamage','open','ConfigManager_applyData','needsSelectionBattleCore','applyDamageCaps','XhjFv','hide','isJumping','initMembersBattleCore','createPartyCommandWindow','iconWidth','ActSeq_Mechanics_DamagePopup','createHelpWindow','Scene_Battle_createHelpWindow','_floatDuration','setBattlerBattleCore','updateAction','%1Event','updatePadding','ShowCurrentState','isNextSceneBattleTransitionable','BattleManager_endAction','placeTimeGauge','ActSeq_Target_RandTarget','%1StartBattleJS','dtroP','Window_BattleLog_performDamage','isItemCommandEnabled','Window_BattleLog_displayRemovedStates','clearResult','initMembers','_opacityEasing','eMPPK','feBzb','onActorOk','kBhbF','Game_Map_battleback1Name','Setting','XZXFl','ARRAYFUNC','_checkOn','TP_Flat','Scene_Battle_createAllWindows','ActiveTpbOptionsMessage','GXorA','AutoBattleCancel','HnOjp','ShowCounter','ShowAddedBuff','_partyCommandWindow','actionEffect','PRE-','message1','svBattlerShadowVisible','YIfii','CmdTextAutoBattle','fittingHeight','JGmVo','getColor','PreDamageJS','BattleDefeatJS','updateForceAction','damageRate','PopupDuration','return\x200','_opacityDuration','Window_BattleLog_displayEvasion','AutoMeleeAoE','statusTextAutoBattleStyle','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','Scene_Battle_partyCommandWindowRect','addChild','Scene_Battle_start','selectNextActor','makeData','isSceneBattle','getWtypeIdWithName','damage','_pattern','rQhrW','YPkpB','IconSet','Duration','dead\x20opponents','setSvBattlerSprite','Sprite_Battler_updatePosition','updateMotionCount','BattleLayout','actorCommandSingleSkill','applyBattleCoreJS','PdIAf','CriticalHitFlat','createEnemyNameContainer','Class-%1-%2','createAutoBattleWindow','setupMotion','damageOffsetX','CFOYi','itemEffectAddAttackState','victory','ShowReflect','extraPositionY','StepDistanceX','uiMenuStyle','stepFlinch','UrVVO','KobAr','softDamageCapRate','DwvrM','performCollapse','isPhysical','TPB','_enemy','addChildAt','FocusX','boxWidth','Sprite_Enemy_updateStateSprite','cameraClamp','ARRAYSTRUCT','zoomDuration','ShowFailure','GOLcH','createHpGaugeSprite','thrust','moveBattlerDistance','hitFlat','ConvertParams','vcexr','toString','displayCritical','getDefeatedEnemies','_text','_waitMode','flashColor','useDigitGrouping','gDcNX','startTpbTurn','<CENTER>%1','EasingType','ShowPortraitsBorderStyle','DamageStyles','getSkillTypes','ARRAYEVAL','hasBeenDefeatedBefore','QjCmF','lUSUL','callOptions','ActSeq_Set_SetupAction','_armorPenetration','isOptionsCommandEnabled','PvLwX','_enemySprites','performMagicEvasion','addDebuff','AddOption','ActSeq_Animation_CastAnimation','command119','DamageRate','Sprite_Enemy_setBattler','getHardDamageCap','scale','anchorX','eraseState','FEPTc','allBattleMembers','FRWeo','rDndu','onEncounterBattleCore','drawItemImageListStyle','process_VisuMZ_BattleCore_Action_Notetags','ActSeq_Element_NullElements','motionIdle','Slhhs','pow','weapons','GuardFormulaJS','updateBossCollapse','attackAnimationId2','WgBRo','animationBaseDelay','Filename','portrait','_flashColor','isForFriendBattleCore','popBaseLine','SvMotionIdleSolo-%1-%2','CalcEscapeRaiseJS','NAaTc','alive\x20friends','resizeWindowXPStyle','setupCriticalEffect','updateHpGaugePosition','description','isSkillItemWindowsMiddle','XPActorDefaultHeight','isClicked','reserveCommonEvent','applyItem','performActionEnd','BattleEndEvent','WaitForOpacity','active','svShadow','hiZxr','filter','applyGuard','MANUAL','PreDamage%1JS','svAnchorX','updateStateSprite','getBattlePortraitFilename','index','isPlaytest','clearElementChanges','fjmYM','Height','brtrp','getItemDamageAmountLabelOriginal','VisuMZ_1_MainMenuCore','updateEventMain','mfszn','GJoWG','startOpacity','FocusY','yqPnr','PreApplyAsUserJS','commandStyle','qCeoA','setupBattleCore','KwhUK','CTdBj','isMVAnimation','dJRuz','addAutoBattleCommands','Window_Options_statusText','OverallFormulaJS','nhagv','KEXSk','ActSeq_Movement_BattleStep','endBattle','_visualHpGauge_JustDied','jxSfp','_forcing','animationNextDelay','Window_ItemList_maxCols','FlinchDistanceY','regionId','Scene_Boot_onDatabaseLoaded','_motionCount','singleSkill','Omymb','JqvmH','setImmortal','Game_Action_isForRandom','rDdmu','isInputting','aFeEN','isSideView','Spriteset_Battle_createLowerLayer','ueUBL','_forcedBattlers','battleMove','setFrame','nCtIS','updateShadowBattleCore','canUseItemCommand','Window_ActorCommand_setup','Game_Actor_setup','updateBorderSprite','AutoBattle','Window_BattleLog_displayMiss','stypeId','displayBuffs','_updateCursorFilterArea','WaitForMovement','PreEndActionJS','PostStartTurnJS','Victory','clearBattleCoreData','Game_BattlerBase_canAttack','EoQGU','hpDamage','trim','bUXgE','_motionType','battleMembers','isMoving','Window_BattleLog_displayCurrentState','jumpBattler','_callSceneOptions','Enemy','Game_Interpreter_setup','_stateSprite','isMagical','reverse','startMotion','eKAXP','kfBzY','_actionBattlers','changeWeather','refresh','CheckSkillCommandShowSwitches','top','attackMotions','etonp','Sprite_Enemy_loadBitmap','uuPNe','%1RegenerateJS','cuzTW','LDFsl','addSingleSkillCommands','setLastPluginCommandInterpreter','commandEscape','isGuard','evalDamageFormulaBattleCore','isAttack','DamageDisplay','ReflectPlayback','processDefeat','_padding','map','GJPqM','guard','\x5cI[%1]%2','update','gaugeX','getAttackWeaponAnimationId','hpHealingFmt','Game_Battler_performActionEnd','BackColor','process_VisuMZ_BattleCore_jsFunctions','SvWeaponMass-%1-%2','isDying','_damageContainer','startWeaponAnimation','ActSeq_Animation_ActionAnimation','ActSeq_Animation_WaitForAnimation','nRsuE','battlerSprites','addAttackCommand','Window_BattleLog_popupDamage','sjNWd','isAnyoneChangingOpacity','szSsc','uiInputPosition','PARTY','members','KlHZT','_shadowSprite','Game_Action_isForFriend','guardSkillId','drawSkillCost','drawItemStatus','XPActorCommandLines','processRefresh','ActSeq_BattleLog_Clear','PostEndActionJS','statusWindowRectDefaultStyle','battleStartEventMarked','dead\x20battlers','flashDuration','_battleCoreBattleStartEvent','AS\x20USER','parameters','width','playEnemyDamage','XPSpriteYLocation','ActSeq_Movement_WaitForFloat','isItem','JS\x20%1START\x20TURN','BattleManager_onEscapeSuccess','qiFSs','createEffectActionSet','AnimationID','_baseLineStack','invokeAction','SkillItemBorderCols','turnCount','WGjRf','_mainSprite','changeAtbCastTime','Sprite_Enemy_initVisibility','MAT','Game_Battler_onTurnEnd','HP_Flat','ZXveM','addEscapeCommand','isAnimationShownOnBattlePortrait','OoaEH','BIjYN','ActSeq_Mechanics_RemoveBuffDebuff','alive\x20battlers','Game_Battler_startTpbTurn','inHomePosition','CommandAddAutoBattle','EgEOO','wtypeId','DefaultHardCap','hasSkill','ActSeq_Target_NextTarget','code','trueRandomTarget','Scene_Battle_helpWindowRect','isForOpponent','ShowAddedDebuff','isCustomBattleScope','onEncounter','RdecA','invokeMagicReflection','getStypeIdWithName','PelPJ','FlashColor','Targets1','zHfYC','refreshMotion','Game_Interpreter_command283','ActionSkillMsg2','createEnemies','messageSpeed','QvprN','Game_Actor_makeActionList','_damagePopup','hXEVM','_borderPortraitDuration','isOpen','ActSeq_Mechanics_AtbGauge','EmergeText','repositionEnemiesByResolution','ActSeq_Set_TargetActionSet','call','isDamagePopupRequested','Scene_Battle_updateStatusWindowPosition','hardDamageCap','buffRemove','currentAction','mnPPJ','addGeneralOptions','removeAnimationFromContainer','process_VisuMZ_BattleCore_TraitObject_Notetags','aDUHw','debuffAdd','abs','zGeEu','attackAnimationId1','blfEp','isActor','BefKD','eQTWf','registerCommand','performMoveToTargets','ActionAnimation','rlYiR','onDatabaseLoaded','MPhtk','BattleLog','QfQfm','PtDJl','updateEffectContainers','isConfused','randomInt','drPQA','gTfYr','placeStateIcon','create','mpDamage','isFrameVisible','qQBNQ','_createCursorSprite','command283','OZmHs','makeActionListAutoAttack','resize','NewPopupBottom','options','split','displayTpDamage','isDebuffAffected','isAnyoneJumping','Sprite_Battler_startMove','INvTq','Sprite_Battler_updateMain','spell','vFFzo','<%1>\x5cs*([\x5cs\x5cS]*)\x5cs*<\x5c/%1>','CmdIconEscape','isRightInputMode','waitForAnimation','SfsjE','Sprite_Enemy_updateCollapse','aliveMembers','QYxrm','battleSys','waitForMovement','setBattleCameraPoint','isChangingOpacity','ActionItemMsg','moveToStartPosition','Game_Action_clear','updateOpacity','border','updateInterpreter','Actor','HelpEscape','isBattleCoreTargetScope','randomTargets','_battleLayoutStyle','visible','JS\x20BATTLE\x20DEFEAT','lTMMV','currentExt','ZsvWa','Texsd','string','jdnXo','_regionBattleback1','Targets','drawItemStatusXPStyle','helpWindowRect','YMQLM','Elements','_createClientArea','CmdStyle','PostDamageAsTargetJS','ceil','applyCritical','mBWCZ','Pre','WaitForCamera','VisuMZ_2_PartySystem','wmqMb','isForRandom','Formula','LUK','isQueueOptionsMenu','process_VisuMZ_BattleCore_BaseTroops','StxDZ','isPartyCommandWindowDisabled','_weaponSprite','KYRSn','Scene_Battle_startEnemySelection','LADfv','ESCAPE','performActionStart','textSizeEx','vyPCx','DEF','PreApplyAsTargetJS','bgType','Game_Action_apply','BeyIq'];(function(_0x440725,_0x2a19fb){const _0x4654a9=function(_0x30625a){while(--_0x30625a){_0x440725['push'](_0x440725['shift']());}};_0x4654a9(++_0x2a19fb);}(_0x2a19,0x182));const _0x4654=function(_0x440725,_0x2a19fb){_0x440725=_0x440725-0x0;let _0x4654a9=_0x2a19[_0x440725];return _0x4654a9;};var label='BattleCore',tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x4654('0x4c4')](function(_0xba87f2){return _0xba87f2[_0x4654('0x308')]&&_0xba87f2[_0x4654('0x4b8')]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x4654('0x1f3')]=VisuMZ[label][_0x4654('0x1f3')]||{},VisuMZ[_0x4654('0x476')]=function(_0xd0c228,_0x58d993){for(const _0x4f6a6d in _0x58d993){if(_0x4f6a6d[_0x4654('0x2a0')](/(.*):(.*)/i)){const _0x26b72f=String(RegExp['$1']),_0x2c181e=String(RegExp['$2'])['toUpperCase']()[_0x4654('0x512')]();let _0x5b09bc,_0x2d4976,_0x13fcfe;switch(_0x2c181e){case _0x4654('0xd6'):_0x5b09bc=_0x58d993[_0x4f6a6d]!==''?Number(_0x58d993[_0x4f6a6d]):0x0;break;case'ARRAYNUM':_0x2d4976=_0x58d993[_0x4f6a6d]!==''?JSON[_0x4654('0x6c1')](_0x58d993[_0x4f6a6d]):[],_0x5b09bc=_0x2d4976[_0x4654('0x538')](_0x16c0dc=>Number(_0x16c0dc));break;case _0x4654('0x659'):_0x5b09bc=_0x58d993[_0x4f6a6d]!==''?eval(_0x58d993[_0x4f6a6d]):null;break;case _0x4654('0x486'):_0x2d4976=_0x58d993[_0x4f6a6d]!==''?JSON[_0x4654('0x6c1')](_0x58d993[_0x4f6a6d]):[],_0x5b09bc=_0x2d4976[_0x4654('0x538')](_0xa804b9=>eval(_0xa804b9));break;case'JSON':_0x5b09bc=_0x58d993[_0x4f6a6d]!==''?JSON[_0x4654('0x6c1')](_0x58d993[_0x4f6a6d]):'';break;case _0x4654('0x24'):_0x2d4976=_0x58d993[_0x4f6a6d]!==''?JSON[_0x4654('0x6c1')](_0x58d993[_0x4f6a6d]):[],_0x5b09bc=_0x2d4976[_0x4654('0x538')](_0x435c5d=>JSON[_0x4654('0x6c1')](_0x435c5d));break;case _0x4654('0x756'):_0x5b09bc=_0x58d993[_0x4f6a6d]!==''?new Function(JSON[_0x4654('0x6c1')](_0x58d993[_0x4f6a6d])):new Function(_0x4654('0x438'));break;case _0x4654('0x41f'):_0x2d4976=_0x58d993[_0x4f6a6d]!==''?JSON[_0x4654('0x6c1')](_0x58d993[_0x4f6a6d]):[],_0x5b09bc=_0x2d4976[_0x4654('0x538')](_0x41d257=>new Function(JSON['parse'](_0x41d257)));break;case'STR':_0x5b09bc=_0x58d993[_0x4f6a6d]!==''?String(_0x58d993[_0x4f6a6d]):'';break;case _0x4654('0x778'):_0x2d4976=_0x58d993[_0x4f6a6d]!==''?JSON[_0x4654('0x6c1')](_0x58d993[_0x4f6a6d]):[],_0x5b09bc=_0x2d4976['map'](_0x228aa1=>String(_0x228aa1));break;case _0x4654('0x39'):_0x13fcfe=_0x58d993[_0x4f6a6d]!==''?JSON[_0x4654('0x6c1')](_0x58d993[_0x4f6a6d]):{},_0xd0c228[_0x26b72f]={},VisuMZ[_0x4654('0x476')](_0xd0c228[_0x26b72f],_0x13fcfe);continue;case _0x4654('0x46e'):_0x2d4976=_0x58d993[_0x4f6a6d]!==''?JSON[_0x4654('0x6c1')](_0x58d993[_0x4f6a6d]):[],_0x5b09bc=_0x2d4976[_0x4654('0x538')](_0x56abaf=>VisuMZ[_0x4654('0x476')]({},JSON[_0x4654('0x6c1')](_0x56abaf)));break;default:continue;}_0xd0c228[_0x26b72f]=_0x5b09bc;}}return _0xd0c228;},(_0x3c8d73=>{const _0x4a2cc4=_0x3c8d73[_0x4654('0x18f')];for(const _0x5bf22d of dependencies){if(!Imported[_0x5bf22d]){if(_0x4654('0x652')!=='KyBYK'){function _0x5b5877(){const _0x8736dc=_0x9325f3[_0x4654('0x6c1')]('['+_0x335e34['$1']['match'](/\d+/g)+']');for(const _0x412140 of _0x8736dc){if(!_0x2064ac['value'](_0x412140))return!![];}return![];}}else{alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x4a2cc4,_0x5bf22d)),SceneManager[_0x4654('0x4a')]();break;}}}const _0x309ed6=_0x3c8d73['description'];if(_0x309ed6[_0x4654('0x2a0')](/\[Version[ ](.*?)\]/i)){if(_0x4654('0x298')!==_0x4654('0x2dc')){const _0x468c9c=Number(RegExp['$1']);_0x468c9c!==VisuMZ[label][_0x4654('0x2e0')]&&(alert(_0x4654('0x319')[_0x4654('0x31f')](_0x4a2cc4,_0x468c9c)),SceneManager[_0x4654('0x4a')]());}else{function _0x2f16c3(){this[_0x4654('0x91')]={},_0x3f9928[_0x4654('0x1f')]['Game_BattlerBase_refresh']['call'](this);}}}if(_0x309ed6[_0x4654('0x2a0')](/\[Tier[ ](\d+)\]/i)){const _0x3e60d9=Number(RegExp['$1']);if(_0x3e60d9<tier){if(_0x4654('0x418')!==_0x4654('0x418')){function _0x36d1e8(){_0x265f82=_0x23b046(_0x2a27b9['$1']),_0x2b8be2=_0x2fb27e(_0x1fb334['$2']);}}else alert(_0x4654('0x43d')[_0x4654('0x31f')](_0x4a2cc4,_0x3e60d9,tier)),SceneManager[_0x4654('0x4a')]();}else tier=Math[_0x4654('0x6f7')](_0x3e60d9,tier);}VisuMZ['ConvertParams'](VisuMZ[label][_0x4654('0x1f3')],_0x3c8d73[_0x4654('0x563')]);})(pluginData),VisuMZ[_0x4654('0x667')]=function(_0x54f615){let _0x528070=[];for(const _0x167b65 of _0x54f615){_0x528070=_0x528070[_0x4654('0x645')](VisuMZ['ConvertActionSequenceTarget'](_0x167b65));}return _0x528070['filter'](_0x2ec861=>_0x2ec861);},VisuMZ['ConvertActionSequenceTarget']=function(_0x5c8e35){const _0x1ea7f6=BattleManager[_0x4654('0x49c')](),_0x579666=BattleManager[_0x4654('0x672')],_0x148972=BattleManager[_0x4654('0xa3')],_0x2cfdc3=BattleManager[_0x4654('0x12e')]?BattleManager[_0x4654('0x12e')][_0x4654('0x2db')](0x0):_0x1ea7f6;_0x5c8e35=_0x5c8e35['toLowerCase']()[_0x4654('0x512')]();if(_0x5c8e35==='user'){if(_0x4654('0x630')===_0x4654('0x265')){function _0x2933b3(){this[_0x4654('0x221')][_0x4654('0x128')](_0xad15a),this['refresh'](),this[_0x4654('0x223')]();}}else return[_0x579666];}else{if(_0x5c8e35===_0x4654('0x69a'))return[_0x148972];else{if(_0x5c8e35===_0x4654('0x13b')){if(_0x4654('0x79')!==_0x4654('0x79')){function _0x422d2f(){_0x2ab07a['BattleCore']['Window_BattleLog_performReflection'][_0x4654('0x5a5')](this,_0x40111a),this[_0x4654('0x223')]();}}else{if(_0x148972){const _0x3b1259=_0x2cfdc3[_0x4654('0x399')](_0x148972);return _0x3b1259>=0x0?[_0x2cfdc3[_0x3b1259-0x1]||_0x148972]:[_0x148972];}}}else{if(_0x5c8e35===_0x4654('0x3a8')){if('lTMMV'!==_0x4654('0x5f4')){function _0x5da878(){_0x4dc7d8=_0x27632b[_0x4654('0x26d')](_0x4f24ce),_0x13e44c[_0x4654('0x1f')][_0x4654('0x646')]['call'](this,_0x38c4ce,_0xc28aa,_0x4521f5),_0x22dc29[_0x4654('0x95')]&&this[_0x4654('0x315')](),this[_0x4654('0x50e')](),this[_0x4654('0x162')](),_0x50c346[_0x4654('0x95')]&&this[_0x4654('0x63d')]();}}else{if(_0x148972){if(_0x4654('0x612')===_0x4654('0x612')){const _0x4060e3=_0x2cfdc3[_0x4654('0x399')](_0x148972);return _0x4060e3>=0x0?[_0x2cfdc3[_0x4060e3+0x1]||_0x148972]:[_0x148972];}else{function _0x2c8983(){_0x4c3b0e[_0x4654('0x70f')]();}}}}}else{if(_0x5c8e35===_0x4654('0x637'))return _0x2cfdc3;else{if(_0x5c8e35===_0x4654('0x628'))return[_0x579666][_0x4654('0x645')](_0x2cfdc3);else{if(_0x5c8e35==='not\x20focus')return _0x1ea7f6[_0x4654('0x4c4')](_0x4f252f=>_0x4f252f!==_0x579666&&!_0x2cfdc3[_0x4654('0x386')](_0x4f252f));}}}}}}if(_0x579666){if(_0x4654('0x13')!==_0x4654('0x13')){function _0x46b992(){_0x281cc6['prototype'][_0x4654('0x557')]['call'](this,_0x24dda1,_0x3fa23d,_0x465d56,_0x18314e,_0xcbc5fe);}}else{if(_0x5c8e35===_0x4654('0x4b4'))return _0x579666[_0x4654('0x6e')]()[_0x4654('0x5e1')]();else{if(_0x5c8e35===_0x4654('0xf0')){if('kDBXl'!==_0x4654('0x471'))return _0x579666[_0x4654('0x6e')]()[_0x4654('0x5e1')]()[_0x4654('0x4c4')](_0x18dc39=>_0x18dc39!==_0x579666);else{function _0xac1c73(){return this[_0x4654('0x468')][_0x4654('0x2c3')]();}}}else{if(_0x5c8e35==='alive\x20friends\x20not\x20target')return _0x579666['friendsUnit']()[_0x4654('0x5e1')]()[_0x4654('0x4c4')](_0x6e2681=>_0x6e2681!==_0x148972);else{if(_0x5c8e35===_0x4654('0x359')){if(_0x4654('0x6fb')!==_0x4654('0x583'))return _0x579666['friendsUnit']()[_0x4654('0x330')]();else{function _0x1354a7(){if(this[_0x4654('0x1de')]!==_0x50c743)return![];if(!_0x5eba1e['isSceneBattle']())return![];return _0x276bb3[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x44f')][_0x4654('0x483')];}}}else{if(_0x5c8e35[_0x4654('0x2a0')](/FRIEND INDEX (\d+)/i)){if(_0x4654('0x12f')===_0x4654('0x3bc')){function _0x317786(){_0x22279d[_0x4654('0x1f')][_0x4654('0x75a')][_0x4654('0x5a5')](this),this['cancelTargetSelectionVisibility']();}}else{const _0x26fd27=Number(RegExp['$1']);return[_0x579666[_0x4654('0x6e')]()[_0x4654('0x552')]()[_0x26fd27]];}}}}}}if(_0x5c8e35===_0x4654('0x732'))return _0x579666[_0x4654('0x13d')]()[_0x4654('0x5e1')]();else{if(_0x5c8e35===_0x4654('0x1b3'))return _0x579666[_0x4654('0x13d')]()[_0x4654('0x5e1')]()[_0x4654('0x4c4')](_0x12cda2=>_0x12cda2!==_0x148972);else{if(_0x5c8e35===_0x4654('0x44b')){if(_0x4654('0x25b')!==_0x4654('0x25b')){function _0x3e7646(){_0x8d4e1d=_0x27bec8[_0x4654('0x46b')]/0x2,_0x5b28b1=_0x1c7ccf[_0x4654('0x37f')]/0x2;}}else return _0x579666[_0x4654('0x13d')]()[_0x4654('0x330')]();}else{if(_0x5c8e35[_0x4654('0x2a0')](/OPPONENT INDEX (\d+)/i)){const _0x3721c6=Number(RegExp['$1']);return[_0x579666[_0x4654('0x13d')]()[_0x4654('0x552')]()[_0x3721c6]];}}}}}}if(_0x5c8e35===_0x4654('0x2cd'))return $gameParty[_0x4654('0x5e1')]();else{if(_0x5c8e35===_0x4654('0x6dc'))return $gameParty['aliveMembers']()[_0x4654('0x4c4')](_0x50c016=>_0x50c016!==_0x579666);else{if(_0x5c8e35===_0x4654('0x2b1')){if('ueUBL'===_0x4654('0x4fb'))return $gameParty[_0x4654('0x5e1')]()['filter'](_0x30a126=>_0x30a126!==_0x148972);else{function _0x7355a1(){this['requestMotion'](_0x4654('0x2c1'));}}}else{if(_0x5c8e35==='dead\x20actors')return $gameParty[_0x4654('0x330')]();else{if(_0x5c8e35[_0x4654('0x2a0')](/ACTOR INDEX (\d+)/i)){if(_0x4654('0x263')===_0x4654('0x385')){function _0x3a28d3(){_0x465541[_0x4654('0x2d6')](_0x1f0462),_0x4d338b[_0x4654('0x2d6')](_0x49488d);}}else{const _0x4693ee=Number(RegExp['$1']);return[$gameParty[_0x4654('0x552')]()[_0x4693ee]];}}else{if(_0x5c8e35[_0x4654('0x2a0')](/ACTOR ID (\d+)/i)){if('kOuoD'===_0x4654('0x7')){function _0x588295(){_0x22bf0d[_0x4654('0x8d')][_0x4654('0x85')][_0x4654('0x5a5')](this,_0x410c49);}}else{const _0x4f3dd8=Number(RegExp['$1']);return[$gameActors[_0x4654('0x30c')](_0x4f3dd8)];}}}}}}}if(_0x5c8e35===_0x4654('0x714'))return $gameTroop[_0x4654('0x5e1')]();else{if(_0x5c8e35==='alive\x20enemies\x20not\x20user')return $gameTroop['aliveMembers']()['filter'](_0x1140d7=>_0x1140d7!==_0x579666);else{if(_0x5c8e35===_0x4654('0x706'))return $gameTroop[_0x4654('0x5e1')]()[_0x4654('0x4c4')](_0x5a795b=>_0x5a795b!==_0x148972);else{if(_0x5c8e35==='dead\x20enemies')return $gameTroop['deadMembers']();else{if(_0x5c8e35[_0x4654('0x2a0')](/ENEMY INDEX (\d+)/i)){const _0x55817a=Number(RegExp['$1']);return[$gameTroop['members']()[_0x55817a]];}else{if(_0x5c8e35[_0x4654('0x2a0')](/ENEMY ID (\d+)/i)){const _0x22d401=Number(RegExp['$1']);return $gameTroop[_0x4654('0x5e1')]()[_0x4654('0x4c4')](_0x3da15e=>_0x3da15e[_0x4654('0x89')]()===_0x22d401);}}}}}}if(_0x5c8e35===_0x4654('0x57f'))return _0x1ea7f6[_0x4654('0x4c4')](_0x25ef5d=>_0x25ef5d['isAlive']());else{if(_0x5c8e35===_0x4654('0x37b'))return _0x1ea7f6[_0x4654('0x4c4')](_0x490065=>_0x490065[_0x4654('0x36f')]()&&_0x490065!==_0x579666);else{if(_0x5c8e35===_0x4654('0x3e8')){if(_0x4654('0x6b0')!=='AxtuH'){function _0x4a3db8(){this[_0x4654('0x3d2')][_0x4654('0x67c')]=_0x1d332b[_0x4654('0x37c')];return;}}else return _0x1ea7f6[_0x4654('0x4c4')](_0x2bbc6a=>_0x2bbc6a[_0x4654('0x36f')]()&&_0x2bbc6a!==_0x148972);}else{if(_0x5c8e35===_0x4654('0x55f'))return _0x1ea7f6['filter'](_0x5e2e4c=>_0x5e2e4c['isDead']());}}}return[];},PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],_0x4654('0x48b'),_0x4b9920=>{if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x4654('0x476')](_0x4b9920,_0x4b9920);const _0x3f0247=$gameTemp[_0x4654('0x779')](),_0x22716f=BattleManager[_0x4654('0x149')],_0x3bd65b=BattleManager[_0x4654('0x672')],_0x289b16=BattleManager[_0x4654('0x12e')][_0x4654('0x2db')](0x0),_0x25fce3=BattleManager[_0x4654('0x2f')];if(!_0x3f0247||!_0x22716f||!_0x3bd65b)return;if(!_0x22716f[_0x4654('0x1f7')]())return;if(_0x4b9920[_0x4654('0xce')])_0x25fce3[_0x4654('0x307')](_0x3bd65b,_0x22716f[_0x4654('0x1f7')]());if(_0x4b9920[_0x4654('0x351')])_0x25fce3[_0x4654('0x128')](_0x4654('0x2a2'),_0x3bd65b,_0x289b16,!![]);if(_0x4b9920[_0x4654('0x730')])_0x25fce3['push'](_0x4654('0x616'),_0x3bd65b,_0x22716f);if(_0x4b9920[_0x4654('0x50a')])_0x25fce3[_0x4654('0x128')]('waitForMovement');if(_0x4b9920['CastAnimation'])_0x25fce3[_0x4654('0x128')](_0x4654('0x24d'),_0x3bd65b,_0x22716f);if(_0x4b9920['WaitForAnimation'])_0x25fce3[_0x4654('0x128')](_0x4654('0x5de'));_0x3f0247[_0x4654('0xbd')](_0x4654('0x39b'));}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],'ActSeq_Set_WholeActionSet',_0x4cb405=>{if(!SceneManager[_0x4654('0x443')]())return;VisuMZ[_0x4654('0x476')](_0x4cb405,_0x4cb405);const _0x2276bf=$gameTemp[_0x4654('0x779')](),_0x3aee15=BattleManager[_0x4654('0x149')],_0x2ab60c=BattleManager[_0x4654('0x672')],_0x3eb46c=BattleManager[_0x4654('0x12e')][_0x4654('0x2db')](0x0),_0x2d8599=BattleManager[_0x4654('0x2f')];if(!_0x2276bf||!_0x3aee15||!_0x2ab60c)return;if(!_0x3aee15[_0x4654('0x1f7')]())return;if(_0x4cb405[_0x4654('0x6a5')])_0x2d8599[_0x4654('0x128')](_0x4654('0x38f'),_0x2ab60c,_0x3aee15);if(_0x4cb405[_0x4654('0x67b')]>0x0)_0x2d8599[_0x4654('0x128')](_0x4654('0x279'),_0x4cb405['WaitCount']);if(_0x4cb405[_0x4654('0x5ba')])_0x2d8599[_0x4654('0x128')](_0x4654('0x72a'),_0x2ab60c,_0x3eb46c,_0x3aee15[_0x4654('0x1f7')]()[_0x4654('0x20f')]);if(_0x4cb405['WaitForAnimation'])_0x2d8599[_0x4654('0x128')](_0x4654('0x5de'));for(const _0x3f47f6 of _0x3eb46c){if(!_0x3f47f6)continue;if(_0x4cb405[_0x4654('0x35c')])_0x2d8599['push']('actionEffect',_0x2ab60c,_0x3f47f6);}if(_0x4cb405[_0x4654('0x351')])_0x2d8599['push'](_0x4654('0x2a2'),_0x2ab60c,_0x3eb46c,![]);_0x2276bf[_0x4654('0xbd')](_0x4654('0x39b'));}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],_0x4654('0x5a4'),_0x503e0f=>{if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x4654('0x476')](_0x503e0f,_0x503e0f);const _0x2f382f=$gameTemp[_0x4654('0x779')](),_0x2001cc=BattleManager[_0x4654('0x149')],_0x5355a4=BattleManager['_subject'],_0x329b06=BattleManager[_0x4654('0x12e')][_0x4654('0x2db')](0x0),_0x5c8852=BattleManager[_0x4654('0x2f')];if(!_0x2f382f||!_0x2001cc||!_0x5355a4)return;if(!_0x2001cc[_0x4654('0x1f7')]())return;for(const _0x5516e2 of _0x329b06){if(_0x4654('0x42e')===_0x4654('0x4db')){function _0x4c6c60(){if(this[_0x4654('0x209')]())this['processBattleCoreJS'](_0x4654('0x120'));_0x2a9c08[_0x4654('0x1f')][_0x4654('0x367')]['call'](this);if(this['isTurnBased']())this[_0x4654('0x2d6')](_0x4654('0x50c'));}}else{if(!_0x5516e2)continue;if(_0x503e0f[_0x4654('0x6a5')])_0x5c8852[_0x4654('0x128')](_0x4654('0x38f'),_0x5355a4,_0x2001cc);if(_0x503e0f[_0x4654('0x6ca')]>0x0)_0x5c8852[_0x4654('0x128')](_0x4654('0x279'),_0x503e0f[_0x4654('0x6ca')]);if(_0x503e0f[_0x4654('0x5ba')])_0x5c8852[_0x4654('0x128')]('showAnimation',_0x5355a4,[_0x5516e2],_0x2001cc[_0x4654('0x1f7')]()[_0x4654('0x20f')]);if(_0x503e0f[_0x4654('0x130')]>0x0)_0x5c8852[_0x4654('0x128')]('waitCount',_0x503e0f[_0x4654('0x130')]);if(_0x503e0f[_0x4654('0x35c')])_0x5c8852[_0x4654('0x128')]('actionEffect',_0x5355a4,_0x5516e2);}}if(_0x503e0f['ApplyImmortal'])_0x5c8852['push'](_0x4654('0x2a2'),_0x5355a4,_0x329b06,![]);_0x2f382f['setWaitMode']('battlelog');}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],_0x4654('0x6a9'),_0x2e8310=>{if(!SceneManager[_0x4654('0x443')]())return;VisuMZ[_0x4654('0x476')](_0x2e8310,_0x2e8310);const _0x4ed463=$gameTemp[_0x4654('0x779')](),_0x2bf7fe=BattleManager['_action'],_0x5d6941=BattleManager['_subject'],_0x6912f=BattleManager[_0x4654('0x12e')][_0x4654('0x2db')](0x0),_0x375cea=BattleManager[_0x4654('0x2f')];if(!_0x4ed463||!_0x2bf7fe||!_0x5d6941)return;if(!_0x2bf7fe['item']())return;if(_0x2e8310[_0x4654('0x22d')])_0x375cea[_0x4654('0x128')](_0x4654('0x2e7'));if(_0x2e8310[_0x4654('0x373')])_0x375cea[_0x4654('0x128')]('waitForEffect');if(_0x2e8310[_0x4654('0x68d')])_0x375cea[_0x4654('0x128')](_0x4654('0x2a9'));if(_0x2e8310[_0x4654('0x106')])_0x375cea[_0x4654('0x128')](_0x4654('0x4be'),_0x5d6941);if(_0x2e8310['WaitForMovement'])_0x375cea['push'](_0x4654('0x5e4'));_0x4ed463[_0x4654('0xbd')](_0x4654('0x39b'));}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],_0x4654('0x547'),_0x54243c=>{if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x4654('0x476')](_0x54243c,_0x54243c);const _0x126f03=$gameTemp[_0x4654('0x779')](),_0x4044c5=BattleManager[_0x4654('0x149')],_0x2a7f92=BattleManager[_0x4654('0x672')],_0x5bf9b1=VisuMZ[_0x4654('0x667')](_0x54243c[_0x4654('0x5fb')]),_0x14be63=_0x54243c[_0x4654('0xff')],_0x16a4da=BattleManager[_0x4654('0x2f')];if(!_0x126f03||!_0x4044c5||!_0x2a7f92)return;if(!_0x4044c5[_0x4654('0x1f7')]())return;let _0x131837=_0x4044c5[_0x4654('0x1f7')]()[_0x4654('0x20f')];if(_0x131837<0x0)_0x131837=_0x2a7f92[_0x4654('0x5b3')]();$gameTemp[_0x4654('0xcb')](_0x5bf9b1,_0x131837,_0x14be63),_0x54243c[_0x4654('0x27d')]&&_0x126f03[_0x4654('0xbd')]('battleAnimation');}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],'ActSeq_Animation_AttackAnimation',_0x59d98a=>{if(!SceneManager[_0x4654('0x443')]())return;VisuMZ[_0x4654('0x476')](_0x59d98a,_0x59d98a);const _0x149d4e=$gameTemp[_0x4654('0x779')](),_0x1ed308=BattleManager[_0x4654('0x672')],_0x51acb3=VisuMZ[_0x4654('0x667')](_0x59d98a[_0x4654('0x5fb')]),_0x404d3a=_0x59d98a['Mirror'],_0x4bc8bd=BattleManager[_0x4654('0x2f')];if(!_0x149d4e||!_0x1ed308)return;const _0x328ad4=_0x1ed308[_0x4654('0x5b3')]();$gameTemp[_0x4654('0xcb')](_0x51acb3,_0x328ad4,_0x404d3a);if(_0x59d98a[_0x4654('0x27d')]){if(_0x4654('0x419')===_0x4654('0x26c')){function _0x33b838(){const _0x16e2e2=this[_0x4654('0x5e1')]();return _0x16e2e2[_0x28fdc9[_0x4654('0x5c3')](_0x16e2e2[_0x4654('0x0')])];}}else _0x149d4e[_0x4654('0xbd')](_0x4654('0x290'));}}),PluginManager[_0x4654('0x5b8')](pluginData['name'],_0x4654('0x493'),_0x50ab3f=>{if(!SceneManager[_0x4654('0x443')]())return;VisuMZ['ConvertParams'](_0x50ab3f,_0x50ab3f);const _0x1c63f2=$gameTemp[_0x4654('0x779')](),_0x455935=BattleManager[_0x4654('0x149')],_0x1bbb27=_0x50ab3f[_0x4654('0xff')],_0x44b859=VisuMZ['CreateActionSequenceTargets'](_0x50ab3f['Targets']);if(!_0x1c63f2||!_0x455935)return;if(!_0x455935[_0x4654('0x1f7')]())return;for(const _0xb55597 of _0x44b859){if(!_0xb55597)continue;_0xb55597[_0x4654('0x24d')](_0x455935,_0x1bbb27);}if(_0x50ab3f[_0x4654('0x27d')])_0x1c63f2[_0x4654('0xbd')](_0x4654('0x290'));}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],'ActSeq_Animation_ChangeBattlePortrait',_0x2401c4=>{VisuMZ[_0x4654('0x476')](_0x2401c4,_0x2401c4);const _0x20d913=$gameTemp[_0x4654('0x779')](),_0x24bc48=VisuMZ[_0x4654('0x667')](_0x2401c4['Targets']),_0x5246ae=_0x2401c4[_0x4654('0x4ac')];if(!_0x5246ae)return;for(const _0x425f11 of _0x24bc48){if(_0x4654('0x461')!=='gDamC'){if(!_0x425f11)continue;if(!_0x425f11[_0x4654('0x5b5')]())continue;_0x425f11[_0x4654('0x2e6')](_0x5246ae);}else{function _0x110704(){_0x528e57['prototype'][_0x4654('0x40a')][_0x4654('0x5a5')](this);}}}}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],_0x4654('0x3ee'),_0x3d456f=>{if(!SceneManager[_0x4654('0x443')]())return;VisuMZ[_0x4654('0x476')](_0x3d456f,_0x3d456f);const _0x4d2395=$gameTemp[_0x4654('0x779')](),_0x32d2d9=VisuMZ[_0x4654('0x667')](_0x3d456f[_0x4654('0x5fb')]),_0x31d07a=_0x3d456f[_0x4654('0x56d')],_0x360d88=_0x3d456f[_0x4654('0xff')];if(!_0x4d2395)return;$gameTemp[_0x4654('0xcb')](_0x32d2d9,_0x31d07a,_0x360d88);if(_0x3d456f[_0x4654('0x27d')])_0x4d2395[_0x4654('0xbd')](_0x4654('0x290'));}),PluginManager['registerCommand'](pluginData['name'],_0x4654('0x548'),_0x500104=>{if(!SceneManager['isSceneBattle']())return;const _0xc2aeb0=$gameTemp[_0x4654('0x779')]();if(!_0xc2aeb0)return;_0xc2aeb0[_0x4654('0xbd')]('battleAnimation');}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],'ActSeq_BattleLog_AddText',_0x47ab60=>{if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x4654('0x476')](_0x47ab60,_0x47ab60);const _0x23b9f7=BattleManager[_0x4654('0x2f')];_0x23b9f7[_0x4654('0x261')](_0x47ab60[_0x4654('0x656')]);}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],_0x4654('0x55b'),_0x1140da=>{if(!SceneManager[_0x4654('0x443')]())return;const _0x19d691=BattleManager[_0x4654('0x2f')];_0x19d691[_0x4654('0x2a9')]();}),PluginManager[_0x4654('0x5b8')](pluginData['name'],_0x4654('0x2e3'),_0xcb9a44=>{if(!SceneManager[_0x4654('0x443')]())return;const _0x17dacc=$gameTemp[_0x4654('0x779')](),_0x47dafc=BattleManager[_0x4654('0x149')],_0x4fe054=BattleManager[_0x4654('0x672')],_0x2155d5=BattleManager[_0x4654('0x2f')];if(!_0x17dacc||!_0x47dafc||!_0x4fe054)return;if(!_0x47dafc[_0x4654('0x1f7')]())return;_0x2155d5[_0x4654('0x307')](_0x4fe054,_0x47dafc[_0x4654('0x1f7')]()),_0x17dacc[_0x4654('0xbd')]('battlelog');}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],_0x4654('0x1fb'),_0x47a98a=>{if(!SceneManager['isSceneBattle']())return;const _0x5cc4f0=BattleManager[_0x4654('0x2f')];_0x5cc4f0[_0x4654('0x4b0')]();}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],'ActSeq_BattleLog_PushBaseLine',_0x4aaece=>{if(!SceneManager[_0x4654('0x443')]())return;const _0x40020b=BattleManager[_0x4654('0x2f')];_0x40020b['pushBaseLine']();}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],_0x4654('0x335'),_0x3d25f1=>{if(!SceneManager['isSceneBattle']())return;const _0x5a89a4=BattleManager[_0x4654('0x2f')];_0x5a89a4[_0x4654('0x524')]();}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],'ActSeq_BattleLog_UI',_0x479731=>{if(!SceneManager[_0x4654('0x443')]())return;VisuMZ[_0x4654('0x476')](_0x479731,_0x479731),SceneManager[_0x4654('0xda')]['setVisibleUI'](_0x479731['ShowHide']);}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],_0x4654('0x6cb'),_0xd85c90=>{if(!SceneManager[_0x4654('0x443')]())return;const _0x2167c2=$gameTemp[_0x4654('0x779')]();_0x2167c2['setWaitMode'](_0x4654('0x39b'));}),PluginManager[_0x4654('0x5b8')](pluginData['name'],_0x4654('0x114'),_0x11e70c=>{if(!SceneManager[_0x4654('0x443')]())return;const _0x147fbc=$gameTemp[_0x4654('0x779')](),_0x2c2dd0=BattleManager[_0x4654('0x2f')];_0x2c2dd0['waitForNewLine'](),_0x147fbc[_0x4654('0xbd')](_0x4654('0x39b'));}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],_0x4654('0x323'),_0xb4a5cf=>{if(!SceneManager[_0x4654('0x443')]())return;if(!Imported[_0x4654('0x210')])return;VisuMZ['ConvertParams'](_0xb4a5cf,_0xb4a5cf);const _0x32f6a9=$gameScreen[_0x4654('0x2d3')]();_0x32f6a9[_0x4654('0x46d')]=_0xb4a5cf[_0x4654('0x41d')];}),PluginManager[_0x4654('0x5b8')](pluginData['name'],_0x4654('0x31b'),_0x294e5f=>{if(!SceneManager[_0x4654('0x443')]())return;if(!Imported[_0x4654('0x210')])return;VisuMZ['ConvertParams'](_0x294e5f,_0x294e5f);const _0xa060dd=$gameTemp[_0x4654('0x779')](),_0x57be0a=_0x294e5f[_0x4654('0x607')];$gameScreen[_0x4654('0x5e5')](_0x294e5f['FocusX'],_0x294e5f[_0x4654('0x4d7')],_0x294e5f[_0x4654('0x44a')],_0x294e5f['EasingType']);if(_0x57be0a)_0xa060dd[_0x4654('0xbd')](_0x4654('0x72'));}),PluginManager[_0x4654('0x5b8')](pluginData['name'],_0x4654('0x8f'),_0x3034ca=>{if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x4654('0x210')])return;VisuMZ[_0x4654('0x476')](_0x3034ca,_0x3034ca);const _0x21bbe7=$gameTemp['getLastPluginCommandInterpreter'](),_0x4ca369=VisuMZ['CreateActionSequenceTargets'](_0x3034ca['Targets']),_0x43a08f=_0x3034ca[_0x4654('0x607')];$gameScreen[_0x4654('0x24b')](_0x4ca369,_0x3034ca[_0x4654('0x44a')],_0x3034ca[_0x4654('0x482')]);if(_0x43a08f)_0x21bbe7[_0x4654('0xbd')](_0x4654('0x72'));}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],'ActSeq_Camera_Offset',_0x26696d=>{if(!SceneManager[_0x4654('0x443')]())return;if(!Imported['VisuMZ_3_ActSeqCamera'])return;VisuMZ[_0x4654('0x476')](_0x26696d,_0x26696d);const _0x4e5f0f=$gameTemp['getLastPluginCommandInterpreter'](),_0x34f5bf=_0x26696d['WaitForCamera'];$gameScreen[_0x4654('0x78b')](_0x26696d['OffsetX'],_0x26696d[_0x4654('0x65e')],_0x26696d[_0x4654('0x44a')],_0x26696d[_0x4654('0x482')]);if(_0x34f5bf)_0x4e5f0f[_0x4654('0xbd')](_0x4654('0x72'));}),PluginManager[_0x4654('0x5b8')](pluginData['name'],_0x4654('0x650'),_0xe86d17=>{if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x4654('0x210')])return;VisuMZ['ConvertParams'](_0xe86d17,_0xe86d17);const _0x440863=$gameTemp[_0x4654('0x779')](),_0x27f7ed=_0xe86d17[_0x4654('0x269')],_0x25325a=_0xe86d17['ResetOffset'],_0x27b900=_0xe86d17['WaitForCamera'];if(_0x27f7ed){const _0x596d26=Math[_0x4654('0x31a')](Graphics[_0x4654('0x564')]/0x2),_0x813282=Math['round'](Graphics[_0x4654('0x2e8')]/0x2);$gameScreen[_0x4654('0x5e5')](_0x596d26,_0x813282,_0xe86d17[_0x4654('0x44a')],_0xe86d17[_0x4654('0x482')]);}if(_0x25325a){if(_0x4654('0x4de')!==_0x4654('0x4de')){function _0x213691(){return this[_0x4654('0x199')]()[_0x4654('0x499')];}}else $gameScreen['setBattleCameraOffset'](0x0,0x0,_0xe86d17[_0x4654('0x44a')],_0xe86d17[_0x4654('0x482')]);}if(_0x27b900)_0x440863[_0x4654('0xbd')](_0x4654('0x72'));}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],'ActSeq_Camera_WaitForCamera',_0x39d82b=>{if(!SceneManager[_0x4654('0x443')]())return;if(!Imported[_0x4654('0x210')])return;const _0x3c8187=$gameTemp[_0x4654('0x779')]();if(!_0x3c8187)return;_0x3c8187[_0x4654('0xbd')]('battleCamera');}),PluginManager[_0x4654('0x5b8')](pluginData['name'],_0x4654('0x6de'),_0x188566=>{if(!SceneManager[_0x4654('0x443')]())return;if(!Imported[_0x4654('0x78e')])return;VisuMZ[_0x4654('0x476')](_0x188566,_0x188566);const _0x58830c=VisuMZ['CreateActionSequenceTargets'](_0x188566['Targets']),_0x590cd7=_0x188566['MotionAni'][_0x4654('0x134')]()['trim']();for(const _0x136863 of _0x58830c){if(!_0x136863)continue;_0x136863[_0x4654('0x56')](_0x590cd7);}}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],'ActSeq_DB_DragonbonesTimeScale',_0x3097e6=>{if(!SceneManager['isSceneBattle']())return;if(!Imported['VisuMZ_2_DragonbonesUnion'])return;VisuMZ['ConvertParams'](_0x3097e6,_0x3097e6);const _0x319647=VisuMZ[_0x4654('0x667')](_0x3097e6[_0x4654('0x5fb')]),_0x4bef0c=_0x3097e6[_0x4654('0xfc')];for(const _0x2de4c3 of _0x319647){if(!_0x2de4c3)continue;_0x2de4c3['dragonbonesData']()['timeScale']=_0x4bef0c;}}),PluginManager[_0x4654('0x5b8')](pluginData['name'],_0x4654('0x349'),_0x3d3b1a=>{if(!SceneManager[_0x4654('0x443')]())return;if(!Imported[_0x4654('0x95')])return;VisuMZ['ConvertParams'](_0x3d3b1a,_0x3d3b1a);const _0x3a432b=BattleManager['_action'],_0x2a599b=_0x3d3b1a['Elements'];if(!_0x3a432b)return;_0x3a432b[_0x4654('0xc6')]=_0x2a599b;}),PluginManager['registerCommand'](pluginData['name'],_0x4654('0xeb'),_0x534797=>{if(!SceneManager[_0x4654('0x443')]())return;if(!Imported[_0x4654('0x95')])return;const _0x45e547=BattleManager[_0x4654('0x149')];if(!_0x45e547)return;_0x45e547[_0x4654('0x4cd')]();}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],_0x4654('0x392'),_0x1b22e6=>{if(!SceneManager[_0x4654('0x443')]())return;if(!Imported[_0x4654('0x95')])return;VisuMZ['ConvertParams'](_0x1b22e6,_0x1b22e6);const _0x28fe92=BattleManager[_0x4654('0x149')],_0x144384=_0x1b22e6[_0x4654('0x5ff')];if(!_0x28fe92)return;_0x28fe92[_0x4654('0x5')]=_0x144384;}),PluginManager[_0x4654('0x5b8')](pluginData['name'],_0x4654('0x4a2'),_0x2ccf14=>{if(!SceneManager[_0x4654('0x443')]())return;if(!Imported[_0x4654('0x95')])return;const _0x5e0769=BattleManager[_0x4654('0x149')];if(!_0x5e0769)return;_0x5e0769[_0x4654('0x698')]=!![];}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],'ActSeq_Mechanics_ActionEffect',_0x4ec8e5=>{if(!SceneManager[_0x4654('0x443')]())return;VisuMZ[_0x4654('0x476')](_0x4ec8e5,_0x4ec8e5);const _0x1e3bc9=$gameTemp['getLastPluginCommandInterpreter'](),_0x5438e0=BattleManager[_0x4654('0x149')],_0x29e7ba=BattleManager['_subject'],_0x7e6413=BattleManager['_logWindow'];if(!_0x1e3bc9||!_0x5438e0||!_0x29e7ba)return;if(!_0x5438e0[_0x4654('0x1f7')]())return;const _0x3ef50f=VisuMZ[_0x4654('0x667')](_0x4ec8e5[_0x4654('0x5fb')]);for(const _0x10eefb of _0x3ef50f){if(!_0x10eefb)continue;_0x7e6413[_0x4654('0x128')](_0x4654('0x42a'),_0x29e7ba,_0x10eefb);}_0x1e3bc9['setWaitMode']('battlelog');}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],_0x4654('0x306'),_0x506c1b=>{if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x4654('0x476')](_0x506c1b,_0x506c1b);const _0x209c03=[_0x4654('0x14b'),_0x4654('0x331'),_0x4654('0x33e'),_0x4654('0x619'),'MAT',_0x4654('0x216'),_0x4654('0xfe'),_0x4654('0x60c')],_0x25870b=_0x506c1b[_0x4654('0xfd')],_0x5494ca=_0x506c1b[_0x4654('0x21b')],_0xce807a=_0x506c1b[_0x4654('0x1ce')],_0xa295c0=VisuMZ[_0x4654('0x667')](_0x506c1b['Targets']);for(const _0x28de66 of _0xa295c0){if('kueJq'!==_0x4654('0x239')){if(!_0x28de66)continue;for(const _0x54654c of _0x25870b){if(_0x4654('0x5ca')===_0x4654('0x5ca')){const _0x473c35=_0x209c03[_0x4654('0x399')](_0x54654c[_0x4654('0x29d')]()['trim']());if(_0x473c35>=0x0&&_0x473c35<=0x7){if(_0x4654('0x123')===_0x4654('0x63a')){function _0x2af559(){const _0x28a49c=_0x1c27d3[_0x4654('0x1f7')]();this['push'](_0x4654('0x2e7')),this['push'](_0x4654('0x74c')),this[_0x4654('0x128')](_0x4654('0x2a9')),this[_0x4654('0x128')]('performActionEnd',_0x4e7f87),this[_0x4654('0x128')](_0x4654('0x5e4'));}}else _0x28de66[_0x4654('0x246')](_0x473c35,_0xce807a);}}else{function _0x5afa04(){this['setWaitMode'](_0x4654('0x13f'));}}}for(const _0x1a13a5 of _0x5494ca){if(_0x4654('0x198')===_0x4654('0x198')){const _0x888831=_0x209c03[_0x4654('0x399')](_0x1a13a5['toUpperCase']()[_0x4654('0x512')]());_0x888831>=0x0&&_0x888831<=0x7&&_0x28de66['addDebuff'](_0x888831,_0xce807a);}else{function _0x2cd558(){if(!_0x5a5a4c[_0x4654('0x443')]())return;_0x47f1e4[_0x4654('0x476')](_0x3ee58a,_0x166889);const _0x3c82c5=_0x321d95[_0x4654('0x779')](),_0x49d7f9=_0x2fb93c[_0x4654('0x149')],_0x1fbb7e=_0x2f06aa[_0x4654('0x672')],_0x16e9fd=_0x473ee4[_0x4654('0x12e')][_0x4654('0x2db')](0x0),_0x55aaca=_0x185484[_0x4654('0x2f')];if(!_0x3c82c5||!_0x49d7f9||!_0x1fbb7e)return;if(!_0x49d7f9[_0x4654('0x1f7')]())return;if(_0x22d3d7[_0x4654('0xce')])_0x55aaca['displayAction'](_0x1fbb7e,_0x49d7f9[_0x4654('0x1f7')]());if(_0x5c4a34[_0x4654('0x351')])_0x55aaca[_0x4654('0x128')]('applyImmortal',_0x1fbb7e,_0x16e9fd,!![]);if(_0x5101cf[_0x4654('0x730')])_0x55aaca[_0x4654('0x128')](_0x4654('0x616'),_0x1fbb7e,_0x49d7f9);if(_0x55ad76[_0x4654('0x50a')])_0x55aaca[_0x4654('0x128')]('waitForMovement');if(_0xc8b767[_0x4654('0x25a')])_0x55aaca[_0x4654('0x128')](_0x4654('0x24d'),_0x1fbb7e,_0x49d7f9);if(_0x5a71d2[_0x4654('0x27d')])_0x55aaca[_0x4654('0x128')](_0x4654('0x5de'));_0x3c82c5[_0x4654('0xbd')](_0x4654('0x39b'));}}}}else{function _0x297034(){_0x1d2ca0[_0x4654('0x128')](_0x3ad833[_0x4654('0x589')]());}}}}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],'ActSeq_Mechanics_AddState',_0x297ddb=>{if(!SceneManager[_0x4654('0x443')]())return;VisuMZ['ConvertParams'](_0x297ddb,_0x297ddb);const _0x42bb12=_0x297ddb[_0x4654('0x2ad')],_0x5a8649=VisuMZ['CreateActionSequenceTargets'](_0x297ddb[_0x4654('0x5fb')]);for(const _0x4c8a4f of _0x5a8649){if(!_0x4c8a4f)continue;for(const _0x8fe74a of _0x42bb12){if(_0x4654('0x41b')!==_0x4654('0x41b')){function _0x10fbfa(){const _0x352af5=_0x45eb16['VisuMZ_1_SkillsStatesCore']?_0x1be9ca[_0x4654('0x243')][_0x4654('0x1f3')][_0x4654('0x623')]:_0x2ed72a[_0x4654('0x1f')]['Settings'][_0x4654('0x3a')],_0x5ef083=_0x2b77c5[_0x4654('0x153')][_0x4654('0x386')](_0x1e8b6e),_0x5b7343=_0x5ef083?_0x352af5[_0x4654('0x25c')]:_0x352af5['IconStypeNorm'];_0x2117cd='\x5cI[%1]%2'[_0x4654('0x31f')](_0x5b7343,_0x3196e6);}}else _0x4c8a4f[_0x4654('0x1aa')](_0x8fe74a);}}}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],_0x4654('0x654'),_0x3040a0=>{if(!SceneManager[_0x4654('0x443')]())return;VisuMZ[_0x4654('0x476')](_0x3040a0,_0x3040a0);const _0x9740cd=BattleManager[_0x4654('0x149')],_0x3e8fb6={'arPenRate':_0x3040a0['ArPenRate'],'arPenFlat':_0x3040a0[_0x4654('0x24c')],'arRedRate':_0x3040a0[_0x4654('0x30a')],'arRedFlat':_0x3040a0[_0x4654('0xaf')]};_0x9740cd['_armorPenetration']=_0x3e8fb6;}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],_0x4654('0x5a1'),_0x5437fc=>{if(!SceneManager[_0x4654('0x443')]())return;VisuMZ[_0x4654('0x476')](_0x5437fc,_0x5437fc);const _0x423b5b=VisuMZ[_0x4654('0x667')](_0x5437fc[_0x4654('0x5fb')]),_0x1ef99b=_0x5437fc[_0x4654('0x6d5')],_0x1d06bb=_0x5437fc['ChargeRate'],_0x1ef0b5=_0x5437fc[_0x4654('0x73c')];for(const _0x481a71 of _0x423b5b){if('NJEah'===_0x4654('0x1f2')){function _0x1bfc4a(){const _0x18d5e5=_0x322868[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x51a')];let _0x12b21c=![];_0x2e2ebb[_0x4654('0x4f9')]()?_0x12b21c=_0x18d5e5[_0x4654('0x3b')]:_0x12b21c=_0x18d5e5[_0x4654('0x629')],this[_0x4654('0x326')](_0x12b21c?this[_0x4654('0x25d')]()-0x1:0x0);}}else{if(!_0x481a71)continue;if(_0x481a71[_0x4654('0x157')]()){if(_0x4654('0x618')!==_0x4654('0x618')){function _0x7de3b7(){const _0x10f3b7=_0x20d25a[_0x4654('0x1f7')]();this[_0x4654('0x214')](_0x328848,_0x53ceeb,_0x58b2b2),this['createEffectActionSet'](_0x5c066f,_0x12025c,_0x679033),this['finishActionSet'](_0x2b3d55,_0x7fcace,_0x17b3f7);}}else _0x481a71[_0x4654('0x727')](_0x1ef99b);}else{if(_0x481a71['isAtbCastingState']()){_0x481a71[_0x4654('0x574')](_0x1ef99b);if(_0x1ef0b5)_0x481a71['atbInterrupt']();}}}}}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],_0x4654('0x32a'),_0x14a654=>{if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x4654('0x476')](_0x14a654,_0x14a654);const _0x7790ad=$gameTemp[_0x4654('0x779')](),_0x576b45=BattleManager[_0x4654('0x149')],_0x5d9e4b=BattleManager[_0x4654('0x672')];if(!_0x7790ad||!_0x576b45||!_0x5d9e4b)return;if(!_0x576b45[_0x4654('0x1f7')]())return;const _0x2fe636=VisuMZ[_0x4654('0x667')](_0x14a654['Targets']);for(const _0x5b09eb of _0x2fe636){if(!_0x5b09eb)continue;_0x14a654[_0x4654('0x264')]&&(_0x5b09eb[_0x4654('0x72d')](),_0x5b09eb[_0x4654('0x1aa')](_0x5b09eb[_0x4654('0x8')]()));if(_0x5b09eb[_0x4654('0x33a')]())_0x5b09eb[_0x4654('0x465')]();}_0x7790ad[_0x4654('0xbd')]('battleEffect');}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],_0x4654('0x403'),_0x36f8dd=>{if(!SceneManager[_0x4654('0x443')]())return;VisuMZ[_0x4654('0x476')](_0x36f8dd,_0x36f8dd);const _0x1d466d=VisuMZ[_0x4654('0x667')](_0x36f8dd[_0x4654('0x5fb')]);for(const _0x3fa2d9 of _0x1d466d){if('fBBQh'!=='SDJwL'){if(!_0x3fa2d9)continue;if(_0x3fa2d9[_0x4654('0x6bb')]())_0x3fa2d9[_0x4654('0x143')]();}else{function _0x459e08(){return this[_0x4654('0x5ef')]()&&!this[_0x4654('0x58d')]()?this[_0x4654('0x6ef')]():_0x2febc1[_0x4654('0x1f')][_0x4654('0x4f5')][_0x4654('0x5a5')](this);}}}}),PluginManager['registerCommand'](pluginData[_0x4654('0x18f')],'ActSeq_Mechanics_DeathBreak',_0x2b2c5a=>{if(!SceneManager[_0x4654('0x443')]())return;VisuMZ[_0x4654('0x476')](_0x2b2c5a,_0x2b2c5a);const _0x3450b5=$gameTemp['getLastPluginCommandInterpreter'](),_0x2e949d=BattleManager[_0x4654('0x672')],_0x2451d2=_0x2b2c5a[_0x4654('0x73e')];if(!_0x3450b5)return;if(!_0x2e949d)return;_0x2e949d&&_0x2e949d[_0x4654('0x6f4')]()&&_0x2451d2[_0x4654('0x29d')]()[_0x4654('0x512')]()!==_0x4654('0x18e')&&_0x3450b5[_0x4654('0x494')]([_0x2451d2]);}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],_0x4654('0x1a6'),_0x8e1ab5=>{if(!SceneManager[_0x4654('0x443')]())return;VisuMZ['ConvertParams'](_0x8e1ab5,_0x8e1ab5);const _0x16dcfb=VisuMZ[_0x4654('0x667')](_0x8e1ab5[_0x4654('0x5fb')]),_0x2e58dc=_0x8e1ab5[_0x4654('0xc3')],_0x49f2b8=_0x8e1ab5[_0x4654('0x578')],_0x5a8bfc=_0x8e1ab5[_0x4654('0x6d7')],_0x1065b3=_0x8e1ab5[_0x4654('0x6c2')],_0x1fee56=_0x8e1ab5[_0x4654('0xb5')],_0x11ed70=_0x8e1ab5[_0x4654('0x421')],_0x272e75=_0x8e1ab5[_0x4654('0x303')];for(const _0x18e3dc of _0x16dcfb){if(!_0x18e3dc)continue;const _0xc837cb=Math[_0x4654('0x31a')](_0x2e58dc*_0x18e3dc[_0x4654('0xf6')]+_0x49f2b8),_0x3574ac=Math[_0x4654('0x31a')](_0x5a8bfc*_0x18e3dc[_0x4654('0x3ae')]+_0x1065b3),_0xb0d208=Math['round'](_0x1fee56*_0x18e3dc[_0x4654('0x74a')]()+_0x11ed70);if(_0xc837cb!==0x0)_0x18e3dc[_0x4654('0x737')](_0xc837cb);if(_0x3574ac!==0x0)_0x18e3dc[_0x4654('0x6f2')](_0x3574ac);if(_0xb0d208!==0x0)_0x18e3dc[_0x4654('0x674')](_0xb0d208);if(_0x272e75)_0x18e3dc[_0x4654('0x143')]();}}),PluginManager['registerCommand'](pluginData[_0x4654('0x18f')],_0x4654('0xf9'),_0x4d4fb8=>{if(!SceneManager[_0x4654('0x443')]())return;VisuMZ[_0x4654('0x476')](_0x4d4fb8,_0x4d4fb8);const _0x4815d0=VisuMZ[_0x4654('0x667')](_0x4d4fb8[_0x4654('0x5fb')]);for(const _0x51f8a2 of _0x4815d0){if(_0x4654('0x60f')!==_0x4654('0x60f')){function _0x1b76e2(){const _0x443d58=_0x2f9123(_0x18660c['$1'])[_0x4654('0x29d')]()['trim']();if(_0x443d58===_0x4654('0x4c6'))return _0x4654('0x4c6');if(_0x2a54c7['DamageStyles'][_0x443d58])return _0x443d58;}}else{if(!_0x51f8a2)continue;_0x51f8a2[_0x4654('0x4f4')](_0x4d4fb8[_0x4654('0x74')]);}}}),PluginManager[_0x4654('0x5b8')](pluginData['name'],_0x4654('0x87'),_0x2d7cae=>{if(!SceneManager[_0x4654('0x443')]())return;VisuMZ[_0x4654('0x476')](_0x2d7cae,_0x2d7cae);const _0x3712c7=BattleManager[_0x4654('0x149')],_0x188558={'criticalHitRate':_0x2d7cae[_0x4654('0x633')],'criticalHitFlat':_0x2d7cae['CriticalHitFlat'],'criticalDmgRate':_0x2d7cae[_0x4654('0x6ae')],'criticalDmgFlat':_0x2d7cae[_0x4654('0x14c')],'damageRate':_0x2d7cae[_0x4654('0x495')],'damageFlat':_0x2d7cae[_0x4654('0x6')],'hitRate':_0x2d7cae[_0x4654('0x368')],'hitFlat':_0x2d7cae[_0x4654('0x32b')]};_0x3712c7[_0x4654('0x2c6')]=_0x188558;}),PluginManager['registerCommand'](pluginData['name'],_0x4654('0x57e'),_0x481b66=>{if(!SceneManager[_0x4654('0x443')]())return;VisuMZ[_0x4654('0x476')](_0x481b66,_0x481b66);const _0x2780e6=['MAXHP',_0x4654('0x331'),_0x4654('0x33e'),_0x4654('0x619'),_0x4654('0x576'),_0x4654('0x216'),_0x4654('0xfe'),_0x4654('0x60c')],_0x27065b=_0x481b66['Buffs'],_0xf3166=_0x481b66[_0x4654('0x21b')],_0x440ad2=VisuMZ['CreateActionSequenceTargets'](_0x481b66[_0x4654('0x5fb')]);for(const _0x418ef1 of _0x440ad2){if(!_0x418ef1)continue;for(const _0x3d0bbc of _0x27065b){const _0x90304e=_0x2780e6[_0x4654('0x399')](_0x3d0bbc[_0x4654('0x29d')]()[_0x4654('0x512')]());_0x90304e>=0x0&&_0x90304e<=0x7&&_0x418ef1[_0x4654('0x39c')](_0x90304e)&&_0x418ef1['removeBuff'](_0x90304e);}for(const _0x3027c4 of _0xf3166){const _0x42a6be=_0x2780e6[_0x4654('0x399')](_0x3027c4[_0x4654('0x29d')]()[_0x4654('0x512')]());if(_0x42a6be>=0x0&&_0x42a6be<=0x7&&_0x418ef1[_0x4654('0x5d4')](_0x42a6be)){if(_0x4654('0x664')===_0x4654('0x172')){function _0x5ca0e6(){const _0x1a7e05=[];for(let _0x5ea98b=0x0;_0x5ea98b<this[_0x4654('0x2ea')]();_0x5ea98b++){_0x1a7e05[_0x4654('0x128')](_0x581871[_0x4654('0x589')]());}return _0x1a7e05;}}else _0x418ef1[_0x4654('0x2fa')](_0x42a6be);}}}}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],_0x4654('0xd8'),_0x512787=>{if(!SceneManager[_0x4654('0x443')]())return;VisuMZ[_0x4654('0x476')](_0x512787,_0x512787);const _0x21334b=_0x512787[_0x4654('0x2ad')],_0x1e8274=VisuMZ[_0x4654('0x667')](_0x512787[_0x4654('0x5fb')]);for(const _0x19a062 of _0x1e8274){if(!_0x19a062)continue;for(const _0x982639 of _0x21334b){_0x19a062[_0x4654('0x18a')](_0x982639);}}}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],_0x4654('0xf1'),_0x834727=>{if(!SceneManager[_0x4654('0x443')]())return;VisuMZ[_0x4654('0x476')](_0x834727,_0x834727);const _0x349215=VisuMZ[_0x4654('0x667')](_0x834727[_0x4654('0x5fb')]),_0x264247=_0x834727[_0x4654('0x656')],_0x1ab705={'textColor':ColorManager[_0x4654('0x432')](_0x834727[_0x4654('0x1ec')]),'flashColor':_0x834727[_0x4654('0x593')],'flashDuration':_0x834727[_0x4654('0x12a')]};for(const _0x17e806 of _0x349215){if(_0x4654('0x302')===_0x4654('0x592')){function _0x3e332d(){this[_0x4654('0x5c9')]()?_0x52af06[_0x4654('0x8d')][_0x4654('0x40a')][_0x4654('0x5a5')](this):this[_0x4654('0x3c7')]=0x8;}}else{if(!_0x17e806)continue;_0x17e806[_0x4654('0x3b9')](_0x264247,_0x1ab705);}}}),PluginManager['registerCommand'](pluginData[_0x4654('0x18f')],_0x4654('0x73a'),_0x31b9c0=>{if(!SceneManager[_0x4654('0x443')]())return;const _0x55ce8c=$gameTemp[_0x4654('0x779')]();if(!_0x55ce8c)return;_0x55ce8c[_0x4654('0xbd')](_0x4654('0x757'));}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],_0x4654('0x75c'),_0x49e156=>{if(!SceneManager[_0x4654('0x443')]())return;VisuMZ[_0x4654('0x476')](_0x49e156,_0x49e156);const _0x43fe5b=VisuMZ['CreateActionSequenceTargets'](_0x49e156[_0x4654('0x5fb')]),_0x3bfd08=_0x49e156[_0x4654('0x6d8')][_0x4654('0x134')]()[_0x4654('0x512')](),_0x323cee=_0x49e156['ShowWeapon'];for(const _0x3a3a9b of _0x43fe5b){if(!_0x3a3a9b)continue;_0x3bfd08===_0x4654('0x36d')?_0x3a3a9b[_0x4654('0x41')]():_0x3a3a9b[_0x4654('0x741')](_0x3bfd08),[_0x4654('0x36d'),_0x4654('0x473'),_0x4654('0x2c1'),'missile'][_0x4654('0x386')](_0x3bfd08)?_0x3a3a9b[_0x4654('0x267')]():_0x3a3a9b[_0x4654('0x546')](0x0);}}),PluginManager['registerCommand'](pluginData[_0x4654('0x18f')],_0x4654('0x2f4'),_0xdfd903=>{if(!SceneManager[_0x4654('0x443')]())return;VisuMZ[_0x4654('0x476')](_0xdfd903,_0xdfd903);const _0x5da133=BattleManager[_0x4654('0x149')];if(!_0x5da133)return;if(!_0x5da133[_0x4654('0x1f7')]())return;const _0x2c05b7=VisuMZ[_0x4654('0x667')](_0xdfd903[_0x4654('0x5fb')]);for(const _0x1978a9 of _0x2c05b7){if(!_0x1978a9)continue;_0x1978a9[_0x4654('0x38f')](_0x5da133);}}),PluginManager['registerCommand'](pluginData[_0x4654('0x18f')],_0x4654('0x2b5'),_0x1e422c=>{if(!SceneManager[_0x4654('0x443')]())return;VisuMZ[_0x4654('0x476')](_0x1e422c,_0x1e422c);const _0x3d4c1a=VisuMZ[_0x4654('0x667')](_0x1e422c['Targets']);for(const _0x29875e of _0x3d4c1a){if(!_0x29875e)continue;_0x29875e['requestMotionRefresh']();}}),PluginManager['registerCommand'](pluginData[_0x4654('0x18f')],_0x4654('0x1e6'),_0x51983b=>{if(!SceneManager[_0x4654('0x443')]())return;VisuMZ[_0x4654('0x476')](_0x51983b,_0x51983b);const _0x2a4576=$gameTemp[_0x4654('0x779')](),_0x4bc2ca=_0x51983b[_0x4654('0x3b2')]*Sprite_Battler[_0x4654('0x70c')];_0x2a4576['wait'](_0x4bc2ca);}),PluginManager['registerCommand'](pluginData[_0x4654('0x18f')],_0x4654('0x4e6'),_0x491e43=>{if(!SceneManager[_0x4654('0x443')]())return;VisuMZ['ConvertParams'](_0x491e43,_0x491e43);const _0x1741e9=$gameTemp[_0x4654('0x779')](),_0x35c1b=BattleManager[_0x4654('0x149')];if(!_0x1741e9||!_0x35c1b)return;if(!_0x35c1b[_0x4654('0x1f7')]())return;const _0x449dbd=VisuMZ['CreateActionSequenceTargets'](_0x491e43[_0x4654('0x5fb')]);for(const _0x40ec16 of _0x449dbd){if(!_0x40ec16)continue;_0x40ec16['performActionStart'](_0x35c1b);}if(_0x491e43[_0x4654('0x50a')])_0x1741e9[_0x4654('0xbd')](_0x4654('0x4fd'));}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],_0x4654('0x10c'),_0x545a6a=>{if(!SceneManager[_0x4654('0x443')]())return;if(!$gameSystem['isSideView']())return;VisuMZ[_0x4654('0x476')](_0x545a6a,_0x545a6a);const _0x2ab439=VisuMZ[_0x4654('0x667')](_0x545a6a[_0x4654('0x5fb')]);let _0x171555=_0x545a6a[_0x4654('0x24a')][_0x4654('0x2a0')](/back/i);for(const _0x40f4ca of _0x2ab439){if(!_0x40f4ca)continue;if(_0x545a6a[_0x4654('0x24a')][_0x4654('0x2a0')](/rand/i))_0x171555=Math[_0x4654('0x5c3')](0x2);_0x40f4ca[_0x4654('0x322')](!!_0x171555);}}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],'ActSeq_Movement_FacePoint',_0x41c943=>{if(!SceneManager[_0x4654('0x443')]())return;if(!$gameSystem[_0x4654('0x4f9')]())return;VisuMZ[_0x4654('0x476')](_0x41c943,_0x41c943);const _0x51af57=VisuMZ[_0x4654('0x667')](_0x41c943[_0x4654('0x5fb')]);let _0x462a28=_0x41c943[_0x4654('0x5a')];const _0x52f400=_0x41c943[_0x4654('0x181')];for(const _0x5c4ad2 of _0x51af57){if(!_0x5c4ad2)continue;let _0x2d164a=_0x5c4ad2[_0x4654('0x770')]()[_0x4654('0x2df')],_0x2df977=_0x5c4ad2[_0x4654('0x770')]()[_0x4654('0x2a8')];if(_0x462a28[_0x4654('0x2a0')](/home/i)){if(_0x4654('0x6e7')!==_0x4654('0x6e7')){function _0x46f9ca(){_0x57a214[_0x4654('0x1f')][_0x4654('0x6a8')](_0x1809c1,_0xf4011a);}}else _0x2d164a=_0x5c4ad2['battler']()[_0x4654('0x36')],_0x2df977=_0x5c4ad2[_0x4654('0x770')]()[_0x4654('0x728')];}else{if(_0x462a28[_0x4654('0x2a0')](/center/i))_0x2d164a=Graphics[_0x4654('0x46b')]/0x2,_0x2df977=Graphics[_0x4654('0x37f')]/0x2;else _0x462a28['match'](/point (\d+), (\d+)/i)&&(_0x2d164a=Number(RegExp['$1']),_0x2df977=Number(RegExp['$2']));}_0x5c4ad2[_0x4654('0x4d')](Math[_0x4654('0x31a')](_0x2d164a),Math[_0x4654('0x31a')](_0x2df977),!!_0x52f400);}}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],_0x4654('0x707'),_0x208e72=>{if(!SceneManager[_0x4654('0x443')]())return;if(!$gameSystem[_0x4654('0x4f9')]())return;VisuMZ['ConvertParams'](_0x208e72,_0x208e72);const _0x2a97a8=VisuMZ[_0x4654('0x667')](_0x208e72[_0x4654('0x594')]),_0x9bbc5f=VisuMZ[_0x4654('0x667')](_0x208e72[_0x4654('0x3b8')]),_0x2536da=_0x9bbc5f['map'](_0x2d7777=>_0x2d7777&&_0x2d7777['battler']()?_0x2d7777[_0x4654('0x770')]()[_0x4654('0x2df')]:0x0)/(_0x9bbc5f[_0x4654('0x0')]||0x1),_0x5d3eb9=_0x9bbc5f[_0x4654('0x538')](_0xb814e6=>_0xb814e6&&_0xb814e6[_0x4654('0x770')]()?_0xb814e6['battler']()[_0x4654('0x2a8')]:0x0)/(_0x9bbc5f[_0x4654('0x0')]||0x1),_0x3aae32=_0x208e72['FaceAway'];for(const _0xa346d2 of _0x2a97a8){if(_0x4654('0x6fd')!=='LbUVV'){function _0x256169(){_0x54c527[_0x4654('0x1f')][_0x4654('0x3c')][_0x4654('0x5a5')](this),this[_0x4654('0x524')](),this['callNextMethod']();}}else{if(!_0xa346d2)continue;_0xa346d2[_0x4654('0x4d')](Math[_0x4654('0x31a')](_0x2536da),Math[_0x4654('0x31a')](_0x5d3eb9),!!_0x3aae32);}}}),PluginManager[_0x4654('0x5b8')](pluginData['name'],'ActSeq_Movement_Float',_0x2f2985=>{if(!SceneManager[_0x4654('0x443')]())return;VisuMZ[_0x4654('0x476')](_0x2f2985,_0x2f2985);const _0x3fed35=$gameTemp[_0x4654('0x779')](),_0x4ec644=VisuMZ['CreateActionSequenceTargets'](_0x2f2985['Targets']),_0x55441f=_0x2f2985[_0x4654('0x4cf')],_0x20cdc9=_0x2f2985[_0x4654('0x44a')],_0x558371=_0x2f2985['EasingType'],_0x384605=_0x2f2985['WaitForFloat'];if(!_0x3fed35)return;for(const _0x5b0a82 of _0x4ec644){if('lnFSn'===_0x4654('0x750')){function _0x15dc55(){const _0xe8ab60=_0x11e4e3(_0x5f12fa['$1']);return _0x3e1094[_0x4654('0x5e1')]()['filter'](_0x2669af=>_0x2669af[_0x4654('0x89')]()===_0xe8ab60);}}else{if(!_0x5b0a82)continue;_0x5b0a82[_0x4654('0x71')](_0x55441f,_0x20cdc9,_0x558371);}}if(_0x384605)_0x3fed35['setWaitMode'](_0x4654('0x31c'));}),PluginManager['registerCommand'](pluginData[_0x4654('0x18f')],'ActSeq_Movement_HomeReset',_0x706b82=>{if(!SceneManager[_0x4654('0x443')]())return;VisuMZ[_0x4654('0x476')](_0x706b82,_0x706b82);const _0xe1e802=$gameTemp[_0x4654('0x779')]();if(!_0xe1e802)return;const _0x47b3cc=VisuMZ['CreateActionSequenceTargets'](_0x706b82[_0x4654('0x5fb')]);for(const _0x4fa0ed of _0x47b3cc){if(_0x4654('0x4e9')!==_0x4654('0x4e9')){function _0xf2259(){const _0x2adcf8=_0x38d9ef(_0x4d98eb['$1']);_0x2adcf8!==_0x571a0f[_0xfa1c7b]['version']&&(_0x3e4e46('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'['format'](_0x589451,_0x2adcf8)),_0x552d8f[_0x4654('0x4a')]());}}else{if(!_0x4fa0ed)continue;_0x4fa0ed[_0x4654('0x4be')]();}}if(_0x706b82[_0x4654('0x50a')])_0xe1e802[_0x4654('0xbd')](_0x4654('0x4fd'));}),PluginManager['registerCommand'](pluginData[_0x4654('0x18f')],_0x4654('0x93'),_0x19a8d5=>{if(!SceneManager[_0x4654('0x443')]())return;VisuMZ[_0x4654('0x476')](_0x19a8d5,_0x19a8d5);const _0x523ab3=$gameTemp[_0x4654('0x779')](),_0x656929=VisuMZ[_0x4654('0x667')](_0x19a8d5[_0x4654('0x5fb')]),_0x260ed8=_0x19a8d5['Height'],_0x761916=_0x19a8d5[_0x4654('0x44a')],_0x276c37=_0x19a8d5['WaitForJump'];if(!_0x523ab3)return;for(const _0x288fd6 of _0x656929){if(!_0x288fd6)continue;_0x288fd6['jumpBattler'](_0x260ed8,_0x761916);}if(_0x276c37)_0x523ab3[_0x4654('0xbd')]('battleJump');}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],_0x4654('0x5f'),_0x5b468f=>{if(!SceneManager[_0x4654('0x443')]())return;if(!$gameSystem['isSideView']())return;VisuMZ[_0x4654('0x476')](_0x5b468f,_0x5b468f);const _0x38ec0f=$gameTemp[_0x4654('0x779')](),_0x26549f=VisuMZ[_0x4654('0x667')](_0x5b468f[_0x4654('0x5fb')]),_0x571a34=_0x5b468f['DistanceAdjust'],_0x2b3edf=_0x5b468f[_0x4654('0xab')],_0x57bffd=_0x5b468f[_0x4654('0x719')],_0x1e7648=_0x5b468f[_0x4654('0x44a')],_0x1430fb=_0x5b468f[_0x4654('0x761')],_0x4d5afb=_0x5b468f[_0x4654('0x482')],_0x2e0b3e=_0x5b468f[_0x4654('0x6d8')],_0x14dd94=_0x5b468f['WaitForMovement'];if(!_0x38ec0f)return;for(const _0x297861 of _0x26549f){if(!_0x297861)continue;let _0x3d684e=_0x2b3edf,_0x3eaf53=_0x57bffd;if(_0x571a34[_0x4654('0x2a0')](/horz/i))_0x3d684e*=_0x297861[_0x4654('0x5b5')]()?-0x1:0x1;if(_0x571a34[_0x4654('0x2a0')](/vert/i))_0x3eaf53*=_0x297861[_0x4654('0x5b5')]()?-0x1:0x1;_0x297861[_0x4654('0x474')](_0x3d684e,_0x3eaf53,_0x1e7648,_0x1430fb,_0x4d5afb),_0x297861['requestMotion'](_0x2e0b3e);}if(_0x14dd94)_0x38ec0f[_0x4654('0xbd')](_0x4654('0x4fd'));}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],_0x4654('0x179'),_0x5e21b9=>{if(!SceneManager[_0x4654('0x443')]())return;if(!$gameSystem[_0x4654('0x4f9')]())return;VisuMZ[_0x4654('0x476')](_0x5e21b9,_0x5e21b9);const _0x29ba5f=$gameTemp[_0x4654('0x779')](),_0x38b06f=VisuMZ[_0x4654('0x667')](_0x5e21b9[_0x4654('0x5fb')]),_0x54586c=_0x5e21b9[_0x4654('0x751')],_0xb7cc16=_0x5e21b9['OffsetAdjust'],_0xa9ffb1=_0x5e21b9[_0x4654('0x653')],_0x371fbe=_0x5e21b9[_0x4654('0x65e')],_0x4da8db=_0x5e21b9[_0x4654('0x44a')],_0x25627d=_0x5e21b9[_0x4654('0x761')],_0x30d9b1=_0x5e21b9[_0x4654('0x482')],_0x1eac90=_0x5e21b9[_0x4654('0x6d8')],_0x10ba9e=_0x5e21b9[_0x4654('0x50a')];if(!_0x29ba5f)return;for(const _0x3a355c of _0x38b06f){if(!_0x3a355c)continue;let _0x5bc2d2=_0x3a355c[_0x4654('0x770')]()['_baseX'],_0x552e83=_0x3a355c[_0x4654('0x770')]()[_0x4654('0x2a8')];if(_0x54586c[_0x4654('0x2a0')](/home/i)){if(_0x4654('0x5b7')!==_0x4654('0x266'))_0x5bc2d2=_0x3a355c['battler']()['_homeX'],_0x552e83=_0x3a355c[_0x4654('0x770')]()[_0x4654('0x728')];else{function _0xc0a4c6(){this['_battlerContainer']=new _0x1e4a5a(),this[_0x4654('0x1d6')][_0x4654('0x43f')](this['_battlerContainer']),this[_0x4654('0x72c')]=new _0x8266aa(),this[_0x4654('0x1d6')][_0x4654('0x43f')](this[_0x4654('0x72c')]),this[_0x4654('0x545')]=new _0x38f347(),this[_0x4654('0x545')]['x']=this[_0x4654('0x1d6')]['x'],this[_0x4654('0x545')]['y']=this[_0x4654('0x1d6')]['y'],this[_0x4654('0x43f')](this[_0x4654('0x545')]);if(!this[_0x4654('0x122')]())return;this[_0x4654('0x30f')][_0x4654('0x498')]['x']=-0x1,this[_0x4654('0x30f')]['x']=this['_battleField'][_0x4654('0x564')],this['_animationContainer']['scale']['x']=-0x1,this['_animationContainer']['x']=this[_0x4654('0x1d6')][_0x4654('0x564')],this[_0x4654('0x545')][_0x4654('0x498')]['x']=-0x1,this['_damageContainer']['x']=this[_0x4654('0x1d6')]['x']+this[_0x4654('0x1d6')][_0x4654('0x564')];}}}else{if(_0x54586c[_0x4654('0x2a0')](/center/i))_0x5bc2d2=Graphics[_0x4654('0x46b')]/0x2,_0x552e83=Graphics[_0x4654('0x37f')]/0x2;else{if(_0x54586c[_0x4654('0x2a0')](/point (\d+), (\d+)/i)){if('PNJRP'==='PNJRP')_0x5bc2d2=Number(RegExp['$1']),_0x552e83=Number(RegExp['$2']);else{function _0x7f2046(){const _0x4d38ca=this[_0x4654('0x149')];if(_0x4d38ca)_0x4d38ca[_0x4654('0x673')](_0x4654('0x50b'));_0x4fd12c['BattleCore'][_0x4654('0x40d')][_0x4654('0x5a5')](this);if(_0x4d38ca)_0x4d38ca[_0x4654('0x673')](_0x4654('0x55c'));}}}}}if(_0xb7cc16[_0x4654('0x2a0')](/horz/i))_0x5bc2d2+=_0x3a355c[_0x4654('0x5b5')]()?-_0xa9ffb1:_0xa9ffb1;if(_0xb7cc16[_0x4654('0x2a0')](/vert/i))_0x552e83+=_0x3a355c['isActor']()?-_0x371fbe:_0x371fbe;_0x3a355c['moveBattlerToPoint'](_0x5bc2d2,_0x552e83,_0x4da8db,_0x25627d,_0x30d9b1,-0x1),_0x3a355c[_0x4654('0x741')](_0x1eac90);}if(_0x10ba9e)_0x29ba5f[_0x4654('0xbd')](_0x4654('0x4fd'));}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],_0x4654('0x160'),_0x247b96=>{if(!SceneManager[_0x4654('0x443')]())return;if(!$gameSystem['isSideView']())return;VisuMZ[_0x4654('0x476')](_0x247b96,_0x247b96);const _0x306c3f=$gameTemp[_0x4654('0x779')](),_0x37f144=VisuMZ['CreateActionSequenceTargets'](_0x247b96[_0x4654('0x594')]),_0xe5da20=VisuMZ[_0x4654('0x667')](_0x247b96['Targets2']),_0x3eb341=_0x247b96[_0x4654('0x176')];let _0x390641=_0x247b96[_0x4654('0x3af')];const _0x310dac=_0x247b96[_0x4654('0x753')],_0x39b7c3=_0x247b96[_0x4654('0x653')],_0x5622a6=_0x247b96[_0x4654('0x65e')],_0x47952f=_0x247b96[_0x4654('0x44a')],_0x1ff25d=_0x247b96[_0x4654('0x761')],_0xcc8b99=_0x247b96[_0x4654('0x482')],_0x1a44f5=_0x247b96['MotionType'],_0x344a4f=_0x247b96[_0x4654('0x50a')],_0x5b4432=Math[_0x4654('0x22b')](..._0xe5da20[_0x4654('0x538')](_0x25049e=>_0x25049e[_0x4654('0x770')]()[_0x4654('0x2df')]-_0x25049e[_0x4654('0x770')]()[_0x4654('0x564')]/0x2)),_0x3dfacd=Math[_0x4654('0x6f7')](..._0xe5da20[_0x4654('0x538')](_0x233acb=>_0x233acb[_0x4654('0x770')]()[_0x4654('0x2df')]+_0x233acb['battler']()[_0x4654('0x564')]/0x2)),_0x445b71=Math[_0x4654('0x22b')](..._0xe5da20[_0x4654('0x538')](_0x84f94=>_0x84f94['battler']()[_0x4654('0x2a8')]-_0x84f94['battler']()[_0x4654('0x2e8')])),_0x3f0f2e=Math[_0x4654('0x6f7')](..._0xe5da20[_0x4654('0x538')](_0x164475=>_0x164475['battler']()[_0x4654('0x2a8')])),_0x2cd094=_0xe5da20[_0x4654('0x4c4')](_0x491943=>_0x491943[_0x4654('0x5b5')]())[_0x4654('0x0')],_0x4d7c3e=_0xe5da20['filter'](_0x1c8138=>_0x1c8138['isEnemy']())[_0x4654('0x0')];let _0x165606=0x0,_0xf54fb3=0x0;if(_0x3eb341['match'](/front/i))_0x165606=_0x2cd094>=_0x4d7c3e?_0x5b4432:_0x3dfacd;else{if(_0x3eb341[_0x4654('0x2a0')](/middle/i)){if(_0x4654('0x3c1')!==_0x4654('0x3c1')){function _0x42f3b8(){if(this['_cache'][_0x4654('0x6c9')]!==_0x2919c3)return this[_0x4654('0x91')][_0x4654('0x6c9')];return this[_0x4654('0x30c')]()['note'][_0x4654('0x2a0')](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)?(this[_0x4654('0x91')][_0x4654('0x4c8')]=_0x1548d2(_0x53c183['$1']),this[_0x4654('0x91')][_0x4654('0x6c9')]=_0x2244cd(_0x194064['$2'])):this[_0x4654('0x91')][_0x4654('0x6c9')]=_0x18cee1[_0x4654('0x8d')][_0x4654('0x341')][_0x4654('0x5a5')](this),this['_cache'][_0x4654('0x6c9')];}}else _0x165606=(_0x5b4432+_0x3dfacd)/0x2,_0x390641=-0x1;}else{if(_0x3eb341[_0x4654('0x2a0')](/back/i)){if(_0x4654('0x20e')!=='DIAYf')_0x165606=_0x2cd094>=_0x4d7c3e?_0x3dfacd:_0x5b4432;else{function _0x16a1e3(){_0x4fa570=_0x309d26(_0x38c384['$1']);}}}}}if(_0x3eb341[_0x4654('0x2a0')](/head/i)){if(_0x4654('0x12c')===_0x4654('0x12c'))_0xf54fb3=_0x445b71;else{function _0x13d4fc(){const _0x30d174=this[_0x4654('0x3cc')]();if(_0x30d174[_0x4654('0x749')]||_0x30d174[_0x4654('0x163')]){const _0x183bd1=_0x43597a[_0x4654('0x1a7')](_0x30d174);_0x183bd1[_0x4654('0x2d4')]=![],_0x183bd1[_0x4654('0x5c8')]=0x0,this[_0x4654('0x59d')][_0x4654('0x128')](_0x183bd1);}if(_0x30d174['hpAffected']){const _0x1364d1=_0x5b8009[_0x4654('0x1a7')](_0x30d174);_0x1364d1['missed']=![],_0x1364d1[_0x4654('0x163')]=![],_0x1364d1[_0x4654('0x5c8')]=0x0,this[_0x4654('0x59d')][_0x4654('0x128')](_0x1364d1);}if(_0x30d174[_0x4654('0x5c8')]!==0x0){const _0x37c5b0=_0x3cffa2[_0x4654('0x1a7')](_0x30d174);_0x37c5b0[_0x4654('0x749')]=![],_0x37c5b0['evaded']=![],_0x37c5b0[_0x4654('0x2d4')]=![],this[_0x4654('0x59d')][_0x4654('0x128')](_0x37c5b0);}}}}else{if(_0x3eb341[_0x4654('0x2a0')](/center/i)){if(_0x4654('0x54d')!==_0x4654('0x54d')){function _0x5641c7(){const _0x39d0d6=_0x308457[_0x4654('0x3cc')](),_0x1f61cb=_0x39d0d6[_0x4654('0x200')]();for(const _0x3ac4bd of _0x1f61cb){const _0x449b69=_0x45741b[_0x4654('0x5b5')]()?_0x3ac4bd[_0x4654('0x42c')]:_0x3ac4bd[_0x4654('0x356')];_0x449b69&&_0x48f48b[_0x4654('0x1f')][_0x4654('0x1f3')]['BattleLog'][_0x4654('0x775')]&&(this[_0x4654('0x128')]('popBaseLine'),this[_0x4654('0x128')](_0x4654('0x2e4')),this[_0x4654('0x128')]('addText',_0x449b69['format'](_0x1606cf[_0x4654('0x18f')]()))),_0x3ac4bd['id']===_0x4ffd9d[_0x4654('0x8')]()&&this[_0x4654('0x128')](_0x4654('0x465'),_0x221889);}}}else _0xf54fb3=(_0x445b71+_0x3f0f2e)/0x2;}else _0x3eb341[_0x4654('0x2a0')](/base/i)&&(_0xf54fb3=_0x3f0f2e);}if(!_0x306c3f)return;for(const _0x513e4f of _0x37f144){if(!_0x513e4f)continue;let _0x39ef00=_0x165606,_0x3fb416=_0xf54fb3;if(_0x310dac[_0x4654('0x2a0')](/horz/i))_0x39ef00+=_0x513e4f[_0x4654('0x5b5')]()?-_0x39b7c3:_0x39b7c3;if(_0x310dac[_0x4654('0x2a0')](/vert/i))_0x3fb416+=_0x513e4f[_0x4654('0x5b5')]()?-_0x5622a6:_0x5622a6;_0x513e4f[_0x4654('0x6b3')](_0x39ef00,_0x3fb416,_0x47952f,_0x1ff25d,_0xcc8b99,_0x390641),_0x513e4f[_0x4654('0x741')](_0x1a44f5);}if(_0x344a4f)_0x306c3f[_0x4654('0xbd')]('battleMove');}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],'ActSeq_Movement_Opacity',_0x42100d=>{if(!SceneManager['isSceneBattle']())return;VisuMZ['ConvertParams'](_0x42100d,_0x42100d);const _0x3b9e56=$gameTemp['getLastPluginCommandInterpreter'](),_0x2f2756=VisuMZ[_0x4654('0x667')](_0x42100d[_0x4654('0x5fb')]),_0x336289=_0x42100d[_0x4654('0x32')],_0x1a857d=_0x42100d[_0x4654('0x44a')],_0xd12e3e=_0x42100d[_0x4654('0x482')],_0x3afb3a=_0x42100d[_0x4654('0x4c0')];if(!_0x3b9e56)return;for(const _0x3000b0 of _0x2f2756){if(!_0x3000b0)continue;_0x3000b0[_0x4654('0x6f')](_0x336289,_0x1a857d,_0xd12e3e);}if(_0x3afb3a)_0x3b9e56['setWaitMode']('battleOpacity');}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],_0x4654('0x567'),_0x5aacf9=>{if(!SceneManager['isSceneBattle']())return;const _0x476063=$gameTemp[_0x4654('0x779')]();if(!_0x476063)return;_0x476063[_0x4654('0xbd')](_0x4654('0x31c'));}),PluginManager['registerCommand'](pluginData[_0x4654('0x18f')],_0x4654('0x27e'),_0x1a997e=>{if(!SceneManager[_0x4654('0x443')]())return;const _0x588efa=$gameTemp[_0x4654('0x779')]();if(!_0x588efa)return;_0x588efa['setWaitMode']('battleJump');}),PluginManager[_0x4654('0x5b8')](pluginData['name'],'ActSeq_Movement_WaitForMovement',_0x349e97=>{if(!SceneManager['isSceneBattle']())return;const _0x415ebe=$gameTemp[_0x4654('0x779')]();if(!_0x415ebe)return;_0x415ebe[_0x4654('0xbd')](_0x4654('0x4fd'));}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],'ActSeq_Movement_WaitForOpacity',_0x58fd76=>{if(!SceneManager['isSceneBattle']())return;const _0x4a9591=$gameTemp[_0x4654('0x779')]();if(!_0x4a9591)return;_0x4a9591['setWaitMode'](_0x4654('0x38e'));}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],'ActSeq_Target_CurrentIndex',_0x449d89=>{if(!SceneManager[_0x4654('0x443')]())return;VisuMZ[_0x4654('0x476')](_0x449d89,_0x449d89);const _0x5c413d=$gameTemp[_0x4654('0x779')](),_0x3ed534=_0x449d89['Index'],_0x171224=_0x449d89['JumpToLabel'];if(!_0x5c413d)return;BattleManager[_0x4654('0x75e')]=_0x3ed534,BattleManager[_0x4654('0xa3')]=BattleManager['_allTargets'][BattleManager[_0x4654('0x75e')]]||null,BattleManager['_target']&&_0x171224[_0x4654('0x29d')]()[_0x4654('0x512')]()!=='UNTITLED'&&_0x5c413d[_0x4654('0x494')]([_0x171224]);}),PluginManager['registerCommand'](pluginData['name'],_0x4654('0x587'),_0xed748f=>{if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x4654('0x476')](_0xed748f,_0xed748f);const _0x3f9285=$gameTemp[_0x4654('0x779')](),_0x35ec4b=_0xed748f[_0x4654('0x73e')];if(!_0x3f9285)return;BattleManager[_0x4654('0x75e')]++,BattleManager[_0x4654('0xa3')]=BattleManager[_0x4654('0x12e')][BattleManager[_0x4654('0x75e')]]||null;if(BattleManager[_0x4654('0xa3')]&&_0x35ec4b['toUpperCase']()[_0x4654('0x512')]()!==_0x4654('0x18e')){if(_0x4654('0x54f')!==_0x4654('0x520'))_0x3f9285[_0x4654('0x494')]([_0x35ec4b]);else{function _0x1d1b34(){_0x36b73a[_0x4654('0x18f')]=_0x1ded11(_0x1c1e35['$1']);}}}}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],_0x4654('0x3f4'),_0xe39aa8=>{if(!SceneManager[_0x4654('0x443')]())return;VisuMZ[_0x4654('0x476')](_0xe39aa8,_0xe39aa8);const _0x566ac4=$gameTemp[_0x4654('0x779')](),_0x421cf0=_0xe39aa8[_0x4654('0x73e')];if(!_0x566ac4)return;BattleManager[_0x4654('0x75e')]--,BattleManager['_target']=BattleManager['_allTargets'][BattleManager[_0x4654('0x75e')]]||null,BattleManager[_0x4654('0xa3')]&&_0x421cf0[_0x4654('0x29d')]()[_0x4654('0x512')]()!==_0x4654('0x18e')&&_0x566ac4[_0x4654('0x494')]([_0x421cf0]);}),PluginManager[_0x4654('0x5b8')](pluginData['name'],_0x4654('0x40f'),_0x436df1=>{if(!SceneManager['isSceneBattle']())return;VisuMZ[_0x4654('0x476')](_0x436df1,_0x436df1);const _0x46517a=$gameTemp[_0x4654('0x779')](),_0x4c46b6=_0x436df1[_0x4654('0xa2')],_0x617f54=_0x436df1[_0x4654('0x73e')];if(!_0x46517a)return;const _0x14727c=BattleManager['_targetIndex'];for(;;){if(_0x4654('0x1e7')===_0x4654('0x1e7')){BattleManager[_0x4654('0x75e')]=Math[_0x4654('0x5c3')](BattleManager[_0x4654('0x12e')][_0x4654('0x0')]);if(!_0x4c46b6)break;if(BattleManager[_0x4654('0x75e')]!==_0x14727c)break;if(BattleManager[_0x4654('0x12e')][_0x4654('0x0')]<=0x1){if(_0x4654('0x229')!==_0x4654('0x229')){function _0x9a0ea3(){this['processBattleCoreJS'](_0x4654('0x120')),_0x2849df[_0x4654('0x1f')][_0x4654('0x580')][_0x4654('0x5a5')](this),this[_0x4654('0x2d6')](_0x4654('0x50c'));}}else{BattleManager[_0x4654('0x75e')]=0x0;break;}}}else{function _0x16133d(){return this[_0x4654('0x1f7')]()[_0x4654('0x762')][_0x4654('0x2a0')](/<DAMAGE CAP:[ ](\d+)>/i)?_0x5a397b(_0x1ad2f4['$1']):this[_0x4654('0xbe')]()[_0x4654('0x5a8')]();}}}BattleManager[_0x4654('0xa3')]=BattleManager[_0x4654('0x12e')][BattleManager[_0x4654('0x75e')]]||null,BattleManager[_0x4654('0xa3')]&&_0x617f54[_0x4654('0x29d')]()[_0x4654('0x512')]()!==_0x4654('0x18e')&&_0x46517a[_0x4654('0x494')]([_0x617f54]);}),PluginManager['registerCommand'](pluginData[_0x4654('0x18f')],_0x4654('0xd5'),_0x106a37=>{if(!SceneManager[_0x4654('0x443')]())return;if(!Imported[_0x4654('0x210')])return;VisuMZ[_0x4654('0x476')](_0x106a37,_0x106a37);const _0x29048f=$gameTemp['getLastPluginCommandInterpreter'](),_0x41a55f=_0x106a37[_0x4654('0x6e1')];if(!_0x29048f)return;$gameScreen['setBattleZoom'](0x1,_0x106a37[_0x4654('0x44a')],_0x106a37['EasingType']);if(_0x41a55f)_0x29048f[_0x4654('0xbd')]('battleZoom');}),PluginManager[_0x4654('0x5b8')](pluginData['name'],_0x4654('0x37d'),_0x35d346=>{if(!SceneManager['isSceneBattle']())return;if(!Imported[_0x4654('0x210')])return;VisuMZ[_0x4654('0x476')](_0x35d346,_0x35d346);const _0x1a9ef9=$gameTemp[_0x4654('0x779')](),_0x54d4f2=_0x35d346[_0x4654('0x6e1')];if(!_0x1a9ef9)return;$gameScreen['setBattleZoom'](_0x35d346[_0x4654('0x1')],_0x35d346[_0x4654('0x44a')],_0x35d346[_0x4654('0x482')]);if(_0x54d4f2)_0x1a9ef9[_0x4654('0xbd')](_0x4654('0x76c'));}),PluginManager[_0x4654('0x5b8')](pluginData[_0x4654('0x18f')],'ActSeq_Zoom_WaitForZoom',_0x167b73=>{if(!SceneManager[_0x4654('0x443')]())return;if(!Imported[_0x4654('0x210')])return;const _0x3c2e53=$gameTemp[_0x4654('0x779')]();if(!_0x3c2e53)return;_0x3c2e53[_0x4654('0xbd')](_0x4654('0x76c'));}),VisuMZ[_0x4654('0x1f')][_0x4654('0x4ef')]=Scene_Boot[_0x4654('0x8d')][_0x4654('0x5bc')],Scene_Boot['prototype']['onDatabaseLoaded']=function(){VisuMZ[_0x4654('0x1f')][_0x4654('0x4ef')][_0x4654('0x5a5')](this),this[_0x4654('0x3ca')]();},Scene_Boot[_0x4654('0x8d')][_0x4654('0x3ca')]=function(){this['process_VisuMZ_BattleCore_DamageStyles'](),this[_0x4654('0x3d7')](),this[_0x4654('0x4a1')](),this[_0x4654('0x5ae')](),this[_0x4654('0x60e')](),this[_0x4654('0x542')]();},VisuMZ[_0x4654('0x484')]={},Scene_Boot[_0x4654('0x8d')][_0x4654('0x3e6')]=function(){for(const _0x12cf7e of VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')]['Damage'][_0x4654('0x1a3')]){if(!_0x12cf7e)continue;const _0x53548c=_0x12cf7e['Name']['toUpperCase']()[_0x4654('0x512')]();VisuMZ[_0x4654('0x484')][_0x53548c]=_0x12cf7e;}},VisuMZ['BattleCore'][_0x4654('0x62f')]={},Scene_Boot[_0x4654('0x8d')][_0x4654('0x3d7')]=function(){const _0x5d4a59=VisuMZ[_0x4654('0x1f')][_0x4654('0x62f')],_0x402ad8=_0x4654('0x5db'),_0x45fecc=[[_0x4654('0x606'),_0x4654('0x42b')],[_0x4654('0x241'),'POST-']],_0x281fda=[[_0x4654('0x2a'),_0x4654('0x68')],['%1Damage%2JS',_0x4654('0x3dc')]],_0x5e9235=[['',''],['AsUser',_0x4654('0x562')],[_0x4654('0x71c'),_0x4654('0x8c')]];for(const _0x2b82f3 of _0x281fda){for(const _0x372847 of _0x5e9235){if('rkqZN'!==_0x4654('0x2b4'))for(const _0x1bbc05 of _0x45fecc){const _0x2d5c13=_0x2b82f3[0x0][_0x4654('0x31f')](_0x1bbc05[0x0],_0x372847[0x0]),_0x30e549=_0x2b82f3[0x1]['format'](_0x1bbc05[0x1],_0x372847[0x1])[_0x4654('0x512')](),_0x1707f3=new RegExp(_0x402ad8['format'](_0x30e549),'i');_0x5d4a59[_0x2d5c13]=_0x1707f3;}else{function _0x5dd5e4(){const _0x75eab4=this['commandName'](_0x26dbab);if(_0x75eab4[_0x4654('0x2a0')](/\\I\[(\d+)\]/i)){const _0x225604=this[_0x4654('0xc7')](_0x151fef),_0x3c5a60=this['textSizeEx'](_0x75eab4)[_0x4654('0x564')];return _0x3c5a60<=_0x225604[_0x4654('0x564')]?_0x4654('0x21'):_0x4654('0x347');}}}}}const _0x4d1fc2=[['%1StartActionJS','JS\x20%1START\x20ACTION'],[_0x4654('0x27f'),_0x4654('0x3')]];for(const _0x491a9d of _0x4d1fc2){for(const _0x5e24f8 of _0x45fecc){if(_0x4654('0x624')==='ZZAOn'){const _0x44c34f=_0x491a9d[0x0][_0x4654('0x31f')](_0x5e24f8[0x0]),_0x44936f=_0x491a9d[0x1][_0x4654('0x31f')](_0x5e24f8[0x1]),_0x3a02f4=new RegExp(_0x402ad8[_0x4654('0x31f')](_0x44936f),'i');_0x5d4a59[_0x44c34f]=_0x3a02f4;}else{function _0x42b22b(){_0x5c61fd[_0x4654('0x1aa')](_0xf83c65);}}}}const _0x31ef7d=[[_0x4654('0x410'),_0x4654('0x71a')],[_0x4654('0x748'),'JS\x20%1END\x20BATTLE'],[_0x4654('0x154'),_0x4654('0x3b3')],[_0x4654('0x434'),_0x4654('0x5f3')],[_0x4654('0x3f6'),_0x4654('0x393')],[_0x4654('0x723'),_0x4654('0x1e2')],['%1StartTurnJS',_0x4654('0x569')],[_0x4654('0x348'),'JS\x20%1END\x20TURN'],[_0x4654('0x52b'),_0x4654('0xfb')]];for(const _0x2171c3 of _0x31ef7d){for(const _0x4df113 of _0x45fecc){const _0x283771=_0x2171c3[0x0][_0x4654('0x31f')](_0x4df113[0x0]),_0x3679b2=_0x2171c3[0x1][_0x4654('0x31f')](_0x4df113[0x1]),_0x4ac026=new RegExp(_0x402ad8[_0x4654('0x31f')](_0x3679b2),'i');_0x5d4a59[_0x283771]=_0x4ac026;}}},Scene_Boot[_0x4654('0x8d')][_0x4654('0x4a1')]=function(){const _0x233281=$dataSkills[_0x4654('0x645')]($dataItems),_0x5eb175=['PreApplyJS',_0x4654('0x3d1'),_0x4654('0x433'),'PostDamageJS',_0x4654('0x11d'),_0x4654('0x132'),_0x4654('0x50b'),_0x4654('0x55c')];for(const _0x3246e0 of _0x233281){if(_0x4654('0x242')===_0x4654('0x65b')){function _0x512eef(){if(this['collapseType']()>=0x1)return!![];return this[_0x4654('0x199')]()[_0x4654('0x218')];}}else{if(!_0x3246e0)continue;for(const _0x2ae1f9 of _0x5eb175){VisuMZ[_0x4654('0x1f')][_0x4654('0x6a8')](_0x3246e0,_0x2ae1f9);}const _0x2a5518=_0x3246e0[_0x4654('0x762')];_0x2a5518[_0x4654('0x2a0')](/<ALWAYS CRITICAL/i)&&(_0x3246e0[_0x4654('0x445')]['critical']=!![]);if(_0x2a5518[_0x4654('0x2a0')](/<(?:REPEAT|REPEATS|REPEAT HITS):[ ](\d+)/i)){if(_0x4654('0x689')!=='XmWJW'){function _0x2ac672(){return _0x160e3f;}}else _0x3246e0[_0x4654('0x33f')]=Math['max'](0x1,Number(RegExp['$1']));}if(_0x2a5518[_0x4654('0x2a0')](/<TARGET:[ ](.*)>/i)){if('VNhZN'==='rSuza'){function _0x2af8ce(){_0x321686[_0x4654('0x78b')](0x0,0x0,_0x29aa61[_0x4654('0x44a')],_0x582566[_0x4654('0x482')]);}}else _0x3246e0[_0x4654('0x235')]=String(RegExp['$1'])[_0x4654('0x29d')]()['trim']();}}}},Scene_Boot[_0x4654('0x8d')][_0x4654('0x5ae')]=function(){const _0x131152=$dataActors[_0x4654('0x645')]($dataClasses,$dataWeapons,$dataArmors,$dataEnemies,$dataStates),_0xfcb077=[_0x4654('0x4d9'),_0x4654('0x23c'),_0x4654('0x92'),_0x4654('0x6b5'),_0x4654('0x61a'),_0x4654('0x24f'),_0x4654('0x1e1'),_0x4654('0x602'),_0x4654('0x11d'),_0x4654('0x132'),'PreEndActionJS',_0x4654('0x55c'),_0x4654('0x64c'),_0x4654('0x72e'),_0x4654('0x61e'),'PostEndBattleJS',_0x4654('0x154'),_0x4654('0x434'),_0x4654('0x3f6'),'EscapeFailureJS',_0x4654('0x120'),'PostStartTurnJS',_0x4654('0x735'),_0x4654('0x6ba'),'PreRegenerateJS',_0x4654('0x626')];for(const _0x1cd643 of _0x131152){if(!_0x1cd643)continue;for(const _0xb9fab1 of _0xfcb077){if(_0x4654('0x144')!==_0x4654('0x3e1'))VisuMZ[_0x4654('0x1f')][_0x4654('0x6a8')](_0x1cd643,_0xb9fab1);else{function _0x589f58(){if(this[_0x4654('0x13e')]===_0x393af0)this[_0x4654('0x146')]();return this[_0x4654('0x13e')];}}}const _0x291b57=_0x1cd643[_0x4654('0x762')];}},VisuMZ['BattleCore']['JS']={},VisuMZ[_0x4654('0x1f')][_0x4654('0x6a8')]=function(_0x4fe9e3,_0x4c402b){const _0x4095af=_0x4fe9e3['note'];if(_0x4095af[_0x4654('0x2a0')](VisuMZ[_0x4654('0x1f')][_0x4654('0x62f')][_0x4c402b])){const _0x2b73d8=String(RegExp['$1']),_0x82850d='\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Arguments\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20arguments[0];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20arguments[1];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20obj\x20=\x20arguments[2];\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20value\x20=\x20arguments[3]\x20||\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20originalValue\x20=\x20value;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Declare\x20Constants\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20action\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this\x20:\x20user.currentAction();\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20attacker\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20defender\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20healer\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20receiver\x20=\x20target;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20actor\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20currentClass\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20skill\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this.item()\x20:\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20item\x20=\x20(this.constructor\x20===\x20Game_Action)\x20?\x20this.item()\x20:\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20weapon\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20armor\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20enemy\x20=\x20obj;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20obj;\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Create\x20Compatibility\x20Variables\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20origin\x20=\x20user;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(Imported.VisuMZ_1_SkillsStatesCore\x20&&\x20$dataStates.includes(obj))\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20origin\x20=\x20target.getStateOrigin(obj.id);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Process\x20Code\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20NaN\x20Check\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20(isNaN(value)){\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27NaN\x20value\x20created\x20by\x20%2\x27.format(\x27\x27,obj.name));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27Restoring\x20value\x20to\x20%2\x27.format(\x27\x27,originalValue));\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20value\x20=\x20originalValue;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20//\x20Return\x20Value\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20value;\x0a\x20\x20\x20\x20\x20\x20\x20\x20'[_0x4654('0x31f')](_0x2b73d8),_0x571448=VisuMZ[_0x4654('0x1f')][_0x4654('0xe8')](_0x4fe9e3,_0x4c402b);VisuMZ[_0x4654('0x1f')]['JS'][_0x571448]=new Function(_0x82850d);}},VisuMZ[_0x4654('0x1f')][_0x4654('0xe8')]=function(_0x25bbf6,_0x2c2aab){let _0x32f8d1='';if($dataActors[_0x4654('0x386')](_0x25bbf6))_0x32f8d1=_0x4654('0xec')[_0x4654('0x31f')](_0x25bbf6['id'],_0x2c2aab);if($dataClasses[_0x4654('0x386')](_0x25bbf6))_0x32f8d1=_0x4654('0x455')[_0x4654('0x31f')](_0x25bbf6['id'],_0x2c2aab);if($dataSkills[_0x4654('0x386')](_0x25bbf6))_0x32f8d1=_0x4654('0x679')[_0x4654('0x31f')](_0x25bbf6['id'],_0x2c2aab);if($dataItems[_0x4654('0x386')](_0x25bbf6))_0x32f8d1=_0x4654('0x6ad')[_0x4654('0x31f')](_0x25bbf6['id'],_0x2c2aab);if($dataWeapons[_0x4654('0x386')](_0x25bbf6))_0x32f8d1='Weapon-%1-%2'['format'](_0x25bbf6['id'],_0x2c2aab);if($dataArmors['includes'](_0x25bbf6))_0x32f8d1=_0x4654('0x388')[_0x4654('0x31f')](_0x25bbf6['id'],_0x2c2aab);if($dataEnemies[_0x4654('0x386')](_0x25bbf6))_0x32f8d1=_0x4654('0x3ec')[_0x4654('0x31f')](_0x25bbf6['id'],_0x2c2aab);if($dataStates[_0x4654('0x386')](_0x25bbf6))_0x32f8d1='State-%1-%2'[_0x4654('0x31f')](_0x25bbf6['id'],_0x2c2aab);return _0x32f8d1;},Scene_Boot[_0x4654('0x8d')]['process_VisuMZ_BattleCore_BaseTroops']=function(){const _0x2113f2=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0xb')][_0x4654('0x62a')],_0x3b7fcc=[];for(const _0x3a3068 of _0x2113f2){if(_0x4654('0x20a')===_0x4654('0x691')){function _0x4e8563(){const _0x3d9bfe=this[_0x4654('0x554')][_0x4654('0x67c')];this[_0x4654('0x554')][_0x4654('0x4fe')](0x0,0x0,_0x3d9bfe['width'],_0x3d9bfe[_0x4654('0x2e8')]);}}else{const _0x20a82d=$dataTroops[_0x3a3068];if(_0x20a82d)_0x3b7fcc['push'](JsonEx[_0x4654('0x1a7')](_0x20a82d));}}for(const _0x51251a of $dataTroops){if(_0x4654('0xb6')!==_0x4654('0x131')){if(!_0x51251a)continue;for(const _0x5cd61f of _0x3b7fcc){if(_0x4654('0x1c5')===_0x4654('0x1c5')){if(_0x5cd61f['id']===_0x51251a['id'])continue;_0x51251a[_0x4654('0x6f3')]=_0x51251a[_0x4654('0x6f3')][_0x4654('0x645')](_0x5cd61f['pages']);}else{function _0x471e0b(){this[_0x4654('0x6a0')](_0x59402c),this[_0x4654('0x693')]();}}}}else{function _0x2117a9(){this[_0x4654('0x62e')]()[_0x4654('0x43f')](_0x37f9a1);}}}},Scene_Boot[_0x4654('0x8d')][_0x4654('0x542')]=function(){const _0x49004e=$dataSkills[_0x4654('0x645')]($dataItems);for(const _0x1bd6f0 of _0x49004e){if(!_0x1bd6f0)continue;const _0x4eab6a=_0x1bd6f0[_0x4654('0x762')];if(_0x1bd6f0[_0x4654('0x762')][_0x4654('0x2a0')](/<JS TARGETS>\s*([\s\S]*)\s*<\/JS TARGETS>/i)){const _0x79c6fe=String(RegExp['$1']),_0x3fa52b=VisuMZ[_0x4654('0x1f')]['createKeyJS'](_0x1bd6f0,_0x4654('0x5fb'));VisuMZ[_0x4654('0x1f')]['createTargetsJS'](_0x79c6fe,_0x3fa52b);}if(_0x1bd6f0['note'][_0x4654('0x2a0')](/<JS COMMAND (?:VISIBLE|SHOW|HIDE)>\s*([\s\S]*)\s*<\/JS COMMAND (?:VISIBLE|SHOW|HIDE)>/i)){const _0x31bc94=String(RegExp['$1']),_0x576680=VisuMZ[_0x4654('0x1f')][_0x4654('0xe8')](_0x1bd6f0,'CommandVisible');VisuMZ['BattleCore'][_0x4654('0x32d')](_0x31bc94,_0x576680);}}},VisuMZ[_0x4654('0x1f')][_0x4654('0x63c')]=function(_0x1727d1,_0x182d4c){const _0x18c685=_0x4654('0x66d')['format'](_0x1727d1);VisuMZ[_0x4654('0x1f')]['JS'][_0x182d4c]=new Function(_0x18c685);},VisuMZ[_0x4654('0x1f')][_0x4654('0x32d')]=function(_0x39cd21,_0xec34bd){const _0x27cdbe=_0x4654('0x29b')[_0x4654('0x31f')](_0x39cd21);VisuMZ[_0x4654('0x1f')]['JS'][_0xec34bd]=new Function(_0x27cdbe);},TextManager['autoBattle']=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0xe2')][_0x4654('0x42f')],TextManager['autoBattleStart']=VisuMZ[_0x4654('0x1f')]['Settings'][_0x4654('0x505')][_0x4654('0xa')],TextManager[_0x4654('0x2ce')]=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x505')][_0x4654('0x170')],TextManager[_0x4654('0x6e8')]=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x2a1')][_0x4654('0xee')],ColorManager[_0x4654('0x432')]=function(_0x4cf9a7){if(_0x4cf9a7['match'](/#(.*)/i)){if(_0x4654('0x4d0')===_0x4654('0x49e')){function _0x4bdc2c(){_0x792427[_0x4654('0x445')][_0x4654('0x126')]=!![];}}else return _0x4654('0x83')[_0x4654('0x31f')](String(RegExp['$1']));}else{if(_0x4654('0x1cf')===_0x4654('0xcf')){function _0x44fa4e(){this[_0x4654('0x91')][_0x4654('0x6c9')]=_0x5f1528['prototype']['svBattlerAnchorY'][_0x4654('0x5a5')](this);}}else return this[_0x4654('0x2bb')](Number(_0x4cf9a7));}},DataManager['getDamageStyle']=function(_0x3c8c64){if(_0x3c8c64[_0x4654('0x762')][_0x4654('0x2a0')](/<DAMAGE STYLE:[ ](.*)>/i)){if(_0x4654('0x18c')!==_0x4654('0x605')){const _0x5b7c61=String(RegExp['$1'])[_0x4654('0x29d')]()[_0x4654('0x512')]();if(_0x5b7c61===_0x4654('0x4c6'))return _0x4654('0x4c6');if(VisuMZ[_0x4654('0x484')][_0x5b7c61])return _0x5b7c61;}else{function _0x347694(){if(!_0x4f3adf[_0x4654('0x6e8')])return;const _0x323c0d=_0x1c6ae7[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x2a1')],_0x17f9ad=new _0x28da56();_0x17f9ad[_0x4654('0x34d')]['x']=_0x323c0d[_0x4654('0x118')],_0x17f9ad[_0x4654('0x34d')]['y']=_0x323c0d[_0x4654('0x760')],_0x17f9ad[_0x4654('0x498')]['x']=_0x17f9ad[_0x4654('0x498')]['y']=_0x323c0d[_0x4654('0x1')],this[_0x4654('0x26a')]=_0x17f9ad,this['addChild'](this[_0x4654('0x26a')]);}}}const _0x52ef75=VisuMZ['BattleCore'][_0x4654('0x1f3')][_0x4654('0x3da')][_0x4654('0xfa')][_0x4654('0x29d')]()['trim']();if(VisuMZ[_0x4654('0x484')][_0x52ef75])return _0x52ef75;return _0x4654('0x4c6');},DataManager['getStypeIdWithName']=function(_0x3edefe){_0x3edefe=_0x3edefe[_0x4654('0x29d')]()[_0x4654('0x512')](),this[_0x4654('0x274')]=this[_0x4654('0x274')]||{};if(this[_0x4654('0x274')][_0x3edefe])return this[_0x4654('0x274')][_0x3edefe];for(let _0x1341a2=0x1;_0x1341a2<0x64;_0x1341a2++){if(!$dataSystem[_0x4654('0x249')][_0x1341a2])continue;let _0x2df6a0=$dataSystem[_0x4654('0x249')][_0x1341a2]['toUpperCase']()[_0x4654('0x512')]();_0x2df6a0=_0x2df6a0[_0x4654('0x10b')](/\x1I\[(\d+)\]/gi,''),_0x2df6a0=_0x2df6a0[_0x4654('0x10b')](/\\I\[(\d+)\]/gi,''),this[_0x4654('0x274')][_0x2df6a0]=_0x1341a2;}return this[_0x4654('0x274')][_0x3edefe]||0x0;},DataManager[_0x4654('0xd3')]=function(_0x1e2fd2){_0x1e2fd2=_0x1e2fd2[_0x4654('0x29d')]()[_0x4654('0x512')](),this[_0x4654('0x16e')]=this[_0x4654('0x16e')]||{};if(this['_skillIDs'][_0x1e2fd2])return this['_skillIDs'][_0x1e2fd2];for(const _0x13c5b2 of $dataSkills){if(!_0x13c5b2)continue;this[_0x4654('0x16e')][_0x13c5b2[_0x4654('0x18f')][_0x4654('0x29d')]()[_0x4654('0x512')]()]=_0x13c5b2['id'];}return this[_0x4654('0x16e')][_0x1e2fd2]||0x0;},DataManager[_0x4654('0x164')]=function(_0x2f918e){_0x2f918e=_0x2f918e[_0x4654('0x29d')]()[_0x4654('0x512')](),this[_0x4654('0x2fe')]=this[_0x4654('0x2fe')]||{};if(this[_0x4654('0x2fe')][_0x2f918e])return this[_0x4654('0x2fe')][_0x2f918e];for(const _0x533dc9 of $dataEnemies){if(!_0x533dc9)continue;this['_enemyIDs'][_0x533dc9[_0x4654('0x18f')][_0x4654('0x29d')]()[_0x4654('0x512')]()]=_0x533dc9['id'];}return this[_0x4654('0x2fe')][_0x2f918e]||0x0;},DataManager[_0x4654('0x444')]=function(_0x535a5f){_0x535a5f=_0x535a5f[_0x4654('0x29d')]()['trim'](),this[_0x4654('0x36b')]=this[_0x4654('0x36b')]||{};if(this[_0x4654('0x36b')][_0x535a5f])return this['_wtypeIDs'][_0x535a5f];for(let _0x59fb65=0x1;_0x59fb65<0x64;_0x59fb65++){if(_0x4654('0x754')!==_0x4654('0x754')){function _0x4eb8f2(){const _0x4ba7e1=this[_0x4654('0x701')];if(_0x4ba7e1[_0x226025])return _0x4ba7e1[_0xdeffc4];else{const _0x37512d=new _0x558826();return _0x4ba7e1[_0x1150a3]=_0x37512d,this['addChildToBack'](_0x37512d),this[_0x4654('0x212')](this[_0x4654('0x3f2')]),_0x37512d;}}}else{if(!$dataSystem[_0x4654('0x695')][_0x59fb65])continue;let _0x23a3b2=$dataSystem[_0x4654('0x695')][_0x59fb65][_0x4654('0x29d')]()[_0x4654('0x512')]();_0x23a3b2=_0x23a3b2[_0x4654('0x10b')](/\x1I\[(\d+)\]/gi,''),_0x23a3b2=_0x23a3b2[_0x4654('0x10b')](/\\I\[(\d+)\]/gi,''),this[_0x4654('0x36b')][_0x23a3b2]=_0x59fb65;}}return this['_wtypeIDs'][_0x4654('0x62')]=0x0,this['_wtypeIDs'][_0x535a5f]||0x0;},DataManager['battleDisplayText']=function(_0x1bc955){const _0x1aab32=_0x4654('0x53b');let _0x2b40ff=_0x1bc955[_0x4654('0x70')],_0x5e9a10=_0x1bc955[_0x4654('0x18f')];const _0x4fc7c3=_0x1bc955[_0x4654('0x762')];_0x4fc7c3[_0x4654('0x2a0')](/<DISPLAY ICON: (\d+)>/i)&&(_0x2b40ff=Number(RegExp['$1']));if(_0x4fc7c3[_0x4654('0x2a0')](/<DISPLAY TEXT: (.*)>/i)){if(_0x4654('0x774')!=='jiTvV')_0x5e9a10=String(RegExp['$1']);else{function _0x5f5166(){if(!_0x13eeb5[_0x4654('0x443')]())return;_0x30e1dd[_0x4654('0x476')](_0x50d7c2,_0x322199);const _0x5838d7=_0x4ced91[_0x4654('0x149')],_0x36d63a={'criticalHitRate':_0x1dcf8c['CriticalHitRate'],'criticalHitFlat':_0xed92bc[_0x4654('0x453')],'criticalDmgRate':_0x43ecff[_0x4654('0x6ae')],'criticalDmgFlat':_0x4f52b1[_0x4654('0x14c')],'damageRate':_0x3b0ce3['DamageRate'],'damageFlat':_0x1024ca[_0x4654('0x6')],'hitRate':_0x5cdc9a[_0x4654('0x368')],'hitFlat':_0xdfe2dc['HitFlat']};_0x5838d7[_0x4654('0x2c6')]=_0x36d63a;}}}return _0x1aab32[_0x4654('0x31f')](_0x2b40ff,_0x5e9a10);},DataManager[_0x4654('0x2c4')]=function(_0x1e8faf){if(_0x1e8faf[_0x4654('0x762')][_0x4654('0x2a0')](/<COMMAND TEXT: (.*)>/i)){if('SfsjE'===_0x4654('0x5df'))return String(RegExp['$1']);else{function _0x5ae5d2(){_0x1cdc78['prototype'][_0x4654('0x7b')][_0x4654('0x5a5')](this);}}}else{if(_0x4654('0x70a')==='hNiaz')return _0x1e8faf[_0x4654('0x18f')];else{function _0x1fb48f(){if(!_0x18cf43[_0x4654('0x4f9')]())return;const _0x48ca62=this[_0x4654('0x770')]();if(!_0x48ca62)return;_0x48ca62[_0x4654('0x4d6')](_0x4e8398,_0x26e8c8,_0x4e2bd8);}}}},DataManager['battleCommandIcon']=function(_0x5c1451){if(_0x5c1451[_0x4654('0x762')][_0x4654('0x2a0')](/<COMMAND ICON: (\d+)>/i))return Number(RegExp['$1']);else{if(_0x4654('0x76e')!==_0x4654('0x76e')){function _0x5503f0(){if(!_0x21f7bf[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x44f')][_0x4654('0x796')])return![];if(_0x1b99b1[_0x4654('0xd0')]())return!![];return _0x11c145[_0x4654('0x4d2')]&&_0xf3ac6d[_0x4654('0xe4')]();}}else return _0x5c1451['iconIndex'];}},DataManager[_0x4654('0x26d')]=function(_0x5d137d){const _0x494157=$dataEnemies[_0x5d137d];if(_0x494157){if(_0x4654('0x2f7')===_0x4654('0x4e4')){function _0xdf71bf(){const _0x2e7dd2=this['battleLayoutStyle']();(_0x2e7dd2===_0x4654('0x5eb')||this[_0x4654('0x4b9')]())&&(this['_skillWindow'][_0x4654('0x3f9')](),this[_0x4654('0xbc')][_0x4654('0x4c1')]&&this['_skillWindow'][_0x4654('0x247')](),this[_0x4654('0x150')][_0x4654('0x3f9')](),this['_itemWindow'][_0x4654('0x4c1')]&&this[_0x4654('0x150')][_0x4654('0x247')]());}}else{if(_0x494157[_0x4654('0x762')]['match'](/<SWAP ENEMIES>\s*([\s\S]*)\s*<\/SWAP ENEMIES>/i)){const _0x5148b3=String(RegExp['$1'])[_0x4654('0x5d2')](/[\r\n]+/)[_0x4654('0x314')](''),_0x4cf0f6=this[_0x4654('0x6a')](_0x5148b3);_0x5d137d=this[_0x4654('0x164')](_0x4cf0f6)||_0x5d137d,_0x5d137d=DataManager[_0x4654('0x26d')](_0x5d137d);}}}return _0x5d137d;},DataManager[_0x4654('0x6a')]=function(_0x1b9f2b){let _0xc19826=0x0;const _0x21d488={};for(const _0x1eb46a of _0x1b9f2b){if(_0x4654('0x2cf')!==_0x4654('0x2cf')){function _0x5cac67(){if(this[_0x4654('0x6c7')]())return _0x3da68d;return _0x3ca913=this[_0x4654('0x745')](_0x13ecb3),_0x2881c7=this[_0x4654('0x65')](_0x23383b),_0x468359;}}else{if(_0x1eb46a[_0x4654('0x2a0')](/(.*):[ ](\d+)/i)){if(_0x4654('0x67d')===_0x4654('0x5d7')){function _0x268f0b(){const _0x209e59=_0x330e24['x']+_0x2b8c17[_0x4654('0x6f0')]((_0x5d4e4f[_0x4654('0x564')]-_0x24daf5)/0x2);this[_0x4654('0x16f')](_0x48ae0f,_0x209e59,_0x5b5966['y'],_0x3d3e04);}}else{const _0x4a0f62=String(RegExp['$1'])[_0x4654('0x512')](),_0x1c3930=Number(RegExp['$2']);_0x21d488[_0x4a0f62]=_0x1c3930,_0xc19826+=_0x1c3930;}}else{if(_0x1eb46a['match'](/(.*):[ ](\d+\.?\d+)/i)){const _0x1dda32=String(RegExp['$1'])[_0x4654('0x512')](),_0x18d99a=Number(RegExp['$2']);_0x21d488[_0x1dda32]=_0x18d99a,_0xc19826+=_0x18d99a;}else _0x1eb46a!==''&&(_0x21d488[_0x1eb46a]=0x1,_0xc19826++);}}}if(_0xc19826<=0x0)return'';let _0x2b669d=Math[_0x4654('0x1bc')]()*_0xc19826;for(const _0x1374c5 in _0x21d488){_0x2b669d-=_0x21d488[_0x1374c5];if(_0x2b669d<=0x0)return _0x1374c5;}return'';},ConfigManager[_0x4654('0x6b6')]=![],ConfigManager[_0x4654('0x3f7')]=![],ConfigManager[_0x4654('0x6e8')]=!![],VisuMZ['BattleCore'][_0x4654('0x133')]=ConfigManager[_0x4654('0x442')],ConfigManager[_0x4654('0x442')]=function(){const _0x919d40=VisuMZ['BattleCore'][_0x4654('0x133')][_0x4654('0x5a5')](this);return _0x919d40[_0x4654('0x6b6')]=this[_0x4654('0x6b6')],_0x919d40[_0x4654('0x3f7')]=this[_0x4654('0x3f7')],_0x919d40[_0x4654('0x6e8')]=this['visualHpGauge'],_0x919d40;},VisuMZ[_0x4654('0x1f')][_0x4654('0x3fa')]=ConfigManager[_0x4654('0x15e')],ConfigManager[_0x4654('0x15e')]=function(_0x499295){VisuMZ[_0x4654('0x1f')][_0x4654('0x3fa')]['call'](this,_0x499295);'autoBattleAtStart'in _0x499295?this[_0x4654('0x6b6')]=_0x499295[_0x4654('0x6b6')]:this[_0x4654('0x6b6')]=![];'autoBattleUseSkills'in _0x499295?this[_0x4654('0x3f7')]=_0x499295['autoBattleUseSkills']:this[_0x4654('0x3f7')]=![];if(_0x4654('0x6e8')in _0x499295)this[_0x4654('0x6e8')]=_0x499295[_0x4654('0x6e8')];else{if(_0x4654('0x62c')!=='mLFhj'){function _0x5de382(){return this[_0x4654('0x4af')]();}}else this[_0x4654('0x6e8')]=!![];}},VisuMZ['BattleCore'][_0x4654('0x649')]=BattleManager[_0x4654('0x416')],BattleManager[_0x4654('0x416')]=function(){VisuMZ[_0x4654('0x1f')][_0x4654('0x649')][_0x4654('0x5a5')](this),this[_0x4654('0x4fc')]=[];},BattleManager[_0x4654('0x5e3')]=function(){if(BattleManager[_0x4654('0x268')]())return _0x4654('0x467');return'DTB';},BattleManager[_0x4654('0x240')]=function(_0xa07e49){return _0xa07e49=_0xa07e49['toUpperCase']()[_0x4654('0x512')](),this[_0x4654('0x5e3')]()===_0xa07e49;},BattleManager[_0x4654('0x3c6')]=function(){return this[_0x4654('0x240')](_0x4654('0x467'));},BattleManager[_0x4654('0x1a9')]=function(){return this['isBattleSys'](_0x4654('0x6e9'));},BattleManager[_0x4654('0x209')]=function(){return this[_0x4654('0x1a9')]();},BattleManager['isTickBased']=function(){return!this[_0x4654('0x209')]();},BattleManager[_0x4654('0x2d6')]=function(_0x4b3bff){$gameParty[_0x4654('0x2d6')](_0x4b3bff),$gameTroop[_0x4654('0x2d6')](_0x4b3bff);},VisuMZ[_0x4654('0x1f')][_0x4654('0x2d1')]=BattleManager[_0x4654('0x738')],BattleManager[_0x4654('0x738')]=function(){this[_0x4654('0x785')]=ConfigManager[_0x4654('0x6b6')],this[_0x4654('0x2d6')](_0x4654('0x64c')),VisuMZ[_0x4654('0x1f')][_0x4654('0x2d1')][_0x4654('0x5a5')](this),this[_0x4654('0x2d6')](_0x4654('0x72e'));},BattleManager['processPostBattleCommonEvents']=function(_0x59ec7a){const _0x2cc231=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0xb')];if(_0x2cc231[_0x4654('0x4bf')]){if(_0x4654('0x6bc')!==_0x4654('0x5f6'))$gameTemp[_0x4654('0x4bc')](_0x2cc231[_0x4654('0x4bf')]);else{function _0x5ddd3a(){_0x530148=_0x5d454d(_0x228925['$1']);}}}const _0xdb5433=_0x4654('0x409')['format'](_0x59ec7a);if(_0x2cc231[_0xdb5433]){if('YAuCU'===_0x4654('0x1eb')){function _0x24f71c(){const _0x21f7be=this['getNextSubjectFromPool']();if(!_0x21f7be)return null;if(_0x21f7be[_0x4654('0x358')]()&&_0x21f7be[_0x4654('0x36f')]())return _0x21f7be;}}else $gameTemp[_0x4654('0x4bc')](_0x2cc231[_0xdb5433]);}},VisuMZ[_0x4654('0x1f')][_0x4654('0x125')]=BattleManager['processVictory'],BattleManager[_0x4654('0x174')]=function(){this['processBattleCoreJS'](_0x4654('0x154')),VisuMZ[_0x4654('0x1f')][_0x4654('0x125')][_0x4654('0x5a5')](this),this['processPostBattleCommonEvents']('Victory');},VisuMZ[_0x4654('0x1f')][_0x4654('0x116')]=BattleManager[_0x4654('0x536')],BattleManager[_0x4654('0x536')]=function(){this[_0x4654('0x2d6')](_0x4654('0x434')),VisuMZ['BattleCore']['BattleManager_processDefeat'][_0x4654('0x5a5')](this),this[_0x4654('0x11')](_0x4654('0x17d'));},VisuMZ[_0x4654('0x1f')][_0x4654('0x6f8')]=BattleManager[_0x4654('0x4e7')],BattleManager[_0x4654('0x4e7')]=function(_0x518ec2){this[_0x4654('0x785')]=![],this[_0x4654('0x2d6')](_0x4654('0x61e')),VisuMZ[_0x4654('0x1f')][_0x4654('0x6f8')][_0x4654('0x5a5')](this,_0x518ec2),this[_0x4654('0x2d6')](_0x4654('0xdf'));},VisuMZ[_0x4654('0x1f')][_0x4654('0x367')]=BattleManager[_0x4654('0x29f')],BattleManager[_0x4654('0x29f')]=function(){if(this['isTurnBased']())this[_0x4654('0x2d6')](_0x4654('0x120'));VisuMZ[_0x4654('0x1f')][_0x4654('0x367')]['call'](this);if(this[_0x4654('0x209')]())this['processBattleCoreJS'](_0x4654('0x50c'));},VisuMZ[_0x4654('0x1f')][_0x4654('0x25')]=BattleManager[_0x4654('0x1bd')],BattleManager[_0x4654('0x1bd')]=function(){const _0x68ef9f=this[_0x4654('0x672')][_0x4654('0x5aa')]();if(_0x68ef9f)_0x68ef9f['actionBattleCoreJS'](_0x4654('0x11d'));VisuMZ[_0x4654('0x1f')][_0x4654('0x25')][_0x4654('0x5a5')](this);if(_0x68ef9f)_0x68ef9f[_0x4654('0x673')](_0x4654('0x132'));},VisuMZ['BattleCore']['BattleManager_endAction']=BattleManager[_0x4654('0x273')],BattleManager[_0x4654('0x273')]=function(){const _0x55ed96=this[_0x4654('0x149')];if(_0x55ed96)_0x55ed96[_0x4654('0x673')](_0x4654('0x50b'));VisuMZ[_0x4654('0x1f')][_0x4654('0x40d')][_0x4654('0x5a5')](this);if(_0x55ed96)_0x55ed96[_0x4654('0x673')](_0x4654('0x55c'));},BattleManager[_0x4654('0x408')]=function(){if(!this[_0x4654('0x2f')]['isBusy']()){if(_0x4654('0x665')===_0x4654('0x665'))this[_0x4654('0x273')]();else{function _0x263a04(){return this[_0x4654('0x522')][_0x4654('0x2e1')]();}}}},BattleManager[_0x4654('0x65d')]=function(){this[_0x4654('0x2e2')]=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')]['Mechanics'][_0x4654('0x80')][_0x4654('0x5a5')](this);},VisuMZ[_0x4654('0x1f')][_0x4654('0x56a')]=BattleManager[_0x4654('0x712')],BattleManager['onEscapeSuccess']=function(){this['processBattleCoreJS'](_0x4654('0x3f6')),VisuMZ[_0x4654('0x1f')][_0x4654('0x56a')][_0x4654('0x5a5')](this),this[_0x4654('0x11')](_0x4654('0x2c7'));},VisuMZ[_0x4654('0x1f')][_0x4654('0x21a')]=BattleManager[_0x4654('0x285')],BattleManager['onEscapeFailure']=function(){this[_0x4654('0x2d6')](_0x4654('0x723'));const _0x3429cc=this[_0x4654('0x2e2')];VisuMZ[_0x4654('0x1f')][_0x4654('0x21a')][_0x4654('0x5a5')](this),this[_0x4654('0x2e2')]=_0x3429cc+VisuMZ['BattleCore']['Settings'][_0x4654('0xb')][_0x4654('0x4b2')][_0x4654('0x5a5')](this),this['processPostBattleCommonEvents']('EscapeFail');},BattleManager[_0x4654('0x717')]=function(){let _0x4218e8=![];if(this[_0x4654('0x195')]()){if(_0x4654('0x184')===_0x4654('0x16c')){function _0x43bf09(){if(!this[_0x4654('0x6cd')][_0x4654('0x5a6')]())return;while(this[_0x4654('0x6cd')][_0x4654('0x5a6')]()){this[_0x4654('0x6cd')]['isSpriteVisible']()&&this[_0x4654('0x372')]();}this['_battler'][_0x4654('0x3a4')](),this[_0x4654('0x6cd')][_0x4654('0x415')]();}}else for(const _0x39bc01 of $gameTroop[_0x4654('0x1bf')]()){this['_logWindow'][_0x4654('0x128')](_0x4654('0x261'),TextManager[_0x4654('0x663')][_0x4654('0x31f')](_0x39bc01)),this[_0x4654('0x2f')]['push'](_0x4654('0x20d')),_0x4218e8=!![];}}if(this[_0x4654('0x1b7')]){if(_0x4654('0x595')!==_0x4654('0x51'))this[_0x4654('0x2f')][_0x4654('0x128')]('addText',TextManager['preemptive'][_0x4654('0x31f')]($gameParty['name']())),this[_0x4654('0x2f')][_0x4654('0x128')](_0x4654('0x20d'));else{function _0x5c873a(){if(this['constructor']===_0x2ac8b2)return;_0x809eab[_0x4654('0x8d')][_0x4654('0x3fe')][_0x4654('0x5a5')](this);}}}else this[_0x4654('0x63e')]&&(this[_0x4654('0x2f')][_0x4654('0x128')](_0x4654('0x261'),TextManager['surprise'][_0x4654('0x31f')]($gameParty[_0x4654('0x18f')]())),this['_logWindow']['push'](_0x4654('0x20d')));if(_0x4218e8){if(_0x4654('0x539')===_0x4654('0x4d8')){function _0x44146a(){if(!_0x13bef2['isSceneBattle']())return;if(!_0x373b62[_0x4654('0x210')])return;_0x19a874[_0x4654('0x476')](_0x2dedd7,_0xb9b3e3);const _0x4a0add=_0x658879[_0x4654('0x779')](),_0xc8c98a=_0x195e84[_0x4654('0x6e1')];if(!_0x4a0add)return;_0x14dcb9[_0x4654('0x391')](_0x59737d[_0x4654('0x1')],_0x49e8f8[_0x4654('0x44a')],_0x2cad3e[_0x4654('0x482')]);if(_0xc8c98a)_0x4a0add[_0x4654('0xbd')](_0x4654('0x76c'));}}else this['_logWindow'][_0x4654('0x128')]('wait'),this[_0x4654('0x2f')][_0x4654('0x128')]('clear');}if(this[_0x4654('0x268')]()&&this['isSkipPartyCommandWindow']()){if(_0x4654('0x1bb')!==_0x4654('0x1bb')){function _0x1c545f(){this[_0x4654('0x15d')]();}}else this['_tpbNeedsPartyCommand']=![];}},BattleManager[_0x4654('0x195')]=function(){if(BattleManager['_autoBattle'])return![];return VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x51a')][_0x4654('0x5a2')];},VisuMZ['BattleCore'][_0x4654('0x2e')]=BattleManager[_0x4654('0x1d9')],BattleManager[_0x4654('0x1d9')]=function(){VisuMZ[_0x4654('0x1f')][_0x4654('0x2e')][_0x4654('0x5a5')](this),this[_0x4654('0x1a9')]()&&this[_0x4654('0x3cf')]()&&!this['_surprise']&&$gameParty[_0x4654('0x15b')]()&&this[_0x4654('0x48')]();},BattleManager['isSkipPartyCommandWindow']=function(){return VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0xe2')][_0x4654('0x6be')];},BattleManager[_0x4654('0x590')]=function(_0x167523,_0x4b167f){this['_action'][_0x4654('0x73')]=_0x4b167f,this[_0x4654('0x2f')][_0x4654('0x688')](_0x4b167f),this[_0x4654('0x2f')][_0x4654('0x175')](_0x167523,this['_action']),this[_0x4654('0x149')][_0x4654('0x1c1')](_0x167523),this[_0x4654('0x2f')]['displayActionResults'](_0x167523,_0x167523);},VisuMZ[_0x4654('0x1f')][_0x4654('0x109')]=BattleManager[_0x4654('0xc')],BattleManager[_0x4654('0xc')]=function(_0x344f01){if(this[_0x4654('0x234')]===_0x4654('0x370'))this['updateCustomActionSequence']();else this[_0x4654('0x234')]==='forceAction'?this[_0x4654('0x435')]():VisuMZ['BattleCore'][_0x4654('0x109')][_0x4654('0x5a5')](this,_0x344f01);},BattleManager['prepareCustomActionSequence']=function(){this[_0x4654('0x12e')]=this['_targets'][_0x4654('0x2db')](0x0),this[_0x4654('0x75e')]=0x0,this[_0x4654('0xa3')]=this[_0x4654('0x12e')][0x0]||null,this[_0x4654('0x234')]=_0x4654('0x370');},BattleManager['updateCustomActionSequence']=function(){if(!this[_0x4654('0x4d3')]()&&!this[_0x4654('0x2f')][_0x4654('0x77a')]()){if(_0x4654('0x102')===_0x4654('0x528')){function _0x123ea7(){const _0x2aacaa=_0x1e5f6b[_0x4654('0x8d')][_0x4654('0x658')](),_0x4ad11f=_0x25c3ba[_0x4654('0x46b')],_0x137fe8=this[_0x4654('0x6c')]()+_0x2aacaa,_0x5a19af=0x0,_0x3b1ddc=_0x4cfd0c[_0x4654('0x37f')]-_0x137fe8+_0x2aacaa;return new _0x3d3a34(_0x5a19af,_0x3b1ddc,_0x4ad11f,_0x137fe8);}}else this['_phase']=_0x4654('0x3ad');}},BattleManager['forceAction']=function(_0x35f409){this[_0x4654('0x522')][_0x4654('0x314')](_0x35f409);const _0x289192=JsonEx[_0x4654('0x1a7')](_0x35f409[_0x4654('0x5aa')]());this[_0x4654('0x4fc')][_0x4654('0x128')]([_0x35f409,_0x289192]);},BattleManager['processForcedAction']=function(){},BattleManager[_0x4654('0x771')]=function(){if(this[_0x4654('0x268')]())this[_0x4654('0x234')]='turn';else{if(this[_0x4654('0x4fc')][_0x4654('0x0')]>0x0)this[_0x4654('0x234')]=_0x4654('0x2cb');else{if(_0x4654('0x56b')!==_0x4654('0x57c'))this[_0x4654('0x1d9')]();else{function _0xdeb93d(){const _0x5bd144=_0x5d5e47['isActor']()?_0x3f4ed3[_0x4654('0x42c')]:_0x58e250['message2'];_0x5bd144&&_0x55998c[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x5be')][_0x4654('0x775')]&&(this['push']('popBaseLine'),this[_0x4654('0x128')](_0x4654('0x2e4')),this[_0x4654('0x128')](_0x4654('0x261'),_0x5bd144['format'](_0x5ebd74[_0x4654('0x18f')]()))),_0x1c30d9['id']===_0x283079['deathStateId']()&&this[_0x4654('0x128')](_0x4654('0x465'),_0x53a4a0);}}}}},BattleManager[_0x4654('0x173')]=function(){for(;;){if('KJEKC'===_0x4654('0x3b0')){function _0x6d76bb(){_0x5b3650[_0x4654('0x1f')][_0x4654('0x27a')][_0x4654('0x5a5')](this,_0x2a31e4,_0x449748),this[_0x4654('0x223')]();}}else{const _0x1f000e=this[_0x4654('0x79a')]();if(!_0x1f000e){if('jJhXR'!==_0x4654('0x9e'))return null;else{function _0x5152cf(){if(!_0x2d3f0d[_0x4654('0x443')]())return;if(!this['battler']())return;if(_0x2c8540['length']<=0x0)return;_0xcd47d6=_0x1ac747||{},_0x233362[_0x4654('0x2bb')]=_0x2e9d37[_0x4654('0x2bb')]||_0x4654('0x716'),_0x5850db[_0x4654('0x47d')]=_0x250b26[_0x4654('0x47d')]||[0x0,0x0,0x0,0x0],_0x27bcf1[_0x4654('0x560')]=_0x2560de[_0x4654('0x560')]||0x0,this[_0x4654('0x770')]()['setupTextPopup'](_0x38c7f2,_0xefcac4);}}}if(_0x1f000e[_0x4654('0x358')]()&&_0x1f000e[_0x4654('0x36f')]())return _0x1f000e;}}},BattleManager[_0x4654('0x79a')]=function(){if(this[_0x4654('0x4fc')][_0x4654('0x0')]>0x0){const _0x567387=this[_0x4654('0x4fc')][_0x4654('0x2e1')](),_0x3f1b64=_0x567387[0x0];return _0x3f1b64[_0x4654('0x196')]=_0x3f1b64[_0x4654('0x196')]||[],_0x3f1b64['_actions'][0x0]=_0x567387[0x1],_0x3f1b64;}else return this[_0x4654('0x522')]['shift']();},Game_Interpreter['prototype']['command339']=function(_0x26ec28){return this['iterateBattler'](_0x26ec28[0x0],_0x26ec28[0x1],_0x178a7f=>{if('YKJOU'!==_0x4654('0x5b4'))!_0x178a7f[_0x4654('0x33a')]()&&(_0x178a7f[_0x4654('0x98')](_0x26ec28[0x2],_0x26ec28[0x3]),BattleManager[_0x4654('0x98')](_0x178a7f));else{function _0x194a29(){if(_0x191233[_0x4654('0x785')])return![];return _0x4e88ab[_0x4654('0x1f')][_0x4654('0x1f3')]['Enemy'][_0x4654('0x5a2')];}}}),!![];},SceneManager[_0x4654('0x443')]=function(){return this['_scene']&&this[_0x4654('0xda')][_0x4654('0x1de')]===Scene_Battle;},SceneManager[_0x4654('0x8e')]=function(){return Spriteset_Battle[_0x4654('0x8d')][_0x4654('0x122')]();},SceneManager[_0x4654('0x1b1')]=function(){if(SceneManager[_0x4654('0x66b')](Scene_Options))return!![];return![];},SceneManager[_0x4654('0x40c')]=function(){if(SceneManager['isNextScene'](Scene_Options))return!![];return![];},VisuMZ['BattleCore'][_0x4654('0x1ba')]=Game_Temp[_0x4654('0x8d')][_0x4654('0xcb')],Game_Temp[_0x4654('0x8d')]['requestAnimation']=function(_0x55abd1,_0x3bfce0,_0x5c2d37){_0x55abd1=_0x55abd1['filter']((_0x3f0443,_0x48b38d,_0x38f3a5)=>_0x38f3a5['indexOf'](_0x3f0443)===_0x48b38d),SceneManager[_0x4654('0x443')]()&&SceneManager[_0x4654('0x8e')]()&&(_0x5c2d37=!_0x5c2d37),VisuMZ['BattleCore'][_0x4654('0x1ba')][_0x4654('0x5a5')](this,_0x55abd1,_0x3bfce0,_0x5c2d37),SceneManager[_0x4654('0x443')]()&&BattleManager['_spriteset'][_0x4654('0x379')]();},Game_Temp[_0x4654('0x8d')][_0x4654('0x52f')]=function(_0x76c52d){this[_0x4654('0xb7')]=_0x76c52d;},Game_Temp['prototype'][_0x4654('0x779')]=function(){return this[_0x4654('0xb7')];},VisuMZ[_0x4654('0x1f')][_0x4654('0x32c')]=Game_System['prototype'][_0x4654('0x278')],Game_System[_0x4654('0x8d')][_0x4654('0x278')]=function(){VisuMZ[_0x4654('0x1f')]['Game_System_initialize']['call'](this),this['initBattleCore']();},Game_System[_0x4654('0x8d')][_0x4654('0x16b')]=function(){this[_0x4654('0x1cc')]=this[_0x4654('0x1cc')]||[];},Game_System['prototype'][_0x4654('0x47a')]=function(){if(this[_0x4654('0x1cc')]===undefined)this[_0x4654('0x311')]();return this[_0x4654('0x1cc')];},Game_System[_0x4654('0x8d')][_0x4654('0x50')]=function(_0x4eb9a9){if(this[_0x4654('0x1cc')]===undefined)this[_0x4654('0x311')]();if(!_0x4eb9a9)return;if(this['_defeatedEnemies'][_0x4654('0x386')](_0x4eb9a9))return;this[_0x4654('0x1cc')][_0x4654('0x128')](_0x4eb9a9),this[_0x4654('0x1cc')][_0x4654('0xbb')]((_0x140acb,_0x4a4ff6)=>_0x140acb-_0x4a4ff6);},VisuMZ[_0x4654('0x1f')][_0x4654('0x696')]=Game_BattlerBase[_0x4654('0x8d')]['addNewState'],Game_BattlerBase[_0x4654('0x8d')]['addNewState']=function(_0x240692){const _0xf8119f=this[_0x4654('0x36f')]();VisuMZ[_0x4654('0x1f')]['Game_BattlerBase_addNewState'][_0x4654('0x5a5')](this,_0x240692),this[_0x4654('0x2c')]()&&_0xf8119f&&this[_0x4654('0x6f4')]()&&(this['_visualHpGauge_JustDied']=!this[_0x4654('0x487')](),$gameSystem[_0x4654('0x50')](this[_0x4654('0x89')]()));},Game_Enemy['prototype'][_0x4654('0x487')]=function(){return $gameSystem['getDefeatedEnemies']()[_0x4654('0x386')](this[_0x4654('0x69e')]);},VisuMZ['BattleCore'][_0x4654('0x61')]=Game_BattlerBase['prototype'][_0x4654('0x49a')],Game_BattlerBase[_0x4654('0x8d')][_0x4654('0x49a')]=function(_0x50ebd6){VisuMZ[_0x4654('0x1f')][_0x4654('0x61')][_0x4654('0x5a5')](this,_0x50ebd6);if(this[_0x4654('0x2c')]()&&_0x50ebd6===this[_0x4654('0x8')]()&&this[_0x4654('0x36f')]()){if('BrBVE'!==_0x4654('0x4b3'))this[_0x4654('0x4e8')]=![];else{function _0x1bde7f(){_0x481dff[_0x4654('0x1f')][_0x4654('0x4ef')][_0x4654('0x5a5')](this),this[_0x4654('0x3ca')]();}}}},VisuMZ[_0x4654('0x1f')][_0x4654('0x5e9')]=Game_Action[_0x4654('0x8d')]['clear'],Game_Action['prototype'][_0x4654('0x2a9')]=function(){VisuMZ[_0x4654('0x1f')][_0x4654('0x5e9')][_0x4654('0x5a5')](this),this[_0x4654('0x48c')]={'arPenRate':0x0,'arPenFlat':0x0,'arRedRate':0x0,'arRedFlat':0x0},this[_0x4654('0x2c6')]={'criticalHitRate':0x1,'criticalHitFlat':0x0,'criticalDmgRate':0x1,'criticalDmgFlat':0x0,'damageRate':0x1,'damageFlat':0x0,'hitRate':0x1,'hitFlat':0x0};},Game_Action['prototype'][_0x4654('0x20c')]=function(_0x3b1269,_0x3148b1){return VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x3da')][_0x4654('0x4e3')][_0x4654('0x5a5')](this,_0x3b1269,_0x3148b1);},Game_Action[_0x4654('0x8d')][_0x4654('0x152')]=function(_0x50482a,_0x2c9796){return VisuMZ['BattleCore'][_0x4654('0x1f3')][_0x4654('0x3da')][_0x4654('0x2')][_0x4654('0x5a5')](this,_0x50482a,_0x2c9796);},Game_Action[_0x4654('0x8d')][_0x4654('0x4c5')]=function(_0x4c4a85,_0x25f590){return VisuMZ[_0x4654('0x1f')]['Settings'][_0x4654('0x3da')][_0x4654('0x4a7')][_0x4654('0x5a5')](this,_0x4c4a85,_0x25f590);},VisuMZ[_0x4654('0x1f')][_0x4654('0x340')]=Game_Action[_0x4654('0x8d')][_0x4654('0x742')],Game_Action[_0x4654('0x8d')][_0x4654('0x742')]=function(_0x5e1b9d){const _0x3dca0b=this[_0x4654('0x1f7')]()[_0x4654('0x762')];if(_0x3dca0b['match'](/<ALWAYS HIT>/i))return 0x1;else{if(_0x3dca0b['match'](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return Number(RegExp['$1'])/0x64;else{let _0x20203d=VisuMZ[_0x4654('0x1f')][_0x4654('0x340')][_0x4654('0x5a5')](this,_0x5e1b9d);return _0x20203d=this[_0x4654('0x2c6')]['hitRate']*_0x20203d+this[_0x4654('0x2c6')][_0x4654('0x475')],_0x20203d;}}},Game_Action[_0x4654('0x8d')]['itemCri']=function(_0xd918c6){if(!this['item']()['damage'][_0x4654('0x126')])return 0x0;let _0x5279a6=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')]['Damage'][_0x4654('0x76')][_0x4654('0x5a5')](this,_0xd918c6);return _0x5279a6=this[_0x4654('0x2c6')][_0x4654('0x690')]*_0x5279a6+this[_0x4654('0x2c6')]['criticalHitFlat'],_0x5279a6;},Game_Action[_0x4654('0x8d')][_0x4654('0x604')]=function(_0x14d3aa){return _0x14d3aa=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x3da')]['CriticalHitMultiplier'][_0x4654('0x5a5')](this,_0x14d3aa),_0x14d3aa=this[_0x4654('0x2c6')][_0x4654('0x2bd')]*_0x14d3aa+this[_0x4654('0x2c6')][_0x4654('0x71d')],_0x14d3aa;},VisuMZ[_0x4654('0x1f')][_0x4654('0x6c6')]=Game_Action[_0x4654('0x8d')][_0x4654('0x36a')],Game_Action[_0x4654('0x8d')][_0x4654('0x36a')]=function(_0x31becb){const _0x2f343b=DataManager[_0x4654('0x3b4')](this[_0x4654('0x1f7')]());if(_0x2f343b===_0x4654('0x4c6')){if('jfFNd'!=='lpSAI')return VisuMZ[_0x4654('0x1f')][_0x4654('0x6c6')][_0x4654('0x5a5')](this,_0x31becb);else{function _0x218e31(){const _0x1d5054=_0xc24dd6[_0x365e1e];if(_0x1d5054){if(_0x1d5054[_0x4654('0x762')][_0x4654('0x2a0')](/<SWAP ENEMIES>\s*([\s\S]*)\s*<\/SWAP ENEMIES>/i)){const _0x2c19df=_0x259e08(_0x41d288['$1'])['split'](/[\r\n]+/)[_0x4654('0x314')](''),_0x5b9fdd=this[_0x4654('0x6a')](_0x2c19df);_0x14835d=this[_0x4654('0x164')](_0x5b9fdd)||_0x7cce08,_0x465023=_0x5cfcc4['swapEnemyIDs'](_0xfee7ca);}}return _0x3ab6ed;}}}else{if(_0x4654('0x759')!=='khOXb')return this['evalDamageFormulaBattleCore'](_0x31becb);else{function _0x4e144e(){this[_0x4654('0x3c7')]=0x8;}}}},Game_Action['prototype'][_0x4654('0x30b')]=function(){if(this[_0x4654('0x1f7')]()['note'][_0x4654('0x2a0')](/<DAMAGE STYLE:[ ](.*)>/i)){if(_0x4654('0x3a5')==='PcDwj'){const _0x42f4c6=String(RegExp['$1'])[_0x4654('0x29d')]()[_0x4654('0x512')]();return _0x42f4c6;}else{function _0xc54d71(){if(!_0x33a65e['isSceneBattle']())return;const _0x3153ff=_0x43a307[_0x4654('0x779')]();if(!_0x3153ff)return;_0x3153ff[_0x4654('0xbd')](_0x4654('0x290'));}}}return _0x4654('0x4c6');},Game_Action[_0x4654('0x8d')][_0x4654('0x532')]=function(_0xc593f2){const _0xa44703=DataManager[_0x4654('0x3b4')](this[_0x4654('0x1f7')]()),_0x13135f=VisuMZ[_0x4654('0x484')][_0xa44703];try{if('tEuSk'!==_0x4654('0x755'))return _0x13135f[_0x4654('0x60b')][_0x4654('0x5a5')](this,_0xc593f2);else{function _0x46135b(){this[_0x4654('0x33b')]['x']=_0x471f56[_0x4654('0x564')]-(_0x40f9b9[_0x4654('0x564')]-_0x42d207[_0x4654('0x46b')])/0x2-this[_0x4654('0x33b')][_0x4654('0x564')]-0x4;}}}catch(_0x25a58c){if($gameTemp[_0x4654('0x4cc')]())console[_0x4654('0x640')](_0x25a58c);return VisuMZ[_0x4654('0x1f')][_0x4654('0x6c6')][_0x4654('0x5a5')](this);}},Game_Action[_0x4654('0x8d')][_0x4654('0xe3')]=function(_0x23fa9e,_0x52279b){if(this[_0x4654('0x6c5')]())return _0x52279b;const _0x1da51c=this['subject'](),_0x4fc006=_0x23fa9e;let _0x168c5a=[],_0x43625d=[];_0x168c5a[_0x4654('0x128')](this[_0x4654('0x48c')][_0x4654('0x23d')],this[_0x4654('0x48c')]['arRedFlat']),_0x43625d[_0x4654('0x128')](this[_0x4654('0x48c')][_0x4654('0x282')],this[_0x4654('0x48c')]['arRedRate']);const _0x1a8893=this['isPhysical']()?/<ARMOR REDUCTION:[ ](\d+\.?\d*)>/i:/<MAGIC REDUCTION:[ ](\d+\.?\d*)>/i,_0x3058a0=this[_0x4654('0x466')]()?/<ARMOR REDUCTION:[ ](\d+\.?\d*)([%％])>/i:/<MAGIC REDUCTION:[ ](\d+\.?\d*)([%％])>/i,_0x2a853e=this[_0x4654('0x466')]()?/<ARMOR PENETRATION:[ ](\d+\.?\d*)>/i:/<MAGIC PENETRATION:[ ](\d+\.?\d*)>/i,_0x41eb70=this[_0x4654('0x466')]()?/<ARMOR PENETRATION:[ ](\d+\.?\d*)([%％])>/i:/<MAGIC PENETRATION:[ ](\d+\.?\d*)([%％])>/i;_0x168c5a=_0x168c5a[_0x4654('0x645')](_0x4fc006[_0x4654('0x11f')]()[_0x4654('0x538')](_0x50e78c=>_0x50e78c&&_0x50e78c['note'][_0x4654('0x2a0')](_0x1a8893)?Number(RegExp['$1']):0x0)),_0x43625d=_0x43625d[_0x4654('0x645')](_0x4fc006[_0x4654('0x11f')]()['map'](_0x1f02e6=>_0x1f02e6&&_0x1f02e6[_0x4654('0x762')][_0x4654('0x2a0')](_0x3058a0)?Number(RegExp['$1'])/0x64:0x0)),_0x168c5a=_0x168c5a[_0x4654('0x645')](_0x1da51c[_0x4654('0x11f')]()[_0x4654('0x538')](_0x4875e9=>_0x4875e9&&_0x4875e9[_0x4654('0x762')][_0x4654('0x2a0')](_0x2a853e)?Number(RegExp['$1']):0x0)),_0x43625d=_0x43625d[_0x4654('0x645')](_0x1da51c[_0x4654('0x11f')]()['map'](_0x48012a=>_0x48012a&&_0x48012a[_0x4654('0x762')][_0x4654('0x2a0')](_0x41eb70)?Number(RegExp['$1'])/0x64:0x0));this[_0x4654('0x1f7')]()[_0x4654('0x762')][_0x4654('0x2a0')](_0x2a853e)&&_0x168c5a[_0x4654('0x128')](Number(RegExp['$1']));if(this[_0x4654('0x1f7')]()[_0x4654('0x762')][_0x4654('0x2a0')](_0x41eb70)){if(_0x4654('0x5bf')===_0x4654('0x5bf'))_0x43625d[_0x4654('0x128')](Number(RegExp['$1']));else{function _0x5977eb(){this[_0x4654('0x741')](_0x4654('0x5d9'));}}}return _0x52279b=_0x168c5a['reduce']((_0x4ff6e8,_0x59bf0a)=>_0x4ff6e8-_0x59bf0a,_0x52279b),_0x52279b>0x0&&(_0x52279b=_0x43625d[_0x4654('0x644')]((_0x480934,_0x35f158)=>_0x480934*(0x1-_0x35f158),_0x52279b)),_0x52279b;},VisuMZ[_0x4654('0x1f')][_0x4654('0x376')]=Game_Action['prototype']['executeDamage'],Game_Action[_0x4654('0x8d')][_0x4654('0x10')]=function(_0x1ceed6,_0x13e644){_0x13e644=_0x13e644*this['_multipliers']['damageRate'],_0x13e644+=this['_multipliers'][_0x4654('0x76d')]*(_0x13e644>=0x0?0x1:-0x1),_0x13e644=this[_0x4654('0x451')](_0x4654('0x4c7'),_0x1ceed6,_0x13e644,![]),_0x13e644=this['applyDamageCaps'](_0x13e644),_0x13e644=Math[_0x4654('0x31a')](_0x13e644),this[_0x4654('0x1db')]=_0x13e644,this[_0x4654('0x165')]=this['_totalValue']||0x0,this[_0x4654('0x165')]+=_0x13e644,VisuMZ['BattleCore'][_0x4654('0x376')][_0x4654('0x5a5')](this,_0x1ceed6,_0x13e644),this['applyBattleCoreJS'](_0x4654('0x10f'),_0x1ceed6,_0x13e644,!![]);},Game_Action['prototype']['applyDamageCaps']=function(_0x2015e8){if(this[_0x4654('0x6c7')]())return _0x2015e8;return _0x2015e8=this[_0x4654('0x745')](_0x2015e8),_0x2015e8=this[_0x4654('0x65')](_0x2015e8),_0x2015e8;},Game_Action[_0x4654('0x8d')][_0x4654('0x6c7')]=function(){const _0x134928=/<BYPASS DAMAGE CAP>/i;if(this[_0x4654('0x1f7')]()[_0x4654('0x762')][_0x4654('0x2a0')](_0x134928))return!![];if(this[_0x4654('0xbe')]()[_0x4654('0x11f')]()[_0x4654('0x6d6')](_0x3d1484=>_0x3d1484&&_0x3d1484[_0x4654('0x762')][_0x4654('0x2a0')](_0x134928)))return!![];return!VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x3da')]['EnableDamageCap'];},Game_Action[_0x4654('0x8d')]['applySoftDamageCap']=function(_0x2a9cc2){if(!VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x3da')][_0x4654('0x2dd')])return _0x2a9cc2;const _0x12a1c9=/<BYPASS SOFT DAMAGE CAP>/i;if(this[_0x4654('0x1f7')]()[_0x4654('0x762')][_0x4654('0x2a0')](_0x12a1c9))return!![];if(this['subject']()[_0x4654('0x11f')]()['some'](_0x4818c6=>_0x4818c6&&_0x4818c6[_0x4654('0x762')][_0x4654('0x2a0')](_0x12a1c9)))return!![];const _0x402e50=_0x2a9cc2<0x0?-0x1:0x1;_0x2a9cc2=Math[_0x4654('0x5b1')](_0x2a9cc2);let _0x287df4=this[_0x4654('0xbe')]()[_0x4654('0x463')]();this[_0x4654('0x1f7')]()[_0x4654('0x762')]['match'](/<SOFT DAMAGE CAP:[ ]([\+\-]\d+)([%％])>/i)&&(_0x287df4+=Number(RegExp['$1'])/0x64);_0x287df4=_0x287df4[_0x4654('0xf8')](0.01,0x1);const _0x435d04=this['getHardDamageCap'](),_0x133e16=_0x287df4*_0x435d04;if(_0x2a9cc2>_0x133e16&&_0x435d04>_0x133e16){_0x2a9cc2-=_0x133e16;const _0x40c90c=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x3da')][_0x4654('0x79b')],_0x47e367=Math[_0x4654('0x6f7')](0x1-_0x2a9cc2/((_0x435d04-_0x133e16)*_0x40c90c+_0x2a9cc2),0.01);_0x2a9cc2*=_0x47e367,_0x2a9cc2+=_0x133e16;}return _0x2a9cc2*_0x402e50;},Game_Action[_0x4654('0x8d')][_0x4654('0x497')]=function(){if(this[_0x4654('0x1f7')]()[_0x4654('0x762')][_0x4654('0x2a0')](/<DAMAGE CAP:[ ](\d+)>/i)){if(_0x4654('0x448')===_0x4654('0x448'))return Number(RegExp['$1']);else{function _0x398a3c(){this[_0x4654('0x48')]();}}}else return this[_0x4654('0xbe')]()['hardDamageCap']();},Game_Action[_0x4654('0x8d')][_0x4654('0x65')]=function(_0x45285e){let _0x329aee=this[_0x4654('0x497')]();return _0x45285e['clamp'](-_0x329aee,_0x329aee);},VisuMZ[_0x4654('0x1f')][_0x4654('0x61c')]=Game_Action[_0x4654('0x8d')][_0x4654('0x1c1')],Game_Action[_0x4654('0x8d')]['apply']=function(_0x3c16a6){this[_0x4654('0x451')](_0x4654('0x8a'),_0x3c16a6,0x0,!![]),VisuMZ[_0x4654('0x1f')][_0x4654('0x61c')]['call'](this,_0x3c16a6),this['applyBattleCoreJS'](_0x4654('0x3c3'),_0x3c16a6,this['_executedValue']||0x0,!![]);},Game_Action[_0x4654('0x8d')][_0x4654('0x451')]=function(_0x47e65f,_0x30205d,_0x7d1987,_0x24b6b9){_0x7d1987=_0x7d1987||0x0;const _0x5a92d9=_0x7d1987,_0x36152b=VisuMZ[_0x4654('0x1f')]['Settings'][_0x4654('0xb')],_0x1bcdcb=_0x47e65f[_0x4654('0x31f')]('');if(_0x36152b[_0x1bcdcb]){_0x7d1987=_0x36152b[_0x1bcdcb]['call'](this,_0x7d1987,_0x30205d);if(_0x24b6b9)_0x7d1987=_0x5a92d9;}let _0x5303fb=VisuMZ[_0x4654('0x1f')]['createKeyJS'](this[_0x4654('0x1f7')](),_0x47e65f[_0x4654('0x31f')](''));if(VisuMZ[_0x4654('0x1f')]['JS'][_0x5303fb]){_0x7d1987=VisuMZ[_0x4654('0x1f')]['JS'][_0x5303fb][_0x4654('0x5a5')](this,this[_0x4654('0xbe')](),_0x30205d,this['item'](),_0x7d1987);if(_0x24b6b9)_0x7d1987=_0x5a92d9;}for(const _0x592072 of this[_0x4654('0xbe')]()['traitObjects']()){if(_0x4654('0x510')!==_0x4654('0x251')){if(!_0x592072)continue;_0x5303fb=VisuMZ[_0x4654('0x1f')][_0x4654('0xe8')](_0x592072,_0x47e65f[_0x4654('0x31f')](_0x4654('0x233')));if(VisuMZ[_0x4654('0x1f')]['JS'][_0x5303fb]){if(_0x4654('0x79e')!==_0x4654('0x763')){_0x7d1987=VisuMZ[_0x4654('0x1f')]['JS'][_0x5303fb]['call'](this,this['subject'](),_0x30205d,_0x592072,_0x7d1987);if(_0x24b6b9)_0x7d1987=_0x5a92d9;}else{function _0x50da2e(){_0x91a00['BattleCore']['Sprite_Actor_updateShadow'][_0x4654('0x5a5')](this),this[_0x4654('0x500')]();}}}}else{function _0x18e46b(){return _0x443535[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x44f')][_0x4654('0x570')];}}}for(const _0x3ecc59 of _0x30205d[_0x4654('0x11f')]()){if(!_0x3ecc59)continue;_0x5303fb=VisuMZ[_0x4654('0x1f')][_0x4654('0xe8')](_0x3ecc59,_0x47e65f[_0x4654('0x31f')](_0x4654('0x71c')));if(VisuMZ[_0x4654('0x1f')]['JS'][_0x5303fb]){_0x7d1987=VisuMZ[_0x4654('0x1f')]['JS'][_0x5303fb]['call'](this,this[_0x4654('0xbe')](),_0x30205d,_0x3ecc59,_0x7d1987);if(_0x24b6b9)_0x7d1987=_0x5a92d9;}}return _0x7d1987;},Game_Action[_0x4654('0x8d')]['actionBattleCoreJS']=function(_0x43488a){const _0xc40901=this[_0x4654('0x165')]||0x0,_0x4f6b43=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')]['Mechanics'],_0x4c549c=_0x43488a[_0x4654('0x31f')]('');if(_0x4f6b43[_0x4c549c]){if(_0x4654('0x10d')==='fSbCv'){function _0x21c015(){if(!_0x46c8fb[_0x4654('0x443')]())return;_0x524ef8[_0x4654('0x476')](_0x3de698,_0x8e575a);const _0x1772b6=_0x5c1842[_0x4654('0x779')](),_0x337d24=_0x10a8b4['CreateActionSequenceTargets'](_0x4bbc7c['Targets']),_0x10ab55=_0xc18297[_0x4654('0x56d')],_0x462e4a=_0x335699[_0x4654('0xff')];if(!_0x1772b6)return;_0x1ba967['requestAnimation'](_0x337d24,_0x10ab55,_0x462e4a);if(_0x3613f3[_0x4654('0x27d')])_0x1772b6[_0x4654('0xbd')](_0x4654('0x290'));}}else _0x4f6b43[_0x4c549c][_0x4654('0x5a5')](this,_0xc40901);}let _0x503b42=VisuMZ['BattleCore'][_0x4654('0xe8')](this[_0x4654('0x1f7')](),_0x43488a);VisuMZ[_0x4654('0x1f')]['JS'][_0x503b42]&&VisuMZ[_0x4654('0x1f')]['JS'][_0x503b42][_0x4654('0x5a5')](this,this['subject'](),this[_0x4654('0xbe')](),this[_0x4654('0x1f7')](),_0xc40901);for(const _0x587f61 of this['subject']()[_0x4654('0x11f')]()){if(!_0x587f61)continue;_0x503b42=VisuMZ[_0x4654('0x1f')][_0x4654('0xe8')](_0x587f61,_0x43488a);if(VisuMZ['BattleCore']['JS'][_0x503b42]){if('sjePU'!==_0x4654('0xd1'))VisuMZ[_0x4654('0x1f')]['JS'][_0x503b42]['call'](this,this[_0x4654('0xbe')](),this[_0x4654('0xbe')](),_0x587f61,_0xc40901);else{function _0x4b0fe4(){_0x36d4d5[_0x4654('0xbd')](_0x4654('0x290'));}}}}},Game_Action[_0x4654('0x8d')][_0x4654('0x1b8')]=function(){return VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')]['Mechanics'][_0x4654('0x201')][_0x4654('0x5a5')](this);},Game_Action[_0x4654('0x8d')][_0x4654('0x28a')]=function(){return VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0xb')][_0x4654('0x88')];},Game_Action['prototype'][_0x4654('0x58d')]=function(){return this[_0x4654('0x1f7')]()[_0x4654('0x762')]['match'](/<JS TARGETS>/i);},Game_Action['prototype']['isBattleCoreTargetScope']=function(){if(!this[_0x4654('0x4ea')]&&this[_0x4654('0xbe')]()[_0x4654('0x5c2')]())return![];if(this['isCustomBattleScope']())return!![];return typeof this[_0x4654('0x1f7')]()[_0x4654('0x235')]===_0x4654('0x5f8');},VisuMZ[_0x4654('0x1f')][_0x4654('0x2d')]=Game_Action[_0x4654('0x8d')][_0x4654('0x58b')],Game_Action['prototype']['isForOpponent']=function(){if(this[_0x4654('0x5ef')]()&&!this[_0x4654('0x58d')]()){if('mnPPJ'!==_0x4654('0x5ab')){function _0x16729c(){_0x3221cd(_0x4654('0x319')[_0x4654('0x31f')](_0x342353,_0x910942)),_0x179a96[_0x4654('0x4a')]();}}else return this[_0x4654('0x784')]();}else return VisuMZ['BattleCore']['Game_Action_isForOpponent'][_0x4654('0x5a5')](this);},Game_Action['prototype'][_0x4654('0x784')]=function(){const _0x1967a3=this[_0x4654('0x1f7')]()[_0x4654('0x235')];return _0x1967a3[_0x4654('0x2a0')](/(?:ENEMY|ENEMIES|FOE|FOES)/i);},VisuMZ[_0x4654('0x1f')][_0x4654('0x555')]=Game_Action[_0x4654('0x8d')][_0x4654('0x1a8')],Game_Action[_0x4654('0x8d')][_0x4654('0x1a8')]=function(){if(this['isBattleCoreTargetScope']()&&!this[_0x4654('0x58d')]())return this[_0x4654('0x4af')]();else{if(_0x4654('0x166')===_0x4654('0x19f')){function _0x1f8830(){_0x49fe68[_0x4654('0x1f')][_0x4654('0x14f')][_0x4654('0x5a5')](this),this[_0x4654('0xa6')]&&(this[_0x4654('0xa6')]=_0x570c88,_0x59c0bc[_0x4654('0xda')][_0x4654('0x60')]());}}else return VisuMZ[_0x4654('0x1f')][_0x4654('0x555')][_0x4654('0x5a5')](this);}},Game_Action[_0x4654('0x8d')]['isForFriendBattleCore']=function(){const _0x20635e=this['item']()[_0x4654('0x235')];return _0x20635e[_0x4654('0x2a0')](/(?:ALLY|ALLIES|FRIEND|FRIENDS)/i);},VisuMZ[_0x4654('0x1f')][_0x4654('0x4f5')]=Game_Action['prototype'][_0x4654('0x60a')],Game_Action[_0x4654('0x8d')][_0x4654('0x60a')]=function(){if(this[_0x4654('0x5ef')]()&&!this['isCustomBattleScope']())return this[_0x4654('0x6ef')]();else{if(_0x4654('0x4dd')===_0x4654('0x4dd'))return VisuMZ[_0x4654('0x1f')]['Game_Action_isForRandom'][_0x4654('0x5a5')](this);else{function _0x3b5c65(){return _0x24a3bb(_0x1d9fdc['$1']);}}}},Game_Action[_0x4654('0x8d')][_0x4654('0x6ef')]=function(){const _0x13653c=this[_0x4654('0x1f7')]()[_0x4654('0x235')];return _0x13653c[_0x4654('0x2a0')](/(?:RAND|RANDOM)/i);},VisuMZ[_0x4654('0x1f')][_0x4654('0x69')]=Game_Action[_0x4654('0x8d')]['needsSelection'],Game_Action[_0x4654('0x8d')][_0x4654('0x36e')]=function(){if(this[_0x4654('0x5ef')]()&&!this[_0x4654('0x58d')]()){if(_0x4654('0x364')!==_0x4654('0x254'))return this[_0x4654('0x3fb')]();else{function _0x35281f(){if(_0x5b7ff2[_0x4654('0x762')]['match'](/<DAMAGE STYLE:[ ](.*)>/i)){const _0x3db815=_0x1ecac5(_0x1dd0b2['$1'])[_0x4654('0x29d')]()['trim']();if(_0x3db815===_0x4654('0x4c6'))return'MANUAL';if(_0x3ddc8e[_0x4654('0x484')][_0x3db815])return _0x3db815;}const _0x3fb655=_0x27a596['BattleCore'][_0x4654('0x1f3')][_0x4654('0x3da')][_0x4654('0xfa')][_0x4654('0x29d')]()[_0x4654('0x512')]();if(_0x2bae4e[_0x4654('0x484')][_0x3fb655])return _0x3fb655;return _0x4654('0x4c6');}}}else{if(_0x4654('0x708')===_0x4654('0x708'))return VisuMZ[_0x4654('0x1f')]['Game_Action_needsSelection'][_0x4654('0x5a5')](this);else{function _0x1ce23d(){if(this[_0x4654('0x91')][_0x4654('0x225')]!==_0xe3335d)return this['_cache'][_0x4654('0x225')];let _0x7c2bc3=_0x37b5f4[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x3da')][_0x4654('0xd')];const _0x161bcf=/<SOFT DAMAGE CAP:[ ]([\+\-]\d+)([%％])>/i,_0x3a8eaf=this[_0x4654('0x11f')]()[_0x4654('0x538')](_0x4308a0=>_0x4308a0&&_0x4308a0[_0x4654('0x762')]['match'](_0x161bcf)?_0x1ee821(_0xa9cd06['$1'])/0x64:0x0);return _0x7c2bc3=_0x3a8eaf['reduce']((_0x541abb,_0x2605e4)=>_0x541abb+_0x2605e4,_0x7c2bc3),this[_0x4654('0x91')]['softDamageCap']=_0x7c2bc3,this[_0x4654('0x91')][_0x4654('0x225')][_0x4654('0xf8')](0.01,0x1);}}}},Game_Action[_0x4654('0x8d')][_0x4654('0x3fb')]=function(){const _0x42841e=this[_0x4654('0x1f7')]()[_0x4654('0x235')];if(_0x42841e[_0x4654('0x2a0')](/RANDOM/i))return![];return VisuMZ[_0x4654('0x1f')][_0x4654('0x69')][_0x4654('0x5a5')](this);},VisuMZ[_0x4654('0x1f')][_0x4654('0x280')]=Game_Action[_0x4654('0x8d')]['makeTargets'],Game_Action['prototype'][_0x4654('0x2a5')]=function(){if(this[_0x4654('0x5ef')]())return this[_0x4654('0x6af')]();else{if(_0x4654('0x66')===_0x4654('0x66'))return VisuMZ[_0x4654('0x1f')]['Game_Action_makeTargets']['call'](this);else{function _0x37802d(){const _0x3f669c=this['battleLayoutStyle']();if(['xp'][_0x4654('0x386')](_0x3f669c)&&!_0x5523a9[_0x4654('0x4f9')]()){this[_0x4654('0xd7')](0x0,0x0,0x0,0x0);return;}_0x542ac3[_0x4654('0x8d')][_0x4654('0xe')][_0x4654('0x5a5')](this);}}}},Game_Action['prototype'][_0x4654('0x6af')]=function(){let _0x43563b=[];const _0x21e7e=String(this[_0x4654('0x1f7')]()['scope']),_0x528c64=VisuMZ[_0x4654('0x1f')][_0x4654('0xe8')](this['item'](),'Targets');if(VisuMZ[_0x4654('0x1f')]['JS'][_0x528c64]){if(_0x4654('0x3db')===_0x4654('0x3db')){const _0x279fc8=VisuMZ[_0x4654('0x1f')][_0x4654('0xe8')](this[_0x4654('0x1f7')](),_0x4654('0x5fb'));return _0x43563b=VisuMZ[_0x4654('0x1f')]['JS'][_0x279fc8][_0x4654('0x5a5')](this,this[_0x4654('0xbe')](),_0x43563b),this[_0x4654('0x3de')](_0x43563b);}else{function _0x50d1c8(){this['_waitMode']='';}}}if(_0x21e7e[_0x4654('0x2a0')](/(\d+) RANDOM ANY/i)){let _0xb1799d=Number(RegExp['$1']);while(_0xb1799d--){if(_0x4654('0x4f3')!==_0x4654('0x431')){const _0x3b1277=Math[_0x4654('0x5c3')](0x2)===0x0?this[_0x4654('0x13d')]():this[_0x4654('0x6e')]();_0x43563b[_0x4654('0x128')](_0x3b1277[_0x4654('0x589')]());}else{function _0x17d558(){this[_0x4654('0x530')]();}}}return this['repeatTargets'](_0x43563b);}if(_0x21e7e[_0x4654('0x2a0')](/(\d+) RANDOM (?:ENEMY|ENEMIES|FOE|FOES)/i)){let _0x1eb0d3=Number(RegExp['$1']);while(_0x1eb0d3--){if('otIYm'!==_0x4654('0x253')){function _0x33b332(){_0x28aee0?(this[_0x4654('0x16')]['x']=(_0x30e96b[_0x4654('0x564')]-_0x347e63[_0x4654('0x46b')])/0x2,this[_0x4654('0x16')]['y']=(_0x19c92b[_0x4654('0x2e8')]-_0x2b0a26[_0x4654('0x37f')])/0x2):(this[_0x4654('0x16')]['x']=_0x5885b4[_0x4654('0x564')]*0xa,this[_0x4654('0x16')]['y']=_0x4b449e[_0x4654('0x2e8')]*0xa);}}else _0x43563b[_0x4654('0x128')](this['opponentsUnit']()['trueRandomTarget']());}return this[_0x4654('0x3de')](_0x43563b);}if(_0x21e7e[_0x4654('0x2a0')](/(\d+) RANDOM (?:ALLY|ALLIES|FRIEND|FRIENDS)/i)){let _0x42be78=Number(RegExp['$1']);while(_0x42be78--){_0x43563b[_0x4654('0x128')](this[_0x4654('0x6e')]()['trueRandomTarget']());}return this[_0x4654('0x3de')](_0x43563b);}if(_0x21e7e[_0x4654('0x2a0')](/ALL (?:ALLY|ALLIES|FRIEND|FRIENDS) (?:BUT|EXCEPT) (?:USER|SELF)/i))return _0x43563b[_0x4654('0x128')](...this[_0x4654('0x6e')]()[_0x4654('0x5e1')]()[_0x4654('0x4c4')](_0x288374=>_0x288374!==this['subject']())),this[_0x4654('0x3de')](_0x43563b);return VisuMZ[_0x4654('0x1f')][_0x4654('0x280')][_0x4654('0x5a5')](this);},Game_Action[_0x4654('0x8d')][_0x4654('0x5f0')]=function(_0x244bca){const _0x44ecac=[];for(let _0x5b2917=0x0;_0x5b2917<this['numTargets']();_0x5b2917++){if(_0x4654('0x3fd')!==_0x4654('0x3fd')){function _0x535bf2(){_0xbca8c7[_0x4654('0x1f')]['Window_BattleLog_popupDamage']['call'](this,_0x1748d1),this[_0x4654('0x223')]();}}else _0x44ecac[_0x4654('0x128')](_0x244bca[_0x4654('0x589')]());}return _0x44ecac;},VisuMZ[_0x4654('0x1f')][_0x4654('0x11c')]=Game_Action[_0x4654('0x8d')][_0x4654('0x45a')],Game_Action[_0x4654('0x8d')][_0x4654('0x45a')]=function(_0x593b34,_0x498b78){const _0x4781ed=_0x593b34['isImmortal']();_0x593b34[_0x4654('0x4f4')](![]),VisuMZ[_0x4654('0x1f')][_0x4654('0x11c')][_0x4654('0x5a5')](this,_0x593b34,_0x498b78),_0x593b34['setImmortal'](_0x4781ed);},VisuMZ[_0x4654('0x1f')][_0x4654('0x112')]=Game_Action[_0x4654('0x8d')]['itemEffectAddNormalState'],Game_Action[_0x4654('0x8d')][_0x4654('0x15a')]=function(_0x4bacec,_0x367f42){const _0x5ab196=_0x4bacec[_0x4654('0x35')]();_0x4bacec[_0x4654('0x4f4')](![]),VisuMZ[_0x4654('0x1f')][_0x4654('0x112')][_0x4654('0x5a5')](this,_0x4bacec,_0x367f42),_0x4bacec[_0x4654('0x4f4')](_0x5ab196);},VisuMZ['BattleCore'][_0x4654('0x258')]=Game_BattlerBase[_0x4654('0x8d')][_0x4654('0x416')],Game_BattlerBase[_0x4654('0x8d')][_0x4654('0x416')]=function(){VisuMZ['BattleCore']['Game_BattlerBase_initMembers'][_0x4654('0x5a5')](this),this[_0x4654('0x400')]();},Game_BattlerBase[_0x4654('0x8d')][_0x4654('0x400')]=function(){this[_0x4654('0x31d')]=![];},VisuMZ[_0x4654('0x1f')][_0x4654('0x1a5')]=Game_BattlerBase[_0x4654('0x8d')][_0x4654('0x524')],Game_BattlerBase[_0x4654('0x8d')][_0x4654('0x524')]=function(){this[_0x4654('0x91')]={},VisuMZ[_0x4654('0x1f')][_0x4654('0x1a5')][_0x4654('0x5a5')](this);},Game_BattlerBase['prototype'][_0x4654('0x5a8')]=function(){if(this[_0x4654('0x91')][_0x4654('0x5a8')]!==undefined)return this[_0x4654('0x91')][_0x4654('0x5a8')];const _0x50a83b=/<DAMAGE CAP:[ ](\d+)>/i,_0x1b3563=this[_0x4654('0x11f')]()['map'](_0x2b76a6=>_0x2b76a6&&_0x2b76a6[_0x4654('0x762')][_0x4654('0x2a0')](_0x50a83b)?Number(RegExp['$1']):0x0);let _0x4abbd1=_0x1b3563[_0x4654('0x0')]>0x0?Math[_0x4654('0x6f7')](..._0x1b3563):0x0;if(_0x4abbd1<=0x0)_0x4abbd1=VisuMZ['BattleCore']['Settings']['Damage'][_0x4654('0x585')];return this[_0x4654('0x91')][_0x4654('0x5a8')]=_0x4abbd1,this[_0x4654('0x91')][_0x4654('0x5a8')];},Game_BattlerBase['prototype'][_0x4654('0x463')]=function(){if(this[_0x4654('0x91')][_0x4654('0x225')]!==undefined)return this[_0x4654('0x91')][_0x4654('0x225')];let _0x596b81=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x3da')][_0x4654('0xd')];const _0x2e6d69=/<SOFT DAMAGE CAP:[ ]([\+\-]\d+)([%％])>/i,_0x50af1f=this[_0x4654('0x11f')]()['map'](_0x3181fb=>_0x3181fb&&_0x3181fb[_0x4654('0x762')][_0x4654('0x2a0')](_0x2e6d69)?Number(RegExp['$1'])/0x64:0x0);return _0x596b81=_0x50af1f[_0x4654('0x644')]((_0x43c280,_0xbd7a68)=>_0x43c280+_0xbd7a68,_0x596b81),this[_0x4654('0x91')]['softDamageCap']=_0x596b81,this['_cache'][_0x4654('0x225')]['clamp'](0.01,0x1);},Game_BattlerBase[_0x4654('0x8d')][_0x4654('0x770')]=function(){if(!SceneManager[_0x4654('0x443')]())return null;if(!SceneManager[_0x4654('0xda')][_0x4654('0x67f')])return null;return SceneManager[_0x4654('0xda')]['_spriteset'][_0x4654('0x2e9')](this);},Game_BattlerBase['prototype'][_0x4654('0x6a3')]=function(){return VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x5ed')][_0x4654('0x118')];},Game_BattlerBase['prototype'][_0x4654('0x341')]=function(){return VisuMZ[_0x4654('0x1f')]['Settings'][_0x4654('0x5ed')][_0x4654('0x760')];},Game_BattlerBase['prototype'][_0x4654('0x42d')]=function(){return VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x5ed')][_0x4654('0x328')];},VisuMZ[_0x4654('0x1f')][_0x4654('0x798')]=Game_BattlerBase[_0x4654('0x8d')]['isStateResist'],Game_BattlerBase['prototype'][_0x4654('0x206')]=function(_0x3db9fe){if(_0x3db9fe===this[_0x4654('0x8')]()&&this['isImmortal']())return!![];return VisuMZ[_0x4654('0x1f')][_0x4654('0x798')][_0x4654('0x5a5')](this,_0x3db9fe);},Game_BattlerBase['prototype']['isImmortal']=function(){return this[_0x4654('0x31d')];},Game_BattlerBase['prototype'][_0x4654('0x4f4')]=function(_0x36b485){if(_0x36b485)this[_0x4654('0x65a')]();else{if(_0x4654('0x52a')!==_0x4654('0x52a')){function _0x2e4376(){return this[_0x4654('0x2bb')](_0x549c44(_0x2f3ec6));}}else this['removeImmortal']();}},Game_BattlerBase[_0x4654('0x8d')][_0x4654('0x65a')]=function(){this['_immortal']=!![];},Game_BattlerBase['prototype'][_0x4654('0x72d')]=function(){const _0x29b033=this[_0x4654('0x36f')]();this['_immortal']=![],this[_0x4654('0x524')]();if(this[_0x4654('0x6f4')]()&&_0x29b033)this[_0x4654('0x465')]();},VisuMZ[_0x4654('0x1f')][_0x4654('0x50f')]=Game_BattlerBase[_0x4654('0x8d')][_0x4654('0x74e')],Game_BattlerBase[_0x4654('0x8d')][_0x4654('0x74e')]=function(){if(!this[_0x4654('0x64b')]())return![];return VisuMZ['BattleCore'][_0x4654('0x50f')][_0x4654('0x5a5')](this);},Game_BattlerBase[_0x4654('0x8d')][_0x4654('0x64b')]=function(){for(const _0x59cfbb of this[_0x4654('0x11f')]()){if(_0x4654('0x411')===_0x4654('0x34b')){function _0x4cd2fa(){const _0x513ee7=_0x13766e[_0x4654('0x31a')](_0x1cfb15[_0x4654('0x46b')]/0x3),_0x589c5c=_0x323977[_0x4654('0x31a')](_0x27e532[_0x4654('0x46b')]/_0x5d4268[_0x4654('0x515')]()[_0x4654('0x0')]),_0x1d04cc=_0x6f29b3[_0x4654('0x22b')](_0x513ee7,_0x589c5c),_0x371632=this[_0x4654('0x430')](_0x51c4e1[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x44f')][_0x4654('0x559')]),_0x526772=_0x589c5c*_0x3f1a1f['index']()+(_0x589c5c-_0x1d04cc)/0x2,_0x3dda3f=_0x327669[_0x4654('0xda')]['_statusWindow']['y']-_0x371632;this[_0x4654('0x37a')](_0x526772,_0x3dda3f,_0x1d04cc,_0x371632),this[_0x4654('0x11a')](),this[_0x4654('0x135')](0x1);}}else{if(!_0x59cfbb)continue;if(_0x59cfbb[_0x4654('0x762')][_0x4654('0x2a0')](/<(?:ATTACK SEAL|SEAL ATTACK)>/i))return![];}}return!![];},VisuMZ[_0x4654('0x1f')]['Game_BattlerBase_canGuard']=Game_BattlerBase['prototype']['canGuard'],Game_BattlerBase[_0x4654('0x8d')][_0x4654('0x1d5')]=function(){if(!this[_0x4654('0xb9')]())return![];return VisuMZ[_0x4654('0x1f')][_0x4654('0x6aa')][_0x4654('0x5a5')](this);},Game_BattlerBase['prototype'][_0x4654('0xb9')]=function(){for(const _0x555b95 of this[_0x4654('0x11f')]()){if(_0x4654('0x464')!=='ELBmX'){if(!_0x555b95)continue;if(_0x555b95[_0x4654('0x762')][_0x4654('0x2a0')](/<(?:GUARD SEAL|SEAL GUARD)>/i))return![];}else{function _0x4e41c4(){this['requestMotion'](_0x4654('0x794'));}}}return!![];},Game_BattlerBase[_0x4654('0x8d')]['canUseItemCommand']=function(){for(const _0x423a42 of this[_0x4654('0x11f')]()){if(!_0x423a42)continue;if(_0x423a42[_0x4654('0x762')][_0x4654('0x2a0')](/<(?:ITEM SEAL|SEAL ITEM|SEAL ITEMS)>/i))return![];}return!![];},VisuMZ[_0x4654('0x1f')][_0x4654('0x23f')]=Game_Battler[_0x4654('0x8d')][_0x4654('0x34c')],Game_Battler[_0x4654('0x8d')][_0x4654('0x34c')]=function(){if(SceneManager[_0x4654('0x443')]()&&$gameTroop[_0x4654('0x571')]()<=0x0)return;this[_0x4654('0x2d6')](_0x4654('0x1ef')),VisuMZ[_0x4654('0x1f')][_0x4654('0x23f')]['call'](this),this['regenerateAllBattleCore'](),this[_0x4654('0x2d6')](_0x4654('0x626'));},Game_Battler[_0x4654('0x8d')][_0x4654('0x296')]=function(){if(SceneManager[_0x4654('0x443')]())for(const _0x4d09d4 of this[_0x4654('0x11f')]()){if(!_0x4d09d4)continue;this[_0x4654('0x6ce')](_0x4d09d4);}},Game_Battler[_0x4654('0x8d')]['onRegeneratePlayStateAnimation']=function(_0x1fffbd){if(!Imported[_0x4654('0x631')])return;if(!SceneManager[_0x4654('0x443')]())return;if(this['isDead']())return;if(this[_0x4654('0x1d4')]())return;if(_0x1fffbd[_0x4654('0x762')][_0x4654('0x2a0')](/<(?:REGENERATE|REGEN|DEGEN|DOT|SLIP)[ ]ANIMATION:[ ](\d+)>/i)){const _0x48cf2e=Number(RegExp['$1']);$gameTemp[_0x4654('0x1ad')]([this],_0x48cf2e,![],![]);}},VisuMZ[_0x4654('0x1f')][_0x4654('0x580')]=Game_Battler[_0x4654('0x8d')][_0x4654('0x480')],Game_Battler[_0x4654('0x8d')][_0x4654('0x480')]=function(){this[_0x4654('0x2d6')](_0x4654('0x120')),VisuMZ[_0x4654('0x1f')]['Game_Battler_startTpbTurn'][_0x4654('0x5a5')](this),this[_0x4654('0x2d6')](_0x4654('0x50c'));},VisuMZ[_0x4654('0x1f')][_0x4654('0x577')]=Game_Battler[_0x4654('0x8d')][_0x4654('0x2be')],Game_Battler[_0x4654('0x8d')][_0x4654('0x2be')]=function(){this[_0x4654('0x2d6')](_0x4654('0x735')),VisuMZ[_0x4654('0x1f')][_0x4654('0x577')][_0x4654('0x5a5')](this),this[_0x4654('0x2d6')](_0x4654('0x6ba'));},Game_Battler[_0x4654('0x8d')]['processBattleCoreJS']=function(_0x5bb065){const _0x451d4f=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0xb')];if(_0x451d4f[_0x5bb065])_0x451d4f[_0x5bb065][_0x4654('0x5a5')](this);for(const _0xf4393b of this[_0x4654('0x11f')]()){if(!_0xf4393b)continue;key=VisuMZ[_0x4654('0x1f')]['createKeyJS'](_0xf4393b,_0x5bb065),VisuMZ[_0x4654('0x1f')]['JS'][key]&&VisuMZ[_0x4654('0x1f')]['JS'][key][_0x4654('0x5a5')](this,this,this,_0xf4393b,0x0);}},Game_Battler[_0x4654('0x8d')]['clearDamagePopup']=function(){this[_0x4654('0x59d')]=[];},Game_Battler[_0x4654('0x8d')]['isDamagePopupRequested']=function(){if(!this['_damagePopup'])this[_0x4654('0x3a4')]();return this[_0x4654('0x59d')]['length']>0x0;},Game_Battler[_0x4654('0x8d')][_0x4654('0x143')]=function(){if(!SceneManager[_0x4654('0x443')]())return;if(!this['_damagePopup'])this['clearDamagePopup']();this['createSeparateDamagePopups']();const _0x306946=this[_0x4654('0x770')]();if(_0x306946)_0x306946[_0x4654('0x397')]();},Game_Battler['prototype'][_0x4654('0x374')]=function(){const _0x415ec9=this[_0x4654('0x3cc')]();if(_0x415ec9[_0x4654('0x749')]||_0x415ec9[_0x4654('0x163')]){if(_0x4654('0x4c3')===_0x4654('0x2b9')){function _0x3e3fa8(){const _0x3afe89=this[_0x4654('0x672')][_0x4654('0x5aa')]();if(_0x3afe89)_0x3afe89[_0x4654('0x673')](_0x4654('0x11d'));_0x125855[_0x4654('0x1f')][_0x4654('0x25')][_0x4654('0x5a5')](this);if(_0x3afe89)_0x3afe89[_0x4654('0x673')]('PostStartActionJS');}}else{const _0x38bdb0=JsonEx['makeDeepCopy'](_0x415ec9);_0x38bdb0['hpAffected']=![],_0x38bdb0[_0x4654('0x5c8')]=0x0,this[_0x4654('0x59d')][_0x4654('0x128')](_0x38bdb0);}}if(_0x415ec9[_0x4654('0x2d4')]){const _0x2c9050=JsonEx['makeDeepCopy'](_0x415ec9);_0x2c9050['missed']=![],_0x2c9050[_0x4654('0x163')]=![],_0x2c9050[_0x4654('0x5c8')]=0x0,this[_0x4654('0x59d')]['push'](_0x2c9050);}if(_0x415ec9[_0x4654('0x5c8')]!==0x0){const _0x1cc31e=JsonEx[_0x4654('0x1a7')](_0x415ec9);_0x1cc31e[_0x4654('0x749')]=![],_0x1cc31e[_0x4654('0x163')]=![],_0x1cc31e['hpAffected']=![],this[_0x4654('0x59d')][_0x4654('0x128')](_0x1cc31e);}},Game_Battler[_0x4654('0x8d')][_0x4654('0x275')]=function(){if(!this[_0x4654('0x59d')])this[_0x4654('0x3a4')]();return VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x3da')][_0x4654('0x5d0')]?this[_0x4654('0x59d')][_0x4654('0x2e1')]():this[_0x4654('0x59d')][_0x4654('0x140')]();},Game_Battler[_0x4654('0x8d')][_0x4654('0x3b9')]=function(_0x29be99,_0x8878a){if(!SceneManager[_0x4654('0x443')]())return;if(!this[_0x4654('0x770')]())return;if(_0x29be99[_0x4654('0x0')]<=0x0)return;_0x8878a=_0x8878a||{},_0x8878a[_0x4654('0x2bb')]=_0x8878a[_0x4654('0x2bb')]||_0x4654('0x716'),_0x8878a[_0x4654('0x47d')]=_0x8878a['flashColor']||[0x0,0x0,0x0,0x0],_0x8878a[_0x4654('0x560')]=_0x8878a[_0x4654('0x560')]||0x0,this[_0x4654('0x770')]()[_0x4654('0x3b9')](_0x29be99,_0x8878a);},Game_Battler[_0x4654('0x8d')][_0x4654('0x797')]=function(_0x354d40,_0x527cd6,_0x119454){if(!SceneManager['isSceneBattle']())return;if(!this[_0x4654('0x770')]())return;if(_0x527cd6[_0x4654('0x0')]<=0x0)return;_0x119454=_0x119454||{},_0x119454[_0x4654('0x2bb')]=_0x119454[_0x4654('0x2bb')]||_0x4654('0x716'),_0x119454[_0x4654('0x47d')]=_0x119454[_0x4654('0x47d')]||[0x0,0x0,0x0,0x0],_0x119454[_0x4654('0x560')]=_0x119454[_0x4654('0x560')]||0x0,this[_0x4654('0x770')]()[_0x4654('0x797')](_0x354d40,_0x527cd6,_0x119454);},Game_Battler[_0x4654('0x8d')][_0x4654('0x189')]=function(){return!![];},VisuMZ[_0x4654('0x1f')][_0x4654('0x6f1')]=Game_Battler[_0x4654('0x8d')][_0x4654('0x344')],Game_Battler[_0x4654('0x8d')][_0x4654('0x344')]=function(_0x75b5b3){VisuMZ[_0x4654('0x1f')][_0x4654('0x6f1')][_0x4654('0x5a5')](this,_0x75b5b3),this[_0x4654('0x4c')](_0x75b5b3);},Game_Battler[_0x4654('0x8d')][_0x4654('0x4c')]=function(_0x546117){this[_0x4654('0x322')](![]);},VisuMZ[_0x4654('0x1f')][_0x4654('0x237')]=Game_Battler[_0x4654('0x8d')]['performActionStart'],Game_Battler[_0x4654('0x8d')][_0x4654('0x616')]=function(_0x27c481){VisuMZ[_0x4654('0x1f')]['Game_Battler_performActionStart'][_0x4654('0x5a5')](this,_0x27c481);if(!_0x27c481[_0x4654('0x531')]()){const _0x358707=this['battler']();if(_0x358707)_0x358707[_0x4654('0x1f0')]();}this[_0x4654('0x322')](![]);},VisuMZ[_0x4654('0x1f')][_0x4654('0x540')]=Game_Battler[_0x4654('0x8d')]['performActionEnd'],Game_Battler[_0x4654('0x8d')][_0x4654('0x4be')]=function(){VisuMZ[_0x4654('0x1f')][_0x4654('0x540')]['call'](this),this[_0x4654('0x252')]=![];const _0x225ccd=this[_0x4654('0x770')]();if(_0x225ccd)_0x225ccd[_0x4654('0x224')]();this[_0x4654('0x322')](![]),this[_0x4654('0x35a')]();},Game_Battler[_0x4654('0x8d')][_0x4654('0x6df')]=function(_0x34c387){if(_0x34c387['isAttack']())this[_0x4654('0x41')]();else{if(_0x34c387[_0x4654('0x531')]())this['requestMotion']('guard');else{if(_0x34c387[_0x4654('0xad')]())this[_0x4654('0x741')](_0x4654('0x5d9'));else{if(_0x34c387[_0x4654('0x2b2')]()){if(_0x34c387[_0x4654('0x1f7')]()[_0x4654('0x445')][_0x4654('0x709')]>0x0){if('FZwPU'===_0x4654('0x353'))this[_0x4654('0x41')]();else{function _0x5249de(){this[_0x4654('0xcc')]=new _0xf731aa(),this[_0x4654('0x1d6')][_0x4654('0x43f')](this[_0x4654('0xcc')]);}}}else this[_0x4654('0x741')]('skill');}else _0x34c387['isItem']()&&this[_0x4654('0x741')](_0x4654('0x1f7'));}}}},Game_Battler[_0x4654('0x8d')][_0x4654('0x1ff')]=function(){return $dataSystem[_0x4654('0x527')][0x0];},Game_Battler[_0x4654('0x8d')][_0x4654('0x53e')]=function(){const _0x2cde8a=this[_0x4654('0x1ff')]();return _0x2cde8a?_0x2cde8a[_0x4654('0x255')]:0x0;},Game_Battler[_0x4654('0x8d')][_0x4654('0x387')]=function(_0xc6bda5){if(!$gameSystem[_0x4654('0x4f9')]())return;const _0x530250=this[_0x4654('0x770')](),_0x2a077c=_0xc6bda5[_0x4654('0x770')]();if(!_0x530250||!_0x2a077c)return;const _0x369f7d=_0x2a077c[_0x4654('0x2df')],_0x135f4b=_0x2a077c[_0x4654('0x2a8')];this[_0x4654('0x6b3')](_0x369f7d,_0x135f4b,0x0,![],_0x4654('0x28'),-0x1),_0x530250[_0x4654('0x336')]();const _0x5686d1=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x76a')];let _0x136255=(_0x2a077c['width']+_0x530250['width'])/0x2;_0x136255*=this[_0x4654('0x5b5')]()?0x1:-0x1;let _0x37c7db=_0x5686d1[_0x4654('0x3f3')]*(this[_0x4654('0x5b5')]()?0x1:-0x1);_0xc6bda5[_0x4654('0x474')](_0x136255,_0x37c7db,0x0,![],_0x4654('0x28')),_0x2a077c[_0x4654('0x336')]();},Game_Battler[_0x4654('0x8d')][_0x4654('0x741')]=function(_0x28907b){if(SceneManager[_0x4654('0x443')]()){const _0x3933d1=this[_0x4654('0x770')]();if(_0x3933d1)_0x3933d1[_0x4654('0x71e')](_0x28907b);}},Game_Battler[_0x4654('0x8d')][_0x4654('0x546')]=function(_0x3c3b61){if(SceneManager[_0x4654('0x443')]()){const _0x37bf8c=this[_0x4654('0x770')]();if(_0x37bf8c)_0x37bf8c['forceWeaponAnimation'](_0x3c3b61);}},Game_Battler[_0x4654('0x8d')][_0x4654('0x267')]=function(){if(SceneManager[_0x4654('0x443')]()){const _0x5eeaa7=this['getAttackWeaponAnimationId']();this[_0x4654('0x546')](_0x5eeaa7);}},Game_Battler['prototype'][_0x4654('0x24d')]=function(_0x45d1a8,_0x130221){if(!_0x45d1a8)return;if(!_0x45d1a8[_0x4654('0x1f7')]())return;if(_0x45d1a8[_0x4654('0x533')]())return;if(_0x45d1a8['isGuard']())return;if(_0x45d1a8[_0x4654('0x568')]())return;let _0x101c44=0x0;const _0x35c0da=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x76a')],_0xe526ac=_0x45d1a8[_0x4654('0x1f7')]()[_0x4654('0x762')];if(_0xe526ac['match'](/<CAST ANIMATION: (\d+)>/i))_0x101c44=Number(RegExp['$1']);else{if(_0xe526ac['match'](/<NO CAST ANIMATION>/i))return;else{if(_0x45d1a8[_0x4654('0x6c5')]())_0x101c44=_0x35c0da[_0x4654('0x3b7')];else{if(_0x45d1a8[_0x4654('0x466')]()){if(_0x4654('0x23')===_0x4654('0x14e')){function _0x5adf3e(){const _0x45aec7=this[_0x4654('0x4da')](),_0xe2bca=_0x35ebb6[_0x4654('0x1f')]['Settings'][_0x4654('0xe2')][_0x4654('0x697')],_0x4f6961=_0x45aec7===_0x4654('0x1c2')?_0x3f6b6c[_0x4654('0x699')]:_0x4654('0x53b')[_0x4654('0x31f')](_0xe2bca,_0x306a71[_0x4654('0x699')]),_0xdd5401=this[_0x4654('0x38b')]();this['addCommand'](_0x4f6961,_0x4654('0x699'),_0xdd5401);}}else _0x101c44=_0x35c0da[_0x4654('0x293')];}else _0x45d1a8[_0x4654('0x51d')]()&&(_0x101c44=_0x35c0da['CastMagical']);}}}if(_0x101c44>0x0){if(_0x4654('0x63f')===_0x4654('0x63f'))$gameTemp['requestAnimation']([this],_0x101c44,!!_0x130221);else{function _0x2ca0a1(){this[_0x4654('0x6da')]()['removeChild'](_0x453d51),this[_0x4654('0x138')][_0x4654('0x314')](_0xa99690),_0x25475f[_0x4654('0xe6')]();}}}},Game_Battler['prototype']['performReflection']=function(){SoundManager[_0x4654('0x2c2')]();let _0x2a7f4d=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x76a')][_0x4654('0x61f')];if(_0x2a7f4d>0x0){if(_0x4654('0x59e')!==_0x4654('0x59e')){function _0x3572ef(){_0x353d23+=_0x4c7c63[_0x4654('0x564')]-_0x5c86e9;}}else $gameTemp[_0x4654('0xcb')]([this],_0x2a7f4d);}},VisuMZ[_0x4654('0x1f')][_0x4654('0x3f5')]=Game_Battler[_0x4654('0x8d')][_0x4654('0x769')],Game_Battler[_0x4654('0x8d')]['performDamage']=function(){VisuMZ[_0x4654('0x1f')][_0x4654('0x3f5')][_0x4654('0x5a5')](this),this[_0x4654('0x12')]();},Game_Battler[_0x4654('0x8d')]['performFlinch']=function(){if(!$gameSystem[_0x4654('0x4f9')]())return;if(this[_0x4654('0x252')])return;this[_0x4654('0x252')]=!![];const _0x55288b=this[_0x4654('0x770')]();if(_0x55288b)_0x55288b[_0x4654('0x460')]();},Game_Battler[_0x4654('0x8d')][_0x4654('0x35a')]=function(){this['isDead']()&&this[_0x4654('0x514')]!==_0x4654('0x794')&&this[_0x4654('0x741')](_0x4654('0x794'));if(this[_0x4654('0x6f4')]()&&this[_0x4654('0x514')]===_0x4654('0x794'))return;if(this[_0x4654('0x514')]===_0x4654('0x45b'))return;if(this[_0x4654('0x514')]===_0x4654('0x648')&&!BattleManager['isInputting']())return;if(this['_motionType']==='guard'&&!BattleManager[_0x4654('0x4f7')]())return;this[_0x4654('0x9b')]();if(this[_0x4654('0x770')]()&&BattleManager[_0x4654('0x4f7')]()){if(_0x4654('0x579')!=='ZXveM'){function _0x376785(){_0x901e86[_0x4654('0x1f')][_0x4654('0x1f3')]['HpGauge'][_0x4654('0x1e3')]&&this[_0x4654('0x472')](),_0x59623f[_0x4654('0x1f')]['Sprite_Enemy_createStateIconSprite'][_0x4654('0x5a5')](this);}}else this[_0x4654('0x770')]()[_0x4654('0x596')]();}},Game_Battler[_0x4654('0x8d')]['isBattlerFlipped']=function(){return this[_0x4654('0x339')];},Game_Battler['prototype'][_0x4654('0x322')]=function(_0x486600){if(!$gameSystem[_0x4654('0x4f9')]())return;this[_0x4654('0x339')]=_0x486600;const _0x1311be=this[_0x4654('0x770')]();if(_0x1311be)_0x1311be[_0x4654('0x3f1')]();},Game_Battler['prototype'][_0x4654('0x4d')]=function(_0x2978fa,_0xa602d5,_0x113c2c){if(!$gameSystem[_0x4654('0x4f9')]())return;const _0x49cc6c=this['battler']();if(!_0x49cc6c)return;if(_0x2978fa===_0x49cc6c[_0x4654('0x2df')])return;let _0x510f47=![];if(this[_0x4654('0x5b5')]()){if(_0x2978fa>_0x49cc6c[_0x4654('0x2df')])_0x510f47=!![];if(_0x2978fa<_0x49cc6c['_baseX'])_0x510f47=![];}else{if(this[_0x4654('0x2c')]()){if(_0x2978fa>_0x49cc6c[_0x4654('0x2df')])_0x510f47=![];if(_0x2978fa<_0x49cc6c[_0x4654('0x2df')])_0x510f47=!![];}}this[_0x4654('0x322')](_0x113c2c?!_0x510f47:_0x510f47),_0x49cc6c[_0x4654('0x3f1')]();},Game_Battler[_0x4654('0x8d')][_0x4654('0x474')]=function(_0x3f9d2a,_0x4a066b,_0x183bd4,_0x2676c8,_0xb30b2c){if(!$gameSystem[_0x4654('0x4f9')]())return;const _0x38c548=this[_0x4654('0x770')]();if(!_0x38c548)return;if(_0x2676c8)this[_0x4654('0x4d')](_0x3f9d2a,_0x4a066b,![]);_0x3f9d2a+=_0x38c548[_0x4654('0x2df')]-_0x38c548['_homeX'],_0x4a066b+=_0x38c548[_0x4654('0x2a8')]-_0x38c548[_0x4654('0x728')],_0x38c548[_0x4654('0x19c')](_0x3f9d2a,_0x4a066b,_0x183bd4);if(Imported[_0x4654('0x631')])_0x38c548['setMoveEasingType'](_0xb30b2c||'Linear');},Game_Battler[_0x4654('0x8d')]['moveBattlerToPoint']=function(_0x5eee0b,_0x204f61,_0x55ea2a,_0x437625,_0x131660,_0x1af18f){if(!$gameSystem[_0x4654('0x4f9')]())return;const _0x483237=this[_0x4654('0x770')]();if(!_0x483237)return;if(_0x1af18f>=0x0){if(_0x4654('0x6f6')==='UabwZ'){function _0x5af331(){_0x4b651d['BattleCore']['Scene_ItemBase_applyItem'][_0x4654('0x5a5')](this),this[_0x4654('0x1f7')]()[_0x4654('0x762')][_0x4654('0x2a0')](/<CUSTOM ACTION SEQUENCE>/i)&&(_0x4c0a41['_commonEventQueue']=[]);}}else{if(_0x483237[_0x4654('0x2df')]>_0x5eee0b)_0x5eee0b+=_0x483237['width']/0x2+_0x1af18f;if(_0x483237[_0x4654('0x2df')]<_0x5eee0b)_0x5eee0b-=_0x483237[_0x4654('0x564')]/0x2+_0x1af18f;}}if(_0x437625)this[_0x4654('0x4d')](_0x5eee0b,_0x204f61,![]);_0x5eee0b-=_0x483237[_0x4654('0x36')],_0x204f61-=_0x483237[_0x4654('0x728')],_0x483237[_0x4654('0x19c')](_0x5eee0b,_0x204f61,_0x55ea2a);if(Imported[_0x4654('0x631')])_0x483237[_0x4654('0x25f')](_0x131660||'Linear');},Game_Battler[_0x4654('0x8d')][_0x4654('0x71')]=function(_0x24a4e9,_0x4382f6,_0x1f5f54){if(!$gameSystem[_0x4654('0x4f9')]())return;const _0x554f05=this[_0x4654('0x770')]();if(!_0x554f05)return;_0x554f05[_0x4654('0x710')](_0x24a4e9,_0x4382f6,_0x1f5f54);},Game_Battler[_0x4654('0x8d')][_0x4654('0x518')]=function(_0xa524b0,_0x5eaa4b){if(!$gameSystem['isSideView']())return;const _0x18ca58=this[_0x4654('0x770')]();if(!_0x18ca58)return;_0x18ca58[_0x4654('0x6ec')](_0xa524b0,_0x5eaa4b);},Game_Battler[_0x4654('0x8d')]['changeBattlerOpacity']=function(_0x584f17,_0x23e9ce,_0x47d2e2){if(!$gameSystem[_0x4654('0x4f9')]())return;const _0x5a3c11=this[_0x4654('0x770')]();if(!_0x5a3c11)return;_0x5a3c11[_0x4654('0x4d6')](_0x584f17,_0x23e9ce,_0x47d2e2);},Game_Battler['prototype']['isFriendly']=function(_0x3c72dc){if(!_0x3c72dc)return![];return _0x3c72dc[_0x4654('0x6e')]()===this[_0x4654('0x6e')]();},Game_Battler['prototype'][_0x4654('0x6cc')]=function(_0x21cec1){if(!_0x21cec1)return![];return _0x21cec1[_0x4654('0x13d')]()===this[_0x4654('0x6e')]();},VisuMZ[_0x4654('0x1f')][_0x4654('0x503')]=Game_Actor['prototype']['setup'],Game_Actor[_0x4654('0x8d')][_0x4654('0x661')]=function(_0x52ff6a){VisuMZ[_0x4654('0x1f')][_0x4654('0x503')][_0x4654('0x5a5')](this,_0x52ff6a),this['initBattlePortrait']();},Game_Actor[_0x4654('0x8d')]['initBattlePortrait']=function(){this['_battlePortrait']='';if(this[_0x4654('0x30c')]()&&this[_0x4654('0x30c')]()[_0x4654('0x762')][_0x4654('0x2a0')](/<BATTLE (?:IMAGE|PORTRAIT):[ ](.*)>/i)){if(_0x4654('0x213')===_0x4654('0x29e')){function _0x46e2eb(){_0x3cc6df[_0x4654('0x1f')]['Window_Options_addGeneralOptions'][_0x4654('0x5a5')](this),this[_0x4654('0x4e1')](),this[_0x4654('0xde')]();}}else this[_0x4654('0x13e')]=String(RegExp['$1']);}},Game_Actor[_0x4654('0x8d')]['getBattlePortraitFilename']=function(){if(this[_0x4654('0xd0')]()!=='')return this[_0x4654('0xd0')]();else{if(Imported[_0x4654('0x4d2')]&&this[_0x4654('0xe4')]()!=='')return this[_0x4654('0xe4')]();}return'';},Game_Actor[_0x4654('0x8d')][_0x4654('0xd0')]=function(){if(this[_0x4654('0x13e')]===undefined)this[_0x4654('0x146')]();return this[_0x4654('0x13e')];},Game_Actor[_0x4654('0x8d')][_0x4654('0x2e6')]=function(_0xbbb56f){if(this[_0x4654('0x13e')]===undefined)this[_0x4654('0x146')]();this[_0x4654('0x13e')]=_0xbbb56f;if(SceneManager['isSceneBattle']()&&$gameParty[_0x4654('0x515')]()[_0x4654('0x386')](this)){const _0x3030a8=SceneManager[_0x4654('0xda')][_0x4654('0x16d')];if(_0x3030a8)_0x3030a8[_0x4654('0x2f0')](this);}},Game_Actor[_0x4654('0x8d')][_0x4654('0x734')]=function(){return!![];},Game_Actor[_0x4654('0x8d')][_0x4654('0x127')]=function(){if(!this[_0x4654('0x5c2')]()&&BattleManager['_autoBattle'])return!![];return Game_Battler[_0x4654('0x8d')][_0x4654('0x127')]['call'](this);},VisuMZ['BattleCore'][_0x4654('0x59c')]=Game_Actor[_0x4654('0x8d')]['makeActionList'],Game_Actor[_0x4654('0x8d')]['makeActionList']=function(){if(BattleManager[_0x4654('0x785')]&&!ConfigManager[_0x4654('0x3f7')]){if('bfZot'===_0x4654('0x366')){function _0x257b61(){this['_borderPortraitSprite']['x']=this[_0x4654('0x564')],this[_0x4654('0x657')]=this['width']*0x3/0x4;}}else return this['makeActionListAutoAttack']();}else{return VisuMZ[_0x4654('0x1f')][_0x4654('0x59c')][_0x4654('0x5a5')](this);;}},Game_Actor[_0x4654('0x8d')][_0x4654('0x5ce')]=function(){const _0xf7d4f2=[],_0x3c9e72=new Game_Action(this);return _0x3c9e72[_0x4654('0x2aa')](),_0xf7d4f2[_0x4654('0x128')](_0x3c9e72),_0xf7d4f2;},Game_Actor[_0x4654('0x8d')][_0x4654('0x6ea')]=function(){if(this[_0x4654('0x70e')]()[_0x4654('0x762')][_0x4654('0x2a0')](/<BATTLE COMMANDS>\s*([\s\S]*)\s*<\/BATTLE COMMANDS>/i)){if('rdJGf'!==_0x4654('0x76f')){function _0x17a3a4(){_0xa9b57f[_0x4654('0x1f')][_0x4654('0x62b')][_0x4654('0x5a5')](this,_0x2a83a0),this[_0x4654('0x6f5')](_0x3ce805);}}else return String(RegExp['$1'])['split'](/[\r\n]+/);}else return VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x3a')][_0x4654('0x660')];},Game_Actor[_0x4654('0x8d')][_0x4654('0x6a3')]=function(){if(this[_0x4654('0x91')][_0x4654('0x4c8')]!==undefined)return this[_0x4654('0x91')]['svAnchorX'];return this[_0x4654('0x30c')]()[_0x4654('0x762')]['match'](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)?(this[_0x4654('0x91')][_0x4654('0x4c8')]=eval(RegExp['$1']),this[_0x4654('0x91')][_0x4654('0x6c9')]=eval(RegExp['$2'])):this['_cache'][_0x4654('0x4c8')]=Game_Battler[_0x4654('0x8d')][_0x4654('0x6a3')]['call'](this),this[_0x4654('0x91')][_0x4654('0x4c8')];},Game_Actor[_0x4654('0x8d')][_0x4654('0x341')]=function(){if(this[_0x4654('0x91')][_0x4654('0x6c9')]!==undefined)return this['_cache'][_0x4654('0x6c9')];if(this[_0x4654('0x30c')]()[_0x4654('0x762')]['match'](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)){if(_0x4654('0x27')!==_0x4654('0x27')){function _0x13ea35(){_0x2d2e6c[_0x4654('0x1f')][_0x4654('0xf4')][_0x4654('0x5a5')](this,_0x14e05a),this[_0x4654('0x223')]();}}else this[_0x4654('0x91')][_0x4654('0x4c8')]=eval(RegExp['$1']),this[_0x4654('0x91')][_0x4654('0x6c9')]=eval(RegExp['$2']);}else this['_cache'][_0x4654('0x6c9')]=Game_Battler[_0x4654('0x8d')]['svBattlerAnchorY'][_0x4654('0x5a5')](this);return this[_0x4654('0x91')][_0x4654('0x6c9')];},Game_Actor[_0x4654('0x8d')][_0x4654('0x42d')]=function(){if(this[_0x4654('0x91')]['svShadow']!==undefined)return this[_0x4654('0x91')][_0x4654('0x4c2')];if(this['actor']()[_0x4654('0x762')][_0x4654('0x2a0')](/<SIDEVIEW SHOW SHADOW>/i))this[_0x4654('0x91')][_0x4654('0x4c2')]=!![];else{if(this['actor']()[_0x4654('0x762')][_0x4654('0x2a0')](/<SIDEVIEW HIDE SHADOW>/i)){if(_0x4654('0x791')!==_0x4654('0x791')){function _0x15b5b9(){return this[_0x4654('0x199')]()[_0x4654('0x2ff')];}}else this['_cache'][_0x4654('0x4c2')]=![];}else this[_0x4654('0x91')]['svShadow']=Game_Battler[_0x4654('0x8d')][_0x4654('0x42d')][_0x4654('0x5a5')](this);}return this['_cache'][_0x4654('0x4c2')];},Game_Actor[_0x4654('0x8d')]['performAction']=function(_0xe2544b){Game_Battler[_0x4654('0x8d')][_0x4654('0x38f')]['call'](this,_0xe2544b),this[_0x4654('0x6df')](_0xe2544b);},Game_Actor[_0x4654('0x8d')][_0x4654('0x1ff')]=function(){const _0x55c76f=this[_0x4654('0x4a6')](),_0x55e9dd=_0x55c76f[0x0]?_0x55c76f[0x0][_0x4654('0x584')]:0x0;return $dataSystem[_0x4654('0x527')][_0x55e9dd];},VisuMZ[_0x4654('0x1f')][_0x4654('0x646')]=Game_Enemy['prototype'][_0x4654('0x661')],Game_Enemy[_0x4654('0x8d')][_0x4654('0x661')]=function(_0x51b78c,_0x512784,_0x503970){_0x51b78c=DataManager[_0x4654('0x26d')](_0x51b78c),VisuMZ['BattleCore'][_0x4654('0x646')]['call'](this,_0x51b78c,_0x512784,_0x503970);Imported[_0x4654('0x95')]&&this[_0x4654('0x315')]();this[_0x4654('0x50e')](),this[_0x4654('0x162')]();if(Imported[_0x4654('0x95')]){if(_0x4654('0x5bb')===_0x4654('0x682')){function _0x295e7c(){_0x2cef25[_0x4654('0x24d')](_0xca61d4),this[_0x4654('0x223')]();}}else this['recoverAll']();}},Game_Enemy['prototype'][_0x4654('0x50e')]=function(){const _0x24b190=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x51a')];this[_0x4654('0x228')]=_0x24b190[_0x4654('0x666')],this[_0x4654('0x73f')]={};},Game_Enemy[_0x4654('0x8d')][_0x4654('0x162')]=function(){const _0xf03672=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x51a')],_0x2dfee4=this[_0x4654('0x360')]()[_0x4654('0x762')];this['_svBattlerData']={'name':'','wtypeId':_0xf03672[_0x4654('0x6a4')],'collapse':_0xf03672[_0x4654('0xa9')],'motionIdle':_0xf03672[_0x4654('0x186')],'width':_0xf03672[_0x4654('0x6b1')]||0x40,'height':_0xf03672[_0x4654('0x4cf')]||0x40,'anchorX':_0xf03672[_0x4654('0x118')]||0x0,'anchorY':_0xf03672[_0x4654('0x760')]||0x0,'shadow':_0xf03672[_0x4654('0x328')]};_0x2dfee4[_0x4654('0x2a0')](/<ATTACK ANIMATION:[ ](\d+)>/i)&&(this[_0x4654('0x228')]=Number(RegExp['$1']));const _0xa7d37c=this[_0x4654('0x73f')];if(_0x2dfee4[_0x4654('0x2a0')](/<SIDEVIEW BATTLER: (.*)>/i))_0xa7d37c[_0x4654('0x18f')]=String(RegExp['$1']);else{if(_0x2dfee4[_0x4654('0x2a0')](/<SIDEVIEW BATTLERS>\s*([\s\S]*)\s*<\/SIDEVIEW BATTLERS>/i)){if(_0x4654('0xc1')!=='TXelN'){const _0x121d49=String(RegExp['$1'])[_0x4654('0x5d2')](/[\r\n]+/)[_0x4654('0x314')]('');_0xa7d37c[_0x4654('0x18f')]=DataManager[_0x4654('0x6a')](_0x121d49);}else{function _0x455ea6(){_0x1a160a=_0x2496e4[_0x4654('0x1f')]['JS'][_0x1b50f3][_0x4654('0x5a5')](this,this['subject'](),_0x58c23d,this[_0x4654('0x1f7')](),_0x435532);if(_0x48c399)_0x3e457a=_0x49bdb9;}}}}_0x2dfee4[_0x4654('0x2a0')](/<SIDEVIEW ANCHOR: (.*), (.*)>/i)&&(_0xa7d37c[_0x4654('0x499')]=eval(RegExp['$1']),_0xa7d37c[_0x4654('0x2ff')]=eval(RegExp['$2']));if(_0x2dfee4[_0x4654('0x2a0')](/<SIDEVIEW COLLAPSE>/i))_0xa7d37c['collapse']=!![];else{if(_0x2dfee4[_0x4654('0x2a0')](/<SIDEVIEW NO COLLAPSE>/i)){if('mwtcC'===_0x4654('0x9f')){function _0x1c7e29(){return _0x4c40f2[_0x4654('0x47a')]()[_0x4654('0x386')](this[_0x4654('0x69e')]);}}else _0xa7d37c[_0x4654('0x218')]=![];}}if(_0x2dfee4['match'](/<SIDEVIEW SHOW SHADOW>/i)){if(_0x4654('0x304')===_0x4654('0x2c8')){function _0x1a3683(){_0x1ef440=_0x1df967[this[_0x4654('0x1e4')][_0x31d315][_0x4654('0x2ae')]];}}else _0xa7d37c[_0x4654('0x638')]=!![];}else _0x2dfee4[_0x4654('0x2a0')](/<SIDEVIEW HIDE SHADOW>/i)&&(_0xa7d37c[_0x4654('0x638')]=![]);if(_0x2dfee4[_0x4654('0x2a0')](/<SIDEVIEW IDLE MOTION: (.*)>/i)){if(_0x4654('0x1a1')!=='WnQUq'){function _0x51190a(){this['startMotion'](_0x4654('0x794'));}}else _0xa7d37c[_0x4654('0x4a3')]=String(RegExp['$1'])[_0x4654('0x134')]()['trim']();}else{if(_0x2dfee4['match'](/<SIDEVIEW IDLE MOTIONS>\s*([\s\S]*)\s*<\/SIDEVIEW IDLE MOTIONS>/i)){if(_0x4654('0x1c0')!==_0x4654('0x1c0')){function _0x308cdd(){this[_0x4654('0x128')](_0x4654('0x4b0')),this[_0x4654('0x128')](_0x4654('0x2e4')),this['push']('addText',_0x50e2ed[_0x4654('0x31f')](_0xc68dbf[_0x4654('0x18f')]()));}}else{const _0x41174b=String(RegExp['$1'])['split'](/[\r\n]+/)[_0x4654('0x314')]('');_0xa7d37c[_0x4654('0x4a3')]=DataManager[_0x4654('0x6a')](_0x41174b);}}}if(_0x2dfee4[_0x4654('0x2a0')](/<SIDEVIEW SIZE: (\d+), (\d+)>/i)){if(_0x4654('0x609')==='lqttb'){function _0x5ed947(){if(!_0x21973c[_0x4654('0x443')]())return;const _0x596c40=_0x1afc63[_0x4654('0x779')]();if(!_0x596c40)return;_0x596c40[_0x4654('0xbd')](_0x4654('0x4fd'));}}else _0xa7d37c[_0x4654('0x564')]=Number(RegExp['$1']),_0xa7d37c[_0x4654('0x2e8')]=Number(RegExp['$2']);}if(_0x2dfee4[_0x4654('0x2a0')](/<SIDEVIEW WEAPON: (.*)>/i)){if(_0x4654('0x64')!==_0x4654('0x70b'))_0xa7d37c[_0x4654('0x584')]=DataManager[_0x4654('0x444')](RegExp['$1']);else{function _0x321047(){this['_cache'][_0x4654('0x4c8')]=_0x1066ca(_0x48438f['$1']),this[_0x4654('0x91')][_0x4654('0x6c9')]=_0x3ad7c9(_0x22d8c1['$2']);}}}else{if(_0x2dfee4[_0x4654('0x2a0')](/<SIDEVIEW WEAPONS>\s*([\s\S]*)\s*<\/SIDEVIEW WEAPONS>/i)){const _0x1d6eb3=String(RegExp['$1'])[_0x4654('0x5d2')](/[\r\n]+/)[_0x4654('0x314')](''),_0x52d72e=DataManager[_0x4654('0x6a')](_0x1d6eb3);_0xa7d37c[_0x4654('0x584')]=DataManager[_0x4654('0x444')](_0x52d72e);}}if(Imported['VisuMZ_1_ElementStatusCore']){if(_0x4654('0x41e')===_0x4654('0x41e')){const _0x1fb254=this[_0x4654('0x37')]();for(const _0x550bb2 of _0x1fb254){const _0x5245fc=this[_0x4654('0x3d6')](_0x550bb2)[_0x4654('0xee')][_0x4654('0x29d')]()[_0x4654('0x512')](),_0x1b707e=_0x550bb2[_0x4654('0x29d')]()[_0x4654('0x512')]();if(_0x2dfee4[_0x4654('0x2a0')](VisuMZ[_0x4654('0x3c9')][_0x4654('0x62f')][_0x4654('0x1d0')['format'](_0x1b707e,_0x5245fc)]))_0xa7d37c[_0x4654('0x18f')]=String(RegExp['$1']);else{if(_0x2dfee4[_0x4654('0x2a0')](VisuMZ[_0x4654('0x3c9')][_0x4654('0x62f')]['SvBattlerMass-%1-%2'[_0x4654('0x31f')](_0x1b707e,_0x5245fc)])){const _0x31f5fd=String(RegExp['$1'])[_0x4654('0x5d2')](/[\r\n]+/)[_0x4654('0x314')]('');_0xa7d37c[_0x4654('0x18f')]=DataManager[_0x4654('0x6a')](_0x31f5fd);}}if(_0x2dfee4[_0x4654('0x2a0')](VisuMZ['ElementStatusCore'][_0x4654('0x62f')][_0x4654('0x194')[_0x4654('0x31f')](_0x1b707e,_0x5245fc)])){if(_0x4654('0x5fe')!=='douVD')_0xa7d37c[_0x4654('0x584')]=DataManager[_0x4654('0x444')](RegExp['$1']);else{function _0x35e3c9(){this['_colorType']=_0x17880d['mpDamage']>=0x0?0x2:0x3,this[_0x4654('0x29')](_0x3c4be1[_0x4654('0x5c8')]);}}}else{if(_0x2dfee4[_0x4654('0x2a0')](VisuMZ[_0x4654('0x3c9')][_0x4654('0x62f')][_0x4654('0x543')[_0x4654('0x31f')](_0x1b707e,_0x5245fc)])){if('bcWWa'===_0x4654('0x4d5')){function _0x24816b(){return this[_0x4654('0x1fd')]();}}else{const _0x81d6f8=String(RegExp['$1'])[_0x4654('0x5d2')](/[\r\n]+/)[_0x4654('0x314')](''),_0xe1f308=DataManager[_0x4654('0x6a')](_0x81d6f8);_0xa7d37c[_0x4654('0x584')]=DataManager['getWtypeIdWithName'](_0xe1f308);}}}if(_0x2dfee4[_0x4654('0x2a0')](VisuMZ[_0x4654('0x3c9')][_0x4654('0x62f')][_0x4654('0x4b1')['format'](_0x1b707e,_0x5245fc)])){if(_0x4654('0x686')!==_0x4654('0x686')){function _0x25ff05(){this[_0x4654('0x5ad')](_0x1e6fc6);for(const _0x898855 of _0x10808a[_0x4654('0x12b')]){_0x898855[_0x4654('0x3a1')]&&_0x898855[_0x4654('0x3a1')]();}_0x230678['destroy']();}}else _0xa7d37c['motionIdle']=String(RegExp['$1'])[_0x4654('0x134')]()[_0x4654('0x512')]();}else{if(_0x2dfee4['match'](VisuMZ[_0x4654('0x3c9')][_0x4654('0x62f')][_0x4654('0x2b7')['format'](_0x1b707e,_0x5245fc)])){const _0x4c320b=String(RegExp['$1'])[_0x4654('0x5d2')](/[\r\n]+/)[_0x4654('0x314')]('');_0xa7d37c[_0x4654('0x4a3')]=DataManager[_0x4654('0x6a')](_0x4c320b);}}}}else{function _0x2612f3(){this[_0x4654('0x51f')](_0x4654('0x53a'));}}}},Game_Enemy[_0x4654('0x8d')]['attackAnimationId1']=function(){return this[_0x4654('0x228')]||0x0;},Game_Enemy['prototype'][_0x4654('0x4a9')]=function(){return 0x0;},Game_Enemy['prototype'][_0x4654('0x189')]=function(){if(this[_0x4654('0x360')]()[_0x4654('0x762')][_0x4654('0x2a0')](/<BATTLER SPRITE CANNOT MOVE>/i))return![];return Game_Battler[_0x4654('0x8d')][_0x4654('0x189')][_0x4654('0x5a5')](this);},Game_Enemy['prototype'][_0x4654('0x21f')]=function(){const _0x47b404=[];for(const _0xcbfa3d of this[_0x4654('0x360')]()['actions']){const _0x5a8823=$dataSkills[_0xcbfa3d[_0x4654('0x22c')]];if(_0x5a8823&&!_0x47b404[_0x4654('0x386')](_0x5a8823))_0x47b404['push'](_0x5a8823);}return _0x47b404;},Game_Enemy['prototype'][_0x4654('0x199')]=function(){if(this[_0x4654('0x73f')]!==undefined)return this[_0x4654('0x73f')];return this[_0x4654('0x162')](),this[_0x4654('0x73f')];},Game_Enemy[_0x4654('0x8d')][_0x4654('0x2fb')]=function(){return this[_0x4654('0x199')]()[_0x4654('0x18f')]!=='';},Game_Enemy[_0x4654('0x8d')]['svBattlerName']=function(){return this[_0x4654('0x199')]()[_0x4654('0x18f')];},Game_Enemy['prototype'][_0x4654('0x38f')]=function(_0x3ab381){Game_Battler['prototype'][_0x4654('0x38f')]['call'](this,_0x3ab381);if(this[_0x4654('0x2fb')]())this[_0x4654('0x6df')](_0x3ab381);},Game_Enemy[_0x4654('0x8d')]['performAttack']=function(){const _0x4f5e5d=this[_0x4654('0x199')]()['wtypeId']||0x0,_0x3629ed=$dataSystem['attackMotions'][_0x4f5e5d];if(_0x3629ed){if(_0x3629ed[_0x4654('0x709')]===0x0)this[_0x4654('0x741')](_0x4654('0x473'));else{if(_0x3629ed[_0x4654('0x709')]===0x1)this[_0x4654('0x741')](_0x4654('0x2c1'));else{if(_0x3629ed[_0x4654('0x709')]===0x2){if(_0x4654('0xbf')===_0x4654('0x639')){function _0x2d55c9(){for(const _0x2d4810 of _0x368264){for(const _0x2fb107 of _0x26d6ed){const _0x2ff8ca=_0x5703b1[0x0][_0x4654('0x31f')](_0x2fb107[0x0],_0x2d4810[0x0]),_0x22a44c=_0x3bbeb4[0x1][_0x4654('0x31f')](_0x2fb107[0x1],_0x2d4810[0x1])[_0x4654('0x512')](),_0x46af3e=new _0x3c2db5(_0x41f8dc[_0x4654('0x31f')](_0x22a44c),'i');_0x263929[_0x2ff8ca]=_0x46af3e;}}}}else this[_0x4654('0x741')](_0x4654('0x108'));}}}this[_0x4654('0x546')](_0x3629ed[_0x4654('0x255')]);}},Game_Enemy[_0x4654('0x8d')][_0x4654('0x1ff')]=function(){const _0x406642=this[_0x4654('0x199')]()['wtypeId']||0x0;return $dataSystem[_0x4654('0x527')][_0x406642];},Game_Enemy[_0x4654('0x8d')][_0x4654('0x769')]=function(){Game_Battler[_0x4654('0x8d')][_0x4654('0x769')][_0x4654('0x5a5')](this);if(this['isSpriteVisible']()&&this[_0x4654('0x2fb')]()){if(_0x4654('0x68e')!==_0x4654('0x68e')){function _0x2c5cde(){let _0x4e47e6=_0x5a298d[_0x4654('0x1f')][_0x4654('0xc4')][_0x4654('0x5a5')](this);const _0x41a30b=_0x2e227e[_0x4654('0x1f')][_0x4654('0x1f3')];if(_0x41a30b[_0x4654('0x505')][_0x4654('0x492')]&&_0x41a30b[_0x4654('0x505')][_0x4654('0x99')])_0x4e47e6+=0x2;if(_0x41a30b[_0x4654('0x2a1')][_0x4654('0x492')]&&_0x41a30b[_0x4654('0x2a1')][_0x4654('0x99')])_0x4e47e6+=0x1;return _0x4e47e6;}}else this[_0x4654('0x741')]('damage');}SoundManager[_0x4654('0x565')]();},Game_Enemy[_0x4654('0x8d')][_0x4654('0x6b7')]=function(){Game_Battler['prototype'][_0x4654('0x6b7')][_0x4654('0x5a5')](this),this[_0x4654('0x741')](_0x4654('0xb2'));},Game_Enemy['prototype']['performMagicEvasion']=function(){Game_Battler[_0x4654('0x8d')][_0x4654('0x490')][_0x4654('0x5a5')](this),this['requestMotion'](_0x4654('0xb2'));},Game_Enemy['prototype'][_0x4654('0xb8')]=function(){Game_Battler['prototype'][_0x4654('0xb8')][_0x4654('0x5a5')](this),this[_0x4654('0x41')]();},Game_Enemy['prototype'][_0x4654('0x2c3')]=function(){if(this[_0x4654('0x2fb')]()){if(this[_0x4654('0x2d0')]()>=0x1)return!![];return this['svBattlerData']()[_0x4654('0x218')];}else{if(_0x4654('0x1ac')===_0x4654('0x1ac'))return!![];else{function _0x48d483(){return _0x29ad34[_0x4654('0x1f')][_0x4654('0x2eb')][_0x4654('0x5a5')](this);}}}},Game_Enemy['prototype']['svBattlerAnchorX']=function(){return this[_0x4654('0x199')]()['anchorX'];},Game_Enemy[_0x4654('0x8d')][_0x4654('0x341')]=function(){return this[_0x4654('0x199')]()[_0x4654('0x2ff')];},Game_Enemy[_0x4654('0x8d')]['svBattlerShadowVisible']=function(){return this[_0x4654('0x199')]()[_0x4654('0x638')];},VisuMZ['BattleCore'][_0x4654('0x11e')]=Game_Enemy[_0x4654('0x8d')][_0x4654('0x3e4')],Game_Enemy['prototype'][_0x4654('0x3e4')]=function(_0x484789){VisuMZ[_0x4654('0x1f')][_0x4654('0x11e')][_0x4654('0x5a5')](this,_0x484789),this['clearBattleCoreData'](),this[_0x4654('0x162')]();const _0x335d68=this[_0x4654('0x770')]();if(_0x335d68)_0x335d68[_0x4654('0x2b3')](this);},Game_Unit[_0x4654('0x8d')][_0x4654('0x2d6')]=function(_0x282a14){for(const _0x2bf695 of this[_0x4654('0x552')]()){if(_0x2bf695)_0x2bf695[_0x4654('0x2d6')](_0x282a14);}},Game_Unit[_0x4654('0x8d')][_0x4654('0x589')]=function(){const _0x205720=this[_0x4654('0x5e1')]();return _0x205720[Math['randomInt'](_0x205720['length'])];},VisuMZ['BattleCore'][_0x4654('0x28e')]=Game_Map['prototype'][_0x4654('0x43')],Game_Map[_0x4654('0x8d')]['setupBattleback']=function(){VisuMZ[_0x4654('0x1f')][_0x4654('0x28e')]['call'](this),this[_0x4654('0x34f')]();},Game_Map[_0x4654('0x8d')][_0x4654('0x34f')]=function(){this[_0x4654('0x5fa')]={},this[_0x4654('0x3e5')]={};if(!$dataMap)return;const _0x122f68=$dataMap[_0x4654('0x762')];if(!_0x122f68)return;const _0x54eacf=_0x122f68[_0x4654('0x2a0')](/<REGION (\d+) BATTLEBACK(\d+): (.*)>/gi);if(_0x54eacf){if(_0x4654('0x27b')===_0x4654('0x27b'))for(const _0x3ce252 of _0x54eacf){if(_0x4654('0x4e')==='Mxwca'){function _0xacb3a(){const _0x11f416=this[_0x4654('0x1f7')]()[_0x4654('0x762')];if(_0x11f416[_0x4654('0x2a0')](/<ALWAYS HIT>/i))return 0x1;else{if(_0x11f416[_0x4654('0x2a0')](/<ALWAYS HIT RATE: (\d+)([%％])>/i))return _0x57a0be(_0x47691b['$1'])/0x64;else{let _0x467f78=_0x551035[_0x4654('0x1f')][_0x4654('0x340')][_0x4654('0x5a5')](this,_0x828681);return _0x467f78=this[_0x4654('0x2c6')][_0x4654('0xaa')]*_0x467f78+this[_0x4654('0x2c6')][_0x4654('0x475')],_0x467f78;}}}}else{_0x3ce252[_0x4654('0x2a0')](/<REGION (\d+) BATTLEBACK(\d+): (.*)>/i);const _0x22a11e=Number(RegExp['$1']),_0x4e78ea=Number(RegExp['$2']),_0x1dcc83=_0x4e78ea===0x1?this[_0x4654('0x5fa')]:this[_0x4654('0x3e5')],_0x3d4ada=String(RegExp['$3']);_0x1dcc83[_0x22a11e]=_0x3d4ada;}}else{function _0x412a2c(){_0x15e7a4[_0x4654('0x8d')][_0x4654('0x557')][_0x4654('0x5a5')](this,_0x208486,_0x58c7c1,_0x2f9e79,_0x548297);}}}},VisuMZ[_0x4654('0x1f')][_0x4654('0x41c')]=Game_Map[_0x4654('0x8d')][_0x4654('0xdb')],Game_Map[_0x4654('0x8d')][_0x4654('0xdb')]=function(){const _0xf3c814=$gamePlayer[_0x4654('0x4ee')]($gamePlayer['x'],$gamePlayer['y']);if(this[_0x4654('0x5fa')]&&this[_0x4654('0x5fa')][_0xf3c814])return this['_regionBattleback1'][_0xf3c814];return VisuMZ['BattleCore'][_0x4654('0x41c')][_0x4654('0x5a5')](this);},VisuMZ[_0x4654('0x1f')][_0x4654('0x2f1')]=Game_Map[_0x4654('0x8d')]['battleback2Name'],Game_Map[_0x4654('0x8d')][_0x4654('0x26f')]=function(){const _0x4aace3=$gamePlayer[_0x4654('0x4ee')]($gamePlayer['x'],$gamePlayer['y']);if(this[_0x4654('0x5fa')]&&this[_0x4654('0x3e5')][_0x4aace3])return this[_0x4654('0x3e5')][_0x4aace3];return VisuMZ[_0x4654('0x1f')][_0x4654('0x2f1')][_0x4654('0x5a5')](this);},VisuMZ[_0x4654('0x1f')]['Game_Interpreter_PluginCommand']=Game_Interpreter['prototype'][_0x4654('0x207')],Game_Interpreter[_0x4654('0x8d')][_0x4654('0x207')]=function(_0x3ac6f6){return $gameTemp[_0x4654('0x52f')](this),VisuMZ[_0x4654('0x1f')][_0x4654('0x185')][_0x4654('0x5a5')](this,_0x3ac6f6);},VisuMZ[_0x4654('0x1f')][_0x4654('0x641')]=Game_Interpreter[_0x4654('0x8d')][_0x4654('0x6ac')],Game_Interpreter['prototype'][_0x4654('0x6ac')]=function(){if(SceneManager['isSceneBattle']()){if(_0x4654('0x4a4')==='TZUHQ'){function _0x138b04(){if(this[_0x4654('0x2ee')]){const _0x374b35=this[_0x4654('0x2ee')]['bitmap'],_0xeadc1b=this[_0x4654('0x564')]-0x8,_0x25ceba=this[_0x4654('0x2e8')],_0x1f1f5d=this[_0x4654('0x3c7')],_0x39e027=_0x47d7a3[_0x4654('0x620')](),_0x59dc12=_0x9a6969['dimColor2']();this[_0x4654('0x2ee')]['x']=0x4,_0x374b35[_0x4654('0x5cf')](_0xeadc1b,_0x25ceba),_0x374b35[_0x4654('0x395')](0x0,0x0,_0xeadc1b,_0x1f1f5d,_0x59dc12,_0x39e027,!![]),_0x374b35[_0x4654('0x65f')](0x0,_0x1f1f5d,_0xeadc1b,_0x25ceba-_0x1f1f5d*0x2,_0x39e027),_0x374b35[_0x4654('0x395')](0x0,_0x25ceba-_0x1f1f5d,_0xeadc1b,_0x1f1f5d,_0x39e027,_0x59dc12,!![]),this[_0x4654('0x2ee')][_0x4654('0x4fe')](0x0,0x0,_0xeadc1b,_0x25ceba);}}}else switch(this['_waitMode']){case _0x4654('0x290'):if(BattleManager['_spriteset'][_0x4654('0x17f')]())return!![];this[_0x4654('0x47c')]='';break;case _0x4654('0x72'):if(Imported[_0x4654('0x210')]){if($gameScreen[_0x4654('0x2d3')]()[_0x4654('0xb0')]>0x0)return!![];if($gameScreen[_0x4654('0x2d3')]()[_0x4654('0x655')]>0x0)return!![];this['_waitMode']='';break;}case'battleEffect':if(BattleManager['_spriteset'][_0x4654('0x215')]())return!![];this[_0x4654('0x47c')]='';break;case _0x4654('0x31c'):if(BattleManager['_spriteset'][_0x4654('0x2b')]())return!![];this['_waitMode']='';break;case'battleJump':if(BattleManager[_0x4654('0x67f')][_0x4654('0x5d5')]())return!![];this['_waitMode']='';break;case _0x4654('0x39b'):if(BattleManager[_0x4654('0x2f')][_0x4654('0x77a')]())return!![];this[_0x4654('0x47c')]='';break;case'battleMove':if(BattleManager[_0x4654('0x67f')][_0x4654('0x768')]())return!![];this['_waitMode']='';break;case'battleOpacity':if(BattleManager[_0x4654('0x67f')]['isAnyoneChangingOpacity']())return!![];this[_0x4654('0x47c')]='';break;case _0x4654('0x76c'):if(Imported['VisuMZ_3_ActSeqCamera']){if($gameScreen[_0x4654('0x2d3')]()[_0x4654('0x46f')]>0x0)return!![];this[_0x4654('0x47c')]='';break;}}}return VisuMZ['BattleCore'][_0x4654('0x641')][_0x4654('0x5a5')](this);},VisuMZ[_0x4654('0x1f')][_0x4654('0x51b')]=Game_Interpreter[_0x4654('0x8d')][_0x4654('0x661')],Game_Interpreter[_0x4654('0x8d')][_0x4654('0x661')]=function(_0x2db165,_0x4f875b){VisuMZ[_0x4654('0x1f')][_0x4654('0x51b')]['call'](this,_0x2db165,_0x4f875b),this[_0x4654('0x1e4')]=JsonEx[_0x4654('0x1a7')](this[_0x4654('0x1e4')]),this['setupBattleCore']();},Game_Interpreter[_0x4654('0x8d')][_0x4654('0x4dc')]=function(){const _0xd9f91b=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0xb')];for(const _0xe77032 of this['_list']){if(_0x4654('0x79f')!==_0x4654('0x22e')){if(!_0xe77032)continue;if(_0xe77032[_0x4654('0x588')]===0x12d&&!!_0xd9f91b[_0x4654('0xc8')]){if('bIlly'!=='bIlly'){function _0x3ebd4b(){if(!_0xf626c5['BattleCore']['JS'][_0x4d411d][_0x4654('0x5a5')](this,this[_0x4654('0xe5')],_0x21abec))return![];}}else{if(_0xe77032[_0x4654('0x55e')])continue;_0xe77032[_0x4654('0x55e')]=!![];const _0xd91947=this[_0x4654('0x1e4')]['indexOf'](_0xe77032),_0x53fcbc=_0xd9f91b[_0x4654('0xc8')],_0x1fa7d6={'code':0x75,'index':_0xe77032['index'],'parameters':[_0x53fcbc]};this[_0x4654('0x1e4')][_0x4654('0x156')](_0xd91947,0x0,_0x1fa7d6);}}}else{function _0x11310b(){_0xf75fd4[_0x4654('0x8d')][_0x4654('0xb8')][_0x4654('0x5a5')](this),this[_0x4654('0x41')]();}}}},VisuMZ[_0x4654('0x1f')]['BattleManager_onEncounter']=BattleManager[_0x4654('0x58e')],BattleManager[_0x4654('0x58e')]=function(){VisuMZ[_0x4654('0x1f')]['BattleManager_onEncounter'][_0x4654('0x5a5')](this),this[_0x4654('0x49f')]();},BattleManager[_0x4654('0x49f')]=function(){const _0x49e469=VisuMZ[_0x4654('0x1f')]['Settings'][_0x4654('0xb')];if(_0x49e469['BattleStartEvent']){if(_0x4654('0x180')===_0x4654('0x180'))this[_0x4654('0x561')]=!![],$gameTemp[_0x4654('0x4bc')](_0x49e469[_0x4654('0xc8')]),$gameMap[_0x4654('0x5ec')](),$gameMap[_0x4654('0x396')][_0x4654('0xa6')]=!![];else{function _0x72ab8(){_0x10c42f[_0x4654('0x33f')]=_0x110d2e[_0x4654('0x6f7')](0x1,_0xd07d88(_0x4b5573['$1']));}}}},VisuMZ['BattleCore'][_0x4654('0x1e9')]=Scene_Map[_0x4654('0x8d')]['launchBattle'],Scene_Map[_0x4654('0x8d')][_0x4654('0x6d')]=function(){BattleManager[_0x4654('0x561')]?this['battleCorePreBattleCommonEvent']():VisuMZ[_0x4654('0x1f')][_0x4654('0x1e9')]['call'](this);},Scene_Map[_0x4654('0x8d')]['battleCorePreBattleCommonEvent']=function(){this[_0x4654('0x77c')]=!![];},VisuMZ[_0x4654('0x1f')][_0x4654('0x2f8')]=SceneManager[_0x4654('0x743')],SceneManager[_0x4654('0x743')]=function(){if(BattleManager['_battleCoreBattleStartEvent'])return![];return VisuMZ[_0x4654('0x1f')][_0x4654('0x2f8')][_0x4654('0x5a5')](this);},VisuMZ[_0x4654('0x1f')]['Game_Interpreter_terminate']=Game_Interpreter[_0x4654('0x8d')][_0x4654('0x7b')],Game_Interpreter['prototype'][_0x4654('0x7b')]=function(){VisuMZ[_0x4654('0x1f')]['Game_Interpreter_terminate'][_0x4654('0x5a5')](this),this[_0x4654('0xa6')]&&(this[_0x4654('0xa6')]=undefined,SceneManager[_0x4654('0xda')][_0x4654('0x60')]());},Scene_Map['prototype']['battleCoreResumeLaunchBattle']=function(){BattleManager[_0x4654('0x561')]=undefined,this['stop']();},VisuMZ[_0x4654('0x1f')][_0x4654('0x3ab')]=Scene_ItemBase[_0x4654('0x8d')][_0x4654('0x4bd')],Scene_ItemBase[_0x4654('0x8d')][_0x4654('0x4bd')]=function(){VisuMZ[_0x4654('0x1f')][_0x4654('0x3ab')][_0x4654('0x5a5')](this),this[_0x4654('0x1f7')]()[_0x4654('0x762')]['match'](/<CUSTOM ACTION SEQUENCE>/i)&&($gameTemp[_0x4654('0x6a6')]=[]);},VisuMZ[_0x4654('0x1f')][_0x4654('0xc4')]=Scene_Options[_0x4654('0x8d')][_0x4654('0x3aa')],Scene_Options['prototype'][_0x4654('0x3aa')]=function(){let _0x1399a5=VisuMZ[_0x4654('0x1f')]['Scene_Options_maxCommands'][_0x4654('0x5a5')](this);const _0x432f88=VisuMZ[_0x4654('0x1f')]['Settings'];if(_0x432f88['AutoBattle'][_0x4654('0x492')]&&_0x432f88[_0x4654('0x505')][_0x4654('0x99')])_0x1399a5+=0x2;if(_0x432f88['HpGauge'][_0x4654('0x492')]&&_0x432f88[_0x4654('0x2a1')][_0x4654('0x99')])_0x1399a5+=0x1;return _0x1399a5;},VisuMZ[_0x4654('0x1f')][_0x4654('0x440')]=Scene_Battle[_0x4654('0x8d')][_0x4654('0xc9')],Scene_Battle['prototype'][_0x4654('0xc9')]=function(){SceneManager[_0x4654('0x1b1')]()?Scene_Message[_0x4654('0x8d')][_0x4654('0xc9')][_0x4654('0x5a5')](this):VisuMZ[_0x4654('0x1f')][_0x4654('0x440')][_0x4654('0x5a5')](this);},VisuMZ[_0x4654('0x1f')][_0x4654('0x73b')]=Scene_Battle[_0x4654('0x8d')]['stop'],Scene_Battle['prototype'][_0x4654('0x2b6')]=function(){if(SceneManager['isNextSceneBattleTransitionable']()){if(_0x4654('0x744')===_0x4654('0x4f2')){function _0x1a6f31(){this[_0x4654('0x2df')]=this['x'],this[_0x4654('0x2a8')]=this['y'],this[_0x4654('0x3a2')](),this[_0x4654('0x3ce')](),this['x']+=this[_0x4654('0x67a')](),this['y']+=this[_0x4654('0x45d')](),this['x']=_0x150194['round'](this['x']),this['y']=_0x413e28[_0x4654('0x31a')](this['y']);}}else Scene_Message[_0x4654('0x8d')][_0x4654('0x2b6')]['call'](this);}else VisuMZ['BattleCore'][_0x4654('0x73b')][_0x4654('0x5a5')](this);},VisuMZ[_0x4654('0x1f')][_0x4654('0x680')]=Scene_Battle[_0x4654('0x8d')][_0x4654('0x7b')],Scene_Battle[_0x4654('0x8d')][_0x4654('0x7b')]=function(){if(SceneManager[_0x4654('0x40c')]()){if(_0x4654('0x795')!==_0x4654('0x6d9'))Scene_Message[_0x4654('0x8d')]['terminate'][_0x4654('0x5a5')](this);else{function _0x1903d4(){return _0x34a1c6[_0x4654('0x631')]?_0x2603a0[_0x4654('0xf')]('ok'):_0x277f95[_0x4654('0x1f')]['Settings']['AutoBattle'][_0x4654('0xe9')];}}}else VisuMZ[_0x4654('0x1f')][_0x4654('0x680')][_0x4654('0x5a5')](this);},Scene_Battle[_0x4654('0x8d')][_0x4654('0x5dd')]=function(){if(ConfigManager[_0x4654('0x45f')]&&ConfigManager[_0x4654('0x550')]!==undefined){if('LQGXc'===_0x4654('0x155')){function _0xe19969(){const _0x5d01c6=this[_0x4654('0x1f7')]()[_0x4654('0x235')];return _0x5d01c6[_0x4654('0x2a0')](/(?:ENEMY|ENEMIES|FOE|FOES)/i);}}else return ConfigManager[_0x4654('0x550')];}else{if(this[_0x4654('0x329')]()===_0x4654('0x5eb')){if('bUXgE'===_0x4654('0x513'))return![];else{function _0x24fd1a(){return _0x4cc90c[_0x4654('0x5e1')]();}}}else{return Scene_Message[_0x4654('0x8d')][_0x4654('0x5dd')][_0x4654('0x5a5')](this);;}}},VisuMZ[_0x4654('0x1f')][_0x4654('0x422')]=Scene_Battle['prototype'][_0x4654('0x19a')],Scene_Battle[_0x4654('0x8d')][_0x4654('0x19a')]=function(){this[_0x4654('0x454')](),VisuMZ['BattleCore'][_0x4654('0x422')]['call'](this),this[_0x4654('0x456')]();},VisuMZ[_0x4654('0x1f')][_0x4654('0x121')]=Scene_Battle[_0x4654('0x8d')][_0x4654('0x2b0')],Scene_Battle[_0x4654('0x8d')][_0x4654('0x2b0')]=function(){VisuMZ['BattleCore']['Scene_Battle_createCancelButton']['call'](this);if(this[_0x4654('0x329')]()===_0x4654('0x5eb')){if(_0x4654('0x52d')==='mVEFS'){function _0x3e0310(){_0x5d0064[_0x4654('0x523')](_0x12470d[0x0],_0x3a40d2[0x1],_0x39422e[0x2]);if(_0x18e410[0x3])this[_0x4654('0x20d')](_0x39bd8c[0x2]);return!![];}}else this[_0x4654('0x40')]();}},Scene_Battle[_0x4654('0x8d')][_0x4654('0x6b4')]=function(_0x1a6d19){_0x1a6d19?(this[_0x4654('0x16')]['x']=(Graphics['width']-Graphics['boxWidth'])/0x2,this['_windowLayer']['y']=(Graphics[_0x4654('0x2e8')]-Graphics[_0x4654('0x37f')])/0x2):(this['_windowLayer']['x']=Graphics[_0x4654('0x564')]*0xa,this[_0x4654('0x16')]['y']=Graphics[_0x4654('0x2e8')]*0xa);},VisuMZ[_0x4654('0x1f')]['Scene_Battle_selectNextCommand']=Scene_Battle['prototype'][_0x4654('0x48')],Scene_Battle[_0x4654('0x8d')][_0x4654('0x48')]=function(){const _0x58762b=BattleManager['actor']();if(_0x58762b)_0x58762b[_0x4654('0x770')]()[_0x4654('0x224')]();VisuMZ['BattleCore'][_0x4654('0x740')][_0x4654('0x5a5')](this);},VisuMZ['BattleCore'][_0x4654('0x733')]=Scene_Battle[_0x4654('0x8d')][_0x4654('0x129')],Scene_Battle[_0x4654('0x8d')][_0x4654('0x129')]=function(){const _0x3ceb49=BattleManager['actor']();if(_0x3ceb49)_0x3ceb49[_0x4654('0x770')]()[_0x4654('0x224')]();VisuMZ[_0x4654('0x1f')][_0x4654('0x733')]['call'](this);},VisuMZ[_0x4654('0x1f')][_0x4654('0x5d')]=Scene_Battle['prototype']['logWindowRect'],Scene_Battle[_0x4654('0x8d')][_0x4654('0x23e')]=function(){if(VisuMZ['BattleCore'][_0x4654('0x1f3')][_0x4654('0x5be')][_0x4654('0x14')])return VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x5be')]['BattleLogRectJS']['call'](this);return VisuMZ['BattleCore'][_0x4654('0x5d')][_0x4654('0x5a5')](this);},VisuMZ[_0x4654('0x1f')][_0x4654('0x3c2')]=Scene_Battle[_0x4654('0x8d')][_0x4654('0x401')],Scene_Battle[_0x4654('0x8d')][_0x4654('0x401')]=function(){VisuMZ[_0x4654('0x1f')]['Scene_Battle_createPartyCommandWindow']['call'](this),this[_0x4654('0x1df')]();},Scene_Battle[_0x4654('0x8d')]['createPartyCommandWindowBattleCore']=function(){const _0x39c010=this[_0x4654('0x429')];_0x39c010[_0x4654('0x2af')](_0x4654('0x305'),this[_0x4654('0x21c')][_0x4654('0x4f')](this)),_0x39c010[_0x4654('0x2af')](_0x4654('0x5d1'),this[_0x4654('0x2a6')]['bind'](this));const _0x4a3bf2=this[_0x4654('0x329')]();switch(_0x4a3bf2){case'xp':case _0x4654('0x4ad'):return this[_0x4654('0x429')][_0x4654('0x135')](0x1);break;}},Scene_Battle[_0x4654('0x8d')][_0x4654('0x21c')]=function(){BattleManager[_0x4654('0x785')]=!![],$gameParty[_0x4654('0x220')](),this[_0x4654('0x48')]();},Scene_Battle[_0x4654('0x8d')][_0x4654('0x2a6')]=function(){this[_0x4654('0x60d')]()?(this[_0x4654('0x519')]=!![],this[_0x4654('0x2f')]['push'](_0x4654('0x261'),VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0xe2')][_0x4654('0x423')])):this[_0x4654('0x48a')]();},Scene_Battle['prototype'][_0x4654('0x60d')]=function(){return BattleManager['isActiveTpb']();},Scene_Battle[_0x4654('0x8d')][_0x4654('0x48a')]=function(){this[_0x4654('0x519')]=![],this[_0x4654('0x67f')][_0x4654('0x53c')](),this[_0x4654('0x16')]['visible']=![],SceneManager[_0x4654('0x2ec')](),SceneManager[_0x4654('0x128')](Scene_Options);},VisuMZ[_0x4654('0x1f')][_0x4654('0x3d5')]=Scene_Battle[_0x4654('0x8d')][_0x4654('0x1dc')],Scene_Battle[_0x4654('0x8d')]['updateBattleProcess']=function(){VisuMZ[_0x4654('0x1f')][_0x4654('0x3d5')][_0x4654('0x5a5')](this);if(this[_0x4654('0x519')]&&!BattleManager[_0x4654('0x672')])this[_0x4654('0x48a')]();},Scene_Battle[_0x4654('0x8d')]['createAutoBattleWindow']=function(){const _0x2e74b1=this[_0x4654('0x57')]();this[_0x4654('0x63')]=new Window_AutoBattleCancel(_0x2e74b1),this[_0x4654('0x63')][_0x4654('0x3fe')](),this[_0x4654('0x43f')](this['_autoBattleWindow']);},Scene_Battle[_0x4654('0x8d')][_0x4654('0x57')]=function(){return VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x505')]['AutoBattleRect'][_0x4654('0x5a5')](this);},Scene_Battle[_0x4654('0x8d')][_0x4654('0x610')]=function(){return VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0xe2')][_0x4654('0x7c')];},VisuMZ[_0x4654('0x1f')][_0x4654('0x4')]=Scene_Battle[_0x4654('0x8d')][_0x4654('0x111')],Scene_Battle[_0x4654('0x8d')][_0x4654('0x111')]=function(){if(this[_0x4654('0x610')]()){if(_0x4654('0x722')!==_0x4654('0x722')){function _0x43dcb2(){this['_pattern']=(this[_0x4654('0x446')]+0x1)%0x4;}}else this[_0x4654('0x6ed')]();}else{if(_0x4654('0x57d')==='ZfPJW'){function _0x5ae848(){_0x3d408f[_0x4654('0x741')](_0x55cfca);}}else VisuMZ['BattleCore'][_0x4654('0x4')]['call'](this);}},Scene_Battle[_0x4654('0x8d')][_0x4654('0x6ed')]=function(){BattleManager[_0x4654('0x1a9')]()&&this['selectNextCommand']();},VisuMZ[_0x4654('0x1f')][_0x4654('0x683')]=Scene_Battle[_0x4654('0x8d')][_0x4654('0x721')],Scene_Battle[_0x4654('0x8d')][_0x4654('0x721')]=function(){VisuMZ['BattleCore'][_0x4654('0x683')][_0x4654('0x5a5')](this),this['createActorCommandWindowBattleCore']();},Scene_Battle[_0x4654('0x8d')][_0x4654('0x7e')]=function(){const _0x292864=this['_actorCommandWindow'];_0x292864[_0x4654('0x2af')]('escape',this['actorCommandEscape'][_0x4654('0x4f')](this)),_0x292864[_0x4654('0x2af')](_0x4654('0x305'),this[_0x4654('0x1d2')][_0x4654('0x4f')](this)),_0x292864[_0x4654('0x2af')]('singleSkill',this[_0x4654('0x450')]['bind'](this));if(this[_0x4654('0x610')]()&&BattleManager[_0x4654('0x3c6')]()){if(_0x4654('0x72b')!==_0x4654('0x295'))delete _0x292864['_handlers'][_0x4654('0x27c')];else{function _0x509729(){_0x484ed1[_0x4654('0x218')]=![];}}}},Scene_Battle[_0x4654('0x8d')][_0x4654('0x1d7')]=function(){this['commandEscape']();},Scene_Battle[_0x4654('0x8d')][_0x4654('0x1d2')]=function(){BattleManager['actor']()[_0x4654('0x2a7')](),BattleManager[_0x4654('0x272')](),BattleManager[_0x4654('0x441')](),this['changeInputWindow']();},Scene_Battle[_0x4654('0x8d')][_0x4654('0x450')]=function(){const _0x4d6c78=BattleManager['inputtingAction']();_0x4d6c78['setSkill'](this[_0x4654('0x171')][_0x4654('0x5f5')]()),this['onSelectAction']();},VisuMZ['BattleCore'][_0x4654('0x405')]=Scene_Battle[_0x4654('0x8d')][_0x4654('0x404')],Scene_Battle['prototype'][_0x4654('0x404')]=function(){VisuMZ['BattleCore'][_0x4654('0x405')][_0x4654('0x5a5')](this),this['createHelpWindowBattleCore']();},Scene_Battle[_0x4654('0x8d')][_0x4654('0x1a0')]=function(){this[_0x4654('0x171')][_0x4654('0x6f9')](this[_0x4654('0x736')]),this[_0x4654('0x429')][_0x4654('0x6f9')](this[_0x4654('0x736')]);},Scene_Battle[_0x4654('0x8d')][_0x4654('0x329')]=function(){if(this[_0x4654('0x5f1')])return this[_0x4654('0x5f1')];return this[_0x4654('0x5f1')]=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x44f')][_0x4654('0x3e2')]['toLowerCase']()[_0x4654('0x512')](),this[_0x4654('0x5f1')];},VisuMZ[_0x4654('0x1f')][_0x4654('0x35e')]=Scene_Battle[_0x4654('0x8d')][_0x4654('0x6c')],Scene_Battle[_0x4654('0x8d')]['windowAreaHeight']=function(){const _0x355376=this[_0x4654('0x329')]();switch(_0x355376){case'list':return this[_0x4654('0x294')](Math[_0x4654('0x6f7')](0x1,$gameParty[_0x4654('0x77f')]()),!![]);break;default:return VisuMZ[_0x4654('0x1f')][_0x4654('0x35e')]['call'](this);break;}},VisuMZ[_0x4654('0x1f')]['Scene_Battle_helpWindowRect']=Scene_Battle[_0x4654('0x8d')][_0x4654('0x5fd')],Scene_Battle[_0x4654('0x8d')]['helpWindowRect']=function(){const _0x213822=this['battleLayoutStyle']();switch(_0x213822){case _0x4654('0x5eb'):return this[_0x4654('0x355')]();break;case _0x4654('0x71f'):case'list':case'xp':case _0x4654('0x4ad'):default:return VisuMZ[_0x4654('0x1f')][_0x4654('0x58a')][_0x4654('0x5a5')](this);break;}},Scene_Battle['prototype'][_0x4654('0x2bc')]=function(){const _0x19eb49=this['battleLayoutStyle']();switch(_0x19eb49){case'xp':case'portrait':return this['statusWindowRectXPStyle']();break;case _0x4654('0x5eb'):return this[_0x4654('0x105')]();break;case _0x4654('0x71f'):case _0x4654('0x2bf'):default:return this[_0x4654('0x55d')]();break;}},VisuMZ['BattleCore'][_0x4654('0x43e')]=Scene_Battle['prototype']['partyCommandWindowRect'],Scene_Battle[_0x4654('0x8d')][_0x4654('0x703')]=function(){const _0x39ac50=this[_0x4654('0x329')]();switch(_0x39ac50){case'xp':case _0x4654('0x4ad'):return this[_0x4654('0x76b')]();break;case _0x4654('0x5eb'):return this[_0x4654('0x64e')]();case _0x4654('0x71f'):case _0x4654('0x2bf'):default:return VisuMZ[_0x4654('0x1f')]['Scene_Battle_partyCommandWindowRect'][_0x4654('0x5a5')](this);break;}},VisuMZ[_0x4654('0x1f')][_0x4654('0x5a7')]=Scene_Battle[_0x4654('0x8d')][_0x4654('0x36c')],Scene_Battle[_0x4654('0x8d')]['updateStatusWindowPosition']=function(){const _0x5d8260=this[_0x4654('0x329')]();switch(_0x5d8260){case'xp':case'portrait':case _0x4654('0x5eb'):break;case _0x4654('0x71f'):case _0x4654('0x2bf'):default:VisuMZ[_0x4654('0x1f')][_0x4654('0x5a7')][_0x4654('0x5a5')](this);break;}},VisuMZ[_0x4654('0x1f')][_0x4654('0x3e3')]=Scene_Battle[_0x4654('0x8d')]['startActorSelection'],Scene_Battle[_0x4654('0x8d')]['startActorSelection']=function(){VisuMZ['BattleCore']['Scene_Battle_startActorSelection'][_0x4654('0x5a5')](this),this[_0x4654('0x3d3')]();},VisuMZ['BattleCore'][_0x4654('0x613')]=Scene_Battle[_0x4654('0x8d')]['startEnemySelection'],Scene_Battle[_0x4654('0x8d')]['startEnemySelection']=function(){VisuMZ[_0x4654('0x1f')]['Scene_Battle_startEnemySelection']['call'](this),this[_0x4654('0x77e')][_0x4654('0x297')](),this['makeTargetSelectionMoreVisible']();},Scene_Battle['prototype'][_0x4654('0x3d3')]=function(){const _0x11a3e8=this[_0x4654('0x329')]();if(['xp',_0x4654('0x4ad'),'border'][_0x4654('0x386')](_0x11a3e8)){if('lAcux'===_0x4654('0x77b')){function _0x48e19b(){let _0x54e47a=-0x10,_0x4997f8=0x0;const _0x2a85bf=/<SIDEVIEW WEAPON OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i,_0x3357bf=this['_battler'][_0x4654('0x11f')]()[_0x4654('0x538')](_0x248fc0=>_0x248fc0&&_0x248fc0[_0x4654('0x762')][_0x4654('0x2a0')](_0x2a85bf)?_0x774b66(_0x3171e9['$1']):0x0),_0x3baa25=this[_0x4654('0x6cd')][_0x4654('0x11f')]()['map'](_0x4fbd6f=>_0x4fbd6f&&_0x4fbd6f[_0x4654('0x762')][_0x4654('0x2a0')](_0x2a85bf)?_0x44c7f0(_0xc01cc2['$2']):0x0);_0x54e47a=_0x3357bf[_0x4654('0x644')]((_0x35c8ea,_0x2ed09b)=>_0x35c8ea+_0x2ed09b,_0x54e47a),_0x4997f8=_0x3baa25[_0x4654('0x644')]((_0x219e15,_0x460361)=>_0x219e15+_0x460361,_0x4997f8),this[_0x4654('0x611')]['x']=_0x54e47a,this[_0x4654('0x611')]['y']=_0x4997f8,this[_0x4654('0x611')][_0x4654('0x53c')]();}}else this[_0x4654('0x171')][_0x4654('0x9c')]();}if(_0x11a3e8===_0x4654('0x5eb')||this[_0x4654('0x4b9')]()){if(_0x4654('0x4f6')!==_0x4654('0x169'))this[_0x4654('0xbc')][_0x4654('0x9c')](),this[_0x4654('0x150')][_0x4654('0x9c')]();else{function _0x3084a0(){this[_0x4654('0x51f')](_0x4654('0x394'));}}}},VisuMZ[_0x4654('0x1f')]['Scene_Battle_onActorOk']=Scene_Battle[_0x4654('0x8d')][_0x4654('0x41a')],Scene_Battle[_0x4654('0x8d')]['onActorOk']=function(){VisuMZ[_0x4654('0x1f')][_0x4654('0x77d')][_0x4654('0x5a5')](this),this[_0x4654('0x54')]();},VisuMZ['BattleCore'][_0x4654('0x786')]=Scene_Battle['prototype'][_0x4654('0x256')],Scene_Battle['prototype']['onEnemyOk']=function(){VisuMZ[_0x4654('0x1f')][_0x4654('0x786')][_0x4654('0x5a5')](this),this[_0x4654('0x54')]();},Scene_Battle[_0x4654('0x8d')][_0x4654('0x54')]=function(){const _0x2d1f8e=this[_0x4654('0x329')]();if(_0x2d1f8e===_0x4654('0x5eb')||this[_0x4654('0x4b9')]()){this[_0x4654('0xbc')][_0x4654('0x3f9')]();this[_0x4654('0xbc')][_0x4654('0x4c1')]&&this[_0x4654('0xbc')][_0x4654('0x247')]();this[_0x4654('0x150')][_0x4654('0x3f9')]();if(this[_0x4654('0x150')]['active']){if('MZBVf'==='MZBVf')this['_itemWindow'][_0x4654('0x247')]();else{function _0x5a16f5(){this[_0x4654('0x5f2')]=_0x31aa8c[_0x4654('0x785')];}}}}},VisuMZ[_0x4654('0x1f')][_0x4654('0x75a')]=Scene_Battle['prototype'][_0x4654('0x119')],Scene_Battle[_0x4654('0x8d')]['onActorCancel']=function(){VisuMZ['BattleCore']['Scene_Battle_onActorCancel']['call'](this),this[_0x4654('0x780')]();},VisuMZ[_0x4654('0x1f')][_0x4654('0xe1')]=Scene_Battle[_0x4654('0x8d')][_0x4654('0x6a7')],Scene_Battle[_0x4654('0x8d')][_0x4654('0x6a7')]=function(){VisuMZ[_0x4654('0x1f')][_0x4654('0xe1')][_0x4654('0x5a5')](this),this[_0x4654('0x780')]();},Scene_Battle['prototype'][_0x4654('0x780')]=function(){const _0x27d3a2=this[_0x4654('0x329')]();if(['xp',_0x4654('0x4ad'),_0x4654('0x5eb')][_0x4654('0x386')](_0x27d3a2)){if(_0x4654('0x452')!==_0x4654('0x452')){function _0x27910c(){return _0x1b5701[_0x4654('0x1f')][_0x4654('0x4f5')]['call'](this);}}else this[_0x4654('0x171')][_0x4654('0x3f9')]();}this[_0x4654('0x54')]();},Scene_Battle[_0x4654('0x8d')][_0x4654('0x55d')]=function(){const _0x5be738=Window_BattleStatus[_0x4654('0x8d')][_0x4654('0x658')](),_0x13e472=Graphics[_0x4654('0x46b')]-0xc0,_0x3d98c1=this[_0x4654('0x6c')]()+_0x5be738,_0x3ac202=this[_0x4654('0x5dd')]()?0x0:Graphics[_0x4654('0x46b')]-_0x13e472,_0x5226bf=Graphics[_0x4654('0x37f')]-_0x3d98c1+_0x5be738;return new Rectangle(_0x3ac202,_0x5226bf,_0x13e472,_0x3d98c1);},Scene_Battle['prototype']['statusWindowRectXPStyle']=function(){const _0x19e3f4=Window_BattleStatus[_0x4654('0x8d')][_0x4654('0x658')](),_0x38a555=Graphics[_0x4654('0x46b')],_0x870764=this['windowAreaHeight']()+_0x19e3f4,_0x47a861=0x0,_0x438cdc=Graphics[_0x4654('0x37f')]-_0x870764+_0x19e3f4;return new Rectangle(_0x47a861,_0x438cdc,_0x38a555,_0x870764);},Scene_Battle[_0x4654('0x8d')]['partyCommandWindowRectXPStyle']=function(){const _0x2a788c=Graphics['boxWidth']/0x2,_0x50ef77=this['calcWindowHeight'](VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x44f')][_0x4654('0x559')],!![]),_0x8f25ca=Math[_0x4654('0x31a')]((Graphics[_0x4654('0x46b')]-_0x2a788c)/0x2),_0x297771=Graphics[_0x4654('0x37f')]-_0x50ef77-this[_0x4654('0x47')]()[_0x4654('0x2e8')];return new Rectangle(_0x8f25ca,_0x297771,_0x2a788c,_0x50ef77);},Scene_Battle[_0x4654('0x8d')][_0x4654('0x355')]=function(){const _0xe24f85=Graphics[_0x4654('0x564')],_0x14d0f3=Math['round']((Graphics[_0x4654('0x46b')]-_0xe24f85)/0x2),_0x47eb06=this[_0x4654('0x788')](),_0x5f16f8=(Graphics['height']-Graphics[_0x4654('0x37f')])/-0x2;return new Rectangle(_0x14d0f3,_0x5f16f8,_0xe24f85,_0x47eb06);},Scene_Battle[_0x4654('0x8d')]['statusWindowRectBorderStyle']=function(){const _0x23c2f9=Graphics[_0x4654('0x564')],_0x220588=Math[_0x4654('0x31a')]((Graphics[_0x4654('0x46b')]-_0x23c2f9)/0x2),_0x37c46b=this[_0x4654('0x294')](0x4,!![]),_0x100bb3=Graphics['boxHeight']-_0x37c46b+(Graphics[_0x4654('0x2e8')]-Graphics[_0x4654('0x37f')])/0x2;return new Rectangle(_0x220588,_0x100bb3,_0x23c2f9,_0x37c46b);},Scene_Battle[_0x4654('0x8d')]['partyCommandWindowRectBorderStyle']=function(){const _0x1d793c=Math['floor'](Graphics[_0x4654('0x564')]/0x3),_0x32d7ff=this[_0x4654('0x5dd')]()?(Graphics[_0x4654('0x564')]+Graphics[_0x4654('0x46b')])/0x2-_0x1d793c:(Graphics[_0x4654('0x564')]-Graphics['boxWidth'])/-0x2,_0x133746=this[_0x4654('0x355')](),_0x14d1a6=_0x133746['y']+_0x133746[_0x4654('0x2e8')],_0x43fddb=this[_0x4654('0x105')](),_0x2051c6=_0x43fddb['y']-_0x14d1a6;return new Rectangle(_0x32d7ff,_0x14d1a6,_0x1d793c,_0x2051c6);},Scene_Battle['prototype']['skillItemWindowRectBorderStyle']=function(){const _0x4b80a2=Math['ceil'](Graphics[_0x4654('0x564')]/0x3),_0x49e63a=Math[_0x4654('0x31a')]((Graphics[_0x4654('0x46b')]-_0x4b80a2)/0x2),_0x3f5d20=this['partyCommandWindowRectBorderStyle'](),_0x34956e=_0x3f5d20['y'],_0x426c43=_0x3f5d20[_0x4654('0x2e8')];return new Rectangle(_0x49e63a,_0x34956e,_0x4b80a2,_0x426c43);},Scene_Battle[_0x4654('0x8d')]['repositionCancelButtonBorderStyle']=function(){this[_0x4654('0x33b')]['y']=this[_0x4654('0x736')]['y']+this[_0x4654('0x736')][_0x4654('0x2e8')];if(this[_0x4654('0x5dd')]()){if(_0x4654('0x6b')!==_0x4654('0x6b')){function _0x4d12fe(){if(_0xaf0546)_0x9de497[_0x4654('0x2d6')](_0x27a5d1);}}else this['_cancelButton']['x']=-this[_0x4654('0x33b')][_0x4654('0x564')]-0x4;}else this[_0x4654('0x33b')]['x']=Graphics[_0x4654('0x564')]-(Graphics[_0x4654('0x564')]-Graphics[_0x4654('0x46b')])/0x2-this[_0x4654('0x33b')][_0x4654('0x564')]-0x4;},VisuMZ['BattleCore']['Scene_Battle_skillWindowRect']=Scene_Battle[_0x4654('0x8d')]['skillWindowRect'],Scene_Battle['prototype'][_0x4654('0x378')]=function(){if(this[_0x4654('0x329')]()===_0x4654('0x5eb'))return this[_0x4654('0x22f')]();else return this[_0x4654('0x4b9')]()?this[_0x4654('0x1fd')]():VisuMZ[_0x4654('0x1f')][_0x4654('0x2eb')][_0x4654('0x5a5')](this);},VisuMZ[_0x4654('0x1f')][_0x4654('0x3ba')]=Scene_Battle[_0x4654('0x8d')][_0x4654('0x283')],Scene_Battle[_0x4654('0x8d')][_0x4654('0x283')]=function(){if(this['battleLayoutStyle']()===_0x4654('0x5eb'))return this['skillItemWindowRectBorderStyle']();else{if(this[_0x4654('0x4b9')]())return this[_0x4654('0x1fd')]();else{if(_0x4654('0x257')!==_0x4654('0x2f9'))return VisuMZ[_0x4654('0x1f')][_0x4654('0x3ba')]['call'](this);else{function _0x53e951(){this[_0x4654('0x278')](...arguments);}}}}},Scene_Battle['prototype']['isSkillItemWindowsMiddle']=function(){return VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')]['BattleLayout'][_0x4654('0xdd')];},Scene_Battle[_0x4654('0x8d')][_0x4654('0x1fd')]=function(){const _0x5d2045=Sprite_Button[_0x4654('0x8d')]['blockWidth']()*0x2+0x4;let _0x28fce9=Graphics[_0x4654('0x46b')]-_0x5d2045;Imported[_0x4654('0x631')]&&SceneManager[_0x4654('0x97')]()&&(_0x28fce9+=_0x5d2045);const _0x12bbd5=this[_0x4654('0x1ed')](),_0x23f649=Graphics['boxHeight']-_0x12bbd5-this[_0x4654('0x2bc')]()[_0x4654('0x2e8')]+Window_BattleStatus[_0x4654('0x8d')][_0x4654('0x658')](),_0x36be90=0x0;return new Rectangle(_0x36be90,_0x12bbd5,_0x28fce9,_0x23f649);},Scene_Battle[_0x4654('0x8d')][_0x4654('0x454')]=function(){this[_0x4654('0x248')]=new Sprite(),this['_enemyNameContainer']['x']=this[_0x4654('0x16')]['x'],this[_0x4654('0x248')]['y']=this['_windowLayer']['y'];const _0x4522af=this[_0x4654('0x38a')][_0x4654('0x399')](this[_0x4654('0x16')]);this[_0x4654('0x469')](this[_0x4654('0x248')],_0x4522af);for(let _0x53345=0x0;_0x53345<0x8;_0x53345++){if('jvAbs'===_0x4654('0x687')){const _0x38efc5=new Window_EnemyName(_0x53345);this[_0x4654('0x248')][_0x4654('0x43f')](_0x38efc5);}else{function _0x15e2b2(){this['_immortal']=!![];}}}},Sprite_Battler[_0x4654('0x70c')]=VisuMZ['BattleCore'][_0x4654('0x1f3')][_0x4654('0x5ed')][_0x4654('0x33c')],VisuMZ['BattleCore'][_0x4654('0x178')]=Sprite_Battler[_0x4654('0x8d')][_0x4654('0x416')],Sprite_Battler[_0x4654('0x8d')][_0x4654('0x416')]=function(){VisuMZ[_0x4654('0x1f')][_0x4654('0x178')][_0x4654('0x5a5')](this),this[_0x4654('0x400')]();},Sprite_Battler['prototype'][_0x4654('0x400')]=function(){this[_0x4654('0x2df')]=0x0,this[_0x4654('0x2a8')]=0x0,this[_0x4654('0x78a')]=0x0,this[_0x4654('0x30d')]=0x0,this['_floatDuration']=0x0,this['_floatWholeDuration']=0x0,this[_0x4654('0x1a2')]=_0x4654('0x28'),this[_0x4654('0x2d5')]=0x0,this[_0x4654('0x100')]=0x0,this[_0x4654('0x39e')]=0x0,this[_0x4654('0x3f0')]=0x0,this['_targetOpacity']=0xff,this[_0x4654('0x439')]=0x0,this[_0x4654('0x627')]=0x0,this[_0x4654('0x417')]=_0x4654('0x28');},Sprite_Battler[_0x4654('0x8d')]['damageContainer']=function(){return SceneManager[_0x4654('0x443')]()?SceneManager[_0x4654('0xda')][_0x4654('0x67f')][_0x4654('0x545')]:this[_0x4654('0x28f')];},Sprite_Battler[_0x4654('0x8d')][_0x4654('0x3b9')]=function(_0x2c8bba,_0x48a61b){if(!this[_0x4654('0x6cd')][_0x4654('0x734')]())return;const _0x252d10=VisuMZ['BattleCore'][_0x4654('0x1f3')][_0x4654('0x3da')],_0x33157f=new Sprite_Damage();_0x33157f['_duration']=_0x252d10[_0x4654('0x437')],this[_0x4654('0x6db')](_0x33157f),_0x33157f[_0x4654('0x3b9')](_0x2c8bba,_0x48a61b),this['addDamageSprite'](_0x33157f);},Sprite_Battler[_0x4654('0x8d')][_0x4654('0x797')]=function(_0x5f46e6,_0x14e596,_0x1afcc0){if(!this[_0x4654('0x6cd')][_0x4654('0x734')]())return;const _0x38d6b1=VisuMZ['BattleCore']['Settings'][_0x4654('0x3da')],_0x4504ab=new Sprite_Damage();_0x4504ab[_0x4654('0x684')]=_0x38d6b1['PopupDuration'],this[_0x4654('0x6db')](_0x4504ab),_0x4504ab[_0x4654('0x797')](_0x5f46e6,_0x14e596,_0x1afcc0),this[_0x4654('0x2ab')](_0x4504ab);},Sprite_Battler[_0x4654('0x8d')]['setupDamagePopup']=function(){if(!this[_0x4654('0x6cd')][_0x4654('0x5a6')]())return;while(this[_0x4654('0x6cd')][_0x4654('0x5a6')]()){if(_0x4654('0xb3')===_0x4654('0xb3'))this[_0x4654('0x6cd')][_0x4654('0x734')]()&&this['createDamageSprite']();else{function _0x1ecf1f(){return this[_0x4654('0x70e')]()[_0x4654('0x762')][_0x4654('0x2a0')](/<BATTLE COMMANDS>\s*([\s\S]*)\s*<\/BATTLE COMMANDS>/i)?_0x32e8dc(_0x2ca35b['$1'])['split'](/[\r\n]+/):_0x2d91cd['BattleCore'][_0x4654('0x1f3')][_0x4654('0x3a')][_0x4654('0x660')];}}}this['_battler'][_0x4654('0x3a4')](),this['_battler'][_0x4654('0x415')]();},Sprite_Battler[_0x4654('0x8d')][_0x4654('0x372')]=function(){const _0x5809d6=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x3da')],_0x2420be=new Sprite_Damage();_0x2420be[_0x4654('0x684')]=_0x5809d6['PopupDuration'],this[_0x4654('0x6db')](_0x2420be),_0x2420be[_0x4654('0x661')](this['_battler']),this[_0x4654('0x2ab')](_0x2420be);},Sprite_Battler[_0x4654('0x8d')][_0x4654('0x2ab')]=function(_0x4b37e1){this[_0x4654('0x138')]['push'](_0x4b37e1);if(this[_0x4654('0x46')]())SceneManager[_0x4654('0xda')][_0x4654('0x16d')]['addDamageSprite'](_0x4b37e1,this[_0x4654('0x6cd')]);else{this[_0x4654('0x6da')]()['addChild'](_0x4b37e1);if(SceneManager[_0x4654('0x8e')]())_0x4b37e1['scale']['x']=-0x1;}},Sprite_Battler[_0x4654('0x8d')][_0x4654('0x46')]=function(){return!$gameSystem[_0x4654('0x4f9')]()&&this['_battler']&&this['_battler'][_0x4654('0x5b5')]()&&Window_BattleStatus[_0x4654('0x8d')][_0x4654('0x329')]()===_0x4654('0x4ad');},Sprite_Battler[_0x4654('0x8d')]['sortDamageSprites']=function(_0x5d948b){const _0x3adbff=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x3da')],_0x4d8993=SceneManager[_0x4654('0x8e')]()?-0x1:0x1;let _0x90845d=this['x'],_0x4a987e=this['y'];const _0x23568b=SceneManager[_0x4654('0xda')][_0x4654('0x16d')];if(_0x23568b&&this['parent']===_0x23568b){if(_0x4654('0x3bf')==='Woawo'){function _0x1b0f81(){_0x1552e7[_0x4654('0x18a')](_0x3e0af9);}}else{_0x90845d+=_0x23568b['x']-this[_0x4654('0x458')]();const _0x15f8fc=_0x23568b['lineHeight']()*0x3/0x4;_0x4a987e=_0x23568b['y']+_0x15f8fc,_0x4a987e=Math[_0x4654('0x22b')](_0x4a987e,_0x23568b['y']+this['y']-this[_0x4654('0x2e8')]+_0x15f8fc);}}_0x5d948b['x']=Math[_0x4654('0x31a')](_0x90845d+this[_0x4654('0x458')]()*_0x4d8993),_0x5d948b['y']=Math[_0x4654('0x31a')](_0x4a987e+this[_0x4654('0x327')]());if(_0x3adbff[_0x4654('0x5d0')])for(const _0x131ffc of this[_0x4654('0x138')]){_0x131ffc['x']+=_0x3adbff[_0x4654('0x1d8')]*_0x4d8993,_0x131ffc['y']+=_0x3adbff['PopupShiftY'];}else{if(_0x4654('0x6e6')!==_0x4654('0x6e6')){function _0x3b2ee3(){_0x3228c3[_0x4654('0x6b3')](_0x472d2d,_0xd353f6,_0x1e6708,_0x4fccb5,_0x40761b,-0x1),this[_0x4654('0x223')]();}}else{const _0x2c1b38=this[_0x4654('0x138')][this[_0x4654('0x138')]['length']-0x1];_0x2c1b38&&(_0x5d948b['x']=_0x2c1b38['x']+_0x3adbff['PopupShiftX']*_0x4d8993,_0x5d948b['y']=_0x2c1b38['y']+_0x3adbff[_0x4654('0x1f1')]);}}},Sprite_Battler['prototype'][_0x4654('0x250')]=function(_0x5d1df1){if(this[_0x4654('0x46')]())SceneManager['_scene'][_0x4654('0x16d')][_0x4654('0x260')](_0x5d1df1);else{if(_0x4654('0x52c')==='vbJnu'){function _0x6634c8(){_0x5915a1[_0x4654('0x584')]=_0x5c0fab[_0x4654('0x444')](_0xe0da65['$1']);}}else this[_0x4654('0x6da')]()[_0x4654('0x6ab')](_0x5d1df1),this[_0x4654('0x138')]['remove'](_0x5d1df1),_0x5d1df1[_0x4654('0xe6')]();}},VisuMZ[_0x4654('0x1f')][_0x4654('0x5d8')]=Sprite_Battler['prototype'][_0x4654('0x702')],Sprite_Battler[_0x4654('0x8d')][_0x4654('0x702')]=function(){VisuMZ[_0x4654('0x1f')]['Sprite_Battler_updateMain'][_0x4654('0x5a5')](this),this[_0x4654('0x3f1')](),this[_0x4654('0x4b7')]();},VisuMZ['BattleCore']['Sprite_Battler_updatePosition']=Sprite_Battler[_0x4654('0x8d')][_0x4654('0x336')],Sprite_Battler[_0x4654('0x8d')][_0x4654('0x336')]=function(){VisuMZ['BattleCore'][_0x4654('0x44d')][_0x4654('0x5a5')](this),this['updatePositionBattleCore'](),this[_0x4654('0x5ea')]();},Sprite_Battler['prototype'][_0x4654('0x6dd')]=function(){this[_0x4654('0x2df')]=this['x'],this[_0x4654('0x2a8')]=this['y'],this[_0x4654('0x3a2')](),this[_0x4654('0x3ce')](),this['x']+=this[_0x4654('0x67a')](),this['y']+=this[_0x4654('0x45d')](),this['x']=Math['round'](this['x']),this['y']=Math[_0x4654('0x31a')](this['y']);},Sprite_Battler[_0x4654('0x8d')][_0x4654('0x67a')]=function(){let _0x5cb6c3=0x0;return _0x5cb6c3;},Sprite_Battler[_0x4654('0x8d')][_0x4654('0x45d')]=function(){let _0xa6a687=0x0;return _0xa6a687-=this[_0x4654('0x78a')],_0xa6a687-=this['_jumpHeight'],_0xa6a687;},Sprite_Battler[_0x4654('0x8d')][_0x4654('0x3f1')]=function(){const _0xcc127c=this[_0x4654('0x6cd')]&&this['_battler']['isBattlerFlipped']();this[_0x4654('0x498')]['x']=(_0xcc127c?-0x1:0x1)*Math[_0x4654('0x5b1')](this[_0x4654('0x498')]['x']);},Sprite_Battler[_0x4654('0x8d')]['startFloat']=function(_0x75d313,_0x4943c3,_0x1c9082){if(!this['canMove']())return;if(this['_targetFloatHeight']===_0x75d313)return;this['_targetFloatHeight']=_0x75d313,this['_floatDuration']=_0x4943c3,this['_floatWholeDuration']=_0x4943c3,this[_0x4654('0x1a2')]=_0x1c9082||_0x4654('0x28');if(_0x4943c3<=0x0)this[_0x4654('0x78a')]=_0x75d313;},Sprite_Battler[_0x4654('0x8d')][_0x4654('0x3a2')]=function(){if(this[_0x4654('0x406')]<=0x0)return;const _0x4b58d4=this[_0x4654('0x406')],_0x39254d=this[_0x4654('0xb4')],_0xcd97a2=this[_0x4654('0x1a2')];Imported[_0x4654('0x631')]?this[_0x4654('0x78a')]=this[_0x4654('0x3b5')](this['_floatHeight'],this[_0x4654('0x30d')],_0x4b58d4,_0x39254d,_0xcd97a2):this[_0x4654('0x78a')]=(this[_0x4654('0x78a')]*(_0x4b58d4-0x1)+this[_0x4654('0x30d')])/_0x4b58d4;this[_0x4654('0x406')]--;if(this[_0x4654('0x406')]<=0x0)this[_0x4654('0x1e8')]();},Sprite_Battler['prototype'][_0x4654('0x1e8')]=function(){this[_0x4654('0x78a')]=this[_0x4654('0x30d')];},Sprite_Battler[_0x4654('0x8d')][_0x4654('0x301')]=function(){return this[_0x4654('0x406')]>0x0;},Sprite_Battler['prototype'][_0x4654('0x6ec')]=function(_0x4d7f1b,_0x253ee9){if(!this[_0x4654('0x68a')]())return;if(_0x253ee9<=0x0)return;this[_0x4654('0x100')]=_0x4d7f1b,this[_0x4654('0x39e')]=_0x253ee9,this[_0x4654('0x3f0')]=_0x253ee9;},Sprite_Battler[_0x4654('0x8d')][_0x4654('0x3ce')]=function(){if(this[_0x4654('0x39e')]<=0x0)return;const _0xb3d083=this['_jumpWholeDuration']-this[_0x4654('0x39e')],_0x2cd3a8=this[_0x4654('0x3f0')]/0x2,_0x42e2a6=this[_0x4654('0x100')],_0x5dce06=-_0x42e2a6/Math[_0x4654('0x4a5')](_0x2cd3a8,0x2);this[_0x4654('0x2d5')]=_0x5dce06*Math[_0x4654('0x4a5')](_0xb3d083-_0x2cd3a8,0x2)+_0x42e2a6,this[_0x4654('0x39e')]--;if(this[_0x4654('0x39e')]<=0x0)return this[_0x4654('0x205')]();},Sprite_Battler[_0x4654('0x8d')][_0x4654('0x205')]=function(){this[_0x4654('0x2d5')]=0x0;},Sprite_Battler[_0x4654('0x8d')][_0x4654('0x3ff')]=function(){return this[_0x4654('0x39e')]>0x0;},Sprite_Battler[_0x4654('0x8d')][_0x4654('0x4d6')]=function(_0x2824d2,_0x1cdcdd,_0x3b936c){if(this[_0x4654('0x226')]===_0x2824d2)return;this[_0x4654('0x226')]=_0x2824d2,this[_0x4654('0x439')]=_0x1cdcdd,this[_0x4654('0x627')]=_0x1cdcdd,this[_0x4654('0x417')]=_0x3b936c||_0x4654('0x28');if(_0x1cdcdd<=0x0)this[_0x4654('0x3a0')]=_0x2824d2;},Sprite_Battler[_0x4654('0x8d')][_0x4654('0x5ea')]=function(){if(this['_opacityDuration']<=0x0)return;const _0x258d4f=this[_0x4654('0x439')],_0x3a05d=this[_0x4654('0x627')],_0x1bb4ee=this[_0x4654('0x417')];if(Imported[_0x4654('0x631')])this[_0x4654('0x3a0')]=this[_0x4654('0x3b5')](this['opacity'],this[_0x4654('0x226')],_0x258d4f,_0x3a05d,_0x1bb4ee);else{if(_0x4654('0x642')==='CpJtn'){function _0x200ed0(){const _0x5882eb=this[_0x4654('0xc7')](_0x41fc45),_0x2e5111=this[_0x4654('0x74b')](_0x274349),_0x501b06=this[_0x4654('0x617')](_0x2e5111)[_0x4654('0x564')];this[_0x4654('0x6c0')](this[_0x4654('0x1f5')](_0x4cc3be));const _0x4023e0=this[_0x4654('0x31e')]();if(_0x4023e0==='right')this[_0x4654('0x16f')](_0x2e5111,_0x5882eb['x']+_0x5882eb[_0x4654('0x564')]-_0x501b06,_0x5882eb['y'],_0x501b06);else{if(_0x4023e0===_0x4654('0x6a2')){const _0xfc955a=_0x5882eb['x']+_0x44d420[_0x4654('0x6f0')]((_0x5882eb[_0x4654('0x564')]-_0x501b06)/0x2);this[_0x4654('0x16f')](_0x2e5111,_0xfc955a,_0x5882eb['y'],_0x501b06);}else this[_0x4654('0x16f')](_0x2e5111,_0x5882eb['x'],_0x5882eb['y'],_0x501b06);}}}else this[_0x4654('0x3a0')]=(this[_0x4654('0x3a0')]*(_0x258d4f-0x1)+this[_0x4654('0x226')])/_0x258d4f;}this[_0x4654('0x439')]--;if(this[_0x4654('0x439')]<=0x0)this[_0x4654('0x137')]();},Sprite_Battler['prototype']['onOpacityEnd']=function(){this['opacity']=this[_0x4654('0x226')];},Sprite_Battler[_0x4654('0x8d')][_0x4654('0x5e6')]=function(){return this[_0x4654('0x439')]>0x0;},VisuMZ[_0x4654('0x1f')][_0x4654('0x78c')]=Sprite_Actor[_0x4654('0x8d')]['createStateSprite'],Sprite_Actor[_0x4654('0x8d')][_0x4654('0x625')]=function(){VisuMZ[_0x4654('0x1f')][_0x4654('0x78c')][_0x4654('0x5a5')](this);if(VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x2a1')][_0x4654('0x193')]){if(_0x4654('0x5cd')==='cKtca'){function _0xd68fef(){if(!_0x21b807)return;if(!this['_mainSprite'])return;this[_0x4654('0x573')][_0x4654('0x34d')]['x']=this[_0x4654('0xe5')][_0x4654('0x6a3')](),this[_0x4654('0x573')][_0x4654('0x34d')]['y']=this[_0x4654('0xe5')][_0x4654('0x341')]();if(this[_0x4654('0xe5')][_0x4654('0x42d')]()){const _0x15ca42=this['_shadowSprite'][_0x4654('0x67c')];this['_shadowSprite'][_0x4654('0x4fe')](0x0,0x0,_0x15ca42[_0x4654('0x564')],_0x15ca42['height']);}else this['_shadowSprite'][_0x4654('0x4fe')](0x0,0x0,0x0,0x0);}}else this[_0x4654('0x472')]();}},VisuMZ[_0x4654('0x1f')][_0x4654('0x190')]=Sprite_Enemy[_0x4654('0x8d')][_0x4654('0x231')],Sprite_Enemy[_0x4654('0x8d')][_0x4654('0x231')]=function(){if(VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x2a1')][_0x4654('0x1e3')]){if(_0x4654('0x1ca')!==_0x4654('0x1ca')){function _0x2dd6d4(){this[_0x4654('0x310')]=this[_0x4654('0x49')](),this['sortEnemies'](),_0x1f20eb[_0x4654('0x8d')]['refresh'][_0x4654('0x5a5')](this);}}else this[_0x4654('0x472')]();}VisuMZ['BattleCore'][_0x4654('0x190')][_0x4654('0x5a5')](this);},Sprite_Battler[_0x4654('0x8d')][_0x4654('0x472')]=function(){if(!ConfigManager['visualHpGauge'])return;const _0x1d328c=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x2a1')],_0x270427=new Sprite_HpGauge();_0x270427[_0x4654('0x34d')]['x']=_0x1d328c[_0x4654('0x118')],_0x270427[_0x4654('0x34d')]['y']=_0x1d328c['AnchorY'],_0x270427[_0x4654('0x498')]['x']=_0x270427[_0x4654('0x498')]['y']=_0x1d328c[_0x4654('0x1')],this[_0x4654('0x26a')]=_0x270427,this[_0x4654('0x43f')](this['_hpGaugeSprite']);},VisuMZ['BattleCore'][_0x4654('0x34e')]=Sprite_Battler['prototype'][_0x4654('0x2b3')],Sprite_Battler[_0x4654('0x8d')][_0x4654('0x2b3')]=function(_0x434376){VisuMZ[_0x4654('0x1f')][_0x4654('0x34e')]['call'](this,_0x434376),this[_0x4654('0x32e')](_0x434376);},Sprite_Battler[_0x4654('0x8d')][_0x4654('0x32e')]=function(_0x734fc2){if(!_0x734fc2)return;if(!this[_0x4654('0x26a')])return;if(_0x734fc2[_0x4654('0x5b5')]()){}else{if(_0x734fc2[_0x4654('0x2c')]()){if(this[_0x4654('0x1de')]===Sprite_SvEnemy&&!_0x734fc2[_0x4654('0x2fb')]())return;}}this['_hpGaugeSprite'][_0x4654('0x661')](_0x734fc2,'hp');},Sprite_Battler[_0x4654('0x8d')][_0x4654('0x4b7')]=function(){if(!this['_battler'])return;if(!this[_0x4654('0x26a')])return;const _0xc3ea2c=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')]['HpGauge'],_0x14eb23=this[_0x4654('0x26a')];_0x14eb23[_0x4654('0x5f2')]=this[_0x4654('0xf3')]();const _0x2a6385=_0xc3ea2c[_0x4654('0x653')],_0x15b383=_0xc3ea2c[_0x4654('0x65e')];_0x14eb23['x']=_0x2a6385,_0x14eb23['y']=-this[_0x4654('0x2e8')]+_0x15b383;},Sprite_Battler[_0x4654('0x8d')][_0x4654('0xf3')]=function(){if(this[_0x4654('0x6cd')][_0x4654('0x5b5')]())return!![];const _0x591057=this[_0x4654('0x6cd')][_0x4654('0x360')]()['note'];if(_0x591057[_0x4654('0x2a0')](/<SHOW HP GAUGE>/i))return!![];if(_0x591057['match'](/<HIDE HP GAUGE>/i))return![];const _0x465d6f=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x2a1')];if(_0x465d6f[_0x4654('0x643')]){if(_0x4654('0x781')!==_0x4654('0x238')){if(_0x465d6f[_0x4654('0x39a')]&&BattleManager[_0x4654('0x17e')]())return!![];if(this[_0x4654('0x6cd')][_0x4654('0x4e8')])return![];return this[_0x4654('0x6cd')]['hasBeenDefeatedBefore']();}else{function _0x14ba88(){if(!this[_0x4654('0x3cb')]())return;const _0x41d9c1=this[_0x4654('0x4da')](),_0x148f33=_0x254cf0[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0xe2')][_0x4654('0xb1')],_0x24d181=_0x41d9c1===_0x4654('0x1c2')?_0x2a44ad[_0x4654('0x305')]:_0x4654('0x53b')[_0x4654('0x31f')](_0x148f33,_0x22f0d4[_0x4654('0x305')]),_0x549af3=this[_0x4654('0x1d3')]();this['addCommand'](_0x24d181,_0x4654('0x305'),_0x549af3);}}}return!![];},VisuMZ[_0x4654('0x1f')][_0x4654('0x5d6')]=Sprite_Battler[_0x4654('0x8d')][_0x4654('0x19c')],Sprite_Battler[_0x4654('0x8d')][_0x4654('0x19c')]=function(_0x53f52e,_0x1ae7f8,_0x1a874a){if(this[_0x4654('0x68a')]()){if(_0x4654('0x488')!==_0x4654('0x3f'))VisuMZ[_0x4654('0x1f')][_0x4654('0x5d6')][_0x4654('0x5a5')](this,_0x53f52e,_0x1ae7f8,_0x1a874a);else{function _0x5783fd(){if(!_0x41aca5['isSideView']())return;const _0x3b3966=this[_0x4654('0x770')]();if(!_0x3b3966)return;if(_0x5447ba===_0x3b3966['_baseX'])return;let _0xe0e8c3=![];if(this[_0x4654('0x5b5')]()){if(_0x517bf0>_0x3b3966[_0x4654('0x2df')])_0xe0e8c3=!![];if(_0x51dfca<_0x3b3966[_0x4654('0x2df')])_0xe0e8c3=![];}else{if(this[_0x4654('0x2c')]()){if(_0x4a8caa>_0x3b3966['_baseX'])_0xe0e8c3=![];if(_0x57f1b5<_0x3b3966[_0x4654('0x2df')])_0xe0e8c3=!![];}}this[_0x4654('0x322')](_0x1b4cf0?!_0xe0e8c3:_0xe0e8c3),_0x3b3966['updateFlip']();}}}},Sprite_Battler[_0x4654('0x8d')]['canMove']=function(){if(this[_0x4654('0x6cd')]&&this[_0x4654('0x6cd')][_0x4654('0x6f4')]())return![];if(this[_0x4654('0x6cd')]&&!this['_battler'][_0x4654('0x189')]())return![];return $gameSystem[_0x4654('0x4f9')]();},Sprite_Battler['prototype'][_0x4654('0x1f0')]=function(){},Sprite_Battler['prototype'][_0x4654('0x224')]=function(){this['startMove'](0x0,0x0,0xc);},Sprite_Battler[_0x4654('0x8d')][_0x4654('0x1da')]=function(){},Sprite_Battler[_0x4654('0x8d')][_0x4654('0x460')]=function(){const _0x253c42=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x5ed')],_0x4a01d1=this[_0x4654('0x6cd')]&&this[_0x4654('0x6cd')][_0x4654('0x5b5')]()?0x1:-0x1,_0x3efed5=this[_0x4654('0x2df')]-this[_0x4654('0x36')]+_0x4a01d1*_0x253c42['FlinchDistanceX'],_0x368efc=this[_0x4654('0x2a8')]-this[_0x4654('0x728')]+_0x4a01d1*_0x253c42[_0x4654('0x4ed')],_0x514112=_0x253c42['FlinchDuration'];this[_0x4654('0x19c')](_0x3efed5,_0x368efc,_0x514112);},VisuMZ['BattleCore'][_0x4654('0x30')]=Sprite_Actor[_0x4654('0x8d')][_0x4654('0x5e8')],Sprite_Actor[_0x4654('0x8d')]['moveToStartPosition']=function(){if(SceneManager['isPreviousSceneBattleTransitionable']())return;VisuMZ['BattleCore']['Sprite_Actor_moveToStartPosition'][_0x4654('0x5a5')](this);},VisuMZ[_0x4654('0x1f')][_0x4654('0x1c')]=Sprite_Actor[_0x4654('0x8d')][_0x4654('0x362')],Sprite_Actor[_0x4654('0x8d')][_0x4654('0x362')]=function(_0x4fe0c9){VisuMZ[_0x4654('0x1f')][_0x4654('0x1c')][_0x4654('0x5a5')](this,_0x4fe0c9),VisuMZ[_0x4654('0x1f')]['Settings']['Actor']['HomePosJS']&&VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x5ed')]['HomePosJS'][_0x4654('0x5a5')](this,_0x4fe0c9);},VisuMZ[_0x4654('0x1f')][_0x4654('0x3bd')]=Sprite_Actor['prototype'][_0x4654('0x2b3')],Sprite_Actor[_0x4654('0x8d')]['setBattler']=function(_0x2a0526){VisuMZ[_0x4654('0x1f')][_0x4654('0x3bd')][_0x4654('0x5a5')](this,_0x2a0526),this[_0x4654('0x407')](_0x2a0526);},Sprite_Actor['prototype'][_0x4654('0x407')]=function(_0x3e9680){if(!_0x3e9680)return;if(!this[_0x4654('0x573')])return;this[_0x4654('0x573')][_0x4654('0x34d')]['x']=this[_0x4654('0xe5')][_0x4654('0x6a3')](),this[_0x4654('0x573')][_0x4654('0x34d')]['y']=this[_0x4654('0xe5')][_0x4654('0x341')]();if(this[_0x4654('0xe5')][_0x4654('0x42d')]()){const _0x9d65e=this[_0x4654('0x554')][_0x4654('0x67c')];this[_0x4654('0x554')][_0x4654('0x4fe')](0x0,0x0,_0x9d65e[_0x4654('0x564')],_0x9d65e[_0x4654('0x2e8')]);}else this[_0x4654('0x554')][_0x4654('0x4fe')](0x0,0x0,0x0,0x0);},VisuMZ['BattleCore'][_0x4654('0x15')]=Sprite_Actor[_0x4654('0x8d')][_0x4654('0x53c')],Sprite_Actor[_0x4654('0x8d')][_0x4654('0x53c')]=function(){VisuMZ[_0x4654('0x1f')][_0x4654('0x15')][_0x4654('0x5a5')](this);if(this[_0x4654('0xe5')]){if(_0x4654('0xd9')!==_0x4654('0x324'))this['updateStateSprite'](),this['updateStyleOpacity']();else{function _0x569206(){if(!_0xe8ba97['isSceneBattle']())return;const _0x5ac992=_0x282685[_0x4654('0x779')]();_0x5ac992['setWaitMode'](_0x4654('0x39b'));}}}},VisuMZ['BattleCore']['Sprite_Actor_updateShadow']=Sprite_Actor[_0x4654('0x8d')][_0x4654('0x1f6')],Sprite_Actor[_0x4654('0x8d')]['updateShadow']=function(){VisuMZ[_0x4654('0x1f')]['Sprite_Actor_updateShadow']['call'](this),this[_0x4654('0x500')]();},Sprite_Actor[_0x4654('0x8d')][_0x4654('0x500')]=function(){if(!this[_0x4654('0x573')])return;this[_0x4654('0x147')]();if(this[_0x4654('0xe5')]&&this[_0x4654('0xe5')][_0x4654('0x42d')]()){const _0x29ecdb=this[_0x4654('0x554')][_0x4654('0x67c')];this['_shadowSprite'][_0x4654('0x4fe')](0x0,0x0,_0x29ecdb[_0x4654('0x564')],_0x29ecdb[_0x4654('0x2e8')]);}else this['_shadowSprite'][_0x4654('0x4fe')](0x0,0x0,0x0,0x0);},Sprite_Actor['prototype'][_0x4654('0x147')]=function(){this['_shadowSprite']['y']=-this['extraPositionY']()-0x2;},Sprite_Actor[_0x4654('0x8d')]['updateStateSprite']=function(){this['_stateSprite']['scale']['x']=0x1/(this[_0x4654('0x498')]['x']||0.001),this['_stateSprite'][_0x4654('0x498')]['y']=0x1/(this[_0x4654('0x498')]['y']||0.001);},Sprite_Actor[_0x4654('0x8d')][_0x4654('0x38c')]=function(){if(!$gameSystem[_0x4654('0x4f9')]()&&this[_0x4654('0x1de')]===Sprite_Actor){if(_0x4654('0x10e')!==_0x4654('0x10e')){function _0x42ddc6(){_0x3b6515[_0x4654('0x1f')][_0x4654('0x377')][_0x4654('0x5a5')](this,_0x1a5d75),this[_0x4654('0x16b')]();}}else{const _0xb02f9a=Scene_Battle[_0x4654('0x8d')]['battleLayoutStyle']();[_0x4654('0x71f'),_0x4654('0x2bf'),_0x4654('0x4ad'),_0x4654('0x5eb')]['includes'](_0xb02f9a)&&(this[_0x4654('0x3a0')]=0x0);}}},Sprite_Actor[_0x4654('0x8d')][_0x4654('0x596')]=function(){const _0xb386b4=this[_0x4654('0xe5')];if(_0xb386b4){const _0x4dc3f4=_0xb386b4['stateMotionIndex']();if(_0xb386b4[_0x4654('0x4f7')]()||_0xb386b4[_0x4654('0x2c0')]())this['startMotion'](_0x4654('0x6d3'));else{if(_0x4dc3f4===0x3){if(_0x4654('0x45')===_0x4654('0x1b0')){function _0x299f95(){_0x5e7dc5[_0x4654('0x1f')][_0x4654('0x1f3')]['Actor'][_0x4654('0x104')]['call'](this,_0x5d6aaa);}}else this[_0x4654('0x51f')](_0x4654('0x794'));}else{if(_0x4dc3f4===0x2){if(_0x4654('0x136')==='DcTWO'){function _0x253409(){if(!_0x4729aa['isSceneBattle']())return;if(!_0x372c47[_0x4654('0x210')])return;_0x40ca35[_0x4654('0x476')](_0x3adaa3,_0x1dd41a);const _0x3c4488=_0x4f4bdf[_0x4654('0x779')](),_0x1cc769=_0x312443[_0x4654('0x607')];_0x4aaf71[_0x4654('0x5e5')](_0x2b24d0[_0x4654('0x46a')],_0x4e10a5['FocusY'],_0x2d4914[_0x4654('0x44a')],_0x1507e7['EasingType']);if(_0x1cc769)_0x3c4488[_0x4654('0xbd')](_0x4654('0x72'));}}else this[_0x4654('0x51f')](_0x4654('0x394'));}else{if(_0xb386b4[_0x4654('0x3bb')]()){if(_0x4654('0x4d4')!==_0x4654('0x39f'))this[_0x4654('0x51f')](_0x4654('0x1dd'));else{function _0x120bb6(){if(!_0x39597e[_0x4654('0x466')]())return![];if(!_0x291830[_0x4654('0x230')]())return![];if(!_0x45c5bf['isForOpponent']())return![];return _0xa4feb0[_0x4654('0x1f')][_0x4654('0x1f3')]['ActionSequence'][_0x4654('0x43b')];}}}else{if(_0xb386b4[_0x4654('0x531')]()||_0xb386b4[_0x4654('0x4b')]())this[_0x4654('0x51f')]('guard');else{if(_0x4dc3f4===0x1)this[_0x4654('0x51f')](_0x4654('0x23a'));else{if(_0xb386b4['isDying']())this[_0x4654('0x51f')](_0x4654('0x19d'));else{if(_0xb386b4[_0x4654('0x17b')]()){if(_0x4654('0x86')!==_0x4654('0x86')){function _0x6bd8dc(){const _0x14593a=new _0x8d9a5();_0x14593a[_0x4654('0x2b3')](_0x118b5a[_0x4654('0x515')]()[_0x4e31df]),this[_0x4654('0x6d4')][_0x4654('0x128')](_0x14593a),this[_0x4654('0x30f')][_0x4654('0x43f')](_0x14593a);}}else this['startMotion'](_0x4654('0x6d3'));}else{if(_0xb386b4[_0x4654('0x5aa')]())this[_0x4654('0x51f')](_0x4654('0x20d'));else{if(_0x4654('0x6fe')===_0x4654('0x6fe'))this[_0x4654('0x51f')](_0x4654('0x6d3'));else{function _0x43817e(){return this[_0x4654('0x6af')]();}}}}}}}}}}}}},Sprite_Actor[_0x4654('0x8d')][_0x4654('0x2a3')]=function(){Sprite_Battler[_0x4654('0x8d')][_0x4654('0x2a3')][_0x4654('0x5a5')](this);},Sprite_Actor[_0x4654('0x8d')][_0x4654('0x3e')]=function(){return Sprite_Battler['_motionSpeed'];},Sprite_Weapon[_0x4654('0x8d')][_0x4654('0x3b6')]=function(){return Sprite_Battler[_0x4654('0x70c')];},Sprite_Actor[_0x4654('0x8d')][_0x4654('0x457')]=function(){},Sprite_Actor[_0x4654('0x8d')][_0x4654('0x232')]=function(){},Sprite_Actor[_0x4654('0x8d')][_0x4654('0x44e')]=function(){if(this['_motion']&&++this[_0x4654('0x4f0')]>=this['motionSpeed']()){if(_0x4654('0x6bd')==='OVeBq'){if(this[_0x4654('0x29c')][_0x4654('0x6ff')])this[_0x4654('0x446')]=(this[_0x4654('0x446')]+0x1)%0x4;else this[_0x4654('0x446')]<0x2?this[_0x4654('0x446')]++:this[_0x4654('0x596')]();this[_0x4654('0x4f0')]=0x0;}else{function _0x3cdd5e(){this[_0x4654('0x51f')]('wait');}}}},Sprite_Actor[_0x4654('0x8d')]['forceMotion']=function(_0x3c2b7c){if(_0x3c2b7c===_0x4654('0x45b'))this[_0x4654('0x420')]=!![];const _0x7ab0a9=Sprite_Actor['MOTIONS'][_0x3c2b7c];this[_0x4654('0x29c')]=_0x7ab0a9,this[_0x4654('0x4f0')]=0x0,this[_0x4654('0x446')]=0x0;},Sprite_Actor[_0x4654('0x8d')][_0x4654('0x7d')]=function(_0x1bb061){this[_0x4654('0x219')](),this['_weaponSprite'][_0x4654('0x661')](_0x1bb061),this['_actor'][_0x4654('0x11b')]();},Sprite_Actor[_0x4654('0x8d')][_0x4654('0x219')]=function(){let _0x364b3a=-0x10,_0x4b8da8=0x0;const _0x2784c6=/<SIDEVIEW WEAPON OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i,_0x17bcd2=this[_0x4654('0x6cd')][_0x4654('0x11f')]()['map'](_0x5aad06=>_0x5aad06&&_0x5aad06[_0x4654('0x762')][_0x4654('0x2a0')](_0x2784c6)?Number(RegExp['$1']):0x0),_0x44e657=this[_0x4654('0x6cd')][_0x4654('0x11f')]()[_0x4654('0x538')](_0x1f7dd8=>_0x1f7dd8&&_0x1f7dd8[_0x4654('0x762')][_0x4654('0x2a0')](_0x2784c6)?Number(RegExp['$2']):0x0);_0x364b3a=_0x17bcd2[_0x4654('0x644')]((_0x154a95,_0x7bbc2d)=>_0x154a95+_0x7bbc2d,_0x364b3a),_0x4b8da8=_0x44e657['reduce']((_0x598f6a,_0x28b389)=>_0x598f6a+_0x28b389,_0x4b8da8),this[_0x4654('0x611')]['x']=_0x364b3a,this[_0x4654('0x611')]['y']=_0x4b8da8,this[_0x4654('0x611')][_0x4654('0x53c')]();},Sprite_Weapon['prototype'][_0x4654('0x661')]=function(_0x22e191){this['_weaponImageId']=_0x22e191,this[_0x4654('0x65c')]=-0x1,this[_0x4654('0x446')]=0x0,this[_0x4654('0x69d')](),this[_0x4654('0x288')]();},Sprite_Actor[_0x4654('0x8d')][_0x4654('0x2b8')]=function(){},Sprite_Actor[_0x4654('0x8d')][_0x4654('0x1f0')]=function(){const _0x147e13=VisuMZ['BattleCore'][_0x4654('0x1f3')]['ActionSequence'],_0xbfc8c5=_0x147e13['StepDistanceX'],_0x544b4b=_0x147e13['StepDistanceY'],_0x5cd25d=_0x147e13['StepDuration'];this['startMove'](-_0xbfc8c5,-_0x544b4b,_0x5cd25d);},VisuMZ[_0x4654('0x1f')][_0x4654('0x575')]=Sprite_Enemy[_0x4654('0x8d')][_0x4654('0xf5')],Sprite_Enemy[_0x4654('0x8d')][_0x4654('0xf5')]=function(){this['allowCollapse']()?VisuMZ[_0x4654('0x1f')][_0x4654('0x575')][_0x4654('0x5a5')](this):this['_appeared']=!![];},VisuMZ[_0x4654('0x1f')][_0x4654('0x5e0')]=Sprite_Enemy[_0x4654('0x8d')][_0x4654('0x82')],Sprite_Enemy[_0x4654('0x8d')][_0x4654('0x82')]=function(){if(this[_0x4654('0x2c3')]())VisuMZ['BattleCore'][_0x4654('0x5e0')][_0x4654('0x5a5')](this);},VisuMZ[_0x4654('0x1f')][_0x4654('0x621')]=Sprite_Enemy[_0x4654('0x8d')][_0x4654('0x4a8')],Sprite_Enemy[_0x4654('0x8d')][_0x4654('0x4a8')]=function(){if(this[_0x4654('0x2c3')]())VisuMZ[_0x4654('0x1f')][_0x4654('0x621')][_0x4654('0x5a5')](this);},Sprite_Enemy[_0x4654('0x8d')][_0x4654('0x516')]=function(){if(this[_0x4654('0x2fb')]())return this[_0x4654('0x380')][_0x4654('0x516')]();else{if(_0x4654('0x2f6')==='jlGeR')return Sprite_Battler[_0x4654('0x8d')][_0x4654('0x516')][_0x4654('0x5a5')](this);else{function _0x21fe8b(){_0x934d9d[_0x4654('0x41')]();}}}},VisuMZ[_0x4654('0x1f')][_0x4654('0x46c')]=Sprite_Enemy[_0x4654('0x8d')][_0x4654('0x4c9')],Sprite_Enemy[_0x4654('0x8d')][_0x4654('0x4c9')]=function(){VisuMZ[_0x4654('0x1f')]['Sprite_Enemy_updateStateSprite'][_0x4654('0x5a5')](this),this[_0x4654('0x1af')]();},Sprite_Enemy[_0x4654('0x8d')][_0x4654('0x1af')]=function(){this[_0x4654('0x227')]['y']=-this[_0x4654('0x67c')]['height']-this[_0x4654('0x227')][_0x4654('0x2e8')],this[_0x4654('0x227')][_0x4654('0x498')]['x']=0x1/(this[_0x4654('0x498')]['x']||0.001),this[_0x4654('0x227')][_0x4654('0x498')]['y']=0x1/(this['scale']['y']||0.001),this[_0x4654('0x2fb')]()&&(this[_0x4654('0x380')][_0x4654('0x51c')][_0x4654('0x498')]['x']=-0x1/(this[_0x4654('0x498')]['x']||0.001),this[_0x4654('0x380')][_0x4654('0x51c')][_0x4654('0x498')]['y']=0x1/(this['scale']['y']||0.001));},VisuMZ['BattleCore'][_0x4654('0x496')]=Sprite_Enemy['prototype'][_0x4654('0x2b3')],Sprite_Enemy[_0x4654('0x8d')]['setBattler']=function(_0x486070){VisuMZ[_0x4654('0x1f')][_0x4654('0x496')][_0x4654('0x5a5')](this,_0x486070),this[_0x4654('0x44c')](_0x486070);},Sprite_Enemy[_0x4654('0x8d')][_0x4654('0x44c')]=function(_0x372383){if(!this[_0x4654('0x380')]){if(_0x4654('0x758')===_0x4654('0x758'))this[_0x4654('0x380')]=new Sprite_SvEnemy(_0x372383),this[_0x4654('0x43f')](this['_svBattlerSprite']);else{function _0xba242d(){const _0x45ea6c=_0x1ab868[this[_0x4654('0xe5')][_0x4654('0x556')]()];if(!_0x45ea6c)return;if(!this[_0x4654('0x677')](_0x45ea6c))return;const _0x34c31f=this[_0x4654('0x4da')](),_0x243c0f=_0x2b2e67[_0x4654('0x2c4')](_0x45ea6c),_0x39cdf1=_0x2500ad[_0x4654('0x158')](_0x45ea6c),_0x459aba=_0x34c31f==='text'?_0x243c0f:_0x4654('0x53b')[_0x4654('0x31f')](_0x39cdf1,_0x243c0f);this[_0x4654('0x713')](_0x459aba,_0x4654('0x53a'),this[_0x4654('0xe5')][_0x4654('0x1d5')]());}}}this[_0x4654('0x380')][_0x4654('0x2b3')](_0x372383);},Sprite_Enemy[_0x4654('0x8d')][_0x4654('0x2fb')]=function(){return this[_0x4654('0x468')]&&this[_0x4654('0x468')]['hasSvBattler']();},VisuMZ[_0x4654('0x1f')][_0x4654('0x529')]=Sprite_Enemy[_0x4654('0x8d')][_0x4654('0x69d')],Sprite_Enemy[_0x4654('0x8d')][_0x4654('0x69d')]=function(_0x20f1c8){if(this[_0x4654('0x2fb')]()){const _0xf6cd22=this[_0x4654('0x468')][_0x4654('0x199')]();this['bitmap']=new Bitmap(_0xf6cd22[_0x4654('0x564')],_0xf6cd22[_0x4654('0x2e8')]);}else VisuMZ[_0x4654('0x1f')][_0x4654('0x529')][_0x4654('0x5a5')](this,_0x20f1c8);},Sprite_Enemy[_0x4654('0x8d')][_0x4654('0x2c3')]=function(){if(this[_0x4654('0x2fb')]()){if(_0x4654('0x614')!==_0x4654('0x211'))return this['_enemy'][_0x4654('0x2c3')]();else{function _0x1c91af(){if(!_0x4715a3[_0x4654('0x443')]())return;_0xa719a2[_0x4654('0x476')](_0x53c63d,_0x5cf048);const _0x54cf1a=_0x4533d9[_0x4654('0x779')](),_0x248f40=_0x10d0ea[_0x4654('0x73e')];if(!_0x54cf1a)return;_0xaefe06[_0x4654('0x75e')]++,_0x4a93fa[_0x4654('0xa3')]=_0x59adbb[_0x4654('0x12e')][_0x315a2a[_0x4654('0x75e')]]||null,_0x80a67d[_0x4654('0xa3')]&&_0x248f40[_0x4654('0x29d')]()[_0x4654('0x512')]()!==_0x4654('0x18e')&&_0x54cf1a[_0x4654('0x494')]([_0x248f40]);}}}else return!![];},Sprite_Enemy['prototype'][_0x4654('0x596')]=function(){if(this[_0x4654('0x2fb')]())this['_svBattlerSprite']['refreshMotion']();},Sprite_Enemy[_0x4654('0x8d')]['forceMotion']=function(_0x43d3ba){if(this[_0x4654('0x2fb')]())this[_0x4654('0x380')]['forceMotion'](_0x43d3ba);},Sprite_Enemy[_0x4654('0x8d')][_0x4654('0x7d')]=function(_0x3d83db){if(this[_0x4654('0x2fb')]())this[_0x4654('0x380')][_0x4654('0x7d')](_0x3d83db);},Sprite_Enemy[_0x4654('0x8d')][_0x4654('0x1f0')]=function(){const _0x2e5f20=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x76a')],_0x27abb8=_0x2e5f20[_0x4654('0x45e')],_0x4ab7ef=_0x2e5f20[_0x4654('0x3f3')],_0x18516d=_0x2e5f20[_0x4654('0x75f')];this[_0x4654('0x19c')](_0x27abb8,_0x4ab7ef,_0x18516d);};function Sprite_SvEnemy(){this[_0x4654('0x278')](...arguments);}Sprite_SvEnemy[_0x4654('0x8d')]=Object['create'](Sprite_Actor['prototype']),Sprite_SvEnemy['prototype'][_0x4654('0x1de')]=Sprite_SvEnemy,Sprite_SvEnemy[_0x4654('0x8d')]['initialize']=function(_0x141796){Sprite_Actor[_0x4654('0x8d')][_0x4654('0x278')][_0x4654('0x5a5')](this,_0x141796),this[_0x4654('0x498')]['x']=-0x1,this[_0x4654('0x51c')][_0x4654('0x498')]['x']=-0x1;},Sprite_SvEnemy[_0x4654('0x8d')][_0x4654('0x5e8')]=function(){},Sprite_SvEnemy['prototype']['setActorHome']=function(_0x499a44){},Sprite_SvEnemy[_0x4654('0x8d')][_0x4654('0x1f6')]=function(){if(!this[_0x4654('0xe5')][_0x4654('0x2fb')]()){if('MMdGH'!=='aIqeb')this[_0x4654('0x554')][_0x4654('0x5f2')]=![];else{function _0x1d2142(){return;this[_0x4654('0x313')]&&(this['_effectsContainer']['x']=this['x'],this[_0x4654('0x313')]['y']=this['y']),this[_0x4654('0x545')]&&(this[_0x4654('0x545')]['x']=this['x'],this['_damageContainer']['y']=this['y']);}}}else Sprite_Actor['prototype'][_0x4654('0x1f6')]['call'](this);},Sprite_SvEnemy['prototype'][_0x4654('0x147')]=function(){if(this[_0x4654('0x28f')])this[_0x4654('0x554')]['y']=-this[_0x4654('0x28f')][_0x4654('0x45d')]()-0x2;},Sprite_SvEnemy[_0x4654('0x8d')][_0x4654('0x4c9')]=function(){this[_0x4654('0x51c')][_0x4654('0x5f2')]=this[_0x4654('0xe5')]&&this[_0x4654('0xe5')][_0x4654('0x2fb')]();},Sprite_SvEnemy[_0x4654('0x8d')][_0x4654('0x371')]=function(){Sprite_Battler[_0x4654('0x8d')]['updateBitmap'][_0x4654('0x5a5')](this);const _0x261356=this[_0x4654('0xe5')][_0x4654('0x338')]();this[_0x4654('0x2ed')]!==_0x261356&&(this[_0x4654('0x2ed')]=_0x261356,this[_0x4654('0x573')][_0x4654('0x67c')]=ImageManager[_0x4654('0x352')](_0x261356));},Sprite_SvEnemy[_0x4654('0x8d')][_0x4654('0x1da')]=function(){},Sprite_SvEnemy[_0x4654('0x8d')]['startMove']=function(_0x3143d1,_0x2f3334,_0xb0f4fc){if(this[_0x4654('0x28f')])this[_0x4654('0x28f')][_0x4654('0x19c')](_0x3143d1,_0x2f3334,_0xb0f4fc);},Sprite_SvEnemy[_0x4654('0x8d')][_0x4654('0x596')]=function(){const _0x36bab2=this[_0x4654('0xe5')];if(_0x36bab2){const _0xf5e263=_0x36bab2[_0x4654('0x1d')]();if(_0x36bab2[_0x4654('0x4f7')]()||_0x36bab2['isActing']())this[_0x4654('0x51f')](_0x4654('0x6d3'));else{if(_0xf5e263===0x3)this[_0x4654('0x51f')](_0x4654('0x794'));else{if(_0xf5e263===0x2){if(_0x4654('0x113')===_0x4654('0x113'))this[_0x4654('0x51f')](_0x4654('0x394'));else{function _0xefcc78(){this[_0x4654('0x6b9')]-=0x10;}}}else{if(_0x36bab2[_0x4654('0x3bb')]()){if(_0x4654('0x1f4')!==_0x4654('0x58f'))this[_0x4654('0x51f')](_0x4654('0x1dd'));else{function _0x4e2209(){const _0x349b2e=this[_0x4654('0x57')]();this['_autoBattleWindow']=new _0x2b8dea(_0x349b2e),this[_0x4654('0x63')][_0x4654('0x3fe')](),this[_0x4654('0x43f')](this[_0x4654('0x63')]);}}}else{if(_0x36bab2[_0x4654('0x531')]()||_0x36bab2[_0x4654('0x4b')]())this[_0x4654('0x51f')](_0x4654('0x53a'));else{if(_0xf5e263===0x1)this[_0x4654('0x51f')](_0x4654('0x23a'));else{if(_0x36bab2[_0x4654('0x544')]())this[_0x4654('0x51f')](_0x4654('0x19d'));else{if(_0x36bab2[_0x4654('0x17b')]())this[_0x4654('0x51f')]('walk');else{if('dkCGA'!=='QqpMW')this[_0x4654('0x51f')](_0x36bab2['svBattlerData']()[_0x4654('0x4a3')]||_0x4654('0x6d3'));else{function _0x3a0d42(){this[_0x4654('0x59f')]=0x14,this[_0x4654('0x3d2')]['bitmap']=_0x37348f,_0x36a46a[_0x4654('0xda')][_0x4654('0x5dd')]()?(this[_0x4654('0x3d2')]['x']=0x0,this[_0x4654('0x657')]=_0x17c838[_0x4654('0x603')](_0x2e1b9b['width']/0x2)):(this[_0x4654('0x3d2')]['x']=this[_0x4654('0x564')],this[_0x4654('0x657')]=this[_0x4654('0x564')]*0x3/0x4),this[_0x4654('0x3d2')]['opacity']=0x0;}}}}}}}}}}}},Sprite_SvEnemy[_0x4654('0x8d')][_0x4654('0x581')]=function(){return this['parent']?this[_0x4654('0x28f')][_0x4654('0x208')]===0x0&&this[_0x4654('0x28f')][_0x4654('0x71b')]===0x0:!![];},Sprite_SvEnemy[_0x4654('0x8d')][_0x4654('0x3f1')]=function(){},Sprite_Damage[_0x4654('0x8d')][_0x4654('0x661')]=function(_0x7bac38){const _0x400f04=_0x7bac38['getNextDamagePopup']();if(_0x400f04[_0x4654('0x749')]||_0x400f04[_0x4654('0x163')]){if('WaDfb'!=='WaDfb'){function _0x17e9f7(){if(!_0x25afa8[_0x4654('0x4f9')]())return;const _0x312546=this[_0x4654('0x770')]();if(!_0x312546)return;_0x312546[_0x4654('0x6ec')](_0x3ffca4,_0x165dfd);}}else this['_colorType']=0x0,this['createMiss']();}else{if(_0x400f04[_0x4654('0x2d4')]){if(_0x4654('0x2c5')===_0x4654('0x2c5'))this[_0x4654('0x746')]=_0x400f04[_0x4654('0x511')]>=0x0?0x0:0x1,this[_0x4654('0x29')](_0x400f04[_0x4654('0x511')]);else{function _0x4564d2(){const _0x306bd5=this['isMVAnimation'](_0x37fa36),_0x216292=new(_0x306bd5?_0x40d7cd:_0x42244c)(),_0x18a3f0=this[_0x4654('0x68b')](_0x4d0144);this[_0x4654('0x705')](_0x304fd7[0x0])&&(_0x2f0439=!_0x2738f7),_0x216292[_0x4654('0x12b')]=_0x316c01,_0x216292[_0x4654('0x661')](_0x18a3f0,_0x5341ec,_0x2cd395,_0x447d3a),this['addAnimationSpriteToContainer'](_0x216292);}}}else{if(_0x7bac38[_0x4654('0x36f')]()&&_0x400f04['mpDamage']!==0x0){if(_0x4654('0x383')===_0x4654('0x549')){function _0x4449bc(){_0x3d5f5c=_0x183f3e[_0x4654('0x1f')]['JS'][_0x442593][_0x4654('0x5a5')](this,this[_0x4654('0xbe')](),_0x7d61ec,_0x4b4359,_0x1df91b);if(_0x186ab8)_0x5493e9=_0x34616f;}}else this['_colorType']=_0x400f04[_0x4654('0x5c8')]>=0x0?0x2:0x3,this[_0x4654('0x29')](_0x400f04[_0x4654('0x5c8')]);}}}_0x400f04[_0x4654('0x126')]&&this[_0x4654('0x4b6')]();},Sprite_Damage['prototype'][_0x4654('0x29')]=function(_0x40ebb5){let _0x313690=this[_0x4654('0x6fa')](_0x40ebb5);const _0x4c3e05=this['fontSize'](),_0x5d3855=Math[_0x4654('0x6f0')](_0x4c3e05*0.75);for(let _0x12a312=0x0;_0x12a312<_0x313690[_0x4654('0x0')];_0x12a312++){if('EuNRY'===_0x4654('0x317')){function _0x1b0fec(){if(!_0x515634[_0x4654('0x4f9')]())return;if(this['_flinched'])return;this[_0x4654('0x252')]=!![];const _0x3b686f=this['battler']();if(_0x3b686f)_0x3b686f[_0x4654('0x460')]();}}else{const _0x1068d2=this[_0x4654('0x74f')](_0x5d3855,_0x4c3e05);_0x1068d2['bitmap'][_0x4654('0x66f')](_0x313690[_0x12a312],0x0,0x0,_0x5d3855,_0x4c3e05,'center'),_0x1068d2['x']=(_0x12a312-(_0x313690[_0x4654('0x0')]-0x1)/0x2)*_0x5d3855,_0x1068d2['dy']=-_0x12a312;}}},Sprite_Damage['prototype'][_0x4654('0x6fa')]=function(_0x474f88){let _0x5bc3bd=Math[_0x4654('0x5b1')](_0x474f88)[_0x4654('0x478')]();if(this[_0x4654('0x47e')]()){if(_0x4654('0x5af')===_0x4654('0x5af'))_0x5bc3bd=VisuMZ[_0x4654('0x6e4')](_0x5bc3bd);else{function _0x11b722(){for(const _0x3b1060 of _0x1110c0){_0x3b1060['match'](/<REGION (\d+) BATTLEBACK(\d+): (.*)>/i);const _0x4a86b7=_0x2daead(_0x3ece39['$1']),_0x7d242f=_0x55f004(_0x2b1e33['$2']),_0x300c62=_0x7d242f===0x1?this[_0x4654('0x5fa')]:this[_0x4654('0x3e5')],_0x348689=_0x127fd6(_0x437e06['$3']);_0x300c62[_0x4a86b7]=_0x348689;}}}}const _0x5b3b17=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x3da')];let _0x509a9d='',_0x42cf26='';switch(this[_0x4654('0x746')]){case 0x0:_0x509a9d=_0x5b3b17['hpDamageFmt']||_0x4654('0x1c8'),_0x42cf26=TextManager['hp'];if(_0x474f88===0x0)_0x509a9d='%1';break;case 0x1:_0x509a9d=_0x5b3b17[_0x4654('0x53f')]||'+%1',_0x42cf26=TextManager['hp'];break;case 0x2:_0x509a9d=_0x5b3b17[_0x4654('0x75')]||_0x4654('0x316'),_0x42cf26=TextManager['mp'];break;case 0x3:_0x509a9d=_0x5b3b17[_0x4654('0xea')]||'+%1\x20MP',_0x42cf26=TextManager['mp'];break;}return _0x509a9d[_0x4654('0x31f')](_0x5bc3bd,_0x42cf26)[_0x4654('0x512')]();},Sprite_Damage[_0x4654('0x8d')][_0x4654('0x47e')]=function(){return Imported[_0x4654('0x631')]?VisuMZ[_0x4654('0x9a')][_0x4654('0x1f3')][_0x4654('0x384')]['DigitGroupingDamageSprites']:![];},Sprite_Damage[_0x4654('0x8d')][_0x4654('0x4b6')]=function(){const _0x3eb0ff=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x3da')];this[_0x4654('0x4ae')]=_0x3eb0ff[_0x4654('0x281')][_0x4654('0x2db')](0x0),this['_flashDuration']=_0x3eb0ff[_0x4654('0x1f8')];},Sprite_Damage[_0x4654('0x8d')]['setupTextPopup']=function(_0x40051f,_0x1ce41a){this[_0x4654('0x4ae')]=_0x1ce41a[_0x4654('0x47d')]||[0x0,0x0,0x0,0x0],this[_0x4654('0x4ae')]=JsonEx[_0x4654('0x1a7')](this['_flashColor']),this[_0x4654('0x42')]=_0x1ce41a['flashDuration']||0x0;const _0x2ce7e0=this['fontSize'](),_0x49e7ae=Math[_0x4654('0x6f0')](_0x2ce7e0*0xa),_0x1f5333=this['createChildSprite'](_0x49e7ae,_0x2ce7e0);_0x1f5333['bitmap'][_0x4654('0x2bb')]=ColorManager[_0x4654('0x432')](_0x1ce41a[_0x4654('0x2bb')]),_0x1f5333[_0x4654('0x67c')][_0x4654('0x66f')](_0x40051f,0x0,0x0,_0x49e7ae,_0x2ce7e0,'center'),_0x1f5333['dy']=0x0;},Sprite_Damage[_0x4654('0x8d')][_0x4654('0x797')]=function(_0x54e18f,_0xa6bdaa,_0xd54a0c){const _0x574682=Math[_0x4654('0x6f7')](this[_0x4654('0x3ac')](),ImageManager[_0x4654('0x145')]),_0x5338df=Math[_0x4654('0x6f0')](_0x574682*0xa),_0x2be863=this[_0x4654('0x74f')](_0x5338df,_0x574682),_0x587d2e=ImageManager[_0x4654('0x402')]/0x2,_0x5c29a6=_0x2be863[_0x4654('0x67c')][_0x4654('0x773')](_0xa6bdaa);_0x2be863[_0x4654('0x67c')][_0x4654('0x2bb')]=ColorManager[_0x4654('0x432')](_0xd54a0c[_0x4654('0x2bb')]),_0x2be863[_0x4654('0x67c')]['drawText'](_0xa6bdaa,_0x587d2e,0x0,_0x5338df-_0x587d2e,_0x574682,'center');const _0x5770a1=Math[_0x4654('0x31a')]((_0x574682-ImageManager[_0x4654('0x145')])/0x2),_0x2f36c0=_0x5338df/0x2-ImageManager[_0x4654('0x402')]-_0x5c29a6/0x2+_0x587d2e/0x2,_0x4029e1=ImageManager[_0x4654('0x1a4')](_0x4654('0x449')),_0x430edd=ImageManager[_0x4654('0x402')],_0xe89314=ImageManager[_0x4654('0x145')],_0x558dfc=_0x54e18f%0x10*_0x430edd,_0x5c9a43=Math[_0x4654('0x6f0')](_0x54e18f/0x10)*_0xe89314;_0x2be863[_0x4654('0x67c')]['blt'](_0x4029e1,_0x558dfc,_0x5c9a43,_0x430edd,_0xe89314,_0x2f36c0,_0x5770a1),this[_0x4654('0x4ae')]=_0xd54a0c['flashColor']||[0x0,0x0,0x0,0x0],this[_0x4654('0x4ae')]=JsonEx[_0x4654('0x1a7')](this['_flashColor']),this[_0x4654('0x42')]=_0xd54a0c[_0x4654('0x560')]||0x0,_0x2be863['dy']=0x0;},VisuMZ[_0x4654('0x1f')][_0x4654('0x671')]=Sprite_StateIcon['prototype'][_0x4654('0x288')],Sprite_StateIcon[_0x4654('0x8d')][_0x4654('0x288')]=function(){VisuMZ[_0x4654('0x1f')][_0x4654('0x671')][_0x4654('0x5a5')](this),this[_0x4654('0x5f2')]=this['_iconIndex']>0x0?!![]:![];};function Sprite_HpGauge(){this[_0x4654('0x278')](...arguments);}Sprite_HpGauge[_0x4654('0x8d')]=Object[_0x4654('0x5c7')](Sprite_Gauge[_0x4654('0x8d')]),Sprite_HpGauge['prototype'][_0x4654('0x1de')]=Sprite_HpGauge,Sprite_HpGauge[_0x4654('0x8d')][_0x4654('0x278')]=function(){Sprite_Gauge[_0x4654('0x8d')]['initialize'][_0x4654('0x5a5')](this);},Sprite_HpGauge[_0x4654('0x8d')][_0x4654('0x53d')]=function(){return 0x0;},Sprite_HpGauge['prototype']['redraw']=function(){this['bitmap'][_0x4654('0x2a9')]();const _0x7ff6ff=this[_0x4654('0x117')]();if(!isNaN(_0x7ff6ff)){if('ZwGjv'==='cDbVc'){function _0x109edd(){this[_0x4654('0x2d6')](_0x4654('0x154')),_0x55230b['BattleCore']['BattleManager_processVictory'][_0x4654('0x5a5')](this),this['processPostBattleCommonEvents'](_0x4654('0x50d'));}}else this[_0x4654('0x94')]();}},Spriteset_Battle[_0x4654('0x8d')][_0x4654('0x122')]=function(){if(!$gameSystem[_0x4654('0x4f9')]())return![];return![];},Spriteset_Battle[_0x4654('0x8d')][_0x4654('0x4ab')]=function(){return 0x0;},Spriteset_Battle['prototype'][_0x4654('0x4eb')]=function(){return 0x0;},VisuMZ[_0x4654('0x1f')][_0x4654('0x4fa')]=Spriteset_Battle[_0x4654('0x8d')][_0x4654('0x1c3')],Spriteset_Battle[_0x4654('0x8d')][_0x4654('0x1c3')]=function(){VisuMZ[_0x4654('0x1f')][_0x4654('0x4fa')][_0x4654('0x5a5')](this),this[_0x4654('0x277')]();},VisuMZ[_0x4654('0x1f')][_0x4654('0x1cd')]=Spriteset_Battle['prototype'][_0x4654('0x53c')],Spriteset_Battle['prototype'][_0x4654('0x53c')]=function(){VisuMZ['BattleCore'][_0x4654('0x1cd')][_0x4654('0x5a5')](this),this[_0x4654('0x767')]();},Spriteset_Battle[_0x4654('0x8d')][_0x4654('0x277')]=function(){this[_0x4654('0xcc')]=new Weather(),this[_0x4654('0x1d6')][_0x4654('0x43f')](this['_weather']);},Spriteset_Battle[_0x4654('0x8d')][_0x4654('0x767')]=function(){this[_0x4654('0xcc')][_0x4654('0x709')]=$gameScreen[_0x4654('0x3df')](),this[_0x4654('0xcc')][_0x4654('0x23b')]=$gameScreen[_0x4654('0x1ae')]();},Game_Interpreter['prototype']['command236']=function(_0x212673){$gameScreen[_0x4654('0x523')](_0x212673[0x0],_0x212673[0x1],_0x212673[0x2]);if(_0x212673[0x3])this['wait'](_0x212673[0x2]);return!![];},VisuMZ[_0x4654('0x1f')]['Game_Interpreter_command283']=Game_Interpreter['prototype'][_0x4654('0x5cc')],Game_Interpreter[_0x4654('0x8d')]['command283']=function(_0x124c71){if(SceneManager[_0x4654('0x443')]()){if('GXorA'!==_0x4654('0x424')){function _0x25870c(){const _0x12a832=_0x5922da(_0x1eeca2['$1']),_0x3cc5d2=_0x26194f[_0x4654('0x1f')][_0x4654('0xe8')](_0x82f548,_0x4654('0x5fb'));_0x43fe9a['BattleCore'][_0x4654('0x63c')](_0x12a832,_0x3cc5d2);}}else return SceneManager[_0x4654('0xda')][_0x4654('0x67f')]['changeBattlebacks'](_0x124c71[0x0],_0x124c71[0x1]),!![];}else{if(_0x4654('0x462')===_0x4654('0x462'))return VisuMZ[_0x4654('0x1f')][_0x4654('0x597')][_0x4654('0x5a5')](this,_0x124c71);else{function _0x5e8faa(){_0x1dee59[_0x4654('0x2fa')](_0x12ffc3);}}}},Spriteset_Battle[_0x4654('0x8d')][_0x4654('0x66a')]=function(_0x2424dc,_0x210bf6){_0x2424dc=_0x2424dc||this[_0x4654('0x3a6')][_0x4654('0xdb')](),_0x210bf6=_0x210bf6||this[_0x4654('0x38')][_0x4654('0x26f')]();const _0xa35481=ImageManager[_0x4654('0x2c9')](_0x2424dc);_0xa35481['addLoadListener'](this[_0x4654('0x75d')][_0x4654('0x4f')](this,this[_0x4654('0x3a6')],_0xa35481));const _0xb5c3b4=ImageManager['loadBattleback2'](_0x210bf6);_0xb5c3b4['addLoadListener'](this[_0x4654('0x75d')][_0x4654('0x4f')](this,this[_0x4654('0x38')],_0xb5c3b4));},Spriteset_Battle['prototype'][_0x4654('0x75d')]=function(_0x2a6411,_0x4d5d4f){_0x2a6411[_0x4654('0x67c')]=_0x4d5d4f;},VisuMZ[_0x4654('0x1f')]['Spriteset_Battle_createBattleField']=Spriteset_Battle[_0x4654('0x8d')][_0x4654('0x662')],Spriteset_Battle[_0x4654('0x8d')][_0x4654('0x662')]=function(){VisuMZ[_0x4654('0x1f')][_0x4654('0x2e5')][_0x4654('0x5a5')](this),this[_0x4654('0x78f')]();},Spriteset_Battle['prototype']['createBattleFieldBattleCore']=function(){this[_0x4654('0x30f')]=new Sprite(),this[_0x4654('0x1d6')][_0x4654('0x43f')](this[_0x4654('0x30f')]),this[_0x4654('0x72c')]=new Sprite(),this['_battleField'][_0x4654('0x43f')](this['_animationContainer']),this[_0x4654('0x545')]=new Sprite(),this['_damageContainer']['x']=this[_0x4654('0x1d6')]['x'],this[_0x4654('0x545')]['y']=this[_0x4654('0x1d6')]['y'],this[_0x4654('0x43f')](this[_0x4654('0x545')]);if(!this['isFlipped']())return;this[_0x4654('0x30f')][_0x4654('0x498')]['x']=-0x1,this['_battlerContainer']['x']=this[_0x4654('0x1d6')][_0x4654('0x564')],this[_0x4654('0x72c')][_0x4654('0x498')]['x']=-0x1,this[_0x4654('0x72c')]['x']=this[_0x4654('0x1d6')][_0x4654('0x564')],this['_damageContainer'][_0x4654('0x498')]['x']=-0x1,this[_0x4654('0x545')]['x']=this['_battleField']['x']+this[_0x4654('0x1d6')][_0x4654('0x564')];},Spriteset_Battle['prototype'][_0x4654('0x599')]=function(){if(Imported[_0x4654('0x631')]&&VisuMZ[_0x4654('0x9a')][_0x4654('0x1f3')]['UI'][_0x4654('0x320')]){if(_0x4654('0xd2')!==_0x4654('0x7f'))this['repositionEnemiesByResolution']();else{function _0x49936c(){this[_0x4654('0x554')]['visible']=![];}}}const _0x3d815d=$gameTroop[_0x4654('0x552')](),_0x5dacd6=[];for(const _0x36cfac of _0x3d815d){if(_0x4654('0x489')!==_0x4654('0x489')){function _0x2fade5(){if(!_0x3ea43d['isSceneBattle']())return;if(!_0x318086['VisuMZ_1_ElementStatusCore'])return;const _0x3bc507=_0x281a6e['_action'];if(!_0x3bc507)return;_0x3bc507[_0x4654('0x4cd')]();}}else _0x5dacd6[_0x4654('0x128')](new Sprite_Enemy(_0x36cfac));}_0x5dacd6[_0x4654('0xbb')](this[_0x4654('0x790')][_0x4654('0x4f')](this));for(const _0x529860 of _0x5dacd6){if(_0x4654('0x259')===_0x4654('0x711')){function _0x1066d2(){_0x42054b[_0x4654('0x1f')][_0x4654('0x28e')]['call'](this),this[_0x4654('0x34f')]();}}else this[_0x4654('0x30f')][_0x4654('0x43f')](_0x529860);}this[_0x4654('0x48f')]=_0x5dacd6;},Spriteset_Battle[_0x4654('0x8d')][_0x4654('0x84')]=function(){this[_0x4654('0x6d4')]=[];for(let _0x3a10fd=0x0;_0x3a10fd<$gameParty[_0x4654('0x77f')]();_0x3a10fd++){const _0x37d624=new Sprite_Actor();_0x37d624[_0x4654('0x2b3')]($gameParty[_0x4654('0x515')]()[_0x3a10fd]),this[_0x4654('0x6d4')][_0x4654('0x128')](_0x37d624),this[_0x4654('0x30f')][_0x4654('0x43f')](_0x37d624);}},Spriteset_Battle[_0x4654('0x8d')][_0x4654('0x752')]=function(_0x18c776,_0x42acf4,_0x6307af,_0x1efecb){const _0xa317da=this[_0x4654('0x4df')](_0x42acf4),_0x387c3c=new(_0xa317da?Sprite_AnimationMV:Sprite_Animation)(),_0x37828f=this[_0x4654('0x68b')](_0x18c776);this[_0x4654('0x705')](_0x18c776[0x0])&&(_0x6307af=!_0x6307af),_0x387c3c[_0x4654('0x12b')]=_0x18c776,_0x387c3c[_0x4654('0x661')](_0x37828f,_0x42acf4,_0x6307af,_0x1efecb),this[_0x4654('0x29a')](_0x387c3c);},Spriteset_Battle[_0x4654('0x8d')][_0x4654('0x29a')]=function(_0x54122c){if(this[_0x4654('0x57b')](_0x54122c)){if(_0x4654('0x553')!==_0x4654('0xdc'))this[_0x4654('0x62e')]()[_0x4654('0x43f')](_0x54122c);else{function _0x1f8490(){if(this[_0x4654('0x4fc')][_0x4654('0x0')]>0x0){const _0x2d3ad9=this[_0x4654('0x4fc')][_0x4654('0x2e1')](),_0x135e98=_0x2d3ad9[0x0];return _0x135e98[_0x4654('0x196')]=_0x135e98[_0x4654('0x196')]||[],_0x135e98[_0x4654('0x196')][0x0]=_0x2d3ad9[0x1],_0x135e98;}else return this[_0x4654('0x522')][_0x4654('0x2e1')]();}}}else this[_0x4654('0x72c')][_0x4654('0x43f')](_0x54122c);this['_animationSprites'][_0x4654('0x128')](_0x54122c);},Spriteset_Battle[_0x4654('0x8d')][_0x4654('0x57b')]=function(_0x3b7de3){if(!_0x3b7de3)return![];if(!_0x3b7de3[_0x4654('0x33d')])return![];if(_0x3b7de3[_0x4654('0x33d')][_0x4654('0x725')]!==0x0)return![];if(!_0x3b7de3[_0x4654('0x12b')][0x0])return![];if(!_0x3b7de3['targetObjects'][0x0][_0x4654('0x5b5')]())return![];if($gameSystem[_0x4654('0x4f9')]())return![];if(!this[_0x4654('0x62e')]())return![];return Window_BattleStatus[_0x4654('0x8d')][_0x4654('0x329')]()===_0x4654('0x4ad');},Spriteset_Battle[_0x4654('0x8d')][_0x4654('0x62e')]=function(){if(!SceneManager[_0x4654('0xda')])return;if(!SceneManager[_0x4654('0xda')]['_statusWindow'])return;if(!SceneManager[_0x4654('0xda')][_0x4654('0x16d')]['_effectsContainer'])return;return SceneManager[_0x4654('0xda')][_0x4654('0x16d')][_0x4654('0x313')];},Spriteset_Battle[_0x4654('0x8d')][_0x4654('0x3ea')]=function(_0x25f7ff){this[_0x4654('0x5ad')](_0x25f7ff);for(const _0x233811 of _0x25f7ff[_0x4654('0x12b')]){if(_0x4654('0x5da')!=='vFFzo'){function _0x362c4a(){if(!_0x4e3695[_0x4654('0x151')](_0x2f39ad))return!![];}}else _0x233811['endAnimation']&&_0x233811[_0x4654('0x3a1')]();}_0x25f7ff[_0x4654('0xe6')]();},Spriteset_Battle['prototype'][_0x4654('0x5ad')]=function(_0x296e31){this['_animationSprites'][_0x4654('0x314')](_0x296e31);if(this[_0x4654('0x57b')](_0x296e31)){if(_0x4654('0x333')!=='ealRS'){function _0x4b7801(){return _0x4654('0x83')[_0x4654('0x31f')](_0x4cac5e(_0x1e318b['$1']));}}else this[_0x4654('0x62e')]()[_0x4654('0x6ab')](_0x296e31);}else{if('VKuad'===_0x4654('0x291'))this[_0x4654('0x72c')][_0x4654('0x6ab')](_0x296e31);else{function _0x4813d5(){const _0x54c434=_0x60068d[_0x4654('0x5b3')]();_0x54c434<=0x0?_0x4f7897[_0x4654('0x70f')]():this[_0x4654('0x69c')](_0xd435ae,_0x54c434);}}}},VisuMZ[_0x4654('0x1f')][_0x4654('0x1fe')]=Spriteset_Battle[_0x4654('0x8d')][_0x4654('0x12d')],Spriteset_Battle['prototype']['updateActors']=function(){VisuMZ[_0x4654('0x1f')][_0x4654('0x1fe')][_0x4654('0x5a5')](this),this[_0x4654('0x107')]();},Spriteset_Battle[_0x4654('0x8d')][_0x4654('0x107')]=function(){this['_battlerContainer']['children'][_0x4654('0xbb')](this[_0x4654('0x96')][_0x4654('0x4f')](this));const _0x12fb6a=BattleManager[_0x4654('0x672')];if(_0x12fb6a){if(_0x4654('0x67e')===_0x4654('0x67e')){if(_0x12fb6a[_0x4654('0x5b5')]()&&!$gameSystem['isSideView']())return;const _0xba1ad0=_0x12fb6a[_0x4654('0x770')]();if(_0xba1ad0&&_0x12fb6a[_0x4654('0x5b5')]())this[_0x4654('0x30f')][_0x4654('0x43f')](_0xba1ad0);}else{function _0x26e3af(){return _0x51c1c8['BattleCore'][_0x4654('0x597')][_0x4654('0x5a5')](this,_0x96a6fa);}}}},Spriteset_Battle[_0x4654('0x8d')][_0x4654('0x96')]=function(_0x482f92,_0x32d0d5){return _0x482f92[_0x4654('0x2a8')]!==_0x32d0d5[_0x4654('0x2a8')]?_0x482f92[_0x4654('0x2a8')]-_0x32d0d5['_baseY']:_0x32d0d5['spriteId']-_0x482f92[_0x4654('0x62d')];},Spriteset_Battle[_0x4654('0x8d')][_0x4654('0x77a')]=function(){return![];},Spriteset_Battle[_0x4654('0x8d')][_0x4654('0x2b')]=function(){return this[_0x4654('0x54a')]()[_0x4654('0x6d6')](_0x61a480=>_0x61a480['isFloating']());},Spriteset_Battle[_0x4654('0x8d')][_0x4654('0x5d5')]=function(){return this[_0x4654('0x54a')]()[_0x4654('0x6d6')](_0x1634e5=>_0x1634e5[_0x4654('0x3ff')]());},Spriteset_Battle[_0x4654('0x8d')]['isAnyoneChangingOpacity']=function(){return this[_0x4654('0x54a')]()[_0x4654('0x6d6')](_0x22b4cd=>_0x22b4cd[_0x4654('0x5e6')]());},VisuMZ[_0x4654('0x1f')][_0x4654('0x4ec')]=Window_ItemList['prototype'][_0x4654('0x390')],Window_ItemList[_0x4654('0x8d')][_0x4654('0x390')]=function(){if(SceneManager[_0x4654('0x443')]()){if(_0x4654('0x2da')===_0x4654('0x2da')){if(SceneManager[_0x4654('0xda')]['battleLayoutStyle']()===_0x4654('0x5eb')){if(_0x4654('0x68f')===_0x4654('0x68f'))return VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x44f')][_0x4654('0x570')];else{function _0x1579dc(){this['targetActionSet'](_0x9f6cb5,_0x52d1b5,_0x1ab00e);}}}else{if(_0x4654('0x103')===_0x4654('0x337')){function _0x383255(){if(this[_0x4654('0x1de')]===_0x156f85&&!_0x52054d['hasSvBattler']())return;}}else return VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')]['BattleLayout'][_0x4654('0x692')];}}else{function _0x52bf79(){_0x4b7fd3[_0x4654('0x638')]=!![];}}}else return VisuMZ[_0x4654('0x1f')][_0x4654('0x4ec')][_0x4654('0x5a5')](this);},VisuMZ[_0x4654('0x1f')][_0x4654('0x675')]=Window_SkillList[_0x4654('0x8d')][_0x4654('0x390')],Window_SkillList[_0x4654('0x8d')]['maxCols']=function(){if(SceneManager[_0x4654('0x443')]()){if(_0x4654('0x20')!=='bbhbW'){if(SceneManager[_0x4654('0xda')][_0x4654('0x329')]()==='border')return VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x44f')][_0x4654('0x570')];else{if(_0x4654('0x53')!==_0x4654('0x53')){function _0x53152d(){this[_0x4654('0x197')](),this[_0x4654('0x78')](),this[_0x4654('0x34')](),this[_0x4654('0x346')](),this[_0x4654('0x57a')]();}}else return VisuMZ['BattleCore']['Settings'][_0x4654('0x44f')][_0x4654('0x692')];}}else{function _0x2f03ca(){return this[_0x4654('0x6ef')]();}}}else{if(_0x4654('0x192')===_0x4654('0x192'))return VisuMZ[_0x4654('0x1f')]['Window_SkillList_maxCols']['call'](this);else{function _0xd8c44(){_0x17e4a4=_0x37bf04*this[_0x4654('0x2c6')][_0x4654('0x436')],_0x5c78ae+=this[_0x4654('0x2c6')][_0x4654('0x76d')]*(_0x24f59d>=0x0?0x1:-0x1),_0x39f9c0=this[_0x4654('0x451')](_0x4654('0x4c7'),_0x3325a8,_0x4cab52,![]),_0x3a5e7a=this[_0x4654('0x3fc')](_0x254359),_0x2d98d1=_0x4fec1a[_0x4654('0x31a')](_0x21d987),this[_0x4654('0x1db')]=_0x4bb29d,this[_0x4654('0x165')]=this[_0x4654('0x165')]||0x0,this['_totalValue']+=_0x51c94c,_0x4c9bed[_0x4654('0x1f')][_0x4654('0x376')][_0x4654('0x5a5')](this,_0x5b34bc,_0x111759),this['applyBattleCoreJS']('PostDamage%1JS',_0x4f5de0,_0x26a460,!![]);}}}},VisuMZ[_0x4654('0x1f')][_0x4654('0x1f9')]=Window_Options[_0x4654('0x8d')][_0x4654('0x5ac')],Window_Options[_0x4654('0x8d')][_0x4654('0x5ac')]=function(){VisuMZ[_0x4654('0x1f')]['Window_Options_addGeneralOptions'][_0x4654('0x5a5')](this),this['addAutoBattleCommands'](),this[_0x4654('0xde')]();},Window_Options[_0x4654('0x8d')]['addAutoBattleCommands']=function(){if(VisuMZ[_0x4654('0x1f')]['Settings'][_0x4654('0x505')][_0x4654('0x492')]){if(_0x4654('0x799')!=='GCbEO'){function _0x1ce514(){this[_0x4654('0x6ed')]();}}else this[_0x4654('0x9d')](),this[_0x4654('0x700')]();}},Window_Options[_0x4654('0x8d')][_0x4654('0xde')]=function(){if(!VisuMZ[_0x4654('0x1f')]['Settings'][_0x4654('0x2a1')][_0x4654('0x2ac')])return;const _0x27465c=TextManager[_0x4654('0x6e8')],_0x137e02=_0x4654('0x6e8');this[_0x4654('0x713')](_0x27465c,_0x137e02);},Window_Options['prototype']['addBattleCoreAutoBattleStartupCommand']=function(){const _0x304379=TextManager[_0x4654('0x79d')],_0x41b389=_0x4654('0x6b6');this[_0x4654('0x713')](_0x304379,_0x41b389);},Window_Options[_0x4654('0x8d')]['addBattleCoreAutoBattleStyleCommand']=function(){const _0x462f08=TextManager[_0x4654('0x2ce')],_0x5c049e=_0x4654('0x3f7');this[_0x4654('0x713')](_0x462f08,_0x5c049e);},VisuMZ[_0x4654('0x1f')][_0x4654('0x4e2')]=Window_Options[_0x4654('0x8d')][_0x4654('0x676')],Window_Options[_0x4654('0x8d')][_0x4654('0x676')]=function(_0x33c844){const _0x2b604b=this[_0x4654('0x6d1')](_0x33c844);return _0x2b604b==='autoBattleUseSkills'?this[_0x4654('0x43c')]():VisuMZ[_0x4654('0x1f')]['Window_Options_statusText'][_0x4654('0x5a5')](this,_0x33c844);},Window_Options[_0x4654('0x8d')][_0x4654('0x43c')]=function(){const _0x14dbf1=VisuMZ[_0x4654('0x1f')]['Settings'][_0x4654('0x505')],_0x23c47c=this[_0x4654('0x647')](_0x4654('0x3f7'));return _0x23c47c?_0x14dbf1[_0x4654('0x6bf')]:_0x14dbf1['StyleOFF'];},Window_ShopStatus[_0x4654('0x8d')][_0x4654('0x33')]=function(){const _0x8c423c=DataManager['getDamageStyle'](this['_item']),_0x47fc9b=VisuMZ[_0x4654('0x484')][_0x8c423c];if(!_0x47fc9b)return this[_0x4654('0x4d1')]();const _0x527273=_0x4654('0xf7')[_0x4654('0x31f')](this[_0x4654('0x332')][_0x4654('0x445')][_0x4654('0x709')]),_0x44a717=[null,TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp'],TextManager['hp'],TextManager['mp']][this['_item'][_0x4654('0x445')][_0x4654('0x709')]];return _0x47fc9b[_0x527273][_0x4654('0x31f')](_0x44a717);},Window_ShopStatus[_0x4654('0x8d')][_0x4654('0x1b2')]=function(){const _0x27b0ae=DataManager[_0x4654('0x3b4')](this[_0x4654('0x332')]),_0x1405f0=VisuMZ['DamageStyles'][_0x27b0ae];if(!_0x1405f0)return this['getItemDamageAmountTextOriginal']();return _0x1405f0[_0x4654('0x534')][_0x4654('0x5a5')](this);},VisuMZ[_0x4654('0x1f')][_0x4654('0x62b')]=Window_PartyCommand[_0x4654('0x8d')][_0x4654('0x278')],Window_PartyCommand['prototype'][_0x4654('0x278')]=function(_0xbee03){VisuMZ['BattleCore'][_0x4654('0x62b')][_0x4654('0x5a5')](this,_0xbee03),this[_0x4654('0x6f5')](_0xbee03);},Window_PartyCommand[_0x4654('0x8d')]['createCommandNameWindow']=function(_0x3a1fc6){const _0x473574=new Rectangle(0x0,0x0,_0x3a1fc6[_0x4654('0x564')],_0x3a1fc6[_0x4654('0x2e8')]);this[_0x4654('0x345')]=new Window_Base(_0x473574),this[_0x4654('0x345')][_0x4654('0x3a0')]=0x0,this[_0x4654('0x43f')](this[_0x4654('0x345')]),this[_0x4654('0xa0')]();},Window_PartyCommand[_0x4654('0x8d')][_0x4654('0x685')]=function(){Window_Command[_0x4654('0x8d')][_0x4654('0x685')][_0x4654('0x5a5')](this);if(this[_0x4654('0x345')])this[_0x4654('0xa0')]();},Window_PartyCommand['prototype'][_0x4654('0xa0')]=function(){const _0xd29a=this[_0x4654('0x345')];_0xd29a[_0x4654('0xc2')][_0x4654('0x2a9')]();const _0x4fef22=this['commandStyleCheck'](this[_0x4654('0x4cb')]());if(_0x4fef22===_0x4654('0x347')&&this['maxItems']()>0x0){const _0x1315ab=this[_0x4654('0xc7')](this[_0x4654('0x4cb')]());let _0x2dde9f=this[_0x4654('0x74b')](this[_0x4654('0x4cb')]());_0x2dde9f=_0x2dde9f[_0x4654('0x10b')](/\\I\[(\d+)\]/gi,''),_0xd29a[_0x4654('0x318')](),this['commandNameWindowDrawBackground'](_0x2dde9f,_0x1315ab),this[_0x4654('0x726')](_0x2dde9f,_0x1315ab),this['commandNameWindowCenter'](_0x2dde9f,_0x1315ab);}},Window_PartyCommand[_0x4654('0x8d')][_0x4654('0x6ee')]=function(_0xcfa2b1,_0x54f35f){},Window_PartyCommand[_0x4654('0x8d')][_0x4654('0x726')]=function(_0x5c1605,_0x28f467){const _0xe47679=this['_commandNameWindow'];_0xe47679[_0x4654('0x66f')](_0x5c1605,0x0,_0x28f467['y'],_0xe47679['innerWidth'],_0x4654('0x6a2'));},Window_PartyCommand[_0x4654('0x8d')][_0x4654('0x747')]=function(_0x1055d1,_0x3836e7){const _0x4f0925=this[_0x4654('0x345')],_0xbef4c3=$gameSystem['windowPadding'](),_0x53bdf8=_0x3836e7['x']+Math[_0x4654('0x6f0')](_0x3836e7[_0x4654('0x564')]/0x2)+_0xbef4c3;_0x4f0925['x']=_0x4f0925[_0x4654('0x564')]/-0x2+_0x53bdf8,_0x4f0925['y']=Math['floor'](_0x3836e7[_0x4654('0x2e8')]/0x2);},Window_PartyCommand['prototype'][_0x4654('0x6b8')]=function(){this[_0x4654('0x197')](),this[_0x4654('0x78')](),this[_0x4654('0x34')](),this[_0x4654('0x346')](),this[_0x4654('0x57a')]();},Window_PartyCommand[_0x4654('0x8d')][_0x4654('0x197')]=function(){const _0x2cc0ae=this['commandStyle'](),_0x461035=VisuMZ[_0x4654('0x1f')]['Settings']['PartyCmd'][_0x4654('0x697')],_0x34186b=_0x2cc0ae===_0x4654('0x1c2')?TextManager[_0x4654('0x699')]:_0x4654('0x53b')[_0x4654('0x31f')](_0x461035,TextManager['fight']),_0x30ae7f=this[_0x4654('0x38b')]();this[_0x4654('0x713')](_0x34186b,'fight',_0x30ae7f);},Window_PartyCommand[_0x4654('0x8d')][_0x4654('0x38b')]=function(){return!![];},Window_PartyCommand[_0x4654('0x8d')][_0x4654('0x78')]=function(){if(!this['isAutoBattleCommandAdded']())return;const _0x4bf4df=this[_0x4654('0x4da')](),_0x467571=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0xe2')]['CmdIconAutoBattle'],_0x188557=_0x4bf4df===_0x4654('0x1c2')?TextManager['autoBattle']:_0x4654('0x53b')[_0x4654('0x31f')](_0x467571,TextManager['autoBattle']),_0x474586=this[_0x4654('0x1d3')]();this[_0x4654('0x713')](_0x188557,'autoBattle',_0x474586);},Window_PartyCommand[_0x4654('0x8d')][_0x4654('0x3cb')]=function(){return VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0xe2')][_0x4654('0x582')];},Window_PartyCommand[_0x4654('0x8d')][_0x4654('0x1d3')]=function(){return!![];},Window_PartyCommand[_0x4654('0x8d')]['addCustomCommands']=function(){},Window_PartyCommand[_0x4654('0x8d')][_0x4654('0x346')]=function(){if(!this['isOptionsCommandAdded']())return;const _0x400b7e=this[_0x4654('0x4da')](),_0xd5441c=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0xe2')][_0x4654('0x3a9')],_0xa18f2b=_0x400b7e==='text'?TextManager[_0x4654('0x5d1')]:_0x4654('0x53b')[_0x4654('0x31f')](_0xd5441c,TextManager[_0x4654('0x5d1')]),_0x50a220=this['isOptionsCommandEnabled']();this[_0x4654('0x713')](_0xa18f2b,_0x4654('0x5d1'),_0x50a220);},Window_PartyCommand[_0x4654('0x8d')][_0x4654('0x354')]=function(){return VisuMZ[_0x4654('0x1f')]['Settings'][_0x4654('0xe2')]['CommandAddOptions'];},Window_PartyCommand[_0x4654('0x8d')][_0x4654('0x48d')]=function(){return!![];},Window_PartyCommand[_0x4654('0x8d')][_0x4654('0x57a')]=function(){const _0x348f16=this[_0x4654('0x4da')](),_0x1eb56a=VisuMZ['BattleCore'][_0x4654('0x1f3')][_0x4654('0xe2')][_0x4654('0x5dc')],_0x27f31d=_0x348f16===_0x4654('0x1c2')?TextManager['escape']:'\x5cI[%1]%2'[_0x4654('0x31f')](_0x1eb56a,TextManager[_0x4654('0x648')]),_0x5a089c=this[_0x4654('0x6d2')]();this['addCommand'](_0x27f31d,_0x4654('0x648'),_0x5a089c);},Window_PartyCommand[_0x4654('0x8d')]['isEscapeCommandEnabled']=function(){return BattleManager[_0x4654('0x30e')]();},Window_PartyCommand[_0x4654('0x8d')][_0x4654('0x31e')]=function(){return VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')]['PartyCmd'][_0x4654('0x3a7')];},Window_PartyCommand['prototype'][_0x4654('0x85')]=function(_0x39fd0a){const _0x57af02=this[_0x4654('0x15c')](_0x39fd0a);if(_0x57af02===_0x4654('0x21'))this['drawItemStyleIconText'](_0x39fd0a);else _0x57af02===_0x4654('0x347')?this[_0x4654('0x21d')](_0x39fd0a):Window_Command[_0x4654('0x8d')][_0x4654('0x85')][_0x4654('0x5a5')](this,_0x39fd0a);},Window_PartyCommand['prototype'][_0x4654('0x4da')]=function(){return VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')]['PartyCmd'][_0x4654('0x601')];},Window_PartyCommand[_0x4654('0x8d')]['commandStyleCheck']=function(_0x3d20c0){if(_0x3d20c0<0x0)return'text';const _0x3f5402=this[_0x4654('0x4da')]();if(_0x3f5402!==_0x4654('0x670'))return _0x3f5402;else{if(this['maxItems']()>0x0){const _0xb2b90a=this[_0x4654('0x74b')](_0x3d20c0);if(_0xb2b90a['match'](/\\I\[(\d+)\]/i)){const _0x2ac4e8=this[_0x4654('0xc7')](_0x3d20c0),_0x2da443=this[_0x4654('0x617')](_0xb2b90a)[_0x4654('0x564')];return _0x2da443<=_0x2ac4e8[_0x4654('0x564')]?_0x4654('0x21'):_0x4654('0x347');}}}return _0x4654('0x1c2');},Window_PartyCommand[_0x4654('0x8d')]['drawItemStyleIconText']=function(_0x4f7eee){const _0x2b6c7e=this[_0x4654('0xc7')](_0x4f7eee),_0x56dca5=this[_0x4654('0x74b')](_0x4f7eee),_0x100ce6=this[_0x4654('0x617')](_0x56dca5)[_0x4654('0x564')];this[_0x4654('0x6c0')](this[_0x4654('0x1f5')](_0x4f7eee));const _0x9424cf=this[_0x4654('0x31e')]();if(_0x9424cf==='right')this[_0x4654('0x16f')](_0x56dca5,_0x2b6c7e['x']+_0x2b6c7e[_0x4654('0x564')]-_0x100ce6,_0x2b6c7e['y'],_0x100ce6);else{if(_0x9424cf==='center'){if(_0x4654('0x1b9')!==_0x4654('0x1b9')){function _0x7cc2d0(){if(!_0x553d99[_0x4654('0x443')]())return;const _0x5e2c6b=_0x1445d2[_0x4654('0x779')]();if(!_0x5e2c6b)return;_0x5e2c6b['setWaitMode'](_0x4654('0x757'));}}else{const _0x582145=_0x2b6c7e['x']+Math[_0x4654('0x6f0')]((_0x2b6c7e['width']-_0x100ce6)/0x2);this[_0x4654('0x16f')](_0x56dca5,_0x582145,_0x2b6c7e['y'],_0x100ce6);}}else{if(_0x4654('0x19')===_0x4654('0x63b')){function _0x4c17c3(){this[_0x4654('0x315')]();}}else this[_0x4654('0x16f')](_0x56dca5,_0x2b6c7e['x'],_0x2b6c7e['y'],_0x100ce6);}}},Window_PartyCommand[_0x4654('0x8d')][_0x4654('0x21d')]=function(_0x2aeaac){this[_0x4654('0x74b')](_0x2aeaac)['match'](/\\I\[(\d+)\]/i);const _0x56af8e=Number(RegExp['$1'])||0x0,_0x9784d7=this[_0x4654('0xc7')](_0x2aeaac),_0x5ae37d=_0x9784d7['x']+Math[_0x4654('0x6f0')]((_0x9784d7[_0x4654('0x564')]-ImageManager[_0x4654('0x402')])/0x2),_0x32e20a=_0x9784d7['y']+(_0x9784d7[_0x4654('0x2e8')]-ImageManager[_0x4654('0x145')])/0x2;this[_0x4654('0x64d')](_0x56af8e,_0x5ae37d,_0x32e20a);},Window_PartyCommand[_0x4654('0x8d')]['hide']=function(){},Window_PartyCommand[_0x4654('0x8d')]['activate']=function(){Window_Command[_0x4654('0x8d')]['activate'][_0x4654('0x5a5')](this);const _0x4456a2=this[_0x4654('0x329')]();_0x4456a2===_0x4654('0x5eb')&&this['showHelpWindow']();},Window_PartyCommand[_0x4654('0x8d')][_0x4654('0x329')]=function(){if(this[_0x4654('0x5f1')])return this[_0x4654('0x5f1')];return this['_battleLayoutStyle']=SceneManager[_0x4654('0xda')]['battleLayoutStyle'](),this['_battleLayoutStyle'];},Window_PartyCommand['prototype'][_0x4654('0x6eb')]=function(){const _0x595a20=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')]['PartyCmd'],_0xb14cd0=this[_0x4654('0x299')]();switch(_0xb14cd0){case _0x4654('0x699'):this['_helpWindow'][_0x4654('0x3d8')](_0x595a20[_0x4654('0x18b')]);break;case _0x4654('0x305'):this[_0x4654('0x736')][_0x4654('0x3d8')](_0x595a20[_0x4654('0x2ef')]);break;case _0x4654('0x5d1'):this[_0x4654('0x736')][_0x4654('0x3d8')](_0x595a20[_0x4654('0x1b6')]);break;case _0x4654('0x648'):this['_helpWindow'][_0x4654('0x3d8')](_0x595a20['HelpEscape']);break;default:this[_0x4654('0x736')][_0x4654('0x3d8')]('');break;}},VisuMZ[_0x4654('0x1f')]['Window_ActorCommand_initialize']=Window_ActorCommand['prototype'][_0x4654('0x278')],Window_ActorCommand[_0x4654('0x8d')][_0x4654('0x278')]=function(_0x3eae04){VisuMZ[_0x4654('0x1f')]['Window_ActorCommand_initialize'][_0x4654('0x5a5')](this,_0x3eae04),this[_0x4654('0x6f5')](_0x3eae04);},Window_ActorCommand['prototype']['createCommandNameWindow']=function(_0x3e5c3d){const _0x1ce3b9=new Rectangle(0x0,0x0,_0x3e5c3d['width'],_0x3e5c3d[_0x4654('0x2e8')]);this[_0x4654('0x345')]=new Window_Base(_0x1ce3b9),this['_commandNameWindow'][_0x4654('0x3a0')]=0x0,this[_0x4654('0x43f')](this['_commandNameWindow']),this[_0x4654('0xa0')]();},Window_ActorCommand[_0x4654('0x8d')][_0x4654('0x685')]=function(){Window_Command[_0x4654('0x8d')][_0x4654('0x685')][_0x4654('0x5a5')](this);if(this[_0x4654('0x345')])this['updateCommandNameWindow']();},Window_ActorCommand['prototype'][_0x4654('0xa0')]=function(){const _0x478303=this[_0x4654('0x345')];_0x478303[_0x4654('0xc2')][_0x4654('0x2a9')]();const _0x2850b1=this[_0x4654('0x15c')](this['index']());if(_0x2850b1===_0x4654('0x347')&&this[_0x4654('0x25d')]()>0x0){if(_0x4654('0x6c8')===_0x4654('0x766')){function _0x3f8dc1(){if(!this[_0x4654('0x354')]())return;const _0x4603ab=this['commandStyle'](),_0x501611=_0x53879c[_0x4654('0x1f')]['Settings'][_0x4654('0xe2')][_0x4654('0x3a9')],_0x139b1c=_0x4603ab==='text'?_0x541807[_0x4654('0x5d1')]:_0x4654('0x53b')[_0x4654('0x31f')](_0x501611,_0x501528[_0x4654('0x5d1')]),_0x43054c=this[_0x4654('0x48d')]();this[_0x4654('0x713')](_0x139b1c,_0x4654('0x5d1'),_0x43054c);}}else{const _0x3800fa=this[_0x4654('0xc7')](this[_0x4654('0x4cb')]());let _0xee3584=this[_0x4654('0x74b')](this[_0x4654('0x4cb')]());_0xee3584=_0xee3584[_0x4654('0x10b')](/\\I\[(\d+)\]/gi,''),_0x478303['resetFontSettings'](),this[_0x4654('0x6ee')](_0xee3584,_0x3800fa),this[_0x4654('0x726')](_0xee3584,_0x3800fa),this['commandNameWindowCenter'](_0xee3584,_0x3800fa);}}},Window_ActorCommand[_0x4654('0x8d')][_0x4654('0x6ee')]=function(_0xd33180,_0xe3c134){},Window_ActorCommand['prototype'][_0x4654('0x726')]=function(_0x48a5ba,_0x1121bc){const _0x3292c1=this['_commandNameWindow'];_0x3292c1[_0x4654('0x66f')](_0x48a5ba,0x0,_0x1121bc['y'],_0x3292c1[_0x4654('0x72f')],'center');},Window_ActorCommand[_0x4654('0x8d')][_0x4654('0x747')]=function(_0x5abbe6,_0x25ccf3){const _0x3b2c9b=this['_commandNameWindow'],_0x370cf6=$gameSystem[_0x4654('0x764')](),_0x4ae0a3=_0x25ccf3['x']+Math[_0x4654('0x6f0')](_0x25ccf3[_0x4654('0x564')]/0x2)+_0x370cf6;_0x3b2c9b['x']=_0x3b2c9b[_0x4654('0x564')]/-0x2+_0x4ae0a3,_0x3b2c9b['y']=Math[_0x4654('0x6f0')](_0x25ccf3['height']/0x2);},Window_ActorCommand[_0x4654('0x8d')][_0x4654('0x6b8')]=function(){if(!this['_actor'])return;const _0x47572a=this[_0x4654('0xe5')]['battleCommands']();for(const _0x4fb30f of _0x47572a){if(_0x4654('0x276')!==_0x4654('0x276')){function _0x599847(){_0xb507['BattleCore'][_0x4654('0x1ee')][_0x4654('0x5a5')](this,_0x107274,_0x56b18e),this[_0x4654('0x223')]();}}else this['makeBattleCommand'](_0x4fb30f[_0x4654('0x29d')]()['trim']());}},Window_ActorCommand[_0x4654('0x8d')]['makeBattleCommand']=function(_0x1127e3){_0x1127e3===_0x4654('0x343')&&this[_0x4654('0x54b')]();if(['STYPES',_0x4654('0x6fc')][_0x4654('0x386')](_0x1127e3)){if(_0x4654('0x61d')==='XYgEZ'){function _0x5334ac(){_0xe2099e[_0x4654('0x8d')][_0x4654('0x6b7')][_0x4654('0x5a5')](this),this[_0x4654('0x741')](_0x4654('0xb2'));}}else this[_0x4654('0x74d')]();}if(_0x1127e3===_0x4654('0x245')){if(_0x4654('0x1fc')!==_0x4654('0x1fc')){function _0x598f76(){for(const _0x2bd4f6 of this[_0x4654('0x552')]()){if(_0x2bd4f6)_0x2bd4f6[_0x4654('0x2d6')](_0x36f8da);}}}else this[_0x4654('0x15d')]();}if(_0x1127e3===_0x4654('0x369')){if(_0x4654('0x22a')!=='vTIxq'){function _0x10bf84(){return _0x38f01e[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x5be')]['MessageWait'];}}else this[_0x4654('0xa4')]();}_0x1127e3===_0x4654('0x615')&&this[_0x4654('0x57a')]();_0x1127e3===_0x4654('0x222')&&this[_0x4654('0x78')]();if(_0x1127e3[_0x4654('0x2a0')](/STYPE: (\d+)/i)){if(_0x4654('0x1e0')!==_0x4654('0x1e0')){function _0xab5277(){return this[_0x4654('0x5c9')]()?0x0:0xa;}}else{const _0x50457f=Number(RegExp['$1']);this[_0x4654('0x17a')](_0x50457f);}}else{if(_0x1127e3[_0x4654('0x2a0')](/STYPE: (.*)/i)){const _0x50c7e0=DataManager[_0x4654('0x591')](RegExp['$1']);this[_0x4654('0x17a')](_0x50c7e0);}}if(_0x1127e3===_0x4654('0x141')){if(_0x4654('0x16a')!=='cWIFW')this[_0x4654('0x52e')]();else{function _0x2724c2(){if(!this[_0x4654('0x360')]())return;_0x92fadc[_0x4654('0x8e')]()?this['x']=_0x40550b[_0x4654('0x46b')]-this[_0x4654('0x360')]()['battler']()['_baseX']:this['x']=this['enemy']()[_0x4654('0x770')]()[_0x4654('0x2df')],this['x']-=_0x69618a[_0x4654('0x31a')](this['width']/0x2),this['y']=this[_0x4654('0x360')]()['battler']()['_baseY']-_0x146096['round'](this[_0x4654('0x182')]()*1.5);}}}if(_0x1127e3[_0x4654('0x2a0')](/SKILL: (\d+)/i)){if('nCtIS'===_0x4654('0x4ff')){const _0x39ab42=Number(RegExp['$1']);this[_0x4654('0x124')]($dataSkills[_0x39ab42]);}else{function _0x4899c1(){this[_0x4654('0x2d6')](_0x4654('0x723'));const _0x4642d5=this['_escapeRatio'];_0xd61a87['BattleCore'][_0x4654('0x21a')][_0x4654('0x5a5')](this),this[_0x4654('0x2e2')]=_0x4642d5+_0x1cdc79['BattleCore'][_0x4654('0x1f3')][_0x4654('0xb')][_0x4654('0x4b2')][_0x4654('0x5a5')](this),this[_0x4654('0x11')](_0x4654('0x9'));}}}else{if(_0x1127e3['match'](/SKILL: (.*)/i)){if(_0x4654('0x271')===_0x4654('0x271')){const _0x55123c=DataManager['getSkillIdWithName'](RegExp['$1']);this[_0x4654('0x124')]($dataSkills[_0x55123c]);}else{function _0x263d52(){this[_0x4654('0x6da')]()[_0x4654('0x43f')](_0x158ce7);if(_0x5e2390[_0x4654('0x8e')]())_0x27f910[_0x4654('0x498')]['x']=-0x1;}}}}if(_0x1127e3===_0x4654('0x551')&&Imported[_0x4654('0x608')]){if(_0x4654('0x2f2')!=='smzrQ')this[_0x4654('0x202')]();else{function _0x147931(){if(!_0x72fa4['isPhysical']())return![];if(!_0x390ef2[_0x4654('0x2f5')]())return![];if(!_0x37813a[_0x4654('0x58b')]())return![];return _0xf641f9[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x76a')][_0x4654('0x18d')];}}}},Window_ActorCommand[_0x4654('0x8d')][_0x4654('0x54b')]=function(){const _0x449e49=$dataSkills[this['_actor']['attackSkillId']()];if(!_0x449e49)return;if(!this[_0x4654('0x677')](_0x449e49))return;const _0x334b46=this['commandStyle'](),_0x5d206d=DataManager[_0x4654('0x2c4')](_0x449e49),_0x13e620=DataManager[_0x4654('0x158')](_0x449e49),_0x16620d=_0x334b46==='text'?_0x5d206d:_0x4654('0x53b')[_0x4654('0x31f')](_0x13e620,_0x5d206d);this[_0x4654('0x713')](_0x16620d,_0x4654('0x36d'),this[_0x4654('0xe5')]['canAttack']());},Window_ActorCommand[_0x4654('0x8d')][_0x4654('0x15d')]=function(){const _0x1f66c2=$dataSkills[this[_0x4654('0xe5')][_0x4654('0x556')]()];if(!_0x1f66c2)return;if(!this[_0x4654('0x677')](_0x1f66c2))return;const _0x12b54=this[_0x4654('0x4da')](),_0xbf7c30=DataManager[_0x4654('0x2c4')](_0x1f66c2),_0x5f0b05=DataManager[_0x4654('0x158')](_0x1f66c2),_0x541d61=_0x12b54===_0x4654('0x1c2')?_0xbf7c30:_0x4654('0x53b')[_0x4654('0x31f')](_0x5f0b05,_0xbf7c30);this[_0x4654('0x713')](_0x541d61,_0x4654('0x53a'),this[_0x4654('0xe5')][_0x4654('0x1d5')]());},Window_ActorCommand[_0x4654('0x8d')][_0x4654('0xa4')]=function(){const _0x27485a=this[_0x4654('0x4da')](),_0x14aa8f=VisuMZ['BattleCore'][_0x4654('0x1f3')][_0x4654('0x3a')][_0x4654('0x287')],_0x273fc1=_0x27485a===_0x4654('0x1c2')?TextManager[_0x4654('0x1f7')]:_0x4654('0x53b')[_0x4654('0x31f')](_0x14aa8f,TextManager[_0x4654('0x1f7')]),_0x1f1df1=this[_0x4654('0x413')]();this[_0x4654('0x713')](_0x273fc1,_0x4654('0x1f7'),_0x1f1df1);},Window_ActorCommand['prototype']['isItemCommandEnabled']=function(){return this[_0x4654('0xe5')]&&this['_actor'][_0x4654('0x501')]();},Window_ActorCommand[_0x4654('0x8d')]['addSkillCommands']=function(){const _0x11ce79=this[_0x4654('0xe5')][_0x4654('0x249')]();for(const _0x43033d of _0x11ce79){if(_0x4654('0x5b2')===_0x4654('0x5b2'))this[_0x4654('0x17a')](_0x43033d);else{function _0xb721d1(){const _0x19f663=_0x1d8f2b(_0x1bf143['$1'])[_0x4654('0x5d2')](/[\r\n]+/)[_0x4654('0x314')](''),_0x4c0476=_0x5d2308[_0x4654('0x6a')](_0x19f663);_0x5d75ec[_0x4654('0x584')]=_0x5b955e[_0x4654('0x444')](_0x4c0476);}}}},Window_ActorCommand[_0x4654('0x8d')][_0x4654('0x17a')]=function(_0xc4ff77){let _0x2d3dc8=$dataSystem[_0x4654('0x249')][_0xc4ff77];if(!_0x2d3dc8)return;let _0x18ad16=_0x2d3dc8;const _0x4bc26f=this[_0x4654('0x4da')]();if(_0x4bc26f===_0x4654('0x1c2')){if(_0x4654('0x3e0')!==_0x4654('0x3e0')){function _0x2efce5(){const _0x3cf48d=_0x236d6f[_0x4654('0x30c')]();if(_0x3cf48d)_0x3cf48d[_0x4654('0x770')]()[_0x4654('0x224')]();_0xf1173d[_0x4654('0x1f')][_0x4654('0x733')][_0x4654('0x5a5')](this);}}else _0x18ad16=_0x18ad16[_0x4654('0x10b')](/\x1I\[(\d+)\]/gi,''),_0x18ad16=_0x18ad16[_0x4654('0x10b')](/\\I\[(\d+)\]/gi,'');}else{if(!_0x2d3dc8[_0x4654('0x2a0')](/\\I\[(\d+)\]/i)){const _0x220973=Imported[_0x4654('0x22')]?VisuMZ[_0x4654('0x243')]['Settings'][_0x4654('0x623')]:VisuMZ['BattleCore'][_0x4654('0x1f3')]['ActorCmd'],_0x211dc6=$dataSystem['magicSkills'][_0x4654('0x386')](_0xc4ff77),_0x33e8ba=_0x211dc6?_0x220973[_0x4654('0x25c')]:_0x220973['IconStypeNorm'];_0x18ad16=_0x4654('0x53b')['format'](_0x33e8ba,_0x2d3dc8);}}this[_0x4654('0x713')](_0x18ad16,'skill',!![],_0xc4ff77);},Window_ActorCommand[_0x4654('0x8d')][_0x4654('0x52e')]=function(){const _0xd2b771=this[_0x4654('0xe5')][_0x4654('0x249')](),_0x953b96=this[_0x4654('0xe5')][_0x4654('0x21f')]();for(const _0x47f5c1 of _0x953b96){if(!_0x47f5c1)continue;if(Imported[_0x4654('0x22')]){if(_0x4654('0x704')==='XfJen'){function _0x375b44(){const _0x59e67c=_0x3ceef7[_0x41a4d5];if(_0x59e67c)_0x1c413e[_0x4654('0x128')](_0x1ecd8e[_0x4654('0x1a7')](_0x59e67c));}}else{const _0x4645ee=_0xd2b771['filter'](_0xc00126=>DataManager[_0x4654('0x485')](_0x47f5c1)[_0x4654('0x386')](_0xc00126));if(_0x4645ee[_0x4654('0x0')]<=0x0)continue;}}else{if(!_0xd2b771[_0x4654('0x386')](_0x47f5c1[_0x4654('0x507')]))continue;}this[_0x4654('0x124')](_0x47f5c1);}},Window_ActorCommand[_0x4654('0x8d')][_0x4654('0x124')]=function(_0x14b3d2){if(!_0x14b3d2)return;if(!this[_0x4654('0x677')](_0x14b3d2))return;const _0x41df66=this['commandStyle'](),_0x54b85f=DataManager[_0x4654('0x2c4')](_0x14b3d2),_0x12d991=DataManager[_0x4654('0x158')](_0x14b3d2),_0x163092=_0x41df66===_0x4654('0x1c2')?_0x54b85f:_0x4654('0x53b')[_0x4654('0x31f')](_0x12d991,_0x54b85f),_0x472f11=this['_actor']['canUse'](_0x14b3d2);this[_0x4654('0x713')](_0x163092,_0x4654('0x4f1'),_0x472f11,_0x14b3d2['id']);},Window_ActorCommand[_0x4654('0x8d')][_0x4654('0x677')]=function(_0x25d909){const _0x4c78ab=_0x25d909[_0x4654('0x762')];if(_0x4c78ab['match'](/<COMMAND REQUIRE LEARN>/i)){if(_0x4654('0x776')===_0x4654('0x776')){if(!this[_0x4654('0xe5')][_0x4654('0x2ba')](_0x25d909['id']))return![];}else{function _0x994692(){const _0x1b23f0=_0x902e95[_0x4654('0x1f')]['Settings']['ActionSequence'],_0x4a0841=_0x1b23f0['StepDistanceX'],_0x4b87b1=_0x1b23f0[_0x4654('0x3f3')],_0x59efa6=_0x1b23f0[_0x4654('0x75f')];this[_0x4654('0x19c')](_0x4a0841,_0x4b87b1,_0x59efa6);}}}if(_0x4c78ab['match'](/<COMMAND REQUIRE ACCESS>/i)){if(_0x4654('0x4f8')!==_0x4654('0x58')){if(!this[_0x4654('0xe5')][_0x4654('0x586')](_0x25d909['id']))return![];}else{function _0x3846b5(){_0x446e63[_0x4654('0x1f')]['Game_Battler_performActionEnd']['call'](this),this[_0x4654('0x252')]=![];const _0x14de3e=this[_0x4654('0x770')]();if(_0x14de3e)_0x14de3e[_0x4654('0x224')]();this['setBattlerFlip'](![]),this[_0x4654('0x35a')]();}}}const _0x3b079d=VisuMZ['BattleCore'][_0x4654('0xe8')](_0x25d909,_0x4654('0x3d4'));if(VisuMZ[_0x4654('0x1f')]['JS'][_0x3b079d]){if(_0x4654('0x5c0')!==_0x4654('0x365')){if(!VisuMZ['BattleCore']['JS'][_0x3b079d][_0x4654('0x5a5')](this,this[_0x4654('0xe5')],_0x25d909))return![];}else{function _0x1c60f4(){this[_0x4654('0x2de')]=_0x5c6e44;}}}return VisuMZ[_0x4654('0x1f')][_0x4654('0x525')](_0x25d909);},VisuMZ[_0x4654('0x1f')]['CheckSkillCommandShowSwitches']=function(_0x462224){const _0x7faa9c=_0x462224[_0x4654('0x762')];if(_0x7faa9c['match'](/<COMMAND SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x4654('0x7a')===_0x4654('0x792')){function _0x4da13f(){_0x2b0864=_0x59454c+_0x595c71[_0x4654('0x402')]/0x2-0x4,_0x4d9da6=_0x9975d1-_0x3464ff[_0x4654('0x145')]/0x2;}}else{const _0x5d3468=JSON[_0x4654('0x6c1')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x4fb741 of _0x5d3468){if(!$gameSwitches[_0x4654('0x151')](_0x4fb741))return![];}return!![];}}if(_0x7faa9c[_0x4654('0x2a0')](/<COMMAND SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3fe65e=JSON[_0x4654('0x6c1')]('['+RegExp['$1'][_0x4654('0x2a0')](/\d+/g)+']');for(const _0xd49f8e of _0x3fe65e){if(!$gameSwitches['value'](_0xd49f8e))return![];}return!![];}if(_0x7faa9c[_0x4654('0x2a0')](/<COMMAND SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x1e3400=JSON[_0x4654('0x6c1')]('['+RegExp['$1'][_0x4654('0x2a0')](/\d+/g)+']');for(const _0x45003c of _0x1e3400){if($gameSwitches[_0x4654('0x151')](_0x45003c))return!![];}return![];}if(_0x7faa9c[_0x4654('0x2a0')](/<COMMAND HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x48bc60=JSON[_0x4654('0x6c1')]('['+RegExp['$1'][_0x4654('0x2a0')](/\d+/g)+']');for(const _0x1c7dc1 of _0x48bc60){if(!$gameSwitches[_0x4654('0x151')](_0x1c7dc1))return!![];}return![];}if(_0x7faa9c['match'](/<COMMAND HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x222a64=JSON[_0x4654('0x6c1')]('['+RegExp['$1'][_0x4654('0x2a0')](/\d+/g)+']');for(const _0x580433 of _0x222a64){if(_0x4654('0x765')===_0x4654('0x765')){if(!$gameSwitches['value'](_0x580433))return!![];}else{function _0x57d5e3(){if(_0x1a5007[_0x4654('0x762')][_0x4654('0x2a0')](/<SWAP ENEMIES>\s*([\s\S]*)\s*<\/SWAP ENEMIES>/i)){const _0x2d3d95=_0x933fc3(_0x3644ed['$1'])[_0x4654('0x5d2')](/[\r\n]+/)[_0x4654('0x314')](''),_0x1161f8=this[_0x4654('0x6a')](_0x2d3d95);_0x8dcbc7=this[_0x4654('0x164')](_0x1161f8)||_0x1e5b8a,_0x4f2bb7=_0x325a98[_0x4654('0x26d')](_0x277d46);}}}}return![];}if(_0x7faa9c[_0x4654('0x2a0')](/<COMMAND HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x141cec=JSON['parse']('['+RegExp['$1'][_0x4654('0x2a0')](/\d+/g)+']');for(const _0x5400c of _0x141cec){if($gameSwitches[_0x4654('0x151')](_0x5400c))return![];}return!![];}return!![];},Window_ActorCommand['prototype'][_0x4654('0x57a')]=function(){const _0x158008=this['commandStyle'](),_0x581e85=VisuMZ[_0x4654('0x1f')]['Settings'][_0x4654('0xe2')][_0x4654('0x5dc')],_0x26471f=_0x158008===_0x4654('0x1c2')?TextManager['escape']:_0x4654('0x53b')['format'](_0x581e85,TextManager['escape']),_0x1adb8f=this['isEscapeCommandEnabled']();this[_0x4654('0x713')](_0x26471f,_0x4654('0x648'),_0x1adb8f);},Window_ActorCommand[_0x4654('0x8d')][_0x4654('0x6d2')]=function(){return BattleManager[_0x4654('0x30e')]();},Window_ActorCommand['prototype'][_0x4654('0x78')]=function(){const _0x2dcd49=this[_0x4654('0x4da')](),_0x417471=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0xe2')][_0x4654('0xb1')],_0x183798=_0x2dcd49===_0x4654('0x1c2')?TextManager['autoBattle']:_0x4654('0x53b')[_0x4654('0x31f')](_0x417471,TextManager[_0x4654('0x305')]),_0x49a68c=this[_0x4654('0x1d3')]();this[_0x4654('0x713')](_0x183798,_0x4654('0x305'),_0x49a68c);},Window_ActorCommand[_0x4654('0x8d')][_0x4654('0x1d3')]=function(){return!![];},Window_ActorCommand['prototype'][_0x4654('0x31e')]=function(){return VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x3a')][_0x4654('0x3a7')];},Window_ActorCommand['prototype']['drawItem']=function(_0x4118ff){const _0x2ce9fb=this['commandStyleCheck'](_0x4118ff);if(_0x2ce9fb===_0x4654('0x21')){if(_0x4654('0x81')==='gyEAS')this[_0x4654('0x777')](_0x4118ff);else{function _0xf4ff1e(){this[_0x4654('0x46')]()?_0x219aa9[_0x4654('0xda')][_0x4654('0x16d')][_0x4654('0x260')](_0x5c3334):(this[_0x4654('0x6da')]()[_0x4654('0x6ab')](_0x1e2b56),this[_0x4654('0x138')][_0x4654('0x314')](_0x3d54a3),_0x9b9d0[_0x4654('0xe6')]());}}}else{if(_0x2ce9fb===_0x4654('0x347')){if(_0x4654('0x47f')!==_0x4654('0x47f')){function _0x3d79e8(){_0x5d2e0f['BattleCore']['Sprite_Actor_createStateSprite'][_0x4654('0x5a5')](this),_0x40ceea[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x2a1')]['ShowActorGauge']&&this[_0x4654('0x472')]();}}else this[_0x4654('0x21d')](_0x4118ff);}else Window_Command[_0x4654('0x8d')]['drawItem']['call'](this,_0x4118ff);}this[_0x4654('0x632')](_0x4118ff);},Window_ActorCommand[_0x4654('0x8d')][_0x4654('0x4da')]=function(){return VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x3a')][_0x4654('0x601')];},Window_ActorCommand['prototype']['commandStyleCheck']=function(_0x2db182){if(_0x2db182<0x0)return'text';const _0x18a6f3=this[_0x4654('0x4da')]();if(_0x18a6f3!=='auto')return _0x18a6f3;else{if(this[_0x4654('0x25d')]()>0x0){if('PuUJz'!=='tofBR'){const _0x4d67e8=this[_0x4654('0x74b')](_0x2db182);if(_0x4d67e8[_0x4654('0x2a0')](/\\I\[(\d+)\]/i)){if(_0x4654('0x5bd')===_0x4654('0x5b6')){function _0x9849c2(){this[_0x4654('0x51f')](_0x4654('0x1dd'));}}else{const _0x55c3ce=this['itemLineRect'](_0x2db182),_0x2fe5f2=this[_0x4654('0x617')](_0x4d67e8)[_0x4654('0x564')];if(_0x2fe5f2<=_0x55c3ce[_0x4654('0x564')]){if(_0x4654('0x59b')===_0x4654('0x2d8')){function _0x1ee5b4(){const _0x1c84eb=_0x12d2be[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x3da')],_0x5f102d=new _0x21b621();_0x5f102d[_0x4654('0x684')]=_0x1c84eb[_0x4654('0x437')],this[_0x4654('0x6db')](_0x5f102d),_0x5f102d[_0x4654('0x661')](this[_0x4654('0x6cd')]),this[_0x4654('0x2ab')](_0x5f102d);}}else return _0x4654('0x21');}else return _0x4654('0x347');}}}else{function _0x4cc5bf(){_0x43711a['push'](this[_0x4654('0x13d')]()[_0x4654('0x589')]());}}}}return'text';},Window_ActorCommand[_0x4654('0x8d')][_0x4654('0x777')]=function(_0x5c7339){const _0x36a887=this[_0x4654('0xc7')](_0x5c7339),_0x12840f=this[_0x4654('0x74b')](_0x5c7339),_0x1e4c98=this['textSizeEx'](_0x12840f)[_0x4654('0x564')];this[_0x4654('0x6c0')](this[_0x4654('0x1f5')](_0x5c7339));const _0x390b9b=this[_0x4654('0x31e')]();if(_0x390b9b===_0x4654('0xa1'))this[_0x4654('0x16f')](_0x12840f,_0x36a887['x']+_0x36a887[_0x4654('0x564')]-_0x1e4c98,_0x36a887['y'],_0x1e4c98);else{if(_0x390b9b===_0x4654('0x6a2')){if(_0x4654('0xca')===_0x4654('0x48e')){function _0x3ea647(){this['startMotion']('walk');}}else{const _0x22690a=_0x36a887['x']+Math[_0x4654('0x6f0')]((_0x36a887[_0x4654('0x564')]-_0x1e4c98)/0x2);this[_0x4654('0x16f')](_0x12840f,_0x22690a,_0x36a887['y'],_0x1e4c98);}}else this[_0x4654('0x16f')](_0x12840f,_0x36a887['x'],_0x36a887['y'],_0x1e4c98);}},Window_ActorCommand['prototype'][_0x4654('0x21d')]=function(_0x446385){this[_0x4654('0x74b')](_0x446385)[_0x4654('0x2a0')](/\\I\[(\d+)\]/i);const _0x3f92a6=Number(RegExp['$1'])||0x0,_0x1e07fe=this[_0x4654('0xc7')](_0x446385),_0x406c84=_0x1e07fe['x']+Math[_0x4654('0x6f0')]((_0x1e07fe[_0x4654('0x564')]-ImageManager[_0x4654('0x402')])/0x2),_0x2ee417=_0x1e07fe['y']+(_0x1e07fe[_0x4654('0x2e8')]-ImageManager[_0x4654('0x145')])/0x2;this[_0x4654('0x64d')](_0x3f92a6,_0x406c84,_0x2ee417);},Window_ActorCommand[_0x4654('0x8d')][_0x4654('0x632')]=function(_0x3ed28a){const _0x2f5968=this['commandSymbol'](_0x3ed28a);if(![_0x4654('0x36d'),_0x4654('0x53a'),'singleSkill'][_0x4654('0x386')](_0x2f5968))return;const _0x330bcf=this[_0x4654('0xc7')](_0x3ed28a);let _0x39ebdb=null;if(_0x2f5968===_0x4654('0x36d'))_0x39ebdb=$dataSkills[this[_0x4654('0xe5')][_0x4654('0x783')]()];else _0x2f5968===_0x4654('0x53a')?_0x39ebdb=$dataSkills[this[_0x4654('0xe5')][_0x4654('0x783')]()]:_0x39ebdb=$dataSkills[this[_0x4654('0x1e4')][_0x3ed28a][_0x4654('0x2ae')]];this[_0x4654('0x557')](this[_0x4654('0xe5')],_0x39ebdb,_0x330bcf['x'],_0x330bcf['y'],_0x330bcf[_0x4654('0x564')]);},Window_ActorCommand[_0x4654('0x8d')][_0x4654('0x557')]=function(_0x24828d,_0x1f18d4,_0x317afb,_0x730feb,_0x3f2cc8){if(!_0x1f18d4)return;Imported['VisuMZ_1_SkillsStatesCore']?Window_Command[_0x4654('0x8d')][_0x4654('0x557')][_0x4654('0x5a5')](this,_0x24828d,_0x1f18d4,_0x317afb,_0x730feb,_0x3f2cc8):Window_SkillList[_0x4654('0x8d')][_0x4654('0x557')][_0x4654('0x5a5')](this,_0x1f18d4,_0x317afb,_0x730feb,_0x3f2cc8);},Window_ActorCommand[_0x4654('0x8d')][_0x4654('0x3fe')]=function(){},Window_ActorCommand[_0x4654('0x8d')][_0x4654('0x787')]=function(){Window_Command[_0x4654('0x8d')][_0x4654('0x787')]['call'](this);const _0x5c0b26=this[_0x4654('0x329')]();if(_0x5c0b26===_0x4654('0x5eb')){if(_0x4654('0x289')!==_0x4654('0x286'))this['showHelpWindow']();else{function _0x108d0a(){_0x3e1376=_0xb3938f>=_0x5317b1?_0x45df04:_0x5d12ec;}}}},Window_ActorCommand['prototype']['battleLayoutStyle']=function(){if(this[_0x4654('0x5f1')])return this[_0x4654('0x5f1')];return this[_0x4654('0x5f1')]=SceneManager['_scene']['battleLayoutStyle'](),this[_0x4654('0x5f1')];},VisuMZ[_0x4654('0x1f')][_0x4654('0x502')]=Window_ActorCommand[_0x4654('0x8d')]['setup'],Window_ActorCommand[_0x4654('0x8d')][_0x4654('0x661')]=function(_0x45469f){const _0x4249ed=this[_0x4654('0x329')]();if(_0x45469f&&['xp',_0x4654('0x4ad')][_0x4654('0x386')](_0x4249ed)){if(_0x4654('0x21e')===_0x4654('0x4ce')){function _0xbf9f3(){const _0x166b28=this[_0x4654('0x2ee')]['bitmap'],_0x4c9fa7=this[_0x4654('0x564')]-0x8,_0x213092=this['height'],_0x305fb1=this[_0x4654('0x3c7')],_0x246ec2=_0x372fc8[_0x4654('0x620')](),_0xc366e6=_0x5edc24[_0x4654('0x3eb')]();this[_0x4654('0x2ee')]['x']=0x4,_0x166b28[_0x4654('0x5cf')](_0x4c9fa7,_0x213092),_0x166b28[_0x4654('0x395')](0x0,0x0,_0x4c9fa7,_0x305fb1,_0xc366e6,_0x246ec2,!![]),_0x166b28[_0x4654('0x65f')](0x0,_0x305fb1,_0x4c9fa7,_0x213092-_0x305fb1*0x2,_0x246ec2),_0x166b28[_0x4654('0x395')](0x0,_0x213092-_0x305fb1,_0x4c9fa7,_0x305fb1,_0x246ec2,_0xc366e6,!![]),this[_0x4654('0x2ee')][_0x4654('0x4fe')](0x0,0x0,_0x4c9fa7,_0x213092);}}else this[_0x4654('0x4b5')](_0x45469f);}else{if(_0x45469f&&[_0x4654('0x5eb')][_0x4654('0x386')](_0x4249ed)){if(_0x4654('0x729')!==_0x4654('0x1cb'))this[_0x4654('0x6a0')](_0x45469f),this[_0x4654('0x693')]();else{function _0x2a91ce(){if(this[_0x4654('0x234')]===_0x4654('0x370'))this['updateCustomActionSequence']();else this[_0x4654('0x234')]==='forceAction'?this[_0x4654('0x435')]():_0x4ce06a[_0x4654('0x1f')][_0x4654('0x109')]['call'](this,_0x21c03a);}}}}VisuMZ[_0x4654('0x1f')][_0x4654('0x502')][_0x4654('0x5a5')](this,_0x45469f),_0x45469f&&_0x45469f[_0x4654('0x770')]()[_0x4654('0x1f0')]();},Window_ActorCommand['prototype'][_0x4654('0x4b5')]=function(_0x5a6c2e){const _0x27a0ca=Math[_0x4654('0x31a')](Graphics[_0x4654('0x46b')]/0x3),_0x14ba5f=Math[_0x4654('0x31a')](Graphics[_0x4654('0x46b')]/$gameParty[_0x4654('0x515')]()[_0x4654('0x0')]),_0x101b69=Math['min'](_0x27a0ca,_0x14ba5f),_0x5ed8ca=this[_0x4654('0x430')](VisuMZ[_0x4654('0x1f')]['Settings'][_0x4654('0x44f')]['XPActorCommandLines']),_0x1a45e0=_0x14ba5f*_0x5a6c2e[_0x4654('0x4cb')]()+(_0x14ba5f-_0x101b69)/0x2,_0x2c42dd=SceneManager[_0x4654('0xda')][_0x4654('0x16d')]['y']-_0x5ed8ca;this[_0x4654('0x37a')](_0x1a45e0,_0x2c42dd,_0x101b69,_0x5ed8ca),this[_0x4654('0x11a')](),this[_0x4654('0x135')](0x1);},Window_ActorCommand[_0x4654('0x8d')][_0x4654('0x6a0')]=function(_0x6887c3){const _0x4927b3=SceneManager[_0x4654('0xda')][_0x4654('0x64e')]();this[_0x4654('0x37a')](_0x4927b3['x'],_0x4927b3['y'],_0x4927b3['width'],_0x4927b3[_0x4654('0x2e8')]),this[_0x4654('0x11a')](),this['setBackgroundType'](0x0);},Window_ActorCommand[_0x4654('0x8d')]['refreshDimmerBitmap']=function(){if(this[_0x4654('0x2ee')]){const _0x44eef3=this[_0x4654('0x2ee')][_0x4654('0x67c')],_0x472413=this['width']-0x8,_0x24713f=this[_0x4654('0x2e8')],_0x16b449=this[_0x4654('0x3c7')],_0x108a49=ColorManager[_0x4654('0x620')](),_0x3fc954=ColorManager[_0x4654('0x3eb')]();this[_0x4654('0x2ee')]['x']=0x4,_0x44eef3['resize'](_0x472413,_0x24713f),_0x44eef3['gradientFillRect'](0x0,0x0,_0x472413,_0x16b449,_0x3fc954,_0x108a49,!![]),_0x44eef3[_0x4654('0x65f')](0x0,_0x16b449,_0x472413,_0x24713f-_0x16b449*0x2,_0x108a49),_0x44eef3[_0x4654('0x395')](0x0,_0x24713f-_0x16b449,_0x472413,_0x16b449,_0x108a49,_0x3fc954,!![]),this[_0x4654('0x2ee')]['setFrame'](0x0,0x0,_0x472413,_0x24713f);}},Window_ActorCommand['prototype'][_0x4654('0x6eb')]=function(){if(!this[_0x4654('0xe5')])return;const _0x76a7f0=VisuMZ['BattleCore']['Settings'][_0x4654('0x3a')],_0x4228ed=this[_0x4654('0x299')]();switch(_0x4228ed){case _0x4654('0x36d'):this[_0x4654('0x204')]($dataSkills[this['_actor'][_0x4654('0x783')]()]);break;case _0x4654('0x53a'):this[_0x4654('0x204')]($dataSkills[this[_0x4654('0xe5')][_0x4654('0x556')]()]);break;case _0x4654('0xe7'):const _0x3e3698=_0x76a7f0[_0x4654('0x1e5')],_0x379416=_0x3e3698[_0x4654('0x31f')]($dataSystem[_0x4654('0x249')][this[_0x4654('0x5f5')]()]);this[_0x4654('0x736')][_0x4654('0x3d8')](_0x379416);break;case'singleSkill':this[_0x4654('0x204')]($dataSkills[this[_0x4654('0x5f5')]()]);break;case _0x4654('0x1f7'):this[_0x4654('0x736')][_0x4654('0x3d8')](_0x76a7f0[_0x4654('0x70d')]);break;case _0x4654('0x648'):this[_0x4654('0x736')][_0x4654('0x3d8')](_0x76a7f0[_0x4654('0x5ee')]);break;case'autoBattle':this['_helpWindow'][_0x4654('0x3d8')](_0x76a7f0[_0x4654('0x2ef')]);break;default:this['_helpWindow'][_0x4654('0x3d8')]('');break;}},VisuMZ[_0x4654('0x1f')][_0x4654('0x377')]=Window_BattleStatus[_0x4654('0x8d')][_0x4654('0x278')],Window_BattleStatus[_0x4654('0x8d')][_0x4654('0x278')]=function(_0x489631){VisuMZ[_0x4654('0x1f')][_0x4654('0x377')]['call'](this,_0x489631),this[_0x4654('0x16b')]();},Window_BattleStatus['prototype'][_0x4654('0x16b')]=function(){this[_0x4654('0x731')]=this[_0x4654('0x5c9')]();},Window_BattleStatus[_0x4654('0x8d')][_0x4654('0x329')]=function(){if(this[_0x4654('0x5f1')])return this['_battleLayoutStyle'];return this[_0x4654('0x5f1')]=SceneManager[_0x4654('0xda')][_0x4654('0x329')](),this[_0x4654('0x5f1')];},Window_BattleStatus[_0x4654('0x8d')][_0x4654('0x5c9')]=function(){const _0x2662c9=this[_0x4654('0x329')]();switch(_0x2662c9){case'list':case _0x4654('0x5eb'):return!![];break;case'default':case'xp':case _0x4654('0x4ad'):default:return![];break;}},Window_BattleStatus[_0x4654('0x8d')][_0x4654('0x658')]=function(){if(this['isFrameVisible']()){if(_0x4654('0x477')!==_0x4654('0x5f7'))return 0x0;else{function _0x46df8f(){delete _0x38b71d[_0x4654('0x3d')][_0x4654('0x27c')];}}}else return 0xa;},Window_BattleStatus[_0x4654('0x8d')][_0x4654('0x390')]=function(){const _0xe2870c=this[_0x4654('0x329')]();switch(_0xe2870c){case _0x4654('0x2bf'):return 0x1;break;case'xp':case _0x4654('0x4ad'):return $gameParty[_0x4654('0x515')]()[_0x4654('0x0')];break;case _0x4654('0x71f'):default:return $gameParty[_0x4654('0x77f')]();break;}},Window_BattleStatus[_0x4654('0x8d')][_0x4654('0xf2')]=function(){const _0x18d2e3=this[_0x4654('0x329')]();switch(_0x18d2e3){case _0x4654('0x2bf'):return Window_StatusBase[_0x4654('0x8d')][_0x4654('0xf2')][_0x4654('0x5a5')](this);break;case _0x4654('0x71f'):case'xp':case _0x4654('0x4ad'):default:return this['innerHeight'];break;}},Window_BattleStatus['prototype'][_0x4654('0x1c9')]=function(){const _0x39db46=this[_0x4654('0x329')]();switch(_0x39db46){case _0x4654('0x2bf'):return Window_StatusBase[_0x4654('0x8d')]['rowSpacing'][_0x4654('0x5a5')](this);break;case _0x4654('0x71f'):case'xp':case _0x4654('0x4ad'):default:return 0x0;break;}},Window_BattleStatus[_0x4654('0x8d')]['updatePadding']=function(){if(this[_0x4654('0x5c9')]()){if('MkXmU'!==_0x4654('0x651'))Window_StatusBase['prototype'][_0x4654('0x40a')][_0x4654('0x5a5')](this);else{function _0xed6d26(){if(_0x2d2d3c[_0x4654('0x1b1')]())return;_0x54e1fb[_0x4654('0x1f')][_0x4654('0x30')][_0x4654('0x5a5')](this);}}}else{if(_0x4654('0x32f')===_0x4654('0x32f'))this[_0x4654('0x3c7')]=0x8;else{function _0xf29e0b(){return _0x3f285f['status']&&_0x3ce2e6[_0x4654('0x4b8')][_0x4654('0x386')]('['+_0x5e7904+']');}}}},Window_BattleStatus[_0x4654('0x8d')]['update']=function(){Window_StatusBase['prototype'][_0x4654('0x53c')][_0x4654('0x5a5')](this),this['updateEffectContainers']();if(this[_0x4654('0x329')]()===_0x4654('0x5eb'))this[_0x4654('0x75b')]();},Window_BattleStatus[_0x4654('0x8d')]['show']=function(){Window_StatusBase[_0x4654('0x8d')][_0x4654('0x247')][_0x4654('0x5a5')](this);if(!$gameSystem[_0x4654('0x4f9')]())this[_0x4654('0x524')]();},Window_BattleStatus[_0x4654('0x8d')][_0x4654('0x3fe')]=function(){if(this[_0x4654('0x1de')]===Window_BattleStatus)return;Window_StatusBase[_0x4654('0x8d')]['hide'][_0x4654('0x5a5')](this);},Window_BattleStatus[_0x4654('0x8d')][_0x4654('0x681')]=function(_0x64a74d){const _0x228f7b=this[_0x4654('0x329')]();switch(_0x228f7b){case'xp':case'portrait':break;case _0x4654('0x71f'):case _0x4654('0x2bf'):default:return Window_StatusBase[_0x4654('0x8d')][_0x4654('0x681')][_0x4654('0x5a5')](this,_0x64a74d);break;}},VisuMZ[_0x4654('0x1f')][_0x4654('0x28d')]=Window_BattleStatus[_0x4654('0x8d')][_0x4654('0x73d')],Window_BattleStatus[_0x4654('0x8d')][_0x4654('0x73d')]=function(_0x4568b8){const _0x1823b9=this['battleLayoutStyle']();switch(_0x1823b9){case'list':this[_0x4654('0x4a0')](_0x4568b8);break;case'xp':this['drawItemImageXPStyle'](_0x4568b8);break;case _0x4654('0x4ad'):this[_0x4654('0x3cd')](_0x4568b8);break;case _0x4654('0x71f'):case _0x4654('0x5eb'):default:VisuMZ[_0x4654('0x1f')][_0x4654('0x28d')][_0x4654('0x5a5')](this,_0x4568b8);break;}},Window_BattleStatus[_0x4654('0x8d')][_0x4654('0x558')]=function(_0x298361){const _0x582696=this[_0x4654('0x329')]();if(!$gameSystem[_0x4654('0x4f9')]())this[_0x4654('0x28b')](_0x298361);switch(_0x582696){case _0x4654('0x2bf'):this[_0x4654('0x188')](_0x298361);break;case'xp':case _0x4654('0x4ad'):case _0x4654('0x71f'):default:this[_0x4654('0x5fc')](_0x298361);break;}},Window_BattleStatus[_0x4654('0x8d')][_0x4654('0xe')]=function(){const _0x296dfd=this['battleLayoutStyle']();if(['xp']['includes'](_0x296dfd)&&!$gameSystem[_0x4654('0x4f9')]()){this[_0x4654('0xd7')](0x0,0x0,0x0,0x0);return;}Window_StatusBase[_0x4654('0x8d')]['refreshCursor'][_0x4654('0x5a5')](this);},Window_BattleStatus[_0x4654('0x8d')]['centerFrontViewSprite']=function(_0x2266d3){const _0x4b3b0a=this[_0x4654('0x30c')](_0x2266d3)[_0x4654('0x770')]();if(!_0x4b3b0a)return;const _0x274a63=this['battleLayoutStyle'](),_0x194545=this[_0x4654('0x20b')](_0x2266d3);let _0x45ae95=Math[_0x4654('0x31a')](_0x194545['x']+_0x194545['width']/0x2);[_0x4654('0x2bf')][_0x4654('0x386')](_0x274a63)&&(_0x45ae95=_0x194545[_0x4654('0x564')]/$gameParty['battleMembers']()['length'],_0x45ae95*=_0x2266d3,_0x45ae95+=_0x194545[_0x4654('0x564')]/$gameParty['battleMembers']()[_0x4654('0x0')]/0x2);let _0xeff5c2=Math[_0x4654('0x31a')](this[_0x4654('0x59')](_0x2266d3,_0x4b3b0a,_0x194545));_0x4b3b0a[_0x4654('0x37e')](_0x45ae95,_0xeff5c2),this[_0x4654('0x469')](_0x4b3b0a,0x1),_0x4b3b0a['show']();},Window_BattleStatus[_0x4654('0x8d')][_0x4654('0x59')]=function(_0xbe10e9,_0x3c1dda,_0x4d8e10){const _0x501a3d=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x44f')],_0x40cad8=this[_0x4654('0x329')]();if(_0x40cad8==='xp'){if('Mevty'!=='Mevty'){function _0x232572(){const _0x380566=_0x370d3d(_0x4d177a['$1']);return[_0x8e6556[_0x4654('0x552')]()[_0x380566]];}}else{const _0x41fc76=_0x501a3d[_0x4654('0x566')];switch(_0x41fc76[_0x4654('0x134')]()[_0x4654('0x512')]()){case'bottom':return _0x4d8e10[_0x4654('0x2e8')]-_0x3c1dda[_0x4654('0x554')]['height']/0x4;break;case'center':const _0x5c35c1=_0x501a3d[_0x4654('0x4ba')];return(_0x4d8e10['height']+(_0x3c1dda[_0x4654('0x2e8')]||_0x5c35c1))/0x2;break;case _0x4654('0x526'):return 0x0;case'name':default:return this[_0x4654('0x34a')](_0x4d8e10);break;}}}else{if(_0x40cad8===_0x4654('0x4ad')){}}return _0x3c1dda[_0x4654('0x2e8')];},Window_BattleStatus[_0x4654('0x8d')][_0x4654('0x4a0')]=function(_0x3bdd54){if(!VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')]['BattleLayout'][_0x4654('0x13a')])return;const _0xcd5f9c=this[_0x4654('0x30c')](_0x3bdd54),_0x51efa5=this[_0x4654('0x20b')](_0x3bdd54);_0x51efa5[_0x4654('0x564')]=ImageManager[_0x4654('0x64f')],_0x51efa5[_0x4654('0x2e8')]-=0x2,this[_0x4654('0x284')](_0xcd5f9c,_0x51efa5['x']+0x1,_0x51efa5['y']+0x1,_0x51efa5[_0x4654('0x564')],_0x51efa5['height']);},Window_BattleStatus[_0x4654('0x8d')]['drawItemStatusListStyle']=function(_0x21cea8){const _0x5402c6=$dataSystem[_0x4654('0x2cc')]?0x4:0x3,_0x588b83=_0x5402c6*0x80+(_0x5402c6-0x1)*0x8+0x4,_0x4316e9=this[_0x4654('0x30c')](_0x21cea8),_0x3b7250=this[_0x4654('0x20b')](_0x21cea8);let _0x15ea96=_0x3b7250['x']+this[_0x4654('0x3c7')];VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x44f')]['ShowFacesListStyle']?_0x15ea96=_0x3b7250['x']+ImageManager[_0x4654('0x64f')]+0x8:_0x15ea96+=ImageManager[_0x4654('0x402')];const _0x2b41a8=Math[_0x4654('0x31a')](Math[_0x4654('0x22b')](_0x3b7250['x']+_0x3b7250[_0x4654('0x564')]-_0x588b83,_0x15ea96)),_0x2bd847=Math[_0x4654('0x31a')](_0x3b7250['y']+(_0x3b7250['height']-Sprite_Name[_0x4654('0x8d')]['bitmapHeight']())/0x2),_0x39d57c=Math[_0x4654('0x31a')](_0x2b41a8-ImageManager['iconWidth']/0x2-0x4),_0x3053c6=Math['round'](_0x3b7250['y']+(_0x3b7250['height']-ImageManager[_0x4654('0x145')])/0x2+ImageManager['iconHeight']/0x2);let _0x5edd5e=_0x2b41a8+0x88;const _0xd9a47f=_0x2bd847;this[_0x4654('0x40e')](_0x4316e9,_0x2b41a8-0x4,_0x2bd847),this[_0x4654('0x363')](_0x4316e9,_0x2b41a8,_0x2bd847),this[_0x4654('0x5c6')](_0x4316e9,_0x39d57c,_0x3053c6),this[_0x4654('0x381')](_0x4316e9,'hp',_0x5edd5e+0x88*0x0,_0xd9a47f),this[_0x4654('0x381')](_0x4316e9,'mp',_0x5edd5e+0x88*0x1,_0xd9a47f);if($dataSystem[_0x4654('0x2cc')]){if(_0x4654('0x447')!==_0x4654('0x447')){function _0x15d92b(){return this[_0x4654('0x1a9')]();}}else this[_0x4654('0x381')](_0x4316e9,'tp',_0x5edd5e+0x88*0x2,_0xd9a47f);}},Window_BattleStatus[_0x4654('0x8d')]['drawItemImageXPStyle']=function(_0x316a0d){if(!$gameSystem[_0x4654('0x4f9')]())return;VisuMZ[_0x4654('0x1f')][_0x4654('0x28d')][_0x4654('0x5a5')](this,_0x316a0d);},Window_BattleStatus[_0x4654('0x8d')][_0x4654('0x5fc')]=function(_0x5156fb){const _0x418b7f=this[_0x4654('0x30c')](_0x5156fb),_0x156972=this['itemRect'](_0x5156fb),_0x534252=Math[_0x4654('0x31a')](_0x156972['x']+(_0x156972[_0x4654('0x564')]-0x80)/0x2),_0x33d762=this[_0x4654('0x34a')](_0x156972);let _0x3db279=_0x534252-ImageManager[_0x4654('0x402')]/0x2-0x4,_0x49ec06=_0x33d762+ImageManager['iconHeight']/0x2;if(_0x3db279-ImageManager[_0x4654('0x402')]/0x2<_0x156972['x']){if('nlzxI'===_0x4654('0x1fa')){function _0x726130(){if(_0x6e998d===this[_0x4654('0x8')]()&&this[_0x4654('0x35')]())return!![];return _0x5f2a8a[_0x4654('0x1f')][_0x4654('0x798')][_0x4654('0x5a5')](this,_0xab4a77);}}else _0x3db279=_0x534252+ImageManager[_0x4654('0x402')]/0x2-0x4,_0x49ec06=_0x33d762-ImageManager[_0x4654('0x145')]/0x2;}const _0x4b62da=_0x534252,_0x3e17e9=this[_0x4654('0x6e0')](_0x156972);this[_0x4654('0x40e')](_0x418b7f,_0x534252,_0x33d762),this[_0x4654('0x363')](_0x418b7f,_0x534252,_0x33d762),this[_0x4654('0x5c6')](_0x418b7f,_0x3db279,_0x49ec06),this['placeBasicGauges'](_0x418b7f,_0x4b62da,_0x3e17e9);},Window_BattleStatus[_0x4654('0x8d')]['showPortraits']=function(_0x23878a){if(!VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x44f')][_0x4654('0x796')])return![];if(_0x23878a[_0x4654('0xd0')]())return!![];return Imported[_0x4654('0x4d2')]&&_0x23878a[_0x4654('0xe4')]();},Window_BattleStatus['prototype'][_0x4654('0x3cd')]=function(_0x1c3e2f){const _0x101bd8=this['actor'](_0x1c3e2f);if(this[_0x4654('0x6e5')](_0x101bd8)){const _0x4aea26=_0x4654('0x148')[_0x4654('0x31f')](_0x101bd8[_0x4654('0x772')]()),_0x582d02=this[_0x4654('0x2d2')](_0x4aea26,Sprite),_0x312169=_0x101bd8[_0x4654('0x4ca')]();if(_0x312169!==''){if(_0x4654('0xac')!==_0x4654('0xac')){function _0x574ad1(){const _0x2016b8=_0x571983[_0x4654('0x399')](_0x2dae87[_0x4654('0x29d')]()['trim']());_0x2016b8>=0x0&&_0x2016b8<=0x7&&_0x3a5505[_0x4654('0x491')](_0x2016b8,_0x2b8433);}}else _0x582d02['bitmap']=ImageManager[_0x4654('0x5c')](_0x312169);}else _0x582d02[_0x4654('0x67c')]=ImageManager[_0x4654('0x37c')];const _0x228233=this[_0x4654('0x20b')](_0x1c3e2f);_0x582d02[_0x4654('0x34d')]['x']=0.5,_0x582d02[_0x4654('0x34d')]['y']=0x1;const _0x1697c2=Math[_0x4654('0x31a')](_0x228233['x']+_0x228233[_0x4654('0x564')]/0x2)+this[_0x4654('0x3c7')],_0x307529=Math[_0x4654('0x31a')](this[_0x4654('0x2e8')]);_0x582d02[_0x4654('0x37a')](_0x1697c2,_0x307529);const _0x27b06f=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x44f')][_0x4654('0x3c4')];_0x582d02[_0x4654('0x498')]['x']=_0x27b06f,_0x582d02[_0x4654('0x498')]['y']=_0x27b06f,_0x582d02['show']();}else{const _0x25af0d=this[_0x4654('0x1c4')](_0x1c3e2f);this[_0x4654('0x284')](_0x101bd8,_0x25af0d['x'],_0x25af0d['y'],_0x25af0d[_0x4654('0x564')],_0x25af0d[_0x4654('0x2e8')]);}},Window_BattleStatus[_0x4654('0x8d')][_0x4654('0x2d2')]=function(_0x2c4646,_0x217a52){const _0x28da2b=this[_0x4654('0x701')];if(_0x28da2b[_0x2c4646])return _0x28da2b[_0x2c4646];else{if(_0x4654('0x31')!==_0x4654('0x31')){function _0x476a2d(){_0x50b8ee[_0x4654('0x8d')]['updateBitmap'][_0x4654('0x5a5')](this);const _0x3d09a3=this[_0x4654('0xe5')]['svBattlerName']();this[_0x4654('0x2ed')]!==_0x3d09a3&&(this[_0x4654('0x2ed')]=_0x3d09a3,this[_0x4654('0x573')][_0x4654('0x67c')]=_0x1ed2ae[_0x4654('0x352')](_0x3d09a3));}}else{const _0x48ac7e=new _0x217a52();return _0x28da2b[_0x2c4646]=_0x48ac7e,this[_0x4654('0x212')](_0x48ac7e),this[_0x4654('0x212')](this['_cursorArea']),_0x48ac7e;}}},Window_BattleStatus[_0x4654('0x8d')][_0x4654('0x600')]=function(){this['_createCursorArea'](),this[_0x4654('0x2d9')](),Window_StatusBase[_0x4654('0x8d')]['_createClientArea'][_0x4654('0x5a5')](this),this[_0x4654('0x635')]();},Window_BattleStatus['prototype'][_0x4654('0xd4')]=function(){this[_0x4654('0x3f2')]=new Sprite(),this['_cursorArea'][_0x4654('0x694')]=[new PIXI['filters'][(_0x4654('0x715'))]()],this[_0x4654('0x3f2')][_0x4654('0x66e')]=new Rectangle(),this[_0x4654('0x3f2')][_0x4654('0x37a')](this[_0x4654('0x537')],this[_0x4654('0x537')]),this[_0x4654('0x43f')](this[_0x4654('0x3f2')]);},Window_BattleStatus[_0x4654('0x8d')][_0x4654('0x2d9')]=function(){this[_0x4654('0x313')]=new Sprite(),this['addChild'](this[_0x4654('0x313')]);},Window_BattleStatus[_0x4654('0x8d')][_0x4654('0x635')]=function(){this[_0x4654('0x545')]=new Sprite(),this['addChild'](this[_0x4654('0x545')]);},Window_BattleStatus[_0x4654('0x8d')][_0x4654('0x5cb')]=function(){this['_cursorSprite']=new Sprite();for(let _0xaa81c2=0x0;_0xaa81c2<0x9;_0xaa81c2++){if(_0x4654('0x262')!==_0x4654('0x262')){function _0x487d5a(){_0x15a174[_0x4654('0x6a6')]=[];}}else this['_cursorSprite'][_0x4654('0x43f')](new Sprite());}this[_0x4654('0x3f2')][_0x4654('0x43f')](this[_0x4654('0x5e')]);},Window_BattleStatus[_0x4654('0x8d')]['_updateClientArea']=function(){Window_StatusBase[_0x4654('0x8d')][_0x4654('0x793')][_0x4654('0x5a5')](this),this[_0x4654('0x3be')]();},Window_BattleStatus[_0x4654('0x8d')][_0x4654('0x3be')]=function(){const _0x3cd59b=this['_padding'];this[_0x4654('0x3f2')]['move'](_0x3cd59b,_0x3cd59b),this[_0x4654('0x3f2')]['x']=_0x3cd59b-this['origin']['x'],this['_cursorArea']['y']=_0x3cd59b-this[_0x4654('0x17c')]['y'];if(this[_0x4654('0x72f')]>0x0&&this[_0x4654('0x3ed')]>0x0)this[_0x4654('0x3f2')][_0x4654('0x5f2')]=this[_0x4654('0x5a0')]();else{if(_0x4654('0xe0')!==_0x4654('0xe0')){function _0x53730c(){return this[_0x4654('0x2fb')]()?this[_0x4654('0x380')][_0x4654('0x516')]():_0x4b67ee[_0x4654('0x8d')][_0x4654('0x516')][_0x4654('0x5a5')](this);}}else this[_0x4654('0x3f2')][_0x4654('0x5f2')]=![];}},Window_BattleStatus[_0x4654('0x8d')][_0x4654('0x3c0')]=function(){Window_StatusBase[_0x4654('0x8d')][_0x4654('0x3c0')][_0x4654('0x5a5')](this),this[_0x4654('0x509')]();},Window_BattleStatus[_0x4654('0x8d')][_0x4654('0x509')]=function(){const _0x573215=this[_0x4654('0x3f2')][_0x4654('0x6cf')]['apply'](new Point(0x0,0x0)),_0x5d5358=this['_cursorArea'][_0x4654('0x66e')];_0x5d5358['x']=_0x573215['x']+this[_0x4654('0x17c')]['x'],_0x5d5358['y']=_0x573215['y']+this[_0x4654('0x17c')]['y'],_0x5d5358['width']=this[_0x4654('0x72f')],_0x5d5358[_0x4654('0x2e8')]=this[_0x4654('0x3ed')];},Window_BattleStatus[_0x4654('0x8d')][_0x4654('0x2f0')]=function(_0x287262){if(this[_0x4654('0x329')]()!==_0x4654('0x4ad'))return;this['drawItemImagePortraitStyle'](_0x287262[_0x4654('0x4cb')]());},Window_BattleStatus[_0x4654('0x8d')][_0x4654('0x2ab')]=function(_0x2bc9e5,_0x3fd9fa){if(!this[_0x4654('0x545')])return;if(!_0x2bc9e5)return;if(!_0x3fd9fa)return;const _0x4e71d1=this[_0x4654('0x20b')](_0x3fd9fa['index']());_0x4e71d1['x']+=_0x4e71d1['width']/0x2+this[_0x4654('0x3c7')],_0x2bc9e5['x']=_0x4e71d1['x'],_0x2bc9e5['y']=_0x4e71d1['y'],this[_0x4654('0x545')][_0x4654('0x43f')](_0x2bc9e5);},Window_BattleStatus[_0x4654('0x8d')]['removeDamageSprite']=function(_0xe9e4e2){if(!this[_0x4654('0x545')])return;if(!_0xe9e4e2)return;this[_0x4654('0x545')]['removeChild'](_0xe9e4e2);},Window_BattleStatus[_0x4654('0x8d')][_0x4654('0x75b')]=function(){if(!this[_0x4654('0x55')]())return;if(!this[_0x4654('0x3d2')])this[_0x4654('0xba')]();this[_0x4654('0x24e')](),this[_0x4654('0x504')]();},Window_BattleStatus['prototype']['isBorderStylePortraitShown']=function(){if(this[_0x4654('0x1de')]!==Window_BattleStatus)return![];if(!SceneManager[_0x4654('0x443')]())return![];return VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x44f')][_0x4654('0x483')];},Window_BattleStatus[_0x4654('0x8d')][_0x4654('0xba')]=function(){this[_0x4654('0x3d2')]=new Sprite();const _0xb748ef=SceneManager['_scene'],_0x4b2661=_0xb748ef['children'][_0x4654('0x399')](_0xb748ef[_0x4654('0x16')]);_0xb748ef[_0x4654('0x469')](this[_0x4654('0x3d2')],_0x4b2661),this[_0x4654('0x3d2')]['anchor']['x']=0.5,this[_0x4654('0x3d2')][_0x4654('0x34d')]['y']=0x1;const _0x12dfe4=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x44f')]['PortraitScaleBorderStyle'];this[_0x4654('0x3d2')][_0x4654('0x498')]['x']=_0x12dfe4,this[_0x4654('0x3d2')]['scale']['y']=_0x12dfe4,this[_0x4654('0x3d2')]['y']=this['y']+this[_0x4654('0x2e8')],this[_0x4654('0x59f')]=0x0;},Window_BattleStatus[_0x4654('0x8d')][_0x4654('0x24e')]=function(){this[_0x4654('0x3d2')][_0x4654('0x5f2')]=BattleManager[_0x4654('0x4f7')]();const _0x299dfa=BattleManager[_0x4654('0x30c')]();if(_0x299dfa===this[_0x4654('0x3d2')][_0x4654('0x30c')])return;this[_0x4654('0x3d2')][_0x4654('0x30c')]=_0x299dfa||this[_0x4654('0x3d2')][_0x4654('0x30c')];if(!_0x299dfa){if(_0x4654('0x5c5')==='OBUZN'){function _0x4cf2db(){this[_0x4654('0x74b')](_0x130e30)[_0x4654('0x2a0')](/\\I\[(\d+)\]/i);const _0x395f98=_0x5ac7b0(_0x154976['$1'])||0x0,_0x348b26=this['itemLineRect'](_0x5e09e6),_0x6e7cca=_0x348b26['x']+_0x582779[_0x4654('0x6f0')]((_0x348b26[_0x4654('0x564')]-_0x4f8076['iconWidth'])/0x2),_0x2588cc=_0x348b26['y']+(_0x348b26[_0x4654('0x2e8')]-_0x536b47[_0x4654('0x145')])/0x2;this[_0x4654('0x64d')](_0x395f98,_0x6e7cca,_0x2588cc);}}else return;}else{if(_0x299dfa['getBattlePortraitFilename']()===''){if(_0x4654('0x167')!==_0x4654('0x25e')){this[_0x4654('0x3d2')][_0x4654('0x67c')]=ImageManager[_0x4654('0x37c')];return;}else{function _0x1b91ff(){return _0x5b354c[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x3a')][_0x4654('0x601')];}}}else{if(_0x4654('0x1a')==='jSzDD'){const _0x3d3fe2=ImageManager[_0x4654('0x5c')](_0x299dfa['getBattlePortraitFilename']());_0x3d3fe2[_0x4654('0x5b')](this[_0x4654('0x718')][_0x4654('0x4f')](this,_0x3d3fe2));}else{function _0x3b3820(){this[_0x4654('0x51f')](_0x4654('0x23a'));}}}}},Window_BattleStatus[_0x4654('0x8d')][_0x4654('0x718')]=function(_0x5bf133){this['_borderPortraitDuration']=0x14,this[_0x4654('0x3d2')][_0x4654('0x67c')]=_0x5bf133;if(SceneManager[_0x4654('0xda')][_0x4654('0x5dd')]()){if(_0x4654('0x168')==='mHjbp'){function _0x52d2fe(){if(_0x19e8ea[_0x4654('0x443')]()&&_0xc175b9['turnCount']()<=0x0)return;this[_0x4654('0x2d6')](_0x4654('0x1ef')),_0x54ffc5[_0x4654('0x1f')][_0x4654('0x23f')]['call'](this),this[_0x4654('0x296')](),this[_0x4654('0x2d6')]('PostRegenerateJS');}}else this['_borderPortraitSprite']['x']=0x0,this['_borderPortraitTargetX']=Math[_0x4654('0x603')](_0x5bf133[_0x4654('0x564')]/0x2);}else this[_0x4654('0x3d2')]['x']=this[_0x4654('0x564')],this[_0x4654('0x657')]=this[_0x4654('0x564')]*0x3/0x4;this[_0x4654('0x3d2')][_0x4654('0x3a0')]=0x0;},Window_BattleStatus[_0x4654('0x8d')]['updateBorderSprite']=function(){if(this[_0x4654('0x59f')]>0x0){const _0x2c1abf=this[_0x4654('0x59f')],_0x416de5=this['_borderPortraitSprite'];_0x416de5['x']=(_0x416de5['x']*(_0x2c1abf-0x1)+this[_0x4654('0x657')])/_0x2c1abf,_0x416de5[_0x4654('0x3a0')]=(_0x416de5[_0x4654('0x3a0')]*(_0x2c1abf-0x1)+0xff)/_0x2c1abf,this[_0x4654('0x59f')]--;}},Window_BattleStatus[_0x4654('0x8d')][_0x4654('0x5c1')]=function(){return;this[_0x4654('0x313')]&&(this[_0x4654('0x313')]['x']=this['x'],this[_0x4654('0x313')]['y']=this['y']),this['_damageContainer']&&(this['_damageContainer']['x']=this['x'],this['_damageContainer']['y']=this['y']);},Window_BattleEnemy[_0x4654('0x8d')][_0x4654('0x390')]=function(){return this[_0x4654('0x25d')]();},VisuMZ[_0x4654('0x1f')][_0x4654('0x159')]=Window_BattleEnemy[_0x4654('0x8d')]['show'],Window_BattleEnemy['prototype'][_0x4654('0x247')]=function(){VisuMZ[_0x4654('0x1f')]['Window_BattleEnemy_show'][_0x4654('0x5a5')](this),this['y']=Graphics[_0x4654('0x2e8')]*0xa;},Window_BattleEnemy[_0x4654('0x8d')][_0x4654('0x49')]=function(){return $gameTroop[_0x4654('0x5e1')]()[_0x4654('0x2db')](0x0);},Window_BattleEnemy[_0x4654('0x8d')]['refresh']=function(){this[_0x4654('0x310')]=this['validTargets'](),this[_0x4654('0xc0')](),Window_Selectable[_0x4654('0x8d')][_0x4654('0x524')]['call'](this);},Window_BattleEnemy[_0x4654('0x8d')]['sortEnemies']=function(){this['_enemies']['sort']((_0x206d8f,_0x3891a7)=>{if(_0x4654('0x669')!==_0x4654('0x382')){if(_0x206d8f['battler']()[_0x4654('0x2df')]===_0x3891a7['battler']()['_baseX']){if(_0x4654('0x459')!=='CFOYi'){function _0x2c6dc2(){return!![];}}else return _0x206d8f[_0x4654('0x770')]()[_0x4654('0x2a8')]-_0x3891a7[_0x4654('0x770')]()[_0x4654('0x2a8')];}else return _0x206d8f[_0x4654('0x770')]()[_0x4654('0x2df')]-_0x3891a7[_0x4654('0x770')]()['_baseX'];}else{function _0x1b1b67(){return _0x4654('0x347');}}}),SceneManager[_0x4654('0x8e')]()&&this[_0x4654('0x310')][_0x4654('0x51e')]();},Window_BattleEnemy[_0x4654('0x8d')]['autoSelect']=function(){const _0x37a9c9=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x51a')];let _0x43d024=![];$gameSystem[_0x4654('0x4f9')]()?_0x43d024=_0x37a9c9[_0x4654('0x3b')]:_0x43d024=_0x37a9c9['FrontViewSelect'],this[_0x4654('0x326')](_0x43d024?this[_0x4654('0x25d')]()-0x1:0x0);};function Window_AutoBattleCancel(){this[_0x4654('0x278')](...arguments);}Window_AutoBattleCancel[_0x4654('0x8d')]=Object[_0x4654('0x5c7')](Window_Base[_0x4654('0x8d')]),Window_AutoBattleCancel[_0x4654('0x8d')][_0x4654('0x1de')]=Window_AutoBattleCancel,Window_AutoBattleCancel[_0x4654('0x8d')][_0x4654('0x278')]=function(_0x11b273){Window_Base['prototype'][_0x4654('0x278')]['call'](this,_0x11b273),this[_0x4654('0x135')](this[_0x4654('0x61b')]()),this['refresh']();},Window_AutoBattleCancel[_0x4654('0x8d')]['bgType']=function(){return VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x505')][_0x4654('0x3c8')];},Window_AutoBattleCancel[_0x4654('0x8d')][_0x4654('0x524')]=function(){this[_0x4654('0xc2')][_0x4654('0x2a9')]();const _0x3b05de=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')]['AutoBattle'][_0x4654('0x35d')],_0x4ecdbe=_0x3b05de[_0x4654('0x31f')](this[_0x4654('0xcd')](),this['cancelButtonText']()),_0x3cb2be=this['textSizeEx'](_0x4ecdbe)[_0x4654('0x564')],_0xa9d584=Math[_0x4654('0x6f0')]((this['innerWidth']-_0x3cb2be)/0x2);this[_0x4654('0x16f')](_0x4ecdbe,_0xa9d584,0x0,_0x3cb2be);},Window_AutoBattleCancel[_0x4654('0x8d')][_0x4654('0xcd')]=function(){if(Imported[_0x4654('0x631')]){if(_0x4654('0x15f')!==_0x4654('0x4e0'))return TextManager[_0x4654('0xf')]('ok');else{function _0x41757b(){return this[_0x4654('0x1f7')]()[_0x4654('0x762')]['match'](/<JS TARGETS>/i);}}}else return VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x505')][_0x4654('0xe9')];},Window_AutoBattleCancel['prototype'][_0x4654('0x14a')]=function(){if(Imported[_0x4654('0x631')]){if(_0x4654('0x521')!==_0x4654('0x521')){function _0x31ae90(){const _0x4b664e=this[_0x4654('0x4da')](),_0x1c6b20=_0x82c4cf[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0xe2')][_0x4654('0xb1')],_0x3d842f=_0x4b664e===_0x4654('0x1c2')?_0x19d024['autoBattle']:'\x5cI[%1]%2'[_0x4654('0x31f')](_0x1c6b20,_0x4834b3[_0x4654('0x305')]),_0x3d7e5e=this[_0x4654('0x1d3')]();this[_0x4654('0x713')](_0x3d842f,_0x4654('0x305'),_0x3d7e5e);}}else return TextManager[_0x4654('0xf')](_0x4654('0x27c'));}else{if(_0x4654('0x77')===_0x4654('0x191')){function _0x59d97d(){if(this[_0x4654('0x226')]===_0x323c1a)return;this[_0x4654('0x226')]=_0x17f9de,this[_0x4654('0x439')]=_0x65f922,this['_opacityWholeDuration']=_0x14b767,this[_0x4654('0x417')]=_0xfaee0||_0x4654('0x28');if(_0x1168a4<=0x0)this[_0x4654('0x3a0')]=_0x184a36;}}else return VisuMZ['BattleCore'][_0x4654('0x1f3')][_0x4654('0x505')][_0x4654('0x425')];}},Window_AutoBattleCancel[_0x4654('0x8d')][_0x4654('0x53c')]=function(){Window_Base[_0x4654('0x8d')][_0x4654('0x53c')]['call'](this),this[_0x4654('0xc5')](),this['updateCancel']();},Window_AutoBattleCancel[_0x4654('0x8d')][_0x4654('0xc5')]=function(){this['visible']=BattleManager['_autoBattle'];},Window_AutoBattleCancel[_0x4654('0x8d')][_0x4654('0x19b')]=function(){if(!BattleManager[_0x4654('0x785')])return;(Input[_0x4654('0x312')]('ok')||Input[_0x4654('0x312')](_0x4654('0x27c'))||TouchInput[_0x4654('0x4bb')]()||TouchInput[_0x4654('0x398')]())&&(SoundManager[_0x4654('0x1b5')](),BattleManager[_0x4654('0x785')]=![],Input[_0x4654('0x2a9')](),TouchInput[_0x4654('0x2a9')]());};function Window_EnemyName(){this[_0x4654('0x278')](...arguments);}Window_EnemyName['prototype']=Object[_0x4654('0x5c7')](Window_Base[_0x4654('0x8d')]),Window_EnemyName[_0x4654('0x8d')]['constructor']=Window_EnemyName,Window_EnemyName[_0x4654('0x8d')][_0x4654('0x278')]=function(_0xa224c7){this[_0x4654('0x668')]=_0xa224c7,this['_text']='';const _0x32eed3=new Rectangle(0x0,0x0,Graphics[_0x4654('0x46b')],this['lineHeight']()*0x4);Window_Base[_0x4654('0x8d')][_0x4654('0x278')][_0x4654('0x5a5')](this,_0x32eed3),this[_0x4654('0x135')](0x2),this[_0x4654('0x6b9')]=0x0;},Window_EnemyName[_0x4654('0x8d')][_0x4654('0x40a')]=function(){this[_0x4654('0x3c7')]=0x0;},Window_EnemyName[_0x4654('0x8d')]['enemy']=function(){return $gameTroop[_0x4654('0x552')]()[this[_0x4654('0x668')]];},Window_EnemyName[_0x4654('0x8d')]['update']=function(){Window_Base[_0x4654('0x8d')][_0x4654('0x53c')][_0x4654('0x5a5')](this);if(this[_0x4654('0x360')]()&&this[_0x4654('0x360')]()[_0x4654('0x18f')]()!==this[_0x4654('0x47b')])this[_0x4654('0x524')]();this[_0x4654('0x5ea')](),this[_0x4654('0x336')]();},Window_EnemyName[_0x4654('0x8d')][_0x4654('0x5ea')]=function(){if(!this[_0x4654('0x360')]()){if(this[_0x4654('0x6b9')]>0x0)this['contentsOpacity']-=0x10;}else{if(this[_0x4654('0x360')]()['isDead']()){if(this[_0x4654('0x6b9')]>0x0)this[_0x4654('0x6b9')]-=0x10;}else{if(SceneManager[_0x4654('0xda')][_0x4654('0x77e')]&&SceneManager[_0x4654('0xda')]['_enemyWindow'][_0x4654('0x4c1')]&&SceneManager[_0x4654('0xda')][_0x4654('0x77e')][_0x4654('0x310')]['includes'](this['enemy']())){if(this[_0x4654('0x6b9')]<0xff)this['contentsOpacity']+=0x10;}else this[_0x4654('0x6b9')]>0x0&&(this[_0x4654('0x6b9')]-=0x10);}}},Window_EnemyName[_0x4654('0x8d')][_0x4654('0x336')]=function(){if(!this[_0x4654('0x360')]())return;if(SceneManager[_0x4654('0x8e')]())this['x']=Graphics[_0x4654('0x46b')]-this[_0x4654('0x360')]()[_0x4654('0x770')]()[_0x4654('0x2df')];else{if(_0x4654('0x13c')===_0x4654('0x13c'))this['x']=this[_0x4654('0x360')]()[_0x4654('0x770')]()[_0x4654('0x2df')];else{function _0x5a123e(){if(!_0x5d8b0c[_0x4654('0x4f9')]())return;_0x1a42b0[_0x4654('0x1f')]['Window_BattleStatus_drawItemImage'][_0x4654('0x5a5')](this,_0x1cb742);}}}this['x']-=Math[_0x4654('0x31a')](this[_0x4654('0x564')]/0x2),this['y']=this[_0x4654('0x360')]()[_0x4654('0x770')]()['_baseY']-Math[_0x4654('0x31a')](this[_0x4654('0x182')]()*1.5);},Window_EnemyName[_0x4654('0x8d')][_0x4654('0x318')]=function(){Window_Base[_0x4654('0x8d')]['resetFontSettings'][_0x4654('0x5a5')](this),this['contents']['fontSize']=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')]['Enemy'][_0x4654('0x6c3')];},Window_EnemyName[_0x4654('0x8d')][_0x4654('0x524')]=function(){this[_0x4654('0xc2')][_0x4654('0x2a9')]();if(!this[_0x4654('0x360')]())return;this[_0x4654('0x47b')]=this[_0x4654('0x360')]()[_0x4654('0x18f')]();const _0x3a3e3a=this[_0x4654('0x617')](this[_0x4654('0x47b')])[_0x4654('0x564')],_0x3ccb5d=Math['round']((this['innerWidth']-_0x3a3e3a)/0x2);this[_0x4654('0x16f')](this[_0x4654('0x47b')],_0x3ccb5d,0x0,_0x3a3e3a+0x8);},Window_BattleLog[_0x4654('0x8d')][_0x4654('0x789')]=function(){return VisuMZ[_0x4654('0x1f')]['Settings']['BattleLog']['MaxLines'];},Window_BattleLog[_0x4654('0x8d')][_0x4654('0x59a')]=function(){return VisuMZ['BattleCore'][_0x4654('0x1f3')][_0x4654('0x5be')][_0x4654('0x2ca')];},Window_BattleLog[_0x4654('0x8d')]['backColor']=function(){return VisuMZ['BattleCore'][_0x4654('0x1f3')][_0x4654('0x5be')][_0x4654('0x541')];},Window_BattleLog[_0x4654('0x8d')][_0x4654('0xed')]=function(){return![];},Window_BattleLog[_0x4654('0x8d')][_0x4654('0x42a')]=function(_0x322cf6,_0x314ea6){this[_0x4654('0x678')](_0x4654('0x28c')),BattleManager[_0x4654('0x56f')](_0x322cf6,_0x314ea6),this[_0x4654('0x223')]();},Window_BattleLog[_0x4654('0x8d')]['actionSplicePoint']=function(){this[_0x4654('0x223')]();},Window_BattleLog[_0x4654('0x8d')][_0x4654('0x128')]=function(_0x5efb64){const _0x565a0c=Array[_0x4654('0x8d')][_0x4654('0x2db')][_0x4654('0x5a5')](arguments,0x1),_0x39dd40={'name':_0x5efb64,'params':_0x565a0c},_0x461ceb=this[_0x4654('0x636')][_0x4654('0x538')](_0x17921c=>_0x17921c[_0x4654('0x18f')])['indexOf'](_0x4654('0x28c'));if(_0x461ceb>=0x0){if(_0x4654('0x572')===_0x4654('0x5e2')){function _0x464365(){this[_0x4654('0x74d')]();}}else this[_0x4654('0x636')][_0x4654('0x156')](_0x461ceb,0x0,_0x39dd40);}else{if(_0x4654('0x5f9')!=='jdnXo'){function _0x23c70e(){this[_0x4654('0x741')](_0x4654('0x53a'));}}else this[_0x4654('0x636')][_0x4654('0x128')](_0x39dd40);}},Window_BattleLog['prototype'][_0x4654('0x678')]=function(_0x2eba8b){const _0xa6b3ac=Array[_0x4654('0x8d')][_0x4654('0x2db')]['call'](arguments,0x1);this['_methods'][_0x4654('0x678')]({'name':_0x2eba8b,'params':_0xa6b3ac});},Window_BattleLog[_0x4654('0x8d')]['logActionList']=function(){if(!$gameTemp[_0x4654('0x4cc')]())return;console[_0x4654('0x640')](this[_0x4654('0x636')]['map'](_0x497229=>_0x497229[_0x4654('0x18f')])[_0x4654('0x26')]('\x0a'));},VisuMZ[_0x4654('0x1f')][_0x4654('0x1ea')]=Window_BattleLog[_0x4654('0x8d')][_0x4654('0x524')],Window_BattleLog[_0x4654('0x8d')][_0x4654('0x524')]=function(){this[_0x4654('0x244')]=!![];},VisuMZ[_0x4654('0x1f')][_0x4654('0xa5')]=Window_BattleLog[_0x4654('0x8d')][_0x4654('0x53c')],Window_BattleLog[_0x4654('0x8d')]['update']=function(){VisuMZ[_0x4654('0x1f')][_0x4654('0xa5')][_0x4654('0x5a5')](this);if(this[_0x4654('0x244')])this[_0x4654('0x55a')]();},Window_BattleLog[_0x4654('0x8d')]['processRefresh']=function(){this[_0x4654('0x244')]=![],VisuMZ[_0x4654('0x1f')][_0x4654('0x1ea')][_0x4654('0x5a5')](this);},Window_BattleLog[_0x4654('0x8d')][_0x4654('0x110')]=function(_0x36e454){let _0x492845=VisuMZ[_0x4654('0x1f')]['Settings'][_0x4654('0x5be')][_0x4654('0xef')][_0x4654('0x134')]()[_0x4654('0x512')](),_0x4ad3ea=this[_0x4654('0x221')][_0x36e454];if(_0x4ad3ea[_0x4654('0x2a0')](/<LEFT>/i)){if(_0x4654('0x3c5')!==_0x4654('0x3c5')){function _0x56aa24(){_0x43184b[_0x4654('0x2fa')](_0x5e3f92);}}else _0x492845='left';}else{if(_0x4ad3ea['match'](/<CENTER>/i))_0x492845=_0x4654('0x6a2');else _0x4ad3ea[_0x4654('0x2a0')](/<RIGHT>/i)&&(_0x492845=_0x4654('0xa1'));}_0x4ad3ea=_0x4ad3ea[_0x4654('0x10b')](/<(?:LEFT|CENTER|RIGHT)>/gi,''),_0x4ad3ea=_0x4ad3ea[_0x4654('0x10b')](/\\I\[0\]/gi,'');const _0x5a69f7=this[_0x4654('0x161')](_0x36e454);this[_0x4654('0xc2')][_0x4654('0x361')](_0x5a69f7['x'],_0x5a69f7['y'],_0x5a69f7[_0x4654('0x564')],_0x5a69f7[_0x4654('0x2e8')]);const _0x2a2add=this[_0x4654('0x617')](_0x4ad3ea)[_0x4654('0x564')];let _0x453911=_0x5a69f7['x'];if(_0x492845===_0x4654('0x6a2')){if(_0x4654('0x3e7')==='zyPpQ'){function _0x3f58fa(){_0x513177[_0x4654('0x1f')][_0x4654('0x64a')]['call'](this,_0x372e94),this['callNextMethod']();}}else _0x453911+=(_0x5a69f7[_0x4654('0x564')]-_0x2a2add)/0x2;}else{if(_0x492845===_0x4654('0xa1')){if(_0x4654('0x2f3')!=='TxtlK'){function _0x286ade(){if(this[_0x4654('0x5f1')])return this[_0x4654('0x5f1')];return this[_0x4654('0x5f1')]=_0x50d7f7[_0x4654('0xda')][_0x4654('0x329')](),this[_0x4654('0x5f1')];}}else _0x453911+=_0x5a69f7[_0x4654('0x564')]-_0x2a2add;}}this[_0x4654('0x16f')](_0x4ad3ea,_0x453911,_0x5a69f7['y'],_0x2a2add+0x8);},Window_BattleLog[_0x4654('0x8d')][_0x4654('0x261')]=function(_0x5a1a00){this[_0x4654('0x221')][_0x4654('0x128')](_0x5a1a00),this[_0x4654('0x524')](),this[_0x4654('0x223')]();},Window_BattleLog['prototype'][_0x4654('0x6ac')]=function(){let _0x3810d9=![];switch(this[_0x4654('0x47c')]){case _0x4654('0x78d'):_0x3810d9=this[_0x4654('0x67f')][_0x4654('0x215')]();break;case _0x4654('0x6b2'):_0x3810d9=this[_0x4654('0x67f')][_0x4654('0x768')]();break;case _0x4654('0x375'):_0x3810d9=this[_0x4654('0x67f')][_0x4654('0x17f')]();break;case _0x4654('0x739'):_0x3810d9=this[_0x4654('0x67f')][_0x4654('0x2b')]();break;case _0x4654('0x13f'):_0x3810d9=this[_0x4654('0x67f')][_0x4654('0x5d5')]();break;case _0x4654('0x3a0'):_0x3810d9=this[_0x4654('0x67f')][_0x4654('0x54e')]();break;}return!_0x3810d9&&(this[_0x4654('0x47c')]=''),_0x3810d9;},Window_BattleLog[_0x4654('0x8d')][_0x4654('0x5de')]=function(){this['setWaitMode'](_0x4654('0x375'));},Window_BattleLog[_0x4654('0x8d')]['waitForFloat']=function(){this[_0x4654('0xbd')](_0x4654('0x739'));},Window_BattleLog[_0x4654('0x8d')][_0x4654('0x3e9')]=function(){this[_0x4654('0xbd')](_0x4654('0x13f'));},Window_BattleLog['prototype'][_0x4654('0x357')]=function(){this[_0x4654('0xbd')](_0x4654('0x3a0'));},Window_BattleLog['prototype']['startTurn']=function(){const _0x457339=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x5be')];if(!_0x457339['StartTurnShow'])return;this[_0x4654('0x128')](_0x4654('0x261'),_0x457339[_0x4654('0x183')][_0x4654('0x31f')]($gameTroop[_0x4654('0x571')]())),this[_0x4654('0x128')](_0x4654('0x279'),_0x457339[_0x4654('0x236')]),this[_0x4654('0x128')](_0x4654('0x2a9'));},Window_BattleLog[_0x4654('0x8d')][_0x4654('0x1bd')]=function(_0x494f3a,_0x10cc17,_0x2c8486){if(this['isCustomActionSequence'](_0x10cc17)){if(_0x4654('0x1c6')===_0x4654('0x1c6'))BattleManager['prepareCustomActionSequence']();else{function _0x305011(){return this[_0x4654('0x54a')]()['some'](_0x2847e8=>_0x2847e8[_0x4654('0x5e6')]());}}}else{if(_0x4654('0x1be')!=='dbPQU'){function _0x521853(){this[_0x4654('0x5a3')]();}}else this[_0x4654('0x35b')](_0x494f3a,_0x10cc17,_0x2c8486);}},Window_BattleLog['prototype']['isCustomActionSequence']=function(_0x4bb39c){if(!SceneManager[_0x4654('0x443')]())return![];if(!_0x4bb39c)return![];if(!_0x4bb39c[_0x4654('0x1f7')]())return![];if(_0x4bb39c[_0x4654('0x1f7')]()['note']['match'](/<CUSTOM ACTION SEQUENCE>/i)){if('rRnoQ'!=='rRnoQ'){function _0x3d8b6c(){_0x5297e5[_0x4654('0x67f')][_0x4654('0x379')]();}}else return!![];}return![];},Window_BattleLog[_0x4654('0x8d')][_0x4654('0x35b')]=function(_0x58d14f,_0x4521a5,_0x5c430b){const _0x32b10c=_0x4521a5[_0x4654('0x1f7')]();this[_0x4654('0x214')](_0x58d14f,_0x4521a5,_0x5c430b),this['createEffectActionSet'](_0x58d14f,_0x4521a5,_0x5c430b),this[_0x4654('0x3b1')](_0x58d14f,_0x4521a5,_0x5c430b);},Window_BattleLog[_0x4654('0x8d')]['displayAction']=function(_0x517472,_0x2ef1cb){const _0x2c8e26=VisuMZ['BattleCore'][_0x4654('0x1f3')][_0x4654('0x5be')];if(_0x2c8e26[_0x4654('0x292')]){if(_0x4654('0x4aa')!==_0x4654('0x49b'))this[_0x4654('0x128')](_0x4654('0x261'),_0x4654('0x481')['format'](DataManager[_0x4654('0x38d')](_0x2ef1cb)));else{function _0x40b298(){_0x34f0b3[_0x4654('0x494')]([_0x2adc06]);}}}if(DataManager['isSkill'](_0x2ef1cb)){if(_0x2c8e26[_0x4654('0x3a3')])this[_0x4654('0x2fc')](_0x2ef1cb[_0x4654('0x42c')],_0x517472,_0x2ef1cb);if(_0x2c8e26[_0x4654('0x598')])this[_0x4654('0x2fc')](_0x2ef1cb[_0x4654('0x356')],_0x517472,_0x2ef1cb);}else{if(_0x2c8e26[_0x4654('0x5e7')])this[_0x4654('0x2fc')](TextManager[_0x4654('0x68c')],_0x517472,_0x2ef1cb);}},Window_BattleLog[_0x4654('0x8d')][_0x4654('0x214')]=function(_0x534055,_0x37f415,_0x127ab6){const _0x597422=_0x37f415[_0x4654('0x1f7')]();this[_0x4654('0x307')](_0x534055,_0x597422),this[_0x4654('0x128')](_0x4654('0x2a2'),_0x534055,_0x127ab6,!![]),this[_0x4654('0x128')](_0x4654('0x616'),_0x534055,_0x37f415),this[_0x4654('0x128')](_0x4654('0x5e4')),this['push'](_0x4654('0x24d'),_0x534055,_0x37f415),this[_0x4654('0x128')](_0x4654('0x5de'));},Window_BattleLog[_0x4654('0x8d')][_0x4654('0x56c')]=function(_0x3c1193,_0x14d6d7,_0x47fda8){if(this[_0x4654('0x52')](_0x14d6d7)){if(_0x4654('0x426')!=='GvuFt')this['autoMeleeSingleTargetActionSet'](_0x3c1193,_0x14d6d7,_0x47fda8);else{function _0x3f7010(){this['requestMotion']('missile');}}}else{if(this[_0x4654('0x101')](_0x14d6d7))this['autoMeleeMultiTargetActionSet'](_0x3c1193,_0x14d6d7,_0x47fda8);else _0x14d6d7[_0x4654('0x60a')]()?this[_0x4654('0x1b')](_0x3c1193,_0x14d6d7,_0x47fda8):this[_0x4654('0x321')](_0x3c1193,_0x14d6d7,_0x47fda8);}},Window_BattleLog[_0x4654('0x8d')][_0x4654('0x52')]=function(_0x555da8){if(!_0x555da8[_0x4654('0x466')]())return![];if(!_0x555da8['isForOne']())return![];if(!_0x555da8[_0x4654('0x58b')]())return![];return VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x76a')][_0x4654('0x18d')];},Window_BattleLog['prototype'][_0x4654('0x720')]=function(_0x41f1d6,_0x30431a,_0x3956be){const _0x5cf563=_0x41f1d6[_0x4654('0x1ff')]()[_0x4654('0x709')]<0x2,_0x14c34d=0x14,_0x3aff55=0x30;if(_0x5cf563){if(_0x4654('0x26b')===_0x4654('0x26b'))this['push'](_0x4654('0x177'),[_0x41f1d6],_0x3aff55,_0x14c34d),this[_0x4654('0x128')](_0x4654('0x5b9'),_0x41f1d6,_0x3956be,'front\x20base',_0x14c34d,!![],'Linear',!![]),this[_0x4654('0x128')]('requestMotion',[_0x41f1d6],_0x4654('0x6d3')),this[_0x4654('0x128')]('waitForMovement');else{function _0xdfa69e(){_0x4a88af=_0xb151c2[_0x4654('0x3b')];}}}if(_0x30431a[_0x4654('0x1f7')]()['animationId']<0x0){if(_0x4654('0x5c4')!==_0x4654('0x5c4')){function _0x1533f0(){return this[_0x4654('0x3d9')](_0x2559b7[0x0],_0x3843e6[0x1],_0x39f7d2=>{!_0x39f7d2[_0x4654('0x33a')]()&&(_0x39f7d2[_0x4654('0x98')](_0x4505b4[0x2],_0x5f071b[0x3]),_0x325833[_0x4654('0x98')](_0x39f7d2));}),!![];}}else this[_0x4654('0x1b')](_0x41f1d6,_0x30431a,_0x3956be);}else{if(_0x4654('0x26e')===_0x4654('0x142')){function _0x57b8e8(){_0x3b2120[_0x4654('0x3a1')]();}}else this[_0x4654('0x321')](_0x41f1d6,_0x30431a,_0x3956be);}if(_0x5cf563){const _0x47b284=_0x41f1d6['battler']();this['push']('performJump',[_0x41f1d6],_0x3aff55,_0x14c34d),this[_0x4654('0x128')](_0x4654('0x6e2'),_0x41f1d6,_0x47b284[_0x4654('0x36')],_0x47b284[_0x4654('0x728')],_0x14c34d,![],'Linear'),this[_0x4654('0x128')]('requestMotion',[_0x41f1d6],_0x4654('0xb2')),this[_0x4654('0x128')](_0x4654('0x5e4')),this[_0x4654('0x128')](_0x4654('0x741'),[_0x41f1d6],_0x4654('0x6d3'));}},Window_BattleLog['prototype'][_0x4654('0x101')]=function(_0x4582c8){if(!_0x4582c8['isPhysical']())return![];if(!_0x4582c8[_0x4654('0x230')]())return![];if(!_0x4582c8[_0x4654('0x58b')]())return![];return VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x76a')]['AutoMeleeAoE'];},Window_BattleLog[_0x4654('0x8d')][_0x4654('0x2a4')]=function(_0x2f91b8,_0x2bb1ce,_0x319a95){const _0x2d9c0c=_0x2f91b8[_0x4654('0x1ff')]()[_0x4654('0x709')]<0x2,_0x40e9cc=0x14,_0x12636c=0x30;_0x2d9c0c&&(this[_0x4654('0x128')]('performJump',[_0x2f91b8],_0x12636c,_0x40e9cc),this[_0x4654('0x128')](_0x4654('0x5b9'),_0x2f91b8,_0x319a95,'front\x20center',_0x40e9cc,!![],_0x4654('0x28'),!![]),this['push']('requestMotion',[_0x2f91b8],_0x4654('0x6d3')),this['push'](_0x4654('0x5e4')));this[_0x4654('0x321')](_0x2f91b8,_0x2bb1ce,_0x319a95);if(_0x2d9c0c){const _0x55ea42=_0x2f91b8[_0x4654('0x770')]();this[_0x4654('0x128')](_0x4654('0x177'),[_0x2f91b8],_0x12636c,_0x40e9cc),this[_0x4654('0x128')](_0x4654('0x6e2'),_0x2f91b8,_0x55ea42[_0x4654('0x36')],_0x55ea42[_0x4654('0x728')],_0x40e9cc,![],_0x4654('0x28')),this[_0x4654('0x128')](_0x4654('0x741'),[_0x2f91b8],_0x4654('0xb2')),this[_0x4654('0x128')](_0x4654('0x5e4')),this[_0x4654('0x128')]('requestMotion',[_0x2f91b8],_0x4654('0x6d3'));}},Window_BattleLog[_0x4654('0x8d')][_0x4654('0x1b')]=function(_0x2adcb0,_0x4607a4,_0x2c8555){const _0x44a605=_0x4607a4[_0x4654('0x1f7')]();for(const _0x44878f of _0x2c8555){if(_0x4654('0x49d')===_0x4654('0x49d')){if(!_0x44878f)continue;this[_0x4654('0x128')]('performAction',_0x2adcb0,_0x4607a4),this[_0x4654('0x128')](_0x4654('0x279'),Sprite_Battler[_0x4654('0x70c')]),this[_0x4654('0x128')](_0x4654('0x72a'),_0x2adcb0,[_0x44878f],_0x44a605[_0x4654('0x20f')]),this[_0x4654('0x128')](_0x4654('0x279'),0x18),this[_0x4654('0x128')](_0x4654('0x42a'),_0x2adcb0,_0x44878f);}else{function _0x319bf8(){_0x2d38ae[_0x4654('0x1f')][_0x4654('0x79c')][_0x4654('0x5a5')](this),this[_0x4654('0x223')]();}}}this[_0x4654('0x128')](_0x4654('0x2a2'),_0x2adcb0,_0x2c8555,![]);},Window_BattleLog[_0x4654('0x8d')][_0x4654('0x321')]=function(_0x331c14,_0x42af2d,_0x975211){const _0x3936b8=_0x42af2d[_0x4654('0x1f7')]();this[_0x4654('0x128')](_0x4654('0x38f'),_0x331c14,_0x42af2d),this[_0x4654('0x128')]('waitCount',Sprite_Battler[_0x4654('0x70c')]),this[_0x4654('0x128')](_0x4654('0x72a'),_0x331c14,_0x975211[_0x4654('0x1e')](),_0x3936b8['animationId']),this[_0x4654('0x128')]('waitForAnimation');for(const _0x128934 of _0x975211){if(!_0x128934)continue;this['push'](_0x4654('0x42a'),_0x331c14,_0x128934);}this[_0x4654('0x128')]('applyImmortal',_0x331c14,_0x975211,![]);},Window_BattleLog[_0x4654('0x8d')][_0x4654('0x3b1')]=function(_0x29711f,_0x58c87e,_0xe657ba){const _0x28a8cb=_0x58c87e['item']();this[_0x4654('0x128')]('waitForNewLine'),this[_0x4654('0x128')]('waitForEffect'),this[_0x4654('0x128')](_0x4654('0x2a9')),this[_0x4654('0x128')](_0x4654('0x4be'),_0x29711f),this[_0x4654('0x128')](_0x4654('0x5e4'));},Window_BattleLog[_0x4654('0x8d')][_0x4654('0x273')]=function(_0x23ed2d){},VisuMZ[_0x4654('0x1f')][_0x4654('0x517')]=Window_BattleLog[_0x4654('0x8d')][_0x4654('0x389')],Window_BattleLog[_0x4654('0x8d')][_0x4654('0x389')]=function(_0x56da13){if(!VisuMZ['BattleCore']['Settings']['BattleLog'][_0x4654('0x40b')])return;VisuMZ[_0x4654('0x1f')]['Window_BattleLog_displayCurrentState'][_0x4654('0x5a5')](this,_0x56da13);},Window_BattleLog[_0x4654('0x8d')][_0x4654('0x309')]=function(_0x563394){this[_0x4654('0x128')](_0x4654('0xb8'),_0x563394);VisuMZ[_0x4654('0x1f')]['Settings'][_0x4654('0x76a')][_0x4654('0x10a')]&&this['push'](_0x4654('0x72a'),_0x563394,[BattleManager['_subject']],-0x1);if(!VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x5be')][_0x4654('0x427')])return;this['push'](_0x4654('0x261'),TextManager['counterAttack'][_0x4654('0x31f')](_0x563394['name']()));},Window_BattleLog[_0x4654('0x8d')][_0x4654('0x688')]=function(_0x5514c4){this[_0x4654('0x128')]('performReflection',_0x5514c4);if(!VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x5be')][_0x4654('0x45c')])return;this[_0x4654('0x128')](_0x4654('0x261'),TextManager[_0x4654('0x39d')][_0x4654('0x31f')](_0x5514c4[_0x4654('0x18f')]()));},Window_BattleLog[_0x4654('0x8d')][_0x4654('0x175')]=function(_0x2376c3,_0x3f9125){if(VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x76a')][_0x4654('0x535')]){const _0x29c882=_0x3f9125[_0x4654('0x1f7')]();this[_0x4654('0x128')](_0x4654('0x72a'),_0x2376c3,[_0x2376c3],_0x29c882[_0x4654('0x20f')]);}},Window_BattleLog['prototype']['displaySubstitute']=function(_0x526472,_0x4d378f){this[_0x4654('0x128')](_0x4654('0x387'),_0x526472,_0x4d378f);if(!VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x5be')][_0x4654('0x270')])return;const _0x3cb95a=_0x526472[_0x4654('0x18f')](),_0x2ab6c9=TextManager[_0x4654('0x90')][_0x4654('0x31f')](_0x3cb95a,_0x4d378f[_0x4654('0x18f')]());this[_0x4654('0x128')](_0x4654('0x261'),_0x2ab6c9);},VisuMZ[_0x4654('0x1f')][_0x4654('0xa8')]=Window_BattleLog[_0x4654('0x8d')][_0x4654('0x187')],Window_BattleLog[_0x4654('0x8d')][_0x4654('0x187')]=function(_0x187c8a){if(!VisuMZ['BattleCore'][_0x4654('0x1f3')][_0x4654('0x5be')][_0x4654('0x470')])return;VisuMZ[_0x4654('0x1f')][_0x4654('0xa8')][_0x4654('0x5a5')](this,_0x187c8a);},VisuMZ[_0x4654('0x1f')][_0x4654('0x19e')]=Window_BattleLog[_0x4654('0x8d')][_0x4654('0x479')],Window_BattleLog[_0x4654('0x8d')][_0x4654('0x479')]=function(_0x328e57){if(!VisuMZ[_0x4654('0x1f')]['Settings'][_0x4654('0x5be')][_0x4654('0x203')])return;VisuMZ['BattleCore'][_0x4654('0x19e')]['call'](this,_0x328e57);},VisuMZ[_0x4654('0x1f')][_0x4654('0x506')]=Window_BattleLog[_0x4654('0x8d')][_0x4654('0x6a1')],Window_BattleLog['prototype'][_0x4654('0x6a1')]=function(_0x358b34){if(!VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x5be')][_0x4654('0x217')])return;VisuMZ['BattleCore'][_0x4654('0x506')][_0x4654('0x5a5')](this,_0x358b34);},VisuMZ[_0x4654('0x1f')][_0x4654('0x43a')]=Window_BattleLog[_0x4654('0x8d')]['displayEvasion'],Window_BattleLog[_0x4654('0x8d')][_0x4654('0x634')]=function(_0x2de1d9){if(!VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x5be')][_0x4654('0x217')])return;VisuMZ[_0x4654('0x1f')][_0x4654('0x43a')][_0x4654('0x5a5')](this,_0x2de1d9);},Window_BattleLog[_0x4654('0x8d')][_0x4654('0x3f8')]=function(_0x48f92d){_0x48f92d[_0x4654('0x3cc')]()[_0x4654('0x2d4')]&&(_0x48f92d[_0x4654('0x3cc')]()['hpDamage']>0x0&&!_0x48f92d[_0x4654('0x3cc')]()['drain']&&this[_0x4654('0x128')](_0x4654('0x769'),_0x48f92d),_0x48f92d[_0x4654('0x3cc')]()[_0x4654('0x511')]<0x0&&this[_0x4654('0x128')](_0x4654('0x350'),_0x48f92d),VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x5be')][_0x4654('0x6e3')]&&this[_0x4654('0x128')](_0x4654('0x261'),this['makeHpDamageText'](_0x48f92d)));},VisuMZ[_0x4654('0x1f')][_0x4654('0x3d0')]=Window_BattleLog[_0x4654('0x8d')][_0x4654('0xa7')],Window_BattleLog[_0x4654('0x8d')][_0x4654('0xa7')]=function(_0x21fe99){if(!VisuMZ[_0x4654('0x1f')]['Settings'][_0x4654('0x5be')][_0x4654('0xae')])return;VisuMZ[_0x4654('0x1f')]['Window_BattleLog_displayMpDamage']['call'](this,_0x21fe99);},VisuMZ[_0x4654('0x1f')]['Window_BattleLog_displayTpDamage']=Window_BattleLog['prototype'][_0x4654('0x5d3')],Window_BattleLog[_0x4654('0x8d')][_0x4654('0x5d3')]=function(_0x456d58){if(!VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x5be')][_0x4654('0x1b4')])return;VisuMZ[_0x4654('0x1f')][_0x4654('0x622')][_0x4654('0x5a5')](this,_0x456d58);},Window_BattleLog[_0x4654('0x8d')][_0x4654('0x782')]=function(_0x4fc1f8){const _0x5194c5=_0x4fc1f8['result'](),_0x224cc5=_0x5194c5[_0x4654('0x200')]();for(const _0x4546d2 of _0x224cc5){const _0x2c519f=_0x4fc1f8[_0x4654('0x5b5')]()?_0x4546d2[_0x4654('0x42c')]:_0x4546d2[_0x4654('0x356')];_0x2c519f&&VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')]['BattleLog'][_0x4654('0x775')]&&(this['push'](_0x4654('0x4b0')),this[_0x4654('0x128')](_0x4654('0x2e4')),this[_0x4654('0x128')](_0x4654('0x261'),_0x2c519f[_0x4654('0x31f')](_0x4fc1f8[_0x4654('0x18f')]())));if(_0x4546d2['id']===_0x4fc1f8[_0x4654('0x8')]()){if('VoQEb'!==_0x4654('0x3dd'))this[_0x4654('0x128')](_0x4654('0x465'),_0x4fc1f8);else{function _0x4cce63(){this[_0x4654('0x522')][_0x4654('0x314')](_0x4dcd52);const _0x4737c7=_0x4523ec[_0x4654('0x1a7')](_0x445df3['currentAction']());this['_forcedBattlers'][_0x4654('0x128')]([_0x700243,_0x4737c7]);}}}}},VisuMZ[_0x4654('0x1f')][_0x4654('0x414')]=Window_BattleLog[_0x4654('0x8d')]['displayRemovedStates'],Window_BattleLog[_0x4654('0x8d')][_0x4654('0x334')]=function(_0x1128f4){if(!VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x5be')][_0x4654('0x300')])return;VisuMZ[_0x4654('0x1f')][_0x4654('0x414')][_0x4654('0x5a5')](this,_0x1128f4);},Window_BattleLog[_0x4654('0x8d')][_0x4654('0x1d1')]=function(_0x47c30d){const _0x1d6863=VisuMZ[_0x4654('0x1f')][_0x4654('0x1f3')][_0x4654('0x5be')],_0x52b599=_0x47c30d[_0x4654('0x3cc')]();if(_0x1d6863[_0x4654('0x428')])this[_0x4654('0x508')](_0x47c30d,_0x52b599[_0x4654('0x115')],TextManager[_0x4654('0x8b')]);if(_0x1d6863[_0x4654('0x58c')])this[_0x4654('0x508')](_0x47c30d,_0x52b599[_0x4654('0x69b')],TextManager[_0x4654('0x5b0')]);if(_0x1d6863[_0x4654('0x44')])this[_0x4654('0x508')](_0x47c30d,_0x52b599[_0x4654('0x14d')],TextManager[_0x4654('0x5a9')]);},VisuMZ[_0x4654('0x1f')][_0x4654('0x139')]=Window_BattleLog[_0x4654('0x8d')][_0x4654('0x2a9')],Window_BattleLog[_0x4654('0x8d')][_0x4654('0x2a9')]=function(){VisuMZ[_0x4654('0x1f')]['Window_BattleLog_clear'][_0x4654('0x5a5')](this),this[_0x4654('0x223')]();},VisuMZ['BattleCore'][_0x4654('0x79c')]=Window_BattleLog[_0x4654('0x8d')]['pushBaseLine'],Window_BattleLog[_0x4654('0x8d')][_0x4654('0x2e4')]=function(){VisuMZ[_0x4654('0x1f')][_0x4654('0x79c')][_0x4654('0x5a5')](this),this[_0x4654('0x223')]();},VisuMZ[_0x4654('0x1f')][_0x4654('0x3c')]=Window_BattleLog['prototype'][_0x4654('0x4b0')],Window_BattleLog[_0x4654('0x8d')][_0x4654('0x4b0')]=function(){VisuMZ['BattleCore'][_0x4654('0x3c')]['call'](this),this[_0x4654('0x524')](),this[_0x4654('0x223')]();},VisuMZ[_0x4654('0x1f')][_0x4654('0x54c')]=Window_BattleLog[_0x4654('0x8d')][_0x4654('0x6d0')],Window_BattleLog[_0x4654('0x8d')]['popupDamage']=function(_0x3c7a66){VisuMZ[_0x4654('0x1f')][_0x4654('0x54c')]['call'](this,_0x3c7a66),this[_0x4654('0x223')]();},Window_BattleLog[_0x4654('0x8d')][_0x4654('0x2e7')]=function(){let _0x4d26b4=0x0;if(this[_0x4654('0x56e')][_0x4654('0x0')]>0x0){if(_0x4654('0x69f')===_0x4654('0x69f'))_0x4d26b4=this[_0x4654('0x56e')][this[_0x4654('0x56e')][_0x4654('0x0')]-0x1];else{function _0x1908d2(){_0x61bdb1[_0x4654('0x584')]=_0x150cae[_0x4654('0x444')](_0x2db438['$1']);}}}this['_lines'][_0x4654('0x0')]>_0x4d26b4?this[_0x4654('0x20d')]():this[_0x4654('0x223')]();},VisuMZ[_0x4654('0x1f')][_0x4654('0x27a')]=Window_BattleLog['prototype'][_0x4654('0x616')],Window_BattleLog[_0x4654('0x8d')][_0x4654('0x616')]=function(_0x29e815,_0x576e3d){VisuMZ[_0x4654('0x1f')]['Window_BattleLog_performActionStart'][_0x4654('0x5a5')](this,_0x29e815,_0x576e3d),this['callNextMethod']();},VisuMZ['BattleCore'][_0x4654('0x2d7')]=Window_BattleLog[_0x4654('0x8d')][_0x4654('0x38f')],Window_BattleLog[_0x4654('0x8d')][_0x4654('0x38f')]=function(_0x1ff700,_0x12dcd7){VisuMZ[_0x4654('0x1f')]['Window_BattleLog_performAction'][_0x4654('0x5a5')](this,_0x1ff700,_0x12dcd7),this[_0x4654('0x223')]();},VisuMZ[_0x4654('0x1f')][_0x4654('0x1ab')]=Window_BattleLog['prototype']['performActionEnd'],Window_BattleLog[_0x4654('0x8d')][_0x4654('0x4be')]=function(_0x880f2f){for(const _0x4bdd15 of BattleManager[_0x4654('0x49c')]()){if(_0x4654('0x3ef')===_0x4654('0x3ef')){if(!_0x4bdd15)continue;if(_0x4bdd15[_0x4654('0x6f4')]())continue;_0x4bdd15[_0x4654('0x4be')]();}else{function _0x4d546a(){return!![];}}}this['callNextMethod']();},VisuMZ[_0x4654('0x1f')][_0x4654('0x412')]=Window_BattleLog[_0x4654('0x8d')]['performDamage'],Window_BattleLog['prototype'][_0x4654('0x769')]=function(_0x20814a){VisuMZ[_0x4654('0x1f')][_0x4654('0x412')][_0x4654('0x5a5')](this,_0x20814a),this[_0x4654('0x223')]();},VisuMZ[_0x4654('0x1f')][_0x4654('0x325')]=Window_BattleLog[_0x4654('0x8d')][_0x4654('0x17')],Window_BattleLog['prototype'][_0x4654('0x17')]=function(_0x270600){VisuMZ[_0x4654('0x1f')][_0x4654('0x325')][_0x4654('0x5a5')](this,_0x270600),this['callNextMethod']();},VisuMZ['BattleCore'][_0x4654('0x6c4')]=Window_BattleLog['prototype'][_0x4654('0x350')],Window_BattleLog[_0x4654('0x8d')][_0x4654('0x350')]=function(_0x4974e6){VisuMZ[_0x4654('0x1f')]['Window_BattleLog_performRecovery'][_0x4654('0x5a5')](this,_0x4974e6),this[_0x4654('0x223')]();},VisuMZ[_0x4654('0x1f')][_0x4654('0xf4')]=Window_BattleLog[_0x4654('0x8d')][_0x4654('0x6b7')],Window_BattleLog[_0x4654('0x8d')][_0x4654('0x6b7')]=function(_0x41e658){VisuMZ[_0x4654('0x1f')][_0x4654('0xf4')][_0x4654('0x5a5')](this,_0x41e658),this[_0x4654('0x223')]();},VisuMZ[_0x4654('0x1f')][_0x4654('0x342')]=Window_BattleLog['prototype']['performMagicEvasion'],Window_BattleLog[_0x4654('0x8d')][_0x4654('0x490')]=function(_0x33e4be){VisuMZ[_0x4654('0x1f')][_0x4654('0x342')]['call'](this,_0x33e4be),this[_0x4654('0x223')]();},VisuMZ['BattleCore'][_0x4654('0x35f')]=Window_BattleLog['prototype'][_0x4654('0xb8')],Window_BattleLog[_0x4654('0x8d')][_0x4654('0xb8')]=function(_0x4db3e1){VisuMZ['BattleCore'][_0x4654('0x35f')][_0x4654('0x5a5')](this,_0x4db3e1),this[_0x4654('0x223')]();},VisuMZ[_0x4654('0x1f')][_0x4654('0x66c')]=Window_BattleLog[_0x4654('0x8d')][_0x4654('0x67')],Window_BattleLog[_0x4654('0x8d')][_0x4654('0x67')]=function(_0x9e189d){VisuMZ['BattleCore'][_0x4654('0x66c')]['call'](this,_0x9e189d),this[_0x4654('0x223')]();},VisuMZ['BattleCore'][_0x4654('0x1ee')]=Window_BattleLog[_0x4654('0x8d')][_0x4654('0x387')],Window_BattleLog[_0x4654('0x8d')][_0x4654('0x387')]=function(_0x525667,_0xe6c518){VisuMZ[_0x4654('0x1f')][_0x4654('0x1ee')][_0x4654('0x5a5')](this,_0x525667,_0xe6c518),this['callNextMethod']();},VisuMZ[_0x4654('0x1f')][_0x4654('0x64a')]=Window_BattleLog['prototype'][_0x4654('0x465')],Window_BattleLog[_0x4654('0x8d')][_0x4654('0x465')]=function(_0x807f94){VisuMZ[_0x4654('0x1f')][_0x4654('0x64a')][_0x4654('0x5a5')](this,_0x807f94),this[_0x4654('0x223')]();},Window_BattleLog['prototype'][_0x4654('0x24d')]=function(_0x5edacc,_0x2abf35){_0x5edacc[_0x4654('0x24d')](_0x2abf35),this[_0x4654('0x223')]();},Window_BattleLog['prototype'][_0x4654('0x724')]=function(_0xbb4817,_0x179f80){const _0x4d6e51=_0xbb4817[_0x4654('0x5b3')]();_0x4d6e51<=0x0?SoundManager['playEnemyAttack']():this[_0x4654('0x69c')](_0x179f80,_0x4d6e51);},Window_BattleLog[_0x4654('0x8d')][_0x4654('0x2a2')]=function(_0x3f4799,_0x47b1aa,_0x1efbc5){const _0x503021=[_0x3f4799][_0x4654('0x645')](_0x47b1aa);for(const _0x390d73 of _0x503021){if(!_0x390d73)continue;_0x390d73[_0x4654('0x4f4')](_0x1efbc5);}this[_0x4654('0x223')]();},Window_BattleLog['prototype'][_0x4654('0x279')]=function(_0x2cd72a){this['_waitCount']=_0x2cd72a;},Window_BattleLog['prototype'][_0x4654('0x741')]=function(_0x268247,_0x5abe3d){for(const _0x7428f5 of _0x268247){if(_0x4654('0x4e5')!==_0x4654('0x18')){if(!_0x7428f5)continue;_0x7428f5['requestMotion'](_0x5abe3d);}else{function _0x5e81f5(){this['_flashColor']=_0x51f7f7[_0x4654('0x47d')]||[0x0,0x0,0x0,0x0],this['_flashColor']=_0x38f257[_0x4654('0x1a7')](this[_0x4654('0x4ae')]),this[_0x4654('0x42')]=_0x3826f4[_0x4654('0x560')]||0x0;const _0x2a0d14=this[_0x4654('0x3ac')](),_0xfff18a=_0x45c7ca[_0x4654('0x6f0')](_0x2a0d14*0xa),_0x5779c2=this[_0x4654('0x74f')](_0xfff18a,_0x2a0d14);_0x5779c2[_0x4654('0x67c')][_0x4654('0x2bb')]=_0x373c31[_0x4654('0x432')](_0x3fc4e2[_0x4654('0x2bb')]),_0x5779c2['bitmap'][_0x4654('0x66f')](_0x35979a,0x0,0x0,_0xfff18a,_0x2a0d14,_0x4654('0x6a2')),_0x5779c2['dy']=0x0;}}}this[_0x4654('0x223')]();},Window_BattleLog[_0x4654('0x8d')][_0x4654('0x6e2')]=function(_0x5bde0e,_0x394d0c,_0x338ae6,_0x553859,_0x5acf20,_0x1a1d9f){_0x5bde0e[_0x4654('0x6b3')](_0x394d0c,_0x338ae6,_0x553859,_0x5acf20,_0x1a1d9f,-0x1),this['callNextMethod']();},Window_BattleLog[_0x4654('0x8d')]['performMoveToTargets']=function(_0x3fe146,_0xe5e452,_0x202516,_0x506087,_0x4a9ecf,_0x218690,_0xf0c075){const _0x5ca9d9=Math[_0x4654('0x22b')](..._0xe5e452[_0x4654('0x538')](_0x15017d=>_0x15017d[_0x4654('0x770')]()[_0x4654('0x2df')]-_0x15017d[_0x4654('0x770')]()['width']/0x2)),_0x13101c=Math[_0x4654('0x6f7')](..._0xe5e452[_0x4654('0x538')](_0x136b52=>_0x136b52[_0x4654('0x770')]()[_0x4654('0x2df')]+_0x136b52[_0x4654('0x770')]()['width']/0x2)),_0x57f3a2=Math[_0x4654('0x22b')](..._0xe5e452[_0x4654('0x538')](_0x23e0ed=>_0x23e0ed[_0x4654('0x770')]()[_0x4654('0x2a8')]-_0x23e0ed[_0x4654('0x770')]()['height'])),_0x49faf1=Math[_0x4654('0x6f7')](..._0xe5e452['map'](_0x4582a1=>_0x4582a1[_0x4654('0x770')]()[_0x4654('0x2a8')])),_0x16c433=_0xe5e452[_0x4654('0x4c4')](_0x38f8a3=>_0x38f8a3[_0x4654('0x5b5')]())[_0x4654('0x0')],_0x57702c=_0xe5e452[_0x4654('0x4c4')](_0x477fab=>_0x477fab[_0x4654('0x2c')]())[_0x4654('0x0')];let _0x25c479=0x0,_0x3bcfe7=0x0;if(_0x202516[_0x4654('0x2a0')](/front/i))_0x25c479=_0x16c433>=_0x57702c?_0x5ca9d9:_0x13101c;else{if(_0x202516[_0x4654('0x2a0')](/middle/i))_0x25c479=(_0x5ca9d9+_0x13101c)/0x2,_0xf0c075=-0x1;else{if(_0x202516[_0x4654('0x2a0')](/back/i)){if(_0x4654('0x1c7')!==_0x4654('0x1c7')){function _0x543638(){if(this[_0x4654('0x5f1')])return this['_battleLayoutStyle'];return this[_0x4654('0x5f1')]=_0x1863c8[_0x4654('0x1f')][_0x4654('0x1f3')]['BattleLayout'][_0x4654('0x3e2')][_0x4654('0x134')]()[_0x4654('0x512')](),this[_0x4654('0x5f1')];}}else _0x25c479=_0x16c433>=_0x57702c?_0x13101c:_0x5ca9d9;}}}if(_0x202516['match'](/head/i))_0x3bcfe7=_0x57f3a2;else{if(_0x202516['match'](/center/i))_0x3bcfe7=(_0x57f3a2+_0x49faf1)/0x2;else _0x202516[_0x4654('0x2a0')](/base/i)&&(_0x3bcfe7=_0x49faf1);}_0x3fe146[_0x4654('0x6b3')](_0x25c479,_0x3bcfe7,_0x506087,_0x4a9ecf,_0x218690,_0xf0c075),this[_0x4654('0x223')]();},Window_BattleLog[_0x4654('0x8d')][_0x4654('0x177')]=function(_0x4b08dc,_0x2900f4,_0x1ac4e4){for(const _0x728477 of _0x4b08dc){if(_0x4654('0x2fd')===_0x4654('0x2fd')){if(!_0x728477)continue;_0x728477[_0x4654('0x518')](_0x2900f4,_0x1ac4e4);}else{function _0x201659(){if(!_0x32f102['isSceneBattle']())return;const _0x5d8216=_0x53056d[_0x4654('0x779')](),_0x204134=_0x47ca76['_action'],_0x2d49a3=_0x40110a[_0x4654('0x672')],_0x574d73=_0x5af246[_0x4654('0x2f')];if(!_0x5d8216||!_0x204134||!_0x2d49a3)return;if(!_0x204134[_0x4654('0x1f7')]())return;_0x574d73[_0x4654('0x307')](_0x2d49a3,_0x204134['item']()),_0x5d8216[_0x4654('0xbd')](_0x4654('0x39b'));}}}this[_0x4654('0x223')]();};