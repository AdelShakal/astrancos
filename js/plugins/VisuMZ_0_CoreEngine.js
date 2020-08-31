//=============================================================================
// VisuStella MZ - Core Engine
// VisuMZ_0_CoreEngine.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_0_CoreEngine = true;

var VisuMZ = VisuMZ || {};
VisuMZ.CoreEngine = VisuMZ.CoreEngine || {};
VisuMZ.CoreEngine.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 0] [Version 1.01] [CoreEngine]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Core_Engine_VisuStella_MZ
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Core Engine plugin is designed to fix any bugs that may have slipped
 * past RPG Maker MZ's source code and to give game devs more control over
 * RPG Maker MZ's various features, ranging from mechanics to aesthetics to
 * quality of life improvements.
 *
 * Features include all (but not limited to) the following:
 *
 * * Bug fixes for the problems existing in the RPG Maker MZ base code.
 * * Failsafes added for Script Call related event commands.
 * * Lots of Quality of Life Settings that can be activated through the
 *   Plugin Parameters.
 * * Control over the various Text Colors used throughout the game.
 * * Change up the maximum amount of gold carried, give it an icon attached to
 *   the label, and include text for overlap specifics.
 * * Preload images as the game boots up.
 * * Add specific background images for menus found throughout the game.
 * * A button assist window will appear at the top or bottom of the screen,
 *   detailing which buttons do what when inside a menu. This feature can be
 *   turned off.
 * * Choose which in-game battler parameters to display inside menus (ie ATK,
 *   DEF, AGI, etc.) and determine their maximum values, along with plenty of
 *   notetags to give more control over parameter, x-parameter, s-parameter
 *   bonuses through equipment, states, and other trait objects.
 * * Control over how the UI objects appear (such as the menu button, cancel
 *   button, left/right actor switch buttons).
 * * Reposition actors and enemies if the battle resolution is larger.
 * * Allow class names and nicknames to support text codes when displayed.
 * * Determine how windows behave in the game, if they will mask other windows,
 *   their line height properties, and more.
 *
 * ============================================================================
 * Requirements
 * ============================================================================
 *
 * This plugin is made for RPG Maker MZ. This will not work in other iterations
 * of RPG Maker.
 *
 * ------ Tier 0 ------
 *
 * This plugin is a Tier 0 plugin. Place it under other plugins of lower tier
 * value on your Plugin Manager list (ie: 0, 1, 2, 3, 4, 5). This is to ensure
 * that your plugins will have the best compatibility with the rest of the
 * VisuStella MZ Plugin library.
 *
 * ============================================================================
 * Important Changes: Bug Fixes
 * ============================================================================
 *
 * This plugin also serves to fix various bugs found in RPG Maker MZ that have
 * been unaddressed or not yet taken care of. The following is a list of bugs
 * that have been fixed by this plugin:
 *
 * ---
 *
 * Attack Skill Trait
 *
 * - Enemies are unaffected by the Attack Skill Trait. This means if they have
 * an Attack action, they will always use Attack over and over even if their
 * Attack Skill Trait has been changed. This plugin will change it up so that
 * the Attack skill will comply with whatever their Attack Skill Trait's skill
 * is set to.
 *
 * ---
 *
 * Auto Battle Actor Skill Usage
 *
 * - If an actor with Auto Battle has access to a skill but not have any access
 * to that skill's type, that actor will still be able to use the skill during
 * Auto Battle despite the fact that the actor cannot use that skill during
 * manual input.
 *
 * ---
 *
 * Move Picture, Origin Differences
 *
 * - If a Show Picture event command is made with an Origin setting of
 * "Upper Left" and a Move Picture event command is made afterwards with an
 * Origin setting of "Center", RPG Maker MZ would originally have it instantly
 * jump into the new origin setting without making a clean transition between
 * them. This plugin will create that clean transition between origins.
 *
 * ---
 *
 * ============================================================================
 * Major Changes: New Hard-Coded Features
 * ============================================================================
 *
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Scroll-Linked Pictures
 *
 * - If a Parallax has a ! at the start of its filename, it is bound to the map
 * scrolling. The same thing now happens with pictures. If a Picture has a ! at
 * the start of its filename, it is bound to the map's scrolling as well.
 *
 * ---
 *
 * Movement Route Scripts
 *
 * - If code in a Movement Route Script command fails, instead of crashing the
 * game, it will now act as if nothing happened except to display the cause of
 * the error inside the console.
 *
 * ---
 * 
 * Script Call Failsafes
 * 
 * - If code found in Conditional Branches, Control Variables, and/or Script
 * Calls fail to activate, instead of crashing the game, it will now act as if
 * nothing happened except to display the cause of the error inside the
 * console.
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
 * === Actors ===
 *
 * Parameter limits can be adjusted in the Plugin Parameters, but this won't
 * lift the ability to change the values of an actor's initial or max level
 * past the editor's limits. Instead, this must be done through the usage of
 * notetags to accomplish the feat.
 *
 * ---
 *
 * <Max Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's max level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * <Initial Level: x>
 *
 * - Used for: Actor Notetags
 * - Replace 'x' with an integer to determine the actor's initial level.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the actor's database value.
 *
 * ---
 *
 * === Classes ===
 *
 * As actor levels can now surpass 99 due to the notetag system, there may be
 * some skills you wish certain classes can learn upon reaching higher levels
 * past 99, too.
 *
 * ---
 * 
 * <Learn At Level: x>
 *
 * - Used for: Class Skill Learn Notetags
 * - Replace 'x' with an integer to determine the level this class will learn
 *   the associated skill at.
 * - This allows you to go over the database limit of 99.
 * - If this notetag isn't used, default to the class's database value.
 *
 * ---
 *
 * === Enemies ===
 *
 * Enemies are now given levels. The levels don't do anything except to serve
 * as a container for a number value. This way, levels can be used in damage
 * formulas (ie. a.atk - b.level) without causing any errors. To give enemies
 * levels, use the notetags below. These notetags also allow you to adjust the
 * base parameters, EXP, and Gold past the database limitations.
 *
 * ---
 *
 * <Level: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's level.
 * - If no level is declared, the level will default to 1.
 *
 * ---
 *
 * <param: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to alter.
 * - Replace 'x' with an integer to set an enemy's 'param' base value.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 *
 * <EXP: x>
 * <Gold: x>
 *
 * - Used for: Enemy Notetags
 * - Replace 'x' with an integer to determine the enemy's EXP or Gold values.
 * - This will overwrite the enemy's database value and can exceed the original
 *   value limitation in the database.
 * - If these notetags aren't used, default to the enemy's database value.
 *
 * ---
 * 
 * === Animations ===
 * 
 * Animations in RPG Maker MZ are done by Effekseer and the animation system
 * has been revamped. However, the animations are only centered on the targets
 * now, and cannot be attached to the head or foot. Insert these tags into
 * the names of the animations in the database to adjust their positions.
 * 
 * ---
 * 
 * <Head>
 * <Foot>
 * 
 * - Used for: Animation Name Tags
 * - Will set the animation to anchor on top of the sprite (if <Head> is used)
 *   or at the bottom of the sprite (if <Foot> is used).
 * 
 * ---
 * 
 * <Anchor X: x>
 * <Anchor Y: y>
 * 
 * <Anchor: x, y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation at a specific point within the sprite based on
 *   the 'x' and 'y' values.
 * - Replace 'x' and 'y' with numeric values representing their positions based
 *   on a rate where 0.0 is the furthest left/up (x, y respectively) to 1.0 for
 *   the furthest right/down (x, y respectively).
 * 
 * Examples:
 * 
 * <Anchor X: 0.4>
 * <Anchor Y: 0.8>
 * 
 * <Anchor: 0.2, 0.9>
 * 
 * ---
 * 
 * <Offset X: +x>
 * <Offset X: -x>
 * <Offset Y: +y>
 * <Offset Y: -y>
 * 
 * <Offset: +x, +y>
 * <Offset: -x, -y>
 * 
 * - Used for: Animation Name Tags
 * - Will anchor the animation to be offset by an exact number of pixels.
 * - This does the same the editor does, except it lets you input values
 *   greater than 999 and lower than -999.
 * - Replace 'x' and 'y' with numeric values the exact number of pixels to
 *   offset the animation's x and y coordinates by.
 * 
 * Examples:
 * 
 * <Offset X: +20>
 * <Offset Y: -50>
 * 
 * <Offset: +10, -30>
 * 
 * ---
 *
 * === Quality of Life ===
 *
 * By default, RPG Maker MZ does not offer an encounter step minimum after a
 * random encounter has finished. This means that one step immediately after
 * finishing a battle, the player can immediately enter another battle. The
 * Quality of Life improvement: Minimum Encounter Steps allows you to set a
 * buffer range between battles for the player to have some breathing room.
 *
 * ---
 *
 * <Minimum Encounter Steps: x>
 *
 * - Used for: Map Notetags
 * - Replace 'x' with the minimum number of steps before the player enters a
 *   random encounter on that map.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => Encounter Rate Min.
 *
 * ---
 *
 * Tile shadows are automatically added to certain tiles in the map editor.
 * These tile shadows may or may not fit some types of maps. You can turn them
 * on/off with the Quality of Life Plugin Parameters or you can override the
 * settings with the following notetags:
 *
 * ---
 *
 * <Show Tile Shadows>
 * <Hide Tile Shadows>
 *
 * - Used for: Map Notetags
 * - Use the respective notetag for the function you wish to achieve.
 * - If this notetag is not used, then the minimum encounter steps for the map
 *   will default to Quality of Life Settings => No Tile Shadows.
 *
 * ---
 *
 * === Basic, X, and S Parameters ===
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * behaviors and give boosts to trait objects in a more controlled manner.
 *
 * ---
 *
 * <param Plus: +x>
 * <param Plus: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Rate: x%>
 * <param Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'param' value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Flat: +x>
 * <param Flat: -x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'param' plus value when calculating totals.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer on how much to adjust the parameter by.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <param Max: x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Sets max caps for the 'param' to be 'x'. If there are multiple max caps
 *   available to the unit, then the highest will be selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'x' with an integer to determine what the max cap should be.
 *
 * ---
 *
 * <xparam Plus: +x%>
 * <xparam Plus: -x%>
 *
 * <xparam Plus: +x.x>
 * <xparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Rate: x%>
 * <xparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'xparam' value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <xparam Flat: +x%>
 * <xparam Flat: -x%>
 *
 * <xparam Flat: +x.x>
 * <xparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'xparam' plus value when calculating totals.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <sparam Plus: +x%>
 * <sparam Plus: -x%>
 *
 * <sparam Plus: +x.x>
 * <sparam Plus: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Rate: x%>
 * <sparam Rate: x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Changes 'param' rate to 'x' to alter the total 'sparam' value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <sparam Flat: +x%>
 * <sparam Flat: -x%>
 *
 * <sparam Flat: +x.x>
 * <sparam Flat: -x.x>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Adds or subtracts 'x' to 'sparam' plus value when calculating totals.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'x' with a percentage (ie. 150%) or a rate (ie. 1.5).
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * === JavaScript Notetags: Basic, X, and S Parameters ===
 *
 * The following are notetags made for users with JavaScript knowledge. These
 * notetags are primarily aimed at Basic, X, and S Parameters.
 *
 * ---
 *
 * <JS param Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' plus value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' rate value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'param' flat value.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   Basic Parameter => Formula.
 *
 * ---
 *
 * <JS param Max: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to determine what the max cap for 'param' should be. If there
 *   are multiple max caps available to the unit, then the highest is selected.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter to modify.
 * - Replace 'code' with JavaScript code to determine the max cap for the
 *   desired parameter.
 *
 * ---
 *
 * <JS xparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' plus value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the X parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' rate value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the X parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS xparam Flat: code>
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'xparam' flat value.
 * - Replace 'xparam' with 'HIT', 'EVA', 'CRI', 'CEV', 'MEV', 'MRF', 'CNT',
 *   'HRG', 'MRG', 'TRG' to determine which X parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the X parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   X Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Plus: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' plus value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   plus amount for the S parameter's total calculation.
 * - This is used to calculate the 'plus' portion in the Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Rate: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' rate value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   param rate amount for the S parameter's total calculation.
 * - This is used to calculate the 'paramRate' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * <JS sparam Flat: code>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Runs 'code' to change the 'sparam' flat value.
 * - Replace 'sparam' with 'TGR', 'GRD', 'REC', 'PHA', 'MCR', 'TCR', 'PDR',
 *   'MDR', 'FDR', 'EXR' to determine which S parameter to modify.
 * - Replace 'code' with JavaScript code to determine how much to change the
 *   flat bonus amount for the S parameter's total calculation.
 * - This is used to calculate the 'flatBonus' portion in Parameter Settings =>
 *   S Parameter => Formula.
 *
 * ---
 *
 * ============================================================================
 * Plugin Commands
 * ============================================================================
 *
 * The following are Plugin Commands that come with this plugin. They can be
 * accessed through the Plugin Command event command.
 *
 * ---
 *
 * Game: Open URL
 * - Opens a website URL from the game.
 *
 *   URL:
 *   - Where do you want to take the player?
 *
 * ---
 *
 * Gold: Gain/Lose
 * - Allows you to give/take more gold than the event editor limit.
 *
 *   Value:
 *   - How much gold should the player gain/lose?
 *   - Use negative values to remove gold.
 *
 * ---
 *
 * Picture: Easing Type
 * - Changes the easing type to a number of options.
 *
 *   Picture ID:
 *   - Which picture do you wish to apply this easing to?
 *
 *   Easing Type:
 *   - Select which easing type you wish to apply.
 *
 *   Instructions:
 *   - Insert this Plugin Command after a "Move Picture" event command.
 *   - Turn off "Wait for Completion" in the "Move Picture" event.
 *   - You may have to add in your own "Wait" event command after.
 *
 * ---
 *
 * System: Main Font Size
 * - Set the game's main font size.
 *
 *   Change To:
 *   - Change the font size to this number.
 *
 * ---
 *
 * System: Side View Battle
 * - Switch between Front View or Side View for battle.
 *
 *   Change To:
 *   - Choose which view type to switch to.
 *
 * ---
 *
 * System: Time Progress Battle
 * - Switch between Default or Time Progress battle system.
 *
 *   Change To:
 *   - Choose which battle system to switch to.
 *
 * ---
 *
 * System: Window Padding
 * - Change the game's window padding amount.
 *
 *   Change To:
 *   - Change the game's standard window padding to this value.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Quality of Life Settings
 * ============================================================================
 *
 * A variety of (optional) settings and changes are added with the Core Engine
 * to improve the quality of life for both the game devs and players alike.
 *
 * ---
 *
 * Play Test
 * 
 *   New Game on Boot:
 *   - Automatically start a new game on Play Test?
 *   - Only enabled during Play Test.
 *
 *   No Play Test Mode:
 *   - Force the game to be out of Play Test mode when play testing.
 * 
 *   Open Console on Boot:
 *   - Open the Debug Console upon booting up your game?
 *   - Only enabled during Play Test.
 *
 *   F6: Toggle Sound:
 *   - F6 Key Function: Turn on all sound to 100% or to 0%, toggling between
 *     the two.
 *   - Only enabled during Play Test.
 *
 *   F7: Toggle Fast Mode:
 *   - F7 Key Function: Toggle fast mode.
 *   - Only enabled during Play Test.
 *
 *   NewGame > CommonEvent:
 *   - Runs a common event each time a new game is started.
 *   - Only enabled during Play Test.
 *
 * ---
 *
 * Digit Grouping
 *
 *   Standard Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for standard text
 *     inside windows?
 *
 *   Ex Text:
 *   - Make numbers like 1234567 appear like 1,234,567 for ex text,
 *     written through drawTextEx (like messages)?
 *
 *   Damage Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for in-battle
 *     damage sprites?
 *
 *   Gauge Sprites:
 *   - Make numbers like 1234567 appear like 1,234,567 for visible gauge
 *     sprites such as HP, MP, and TP gauges?
 *
 * ---
 *
 * Player Benefit
 *
 *   Encounter Rate Min:
 *   - Minimum number of steps the player can take without any
 *     random encounters.
 *
 *   Escape Always:
 *   - If the player wants to escape a battle, let them escape the battle
 *     with 100% chance.
 *
 *   Accuracy Formula:
 *   - Accuracy formula calculation change to
 *     Skill Hit% * (User HIT - Target EVA) for better results.
 *
 *   Accuracy Boost:
 *   - Boost HIT and EVA rates in favor of the player.
 *
 *   Level Up -> Full HP:
 *   Level Up -> Full MP:
 *   - Recovers full HP or MP when an actor levels up.
 *
 * ---
 *
 * Misc
 * 
 *   Anti-Zoom Pictures:
 *   - If on, prevents pictures from being affected by zoom.
 *
 *   Font Shadows:
 *   - If on, text uses shadows instead of outlines.
 *
 *   Font Smoothing:
 *   - If on, smoothes fonts shown in-game.
 *
 *   Key Item Protection:
 *   - If on, prevents Key Items from being able to be sold and from being
 *     able to be consumed.
 *
 *   Modern Controls:
 *   - If on, allows usage of the Home/End buttons.
 *   - Home would scroll to the first item on a list.
 *   - End would scroll to the last item on a list.
 *   - Shift + Up would page up.
 *   - Shift + Down would page down.
 *
 *   No Tile Shadows:
 *   - Removes tile shadows from being displayed in-game.
 *
 *   Pixel Image Rendering:
 *   - If on, pixelates the image rendering (for pixel games).
 *
 *   Require Focus?
 *   - Requires the game to be focused? If the game isn't focused, it will
 *     pause if it's not the active window.
 *
 *   Smart Event Collision:
 *   - Makes events only able to collide with one another if they're
 *    'Same as characters' priority.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Color Settings
 * ============================================================================
 *
 * These settings allow you, the game dev, to have more control over which
 * colors appear for what conditions found in the game. You can use regular
 * numbers to use the colors predetermined by the game's Window Skin or you
 * can use the #rrggbb format for a hex color code.
 *
 * You can find out what hex codes belong to which color from this website:
 * https://htmlcolorcodes.com/
 *
 * ---
 *
 * Basic Colors
 * - These are colors that almost never change and are used globally throughout
 *   the in-game engine.
 *
 *   Normal:
 *   System:
 *   Crisis:
 *   Death:
 *   Gauge Back:
 *   HP Gauge:
 *   MP Gauge:
 *   MP Cost:
 *   Power Up:
 *   Power Down:
 *   CT Gauge:
 *   TP Gauge:
 *   Pending Color:
 *   EXP Gauge:
 *   MaxLv Gauge:
 *   - Use #rrggbb for custom colors or regular numbers
 *   for text colors from the Window Skin.
 *
 * ---
 *
 * Alpha Colors:
 * - These are colors that have a bit of transparency to them and are specified
 *   by the 'rgba(red, green, blue, alpha)' format.
 * - Replace 'red' with a number between 0-255 (integer).
 * - Replace 'green' with a number between 0-255 (integer).
 * - Replace 'blue' with a number between 0-255 (integer).
 * - Replace 'alpha' with a number between 0 and 1 (decimal).
 * 
 *   Outline Color:
 *   Dim Color:
 *   Item Back Color:
 *   - Colors with a bit of alpha settings.
 *   - Format rgba(0-255, 0-255, 0-255, 0-1)
 *
 * ---
 *
 * Conditional Colors:
 * - These require a bit of JavaScript knowledge. These determine what colors
 *   to use under which situations and uses such as different values of HP, MP,
 *   TP, for comparing equipment, and determine damage popup colors.
 * 
 *   JS: Actor HP Color:
 *   JS: Actor MP Color:
 *   JS: Actor TP Color:
 *   - Code used for determining what HP, MP, or TP color to use for actors.
 *
 *   JS: Parameter Change:
 *   - Code used for determining whatcolor to use for parameter changes.
 *
 *   JS: Damage Colors:
 *   - Code used for determining what color to use for damage types.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Gold Settings
 * ============================================================================
 *
 * Gold is the main currency in RPG Maker MZ. The settings provided here will
 * determine how Gold appears in the game and certain behaviors Gold has.
 *
 * ---
 *
 * Gold Settings
 *
 *   Gold Max:
 *   - Maximum amount of Gold the party can hold.
 *   - Default 99999999
 *
 *   Gold Font Size:
 *   - Font size used for displaying Gold inside Gold Windows.
 *   - Default: 26
 *
 *   Gold Icon:
 *   - Icon used to represent Gold.
 *   - Use 0 for no icon.
 *
 *   Gold Overlap:
 *   - Text used too much Gold to fit in the window.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Image Loading
 * ============================================================================
 *
 * Not all images are loaded at once in-game. RPG Maker MZ uses asynchronous
 * loading which means images are loaded when needed. This may cause delays in
 * when you want certain images to appear. However, if an image is loaded
 * beforehand, they can be used immediately provided they aren't removed from
 * the image cache.
 *
 * ---
 *
 * Image Loading
 *
 *   img/animations/:
 *   img/battlebacks1/:
 *   img/battlebacks2/:
 *   img/enemies/:
 *   img/faces/:
 *   img/parallaxes/:
 *   img/pictures/:
 *   img/sv_actors/:
 *   img/sv_enemies/:
 *   img/system/:
 *   img/tilesets/:
 *   img/titles1/:
 *   img/titles2/:
 *   - Which files do you wish to load from this directory upon starting
 *     up the game?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Background Settings
 * ============================================================================
 *
 * These settings in the Plugin Parameters allow you to adjust the background
 * images used for each of the scenes. The images will be taken from the game
 * project folders img/titles1/ and img/titles2/ to load into the game.
 *
 * These settings are only available to scenes found within the Main Menu, the
 * Shop scene, and the Actor Naming scene.
 *
 * ---
 *
 * Menu Background Settings:
 *
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Individual background settings for the scene.
 *
 *   Scene_Unlisted
 *   - Individual background settings for any scenes that aren't listed above.
 *
 * ---
 *
 * Background Settings
 *
 *   Snapshop Opacity:
 *   - Snapshot opacity for the scene.
 *
 *   Background 1:
 *   - Filename used for the bottom background image.
 *   - Leave empty if you don't wish to use one.
 *
 *   Background 2:
 *   - Filename used for the upper background image.
 *   - Leave empty if you don't wish to use one.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Button Assist Window
 * ============================================================================
 *
 * In most modern RPG's, there exist small windows on the screen which tell the
 * player what the control schemes are for that scene. This plugin gives you
 * the option to add that window to the menu scenes in the form of a Button
 * Assist Window.
 *
 * ---
 *
 * General
 * 
 *   Enable:
 *   - Enable the Menu Button Assist Window.
 * 
 *   Location:
 *   - Determine the location of the Button Assist Window.
 *   - Requires Plugin Parameters => UI => Side Buttons ON.
 *
 *   Background Type:
 *   - Select background type for this window.
 *
 * ---
 *
 * Text
 * 
 *   Text Format:
 *   - Format on how the buttons are displayed.
 *   - Text codes allowed. %1 - Key, %2 - Text
 * 
 *   Multi-Key Format:
 *   - Format for actions with multiple keys.
 *   - Text codes allowed. %1 - Key 1, %2 - Key 2
 * 
 *   OK Text:
 *   Cancel Text:
 *   Switch Actor Text:
 *   - Default text used to display these various actions.
 *
 * ---
 *
 * Keys
 * 
 *   Key: Unlisted Format:
 *   - If a key is not listed below, use this format.
 *   - Text codes allowed. %1 - Key
 * 
 *   Key: Up:
 *   Key: Down:
 *   Key: Left:
 *   Key: Right:
 *   Key: A through Z:
 *   - How this key is shown in-game.
 *   - Text codes allowed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Menu Layout Settings
 * ============================================================================
 *
 * These settings allow you to rearrange the positions of the scenes accessible
 * from the Main Menu, the Shop scene, and the Actor Naming scene. This will
 * require you to have some JavaScript knowledge to make the windows work the
 * way you would like.
 *
 * ---
 *
 * Menu Layout Settings
 *
 *   Scene_Title:
 *   Scene_Menu:
 *   Scene_Item:
 *   Scene_Skill:
 *   Scene_Equip:
 *   Scene_Status:
 *   Scene_Options:
 *   Scene_Save:
 *   Scene_Load:
 *   Scene_GameEnd:
 *   Scene_Shop:
 *   Scene_Name:
 *   - Various options on adjusting the selected scene.
 *
 * ---
 *
 * Scene Window Settings
 *
 *   Background Type:
 *   - Selects the background type for the selected window.
 *   - Window
 *   - Dim
 *   - Transparent
 *
 *   JS: X, Y, W, H
 *   - Code used to determine the dimensions for the selected window.
 *
 * ---
 *
 * Scene_Title Settings
 * - The following are settings unique to Scene_Title.
 *
 * Title Screen
 *
 *   Document Title Format:
 *   - Format to display text in document title.
 *   - %1 - Main Title, %2 - Subtitle, %3 - Version
 *
 *   Subtitle:
 *   - Subtitle to be displayed under the title name.
 *   
 *   Version:
 *   - Version to be display in the title screen corner.
 *   
 *   JS: Draw Title:
 *   - Code used to draw the game title.
 *   
 *   JS: Draw Subtitle:
 *   - Code used to draw the game subtitle.
 *   
 *   JS: Draw Version:
 *   - Code used to draw the game version.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *   
 *   Title Picture Buttons:
 *   - Buttons that can be inserted into the title screen.
 *   - Add new title buttons here.
 *   
 *   Button Fade Speed:
 *   - Speed at which the buttons fade in at (1-255).
 *
 * ---
 *
 * Scene_GameEnd Settings
 * - The following are settings unique to Scene_GameEnd.
 *   
 *   Command Window List:
 *   - Window commands used by the title screen.
 *   - Add new commands here.
 *
 * ---
 *
 * Command Window List
 * - This is found under Scene_Title and Scene_GameEnd settings.
 *
 *   Symbol:
 *   - The symbol used for this command.
 * 
 *   STR: Text:
 *   - Displayed text used for this title command.
 *   - If this has a value, ignore the JS: Text version.
 * 
 *   JS: Text:
 *   - JavaScript code used to determine string used for the displayed name.
 * 
 *   JS: Show:
 *   - JavaScript code used to determine if the item is shown or not.
 * 
 *   JS: Enable:
 *   - JavaScript code used to determine if the item is enabled or not.
 * 
 *   JS: Ext:
 *   - JavaScript code used to determine any ext data that should be added.
 * 
 *   JS: Run Code:
 *   - JavaScript code that runs once this command is selected.
 * 
 * ---
 *
 * Title Picture Buttons:
 * - This is found under Scene_Title settings.
 * 
 *   Picture's Filename:
 *   - Filename used for the picture.
 *
 *   Button URL:
 *   - URL for the button to go to upon being clicked.
 *
 *   JS: Position:
 *   - JavaScript code that helps determine the button's Position.
 *
 *   JS: On Load:
 *   - JavaScript code that runs once this button bitmap is loaded.
 *
 *   JS: Run Code:
 *   - JavaScript code that runs once this button is pressed.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Parameter Settings
 * ============================================================================
 *
 * A battler's parameters, or stats as some devs know them as, are the values
 * that determine how a battler performs. These settings allow you to alter
 * their behaviors and give boosts to trait objects in a controlled manner.
 *
 * ---
 *
 * Parameter Settings
 *
 *   Displayed Parameters
 *   - A list of the parameters that will be displayed in-game.
 *   - Shown in the Equip Menu.
 *   - Shown in the Status Menu.
 *
 *   Extended Parameters
 *   - The list shown in extended scenes (for other VisuStella plugins).
 *
 * ---
 *
 * === Basic Parameters ===
 *
 * MHP - MaxHP
 * - This is the maximum health points value. The amount of health points (HP)
 * a battler has determines whether or not the battler is in a living state or
 * a dead state. If the HP value is above 0, then the battler is living. If it
 * is 0 or below, the battler is in a dead state unless the battler has a way
 * to counteract death (usually through immortality). When the battler takes
 * damage, it is usually dealt to the HP value and reduces it. If the battler
 * is healed, then the HP value is increased. The MaxHP value determines what's
 * the maximum amount the HP value can be held at, meaning the battler cannot
 * be healed past that point.
 *
 * MMP - MaxMP
 * - This is the maximum magic points value. Magic points (MP) are typically
 * used for the cost of skills and spells in battle. If the battler has enough
 * MP to fit the cost of the said skill, the battler is able to use the said
 * skill provided that all of the skill's other conditions are met. If not, the
 * battler is then unable to use the skill. Upon using a skill that costs MP,
 * the battler's MP is reduced. However, the battler's MP can be recovered and
 * results in a gain of MP. The MaxMP value determines what is the maximum
 * amount the MP value can be held at, meaning the battler cannot recover MP
 * past the MaxMP value.
 *
 * ATK - Attack
 * - This is the attack value of the battler. By default, this stat is used for
 * the purpose of damage calculations only, and is typically used to represent
 * the battler's physical attack power. Given normal damage formulas, higher
 * values mean higher damage output for physical attacks.
 *
 * DEF - Defense
 * - This is the defense value of the battler. By default, this stat is used
 * for the purpose of damage calculations only, and is typically used to
 * represent the battler's physical defense. Given normal damage formulas,
 * higher values mean less damage received from physical attacks.
 *
 * MAT - Magic Attack
 * - This is the magic attack value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical attack power. Given normal damage formulas,
 * higher values mean higher damage output for magical attacks.
 *
 * MDF - Magic Defense
 * - This is the magic defense value of the battler. By default, this stat is
 * used for the purpose of damage calculations only, and is typically used to
 * represent the battler's magical defense. Given normal damage formulas,
 * higher values mean less damage received from magical attacks.
 *
 * AGI - Agility
 * - This is the agility value of the battler. By default, this stat is used to
 * determine battler's position in the battle turn's order. Given a normal turn
 * calculation formula, the higher the value, the faster the battler is, and
 * the more likely the battler will have its turn earlier in a turn.
 *
 * LUK - Luck
 * - This is the luck value of the battler. By default, this stat is used to
 * affect the success rate of states, buffs, and debuffs applied by the battler
 * and received by the battler. If the user has a higher LUK value, the state,
 * buff, or debuff is more likely to succeed. If the target has a higher LUK
 * value, then the state, buff, or debuff is less likely to succeed.
 *
 * ---
 *
 * Basic Parameters
 *
 *   HP Crisis Rate:
 *   - HP Ratio at which a battler can be considered in crisis mode.
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 8 basic parameters:
 *   - MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 *
 * Parameter Caps:
 *
 *   MaxHP Cap:
 *   MaxMP Cap:
 *   ATK Cap:
 *   DEF Cap:
 *   MAT Cap:
 *   MDF Cap:
 *   AGI Cap:
 *   LUK Cap:
 *   - Formula used to determine the selected parameter's cap.
 *
 * ---
 *
 * === X Parameters ===
 *
 * HIT - Hit Rate%
 * - This determines the physical hit success rate of the any physical action.
 * All physical attacks make a check through the HIT rate to see if the attack
 * will connect. If the HIT value passes the randomizer check, the attack will
 * connect. If the HIT value fails to pass the randomizer check, the attack
 * will be considered a MISS.
 *
 * EVA - Evasion Rate%
 * - This determines the physical evasion rate against any incoming physical
 * actions. If the HIT value passes, the action is then passed to the EVA check
 * through a randomizer check. If the randomizer check passes, the physical
 * attack is evaded and will fail to connect. If the randomizer check passes,
 * the attempt to evade the action will fail and the action connects.
 *
 * CRI - Critical Hit Rate%
 * - Any actions that enable Critical Hits will make a randomizer check with
 * this number. If the randomizer check passes, extra damage will be carried
 * out by the initiated action. If the randomizer check fails, no extra damage
 * will be added upon the action.
 *
 * CEV - Critical Evasion Rate%
 * - This value is put against the Critical Hit Rate% in a multiplicative rate.
 * If the Critical Hit Rate is 90% and the Critical Evasion Rate is
 * 20%, then the randomizer check will make a check against 72% as the values
 * are calculated by the source code as CRI * (1 - CEV), therefore, with values
 * as 0.90 * (1 - 0.20) === 0.72.
 *
 * MEV - Magic Evasion Rate%
 * - Where EVA is the evasion rate against physical actions, MEV is the evasion
 * rate against magical actions. As there is not magical version of HIT, the
 * MEV value will always be bit against when a magical action is initiated. If
 * the randomizer check passes for MEV, the magical action will not connect. If
 * the randomizer check fails for MEV, the magical action will connect.
 *
 * MRF - Magic Reflect Rate%
 * - If a magical action connects and passes, there is a chance the magical
 * action can be bounced back to the caster. That chance is the Magic Reflect
 * Rate. If the randomizer check for the Magic Reflect Rate passes, then the
 * magical action is bounced back to the caster, ignoring the caster's Magic
 * Evasion Rate. If the randomizer check for the Magic Reflect Rate fails, then
 * the magical action will connect with its target.
 *
 * CNT - Counter Attack Rate%
 * - If a physical action connects and passes, there is a chance the physical
 * action can be avoided and a counter attack made by the user will land on the
 * attacking unit. This is the Counter Attack Rate. If the randomizer check for
 * the Counter Attack Rate passes, the physical action is evaded and the target
 * will counter attack the user. If the randomizer check fails, the physical
 * action will connect to the target.
 *
 * HRG - HP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxHP as gained HP with a 100% success rate.
 *
 * MRG - MP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxMP as gained MP with a 100% success rate.
 *
 * TRG - TP% Regeneration
 * - During a battler's regeneration phase, the battler will regenerate this
 * percentage of its MaxTP as gained TP with a 100% success rate.
 *
 * ---
 *
 * X Parameters
 *
 *   JS: Formula:
 *   - Formula used to determine the total value all 10 X parameters:
 *   - HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 *
 * Vocabulary
 *
 *   HIT:
 *   EVA:
 *   CRI:
 *   CEV:
 *   MEV:
 *   MRF:
 *   CNT:
 *   HRG:
 *   MRG:
 *   TRG:
 *   - In-game vocabulary used for the selected X Parameter.
 *
 * ---
 *
 * === S Parameters ===
 *
 * TGR - Target Rate
 * - Against the standard enemy, the Target Rate value determines the odds of
 * an enemy specifically targeting the user for a single target attack. At 0%,
 * the enemy will almost never target the user. At 100%, it will have normal
 * targeting opportunity. At 100%+, the user will have an increased chance of
 * being targeted.
 * *NOTE: For those using the Battle A.I. Core, any actions that have specific
 * target conditions will bypass the TGR rate.
 *
 * GRD - Guard Effect
 * - This is the effectiveness of guarding. This affects the guard divisor
 * value of 2. At 100% GRD, damage will become 'damage / (2 * 1.00)'. At 50%
 * GRD, damage will become 'damage / (2 * 0.50)'. At 200% GRD, damage will
 * become 'damage / (2 * 2.00)' and so forth.
 *
 * REC - Recovery Effect
 * - This is how effective heals are towards the user. The higher the REC rate,
 * the more the user is healed. If a spell were to heal for 100 and the user
 * has 300% REC, then the user is healed for 300 instead.
 *
 * PHA - Pharmacology
 * - This is how effective items are when used by the user. The higher the PHA
 * rate, the more effective the item effect. If the user is using a Potion that
 * recovers 100% on a target ally and the user has 300% PHA, then the target
 * ally will receive healing for 300 instead.
 *
 * MCR - MP Cost Rate
 * - This rate affects how much MP skills with an MP Cost will require to use.
 * If the user has 100% MCR, then the MP Cost will be standard. If the user has
 * 50% MCR, then all skills that cost MP will cost only half the required MP.
 * If the user has 200% MCR, then all skills will cost 200% their MP cost.
 *
 * TCR - TP Charge Rate
 * - This rate affects how much TP skills with an TP will charge when gaining
 * TP through various actions. At 100%, TP will charge normally. At 50%, TP
 * will charge at half speed. At 200%, TP will charge twice as fast.
 *
 * PDR - Physical Damage Rate
 * - This rate affects how much damage the user will take from physical damage.
 * If the user has 100% PDR, then the user takes the normal amount. If the user
 * has 50% PDR, then all physical damage dealt to the user is halved. If the
 * user has 200% PDR, then all physical damage dealt to the user is doubled.
 *
 * MDR - Magical Damage Rate
 * - This rate affects how much damage the user will take from magical damage.
 * If the user has 100% MDR, then the user takes the normal amount. If the user
 * has 50% MDR, then all magical damage dealt to the user is halved. If the
 * user has 200% MDR, then all magical damage dealt to the user is doubled.
 *
 * FDR - Floor Damage Rate
 * - On the field map, this alters how much damage the user will take when the
 * player walks over a tile that damages the party. The FDR value only affects
 * the damage dealt to the particular actor and not the whole party. If FDR is
 * at 100%, then the user takes the full damage. If FDR is at 50%, then only
 * half of the damage goes through. If FDR is at 200%, then floor damage is
 * doubled for that actor.
 *
 * EXR - Experience Rate
 * - This determines the amount of experience gain the user whenever the user
 * gains any kind of EXP. At 100% EXR, the rate of experience gain is normal.
 * At 50%, the experience gain is halved. At 200%, the experience gain for the
 * user is doubled.
 *
 * ---
 *
 * S Parameters
 *
 *   JS: Formula
 *   - Formula used to determine the total value all 10 S parameters:
 *   - TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 *
 * Vocabulary
 *
 *   TGR:
 *   GRD:
 *   REC:
 *   PHA:
 *   MCR:
 *   TCR:
 *   PDR:
 *   MDR:
 *   FDR:
 *   EXR:
 *   - In-game vocabulary used for the selected S Parameter.
 *
 * ---
 *
 * Icons
 * 
 *   Draw Icons?
 *   - Draw icons next to parameter names?
 *
 *   MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK:
 *   HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG:
 *   TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR:
 *   - Icon used for the selected parameter.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: UI Settings
 * ============================================================================
 *
 * In previous iterations of RPG Maker, the Core Engine would allow you to
 * change the screen resolution. In MZ, that functionality is provided by
 * default but a number of UI settings still remain. These settings allow you
 * adjust how certain in-game objects and menus are displayed.
 *
 * ---
 *
 * UI Area
 *
 *   Fade Speed:
 *   - Default fade speed for transitions.
 *
 *   Box Margin:
 *   - Set the margin in pixels for the screen borders.
 *
 *   Command Window Width:
 *   - Sets the width for standard Command Windows.
 *
 *   Bottom Help Window:
 *   - Put the Help Window at the bottom of the screen?
 *
 *   Right Aligned Menus:
 *   - Put most command windows to the right side of the screen.
 *
 *   Show Buttons:
 *   - Show clickable buttons in your game?
 * 
 *     Show Cancel Button:
 *     Show Menu Button:
 *     Show Page Up/Down:
 *     Show Number Buttons:
 *     - Show/hide these respective buttons if the above is enabled.
 *     - If 'Show Buttons' is false, these will be hidden no matter what.
 *
 *   Button Area Height:
 *   - Sets the height for the button area.
 *
 *   Bottom Buttons:
 *   - Put the buttons at the bottom of the screen?
 *
 *   Side Buttons:
 *   - Push buttons to the side of the UI if there is room.
 *
 * ---
 *
 * Larger Resolutions
 * 
 *   Reposition Actors:
 *   - Update the position of actors in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *
 *   Reposition Enemies:
 *   - Update the position of enemies in battle if the screen resolution
 *     has changed to become larger than 816x624.
 *
 * ---
 *
 * Menu Objects
 *
 *   Level -> EXP Gauge:
 *   - Draw an EXP Gauge under the drawn level.
 *
 *   Parameter Arrow:
 *   - The arrow used to show changes in the parameter values.
 *
 * ---
 *
 * Text Code Support
 *
 *   Class Names:
 *   - Make class names support text codes?
 *
 *   Nicknames:
 *   - Make nicknames support text codes?
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Window Settings
 * ============================================================================
 *
 * Adjust the default settings of the windows in-game. This ranges from things
 * such as the line height (to better fit your font size) to the opacity level
 * (to fit your window skins).
 *
 * ---
 *
 * Window Defaults
 * 
 *   Line Height:
 *   - Default line height used for standard windows.
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   Item Padding:
 *   - Default line padding used for standard windows.
 * 
 *   Back Opacity:
 *   - Default back opacity used for standard windows.
 * 
 *   Translucent Opacity:
 *   - Default translucent opacity used for standard windows.
 * 
 *   Window Opening Speed:
 *   - Default open speed used for standard windows.
 *   - Default: 32 (Use a number between 0-255)
 * 
 *   Column Spacing:
 *   - Default column spacing for selectable windows.
 *   - Default: 8
 * 
 *   Row Spacing:
 *   - Default row spacing for selectable windows.
 *   - Default: 4
 *
 * ---
 * 
 * Selectable Items:
 * 
 *   Show Background?:
 *   - Selectable menu items have dark boxes behind them. Show them?
 * 
 *   Item Height Padding:
 *   - Default padding for selectable items.
 * 
 *   JS: Draw Background:
 *   - Code used to draw the background rectangle behind clickable menu objects
 * 
 * ---
 *
 * ============================================================================
 * Plugin Parameters: JS: Quick Functions
 * ============================================================================
 * 
 * WARNING: This feature is highly experimental! Use it at your own risk!
 * 
 * JavaScript Quick Functions allow you to quickly declare functions in the
 * global namespace for ease of access. It's so that these functions can be
 * used in Script Calls, Control Variable Script Inputs, Conditional Branch
 * Script Inputs, Damage Formulas, and more.
 * 
 * ---
 * 
 * JS: Quick Function
 * 
 *   Function Name:
 *   - The function's name in the global namespace.
 *   - Will not overwrite functions/variables of the same name.
 * 
 *   JS: Code:
 *   - Run this code when using the function.
 * 
 * ---
 * 
 * If you have a Function Name of "Example", then typing "Example()" in a
 * Script Call, Conditional Branch Script Input, or similar field will yield
 * whatever the code is instructed to return.
 * 
 * If a function or variable of a similar name already exists in the global
 * namespace, then the quick function will be ignored and not created.
 * 
 * If a quick function contains bad code that would otherwise crash the game,
 * a fail safe has been implemented to prevent it from doing so, display an
 * error log, and then return a 0 value.
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
 * * Yanfly
 * * Arisu
 * * Olivia
 * * Irina
 *
 * ============================================================================
 * Changelog
 * ============================================================================
 * 
 * Version 1.01:
 * * Bug Fixes!
 * ** Digit grouping fixed to allow text codes to detect values larger than
 *    1000. Fix made by Olivia and Yanfly.
 * ** Param Plus, Rate, Flat notetags fixed. Fix made by Yanfly.
 * * New Experimental Feature Added:
 * ** JS: Quick Functions found in the Plugin Parameters
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
 * @command OpenURL
 * @text Game: Open URL
 * @desc Opens a website URL from the game.
 *
 * @arg URL:str
 * @text URL
 * @desc Where do you want to take the player?
 * @default https://www.google.com/
 * 
 * @ --------------------------------------------------------------------------
 *
 * @command GoldChange
 * @text Gold: Gain/Lose
 * @desc Allows you to give/take more gold than the event editor limit.
 *
 * @arg value:eval
 * @text Value
 * @desc How much gold should the player gain/lose?
 * Use negative values to remove gold.
 * @default 0
 *
 * @ --------------------------------------------------------------------------
 *
 * @command PictureEasingType
 * @text Picture: Easing Type
 * @desc Changes the easing type to a number of options.
 *
 * @arg pictureId:num
 * @text Picture ID
 * @type number
 * @min 1
 * @max 100
 * @desc Which picture do you wish to apply this easing to?
 * @default 1
 *
 * @arg easingType:str
 * @text Easing Type
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
 * @default Linear
 *
 * @arg LineBreak
 * @text ------------------------
 * @default --------------------------------
 *
 * @arg Instructions1
 * @text Instructions
 * @default Insert this Plugin Command after
 *
 * @arg Instructions2
 * @text -
 * @default a "Move Picture" event command.
 * 
 * @arg Instructions3
 * @text -
 * @default Turn off "Wait for Completion"
 *
 * @arg Instructions4
 * @text -
 * @default in the "Move Picture" event.
 *
 * @arg Instructions5
 * @text -
 * @default You may have to add in your own
 *
 * @arg Instructions6
 * @text -
 * @default "Wait" event command after.
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetFontSize
 * @text System: Main Font Size
 * @desc Set the game's main font size.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @max 1
 * @desc Change the font size to this number.
 * @default 26
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetSideView
 * @text System: Side View Battle
 * @desc Switch between Front View or Side View for battle.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Front View
 * @value Front View
 * @option Side View
 * @value Side View
 * @option Toggle
 * @value Toggle
 * @desc Choose which view type to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetTimeProgress
 * @text System: Time Progress Battle
 * @desc Switch between Default or Time Progress battle system.
 *
 * @arg option:str
 * @text Change To
 * @type select
 * @option Default Turn Battle
 * @value Default Turn Battle
 * @option Time Progress Battle
 * @value Time Progress Battle
 * @option Toggle
 * @value Toggle
 * @desc Choose which battle system to switch to.
 * @default Toggle
 *
 * @ --------------------------------------------------------------------------
 *
 * @command SystemSetWindowPadding
 * @text System: Window Padding
 * @desc Change the game's window padding amount.
 *
 * @arg option:num
 * @text Change To
 * @type number
 * @max 1
 * @desc Change the game's standard window padding to this value.
 * Default: 12
 * @default 12
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param CoreEngine
 * @default Plugin Parameters
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param QoL:struct
 * @text Quality of Life Settings
 * @type struct<QoLSettings>
 * @desc Quality of Life settings for both developers and players.
 * @default {"PlayTest":"","NewGameBoot:eval":"true","ForceNoPlayTest:eval":"false","OpenConsole:eval":"true","F6key:eval":"true","F7key:eval":"true","NewGameCommonEvent:num":"0","DigitGrouping":"","DigitGroupingStandardText:eval":"true","DigitGroupingExText:eval":"true","DigitGroupingDamageSprites:eval":"true","DigitGroupingGaugeSprites:eval":"true","PlayerBenefit":"","EncounterRateMinimum:num":"10","EscapeAlways:eval":"true","ImprovedAccuracySystem:eval":"true","AccuracyBoost:eval":"true","LevelUpFullHp:eval":"true","LevelUpFullMp:eval":"true","Misc":"","AntiZoomPictures:eval":"true","AutoStretch:str":"stretch","FontShadows:eval":"false","FontSmoothing:eval":"true","KeyItemProtect:eval":"true","ModernControls:eval":"true","NoTileShadows:eval":"true","PixelateImageRendering:eval":"false","RequireFocus:eval":"true","SmartEventCollisionPriority:eval":"true"}
 *
 * @param Color:struct
 * @text Color Settings
 * @type struct<Color>
 * @desc Change the colors used for in-game text.
 * @default {"BasicColors":"","ColorNormal:str":"0","ColorSystem:str":"16","ColorCrisis:str":"17","ColorDeath:str":"18","ColorGaugeBack:str":"19","ColorHPGauge1:str":"20","ColorHPGauge2:str":"21","ColorMPGauge1:str":"22","ColorMPGauge2:str":"23","ColorMPCost:str":"23","ColorPowerUp:str":"24","ColorPowerDown:str":"25","ColorCTGauge1:str":"26","ColorCTGauge2:str":"27","ColorTPGauge1:str":"28","ColorTPGauge2:str":"29","ColorTPCost:str":"29","ColorPending:str":"#2a847d","ColorExpGauge1:str":"30","ColorExpGauge2:str":"31","ColorMaxLvGauge1:str":"14","ColorMaxLvGauge2:str":"6","AlphaColors":"","OutlineColor:str":"rgba(0, 0, 0, 0.6)","DimColor1:str":"rgba(0, 0, 0, 0.6)","DimColor2:str":"rgba(0, 0, 0, 0)","ItemBackColor1:str":"rgba(32, 32, 32, 0.5)","ItemBackColor2:str":"rgba(0, 0, 0, 0.5)","ConditionalColors":"","ActorHPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If the actor is dead, return death color.\\n} else if (actor.isDead()) {\\n    return this.deathColor();\\n\\n// If the actor is dying, return crisis color.\\n} else if (actor.isDying()) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorMPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If MP rate is below 25%, return crisis color.\\n} else if (actor.mpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ActorTPColor:func":"\"// Set the variables used in this function.\\nlet actor = arguments[0];\\n\\n// Check if the actor exists. If not, return normal.\\nif (!actor) {\\n    return this.normalColor();\\n\\n// If TP rate is below 25%, return crisis color.\\n} else if (actor.tpRate() < 0.25) {\\n    return this.crisisColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","ParamChange:func":"\"// Set the variables used in this function.\\nlet change = arguments[0];\\n\\n// If a positive change, use power up color.\\nif (change > 0) {\\n    return this.powerUpColor();\\n\\n// If a negative change, use power down color.\\n} else if (change < 0) {\\n    return this.powerDownColor();\\n\\n// Otherwise, return the normal color.\\n} else {\\n    return this.normalColor();\\n}\"","DamageColor:func":"\"// Set the variables used in this function.\\nlet colorType = arguments[0];\\n\\n// Check the value of the color type\\n// and return an appropriate color.\\nswitch (colorType) {\\n\\n    case 0: // HP damage\\n        return \\\"#ffffff\\\";\\n\\n    case 1: // HP recover\\n        return \\\"#b9ffb5\\\";\\n\\n    case 2: // MP damage\\n        return \\\"#bb88bb\\\";\\n\\n    case 3: // MP recover\\n        return \\\"#80b0ff\\\";\\n\\n    default:\\n        return \\\"#808080\\\";\\n}\""}
 *
 * @param Gold:struct
 * @text Gold Settings
 * @type struct<Gold>
 * @desc Change up how gold operates and is displayed in-game.
 * @default {"GoldMax:num":"999999999","GoldFontSize:num":"24","GoldIcon:num":"314","GoldOverlap:str":"A Lot","ItemStyle:eval":"true"}
 *
 * @param ImgLoad:struct
 * @text Image Loading
 * @type struct<ImgLoad>
 * @desc Game images that will be loaded upon booting up the game.
 * Use this responsibly!!!
 * @default {"animations:arraystr":"[]","battlebacks1:arraystr":"[]","battlebacks2:arraystr":"[]","characters:arraystr":"[]","enemies:arraystr":"[]","faces:arraystr":"[]","parallaxes:arraystr":"[]","pictures:arraystr":"[]","sv_actors:arraystr":"[]","sv_enemies:arraystr":"[]","system:arraystr":"[\"Balloon\",\"IconSet\"]","tilesets:arraystr":"[]","titles1:arraystr":"[]","titles2:arraystr":"[]"}
 *
 * @param MenuBg:struct
 * @text Menu Background Settings
 * @type struct<MenuBg>
 * @desc Change how menu backgrounds look for each scene.
 * @default {"Scene_Menu:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Item:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Skill:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Equip:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Status:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Options:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Save:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Load:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_GameEnd:struct":"{\"SnapshotOpacity:num\":\"128\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Shop:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Name:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}","Scene_Unlisted:struct":"{\"SnapshotOpacity:num\":\"192\",\"BgFilename1:str\":\"\",\"BgFilename2:str\":\"\"}"}
 *
 * @param ButtonAssist:struct
 * @text Menu Button Assist Window
 * @type struct<ButtonAssist>
 * @desc Settings pertaining to the Button Assist window found in in-game menus.
 * @default {"General":"","Enable:eval":"true","Location:str":"bottom","BgType:num":"0","Text":"","TextFmt:str":"%1:%2","MultiKeyFmt:str":"%1/%2","OkText:str":"Select","CancelText:str":"Back","SwitchActorText:str":"Switch Ally","Keys":"","KeyUnlisted:str":"\\}❪%1❫\\{","KeyUP:str":"^","KeyDOWN:str":"v","KeyLEFT:str":"<<","KeyRIGHT:str":">>","KeyA:str":"A","KeyB:str":"B","KeyC:str":"C","KeyD:str":"D","KeyE:str":"E","KeyF:str":"F","KeyG:str":"G","KeyH:str":"H","KeyI:str":"I","KeyJ:str":"J","KeyK:str":"K","KeyL:str":"L","KeyM:str":"M","KeyN:str":"N","KeyO:str":"O","KeyP:str":"P","KeyQ:str":"Q","KeyR:str":"R","KeyS:str":"S","KeyT:str":"T","KeyU:str":"U","KeyV:str":"V","KeyW:str":"W","KeyX:str":"X","KeyY:str":"Y","KeyZ:str":"Z"}
 *
 * @param MenuLayout:struct
 * @text Menu Layout Settings
 * @type struct<MenuLayout>
 * @desc Change how menu layouts look for each scene.
 * @default {"Title:struct":"{\"TitleScreen\":\"\",\"DocumentTitleFmt:str\":\"%1: %2 - Version %3\",\"Subtitle:str\":\"Subtitle\",\"Version:str\":\"0.00\",\"drawGameTitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = $dataSystem.gameTitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 8;\\\\nbitmap.fontSize = 72;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameSubtitle:func\":\"\\\"const x = 20;\\\\nconst y = Graphics.height / 4 + 72;\\\\nconst maxWidth = Graphics.width - x * 2;\\\\nconst text = Scene_Title.subtitle;\\\\nconst bitmap = this._gameTitleSprite.bitmap;\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 6;\\\\nbitmap.fontSize = 48;\\\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\\\\\"center\\\\\\\");\\\"\",\"drawGameVersion:func\":\"\\\"const bitmap = this._gameTitleSprite.bitmap;\\\\nconst x = 0;\\\\nconst y = Graphics.height - 20;\\\\nconst width = Math.round(Graphics.width / 4);\\\\nconst height = 20;\\\\nconst c1 = ColorManager.dimColor1();\\\\nconst c2 = ColorManager.dimColor2();\\\\nconst text = 'Version ' + Scene_Title.version;\\\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\\\nbitmap.fontFace = $gameSystem.mainFontFace();\\\\nbitmap.outlineColor = \\\\\\\"black\\\\\\\";\\\\nbitmap.outlineWidth = 3;\\\\nbitmap.fontSize = 16;\\\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\\\\\"left\\\\\\\");\\\"\",\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"newGame\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.newGame;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandNewGame();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"continue\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.continue_;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return DataManager.isAnySavefileExists();\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandContinue();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"options\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.options;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandOptions();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandRect:func\":\"\\\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\\\nconst rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"TitlePicButtons:arraystruct\":\"[]\",\"ButtonFadeSpeed:num\":\"4\"}","MainMenu:struct":"{\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const width = this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this.mainAreaHeight();\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ItemMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaBottom() - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SkillMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SkillTypeWindow\":\"\",\"SkillTypeBgType:num\":\"0\",\"SkillTypeRect:func\":\"\\\"const rows = 3;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = Graphics.boxWidth - this.mainCommandWidth();\\\\nconst height = this._skillTypeWindow.height;\\\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"const x = 0;\\\\nconst y = this._statusWindow.y + this._statusWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ActorWindow\":\"\",\"ActorBgType:num\":\"0\",\"ActorRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","EquipMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.helpAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.helpAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = this.statusWidth();\\\\nconst height = this.mainAreaHeight();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = this.statusWidth();\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SlotWindow\":\"\",\"SlotBgType:num\":\"0\",\"SlotRect:func\":\"\\\"const commandWindowRect = this.commandWindowRect();\\\\nconst x = this.statusWidth();\\\\nconst y = commandWindowRect.y + commandWindowRect.height;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ItemWindow\":\"\",\"ItemBgType:num\":\"0\",\"ItemRect:func\":\"\\\"return this.slotWindowRect();\\\"\"}","StatusMenu:struct":"{\"ProfileWindow\":\"\",\"ProfileBgType:num\":\"0\",\"ProfileRect:func\":\"\\\"const width = Graphics.boxWidth;\\\\nconst height = this.profileHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.statusParamsWindowRect().y - y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusParamsWindow\":\"\",\"StatusParamsBgType:num\":\"0\",\"StatusParamsRect:func\":\"\\\"const width = this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = 0;\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusEquipWindow\":\"\",\"StatusEquipBgType:num\":\"0\",\"StatusEquipRect:func\":\"\\\"const width = Graphics.boxWidth - this.statusParamsWidth();\\\\nconst height = this.statusParamsHeight();\\\\nconst x = this.statusParamsWidth();\\\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","OptionsMenu:struct":"{\"OptionsWindow\":\"\",\"OptionsBgType:num\":\"0\",\"OptionsRect:func\":\"\\\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\\\nconst width = 400;\\\\nconst height = this.calcWindowHeight(n, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","SaveMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","LoadMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, false);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"ListWindow\":\"\",\"ListBgType:num\":\"0\",\"ListRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","GameEnd:struct":"{\"CommandList:arraystruct\":\"[\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"toTitle\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.toTitle;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\\\\\\\\\"\\\\\\\"}\\\",\\\"{\\\\\\\"Symbol:str\\\\\\\":\\\\\\\"cancel\\\\\\\",\\\\\\\"TextStr:str\\\\\\\":\\\\\\\"Untitled\\\\\\\",\\\\\\\"TextJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return TextManager.cancel;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ShowJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"EnableJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return true;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"ExtJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"return null;\\\\\\\\\\\\\\\"\\\\\\\",\\\\\\\"CallHandlerJS:func\\\\\\\":\\\\\\\"\\\\\\\\\\\\\\\"SceneManager._scene.popScene();\\\\\\\\\\\\\\\"\\\\\\\"}\\\"]\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const rows = 2;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - height) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","ShopMenu:struct":"{\"HelpWindow\":\"\",\"HelpBgType:num\":\"0\",\"HelpRect:func\":\"\\\"const wx = 0;\\\\nconst wy = this.helpAreaTop();\\\\nconst ww = Graphics.boxWidth;\\\\nconst wh = this.helpAreaHeight();\\\\nreturn new Rectangle(wx, wy, ww, wh);\\\"\",\"GoldWindow\":\"\",\"GoldBgType:num\":\"0\",\"GoldRect:func\":\"\\\"const rows = 1;\\\\nconst width = this.mainCommandWidth();\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this.mainAreaTop();\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CommandWindow\":\"\",\"CommandBgType:num\":\"0\",\"CommandRect:func\":\"\\\"const x = 0;\\\\nconst y = this.mainAreaTop();\\\\nconst rows = 1;\\\\nconst width = this._goldWindow.x;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"DummyWindow\":\"\",\"DummyBgType:num\":\"0\",\"DummyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._commandWindow.y + this._commandWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"NumberWindow\":\"\",\"NumberBgType:num\":\"0\",\"NumberRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"StatusWindow\":\"\",\"StatusBgType:num\":\"0\",\"StatusRect:func\":\"\\\"const width = this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nconst x = Graphics.boxWidth - width;\\\\nconst y = this._dummyWindow.y;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"BuyWindow\":\"\",\"BuyBgType:num\":\"0\",\"BuyRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst width = Graphics.boxWidth - this.statusWidth();\\\\nconst height = this._dummyWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"CategoryWindow\":\"\",\"CategoryBgType:num\":\"0\",\"CategoryRect:func\":\"\\\"const x = 0;\\\\nconst y = this._dummyWindow.y;\\\\nconst rows = 1;\\\\nconst width = Graphics.boxWidth;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"SellWindow\":\"\",\"SellBgType:num\":\"0\",\"SellRect:func\":\"\\\"const x = 0;\\\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\\\nconst width = Graphics.boxWidth;\\\\nconst height =\\\\n    this.mainAreaHeight() -\\\\n    this._commandWindow.height -\\\\n    this._categoryWindow.height;\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}","NameMenu:struct":"{\"EditWindow\":\"\",\"EditBgType:num\":\"0\",\"EditRect:func\":\"\\\"const rows = 9;\\\\nconst inputWindoheighteight = this.calcWindowHeight(rows, true);\\\\nconst padding = $gameSystem.windowPadding();\\\\nconst width = 600;\\\\nconst height = ImageManager.faceHeight + padding * 2;\\\\nconst x = (Graphics.boxWidth - width) / 2;\\\\nconst y = (Graphics.boxHeight - (height + inputWindoheighteight + 8)) / 2;\\\\nreturn new Rectangle(x, y, width, height);\\\"\",\"InputWindow\":\"\",\"InputBgType:num\":\"0\",\"InputRect:func\":\"\\\"const x = this._editWindow.x;\\\\nconst y = this._editWindow.y + this._editWindow.height + 8;\\\\nconst rows = 9;\\\\nconst width = this._editWindow.width;\\\\nconst height = this.calcWindowHeight(rows, true);\\\\nreturn new Rectangle(x, y, width, height);\\\"\"}"}
 *
 * @param Param:struct
 * @text Parameter Settings
 * @type struct<Param>
 * @desc Change up the limits of parameters and how they're calculated.
 * @default {"DisplayedParams:arraystr":"[\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","ExtDisplayedParams:arraystr":"[\"MaxHP\",\"MaxMP\",\"ATK\",\"DEF\",\"MAT\",\"MDF\",\"AGI\",\"LUK\"]","BasicParameters":"","CrisisRate:num":"0.25","BasicParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet paramId = arguments[0];\\nlet base = this.paramBase(paramId);\\nlet plus = this.paramPlus(paramId);\\nlet paramRate = this.paramRate(paramId);\\nlet buffRate = this.paramBuffRate(paramId);\\nlet flatBonus = this.paramFlatBonus(paramId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\\n\\n// Determine the limits\\nconst maxValue = this.paramMax(paramId);\\nconst minValue = this.paramMin(paramId);\\n\\n// Final value\\nreturn Math.round(value.clamp(minValue, maxValue));\"","BasicParamCaps":"","BasicActorParamCaps":"","BasicActorParamMax0:str":"9999","BasicActorParamMax1:str":"9999","BasicActorParamMax2:str":"999","BasicActorParamMax3:str":"999","BasicActorParamMax4:str":"999","BasicActorParamMax5:str":"999","BasicActorParamMax6:str":"999","BasicActorParamMax7:str":"999","BasicEnemyParamCaps":"","BasicEnemyParamMax0:str":"999999","BasicEnemyParamMax1:str":"9999","BasicEnemyParamMax2:str":"999","BasicEnemyParamMax3:str":"999","BasicEnemyParamMax4:str":"999","BasicEnemyParamMax5:str":"999","BasicEnemyParamMax6:str":"999","BasicEnemyParamMax7:str":"999","XParameters":"","XParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet xparamId = arguments[0];\\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\\nlet plus = this.xparamPlus(xparamId);\\nlet paramRate = this.xparamRate(xparamId);\\nlet flatBonus = this.xparamFlatBonus(xparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","XParamVocab":"","XParamVocab0:str":"Hit","XParamVocab1:str":"Evasion","XParamVocab2:str":"Critical Rate","XParamVocab3:str":"Critical Evade","XParamVocab4:str":"Magic Evade","XParamVocab5:str":"Magic Reflect","XParamVocab6:str":"Counter","XParamVocab7:str":"HP Regen","XParamVocab8:str":"MP Regen","XParamVocab9:str":"TP Regen","SParameters":"","SParameterFormula:func":"\"// Determine the variables used in this calculation.\\nlet sparamId = arguments[0];\\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\\nlet plus = this.sparamPlus(sparamId);\\nlet paramRate = this.sparamRate(sparamId);\\nlet flatBonus = this.sparamFlatBonus(sparamId);\\n\\n// Formula to determine total parameter value.\\nlet value = (base + plus) * paramRate + flatBonus;\\n\\n// Final value\\nreturn value;\"","SParamVocab":"","SParamVocab0:str":"Aggro","SParamVocab1:str":"Guard","SParamVocab2:str":"Recovery","SParamVocab3:str":"Item Effect","SParamVocab4:str":"MP Cost","SParamVocab5:str":"TP Charge","SParamVocab6:str":"Physical DMG","SParamVocab7:str":"Magical DMG","SParamVocab8:str":"Floor DMG","SParamVocab9:str":"EXP Gain","Icons":"","DrawIcons:eval":"true","IconParam0:str":"84","IconParam1:str":"165","IconParam2:str":"76","IconParam3:str":"81","IconParam4:str":"101","IconParam5:str":"133","IconParam6:str":"140","IconParam7:str":"87","IconXParam0:str":"102","IconXParam1:str":"82","IconXParam2:str":"78","IconXParam3:str":"82","IconXParam4:str":"171","IconXParam5:str":"222","IconXParam6:str":"77","IconXParam7:str":"72","IconXParam8:str":"72","IconXParam9:str":"72","IconSParam0:str":"5","IconSParam1:str":"128","IconSParam2:str":"72","IconSParam3:str":"176","IconSParam4:str":"165","IconSParam5:str":"164","IconSParam6:str":"76","IconSParam7:str":"79","IconSParam8:str":"141","IconSParam9:str":"73"}
 *
 * @param UI:struct
 * @text UI Settings
 * @type struct<UI>
 * @desc Change up various in-game UI aspects.
 * @default {"UIArea":"","FadeSpeed:num":"24","BoxMargin:num":"4","CommandWidth:num":"240","BottomHelp:eval":"false","RightMenus:eval":"true","ShowButtons:eval":"true","cancelShowButton:eval":"true","menuShowButton:eval":"true","pagedownShowButton:eval":"true","numberShowButton:eval":"true","ButtonHeight:num":"52","BottomButtons:eval":"false","SideButtons:eval":"true","LargerResolution":"","RepositionActors:eval":"true","RepositionEnemies:eval":"true","MenuObjects":"","LvExpGauge:eval":"true","ParamArrow:str":"→","TextCodeSupport":"","TextCodeClassNames:eval":"true","TextCodeNicknames:eval":"true"}
 *
 * @param Window:struct
 * @text Window Settings
 * @type struct<Window>
 * @desc Adjust various in-game window settings.
 * @default {"WindowDefaults":"","EnableMasking:eval":"false","LineHeight:num":"36","SelectableItems":"","ShowItemBackground:eval":"true","ItemHeight:num":"8","DrawItemBackgroundJS:func":"\"const rect = arguments[0];\\nconst c1 = ColorManager.itemBackColor1();\\nconst c2 = ColorManager.itemBackColor2();\\nconst x = rect.x;\\nconst y = rect.y;\\nconst w = rect.width;\\nconst h = rect.height;\\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\\nthis.contentsBack.strokeRect(x, y, w, h, c1);\"","ItemPadding:num":"8","BackOpacity:num":"192","TranslucentOpacity:num":"160","OpenSpeed:num":"32","ColSpacing:num":"8","RowSpacing:num":"4"}
 *
 * @param BreakExperimental1
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Experimental Parameters
 * @default Use at your own risk!!!
 *
 * @param BreakExperimental2
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param jsQuickFunc:arraystruct
 * @text JS: Quick Functions
 * @type struct<jsQuickFunc>[]
 * @desc Create quick JavaScript functions available from the
 * global namespace. Use with caution and moderation!!!
 * @default ["{\"FunctionName:str\":\"Example\",\"CodeJS:json\":\"\\\"// Insert this as a function anywhere you can input code\\\\n// such as Script Calls or Conditional Branch Scripts.\\\\n\\\\n// Process Code\\\\nreturn 'Example';\\\"\"}","{\"FunctionName:str\":\"Bad  Code  Name\",\"CodeJS:json\":\"\\\"// If a function name has spaces in them, the spaces will\\\\n// be removed. \\\\\\\"Bad  Code  Name\\\\\\\" becomes \\\\\\\"BadeCodeName\\\\\\\".\\\\n\\\\n// Process Code\\\\nOhNoItsBadCode()\\\\n\\\\n// If a function has bad code, a fail safe will catch the\\\\n// error and display it in the console.\\\"\"}","{\"FunctionName:str\":\"RandomNumber\",\"CodeJS:json\":\"\\\"// This generates a random number from 0 to itself.\\\\n// Example: RandomNumber(10)\\\\n\\\\n// Process Code\\\\nconst number = (arguments[0] || 0) + 1;\\\\nreturn Math.floor(number * Math.random());\\\"\"}","{\"FunctionName:str\":\"RandomBetween\",\"CodeJS:json\":\"\\\"// This generates a random number between two arguments.\\\\n// Example: RandomNumber(5, 10)\\\\n\\\\n// Process Code\\\\nlet min = Math.min(arguments[0] || 0, arguments[1] || 0);\\\\nlet max = Math.max(arguments[0] || 0, arguments[1] || 0);\\\\nreturn Math.floor(Math.random() * (max - min + 1) + min);\\\"\"}","{\"FunctionName:str\":\"RandomFrom\",\"CodeJS:json\":\"\\\"// Selects a number from the list of inserted numbers.\\\\n// Example: RandomFromt(5, 10, 15, 20)\\\\n\\\\n// Process Code\\\\nreturn arguments[Math.randomInt(arguments.length)];\\\"\"}"]
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
 * Quality of Life Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~QoLSettings:
 *
 * @param PlayTest
 * @text Play Test
 *
 * @param NewGameBoot:eval
 * @text New Game on Boot
 * @parent PlayTest
 * @type boolean
 * @on Start New Game
 * @off Keep Title Screen
 * @desc Automatically start a new game on Play Test?
 * Only enabled during Play Test.
 * @default false
 *
 * @param ForceNoPlayTest:eval
 * @text No Play Test Mode
 * @parent PlayTest
 * @type boolean
 * @on Cancel Play Test
 * @off Keep Play Test
 * @desc Force the game to be out of Play Test mode when play testing.
 * @default false
 *
 * @param OpenConsole:eval
 * @text Open Console on Boot
 * @parent PlayTest
 * @type boolean
 * @on Open
 * @off Don't Open
 * @desc Open the Debug Console upon booting up your game?
 * Only enabled during Play Test.
 * @default true
 *
 * @param F6key:eval
 * @text F6: Toggle Sound
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F6 Key Function: Turn on all sound to 100% or to 0%,
 * toggling between the two.
 * @default true
 *
 * @param F7key:eval
 * @text F7: Toggle Fast Mode
 * @parent PlayTest
 * @type boolean
 * @on Enable
 * @off Don't
 * @desc F7 Key Function: Toggle fast mode.
 * @default true
 *
 * @param NewGameCommonEvent:num
 * @text NewGame > CommonEvent
 * @parent PlayTest
 * @type common_event
 * @desc Runs a common event each time a new game is started.
 * @default 0
 *
 * @param DigitGrouping
 * @text Digit Grouping
 *
 * @param DigitGroupingStandardText:eval
 * @text Standard Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * standard text inside windows?
 * @default true
 *
 * @param DigitGroupingExText:eval
 * @text Ex Text
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * ex text, written through drawTextEx (like messages)?
 * @default true
 *
 * @param DigitGroupingDamageSprites:eval
 * @text Damage Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * in-battle damage sprites?
 * @default true
 *
 * @param DigitGroupingGaugeSprites:eval
 * @text Gauge Sprites
 * @parent DigitGrouping
 * @type boolean
 * @on Enable
 * @off Disable
 * @desc Make numbers like 1234567 appear like 1,234,567 for
 * visible gauge sprites such as HP, MP, and TP gauges?
 * @default true
 *
 * @param PlayerBenefit
 * @text Player Benefit
 *
 * @param EncounterRateMinimum:num
 * @text Encounter Rate Min
 * @parent PlayerBenefit
 * @min 0
 * @desc Minimum number of steps the player can take without any random encounters.
 * @default 10
 *
 * @param EscapeAlways:eval
 * @text Escape Always
 * @parent PlayerBenefit
 * @type boolean
 * @on Always
 * @off Default
 * @desc If the player wants to escape a battle, let them escape the battle with 100% chance.
 * @default true
 *
 * @param ImprovedAccuracySystem:eval
 * @text Accuracy Formula
 * @parent PlayerBenefit
 * @type boolean
 * @on Improve
 * @off Default
 * @desc Accuracy formula calculation change to
 * Skill Hit% * (User HIT - Target EVA) for better results.
 * @default true
 *
 * @param AccuracyBoost:eval
 * @text Accuracy Boost
 * @parent PlayerBenefit
 * @type boolean
 * @on Boost
 * @off Default
 * @desc Boost HIT and EVA rates in favor of the player.
 * @default true
 *
 * @param LevelUpFullHp:eval
 * @text Level Up -> Full HP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full HP when an actor levels up.
 * @default true
 *
 * @param LevelUpFullMp:eval
 * @text Level Up -> Full MP
 * @parent PlayerBenefit
 * @type boolean
 * @on Heal
 * @off Default
 * @desc Recovers full MP when an actor levels up.
 * @default true
 *
 * @param Misc
 * @text Misc
 *
 * @param AntiZoomPictures:eval
 * @text Anti-Zoom Pictures
 * @parent Misc
 * @type boolean
 * @on Anti-Zoom
 * @off Normal
 * @desc If on, prevents pictures from being affected by zoom.
 * @default true
 *
 * @param AutoStretch:str
 * @text Auto-Stretch
 * @parent Misc
 * @type select
 * @option Default
 * @value default
 * @option Stretch
 * @value stretch
 * @option Normal
 * @value normal
 * @desc Automatically stretch the game to fit the size of the client?
 * @default default
 *
 * @param FontShadows:eval
 * @text Font Shadows
 * @parent Misc
 * @type boolean
 * @on Shadows
 * @off Outlines
 * @desc If on, text uses shadows instead of outlines.
 * @default false
 *
 * @param FontSmoothing:eval
 * @text Font Smoothing
 * @parent Misc
 * @type boolean
 * @on Smooth
 * @off None
 * @desc If on, smoothes fonts shown in-game.
 * @default true
 *
 * @param KeyItemProtect:eval
 * @text Key Item Protection
 * @parent Misc
 * @type boolean
 * @on Unsellable
 * @off Sellable
 * @desc If on, prevents Key Items from being able to be sold and from being able to be consumed.
 * @default true
 *
 * @param ModernControls:eval
 * @text Modern Controls
 * @parent Misc
 * @type boolean
 * @on Enable
 * @off Default
 * @desc If on, allows usage of the Home/End buttons as well as other modern configs. Affects other VisuStella plugins.
 * @default true
 *
 * @param NoTileShadows:eval
 * @text No Tile Shadows
 * @parent Misc
 * @type boolean
 * @on Disable Tile Shadows
 * @off Default
 * @desc Removes tile shadows from being displayed in-game.
 * @default false
 *
 * @param PixelateImageRendering:eval
 * @text Pixel Image Rendering
 * @parent Misc
 * @type boolean
 * @on Pixelate
 * @off Smooth
 * @desc If on, pixelates the image rendering (for pixel games).
 * @default false
 *
 * @param RequireFocus:eval
 * @text Require Focus?
 * @parent Misc
 * @type boolean
 * @on Require
 * @off No Requirement
 * @desc Requires the game to be focused? If the game isn't
 * focused, it will pause if it's not the active window.
 * @default true
 *
 * @param SmartEventCollisionPriority:eval
 * @text Smart Event Collision
 * @parent Misc
 * @type boolean
 * @on Only Same Level
 * @off Default
 * @desc Makes events only able to collide with one another if they're 'Same as characters' priority.
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Color Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Color:
 *
 * @param BasicColors
 * @text Basic Colors
 *
 * @param ColorNormal:str
 * @text Normal
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorSystem:str
 * @text System
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 16
 *
 * @param ColorCrisis:str
 * @text Crisis
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 17
 *
 * @param ColorDeath:str
 * @text Death
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 18
 *
 * @param ColorGaugeBack:str
 * @text Gauge Back
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 19
 *
 * @param ColorHPGauge1:str
 * @text HP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 20
 *
 * @param ColorHPGauge2:str
 * @text HP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 21
 *
 * @param ColorMPGauge1:str
 * @text MP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 22
 *
 * @param ColorMPGauge2:str
 * @text MP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorMPCost:str
 * @text MP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 23
 *
 * @param ColorPowerUp:str
 * @text Power Up
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorPowerDown:str
 * @text Power Down
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 25
 *
 * @param ColorCTGauge1:str
 * @text CT Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 26
 *
 * @param ColorCTGauge2:str
 * @text CT Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param ColorTPGauge1:str
 * @text TP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 28
 *
 * @param ColorTPGauge2:str
 * @text TP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorTPCost:str
 * @text TP Cost
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 29
 *
 * @param ColorPending:str
 * @text Pending Color
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default #2a847d
 *
 * @param ColorExpGauge1:str
 * @text EXP Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 30
 *
 * @param ColorExpGauge2:str
 * @text EXP Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 31
 *
 * @param ColorMaxLvGauge1:str
 * @text MaxLv Gauge 1
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 14
 *
 * @param ColorMaxLvGauge2:str
 * @text MaxLv Gauge 2
 * @parent BasicColors
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 6
 *
 * @param AlphaColors
 * @text Alpha Colors
 *
 * @param OutlineColor:str
 * @text Outline Color
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor1:str
 * @text Dim Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.6)
 *
 * @param DimColor2:str
 * @text Dim Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0)
 *
 * @param ItemBackColor1:str
 * @text Item Back Color 1
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(32, 32, 32, 0.5)
 *
 * @param ItemBackColor2:str
 * @text Item Back Color 2
 * @parent AlphaColors
 * @desc Colors with a bit of alpha settings.
 * Format rgba(0-255, 0-255, 0-255, 0-1)
 * @default rgba(0, 0, 0, 0.5)
 *
 * @param ConditionalColors
 * @text Conditional Colors
 *
 * @param ActorHPColor:func
 * @text JS: Actor HP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what HP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If the actor is dead, return death color.\n} else if (actor.isDead()) {\n    return this.deathColor();\n\n// If the actor is dying, return crisis color.\n} else if (actor.isDying()) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorMPColor:func
 * @text JS: Actor MP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what MP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If MP rate is below 25%, return crisis color.\n} else if (actor.mpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ActorTPColor:func
 * @text JS: Actor TP Color
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what TP color to use for actors.
 * @default "// Set the variables used in this function.\nlet actor = arguments[0];\n\n// Check if the actor exists. If not, return normal.\nif (!actor) {\n    return this.normalColor();\n\n// If TP rate is below 25%, return crisis color.\n} else if (actor.tpRate() < 0.25) {\n    return this.crisisColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param ParamChange:func
 * @text JS: Parameter Change
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining whatcolor to use for parameter changes.
 * @default "// Set the variables used in this function.\nlet change = arguments[0];\n\n// If a positive change, use power up color.\nif (change > 0) {\n    return this.powerUpColor();\n\n// If a negative change, use power down color.\n} else if (change < 0) {\n    return this.powerDownColor();\n\n// Otherwise, return the normal color.\n} else {\n    return this.normalColor();\n}"
 *
 * @param DamageColor:func
 * @text JS: Damage Colors
 * @type note
 * @parent ConditionalColors
 * @desc Code used for determining what color to use for damage types.
 * @default "// Set the variables used in this function.\nlet colorType = arguments[0];\n\n// Check the value of the color type\n// and return an appropriate color.\nswitch (colorType) {\n\n    case 0: // HP damage\n        return \"#ffffff\";\n\n    case 1: // HP recover\n        return \"#b9ffb5\";\n\n    case 2: // MP damage\n        return \"#bb88bb\";\n\n    case 3: // MP recover\n        return \"#80b0ff\";\n\n    default:\n        return \"#808080\";\n}"
 */
/* ----------------------------------------------------------------------------
 * Gold Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Gold:
 *
 * @param GoldMax:num
 * @text Gold Max
 * @type num
 * @min 1
 * @desc Maximum amount of Gold the party can hold.
 * Default 99999999
 * @default 99999999
 *
 * @param GoldFontSize:num
 * @text Gold Font Size
 * @type number
 * @min 1
 * @desc Font size used for displaying Gold inside Gold Windows.
 * Default: 26
 * @default 24
 *
 * @param GoldIcon:num
 * @text Gold Icon
 * @desc Icon used to represent Gold.
 * Use 0 for no icon.
 * @default 314
 *
 * @param GoldOverlap:str
 * @text Gold Overlap
 * @desc Text used too much Gold to fit in the window.
 * @default A Lot
 *
 * @param ItemStyle:eval
 * @text Item Style
 * @type boolean
 * @on Enable
 * @off Normal
 * @desc Draw gold in the item style?
 * ie: Icon, Label, Value
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Image Loading Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ImgLoad:
 *
 * @param animations:arraystr
 * @text img/animations/
 * @type file[]
 * @dir img/animations/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks1:arraystr
 * @text img/battlebacks1/
 * @type file[]
 * @dir img/battlebacks1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param battlebacks2:arraystr
 * @text img/battlebacks2/
 * @type file[]
 * @dir img/battlebacks2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param characters:arraystr
 * @text img/characters/
 * @type file[]
 * @dir img/characters/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param enemies:arraystr
 * @text img/enemies/
 * @type file[]
 * @dir img/enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param faces:arraystr
 * @text img/faces/
 * @type file[]
 * @dir img/faces/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param parallaxes:arraystr
 * @text img/parallaxes/
 * @type file[]
 * @dir img/parallaxes/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param pictures:arraystr
 * @text img/pictures/
 * @type file[]
 * @dir img/pictures/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_actors:arraystr
 * @text img/sv_actors/
 * @type file[]
 * @dir img/sv_actors/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param sv_enemies:arraystr
 * @text img/sv_enemies/
 * @type file[]
 * @dir img/sv_enemies/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param system:arraystr
 * @text img/system/
 * @type file[]
 * @dir img/system/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default ["Balloon","IconSet"]
 *
 * @param tilesets:arraystr
 * @text img/tilesets/
 * @type file[]
 * @dir img/tilesets/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles1:arraystr
 * @text img/titles1/
 * @type file[]
 * @dir img/titles1/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 * @param titles2:arraystr
 * @text img/titles2/
 * @type file[]
 * @dir img/titles2/
 * @desc Which files do you wish to load from this directory upon
 * starting up the game?
 * @default []
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuBg:
 *
 * @param Scene_Menu:struct
 * @text Scene_Menu
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Item:struct
 * @text Scene_Item
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Skill:struct
 * @text Scene_Skill
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Equip:struct
 * @text Scene_Equip
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Status:struct
 * @text Scene_Status
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Options:struct
 * @text Scene_Options
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Save:struct
 * @text Scene_Save
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Load:struct
 * @text Scene_Load
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_GameEnd:struct
 * @text Scene_GameEnd
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"128","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Shop:struct
 * @text Scene_Shop
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Name:struct
 * @text Scene_Name
 * @type struct<BgSettings>
 * @desc The individual background settings for this scene.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 * @param Scene_Unlisted:struct
 * @text Scene_Unlisted
 * @type struct<BgSettings>
 * @desc The individual background settings for any scenes that aren't listed here.
 * @default {"SnapshotOpacity:num":"192","BgFilename1:str":"","BgFilename2:str":""}
 *
 */
/* ----------------------------------------------------------------------------
 * Background Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~BgSettings:
 *
 * @param SnapshotOpacity:num
 * @text Snapshop Opacity
 * @type number
 * @min 0
 * @max 255
 * @desc Snapshot opacity for the scene.
 * @default 192
 *
 * @param BgFilename1:str
 * @text Background 1
 * @type file
 * @dir img/titles1/
 * @desc Filename used for the bottom background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 * @param BgFilename2:str
 * @text Background 2
 * @type file
 * @dir img/titles2/
 * @desc Filename used for the upper background image.
 * Leave empty if you don't wish to use one.
 * @default 
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Button Assist Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ButtonAssist:
 *
 * @param General
 *
 * @param Enable:eval
 * @text Enable
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Enable the Menu Button Assist Window.
 * @default true
 *
 * @param Location:str
 * @text Location
 * @parent General
 * @type select
 * @option Top of Screen
 * @value top
 * @option Bottom of Screen
 * @value bottom
 * @desc Determine the location of the Button Assist Window.
 * Requires Plugin Parameters => UI => Side Buttons ON.
 * @default bottom
 *
 * @param BgType:num
 * @text Background Type
 * @parent General
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param Text
 *
 * @param TextFmt:str
 * @text Text Format
 * @parent Text
 * @desc Format on how the buttons are displayed.
 * Text codes allowed. %1 - Key, %2 - Text
 * @default %1:%2
 *
 * @param MultiKeyFmt:str
 * @text Multi-Key Format
 * @parent Text
 * @desc Format for actions with multiple keys.
 * Text codes allowed. %1 - Key 1, %2 - Key 2
 * @default %1/%2
 *
 * @param OkText:str
 * @text OK Text
 * @parent Text
 * @desc Default text used to display OK Key Action.
 * Text codes allowed.
 * @default Select
 *
 * @param CancelText:str
 * @text Cancel Text
 * @parent Text
 * @desc Default text used to display Cancel Key Action.
 * Text codes allowed.
 * @default Back
 *
 * @param SwitchActorText:str
 * @text Switch Actor Text
 * @parent Text
 * @desc Default text used to display Switch Actor Action.
 * Text codes allowed.
 * @default Switch Ally
 *
 * @param Keys
 *
 * @param KeyUnlisted:str
 * @text Key: Unlisted Format
 * @parent Keys
 * @desc If a key is not listed below, use this format.
 * Text codes allowed. %1 - Key
 * @default \}❪%1❫\{
 *
 * @param KeyUP:str
 * @text Key: Up
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default ^
 *
 * @param KeyDOWN:str
 * @text Key: Down
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default v
 *
 * @param KeyLEFT:str
 * @text Key: Left
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default <<
 *
 * @param KeyRIGHT:str
 * @text Key: Right
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default >>
 *
 * @param KeyA:str
 * @text Key: A
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default A
 *
 * @param KeyB:str
 * @text Key: B
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default B
 *
 * @param KeyC:str
 * @text Key: C
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default C
 *
 * @param KeyD:str
 * @text Key: D
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default D
 *
 * @param KeyE:str
 * @text Key: E
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default E
 *
 * @param KeyF:str
 * @text Key: F
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default F
 *
 * @param KeyG:str
 * @text Key: G
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default G
 *
 * @param KeyH:str
 * @text Key: H
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default H
 *
 * @param KeyI:str
 * @text Key: I
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default I
 *
 * @param KeyJ:str
 * @text Key: J
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default J
 *
 * @param KeyK:str
 * @text Key: K
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default K
 *
 * @param KeyL:str
 * @text Key: L
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default L
 *
 * @param KeyM:str
 * @text Key: M
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default M
 *
 * @param KeyN:str
 * @text Key: N
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default N
 *
 * @param KeyO:str
 * @text Key: O
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default O
 *
 * @param KeyP:str
 * @text Key: P
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default P
 *
 * @param KeyQ:str
 * @text Key: Q
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Q
 *
 * @param KeyR:str
 * @text Key: R
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default R
 *
 * @param KeyS:str
 * @text Key: S
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default S
 *
 * @param KeyT:str
 * @text Key: T
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default T
 *
 * @param KeyU:str
 * @text Key: U
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default U
 *
 * @param KeyV:str
 * @text Key: V
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default V
 *
 * @param KeyW:str
 * @text Key: W
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default W
 *
 * @param KeyX:str
 * @text Key: X
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default X
 *
 * @param KeyY:str
 * @text Key: Y
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Y
 *
 * @param KeyZ:str
 * @text Key: Z
 * @parent Keys
 * @desc How this key is shown in-game.
 * Text codes allowed.
 * @default Z
 *
 */
/* ----------------------------------------------------------------------------
 * Menu Layout Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MenuLayout:
 *
 * @param Title:struct
 * @text Scene_Title
 * @parent SceneSettings
 * @type struct<Title>
 * @desc Various options on adjusting the Title Scene.
 * @default {"TitleScreen":"","DocumentTitleFmt:str":"%1: %2 - Version %3","Subtitle:str":"Subtitle","Version:str":"0.00","drawGameTitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = $dataSystem.gameTitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 8;\\nbitmap.fontSize = 72;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameSubtitle:func":"\"const x = 20;\\nconst y = Graphics.height / 4 + 72;\\nconst maxWidth = Graphics.width - x * 2;\\nconst text = Scene_Title.subtitle;\\nconst bitmap = this._gameTitleSprite.bitmap;\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 6;\\nbitmap.fontSize = 48;\\nbitmap.drawText(text, x, y, maxWidth, 48, \\\"center\\\");\"","drawGameVersion:func":"\"const bitmap = this._gameTitleSprite.bitmap;\\nconst x = 0;\\nconst y = Graphics.height - 20;\\nconst width = Math.round(Graphics.width / 4);\\nconst height = 20;\\nconst c1 = ColorManager.dimColor1();\\nconst c2 = ColorManager.dimColor2();\\nconst text = 'Version ' + Scene_Title.version;\\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\\nbitmap.fontFace = $gameSystem.mainFontFace();\\nbitmap.outlineColor = \\\"black\\\";\\nbitmap.outlineWidth = 3;\\nbitmap.fontSize = 16;\\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \\\"left\\\");\"","CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"newGame\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.newGame;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandNewGame();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"continue\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.continue_;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return DataManager.isAnySavefileExists();\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandContinue();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"options\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.options;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandOptions();\\\\\\\"\\\"}\"]","CommandRect:func":"\"const offsetX = $dataSystem.titleCommandWindow.offsetX;\\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\\nconst rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\\nconst y = Graphics.boxHeight - height - 96 + offsetY;\\nreturn new Rectangle(x, y, width, height);\"","TitlePicButtons:arraystruct":"[]","ButtonFadeSpeed:num":"4"}
 *
 * @param MainMenu:struct
 * @text Scene_Menu
 * @parent SceneSettings
 * @type struct<MainMenu>
 * @desc Various options on adjusting the Main Menu Scene.
 * @default {"CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const width = this.mainCommandWidth();\\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this.mainAreaHeight();\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ItemMenu:struct
 * @text Scene_Item
 * @parent SceneSettings
 * @type struct<ItemMenu>
 * @desc Various options on adjusting the Item Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaBottom() - y;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SkillMenu:struct
 * @text Scene_Skill
 * @parent SceneSettings
 * @type struct<SkillMenu>
 * @desc Various options on adjusting the Skill Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","SkillTypeWindow":"","SkillTypeBgType:num":"0","SkillTypeRect:func":"\"const rows = 3;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = Graphics.boxWidth - this.mainCommandWidth();\\nconst height = this._skillTypeWindow.height;\\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"const x = 0;\\nconst y = this._statusWindow.y + this._statusWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._statusWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","ActorWindow":"","ActorBgType:num":"0","ActorRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param EquipMenu:struct
 * @text Scene_Equip
 * @parent SceneSettings
 * @type struct<EquipMenu>
 * @desc Various options on adjusting the Equip Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.helpAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.helpAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = this.statusWidth();\\nconst height = this.mainAreaHeight();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = this.statusWidth();\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SlotWindow":"","SlotBgType:num":"0","SlotRect:func":"\"const commandWindowRect = this.commandWindowRect();\\nconst x = this.statusWidth();\\nconst y = commandWindowRect.y + commandWindowRect.height;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this.mainAreaHeight() - commandWindowRect.height;\\nreturn new Rectangle(x, y, width, height);\"","ItemWindow":"","ItemBgType:num":"0","ItemRect:func":"\"return this.slotWindowRect();\""}
 *
 * @param StatusMenu:struct
 * @text Scene_Status
 * @parent SceneSettings
 * @type struct<StatusMenu>
 * @desc Various options on adjusting the Status Menu Scene.
 * @default {"ProfileWindow":"","ProfileBgType:num":"0","ProfileRect:func":"\"const width = Graphics.boxWidth;\\nconst height = this.profileHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst width = Graphics.boxWidth;\\nconst height = this.statusParamsWindowRect().y - y;\\nreturn new Rectangle(x, y, width, height);\"","StatusParamsWindow":"","StatusParamsBgType:num":"0","StatusParamsRect:func":"\"const width = this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = 0;\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\"","StatusEquipWindow":"","StatusEquipBgType:num":"0","StatusEquipRect:func":"\"const width = Graphics.boxWidth - this.statusParamsWidth();\\nconst height = this.statusParamsHeight();\\nconst x = this.statusParamsWidth();\\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param OptionsMenu:struct
 * @text Scene_Options
 * @parent SceneSettings
 * @type struct<OptionsMenu>
 * @desc Various options on adjusting the Options Menu Scene.
 * @default {"OptionsWindow":"","OptionsBgType:num":"0","OptionsRect:func":"\"const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\\nconst width = 400;\\nconst height = this.calcWindowHeight(n, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param SaveMenu:struct
 * @text Scene_Save
 * @parent SceneSettings
 * @type struct<SaveMenu>
 * @desc Various options on adjusting the Save Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param LoadMenu:struct
 * @text Scene_Load
 * @parent SceneSettings
 * @type struct<LoadMenu>
 * @desc Various options on adjusting the Load Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, false);\\nreturn new Rectangle(x, y, width, height);\"","ListWindow":"","ListBgType:num":"0","ListRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop() + this._helpWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._helpWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param GameEnd:struct
 * @text Scene_GameEnd
 * @parent SceneSettings
 * @type struct<GameEnd>
 * @desc Various options on adjusting the Game End Scene.
 * @default {"CommandList:arraystruct":"[\"{\\\"Symbol:str\\\":\\\"toTitle\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.toTitle;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.commandToTitle();\\\\\\\"\\\"}\",\"{\\\"Symbol:str\\\":\\\"cancel\\\",\\\"TextStr:str\\\":\\\"Untitled\\\",\\\"TextJS:func\\\":\\\"\\\\\\\"return TextManager.cancel;\\\\\\\"\\\",\\\"ShowJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"EnableJS:func\\\":\\\"\\\\\\\"return true;\\\\\\\"\\\",\\\"ExtJS:func\\\":\\\"\\\\\\\"return null;\\\\\\\"\\\",\\\"CallHandlerJS:func\\\":\\\"\\\\\\\"SceneManager._scene.popScene();\\\\\\\"\\\"}\"]","CommandBgType:num":"0","CommandRect:func":"\"const rows = 2;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (Graphics.boxHeight - height) / 2;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param ShopMenu:struct
 * @text Scene_Shop
 * @parent SceneSettings
 * @type struct<ShopMenu>
 * @desc Various options on adjusting the Shop Menu Scene.
 * @default {"HelpWindow":"","HelpBgType:num":"0","HelpRect:func":"\"const wx = 0;\\nconst wy = this.helpAreaTop();\\nconst ww = Graphics.boxWidth;\\nconst wh = this.helpAreaHeight();\\nreturn new Rectangle(wx, wy, ww, wh);\"","GoldWindow":"","GoldBgType:num":"0","GoldRect:func":"\"const rows = 1;\\nconst width = this.mainCommandWidth();\\nconst height = this.calcWindowHeight(rows, true);\\nconst x = Graphics.boxWidth - width;\\nconst y = this.mainAreaTop();\\nreturn new Rectangle(x, y, width, height);\"","CommandWindow":"","CommandBgType:num":"0","CommandRect:func":"\"const x = 0;\\nconst y = this.mainAreaTop();\\nconst rows = 1;\\nconst width = this._goldWindow.x;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","DummyWindow":"","DummyBgType:num":"0","DummyRect:func":"\"const x = 0;\\nconst y = this._commandWindow.y + this._commandWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height = this.mainAreaHeight() - this._commandWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","NumberWindow":"","NumberBgType:num":"0","NumberRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","StatusWindow":"","StatusBgType:num":"0","StatusRect:func":"\"const width = this.statusWidth();\\nconst height = this._dummyWindow.height;\\nconst x = Graphics.boxWidth - width;\\nconst y = this._dummyWindow.y;\\nreturn new Rectangle(x, y, width, height);\"","BuyWindow":"","BuyBgType:num":"0","BuyRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst width = Graphics.boxWidth - this.statusWidth();\\nconst height = this._dummyWindow.height;\\nreturn new Rectangle(x, y, width, height);\"","CategoryWindow":"","CategoryBgType:num":"0","CategoryRect:func":"\"const x = 0;\\nconst y = this._dummyWindow.y;\\nconst rows = 1;\\nconst width = Graphics.boxWidth;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\"","SellWindow":"","SellBgType:num":"0","SellRect:func":"\"const x = 0;\\nconst y = this._categoryWindow.y + this._categoryWindow.height;\\nconst width = Graphics.boxWidth;\\nconst height =\\n    this.mainAreaHeight() -\\n    this._commandWindow.height -\\n    this._categoryWindow.height;\\nreturn new Rectangle(x, y, width, height);\""}
 *
 * @param NameMenu:struct
 * @text Scene_Name
 * @parent SceneSettings
 * @type struct<NameMenu>
 * @desc Various options on adjusting the Actor Rename Scene.
 * @default {"EditWindow":"","EditBgType:num":"0","EditRect:func":"\"const rows = 9;\\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\\nconst padding = $gameSystem.windowPadding();\\nconst width = 600;\\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\\nconst x = (Graphics.boxWidth - width) / 2;\\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2;\\nreturn new Rectangle(x, y, width, height);\"","InputWindow":"","InputBgType:num":"0","InputRect:func":"\"const x = this._editWindow.x;\\nconst y = this._editWindow.y + this._editWindow.height;\\nconst rows = 9;\\nconst width = this._editWindow.width;\\nconst height = this.calcWindowHeight(rows, true);\\nreturn new Rectangle(x, y, width, height);\""}
 *
 */
/* ----------------------------------------------------------------------------
 * Main Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~MainMenu:
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.mainCommandWidth();\nconst height = this.mainAreaHeight() - this.goldWindowRect().height;\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this.mainAreaHeight();\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Item Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ItemMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaBottom() - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SkillMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param SkillTypeBgType:num
 * @text Background Type
 * @parent SkillTypeWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SkillTypeRect:func
 * @text JS: X, Y, W, H
 * @parent SkillTypeWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = this.isRightInputMode() ? Graphics.boxWidth - width : 0;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.mainCommandWidth();\nconst height = this._skillTypeWindow.height;\nconst x = this.isRightInputMode() ? 0 : Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._statusWindow.y + this._statusWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._statusWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ActorWindow
 * @text Actor Window
 *
 * @param ActorBgType:num
 * @text Background Type
 * @parent ActorWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ActorRect:func
 * @text JS: X, Y, W, H
 * @parent ActorWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Equip Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~EquipMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.helpAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.helpAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = this.statusWidth();\nconst height = this.mainAreaHeight();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this.statusWidth();\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SlotWindow
 * @text Slot Window
 *
 * @param SlotBgType:num
 * @text Background Type
 * @parent SlotWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SlotRect:func
 * @text JS: X, Y, W, H
 * @parent SlotWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const commandWindowRect = this.commandWindowRect();\nconst x = this.statusWidth();\nconst y = commandWindowRect.y + commandWindowRect.height;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this.mainAreaHeight() - commandWindowRect.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ItemWindow
 * @text Item Window
 *
 * @param ItemBgType:num
 * @text Background Type
 * @parent ItemWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ItemRect:func
 * @text JS: X, Y, W, H
 * @parent ItemWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "return this.slotWindowRect();"
 *
 */
/* ----------------------------------------------------------------------------
 * Status Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~StatusMenu:
 *
 * @param ProfileWindow
 * @text Profile Window
 *
 * @param ProfileBgType:num
 * @text Background Type
 * @parent ProfileWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ProfileRect:func
 * @text JS: X, Y, W, H
 * @parent ProfileWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth;\nconst height = this.profileHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst width = Graphics.boxWidth;\nconst height = this.statusParamsWindowRect().y - y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusParamsWindow
 * @text Parameters Window
 *
 * @param StatusParamsBgType:num
 * @text Background Type
 * @parent StatusParamsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusParamsRect:func
 * @text JS: X, Y, W, H
 * @parent StatusParamsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = 0;\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusEquipWindow
 * @text Equipment Window
 *
 * @param StatusEquipBgType:num
 * @text Background Type
 * @parent StatusEquipWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusEquipRect:func
 * @text JS: X, Y, W, H
 * @parent StatusEquipWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = Graphics.boxWidth - this.statusParamsWidth();\nconst height = this.statusParamsHeight();\nconst x = this.statusParamsWidth();\nconst y = this.mainAreaBottom() - this.profileHeight() - height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Options Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~OptionsMenu:
 *
 * @param OptionsWindow
 * @text Options Window
 *
 * @param OptionsBgType:num
 * @text Background Type
 * @parent OptionsWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param OptionsRect:func
 * @text JS: X, Y, W, H
 * @parent OptionsWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const n = Math.min(this.maxCommands(), this.maxVisibleCommands());\nconst width = 400;\nconst height = this.calcWindowHeight(n, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Save Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~SaveMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Load Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~LoadMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, false);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListBgType:num
 * @text Background Type
 * @parent ListWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param ListRect:func
 * @text JS: X, Y, W, H
 * @parent ListWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop() + this._helpWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._helpWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Game End Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~GameEnd:
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the Game End screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"toTitle\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.toTitle;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandToTitle();\\\"\"}","{\"Symbol:str\":\"cancel\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.cancel;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.popScene();\\\"\"}"]
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandList:arraystruct
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 2;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (Graphics.boxHeight - height) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Shop Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~ShopMenu:
 *
 * @param HelpWindow
 * @text Help Window
 *
 * @param HelpBgType:num
 * @text Background Type
 * @parent HelpWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param HelpRect:func
 * @text JS: X, Y, W, H
 * @parent HelpWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const wx = 0;\nconst wy = this.helpAreaTop();\nconst ww = Graphics.boxWidth;\nconst wh = this.helpAreaHeight();\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param GoldWindow
 * @text Gold Window
 *
 * @param GoldBgType:num
 * @text Background Type
 * @parent GoldWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param GoldRect:func
 * @text JS: X, Y, W, H
 * @parent GoldWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 1;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = Graphics.boxWidth - width;\nconst y = this.mainAreaTop();\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CommandWindow
 * @text Command Window
 *
 * @param CommandBgType:num
 * @text Background Type
 * @parent CommandWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this.mainAreaTop();\nconst rows = 1;\nconst width = this._goldWindow.x;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param DummyWindow
 * @text Dummy Window
 *
 * @param DummyBgType:num
 * @text Background Type
 * @parent DummyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param DummyRect:func
 * @text JS: X, Y, W, H
 * @parent DummyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._commandWindow.y + this._commandWindow.height;\nconst width = Graphics.boxWidth;\nconst height = this.mainAreaHeight() - this._commandWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param NumberWindow
 * @text Number Window
 *
 * @param NumberBgType:num
 * @text Background Type
 * @parent NumberWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param NumberRect:func
 * @text JS: X, Y, W, H
 * @parent NumberWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param StatusWindow
 * @text Status Window
 *
 * @param StatusBgType:num
 * @text Background Type
 * @parent StatusWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param StatusRect:func
 * @text JS: X, Y, W, H
 * @parent StatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const width = this.statusWidth();\nconst height = this._dummyWindow.height;\nconst x = Graphics.boxWidth - width;\nconst y = this._dummyWindow.y;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param BuyWindow
 * @text Buy Window
 *
 * @param BuyBgType:num
 * @text Background Type
 * @parent BuyWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param BuyRect:func
 * @text JS: X, Y, W, H
 * @parent BuyWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst width = Graphics.boxWidth - this.statusWidth();\nconst height = this._dummyWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param CategoryWindow
 * @text Category Window
 *
 * @param CategoryBgType:num
 * @text Background Type
 * @parent CategoryWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param CategoryRect:func
 * @text JS: X, Y, W, H
 * @parent CategoryWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._dummyWindow.y;\nconst rows = 1;\nconst width = Graphics.boxWidth;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 * @param SellWindow
 * @text Sell Window
 *
 * @param SellBgType:num
 * @text Background Type
 * @parent SellWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param SellRect:func
 * @text JS: X, Y, W, H
 * @parent SellWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = 0;\nconst y = this._categoryWindow.y + this._categoryWindow.height;\nconst width = Graphics.boxWidth;\nconst height =\n    this.mainAreaHeight() -\n    this._commandWindow.height -\n    this._categoryWindow.height;\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Name Menu Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~NameMenu:
 *
 * @param EditWindow
 * @text Edit Window
 *
 * @param EditBgType:num
 * @text Background Type
 * @parent EditWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param EditRect:func
 * @text JS: X, Y, W, H
 * @parent EditWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const rows = 9;\nconst inputWindowHeight = this.calcWindowHeight(rows, true);\nconst padding = $gameSystem.windowPadding();\nconst width = 600;\nconst height = Math.min(ImageManager.faceHeight + padding * 2, this.mainAreaHeight() - inputWindowHeight);\nconst x = (Graphics.boxWidth - width) / 2;\nconst y = (this.mainAreaHeight() - (height + inputWindowHeight)) / 2;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param InputWindow
 * @text Input Window
 *
 * @param InputBgType:num
 * @text Background Type
 * @parent InputWindow
 * @type select
 * @option 0 - Window
 * @value 0
 * @option 1 - Dim
 * @value 1
 * @option 2 - Transparent
 * @value 2
 * @desc Select background type for this window.
 * @default 0
 *
 * @param InputRect:func
 * @text JS: X, Y, W, H
 * @parent InputWindow
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const x = this._editWindow.x;\nconst y = this._editWindow.y + this._editWindow.height;\nconst rows = 9;\nconst width = this._editWindow.width;\nconst height = this.calcWindowHeight(rows, true);\nreturn new Rectangle(x, y, width, height);"
 *
 */
/* ----------------------------------------------------------------------------
 * Title Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Title:
 *
 * @param TitleScreen
 * @text Title Screen
 *
 * @param DocumentTitleFmt:str
 * @text Document Title Format
 * @parent TitleScreen
 * @desc Format to display text in document title.
 * %1 - Main Title, %2 - Subtitle, %3 - Version
 * @default %1: %2 - Version %3
 *
 * @param Subtitle:str
 * @text Subtitle
 * @parent TitleScreen
 * @desc Subtitle to be displayed under the title name.
 * @default Subtitle
 *
 * @param Version:str
 * @text Version
 * @parent TitleScreen
 * @desc Version to be display in the title screen corner.
 * @default 0.00
 *
 * @param drawGameTitle:func
 * @text JS: Draw Title
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game title.
 * @default "const x = 20;\nconst y = Graphics.height / 4;\nconst maxWidth = Graphics.width - x * 2;\nconst text = $dataSystem.gameTitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 8;\nbitmap.fontSize = 72;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameSubtitle:func
 * @text JS: Draw Subtitle
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game subtitle.
 * @default "const x = 20;\nconst y = Graphics.height / 4 + 72;\nconst maxWidth = Graphics.width - x * 2;\nconst text = Scene_Title.subtitle;\nconst bitmap = this._gameTitleSprite.bitmap;\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 6;\nbitmap.fontSize = 48;\nbitmap.drawText(text, x, y, maxWidth, 48, \"center\");"
 *
 * @param drawGameVersion:func
 * @text JS: Draw Version
 * @type note
 * @parent TitleScreen
 * @desc Code used to draw the game version.
 * @default "const bitmap = this._gameTitleSprite.bitmap;\nconst x = 0;\nconst y = Graphics.height - 20;\nconst width = Math.round(Graphics.width / 4);\nconst height = 20;\nconst c1 = ColorManager.dimColor1();\nconst c2 = ColorManager.dimColor2();\nconst text = 'Version ' + Scene_Title.version;\nbitmap.gradientFillRect(x, y, width, height, c1, c2);\nbitmap.fontFace = $gameSystem.mainFontFace();\nbitmap.outlineColor = \"black\";\nbitmap.outlineWidth = 3;\nbitmap.fontSize = 16;\nbitmap.drawText(text, x + 4, y, Graphics.width, height, \"left\");"
 *
 * @param CommandList:arraystruct
 * @text Command Window List
 * @type struct<Command>[]
 * @desc Window commands used by the title screen.
 * Add new commands here.
 * @default ["{\"Symbol:str\":\"newGame\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.newGame;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandNewGame();\\\"\"}","{\"Symbol:str\":\"continue\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.continue_;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return DataManager.isAnySavefileExists();\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandContinue();\\\"\"}","{\"Symbol:str\":\"options\",\"TextStr:str\":\"Untitled\",\"TextJS:func\":\"\\\"return TextManager.options;\\\"\",\"ShowJS:func\":\"\\\"return true;\\\"\",\"EnableJS:func\":\"\\\"return true;\\\"\",\"ExtJS:func\":\"\\\"return null;\\\"\",\"CallHandlerJS:func\":\"\\\"SceneManager._scene.commandOptions();\\\"\"}"]
 *
 * @param CommandRect:func
 * @text JS: X, Y, W, H
 * @parent CommandList:arraystruct
 * @type note
 * @desc Code used to determine the dimensions for this window.
 * @default "const offsetX = $dataSystem.titleCommandWindow.offsetX;\nconst offsetY = $dataSystem.titleCommandWindow.offsetY;\nconst rows = 3;\nconst width = this.mainCommandWidth();\nconst height = this.calcWindowHeight(rows, true);\nconst x = (Graphics.boxWidth - width) / 2 + offsetX;\nconst y = Graphics.boxHeight - height - 96 + offsetY;\nreturn new Rectangle(x, y, width, height);"
 *
 * @param TitlePicButtons:arraystruct
 * @text Title Picture Buttons
 * @type struct<TitlePictureButton>[]
 * @desc Buttons that can be inserted into the title screen.
 * Add new title buttons here.
 * @default []
 *
 * @param ButtonFadeSpeed:num
 * @text Button Fade Speed
 * @parent TitlePicButtons:arraystruct
 * @type number
 * @min 1
 * @max 255
 * @desc Speed at which the buttons fade in at (1-255).
 * @default 4
 *
 */
/* ----------------------------------------------------------------------------
 * Parameter Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Param:
 *
 * @param DisplayedParams:arraystr
 * @text Displayed Parameters
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc A list of the parameters that will be displayed in-game.
 * @default ["ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param ExtDisplayedParams:arraystr
 * @text Extended Parameters
 * @parent DisplayedParams:arraystr
 * @type combo[]
 * @option MaxHP
 * @option MaxMP
 * @option ATK
 * @option DEF
 * @option MAT
 * @option MDF
 * @option AGI
 * @option LUK
 * @option HIT
 * @option EVA
 * @option CRI
 * @option CEV
 * @option MEV
 * @option MRF
 * @option CNT
 * @option HRG
 * @option MRG
 * @option TRG
 * @option TGR
 * @option GRD
 * @option REC
 * @option PHA
 * @option MCR
 * @option TCR
 * @option PDR
 * @option MDR
 * @option FDR
 * @option EXR
 * @desc The list shown in extended scenes (for other VisuStella plugins).
 * @default ["MaxHP","MaxMP","ATK","DEF","MAT","MDF","AGI","LUK"]
 *
 * @param BasicParameters
 * @text Basic Parameters
 *
 * @param CrisisRate:num
 * @text HP Crisis Rate
 * @parent BasicParameters
 * @desc HP Ratio at which a battler can be considered in crisis mode.
 * @default 0.25
 *
 * @param BasicParameterFormula:func
 * @text JS: Formula
 * @parent BasicParameters
 * @type note
 * @desc Formula used to determine the total value all 8 basic parameters: MaxHP, MaxMP, ATK, DEF, MAT, MDF, AGI, LUK.
 * @default "// Determine the variables used in this calculation.\nlet paramId = arguments[0];\nlet base = this.paramBase(paramId);\nlet plus = this.paramPlus(paramId);\nlet paramRate = this.paramRate(paramId);\nlet buffRate = this.paramBuffRate(paramId);\nlet flatBonus = this.paramFlatBonus(paramId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate * buffRate + flatBonus;\n\n// Determine the limits\nconst maxValue = this.paramMax(paramId);\nconst minValue = this.paramMin(paramId);\n\n// Final value\nreturn Math.round(value.clamp(minValue, maxValue));"
 *
 * @param BasicParamCaps
 * @text Parameter Caps
 * @parent BasicParameters
 *
 * @param BasicActorParamCaps
 * @text Actors
 * @parent BasicParamCaps
 *
 * @param BasicActorParamMax0:str
 * @text MaxHP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax1:str
 * @text MaxMP Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicActorParamMax2:str
 * @text ATK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax3:str
 * @text DEF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax4:str
 * @text MAT Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax5:str
 * @text MDF Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax6:str
 * @text AGI Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicActorParamMax7:str
 * @text LUK Cap
 * @parent BasicActorParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamCaps
 * @text Enemies
 * @parent BasicParamCaps
 *
 * @param BasicEnemyParamMax0:str
 * @text MaxHP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxHP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999999
 *
 * @param BasicEnemyParamMax1:str
 * @text MaxMP Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MaxMP cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 9999
 *
 * @param BasicEnemyParamMax2:str
 * @text ATK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine ATK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax3:str
 * @text DEF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine DEF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax4:str
 * @text MAT Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MAT cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax5:str
 * @text MDF Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine MDF cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax6:str
 * @text AGI Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine AGI cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param BasicEnemyParamMax7:str
 * @text LUK Cap
 * @parent BasicEnemyParamCaps
 * @desc Formula used to determine LUK cap.
 * Use 0 if you don't want a cap for this parameter.
 * @default 999
 *
 * @param XParameters
 * @text X Parameters
 *
 * @param XParameterFormula:func
 * @text JS: Formula
 * @parent XParameters
 * @type note
 * @desc Formula used to determine the total value all 10 X parameters: HIT, EVA, CRI, CEV, MEV, MRF, CNT, HRG, MRG, TRG.
 * @default "// Determine the variables used in this calculation.\nlet xparamId = arguments[0];\nlet base = this.traitsSum(Game_BattlerBase.TRAIT_XPARAM, xparamId);\nlet plus = this.xparamPlus(xparamId);\nlet paramRate = this.xparamRate(xparamId);\nlet flatBonus = this.xparamFlatBonus(xparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param XParamVocab
 * @text Vocabulary
 * @parent XParameters
 *
 * @param XParamVocab0:str
 * @text HIT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Hit
 *
 * @param XParamVocab1:str
 * @text EVA
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Evasion
 *
 * @param XParamVocab2:str
 * @text CRI
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Rate
 *
 * @param XParamVocab3:str
 * @text CEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Crit.Evade
 *
 * @param XParamVocab4:str
 * @text MEV
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Evade
 *
 * @param XParamVocab5:str
 * @text MRF
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Magic Reflect
 *
 * @param XParamVocab6:str
 * @text CNT
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default Counter
 *
 * @param XParamVocab7:str
 * @text HRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default HP Regen
 *
 * @param XParamVocab8:str
 * @text MRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default MP Regen
 *
 * @param XParamVocab9:str
 * @text TRG
 * @parent XParamVocab
 * @desc The in-game vocabulary used for this X Parameter.
 * @default TP Regen
 *
 * @param SParameters
 * @text S Parameters
 *
 * @param SParameterFormula:func
 * @text JS: Formula
 * @parent SParameters
 * @type note
 * @desc Formula used to determine the total value all 10 S parameters: TGR, GRD, REC, PHA, MCR, TCR, PDR, MDR, FDR, EXR.
 * @default "// Determine the variables used in this calculation.\nlet sparamId = arguments[0];\nlet base = this.traitsPi(Game_BattlerBase.TRAIT_SPARAM, sparamId);\nlet plus = this.sparamPlus(sparamId);\nlet paramRate = this.sparamRate(sparamId);\nlet flatBonus = this.sparamFlatBonus(sparamId);\n\n// Formula to determine total parameter value.\nlet value = (base + plus) * paramRate + flatBonus;\n\n// Final value\nreturn value;"
 *
 * @param SParamVocab
 * @text Vocabulary
 * @parent SParameters
 *
 * @param SParamVocab0:str
 * @text TGR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Aggro
 *
 * @param SParamVocab1:str
 * @text GRD
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Guard
 *
 * @param SParamVocab2:str
 * @text REC
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Recovery
 *
 * @param SParamVocab3:str
 * @text PHA
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Item Effect
 *
 * @param SParamVocab4:str
 * @text MCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default MP Cost
 *
 * @param SParamVocab5:str
 * @text TCR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default TP Charge
 *
 * @param SParamVocab6:str
 * @text PDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Physical DMG
 *
 * @param SParamVocab7:str
 * @text MDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Magical DMG
 *
 * @param SParamVocab8:str
 * @text FDR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default Floor DMG
 *
 * @param SParamVocab9:str
 * @text EXR
 * @parent SParamVocab
 * @desc The in-game vocabulary used for this S Parameter.
 * @default EXP Gain
 *
 * @param Icons
 * @text Icons
 *
 * @param DrawIcons:eval
 * @text Draw Icons?
 * @parent Icons
 * @type boolean
 * @on Draw
 * @off Don't Draw
 * @desc Draw icons next to parameter names?
 * @default true
 *
 * @param IconParam0:str
 * @text MaxHP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 84
 *
 * @param IconParam1:str
 * @text MaxMP
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconParam2:str
 * @text ATK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconParam3:str
 * @text DEF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 81
 *
 * @param IconParam4:str
 * @text MAT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 101
 *
 * @param IconParam5:str
 * @text MDF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 133
 *
 * @param IconParam6:str
 * @text AGI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 140
 *
 * @param IconParam7:str
 * @text LUK
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 87
 *
 * @param IconXParam0:str
 * @text HIT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 102
 *
 * @param IconXParam1:str
 * @text EVA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam2:str
 * @text CRI
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 78
 *
 * @param IconXParam3:str
 * @text CEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 82
 *
 * @param IconXParam4:str
 * @text MEV
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 171
 *
 * @param IconXParam5:str
 * @text MRF
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 222
 *
 * @param IconXParam6:str
 * @text CNT
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 77
 *
 * @param IconXParam7:str
 * @text HRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam8:str
 * @text MRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconXParam9:str
 * @text TRG
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam0:str
 * @text TGR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 5
 *
 * @param IconSParam1:str
 * @text GRD
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 128
 *
 * @param IconSParam2:str
 * @text REC
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 72
 *
 * @param IconSParam3:str
 * @text PHA
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 176
 *
 * @param IconSParam4:str
 * @text MCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 165
 *
 * @param IconSParam5:str
 * @text TCR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 164
 *
 * @param IconSParam6:str
 * @text PDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 76
 *
 * @param IconSParam7:str
 * @text MDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 79
 *
 * @param IconSParam8:str
 * @text FDR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 141
 *
 * @param IconSParam9:str
 * @text EXR
 * @parent Icons
 * @desc Icon used for this parameter.
 * @default 73
 *
 */
/* ----------------------------------------------------------------------------
 * Commands Struct
 * ----------------------------------------------------------------------------
 */
/*~struct~Command:
 *
 * @param Symbol:str
 * @text Symbol
 * @desc The symbol used for this command.
 * @default Symbol
 *
 * @param TextStr:str
 * @text STR: Text
 * @desc Displayed text used for this title command.
 * If this has a value, ignore the JS: Text version.
 * @default Untitled
 *
 * @param TextJS:func
 * @text JS: Text
 * @type note
 * @desc JavaScript code used to determine string used for the displayed name.
 * @default "return 'Text';"
 *
 * @param ShowJS:func
 * @text JS: Show
 * @type note
 * @desc JavaScript code used to determine if the item is shown or not.
 * @default "return true;"
 *
 * @param EnableJS:func
 * @text JS: Enable
 * @type note
 * @desc JavaScript code used to determine if the item is enabled or not.
 * @default "return true;"
 *
 * @param ExtJS:func
 * @text JS: Ext
 * @type note
 * @desc JavaScript code used to determine any ext data that should be added.
 * @default "return null;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this command is selected.
 * @default ""
 *
 */
/* ----------------------------------------------------------------------------
 * Title Picture Buttons
 * ----------------------------------------------------------------------------
 */
/*~struct~TitlePictureButton:
 *
 * @param PictureFilename:str
 * @text Picture's Filename
 * @type file
 * @dir img/pictures/
 * @desc Filename used for the picture.
 * @default 
 *
 * @param ButtonURL:str
 * @text Button URL
 * @desc URL for the button to go to upon being clicked.
 * @default https://www.google.com/
 *
 * @param PositionJS:func
 * @text JS: Position
 * @type note
 * @desc JavaScript code that helps determine the button's Position.
 * @default "this.x = Graphics.width - this.bitmap.width - 20;\nthis.y = Graphics.height - this.bitmap.height - 20;"
 *
 * @param OnLoadJS:func
 * @text JS: On Load
 * @type note
 * @desc JavaScript code that runs once this button bitmap is loaded.
 * @default "this.opacity = 0;\nthis.visible = true;"
 *
 * @param CallHandlerJS:func
 * @text JS: Run Code
 * @type note
 * @desc JavaScript code that runs once this button is pressed.
 * @default "const url = this._data.ButtonURL;\nVisuMZ.openURL(url);"
 *
 */
/* ----------------------------------------------------------------------------
 * UI Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~UI:
 *
 * @param UIArea
 * @text UI Area
 *
 * @param FadeSpeed:num
 * @text Fade Speed
 * @parent UIArea
 * @desc Default fade speed for transitions.
 * @default 24
 *
 * @param BoxMargin:num
 * @text Box Margin
 * @parent UIArea
 * @type number
 * @min 0
 * @desc Set the margin in pixels for the screen borders.
 * Default: 4
 * @default 4
 *
 * @param CommandWidth:num
 * @text Command Window Width
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the width for standard Command Windows.
 * Default: 240
 * @default 240
 *
 * @param BottomHelp:eval
 * @text Bottom Help Window
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the Help Window at the bottom of the screen?
 * @default false
 *
 * @param RightMenus:eval
 * @text Right Aligned Menus
 * @parent UIArea
 * @type boolean
 * @on Right
 * @off Left
 * @desc Put most command windows to the right side of the screen.
 * @default true
 *
 * @param ShowButtons:eval
 * @text Show Buttons
 * @parent UIArea
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show clickable buttons in your game?
 * This will affect all buttons.
 * @default true
 *
 * @param cancelShowButton:eval
 * @text Show Cancel Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show cancel button?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param menuShowButton:eval
 * @text Show Menu Button
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show main menu button from the map scene?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param pagedownShowButton:eval
 * @text Show Page Up/Down
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show page up/down buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param numberShowButton:eval
 * @text Show Number Buttons
 * @parent ShowButtons:eval
 * @type boolean
 * @on Show
 * @off Hide
 * @desc Show number adjustment buttons?
 * If 'Show Buttons' is false, this will be hidden.
 * @default true
 *
 * @param ButtonHeight:num
 * @text Button Area Height
 * @parent UIArea
 * @type number
 * @min 1
 * @desc Sets the height for the button area.
 * Default: 52
 * @default 52
 *
 * @param BottomButtons:eval
 * @text Bottom Buttons
 * @parent UIArea
 * @type boolean
 * @on Bottom
 * @off Top
 * @desc Put the buttons at the bottom of the screen?
 * @default false
 *
 * @param SideButtons:eval
 * @text Side Buttons
 * @parent UIArea
 * @type boolean
 * @on Side
 * @off Normal
 * @desc Push buttons to the side of the UI if there is room.
 * @default true
 *
 * @param LargerResolution
 * @text Larger Resolution
 *
 * @param RepositionActors:eval
 * @text Reposition Actors
 * @parent LargerResolution
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of actors in battle if the screen resolution has changed.
 * @default true
 *
 * @param RepositionEnemies:eval
 * @text Reposition Enemies
 * @parent LargerResolution
 * @type boolean
 * @on Reposition
 * @off Keep As Is
 * @desc Update the position of enemies in battle if the screen resolution has changed.
 * @default true
 *
 * @param MenuObjects
 * @text Menu Objects
 *
 * @param LvExpGauge:eval
 * @text Level -> EXP Gauge
 * @parent MenuObjects
 * @type boolean
 * @on Draw Gauge
 * @off Keep As Is
 * @desc Draw an EXP Gauge under the drawn level.
 * @default true
 *
 * @param ParamArrow:str
 * @text Parameter Arrow
 * @parent MenuObjects
 * @desc The arrow used to show changes in the parameter values.
 * @default →
 *
 * @param TextCodeSupport
 * @text Text Code Support
 *
 * @param TextCodeClassNames:eval
 * @text Class Names
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make class names support text codes?
 * @default true
 *
 * @param TextCodeNicknames:eval
 * @text Nicknames
 * @parent TextCodeSupport
 * @type boolean
 * @on Suport Text Codes
 * @off Normal Text
 * @desc Make nicknames support text codes?
 * @default true
 *
 */
/* ----------------------------------------------------------------------------
 * Window Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Window:
 *
 * @param WindowDefaults
 * @text Defaults
 *
 * @param EnableMasking:eval
 * @text Enable Masking
 * @parent WindowDefaults
 * @type boolean
 * @on Masking On
 * @off Masking Off
 * @desc Enable window masking (windows hide other windows behind 
 * them)? WARNING: Turning it off may have unwanted effects.
 * @default true
 *
 * @param LineHeight:num
 * @text Line Height
 * @parent WindowDefaults
 * @desc Default line height used for standard windows.
 * Default: 36
 * @default 36
 *
 * @param ItemPadding:num
 * @text Item Padding
 * @parent WindowDefaults
 * @desc Default line padding used for standard windows.
 * Default: 8
 * @default 8
 *
 * @param BackOpacity:num
 * @text Back Opacity
 * @parent WindowDefaults
 * @desc Default back opacity used for standard windows.
 * Default: 192
 * @default 192
 *
 * @param TranslucentOpacity:num
 * @text Translucent Opacity
 * @parent WindowDefaults
 * @desc Default translucent opacity used for standard windows.
 * Default: 160
 * @default 160
 *
 * @param OpenSpeed:num
 * @text Window Opening Speed
 * @parent WindowDefaults
 * @desc Default open speed used for standard windows.
 * Default: 32 (Use a number between 0-255)
 * @default 32
 * @default 24
 *
 * @param ColSpacing:num
 * @text Column Spacing
 * @parent WindowDefaults
 * @desc Default column spacing for selectable windows.
 * Default: 8
 * @default 8
 *
 * @param RowSpacing:num
 * @text Row Spacing
 * @parent WindowDefaults
 * @desc Default row spacing for selectable windows.
 * Default: 4
 * @default 4
 * 
 * @param SelectableItems
 * @text Selectable Items
 *
 * @param ShowItemBackground:eval
 * @text Show Background?
 * @parent SelectableItems
 * @type boolean
 * @on Show Backgrounds
 * @off No backgrounds.
 * @desc Selectable menu items have dark boxes behind them. Show them?
 * @default true
 *
 * @param ItemHeight:num
 * @text Item Height Padding
 * @parent SelectableItems
 * @desc Default padding for selectable items.
 * Default: 8
 * @default 8
 *
 * @param DrawItemBackgroundJS:func
 * @text JS: Draw Background
 * @parent SelectableItems
 * @type note
 * @desc Code used to draw the background rectangle behind clickable menu objects
 * @default "const rect = arguments[0];\nconst c1 = ColorManager.itemBackColor1();\nconst c2 = ColorManager.itemBackColor2();\nconst x = rect.x;\nconst y = rect.y;\nconst w = rect.width;\nconst h = rect.height;\nthis.contentsBack.gradientFillRect(x, y, w, h, c1, c2, true);\nthis.contentsBack.strokeRect(x, y, w, h, c1);"
 */
/* ----------------------------------------------------------------------------
 * JS Quick Function Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~jsQuickFunc:
 *
 * @param FunctionName:str
 * @text Function Name
 * @desc The function's name in the global namespace.
 * Will not overwrite functions/variables of the same name.
 * @default Untitled
 *
 * @param CodeJS:json
 * @text JS: Code
 * @type note
 * @desc Run this code when using the function.
 * @default "// Insert this as a function anywhere you can input code\n// such as Script Calls or Conditional Branch Scripts.\n\n// Process Code\n"
 *
 */
//=============================================================================

const _0x335d=['WIN_OEM_AUTO','ASTERISK','bbVCX','INSERT','_fauxAnimationQueue','createChildSprite','level','top','HkwdU','IconSParam8','_mp','AGI','isUseModernControls','Basic','left','RegExp','checkSmartEventCollision','hjeso','SideButtons','QthaI','pop','OnLoadJS','Scene_Boot_startNormalGame','nextLevelExp','CommandWidth','VOLUME_DOWN','isTimeProgress','yScrollLinkedOffset','_listWindow','NewGameBoot','DigitGroupingGaugeSprites','_encounterCount','<%1\x20%2:[\x20]','numberWindowRect','maxCols','TranslucentOpacity','drawText','UNDERSCORE','onMouseEnter','paramWidth','WIN_OEM_FJ_TOUROKU','CategoryRect','IconSet','DrawItemBackgroundJS','remove','_menuButton','StatusEquipRect','_buttonType','Scene_Equip_create','OptionsBgType','MenuBg','syOVP','setMainFontSize','xvbil','Window_Selectable_processTouch','setupValueFont','buttonAssistCancel','anchor','isExpGaugeDrawn','soxNV','Scene_MenuBase_mainAreaTop','gaugeLineHeight','Rate2','SLASH','NoTileShadows','OSgfp','skills','onKeyDownKeysF6F7','_hp','ColorDeath','updateFauxAnimations','useDigitGroupingEx','isSmartEventCollisionOn','_targetAnchor','SParamVocab2','nKZBB','EREOF','processAlwaysEscape','buttonAssistKey4','_stored_expGaugeColor1','OptionsRect','SParameterFormula','TTONy','IconSParam4','rowSpacing','MAX_GL_TEXTURES','SnapshotOpacity','setHandler','SkillTypeBgType','hmQTw','IconParam6','xdg-open','loadPicture','bqNlF','IconXParam6','adjustSprite','Sprite_Battler_startMove','OptionsMenu','statusWindowRect','cursorPagedown','OkText','F22','HOME','XParameterFormula','FKTIM','scaleMode','_cache','ColorPowerUp','HAvRH','EditBgType','loadTitle2','GoldMax','AhQsL','Location','CIRCUMFLEX','aBLEZ','INSINE','DOWN','none','DigitGroupingExText','button','centerSprite','width','paramFlat','GRD','PAUSE','setMoveEasingType','down','WIN_OEM_FJ_ROYA','GfWOq','exp','process_VisuMZ_CoreEngine_Functions','buttonAssistOffset2','enemies','RepositionEnemies','gainGold','itemBackColor1','optionsWindowRect','MULTIPLY','BmIHA','CtaSq','hlKkk','drawActorNickname','initButtonHidden','consumeItem','paramRate2','advanced','DigitGroupingStandardText','xparamPlus1','img/%1/','Window_Selectable_drawBackgroundRect','PDR','ShowButtons','MAT','LvExpGauge','_storedStack','min','INCUBIC','calcEasing','movePageButtonSideButtonLayout','OUTEXPO','TextStr','WIcsI','EXR','Script\x20Call\x20Error','areTileShadowsHidden','HASH','DummyBgType','WIN_OEM_COPY','buttonAssistSwitch','HRG','_stored_tpCostColor','retrieveFauxAnimation','GoldBgType','tab','PictureFilename','scaleSprite','displayX','CRI','RrXje','XParamVocab3','_stored_crisisColor','MCMvK','updateMove','addCommand','kxvQJ','touchUI','YBykP','#%1','ButtonHeight','isWindowMaskingEnabled','FDR','isMVAnimation','KeyItemProtect','drawSegment','currentValue','ParamArrow','Window','COMMA','getBackgroundOpacity','LEFT','SellBgType','ENTER_SPECIAL','PHA','IconXParam1','Scene_Title_drawGameTitle','zXJOC','itemHit','OUTCIRC','CEV','IconParam7','Game_Interpreter_command122','return\x200','PERIOD','YVPLe','jdATU','buttonAssistKey5','gJUTu','cursorPageup','DamageColor','JMygt','cancel','MenuLayout','Game_Actor_changeClass','buttonAssistOk','popScene','isTriggered','playEscape','processMoveCommand','SlotRect','itemLineRect','ColorCTGauge2','isBottomHelpMode','paramBase','targetSpritePosition','endAnimation','_buyWindow','SystemSetTimeProgress','UkwhK','NymDI','STENCIL_TEST','XmIsv','updateClose','ItemBackColor2','Param','initCoreEngine','Flat','Scene_MenuBase_helpAreaTop','miMUS','buttonY','easingType','IconParam1','LINEAR','oxgwV','BACK_QUOTE','maxItems','ANfjB','PWNDh','VsPFK','ColSpacing','_hideTileShadows','refresh','IWoNY','sin','IconXParam2','SceneManager_onKeyDown','tpColor','duration','F15','ImprovedAccuracySystem','test','ColorTPCost','applyCoreEasing','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','NEAREST','isGameActive','height','end','IconSParam2','IQZkM','Spriteset_Battle_createEnemies','isAnimationForEach','profileWindowRect','Window_Selectable_processCursorMove','TitlePicButtons','WIN_OEM_CLEAR','eFqBg','Game_System_initialize','xparamRate2','isOpen','_sideButtonLayout','SParamVocab3','JazoP','_fauxAnimationSprites','_commandWindow','params','setActorHomeRepositioned','setSideButtonLayout','initialLevel','xparamFlat1','NUMPAD6','OPEN_BRACKET','sparamPlusJS','CLOSE_PAREN','Graphics_defaultStretchMode','KmAPw','HJbRD','ARRAYSTR','gaugeRate','WARNING:\x20%1\x20has\x20already\x20been\x20declared\x0aand\x20cannot\x20be\x20used\x20as\x20a\x20Quick\x20JS\x20Function','_mapNameWindow','_screenX','HIFaQ','right','name','RightMenus','outbounce','statusEquipWindowRect','DrawIcons','EXCLAMATION','mainFontSize','updateOpen','Key%1','inputWindowRect','F20','Scene_MenuBase_mainAreaHeight','isMaxLevel','buttonAssistOffset1','outlineColor','IconXParam0','setAttack','worldTransform','moveCancelButtonSideButtonLayout','_dimmerSprite','Spriteset_Base_initialize','FontSize','MRG','mute','log','Window_Base_initialize','floor','EQUALS','Sprite_Gauge_currentValue','SParamVocab0','_defaultStretchMode','vOZES','ZOOM','sparamPlus2','_coreEasing','haeqJ','reduce','WIN_OEM_PA3','loadSystem','WIN_OEM_ENLW','fcilm','paramPlusJS','Game_Party_consumeItem','subject','text','REPLACE','RepositionActors','blockWidth','ForceNoPlayTest','openness','BACK_SLASH','XeCxN','NewGameCommonEvent','listWindowRect','_targetOffsetY','terminate','onMoveEnd','Scene_Name_create','createWindowLayer','_stored_gaugeBackColor','LevelUpFullHp','_coreEasingType','isFullDocumentTitle','ActorRect','_anchor','Plus','Window_Gold_refresh','_pressed','jHuBR','clearStencil','createEnemies','_scene','Conditional\x20Branch\x20Script\x20Error','setMute','pictures','resetTextColor','seVolume','eventsXyNt','processCursorHomeEndTrigger','BuyRect','Bitmap_drawText','SXMva','Scene_Map_updateMainMultiply','maxBattleMembers','characters','TCR','Scene_Boot_onDatabaseLoaded','_offsetY','uTyQk','registerCommand','subjectHitRate','animationBaseDelay','kbWVO','constructor','pictureButtons','SceneManager_isGameActive','GroupDigits','KdfRc','drawItem','drawCurrentParam','checkCacheKey','mainAreaHeightSideButtonLayout','ISlye','YKWur','push','FuRcH','XbtCB','Window_ShopSell_isEnabled','XParamVocab1','tfrYp','round','ColorMaxLvGauge1','ApplyEasing','Game_Picture_initBasic','GtHIl','ModernControls','fillRect','skillTypes','helpWindowRect','cursorLeft','updateTransform','MAXHP','volume','exit','match','isPhysical','buttonAreaHeight','updateDocumentTitle','removeFauxAnimation','moveMenuButtonSideButtonLayout','Sprite_Gauge_gaugeRate','Cenaz','kNkeX','sparamRateJS','GetParamIcon','PIPE','pagedown','_skillTypeWindow','DataManager_setupNewGame','mpGaugeColor1','mirror','DimColor2','adjustBoxSize','StatusEquipBgType','MainMenu','startAnimation','_repositioned','stencilOp','TRG','gameTitle','TextCodeClassNames','_statusWindow','SkillTypeRect','NUMPAD9','buttonAssistText%1','AMPERSAND','getButtonAssistLocation','DECIMAL','EncounterRateMinimum','expGaugeColor2','stypeId','CommandList','Game_Actor_levelUp','getColorDataFromPluginParameters','process_VisuMZ_CoreEngine_jsQuickFunctions','setup','F7key','helpAreaTop','STR','CLOSE_CURLY_BRACKET','process_VisuMZ_CoreEngine_Actor_Notetags','Scene_Boot_loadSystemImages','gaugeBackColor','Max','ColorMPGauge2','charAt','drawIconBySize','cXmHr','itemWindowRect','EditRect','TAB','Scene_Menu_create','bgmVolume','LyYCm','replace','traitObjects','nw.gui','F16','createCommandWindow','isMapScrollLinked','update','NUMPAD4','exec','string','ParamMax','sv_actors','buttonAssistOffset4','Game_Interpreter_command355','ColorTPGauge2','HANJA','backOpacity','_profileWindow','text%1','status','helpAreaTopSideButtonLayout','ItemMenu','Subtitle','BackOpacity','paramRateJS','rpujA','mainAreaHeight','performEscape','paramBaseAboveLevel99','OUTBACK','ConvertNumberToString','EISU','BgType','AutoStretch','Game_Picture_x','KEEP','StatusRect','itypeId','GoldIcon','F12','addLoadListener','OUTQUAD','clamp','loadTitle1','xparamFlatBonus','Rate1','_backSprite2','BgFilename1','_colorCache','czZgB','paramValueByName','_stored_pendingColor','onButtonImageLoad','currentLevelExp','ColorManager_loadWindowskin','inBattle','INOUTQUINT','ShowItemBackground','isRightInputMode','drawCurrencyValue','currentExp','_centerElementCoreEngine','PvuEe','F24','_stored_maxLvGaugeColor2','OUTBOUNCE','pagedownShowButton','isKeyItem','call','changeTextColor','RIGHT','getLevel','SystemSetSideView','ColorHPGauge2','setSideView','BattleManager_processEscape','_dummyWindow','makeDeepCopy','setEnemyAction','XParamVocab5','makeFontSmaller','_hideButtons','_pagedownButton','description','uZUvA','nickname','YmBVc','buttonAssistText4','_isPlaytest','_closing','ColorSystem','mpColor','areButtonsHidden','_stored_deathColor','_offsetX','yAsGx','Scene_MenuBase_createPageButtons','wholeDuration','wBzTZ','Flat2','commandWindowRect','EquipMenu','EVA','optSideView','CKgHf','IconSParam5','anchorCoreEasing','Scene_Base_createWindowLayer','buttonAssistText5','jUQRz','batch','ColorMPCost','_stored_tpGaugeColor2','PixelateImageRendering','startAutoNewGame','asin','map','GoldOverlap','translucentOpacity','qYQhf','Scene_Map_createMenuButton','VfccW','length','IconParam4','ctGaugeColor1','updatePictureAntiZoom','FZMYo','tpGaugeColor2','HvPrY','INOUTQUAD','REC','IconXParam7','URL','AccuracyBoost','EVAL','Layer','NUMPAD3','maxLvGaugeColor1','ZiqMs','resize','sparamRate','FontShadows','prototype','SCROLL_LOCK','slotWindowRect','ACCEPT','key%1','JQsdJ','filter','setBackgroundType','processTimingData','_isWindow','tpGaugeColor1','Game_Actor_paramBase','BgfhS','Bitmap_drawTextOutline','INBACK','_duration','isActor','helpAreaHeight','ctGaugeColor2','TextFmt','nexye','IconXParam3','platform','isMaskingEnabled','SHIFT','PRINTSCREEN','_internalTextures','initBasic','SParamVocab1','TextManager_param','ShowDevTools','command355','includes','GtKxy','XParamVocab2','NumberRect','render','(\x5cd+\x5c.?\x5cd+)>','parse','jxhdL','isMenuButtonAssistEnabled','DIVIDE','_destroyInternalTextures','processSoundTimings','SaOLv','parameters','JUNJA','Spriteset_Base_destroy','guardSkillId','getColor','tileHeight','OPEN_PAREN','command111','Ckqne','_stored_tpGaugeColor1','categoryWindowRect','mainAreaTopSideButtonLayout','INOUTQUART','context','ATK','isReleased','gDSyG','_hovered','makeEncounterCount','Linear','OPEN_CURLY_BRACKET','YKVuX','type','note','EQUAL','_statusParamsWindow','INOUTCUBIC','xparam','createPageButtons','nQseU','useDigitGrouping','pXNGu','WIN_OEM_FJ_JISHO','Spriteset_Base_update','TextJS','ListBgType','retreat','terms','Scene_MenuBase_createBackground','_createInternalTextures','snapForBackground','item','_pictureContainer','get','clone','jsQuickFunc','IconXParam4','Padding','printError','isCursorMovable','NUCgG','powerUpColor','sv_enemies','ebClO','transform','paramRate','END','LESS_THAN','forceOutOfPlaytest','LeUgP','Actor','<JS\x20%1\x20%2:[\x20](.*)>','_centerElement','CHAoU','_CoreEngineSettings','shift','CJrbw','IiyUS','bitmapHeight','setupNewGame','_clickHandler','SELECT','itemEva','cKoVQ','0.00','FINAL','setWindowPadding','RowSpacing','WaIwO','Scene_Status_create','isEnemy','Graphics_printError','HelpBgType','IconParam2','itemHeight','BottomButtons','toFixed','SPACE','moveRelativeToResolutionChange','mpCostColor','Untitled','_moveEasingType','targetEvaRate','numberShowButton','clear','hUVjo','PWBeM','OUTSINE','sparam','WIN_OEM_PA2','param','sparamPlus1','stencilFunc','IconParam3','PGmMj','_stored_hpGaugeColor1','AntiZoomPictures','_stored_expGaugeColor2','_animation','reservePlayTestNewGameCommonEvent','calcCoreEasing','textWidth','fadeSpeed','VOLUME_MUTE','ShowJS','pDOHe','drawGameTitle','getInputMultiButtonStrings','_pageupButton','meVolume','CodeJS','tpzdB','TGR','nJUOM','ColorNormal','dsopd','_playTestFastMode','mhp','F11','Game_Interpreter_command232','lineHeight','NUMPAD2','makeFontBigger','targetScaleY','qEuyO','smallParamFontSize','enableDigitGroupingEx','SystemSetWindowPadding','battlebacks2','contentsOpacity','_movementWholeDuration','_stored_mpCostColor','gradientFillRect','CLEAR','XParamVocab6','ColorMaxLvGauge2','Symbol','ypbCI','actorWindowRect','focus','BuyBgType','tfxjA','updateMain','Control\x20Variables\x20Script\x20Error','LeTmI','abcUv','hpColor','picture','_digitGroupingEx','itemSuccessRate','LBTKf','currencyUnit','ListRect','setHome','buttonAssistWindowSideRect','CPAri','SParamVocab7','targetObjects','setAnchor','sqrt','targetScaleX','value','processTouch','rsVjX','YFgAx','MEV','MWBlR','ActorHPColor','font-smooth','aoEGe','TimeProgress','INQUAD','itemHitImprovedAccuracy','_stored_powerUpColor','pendingColor','BACKSPACE','updateMainMultiply','boxWidth','VNuhx','_blank','Tilemap_addShadow','isItemStyle','loadGameImagesCoreEngine','targets','createButtonAssistWindow','refreshDimmerBitmap','displayY','dsjkE','paramFlatJS','SUBTRACT','StatusBgType','createBackground','onDatabaseLoaded','targetX','INOUTELASTIC','eEDzw','CAPSLOCK','_itemWindow','Enemy','changeClass','destroy','([\x5c+\x5c-]\x5cd+)([%％])>','SkillMenu','NUMPAD1','isCollidedWithEvents','gLleo','pageup','StatusParamsRect','ItemBackColor1','xparamPlusJS','cursorDown','systemColor','process_VisuMZ_CoreEngine_RegExp','ColorCTGauge1','Qoncv','smoothSelect','jNbLK','IconSParam6','helpAreaBottom','YiIxk','NUMPAD5','MDF','ZERO','CONTEXT_MENU','bitmapWidth','itemBackColor2','playTestF7','createFauxAnimation','createJsQuickFunction','_stored_normalColor','cnzjS','StatusMenu','pictureId','Scene_Shop_create','BasicParameterFormula','save','ProfileBgType','PositionJS','_spriteset','cmwkA','removeAllFauxAnimations','uiAreaHeight','SceneManager_initialize','addChild','_playtestF7Looping','Scene_Boot_updateDocumentTitle','ONE','drawGameVersion','drawActorLevel','processTouchModernControls','StatusParamsBgType','processEscape','([\x5c+\x5c-]\x5cd+\x5c.?\x5cd+)>','_muteSound','sZqoM','Sprite_Button_updateOpacity','ColorExpGauge1','Game_BattlerBase_initMembers','ButtonAssist','mainAreaBottom','makeTargetSprites','pixelated','SCALE_MODES','paramName','VkIPB','getCustomBackgroundSettings','image-rendering','MAXMP','animationShouldMirror','Scene_Skill_create','damageColor','setupCoreEasing','mpGaugeColor2','stretch','WIN_OEM_CUSEL','SParamVocab5','paramPlus','onClick','GoldChange','onEscapeSuccess','WIN_OEM_BACKTAB','initDigitGrouping','UBQFC','drawAllParams','getInputButtonString','keyMapper','lrMbC','Window_Selectable_cursorDown','bBfIF','drawBackgroundRect','(\x5cd+)([%％])>','SideView','hit','fkOzB','ParamChange','maxLvGaugeColor2','drawParamText','Game_Action_itemEva','toUpperCase','Game_Picture_y','buttonAssistText3','TPiNk','equips','sparamRate2','SParamVocab4','paramFlatBonus','INCIRC','_stored_mpGaugeColor2','ItemRect','addWindow','drawRightArrow','LYizg','POwAy','xparamRate','setSkill','sparamFlatBonus','STENCIL_BUFFER_BIT','enable','_data','areButtonsOutsideMainUI','AxTFc','cos','ARRAYJSON','ItemPadding','NUMPAD0','Avwtp','process_VisuMZ_CoreEngine_Enemy_Notetags','JRfXj','isItem','CNT','updateCoreEasing','XZxUf','hideButtonFromView','ColorMPGauge1','Rate','MRF','Scene_Item_create','LsNLe','showFauxAnimations','maxLevel','_stored_maxLvGaugeColor1','uiAreaWidth','LoadMenu','Scene_Options_create','encounterStepsMinimum','HIT','IconParam5','isPressed','OutlineColor','isClosed','MvDnf','fillText','VmRpL','SqYBW','IconXParam5','initMembers','KANA','F23','ctrlKey','gVdDQ','FontSmoothing','paramMax','fontSize','CancelText','FjOGz','background','isMagical','fillStyle','_screenY','dimColor1','Scene_Battle_update','child_process','setCoreEngineUpdateWindowBg','updateOpacity','removeChild','sparamFlatJS','makeCoreEngineCommandList','buttonAssistKey3','iconWidth','DocumentTitleFmt','_digitGrouping','ARRAYFUNC','DEF','GoldRect','sparamFlat2','ItemHeight','bitmap','PMQlI','_actor','framebuffer','isPlaying','_context','Iidcp','attackSkillId','_goldWindow','setActorHome','playCursorSound','Rmpto','drawGoldItemStyle','padding','titles2','JPCcs','LineHeight','title','_numberWindow','Scene_Battle_createCancelButton','Game_Interpreter_command231','HELP','createFauxAnimationSprite','PLUS','hide','WIN_OEM_WSCTRL','Sprite_Picture_updateOrigin','Window_Base_drawText','XParamVocab7','cursorUp','WSYay','OdIaQ','_actorWindow','_categoryWindow','INOUTCIRC','dimColor2','children','WIN_OEM_PA1','qMWRu','system','MXyMC','ButtonFadeSpeed','darwin','ColorTPGauge1','setBackgroundOpacity','WIN_OEM_RESET','buttonAssistKey%1','ExtJS','drawGauge','SParamVocab8','GameEnd','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','NameMenu','COLON','Game_Interpreter_command111','KeyUnlisted','abs','Sprite_Actor_setActorHome','DimColor1','DigitGroupingDamageSprites','valueOutlineWidth','INOUTBOUNCE','normal','maxGold','BdCyL','LiAGn','_slotWindow','Total','buttonAssistText1','hpGaugeColor2','makeInputButtonString','SParamVocab6','CategoryBgType','toLocaleString','LUK','FUNC','weZFH','mainAreaTop','animations','_helpWindow','rwxiH','canUse','isOptionValid','NUM','ALTGR','isHandled','repositionEnemiesByResolution','textColor','clearCachedKeys','IconXParam9','targetOpacity','SEMICOLON','makeDocumentTitle','setSize','isInputting','ProfileRect','jUUwV','processFauxAnimationRequests','exorG','deathColor','pow','ENTER','boxHeight','determineSideButtonLayoutValid','down2','Sprite_AnimationMV_processTimingData','CxyaQ','faces','Window_Base_update','applyEasing','F14','xTbko','HYPHEN_MINUS','buttonAssistWindowButtonRect','Game_Picture_updateMove','playOk','Title','goto','isAlive','_backSprite1','CTRL','loadBitmap','xparamRateJS','createTitleButtons','visible','xScrollLinkedOffset','ColorPowerDown','PERCENT','InputRect','number','yddwM','drawTextEx','sparamPlus','ConvertParams','FKBJi','_buttonAssistWindow','tpCostColor','ShopMenu','max','eva','skillTypeWindowRect','open','mmp','gaugeHeight','PA1','setupButtonImage','WindowLayer_render','resetFontSettings','_targetOffsetX','createTextState','MDR','Game_BattlerBase_refresh','FunctionName','rightArrowWidth','BaseTexture','EscapeAlways','paramchangeTextColor','enableDigitGrouping','Game_Event_isCollidedWithEvents','opacity','buttonAssistKey1','contents','updateAnchor','QoL','crisisColor','_changingClass','Game_Map_setup','Sprite_Button_initialize','Scene_Unlisted','_optionsWindow','paramRate1','processCursorMove','setClickHandler','keyCode','isSideView','isPlaytest','startMove','updatePlayTestF7','targetContentsOpacity','_commandList','MAX_SAFE_INTEGER','isDying','NbBAU','win32','Game_Temp_initialize','FEdFG','DisplayedParams','iconHeight','aQavC','paramMaxJS','ECoVz','drawGameSubtitle','processCursorMoveModernControls','MCR','itemPadding','home','skipBranch','isClickEnabled','ADD','imageSmoothingEnabled','HelpRect','onKeyDown','Settings','setupCoreEngine','loadWindowskin','targetBackOpacity','process_VisuMZ_CoreEngine_Settings','META','pGiCV','flush','\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%2\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(\x27JS\x20Quick\x20Function\x20\x22%1\x22\x20Error!\x27);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','ESDVq','_drawTextShadow','openURL','TILDE','OpenSpeed','BgFilename2','ActorBgType','Flat1','qDUxQ','style','onMouseExit','ColorCrisis','drawActorExpGauge','bgsVolume','KhiMP','NONCONVERT','nRZcE','members','toString','OmEmK','buyWindowRect','isSideButtonLayout','gold','blendFunc','version','expRate','xparamPlus','OUTCUBIC','CoreEngine','repositionCancelButtonSideButtonLayout','createFauxAnimationQueue','_tempActor','format','OUTELASTIC','INOUTBACK','editWindowRect','goldWindowRect','mev','Color','ONE_MINUS_SRC_ALPHA','Game_Character_processMoveCommand','setTimeProgress','altKey','WIN_ICO_CLEAR','Window_Base_createTextState','setFrame','EXSEL','showDevTools','apply','buttonAssistOffset%1','Gold','OpenConsole','windowPadding','titles1','currentClass','ImgLoad','F21','Sprite_Animation_processSoundTimings','CommandRect','NUMPAD8','traitsPi','WIN_OEM_FJ_LOYA','dummyWindowRect','command231','_stored_mpGaugeColor1','TRAIT_PARAM','command122','_effectsContainer','CallHandlerJS','rKMER','renderNoMask','isBusy','initCoreEasing','_movementDuration','_paramPlus','deKCf','levelUpRecovery','drawNewParam','PoRXx','createCancelButton','ItemBgType','_inputWindow','isHovered','ATTN','normalColor','_isButtonHidden','BoxMargin','subtitle','drawIcon','isBottomButtonMode','InputBgType','QUOTE','EnableJS','vmGTi','initialize','IaNMp','GREATER_THAN','openingSpeed','targetY','_drawTextOutline','createMenuButton','_addShadow','colSpacing','knrrE','ActorMPColor','buttonAssistWindowRect','mJrPy','buttonAssistOffset3','setEasingType','updateKeyText','XTdyF','Scene_MenuBase_createCancelButton','animationId','center','_cancelButton','learnings','isRepeated','NiUqo','encounterStep','isNormalPriority','OUTQUART','requestFauxAnimation','initVisuMZCoreEngine','INQUART','Version','Graphics_centerElement','innerWidth','onPress','startNormalGame','bind','stringKeyMap','Game_Picture_calcEasing','INOUTEXPO','Window_StatusBase_drawActorLevel','index','randomInt','scale','SEPARATOR','xMvww','Plus1','_stored_systemColor','layoutSettings','xparamFlatJS','DOLLAR','makeCommandList','setGuard','process_VisuMZ_CoreEngine_Notetags','Game_Action_itemHit','OVqDh','VOLUME_UP','setTargetAnchor','WIN_OEM_FINISH','PRINT','XParamVocab4','IconSParam7','IconSParam1','moLBE','drawActorClass','inbounce','drawParamName','OUTQUINT','wgDuc','create','process_VisuMZ_CoreEngine_Class_Notetags','mmmqf','SystemSetFontSize','MODECHANGE','_sellWindow','option','command232','sQDQY','CommandBgType','ONywl'];(function(_0x5b5d6a,_0x335db3){const _0x51ad74=function(_0x4cd5eb){while(--_0x4cd5eb){_0x5b5d6a['push'](_0x5b5d6a['shift']());}};_0x51ad74(++_0x335db3);}(_0x335d,0x1e4));const _0x51ad=function(_0x5b5d6a,_0x335db3){_0x5b5d6a=_0x5b5d6a-0x0;let _0x51ad74=_0x335d[_0x5b5d6a];return _0x51ad74;};var label=_0x51ad('0x344'),tier=tier||0x0,dependencies=[],pluginData=$plugins['filter'](function(_0x132e2d){return _0x132e2d[_0x51ad('0x21')]&&_0x132e2d[_0x51ad('0x61')]['includes']('['+label+']');})[0x0];VisuMZ[label][_0x51ad('0x31f')]=VisuMZ[label][_0x51ad('0x31f')]||{},VisuMZ[_0x51ad('0x2da')]=function(_0x47f053,_0x28c9f7){for(const _0x142f3c in _0x28c9f7){if(_0x142f3c['match'](/(.*):(.*)/i)){const _0x1a6c8c=String(RegExp['$1']),_0x4f2875=String(RegExp['$2'])['toUpperCase']()['trim']();let _0x5c640f,_0x3a49eb,_0x51bf3f;switch(_0x4f2875){case _0x51ad('0x2a8'):_0x5c640f=_0x28c9f7[_0x142f3c]!==''?Number(_0x28c9f7[_0x142f3c]):0x0;break;case'ARRAYNUM':_0x3a49eb=_0x28c9f7[_0x142f3c]!==''?JSON[_0x51ad('0xc2')](_0x28c9f7[_0x142f3c]):[],_0x5c640f=_0x3a49eb[_0x51ad('0x82')](_0x31280c=>Number(_0x31280c));break;case _0x51ad('0x94'):_0x5c640f=_0x28c9f7[_0x142f3c]!==''?eval(_0x28c9f7[_0x142f3c]):null;break;case'ARRAYEVAL':_0x3a49eb=_0x28c9f7[_0x142f3c]!==''?JSON[_0x51ad('0xc2')](_0x28c9f7[_0x142f3c]):[],_0x5c640f=_0x3a49eb[_0x51ad('0x82')](_0x539bff=>eval(_0x539bff));break;case'JSON':_0x5c640f=_0x28c9f7[_0x142f3c]!==''?JSON[_0x51ad('0xc2')](_0x28c9f7[_0x142f3c]):'';break;case _0x51ad('0x215'):_0x3a49eb=_0x28c9f7[_0x142f3c]!==''?JSON[_0x51ad('0xc2')](_0x28c9f7[_0x142f3c]):[],_0x5c640f=_0x3a49eb[_0x51ad('0x82')](_0x15149d=>JSON[_0x51ad('0xc2')](_0x15149d));break;case _0x51ad('0x2a0'):_0x5c640f=_0x28c9f7[_0x142f3c]!==''?new Function(JSON[_0x51ad('0xc2')](_0x28c9f7[_0x142f3c])):new Function(_0x51ad('0x4a9'));break;case _0x51ad('0x250'):_0x3a49eb=_0x28c9f7[_0x142f3c]!==''?JSON[_0x51ad('0xc2')](_0x28c9f7[_0x142f3c]):[],_0x5c640f=_0x3a49eb[_0x51ad('0x82')](_0x21473f=>new Function(JSON[_0x51ad('0xc2')](_0x21473f)));break;case _0x51ad('0x5b7'):_0x5c640f=_0x28c9f7[_0x142f3c]!==''?String(_0x28c9f7[_0x142f3c]):'';break;case _0x51ad('0x508'):_0x3a49eb=_0x28c9f7[_0x142f3c]!==''?JSON[_0x51ad('0xc2')](_0x28c9f7[_0x142f3c]):[],_0x5c640f=_0x3a49eb[_0x51ad('0x82')](_0xc51d21=>String(_0xc51d21));break;case'STRUCT':_0x51bf3f=_0x28c9f7[_0x142f3c]!==''?JSON['parse'](_0x28c9f7[_0x142f3c]):{},_0x47f053[_0x1a6c8c]={},VisuMZ[_0x51ad('0x2da')](_0x47f053[_0x1a6c8c],_0x51bf3f);continue;case'ARRAYSTRUCT':_0x3a49eb=_0x28c9f7[_0x142f3c]!==''?JSON['parse'](_0x28c9f7[_0x142f3c]):[],_0x5c640f=_0x3a49eb[_0x51ad('0x82')](_0x25dfdc=>VisuMZ[_0x51ad('0x2da')]({},JSON[_0x51ad('0xc2')](_0x25dfdc)));break;default:continue;}_0x47f053[_0x1a6c8c]=_0x5c640f;}}return _0x47f053;},(_0x1112b6=>{const _0x367bd2=_0x1112b6[_0x51ad('0x50f')];for(const _0x3c2ee0 of dependencies){if(_0x51ad('0x4ab')!==_0x51ad('0x4ab')){function _0x5474bf(){if(_0x29db2f[_0x51ad('0x304')]())_0x3c9bcf[_0x51ad('0x527')](_0x4b6931);}}else{if(!Imported[_0x3c2ee0]){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'['format'](_0x367bd2,_0x3c2ee0)),SceneManager['exit']();break;}}}const _0x18bdce=_0x1112b6[_0x51ad('0x61')];if(_0x18bdce[_0x51ad('0x58b')](/\[Version[ ](.*?)\]/i)){const _0x360673=Number(RegExp['$1']);_0x360673!==VisuMZ[label][_0x51ad('0x340')]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x51ad('0x348')](_0x367bd2,_0x360673)),SceneManager[_0x51ad('0x58a')]());}if(_0x18bdce[_0x51ad('0x58b')](/\[Tier[ ](\d+)\]/i)){if(_0x51ad('0x456')==='RkxMm'){function _0xc9e915(){const _0x52d204=_0x51ad('0x1b8');this[_0x51ad('0x3e')]=this[_0x51ad('0x3e')]||{};if(this['_colorCache'][_0x52d204])return this[_0x51ad('0x3e')][_0x52d204];const _0x245535=_0x25b745[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x34e')][_0x51ad('0x145')];return this[_0x51ad('0x5b2')](_0x52d204,_0x245535);}}else{const _0x56ca81=Number(RegExp['$1']);if(_0x56ca81<tier)alert(_0x51ad('0x288')[_0x51ad('0x348')](_0x367bd2,_0x56ca81,tier)),SceneManager[_0x51ad('0x58a')]();else{if(_0x51ad('0x507')!==_0x51ad('0xc3'))tier=Math[_0x51ad('0x2df')](_0x56ca81,tier);else{function _0x4aceed(){if(this[_0x51ad('0x51b')]())return 0x1;const _0x166393=this[_0x51ad('0x3ec')]()-this['currentLevelExp'](),_0x1bac4c=this[_0x51ad('0x4a')]()-this[_0x51ad('0x43')]();return(_0x1bac4c/_0x166393)[_0x51ad('0x38')](0x0,0x1);}}}}}VisuMZ[_0x51ad('0x2da')](VisuMZ[label][_0x51ad('0x31f')],_0x1112b6[_0x51ad('0xc9')]);})(pluginData),PluginManager[_0x51ad('0x568')](pluginData['name'],'OpenURL',_0x2bd4f4=>{VisuMZ[_0x51ad('0x2da')](_0x2bd4f4,_0x2bd4f4);const _0x257e44=_0x2bd4f4[_0x51ad('0x92')];VisuMZ[_0x51ad('0x32a')](_0x257e44);}),PluginManager[_0x51ad('0x568')](pluginData[_0x51ad('0x50f')],_0x51ad('0x1e9'),_0x1b9ae0=>{VisuMZ['ConvertParams'](_0x1b9ae0,_0x1b9ae0);const _0x3afc8f=_0x1b9ae0['value']||0x0;$gameParty[_0x51ad('0x45c')](_0x3afc8f);}),PluginManager[_0x51ad('0x568')](pluginData[_0x51ad('0x50f')],'PictureEasingType',_0x404af2=>{VisuMZ[_0x51ad('0x2da')](_0x404af2,_0x404af2);const _0x5c9607=_0x404af2[_0x51ad('0x1bb')]||0x1,_0x44dc4b=_0x404af2[_0x51ad('0x4cf')]||_0x51ad('0xdc'),_0x36c450=$gameScreen[_0x51ad('0x166')](_0x5c9607);if(_0x36c450){if(_0x51ad('0x410')===_0x51ad('0x295')){function _0x337381(){if(_0x56687b['CoreEngine'][_0x51ad('0x31f')][_0x51ad('0x2f8')][_0x51ad('0x2f0')])this[_0x51ad('0x422')]();else return _0x48a958[_0x51ad('0x344')]['BattleManager_processEscape'][_0x51ad('0x52')](this);}}else _0x36c450[_0x51ad('0x394')](_0x44dc4b);}}),PluginManager[_0x51ad('0x568')](pluginData[_0x51ad('0x50f')],_0x51ad('0x3cd'),_0x532559=>{VisuMZ[_0x51ad('0x2da')](_0x532559,_0x532559);const _0x19b39d=_0x532559[_0x51ad('0x3d0')]||0x1;$gameSystem['setMainFontSize'](_0x19b39d);}),PluginManager[_0x51ad('0x568')](pluginData[_0x51ad('0x50f')],_0x51ad('0x56'),_0x2fa745=>{if($gameParty['inBattle']())return;VisuMZ['ConvertParams'](_0x2fa745,_0x2fa745);const _0xfd2604=_0x2fa745[_0x51ad('0x3d0')];if(_0xfd2604[_0x51ad('0x58b')](/Front/i)){if(_0x51ad('0x338')!==_0x51ad('0x338')){function _0x181902(){_0x1b228a=_0x236d68[_0x51ad('0x2bb')]-_0x3413dd;}}else $gameSystem[_0x51ad('0x58')](![]);}else{if(_0xfd2604[_0x51ad('0x58b')](/Side/i)){if('GWrRd'!==_0x51ad('0x213'))$gameSystem[_0x51ad('0x58')](!![]);else{function _0x51bdb4(){this['drawTextEx'](_0x4bcdf9[_0x51ad('0x35e')]()[_0x51ad('0x50f')],_0x452358,_0x50be2c,_0x500b8b);}}}else $gameSystem[_0x51ad('0x58')](!$gameSystem[_0x51ad('0x303')]());}}),PluginManager[_0x51ad('0x568')](pluginData[_0x51ad('0x50f')],_0x51ad('0x4c2'),_0x51c25d=>{if($gameParty[_0x51ad('0x45')]())return;VisuMZ[_0x51ad('0x2da')](_0x51c25d,_0x51c25d);const _0x35fb6e=_0x51c25d[_0x51ad('0x3d0')];if(_0x35fb6e[_0x51ad('0x58b')](/Default/i)){if('cliWR'!==_0x51ad('0x7'))$gameSystem[_0x51ad('0x351')](![]);else{function _0x1195f2(){this[_0x51ad('0xe2')][_0x51ad('0xa3')](_0x111c29[_0x51ad('0x3b5')]['StatusParamsBgType']);}}}else _0x35fb6e['match'](/Time/i)?$gameSystem[_0x51ad('0x351')](!![]):$gameSystem[_0x51ad('0x351')](!$gameSystem[_0x51ad('0x3ef')]());}),PluginManager[_0x51ad('0x568')](pluginData[_0x51ad('0x50f')],_0x51ad('0x152'),_0x11a892=>{VisuMZ[_0x51ad('0x2da')](_0x11a892,_0x11a892);const _0x19adb6=_0x11a892['option']||0x1;$gameSystem[_0x51ad('0x115')](_0x19adb6);}),VisuMZ[_0x51ad('0x344')][_0x51ad('0x565')]=Scene_Boot[_0x51ad('0x9c')][_0x51ad('0x193')],Scene_Boot[_0x51ad('0x9c')]['onDatabaseLoaded']=function(){VisuMZ[_0x51ad('0x344')]['Scene_Boot_onDatabaseLoaded'][_0x51ad('0x52')](this),this['process_VisuMZ_CoreEngine_RegExp'](),this['process_VisuMZ_CoreEngine_Notetags'](),this[_0x51ad('0x323')](),this[_0x51ad('0x458')]();},VisuMZ[_0x51ad('0x344')]['RegExp']={},Scene_Boot[_0x51ad('0x9c')][_0x51ad('0x1a7')]=function(){const _0x2cfce7=[_0x51ad('0x588'),_0x51ad('0x1de'),'ATK',_0x51ad('0x251'),'MAT','MDF','AGI',_0x51ad('0x29f')],_0x564234=[_0x51ad('0x22c'),_0x51ad('0x74'),'CRI','CEV','MEV',_0x51ad('0x222'),_0x51ad('0x21c'),_0x51ad('0x47f'),_0x51ad('0x525'),'TRG'],_0x577ac8=[_0x51ad('0x143'),_0x51ad('0x451'),_0x51ad('0x90'),'PHA',_0x51ad('0x316'),_0x51ad('0x564'),'PDR',_0x51ad('0x2eb'),_0x51ad('0x494'),_0x51ad('0x478')],_0x3fbdf5=[_0x2cfce7,_0x564234,_0x577ac8],_0x44319d=[_0x51ad('0x550'),_0x51ad('0x3b3'),'Plus2',_0x51ad('0x3'),_0x51ad('0x221'),_0x51ad('0x3b'),_0x51ad('0x413'),_0x51ad('0x4cb'),_0x51ad('0x32f'),_0x51ad('0x71')];for(const _0x4d06aa of _0x3fbdf5){if(_0x51ad('0x1ed')===_0x51ad('0x2c4')){function _0x44f67b(){return _0x5a8bc5[_0x51ad('0x3b5')][_0x51ad('0x31d')][_0x51ad('0x52')](this);}}else{let _0x2b46d0='';if(_0x4d06aa===_0x2cfce7)_0x2b46d0=_0x51ad('0x12d');if(_0x4d06aa===_0x564234)_0x2b46d0=_0x51ad('0xe4');if(_0x4d06aa===_0x577ac8)_0x2b46d0='sparam';for(type of _0x44319d){let _0x53dfca='%1%2'['format'](_0x2b46d0,type);VisuMZ['CoreEngine']['RegExp'][_0x53dfca]=[],VisuMZ[_0x51ad('0x344')][_0x51ad('0x3e4')][_0x53dfca+'JS']=[];let _0x202f43=_0x51ad('0x3f5');if([_0x51ad('0x550'),_0x51ad('0x4cb')][_0x51ad('0xbc')](type))_0x202f43+='([\x5c+\x5c-]\x5cd+)>';else{if([_0x51ad('0x3b3'),'Flat1'][_0x51ad('0xbc')](type)){if(_0x51ad('0x4c')==='ykYzQ'){function _0x21ce9a(){return 0x0;}}else _0x202f43+=_0x51ad('0x19c');}else{if(['Plus2',_0x51ad('0x71')][_0x51ad('0xbc')](type))_0x202f43+=_0x51ad('0x1cf');else{if(type===_0x51ad('0x3'))_0x202f43+='(\x5cd+)>';else{if(type==='Rate1')_0x202f43+=_0x51ad('0x1f5');else type===_0x51ad('0x413')&&(_0x202f43+=_0x51ad('0xc1'));}}}}for(const _0x4f8bdd of _0x4d06aa){let _0x1000c2=type[_0x51ad('0xe')](/[\d+]/g,'')['toUpperCase']();const _0x2835e1=_0x202f43[_0x51ad('0x348')](_0x4f8bdd,_0x1000c2);VisuMZ[_0x51ad('0x344')][_0x51ad('0x3e4')][_0x53dfca][_0x51ad('0x577')](new RegExp(_0x2835e1,'i'));const _0x459176=_0x51ad('0x106')['format'](_0x4f8bdd,_0x1000c2);VisuMZ[_0x51ad('0x344')][_0x51ad('0x3e4')][_0x53dfca+'JS'][_0x51ad('0x577')](new RegExp(_0x459176,'i'));}}}}},Scene_Boot[_0x51ad('0x9c')][_0x51ad('0x3ba')]=function(){this[_0x51ad('0x0')](),this[_0x51ad('0x3cb')](),this[_0x51ad('0x219')]();},Scene_Boot[_0x51ad('0x9c')][_0x51ad('0x0')]=function(){for(const _0x3c35a2 of $dataActors){if(_0x51ad('0x48e')!=='qpffp'){if(!_0x3c35a2)continue;const _0x518f22=_0x3c35a2[_0x51ad('0xe0')];if(_0x518f22['match'](/<MAX LEVEL:[ ](\d+)>/i)){_0x3c35a2[_0x51ad('0x226')]=Number(RegExp['$1']);if(_0x3c35a2[_0x51ad('0x226')]===0x0)_0x3c35a2[_0x51ad('0x226')]=Number[_0x51ad('0x309')];}_0x518f22[_0x51ad('0x58b')](/<INITIAL LEVEL:[ ](\d+)>/i)&&(_0x3c35a2[_0x51ad('0x4ff')]=Math[_0x51ad('0x471')](Number(RegExp['$1']),_0x3c35a2[_0x51ad('0x226')]));}else{function _0x5caf04(){this[_0x51ad('0x40e')]['x']=_0x1a5d4d[_0x51ad('0x40e')]()['x'],this[_0x51ad('0x40e')]['y']=_0x53a766[_0x51ad('0x40e')]()['y'];}}}},Scene_Boot[_0x51ad('0x9c')][_0x51ad('0x3cb')]=function(){for(const _0x5097fa of $dataActors){if(!_0x5097fa)continue;const _0xeaf116=_0x5097fa[_0x51ad('0xe0')];if(_0x5097fa[_0x51ad('0x39b')]){if(_0x51ad('0x4cd')!==_0x51ad('0x448'))for(const _0x19c3a1 of _0x5097fa[_0x51ad('0x39b')]){if(_0x19c3a1[_0x51ad('0xe0')][_0x51ad('0x58b')](/<LEARN AT LEVEL:[ ](\d+)>/i)){if('IiyUS'===_0x51ad('0x10c'))_0x19c3a1[_0x51ad('0x3db')]=Math[_0x51ad('0x2df')](Number(RegExp['$1']),0x1);else{function _0x4786bf(){_0x58bcf1[_0x51ad('0x344')][_0x51ad('0x268')][_0x51ad('0x52')](this),_0xcf4316['isSideButtonLayout']()&&this[_0x51ad('0x345')]();}}}}else{function _0x15c2da(){this[_0x51ad('0xda')]&&this['onMouseExit'](),this[_0x51ad('0x552')]=![],this[_0x51ad('0xda')]=![];}}}}},Scene_Boot[_0x51ad('0x9c')][_0x51ad('0x219')]=function(){for(const _0x4455c0 of $dataActors){if(!_0x4455c0)continue;_0x4455c0[_0x51ad('0x3db')]=0x1;const _0x5c2ffd=_0x4455c0[_0x51ad('0xe0')];if(_0x5c2ffd[_0x51ad('0x58b')](/<LEVEL:[ ](\d+)>/i))_0x4455c0[_0x51ad('0x3db')]=Number(RegExp['$1']);if(_0x5c2ffd[_0x51ad('0x58b')](/<MAXHP:[ ](\d+)>/i))_0x4455c0[_0x51ad('0x4fc')][0x0]=Number(RegExp['$1']);if(_0x5c2ffd[_0x51ad('0x58b')](/<MAXMP:[ ](\d+)>/i))_0x4455c0[_0x51ad('0x4fc')][0x1]=Number(RegExp['$1']);if(_0x5c2ffd[_0x51ad('0x58b')](/<ATK:[ ](\d+)>/i))_0x4455c0[_0x51ad('0x4fc')][0x2]=Number(RegExp['$1']);if(_0x5c2ffd[_0x51ad('0x58b')](/<DEF:[ ](\d+)>/i))_0x4455c0[_0x51ad('0x4fc')][0x3]=Number(RegExp['$1']);if(_0x5c2ffd[_0x51ad('0x58b')](/<MAT:[ ](\d+)>/i))_0x4455c0[_0x51ad('0x4fc')][0x4]=Number(RegExp['$1']);if(_0x5c2ffd[_0x51ad('0x58b')](/<MDF:[ ](\d+)>/i))_0x4455c0[_0x51ad('0x4fc')][0x5]=Number(RegExp['$1']);if(_0x5c2ffd[_0x51ad('0x58b')](/<AGI:[ ](\d+)>/i))_0x4455c0[_0x51ad('0x4fc')][0x6]=Number(RegExp['$1']);if(_0x5c2ffd[_0x51ad('0x58b')](/<LUK:[ ](\d+)>/i))_0x4455c0[_0x51ad('0x4fc')][0x7]=Number(RegExp['$1']);if(_0x5c2ffd['match'](/<EXP:[ ](\d+)>/i))_0x4455c0[_0x51ad('0x457')]=Number(RegExp['$1']);if(_0x5c2ffd[_0x51ad('0x58b')](/<GOLD:[ ](\d+)>/i))_0x4455c0[_0x51ad('0x33e')]=Number(RegExp['$1']);}},Scene_Boot[_0x51ad('0x9c')][_0x51ad('0x323')]=function(){VisuMZ['CoreEngine'][_0x51ad('0x31f')][_0x51ad('0x2f8')][_0x51ad('0x35b')]&&VisuMZ[_0x51ad('0xba')](!![]);if(VisuMZ['CoreEngine']['Settings'][_0x51ad('0x2f8')]['ModernControls']){if(_0x51ad('0x2d7')===_0x51ad('0xd1')){function _0x1183b1(){return this[_0x51ad('0x4f7')];}}else Input[_0x51ad('0x1f0')][0x23]=_0x51ad('0x4ea'),Input[_0x51ad('0x1f0')][0x24]=_0x51ad('0x318');}},Scene_Boot[_0x51ad('0x9c')][_0x51ad('0x458')]=function(){this[_0x51ad('0x5b3')]();},Scene_Boot[_0x51ad('0x9c')]['process_VisuMZ_CoreEngine_jsQuickFunctions']=function(){const _0x5aa11b=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0xf6')];for(const _0x49e37f of _0x5aa11b){if(_0x51ad('0x42e')!==_0x51ad('0x42e')){function _0x5b7742(){this[_0x51ad('0x2f6')][_0x51ad('0x23d')]<=0x60&&(this['contents'][_0x51ad('0x23d')]+=0x6);}}else{const _0x164efc=_0x49e37f[_0x51ad('0x2ed')][_0x51ad('0xe')](/[ ]/g,''),_0x3f4ebb=_0x49e37f[_0x51ad('0x141')];VisuMZ[_0x51ad('0x344')]['createJsQuickFunction'](_0x164efc,_0x3f4ebb);}}},VisuMZ[_0x51ad('0x344')][_0x51ad('0x1b7')]=function(_0x52ab0f,_0x258647){if(!!window[_0x52ab0f]){if($gameTemp[_0x51ad('0x304')]())console[_0x51ad('0x527')](_0x51ad('0x50a')[_0x51ad('0x348')](_0x52ab0f));}const _0x2a7344=_0x51ad('0x327')[_0x51ad('0x348')](_0x52ab0f,_0x258647);window[_0x52ab0f]=new Function(_0x2a7344);},VisuMZ['CoreEngine'][_0x51ad('0x505')]=Graphics['_defaultStretchMode'],Graphics[_0x51ad('0x52d')]=function(){switch(VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x2f8')][_0x51ad('0x2f')]){case _0x51ad('0x1e4'):return!![];case _0x51ad('0x293'):return![];default:return VisuMZ[_0x51ad('0x344')][_0x51ad('0x505')][_0x51ad('0x52')](this);}},VisuMZ[_0x51ad('0x344')][_0x51ad('0x11a')]=Graphics[_0x51ad('0xf9')],Graphics['printError']=function(_0x38027e,_0x3abf78,_0x142775=null){VisuMZ[_0x51ad('0x344')][_0x51ad('0x11a')][_0x51ad('0x52')](this,_0x38027e,_0x3abf78,_0x142775),VisuMZ[_0x51ad('0xba')](![]);},VisuMZ[_0x51ad('0x344')][_0x51ad('0x3a5')]=Graphics[_0x51ad('0x107')],Graphics[_0x51ad('0x107')]=function(_0x5968f8){VisuMZ['CoreEngine'][_0x51ad('0x3a5')][_0x51ad('0x52')](this,_0x5968f8),this[_0x51ad('0x4b')](_0x5968f8);},Graphics[_0x51ad('0x4b')]=function(_0x1286bd){VisuMZ[_0x51ad('0x344')]['Settings'][_0x51ad('0x2f8')][_0x51ad('0x23b')]&&(_0x1286bd[_0x51ad('0x331')][_0x51ad('0x17b')]=_0x51ad('0x44b'));if(VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x2f8')][_0x51ad('0x7f')]){if('ISlye'!==_0x51ad('0x575')){function _0xee873(){return-0.5*(_0x49d14b[_0x51ad('0x2b9')](0x2,0xa*_0x3a51e2)*_0x26e428[_0x51ad('0x4dc')]((_0x4fe4f5-_0x184f27)*(0x2*_0x51a434['PI'])/_0x3b60f3));}}else _0x1286bd[_0x51ad('0x331')][_0x51ad('0x1dd')]=_0x51ad('0x1d8');}},VisuMZ[_0x51ad('0x344')][_0x51ad('0x55f')]=Bitmap[_0x51ad('0x9c')][_0x51ad('0x3f9')],Bitmap[_0x51ad('0x9c')][_0x51ad('0x3f9')]=function(_0x49bf5e,_0x4bf35a,_0x4d0015,_0x20eed7,_0x4ad913,_0x1dd818){VisuMZ[_0x51ad('0x344')]['Bitmap_drawText'][_0x51ad('0x52')](this,_0x49bf5e,_0x4bf35a,_0x4d0015,_0x20eed7,_0x4ad913,_0x1dd818);},VisuMZ[_0x51ad('0x344')][_0x51ad('0xa9')]=Bitmap[_0x51ad('0x9c')][_0x51ad('0x38b')],Bitmap[_0x51ad('0x9c')]['_drawTextOutline']=function(_0x29d5ef,_0x35c91d,_0x394bb6,_0x58551c){if(VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x2f8')][_0x51ad('0x9b')]){if(_0x51ad('0x64')===_0x51ad('0x64'))this['_drawTextShadow'](_0x29d5ef,_0x35c91d,_0x394bb6,_0x58551c);else{function _0x450b06(){const _0x522246=this[_0x51ad('0x3fc')]();this[_0x51ad('0x55a')](),this[_0x51ad('0x3f9')](this[_0x51ad('0x257')][_0x51ad('0x40')](_0x292ddf,!![]),_0x4ba848,_0x1c24aa,_0x522246,_0x51ad('0x50e'));}}}else VisuMZ[_0x51ad('0x344')][_0x51ad('0xa9')]['call'](this,_0x29d5ef,_0x35c91d,_0x394bb6,_0x58551c);},Bitmap[_0x51ad('0x9c')][_0x51ad('0x329')]=function(_0x34b40d,_0x494c9f,_0x3c8f68,_0x58ca49){const _0x168eae=this[_0x51ad('0xd6')];_0x168eae[_0x51ad('0x242')]=this[_0x51ad('0x51d')],_0x168eae[_0x51ad('0x232')](_0x34b40d,_0x494c9f+0x2,_0x3c8f68+0x2,_0x58ca49);},VisuMZ[_0x51ad('0x344')][_0x51ad('0x187')]=Tilemap[_0x51ad('0x9c')]['_addShadow'],Tilemap['prototype'][_0x51ad('0x38d')]=function(_0x2e1aca,_0x454986,_0x10eb1e,_0x490f00){if($gameMap&&$gameMap[_0x51ad('0x47a')]())return;VisuMZ[_0x51ad('0x344')][_0x51ad('0x187')]['call'](this,_0x2e1aca,_0x454986,_0x10eb1e,_0x490f00);},Tilemap['Renderer']['prototype'][_0x51ad('0xf0')]=function(){this[_0x51ad('0xc6')]();for(let _0xf8f3b1=0x0;_0xf8f3b1<Tilemap[_0x51ad('0x95')][_0x51ad('0x42a')];_0xf8f3b1++){const _0x31decb=new PIXI[(_0x51ad('0x2ef'))]();_0x31decb[_0x51ad('0x2b2')](0x800,0x800),VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')]['QoL'][_0x51ad('0x7f')]&&(_0x31decb[_0x51ad('0x43e')]=PIXI[_0x51ad('0x1d9')][_0x51ad('0x4e7')]),this[_0x51ad('0xb6')][_0x51ad('0x577')](_0x31decb);}},WindowLayer[_0x51ad('0x9c')][_0x51ad('0xb3')]=function(){if(SceneManager&&SceneManager[_0x51ad('0x556')]){if(_0x51ad('0x30b')!==_0x51ad('0x3c4'))return SceneManager[_0x51ad('0x556')]['isWindowMaskingEnabled']();else{function _0x2aa982(){if(!!_0x5f4080[_0x3d25e0]){if(_0x1a0bc8[_0x51ad('0x304')]())_0x3870e7['log'](_0x51ad('0x50a')[_0x51ad('0x348')](_0x287698));}const _0x23988e=_0x51ad('0x327')[_0x51ad('0x348')](_0x2b0af4,_0x1f3441);_0x1d495d[_0x34832a]=new _0x2203d5(_0x23988e);}}}else{if('VsPFK'!==_0x51ad('0x4d7')){function _0x2f8752(){var _0x4e7fcc=_0x78259b(_0x1ec588['$1']);_0x5aeeb0*=_0x4e7fcc;}}else return!![];}},VisuMZ[_0x51ad('0x344')][_0x51ad('0x2e7')]=WindowLayer['prototype'][_0x51ad('0xc0')],WindowLayer[_0x51ad('0x9c')]['render']=function render(_0x25506d){this[_0x51ad('0xb3')]()?VisuMZ[_0x51ad('0x344')][_0x51ad('0x2e7')][_0x51ad('0x52')](this,_0x25506d):this[_0x51ad('0x36e')](_0x25506d);},WindowLayer['prototype'][_0x51ad('0x36e')]=function render(_0x9461c1){if(!this[_0x51ad('0x2d1')])return;const _0x1231a0=new PIXI['Graphics'](),_0x308df7=_0x9461c1['gl'],_0x4bca3f=this[_0x51ad('0x279')][_0x51ad('0xf5')]();_0x9461c1[_0x51ad('0x258')]['forceStencil'](),_0x1231a0[_0x51ad('0xff')]=this['transform'],_0x9461c1['batch']['flush'](),_0x308df7[_0x51ad('0x210')](_0x308df7[_0x51ad('0x4c5')]);while(_0x4bca3f['length']>0x0){if(_0x51ad('0x1a0')!=='gLleo'){function _0x129414(){return 0x0;}}else{const _0x46b9cb=_0x4bca3f[_0x51ad('0x10a')]();_0x46b9cb[_0x51ad('0xa5')]&&_0x46b9cb[_0x51ad('0x2d1')]&&_0x46b9cb['openness']>0x0&&(_0x308df7[_0x51ad('0x12f')](_0x308df7[_0x51ad('0xe1')],0x0,~0x0),_0x308df7[_0x51ad('0x5a2')](_0x308df7[_0x51ad('0x31')],_0x308df7['KEEP'],_0x308df7['KEEP']),_0x46b9cb[_0x51ad('0xc0')](_0x9461c1),_0x9461c1['batch'][_0x51ad('0x326')](),_0x1231a0['clear'](),_0x308df7[_0x51ad('0x12f')](_0x308df7['ALWAYS'],0x1,~0x0),_0x308df7[_0x51ad('0x5a2')](_0x308df7[_0x51ad('0x53c')],_0x308df7[_0x51ad('0x53c')],_0x308df7['REPLACE']),_0x308df7[_0x51ad('0x33f')](_0x308df7[_0x51ad('0x1b1')],_0x308df7[_0x51ad('0x1c9')]),_0x1231a0[_0x51ad('0xc0')](_0x9461c1),_0x9461c1['batch'][_0x51ad('0x326')](),_0x308df7[_0x51ad('0x33f')](_0x308df7['ONE'],_0x308df7[_0x51ad('0x34f')]));}}_0x308df7['disable'](_0x308df7[_0x51ad('0x4c5')]),_0x308df7[_0x51ad('0x127')](_0x308df7[_0x51ad('0x20f')]),_0x308df7[_0x51ad('0x554')](0x0),_0x9461c1[_0x51ad('0x7c')][_0x51ad('0x326')]();for(const _0xad3075 of this[_0x51ad('0x279')]){!_0xad3075[_0x51ad('0xa5')]&&_0xad3075['visible']&&_0xad3075[_0x51ad('0xc0')](_0x9461c1);}_0x9461c1[_0x51ad('0x7c')][_0x51ad('0x326')]();},DataManager[_0x51ad('0x51')]=function(_0x1fbb04){return this[_0x51ad('0x21b')](_0x1fbb04)&&_0x1fbb04[_0x51ad('0x33')]===0x2;},VisuMZ[_0x51ad('0x344')]['DataManager_setupNewGame']=DataManager[_0x51ad('0x10e')],DataManager[_0x51ad('0x10e')]=function(){VisuMZ[_0x51ad('0x344')][_0x51ad('0x599')][_0x51ad('0x52')](this),this[_0x51ad('0x136')]();},DataManager['reservePlayTestNewGameCommonEvent']=function(){if($gameTemp[_0x51ad('0x304')]()){const _0x4b12ae=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x2f8')][_0x51ad('0x543')];if(_0x4b12ae>0x0)$gameTemp['reserveCommonEvent'](_0x4b12ae);}},TextManager[_0x51ad('0x3aa')]=['','','','CANCEL','','',_0x51ad('0x26a'),'',_0x51ad('0x182'),_0x51ad('0xa'),'','',_0x51ad('0x158'),_0x51ad('0x2ba'),_0x51ad('0x49f'),'',_0x51ad('0xb4'),_0x51ad('0x2cd'),'ALT',_0x51ad('0x452'),_0x51ad('0x197'),_0x51ad('0x237'),_0x51ad('0x2d'),_0x51ad('0xca'),_0x51ad('0x114'),_0x51ad('0x1d'),'','ESC','CONVERT',_0x51ad('0x337'),_0x51ad('0x9f'),_0x51ad('0x3ce'),_0x51ad('0x120'),'PGUP','PGDN',_0x51ad('0x101'),_0x51ad('0x43b'),_0x51ad('0x49d'),'UP',_0x51ad('0x54'),_0x51ad('0x44a'),_0x51ad('0x110'),_0x51ad('0x3c0'),'EXECUTE',_0x51ad('0xb5'),_0x51ad('0x3d8'),'DELETE','','0','1','2','3','4','5','6','7','8','9',_0x51ad('0x28a'),_0x51ad('0x2b0'),_0x51ad('0x102'),_0x51ad('0x52a'),_0x51ad('0x388'),'QUESTION_MARK','AT','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','OS_KEY','',_0x51ad('0x1b2'),'','SLEEP',_0x51ad('0x217'),_0x51ad('0x19e'),_0x51ad('0x14c'),_0x51ad('0x96'),_0x51ad('0x15'),_0x51ad('0x1af'),_0x51ad('0x501'),'NUMPAD7',_0x51ad('0x363'),_0x51ad('0x5a8'),_0x51ad('0x45f'),_0x51ad('0x31b'),_0x51ad('0x3b1'),_0x51ad('0x190'),_0x51ad('0x5ac'),_0x51ad('0xc5'),'F1','F2','F3','F4','F5','F6','F7','F8','F9','F10',_0x51ad('0x149'),_0x51ad('0x35'),'F13',_0x51ad('0x2c3'),_0x51ad('0x4e1'),_0x51ad('0x11'),'F17','F18','F19',_0x51ad('0x519'),_0x51ad('0x360'),_0x51ad('0x43a'),_0x51ad('0x238'),_0x51ad('0x4d'),'','','','','','','','','NUM_LOCK',_0x51ad('0x9d'),_0x51ad('0xe9'),'WIN_OEM_FJ_MASSHOU',_0x51ad('0x3fd'),_0x51ad('0x365'),_0x51ad('0x455'),'','','','','','','','','',_0x51ad('0x447'),_0x51ad('0x514'),'DOUBLE_QUOTE',_0x51ad('0x47b'),_0x51ad('0x3b7'),_0x51ad('0x2d4'),_0x51ad('0x5aa'),_0x51ad('0x3fa'),_0x51ad('0xcf'),_0x51ad('0x504'),_0x51ad('0x3d6'),_0x51ad('0x26c'),_0x51ad('0x596'),_0x51ad('0x2c5'),_0x51ad('0xdd'),_0x51ad('0x5b8'),_0x51ad('0x32b'),'','','','',_0x51ad('0x13a'),_0x51ad('0x3ee'),_0x51ad('0x3bd'),'','',_0x51ad('0x2b0'),'EQUALS',_0x51ad('0x49b'),'MINUS',_0x51ad('0x4aa'),_0x51ad('0x414'),_0x51ad('0x4d3'),'','','','','','','','','','','','','','','','','','','','','','','','','','',_0x51ad('0x502'),_0x51ad('0x541'),'CLOSE_BRACKET',_0x51ad('0x383'),'',_0x51ad('0x324'),_0x51ad('0x2a9'),'','WIN_ICO_HELP','WIN_ICO_00','',_0x51ad('0x353'),'','',_0x51ad('0x282'),'WIN_OEM_JUMP',_0x51ad('0x27a'),_0x51ad('0x12c'),_0x51ad('0x534'),_0x51ad('0x26e'),_0x51ad('0x1e5'),'WIN_OEM_ATTN',_0x51ad('0x3bf'),_0x51ad('0x47d'),_0x51ad('0x3d5'),_0x51ad('0x536'),_0x51ad('0x1eb'),_0x51ad('0x37b'),'CRSEL',_0x51ad('0x356'),_0x51ad('0x421'),'PLAY',_0x51ad('0x52f'),'',_0x51ad('0x2e5'),_0x51ad('0x4f2'),''],TextManager[_0x51ad('0x4b5')]=VisuMZ[_0x51ad('0x344')]['Settings'][_0x51ad('0x1d5')][_0x51ad('0x439')],TextManager[_0x51ad('0x40d')]=VisuMZ[_0x51ad('0x344')]['Settings'][_0x51ad('0x1d5')][_0x51ad('0x23e')],TextManager[_0x51ad('0x47e')]=VisuMZ['CoreEngine'][_0x51ad('0x31f')][_0x51ad('0x1d5')]['SwitchActorText'],VisuMZ[_0x51ad('0x344')][_0x51ad('0xb9')]=TextManager[_0x51ad('0x12d')],TextManager['param']=function(_0x206308){if(typeof _0x206308===_0x51ad('0x2d6')){if(_0x51ad('0xb0')!=='nexye'){function _0xf12eb(){_0x4c433e['style'][_0x51ad('0x1dd')]=_0x51ad('0x1d8');}}else return VisuMZ[_0x51ad('0x344')][_0x51ad('0xb9')]['call'](this,_0x206308);}else{if(_0x51ad('0x3e6')!==_0x51ad('0x3e6')){function _0xf0cf42(){this['removeFauxAnimation'](_0x481e07);}}else return this['paramName'](_0x206308);}},TextManager[_0x51ad('0x1da')]=function(_0x73398d){_0x73398d=String(_0x73398d||'')[_0x51ad('0x1fd')]();const _0xb9d33=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x4c9')];if(_0x73398d===_0x51ad('0x588'))return $dataSystem[_0x51ad('0xee')][_0x51ad('0x4fc')][0x0];if(_0x73398d===_0x51ad('0x1de'))return $dataSystem[_0x51ad('0xee')][_0x51ad('0x4fc')][0x1];if(_0x73398d===_0x51ad('0xd7'))return $dataSystem[_0x51ad('0xee')][_0x51ad('0x4fc')][0x2];if(_0x73398d===_0x51ad('0x251'))return $dataSystem[_0x51ad('0xee')][_0x51ad('0x4fc')][0x3];if(_0x73398d===_0x51ad('0x46e'))return $dataSystem[_0x51ad('0xee')][_0x51ad('0x4fc')][0x4];if(_0x73398d===_0x51ad('0x1b0'))return $dataSystem['terms'][_0x51ad('0x4fc')][0x5];if(_0x73398d===_0x51ad('0x3e0'))return $dataSystem[_0x51ad('0xee')][_0x51ad('0x4fc')][0x6];if(_0x73398d===_0x51ad('0x29f'))return $dataSystem['terms'][_0x51ad('0x4fc')][0x7];if(_0x73398d===_0x51ad('0x22c'))return _0xb9d33['XParamVocab0'];if(_0x73398d==='EVA')return _0xb9d33[_0x51ad('0x57b')];if(_0x73398d===_0x51ad('0x487'))return _0xb9d33[_0x51ad('0xbe')];if(_0x73398d==='CEV')return _0xb9d33[_0x51ad('0x489')];if(_0x73398d===_0x51ad('0x178'))return _0xb9d33[_0x51ad('0x3c1')];if(_0x73398d===_0x51ad('0x222'))return _0xb9d33[_0x51ad('0x5d')];if(_0x73398d===_0x51ad('0x21c'))return _0xb9d33[_0x51ad('0x159')];if(_0x73398d===_0x51ad('0x47f'))return _0xb9d33[_0x51ad('0x271')];if(_0x73398d==='MRG')return _0xb9d33['XParamVocab8'];if(_0x73398d===_0x51ad('0x5a3'))return _0xb9d33['XParamVocab9'];if(_0x73398d===_0x51ad('0x143'))return _0xb9d33[_0x51ad('0x52c')];if(_0x73398d===_0x51ad('0x451'))return _0xb9d33[_0x51ad('0xb8')];if(_0x73398d===_0x51ad('0x90'))return _0xb9d33[_0x51ad('0x41f')];if(_0x73398d===_0x51ad('0x4a0'))return _0xb9d33[_0x51ad('0x4f8')];if(_0x73398d===_0x51ad('0x316'))return _0xb9d33[_0x51ad('0x203')];if(_0x73398d===_0x51ad('0x564'))return _0xb9d33[_0x51ad('0x1e6')];if(_0x73398d===_0x51ad('0x46c'))return _0xb9d33[_0x51ad('0x29c')];if(_0x73398d===_0x51ad('0x2eb'))return _0xb9d33[_0x51ad('0x16f')];if(_0x73398d==='FDR')return _0xb9d33[_0x51ad('0x286')];if(_0x73398d===_0x51ad('0x478'))return _0xb9d33['SParamVocab9'];return'';},TextManager[_0x51ad('0x1ef')]=function(_0xb3550e){if(_0xb3550e===_0x51ad('0x4b2'))_0xb3550e='escape';let _0x42ea1d=[];for(let _0x1def1f in Input[_0x51ad('0x1f0')]){_0x1def1f=Number(_0x1def1f);if(_0x1def1f>=0x60&&_0x1def1f<=0x69)continue;if([0x12,0x20][_0x51ad('0xbc')](_0x1def1f))continue;_0xb3550e===Input[_0x51ad('0x1f0')][_0x1def1f]&&_0x42ea1d[_0x51ad('0x577')](_0x1def1f);}for(let _0x28fb90=0x0;_0x28fb90<_0x42ea1d['length'];_0x28fb90++){_0x42ea1d[_0x28fb90]=TextManager[_0x51ad('0x3aa')][_0x42ea1d[_0x28fb90]];}return this[_0x51ad('0x29b')](_0x42ea1d);},TextManager[_0x51ad('0x29b')]=function(_0x3d8ae6){const _0x323a8f=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x1d5')],_0x458c70=_0x323a8f[_0x51ad('0x28c')],_0x5b62da=_0x3d8ae6[_0x51ad('0x3e9')](),_0x331271=_0x51ad('0x517')[_0x51ad('0x348')](_0x5b62da);return _0x323a8f[_0x331271]?_0x323a8f[_0x331271]:_0x458c70[_0x51ad('0x348')](_0x5b62da);},TextManager[_0x51ad('0x13e')]=function(_0x46793d,_0x8cd96f){const _0x186c81=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x1d5')],_0x677dac=_0x186c81['MultiKeyFmt'],_0x1b5676=this[_0x51ad('0x1ef')](_0x46793d),_0x409414=this[_0x51ad('0x1ef')](_0x8cd96f);return _0x677dac['format'](_0x1b5676,_0x409414);},VisuMZ[_0x51ad('0x344')]['ColorManager_loadWindowskin']=ColorManager[_0x51ad('0x321')],ColorManager['loadWindowskin']=function(){VisuMZ[_0x51ad('0x344')][_0x51ad('0x44')][_0x51ad('0x52')](this),this[_0x51ad('0x3e')]=this[_0x51ad('0x3e')]||{};},ColorManager[_0x51ad('0x5b2')]=function(_0x28814b,_0x41504b){_0x41504b=String(_0x41504b),this[_0x51ad('0x3e')]=this[_0x51ad('0x3e')]||{};if(_0x41504b[_0x51ad('0x58b')](/#(.*)/i)){if(_0x51ad('0x10b')===_0x51ad('0x10b'))this[_0x51ad('0x3e')][_0x28814b]='#%1'[_0x51ad('0x348')](String(RegExp['$1']));else{function _0x16ec26(){return _0x2a531e[_0x51ad('0x57f')](_0x582824,this[_0x51ad('0x54c')]);}}}else{if(_0x51ad('0x3cc')!=='mmmqf'){function _0x359bee(){for(const _0x26a6e5 of _0x3b1243[_0x51ad('0x56d')]){const _0x3e8081=new _0x4e34ad(_0x26a6e5);this['addChild'](_0x3e8081);}}}else this[_0x51ad('0x3e')][_0x28814b]=this[_0x51ad('0x2ac')](Number(_0x41504b));}return this[_0x51ad('0x3e')][_0x28814b];},ColorManager[_0x51ad('0xcd')]=function(_0x1fad26){return _0x1fad26[_0x51ad('0x58b')](/#(.*)/i)?_0x51ad('0x491')['format'](String(RegExp['$1'])):this[_0x51ad('0x2ac')](Number(_0x1fad26));},ColorManager[_0x51ad('0x2ad')]=function(){this[_0x51ad('0x3e')]={};},ColorManager[_0x51ad('0x37c')]=function(){const _0xbb4227=_0x51ad('0x1b8');this[_0x51ad('0x3e')]=this['_colorCache']||{};if(this[_0x51ad('0x3e')][_0xbb4227])return this['_colorCache'][_0xbb4227];const _0x522b95=VisuMZ['CoreEngine'][_0x51ad('0x31f')][_0x51ad('0x34e')][_0x51ad('0x145')];return this[_0x51ad('0x5b2')](_0xbb4227,_0x522b95);},ColorManager['systemColor']=function(){const _0x3ad1fd=_0x51ad('0x3b4');this[_0x51ad('0x3e')]=this[_0x51ad('0x3e')]||{};if(this[_0x51ad('0x3e')][_0x3ad1fd])return this['_colorCache'][_0x3ad1fd];const _0x13f0e4=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x34e')][_0x51ad('0x68')];return this[_0x51ad('0x5b2')](_0x3ad1fd,_0x13f0e4);},ColorManager[_0x51ad('0x2f9')]=function(){const _0x5380ee=_0x51ad('0x48a');this[_0x51ad('0x3e')]=this[_0x51ad('0x3e')]||{};if(this[_0x51ad('0x3e')][_0x5380ee])return this[_0x51ad('0x3e')][_0x5380ee];const _0x37e348=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x34e')][_0x51ad('0x333')];return this[_0x51ad('0x5b2')](_0x5380ee,_0x37e348);},ColorManager[_0x51ad('0x2b8')]=function(){const _0x562b4f=_0x51ad('0x6b');this['_colorCache']=this[_0x51ad('0x3e')]||{};if(this[_0x51ad('0x3e')][_0x562b4f])return this[_0x51ad('0x3e')][_0x562b4f];const _0x3732fb=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x34e')][_0x51ad('0x41a')];return this[_0x51ad('0x5b2')](_0x562b4f,_0x3732fb);},ColorManager[_0x51ad('0x2')]=function(){const _0x10af1a=_0x51ad('0x54a');this[_0x51ad('0x3e')]=this[_0x51ad('0x3e')]||{};if(this[_0x51ad('0x3e')][_0x10af1a])return this[_0x51ad('0x3e')][_0x10af1a];const _0x1799a5=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x34e')]['ColorGaugeBack'];return this[_0x51ad('0x5b2')](_0x10af1a,_0x1799a5);},ColorManager['hpGaugeColor1']=function(){const _0xe46d06=_0x51ad('0x132');this[_0x51ad('0x3e')]=this[_0x51ad('0x3e')]||{};if(this[_0x51ad('0x3e')][_0xe46d06])return this[_0x51ad('0x3e')][_0xe46d06];const _0x42aa15=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x34e')]['ColorHPGauge1'];return this['getColorDataFromPluginParameters'](_0xe46d06,_0x42aa15);},ColorManager[_0x51ad('0x29a')]=function(){const _0x288265='_stored_hpGaugeColor2';this[_0x51ad('0x3e')]=this[_0x51ad('0x3e')]||{};if(this['_colorCache'][_0x288265])return this[_0x51ad('0x3e')][_0x288265];const _0x3bde48=VisuMZ[_0x51ad('0x344')]['Settings']['Color'][_0x51ad('0x57')];return this[_0x51ad('0x5b2')](_0x288265,_0x3bde48);},ColorManager[_0x51ad('0x59a')]=function(){const _0x4131df=_0x51ad('0x368');this[_0x51ad('0x3e')]=this[_0x51ad('0x3e')]||{};if(this[_0x51ad('0x3e')][_0x4131df])return this[_0x51ad('0x3e')][_0x4131df];const _0x4c35ed=VisuMZ['CoreEngine']['Settings'][_0x51ad('0x34e')][_0x51ad('0x220')];return this['getColorDataFromPluginParameters'](_0x4131df,_0x4c35ed);},ColorManager[_0x51ad('0x1e3')]=function(){const _0x442f58=_0x51ad('0x206');this[_0x51ad('0x3e')]=this[_0x51ad('0x3e')]||{};if(this['_colorCache'][_0x442f58])return this[_0x51ad('0x3e')][_0x442f58];const _0x40cdec=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x34e')][_0x51ad('0x4')];return this[_0x51ad('0x5b2')](_0x442f58,_0x40cdec);},ColorManager[_0x51ad('0x122')]=function(){const _0x2c7d1f=_0x51ad('0x156');this['_colorCache']=this[_0x51ad('0x3e')]||{};if(this[_0x51ad('0x3e')][_0x2c7d1f])return this[_0x51ad('0x3e')][_0x2c7d1f];const _0x1883c8=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x34e')][_0x51ad('0x7d')];return this[_0x51ad('0x5b2')](_0x2c7d1f,_0x1883c8);},ColorManager[_0x51ad('0xfc')]=function(){const _0x195e96=_0x51ad('0x180');this[_0x51ad('0x3e')]=this[_0x51ad('0x3e')]||{};if(this[_0x51ad('0x3e')][_0x195e96])return this[_0x51ad('0x3e')][_0x195e96];const _0x231fc5=VisuMZ[_0x51ad('0x344')]['Settings'][_0x51ad('0x34e')][_0x51ad('0x440')];return this[_0x51ad('0x5b2')](_0x195e96,_0x231fc5);},ColorManager['powerDownColor']=function(){const _0x571aad='_stored_powerDownColor';this[_0x51ad('0x3e')]=this[_0x51ad('0x3e')]||{};if(this[_0x51ad('0x3e')][_0x571aad])return this[_0x51ad('0x3e')][_0x571aad];const _0xbdbda0=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x34e')][_0x51ad('0x2d3')];return this[_0x51ad('0x5b2')](_0x571aad,_0xbdbda0);},ColorManager[_0x51ad('0x8a')]=function(){const _0x5ea57d='_stored_ctGaugeColor1';this[_0x51ad('0x3e')]=this[_0x51ad('0x3e')]||{};if(this[_0x51ad('0x3e')][_0x5ea57d])return this[_0x51ad('0x3e')][_0x5ea57d];const _0x5780d9=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')]['Color'][_0x51ad('0x1a8')];return this[_0x51ad('0x5b2')](_0x5ea57d,_0x5780d9);},ColorManager[_0x51ad('0xae')]=function(){const _0x283cdc='_stored_ctGaugeColor2';this[_0x51ad('0x3e')]=this['_colorCache']||{};if(this[_0x51ad('0x3e')][_0x283cdc])return this[_0x51ad('0x3e')][_0x283cdc];const _0x413a17=VisuMZ['CoreEngine'][_0x51ad('0x31f')][_0x51ad('0x34e')][_0x51ad('0x4bc')];return this['getColorDataFromPluginParameters'](_0x283cdc,_0x413a17);},ColorManager[_0x51ad('0xa6')]=function(){const _0x58850b=_0x51ad('0xd2');this[_0x51ad('0x3e')]=this['_colorCache']||{};if(this[_0x51ad('0x3e')][_0x58850b])return this[_0x51ad('0x3e')][_0x58850b];const _0x4c3ffd=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x34e')][_0x51ad('0x280')];return this[_0x51ad('0x5b2')](_0x58850b,_0x4c3ffd);},ColorManager[_0x51ad('0x8d')]=function(){const _0x36953e=_0x51ad('0x7e');this[_0x51ad('0x3e')]=this[_0x51ad('0x3e')]||{};if(this[_0x51ad('0x3e')][_0x36953e])return this[_0x51ad('0x3e')][_0x36953e];const _0x470177=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')]['Color'][_0x51ad('0x1c')];return this[_0x51ad('0x5b2')](_0x36953e,_0x470177);},ColorManager[_0x51ad('0x2dd')]=function(){const _0x284fd8=_0x51ad('0x480');this[_0x51ad('0x3e')]=this['_colorCache']||{};if(this[_0x51ad('0x3e')][_0x284fd8])return this[_0x51ad('0x3e')][_0x284fd8];const _0x3199ff=VisuMZ['CoreEngine'][_0x51ad('0x31f')][_0x51ad('0x34e')][_0x51ad('0x4e4')];return this[_0x51ad('0x5b2')](_0x284fd8,_0x3199ff);},ColorManager[_0x51ad('0x181')]=function(){const _0xb81cdc=_0x51ad('0x41');this[_0x51ad('0x3e')]=this['_colorCache']||{};if(this[_0x51ad('0x3e')][_0xb81cdc])return this['_colorCache'][_0xb81cdc];const _0x107d52=VisuMZ['CoreEngine']['Settings'][_0x51ad('0x34e')][_0x51ad('0x4e4')];return this[_0x51ad('0x5b2')](_0xb81cdc,_0x107d52);},ColorManager['expGaugeColor1']=function(){const _0xa8b534=_0x51ad('0x424');this[_0x51ad('0x3e')]=this[_0x51ad('0x3e')]||{};if(this['_colorCache'][_0xa8b534])return this[_0x51ad('0x3e')][_0xa8b534];const _0x333a63=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x34e')][_0x51ad('0x1d3')];return this[_0x51ad('0x5b2')](_0xa8b534,_0x333a63);},ColorManager[_0x51ad('0x5ae')]=function(){const _0x29afbf=_0x51ad('0x134');this['_colorCache']=this[_0x51ad('0x3e')]||{};if(this[_0x51ad('0x3e')][_0x29afbf])return this['_colorCache'][_0x29afbf];const _0x34b5c3=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')]['Color']['ColorExpGauge2'];return this[_0x51ad('0x5b2')](_0x29afbf,_0x34b5c3);},ColorManager[_0x51ad('0x97')]=function(){const _0x1ac3cd=_0x51ad('0x227');this[_0x51ad('0x3e')]=this[_0x51ad('0x3e')]||{};if(this[_0x51ad('0x3e')][_0x1ac3cd])return this[_0x51ad('0x3e')][_0x1ac3cd];const _0x1065a2=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x34e')][_0x51ad('0x57e')];return this[_0x51ad('0x5b2')](_0x1ac3cd,_0x1065a2);},ColorManager[_0x51ad('0x1fa')]=function(){const _0x6fa5a0=_0x51ad('0x4e');this['_colorCache']=this['_colorCache']||{};if(this[_0x51ad('0x3e')][_0x6fa5a0])return this[_0x51ad('0x3e')][_0x6fa5a0];const _0x190200=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x34e')][_0x51ad('0x15a')];return this[_0x51ad('0x5b2')](_0x6fa5a0,_0x190200);},ColorManager[_0x51ad('0x165')]=function(_0x4e19e2){return VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')]['Color'][_0x51ad('0x17a')][_0x51ad('0x52')](this,_0x4e19e2);},ColorManager[_0x51ad('0x69')]=function(_0x3d550e){return VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x34e')][_0x51ad('0x390')]['call'](this,_0x3d550e);},ColorManager[_0x51ad('0x4df')]=function(_0x1bef24){return VisuMZ['CoreEngine']['Settings'][_0x51ad('0x34e')]['ActorTPColor'][_0x51ad('0x52')](this,_0x1bef24);},ColorManager['paramchangeTextColor']=function(_0x4349a2){return VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')]['Color'][_0x51ad('0x1f9')][_0x51ad('0x52')](this,_0x4349a2);},ColorManager[_0x51ad('0x1e1')]=function(_0x4a2f90){return VisuMZ['CoreEngine'][_0x51ad('0x31f')][_0x51ad('0x34e')][_0x51ad('0x4b0')]['call'](this,_0x4a2f90);},ColorManager['outlineColor']=function(){return VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x34e')][_0x51ad('0x22f')];},ColorManager[_0x51ad('0x244')]=function(){return VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x34e')]['DimColor1'];},ColorManager[_0x51ad('0x278')]=function(){return VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x34e')][_0x51ad('0x59c')];},ColorManager[_0x51ad('0x45d')]=function(){return VisuMZ[_0x51ad('0x344')]['Settings']['Color'][_0x51ad('0x1a3')];},ColorManager[_0x51ad('0x1b4')]=function(){return VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')]['Color'][_0x51ad('0x4c8')];},SceneManager[_0x51ad('0x470')]=[],VisuMZ[_0x51ad('0x344')][_0x51ad('0x1c5')]=SceneManager[_0x51ad('0x386')],SceneManager[_0x51ad('0x386')]=function(){VisuMZ[_0x51ad('0x344')][_0x51ad('0x1c5')][_0x51ad('0x52')](this),this[_0x51ad('0x3a2')]();},VisuMZ[_0x51ad('0x344')]['SceneManager_onKeyDown']=SceneManager[_0x51ad('0x31e')],SceneManager['onKeyDown']=function(_0x18fc63){if($gameTemp)this[_0x51ad('0x418')](_0x18fc63);VisuMZ[_0x51ad('0x344')][_0x51ad('0x4de')]['call'](this,_0x18fc63);},SceneManager[_0x51ad('0x418')]=function(_0x44927c){if(!_0x44927c[_0x51ad('0x239')]&&!_0x44927c[_0x51ad('0x352')])switch(_0x44927c[_0x51ad('0x302')]){case 0x75:this['playTestF6']();break;case 0x76:this[_0x51ad('0x1b5')]();break;}},SceneManager['playTestF6']=function(){if($gameTemp[_0x51ad('0x304')]()&&VisuMZ['CoreEngine'][_0x51ad('0x31f')][_0x51ad('0x2f8')]['F6key']){ConfigManager[_0x51ad('0x55b')]!==0x0?(ConfigManager[_0x51ad('0xc')]=0x0,ConfigManager[_0x51ad('0x335')]=0x0,ConfigManager[_0x51ad('0x140')]=0x0,ConfigManager[_0x51ad('0x55b')]=0x0):(ConfigManager[_0x51ad('0xc')]=0x64,ConfigManager[_0x51ad('0x335')]=0x64,ConfigManager[_0x51ad('0x140')]=0x64,ConfigManager[_0x51ad('0x55b')]=0x64);ConfigManager[_0x51ad('0x1be')]();if(this['_scene'][_0x51ad('0x56c')]===Scene_Options){if(this['_scene'][_0x51ad('0x2fe')])this[_0x51ad('0x556')][_0x51ad('0x2fe')]['refresh']();if(this[_0x51ad('0x556')][_0x51ad('0x3f1')])this['_scene'][_0x51ad('0x3f1')][_0x51ad('0x4da')]();}}},SceneManager['playTestF7']=function(){$gameTemp[_0x51ad('0x304')]()&&VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x2f8')][_0x51ad('0x5b5')]&&($gameTemp[_0x51ad('0x147')]=!$gameTemp['_playTestFastMode']);},SceneManager[_0x51ad('0x3a2')]=function(){this[_0x51ad('0x4f7')]=![],this['_hideButtons']=!VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')]['UI'][_0x51ad('0x46d')];},SceneManager[_0x51ad('0x4fe')]=function(_0x4739a0){if(VisuMZ['CoreEngine'][_0x51ad('0x31f')]['UI'][_0x51ad('0x3e7')]){if(_0x51ad('0xc8')!=='SaOLv'){function _0x390f81(){_0x54e93e[_0x51ad('0x4ff')]=_0xb03b28['min'](_0x3223ab(_0x1fd4d8['$1']),_0x392c97[_0x51ad('0x226')]);}}else this['_sideButtonLayout']=_0x4739a0;}},SceneManager[_0x51ad('0x33d')]=function(){return this[_0x51ad('0x4f7')];},SceneManager['areButtonsHidden']=function(){return this[_0x51ad('0x5f')];},SceneManager[_0x51ad('0x212')]=function(){return this[_0x51ad('0x6a')]()||this['isSideButtonLayout']();},VisuMZ[_0x51ad('0x344')][_0x51ad('0x56e')]=SceneManager[_0x51ad('0x4e8')],SceneManager['isGameActive']=function(){if(VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x2f8')]['RequireFocus']){if(_0x51ad('0x1ae')===_0x51ad('0x200')){function _0x27da62(){for(const _0x38830a of _0x526744[_0x51ad('0x308')]){if(_0x38830a[_0x51ad('0x13b')][_0x51ad('0x52')](this)){const _0x2e9509=_0x38830a[_0x51ad('0x15b')];let _0x127f7f=_0x38830a[_0x51ad('0x476')];if(['','Untitled']['includes'](_0x127f7f))_0x127f7f=_0x38830a[_0x51ad('0xeb')][_0x51ad('0x52')](this);const _0x295045=_0x38830a[_0x51ad('0x384')]['call'](this),_0x1a6aa8=_0x38830a[_0x51ad('0x284')][_0x51ad('0x52')](this);this[_0x51ad('0x48d')](_0x127f7f,_0x2e9509,_0x295045,_0x1a6aa8),this[_0x51ad('0x42c')](_0x2e9509,_0x38830a['CallHandlerJS'][_0x51ad('0x3a9')](this,_0x1a6aa8));}}}}else return VisuMZ[_0x51ad('0x344')][_0x51ad('0x56e')][_0x51ad('0x52')](this);}else return!![];},VisuMZ[_0x51ad('0x344')][_0x51ad('0x59')]=BattleManager[_0x51ad('0x1ce')],BattleManager[_0x51ad('0x1ce')]=function(){if(VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')]['QoL'][_0x51ad('0x2f0')])this[_0x51ad('0x422')]();else return VisuMZ['CoreEngine'][_0x51ad('0x59')]['call'](this);},BattleManager[_0x51ad('0x422')]=function(){return $gameParty[_0x51ad('0x29')](),SoundManager[_0x51ad('0x4b8')](),this[_0x51ad('0x1ea')](),!![];},VisuMZ['CoreEngine'][_0x51ad('0x30d')]=Game_Temp[_0x51ad('0x9c')][_0x51ad('0x386')],Game_Temp[_0x51ad('0x9c')][_0x51ad('0x386')]=function(){VisuMZ[_0x51ad('0x344')]['Game_Temp_initialize'][_0x51ad('0x52')](this),this[_0x51ad('0x103')](),this['createFauxAnimationQueue']();},Game_Temp[_0x51ad('0x9c')][_0x51ad('0x103')]=function(){VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x2f8')][_0x51ad('0x53f')]&&(this[_0x51ad('0x66')]=![]);},Game_Temp[_0x51ad('0x9c')][_0x51ad('0x346')]=function(){this[_0x51ad('0x3d9')]=[];},Game_Temp['prototype'][_0x51ad('0x3a1')]=function(_0x35a540,_0x3cae0e,_0x570f49,_0x1a5ea7){if(!this[_0x51ad('0x225')]())return;_0x570f49=_0x570f49||![],_0x1a5ea7=_0x1a5ea7||![];if($dataAnimations[_0x3cae0e]){const _0x107780={'targets':_0x35a540,'animationId':_0x3cae0e,'mirror':_0x570f49,'mute':_0x1a5ea7};this['_fauxAnimationQueue']['push'](_0x107780);for(const _0x12dccd of _0x35a540){if(_0x51ad('0x4d5')!==_0x51ad('0x560')){if(_0x12dccd[_0x51ad('0x5a0')]){if('FEdFG'===_0x51ad('0x30e'))_0x12dccd['startAnimation']();else{function _0x19da36(){const _0x5dd848=_0x37c539[_0x51ad('0x486')]()*_0x4e2d91['tileWidth']();return this['_x']-_0x5dd848;}}}}else{function _0x2ad68f(){let _0x2e6356=_0x51ad('0x12d')+_0x1ef1a4+_0x51ad('0x298');if(this[_0x51ad('0x573')](_0x2e6356))return this[_0x51ad('0x43f')][_0x2e6356];return this[_0x51ad('0x43f')][_0x2e6356]=_0x4f12ad[_0x51ad('0x57d')](_0x368f50[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x4c9')][_0x51ad('0x1bd')]['call'](this,_0x4758af)),this['_cache'][_0x2e6356];}}}}},Game_Temp[_0x51ad('0x9c')][_0x51ad('0x225')]=function(){return!![];},Game_Temp[_0x51ad('0x9c')][_0x51ad('0x481')]=function(){return this['_fauxAnimationQueue'][_0x51ad('0x10a')]();},VisuMZ[_0x51ad('0x344')][_0x51ad('0x4f4')]=Game_System[_0x51ad('0x9c')][_0x51ad('0x386')],Game_System[_0x51ad('0x9c')]['initialize']=function(){VisuMZ[_0x51ad('0x344')][_0x51ad('0x4f4')][_0x51ad('0x52')](this),this[_0x51ad('0x4ca')]();},Game_System['prototype'][_0x51ad('0x4ca')]=function(){this[_0x51ad('0x109')]={'SideView':$dataSystem[_0x51ad('0x75')],'TimeProgress':$dataSystem['optTimeProgress'],'FontSize':$dataSystem[_0x51ad('0x467')][_0x51ad('0x23d')],'Padding':0xc};},Game_System[_0x51ad('0x9c')][_0x51ad('0x303')]=function(){if(this[_0x51ad('0x109')]===undefined)this[_0x51ad('0x4ca')]();if(this[_0x51ad('0x109')]['SideView']===undefined)this[_0x51ad('0x4ca')]();return this[_0x51ad('0x109')][_0x51ad('0x1f6')];},Game_System[_0x51ad('0x9c')][_0x51ad('0x58')]=function(_0x3eb9d7){if(this[_0x51ad('0x109')]===undefined)this[_0x51ad('0x4ca')]();if(this[_0x51ad('0x109')][_0x51ad('0x1f6')]===undefined)this[_0x51ad('0x4ca')]();this[_0x51ad('0x109')][_0x51ad('0x1f6')]=_0x3eb9d7;},Game_System[_0x51ad('0x9c')][_0x51ad('0x3ef')]=function(){if(this['_CoreEngineSettings']===undefined)this[_0x51ad('0x4ca')]();if(this[_0x51ad('0x109')][_0x51ad('0x17d')]===undefined)this[_0x51ad('0x4ca')]();return this[_0x51ad('0x109')][_0x51ad('0x17d')];},Game_System[_0x51ad('0x9c')][_0x51ad('0x351')]=function(_0x2d2cd3){if(this[_0x51ad('0x109')]===undefined)this['initCoreEngine']();if(this[_0x51ad('0x109')][_0x51ad('0x17d')]===undefined)this[_0x51ad('0x4ca')]();this[_0x51ad('0x109')][_0x51ad('0x17d')]=_0x2d2cd3;},Game_System[_0x51ad('0x9c')][_0x51ad('0x515')]=function(){if(this[_0x51ad('0x109')]===undefined)this[_0x51ad('0x4ca')]();if(this['_CoreEngineSettings'][_0x51ad('0x524')]===undefined)this[_0x51ad('0x4ca')]();return this['_CoreEngineSettings'][_0x51ad('0x524')];},Game_System['prototype'][_0x51ad('0x409')]=function(_0x505aa9){if(this[_0x51ad('0x109')]===undefined)this['initCoreEngine']();if(this[_0x51ad('0x109')][_0x51ad('0x17d')]===undefined)this['initCoreEngine']();this['_CoreEngineSettings'][_0x51ad('0x524')]=_0x505aa9;},Game_System[_0x51ad('0x9c')][_0x51ad('0x35c')]=function(){if(this[_0x51ad('0x109')]===undefined)this[_0x51ad('0x4ca')]();if(this[_0x51ad('0x109')][_0x51ad('0xf8')]===undefined)this[_0x51ad('0x4ca')]();return this[_0x51ad('0x109')][_0x51ad('0xf8')];},Game_System[_0x51ad('0x9c')][_0x51ad('0x115')]=function(_0x51921e){if(this[_0x51ad('0x109')]===undefined)this['initCoreEngine']();if(this['_CoreEngineSettings'][_0x51ad('0x17d')]===undefined)this['initCoreEngine']();this[_0x51ad('0x109')][_0x51ad('0xf8')]=_0x51921e;},Game_Picture[_0x51ad('0x9c')]['isMapScrollLinked']=function(){if($gameParty[_0x51ad('0x45')]())return![];return this[_0x51ad('0x50f')]()&&this[_0x51ad('0x50f')]()[_0x51ad('0x5')](0x0)==='!';},VisuMZ[_0x51ad('0x344')][_0x51ad('0x30')]=Game_Picture[_0x51ad('0x9c')]['x'],Game_Picture[_0x51ad('0x9c')]['x']=function(){return this[_0x51ad('0x13')]()?this[_0x51ad('0x2d2')]():VisuMZ[_0x51ad('0x344')][_0x51ad('0x30')][_0x51ad('0x52')](this);},Game_Picture['prototype'][_0x51ad('0x2d2')]=function(){const _0x5ce807=$gameMap['displayX']()*$gameMap['tileWidth']();return this['_x']-_0x5ce807;},VisuMZ['CoreEngine'][_0x51ad('0x1fe')]=Game_Picture[_0x51ad('0x9c')]['y'],Game_Picture[_0x51ad('0x9c')]['y']=function(){return this[_0x51ad('0x13')]()?this['yScrollLinkedOffset']():VisuMZ['CoreEngine'][_0x51ad('0x1fe')][_0x51ad('0x52')](this);},Game_Picture['prototype'][_0x51ad('0x3f0')]=function(){const _0x3c1a52=$gameMap[_0x51ad('0x18d')]()*$gameMap[_0x51ad('0xce')]();return this['_y']-_0x3c1a52;},Game_Picture[_0x51ad('0x9c')][_0x51ad('0x394')]=function(_0x43c719){this['_coreEasingType']=_0x43c719;},VisuMZ[_0x51ad('0x344')][_0x51ad('0x3ab')]=Game_Picture[_0x51ad('0x9c')][_0x51ad('0x473')],Game_Picture[_0x51ad('0x9c')][_0x51ad('0x473')]=function(_0x5865b8){this[_0x51ad('0x54c')]=this[_0x51ad('0x54c')]||0x0;if([0x0,0x1,0x2,0x3][_0x51ad('0xbc')](this[_0x51ad('0x54c')])){if(_0x51ad('0x313')!==_0x51ad('0x313')){function _0xe7bea7(){return _0x32eeff[_0x51ad('0x2bb')]-this['helpAreaHeight']();}}else return VisuMZ[_0x51ad('0x344')][_0x51ad('0x3ab')][_0x51ad('0x52')](this,_0x5865b8);}else{if(_0x51ad('0xd')!=='LyYCm'){function _0x27b029(){_0x20869f+=_0x51ad('0xc1');}}else return VisuMZ[_0x51ad('0x57f')](_0x5865b8,this[_0x51ad('0x54c')]);}},VisuMZ[_0x51ad('0x344')]['Game_Action_itemHit']=Game_Action['prototype'][_0x51ad('0x4a4')],Game_Action['prototype']['itemHit']=function(_0x3cd998){if(VisuMZ['CoreEngine'][_0x51ad('0x31f')][_0x51ad('0x2f8')][_0x51ad('0x4e2')])return this[_0x51ad('0x17f')](_0x3cd998);else{if(_0x51ad('0x578')===_0x51ad('0x14f')){function _0x33134f(){return'';}}else return VisuMZ[_0x51ad('0x344')][_0x51ad('0x3bb')][_0x51ad('0x52')](this,_0x3cd998);}},Game_Action[_0x51ad('0x9c')][_0x51ad('0x17f')]=function(_0x1ecc49){const _0x492147=this['itemSuccessRate'](_0x1ecc49),_0x52eefc=this[_0x51ad('0x569')](_0x1ecc49),_0x5b789e=this[_0x51ad('0x125')](_0x1ecc49);return _0x492147*(_0x52eefc-_0x5b789e);},VisuMZ[_0x51ad('0x344')][_0x51ad('0x1fc')]=Game_Action[_0x51ad('0x9c')][_0x51ad('0x111')],Game_Action[_0x51ad('0x9c')][_0x51ad('0x111')]=function(_0x56c701){return VisuMZ[_0x51ad('0x344')]['Settings'][_0x51ad('0x2f8')][_0x51ad('0x4e2')]?0x0:VisuMZ[_0x51ad('0x344')][_0x51ad('0x1fc')]['call'](this,_0x56c701);},Game_Action[_0x51ad('0x9c')][_0x51ad('0x168')]=function(_0x34ff04){return this[_0x51ad('0xf2')]()['successRate']*0.01;},Game_Action[_0x51ad('0x9c')][_0x51ad('0x569')]=function(_0x2b99f4){if(VisuMZ['CoreEngine'][_0x51ad('0x31f')][_0x51ad('0x2f8')][_0x51ad('0x93')]&&this[_0x51ad('0x21b')]())return 0x1;if(this[_0x51ad('0x58c')]()){if(VisuMZ[_0x51ad('0x344')]['Settings'][_0x51ad('0x2f8')][_0x51ad('0x93')]&&this[_0x51ad('0x53a')]()[_0x51ad('0xac')]())return this[_0x51ad('0x53a')]()[_0x51ad('0x1f7')]+0.05;else{if('UkwhK'!==_0x51ad('0x4c3')){function _0x1608d5(){_0x395e37=_0x8c22f1[_0x51ad('0x56f')](_0xa49cf4);}}else return this[_0x51ad('0x53a')]()[_0x51ad('0x1f7')];}}else{if(_0x51ad('0x325')!==_0x51ad('0x146'))return 0x1;else{function _0x117270(){const _0x1c9892=_0x173fc9[_0x51ad('0x467')][_0x51ad('0x228')],_0x3058d9=_0x5e1fce['advanced'][_0x51ad('0x1c4')],_0x2f7436=_0x2eeff4[_0x51ad('0x344')][_0x51ad('0x31f')]['UI']['BoxMargin'];_0x59b0f2[_0x51ad('0x184')]=_0x1c9892-_0x2f7436*0x2,_0x2a5fca[_0x51ad('0x2bb')]=_0x3058d9-_0x2f7436*0x2,this['determineSideButtonLayoutValid']();}}}},Game_Action['prototype'][_0x51ad('0x125')]=function(_0x1f7caf){if(this[_0x51ad('0x53a')]()[_0x51ad('0xac')]()===_0x1f7caf[_0x51ad('0xac')]())return 0x0;if(this[_0x51ad('0x58c')]())return VisuMZ[_0x51ad('0x344')]['Settings'][_0x51ad('0x2f8')][_0x51ad('0x93')]&&_0x1f7caf[_0x51ad('0x119')]()?_0x1f7caf[_0x51ad('0x2e0')]-0.05:_0x1f7caf[_0x51ad('0x2e0')];else{if(this[_0x51ad('0x241')]()){if(_0x51ad('0x13c')===_0x51ad('0x392')){function _0x38644f(){_0x1ed3cf['CoreEngine'][_0x51ad('0x3a5')][_0x51ad('0x52')](this,_0x1c093c),this[_0x51ad('0x4b')](_0x4bcf22);}}else return _0x1f7caf[_0x51ad('0x34d')];}else{if(_0x51ad('0x27b')===_0x51ad('0x27b'))return 0x0;else{function _0x163cdd(){if(_0x43da5e['CoreEngine']['Settings']['UI'][_0x51ad('0x3e7')]){const _0x17d394=_0x19f09e[_0x51ad('0x44f')]-_0x4b6bfb[_0x51ad('0x184')]-_0xbb7f39[_0x51ad('0x344')]['Settings']['UI']['BoxMargin']*0x2,_0x914f6f=_0x24df39['prototype'][_0x51ad('0x53e')][_0x51ad('0x52')](this)*0x4;if(_0x17d394>=_0x914f6f)_0x104934[_0x51ad('0x4fe')](!![]);}}}}}},VisuMZ['CoreEngine'][_0x51ad('0x1d4')]=Game_BattlerBase[_0x51ad('0x9c')]['initMembers'],Game_BattlerBase['prototype'][_0x51ad('0x236')]=function(){this[_0x51ad('0x43f')]={},VisuMZ[_0x51ad('0x344')][_0x51ad('0x1d4')]['call'](this);},VisuMZ['CoreEngine'][_0x51ad('0x2ec')]=Game_BattlerBase[_0x51ad('0x9c')][_0x51ad('0x4da')],Game_BattlerBase[_0x51ad('0x9c')][_0x51ad('0x4da')]=function(){this['_cache']={},VisuMZ[_0x51ad('0x344')][_0x51ad('0x2ec')][_0x51ad('0x52')](this);},Game_BattlerBase[_0x51ad('0x9c')][_0x51ad('0x573')]=function(_0x4bf590){return this['_cache']=this['_cache']||{},this[_0x51ad('0x43f')][_0x4bf590]!==undefined;},Game_BattlerBase['prototype'][_0x51ad('0x1e7')]=function(_0x578b37){const _0x475c41=(_0x5c43e2,_0x27ac8e)=>{if(_0x51ad('0x4c6')===_0x51ad('0x570')){function _0x411e05(){return this[_0x51ad('0x4fa')]['length']>0x0;}}else{if(!_0x27ac8e)return _0x5c43e2;if(_0x27ac8e['note'][_0x51ad('0x58b')](VisuMZ['CoreEngine'][_0x51ad('0x3e4')][_0x51ad('0x1e7')][_0x578b37])){if(_0x51ad('0x62')===_0x51ad('0x62')){var _0x236911=Number(RegExp['$1']);_0x5c43e2+=_0x236911;}else{function _0x70d6ac(){var _0x32bac3=_0x59456f(_0x3fb229['$1']);try{_0x7d20d+=_0x2ec727(_0x32bac3);}catch(_0x3669a6){if(_0x1a771b[_0x51ad('0x304')]())_0x53a4fd[_0x51ad('0x527')](_0x3669a6);}}}}if(_0x27ac8e[_0x51ad('0xe0')][_0x51ad('0x58b')](VisuMZ['CoreEngine'][_0x51ad('0x3e4')][_0x51ad('0x538')][_0x578b37])){var _0x35bb35=String(RegExp['$1']);try{_0x5c43e2+=eval(_0x35bb35);}catch(_0x16d504){if($gameTemp[_0x51ad('0x304')]())console['log'](_0x16d504);}}return _0x5c43e2;}};return this[_0x51ad('0xf')]()['reduce'](_0x475c41,this[_0x51ad('0x372')][_0x578b37]);},Game_BattlerBase[_0x51ad('0x9c')][_0x51ad('0x23c')]=function(_0x87c027){var _0x18e96f=_0x51ad('0x3e2')+(this[_0x51ad('0xac')]()?_0x51ad('0x105'):_0x51ad('0x199'))+_0x51ad('0x18')+_0x87c027;if(this[_0x51ad('0x573')](_0x18e96f))return this['_cache'][_0x18e96f];this[_0x51ad('0x43f')][_0x18e96f]=eval(VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x4c9')][_0x18e96f]);const _0x14cfc8=(_0x203060,_0x3cc782)=>{if(!_0x3cc782)return _0x203060;if(_0x3cc782['note'][_0x51ad('0x58b')](VisuMZ[_0x51ad('0x344')][_0x51ad('0x3e4')]['paramMax'][_0x87c027])){var _0x480d50=Number(RegExp['$1']);if(_0x480d50===0x0)_0x480d50=Number[_0x51ad('0x309')];_0x203060=Math[_0x51ad('0x2df')](_0x203060,_0x480d50);}if(_0x3cc782[_0x51ad('0xe0')]['match'](VisuMZ[_0x51ad('0x344')][_0x51ad('0x3e4')][_0x51ad('0x312')][_0x87c027])){if(_0x51ad('0x3e8')!==_0x51ad('0x3e8')){function _0x30dfcb(){this['_coreEasingType']=_0x7cf898;}}else{var _0x2675b6=String(RegExp['$1']);try{_0x203060=Math[_0x51ad('0x2df')](_0x203060,Number(eval(_0x2675b6)));}catch(_0x368935){if('SMxul'!=='xZMtD'){if($gameTemp[_0x51ad('0x304')]())console['log'](_0x368935);}else{function _0x3a9e2f(){_0x1b96da+=_0x293d1f(_0x291c2c);}}}}}return _0x203060;};if(this[_0x51ad('0x43f')][_0x18e96f]===0x0)this['_cache'][_0x18e96f]=Number[_0x51ad('0x309')];return this[_0x51ad('0x43f')][_0x18e96f]=this['traitObjects']()[_0x51ad('0x533')](_0x14cfc8,this[_0x51ad('0x43f')][_0x18e96f]),this['_cache'][_0x18e96f];},Game_BattlerBase['prototype'][_0x51ad('0x100')]=function(_0x150c9d){const _0x1dc895=this[_0x51ad('0x364')](Game_BattlerBase[_0x51ad('0x369')],_0x150c9d),_0x10c5c8=(_0x30df34,_0x30c300)=>{if(!_0x30c300)return _0x30df34;if(_0x30c300[_0x51ad('0xe0')][_0x51ad('0x58b')](VisuMZ[_0x51ad('0x344')][_0x51ad('0x3e4')][_0x51ad('0x2ff')][_0x150c9d])){var _0x2fd7c3=Number(RegExp['$1'])/0x64;_0x30df34*=_0x2fd7c3;}if(_0x30c300[_0x51ad('0xe0')]['match'](VisuMZ[_0x51ad('0x344')][_0x51ad('0x3e4')][_0x51ad('0x466')][_0x150c9d])){var _0x2fd7c3=Number(RegExp['$1']);_0x30df34*=_0x2fd7c3;}if(_0x30c300['note'][_0x51ad('0x58b')](VisuMZ[_0x51ad('0x344')][_0x51ad('0x3e4')][_0x51ad('0x26')][_0x150c9d])){var _0x58c503=String(RegExp['$1']);try{if(_0x51ad('0x38f')===_0x51ad('0x38f'))_0x30df34*=eval(_0x58c503);else{function _0x2d54d8(){return _0x30b62b[_0x51ad('0x3b5')][_0x51ad('0xbf')][_0x51ad('0x52')](this);}}}catch(_0xdb0c14){if(_0x51ad('0x4c4')!=='LNrUl'){if($gameTemp['isPlaytest']())console[_0x51ad('0x527')](_0xdb0c14);}else{function _0x4bc264(){_0xa9232c[_0x51ad('0x351')](![]);}}}}return _0x30df34;};return this[_0x51ad('0xf')]()[_0x51ad('0x533')](_0x10c5c8,_0x1dc895);},Game_BattlerBase[_0x51ad('0x9c')][_0x51ad('0x204')]=function(_0x2a903c){const _0x16067a=(_0x3b934b,_0x5e8c2a)=>{if(!_0x5e8c2a)return _0x3b934b;if(_0x5e8c2a[_0x51ad('0xe0')]['match'](VisuMZ[_0x51ad('0x344')]['RegExp'][_0x51ad('0x450')][_0x2a903c])){var _0x4fc438=Number(RegExp['$1']);_0x3b934b+=_0x4fc438;}if(_0x5e8c2a[_0x51ad('0xe0')][_0x51ad('0x58b')](VisuMZ[_0x51ad('0x344')][_0x51ad('0x3e4')][_0x51ad('0x18f')][_0x2a903c])){var _0x437397=String(RegExp['$1']);try{if(_0x51ad('0x144')!=='nJUOM'){function _0x4d0905(){const _0x4e98bd=_0x5fb683['CoreEngine'][_0x51ad('0x31f')][_0x51ad('0xf6')];for(const _0x5a2cab of _0x4e98bd){const _0x4377e3=_0x5a2cab[_0x51ad('0x2ed')]['replace'](/[ ]/g,''),_0xdc53f8=_0x5a2cab[_0x51ad('0x141')];_0x527353[_0x51ad('0x344')][_0x51ad('0x1b7')](_0x4377e3,_0xdc53f8);}}}else _0x3b934b+=eval(_0x437397);}catch(_0x10bd9f){if($gameTemp[_0x51ad('0x304')]())console[_0x51ad('0x527')](_0x10bd9f);}}return _0x3b934b;};return this[_0x51ad('0xf')]()[_0x51ad('0x533')](_0x16067a,0x0);},Game_BattlerBase['prototype'][_0x51ad('0x12d')]=function(_0x404a6d){let _0x19a6d0=_0x51ad('0x12d')+_0x404a6d+_0x51ad('0x298');if(this[_0x51ad('0x573')](_0x19a6d0))return this[_0x51ad('0x43f')][_0x19a6d0];return this[_0x51ad('0x43f')][_0x19a6d0]=Math[_0x51ad('0x57d')](VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x4c9')]['BasicParameterFormula'][_0x51ad('0x52')](this,_0x404a6d)),this[_0x51ad('0x43f')][_0x19a6d0];},Game_BattlerBase[_0x51ad('0x9c')][_0x51ad('0x342')]=function(_0x51a6b4){const _0x239892=(_0x2d3eac,_0x307677)=>{if(!_0x307677)return _0x2d3eac;if(_0x307677[_0x51ad('0xe0')][_0x51ad('0x58b')](VisuMZ[_0x51ad('0x344')]['RegExp'][_0x51ad('0x469')][_0x51a6b4])){var _0x17b6d2=Number(RegExp['$1'])/0x64;_0x2d3eac+=_0x17b6d2;}if(_0x307677['note'][_0x51ad('0x58b')](VisuMZ[_0x51ad('0x344')][_0x51ad('0x3e4')]['xparamPlus2'][_0x51a6b4])){var _0x17b6d2=Number(RegExp['$1']);_0x2d3eac+=_0x17b6d2;}if(_0x307677[_0x51ad('0xe0')][_0x51ad('0x58b')](VisuMZ[_0x51ad('0x344')]['RegExp'][_0x51ad('0x1a4')][_0x51a6b4])){var _0x15fa46=String(RegExp['$1']);try{_0x2d3eac+=eval(_0x15fa46);}catch(_0x2c10c5){if('mlxwB'===_0x51ad('0x387')){function _0x47906e(){return 7.5625*_0x29803d*_0x56ba8e;}}else{if($gameTemp[_0x51ad('0x304')]())console[_0x51ad('0x527')](_0x2c10c5);}}}return _0x2d3eac;};return this[_0x51ad('0xf')]()[_0x51ad('0x533')](_0x239892,0x0);},Game_BattlerBase[_0x51ad('0x9c')][_0x51ad('0x20c')]=function(_0x4e6162){const _0x898a71=(_0xeb1e99,_0x409047)=>{if(!_0x409047)return _0xeb1e99;if(_0x409047[_0x51ad('0xe0')]['match'](VisuMZ[_0x51ad('0x344')]['RegExp']['xparamRate1'][_0x4e6162])){var _0x44a977=Number(RegExp['$1'])/0x64;_0xeb1e99*=_0x44a977;}if(_0x409047[_0x51ad('0xe0')]['match'](VisuMZ[_0x51ad('0x344')][_0x51ad('0x3e4')][_0x51ad('0x4f5')][_0x4e6162])){var _0x44a977=Number(RegExp['$1']);_0xeb1e99*=_0x44a977;}if(_0x409047[_0x51ad('0xe0')][_0x51ad('0x58b')](VisuMZ[_0x51ad('0x344')]['RegExp'][_0x51ad('0x2cf')][_0x4e6162])){if('cGaLN'!==_0x51ad('0x131')){var _0x3491ec=String(RegExp['$1']);try{_0xeb1e99*=eval(_0x3491ec);}catch(_0x28e184){if(_0x51ad('0xde')===_0x51ad('0xde')){if($gameTemp[_0x51ad('0x304')]())console[_0x51ad('0x527')](_0x28e184);}else{function _0x212270(){_0x2473f1+='([\x5c+\x5c-]\x5cd+)>';}}}}else{function _0x31c0de(){let _0x4146e4=this['currentValue']();this[_0x51ad('0xe7')]()&&(_0x4146e4=_0xb50ffa[_0x51ad('0x56f')](_0x4146e4));const _0x494aae=this[_0x51ad('0x1b3')]()-0x1,_0x50ac60=this[_0x51ad('0x10d')]();this['setupValueFont'](),this[_0x51ad('0x255')]['drawText'](_0x4146e4,0x0,0x0,_0x494aae,_0x50ac60,_0x51ad('0x50e'));}}}return _0xeb1e99;};return this[_0x51ad('0xf')]()[_0x51ad('0x533')](_0x898a71,0x1);},Game_BattlerBase[_0x51ad('0x9c')][_0x51ad('0x3a')]=function(_0x5566c7){const _0x377eb4=(_0x2c7830,_0x1872a9)=>{if(_0x51ad('0x218')==='BsnVq'){function _0x9dd771(){_0x44d8d6[_0x51ad('0xc')]=0x64,_0x4e7af6['bgsVolume']=0x64,_0x5bc458[_0x51ad('0x140')]=0x64,_0xfd863e[_0x51ad('0x55b')]=0x64;}}else{if(!_0x1872a9)return _0x2c7830;if(_0x1872a9['note'][_0x51ad('0x58b')](VisuMZ[_0x51ad('0x344')][_0x51ad('0x3e4')][_0x51ad('0x500')][_0x5566c7])){if(_0x51ad('0x4ae')!==_0x51ad('0x4ae')){function _0x5249f9(){if(_0x4c12da[_0x51ad('0x304')]())_0x231c8e[_0x51ad('0x527')](_0x4ccfa0);}}else{var _0x4d8c36=Number(RegExp['$1'])/0x64;_0x2c7830+=_0x4d8c36;}}if(_0x1872a9[_0x51ad('0xe0')]['match'](VisuMZ[_0x51ad('0x344')][_0x51ad('0x3e4')]['xparamFlat2'][_0x5566c7])){var _0x4d8c36=Number(RegExp['$1']);_0x2c7830+=_0x4d8c36;}if(_0x1872a9[_0x51ad('0xe0')][_0x51ad('0x58b')](VisuMZ[_0x51ad('0x344')][_0x51ad('0x3e4')][_0x51ad('0x3b6')][_0x5566c7])){var _0x161a6a=String(RegExp['$1']);try{_0x2c7830+=eval(_0x161a6a);}catch(_0x43514c){if($gameTemp[_0x51ad('0x304')]())console[_0x51ad('0x527')](_0x43514c);}}return _0x2c7830;}};return this[_0x51ad('0xf')]()[_0x51ad('0x533')](_0x377eb4,0x0);},Game_BattlerBase[_0x51ad('0x9c')][_0x51ad('0xe4')]=function(_0x5f39b6){let _0x7d8fa6=_0x51ad('0xe4')+_0x5f39b6+_0x51ad('0x298');if(this[_0x51ad('0x573')](_0x7d8fa6))return this[_0x51ad('0x43f')][_0x7d8fa6];return this[_0x51ad('0x43f')][_0x7d8fa6]=VisuMZ[_0x51ad('0x344')]['Settings']['Param'][_0x51ad('0x43c')][_0x51ad('0x52')](this,_0x5f39b6),this[_0x51ad('0x43f')][_0x7d8fa6];},Game_BattlerBase[_0x51ad('0x9c')][_0x51ad('0x2d9')]=function(_0x5a1d61){const _0x4b6d17=(_0x30ac0d,_0x3bf4b0)=>{if(!_0x3bf4b0)return _0x30ac0d;if(_0x3bf4b0[_0x51ad('0xe0')][_0x51ad('0x58b')](VisuMZ['CoreEngine'][_0x51ad('0x3e4')][_0x51ad('0x12e')][_0x5a1d61])){if('jLXhE'===_0x51ad('0x2b5')){function _0x39deb0(){return _0x4b92c4[_0x51ad('0x344')][_0x51ad('0x31f')]['UI']['FadeSpeed'];}}else{var _0x4d2a2f=Number(RegExp['$1'])/0x64;_0x30ac0d+=_0x4d2a2f;}}if(_0x3bf4b0['note'][_0x51ad('0x58b')](VisuMZ[_0x51ad('0x344')][_0x51ad('0x3e4')][_0x51ad('0x530')][_0x5a1d61])){var _0x4d2a2f=Number(RegExp['$1']);_0x30ac0d+=_0x4d2a2f;}if(_0x3bf4b0['note'][_0x51ad('0x58b')](VisuMZ[_0x51ad('0x344')][_0x51ad('0x3e4')][_0x51ad('0x503')][_0x5a1d61])){var _0xdbd764=String(RegExp['$1']);try{_0x30ac0d+=eval(_0xdbd764);}catch(_0x35b9c7){if(_0x51ad('0x1f3')!==_0x51ad('0x1f3')){function _0x2f55d3(){const _0x1d6658=this[_0x51ad('0x3fc')](),_0x3c7cff=this[_0x51ad('0x347')][_0x51ad('0x40')](_0x147d3d),_0xde4a06=_0x3c7cff-this[_0x51ad('0x257')][_0x51ad('0x40')](_0x3ae216);this['changeTextColor'](_0x4cfbc1[_0x51ad('0x2f1')](_0xde4a06)),this[_0x51ad('0x3f9')](_0x5a5c5b[_0x51ad('0x2c')](_0x3c7cff,0x0),_0x578807,_0x2a2211,_0x1d6658,_0x51ad('0x50e'));}}else{if($gameTemp['isPlaytest']())console[_0x51ad('0x527')](_0x35b9c7);}}}return _0x30ac0d;};return this[_0x51ad('0xf')]()['reduce'](_0x4b6d17,0x0);},Game_BattlerBase[_0x51ad('0x9c')][_0x51ad('0x9a')]=function(_0x4d87d2){const _0x477e12=(_0x1022cb,_0xf5d3d)=>{if(!_0xf5d3d)return _0x1022cb;if(_0xf5d3d[_0x51ad('0xe0')][_0x51ad('0x58b')](VisuMZ[_0x51ad('0x344')][_0x51ad('0x3e4')]['sparamRate1'][_0x4d87d2])){if(_0x51ad('0x33b')===_0x51ad('0x33b')){var _0x55bb63=Number(RegExp['$1'])/0x64;_0x1022cb*=_0x55bb63;}else{function _0x10cad9(){if(this['_movementDuration']<=0x0)return;const _0x181920=this['_movementDuration'],_0x1ef4b2=this[_0x51ad('0x155')],_0x8d7b05=this[_0x51ad('0x124')];this[_0x51ad('0x6c')]=this[_0x51ad('0x2c2')](this['_offsetX'],this[_0x51ad('0x2e9')],_0x181920,_0x1ef4b2,_0x8d7b05),this[_0x51ad('0x566')]=this[_0x51ad('0x2c2')](this[_0x51ad('0x566')],this[_0x51ad('0x545')],_0x181920,_0x1ef4b2,_0x8d7b05),this['_movementDuration']--;if(this[_0x51ad('0x371')]<=0x0)this[_0x51ad('0x547')]();}}}if(_0xf5d3d['note']['match'](VisuMZ['CoreEngine'][_0x51ad('0x3e4')][_0x51ad('0x202')][_0x4d87d2])){var _0x55bb63=Number(RegExp['$1']);_0x1022cb*=_0x55bb63;}if(_0xf5d3d[_0x51ad('0xe0')][_0x51ad('0x58b')](VisuMZ['CoreEngine'][_0x51ad('0x3e4')][_0x51ad('0x594')][_0x4d87d2])){var _0x26be71=String(RegExp['$1']);try{if(_0x51ad('0x264')!==_0x51ad('0x27'))_0x1022cb*=eval(_0x26be71);else{function _0x4b7dba(){_0x213901[_0x51ad('0x394')](_0x21fd6b);}}}catch(_0x4f3cfe){if(_0x51ad('0x532')===_0x51ad('0x224')){function _0x1debf4(){try{_0x3d0b3[_0x51ad('0x344')][_0x51ad('0x350')][_0x51ad('0x52')](this,_0x4fc519);}catch(_0x4decb7){if(_0x1c42c9[_0x51ad('0x304')]())_0x112db5[_0x51ad('0x527')](_0x4decb7);}}}else{if($gameTemp[_0x51ad('0x304')]())console[_0x51ad('0x527')](_0x4f3cfe);}}}return _0x1022cb;};return this[_0x51ad('0xf')]()[_0x51ad('0x533')](_0x477e12,0x1);},Game_BattlerBase[_0x51ad('0x9c')][_0x51ad('0x20e')]=function(_0x5da478){const _0x33fcba=(_0x226659,_0x3a34b9)=>{if(!_0x3a34b9)return _0x226659;if(_0x3a34b9[_0x51ad('0xe0')][_0x51ad('0x58b')](VisuMZ[_0x51ad('0x344')][_0x51ad('0x3e4')]['sparamFlat1'][_0x5da478])){var _0x1f3fbc=Number(RegExp['$1'])/0x64;_0x226659+=_0x1f3fbc;}if(_0x3a34b9[_0x51ad('0xe0')][_0x51ad('0x58b')](VisuMZ['CoreEngine']['RegExp'][_0x51ad('0x253')][_0x5da478])){var _0x1f3fbc=Number(RegExp['$1']);_0x226659+=_0x1f3fbc;}if(_0x3a34b9[_0x51ad('0xe0')][_0x51ad('0x58b')](VisuMZ[_0x51ad('0x344')][_0x51ad('0x3e4')][_0x51ad('0x24a')][_0x5da478])){var _0x291210=String(RegExp['$1']);try{_0x226659+=eval(_0x291210);}catch(_0x140a1d){if('OXmxs'===_0x51ad('0x163')){function _0x127e61(){this[_0x51ad('0x3e1')]()&&_0x42c09c&&this[_0x51ad('0x3f7')]()===0x1&&this[_0x51ad('0x3ae')]()===this[_0x51ad('0x4d4')]()-0x1?this[_0x51ad('0x1aa')](0x0):_0x5d0dd2['CoreEngine'][_0x51ad('0x1f2')][_0x51ad('0x52')](this,_0x249c8e);}}else{if($gameTemp[_0x51ad('0x304')]())console[_0x51ad('0x527')](_0x140a1d);}}}return _0x226659;};return this[_0x51ad('0xf')]()[_0x51ad('0x533')](_0x33fcba,0x0);},Game_BattlerBase[_0x51ad('0x9c')][_0x51ad('0x12b')]=function(_0x547924){let _0x2a7d72=_0x51ad('0x12b')+_0x547924+_0x51ad('0x298');if(this[_0x51ad('0x573')](_0x2a7d72))return this['_cache'][_0x2a7d72];return this['_cache'][_0x2a7d72]=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x4c9')][_0x51ad('0x426')]['call'](this,_0x547924),this[_0x51ad('0x43f')][_0x2a7d72];},Game_BattlerBase['prototype'][_0x51ad('0x40')]=function(_0x2414cf,_0x1e6766){if(typeof paramId===_0x51ad('0x2d6'))return this[_0x51ad('0x12d')](_0x2414cf);_0x2414cf=String(_0x2414cf||'')['toUpperCase']();if(_0x2414cf==='MAXHP')return this['param'](0x0);if(_0x2414cf===_0x51ad('0x1de'))return this[_0x51ad('0x12d')](0x1);if(_0x2414cf===_0x51ad('0xd7'))return this[_0x51ad('0x12d')](0x2);if(_0x2414cf===_0x51ad('0x251'))return this[_0x51ad('0x12d')](0x3);if(_0x2414cf===_0x51ad('0x46e'))return this['param'](0x4);if(_0x2414cf===_0x51ad('0x1b0'))return this[_0x51ad('0x12d')](0x5);if(_0x2414cf===_0x51ad('0x3e0'))return this['param'](0x6);if(_0x2414cf==='LUK')return this[_0x51ad('0x12d')](0x7);if(_0x2414cf==='HIT')return _0x1e6766?String(Math['round'](this[_0x51ad('0xe4')](0x0)*0x64))+'%':this[_0x51ad('0xe4')](0x0);if(_0x2414cf===_0x51ad('0x74'))return _0x1e6766?String(Math['round'](this[_0x51ad('0xe4')](0x1)*0x64))+'%':this[_0x51ad('0xe4')](0x1);if(_0x2414cf===_0x51ad('0x487'))return _0x1e6766?String(Math[_0x51ad('0x57d')](this['xparam'](0x2)*0x64))+'%':this['xparam'](0x2);if(_0x2414cf===_0x51ad('0x4a6'))return _0x1e6766?String(Math[_0x51ad('0x57d')](this['xparam'](0x3)*0x64))+'%':this[_0x51ad('0xe4')](0x3);if(_0x2414cf===_0x51ad('0x178'))return _0x1e6766?String(Math['round'](this[_0x51ad('0xe4')](0x4)*0x64))+'%':this[_0x51ad('0xe4')](0x4);if(_0x2414cf==='MRF')return _0x1e6766?String(Math[_0x51ad('0x57d')](this[_0x51ad('0xe4')](0x5)*0x64))+'%':this[_0x51ad('0xe4')](0x5);if(_0x2414cf==='CNT')return _0x1e6766?String(Math[_0x51ad('0x57d')](this[_0x51ad('0xe4')](0x6)*0x64))+'%':this[_0x51ad('0xe4')](0x6);if(_0x2414cf===_0x51ad('0x47f'))return _0x1e6766?String(Math[_0x51ad('0x57d')](this[_0x51ad('0xe4')](0x7)*0x64))+'%':this[_0x51ad('0xe4')](0x7);if(_0x2414cf===_0x51ad('0x525'))return _0x1e6766?String(Math[_0x51ad('0x57d')](this[_0x51ad('0xe4')](0x8)*0x64))+'%':this[_0x51ad('0xe4')](0x8);if(_0x2414cf===_0x51ad('0x5a3'))return _0x1e6766?String(Math[_0x51ad('0x57d')](this[_0x51ad('0xe4')](0x9)*0x64))+'%':this['xparam'](0x9);if(_0x2414cf===_0x51ad('0x143'))return _0x1e6766?String(Math[_0x51ad('0x57d')](this[_0x51ad('0x12b')](0x0)*0x64))+'%':this[_0x51ad('0x12b')](0x0);if(_0x2414cf===_0x51ad('0x451'))return _0x1e6766?String(Math[_0x51ad('0x57d')](this[_0x51ad('0x12b')](0x1)*0x64))+'%':this[_0x51ad('0x12b')](0x1);if(_0x2414cf===_0x51ad('0x90'))return _0x1e6766?String(Math[_0x51ad('0x57d')](this[_0x51ad('0x12b')](0x2)*0x64))+'%':this['sparam'](0x2);if(_0x2414cf==='PHA')return _0x1e6766?String(Math[_0x51ad('0x57d')](this[_0x51ad('0x12b')](0x3)*0x64))+'%':this[_0x51ad('0x12b')](0x3);if(_0x2414cf===_0x51ad('0x316'))return _0x1e6766?String(Math[_0x51ad('0x57d')](this[_0x51ad('0x12b')](0x4)*0x64))+'%':this[_0x51ad('0x12b')](0x4);if(_0x2414cf==='TCR')return _0x1e6766?String(Math[_0x51ad('0x57d')](this[_0x51ad('0x12b')](0x5)*0x64))+'%':this['sparam'](0x5);if(_0x2414cf===_0x51ad('0x46c'))return _0x1e6766?String(Math[_0x51ad('0x57d')](this[_0x51ad('0x12b')](0x6)*0x64))+'%':this[_0x51ad('0x12b')](0x6);if(_0x2414cf===_0x51ad('0x2eb'))return _0x1e6766?String(Math[_0x51ad('0x57d')](this[_0x51ad('0x12b')](0x7)*0x64))+'%':this[_0x51ad('0x12b')](0x7);if(_0x2414cf===_0x51ad('0x494'))return _0x1e6766?String(Math[_0x51ad('0x57d')](this[_0x51ad('0x12b')](0x8)*0x64))+'%':this[_0x51ad('0x12b')](0x8);if(_0x2414cf===_0x51ad('0x478'))return _0x1e6766?String(Math[_0x51ad('0x57d')](this[_0x51ad('0x12b')](0x9)*0x64))+'%':this[_0x51ad('0x12b')](0x9);return'';},Game_BattlerBase[_0x51ad('0x9c')][_0x51ad('0x30a')]=function(){return this[_0x51ad('0x2cb')]()&&this[_0x51ad('0x419')]<this['mhp']*VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x4c9')]['CrisisRate'];},VisuMZ[_0x51ad('0x344')][_0x51ad('0xa7')]=Game_Actor[_0x51ad('0x9c')][_0x51ad('0x4be')],Game_Actor[_0x51ad('0x9c')][_0x51ad('0x4be')]=function(_0x58972c){if(this[_0x51ad('0x3db')]>0x63)return this[_0x51ad('0x2a')](_0x58972c);return VisuMZ[_0x51ad('0x344')][_0x51ad('0xa7')][_0x51ad('0x52')](this,_0x58972c);},Game_Actor[_0x51ad('0x9c')]['paramBaseAboveLevel99']=function(_0x4d6e97){const _0xa79e9d=this[_0x51ad('0x35e')]()['params'][_0x4d6e97][0x63],_0x27cb02=this[_0x51ad('0x35e')]()[_0x51ad('0x4fc')][_0x4d6e97][0x62];return _0xa79e9d+(_0xa79e9d-_0x27cb02)*(this[_0x51ad('0x3db')]-0x63);},VisuMZ[_0x51ad('0x344')][_0x51ad('0x4b4')]=Game_Actor[_0x51ad('0x9c')][_0x51ad('0x19a')],Game_Actor[_0x51ad('0x9c')][_0x51ad('0x19a')]=function(_0x58c22d,_0x3fdfaa){$gameTemp[_0x51ad('0x2fa')]=!![],VisuMZ[_0x51ad('0x344')][_0x51ad('0x4b4')][_0x51ad('0x52')](this,_0x58c22d,_0x3fdfaa),$gameTemp['_changingClass']=undefined;},VisuMZ[_0x51ad('0x344')][_0x51ad('0x5b1')]=Game_Actor['prototype']['levelUp'],Game_Actor['prototype']['levelUp']=function(){VisuMZ['CoreEngine'][_0x51ad('0x5b1')][_0x51ad('0x52')](this);if(!$gameTemp[_0x51ad('0x2fa')])this[_0x51ad('0x374')]();},Game_Actor[_0x51ad('0x9c')][_0x51ad('0x374')]=function(){this[_0x51ad('0x43f')]={};if(VisuMZ[_0x51ad('0x344')]['Settings']['QoL'][_0x51ad('0x54b')])this[_0x51ad('0x419')]=this[_0x51ad('0x148')];if(VisuMZ[_0x51ad('0x344')]['Settings'][_0x51ad('0x2f8')]['LevelUpFullMp'])this[_0x51ad('0x3df')]=this[_0x51ad('0x2e3')];},Game_Actor[_0x51ad('0x9c')][_0x51ad('0x341')]=function(){if(this[_0x51ad('0x51b')]())return 0x1;const _0x217125=this[_0x51ad('0x3ec')]()-this[_0x51ad('0x43')](),_0x8f826f=this['currentExp']()-this[_0x51ad('0x43')]();return(_0x8f826f/_0x217125)[_0x51ad('0x38')](0x0,0x1);},Game_Actor[_0x51ad('0x9c')][_0x51ad('0xf')]=function(){const _0x145639=Game_Battler[_0x51ad('0x9c')]['traitObjects'][_0x51ad('0x52')](this);for(const _0x3eaa8d of this[_0x51ad('0x201')]()){if(_0x51ad('0x376')!=='hyWAb')_0x3eaa8d&&_0x145639[_0x51ad('0x577')](_0x3eaa8d);else{function _0x4f22f0(){_0x759a66[_0x51ad('0x400')]['call'](this,_0x354865);}}}return _0x145639[_0x51ad('0x577')](this[_0x51ad('0x35e')](),this['actor']()),_0x145639;},Object['defineProperty'](Game_Enemy[_0x51ad('0x9c')],_0x51ad('0x3db'),{'get':function(){return this[_0x51ad('0x55')]();},'configurable':!![]}),Game_Enemy['prototype'][_0x51ad('0x55')]=function(){return this['enemy']()[_0x51ad('0x3db')];},Game_Enemy[_0x51ad('0x9c')][_0x51ad('0x121')]=function(){if(!this[_0x51ad('0x5a1')]){this[_0x51ad('0x243')]+=Math[_0x51ad('0x57d')]((Graphics[_0x51ad('0x4e9')]-0x270)/0x2),this[_0x51ad('0x243')]-=Math['floor']((Graphics[_0x51ad('0x4e9')]-Graphics[_0x51ad('0x2bb')])/0x2);if($gameSystem[_0x51ad('0x303')]())this[_0x51ad('0x50c')]-=Math[_0x51ad('0x529')]((Graphics[_0x51ad('0x44f')]-Graphics['boxWidth'])/0x2);else{if('HVevl'!==_0x51ad('0x7b'))this[_0x51ad('0x50c')]+=Math[_0x51ad('0x57d')]((Graphics[_0x51ad('0x184')]-0x330)/0x2);else{function _0x4fcff6(){return _0x51ec7a[_0x51ad('0x13e')](_0x51ad('0x1a1'),_0x51ad('0x597'));}}}}this[_0x51ad('0x5a1')]=!![];},Game_Party[_0x51ad('0x9c')][_0x51ad('0x294')]=function(){return VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x35a')][_0x51ad('0x444')];},VisuMZ[_0x51ad('0x344')][_0x51ad('0x539')]=Game_Party[_0x51ad('0x9c')][_0x51ad('0x465')],Game_Party['prototype'][_0x51ad('0x465')]=function(_0x20fe9f){if(VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')]['QoL'][_0x51ad('0x496')]&&DataManager[_0x51ad('0x51')](_0x20fe9f))return;VisuMZ[_0x51ad('0x344')][_0x51ad('0x539')][_0x51ad('0x52')](this,_0x20fe9f);},VisuMZ[_0x51ad('0x344')]['Game_Map_setup']=Game_Map[_0x51ad('0x9c')][_0x51ad('0x5b4')],Game_Map['prototype'][_0x51ad('0x5b4')]=function(_0x51aeb7){VisuMZ[_0x51ad('0x344')][_0x51ad('0x2fb')]['call'](this,_0x51aeb7),this[_0x51ad('0x320')](_0x51aeb7);},Game_Map['prototype'][_0x51ad('0x320')]=function(){this[_0x51ad('0x4d9')]=VisuMZ['CoreEngine'][_0x51ad('0x31f')]['QoL'][_0x51ad('0x415')]||![];if($dataMap&&$dataMap[_0x51ad('0xe0')]){if($dataMap[_0x51ad('0xe0')][_0x51ad('0x58b')](/<SHOW TILE SHADOWS>/i))this[_0x51ad('0x4d9')]=![];if($dataMap[_0x51ad('0xe0')][_0x51ad('0x58b')](/<HIDE TILE SHADOWS>/i))this[_0x51ad('0x4d9')]=!![];}},Game_Map[_0x51ad('0x9c')]['areTileShadowsHidden']=function(){if(this['_hideTileShadows']===undefined)this[_0x51ad('0x320')]();return this[_0x51ad('0x4d9')];},VisuMZ[_0x51ad('0x344')][_0x51ad('0x350')]=Game_Character[_0x51ad('0x9c')][_0x51ad('0x4b9')],Game_Character['prototype'][_0x51ad('0x4b9')]=function(_0x152a60){try{VisuMZ['CoreEngine']['Game_Character_processMoveCommand'][_0x51ad('0x52')](this,_0x152a60);}catch(_0x50366a){if($gameTemp[_0x51ad('0x304')]())console[_0x51ad('0x527')](_0x50366a);}},Game_Player[_0x51ad('0x9c')][_0x51ad('0xdb')]=function(){const _0x78e938=$gameMap[_0x51ad('0x39e')]();this[_0x51ad('0x3f4')]=Math[_0x51ad('0x3af')](_0x78e938)+Math[_0x51ad('0x3af')](_0x78e938)+this[_0x51ad('0x22b')]();},Game_Player[_0x51ad('0x9c')][_0x51ad('0x22b')]=function(){return $dataMap&&$dataMap[_0x51ad('0xe0')]&&$dataMap[_0x51ad('0xe0')][_0x51ad('0x58b')](/<MINIMUM ENCOUNTER STEPS:[ ](\d+)>/i)?Number(RegExp['$1']):VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x2f8')][_0x51ad('0x5ad')];},VisuMZ[_0x51ad('0x344')][_0x51ad('0x2f3')]=Game_Event[_0x51ad('0x9c')]['isCollidedWithEvents'],Game_Event[_0x51ad('0x9c')][_0x51ad('0x19f')]=function(_0x44f54f,_0x297a07){if(this[_0x51ad('0x41d')]())return this['checkSmartEventCollision'](_0x44f54f,_0x297a07);else{if(_0x51ad('0xfe')===_0x51ad('0xfe'))return VisuMZ[_0x51ad('0x344')][_0x51ad('0x2f3')][_0x51ad('0x52')](this,_0x44f54f,_0x297a07);else{function _0x39473a(){this['_helpWindow'][_0x51ad('0xa3')](_0x22fdb6[_0x51ad('0x3b5')]['HelpBgType']);}}}},Game_Event[_0x51ad('0x9c')][_0x51ad('0x41d')]=function(){return VisuMZ['CoreEngine']['Settings'][_0x51ad('0x2f8')]['SmartEventCollisionPriority'];},Game_Event[_0x51ad('0x9c')][_0x51ad('0x3e5')]=function(_0x16b8dd,_0xdd34ec){if(!this[_0x51ad('0x39f')]())return![];else{if(_0x51ad('0x537')===_0x51ad('0x461')){function _0x149e6c(){this[_0x51ad('0x50c')]+=_0x2a0fb0[_0x51ad('0x57d')]((_0x90a228['boxWidth']-0x330)/0x2);}}else{const _0x4e1e9c=$gameMap[_0x51ad('0x55c')](_0x16b8dd,_0xdd34ec)[_0x51ad('0xa2')](_0x5c581d=>_0x5c581d[_0x51ad('0x39f')]());return _0x4e1e9c['length']>0x0;}}},VisuMZ[_0x51ad('0x344')][_0x51ad('0x28b')]=Game_Interpreter['prototype'][_0x51ad('0xd0')],Game_Interpreter[_0x51ad('0x9c')][_0x51ad('0xd0')]=function(_0x38523d){try{if(_0x51ad('0x177')!=='tRRkf')VisuMZ[_0x51ad('0x344')][_0x51ad('0x28b')][_0x51ad('0x52')](this,_0x38523d);else{function _0x451b35(){const _0x5dbbf1=this[_0x51ad('0x72')]();this[_0x51ad('0x4fb')]=new _0x51c92a(_0x5dbbf1),this[_0x51ad('0x4fb')][_0x51ad('0x42c')]('cancel',this[_0x51ad('0x4b6')][_0x51ad('0x3a9')](this)),this[_0x51ad('0x208')](this[_0x51ad('0x4fb')]),this['_commandWindow'][_0x51ad('0xa3')](_0x27739a[_0x51ad('0x3b5')][_0x51ad('0x3d3')]);}}}catch(_0x234cec){if(_0x51ad('0x445')===_0x51ad('0x1b9')){function _0x420941(){this[_0x51ad('0x2a4')]&&this[_0x51ad('0x2a4')][_0x51ad('0xa3')](_0x140916[_0x51ad('0x3b5')][_0x51ad('0x11b')]),this[_0x51ad('0x3f1')]&&this[_0x51ad('0x3f1')][_0x51ad('0xa3')](_0x4b8f78['layoutSettings'][_0x51ad('0xec')]);}}else $gameTemp[_0x51ad('0x304')]()&&(console['log'](_0x51ad('0x557')),console[_0x51ad('0x527')](_0x234cec)),this[_0x51ad('0x319')]();}return!![];},VisuMZ[_0x51ad('0x344')][_0x51ad('0x4a8')]=Game_Interpreter[_0x51ad('0x9c')]['command122'],Game_Interpreter[_0x51ad('0x9c')][_0x51ad('0x36a')]=function(_0x3fb6ad){try{VisuMZ['CoreEngine']['Game_Interpreter_command122'][_0x51ad('0x52')](this,_0x3fb6ad);}catch(_0x18d72b){$gameTemp['isPlaytest']()&&(console[_0x51ad('0x527')](_0x51ad('0x162')),console[_0x51ad('0x527')](_0x18d72b));}return!![];},VisuMZ['CoreEngine'][_0x51ad('0x1b')]=Game_Interpreter[_0x51ad('0x9c')][_0x51ad('0xbb')],Game_Interpreter[_0x51ad('0x9c')][_0x51ad('0xbb')]=function(){try{VisuMZ[_0x51ad('0x344')][_0x51ad('0x1b')][_0x51ad('0x52')](this);}catch(_0x34bc2e){$gameTemp['isPlaytest']()&&(console[_0x51ad('0x527')](_0x51ad('0x479')),console[_0x51ad('0x527')](_0x34bc2e));}return!![];},Scene_Base[_0x51ad('0x9c')][_0x51ad('0x139')]=function(){return VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')]['UI']['FadeSpeed'];},Scene_Base[_0x51ad('0x9c')]['isBottomHelpMode']=function(){return VisuMZ[_0x51ad('0x344')]['Settings']['UI']['BottomHelp'];},Scene_Base[_0x51ad('0x9c')][_0x51ad('0x381')]=function(){return VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')]['UI'][_0x51ad('0x11e')];},Scene_Base[_0x51ad('0x9c')][_0x51ad('0x48')]=function(){return VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')]['UI'][_0x51ad('0x510')];},Scene_Base['prototype']['mainCommandWidth']=function(){return VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')]['UI'][_0x51ad('0x3ed')];},Scene_Base[_0x51ad('0x9c')][_0x51ad('0x58d')]=function(){return VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')]['UI'][_0x51ad('0x492')];},Scene_Base[_0x51ad('0x9c')][_0x51ad('0x493')]=function(){return VisuMZ['CoreEngine']['Settings'][_0x51ad('0x49a')]['EnableMasking'];},VisuMZ[_0x51ad('0x344')][_0x51ad('0x79')]=Scene_Base[_0x51ad('0x9c')][_0x51ad('0x549')],Scene_Base[_0x51ad('0x9c')][_0x51ad('0x549')]=function(){VisuMZ[_0x51ad('0x344')]['Scene_Base_createWindowLayer'][_0x51ad('0x52')](this),this[_0x51ad('0x18b')]();},Scene_Base[_0x51ad('0x9c')][_0x51ad('0x18b')]=function(){},Scene_Base[_0x51ad('0x9c')][_0x51ad('0x2f5')]=function(){return TextManager[_0x51ad('0x13e')]('pageup',_0x51ad('0x597'));},Scene_Base[_0x51ad('0x9c')]['buttonAssistKey2']=function(){return TextManager[_0x51ad('0x1ef')](_0x51ad('0x483'));},Scene_Base[_0x51ad('0x9c')][_0x51ad('0x24c')]=function(){return TextManager[_0x51ad('0x1ef')](_0x51ad('0x10a'));},Scene_Base[_0x51ad('0x9c')][_0x51ad('0x423')]=function(){return TextManager[_0x51ad('0x1ef')]('ok');},Scene_Base['prototype'][_0x51ad('0x4ad')]=function(){return TextManager[_0x51ad('0x1ef')](_0x51ad('0x4b2'));},Scene_Base[_0x51ad('0x9c')][_0x51ad('0x299')]=function(){if(this['_pageupButton']&&this[_0x51ad('0x13f')][_0x51ad('0x2d1')]){if(_0x51ad('0xfb')===_0x51ad('0x1c2')){function _0x990a07(){return typeof _0x2c85af===_0x51ad('0x2d6')?_0x521b8b[_0x51ad('0x344')][_0x51ad('0xb9')][_0x51ad('0x52')](this,_0x724a2b):this[_0x51ad('0x1da')](_0x445140);}}else return TextManager[_0x51ad('0x47e')];}else return'';},Scene_Base[_0x51ad('0x9c')]['buttonAssistText2']=function(){return'';},Scene_Base[_0x51ad('0x9c')][_0x51ad('0x1ff')]=function(){return'';},Scene_Base[_0x51ad('0x9c')][_0x51ad('0x65')]=function(){return TextManager[_0x51ad('0x4b5')];},Scene_Base['prototype'][_0x51ad('0x7a')]=function(){return TextManager[_0x51ad('0x40d')];},Scene_Base[_0x51ad('0x9c')][_0x51ad('0x51c')]=function(){return 0x0;},Scene_Base['prototype'][_0x51ad('0x459')]=function(){return 0x0;},Scene_Base[_0x51ad('0x9c')][_0x51ad('0x393')]=function(){return 0x0;},Scene_Base[_0x51ad('0x9c')][_0x51ad('0x1a')]=function(){return 0x0;},Scene_Base[_0x51ad('0x9c')]['buttonAssistOffset5']=function(){return 0x0;},VisuMZ[_0x51ad('0x344')][_0x51ad('0x1')]=Scene_Boot[_0x51ad('0x9c')]['loadSystemImages'],Scene_Boot[_0x51ad('0x9c')]['loadSystemImages']=function(){VisuMZ[_0x51ad('0x344')][_0x51ad('0x1')][_0x51ad('0x52')](this),this['loadGameImagesCoreEngine']();},Scene_Boot[_0x51ad('0x9c')][_0x51ad('0x189')]=function(){const _0x34741e=[_0x51ad('0x2a3'),'battlebacks1',_0x51ad('0x153'),_0x51ad('0x563'),_0x51ad('0x45a'),_0x51ad('0x2c0'),'parallaxes',_0x51ad('0x559'),_0x51ad('0x19'),_0x51ad('0xfd'),_0x51ad('0x27c'),'tilesets',_0x51ad('0x35d'),_0x51ad('0x263')];for(const _0x3c210b of _0x34741e){const _0x318117=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x35f')][_0x3c210b],_0xcca20e=_0x51ad('0x46a')[_0x51ad('0x348')](_0x3c210b);for(const _0x422f4b of _0x318117){if(_0x51ad('0x18e')===_0x51ad('0x18e'))ImageManager[_0x51ad('0x2ce')](_0xcca20e,_0x422f4b);else{function _0x14fae6(){return _0x336fb3&&_0x435a99[_0x51ad('0x556')]?_0x1e1cae[_0x51ad('0x556')][_0x51ad('0x493')]():!![];}}}}},VisuMZ[_0x51ad('0x344')][_0x51ad('0x3eb')]=Scene_Boot['prototype'][_0x51ad('0x3a8')],Scene_Boot[_0x51ad('0x9c')][_0x51ad('0x3a8')]=function(){if(Utils[_0x51ad('0x2a7')](_0x51ad('0x4e3'))&&VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x2f8')][_0x51ad('0x3f2')]){if('HkwdU'!==_0x51ad('0x3dd')){function _0x298e8f(){return this[_0x51ad('0x13')]()?this[_0x51ad('0x2d2')]():_0x1c06b3['CoreEngine'][_0x51ad('0x30')][_0x51ad('0x52')](this);}}else this[_0x51ad('0x80')]();}else{if(_0x51ad('0x56b')!==_0x51ad('0x70'))VisuMZ[_0x51ad('0x344')]['Scene_Boot_startNormalGame']['call'](this);else{function _0x8cb4ab(){this[_0x51ad('0x39a')]['x']=_0x574e46['boxWidth']+0x4;}}}},Scene_Boot[_0x51ad('0x9c')]['startAutoNewGame']=function(){DataManager[_0x51ad('0x10e')](),SceneManager[_0x51ad('0x2ca')](Scene_Map);},Scene_Boot[_0x51ad('0x9c')][_0x51ad('0x59d')]=function(){const _0x1a8cdf=$dataSystem[_0x51ad('0x467')]['uiAreaWidth'],_0x38d0c9=$dataSystem['advanced']['uiAreaHeight'],_0x201bb1=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')]['UI']['BoxMargin'];Graphics['boxWidth']=_0x1a8cdf-_0x201bb1*0x2,Graphics[_0x51ad('0x2bb')]=_0x38d0c9-_0x201bb1*0x2,this[_0x51ad('0x2bc')]();},VisuMZ['CoreEngine'][_0x51ad('0x1c8')]=Scene_Boot[_0x51ad('0x9c')][_0x51ad('0x58e')],Scene_Boot['prototype'][_0x51ad('0x58e')]=function(){if(this[_0x51ad('0x54d')]())this[_0x51ad('0x2b1')]();else{if(_0x51ad('0x1a9')!==_0x51ad('0x87'))VisuMZ[_0x51ad('0x344')]['Scene_Boot_updateDocumentTitle']['call'](this);else{function _0x28888d(){if(_0x1710b3['note'][_0x51ad('0x58b')](/<SHOW TILE SHADOWS>/i))this[_0x51ad('0x4d9')]=![];if(_0x4f6d40['note'][_0x51ad('0x58b')](/<HIDE TILE SHADOWS>/i))this[_0x51ad('0x4d9')]=!![];}}}},Scene_Boot[_0x51ad('0x9c')]['isFullDocumentTitle']=function(){if(Scene_Title[_0x51ad('0x37f')]==='')return![];if(Scene_Title[_0x51ad('0x37f')]===_0x51ad('0x24'))return![];if(Scene_Title[_0x51ad('0x340')]==='')return![];if(Scene_Title[_0x51ad('0x340')]===_0x51ad('0x113'))return![];return!![];},Scene_Boot['prototype']['makeDocumentTitle']=function(){const _0x4a60fe=$dataSystem[_0x51ad('0x5a4')],_0x537a30=Scene_Title['subtitle']||'',_0x1c760d=Scene_Title['version']||'',_0x23ab53=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x4b3')][_0x51ad('0x2c9')][_0x51ad('0x24e')],_0x510cb6=_0x23ab53[_0x51ad('0x348')](_0x4a60fe,_0x537a30,_0x1c760d);document[_0x51ad('0x266')]=_0x510cb6;},Scene_Boot[_0x51ad('0x9c')][_0x51ad('0x2bc')]=function(){if(VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')]['UI'][_0x51ad('0x3e7')]){const _0x568508=Graphics[_0x51ad('0x44f')]-Graphics['boxWidth']-VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')]['UI'][_0x51ad('0x37e')]*0x2,_0x2bd47c=Sprite_Button[_0x51ad('0x9c')][_0x51ad('0x53e')][_0x51ad('0x52')](this)*0x4;if(_0x568508>=_0x2bd47c)SceneManager[_0x51ad('0x4fe')](!![]);}},Scene_Title[_0x51ad('0x37f')]=VisuMZ['CoreEngine'][_0x51ad('0x31f')][_0x51ad('0x4b3')][_0x51ad('0x2c9')]['Subtitle'],Scene_Title[_0x51ad('0x340')]=VisuMZ[_0x51ad('0x344')]['Settings']['MenuLayout'][_0x51ad('0x2c9')][_0x51ad('0x3a4')],Scene_Title[_0x51ad('0x56d')]=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x4b3')][_0x51ad('0x2c9')][_0x51ad('0x4f1')],VisuMZ[_0x51ad('0x344')][_0x51ad('0x4a2')]=Scene_Title[_0x51ad('0x9c')][_0x51ad('0x13d')],Scene_Title[_0x51ad('0x9c')][_0x51ad('0x13d')]=function(){VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x4b3')][_0x51ad('0x2c9')][_0x51ad('0x13d')]['call'](this);if(Scene_Title['subtitle']!==''&&Scene_Title[_0x51ad('0x37f')]!==_0x51ad('0x24'))this['drawGameSubtitle']();if(Scene_Title['version']!==''&&Scene_Title[_0x51ad('0x340')]!==_0x51ad('0x113'))this[_0x51ad('0x1ca')]();},Scene_Title[_0x51ad('0x9c')][_0x51ad('0x314')]=function(){VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x4b3')][_0x51ad('0x2c9')]['drawGameSubtitle'][_0x51ad('0x52')](this);},Scene_Title[_0x51ad('0x9c')][_0x51ad('0x1ca')]=function(){VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')]['MenuLayout'][_0x51ad('0x2c9')][_0x51ad('0x1ca')]['call'](this);},Scene_Title[_0x51ad('0x9c')][_0x51ad('0x12')]=function(){this[_0x51ad('0x2d0')]();const _0x42f7f3=$dataSystem['titleCommandWindow'][_0x51ad('0x240')],_0x228601=this[_0x51ad('0x72')]();this[_0x51ad('0x4fb')]=new Window_TitleCommand(_0x228601),this[_0x51ad('0x4fb')][_0x51ad('0xa3')](_0x42f7f3),this['addWindow'](this[_0x51ad('0x4fb')]);},Scene_Title[_0x51ad('0x9c')][_0x51ad('0x72')]=function(){return VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x4b3')][_0x51ad('0x2c9')][_0x51ad('0x362')][_0x51ad('0x52')](this);},Scene_Title[_0x51ad('0x9c')]['createTitleButtons']=function(){for(const _0x21c9d9 of Scene_Title[_0x51ad('0x56d')]){if(_0x51ad('0x85')!==_0x51ad('0x17c')){const _0x527225=new Sprite_TitlePictureButton(_0x21c9d9);this[_0x51ad('0x1c6')](_0x527225);}else{function _0x565833(){const _0x2805ad=_0x3ee692['touchUI']?(_0x3de15f[_0x51ad('0x9c')][_0x51ad('0x53e')]()+0x6)*0x2:0x0,_0x29a889=this[_0x51ad('0x4ce')](),_0x43d341=_0x3c9d26[_0x51ad('0x184')]-_0x2805ad*0x2,_0x1d3d89=this[_0x51ad('0x58d')]();return new _0x15a84e(_0x2805ad,_0x29a889,_0x43d341,_0x1d3d89);}}}},VisuMZ[_0x51ad('0x344')]['Scene_Map_updateMainMultiply']=Scene_Map[_0x51ad('0x9c')][_0x51ad('0x183')],Scene_Map[_0x51ad('0x9c')][_0x51ad('0x183')]=function(){VisuMZ[_0x51ad('0x344')][_0x51ad('0x561')]['call'](this);if($gameTemp[_0x51ad('0x147')]&&!$gameMessage[_0x51ad('0x36f')]())this[_0x51ad('0x161')]();},Scene_Map[_0x51ad('0x9c')][_0x51ad('0x546')]=function(){Scene_Message[_0x51ad('0x9c')][_0x51ad('0x546')][_0x51ad('0x52')](this),!SceneManager['isNextScene'](Scene_Battle)&&(this[_0x51ad('0x1c1')][_0x51ad('0x14')](),this[_0x51ad('0x50b')][_0x51ad('0x26d')](),this['_windowLayer'][_0x51ad('0x2d1')]=![],SceneManager[_0x51ad('0xf1')]()),$gameScreen['clearZoom']();},VisuMZ[_0x51ad('0x344')][_0x51ad('0x86')]=Scene_Map[_0x51ad('0x9c')]['createMenuButton'],Scene_Map[_0x51ad('0x9c')][_0x51ad('0x38c')]=function(){VisuMZ[_0x51ad('0x344')][_0x51ad('0x86')][_0x51ad('0x52')](this),SceneManager['isSideButtonLayout']()&&this[_0x51ad('0x590')]();},Scene_Map['prototype']['moveMenuButtonSideButtonLayout']=function(){this[_0x51ad('0x402')]['x']=Graphics[_0x51ad('0x184')]+0x4;},VisuMZ[_0x51ad('0x344')]['Scene_MenuBase_helpAreaTop']=Scene_MenuBase[_0x51ad('0x9c')][_0x51ad('0x5b6')],Scene_MenuBase['prototype'][_0x51ad('0x5b6')]=function(){let _0x302969=0x0;if(SceneManager[_0x51ad('0x212')]())_0x302969=this['helpAreaTopSideButtonLayout']();else{if(_0x51ad('0x3bc')==='zdQAQ'){function _0x5260f9(){return _0x18fcd3[_0x51ad('0x3b5')][_0x51ad('0x16b')][_0x51ad('0x52')](this);}}else _0x302969=VisuMZ[_0x51ad('0x344')][_0x51ad('0x4cc')][_0x51ad('0x52')](this);}if(this[_0x51ad('0xc4')]()&&this[_0x51ad('0x5ab')]()==='top'){if(_0x51ad('0x128')!==_0x51ad('0x128')){function _0x91f9f3(){this[_0x51ad('0x305')](0x4b0,0x0,0x78);}}else _0x302969+=Window_ButtonAssist[_0x51ad('0x9c')][_0x51ad('0x14b')]();}return _0x302969;},Scene_MenuBase['prototype'][_0x51ad('0x22')]=function(){return this[_0x51ad('0x4bd')]()?this[_0x51ad('0x1d6')]():0x0;},VisuMZ[_0x51ad('0x344')][_0x51ad('0x411')]=Scene_MenuBase[_0x51ad('0x9c')][_0x51ad('0x2a2')],Scene_MenuBase[_0x51ad('0x9c')][_0x51ad('0x2a2')]=function(){return SceneManager[_0x51ad('0x212')]()?this['mainAreaTopSideButtonLayout']():VisuMZ['CoreEngine']['Scene_MenuBase_mainAreaTop'][_0x51ad('0x52')](this);},Scene_MenuBase['prototype'][_0x51ad('0xd4')]=function(){if(!this[_0x51ad('0x4bd')]()){if(_0x51ad('0x39d')!==_0x51ad('0x462'))return this[_0x51ad('0x1ad')]();else{function _0x138308(){const _0x12a7a4=_0x51ad('0x41');this[_0x51ad('0x3e')]=this['_colorCache']||{};if(this[_0x51ad('0x3e')][_0x12a7a4])return this[_0x51ad('0x3e')][_0x12a7a4];const _0x1c4314=_0x26d42e[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x34e')]['ColorTPCost'];return this[_0x51ad('0x5b2')](_0x12a7a4,_0x1c4314);}}}else return 0x0;},VisuMZ['CoreEngine'][_0x51ad('0x51a')]=Scene_MenuBase['prototype'][_0x51ad('0x28')],Scene_MenuBase[_0x51ad('0x9c')][_0x51ad('0x28')]=function(){let _0x26ec4f=0x0;if(SceneManager[_0x51ad('0x212')]()){if(_0x51ad('0x129')!==_0x51ad('0x579'))_0x26ec4f=this[_0x51ad('0x574')]();else{function _0x269e4b(){return this[_0x51ad('0x21b')](_0x5c60ae)&&_0x332907[_0x51ad('0x33')]===0x2;}}}else{if('KhiMP'!==_0x51ad('0x336')){function _0x3d9789(){this[_0x51ad('0x1aa')](_0x5c2658['min'](this[_0x51ad('0x3ae')](),0x0));}}else _0x26ec4f=VisuMZ[_0x51ad('0x344')][_0x51ad('0x51a')][_0x51ad('0x52')](this);}if(this[_0x51ad('0xc4')]()&&this[_0x51ad('0x5ab')]()!==_0x51ad('0x44d')){if(_0x51ad('0x274')===_0x51ad('0x311')){function _0x3314d3(){_0x1bae1d[_0x51ad('0x55b')]!==0x0?(_0x50e393[_0x51ad('0xc')]=0x0,_0x52b1d0[_0x51ad('0x335')]=0x0,_0x3f1f6d[_0x51ad('0x140')]=0x0,_0x5b7d23[_0x51ad('0x55b')]=0x0):(_0x282143['bgmVolume']=0x64,_0x2f443f[_0x51ad('0x335')]=0x64,_0x559e1[_0x51ad('0x140')]=0x64,_0x3b1f36[_0x51ad('0x55b')]=0x64);_0xbd4725[_0x51ad('0x1be')]();if(this[_0x51ad('0x556')][_0x51ad('0x56c')]===_0xb747cb){if(this[_0x51ad('0x556')]['_optionsWindow'])this[_0x51ad('0x556')]['_optionsWindow'][_0x51ad('0x4da')]();if(this[_0x51ad('0x556')][_0x51ad('0x3f1')])this[_0x51ad('0x556')][_0x51ad('0x3f1')]['refresh']();}}}else _0x26ec4f-=Window_ButtonAssist[_0x51ad('0x9c')]['lineHeight']();}return _0x26ec4f;},Scene_MenuBase['prototype'][_0x51ad('0x574')]=function(){return Graphics[_0x51ad('0x2bb')]-this[_0x51ad('0xad')]();},VisuMZ[_0x51ad('0x344')][_0x51ad('0xef')]=Scene_MenuBase[_0x51ad('0x9c')][_0x51ad('0x192')],Scene_MenuBase[_0x51ad('0x9c')][_0x51ad('0x192')]=function(){VisuMZ[_0x51ad('0x344')][_0x51ad('0xef')][_0x51ad('0x52')](this),this[_0x51ad('0x281')](this[_0x51ad('0x49c')]()),this['createCustomBackgroundImages']();},Scene_MenuBase[_0x51ad('0x9c')][_0x51ad('0x49c')]=function(){const _0x225187=String(this[_0x51ad('0x56c')]['name']),_0x1fa631=this[_0x51ad('0x1dc')](_0x225187);if(_0x1fa631)return _0x1fa631[_0x51ad('0x42b')];else{if(_0x51ad('0x2bf')===_0x51ad('0x2bf'))return 0xc0;else{function _0x24c315(){this[_0x51ad('0x3f9')](_0x5a3675,_0x542ec3,_0x3163e1,_0xd4ad36);}}}},Scene_MenuBase[_0x51ad('0x9c')]['createCustomBackgroundImages']=function(){const _0x4b2ec6=String(this[_0x51ad('0x56c')][_0x51ad('0x50f')]),_0x2ba50e=this['getCustomBackgroundSettings'](_0x4b2ec6);_0x2ba50e&&(_0x2ba50e[_0x51ad('0x3d')]!==''||_0x2ba50e[_0x51ad('0x32d')]!=='')&&(this[_0x51ad('0x2cc')]=new Sprite(ImageManager[_0x51ad('0x39')](_0x2ba50e[_0x51ad('0x3d')])),this[_0x51ad('0x3c')]=new Sprite(ImageManager[_0x51ad('0x443')](_0x2ba50e[_0x51ad('0x32d')])),this['addChild'](this[_0x51ad('0x2cc')]),this[_0x51ad('0x1c6')](this['_backSprite2']),this[_0x51ad('0x2cc')][_0x51ad('0x255')]['addLoadListener'](this[_0x51ad('0x434')][_0x51ad('0x3a9')](this,this[_0x51ad('0x2cc')])),this[_0x51ad('0x3c')][_0x51ad('0x255')]['addLoadListener'](this[_0x51ad('0x434')][_0x51ad('0x3a9')](this,this[_0x51ad('0x3c')])));},Scene_MenuBase[_0x51ad('0x9c')][_0x51ad('0x1dc')]=function(_0x53db75){return VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x407')][_0x53db75]||VisuMZ['CoreEngine'][_0x51ad('0x31f')]['MenuBg'][_0x51ad('0x2fd')];},Scene_MenuBase[_0x51ad('0x9c')]['adjustSprite']=function(_0x410850){this[_0x51ad('0x485')](_0x410850),this[_0x51ad('0x44e')](_0x410850);},VisuMZ[_0x51ad('0x344')][_0x51ad('0x397')]=Scene_MenuBase[_0x51ad('0x9c')][_0x51ad('0x377')],Scene_MenuBase[_0x51ad('0x9c')][_0x51ad('0x377')]=function(){VisuMZ[_0x51ad('0x344')][_0x51ad('0x397')][_0x51ad('0x52')](this),SceneManager['isSideButtonLayout']()&&this[_0x51ad('0x521')]();},Scene_MenuBase[_0x51ad('0x9c')][_0x51ad('0x521')]=function(){this[_0x51ad('0x39a')]['x']=Graphics[_0x51ad('0x184')]+0x4;},VisuMZ['CoreEngine'][_0x51ad('0x6e')]=Scene_MenuBase[_0x51ad('0x9c')][_0x51ad('0xe5')],Scene_MenuBase[_0x51ad('0x9c')][_0x51ad('0xe5')]=function(){VisuMZ[_0x51ad('0x344')][_0x51ad('0x6e')]['call'](this);if(SceneManager[_0x51ad('0x33d')]()){if('qATjL'!=='qATjL'){function _0x2c15a8(){this[_0x51ad('0x379')][_0x51ad('0xa3')](_0x35fce6['layoutSettings'][_0x51ad('0x382')]);}}else this[_0x51ad('0x474')]();}},Scene_MenuBase[_0x51ad('0x9c')][_0x51ad('0x474')]=function(){this[_0x51ad('0x13f')]['x']=-0x1*(this[_0x51ad('0x13f')][_0x51ad('0x44f')]+this[_0x51ad('0x60')][_0x51ad('0x44f')]+0x8),this[_0x51ad('0x60')]['x']=-0x1*(this['_pagedownButton']['width']+0x4);},Scene_MenuBase[_0x51ad('0x9c')]['isMenuButtonAssistEnabled']=function(){return VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')]['ButtonAssist']['Enable'];},Scene_MenuBase[_0x51ad('0x9c')][_0x51ad('0x5ab')]=function(){return SceneManager[_0x51ad('0x33d')]()||SceneManager[_0x51ad('0x6a')]()?VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x1d5')][_0x51ad('0x446')]:_0x51ad('0x44d');},Scene_MenuBase[_0x51ad('0x9c')][_0x51ad('0x18b')]=function(){if(!this[_0x51ad('0xc4')]())return;const _0x2e9adc=this[_0x51ad('0x391')]();this[_0x51ad('0x2dc')]=new Window_ButtonAssist(_0x2e9adc),this[_0x51ad('0x208')](this[_0x51ad('0x2dc')]);},Scene_MenuBase[_0x51ad('0x9c')][_0x51ad('0x391')]=function(){return this[_0x51ad('0x5ab')]()===_0x51ad('0x44d')?this[_0x51ad('0x2c6')]():this[_0x51ad('0x16d')]();},Scene_MenuBase[_0x51ad('0x9c')][_0x51ad('0x2c6')]=function(){const _0x78b7c9=ConfigManager[_0x51ad('0x48f')]?(Sprite_Button[_0x51ad('0x9c')][_0x51ad('0x53e')]()+0x6)*0x2:0x0,_0x522bdf=this['buttonY'](),_0x5c8721=Graphics[_0x51ad('0x184')]-_0x78b7c9*0x2,_0x305dcf=this[_0x51ad('0x58d')]();return new Rectangle(_0x78b7c9,_0x522bdf,_0x5c8721,_0x305dcf);},Scene_MenuBase['prototype'][_0x51ad('0x16d')]=function(){const _0xb55ca=Graphics['boxWidth'],_0x55c68d=Window_ButtonAssist[_0x51ad('0x9c')][_0x51ad('0x14b')](),_0x2a9253=0x0;let _0x10977b=0x0;if(this[_0x51ad('0x5ab')]()===_0x51ad('0x3dc')){if(_0x51ad('0x460')===_0x51ad('0x16e')){function _0x7a159d(){this[_0x51ad('0x188')]()?this['drawGoldItemStyle']():_0x4c9729[_0x51ad('0x344')][_0x51ad('0x551')]['call'](this);}}else _0x10977b=0x0;}else _0x10977b=Graphics['boxHeight']-_0x55c68d;return new Rectangle(_0x2a9253,_0x10977b,_0xb55ca,_0x55c68d);},Scene_Menu[_0x51ad('0x3b5')]=VisuMZ[_0x51ad('0x344')]['Settings'][_0x51ad('0x4b3')][_0x51ad('0x59f')],VisuMZ[_0x51ad('0x344')][_0x51ad('0xb')]=Scene_Menu[_0x51ad('0x9c')][_0x51ad('0x3ca')],Scene_Menu['prototype'][_0x51ad('0x3ca')]=function(){VisuMZ[_0x51ad('0x344')][_0x51ad('0xb')][_0x51ad('0x52')](this),this[_0x51ad('0x247')]();},Scene_Menu[_0x51ad('0x9c')][_0x51ad('0x247')]=function(){this[_0x51ad('0x4fb')]&&this['_commandWindow'][_0x51ad('0xa3')](Scene_Menu[_0x51ad('0x3b5')][_0x51ad('0x3d3')]);this['_goldWindow']&&this[_0x51ad('0x25d')]['setBackgroundType'](Scene_Menu[_0x51ad('0x3b5')][_0x51ad('0x482')]);if(this['_statusWindow']){if(_0x51ad('0x4d6')!==_0x51ad('0x164'))this['_statusWindow'][_0x51ad('0xa3')](Scene_Menu[_0x51ad('0x3b5')][_0x51ad('0x191')]);else{function _0x5864d6(){const _0xe19849=this[_0x51ad('0x3ae')]();_0x4e12bc[_0x51ad('0x4b7')](_0x51ad('0x318'))&&this[_0x51ad('0x1aa')](_0x2bd604[_0x51ad('0x471')](this[_0x51ad('0x3ae')](),0x0)),_0x592d2c[_0x51ad('0x4b7')](_0x51ad('0x4ea'))&&this[_0x51ad('0x1aa')](_0x2b7730[_0x51ad('0x2df')](this['index'](),this[_0x51ad('0x4d4')]()-0x1)),this[_0x51ad('0x3ae')]()!==_0xe19849&&this[_0x51ad('0x25f')]();}}}},Scene_Menu[_0x51ad('0x9c')][_0x51ad('0x72')]=function(){return Scene_Menu['layoutSettings']['CommandRect'][_0x51ad('0x52')](this);},Scene_Menu[_0x51ad('0x9c')][_0x51ad('0x34c')]=function(){return Scene_Menu[_0x51ad('0x3b5')]['GoldRect'][_0x51ad('0x52')](this);},Scene_Menu[_0x51ad('0x9c')][_0x51ad('0x437')]=function(){return Scene_Menu[_0x51ad('0x3b5')][_0x51ad('0x32')][_0x51ad('0x52')](this);},Scene_Item[_0x51ad('0x3b5')]=VisuMZ['CoreEngine'][_0x51ad('0x31f')][_0x51ad('0x4b3')][_0x51ad('0x23')],VisuMZ[_0x51ad('0x344')]['Scene_Item_create']=Scene_Item[_0x51ad('0x9c')]['create'],Scene_Item[_0x51ad('0x9c')]['create']=function(){VisuMZ['CoreEngine'][_0x51ad('0x223')][_0x51ad('0x52')](this),this[_0x51ad('0x247')]();},Scene_Item[_0x51ad('0x9c')][_0x51ad('0x247')]=function(){if(this[_0x51ad('0x2a4')]){if(_0x51ad('0x23f')!==_0x51ad('0x6d'))this[_0x51ad('0x2a4')][_0x51ad('0xa3')](Scene_Item[_0x51ad('0x3b5')][_0x51ad('0x11b')]);else{function _0x46425e(){_0x15dd01[_0x51ad('0x2fa')]=!![],_0x22bdbe[_0x51ad('0x344')]['Game_Actor_changeClass']['call'](this,_0x57c4fa,_0x5b423e),_0x3dd6ab['_changingClass']=_0x491de6;}}}this[_0x51ad('0x276')]&&this[_0x51ad('0x276')]['setBackgroundType'](Scene_Item[_0x51ad('0x3b5')][_0x51ad('0x29d')]);if(this[_0x51ad('0x198')]){if('FfLpm'!==_0x51ad('0xe6'))this[_0x51ad('0x198')][_0x51ad('0xa3')](Scene_Item[_0x51ad('0x3b5')][_0x51ad('0x378')]);else{function _0x563c84(){const _0x1b4c88=this[_0x51ad('0x3a6')]/0x5,_0x387cf7=_0xefc921[_0x51ad('0x556')],_0x5019ff=_0x387cf7[_0x51ad('0x283')[_0x51ad('0x348')](_0x2d72fa)](),_0x372b85=_0x387cf7[_0x51ad('0x5a9')[_0x51ad('0x348')](_0x2b9ebc)]();this[_0x51ad('0x211')][_0x51ad('0xa0')[_0x51ad('0x348')](_0x4d8fec)]=_0x5019ff,this['_data'][_0x51ad('0x20')['format'](_0x295839)]=_0x372b85;if(_0x5019ff==='')return;if(_0x372b85==='')return;const _0x1c7417=_0x387cf7[_0x51ad('0x359')[_0x51ad('0x348')](_0x46356c)](),_0x419848=this[_0x51ad('0x317')](),_0x28202b=_0x1b4c88*(_0x291c8a-0x1)+_0x419848+_0x1c7417,_0xe18481=_0x31cf9b[_0x51ad('0x344')]['Settings'][_0x51ad('0x1d5')][_0x51ad('0xaf')];this['drawTextEx'](_0xe18481['format'](_0x5019ff,_0x372b85),_0x28202b,0x0,_0x1b4c88-_0x419848*0x2);}}}this[_0x51ad('0x275')]&&this[_0x51ad('0x275')][_0x51ad('0xa3')](Scene_Item[_0x51ad('0x3b5')][_0x51ad('0x32e')]);},Scene_Item[_0x51ad('0x9c')][_0x51ad('0x585')]=function(){return Scene_Item[_0x51ad('0x3b5')]['HelpRect'][_0x51ad('0x52')](this);},Scene_Item[_0x51ad('0x9c')][_0x51ad('0xd3')]=function(){return Scene_Item[_0x51ad('0x3b5')][_0x51ad('0x3fe')][_0x51ad('0x52')](this);},Scene_Item[_0x51ad('0x9c')][_0x51ad('0x8')]=function(){return Scene_Item['layoutSettings'][_0x51ad('0x207')][_0x51ad('0x52')](this);},Scene_Item[_0x51ad('0x9c')]['actorWindowRect']=function(){return Scene_Item['layoutSettings']['ActorRect'][_0x51ad('0x52')](this);},Scene_Skill[_0x51ad('0x3b5')]=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x4b3')][_0x51ad('0x19d')],VisuMZ[_0x51ad('0x344')]['Scene_Skill_create']=Scene_Skill['prototype'][_0x51ad('0x3ca')],Scene_Skill[_0x51ad('0x9c')][_0x51ad('0x3ca')]=function(){VisuMZ[_0x51ad('0x344')][_0x51ad('0x1e0')]['call'](this),this[_0x51ad('0x247')]();},Scene_Skill[_0x51ad('0x9c')][_0x51ad('0x247')]=function(){this[_0x51ad('0x2a4')]&&this[_0x51ad('0x2a4')][_0x51ad('0xa3')](Scene_Skill[_0x51ad('0x3b5')][_0x51ad('0x11b')]);this[_0x51ad('0x598')]&&this[_0x51ad('0x598')]['setBackgroundType'](Scene_Skill['layoutSettings'][_0x51ad('0x42d')]);this['_statusWindow']&&this[_0x51ad('0x5a6')]['setBackgroundType'](Scene_Skill['layoutSettings'][_0x51ad('0x191')]);this[_0x51ad('0x198')]&&this['_itemWindow'][_0x51ad('0xa3')](Scene_Skill[_0x51ad('0x3b5')][_0x51ad('0x378')]);if(this[_0x51ad('0x275')]){if('MCMvK'!==_0x51ad('0x48b')){function _0x567d30(){if(_0x34b2ea[_0x51ad('0x304')]())_0x5b7838['log'](_0x3cb0d0);}}else this[_0x51ad('0x275')][_0x51ad('0xa3')](Scene_Skill['layoutSettings'][_0x51ad('0x32e')]);}},Scene_Skill[_0x51ad('0x9c')][_0x51ad('0x585')]=function(){return Scene_Skill[_0x51ad('0x3b5')][_0x51ad('0x31d')]['call'](this);},Scene_Skill[_0x51ad('0x9c')][_0x51ad('0x2e1')]=function(){return Scene_Skill[_0x51ad('0x3b5')][_0x51ad('0x5a7')]['call'](this);},Scene_Skill[_0x51ad('0x9c')]['statusWindowRect']=function(){return Scene_Skill[_0x51ad('0x3b5')][_0x51ad('0x32')][_0x51ad('0x52')](this);},Scene_Skill[_0x51ad('0x9c')][_0x51ad('0x8')]=function(){return Scene_Skill[_0x51ad('0x3b5')]['ItemRect'][_0x51ad('0x52')](this);},Scene_Skill['prototype'][_0x51ad('0x15d')]=function(){return Scene_Skill['layoutSettings'][_0x51ad('0x54e')][_0x51ad('0x52')](this);},Scene_Equip[_0x51ad('0x3b5')]=VisuMZ['CoreEngine'][_0x51ad('0x31f')]['MenuLayout'][_0x51ad('0x73')],VisuMZ[_0x51ad('0x344')][_0x51ad('0x405')]=Scene_Equip[_0x51ad('0x9c')][_0x51ad('0x3ca')],Scene_Equip[_0x51ad('0x9c')][_0x51ad('0x3ca')]=function(){VisuMZ[_0x51ad('0x344')][_0x51ad('0x405')][_0x51ad('0x52')](this),this[_0x51ad('0x247')]();},Scene_Equip[_0x51ad('0x9c')][_0x51ad('0x247')]=function(){if(this[_0x51ad('0x2a4')]){if(_0x51ad('0x15c')===_0x51ad('0x15c'))this['_helpWindow'][_0x51ad('0xa3')](Scene_Equip[_0x51ad('0x3b5')][_0x51ad('0x11b')]);else{function _0xf8c4fa(){this['initialize'](...arguments);}}}this[_0x51ad('0x5a6')]&&this[_0x51ad('0x5a6')][_0x51ad('0xa3')](Scene_Equip['layoutSettings']['StatusBgType']);this[_0x51ad('0x4fb')]&&this[_0x51ad('0x4fb')][_0x51ad('0xa3')](Scene_Equip[_0x51ad('0x3b5')][_0x51ad('0x3d3')]);if(this[_0x51ad('0x297')]){if(_0x51ad('0x1ab')!=='hRVBQ')this[_0x51ad('0x297')]['setBackgroundType'](Scene_Equip[_0x51ad('0x3b5')]['SlotBgType']);else{function _0x327c73(){this[_0x51ad('0x54f')]=_0x67e36c,this[_0x51ad('0x41e')]=_0x319eef['makeDeepCopy'](this['_anchor']);}}}this[_0x51ad('0x198')]&&this['_itemWindow'][_0x51ad('0xa3')](Scene_Equip[_0x51ad('0x3b5')][_0x51ad('0x378')]);},Scene_Equip['prototype']['helpWindowRect']=function(){return Scene_Equip[_0x51ad('0x3b5')]['HelpRect'][_0x51ad('0x52')](this);},Scene_Equip[_0x51ad('0x9c')][_0x51ad('0x437')]=function(){return Scene_Equip[_0x51ad('0x3b5')]['StatusRect']['call'](this);},Scene_Equip[_0x51ad('0x9c')]['commandWindowRect']=function(){return Scene_Equip[_0x51ad('0x3b5')][_0x51ad('0x362')][_0x51ad('0x52')](this);},Scene_Equip[_0x51ad('0x9c')][_0x51ad('0x9e')]=function(){return Scene_Equip[_0x51ad('0x3b5')][_0x51ad('0x4ba')][_0x51ad('0x52')](this);},Scene_Equip['prototype'][_0x51ad('0x8')]=function(){return Scene_Equip[_0x51ad('0x3b5')][_0x51ad('0x207')][_0x51ad('0x52')](this);},Scene_Status[_0x51ad('0x3b5')]=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x4b3')][_0x51ad('0x1ba')],VisuMZ[_0x51ad('0x344')][_0x51ad('0x118')]=Scene_Status[_0x51ad('0x9c')][_0x51ad('0x3ca')],Scene_Status[_0x51ad('0x9c')][_0x51ad('0x3ca')]=function(){VisuMZ[_0x51ad('0x344')][_0x51ad('0x118')]['call'](this),this[_0x51ad('0x247')]();},Scene_Status['prototype']['setCoreEngineUpdateWindowBg']=function(){if(this[_0x51ad('0x1f')]){if('LeUgP'===_0x51ad('0x104'))this[_0x51ad('0x1f')][_0x51ad('0xa3')](Scene_Status[_0x51ad('0x3b5')][_0x51ad('0x1bf')]);else{function _0x2f37ec(){const _0x546942='_stored_powerDownColor';this[_0x51ad('0x3e')]=this[_0x51ad('0x3e')]||{};if(this[_0x51ad('0x3e')][_0x546942])return this['_colorCache'][_0x546942];const _0x47d831=_0x4379bd['CoreEngine'][_0x51ad('0x31f')][_0x51ad('0x34e')][_0x51ad('0x2d3')];return this[_0x51ad('0x5b2')](_0x546942,_0x47d831);}}}if(this[_0x51ad('0x5a6')]){if(_0x51ad('0x3b2')!==_0x51ad('0x3b2')){function _0x5e222d(){this[_0x51ad('0x531')]={'duration':0x0,'wholeDuration':0x0,'type':_0x51ad('0x4d1'),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x51ad('0x3b0')]['x'],'targetScaleY':this[_0x51ad('0x3b0')]['y'],'targetOpacity':this[_0x51ad('0x2f4')],'targetBackOpacity':this['backOpacity'],'targetContentsOpacity':this[_0x51ad('0x154')]};}}else this[_0x51ad('0x5a6')][_0x51ad('0xa3')](Scene_Status[_0x51ad('0x3b5')]['StatusBgType']);}this[_0x51ad('0xe2')]&&this[_0x51ad('0xe2')][_0x51ad('0xa3')](Scene_Status[_0x51ad('0x3b5')][_0x51ad('0x1cd')]);if(this['_statusEquipWindow']){if(_0x51ad('0x50d')!=='CYtfu')this['_statusEquipWindow'][_0x51ad('0xa3')](Scene_Status[_0x51ad('0x3b5')][_0x51ad('0x59e')]);else{function _0x1244c0(){if(_0x188476[_0x51ad('0x304')]())_0x389975['log'](_0x38230b);}}}},Scene_Status[_0x51ad('0x9c')][_0x51ad('0x4ef')]=function(){return Scene_Status[_0x51ad('0x3b5')][_0x51ad('0x2b4')][_0x51ad('0x52')](this);},Scene_Status[_0x51ad('0x9c')]['statusWindowRect']=function(){return Scene_Status[_0x51ad('0x3b5')][_0x51ad('0x32')][_0x51ad('0x52')](this);},Scene_Status['prototype']['statusParamsWindowRect']=function(){return Scene_Status[_0x51ad('0x3b5')][_0x51ad('0x1a2')][_0x51ad('0x52')](this);},Scene_Status[_0x51ad('0x9c')][_0x51ad('0x512')]=function(){return Scene_Status[_0x51ad('0x3b5')][_0x51ad('0x403')]['call'](this);},Scene_Options[_0x51ad('0x3b5')]=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x4b3')][_0x51ad('0x436')],VisuMZ[_0x51ad('0x344')][_0x51ad('0x22a')]=Scene_Options['prototype']['create'],Scene_Options['prototype'][_0x51ad('0x3ca')]=function(){VisuMZ[_0x51ad('0x344')]['Scene_Options_create']['call'](this),this['setCoreEngineUpdateWindowBg']();},Scene_Options[_0x51ad('0x9c')]['setCoreEngineUpdateWindowBg']=function(){this[_0x51ad('0x2fe')]&&this[_0x51ad('0x2fe')][_0x51ad('0xa3')](Scene_Options[_0x51ad('0x3b5')][_0x51ad('0x406')]);},Scene_Options[_0x51ad('0x9c')][_0x51ad('0x45e')]=function(){return Scene_Options['layoutSettings'][_0x51ad('0x425')][_0x51ad('0x52')](this);},Scene_Save[_0x51ad('0x3b5')]=VisuMZ['CoreEngine'][_0x51ad('0x31f')][_0x51ad('0x4b3')]['SaveMenu'],Scene_Save[_0x51ad('0x9c')][_0x51ad('0x3ca')]=function(){Scene_File[_0x51ad('0x9c')][_0x51ad('0x3ca')][_0x51ad('0x52')](this),this[_0x51ad('0x247')]();},Scene_Save[_0x51ad('0x9c')][_0x51ad('0x247')]=function(){if(this[_0x51ad('0x2a4')]){if(_0x51ad('0x3d4')===_0x51ad('0x3d4'))this[_0x51ad('0x2a4')][_0x51ad('0xa3')](Scene_Save['layoutSettings'][_0x51ad('0x11b')]);else{function _0x1a7e49(){this[_0x51ad('0x4c1')][_0x51ad('0xa3')](_0x32a1a2['layoutSettings'][_0x51ad('0x15f')]);}}}this[_0x51ad('0x3f1')]&&this['_listWindow'][_0x51ad('0xa3')](Scene_Save[_0x51ad('0x3b5')]['ListBgType']);},Scene_Save[_0x51ad('0x9c')][_0x51ad('0x585')]=function(){return Scene_Save[_0x51ad('0x3b5')][_0x51ad('0x31d')]['call'](this);},Scene_Save[_0x51ad('0x9c')][_0x51ad('0x544')]=function(){return Scene_Save[_0x51ad('0x3b5')][_0x51ad('0x16b')]['call'](this);},Scene_Load[_0x51ad('0x3b5')]=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')]['MenuLayout'][_0x51ad('0x229')],Scene_Load[_0x51ad('0x9c')][_0x51ad('0x3ca')]=function(){Scene_File[_0x51ad('0x9c')][_0x51ad('0x3ca')][_0x51ad('0x52')](this),this['setCoreEngineUpdateWindowBg']();},Scene_Load[_0x51ad('0x9c')][_0x51ad('0x247')]=function(){this[_0x51ad('0x2a4')]&&this[_0x51ad('0x2a4')][_0x51ad('0xa3')](Scene_Load[_0x51ad('0x3b5')][_0x51ad('0x11b')]);if(this[_0x51ad('0x3f1')]){if(_0x51ad('0x396')===_0x51ad('0x396'))this[_0x51ad('0x3f1')][_0x51ad('0xa3')](Scene_Load[_0x51ad('0x3b5')][_0x51ad('0xec')]);else{function _0x563192(){this[_0x51ad('0x3f9')](_0x16749c,_0x1e8155,_0x530abc,_0x323be8,_0x51ad('0x50e'));}}}},Scene_Load[_0x51ad('0x9c')][_0x51ad('0x585')]=function(){return Scene_Load[_0x51ad('0x3b5')][_0x51ad('0x31d')]['call'](this);},Scene_Load['prototype'][_0x51ad('0x544')]=function(){return Scene_Load[_0x51ad('0x3b5')]['ListRect'][_0x51ad('0x52')](this);},Scene_GameEnd[_0x51ad('0x3b5')]=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x4b3')][_0x51ad('0x287')],VisuMZ[_0x51ad('0x344')]['Scene_GameEnd_createBackground']=Scene_GameEnd['prototype'][_0x51ad('0x192')],Scene_GameEnd[_0x51ad('0x9c')]['createBackground']=function(){Scene_MenuBase[_0x51ad('0x9c')][_0x51ad('0x192')][_0x51ad('0x52')](this);},Scene_GameEnd[_0x51ad('0x9c')][_0x51ad('0x12')]=function(){const _0x22ffec=this[_0x51ad('0x72')]();this['_commandWindow']=new Window_GameEnd(_0x22ffec),this[_0x51ad('0x4fb')]['setHandler']('cancel',this['popScene'][_0x51ad('0x3a9')](this)),this[_0x51ad('0x208')](this[_0x51ad('0x4fb')]),this[_0x51ad('0x4fb')]['setBackgroundType'](Scene_GameEnd[_0x51ad('0x3b5')][_0x51ad('0x3d3')]);},Scene_GameEnd[_0x51ad('0x9c')]['commandWindowRect']=function(){return Scene_GameEnd[_0x51ad('0x3b5')][_0x51ad('0x362')][_0x51ad('0x52')](this);},Scene_Shop[_0x51ad('0x3b5')]=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x4b3')][_0x51ad('0x2de')],VisuMZ[_0x51ad('0x344')][_0x51ad('0x1bc')]=Scene_Shop[_0x51ad('0x9c')]['create'],Scene_Shop['prototype'][_0x51ad('0x3ca')]=function(){VisuMZ[_0x51ad('0x344')]['Scene_Shop_create'][_0x51ad('0x52')](this),this[_0x51ad('0x247')]();},Scene_Shop[_0x51ad('0x9c')][_0x51ad('0x247')]=function(){this[_0x51ad('0x2a4')]&&this[_0x51ad('0x2a4')][_0x51ad('0xa3')](Scene_Shop[_0x51ad('0x3b5')][_0x51ad('0x11b')]);this[_0x51ad('0x25d')]&&this[_0x51ad('0x25d')]['setBackgroundType'](Scene_Shop[_0x51ad('0x3b5')][_0x51ad('0x482')]);if(this[_0x51ad('0x4fb')]){if('QkNMF'==='CRMvw'){function _0x57c872(){return _0x218888[_0x51ad('0x344')]['Settings']['UI'][_0x51ad('0x510')];}}else this[_0x51ad('0x4fb')][_0x51ad('0xa3')](Scene_Shop[_0x51ad('0x3b5')][_0x51ad('0x3d3')]);}if(this[_0x51ad('0x5a')]){if(_0x51ad('0x231')!==_0x51ad('0x231')){function _0x423f0f(){const _0x1a2969=_0x406d27+(this['lineHeight']()-_0x543a12[_0x51ad('0x310')])/0x2;this[_0x51ad('0x380')](_0x170402,_0x585427+(_0x3878f2-_0x5464d3['iconWidth']),_0x1a2969),_0x4f1d2d-=_0x5a673f[_0x51ad('0x24d')]+0x4;}}else this[_0x51ad('0x5a')][_0x51ad('0xa3')](Scene_Shop[_0x51ad('0x3b5')][_0x51ad('0x47c')]);}this[_0x51ad('0x267')]&&this['_numberWindow'][_0x51ad('0xa3')](Scene_Shop[_0x51ad('0x3b5')]['NumberBgType']);if(this[_0x51ad('0x5a6')]){if(_0x51ad('0x57c')!==_0x51ad('0x57c')){function _0x1de790(){const _0x11d32f=_0x51ad('0x206');this[_0x51ad('0x3e')]=this[_0x51ad('0x3e')]||{};if(this['_colorCache'][_0x11d32f])return this[_0x51ad('0x3e')][_0x11d32f];const _0x3d3db8=_0x3bd623[_0x51ad('0x344')]['Settings'][_0x51ad('0x34e')][_0x51ad('0x4')];return this[_0x51ad('0x5b2')](_0x11d32f,_0x3d3db8);}}else this[_0x51ad('0x5a6')][_0x51ad('0xa3')](Scene_Shop['layoutSettings'][_0x51ad('0x191')]);}this['_buyWindow']&&this[_0x51ad('0x4c1')]['setBackgroundType'](Scene_Shop[_0x51ad('0x3b5')][_0x51ad('0x15f')]);if(this['_categoryWindow']){if(_0x51ad('0x176')===_0x51ad('0x176'))this[_0x51ad('0x276')][_0x51ad('0xa3')](Scene_Shop['layoutSettings'][_0x51ad('0x29d')]);else{function _0x4a6c79(){let _0x2de0c9=_0x5e32ed[_0x51ad('0x344')][_0x51ad('0x52b')][_0x51ad('0x52')](this);return _0x2de0c9;}}}if(this[_0x51ad('0x3cf')]){if('Iidcp'!==_0x51ad('0x25b')){function _0x27f890(){const _0x371cae=this[_0x51ad('0x495')](_0x57e66b),_0x2f451f=new(_0x371cae?_0x20ca5b:_0x400140)(),_0x43ca61=this[_0x51ad('0x1d7')](_0x486919);this[_0x51ad('0x1df')](_0x35ce1e[0x0])&&(_0x147e0f=!_0x572b02),_0x2f451f[_0x51ad('0x170')]=_0x42dfa1,_0x2f451f[_0x51ad('0x5b4')](_0x43ca61,_0x3daeb7,_0xd29e46,_0x40e2e9),_0x2f451f[_0x51ad('0x558')](_0x177cd8),this[_0x51ad('0x36b')][_0x51ad('0x1c6')](_0x2f451f),this['_fauxAnimationSprites'][_0x51ad('0x577')](_0x2f451f);}}else this[_0x51ad('0x3cf')][_0x51ad('0xa3')](Scene_Shop[_0x51ad('0x3b5')][_0x51ad('0x49e')]);}},Scene_Shop[_0x51ad('0x9c')][_0x51ad('0x585')]=function(){return Scene_Shop['layoutSettings'][_0x51ad('0x31d')][_0x51ad('0x52')](this);},Scene_Shop[_0x51ad('0x9c')][_0x51ad('0x34c')]=function(){return Scene_Shop[_0x51ad('0x3b5')][_0x51ad('0x252')][_0x51ad('0x52')](this);},Scene_Shop['prototype'][_0x51ad('0x72')]=function(){return Scene_Shop[_0x51ad('0x3b5')][_0x51ad('0x362')][_0x51ad('0x52')](this);},Scene_Shop[_0x51ad('0x9c')][_0x51ad('0x366')]=function(){return Scene_Shop[_0x51ad('0x3b5')]['DummyRect'][_0x51ad('0x52')](this);},Scene_Shop[_0x51ad('0x9c')][_0x51ad('0x3f6')]=function(){return Scene_Shop[_0x51ad('0x3b5')][_0x51ad('0xbf')][_0x51ad('0x52')](this);},Scene_Shop[_0x51ad('0x9c')][_0x51ad('0x437')]=function(){return Scene_Shop[_0x51ad('0x3b5')][_0x51ad('0x32')][_0x51ad('0x52')](this);},Scene_Shop[_0x51ad('0x9c')][_0x51ad('0x33c')]=function(){return Scene_Shop['layoutSettings'][_0x51ad('0x55e')]['call'](this);},Scene_Shop[_0x51ad('0x9c')]['categoryWindowRect']=function(){return Scene_Shop[_0x51ad('0x3b5')][_0x51ad('0x3fe')][_0x51ad('0x52')](this);},Scene_Shop['prototype']['sellWindowRect']=function(){return Scene_Shop[_0x51ad('0x3b5')]['SellRect'][_0x51ad('0x52')](this);},Scene_Name[_0x51ad('0x3b5')]=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x4b3')][_0x51ad('0x289')],VisuMZ[_0x51ad('0x344')][_0x51ad('0x548')]=Scene_Name[_0x51ad('0x9c')][_0x51ad('0x3ca')],Scene_Name[_0x51ad('0x9c')][_0x51ad('0x3ca')]=function(){VisuMZ['CoreEngine'][_0x51ad('0x548')][_0x51ad('0x52')](this),this[_0x51ad('0x247')]();},Scene_Name[_0x51ad('0x9c')][_0x51ad('0x247')]=function(){if(this['_editWindow']){if(_0x51ad('0x328')===_0x51ad('0x328'))this['_editWindow'][_0x51ad('0xa3')](Scene_Name[_0x51ad('0x3b5')][_0x51ad('0x442')]);else{function _0x1279b2(){_0x4e1264['CoreEngine'][_0x51ad('0x28b')][_0x51ad('0x52')](this,_0x52fd35);}}}this[_0x51ad('0x379')]&&this[_0x51ad('0x379')]['setBackgroundType'](Scene_Name[_0x51ad('0x3b5')][_0x51ad('0x382')]);},Scene_Name['prototype'][_0x51ad('0xad')]=function(){return 0x0;},Scene_Name[_0x51ad('0x9c')][_0x51ad('0x34b')]=function(){return Scene_Name[_0x51ad('0x3b5')][_0x51ad('0x9')][_0x51ad('0x52')](this);},Scene_Name['prototype'][_0x51ad('0x518')]=function(){return Scene_Name['layoutSettings'][_0x51ad('0x2d5')][_0x51ad('0x52')](this);},VisuMZ[_0x51ad('0x344')][_0x51ad('0x245')]=Scene_Battle[_0x51ad('0x9c')][_0x51ad('0x14')],Scene_Battle[_0x51ad('0x9c')][_0x51ad('0x14')]=function(){VisuMZ[_0x51ad('0x344')]['Scene_Battle_update'][_0x51ad('0x52')](this);if($gameTemp[_0x51ad('0x147')])this['updatePlayTestF7']();},Scene_Battle[_0x51ad('0x9c')][_0x51ad('0x306')]=function(){if(!BattleManager[_0x51ad('0x2b3')]()&&!this[_0x51ad('0x1c7')]&&!$gameMessage[_0x51ad('0x36f')]()){if(_0x51ad('0x160')===_0x51ad('0x234')){function _0x2737d1(){return![];}}else this['_playtestF7Looping']=!![],this[_0x51ad('0x14')](),this[_0x51ad('0x1c7')]=![];}},VisuMZ['CoreEngine'][_0x51ad('0x268')]=Scene_Battle[_0x51ad('0x9c')]['createCancelButton'],Scene_Battle[_0x51ad('0x9c')][_0x51ad('0x377')]=function(){VisuMZ[_0x51ad('0x344')][_0x51ad('0x268')]['call'](this);if(SceneManager[_0x51ad('0x33d')]()){if(_0x51ad('0x296')==='LiAGn')this[_0x51ad('0x345')]();else{function _0x31d62d(){_0x5e92ff['CoreEngine']['Scene_Battle_update'][_0x51ad('0x52')](this);if(_0x49f691['_playTestFastMode'])this['updatePlayTestF7']();}}}},Scene_Battle[_0x51ad('0x9c')][_0x51ad('0x345')]=function(){this['_cancelButton']['x']=Graphics[_0x51ad('0x184')]+0x4;if(this[_0x51ad('0x381')]()){if('JDSFX'!==_0x51ad('0x3c9'))this['_cancelButton']['y']=Graphics[_0x51ad('0x2bb')]-this[_0x51ad('0x58d')]();else{function _0x429c43(){const _0x2bf9b8=_0xae0df3[_0x51ad('0x15b')];let _0x4a9999=_0x46bac0[_0x51ad('0x476')];if(['',_0x51ad('0x123')][_0x51ad('0xbc')](_0x4a9999))_0x4a9999=_0x3f1991['TextJS'][_0x51ad('0x52')](this);const _0x12766d=_0x302c8f[_0x51ad('0x384')][_0x51ad('0x52')](this),_0x4de893=_0x142fb3[_0x51ad('0x284')][_0x51ad('0x52')](this);this[_0x51ad('0x48d')](_0x4a9999,_0x2bf9b8,_0x12766d,_0x4de893),this[_0x51ad('0x42c')](_0x2bf9b8,_0x2544c8[_0x51ad('0x36c')][_0x51ad('0x3a9')](this,_0x4de893));}}}else this[_0x51ad('0x39a')]['y']=0x0;},VisuMZ['CoreEngine'][_0x51ad('0x2fc')]=Sprite_Button[_0x51ad('0x9c')][_0x51ad('0x386')],Sprite_Button[_0x51ad('0x9c')][_0x51ad('0x386')]=function(_0x4bac69){VisuMZ[_0x51ad('0x344')][_0x51ad('0x2fc')]['call'](this,_0x4bac69),this[_0x51ad('0x464')]();},Sprite_Button[_0x51ad('0x9c')][_0x51ad('0x464')]=function(){const _0x30b08c=VisuMZ[_0x51ad('0x344')]['Settings']['UI'];this['_isButtonHidden']=![];switch(this[_0x51ad('0x404')]){case _0x51ad('0x4b2'):this[_0x51ad('0x37d')]=!_0x30b08c['cancelShowButton'];break;case _0x51ad('0x1a1'):case _0x51ad('0x597'):this[_0x51ad('0x37d')]=!_0x30b08c[_0x51ad('0x50')];break;case'down':case'up':case _0x51ad('0x2bd'):case'up2':case'ok':this[_0x51ad('0x37d')]=!_0x30b08c[_0x51ad('0x126')];break;case'menu':this['_isButtonHidden']=!_0x30b08c['menuShowButton'];break;}},VisuMZ[_0x51ad('0x344')][_0x51ad('0x1d2')]=Sprite_Button[_0x51ad('0x9c')]['updateOpacity'],Sprite_Button[_0x51ad('0x9c')]['updateOpacity']=function(){SceneManager['areButtonsHidden']()||this['_isButtonHidden']?this['hideButtonFromView']():VisuMZ[_0x51ad('0x344')][_0x51ad('0x1d2')][_0x51ad('0x52')](this);},Sprite_Button[_0x51ad('0x9c')][_0x51ad('0x21f')]=function(){this[_0x51ad('0x2d1')]=![],this[_0x51ad('0x2f4')]=0x0,this['x']=Graphics['width']*0xa,this['y']=Graphics[_0x51ad('0x4e9')]*0xa;},VisuMZ[_0x51ad('0x344')][_0x51ad('0x435')]=Sprite_Battler[_0x51ad('0x9c')][_0x51ad('0x305')],Sprite_Battler[_0x51ad('0x9c')][_0x51ad('0x305')]=function(_0x910893,_0x248516,_0xd0405f){(this[_0x51ad('0x2e9')]!==_0x910893||this['_targetOffsetY']!==_0x248516)&&(this[_0x51ad('0x453')](_0x51ad('0xdc')),this[_0x51ad('0x155')]=_0xd0405f),VisuMZ[_0x51ad('0x344')][_0x51ad('0x435')][_0x51ad('0x52')](this,_0x910893,_0x248516,_0xd0405f);},Sprite_Battler[_0x51ad('0x9c')][_0x51ad('0x453')]=function(_0x421f7d){this[_0x51ad('0x124')]=_0x421f7d;},Sprite_Battler['prototype'][_0x51ad('0x48c')]=function(){if(this[_0x51ad('0x371')]<=0x0)return;const _0x9ed497=this['_movementDuration'],_0x206310=this[_0x51ad('0x155')],_0x472056=this[_0x51ad('0x124')];this[_0x51ad('0x6c')]=this[_0x51ad('0x2c2')](this[_0x51ad('0x6c')],this[_0x51ad('0x2e9')],_0x9ed497,_0x206310,_0x472056),this['_offsetY']=this[_0x51ad('0x2c2')](this[_0x51ad('0x566')],this[_0x51ad('0x545')],_0x9ed497,_0x206310,_0x472056),this[_0x51ad('0x371')]--;if(this[_0x51ad('0x371')]<=0x0)this[_0x51ad('0x547')]();},Sprite_Battler['prototype'][_0x51ad('0x2c2')]=function(_0x582f54,_0x4cab31,_0x2d66d6,_0x5878ac,_0x4a0918){const _0x30a2e0=VisuMZ[_0x51ad('0x57f')]((_0x5878ac-_0x2d66d6)/_0x5878ac,_0x4a0918||'Linear'),_0x5d9e49=VisuMZ[_0x51ad('0x57f')]((_0x5878ac-_0x2d66d6+0x1)/_0x5878ac,_0x4a0918||_0x51ad('0xdc')),_0x4f8739=(_0x582f54-_0x4cab31*_0x30a2e0)/(0x1-_0x30a2e0);return _0x4f8739+(_0x4cab31-_0x4f8739)*_0x5d9e49;},VisuMZ[_0x51ad('0x344')][_0x51ad('0x28e')]=Sprite_Actor[_0x51ad('0x9c')][_0x51ad('0x25e')],Sprite_Actor[_0x51ad('0x9c')][_0x51ad('0x25e')]=function(_0x770569){if(VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')]['UI'][_0x51ad('0x53d')]){if(_0x51ad('0x179')!==_0x51ad('0x179')){function _0x5f50b4(){var _0x4cba8f=_0x56537d(_0x51ad('0x10'))['Window'][_0x51ad('0xf4')]();_0x594238['showDevTools']();if(_0x30c99d)_0x2a51cc(_0x4cba8f[_0x51ad('0x15e')][_0x51ad('0x3a9')](_0x4cba8f),0x190);}}else this['setActorHomeRepositioned'](_0x770569);}else VisuMZ[_0x51ad('0x344')][_0x51ad('0x28e')]['call'](this,_0x770569);},Sprite_Actor[_0x51ad('0x9c')][_0x51ad('0x4fd')]=function(_0x58afe1){let _0x407d2a=Math['round'](Graphics[_0x51ad('0x44f')]/0x2+0xc0);_0x407d2a-=Math['floor']((Graphics[_0x51ad('0x44f')]-Graphics[_0x51ad('0x184')])/0x2),_0x407d2a+=_0x58afe1*0x20;let _0x3f4c38=Graphics[_0x51ad('0x4e9')]-0xc8-$gameParty[_0x51ad('0x562')]()*0x30;_0x3f4c38-=Math[_0x51ad('0x529')]((Graphics[_0x51ad('0x4e9')]-Graphics['boxHeight'])/0x2),_0x3f4c38+=_0x58afe1*0x30,this[_0x51ad('0x16c')](_0x407d2a,_0x3f4c38);},Sprite_Actor[_0x51ad('0x9c')][_0x51ad('0xed')]=function(){this[_0x51ad('0x305')](0x4b0,0x0,0x78);},Sprite_Animation[_0x51ad('0x9c')][_0x51ad('0x558')]=function(_0x5c2e6){this[_0x51ad('0x1d0')]=_0x5c2e6;},VisuMZ[_0x51ad('0x344')][_0x51ad('0x361')]=Sprite_Animation[_0x51ad('0x9c')][_0x51ad('0xc7')],Sprite_Animation[_0x51ad('0x9c')][_0x51ad('0xc7')]=function(){if(this['_muteSound'])return;VisuMZ[_0x51ad('0x344')][_0x51ad('0x361')][_0x51ad('0x52')](this);},Sprite_Animation[_0x51ad('0x9c')][_0x51ad('0x4bf')]=function(_0x488798){const _0x8cb484=this[_0x51ad('0x135')]['name'];let _0x9c356a=0x0,_0x34262a=-_0x488798['height']/0x2;;if(_0x8cb484[_0x51ad('0x58b')](/<(?:HEAD|HEADER|TOP)>/i))_0x34262a=-_0x488798['height'];if(_0x8cb484[_0x51ad('0x58b')](/<(?:FOOT|FOOTER|BOTTOM)>/i))_0x34262a=0x0;if(_0x8cb484[_0x51ad('0x58b')](/<(?:LEFT)>/i))_0x9c356a=-_0x488798[_0x51ad('0x44f')]/0x2;if(_0x8cb484[_0x51ad('0x58b')](/<(?:RIGHT)>/i))_0x34262a=_0x488798[_0x51ad('0x44f')]/0x2;if(_0x8cb484[_0x51ad('0x58b')](/<ANCHOR X:[ ](\d+\.?\d*)>/i))_0x9c356a=Number(RegExp['$1'])*_0x488798[_0x51ad('0x44f')];_0x8cb484['match'](/<ANCHOR Y:[ ](\d+\.?\d*)>/i)&&(_0x34262a=(0x1-Number(RegExp['$1']))*-_0x488798[_0x51ad('0x4e9')]);if(_0x8cb484[_0x51ad('0x58b')](/<ANCHOR:[ ](\d+\.?\d*),[ ](\d+\.?\d*)>/i)){if('WIcsI'!==_0x51ad('0x477')){function _0x191339(){return _0x3b983f[_0x51ad('0x344')][_0x51ad('0x31f')]['MenuLayout'][_0x51ad('0x2c9')][_0x51ad('0x27e')];}}else _0x9c356a=Number(RegExp['$1'])*_0x488798[_0x51ad('0x44f')],_0x34262a=(0x1-Number(RegExp['$2']))*-_0x488798['height'];}if(_0x8cb484[_0x51ad('0x58b')](/<OFFSET X:[ ]([\+\-]\d+)>/i))_0x9c356a+=Number(RegExp['$1']);if(_0x8cb484[_0x51ad('0x58b')](/<OFFSET Y:[ ]([\+\-]\d+)>/i))_0x34262a+=Number(RegExp['$1']);_0x8cb484[_0x51ad('0x58b')](/<OFFSET:[ ]([\+\-]\d+),[ ]([\+\-]\d+)>/i)&&(_0x9c356a+=Number(RegExp['$1']),_0x34262a+=Number(RegExp['$2']));const _0x383cb3=new Point(_0x9c356a,_0x34262a);return _0x488798[_0x51ad('0x587')](),_0x488798[_0x51ad('0x520')][_0x51ad('0x358')](_0x383cb3);},Sprite_AnimationMV['prototype'][_0x51ad('0x558')]=function(_0x358ab6){this[_0x51ad('0x1d0')]=_0x358ab6;},VisuMZ['CoreEngine'][_0x51ad('0x2be')]=Sprite_AnimationMV[_0x51ad('0x9c')][_0x51ad('0xa4')],Sprite_AnimationMV[_0x51ad('0x9c')][_0x51ad('0xa4')]=function(_0x1d9ec9){if(this[_0x51ad('0x1d0')]){if(_0x51ad('0x373')===_0x51ad('0x4db')){function _0x3fd336(){const _0x2ecf65=_0x34af0b[_0x51ad('0x15b')];let _0x49ea81=_0x49de79['TextStr'];if(['','Untitled'][_0x51ad('0xbc')](_0x49ea81))_0x49ea81=_0x2c2631[_0x51ad('0xeb')][_0x51ad('0x52')](this);const _0x1679ba=_0x1b8f49[_0x51ad('0x384')][_0x51ad('0x52')](this),_0x49950e=_0x22f744[_0x51ad('0x284')][_0x51ad('0x52')](this);this[_0x51ad('0x48d')](_0x49ea81,_0x2ecf65,_0x1679ba,_0x49950e),this[_0x51ad('0x42c')](_0x2ecf65,_0x1ffdb0[_0x51ad('0x36c')][_0x51ad('0x3a9')](this,_0x49950e));}}else _0x1d9ec9=JsonEx[_0x51ad('0x5b')](_0x1d9ec9),_0x1d9ec9['se'][_0x51ad('0x589')]=0x0;}VisuMZ[_0x51ad('0x344')][_0x51ad('0x2be')][_0x51ad('0x52')](this,_0x1d9ec9);},Sprite_Damage[_0x51ad('0x9c')]['createDigits']=function(_0x4f5186){let _0x57935a=Math[_0x51ad('0x28d')](_0x4f5186)[_0x51ad('0x33a')]();if(this[_0x51ad('0xe7')]()){if(_0x51ad('0x416')==='kyEcw'){function _0x273fd3(){const _0x152b4a=this['paramX']()-this[_0x51ad('0x317')]()*0x2;this[_0x51ad('0x1fb')](_0x1ebaeb,_0x592609,_0x152b4a,_0x56733e,![]);}}else _0x57935a=VisuMZ[_0x51ad('0x56f')](_0x57935a);}const _0x3cbd1e=this[_0x51ad('0x23d')](),_0x4c45cc=Math[_0x51ad('0x529')](_0x3cbd1e*0.75);for(let _0x346620=0x0;_0x346620<_0x57935a[_0x51ad('0x88')];_0x346620++){if(_0x51ad('0x4b1')!=='JMygt'){function _0x40d394(){_0x5c644e[_0x51ad('0x344')][_0x51ad('0x4f0')][_0x51ad('0x52')](this);}}else{const _0x21a675=this[_0x51ad('0x3da')](_0x4c45cc,_0x3cbd1e);_0x21a675[_0x51ad('0x255')][_0x51ad('0x3f9')](_0x57935a[_0x346620],0x0,0x0,_0x4c45cc,_0x3cbd1e,_0x51ad('0x399')),_0x21a675['x']=(_0x346620-(_0x57935a[_0x51ad('0x88')]-0x1)/0x2)*_0x4c45cc,_0x21a675['dy']=-_0x346620;}}},Sprite_Damage[_0x51ad('0x9c')][_0x51ad('0xe7')]=function(){return VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')]['QoL'][_0x51ad('0x290')];},VisuMZ[_0x51ad('0x344')][_0x51ad('0x591')]=Sprite_Gauge['prototype'][_0x51ad('0x509')],Sprite_Gauge['prototype'][_0x51ad('0x509')]=function(){return VisuMZ[_0x51ad('0x344')][_0x51ad('0x591')][_0x51ad('0x52')](this)[_0x51ad('0x38')](0x0,0x1);},VisuMZ['CoreEngine'][_0x51ad('0x52b')]=Sprite_Gauge[_0x51ad('0x9c')][_0x51ad('0x498')],Sprite_Gauge[_0x51ad('0x9c')][_0x51ad('0x498')]=function(){let _0x1c693a=VisuMZ[_0x51ad('0x344')][_0x51ad('0x52b')][_0x51ad('0x52')](this);return _0x1c693a;},Sprite_Gauge[_0x51ad('0x9c')]['drawValue']=function(){let _0x20c60b=this[_0x51ad('0x498')]();this[_0x51ad('0xe7')]()&&(_0x20c60b=VisuMZ['GroupDigits'](_0x20c60b));const _0x36d1f2=this[_0x51ad('0x1b3')]()-0x1,_0x2991fc=this['bitmapHeight']();this[_0x51ad('0x40c')](),this['bitmap'][_0x51ad('0x3f9')](_0x20c60b,0x0,0x0,_0x36d1f2,_0x2991fc,_0x51ad('0x50e'));},Sprite_Gauge[_0x51ad('0x9c')][_0x51ad('0x291')]=function(){return 0x3;},Sprite_Gauge[_0x51ad('0x9c')]['useDigitGrouping']=function(){return VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x2f8')][_0x51ad('0x3f3')];};function Sprite_TitlePictureButton(){this[_0x51ad('0x386')](...arguments);}Sprite_TitlePictureButton['prototype']=Object[_0x51ad('0x3ca')](Sprite_Clickable[_0x51ad('0x9c')]),Sprite_TitlePictureButton[_0x51ad('0x9c')]['constructor']=Sprite_TitlePictureButton,Sprite_TitlePictureButton['prototype'][_0x51ad('0x386')]=function(_0x29b202){Sprite_Clickable['prototype'][_0x51ad('0x386')][_0x51ad('0x52')](this),this[_0x51ad('0x211')]=_0x29b202,this[_0x51ad('0x10f')]=null,this[_0x51ad('0x5b4')]();},Sprite_TitlePictureButton[_0x51ad('0x9c')][_0x51ad('0x5b4')]=function(){this['x']=Graphics[_0x51ad('0x44f')],this['y']=Graphics[_0x51ad('0x4e9')],this[_0x51ad('0x2d1')]=![],this[_0x51ad('0x2e6')]();},Sprite_TitlePictureButton[_0x51ad('0x9c')]['setupButtonImage']=function(){this[_0x51ad('0x255')]=ImageManager[_0x51ad('0x431')](this[_0x51ad('0x211')][_0x51ad('0x484')]),this[_0x51ad('0x255')][_0x51ad('0x36')](this['onButtonImageLoad'][_0x51ad('0x3a9')](this));},Sprite_TitlePictureButton[_0x51ad('0x9c')][_0x51ad('0x42')]=function(){this[_0x51ad('0x211')][_0x51ad('0x3ea')]['call'](this),this[_0x51ad('0x211')][_0x51ad('0x1c0')][_0x51ad('0x52')](this),this[_0x51ad('0x301')](this[_0x51ad('0x211')]['CallHandlerJS'][_0x51ad('0x3a9')](this));},Sprite_TitlePictureButton['prototype'][_0x51ad('0x14')]=function(){Sprite_Clickable['prototype'][_0x51ad('0x14')][_0x51ad('0x52')](this),this[_0x51ad('0x248')](),this[_0x51ad('0x175')]();},Sprite_TitlePictureButton[_0x51ad('0x9c')][_0x51ad('0x139')]=function(){return VisuMZ[_0x51ad('0x344')]['Settings'][_0x51ad('0x4b3')][_0x51ad('0x2c9')][_0x51ad('0x27e')];},Sprite_TitlePictureButton['prototype'][_0x51ad('0x248')]=function(){if(this[_0x51ad('0x552')]){if(_0x51ad('0x553')!==_0x51ad('0x233'))this[_0x51ad('0x2f4')]=0xff;else{function _0x36b0c4(){_0x25767d[_0x51ad('0x527')](_0x51ad('0x479')),_0x492fed[_0x51ad('0x527')](_0x19ae49);}}}else this[_0x51ad('0x2f4')]+=this['visible']?this['fadeSpeed']():-0x1*this['fadeSpeed'](),this[_0x51ad('0x2f4')]=Math[_0x51ad('0x471')](0xc0,this[_0x51ad('0x2f4')]);},Sprite_TitlePictureButton['prototype'][_0x51ad('0x301')]=function(_0x4f9733){this[_0x51ad('0x10f')]=_0x4f9733;},Sprite_TitlePictureButton['prototype'][_0x51ad('0x1e8')]=function(){if(this[_0x51ad('0x10f')]){if(_0x51ad('0x52e')!==_0x51ad('0x2db'))this[_0x51ad('0x10f')]();else{function _0x4eb599(){return _0x1c8eb0['CoreEngine'][_0x51ad('0x31f')]['UI'][_0x51ad('0x46f')];}}}},VisuMZ[_0x51ad('0x344')]['Spriteset_Base_initialize']=Spriteset_Base['prototype']['initialize'],Spriteset_Base[_0x51ad('0x9c')][_0x51ad('0x386')]=function(){VisuMZ[_0x51ad('0x344')][_0x51ad('0x523')][_0x51ad('0x52')](this),this['_fauxAnimationSprites']=[];},VisuMZ['CoreEngine'][_0x51ad('0xcb')]=Spriteset_Base[_0x51ad('0x9c')][_0x51ad('0x19b')],Spriteset_Base[_0x51ad('0x9c')]['destroy']=function(_0x3e83f1){this[_0x51ad('0x1c3')](),VisuMZ[_0x51ad('0x344')][_0x51ad('0xcb')][_0x51ad('0x52')](this,_0x3e83f1);},VisuMZ[_0x51ad('0x344')][_0x51ad('0xea')]=Spriteset_Base[_0x51ad('0x9c')][_0x51ad('0x14')],Spriteset_Base[_0x51ad('0x9c')][_0x51ad('0x14')]=function(){VisuMZ[_0x51ad('0x344')][_0x51ad('0xea')][_0x51ad('0x52')](this),this[_0x51ad('0x8b')](),this[_0x51ad('0x41b')]();},Spriteset_Base[_0x51ad('0x9c')][_0x51ad('0x8b')]=function(){if(!VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x2f8')][_0x51ad('0x133')])return;if(this[_0x51ad('0x3b0')]['x']!==0x0){if(_0x51ad('0x273')!==_0x51ad('0x273')){function _0x3b2ab5(){var _0x5d92db=_0x41071f(_0x317b4a['$1']);if(_0x5d92db===0x0)_0x5d92db=_0x40d7b3[_0x51ad('0x309')];_0xd7a815=_0x502d5e[_0x51ad('0x2df')](_0x524285,_0x5d92db);}}else this[_0x51ad('0xf3')][_0x51ad('0x3b0')]['x']=0x1/this['scale']['x'],this[_0x51ad('0xf3')]['x']=-(this['x']/this['scale']['x']);}if(this[_0x51ad('0x3b0')]['y']!==0x0){if(_0x51ad('0x1f1')!=='KUUsZ')this['_pictureContainer'][_0x51ad('0x3b0')]['y']=0x1/this[_0x51ad('0x3b0')]['y'],this[_0x51ad('0xf3')]['y']=-(this['y']/this[_0x51ad('0x3b0')]['y']);else{function _0xab0312(){this[_0x51ad('0x1ec')](),_0x46757a[_0x51ad('0x344')][_0x51ad('0x528')][_0x51ad('0x52')](this,_0x48a310),this['initCoreEasing']();}}}},Spriteset_Base['prototype'][_0x51ad('0x41b')]=function(){for(const _0x3c9446 of this[_0x51ad('0x4fa')]){if(_0x51ad('0x20a')===_0x51ad('0x196')){function _0x37f77c(){_0x333388[_0x51ad('0x22e')](_0x51ad('0x10a'))?this[_0x51ad('0x4af')]():this[_0x51ad('0x272')](_0x4751ce[_0x51ad('0x4b7')]('up'));}}else!_0x3c9446[_0x51ad('0x259')]()&&this[_0x51ad('0x58f')](_0x3c9446);}this[_0x51ad('0x2b6')]();},Spriteset_Base[_0x51ad('0x9c')][_0x51ad('0x2b6')]=function(){for(;;){const _0x2b5289=$gameTemp[_0x51ad('0x481')]();if(_0x2b5289){if(_0x51ad('0x4f3')===_0x51ad('0x43d')){function _0x5d75b8(){var _0x23be82=_0x202a5a-2.25/2.75;return 7.5625*_0x23be82*_0x23be82+0.9375;}}else this[_0x51ad('0x1b6')](_0x2b5289);}else{if(_0x51ad('0x330')===_0x51ad('0x330'))break;else{function _0x1aa0cf(){_0x5085d2[_0x51ad('0x344')]['Settings'][_0x51ad('0x2f8')][_0x51ad('0x35b')]&&_0x1d4d5e[_0x51ad('0xba')](!![]),_0x50ec29['CoreEngine'][_0x51ad('0x31f')]['QoL'][_0x51ad('0x582')]&&(_0x291795[_0x51ad('0x1f0')][0x23]=_0x51ad('0x4ea'),_0x5eabf9['keyMapper'][0x24]=_0x51ad('0x318'));}}}}},Spriteset_Base[_0x51ad('0x9c')][_0x51ad('0x1b6')]=function(_0x46987a){const _0x181b04=$dataAnimations[_0x46987a[_0x51ad('0x398')]],_0x186bba=_0x46987a[_0x51ad('0x18a')],_0x3a534b=_0x46987a[_0x51ad('0x59b')],_0x48c83e=_0x46987a[_0x51ad('0x526')];let _0xb4afc7=this[_0x51ad('0x56a')]();const _0x3904f5=this['animationNextDelay']();if(this[_0x51ad('0x4ee')](_0x181b04)){if(_0x51ad('0x542')===_0x51ad('0x76')){function _0x5b693d(){_0x3104bc[_0x51ad('0x5a0')]();}}else for(const _0x468a49 of _0x186bba){this[_0x51ad('0x26b')]([_0x468a49],_0x181b04,_0x3a534b,_0xb4afc7,_0x48c83e),_0xb4afc7+=_0x3904f5;}}else{if(_0x51ad('0x441')==='HAvRH')this[_0x51ad('0x26b')](_0x186bba,_0x181b04,_0x3a534b,_0xb4afc7);else{function _0x15f685(){_0x529b58=_0xa125ae['makeDeepCopy'](_0x1ee9a4),_0xa8c191['se']['volume']=0x0;}}}},Spriteset_Base[_0x51ad('0x9c')][_0x51ad('0x26b')]=function(_0xc20cb8,_0x1c2cfb,_0x593ca1,_0x28182f,_0x45d5b4){const _0x20d388=this['isMVAnimation'](_0x1c2cfb),_0x2ac2b9=new(_0x20d388?Sprite_AnimationMV:Sprite_Animation)(),_0x1f5556=this[_0x51ad('0x1d7')](_0xc20cb8);this[_0x51ad('0x1df')](_0xc20cb8[0x0])&&(_0x593ca1=!_0x593ca1),_0x2ac2b9[_0x51ad('0x170')]=_0xc20cb8,_0x2ac2b9[_0x51ad('0x5b4')](_0x1f5556,_0x1c2cfb,_0x593ca1,_0x28182f),_0x2ac2b9[_0x51ad('0x558')](_0x45d5b4),this[_0x51ad('0x36b')][_0x51ad('0x1c6')](_0x2ac2b9),this[_0x51ad('0x4fa')]['push'](_0x2ac2b9);},Spriteset_Base['prototype'][_0x51ad('0x58f')]=function(_0x5aead5){this[_0x51ad('0x4fa')][_0x51ad('0x401')](_0x5aead5),this[_0x51ad('0x36b')][_0x51ad('0x249')](_0x5aead5);for(const _0x478b67 of _0x5aead5[_0x51ad('0x170')]){_0x478b67[_0x51ad('0x4c0')]&&_0x478b67[_0x51ad('0x4c0')]();}_0x5aead5['destroy']();},Spriteset_Base[_0x51ad('0x9c')][_0x51ad('0x1c3')]=function(){for(const _0x4e3d64 of this[_0x51ad('0x4fa')]){if(_0x51ad('0x490')!==_0x51ad('0x1d1'))this[_0x51ad('0x58f')](_0x4e3d64);else{function _0x18feee(){this[_0x51ad('0x2f6')][_0x51ad('0x23d')]-=0x6;}}}},Spriteset_Base[_0x51ad('0x9c')]['isFauxAnimationPlaying']=function(){return this[_0x51ad('0x4fa')][_0x51ad('0x88')]>0x0;},VisuMZ['CoreEngine']['Spriteset_Battle_createEnemies']=Spriteset_Battle[_0x51ad('0x9c')][_0x51ad('0x555')],Spriteset_Battle[_0x51ad('0x9c')][_0x51ad('0x555')]=function(){VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')]['UI'][_0x51ad('0x45b')]&&this[_0x51ad('0x2ab')](),VisuMZ[_0x51ad('0x344')][_0x51ad('0x4ed')][_0x51ad('0x52')](this);},Spriteset_Battle['prototype'][_0x51ad('0x2ab')]=function(){for(member of $gameTroop[_0x51ad('0x339')]()){member[_0x51ad('0x121')]();}},VisuMZ[_0x51ad('0x344')][_0x51ad('0x528')]=Window_Base[_0x51ad('0x9c')][_0x51ad('0x386')],Window_Base[_0x51ad('0x9c')][_0x51ad('0x386')]=function(_0x5e8fa6){this[_0x51ad('0x1ec')](),VisuMZ[_0x51ad('0x344')]['Window_Base_initialize'][_0x51ad('0x52')](this,_0x5e8fa6),this[_0x51ad('0x370')]();},Window_Base[_0x51ad('0x9c')][_0x51ad('0x1ec')]=function(){this[_0x51ad('0x24f')]=VisuMZ['CoreEngine'][_0x51ad('0x31f')][_0x51ad('0x2f8')][_0x51ad('0x468')],this[_0x51ad('0x167')]=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x2f8')][_0x51ad('0x44c')];},Window_Base[_0x51ad('0x9c')]['lineHeight']=function(){return VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')]['Window'][_0x51ad('0x265')];},Window_Base['prototype'][_0x51ad('0x317')]=function(){return VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x49a')][_0x51ad('0x216')];},Window_Base[_0x51ad('0x9c')]['updateBackOpacity']=function(){this[_0x51ad('0x1e')]=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x49a')][_0x51ad('0x25')];},Window_Base['prototype'][_0x51ad('0x84')]=function(){return VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x49a')][_0x51ad('0x3f8')];},Window_Base[_0x51ad('0x9c')][_0x51ad('0x389')]=function(){return VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x49a')][_0x51ad('0x32c')];},VisuMZ[_0x51ad('0x344')][_0x51ad('0x2c1')]=Window_Base[_0x51ad('0x9c')][_0x51ad('0x14')],Window_Base[_0x51ad('0x9c')][_0x51ad('0x14')]=function(){VisuMZ['CoreEngine'][_0x51ad('0x2c1')][_0x51ad('0x52')](this),this[_0x51ad('0x21d')]();},Window_Base[_0x51ad('0x9c')][_0x51ad('0x516')]=function(){if(this['_opening']){this[_0x51ad('0x540')]+=this[_0x51ad('0x389')]();if(this[_0x51ad('0x4f6')]()){if('xvbil'===_0x51ad('0x40a'))this['_opening']=![];else{function _0x4a4b16(){_0x326d94[_0x51ad('0x344')][_0x51ad('0x1f2')]['call'](this,_0x60193e);}}}}},Window_Base['prototype'][_0x51ad('0x4c7')]=function(){if(this[_0x51ad('0x67')]){this[_0x51ad('0x540')]-=this['openingSpeed']();if(this[_0x51ad('0x230')]()){if(_0x51ad('0xe8')===_0x51ad('0x385')){function _0x50b1d0(){this[_0x51ad('0x3cf')][_0x51ad('0xa3')](_0x174762[_0x51ad('0x3b5')][_0x51ad('0x49e')]);}}else this[_0x51ad('0x67')]=![];}}},VisuMZ[_0x51ad('0x344')][_0x51ad('0x270')]=Window_Base[_0x51ad('0x9c')][_0x51ad('0x3f9')],Window_Base['prototype'][_0x51ad('0x3f9')]=function(_0x1ae33e,_0x50c7fe,_0x3e3a94,_0x5ebedd,_0xeb894b){if(this['useDigitGrouping']())_0x1ae33e=VisuMZ[_0x51ad('0x56f')](_0x1ae33e);VisuMZ[_0x51ad('0x344')][_0x51ad('0x270')][_0x51ad('0x52')](this,_0x1ae33e,_0x50c7fe,_0x3e3a94,_0x5ebedd,_0xeb894b);},Window_Base[_0x51ad('0x9c')][_0x51ad('0xe7')]=function(){return this[_0x51ad('0x24f')];},VisuMZ[_0x51ad('0x344')][_0x51ad('0x354')]=Window_Base[_0x51ad('0x9c')][_0x51ad('0x2ea')],Window_Base[_0x51ad('0x9c')][_0x51ad('0x2ea')]=function(_0x4a564b,_0x586d09,_0x4946aa,_0x484eea){var _0x32b13d=VisuMZ[_0x51ad('0x344')][_0x51ad('0x354')][_0x51ad('0x52')](this,_0x4a564b,_0x586d09,_0x4946aa,_0x484eea);if(this[_0x51ad('0x41c')]())_0x32b13d[_0x51ad('0x53b')]=VisuMZ[_0x51ad('0x56f')](_0x32b13d[_0x51ad('0x53b')]);return _0x32b13d;},Window_Base['prototype'][_0x51ad('0x41c')]=function(){return this['_digitGroupingEx'];},Window_Base[_0x51ad('0x9c')][_0x51ad('0x2f2')]=function(_0x3f924c){this[_0x51ad('0x24f')]=_0x3f924c;},Window_Base[_0x51ad('0x9c')][_0x51ad('0x151')]=function(_0x46878d){this[_0x51ad('0x167')]=_0x46878d;},Window_Base[_0x51ad('0x9c')][_0x51ad('0x370')]=function(){this[_0x51ad('0x531')]={'duration':0x0,'wholeDuration':0x0,'type':_0x51ad('0x4d1'),'targetX':this['x'],'targetY':this['y'],'targetScaleX':this[_0x51ad('0x3b0')]['x'],'targetScaleY':this[_0x51ad('0x3b0')]['y'],'targetOpacity':this[_0x51ad('0x2f4')],'targetBackOpacity':this[_0x51ad('0x1e')],'targetContentsOpacity':this[_0x51ad('0x154')]};},Window_Base[_0x51ad('0x9c')]['updateCoreEasing']=function(){if(!this[_0x51ad('0x531')])return;if(this['_coreEasing']['duration']<=0x0)return;this['x']=this[_0x51ad('0x4e5')](this['x'],this[_0x51ad('0x531')][_0x51ad('0x194')]),this['y']=this[_0x51ad('0x4e5')](this['y'],this[_0x51ad('0x531')][_0x51ad('0x38a')]),this[_0x51ad('0x3b0')]['x']=this[_0x51ad('0x4e5')](this[_0x51ad('0x3b0')]['x'],this['_coreEasing'][_0x51ad('0x173')]),this[_0x51ad('0x3b0')]['y']=this[_0x51ad('0x4e5')](this[_0x51ad('0x3b0')]['y'],this[_0x51ad('0x531')][_0x51ad('0x14e')]),this['opacity']=this[_0x51ad('0x4e5')](this['opacity'],this[_0x51ad('0x531')][_0x51ad('0x2af')]),this[_0x51ad('0x1e')]=this[_0x51ad('0x4e5')](this[_0x51ad('0x1e')],this[_0x51ad('0x531')][_0x51ad('0x322')]),this['contentsOpacity']=this['applyCoreEasing'](this[_0x51ad('0x154')],this[_0x51ad('0x531')][_0x51ad('0x307')]),this[_0x51ad('0x531')]['duration']--;},Window_Base[_0x51ad('0x9c')]['applyCoreEasing']=function(_0x38b3d3,_0x23036a){if(!this[_0x51ad('0x531')])return _0x23036a;const _0x17f088=this['_coreEasing'][_0x51ad('0x4e0')],_0x14a841=this[_0x51ad('0x531')][_0x51ad('0x6f')],_0x54c77a=this['calcCoreEasing']((_0x14a841-_0x17f088)/_0x14a841),_0x52a7d7=this[_0x51ad('0x137')]((_0x14a841-_0x17f088+0x1)/_0x14a841),_0x1e520a=(_0x38b3d3-_0x23036a*_0x54c77a)/(0x1-_0x54c77a);return _0x1e520a+(_0x23036a-_0x1e520a)*_0x52a7d7;},Window_Base[_0x51ad('0x9c')][_0x51ad('0x137')]=function(_0x4efc7e){if(!this[_0x51ad('0x531')])return _0x4efc7e;return VisuMZ[_0x51ad('0x57f')](_0x4efc7e,this[_0x51ad('0x531')][_0x51ad('0xdf')]||_0x51ad('0x4d1'));},Window_Base['prototype'][_0x51ad('0x78')]=function(_0xaa7b54,_0x448f4a){if(!this[_0x51ad('0x531')])return;this['x']=this[_0x51ad('0x531')]['targetX'],this['y']=this['_coreEasing'][_0x51ad('0x38a')],this[_0x51ad('0x3b0')]['x']=this['_coreEasing'][_0x51ad('0x173')],this[_0x51ad('0x3b0')]['y']=this[_0x51ad('0x531')]['targetScaleY'],this[_0x51ad('0x2f4')]=this['_coreEasing'][_0x51ad('0x2af')],this[_0x51ad('0x1e')]=this[_0x51ad('0x531')][_0x51ad('0x322')],this[_0x51ad('0x154')]=this[_0x51ad('0x531')][_0x51ad('0x307')],this[_0x51ad('0x1e2')](_0xaa7b54,_0x448f4a,this['x'],this['y'],this['scale']['x'],this[_0x51ad('0x3b0')]['y'],this[_0x51ad('0x2f4')],this[_0x51ad('0x1e')],this[_0x51ad('0x154')]);},Window_Base[_0x51ad('0x9c')][_0x51ad('0x1e2')]=function(_0x572204,_0x42c351,_0x1e9f2f,_0x2f430f,_0x38aea1,_0x21a319,_0x3eb9ed,_0x2d1a9e,_0xf76c6f){this[_0x51ad('0x531')]={'duration':_0x572204,'wholeDuration':_0x572204,'type':_0x42c351,'targetX':_0x1e9f2f,'targetY':_0x2f430f,'targetScaleX':_0x38aea1,'targetScaleY':_0x21a319,'targetOpacity':_0x3eb9ed,'targetBackOpacity':_0x2d1a9e,'targetContentsOpacity':_0xf76c6f};},Window_Base['prototype'][_0x51ad('0x49')]=function(_0xb1374b,_0x5e8661,_0x50650a,_0x114ccf,_0x266945){this['resetFontSettings'](),this['contents'][_0x51ad('0x23d')]=VisuMZ['CoreEngine'][_0x51ad('0x31f')]['Gold']['GoldFontSize'];const _0x2ebe7a=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')]['Gold']['GoldIcon'];if(_0x2ebe7a>0x0&&_0x5e8661===TextManager['currencyUnit']){const _0x229adf=_0x114ccf+(this[_0x51ad('0x14b')]()-ImageManager[_0x51ad('0x310')])/0x2;this[_0x51ad('0x380')](_0x2ebe7a,_0x50650a+(_0x266945-ImageManager['iconWidth']),_0x229adf),_0x266945-=ImageManager[_0x51ad('0x24d')]+0x4;}else this[_0x51ad('0x53')](ColorManager[_0x51ad('0x1a6')]()),this[_0x51ad('0x3f9')](_0x5e8661,_0x50650a,_0x114ccf,_0x266945,'right'),_0x266945-=this[_0x51ad('0x138')](_0x5e8661)+0x6;this[_0x51ad('0x55a')]();const _0x2fbbb8=this[_0x51ad('0x138')](this[_0x51ad('0x24f')]?VisuMZ['GroupDigits'](_0xb1374b):_0xb1374b);if(_0x2fbbb8>_0x266945){if(_0x51ad('0x260')!==_0x51ad('0x169'))this[_0x51ad('0x3f9')](VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x35a')][_0x51ad('0x83')],_0x50650a,_0x114ccf,_0x266945,_0x51ad('0x50e'));else{function _0x3d954d(){return _0x345701[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x35a')]['GoldMax'];}}}else this[_0x51ad('0x3f9')](_0xb1374b,_0x50650a,_0x114ccf,_0x266945,_0x51ad('0x50e'));this['resetFontSettings']();},Window_Base['prototype'][_0x51ad('0x6')]=function(_0x2b8490,_0x4bce7a,_0x470fb1,_0x2169d6,_0x426596){const _0x17ca8a=ImageManager[_0x51ad('0x535')](_0x51ad('0x3ff')),_0x48849b=ImageManager[_0x51ad('0x24d')],_0x17a92c=ImageManager[_0x51ad('0x310')],_0x3c2fb2=_0x2b8490%0x10*_0x48849b,_0x4203bc=Math[_0x51ad('0x529')](_0x2b8490/0x10)*_0x17a92c,_0x7f3a75=_0x2169d6,_0x2d5143=_0x2169d6;this[_0x51ad('0x2f6')][_0x51ad('0x25a')][_0x51ad('0x31c')]=_0x426596,this['contents']['blt'](_0x17ca8a,_0x3c2fb2,_0x4203bc,_0x48849b,_0x17a92c,_0x4bce7a,_0x470fb1,_0x7f3a75,_0x2d5143),this[_0x51ad('0x2f6')][_0x51ad('0x25a')][_0x51ad('0x31c')]=!![];},Window_Base[_0x51ad('0x9c')][_0x51ad('0x285')]=function(_0x18f39e,_0xd56233,_0x284b28,_0x2c557d,_0x5effb1,_0x1b524f){const _0x5d22d0=Math[_0x51ad('0x529')]((_0x284b28-0x2)*_0x2c557d),_0x1f8bfe=Sprite_Gauge['prototype'][_0x51ad('0x2e4')][_0x51ad('0x52')](this),_0x4effbb=_0xd56233+this[_0x51ad('0x14b')]()-_0x1f8bfe-0x2;this[_0x51ad('0x2f6')][_0x51ad('0x583')](_0x18f39e,_0x4effbb,_0x284b28,_0x1f8bfe,ColorManager[_0x51ad('0x2')]()),this[_0x51ad('0x2f6')][_0x51ad('0x157')](_0x18f39e+0x1,_0x4effbb+0x1,_0x5d22d0,_0x1f8bfe-0x2,_0x5effb1,_0x1b524f);},Window_Selectable['prototype'][_0x51ad('0x1a5')]=function(_0x3ac519){let _0x19ffb5=this[_0x51ad('0x3ae')]();const _0x4d73c2=this[_0x51ad('0x4d4')](),_0x340dbc=this['maxCols']();if(this[_0x51ad('0x3e1')]()&&(_0x19ffb5<_0x4d73c2||_0x3ac519&&_0x340dbc===0x1)){if('ZiqMs'!==_0x51ad('0x98')){function _0x3e1398(){if(this[_0x51ad('0x109')]===_0x14b2df)this[_0x51ad('0x4ca')]();if(this['_CoreEngineSettings']['TimeProgress']===_0x5d9acb)this['initCoreEngine']();this['_CoreEngineSettings'][_0x51ad('0x524')]=_0x3e79e8;}}else{_0x19ffb5+=_0x340dbc;if(_0x19ffb5>=_0x4d73c2)_0x19ffb5=_0x4d73c2-0x1;this[_0x51ad('0x1aa')](_0x19ffb5);}}},Window_Selectable[_0x51ad('0x9c')][_0x51ad('0x3e1')]=function(){return VisuMZ['CoreEngine']['Settings'][_0x51ad('0x2f8')][_0x51ad('0x582')];},VisuMZ[_0x51ad('0x344')][_0x51ad('0x4f0')]=Window_Selectable[_0x51ad('0x9c')][_0x51ad('0x300')],Window_Selectable[_0x51ad('0x9c')][_0x51ad('0x300')]=function(){if(this[_0x51ad('0x3e1')]()){if(_0x51ad('0x3f')===_0x51ad('0x432')){function _0x4340c1(){this[_0x51ad('0x4f7')]=_0x2a3329;}}else this['processCursorMoveModernControls'](),this[_0x51ad('0x55d')]();}else VisuMZ[_0x51ad('0x344')][_0x51ad('0x4f0')]['call'](this);},Window_Selectable[_0x51ad('0x9c')][_0x51ad('0x315')]=function(){if(this[_0x51ad('0xfa')]()){const _0x2cb264=this['index']();if(Input[_0x51ad('0x39c')](_0x51ad('0x454'))){if(_0x51ad('0x20b')==='CBruW'){function _0x80bd8d(){this[_0x51ad('0xb3')]()?_0x55ec57[_0x51ad('0x344')][_0x51ad('0x2e7')][_0x51ad('0x52')](this,_0x30eae0):this[_0x51ad('0x36e')](_0x5aac4d);}}else Input[_0x51ad('0x22e')](_0x51ad('0x10a'))?this[_0x51ad('0x438')]():this[_0x51ad('0x1a5')](Input[_0x51ad('0x4b7')](_0x51ad('0x454')));}if(Input['isRepeated']('up')){if(Input[_0x51ad('0x22e')](_0x51ad('0x10a'))){if(_0x51ad('0x567')===_0x51ad('0x567'))this[_0x51ad('0x4af')]();else{function _0x34ad62(){_0x1cd62e[_0x51ad('0x10e')](),_0x1c025f['goto'](_0x5cd600);}}}else this['cursorUp'](Input[_0x51ad('0x4b7')]('up'));}Input[_0x51ad('0x39c')]('right')&&this['cursorRight'](Input[_0x51ad('0x4b7')](_0x51ad('0x50e')));if(Input['isRepeated'](_0x51ad('0x3e3'))){if(_0x51ad('0x4a3')!=='zXJOC'){function _0x5427fa(){this[_0x51ad('0x54d')]()?this['makeDocumentTitle']():_0x502031['CoreEngine'][_0x51ad('0x1c8')]['call'](this);}}else this[_0x51ad('0x586')](Input[_0x51ad('0x4b7')]('left'));}!this[_0x51ad('0x2aa')]('pagedown')&&Input['isRepeated'](_0x51ad('0x597'))&&this['cursorPagedown']();if(!this[_0x51ad('0x2aa')](_0x51ad('0x1a1'))&&Input['isRepeated'](_0x51ad('0x1a1'))){if(_0x51ad('0x1db')===_0x51ad('0x1db'))this[_0x51ad('0x4af')]();else{function _0x513e25(){_0x8d2ad1(_0x51ad('0x4e6')[_0x51ad('0x348')](_0x50f4fe,_0x2fc4ec)),_0x544bb7[_0x51ad('0x58a')]();}}}this['index']()!==_0x2cb264&&this['playCursorSound']();}},VisuMZ[_0x51ad('0x344')][_0x51ad('0x1f2')]=Window_Selectable[_0x51ad('0x9c')][_0x51ad('0x1a5')],Window_Selectable[_0x51ad('0x9c')][_0x51ad('0x1a5')]=function(_0x1c8240){if(this[_0x51ad('0x3e1')]()&&_0x1c8240&&this[_0x51ad('0x3f7')]()===0x1&&this[_0x51ad('0x3ae')]()===this[_0x51ad('0x4d4')]()-0x1){if(_0x51ad('0xd9')!==_0x51ad('0xd9')){function _0x1290b7(){return _0x1673cd[_0x51ad('0x344')][_0x51ad('0x31f')]['Color'][_0x51ad('0x28f')];}}else this[_0x51ad('0x1aa')](0x0);}else{if('vbJCf'!=='YrNYG')VisuMZ[_0x51ad('0x344')][_0x51ad('0x1f2')]['call'](this,_0x1c8240);else{function _0x1c64d4(){return _0x1ceafc['CoreEngine'][_0x51ad('0x30')][_0x51ad('0x52')](this);}}}},Window_Selectable[_0x51ad('0x9c')][_0x51ad('0x55d')]=function(){if(this[_0x51ad('0xfa')]()){if(_0x51ad('0x506')!==_0x51ad('0x4ec')){const _0x3f38a6=this[_0x51ad('0x3ae')]();Input[_0x51ad('0x4b7')](_0x51ad('0x318'))&&this[_0x51ad('0x1aa')](Math[_0x51ad('0x471')](this[_0x51ad('0x3ae')](),0x0)),Input[_0x51ad('0x4b7')](_0x51ad('0x4ea'))&&this['smoothSelect'](Math[_0x51ad('0x2df')](this[_0x51ad('0x3ae')](),this[_0x51ad('0x4d4')]()-0x1)),this[_0x51ad('0x3ae')]()!==_0x3f38a6&&this['playCursorSound']();}else{function _0x3087d7(){_0x7a6e2[_0x51ad('0x5a0')]&&_0x515e58['startAnimation']();}}}},VisuMZ[_0x51ad('0x344')][_0x51ad('0x40b')]=Window_Selectable[_0x51ad('0x9c')][_0x51ad('0x175')],Window_Selectable[_0x51ad('0x9c')][_0x51ad('0x175')]=function(){if(this[_0x51ad('0x3e1')]())this[_0x51ad('0x1cc')]();else{if('bKMTg'==='bKMTg')VisuMZ[_0x51ad('0x344')]['Window_Selectable_processTouch'][_0x51ad('0x52')](this);else{function _0x3f2f09(){this['makeCoreEngineCommandList']();}}}},Window_Selectable['prototype'][_0x51ad('0x1cc')]=function(){VisuMZ[_0x51ad('0x344')][_0x51ad('0x40b')][_0x51ad('0x52')](this);},Window_Selectable[_0x51ad('0x9c')][_0x51ad('0x38e')]=function(){return VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x49a')][_0x51ad('0x4d8')];},Window_Selectable[_0x51ad('0x9c')][_0x51ad('0x429')]=function(){return VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x49a')][_0x51ad('0x116')];},Window_Selectable[_0x51ad('0x9c')][_0x51ad('0x11d')]=function(){return Window_Scrollable[_0x51ad('0x9c')][_0x51ad('0x11d')][_0x51ad('0x52')](this)+VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')]['Window'][_0x51ad('0x254')];;},VisuMZ[_0x51ad('0x344')][_0x51ad('0x46b')]=Window_Selectable[_0x51ad('0x9c')][_0x51ad('0x1f4')],Window_Selectable[_0x51ad('0x9c')][_0x51ad('0x1f4')]=function(_0x45ea82){const _0x24fb51=VisuMZ[_0x51ad('0x344')]['Settings'][_0x51ad('0x49a')];if(_0x24fb51[_0x51ad('0x47')]===![])return;_0x24fb51[_0x51ad('0x400')]?_0x24fb51[_0x51ad('0x400')]['call'](this,_0x45ea82):VisuMZ[_0x51ad('0x344')][_0x51ad('0x46b')][_0x51ad('0x52')](this,_0x45ea82);},VisuMZ[_0x51ad('0x344')]['Window_Gold_refresh']=Window_Gold[_0x51ad('0x9c')][_0x51ad('0x4da')],Window_Gold[_0x51ad('0x9c')][_0x51ad('0x4da')]=function(){if(this[_0x51ad('0x188')]())this[_0x51ad('0x261')]();else{if(_0x51ad('0xbd')===_0x51ad('0xbd'))VisuMZ[_0x51ad('0x344')][_0x51ad('0x551')][_0x51ad('0x52')](this);else{function _0xb04948(){this[_0x51ad('0x1aa')](_0x27f538[_0x51ad('0x2df')](this['index'](),this[_0x51ad('0x4d4')]()-0x1));}}}},Window_Gold[_0x51ad('0x9c')][_0x51ad('0x188')]=function(){if(TextManager[_0x51ad('0x16a')]!==this[_0x51ad('0x16a')]())return![];return VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')]['Gold']['ItemStyle'];},Window_Gold[_0x51ad('0x9c')]['drawGoldItemStyle']=function(){this['resetFontSettings'](),this[_0x51ad('0x2f6')][_0x51ad('0x127')](),this[_0x51ad('0x2f6')][_0x51ad('0x23d')]=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x35a')]['GoldFontSize'];const _0x564123=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x35a')][_0x51ad('0x34')],_0x338b47=this[_0x51ad('0x4bb')](0x0);if(_0x564123>0x0){if(_0x51ad('0x117')!==_0x51ad('0x117')){function _0x1876e2(){return this[_0x51ad('0x2d2')]();}}else{const _0x130bf2=_0x338b47['y']+(this['lineHeight']()-ImageManager[_0x51ad('0x310')])/0x2;this[_0x51ad('0x380')](_0x564123,_0x338b47['x'],_0x130bf2);const _0x1497c5=ImageManager['iconWidth']+0x4;_0x338b47['x']+=_0x1497c5,_0x338b47['width']-=_0x1497c5;}}this['changeTextColor'](ColorManager[_0x51ad('0x1a6')]()),this[_0x51ad('0x3f9')](this[_0x51ad('0x16a')](),_0x338b47['x'],_0x338b47['y'],_0x338b47[_0x51ad('0x44f')],_0x51ad('0x3e3'));const _0x1ca43f=this[_0x51ad('0x138')](this[_0x51ad('0x16a')]())+0x6;;_0x338b47['x']+=_0x1ca43f,_0x338b47['width']-=_0x1ca43f,this[_0x51ad('0x55a')]();const _0x13d5ef=this[_0x51ad('0x174')](),_0x39ee0f=this['textWidth'](this[_0x51ad('0x24f')]?VisuMZ[_0x51ad('0x56f')](this[_0x51ad('0x174')]()):this[_0x51ad('0x174')]());if(_0x39ee0f>_0x338b47[_0x51ad('0x44f')])this[_0x51ad('0x3f9')](VisuMZ['CoreEngine'][_0x51ad('0x31f')][_0x51ad('0x35a')][_0x51ad('0x83')],_0x338b47['x'],_0x338b47['y'],_0x338b47[_0x51ad('0x44f')],_0x51ad('0x50e'));else{if(_0x51ad('0x592')!==_0x51ad('0x592')){function _0xe3517b(){const _0xc7f454=this['itemPadding'](),_0xb8db8d=this['paramY'](_0x2245b2);this[_0x51ad('0x571')](_0xc7f454,_0xb8db8d,_0x17911a),_0x136584++;}}else this[_0x51ad('0x3f9')](this[_0x51ad('0x174')](),_0x338b47['x'],_0x338b47['y'],_0x338b47['width'],'right');}this['resetFontSettings']();},Window_StatusBase[_0x51ad('0x9c')][_0x51ad('0x1fb')]=function(_0x3ca9ee,_0x12bd8a,_0x3281f6,_0x33618a,_0x43d0f2){_0x33618a=String(_0x33618a||'')[_0x51ad('0x1fd')]();if(VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x4c9')][_0x51ad('0x513')]){if('prESm'!=='tsUXA'){const _0x479fa7=VisuMZ[_0x51ad('0x595')](_0x33618a);if(_0x43d0f2)this[_0x51ad('0x6')](_0x479fa7,_0x3ca9ee,_0x12bd8a,this[_0x51ad('0x412')]()),_0x3281f6-=this[_0x51ad('0x412')]()+0x2,_0x3ca9ee+=this['gaugeLineHeight']()+0x2;else{if(_0x51ad('0xa1')===_0x51ad('0xa1'))this[_0x51ad('0x380')](_0x479fa7,_0x3ca9ee+0x2,_0x12bd8a+0x2),_0x3281f6-=ImageManager[_0x51ad('0x24d')]+0x4,_0x3ca9ee+=ImageManager[_0x51ad('0x24d')]+0x4;else{function _0x57e4ef(){let _0x2a7d07=this[_0x51ad('0x3ae')]();const _0x4ab32f=this[_0x51ad('0x4d4')](),_0x53f252=this['maxCols']();if(this['isUseModernControls']()&&(_0x2a7d07<_0x4ab32f||_0x156d51&&_0x53f252===0x1)){_0x2a7d07+=_0x53f252;if(_0x2a7d07>=_0x4ab32f)_0x2a7d07=_0x4ab32f-0x1;this[_0x51ad('0x1aa')](_0x2a7d07);}}}}}else{function _0x35c783(){return _0x15bf0b[_0x51ad('0x47e')];}}}const _0x4c41f6=TextManager['param'](_0x33618a);this['resetFontSettings'](),this[_0x51ad('0x53')](ColorManager['systemColor']());if(_0x43d0f2){if(_0x51ad('0x427')!==_0x51ad('0x427')){function _0x2fdd48(){var _0x271541=_0x46dd13(_0x29094f['$1']);_0x6a1bb3+=_0x271541;}}else this[_0x51ad('0x2f6')][_0x51ad('0x23d')]=this[_0x51ad('0x150')](),this['contents'][_0x51ad('0x3f9')](_0x4c41f6,_0x3ca9ee,_0x12bd8a,_0x3281f6,this[_0x51ad('0x412')](),_0x51ad('0x3e3'));}else this[_0x51ad('0x3f9')](_0x4c41f6,_0x3ca9ee,_0x12bd8a,_0x3281f6);this[_0x51ad('0x2e8')]();},Window_StatusBase[_0x51ad('0x9c')][_0x51ad('0x150')]=function(){return $gameSystem['mainFontSize']()-0x8;},Window_StatusBase[_0x51ad('0x9c')][_0x51ad('0x3c5')]=function(_0x375b87,_0x5e674f,_0x3bd778,_0x276941){_0x276941=_0x276941||0xa8,this['resetTextColor']();if(VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')]['UI'][_0x51ad('0x5a5')]){if(_0x51ad('0x27d')===_0x51ad('0x593')){function _0x428f18(){return _0x5031a4[_0x51ad('0x344')][_0x51ad('0x1fe')][_0x51ad('0x52')](this);}}else this[_0x51ad('0x2d8')](_0x375b87[_0x51ad('0x35e')]()[_0x51ad('0x50f')],_0x5e674f,_0x3bd778,_0x276941);}else{const _0x1ee893=_0x375b87[_0x51ad('0x35e')]()['name']['replace'](/\\I\[(\d+)\]/gi,'');this[_0x51ad('0x3f9')](_0x1ee893,_0x5e674f,_0x3bd778,_0x276941);}},Window_StatusBase[_0x51ad('0x9c')][_0x51ad('0x463')]=function(_0x2fcb7e,_0x53d9ed,_0xbf8a1c,_0x208562){_0x208562=_0x208562||0x10e,this[_0x51ad('0x55a')]();if(VisuMZ[_0x51ad('0x344')]['Settings']['UI']['TextCodeNicknames'])this[_0x51ad('0x2d8')](_0x2fcb7e[_0x51ad('0x63')](),_0x53d9ed,_0xbf8a1c,_0x208562);else{const _0x2a8a15=_0x2fcb7e['nickname']()[_0x51ad('0xe')](/\\I\[(\d+)\]/gi,'');this[_0x51ad('0x3f9')](_0x2fcb7e[_0x51ad('0x63')](),_0x53d9ed,_0xbf8a1c,_0x208562);}},VisuMZ[_0x51ad('0x344')][_0x51ad('0x3ad')]=Window_StatusBase['prototype']['drawActorLevel'],Window_StatusBase[_0x51ad('0x9c')][_0x51ad('0x1cb')]=function(_0x2106fb,_0x331d7a,_0x520ef7){if(this[_0x51ad('0x40f')]())this[_0x51ad('0x334')](_0x2106fb,_0x331d7a,_0x520ef7);VisuMZ[_0x51ad('0x344')]['Window_StatusBase_drawActorLevel'][_0x51ad('0x52')](this,_0x2106fb,_0x331d7a,_0x520ef7);},Window_StatusBase[_0x51ad('0x9c')][_0x51ad('0x40f')]=function(){return VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')]['UI'][_0x51ad('0x46f')];},Window_StatusBase['prototype'][_0x51ad('0x334')]=function(_0x439048,_0xfd43c7,_0x429121){if(!_0x439048)return;if(!_0x439048[_0x51ad('0xac')]())return;const _0x216dbf=0x80,_0x98c04=_0x439048[_0x51ad('0x341')]();let _0x34a041=ColorManager['expGaugeColor1'](),_0x35c9c6=ColorManager[_0x51ad('0x5ae')]();_0x98c04>=0x1&&(_0x34a041=ColorManager[_0x51ad('0x97')](),_0x35c9c6=ColorManager[_0x51ad('0x1fa')]()),this[_0x51ad('0x285')](_0xfd43c7,_0x429121,_0x216dbf,_0x98c04,_0x34a041,_0x35c9c6);},Window_EquipStatus[_0x51ad('0x9c')][_0x51ad('0x1ee')]=function(){let _0x438120=0x0;for(const _0x2653a4 of VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x4c9')][_0x51ad('0x30f')]){if(_0x51ad('0x408')===_0x51ad('0x408')){const _0x156b92=this[_0x51ad('0x317')](),_0xaf313d=this['paramY'](_0x438120);this[_0x51ad('0x571')](_0x156b92,_0xaf313d,_0x2653a4),_0x438120++;}else{function _0x5a14ee(){this['_helpWindow'][_0x51ad('0xa3')](_0x459479[_0x51ad('0x3b5')][_0x51ad('0x11b')]);}}}},Window_EquipStatus[_0x51ad('0x9c')][_0x51ad('0x3c7')]=function(_0x1957d9,_0x17d48c,_0x47fdd8){const _0x589664=this['paramX']()-this[_0x51ad('0x317')]()*0x2;this[_0x51ad('0x1fb')](_0x1957d9,_0x17d48c,_0x589664,_0x47fdd8,![]);},Window_EquipStatus['prototype'][_0x51ad('0x572')]=function(_0x2bfb69,_0x3e9925,_0x193246){const _0x59f490=this[_0x51ad('0x3fc')]();this[_0x51ad('0x55a')](),this['drawText'](this[_0x51ad('0x257')][_0x51ad('0x40')](_0x193246,!![]),_0x2bfb69,_0x3e9925,_0x59f490,_0x51ad('0x50e'));},Window_EquipStatus['prototype'][_0x51ad('0x209')]=function(_0x423ce4,_0x4cb9dc){const _0x5dce0c=this[_0x51ad('0x2ee')]();this['changeTextColor'](ColorManager[_0x51ad('0x1a6')]());const _0x4c3153=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')]['UI'][_0x51ad('0x499')];this[_0x51ad('0x3f9')](_0x4c3153,_0x423ce4,_0x4cb9dc,_0x5dce0c,_0x51ad('0x399'));},Window_EquipStatus[_0x51ad('0x9c')][_0x51ad('0x375')]=function(_0x45dbd7,_0x5ed578,_0x4d038e){const _0x56530e=this[_0x51ad('0x3fc')](),_0x56fc0a=this[_0x51ad('0x347')][_0x51ad('0x40')](_0x4d038e),_0x1b961b=_0x56fc0a-this[_0x51ad('0x257')][_0x51ad('0x40')](_0x4d038e);this[_0x51ad('0x53')](ColorManager[_0x51ad('0x2f1')](_0x1b961b)),this[_0x51ad('0x3f9')](VisuMZ[_0x51ad('0x2c')](_0x56fc0a,0x0),_0x45dbd7,_0x5ed578,_0x56530e,_0x51ad('0x50e'));},Window_StatusParams[_0x51ad('0x9c')]['maxItems']=function(){return VisuMZ[_0x51ad('0x344')]['Settings'][_0x51ad('0x4c9')][_0x51ad('0x30f')][_0x51ad('0x88')];},Window_StatusParams[_0x51ad('0x9c')][_0x51ad('0x571')]=function(_0x4e490d){const _0x2e1b5c=this[_0x51ad('0x4bb')](_0x4e490d),_0x2ad914=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x4c9')]['DisplayedParams'][_0x4e490d],_0x56e168=TextManager[_0x51ad('0x12d')](_0x2ad914),_0x25461e=this[_0x51ad('0x257')][_0x51ad('0x40')](_0x2ad914,!![]);this[_0x51ad('0x1fb')](_0x2e1b5c['x'],_0x2e1b5c['y'],0xa0,_0x2ad914,![]),this[_0x51ad('0x55a')](),this[_0x51ad('0x3f9')](_0x25461e,_0x2e1b5c['x']+0xa0,_0x2e1b5c['y'],0x3c,_0x51ad('0x50e'));},VisuMZ[_0x51ad('0x344')][_0x51ad('0x57a')]=Window_ShopSell[_0x51ad('0x9c')]['isEnabled'],Window_ShopSell[_0x51ad('0x9c')]['isEnabled']=function(_0x39d750){return VisuMZ[_0x51ad('0x344')]['Settings'][_0x51ad('0x2f8')][_0x51ad('0x496')]&&DataManager[_0x51ad('0x51')](_0x39d750)?![]:VisuMZ[_0x51ad('0x344')]['Window_ShopSell_isEnabled'][_0x51ad('0x52')](this,_0x39d750);},Window_NumberInput[_0x51ad('0x9c')][_0x51ad('0x3e1')]=function(){return![];},Window_TitleCommand[_0x51ad('0x308')]=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x4b3')][_0x51ad('0x2c9')][_0x51ad('0x5b0')],Window_TitleCommand[_0x51ad('0x9c')][_0x51ad('0x3b8')]=function(){this[_0x51ad('0x24b')]();},Window_TitleCommand[_0x51ad('0x9c')][_0x51ad('0x24b')]=function(){for(const _0x40e10d of Window_TitleCommand['_commandList']){if(_0x40e10d['ShowJS'][_0x51ad('0x52')](this)){if(_0x51ad('0x3d2')==='oXFXt'){function _0x1e0321(){const _0x52a692=_0x514df0[0x2],_0xf031fc=_0x1041de[_0x51ad('0x344')][_0x51ad('0x269')][_0x51ad('0x52')](this,_0x55a7c0),_0x32abf4=_0x2c2f84[_0x51ad('0x166')](_0x207587[0x0]);if(_0x32abf4)_0x32abf4[_0x51ad('0x171')]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x52a692]);return _0xf031fc;}}else{const _0x1433d8=_0x40e10d[_0x51ad('0x15b')];let _0x2985a5=_0x40e10d[_0x51ad('0x476')];if(['',_0x51ad('0x123')][_0x51ad('0xbc')](_0x2985a5))_0x2985a5=_0x40e10d[_0x51ad('0xeb')][_0x51ad('0x52')](this);const _0x118c77=_0x40e10d[_0x51ad('0x384')][_0x51ad('0x52')](this),_0x3c3731=_0x40e10d[_0x51ad('0x284')][_0x51ad('0x52')](this);this[_0x51ad('0x48d')](_0x2985a5,_0x1433d8,_0x118c77,_0x3c3731),this[_0x51ad('0x42c')](_0x1433d8,_0x40e10d[_0x51ad('0x36c')][_0x51ad('0x3a9')](this,_0x3c3731));}}}},Window_GameEnd[_0x51ad('0x308')]=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x4b3')][_0x51ad('0x287')][_0x51ad('0x5b0')],Window_GameEnd[_0x51ad('0x9c')][_0x51ad('0x3b8')]=function(){this[_0x51ad('0x24b')]();},Window_GameEnd[_0x51ad('0x9c')]['makeCoreEngineCommandList']=function(){for(const _0x45f861 of Window_GameEnd[_0x51ad('0x308')]){if(_0x51ad('0x1f8')!==_0x51ad('0x1f8')){function _0x5a8f48(){return 0x1;}}else{if(_0x45f861[_0x51ad('0x13b')][_0x51ad('0x52')](this)){const _0x267646=_0x45f861[_0x51ad('0x15b')];let _0x49f0f3=_0x45f861[_0x51ad('0x476')];if(['',_0x51ad('0x123')][_0x51ad('0xbc')](_0x49f0f3))_0x49f0f3=_0x45f861[_0x51ad('0xeb')][_0x51ad('0x52')](this);const _0x3ae78d=_0x45f861['EnableJS'][_0x51ad('0x52')](this),_0x316c41=_0x45f861['ExtJS'][_0x51ad('0x52')](this);this[_0x51ad('0x48d')](_0x49f0f3,_0x267646,_0x3ae78d,_0x316c41),this[_0x51ad('0x42c')](_0x267646,_0x45f861['CallHandlerJS'][_0x51ad('0x3a9')](this,_0x316c41));}}}};function Window_ButtonAssist(){this['initialize'](...arguments);}Window_ButtonAssist[_0x51ad('0x9c')]=Object[_0x51ad('0x3ca')](Window_Base[_0x51ad('0x9c')]),Window_ButtonAssist[_0x51ad('0x9c')][_0x51ad('0x56c')]=Window_ButtonAssist,Window_ButtonAssist['prototype'][_0x51ad('0x386')]=function(_0x3d96b4){this[_0x51ad('0x211')]={},Window_Base[_0x51ad('0x9c')][_0x51ad('0x386')][_0x51ad('0x52')](this,_0x3d96b4),this[_0x51ad('0xa3')](VisuMZ[_0x51ad('0x344')]['Settings'][_0x51ad('0x1d5')][_0x51ad('0x2e')]||0x0),this['refresh']();},Window_ButtonAssist[_0x51ad('0x9c')][_0x51ad('0x14d')]=function(){this[_0x51ad('0x2f6')][_0x51ad('0x23d')]<=0x60&&(this['contents'][_0x51ad('0x23d')]+=0x6);},Window_ButtonAssist['prototype'][_0x51ad('0x5e')]=function(){this[_0x51ad('0x2f6')][_0x51ad('0x23d')]>=0x18&&(this[_0x51ad('0x2f6')][_0x51ad('0x23d')]-=0x6);},Window_ButtonAssist[_0x51ad('0x9c')]['update']=function(){Window_Base[_0x51ad('0x9c')][_0x51ad('0x14')][_0x51ad('0x52')](this),this[_0x51ad('0x395')]();},Window_ButtonAssist[_0x51ad('0x9c')]['updatePadding']=function(){this[_0x51ad('0x262')]=SceneManager['_scene'][_0x51ad('0x5ab')]()!==_0x51ad('0x44d')?0x0:0x8;},Window_ButtonAssist[_0x51ad('0x9c')][_0x51ad('0x395')]=function(){const _0x36b71e=SceneManager[_0x51ad('0x556')];for(let _0x5cbd89=0x1;_0x5cbd89<=0x5;_0x5cbd89++){if(_0x51ad('0x2b7')===_0x51ad('0x112')){function _0x3725b4(){return this[_0x51ad('0x54c')]=this[_0x51ad('0x54c')]||0x0,[0x0,0x1,0x2,0x3][_0x51ad('0xbc')](this[_0x51ad('0x54c')])?_0x2024fe[_0x51ad('0x344')][_0x51ad('0x3ab')][_0x51ad('0x52')](this,_0x107ae2):_0x3051b9['ApplyEasing'](_0x195128,this[_0x51ad('0x54c')]);}}else{if(this[_0x51ad('0x211')][_0x51ad('0xa0')[_0x51ad('0x348')](_0x5cbd89)]!==_0x36b71e[_0x51ad('0x283')[_0x51ad('0x348')](_0x5cbd89)]())return this[_0x51ad('0x4da')]();if(this['_data'][_0x51ad('0x20')[_0x51ad('0x348')](_0x5cbd89)]!==_0x36b71e['buttonAssistText%1'['format'](_0x5cbd89)]()){if('ZWLjI'!==_0x51ad('0x108'))return this['refresh']();else{function _0x3e2185(){this[_0x51ad('0x2a4')]&&this[_0x51ad('0x2a4')][_0x51ad('0xa3')](_0x217345[_0x51ad('0x3b5')][_0x51ad('0x11b')]),this[_0x51ad('0x3f1')]&&this[_0x51ad('0x3f1')][_0x51ad('0xa3')](_0x5a745c[_0x51ad('0x3b5')][_0x51ad('0xec')]);}}}}}},Window_ButtonAssist[_0x51ad('0x9c')]['refresh']=function(){this[_0x51ad('0x2f6')][_0x51ad('0x127')]();for(let _0x33fdc2=0x1;_0x33fdc2<=0x5;_0x33fdc2++){if(_0x51ad('0x2a1')===_0x51ad('0x2a1'))this['drawSegment'](_0x33fdc2);else{function _0x23ad29(){this[_0x51ad('0x1aa')](0x0);}}}},Window_ButtonAssist[_0x51ad('0x9c')][_0x51ad('0x497')]=function(_0x35def7){const _0x19a307=this[_0x51ad('0x3a6')]/0x5,_0x43a5df=SceneManager['_scene'],_0x55cc59=_0x43a5df[_0x51ad('0x283')[_0x51ad('0x348')](_0x35def7)](),_0x5d931a=_0x43a5df[_0x51ad('0x5a9')[_0x51ad('0x348')](_0x35def7)]();this['_data'][_0x51ad('0xa0')[_0x51ad('0x348')](_0x35def7)]=_0x55cc59,this[_0x51ad('0x211')][_0x51ad('0x20')[_0x51ad('0x348')](_0x35def7)]=_0x5d931a;if(_0x55cc59==='')return;if(_0x5d931a==='')return;const _0x27c212=_0x43a5df[_0x51ad('0x359')[_0x51ad('0x348')](_0x35def7)](),_0x22134c=this[_0x51ad('0x317')](),_0x9408b0=_0x19a307*(_0x35def7-0x1)+_0x22134c+_0x27c212,_0x299830=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')]['ButtonAssist'][_0x51ad('0xaf')];this[_0x51ad('0x2d8')](_0x299830[_0x51ad('0x348')](_0x55cc59,_0x5d931a),_0x9408b0,0x0,_0x19a307-_0x22134c*0x2);},VisuMZ[_0x51ad('0xba')]=function(_0x35e466){if(Utils['isOptionValid'](_0x51ad('0x4e3'))){var _0x21e72e=require(_0x51ad('0x10'))[_0x51ad('0x49a')][_0x51ad('0xf4')]();SceneManager[_0x51ad('0x357')]();if(_0x35e466)setTimeout(_0x21e72e[_0x51ad('0x15e')][_0x51ad('0x3a9')](_0x21e72e),0x190);}},VisuMZ[_0x51ad('0x57f')]=function(_0x4e6c0d,_0x8097d3){_0x8097d3=_0x8097d3[_0x51ad('0x1fd')]();var _0x3ab1bb=1.70158,_0x54da0d=0.7;switch(_0x8097d3){case'LINEAR':return _0x4e6c0d;case _0x51ad('0x449'):return-0x1*Math[_0x51ad('0x214')](_0x4e6c0d*(Math['PI']/0x2))+0x1;case _0x51ad('0x12a'):return Math[_0x51ad('0x4dc')](_0x4e6c0d*(Math['PI']/0x2));case'INOUTSINE':return-0.5*(Math[_0x51ad('0x214')](Math['PI']*_0x4e6c0d)-0x1);case _0x51ad('0x17e'):return _0x4e6c0d*_0x4e6c0d;case _0x51ad('0x37'):return _0x4e6c0d*(0x2-_0x4e6c0d);case _0x51ad('0x8f'):return _0x4e6c0d<0.5?0x2*_0x4e6c0d*_0x4e6c0d:-0x1+(0x4-0x2*_0x4e6c0d)*_0x4e6c0d;case _0x51ad('0x472'):return _0x4e6c0d*_0x4e6c0d*_0x4e6c0d;case _0x51ad('0x343'):var _0x8c9e93=_0x4e6c0d-0x1;return _0x8c9e93*_0x8c9e93*_0x8c9e93+0x1;case _0x51ad('0xe3'):return _0x4e6c0d<0.5?0x4*_0x4e6c0d*_0x4e6c0d*_0x4e6c0d:(_0x4e6c0d-0x1)*(0x2*_0x4e6c0d-0x2)*(0x2*_0x4e6c0d-0x2)+0x1;case _0x51ad('0x3a3'):return _0x4e6c0d*_0x4e6c0d*_0x4e6c0d*_0x4e6c0d;case _0x51ad('0x3a0'):var _0x8c9e93=_0x4e6c0d-0x1;return 0x1-_0x8c9e93*_0x8c9e93*_0x8c9e93*_0x8c9e93;case _0x51ad('0xd5'):var _0x8c9e93=_0x4e6c0d-0x1;return _0x4e6c0d<0.5?0x8*_0x4e6c0d*_0x4e6c0d*_0x4e6c0d*_0x4e6c0d:0x1-0x8*_0x8c9e93*_0x8c9e93*_0x8c9e93*_0x8c9e93;case'INQUINT':return _0x4e6c0d*_0x4e6c0d*_0x4e6c0d*_0x4e6c0d*_0x4e6c0d;case _0x51ad('0x3c8'):var _0x8c9e93=_0x4e6c0d-0x1;return 0x1+_0x8c9e93*_0x8c9e93*_0x8c9e93*_0x8c9e93*_0x8c9e93;case _0x51ad('0x46'):var _0x8c9e93=_0x4e6c0d-0x1;return _0x4e6c0d<0.5?0x10*_0x4e6c0d*_0x4e6c0d*_0x4e6c0d*_0x4e6c0d*_0x4e6c0d:0x1+0x10*_0x8c9e93*_0x8c9e93*_0x8c9e93*_0x8c9e93*_0x8c9e93;case'INEXPO':if(_0x4e6c0d===0x0){if(_0x51ad('0x4ac')==='jdATU')return 0x0;else{function _0x502499(){let _0x337f3f=_0x51ad('0x12b')+_0x13da67+_0x51ad('0x298');if(this['checkCacheKey'](_0x337f3f))return this[_0x51ad('0x43f')][_0x337f3f];return this[_0x51ad('0x43f')][_0x337f3f]=_0x58fdd4[_0x51ad('0x344')]['Settings'][_0x51ad('0x4c9')][_0x51ad('0x426')][_0x51ad('0x52')](this,_0x386e80),this[_0x51ad('0x43f')][_0x337f3f];}}}return Math['pow'](0x2,0xa*(_0x4e6c0d-0x1));case _0x51ad('0x475'):if(_0x4e6c0d===0x1)return 0x1;return-Math[_0x51ad('0x2b9')](0x2,-0xa*_0x4e6c0d)+0x1;case _0x51ad('0x3ac'):if(_0x4e6c0d===0x0||_0x4e6c0d===0x1)return _0x4e6c0d;var _0x44d292=_0x4e6c0d*0x2,_0x34095e=_0x44d292-0x1;if(_0x44d292<0x1)return 0.5*Math['pow'](0x2,0xa*_0x34095e);return 0.5*(-Math[_0x51ad('0x2b9')](0x2,-0xa*_0x34095e)+0x2);case _0x51ad('0x205'):var _0x44d292=_0x4e6c0d/0x1;return-0x1*(Math[_0x51ad('0x172')](0x1-_0x44d292*_0x4e6c0d)-0x1);case _0x51ad('0x4a5'):var _0x8c9e93=_0x4e6c0d-0x1;return Math['sqrt'](0x1-_0x8c9e93*_0x8c9e93);case _0x51ad('0x277'):var _0x44d292=_0x4e6c0d*0x2,_0x34095e=_0x44d292-0x2;if(_0x44d292<0x1){if(_0x51ad('0x488')===_0x51ad('0x3d7')){function _0x472b9f(){this[_0x51ad('0x54f')]['x']=this[_0x51ad('0x2c2')](this[_0x51ad('0x54f')]['x'],this['_targetAnchor']['x']),this[_0x51ad('0x54f')]['y']=this[_0x51ad('0x2c2')](this[_0x51ad('0x54f')]['y'],this[_0x51ad('0x41e')]['y']);}}else return-0.5*(Math[_0x51ad('0x172')](0x1-_0x44d292*_0x44d292)-0x1);}return 0.5*(Math[_0x51ad('0x172')](0x1-_0x34095e*_0x34095e)+0x1);case _0x51ad('0xaa'):return _0x4e6c0d*_0x4e6c0d*((_0x3ab1bb+0x1)*_0x4e6c0d-_0x3ab1bb);case _0x51ad('0x2b'):var _0x44d292=_0x4e6c0d/0x1-0x1;return _0x44d292*_0x44d292*((_0x3ab1bb+0x1)*_0x44d292+_0x3ab1bb)+0x1;break;case _0x51ad('0x34a'):var _0x44d292=_0x4e6c0d*0x2,_0x31eb04=_0x44d292-0x2,_0x4a43aa=_0x3ab1bb*1.525;if(_0x44d292<0x1){if(_0x51ad('0x21a')!==_0x51ad('0x23a'))return 0.5*_0x44d292*_0x44d292*((_0x4a43aa+0x1)*_0x44d292-_0x4a43aa);else{function _0x218ce0(){return _0x3ea0fd['CoreEngine']['Scene_MenuBase_mainAreaTop']['call'](this);}}}return 0.5*(_0x31eb04*_0x31eb04*((_0x4a43aa+0x1)*_0x31eb04+_0x4a43aa)+0x2);case'INELASTIC':if(_0x4e6c0d===0x0||_0x4e6c0d===0x1){if(_0x51ad('0x4f9')!=='JazoP'){function _0x3419f5(){_0x252ced[_0x51ad('0x344')][_0x51ad('0x55f')][_0x51ad('0x52')](this,_0x13962a,_0x254f75,_0x23c294,_0x52f257,_0x1b0a5b,_0x277158);}}else return _0x4e6c0d;}var _0x44d292=_0x4e6c0d/0x1,_0x34095e=_0x44d292-0x1,_0x493984=0x1-_0x54da0d,_0x4a43aa=_0x493984/(0x2*Math['PI'])*Math['asin'](0x1);return-(Math['pow'](0x2,0xa*_0x34095e)*Math['sin']((_0x34095e-_0x4a43aa)*(0x2*Math['PI'])/_0x493984));case _0x51ad('0x349'):var _0x493984=0x1-_0x54da0d,_0x44d292=_0x4e6c0d*0x2;if(_0x4e6c0d===0x0||_0x4e6c0d===0x1){if(_0x51ad('0x8c')!==_0x51ad('0x8c')){function _0xe2109(){_0x34810a['CoreEngine'][_0x51ad('0x1c8')]['call'](this);}}else return _0x4e6c0d;}var _0x4a43aa=_0x493984/(0x2*Math['PI'])*Math[_0x51ad('0x81')](0x1);return Math['pow'](0x2,-0xa*_0x44d292)*Math[_0x51ad('0x4dc')]((_0x44d292-_0x4a43aa)*(0x2*Math['PI'])/_0x493984)+0x1;case _0x51ad('0x195'):var _0x493984=0x1-_0x54da0d;if(_0x4e6c0d===0x0||_0x4e6c0d===0x1)return _0x4e6c0d;var _0x44d292=_0x4e6c0d*0x2,_0x34095e=_0x44d292-0x1,_0x4a43aa=_0x493984/(0x2*Math['PI'])*Math[_0x51ad('0x81')](0x1);if(_0x44d292<0x1)return-0.5*(Math[_0x51ad('0x2b9')](0x2,0xa*_0x34095e)*Math[_0x51ad('0x4dc')]((_0x34095e-_0x4a43aa)*(0x2*Math['PI'])/_0x493984));return Math[_0x51ad('0x2b9')](0x2,-0xa*_0x34095e)*Math['sin']((_0x34095e-_0x4a43aa)*(0x2*Math['PI'])/_0x493984)*0.5+0x1;case _0x51ad('0x4f'):var _0x44d292=_0x4e6c0d/0x1;if(_0x44d292<0x1/2.75)return 7.5625*_0x44d292*_0x44d292;else{if(_0x44d292<0x2/2.75){if(_0x51ad('0x8e')===_0x51ad('0x21e')){function _0x563471(){_0xb77bc2+=_0x47022e;if(_0x34edc5>=_0x208dd4)_0x1129b=_0x5a8a42-0x1;this[_0x51ad('0x1aa')](_0x10aefb);}}else{var _0x31eb04=_0x44d292-1.5/2.75;return 7.5625*_0x31eb04*_0x31eb04+0.75;}}else{if(_0x44d292<2.5/2.75){var _0x31eb04=_0x44d292-2.25/2.75;return 7.5625*_0x31eb04*_0x31eb04+0.9375;}else{if(_0x51ad('0x4d2')===_0x51ad('0x581')){function _0x222cb9(){return _0x4326eb[_0x51ad('0x3b5')][_0x51ad('0x31d')][_0x51ad('0x52')](this);}}else{var _0x31eb04=_0x44d292-2.625/2.75;return 7.5625*_0x31eb04*_0x31eb04+0.984375;}}}}case'INBOUNCE':var _0x42b827=0x1-VisuMZ[_0x51ad('0x57f')](0x1-_0x4e6c0d,_0x51ad('0x511'));return _0x42b827;case _0x51ad('0x292'):if(_0x4e6c0d<0.5){if('ocULF'!==_0x51ad('0x256'))var _0x42b827=VisuMZ['ApplyEasing'](_0x4e6c0d*0x2,_0x51ad('0x3c6'))*0.5;else{function _0x2858fb(){this[_0x51ad('0x332')]();}}}else{if('UsRUK'==='UsRUK')var _0x42b827=VisuMZ[_0x51ad('0x57f')](_0x4e6c0d*0x2-0x1,_0x51ad('0x511'))*0.5+0.5;else{function _0x286831(){return _0x3d352b[_0x51ad('0x3b5')]['HelpRect'][_0x51ad('0x52')](this);}}}return _0x42b827;default:return _0x4e6c0d;}},VisuMZ[_0x51ad('0x595')]=function(_0x235413){_0x235413=String(_0x235413)[_0x51ad('0x1fd')]();const _0x1db956=VisuMZ[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x4c9')];if(_0x235413===_0x51ad('0x588'))return _0x1db956['IconParam0'];if(_0x235413===_0x51ad('0x1de'))return _0x1db956[_0x51ad('0x4d0')];if(_0x235413===_0x51ad('0xd7'))return _0x1db956[_0x51ad('0x11c')];if(_0x235413===_0x51ad('0x251'))return _0x1db956[_0x51ad('0x130')];if(_0x235413===_0x51ad('0x46e'))return _0x1db956[_0x51ad('0x89')];if(_0x235413==='MDF')return _0x1db956[_0x51ad('0x22d')];if(_0x235413===_0x51ad('0x3e0'))return _0x1db956[_0x51ad('0x42f')];if(_0x235413===_0x51ad('0x29f'))return _0x1db956[_0x51ad('0x4a7')];if(_0x235413==='HIT')return _0x1db956[_0x51ad('0x51e')];if(_0x235413===_0x51ad('0x74'))return _0x1db956[_0x51ad('0x4a1')];if(_0x235413===_0x51ad('0x487'))return _0x1db956[_0x51ad('0x4dd')];if(_0x235413==='CEV')return _0x1db956[_0x51ad('0xb1')];if(_0x235413==='MEV')return _0x1db956[_0x51ad('0xf7')];if(_0x235413===_0x51ad('0x222'))return _0x1db956[_0x51ad('0x235')];if(_0x235413===_0x51ad('0x21c'))return _0x1db956[_0x51ad('0x433')];if(_0x235413===_0x51ad('0x47f'))return _0x1db956[_0x51ad('0x91')];if(_0x235413==='MRG')return _0x1db956['IconXParam8'];if(_0x235413===_0x51ad('0x5a3'))return _0x1db956[_0x51ad('0x2ae')];if(_0x235413==='TGR')return _0x1db956['IconSParam0'];if(_0x235413==='GRD')return _0x1db956[_0x51ad('0x3c3')];if(_0x235413==='REC')return _0x1db956[_0x51ad('0x4eb')];if(_0x235413===_0x51ad('0x4a0'))return _0x1db956['IconSParam3'];if(_0x235413===_0x51ad('0x316'))return _0x1db956[_0x51ad('0x428')];if(_0x235413===_0x51ad('0x564'))return _0x1db956[_0x51ad('0x77')];if(_0x235413===_0x51ad('0x46c'))return _0x1db956[_0x51ad('0x1ac')];if(_0x235413===_0x51ad('0x2eb'))return _0x1db956[_0x51ad('0x3c2')];if(_0x235413===_0x51ad('0x494'))return _0x1db956[_0x51ad('0x3de')];if(_0x235413===_0x51ad('0x478'))return _0x1db956['IconSParam9'];return 0x0;},VisuMZ[_0x51ad('0x2c')]=function(_0x1309a2,_0x4dd2f4){if(_0x1309a2%0x1===0x0)return _0x1309a2;return _0x4dd2f4=_0x4dd2f4||0x0,String((_0x1309a2*0x64)[_0x51ad('0x11f')](_0x4dd2f4))+'%';},VisuMZ[_0x51ad('0x56f')]=function(_0x3b63a1){return _0x3b63a1=String(_0x3b63a1),!!_0x3b63a1&&typeof _0x3b63a1===_0x51ad('0x17')&&(_0x3b63a1=_0x3b63a1['replace'](/(?!\[)(\d+\.?\d*)(?!\])/g,(_0xea1621,_0x400bee)=>{let _0x40a812=_0x400bee;if(_0x40a812[0x0]==='0')return _0x40a812;if(_0x40a812[_0x40a812['length']-0x1]==='.')return Number(_0x40a812)['toLocaleString']()+'.';else{if(_0x40a812[_0x40a812[_0x51ad('0x88')]-0x1]===',')return Number(_0x40a812)[_0x51ad('0x29e')]()+',';else{if(_0x51ad('0x576')!==_0x51ad('0xa8'))return Number(_0x40a812)['toLocaleString']();else{function _0x5c2900(){this[_0x51ad('0x211')]={},_0x4bcef6[_0x51ad('0x9c')][_0x51ad('0x386')][_0x51ad('0x52')](this,_0x7cee45),this['setBackgroundType'](_0x24702b[_0x51ad('0x344')][_0x51ad('0x31f')][_0x51ad('0x1d5')][_0x51ad('0x2e')]||0x0),this[_0x51ad('0x4da')]();}}}}})),_0x3b63a1;},VisuMZ[_0x51ad('0x32a')]=function(_0x35cb00){SoundManager[_0x51ad('0x2c8')]();if(!Utils['isNwjs']()){const _0x35c954=window[_0x51ad('0x2e2')](_0x35cb00,_0x51ad('0x186'));}else{if(_0x51ad('0x2a5')==='XnMWF'){function _0x43b874(){if(this[_0x51ad('0x211')][_0x51ad('0xa0')[_0x51ad('0x348')](_0x2d8346)]!==_0x3b061d[_0x51ad('0x283')[_0x51ad('0x348')](_0x28c4ea)]())return this[_0x51ad('0x4da')]();if(this[_0x51ad('0x211')][_0x51ad('0x20')[_0x51ad('0x348')](_0x536976)]!==_0x305a67[_0x51ad('0x5a9')[_0x51ad('0x348')](_0x187849)]())return this[_0x51ad('0x4da')]();}}else{const _0x23f1e6=process[_0x51ad('0xb2')]==_0x51ad('0x27f')?_0x51ad('0x2e2'):process['platform']==_0x51ad('0x30c')?'start':_0x51ad('0x430');require(_0x51ad('0x246'))[_0x51ad('0x16')](_0x23f1e6+'\x20'+_0x35cb00);}}},Sprite_Clickable[_0x51ad('0x9c')]['processTouch']=function(){if(this[_0x51ad('0x31a')]()){if(this['isBeingTouched']()){!this[_0x51ad('0xda')]&&TouchInput[_0x51ad('0x37a')]()&&(this[_0x51ad('0xda')]=!![],this[_0x51ad('0x3fb')]());if(TouchInput['isTriggered']()){if('pPajC'===_0x51ad('0x36d')){function _0x2dad02(){_0x5e7128[_0x51ad('0x344')]['Scene_MenuBase_createCancelButton']['call'](this),_0x1d87be[_0x51ad('0x33d')]()&&this[_0x51ad('0x521')]();}}else this['_pressed']=!![],this['onPress']();}}else this[_0x51ad('0xda')]&&this['onMouseExit'](),this[_0x51ad('0x552')]=![],this['_hovered']=![];this[_0x51ad('0x552')]&&TouchInput[_0x51ad('0xd8')]()&&(this[_0x51ad('0x552')]=![],this[_0x51ad('0x1e8')]());}else this[_0x51ad('0x552')]=![],this[_0x51ad('0xda')]=![];},VisuMZ[_0x51ad('0x344')][_0x51ad('0x269')]=Game_Interpreter[_0x51ad('0x9c')][_0x51ad('0x367')],Game_Interpreter[_0x51ad('0x9c')][_0x51ad('0x367')]=function(_0x164c47){const _0x578637=_0x164c47[0x2],_0x200a25=VisuMZ[_0x51ad('0x344')][_0x51ad('0x269')][_0x51ad('0x52')](this,_0x164c47),_0x1f41db=$gameScreen[_0x51ad('0x166')](_0x164c47[0x0]);if(_0x1f41db)_0x1f41db[_0x51ad('0x171')]([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x578637]);return _0x200a25;},VisuMZ['CoreEngine'][_0x51ad('0x14a')]=Game_Interpreter[_0x51ad('0x9c')][_0x51ad('0x3d1')],Game_Interpreter[_0x51ad('0x9c')][_0x51ad('0x3d1')]=function(_0x475b5e){const _0x162746=_0x475b5e[0x2],_0x3c6d72=VisuMZ[_0x51ad('0x344')][_0x51ad('0x14a')]['call'](this,_0x475b5e),_0x1f4d11=$gameScreen[_0x51ad('0x166')](_0x475b5e[0x0]);if(_0x1f4d11)_0x1f4d11['setTargetAnchor']([{'x':0x0,'y':0x0},{'x':0.5,'y':0.5}][_0x162746]);return _0x3c6d72;},Game_Picture[_0x51ad('0x9c')][_0x51ad('0x40e')]=function(){return this[_0x51ad('0x54f')];},VisuMZ[_0x51ad('0x344')][_0x51ad('0x580')]=Game_Picture[_0x51ad('0x9c')][_0x51ad('0xb7')],Game_Picture[_0x51ad('0x9c')][_0x51ad('0xb7')]=function(){VisuMZ[_0x51ad('0x344')][_0x51ad('0x580')]['call'](this),this['_anchor']={'x':0x0,'y':0x0};},VisuMZ['CoreEngine']['Game_Picture_updateMove']=Game_Picture[_0x51ad('0x9c')][_0x51ad('0x48c')],Game_Picture[_0x51ad('0x9c')][_0x51ad('0x48c')]=function(){this[_0x51ad('0x2f7')](),VisuMZ[_0x51ad('0x344')][_0x51ad('0x2c7')][_0x51ad('0x52')](this);},Game_Picture[_0x51ad('0x9c')][_0x51ad('0x2f7')]=function(){this[_0x51ad('0xab')]>0x0&&(this[_0x51ad('0x54f')]['x']=this['applyEasing'](this[_0x51ad('0x54f')]['x'],this[_0x51ad('0x41e')]['x']),this[_0x51ad('0x54f')]['y']=this['applyEasing'](this[_0x51ad('0x54f')]['y'],this[_0x51ad('0x41e')]['y']));},Game_Picture[_0x51ad('0x9c')][_0x51ad('0x171')]=function(_0x504989){this[_0x51ad('0x54f')]=_0x504989,this[_0x51ad('0x41e')]=JsonEx['makeDeepCopy'](this[_0x51ad('0x54f')]);},Game_Picture['prototype'][_0x51ad('0x3be')]=function(_0xca992e){this[_0x51ad('0x41e')]=_0xca992e;},VisuMZ['CoreEngine'][_0x51ad('0x26f')]=Sprite_Picture['prototype']['updateOrigin'],Sprite_Picture[_0x51ad('0x9c')]['updateOrigin']=function(){const _0x1d37e2=this['picture']();if(!_0x1d37e2[_0x51ad('0x40e')]()){if(_0x51ad('0x142')===_0x51ad('0x142'))VisuMZ['CoreEngine'][_0x51ad('0x26f')][_0x51ad('0x52')](this);else{function _0x14d680(){!this[_0x51ad('0xda')]&&_0x484e79['isHovered']()&&(this[_0x51ad('0xda')]=!![],this[_0x51ad('0x3fb')]()),_0x5ee94c[_0x51ad('0x4b7')]()&&(this[_0x51ad('0x552')]=!![],this[_0x51ad('0x3a7')]());}}}else this['anchor']['x']=_0x1d37e2[_0x51ad('0x40e')]()['x'],this[_0x51ad('0x40e')]['y']=_0x1d37e2[_0x51ad('0x40e')]()['y'];},Game_Action['prototype'][_0x51ad('0x5c')]=function(_0x50c033){if(_0x50c033){const _0x87e698=_0x50c033['skillId'];if(_0x87e698===0x1&&this[_0x51ad('0x53a')]()[_0x51ad('0x25c')]()!==0x1){if(_0x51ad('0x185')!==_0x51ad('0x185')){function _0x11c621(){this[_0x51ad('0x2a4')][_0x51ad('0xa3')](_0x30cf23[_0x51ad('0x3b5')][_0x51ad('0x11b')]);}}else this[_0x51ad('0x51f')]();}else{if(_0x87e698===0x2&&this[_0x51ad('0x53a')]()[_0x51ad('0xcc')]()!==0x2)this[_0x51ad('0x3b9')]();else{if(_0x51ad('0x420')!==_0x51ad('0x420')){function _0x3b344e(){_0x1e8142=_0x5c3b29||0xa8,this[_0x51ad('0x55a')]();if(_0x46c54a[_0x51ad('0x344')][_0x51ad('0x31f')]['UI']['TextCodeClassNames'])this['drawTextEx'](_0x51ccb1['currentClass']()[_0x51ad('0x50f')],_0xecc816,_0x44374f,_0x889b6);else{const _0x2d6cba=_0x1b3bb4[_0x51ad('0x35e')]()[_0x51ad('0x50f')][_0x51ad('0xe')](/\\I\[(\d+)\]/gi,'');this[_0x51ad('0x3f9')](_0x2d6cba,_0x12be2f,_0x4fec18,_0x5e82ea);}}}else this[_0x51ad('0x20d')](_0x87e698);}}}else this['clear']();},Game_Actor[_0x51ad('0x9c')]['usableSkills']=function(){return this[_0x51ad('0x417')]()[_0x51ad('0xa2')](_0x4efcd5=>this[_0x51ad('0x2a6')](_0x4efcd5)&&this[_0x51ad('0x584')]()['includes'](_0x4efcd5[_0x51ad('0x5af')]));},Window_Base[_0x51ad('0x9c')][_0x51ad('0x18c')]=function(){if(this[_0x51ad('0x522')]){const _0x41f67c=this[_0x51ad('0x522')][_0x51ad('0x255')],_0x7959c4=this['width'],_0x51d7cf=this[_0x51ad('0x4e9')],_0x3b6827=this[_0x51ad('0x262')],_0x5e9ea9=ColorManager['dimColor1'](),_0x38efd5=ColorManager[_0x51ad('0x278')]();_0x41f67c[_0x51ad('0x99')](_0x7959c4,_0x51d7cf),_0x41f67c[_0x51ad('0x157')](0x0,0x0,_0x7959c4,_0x3b6827,_0x38efd5,_0x5e9ea9,!![]),_0x41f67c['fillRect'](0x0,_0x3b6827,_0x7959c4,_0x51d7cf-_0x3b6827*0x2,_0x5e9ea9),_0x41f67c[_0x51ad('0x157')](0x0,_0x51d7cf-_0x3b6827,_0x7959c4,_0x3b6827,_0x5e9ea9,_0x38efd5,!![]),this[_0x51ad('0x522')][_0x51ad('0x355')](0x0,0x0,_0x7959c4,_0x51d7cf);}};