//=============================================================================
// VisuStella MZ - Skills & States Core
// VisuMZ_1_SkillsStatesCore.js
//=============================================================================

var Imported = Imported || {};
Imported.VisuMZ_1_SkillsStatesCore = true;

var VisuMZ = VisuMZ || {};
VisuMZ.SkillsStatesCore = VisuMZ.SkillsStatesCore || {};
VisuMZ.SkillsStatesCore.version = 1.01;

//=============================================================================
 /*:
 * @target MZ
 * @plugindesc [RPG Maker MZ] [Tier 1] [Version 1.01] [SkillsStatesCore]
 * @author VisuStella
 * @url http://www.yanfly.moe/wiki/Skills_and_States_Core_VisuStella_MZ
 * @orderAfter VisuMZ_0_CoreEngine
 *
 * @help
 * ============================================================================
 * Introduction
 * ============================================================================
 *
 * The Skills & States Core plugin extends and builds upon the functionality of
 * RPG Maker MZ's inherent skill, state, and buff functionalities and allows
 * game devs to customize its various aspects.
 *
 * Features include all (but not limited to) the following:
 * 
 * * Assigning multiple Skill Types to Skills.
 * * Making custom Skill Cost Types (such as HP, Gold, and Items).
 * * Allowing Skill Costs to become percentile-based or dynamic either directly
 *   through the Skills themselves or through trait-like notetags.
 * * Replacing gauges for different classes to display different types of
 *   Skill Cost Type resources.
 * * Hiding/Showing and enabling/disabling skills based on switches, learned
 *   skills, and code.
 * * Setting rulings for states, including if they're cleared upon death, how
 *   reapplying the state affects their turn count, and more.
 * * Allowing states to be categorized and affected by categories, too.
 * * Displaying turn counts on states drawn in the window or on sprites.
 * * Manipulation of state, buff, and debuff turns through skill and item
 *   effect notetags.
 * * Create custom damage over time state calculations through notetags.
 * * Allow database objects to apply passive states to its user.
 * * Passive states can have conditions before they become active as well.
 * * Updated Skill Menu Scene layout to fit more modern appearances.
 * * Added bonus if Items & Equips Core is installed to utilize the Shop Status
 *   Window to display skill data inside the Skill Menu.
 * * Control over various aspects of the Skill Menu Scene.
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
 * This plugin adds some new hard-coded features to RPG Maker MZ's functions.
 * The following is a list of them.
 *
 * ---
 *
 * Buff & Debuff Level Management
 *
 * - In RPG Maker MZ, buffs and debuffs when applied to one another will shift
 * the buff modifier level up or down. This plugin will add an extra change to
 * the mechanic by making it so that once the buff modifier level reaches a
 * neutral point, the buff or debuff is removed altogether and resets the buff
 * and debuff turn counter for better accuracy.
 *
 * ---
 *
 * Skill Costs
 *
 * - In RPG Maker MZ, skill costs used to be hard-coded. Now, all Skill Cost
 * Types are now moved to the Plugin Parameters, including MP and TP. This
 * means that from payment to checking for them, it's all done through the
 * options available.
 *
 * - By default in RPG Maker MZ, displayed skill costs would only display only
 * one type: TP if available, then MP. If a skill costs both TP and MP, then
 * only TP was displayed. This plugin changes that aspect by displaying all the
 * cost types available in order of the Plugin Parameter Skill Cost Types.
 *
 * - By default in RPG Maker MZ, displayed skill costs were only color-coded.
 * This plugin changes that aspect by displaying the Skill Cost Type's name
 * alongside the cost. This is to help color-blind players distinguish what
 * costs a skill has.
 *
 * ---
 *
 * Sprite Gauges
 *
 * - Sprite Gauges in RPG Maker MZ by default are hard-coded and only work for
 * HP, MP, TP, and Time (used for ATB). This plugin makes it possible for them
 * to be customized through the use of Plugin Parameters under the Skill Cost
 * Types and their related-JavaScript entries.
 *
 * ---
 *
 * Window Functions Moved
 *
 * - Some functions found in RPG Maker MZ's default code for Window_StatusBase
 * and Window_SkillList are now moved to Window_Base to make the functions
 * available throughout all windows for usage.
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
 * === General Skill Notetags ===
 *
 * The following are general notetags that are skill-related.
 *
 * ---
 *
 * <Skill Type: x>
 * <Skill Types: x,x,x>
 *
 * <Skill Type: name>
 * <Skill Types: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Marks the skill to have multiple Skill Types, meaning they would appear
 *   under different skill types without needing to create duplicate skills.
 * - Replace 'x' with a number value representing the Skill Type's ID.
 * - If using 'name' notetag variant, replace 'name' with the Skill Type(s)
 *   name desired to be added.
 *
 * ---
 *
 * === Skill Cost Notetags ===
 *
 * The following are notetags that can be used to adjust skill costs. Some of
 * these notetags are added through the Plugin Parameter: Skill Cost Types and
 * can be altered there. This also means that some of these notetags can have
 * their functionality altered and/or removed.
 *
 * ---
 *
 * <type Cost: x>
 * <type Cost: x%>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to designate costs of custom or already existing
 *   types that cannot be made by the Database Editor.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the exact type cost value.
 *   This lets you bypass the Database Editor's limit of 9,999 MP and 100 TP.
 * - The 'x%' version is replaced with a percentile value to determine a cost
 *   equal to a % of the type's maximum quantity limit.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: 500>
 *   <MP Cost: 25%>
 *   <Gold Cost: 3000>
 *   <Potion Cost: 5>
 *
 * ---
 *
 * <type Cost Max: x>
 * <type Cost Min: x>
 *
 * - Used for: Skill Notetags
 * - These notetags are used to ensure conditional and % costs don't become too
 *   large or too small.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'x' with a number value to determine the maximum or minimum values
 *   that the cost can be.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost Max: 1500>
 *   <MP Cost Min: 5>
 *   <Gold Cost Max: 10000>
 *   <Potion Cost Min: 3>
 *
 * ---
 *
 * <type Cost: +x>
 * <type Cost: -x>
 *
 * <type Cost: x%>
 *
 * - Used for: Actor, Class, Weapon, Armor, Enemy, State Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - For % notetag variant: Replace 'x' with a number value to determine the
 *   rate to adjust the Skill Cost Type by as a flat value. This is applied
 *   before <type Cost: +x> and <type Cost: -x> notetags.
 * - For + and - notetag variants: Replace 'x' with a number value to determine
 *   how much to adjust the Skill Cost Type by as a flat value. This is applied
 *   after <type Cost: x%> notetags.
 * - Functionality for these notetags can be altered in the Plugin Parameters.
 *
 * Examples:
 *   <HP Cost: +20>
 *   <MP Cost: -10>
 *   <Gold Cost: 50%>
 *   <Potion Cost: 200%>
 *
 * ---
 *
 * <Custom Cost Text>
 *  text
 * </Custom Cost Text>
 *
 * - Used for: Skill Notetags
 * - Allows you to insert custom text into the skill's cost area towards the
 *   end of the costs.
 * - Replace 'text' with the text you wish to display.
 * - Text codes may be used.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Costs ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine any dynamic Skill Cost Types used for particular skills.
 *
 * ---
 *
 * <JS type Cost>
 *  code
 *  code
 *  cost = code;
 * </JS type Cost>
 *
 * - Used for: Skill Notetags
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'code' to determine the type 'cost' of the skill.
 * - Insert the final type cost into the 'cost' variable.
 * - The 'user' variable refers to the user about to perform the skill.
 * - The 'skill' variable refers to the skill being used.
 * - Functionality for the notetag can be altered in the Plugin Parameters.
 *
 * ---
 *
 * === Gauge Replacement Notetags ===
 *
 * Certain classes can have their gauges swapped out for other Skill Cost
 * Types. This is especially helpful for the classes that don't utilize those
 * Skill Cost Types. You can mix and match them however you want.
 *
 * ---
 *
 * <Replace HP Gauge: type>
 * <Replace MP Gauge: type>
 * <Replace TP Gauge: type>
 *
 * - Used for: Class Notetags
 * - Replaces the HP (1st), MP (2nd), or TP (3rd) gauge with a different Skill
 *   Cost Type.
 * - Replace 'type' with a resource type. Existing ones found in the Plugin
 *   Parameters are 'HP', 'MP', 'TP', 'Gold', and 'Potion'. More can be added.
 * - Replace 'type' with 'none' to not display any gauges there.
 * - The <Replace TP Gauge: type> will require 'Display TP in Window' setting
 *   to be on in the Database > System 1 tab.
 * - Functionality for the notetags can be altered by changes made to the
 *   Skill & States Core Plugin Parameters.
 *
 * ---
 *
 * === Skill Accessibility Notetags ===
 *
 * Sometimes, you don't want all skills to be visible whether it be to hide
 * menu-only skills during battle, until certain switches are turned ON/OFF, or
 * until certain skills have been learned.
 *
 * ---
 *
 * <Hide in Battle>
 * <Hide outside Battle>
 *
 * - Used for: Skill Notetags
 * - Makes the specific skill visible or hidden depending on whether or not the
 *   player is currently in battle.
 *
 * ---
 *
 * <Show Switch: x>
 *
 * <Show All Switches: x,x,x>
 * <Show Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be hidden until all switches
 *   are ON. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the
 *   switches are ON. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide Switch: x>
 *
 * <Hide All Switches: x,x,x>
 * <Hide Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's visibility.
 * - If 'All' notetag variant is used, skill will be shown until all switches
 *   are ON. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   switches are ON. Otherwise, it would be shown.
 *
 * ---
 *
 * <Show if learned Skill: x>
 *
 * <Show if learned All Skills: x,x,x>
 * <Show if learned Any Skills: x,x,x>
 *
 * <Show if learned Skill: name>
 *
 * <Show if learned All Skills: name, name, name>
 * <Show if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be hidden until all skills
 *   are learned. Then, it would be shown.
 * - If 'Any' notetag variant is used, skill will be shown if any of the skills
 *   are learned. Otherwise, it would be hidden.
 *
 * ---
 *
 * <Hide if learned Skill: x>
 *
 * <Hide if learned All Skills: x,x,x>
 * <Hide if learned Any Skills: x,x,x>
 *
 * <Hide if learned Skill: name>
 *
 * <Hide if learned All Skills: name, name, name>
 * <Hide if learned Any Skills: name, name, name>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on skills learned.
 * - Replace 'x' with the skill ID to determine the skill's visibility.
 * - If 'name' notetag viarant is used, replace 'name' with the skill's name to
 *   be checked for the notetag.
 * - If 'All' notetag variant is used, skill will be shown until all skills
 *   are learned. Then, it would be hidden.
 * - If 'Any' notetag variant is used, skill will be hidden if any of the
 *   skills are learned. Otherwise, it would be shown.
 *
 * ---
 *
 * <Enable Switch: x>
 *
 * <Enable All Switches: x,x,x>
 * <Enable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be disabled until all
 *   switches are ON. Then, it would be enabled.
 * - If 'Any' notetag variant is used, skill will be enabled if any of the
 *   switches are ON. Otherwise, it would be disabled.
 *
 * ---
 *
 * <Disable Switch: x>
 *
 * <Disable All Switches: x,x,x>
 * <Disable Any Switches: x,x,x>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on switches.
 * - Replace 'x' with the switch ID to determine the skill's enabled status.
 * - If 'All' notetag variant is used, skill will be enabled until all switches
 *   are ON. Then, it would be disabled.
 * - If 'Any' notetag variant is used, skill will be disabled if any of the
 *   switches are ON. Otherwise, it would be enabled.
 *
 * ---
 *
 * === JavaScript Notetags: Skill Accessibility ===
 *
 * The following are notetags made for users with JavaScript knowledge to
 * determine if a skill can be accessible visibly or through usage.
 *
 * ---
 *
 * <JS Skill Visible>
 *  code
 *  code
 *  visible = code;
 * </JS Skill Visible>
 *
 * - Used for: Skill Notetags
 * - Determines the visibility of the skill based on JavaScript code.
 * - Replace 'code' to determine the type visibility of the skill.
 * - The 'visible' variable returns a boolean (true/false) to determine if the
 *   skill will be visible or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other visibility conditions must be met for this code to count.
 *
 * ---
 *
 * <JS Skill Enable>
 *  code
 *  code
 *  enabled = code;
 * </JS Skill Enable>
 *
 * - Used for: Skill Notetags
 * - Determines the enabled status of the skill based on JavaScript code.
 * - Replace 'code' to determine the type enabled status of the skill.
 * - The 'enabled' variable returns a boolean (true/false) to determine if the
 *   skill will be enabled or not.
 * - The 'user' variable refers to the user with the skill.
 * - The 'skill' variable refers to the skill being checked.
 * - All other skill conditions must be met in order for this to code to count.
 *
 * ---
 *
 * === General State-Related Notetags ===
 *
 * The following notetags are centered around states, such as how their turn
 * counts are displayed, items and skills that affect state turns, if the state
 * can avoid removal by death state, etc.
 *
 * ---
 *
 * <No Death Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon death.
 *
 * ---
 *
 * <No Recover All Clear>
 *
 * - Used for: State Notetags
 * - Prevents this state from being cleared upon using the Recover All command.
 *
 * ---
 *
 * <Group Defeat>
 *
 * - Used for: State Notetags
 * - If an entire party is affected by states with the <Group Defeat> notetag,
 *   they are considered defeated.
 * - Usage for this includes party-wide petrification, frozen, etc.
 *
 * ---
 *
 * <Reapply Rules: Ignore>
 * <Reapply Rules: Reset>
 * <Reapply Rules: Greater>
 * <Reapply Rules: Add>
 *
 * - Used for: State Notetags
 * - Choose what kind of rules this state follows if the state is being applied
 *   to a target that already has the state. This affects turns specifically.
 * - 'Ignore' will bypass any turn changes.
 * - 'Reset' will recalculate the state's turns.
 * - 'Greater' will choose to either keep the current turn count if it's higher
 *   than the reset amount or reset it if the current turn count is lower.
 * - 'Add' will add the state's turn count to the applied amount.
 * - If this notetag isn't used, it will use the rules set in the States >
 *   Plugin Parameters.
 *
 * ---
 *
 * <Positive State>
 * <Negative State>
 *
 * - Used for: State Notetags
 * - Marks the state as a positive state or negative state, also altering the
 *   state's turn count color to match the Plugin Parameter settings.
 * - This also puts the state into either the 'Positive' category or
 *   'Negative' category.
 *
 * ---
 *
 * <Category: name>
 * <Category: name, name, name>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace 'name' with a category name to mark this state as.
 * - Insert multiples of this to mark the state with  multiple categories.
 *
 * ---
 *
 * <Categories>
 *  name
 *  name
 * </Categories>
 *
 * - Used for: State Notetags
 * - Arranges states into certain/multiple categories.
 * - Replace each 'name' with a category name to mark this state as.
 *
 * ---
 *
 * <State x Category Remove: y>
 *
 * - Used for: Skill, Item Notetags
 * - Allows the skill/item to remove 'y' states from specific category 'x'.
 * - Replace 'x' with a category name to remove from.
 * - Replace 'y' with the number of times to remove from that category.
 * - Insert multiples of this to remove different types of categories.
 *
 * ---
 *
 * <Hide State Turns>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - This will by pass any Plugin Parameter settings.
 *
 * ---
 *
 * <Turn Color: x>
 * <Turn Color: #rrggbb>
 *
 * - Used for: State Notetags
 * - Hides the state turns from being shown at all.
 * - Determines the color of the state's turn count.
 * - Replace 'x' with a number value depicting a window text color.
 * - Replace 'rrggbb' with a hex color code for a more custom color.
 *
 * ---
 *
 * <State id Turns: +x>
 * <State id Turns: -x>
 *
 * <Set State id Turns: x>
 *
 * <State name Turns: +x>
 * <State name Turns: -x>
 *
 * <Set State name Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by state 'id' or state 'name', change the state
 *   turn duration for target.
 * - For 'id' variant, replace 'id' with the ID of the state to modify.
 * - For 'name' variant, replace 'name' with the name of the state to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple states at once.
 *
 * ---
 *
 * <param Buff Turns: +x>
 * <param Buff Turns: -x>
 *
 * <Set param Buff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' buff, change that buff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter buff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * <param Debuff Turns: +x>
 * <param Debuff Turns: -x>
 *
 * <Set param Debuff Turns: x>
 *
 * - Used for: Skill, Item Notetags
 * - If the target is affected by a 'param' debuff, change that debuff's turn
 *   duration for target.
 * - Replace 'param' with 'MaxHP', 'MaxMP', 'ATK', 'DEF', 'MAT', 'MDF', 'AGI',
 *   or 'LUK' to determine which parameter debuff to modify.
 * - Replace 'x' with the value you wish to increase, decrease, or set to.
 * - Insert multiples of this notetag to affect multiple parameters at once.
 *
 * ---
 *
 * === JavaScript Notetags: On Add/Erase/Expire ===
 *
 * Using JavaScript code, you can use create custom effects that occur when a
 * state has bee added, erased, or expired.
 * 
 * ---
 *
 * <JS On Add State>
 *  code
 *  code
 * </JS On Add State>
 *
 * - Used for: State Notetags
 * - When a state is added, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Erase State>
 *  code
 *  code
 * </JS On Erase State>
 *
 * - Used for: State Notetags
 * - When a state is erased, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * <JS On Expire State>
 *  code
 *  code
 * </JS On Expire State>
 *
 * - Used for: State Notetags
 * - When a state has expired, run the code added by this notetag.
 * - The 'user' variable refers to the current active battler.
 * - The 'target' variable refers to the battler affected by this state.
 * - The 'origin' variable refers to the one who applied this state.
 * - The 'state' variable refers to the current state being affected.
 *
 * ---
 *
 * === JavaScript Notetags: Slip Damage/Healing ===
 *
 * Slip Damage, in RPG Maker vocabulary, refers to damage over time. The
 * following notetags allow you to perform custom slip damage/healing.
 *
 * ---
 *
 * <JS type Slip Damage>
 *  code
 *  code
 *  damage = code;
 * </JS type Slip Damage>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip damage is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip damage.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the damage.
 * - The 'state' variable refers to the current state being affected.
 * - The 'damage' variable is the finalized slip damage to be dealt.
 *
 * ---
 *
 * <JS type Slip Heal>
 *  code
 *  code
 *  heal = code;
 * </JS type Slip Heal>
 *
 * - Used for: State Notetags
 * - Code used to determine how much slip healing is dealt to the affected unit
 *   during each regeneration phase.
 * - Replace 'type' with 'HP', 'MP', or 'TP'.
 * - Replace 'code' with the calculations on what to determine slip healing.
 * - The 'user' variable refers to the origin of the state.
 * - The 'target' variable refers to the affected unit receiving the healing.
 * - The 'state' variable refers to the current state being affected.
 * - The 'heal' variable is the finalized slip healing to be recovered.
 *
 * ---
 *
 * === Passive State Notetags ===
 *
 * Passive States are states that are always applied to actors and enemies
 * provided that their conditions have been met. These can be granted through
 * database objects or through the Passive States Plugin Parameters.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 *
 * <Passive State: x>
 * <Passive States: x,x,x>
 *
 * <Passive State: name>
 * <Passive States: name, name, name>
 *
 * - Used for: Actor, Class, Skill, Item, Weapon, Armor, Enemy Notetags
 * - Adds passive state(s) x to trait object, applying it to related actor or
 *   enemy unit(s).
 * - Replace 'x' with a number to determine which state to add as a passive.
 * - If using 'name' notetag variant, replace 'name' with the name of the
 *   state(s) to add as a passive.
 * - Note: If you plan on applying a passive state through a skill, it must be
 *   through a skill that has been learned by the target and not a skill that
 *   is given through a trait.
 *
 * ---
 *
 * <Passive Stackable>
 *
 * - Used for: State Notetags
 * - Makes it possible for this passive state to be added multiple times.
 * - Otherwise, only one instance of the passive state can be available.
 *
 * ---
 *
 * <Passive Condition Switch ON: x>
 *
 * <Passive Condition All Switches ON: x,x,x>
 * <Passive Condition Any Switch ON: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are ON. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are ON. Otherwise, it would not be met.
 *
 * ---
 *
 * <Passive Condition Switch OFF: x>
 *
 * <Passive Condition All Switches OFF: x,x,x>
 * <Passive Condition Any Switch OFF: x,x,x>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the passive state based on switches.
 * - Replace 'x' with the switch ID to determine the state's passive condition.
 * - If 'All' notetag variant is used, conditions will not be met until all
 *   switches are OFF. Then, it would be met.
 * - If 'Any' notetag variant is used, conditions will be met if any of the
 *   switches are OFF. Otherwise, it would not be met.
 *
 * ---
 *
 * === JavaScript Notetags: Passive State ===
 *
 * The following is a notetag made for users with JavaScript knowledge to
 * determine if a passive state's condition can be met.
 *
 * ---
 *
 * <JS Passive Condition>
 *  code
 *  code
 *  condition = code;
 * </JS Passive Condition>
 *
 * - Used for: State Notetags
 * - Determines the passive condition of the state based on JavaScript code.
 * - Replace 'code' to determine if a passive state's condition has been met.
 * - The 'condition' variable returns a boolean (true/false) to determine if
 *   the passive state's condition is met or not.
 * - The 'user' variable refers to the user affected by the passive state.
 * - The 'state' variable refers to the passive state being checked.
 * - All other passive conditions must be met for this code to count.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Skill Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust various aspects of the game regarding skills
 * from the custom Skill Menu Layout to global custom effects made in code.
 *
 * ---
 *
 * General
 * 
 *   Use Updated Layout:
 *   - Use the Updated Skill Menu Layout provided by this plugin?
 *   - This will automatically enable the Status Window.
 *
 *   Layout Style:
 *   - If using an updated layout, how do you want to style the menu scene?
 *     - Upper Help, Left Input
 *     - Upper Help, Right Input
 *     - Lower Help, Left Input
 *     - Lower Help, Right Input
 *
 * ---
 *
 * Skill Type Window
 * 
 *   Style:
 *   - How do you wish to draw commands in the Skill Type Window?
 *   - Text Only: Display only the text.
 *   - Icon Only: Display only the icon.
 *   - Icon + Text: Display the icon first, then the text.
 *   - Auto: Determine which is better to use based on the size of the cell.
 * 
 *   Text Align:
 *   - Text alignment for the Skill Type Window.
 *
 * ---
 *
 * List Window
 * 
 *   Columns:
 *   - Number of maximum columns.
 *
 * ---
 *
 * Shop Status Window
 * 
 *   Show in Skill Menu?:
 *   - Show the Shop Status Window in the Skill Menu?
 *   - This is enabled if the Updated Layout is on.
 * 
 *   Adjust List Window?:
 *   - Automatically adjust the Skill List Window in the Skill Menu if using
 *     the Shop Status Window?
 * 
 *   JS: X, Y, W, H:
 *   - Code used to determine the dimensions for this Shop Status Window in the
 *     Skill Menu.
 *
 * ---
 *
 * Skill Types
 * 
 *   Hidden Skill Types:
 *   - Insert the ID's of the Skill Types you want hidden from view ingame.
 * 
 *   Hidden During Battle:
 *   - Insert the ID's of the Skill Types you want hidden during battle only.
 * 
 *   Icon: Normal Type:
 *   - Icon used for normal skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 * 
 *   Icon: Magic Type:
 *   - Icon used for magic skill types that aren't assigned any icons.
 *   - To assign icons to skill types, simply insert \I[x] into the
 *     skill type's name in the Database > Types tab.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Skill Conditions:
 *   - JavaScript code for a global-wide skill condition check.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Skill Cost Types
 * ============================================================================
 *
 * Skill Cost Types are the resources that are used for your skills. These can
 * range from the default MP and TP resources to the newly added HP, Gold, and
 * Potion resources.
 *
 * ---
 *
 * Settings
 * 
 *   Name:
 *   - A name for this Skill Cost Type.
 * 
 *   Icon:
 *   - Icon used for this Skill Cost Type.
 *   - Use 0 for no icon.
 * 
 *   Font Color:
 *   - Text Color used to display this cost.
 *   - For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * 
 *   Font Size:
 *   - Font size used to display this cost.
 *
 * ---
 *
 * Cost Processing
 * 
 *   JS: Cost Calculation:
 *   - Code on how to calculate this resource cost for the skill.
 * 
 *   JS: Can Pay Cost?:
 *   - Code on calculating whether or not the user is able to pay the cost.
 * 
 *   JS: Paying Cost:
 *   - Code for if met, this is the actual process of paying of the cost.
 *
 * ---
 *
 * Window Display
 * 
 *   JS: Show Cost?:
 *   - Code for determining if the cost is shown or not.
 * 
 *   JS: Cost Text:
 *   - Code to determine the text (with Text Code support) used for the
 *     displayed cost.
 *
 * ---
 *
 * Gauge Display
 * 
 *   JS: Maximum Value:
 *   - Code to determine the maximum value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Current Value:
 *   - Code to determine the current value used for this Skill Cost resource
 *     for gauges.
 * 
 *   JS: Draw Gauge:
 *   - Code to determine how to draw the Skill Cost resource for this 
 *     gauge type.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General State Settings
 * ============================================================================
 *
 * These are general settings regarding RPG Maker MZ's state-related aspects
 * from how turns are reapplied to custom code that's ran whenever states are
 * added, erased, or expired.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying states.
 *   - Ignore: State doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let states go up to.
 *   - This can be changed with the <Max Turns: x> notetag.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display state turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Turn Color: Neutral:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Positive:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Negative:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Data Display
 * 
 *   Show Data?:
 *   - Display state data on top of window icons and sprites?
 * 
 *   Data Font Size:
 *   - Font size used for displaying state data.
 * 
 *   Offset X:
 *   - Offset the X position of the state data display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the state data display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is added.
 * 
 *   JS: On Erase State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     is erased.
 * 
 *   JS: On Expire State:
 *   - JavaScript code for a global-wide custom effect whenever a state
 *     has expired.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: General Buff/Debuff Settings
 * ============================================================================
 *
 * Buffs and debuffs don't count as states by RPG Maker MZ's mechanics, but
 * they do function close enough for them to be added to this plugin for
 * adjusting. Change these settings to make buffs and debuffs work to your
 * game's needs.
 *
 * ---
 *
 * General
 * 
 *   Reapply Rules:
 *   - These are the rules when reapplying buffs/debuffs.
 *   - Ignore: Buff/Debuff doesn't get added.
 *   - Reset: Turns get reset.
 *   - Greater: Turns take greater value (current vs reset).
 *   - Add: Turns add upon existing turns.
 * 
 *   Maximum Turns:
 *   - Maximum number of turns to let buffs and debuffs go up to.
 *
 * ---
 *
 * Stacking
 * 
 *   Max Stacks: Buff:
 *   - Maximum number of stacks for buffs.
 * 
 *   Max Stacks: Debuff:
 *   - Maximum number of stacks for debuffs.
 * 
 *   JS: Buff/Debuff Rate:
 *   - Code to determine how much buffs and debuffs affect parameters.
 *
 * ---
 *
 * Turn Display
 * 
 *   Show Turns?:
 *   - Display buff and debuff turns on top of window icons and sprites?
 * 
 *   Turn Font Size:
 *   - Font size used for displaying turns.
 * 
 *   Offset X:
 *   - Offset the X position of the turn display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the turn display.
 * 
 *   Turn Color: Buffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 * 
 *   Turn Color: Debuffs:
 *   - Use #rrggbb for custom colors or regular numbers for text colors from
 *     the Window Skin.
 *
 * ---
 *
 * Rate Display
 * 
 *   Show Rate?:
 *   - Display buff and debuff rate on top of window icons and sprites?
 * 
 *   Rate Font Size:
 *   - Font size used for displaying rate.
 * 
 *   Offset X:
 *   - Offset the X position of the rate display.
 * 
 *   Offset Y:
 *   - Offset the Y position of the rate display.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: On Add Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Add Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Erase Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Erase Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 * 
 *   JS: On Expire Buff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     buff is added.
 * 
 *   JS: On Expire Debuff:
 *   - JavaScript code for a global-wide custom effect whenever a
 *     debuff is added.
 *
 * ---
 *
 * ============================================================================
 * Plugin Parameters: Passive State Settings
 * ============================================================================
 *
 * These Plugin Parameters adjust passive states that can affect all actors and
 * enemies as well as have global conditions.
 * 
 * ---
 * 
 * For those using the code "a.isStateAffected(10)" to check if a target is
 * affected by a state or not, this does NOT check passive states. This only
 * checks for states that were directly applied to the target.
 * 
 * Instead, use "a.states().includes($dataStates[10])" to check for them. This
 * code will search for both directly applied states and passive states alike.
 *
 * ---
 *
 * ---
 *
 * List
 * 
 *   Global Passives:
 *   - A list of passive states to affect actors and enemies.
 * 
 *   Actor-Only Passives:
 *   - A list of passive states to affect actors only.
 * 
 *   Enemy Passives:
 *   - A list of passive states to affect enemies only.
 *
 * ---
 *
 * Global JS Effects
 * 
 *   JS: Condition Check:
 *   - JavaScript code for a global-wide passive condition check.
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
 * ** Passive states from Elements & Status Menu Core are now functional.
 *    Fix made by Olivia.
 * * Compatibility Update
 * ** Extended functions to allow for better compatibility.
 * * Updated documentation
 * ** Explains that passive states are not directly applied and are therefore
 *    not affected by code such as "a.isStateAffected(10)".
 * ** Instead, use "a.states().includes($dataStates[10])"
 * ** "Use #rrggbb for a hex color." lines now replaced with
 *    "For a hex color, use #rrggbb with VisuMZ_1_MessageCore"
 *
 * Version 1.00:
 * * Finished Plugin!
 *
 * ============================================================================
 * End of Helpfile
 * ============================================================================
 *
 * @ ==========================================================================
 * @ Plugin Parameters
 * @ ==========================================================================
 *
 * @param BreakHead
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param SkillsStatesCore
 * @default Plugin Parameters
 *
 * @param ATTENTION
 * @default READ THE HELP FILE
 *
 * @param BreakSettings
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param Skills:struct
 * @text Skill Settings
 * @type struct<Skills>
 * @desc Adjust general skill settings here.
 * @default {"General":"","EnableLayout:eval":"true","LayoutStyle:str":"upper/left","SkillTypeWindow":"","CmdStyle:str":"auto","CmdTextAlign:str":"left","ListWindow":"","ListWindowCols:num":"1","ShopStatusWindow":"","ShowShopStatus:eval":"true","SkillSceneAdjustSkillList:eval":"true","SkillMenuStatusRect:func":"\"const ww = this.shopStatusWidth();\\nconst wh = this._itemWindow.height;\\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\\nconst wy = this._itemWindow.y;\\nreturn new Rectangle(wx, wy, ww, wh);\"","SkillTypes":"","HiddenSkillTypes:arraynum":"[]","BattleHiddenSkillTypes:arraynum":"[]","IconStypeNorm:num":"78","IconStypeMagic:num":"79","CustomJS":"","SkillConditionJS:func":"\"// Declare Variables\\nconst skill = arguments[0];\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet enabled = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn enabled;\""}
 *
 * @param Costs:arraystruct
 * @text Skill Cost Types
 * @parent Skills:struct
 * @type struct<Cost>[]
 * @desc A list of all the skill cost types added by this plugin
 * and the code that controls them in-game.
 * @default ["{\"Name:str\":\"HP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"20\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<HP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mhp / 100);\\\\n}\\\\nif (note.match(/<JS HP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS HP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<HP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<HP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<HP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<HP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nif (cost <= 0) {\\\\n    return true;\\\\n} else {\\\\n    return user._hp > cost;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._hp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.hp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mhp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.hp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.hpGaugeColor1();\\\\nconst color2 = ColorManager.hpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.hpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.hpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"MP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"23\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = Math.floor(skill.mpCost * user.mcr);\\\\nif (note.match(/<MP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.mmp / 100);\\\\n}\\\\nif (note.match(/<JS MP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS MP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<MP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<MP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<MP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<MP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._mp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._mp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.mp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mmp;\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.mp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.mpGaugeColor1();\\\\nconst color2 = ColorManager.mpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.mpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.mpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"TP\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"29\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\ncost = skill.tpCost;\\\\nif (note.match(/<TP COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * user.maxTp() / 100);\\\\n}\\\\nif (note.match(/<JS TP COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS TP COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<TP COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<TP COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<TP COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<TP COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn user._tp >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\nuser._tp -= cost;\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.tp;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.maxTp();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn user.tp;\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.tpGaugeColor1();\\\\nconst color2 = ColorManager.tpGaugeColor2();\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.tpA;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.tpColor(user);\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Gold\",\"Settings\":\"\",\"Icon:num\":\"0\",\"FontColor:str\":\"17\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<GOLD COST:[ ](\\\\\\\\d+)([%％])>/i)) {\\\\n    cost += Math.ceil(Number(RegExp.$1) * $gameParty.gold() / 100);\\\\n}\\\\nif (note.match(/<JS GOLD COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS GOLD COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<GOLD COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<GOLD COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<GOLD COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<GOLD COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn $gameParty.gold() >= cost;\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Process Payment\\\\n$gameParty.loseGold(cost);\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = TextManager.currencyUnit;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '%1 %2'.format(cost, name);\\\\n\\\\n// Text: Add Icon\\\\nif (icon  > 0) {\\\\n    text += '\\\\\\\\\\\\\\\\I[%1]'.format(icon);\\\\n}\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxGold();\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\n\\\\n// Return value\\\\nreturn $gameParty.gold();\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Label\\\\nconst label = TextManager.currencyUnit;\\\\nconst lx = 4;\\\\nconst ly = 0;\\\\nconst lw = sprite.bitmapWidth();\\\\nconst lh = sprite.bitmapHeight();\\\\nsprite.setupLabelFont();\\\\nbitmap.paintOpacity = 255;\\\\nbitmap.drawText(label, lx, ly, lw, lh, \\\\\\\"left\\\\\\\");\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}","{\"Name:str\":\"Potion\",\"Settings\":\"\",\"Icon:num\":\"176\",\"FontColor:str\":\"0\",\"FontSize:num\":\"22\",\"Cost\":\"\",\"CalcJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nlet cost = 0;\\\\n\\\\n// Calculations\\\\nconst note = skill.note;\\\\nif (note.match(/<POTION COST:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost += Number(RegExp.$1);\\\\n}\\\\nif (note.match(/<JS POTION COST>\\\\\\\\s*([\\\\\\\\s\\\\\\\\S]*)\\\\\\\\s*<\\\\\\\\/JS POTION COST>/i)) {\\\\n    const code = String(RegExp.$1);\\\\n    eval(code);\\\\n}\\\\n\\\\n// Apply Trait Cost Alterations\\\\nif (cost > 0) {\\\\n    const rateNote = /<POTION COST:[ ](\\\\\\\\d+\\\\\\\\.?\\\\\\\\d*)([%％])>/i;\\\\n    const rates = user.traitObjects().map((obj) => (obj && obj.note.match(rateNote) ? Number(RegExp.$1) / 100 : 1));\\\\n    const flatNote = /<POTION COST:[ ]([\\\\\\\\+\\\\\\\\-]\\\\\\\\d+)>/i;\\\\n    const flats = user.traitObjects().map((obj) => (obj && obj.note.match(flatNote) ? Number(RegExp.$1) : 0));\\\\n    cost = rates.reduce((r, rate) => r * rate, cost);\\\\n    cost = flats.reduce((r, flat) => r + flat, cost);\\\\n    cost = Math.max(1, cost);\\\\n}\\\\n\\\\n// Set Cost Limits\\\\nif (note.match(/<POTION COST MAX:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.min(cost, Number(RegExp.$1));\\\\n}\\\\nif (note.match(/<POTION COST MIN:[ ](\\\\\\\\d+)>/i)) {\\\\n    cost = Math.max(cost, Number(RegExp.$1));\\\\n}\\\\n\\\\n// Return cost value\\\\nreturn Math.round(Math.max(0, cost));\\\"\",\"CanPayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return Boolean\\\\nif (user.isActor() && cost > 0) {\\\\n    return $gameParty.numItems(item) >= cost;\\\\n} else {\\\\n    return true;\\\\n}\\\"\",\"PayJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst item = $dataItems[7];\\\\n\\\\n// Process Payment\\\\nif (user.isActor()) {\\\\n    $gameParty.loseItem(item, cost);\\\\n}\\\"\",\"Windows\":\"\",\"ShowJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\n\\\\n// Return Boolean\\\\nreturn cost > 0;\\\"\",\"TextJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\nconst skill = arguments[0];\\\\nconst cost = arguments[1];\\\\nconst settings = arguments[2];\\\\nconst fontSize = settings.FontSize;\\\\nconst color = settings.FontColor;\\\\nconst name = settings.Name;\\\\nconst icon = settings.Icon;\\\\nlet text = '';\\\\n\\\\n// Text: Change Font Size\\\\ntext += '\\\\\\\\\\\\\\\\FS[%1]'.format(fontSize);\\\\n\\\\n// Text: Add Color\\\\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\\\\n    text += '\\\\\\\\\\\\\\\\HexColor<#%1>'.format(String(RegExp.$1));\\\\n} else {\\\\n    text += '\\\\\\\\\\\\\\\\C[%1]'.format(color);\\\\n}\\\\n\\\\n// Text: Add Cost\\\\ntext += '×%1'.format(cost);\\\\n\\\\n// Text: Add Icon\\\\ntext += '\\\\\\\\\\\\\\\\I[%1]'.format(item.iconIndex);\\\\n\\\\n// Return text\\\\nreturn text;\\\"\",\"Gauges\":\"\",\"GaugeMaxJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.maxItems(item);\\\"\",\"GaugeCurrentJS:func\":\"\\\"// Declare Variables\\\\nconst user = this;\\\\nconst item = $dataItems[7];\\\\n\\\\n// Return value\\\\nreturn $gameParty.numItems(item);\\\"\",\"GaugeDrawJS:func\":\"\\\"// Declare Variables\\\\nconst sprite = this;\\\\nconst settings = sprite._costSettings;\\\\nconst bitmap = sprite.bitmap;\\\\nconst user = sprite._battler;\\\\nconst item = $dataItems[7];\\\\nconst currentValue = sprite.currentDisplayedValue();\\\\n\\\\n// Draw Gauge\\\\nconst color1 = ColorManager.textColor(30);\\\\nconst color2 = ColorManager.textColor(31);\\\\nconst gx = 0;\\\\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\\\\nconst gw = sprite.bitmapWidth() - gx;\\\\nconst gh = sprite.gaugeHeight();\\\\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\\\\n\\\\n// Draw Icon\\\\nconst iconIndex = item.iconIndex;\\\\nconst iconBitmap = ImageManager.loadSystem(\\\\\\\"IconSet\\\\\\\");\\\\nconst pw = ImageManager.iconWidth;\\\\nconst ph = ImageManager.iconHeight;\\\\nconst sx = (iconIndex % 16) * pw;\\\\nconst sy = Math.floor(iconIndex / 16) * ph;\\\\nbitmap.blt(iconBitmap, sx, sy, pw, ph, 0, 0, 24, 24);\\\\n\\\\n// Draw Value\\\\nconst vw = sprite.bitmapWidth() - 2;\\\\nconst vh = sprite.bitmapHeight();\\\\nsprite.setupValueFont();\\\\nbitmap.textColor = ColorManager.normalColor();\\\\nbitmap.drawText(currentValue, 0, 0, vw, vh, \\\\\\\"right\\\\\\\");\\\"\"}"]
 *
 * @param BreakSkills
 * @text --------------------------
 * @default ----------------------------------
 *
 * @param States:struct
 * @text State Settings
 * @type struct<States>
 * @desc Adjust general state settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorNeutral:str":"0","ColorPositive:str":"24","ColorNegative:str":"27","Data":"","ShowData:eval":"true","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\"","onEraseStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireStateJS:func":"\"// Declare Variables\\nconst stateId = arguments[0];\\nconst origin = this.getStateOrigin(stateId);\\nconst state = $dataStates[stateId];\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param Buffs:struct
 * @text Buff/Debuff Settings
 * @parent States:struct
 * @type struct<Buffs>
 * @desc Adjust general buff/debuff settings here.
 * @default {"General":"","ReapplyRules:str":"greater","MaxTurns:num":"99","Stacking":"","StackBuffMax:num":"2","StackDebuffMax:num":"2","MultiplierJS:func":"\"// Declare Variables\\nconst user = this;\\nconst paramId = arguments[0];\\nconst buffLevel = arguments[1];\\nlet rate = 1;\\n\\n// Perform Calculations\\nrate += buffLevel * 0.25;\\n\\n// Return Rate\\nreturn Math.max(0, rate);\"","Turns":"","ShowTurns:eval":"true","TurnFontSize:num":"16","TurnOffsetX:num":"-4","TurnOffsetY:num":"-6","ColorBuff:str":"24","ColorDebuff:str":"27","Data":"","ShowData:eval":"false","DataFontSize:num":"12","DataOffsetX:num":"0","DataOffsetY:num":"8","CustomJS":"","onAddBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onAddDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onEraseDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireBuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\"","onExpireDebuffJS:func":"\"// Declare Variables\\nconst paramId = arguments[0];\\nconst modifier = this._buffs[paramId];\\nconst origin = this.getCurrentStateActiveUser();\\nconst user = this.getCurrentStateActiveUser();\\nconst target = this;\\nconst a = origin;\\nconst b = this;\\n\\n// Perform Actions\\n\""}
 *
 * @param PassiveStates:struct
 * @text Passive States
 * @parent States:struct
 * @type struct<PassiveStates>
 * @desc Adjust passive state settings here.
 * @default {"List":"","Global:arraynum":"[]","Actor:arraynum":"[]","Enemy:arraynum":"[]","CustomJS":"","PassiveConditionJS:func":"\"// Declare Variables\\nconst state = arguments[0];\\nconst stateId = state.id;\\nconst user = this;\\nconst target = this;\\nconst a = this;\\nconst b = this;\\nlet condition = true;\\n\\n// Perform Checks\\n\\n\\n// Return boolean\\nreturn condition;\""}
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
 * General Skill Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Skills:
 *
 * @param General
 *
 * @param EnableLayout:eval
 * @text Use Updated Layout
 * @parent General
 * @type boolean
 * @on Use
 * @off Don't Use
 * @desc Use the Updated Skill Menu Layout provided by this plugin?
 * This will automatically enable the Status Window.
 * @default true
 *
 * @param LayoutStyle:str
 * @text Layout Style
 * @parent General
 * @type select
 * @option Upper Help, Left Input
 * @value upper/left
 * @option Upper Help, Right Input
 * @value upper/right
 * @option Lower Help, Left Input
 * @value lower/left
 * @option Lower Help, Right Input
 * @value lower/right
 * @desc If using an updated layout, how do you want to style
 * the menu scene layout?
 * @default upper/left
 *
 * @param SkillTypeWindow
 * @text Skill Type Window
 *
 * @param CmdStyle:str
 * @text Style
 * @parent SkillTypeWindow
 * @type select
 * @option Text Only
 * @value text
 * @option Icon Only
 * @value icon
 * @option Icon + Text
 * @value iconText
 * @option Automatic
 * @value auto
 * @desc How do you wish to draw commands in the Skill Type Window?
 * @default auto
 *
 * @param CmdTextAlign:str
 * @text Text Align
 * @parent SkillTypeWindow
 * @type combo
 * @option left
 * @option center
 * @option right
 * @desc Text alignment for the Skill Type Window.
 * @default left
 *
 * @param ListWindow
 * @text List Window
 *
 * @param ListWindowCols:num
 * @text Columns
 * @parent ListWindow
 * @type number
 * @min 1
 * @desc Number of maximum columns.
 * @default 1
 *
 * @param ShopStatusWindow
 * @text Shop Status Window
 *
 * @param ShowShopStatus:eval
 * @text Show in Skill Menu?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Show
 * @off Don't Show
 * @desc Show the Shop Status Window in the Skill Menu?
 * This is enabled if the Updated Layout is on.
 * @default true
 *
 * @param SkillSceneAdjustSkillList:eval
 * @text Adjust List Window?
 * @parent ShopStatusWindow
 * @type boolean
 * @on Adjust
 * @off Don't
 * @desc Automatically adjust the Skill List Window in the Skill Menu if using the Shop Status Window?
 * @default true
 *
 * @param SkillMenuStatusRect:func
 * @text JS: X, Y, W, H
 * @parent ShopStatusWindow
 * @type note
 * @desc Code used to determine the dimensions for this Shop Status Window in the Skill Menu.
 * @default "const ww = this.shopStatusWidth();\nconst wh = this._itemWindow.height;\nconst wx = Graphics.boxWidth - this.shopStatusWidth();\nconst wy = this._itemWindow.y;\nreturn new Rectangle(wx, wy, ww, wh);"
 *
 * @param SkillTypes
 * @text Skill Types
 *
 * @param HiddenSkillTypes:arraynum
 * @text Hidden Skill Types
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden from view ingame.
 * @default []
 *
 * @param BattleHiddenSkillTypes:arraynum
 * @text Hidden During Battle
 * @parent SkillTypes
 * @type number[]
 * @min 1
 * @max 99
 * @desc Insert the ID's of the Skill Types you want hidden during battle only.
 * @default []
 *
 * @param IconStypeNorm:num
 * @text Icon: Normal Type
 * @parent SkillTypes
 * @desc Icon used for normal skill types that aren't assigned any icons.
 * @default 78
 *
 * @param IconStypeMagic:num
 * @text Icon: Magic Type
 * @parent SkillTypes
 * @desc Icon used for magic skill types that aren't assigned any icons.
 * @default 79
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param SkillConditionJS:func
 * @text JS: Skill Conditions
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide skill condition check.
 * @default "// Declare Variables\nconst skill = arguments[0];\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet enabled = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn enabled;"
 *
 */
/* ----------------------------------------------------------------------------
 * Skill Cost Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Cost:
 *
 * @param Name:str
 * @text Name
 * @desc A name for this Skill Cost Type.
 * @default Untitled
 *
 * @param Settings
 *
 * @param Icon:num
 * @text Icon
 * @parent Settings
 * @desc Icon used for this Skill Cost Type.
 * Use 0 for no icon.
 * @default 0
 *
 * @param FontColor:str
 * @text Font Color
 * @parent Settings
 * @desc Text Color used to display this cost.
 * For a hex color, use #rrggbb with VisuMZ_1_MessageCore
 * @default 0
 *
 * @param FontSize:num
 * @text Font Size
 * @parent Settings
 * @type number
 * @min 1
 * @desc Font size used to display this cost.
 * @default 22
 *
 * @param Cost
 * @text Cost Processing
 *
 * @param CalcJS:func
 * @text JS: Cost Calculation
 * @parent Cost
 * @type note
 * @desc Code on how to calculate this resource cost for the skill.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nlet cost = 0;\n\n// Return cost value\nreturn Math.round(Math.max(0, cost));"
 *
 * @param CanPayJS:func
 * @text JS: Can Pay Cost?
 * @parent Cost
 * @type note
 * @desc Code on calculating whether or not the user is able to pay the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn true;"
 *
 * @param PayJS:func
 * @text JS: Paying Cost
 * @parent Cost
 * @type note
 * @desc Code for if met, this is the actual process of paying of the cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Process Payment\n"
 *
 * @param Windows
 * @text Window Display
 *
 * @param ShowJS:func
 * @text JS: Show Cost?
 * @parent  Windows
 * @type note
 * @desc Code for determining if the cost is shown or not.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\n\n// Return Boolean\nreturn cost > 0;"
 *
 * @param TextJS:func
 * @text JS: Cost Text
 * @parent  Windows
 * @type note
 * @desc Code to determine the text (with Text Code support) used for the displayed cost.
 * @default "// Declare Variables\nconst user = this;\nconst skill = arguments[0];\nconst cost = arguments[1];\nconst settings = arguments[2];\nconst fontSize = settings.FontSize;\nconst color = settings.FontColor;\nconst name = settings.Name;\nconst icon = settings.Icon;\nlet text = '';\n\n// Text: Change Font Size\ntext += '\\\\FS[%1]'.format(fontSize);\n\n// Text: Add Color\nif (color.match(/#(.*)/i) && Imported.VisuMZ_1_MessageCore) {\n    text += '\\\\HexColor<#%1>'.format(String(RegExp.$1));\n} else {\n    text += '\\\\C[%1]'.format(color);\n}\n\n// Text: Add Cost\ntext += '%1 %2'.format(cost, name);\n\n// Text: Add Icon\nif (icon  > 0) {\n    text += '\\\\I[%1]'.format(icon);\n}\n\n// Return text\nreturn text;"
 *
 * @param Gauges
 * @text Gauge Display
 *
 * @param GaugeMaxJS:func
 * @text JS: Maximum Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the maximum value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeCurrentJS:func
 * @text JS: Current Value
 * @parent  Gauges
 * @type note
 * @desc Code to determine the current value used for this Skill Cost resource for gauges.
 * @default "// Declare Variables\nconst user = this;\n\n// Return value\nreturn 0;"
 *
 * @param GaugeDrawJS:func
 * @text JS: Draw Gauge
 * @parent  Gauges
 * @type note
 * @desc Code to determine how to draw the Skill Cost resource for this gauge type.
 * @default "// Declare Variables\nconst sprite = this;\nconst settings = sprite._costSettings;\nconst bitmap = sprite.bitmap;\nconst user = sprite._battler;\nconst currentValue = sprite.currentDisplayedValue();\n\n// Draw Gauge\nconst color1 = ColorManager.textColor(30);\nconst color2 = ColorManager.textColor(31);\nconst gx = 0;\nconst gy = sprite.bitmapHeight() - sprite.gaugeHeight();\nconst gw = sprite.bitmapWidth() - gx;\nconst gh = sprite.gaugeHeight();\nthis.drawFullGauge(color1, color2, gx, gy, gw, gh);\n\n// Draw Label\nconst label = settings.Name;\nconst lx = 4;\nconst ly = 0;\nconst lw = sprite.bitmapWidth();\nconst lh = sprite.bitmapHeight();\nsprite.setupLabelFont();\nbitmap.paintOpacity = 255;\nbitmap.drawText(label, lx, ly, lw, lh, \"left\");\n\n// Draw Value\nconst vw = sprite.bitmapWidth() - 2;\nconst vh = sprite.bitmapHeight();\nsprite.setupValueFont();\nbitmap.textColor = ColorManager.normalColor();\nbitmap.drawText(currentValue, 0, 0, vw, vh, \"right\");"
 *
 */
/* ----------------------------------------------------------------------------
 * General State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~States:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: State doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying states.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let states go up to.
 * This can be changed with the <Max Turns: x> notetag.
 * @default 9999
 *
 * @param Turns
 * @text Turn Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param ColorNeutral:str
 * @text Turn Color: Neutral
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 0
 *
 * @param ColorPositive:str
 * @text Turn Color: Positive
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorNegative:str
 * @text Turn Color: Negative
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Data Display
 *
 * @param ShowData:eval
 * @text Show Data?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display state data on top of window icons and sprites?
 * @default true
 *
 * @param DataFontSize:num
 * @text Data Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying state data.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the state data display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the state data display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddStateJS:func
 * @text JS: On Add State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is added.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseStateJS:func
 * @text JS: On Erase State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state is erased.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireStateJS:func
 * @text JS: On Expire State
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * state has expired.
 * @default "// Declare Variables\nconst stateId = arguments[0];\nconst origin = this.getStateOrigin(stateId);\nconst state = $dataStates[stateId];\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * General Buff/Debuff Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~Buffs:
 *
 * @param General
 *
 * @param ReapplyRules:str
 * @text Reapply Rules
 * @parent General
 * @type select
 * @option Ignore: Buff/Debuff doesn't get added.
 * @value ignore
 * @option Reset: Turns get reset.
 * @value reset
 * @option Greater: Turns take greater value (current vs reset).
 * @value greater
 * @option Add: Turns add upon existing turns.
 * @value add
 * @desc These are the rules when reapplying buffs/debuffs.
 * @default greater
 *
 * @param MaxTurns:num
 * @text Maximum Turns
 * @parent General
 * @type number
 * @min 1
 * @desc Maximum number of turns to let buffs and debuffs go up to.
 * @default 9999
 *
 * @param Stacking
 *
 * @param StackBuffMax:num
 * @text Max Stacks: Buff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for buffs.
 * @default 2
 *
 * @param StackDebuffMax:num
 * @text Max Stacks: Debuff
 * @parent Stacking
 * @type number
 * @min 1
 * @desc Maximum number of stacks for debuffs.
 * @default 2
 *
 * @param MultiplierJS:func
 * @text JS: Buff/Debuff Rate
 * @parent Stacking
 * @type note
 * @desc Code to determine how much buffs and debuffs affect parameters.
 * @default "// Declare Variables\nconst user = this;\nconst paramId = arguments[0];\nconst buffLevel = arguments[1];\nlet rate = 1;\n\n// Perform Calculations\nrate += buffLevel * 0.25;\n\n// Return Rate\nreturn Math.max(0, rate);"
 *
 * @param Turns
 * @text Turns Display
 *
 * @param ShowTurns:eval
 * @text Show Turns?
 * @parent Turns
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff turns on top of window icons and sprites?
 * @default true
 *
 * @param TurnFontSize:num
 * @text Turn Font Size
 * @parent Turns
 * @type number
 * @min 1
 * @desc Font size used for displaying turns.
 * @default 16
 *
 * @param TurnOffsetX:num
 * @text Offset X
 * @parent Turns
 * @desc Offset the X position of the turn display.
 * @default -4
 *
 * @param TurnOffsetY:num
 * @text Offset Y
 * @parent Turns
 * @desc Offset the Y position of the turn display.
 * @default -6
 *
 * @param ColorBuff:str
 * @text Turn Color: Buffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 24
 *
 * @param ColorDebuff:str
 * @text Turn Color: Debuffs
 * @parent Turns
 * @desc Use #rrggbb for custom colors or regular numbers
 * for text colors from the Window Skin.
 * @default 27
 *
 * @param Data
 * @text Rate Display
 *
 * @param ShowData:eval
 * @text Show Rate?
 * @parent Data
 * @type boolean
 * @on Display
 * @off Hide
 * @desc Display buff and debuff rate on top of window icons and sprites?
 * @default false
 *
 * @param DataFontSize:num
 * @text Rate Font Size
 * @parent Data
 * @type number
 * @min 1
 * @desc Font size used for displaying rate.
 * @default 12
 *
 * @param DataOffsetX:num
 * @text Offset X
 * @parent Data
 * @desc Offset the X position of the rate display.
 * @default 0
 *
 * @param DataOffsetY:num
 * @text Offset Y
 * @parent Data
 * @desc Offset the Y position of the rate display.
 * @default 8
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param onAddBuffJS:func
 * @text JS: On Add Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onAddDebuffJS:func
 * @text JS: On Add Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is added.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseBuffJS:func
 * @text JS: On Erase Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onEraseDebuffJS:func
 * @text JS: On Erase Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff is erased.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireBuffJS:func
 * @text JS: On Expire Buff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * buff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 * @param onExpireDebuffJS:func
 * @text JS: On Expire Debuff
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide custom effect whenever a
 * debuff has expired.
 * @default "// Declare Variables\nconst paramId = arguments[0];\nconst modifier = this._buffs[paramId];\nconst origin = this.getCurrentStateActiveUser();\nconst user = this.getCurrentStateActiveUser();\nconst target = this;\nconst a = origin;\nconst b = this;\n\n// Perform Actions\n"
 *
 */
/* ----------------------------------------------------------------------------
 * Passive State Settings
 * ----------------------------------------------------------------------------
 */
/*~struct~PassiveStates:
 *
 * @param List
 *
 * @param Global:arraynum
 * @text Global Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors and enemies.
 * @default []
 *
 * @param Actor:arraynum
 * @text Actor-Only Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect actors only.
 * @default []
 *
 * @param Enemy:arraynum
 * @text Enemy Passives
 * @parent List
 * @type state[]
 * @desc A list of passive states to affect enemies only.
 * @default []
 *
 * @param CustomJS
 * @text Global JS Effects
 *
 * @param PassiveConditionJS:func
 * @text JS: Condition Check
 * @parent CustomJS
 * @type note
 * @desc JavaScript code for a global-wide passive condition check.
 * @default "// Declare Variables\nconst state = arguments[0];\nconst stateId = state.id;\nconst user = this;\nconst target = this;\nconst a = this;\nconst b = this;\nlet condition = true;\n\n// Perform Checks\n\n\n// Return boolean\nreturn condition;"
 *
 */
//=============================================================================

const _0x584f=['HfzgK','FYisn','overwriteBuffTurns','_stateIDs','regenerateAllSkillsStatesCore','isUseSkillsStatesCoreUpdatedLayout','createCommandNameWindow','ScGzw','buffIconIndex','Window_SkillStatus_refresh','onEraseStateGlobalJS','ymFLZ','gHTBT','ANY','getSkillIdWithName','learnSkill','setActor','getColor','stateAddJS','myjJp','eraseState','UyvGK','Game_BattlerBase_initMembers','ShowData','onEraseDebuffGlobalJS','onAddStateGlobalJS','ignore','clearStates','KZZps','onRegenerateCustomStateDamageOverTime','debuffColor','SkillMenuStatusRect','stateExpireJS','states','checkCacheKey','adjustItemWidthByShopStatus','PassiveConditionJS','drawActorBuffRates','onExpireState','skillEnableJS','<member-%1>','uiInputPosition','reset','paramBuffRate','fQsWs','SkillSceneAdjustSkillList','gainHp','commandNameWindowDrawBackground','Window_SkillList_maxCols','DEF','_cache','onEraseDebuffJS','itemTextAlign','isBuffAffected','StWLK','tGtgE','onExpireDebuffJS','getCurrentStateActiveUser','textSizeEx','_stypeId','iCrYm','stateTpSlipDamageJS','mJKUw','%1%','Rwftc','item','_shopStatusWindow','forgetSkill','refresh','updatedLayoutStyle','asBDq','getStateDisplay','none','status','NUM','uiHelpPosition','_stored_state-%1-color','lineHeight','RkNVq','VlSMD','FUNC','statesByCategory','toLowerCase','LuFjk','TurnFontSize','gainSilentTp','CCoru','tmLXE','helpWindowRectSkillsStatesCore','addPassiveStatesFromOtherPlugins','isUseModernControls','LuuEY','addDebuffTurns','FQLcn','iAnAW','DataFontSize','<enemy-%1>','RbAod','sfELf','changeOutlineColor','clear','convertGaugeTypeSkillsStatesCore','isPassiveStateStackable','VTskO','Sprite_Gauge_initMembers','initMembers','colSpacing','addBuff','setDebuffTurns','mUiwV','tpCost','stateHpSlipDamageJS','statePassiveConditionJS','checkSkillConditionsNotetags','skillId','MfdLH','ARRAYFUNC','pQfUX','_stypeIDs','iconText','clearStateOrigin','aLsah','ymfaH','IconStypeNorm','sElpv','LUK','_animationIndex','onRemoveState','Game_Troop_setup','greater','onAddStateMakeCustomSlipValues','slipMp','MultiplierJS','die','_scene','slipHp','removeState','Fcflb','QGuiD','ABpzs','RLIbQ','text','setup','Game_Unit_isAllDead','YWUPO','ukYLy','meetsStateCondition','uPlmB','slipTp','inBattle','icon','GroupDigits','Game_Actor_learnSkill','useDigitGrouping','addDebuff','innerHeight','LayoutStyle','onAddState','Fmweq','ReapplyRules','CmdTextAlign','Game_BattlerBase_eraseBuff','IYorq','meetsPassiveStateConditionSwitches','includes','onAddDebuffJS','_stateTurns','TEHZJ','drawActorIconsAllTurnCounters','DataOffsetX','clearStateRetainType','center','Game_BattlerBase_buffIconIndex','stateHpSlipHealJS','Window_SkillList_setActor','setStateTurns','Game_Battler_addDebuff','makeSuccess','Game_BattlerBase_resetStateCounts','XUyYT','FjoDM','getStateReapplyRulings','XakYj','gguAX','skillMpCost','updateFrame','taKul','TpwFY','buffTurns','_colorCache','removeStatesByCategory','commandStyleCheck','onAddStateCustomJS','checkShowHideSkillNotetags','round','TurnOffsetX','onAddStateJS','PayJS','buttonAssistSwitch','applySkillsStatesCoreEffects','JFVGe','setStateRetainType','VFpeX','yPcNN','isBuffOrDebuffAffected','%1\x20is\x20incorrectly\x20placed\x20on\x20the\x20plugin\x20list.\x0aIt\x20is\x20a\x20Tier\x20%2\x20plugin\x20placed\x20over\x20other\x20Tier\x20%3\x20plugins.\x0aPlease\x20reorder\x20the\x20plugin\x20list\x20from\x20smallest\x20to\x20largest\x20tier\x20numbers.','StackDebuffMax','gJVGA','filter','hasState','canUse','<actor-%1>','Sprite_Gauge_gaugeRate','skillTypes','parse','ELfMD','Ixhmm','Buffs','pqgfE','fontSize','Game_BattlerBase_eraseState','ARRAYJSON','floor','Game_BattlerBase_recoverAll','Game_Battler_addBuff','push','isBottomHelpMode','rgba(0,\x200,\x200,\x201)','UhgXe','qYEda','isAllDead','WoMYK','_subject','currentClass','Scene_Skill_skillTypeWindowRect','ColorNegative','buff','contents','gradientFillRect','bNZTn','prototype','_stateOrigin','_battler','QYFPs','txmyB','fjXpa','isSkillCostShown','shopStatusWindowRectSkillsStatesCore','log','normalColor','isRightInputMode','includesSkillsStatesCore','name','DisplayedParams','meetsPassiveStateConditionJS','Game_BattlerBase_meetsSkillConditions','MaxTurns','boxWidth','YkKcR','Game_Battler_addState','Game_Actor_forgetSkill','regenerateAll','innerWidth','FWEsr','commandStyle','format','bwDLK','createTurnDisplaySprite','helpAreaHeight','maxItems','onEraseBuffGlobalJS','_buffTurns','isStateAffected','jWfOW','value','bfaxB','EVAL','checkSkillConditionsSwitchNotetags','uYhxN','onEraseBuff','categories','bitmap','isGroupDefeatStateAffected','helpAreaTop','Scene_Skill_createItemWindow','OxXSC','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20%2\x20=\x200;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20%2\x20=\x20Math.round(Math.max(0,\x20%2)\x20*\x20%3);\x0a\x20\x20\x20\x20\x20\x20\x20\x20this.setStateData(stateId,\x20\x27%4\x27,\x20%2);\x0a\x20\x20\x20\x20','onAddDebuff','sWnyV','skillTpCost','resetFontSettings','ATK','ColorDebuff','mainFontFace','width','MAT','setStateOrigin','JXkMc','UxdAr','loadBitmap','process_VisuMZ_SkillsStatesCore_Skill_Notetags','redrawSkillsStatesCore','length','whjRj','process_VisuMZ_SkillsStatesCore_Notetags','<troop-%1>','ListWindowCols','opacity','_statusWindow','applyDebuffTurnManipulationEffects','recoverAll','addWindow','paramValueByName','\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20let\x20condition\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20return\x20condition;\x0a\x20\x20\x20\x20\x20\x20\x20\x20','SemDR','itemWindowRect','death','#%1','getCurrentStateOriginKey','sKxqD','Param','_turnDisplaySprite','isLearnedSkill','tOsuM','isPlaytest','version','ORqRu','debuffTurns','Game_BattlerBase_overwriteBuffTurns','iconWidth','VisuMZ_1_ElementStatusCore','onExpireStateCustomJS','onExpireBuffGlobalJS','VisuMZ_0_CoreEngine','resetTextColor','clearStateData','getStateData','number','_stateRetainType','redraw','_skillIDs','drawSkillCost','maxCols','magicSkills','CmdStyle','fSIZy','gaugeBackColor','UxyYR','nExuy','passiveStates','isBuffExpired','Game_BattlerBase_increaseBuff','mLSbb','setBuffTurns','DsrZv','fillRect','Enemy','\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20origin\x20=\x20this.getStateOrigin(stateId);\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20state\x20=\x20$dataStates[stateId];\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this.getCurrentStateActiveUser();\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20origin;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20','equips','buffLength','drawExtendedSkillsStatesCoreStatus','CalcJS','EnableLayout','Sprite_Gauge_currentMaxValue','replace','dGrmk','enemy','Game_BattlerBase_die','yIiRU','currentDisplayedValue','statusWidth','checkShowHideBattleNotetags','maxSlipDamage','States','SWDpx','Game_BattlerBase_states','RUZhX','onAddDebuffGlobalJS','auto','Costs','Game_Action_applyItemUserEffect','nmyZp','drawItemStyleIcon','call','SDBHL','priority','max','stateMpSlipHealJS','\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20enabled\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20enabled;\x0a\x20\x20\x20\x20','increaseBuff','retrieveStateColor','ConvertParams','ARRAYNUM','itemLineRect','WaWGG','meetsSkillConditionsEnableJS','Game_Actor_skillTypes','elyVi','onExpireBuffJS','getSkillTypes','XFZog','XLbXH','user','VfRNo','resetStateCounts','Window_StatusBase_placeGauge','VisuMZ_1_ItemsEquipsCore','BattleHiddenSkillTypes','EoYGf','TUhUt','ZHmcC','meetsSkillConditions','vpylF','oTHmu','Skills','mainAreaHeight','TurnOffsetY','MNGVU','Sprite_Gauge_currentValue','Gpzrg','_stateMaxTurns','getCurrentTroopUniqueID','updateHelp','_stored_buffColor','VisuMZ_1_MainMenuCore','qPkgi','allowCreateShopStatusWindow','STRUCT','VJObN','description','addBuffTurns','GGqSl','right','MAXHP','Sprite_StateIcon_updateFrame','drawTextEx','sort','checkSkillTypeMatch','_currentActor','fGKVh','getStateIdWithName','TextJS','GxrvZ','setItem','placeGauge','HiddenSkillTypes','onDatabaseLoaded','YPoXw','setStateDisplay','checkShowHideNotetags','getStypeIdWithName','nwlps','removeStatesAuto','decreaseBuff','ARRAYSTR','passiveStateObjects','ColorNeutral','NkHUv','removeBuffsAuto','itemAt','GaugeDrawJS','meetsPassiveStateConditions','trim','drawActorStateData','damage','sQNwl','DataOffsetY','outlineColor','helpWindowRect','stateColor','skill','updateTurnDisplaySprite','MDF','ZSJAt','STR','Window_SkillType_initialize','onExpireStateJS','%1\x20%2\x20%3','ggTOP','SUEXg','ARRAYEVAL','match','ALL','DPrRN','euaeX','ZrSTB','success','fontBold','stateMaximumTurns','groupDefeat','%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.','buffColor','createItemWindow','applyItemUserEffect','process_VisuMZ_SkillsStatesCore_Skill_Cost','JYmsq','actions','CanPayJS','Game_BattlerBase_refresh','EwctJ','getStateOrigin','_result','VtJxm','YZdYF','getColorDataFromPluginParameters','slice','uiMenuStyle','skillTypeWindowRect','agNAY','SkillsStatesCore','_skills','drawActorStateTurns','constructor','currentValue','changePaintOpacity','usableSkills','drawItem','canClearState','Window_SkillList_includes','SbkUQ','process_VisuMZ_SkillsStatesCore_State_Category','map','QKVKb','drawActorIcons','drawActorBuffTurns','concat','textColor','makeCurrentTroopUniqueID','menuActor','stateData','commandNameWindowCenter','currentMaxValue','indexOf','stateTpSlipHealJS','meetsPassiveStateGlobalConditionJS','qlhdN','weaEz','_currentTroopUniqueID','autoRemovalTiming','frameCount','mainAreaTop','GaugeMaxJS','HvnGl','gaugeLineHeight','state','TwTNP','onAddBuffJS','recover\x20all','rTpnf','Scene_Skill_itemWindowRect','allIcons','members','JzCsS','mpCost','xSYCR','drawText','Scene_Skill_helpWindowRect','SkillConditionJS','process_VisuMZ_SkillsStatesCore_State_PassiveJS','addPassiveStatesTraitSets','Ehpaq','Game_BattlerBase_skillMpCost','onExpireDebuff','MAXMP','scrollTo','placeExactGauge','mainFontSize','stateEraseJS','UUaNb','QZOgj','onExpireStateGlobalJS','split','setStatusWindow','isPartyAllAffectedByGroupDefeatStates','stateTurns','_commandNameWindow','aliveMembers','onEraseBuffJS','isSkillUsableForAutoBattle','Game_BattlerBase_clearStates','drawExtendedParameter','qNygg','removeBuff','_categoryWindow','drawIcon','addCommand','stateMpSlipDamageJS','QSUzP','process_VisuMZ_SkillsStatesCore_State_SlipEffectJS','addChild','exit','wTNhV','note','heal','statusWindowRect','isActor','paySkillCost','updateCommandNameWindow','addPassiveStatesByNotetag','toUpperCase','addStateTurns','addPassiveStates','setupSkillsStatesCore','Sprite_StateIcon_loadBitmap','isMaxDebuffAffected','applyBuffTurnManipulationEffects','FWzbd','CYYjW','phvzU','onExpireBuff','addState','tZSUB','iconHeight','ShowTurns','isCommandEnabled','skillVisibleJS','addPassiveStatesByPluginParameters','keys','applyStateCategoryRemovalEffects','Window_SkillList_updateHelp','statusWindowRectSkillsStatesCore','ColorPositive','changeTextColor','HtLdr','QGoFi','PassiveStates','_stateData','qulwr','jhWQg','onEraseStateJS','ceil','commandNameWindowDrawText','index','KkdKf','ShowShopStatus','onEraseStateCustomJS','add','mainCommandWidth','applyStateTurnManipulationEffects','setStateData','setStypeId','onAddBuff','POSITIVE','drawItemStyleIconText','Sprite_Gauge_setup','untitled','currentMaxValueSkillsStatesCore','checkShowHideSwitchNotetags','_actor','process_VisuMZ_SkillsStatesCore_Skill_JS','Sprite_Gauge_redraw','clamp','cgomA','anchor','Name','Game_Battler_regenerateAll','VGBfx','currentValueSkillsStatesCore','kbzum','stateId','Global','isDebuffAffected','qUfMp','_buffs','createShopStatusWindow','SLGgV','SwLDU','ARRAYSTRUCT','createSkillCostText','Settings','AGI','Window_StatusBase_drawActorIcons','onEraseDebuff','active','_stored_debuffColor','isStateExpired','skillTypeWindowRectSkillsStatesCore','makeAdditionalSkillCostText','callUpdateHelp','gainMp','onAddBuffGlobalJS','convertTargetToStateOriginKey','itemWindowRectSkillsStatesCore','_itemWindow','FAGIo','commandName','skillCostSeparator','meetsSkillConditionsGlobalJS','_costSettings','checkShowHideJS','drawParamText','tdTzl','stypeId','Game_BattlerBase_skillTpCost','height','eraseBuff','clearStatesWithStateRetain','gaugeRate','getStateRetainType','skills','yrnfE','Scene_Boot_onDatabaseLoaded','initMembersSkillsStatesCore','shopStatusWidth','rlcPt','makeCommandName','_stateDisplay','shopStatusWindowRect','actor','iconIndex','Vtnbh','convertPassiveStates','zesqR','JSON','WDtBS','process_VisuMZ_SkillsStatesCore_State_ApplyRemoveLeaveJS','Scene_Skill_statusWindowRect','getStateOriginByKey','createAllSkillCostText','IconStypeMagic','buttonAssistText1','ColorBuff','isAlive','initialize'];(function(_0xa74a66,_0x584f35){const _0x4acf7e=function(_0x26e628){while(--_0x26e628){_0xa74a66['push'](_0xa74a66['shift']());}};_0x4acf7e(++_0x584f35);}(_0x584f,0x8f));const _0x4acf=function(_0xa74a66,_0x584f35){_0xa74a66=_0xa74a66-0x0;let _0x4acf7e=_0x584f[_0xa74a66];return _0x4acf7e;};var label=_0x4acf('0x16e'),tier=tier||0x0,dependencies=[],pluginData=$plugins[_0x4acf('0x41')](function(_0x5eeb96){return _0x5eeb96[_0x4acf('0x28e')]&&_0x5eeb96['description'][_0x4acf('0x15')]('['+label+']');})[0x0];VisuMZ[label][_0x4acf('0x20e')]=VisuMZ[label][_0x4acf('0x20e')]||{},VisuMZ[_0x4acf('0xf8')]=function(_0x4c8f9f,_0x37fb68){for(const _0x3972f7 in _0x37fb68){if(_0x4acf('0x224')===_0x4acf('0x224')){if(_0x3972f7[_0x4acf('0x152')](/(.*):(.*)/i)){if(_0x4acf('0x109')===_0x4acf('0x109')){const _0x15a6ae=String(RegExp['$1']),_0x132b96=String(RegExp['$2'])[_0x4acf('0x1c8')]()['trim']();let _0x5726c4,_0x11d991,_0xfe34d4;switch(_0x132b96){case _0x4acf('0x28f'):_0x5726c4=_0x37fb68[_0x3972f7]!==''?Number(_0x37fb68[_0x3972f7]):0x0;break;case _0x4acf('0xf9'):_0x11d991=_0x37fb68[_0x3972f7]!==''?JSON['parse'](_0x37fb68[_0x3972f7]):[],_0x5726c4=_0x11d991[_0x4acf('0x17a')](_0x1bcf3c=>Number(_0x1bcf3c));break;case _0x4acf('0x85'):_0x5726c4=_0x37fb68[_0x3972f7]!==''?eval(_0x37fb68[_0x3972f7]):null;break;case _0x4acf('0x151'):_0x11d991=_0x37fb68[_0x3972f7]!==''?JSON['parse'](_0x37fb68[_0x3972f7]):[],_0x5726c4=_0x11d991[_0x4acf('0x17a')](_0x220696=>eval(_0x220696));break;case _0x4acf('0x23a'):_0x5726c4=_0x37fb68[_0x3972f7]!==''?JSON['parse'](_0x37fb68[_0x3972f7]):'';break;case _0x4acf('0x4e'):_0x11d991=_0x37fb68[_0x3972f7]!==''?JSON[_0x4acf('0x47')](_0x37fb68[_0x3972f7]):[],_0x5726c4=_0x11d991[_0x4acf('0x17a')](_0x44637d=>JSON['parse'](_0x44637d));break;case _0x4acf('0x295'):_0x5726c4=_0x37fb68[_0x3972f7]!==''?new Function(JSON[_0x4acf('0x47')](_0x37fb68[_0x3972f7])):new Function('return\x200');break;case _0x4acf('0x2b9'):_0x11d991=_0x37fb68[_0x3972f7]!==''?JSON['parse'](_0x37fb68[_0x3972f7]):[],_0x5726c4=_0x11d991[_0x4acf('0x17a')](_0x4cd338=>new Function(JSON[_0x4acf('0x47')](_0x4cd338)));break;case _0x4acf('0x14b'):_0x5726c4=_0x37fb68[_0x3972f7]!==''?String(_0x37fb68[_0x3972f7]):'';break;case _0x4acf('0x137'):_0x11d991=_0x37fb68[_0x3972f7]!==''?JSON[_0x4acf('0x47')](_0x37fb68[_0x3972f7]):[],_0x5726c4=_0x11d991['map'](_0x4e1fbd=>String(_0x4e1fbd));break;case _0x4acf('0x11c'):_0xfe34d4=_0x37fb68[_0x3972f7]!==''?JSON[_0x4acf('0x47')](_0x37fb68[_0x3972f7]):{},_0x4c8f9f[_0x15a6ae]={},VisuMZ[_0x4acf('0xf8')](_0x4c8f9f[_0x15a6ae],_0xfe34d4);continue;case _0x4acf('0x20c'):_0x11d991=_0x37fb68[_0x3972f7]!==''?JSON[_0x4acf('0x47')](_0x37fb68[_0x3972f7]):[],_0x5726c4=_0x11d991[_0x4acf('0x17a')](_0x3ee040=>VisuMZ['ConvertParams']({},JSON[_0x4acf('0x47')](_0x3ee040)));break;default:continue;}_0x4c8f9f[_0x15a6ae]=_0x5726c4;}else{function _0xe062c4(){const _0x5ca9b6=_0x15b412[_0x4acf('0x47')]('['+_0x2ea32a['$1'][_0x4acf('0x152')](/\d+/g)+']');this['_stypeIDs'][_0xadb970['id']]=this[_0x4acf('0x2bb')][_0x3ce465['id']]['concat'](_0x5ca9b6);}}}}else{function _0x24276d(){const _0x1b52f3=this[_0x4acf('0x1b0')];_0x1b52f3[_0x4acf('0x5e')][_0x4acf('0x2a9')]();const _0xac30e8=this[_0x4acf('0x30')](this[_0x4acf('0x1e9')]());if(_0xac30e8===_0x4acf('0x7')&&this[_0x4acf('0x7e')]()>0x0){const _0x212006=this[_0x4acf('0xfa')](this[_0x4acf('0x1e9')]());let _0x13e8cc=this[_0x4acf('0x21e')](this[_0x4acf('0x1e9')]());_0x13e8cc=_0x13e8cc[_0x4acf('0xdd')](/\\I\[(\d+)\]/gi,''),_0x1b52f3[_0x4acf('0x93')](),this[_0x4acf('0x274')](_0x13e8cc,_0x212006),this['commandNameWindowDrawText'](_0x13e8cc,_0x212006),this['commandNameWindowCenter'](_0x13e8cc,_0x212006);}}}}return _0x4c8f9f;},(_0x478f4a=>{const _0x1bab78=_0x478f4a[_0x4acf('0x6d')];for(const _0x58c108 of dependencies){if(!Imported[_0x58c108]){if(_0x4acf('0x285')===_0x4acf('0x285')){alert('%1\x20is\x20missing\x20a\x20required\x20plugin.\x0aPlease\x20install\x20%2\x20into\x20the\x20Plugin\x20Manager.'[_0x4acf('0x7a')](_0x1bab78,_0x58c108)),SceneManager[_0x4acf('0x1bf')]();break;}else{function _0x959a26(){return _0x4fa9bc[_0x4acf('0x28e')]&&_0xcb9238[_0x4acf('0x11e')]['includes']('['+_0x3b63e9+']');}}}}const _0x8eb7d7=_0x478f4a['description'];if(_0x8eb7d7[_0x4acf('0x152')](/\[Version[ ](.*?)\]/i)){if(_0x4acf('0x23b')!=='yLxEF'){const _0x181515=Number(RegExp['$1']);_0x181515!==VisuMZ[label][_0x4acf('0xb6')]&&(alert('%1\x27s\x20version\x20does\x20not\x20match\x20plugin\x27s.\x20Please\x20update\x20it\x20in\x20the\x20Plugin\x20Manager.'[_0x4acf('0x7a')](_0x1bab78,_0x181515)),SceneManager[_0x4acf('0x1bf')]());}else{function _0x2d41d7(){const _0x736be5=this[_0x4acf('0xc1')](_0x4836c8['id'],'slipHp')||0x0,_0x50577a=-this[_0x4acf('0xe5')](),_0x3e305a=_0x1a1b43[_0x4acf('0xf3')](_0x736be5,_0x50577a);if(_0x3e305a!==0x0)this[_0x4acf('0x273')](_0x3e305a);const _0x1c4501=this[_0x4acf('0xc1')](_0x143748['id'],_0x4acf('0x2c8'))||0x0;if(_0x1c4501!==0x0)this[_0x4acf('0x218')](_0x1c4501);const _0x5e563b=this[_0x4acf('0xc1')](_0x4bfa49['id'],_0x4acf('0x5'))||0x0;if(_0x5e563b!==0x0)this['gainSilentTp'](_0x1c4501);}}}if(_0x8eb7d7[_0x4acf('0x152')](/\[Tier[ ](\d+)\]/i)){if(_0x4acf('0x60')!==_0x4acf('0x60')){function _0x9c286b(){const _0x5e40cd=this[_0x4acf('0x208')][_0x649e13];this[_0x4acf('0x1b7')](_0x32b650);if(_0x5e40cd>0x0)this[_0x4acf('0x1d2')](_0x58d7a8);if(_0x5e40cd<0x0)this['onExpireDebuff'](_0x449293);}}else{const _0x2d3c59=Number(RegExp['$1']);if(_0x2d3c59<tier)alert(_0x4acf('0x3e')[_0x4acf('0x7a')](_0x1bab78,_0x2d3c59,tier)),SceneManager[_0x4acf('0x1bf')]();else{if(_0x4acf('0x239')!=='szHQW')tier=Math[_0x4acf('0xf3')](_0x2d3c59,tier);else{function _0xf1b775(){this[_0x4acf('0x22b')]()!==''?this[_0x4acf('0x229')]():(_0xace12c['SkillsStatesCore'][_0x4acf('0x1b4')][_0x4acf('0xf0')](this),this['initMembersSkillsStatesCore']());}}}}}VisuMZ[_0x4acf('0xf8')](VisuMZ[label]['Settings'],_0x478f4a['parameters']);})(pluginData),VisuMZ[_0x4acf('0x16e')][_0x4acf('0x22e')]=Scene_Boot[_0x4acf('0x61')][_0x4acf('0x12f')],Scene_Boot['prototype']['onDatabaseLoaded']=function(){VisuMZ[_0x4acf('0x16e')]['Scene_Boot_onDatabaseLoaded'][_0x4acf('0xf0')](this),this[_0x4acf('0xa1')]();},Scene_Boot[_0x4acf('0x61')][_0x4acf('0xa1')]=function(){this[_0x4acf('0x9d')](),this['process_VisuMZ_SkillsStatesCore_State_Notetags']();},Scene_Boot[_0x4acf('0x61')][_0x4acf('0x9d')]=function(){for(const _0xb824d2 of $dataSkills){if(!_0xb824d2)continue;this[_0x4acf('0x15f')](_0xb824d2),this['process_VisuMZ_SkillsStatesCore_Skill_JS'](_0xb824d2);}},Scene_Boot[_0x4acf('0x61')]['process_VisuMZ_SkillsStatesCore_Skill_Cost']=function(_0x3e624d){const _0x594322=_0x3e624d[_0x4acf('0x1c1')];_0x594322[_0x4acf('0x152')](/<MP COST:[ ](\d+)>/i)&&(_0x3e624d[_0x4acf('0x19a')]=Number(RegExp['$1']));if(_0x594322[_0x4acf('0x152')](/<TP COST:[ ](\d+)>/i)){if('qoiZr'!==_0x4acf('0x142'))_0x3e624d[_0x4acf('0x2b3')]=Number(RegExp['$1']);else{function _0x5f0d1c(){if(!_0x286a79)return;_0x175cdd[_0x4acf('0x61')]['drawActorIcons'][_0x4acf('0xf0')](this,_0x306dd9,_0x106b65,_0x448027,_0x3a7ba2);}}}},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x26c')]={},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x1d8')]={},Scene_Boot[_0x4acf('0x61')][_0x4acf('0x1fa')]=function(_0x36f910){const _0x4e3c18=_0x36f910[_0x4acf('0x1c1')];if(_0x4e3c18['match'](/<JS SKILL ENABLE>\s*([\s\S]*)\s*<\/JS SKILL ENABLE>/i)){const _0x21a7e7=String(RegExp['$1']),_0x3602b7=_0x4acf('0xf5')[_0x4acf('0x7a')](_0x21a7e7);VisuMZ[_0x4acf('0x16e')][_0x4acf('0x26c')][_0x36f910['id']]=new Function('skill',_0x3602b7);}if(_0x4e3c18[_0x4acf('0x152')](/<JS SKILL VISIBLE>\s*([\s\S]*)\s*<\/JS SKILL VISIBLE>/i)){if(_0x4acf('0x84')!==_0x4acf('0x25')){const _0x28b200=String(RegExp['$1']),_0x2055f1='\x0a\x20\x20\x20\x20\x20\x20\x20\x20let\x20visible\x20=\x20true;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20user\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20target\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20a\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20const\x20b\x20=\x20this._actor;\x0a\x20\x20\x20\x20\x20\x20\x20\x20try\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20%1\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x20catch\x20(e)\x20{\x0a\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20\x20if\x20($gameTemp.isPlaytest())\x20console.log(e);\x0a\x20\x20\x20\x20\x20\x20\x20\x20}\x0a\x20\x20\x20\x20\x20\x20\x20\x20return\x20visible;\x0a\x20\x20\x20\x20'['format'](_0x28b200);VisuMZ[_0x4acf('0x16e')][_0x4acf('0x1d8')][_0x36f910['id']]=new Function(_0x4acf('0x147'),_0x2055f1);}else{function _0x14aa70(){if(typeof _0x10c053!=='number')_0x548ede=_0x2adbaa['id'];if(this['isStateAffected'](_0x256605)){const _0x3b1dbe=_0x23b157[_0x4acf('0x159')](_0x50bc6e);this[_0x4acf('0x17')][_0x2b5a9b]=_0xb237a8[_0x4acf('0x1fc')](0x0,_0x3b1dbe);if(this[_0x4acf('0x17')][_0x2320c5]<=0x0)this['removeState'](_0x35a445);}}}}},Scene_Boot[_0x4acf('0x61')]['process_VisuMZ_SkillsStatesCore_State_Notetags']=function(){for(const _0x4174b5 of $dataStates){if(!_0x4174b5)continue;this[_0x4acf('0x179')](_0x4174b5),this[_0x4acf('0x19f')](_0x4174b5),this[_0x4acf('0x1bd')](_0x4174b5),this[_0x4acf('0x23c')](_0x4174b5);}},Scene_Boot[_0x4acf('0x61')]['process_VisuMZ_SkillsStatesCore_State_Category']=function(_0x28a549){_0x28a549[_0x4acf('0x89')]=[_0x4acf('0x153'),_0x4acf('0x252')];const _0x41f9c0=_0x28a549[_0x4acf('0x1c1')],_0x431f33=_0x41f9c0[_0x4acf('0x152')](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);if(_0x431f33){if('VlSMD'!==_0x4acf('0x294')){function _0x41342b(){this[_0x4acf('0xbd')](_0x3cec9b);}}else for(const _0xd332c2 of _0x431f33){_0xd332c2[_0x4acf('0x152')](/<(?:CATEGORY|CATEGORIES):[ ](.*)>/gi);const _0x56cc26=String(RegExp['$1'])[_0x4acf('0x1c8')]()['trim']()[_0x4acf('0x1ac')](',');for(const _0x30e83b of _0x56cc26){if(_0x4acf('0x1c0')!=='TZoml')_0x28a549['categories'][_0x4acf('0x52')](_0x30e83b['trim']());else{function _0x536970(){this[_0x4acf('0x93')](),this['contents'][_0x4acf('0x2a9')]();const _0x428be0=this[_0x4acf('0x63')];if(!_0x428be0)return;const _0xf1ff4b=_0x428be0[_0x4acf('0x266')]()[_0x4acf('0x41')](_0x6b60c6=>_0x6b60c6[_0x4acf('0x236')]>0x0),_0x28e697=[..._0x2a0cbe(0x8)[_0x4acf('0x1da')]()][_0x4acf('0x41')](_0x469599=>_0x428be0[_0x4acf('0x5d')](_0x469599)!==0x0),_0x500e4d=this['_animationIndex'],_0x3ea033=_0xf1ff4b[_0x500e4d];if(_0x3ea033)_0x39943c['prototype'][_0x4acf('0x170')][_0x4acf('0xf0')](this,_0x428be0,_0x3ea033,0x0,0x0),_0x3c7fd0[_0x4acf('0x61')][_0x4acf('0x140')][_0x4acf('0xf0')](this,_0x428be0,_0x3ea033,0x0,0x0);else{const _0x2f2d62=_0x28e697[_0x500e4d-_0xf1ff4b[_0x4acf('0x9f')]];if(!_0x2f2d62)return;_0x28994b[_0x4acf('0x61')]['drawActorBuffTurns'][_0x4acf('0xf0')](this,_0x428be0,_0x2f2d62,0x0,0x0),_0xe87a2f[_0x4acf('0x61')][_0x4acf('0x26a')]['call'](this,_0x428be0,_0x2f2d62,0x0,0x0);}}}}}}if(_0x41f9c0[_0x4acf('0x152')](/<(?:CATEGORY|CATEGORIES)>\s*([\s\S]*)\s*<\/(?:CATEGORY|CATEGORIES)>/i)){const _0x4a8d1f=RegExp['$1'][_0x4acf('0x1ac')](/[\r\n]+/);for(const _0x54bf9a of _0x4a8d1f){if('iKrKH'!==_0x4acf('0x29c'))_0x28a549['categories'][_0x4acf('0x52')](_0x54bf9a['toUpperCase']()[_0x4acf('0x13f')]());else{function _0x5c2113(){_0x4a7e38[_0x4acf('0x16e')]['Sprite_StateIcon_updateFrame'][_0x4acf('0xf0')](this),this[_0x4acf('0x148')]();}}}}if(_0x41f9c0[_0x4acf('0x152')](/<POSITIVE STATE>/i)){if(_0x4acf('0x2a7')===_0x4acf('0x78')){function _0x349e66(){return _0x4b43fc[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0x10f')]['ListWindowCols'];}}else _0x28a549[_0x4acf('0x89')][_0x4acf('0x52')](_0x4acf('0x1f3'));}if(_0x41f9c0[_0x4acf('0x152')](/<NEGATIVE STATE>/i)){if(_0x4acf('0x2b8')!==_0x4acf('0x2b8')){function _0x5e7c97(){try{_0x5c0837[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0xe6')][_0x4acf('0x1e6')][_0x4acf('0xf0')](this,_0x809d1f);}catch(_0x246019){if(_0x3a41a8[_0x4acf('0xb5')]())_0x3b53a3[_0x4acf('0x69')](_0x246019);}}}else _0x28a549[_0x4acf('0x89')][_0x4acf('0x52')]('NEGATIVE');}},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x2b5')]={},Scene_Boot['prototype'][_0x4acf('0x19f')]=function(_0x19f020){const _0x35e6d2=_0x19f020['note'];if(_0x35e6d2['match'](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x5b2eb7=String(RegExp['$1']),_0xbea22=_0x4acf('0xaa')[_0x4acf('0x7a')](_0x5b2eb7);VisuMZ[_0x4acf('0x16e')][_0x4acf('0x2b5')][_0x19f020['id']]=new Function(_0x4acf('0x191'),_0xbea22);}},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x2b4')]={},VisuMZ[_0x4acf('0x16e')]['stateHpSlipHealJS']={},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x1bb')]={},VisuMZ[_0x4acf('0x16e')][_0x4acf('0xf4')]={},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x282')]={},VisuMZ['SkillsStatesCore'][_0x4acf('0x186')]={},Scene_Boot['prototype'][_0x4acf('0x1bd')]=function(_0x4e8b99){const _0x159496=_0x4e8b99[_0x4acf('0x1c1')],_0x42df6b=_0x4acf('0x8f');if(_0x159496[_0x4acf('0x152')](/<JS HP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS HP SLIP DAMAGE>/i)){if(_0x4acf('0x13a')===_0x4acf('0x1d0')){function _0x2c610a(){if(_0x67372e[_0x4acf('0x16b')]&&_0x5f5be8[_0x4acf('0x290')]!==_0x1a1926)return _0x3e8c68[_0x4acf('0x290')];else{if(this[_0x4acf('0x24a')]())return this[_0x4acf('0x28a')]()[_0x4acf('0x152')](/LOWER/i);else _0x2585f7['prototype'][_0x4acf('0x6b')][_0x4acf('0xf0')](this);}}}else{const _0x1ad7c8=String(RegExp['$1']),_0x34805b=_0x42df6b[_0x4acf('0x7a')](_0x1ad7c8,_0x4acf('0x141'),-0x1,_0x4acf('0x2cc'));VisuMZ[_0x4acf('0x16e')][_0x4acf('0x2b4')][_0x4e8b99['id']]=new Function('stateId',_0x34805b);}}else{if(_0x159496['match'](/<JS HP SLIP HEAL>\s*([\s\S]*)\s*<\/JS HP SLIP HEAL>/i)){const _0xcb995=String(RegExp['$1']),_0x31ee46=_0x42df6b['format'](_0xcb995,'heal',0x1,'slipHp');VisuMZ[_0x4acf('0x16e')][_0x4acf('0x1e')][_0x4e8b99['id']]=new Function(_0x4acf('0x204'),_0x31ee46);}}if(_0x159496[_0x4acf('0x152')](/<JS MP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS MP SLIP DAMAGE>/i)){if('YIdhS'===_0x4acf('0x102')){function _0x4a3dcc(){this[_0x4acf('0x93')]();const _0x14b1d6=_0xde304e[_0x58f87f];if(_0x14b1d6)!_0x8611b5[_0x4acf('0x15')](_0x14b1d6)&&this[_0x4acf('0x170')](_0x3ad89f,_0x14b1d6,_0x2a8e06,_0x1c44eb),this[_0x4acf('0x140')](_0x54ac27,_0x14b1d6,_0x51133d,_0x365417),_0x350335['push'](_0x14b1d6);else{const _0x2d4cb5=_0x1d7180[_0x3c9e00-_0x3c49d7[_0x4acf('0x9f')]];this['drawActorBuffTurns'](_0xcff4c,_0x2d4cb5,_0x42d209,_0x7ccdd0),this[_0x4acf('0x26a')](_0x4a26e7,_0x2d4cb5,_0x5a1f9c,_0x15b555);}_0x7de04c+=_0x20ad37;}}else{const _0x4e6240=String(RegExp['$1']),_0x35e27a=_0x42df6b[_0x4acf('0x7a')](_0x4e6240,_0x4acf('0x141'),-0x1,'slipMp');VisuMZ['SkillsStatesCore']['stateMpSlipDamageJS'][_0x4e8b99['id']]=new Function(_0x4acf('0x204'),_0x35e27a);}}else{if(_0x159496['match'](/<JS MP SLIP HEAL>\s*([\s\S]*)\s*<\/JS MP SLIP HEAL>/i)){if(_0x4acf('0x156')===_0x4acf('0x156')){const _0x38cdd0=String(RegExp['$1']),_0x2ee98e=_0x42df6b[_0x4acf('0x7a')](_0x38cdd0,'heal',0x1,_0x4acf('0x2c8'));VisuMZ[_0x4acf('0x16e')]['stateMpSlipHealJS'][_0x4e8b99['id']]=new Function(_0x4acf('0x204'),_0x2ee98e);}else{function _0x2b0aa9(){if(!_0x9ff135['VisuMZ_1_ItemsEquipsCore'])return![];else return this[_0x4acf('0x24a')]()?!![]:_0x120d25[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0x10f')][_0x4acf('0x1eb')];}}}}if(_0x159496[_0x4acf('0x152')](/<JS TP SLIP DAMAGE>\s*([\s\S]*)\s*<\/JS TP SLIP DAMAGE>/i)){if(_0x4acf('0x2cf')!==_0x4acf('0x2cf')){function _0x177f72(){const _0x54b5a5=this[_0x4acf('0xfa')](_0x219ba2),_0x4aad60=this[_0x4acf('0x27f')](_0x121711)[_0x4acf('0x97')];return _0x4aad60<=_0x54b5a5[_0x4acf('0x97')]?_0x4acf('0x2bc'):'icon';}}else{const _0x9307f1=String(RegExp['$1']),_0x5b130=_0x42df6b[_0x4acf('0x7a')](_0x9307f1,_0x4acf('0x141'),-0x1,_0x4acf('0x5'));VisuMZ['SkillsStatesCore'][_0x4acf('0x282')][_0x4e8b99['id']]=new Function('stateId',_0x5b130);}}else{if(_0x159496[_0x4acf('0x152')](/<JS TP SLIP HEAL>\s*([\s\S]*)\s*<\/JS TP SLIP HEAL>/i)){const _0xe65c61=String(RegExp['$1']),_0x325a0b=_0x42df6b[_0x4acf('0x7a')](_0xe65c61,_0x4acf('0x1c2'),0x1,_0x4acf('0x5'));VisuMZ[_0x4acf('0x16e')][_0x4acf('0x186')][_0x4e8b99['id']]=new Function(_0x4acf('0x204'),_0x325a0b);}}},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x257')]={},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x1a8')]={},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x265')]={},Scene_Boot[_0x4acf('0x61')][_0x4acf('0x23c')]=function(_0x7936eb){const _0x5bdbc2=_0x7936eb[_0x4acf('0x1c1')],_0xbc3764=_0x4acf('0xd6');if(_0x5bdbc2[_0x4acf('0x152')](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){if(_0x4acf('0x2')!==_0x4acf('0x28')){const _0x2cfd83=String(RegExp['$1']),_0x1176af=_0xbc3764[_0x4acf('0x7a')](_0x2cfd83);VisuMZ[_0x4acf('0x16e')][_0x4acf('0x257')][_0x7936eb['id']]=new Function(_0x4acf('0x204'),_0x1176af);}else{function _0x1ae9e9(){if(_0x532728[_0x4acf('0x83')](_0x211f43))return!![];}}}if(_0x5bdbc2[_0x4acf('0x152')](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){if(_0x4acf('0x1')===_0x4acf('0x1')){const _0xebdd27=String(RegExp['$1']),_0x155370=_0xbc3764[_0x4acf('0x7a')](_0xebdd27);VisuMZ[_0x4acf('0x16e')][_0x4acf('0x257')][_0x7936eb['id']]=new Function(_0x4acf('0x204'),_0x155370);}else{function _0x9f325(){return _0x6d1821[_0x4acf('0x59')];}}}if(_0x5bdbc2[_0x4acf('0x152')](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){if(_0x4acf('0x199')===_0x4acf('0x1cf')){function _0x8c99e(){return[];}}else{const _0xa6647a=String(RegExp['$1']),_0x37b227=_0xbc3764[_0x4acf('0x7a')](_0xa6647a);VisuMZ[_0x4acf('0x16e')]['stateAddJS'][_0x7936eb['id']]=new Function(_0x4acf('0x204'),_0x37b227);}}},DataManager[_0x4acf('0x100')]=function(_0x591bcc){this['_stypeIDs']=this[_0x4acf('0x2bb')]||{};if(this[_0x4acf('0x2bb')][_0x591bcc['id']])return this[_0x4acf('0x2bb')][_0x591bcc['id']];this[_0x4acf('0x2bb')][_0x591bcc['id']]=[_0x591bcc[_0x4acf('0x225')]];if(_0x591bcc[_0x4acf('0x1c1')][_0x4acf('0x152')](/<SKILL[ ](?:TYPE|TYPES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x531724=JSON['parse']('['+RegExp['$1'][_0x4acf('0x152')](/\d+/g)+']');this['_stypeIDs'][_0x591bcc['id']]=this[_0x4acf('0x2bb')][_0x591bcc['id']][_0x4acf('0x17e')](_0x531724);}else{if(_0x591bcc[_0x4acf('0x1c1')][_0x4acf('0x152')](/<SKILL[ ](?:TYPE|TYPES):[ ](.*)>/i)){const _0x47f51d=RegExp['$1'][_0x4acf('0x1ac')](',');for(const _0x5eae3c of _0x47f51d){const _0x3983fd=DataManager['getStypeIdWithName'](_0x5eae3c);if(_0x3983fd)this[_0x4acf('0x2bb')][_0x591bcc['id']][_0x4acf('0x52')](_0x3983fd);}}}return this[_0x4acf('0x2bb')][_0x591bcc['id']];},DataManager[_0x4acf('0x133')]=function(_0x327c58){_0x327c58=_0x327c58[_0x4acf('0x1c8')]()[_0x4acf('0x13f')](),this['_stypeIDs']=this[_0x4acf('0x2bb')]||{};if(this[_0x4acf('0x2bb')][_0x327c58])return this[_0x4acf('0x2bb')][_0x327c58];for(let _0x89473e=0x1;_0x89473e<0x64;_0x89473e++){if(!$dataSystem['skillTypes'][_0x89473e])continue;let _0x4361db=$dataSystem[_0x4acf('0x46')][_0x89473e][_0x4acf('0x1c8')]()[_0x4acf('0x13f')]();_0x4361db=_0x4361db[_0x4acf('0xdd')](/\x1I\[(\d+)\]/gi,''),_0x4361db=_0x4361db['replace'](/\\I\[(\d+)\]/gi,''),this[_0x4acf('0x2bb')][_0x4361db]=_0x89473e;}return this[_0x4acf('0x2bb')][_0x327c58]||0x0;},DataManager[_0x4acf('0x253')]=function(_0x3cc49f){_0x3cc49f=_0x3cc49f[_0x4acf('0x1c8')]()[_0x4acf('0x13f')](),this[_0x4acf('0xc5')]=this[_0x4acf('0xc5')]||{};if(this[_0x4acf('0xc5')][_0x3cc49f])return this[_0x4acf('0xc5')][_0x3cc49f];for(const _0x1cee02 of $dataSkills){if(!_0x1cee02)continue;this['_skillIDs'][_0x1cee02[_0x4acf('0x6d')]['toUpperCase']()[_0x4acf('0x13f')]()]=_0x1cee02['id'];}return this[_0x4acf('0xc5')][_0x3cc49f]||0x0;},DataManager[_0x4acf('0x129')]=function(_0x26ea79){_0x26ea79=_0x26ea79[_0x4acf('0x1c8')]()[_0x4acf('0x13f')](),this[_0x4acf('0x248')]=this[_0x4acf('0x248')]||{};if(this[_0x4acf('0x248')][_0x26ea79])return this[_0x4acf('0x248')][_0x26ea79];for(const _0x29272f of $dataStates){if(_0x4acf('0x11a')===_0x4acf('0xe7')){function _0x73baf(){if(_0x4690c3[_0x4acf('0x266')]()[_0x4acf('0x9f')]<=0x0)return;const _0x27020c=this[_0x4acf('0x286')]()[_0x4acf('0x1c1')],_0x257346=_0x27020c[_0x4acf('0x152')](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x257346)for(const _0x45ed99 of _0x257346){_0x45ed99['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0x2b8f99=_0x258793(_0x531b55['$1']),_0x51117e=_0x11e0ce(_0x310d63['$2']);_0x5a8386[_0x4acf('0x2f')](_0x2b8f99,_0x51117e);}}}else{if(!_0x29272f)continue;this['_stateIDs'][_0x29272f['name'][_0x4acf('0x1c8')]()[_0x4acf('0x13f')]()]=_0x29272f['id'];}}return this[_0x4acf('0x248')][_0x26ea79]||0x0;},DataManager[_0x4acf('0x159')]=function(_0x5d0079){this[_0x4acf('0x115')]=this[_0x4acf('0x115')]||{};if(this[_0x4acf('0x115')][_0x5d0079])return this[_0x4acf('0x115')][_0x5d0079];if($dataStates[_0x5d0079][_0x4acf('0x1c1')][_0x4acf('0x152')](/<MAX TURNS:[ ](\d+)>/i))this[_0x4acf('0x115')][_0x5d0079]=Number(RegExp['$1']);else{if('gtKfB'!==_0x4acf('0x55'))this[_0x4acf('0x115')][_0x5d0079]=VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0xe6')][_0x4acf('0x71')];else{function _0x543275(){return this['_buffs'][_0x3d600b]===-_0x5d050d[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0x4a')]['StackDebuffMax'];}}}return this[_0x4acf('0x115')][_0x5d0079];},ColorManager[_0x4acf('0x169')]=function(_0x3f8aea,_0x46b087){_0x46b087=String(_0x46b087),this['_colorCache']=this[_0x4acf('0x2e')]||{};if(_0x46b087[_0x4acf('0x152')](/#(.*)/i)){if(_0x4acf('0x27c')!==_0x4acf('0x27c')){function _0x52477c(){_0x55d973['SkillsStatesCore'][_0x4acf('0x20e')][_0x4acf('0x4a')][_0x4acf('0x278')][_0x4acf('0xf0')](this,_0x4c649f);}}else this['_colorCache'][_0x3f8aea]=_0x4acf('0xae')[_0x4acf('0x7a')](String(RegExp['$1']));}else{if(_0x4acf('0xee')===_0x4acf('0xee'))this[_0x4acf('0x2e')][_0x3f8aea]=this['textColor'](Number(_0x46b087));else{function _0x25c1f1(){this[_0x4acf('0x1f4')](_0x517643);}}}return this[_0x4acf('0x2e')][_0x3f8aea];},ColorManager[_0x4acf('0x256')]=function(_0x40105d){_0x40105d=String(_0x40105d);if(_0x40105d[_0x4acf('0x152')](/#(.*)/i))return'#%1'[_0x4acf('0x7a')](String(RegExp['$1']));else{if(_0x4acf('0x3c')!==_0x4acf('0x3c')){function _0x42b2de(){const _0x37240f=_0x4acf('0x213');this[_0x4acf('0x2e')]=this[_0x4acf('0x2e')]||{};if(this[_0x4acf('0x2e')][_0x37240f])return this[_0x4acf('0x2e')][_0x37240f];const _0x24c5ad=_0x53d0fd[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0x4a')][_0x4acf('0x95')];return this[_0x4acf('0x169')](_0x37240f,_0x24c5ad);}}else return this[_0x4acf('0x17f')](Number(_0x40105d));}},ColorManager[_0x4acf('0x146')]=function(_0xa309d9){if(typeof _0xa309d9===_0x4acf('0xc2'))_0xa309d9=$dataStates[_0xa309d9];const _0x2a99e4=_0x4acf('0x291')[_0x4acf('0x7a')](_0xa309d9['id']);this[_0x4acf('0x2e')]=this['_colorCache']||{};if(this[_0x4acf('0x2e')][_0x2a99e4])return this['_colorCache'][_0x2a99e4];const _0x1a0d59=this[_0x4acf('0xf7')](_0xa309d9);return this[_0x4acf('0x169')](_0x2a99e4,_0x1a0d59);},ColorManager[_0x4acf('0xf7')]=function(_0x10dbed){const _0x57530f=_0x10dbed[_0x4acf('0x1c1')];if(_0x57530f[_0x4acf('0x152')](/<TURN COLOR:[ ](.*)>/i)){if(_0x4acf('0x40')!==_0x4acf('0x128'))return String(RegExp['$1']);else{function _0x59bfca(){if(!_0xdc75a6[_0x4acf('0x83')](_0x2c21fe))return![];}}}else{if(_0x57530f[_0x4acf('0x152')](/<POSITIVE STATE>/i))return VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0xe6')][_0x4acf('0x1de')];else{if(_0x57530f[_0x4acf('0x152')](/<NEGATIVE STATE>/i))return VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0xe6')][_0x4acf('0x5c')];else{if(_0x4acf('0x11d')!=='VJObN'){function _0x583c83(){return _0x13f2f5;}}else return VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0xe6')][_0x4acf('0x139')];}}}},ColorManager[_0x4acf('0x15c')]=function(){const _0x436d36=_0x4acf('0x118');this['_colorCache']=this[_0x4acf('0x2e')]||{};if(this[_0x4acf('0x2e')][_0x436d36])return this['_colorCache'][_0x436d36];const _0x53d3a0=VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0x4a')][_0x4acf('0x242')];return this[_0x4acf('0x169')](_0x436d36,_0x53d3a0);},ColorManager[_0x4acf('0x263')]=function(){const _0x4dc2db='_stored_debuffColor';this[_0x4acf('0x2e')]=this[_0x4acf('0x2e')]||{};if(this['_colorCache'][_0x4dc2db])return this['_colorCache'][_0x4dc2db];const _0x333ab5=VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0x4a')][_0x4acf('0x95')];return this['getColorDataFromPluginParameters'](_0x4dc2db,_0x333ab5);},VisuMZ[_0x4acf('0x16e')][_0x4acf('0xed')]=Game_Action[_0x4acf('0x61')]['applyItemUserEffect'],Game_Action[_0x4acf('0x61')][_0x4acf('0x15e')]=function(_0x26c164){VisuMZ[_0x4acf('0x16e')][_0x4acf('0xed')][_0x4acf('0xf0')](this,_0x26c164),this[_0x4acf('0x38')](_0x26c164);},Game_Action[_0x4acf('0x61')][_0x4acf('0x38')]=function(_0x455f05){this[_0x4acf('0x1db')](_0x455f05),this[_0x4acf('0x1ef')](_0x455f05),this[_0x4acf('0x1ce')](_0x455f05),this['applyDebuffTurnManipulationEffects'](_0x455f05);},Game_Action[_0x4acf('0x61')][_0x4acf('0x1db')]=function(_0x876baf){if(_0x876baf['states']()[_0x4acf('0x9f')]<=0x0)return;const _0x662941=this['item']()['note'],_0x291bab=_0x662941[_0x4acf('0x152')](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/gi);if(_0x291bab){if(_0x4acf('0x1d1')==='lfBpW'){function _0x4e3635(){const _0x28b680=_0xfedf18[_0x4e8c15-_0x3062c5[_0x4acf('0x9f')]];this[_0x4acf('0x17d')](_0x50470a,_0x28b680,_0xf5ad59,_0x16212a),this[_0x4acf('0x26a')](_0xd13ba2,_0x28b680,_0x281d8e,_0x487382);}}else for(const _0x3df557 of _0x291bab){if(_0x4acf('0x1bc')!=='YrBjb'){_0x3df557['match'](/<STATE[ ](.*)[ ]CATEGORY REMOVE:[ ](\d+)>/i);const _0xe3fd9a=String(RegExp['$1']),_0x524de8=Number(RegExp['$2']);_0x876baf[_0x4acf('0x2f')](_0xe3fd9a,_0x524de8);}else{function _0x37d038(){if(this[_0x4acf('0x1ae')]())return!![];return _0x3f93bc['SkillsStatesCore'][_0x4acf('0x0')][_0x4acf('0xf0')](this);}}}}},Game_Action[_0x4acf('0x61')][_0x4acf('0x1ef')]=function(_0x2b9292){const _0x179644=this[_0x4acf('0x286')]()[_0x4acf('0x1c1')],_0x1f0478=_0x179644[_0x4acf('0x152')](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/gi);if(_0x1f0478){if(_0x4acf('0x2c1')!==_0x4acf('0x2c1')){function _0x18e483(){_0x1e1693[_0x4acf('0x152')](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x1544db=_0x5a11d7[_0x4acf('0x185')](_0x404b6c(_0xc4fcd0['$1'])[_0x4acf('0x1c8')]()),_0x37ad77=_0x218cb0(_0x4a51be['$2']);_0x1544db>=0x0&&(_0x3e406e['addBuffTurns'](_0x1544db,_0x37ad77),this[_0x4acf('0x22')](_0x4b3119));}}else for(const _0x2e8212 of _0x1f0478){if(_0x4acf('0x2ac')===_0x4acf('0xab')){function _0x30690c(){_0x2a942b['SkillsStatesCore'][_0x4acf('0x20e')][_0x4acf('0x4a')][_0x4acf('0x193')][_0x4acf('0xf0')](this,_0x43a346,_0xe1c05b);}}else{let _0x14a81c=0x0,_0x330a27=0x0;if(_0x2e8212[_0x4acf('0x152')](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x14a81c=Number(RegExp['$1']),_0x330a27=Number(RegExp['$2']);else _0x2e8212[_0x4acf('0x152')](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x14a81c=DataManager[_0x4acf('0x129')](RegExp['$1']),_0x330a27=Number(RegExp['$2']));_0x2b9292[_0x4acf('0x20')](_0x14a81c,_0x330a27),this[_0x4acf('0x22')](_0x2b9292);}}}const _0x426a0d=_0x179644[_0x4acf('0x152')](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/gi);if(_0x426a0d)for(const _0x18adc5 of _0x426a0d){let _0x44ae81=0x0,_0x523395=0x0;if(_0x18adc5[_0x4acf('0x152')](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x44ae81=Number(RegExp['$1']),_0x523395=Number(RegExp['$2']);else{if(_0x18adc5[_0x4acf('0x152')](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)){if('yXTrU'!==_0x4acf('0x150'))_0x44ae81=DataManager[_0x4acf('0x129')](RegExp['$1']),_0x523395=Number(RegExp['$2']);else{function _0x1694ab(){for(const _0x5ef7e0 of _0x14b892){let _0x58b25a=0x0,_0x556ae1=0x0;if(_0x5ef7e0[_0x4acf('0x152')](/<STATE[ ](\d+)[ ]TURNS:[ ]([\+\-]\d+)>/i))_0x58b25a=_0x2dc395(_0x3b23c3['$1']),_0x556ae1=_0x323fda(_0xb33ee7['$2']);else _0x5ef7e0[_0x4acf('0x152')](/<STATE[ ](.*)[ ]TURNS:[ ]([\+\-]\d+)>/i)&&(_0x58b25a=_0x500d20[_0x4acf('0x129')](_0xbba9d9['$1']),_0x556ae1=_0x28901e(_0x20b57b['$2']));_0x3e6421[_0x4acf('0x1c9')](_0x58b25a,_0x556ae1),this[_0x4acf('0x22')](_0x488324);}}}}}_0x2b9292[_0x4acf('0x1c9')](_0x44ae81,_0x523395),this[_0x4acf('0x22')](_0x2b9292);}},Game_Action[_0x4acf('0x61')][_0x4acf('0x1ce')]=function(_0x26cf0b){const _0x31b754=[_0x4acf('0x122'),_0x4acf('0x1a4'),_0x4acf('0x94'),_0x4acf('0x276'),_0x4acf('0x98'),_0x4acf('0x149'),_0x4acf('0x20f'),_0x4acf('0x2c2')],_0x4a7025=this[_0x4acf('0x286')]()[_0x4acf('0x1c1')],_0x27227c=_0x4a7025['match'](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/gi);if(_0x27227c)for(const _0x16f584 of _0x27227c){_0x16f584[_0x4acf('0x152')](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x29e443=_0x31b754[_0x4acf('0x185')](String(RegExp['$1'])[_0x4acf('0x1c8')]()),_0x182728=Number(RegExp['$2']);_0x29e443>=0x0&&(_0x26cf0b[_0x4acf('0xd2')](_0x29e443,_0x182728),this[_0x4acf('0x22')](_0x26cf0b));}const _0x25e1b4=_0x4a7025[_0x4acf('0x152')](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x25e1b4)for(const _0x750e66 of _0x27227c){_0x750e66[_0x4acf('0x152')](/<(.*)[ ]BUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x1d2dca=_0x31b754[_0x4acf('0x185')](String(RegExp['$1'])[_0x4acf('0x1c8')]()),_0x524f8f=Number(RegExp['$2']);if(_0x1d2dca>=0x0){if(_0x4acf('0x29b')!==_0x4acf('0x29b')){function _0x3d6a5b(){const _0x571a73=this[_0x4acf('0x23f')](_0x2ef35f,_0x1dbd94),_0x5980a7=this[_0x4acf('0x27f')](_0x571a73,_0x14cf00,_0x391ebe,_0x59fac9),_0x3d5689=_0x311427+_0x593dbb-_0x5980a7['width'];this[_0x4acf('0x124')](_0x571a73,_0x3d5689,_0x14ab31,_0x281ef8),this[_0x4acf('0x93')]();}}else _0x26cf0b[_0x4acf('0x11f')](_0x1d2dca,_0x524f8f),this['makeSuccess'](_0x26cf0b);}}},Game_Action[_0x4acf('0x61')][_0x4acf('0xa6')]=function(_0x73218f){const _0x3e00d9=[_0x4acf('0x122'),_0x4acf('0x1a4'),_0x4acf('0x94'),_0x4acf('0x276'),_0x4acf('0x98'),_0x4acf('0x149'),_0x4acf('0x20f'),_0x4acf('0x2c2')],_0x58b2a9=this[_0x4acf('0x286')]()[_0x4acf('0x1c1')],_0x53cadc=_0x58b2a9[_0x4acf('0x152')](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/gi);if(_0x53cadc){if(_0x4acf('0x246')===_0x4acf('0x164')){function _0x412fa2(){return _0x5ab739[_0x4acf('0x16e')]['Settings'][_0x4acf('0x10f')][_0x4acf('0xc9')];}}else for(const _0x2a071d of _0x53cadc){if('elyVi'!==_0x4acf('0xfe')){function _0x12ea1e(){return this[_0x4acf('0x277')]=this[_0x4acf('0x277')]||{},this[_0x4acf('0x277')][_0x3a56c0]!==_0x4170f9;}}else{_0x2a071d[_0x4acf('0x152')](/<SET[ ](.*)[ ]DEBUFF TURNS:[ ](\d+)>/i);const _0x2c36b0=_0x3e00d9[_0x4acf('0x185')](String(RegExp['$1'])[_0x4acf('0x1c8')]()),_0x441a29=Number(RegExp['$2']);_0x2c36b0>=0x0&&(_0x73218f[_0x4acf('0x2b1')](_0x2c36b0,_0x441a29),this[_0x4acf('0x22')](_0x73218f));}}}const _0x3f83a2=_0x58b2a9['match'](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/gi);if(_0x3f83a2){if('StWLK'===_0x4acf('0x27b'))for(const _0x540493 of _0x53cadc){_0x540493[_0x4acf('0x152')](/<(.*)[ ]DEBUFF TURNS:[ ]([\+\-]\d+)>/i);const _0x358f62=_0x3e00d9[_0x4acf('0x185')](String(RegExp['$1'])['toUpperCase']()),_0x59abff=Number(RegExp['$2']);_0x358f62>=0x0&&(_0x73218f[_0x4acf('0x2a1')](_0x358f62,_0x59abff),this[_0x4acf('0x22')](_0x73218f));}else{function _0x55c559(){const _0x5a7dc2=_0x55c15e(_0x3666d6['$1']),_0x3ad0ba=_0x3cd191[_0x4acf('0x7a')](_0x5a7dc2,'heal',0x1,_0x4acf('0x2cc'));_0xd4ede3[_0x4acf('0x16e')][_0x4acf('0x1e')][_0x5cd8bc['id']]=new _0x49e26b(_0x4acf('0x204'),_0x3ad0ba);}}}},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x25b')]=Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x2ae')],Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x2ae')]=function(){this[_0x4acf('0x277')]={},this[_0x4acf('0x22f')](),VisuMZ['SkillsStatesCore'][_0x4acf('0x25b')][_0x4acf('0xf0')](this);},Game_BattlerBase['prototype'][_0x4acf('0x22f')]=function(){this[_0x4acf('0xc3')]='',this['_stateData']={},this[_0x4acf('0x233')]={},this[_0x4acf('0x62')]={};},Game_BattlerBase['prototype']['checkCacheKey']=function(_0xcea668){return this[_0x4acf('0x277')]=this['_cache']||{},this[_0x4acf('0x277')][_0xcea668]!==undefined;},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x163')]=Game_BattlerBase[_0x4acf('0x61')]['refresh'],Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x289')]=function(){this['_cache']={},VisuMZ['SkillsStatesCore'][_0x4acf('0x163')][_0x4acf('0xf0')](this);},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x4d')]=Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x259')],Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x259')]=function(_0x413b2a){VisuMZ[_0x4acf('0x16e')][_0x4acf('0x4d')]['call'](this,_0x413b2a),this[_0x4acf('0x2c4')](_0x413b2a);},Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x2c4')]=function(_0xf97e84){this[_0x4acf('0xc0')](_0xf97e84),this['clearStateDisplay'](_0xf97e84),this[_0x4acf('0x2bd')](_0xf97e84);},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x23')]=Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x105')],Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x105')]=function(_0x27b7a7){const _0x4c18ff=$dataStates[_0x27b7a7],_0x1c9234=this[_0x4acf('0x1af')](_0x27b7a7),_0x4df42a=this[_0x4acf('0x26')](_0x4c18ff)[_0x4acf('0x297')]()['trim']();switch(_0x4df42a){case _0x4acf('0x25f'):if(_0x1c9234<=0x0)VisuMZ[_0x4acf('0x16e')][_0x4acf('0x23')]['call'](this,_0x27b7a7);break;case _0x4acf('0x26f'):VisuMZ[_0x4acf('0x16e')]['Game_BattlerBase_resetStateCounts'][_0x4acf('0xf0')](this,_0x27b7a7);break;case'greater':VisuMZ['SkillsStatesCore'][_0x4acf('0x23')][_0x4acf('0xf0')](this,_0x27b7a7),this[_0x4acf('0x17')][_0x27b7a7]=Math['max'](this[_0x4acf('0x17')][_0x27b7a7],_0x1c9234);break;case _0x4acf('0x1ed'):VisuMZ[_0x4acf('0x16e')]['Game_BattlerBase_resetStateCounts']['call'](this,_0x27b7a7),this[_0x4acf('0x17')][_0x27b7a7]+=_0x1c9234;break;default:VisuMZ[_0x4acf('0x16e')][_0x4acf('0x23')][_0x4acf('0xf0')](this,_0x27b7a7);break;}},Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x26')]=function(_0x5d9764){const _0x572ab4=_0x5d9764[_0x4acf('0x1c1')];return _0x572ab4[_0x4acf('0x152')](/<REAPPLY RULES:[ ](.*)>/i)?String(RegExp['$1']):VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')]['States'][_0x4acf('0x10')];},VisuMZ['SkillsStatesCore'][_0x4acf('0xb9')]=Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x247')],Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x247')]=function(_0xbefd97,_0x2794eb){const _0x5494bd=VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0x4a')][_0x4acf('0x10')],_0x315c02=this[_0x4acf('0x2d')](_0xbefd97);switch(_0x5494bd){case _0x4acf('0x25f'):if(_0x315c02<=0x0)this[_0x4acf('0x80')][_0xbefd97]=_0x2794eb;break;case _0x4acf('0x26f'):this[_0x4acf('0x80')][_0xbefd97]=_0x2794eb;break;case _0x4acf('0x2c6'):this[_0x4acf('0x80')][_0xbefd97]=Math['max'](_0x315c02,_0x2794eb);break;case _0x4acf('0x1ed'):this['_buffTurns'][_0xbefd97]+=_0x2794eb;break;default:VisuMZ[_0x4acf('0x16e')][_0x4acf('0xb9')][_0x4acf('0xf0')](this,_0xbefd97,_0x2794eb);break;}const _0x199375=VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')]['Buffs'][_0x4acf('0x71')];this[_0x4acf('0x80')][_0xbefd97]=this[_0x4acf('0x80')][_0xbefd97][_0x4acf('0x1fc')](0x0,_0x199375);},Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x8b')]=function(){if(this['_cache'][_0x4acf('0x15a')]!==undefined)return this[_0x4acf('0x277')][_0x4acf('0x15a')];this[_0x4acf('0x277')][_0x4acf('0x15a')]=![];const _0x53aae7=this[_0x4acf('0x266')]();for(const _0xbff639 of _0x53aae7){if(!_0xbff639)continue;if(_0xbff639[_0x4acf('0x1c1')][_0x4acf('0x152')](/<GROUP DEFEAT>/i)){this[_0x4acf('0x277')][_0x4acf('0x15a')]=!![];break;}}return this[_0x4acf('0x277')][_0x4acf('0x15a')];},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x1b4')]=Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x260')],Game_BattlerBase['prototype'][_0x4acf('0x260')]=function(){this[_0x4acf('0x22b')]()!==''?this[_0x4acf('0x229')]():(VisuMZ[_0x4acf('0x16e')][_0x4acf('0x1b4')][_0x4acf('0xf0')](this),this[_0x4acf('0x22f')]());},Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x229')]=function(){const _0x44b265=this['states']();for(const _0x3bb906 of _0x44b265){if(_0x4acf('0x58')===_0x4acf('0x58')){if(_0x3bb906&&this[_0x4acf('0x176')](_0x3bb906))this[_0x4acf('0x259')](_0x3bb906['id']);}else{function _0x370be5(){const _0x362153=_0x3e8b09[_0x4acf('0x72')]-this[_0x4acf('0x230')](),_0xe15c59=this[_0x4acf('0x110')]()-this['_statusWindow'][_0x4acf('0x227')],_0xa6a4ed=this['isRightInputMode']()?_0x12e07c[_0x4acf('0x72')]-_0x362153:0x0,_0x236dc1=this['_statusWindow']['y']+this['_statusWindow'][_0x4acf('0x227')];return new _0xf79e55(_0xa6a4ed,_0x236dc1,_0x362153,_0xe15c59);}}}this[_0x4acf('0x277')]={};},Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x176')]=function(_0x23df52){const _0xa4235d=this[_0x4acf('0x22b')]();if(_0xa4235d!==''){if(_0x4acf('0xe9')===_0x4acf('0x120')){function _0x16f324(){this[_0x4acf('0x1cb')](_0x36ec19,_0x234800),_0x15fe63=_0xd13b3a[_0x4acf('0x297')](),_0x3637d9[_0x4acf('0x16e')][_0x4acf('0x1f5')][_0x4acf('0xf0')](this,_0x35e2f6,_0x3d3d9d);}}else{const _0x365918=_0x23df52[_0x4acf('0x1c1')];if(_0xa4235d===_0x4acf('0xad')&&_0x365918[_0x4acf('0x152')](/<NO DEATH CLEAR>/i))return![];if(_0xa4235d===_0x4acf('0x194')&&_0x365918[_0x4acf('0x152')](/<NO RECOVER ALL CLEAR>/i))return![];}}return this['isStateAffected'](_0x23df52['id']);},Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x22b')]=function(){return this[_0x4acf('0xc3')];},Game_BattlerBase['prototype'][_0x4acf('0x3a')]=function(_0x7272a0){this[_0x4acf('0xc3')]=_0x7272a0;},Game_BattlerBase['prototype'][_0x4acf('0x1b')]=function(){this['_stateRetainType']='';},VisuMZ[_0x4acf('0x16e')][_0x4acf('0xe0')]=Game_BattlerBase['prototype'][_0x4acf('0x2ca')],Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x2ca')]=function(){this[_0x4acf('0x3a')](_0x4acf('0xad')),VisuMZ['SkillsStatesCore'][_0x4acf('0xe0')][_0x4acf('0xf0')](this),this[_0x4acf('0x1b')]();},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x50')]=Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0xa7')],Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0xa7')]=function(){this['setStateRetainType'](_0x4acf('0x194')),VisuMZ[_0x4acf('0x16e')][_0x4acf('0x50')][_0x4acf('0xf0')](this),this[_0x4acf('0x1b')]();},Game_BattlerBase[_0x4acf('0x61')]['canPaySkillCost']=function(_0x33a627){for(settings of VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0xec')]){if(_0x4acf('0x10e')!==_0x4acf('0x10e')){function _0x308f9e(){return _0x333a01=_0x5a5a65(_0x2098ad),_0x5c37b7['match'](/#(.*)/i)?_0x4acf('0xae')[_0x4acf('0x7a')](_0x4a398f(_0x16cdd2['$1'])):this[_0x4acf('0x17f')](_0xc913d8(_0x22a381));}}else{const _0x1f7d38=settings[_0x4acf('0xda')][_0x4acf('0xf0')](this,_0x33a627);if(!settings[_0x4acf('0x162')][_0x4acf('0xf0')](this,_0x33a627,_0x1f7d38))return![];}}return!![];},Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x1c5')]=function(_0x1e11e0){for(settings of VisuMZ['SkillsStatesCore']['Settings'][_0x4acf('0xec')]){if(_0x4acf('0x2b2')!==_0x4acf('0xb4')){const _0x4f1a30=settings[_0x4acf('0xda')][_0x4acf('0xf0')](this,_0x1e11e0);settings[_0x4acf('0x36')]['call'](this,_0x1e11e0,_0x4f1a30);}else{function _0x28ad61(){const _0x1bc6d7=_0x875832[_0x4acf('0x16e')][_0x4acf('0x20e')]['Costs'][_0x4acf('0x41')](_0xad8478=>_0xad8478[_0x4acf('0x1ff')]['toUpperCase']()===_0x21f775['toUpperCase']());_0x1bc6d7['length']>=0x1?this[_0x4acf('0x221')]=_0x1bc6d7[0x0]:this[_0x4acf('0x221')]=null;}}}},VisuMZ['SkillsStatesCore'][_0x4acf('0x70')]=Game_BattlerBase['prototype'][_0x4acf('0x10c')],Game_BattlerBase['prototype']['meetsSkillConditions']=function(_0x59deb5){if(!_0x59deb5)return![];if(!VisuMZ[_0x4acf('0x16e')][_0x4acf('0x70')][_0x4acf('0xf0')](this,_0x59deb5))return![];if(!this[_0x4acf('0x2b6')](_0x59deb5))return![];if(!this[_0x4acf('0xfc')](_0x59deb5))return![];if(!this[_0x4acf('0x220')](_0x59deb5))return![];return!![];},Game_BattlerBase['prototype'][_0x4acf('0x2b6')]=function(_0x23435a){if(!this['checkSkillConditionsSwitchNotetags'](_0x23435a))return![];return!![];},Game_BattlerBase['prototype'][_0x4acf('0x86')]=function(_0x3377ff){const _0x587dd7=_0x3377ff[_0x4acf('0x1c1')];if(_0x587dd7[_0x4acf('0x152')](/<ENABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xaa899c=JSON[_0x4acf('0x47')]('['+RegExp['$1'][_0x4acf('0x152')](/\d+/g)+']');for(const _0x83f0f9 of _0xaa899c){if(!$gameSwitches[_0x4acf('0x83')](_0x83f0f9))return![];}return!![];}if(_0x587dd7[_0x4acf('0x152')](/<ENABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0xa6042c=JSON['parse']('['+RegExp['$1'][_0x4acf('0x152')](/\d+/g)+']');for(const _0xc00eb4 of _0xa6042c){if(_0x4acf('0x24c')==='uDigS'){function _0x3ff355(){const _0xdf4713=this[_0x4acf('0x208')][_0xb4fde];return _0x2bde1a[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0x4a')]['MultiplierJS'][_0x4acf('0xf0')](this,_0x2cc2c5,_0xdf4713);}}else{if(!$gameSwitches[_0x4acf('0x83')](_0xc00eb4))return![];}}return!![];}if(_0x587dd7[_0x4acf('0x152')](/<ENABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2e391b=JSON['parse']('['+RegExp['$1'][_0x4acf('0x152')](/\d+/g)+']');for(const _0x101acd of _0x2e391b){if($gameSwitches[_0x4acf('0x83')](_0x101acd))return!![];}return![];}if(_0x587dd7[_0x4acf('0x152')](/<DISABLE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x4acf('0x28b')!==_0x4acf('0x203')){const _0x34c2f9=JSON[_0x4acf('0x47')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1cfbb4 of _0x34c2f9){if(_0x4acf('0x237')===_0x4acf('0x237')){if(!$gameSwitches['value'](_0x1cfbb4))return!![];}else{function _0x3ca8ad(){if(!_0x23de22['SkillsStatesCore']['Settings']['Buffs'][_0x4acf('0x25c')])return;const _0x3f328e=_0x289734[_0x4acf('0x270')](_0x1d4d06),_0x56710f=_0x801542[_0x4acf('0x5d')](_0x419220),_0x5424a1=_0x284c39[_0x4acf('0xba')],_0x11a99d=_0x331341[_0x4acf('0x1d5')]/0x2,_0x7c1ef2=_0x56710f>0x0?_0x23ab79[_0x4acf('0x15c')]():_0x35871b['debuffColor']();this[_0x4acf('0x1df')](_0x7c1ef2),this['changeOutlineColor']('rgba(0,\x200,\x200,\x201)'),this[_0x4acf('0x5e')]['fontBold']=!![],this['contents']['fontSize']=_0x50a96c[_0x4acf('0x16e')]['Settings'][_0x4acf('0x4a')][_0x4acf('0x2a4')],_0x482a93+=_0x393366[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0x4a')][_0x4acf('0x1a')],_0x47f765+=_0x2a335a[_0x4acf('0x16e')]['Settings'][_0x4acf('0x4a')][_0x4acf('0x143')];const _0xd5c888=_0x4acf('0x284')[_0x4acf('0x7a')](_0x1a3c8b['round'](_0x3f328e*0x64));this[_0x4acf('0x19c')](_0xd5c888,_0x5a814e,_0x414530,_0x5424a1,_0x4acf('0x1c')),this['contents'][_0x4acf('0x158')]=![],this[_0x4acf('0x93')]();}}}return![];}else{function _0x4d0153(){if(typeof _0x25da4e!=='number')_0x459422=_0x57f2d7['id'];this[_0x4acf('0x1e3')]=this[_0x4acf('0x1e3')]||{},this['_stateData'][_0x1b5f3a]={};}}}if(_0x587dd7[_0x4acf('0x152')](/<DISABLE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x4acf('0x24')===_0x4acf('0x2c')){function _0x2dd324(){const _0x3cb2be=_0x237169(_0x5761bd['$1']),_0x107ff9=_0x298180[_0x4acf('0x7a')](_0x3cb2be);_0x446cb6['SkillsStatesCore'][_0x4acf('0x257')][_0x583035['id']]=new _0x3644e9(_0x4acf('0x204'),_0x107ff9);}}else{const _0x264400=JSON[_0x4acf('0x47')]('['+RegExp['$1'][_0x4acf('0x152')](/\d+/g)+']');for(const _0x1f9b9d of _0x264400){if(!$gameSwitches[_0x4acf('0x83')](_0x1f9b9d))return!![];}return![];}}if(_0x587dd7['match'](/<DISABLE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x4acf('0x10a')==='ZGZWZ'){function _0xb13d13(){if(typeof _0x522a19!==_0x4acf('0xc2'))_0x451af7=_0x16d8e0['id'];this[_0x4acf('0x62')]=this[_0x4acf('0x62')]||{},this[_0x4acf('0x62')][_0x4b6003]=this[_0x4acf('0x62')][_0x2ce85a]||_0x4acf('0x103');const _0x4dcbbb=this[_0x4acf('0x62')][_0x5d7d76];return this[_0x4acf('0x23e')](_0x4dcbbb);}}else{const _0xa3b001=JSON[_0x4acf('0x47')]('['+RegExp['$1'][_0x4acf('0x152')](/\d+/g)+']');for(const _0xaad265 of _0xa3b001){if($gameSwitches[_0x4acf('0x83')](_0xaad265))return![];}return!![];}}return!![];},Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0xfc')]=function(_0x4b1aae){const _0x54640a=_0x4b1aae[_0x4acf('0x1c1')],_0x8ff4be=VisuMZ[_0x4acf('0x16e')]['skillEnableJS'];if(_0x8ff4be[_0x4b1aae['id']]){if('WyIDm'!==_0x4acf('0x293'))return _0x8ff4be[_0x4b1aae['id']][_0x4acf('0xf0')](this,_0x4b1aae);else{function _0x330ff2(){const _0x2060b0=_0x168ffc['parse']('['+_0x2fbe4c['$1'][_0x4acf('0x152')](/\d+/g)+']');for(const _0x3b61af of _0x2060b0){if(!_0x6dd48[_0x4acf('0x83')](_0x3b61af))return![];}return!![];}}}else return!![];},Game_BattlerBase['prototype'][_0x4acf('0x220')]=function(_0x50c3ce){return VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0x10f')][_0x4acf('0x19e')][_0x4acf('0xf0')](this,_0x50c3ce);},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x1a2')]=Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x29')],Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x29')]=function(_0x74e4fa){for(settings of VisuMZ[_0x4acf('0x16e')]['Settings']['Costs']){if(settings[_0x4acf('0x1ff')][_0x4acf('0x1c8')]()==='MP')return settings[_0x4acf('0xda')][_0x4acf('0xf0')](this,_0x74e4fa);}return VisuMZ[_0x4acf('0x16e')][_0x4acf('0x1a2')]['call'](this,_0x74e4fa);},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x226')]=Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x92')],Game_BattlerBase[_0x4acf('0x61')]['skillTpCost']=function(_0x44c799){for(settings of VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')]['Costs']){if(settings[_0x4acf('0x1ff')][_0x4acf('0x1c8')]()==='TP')return settings[_0x4acf('0xda')][_0x4acf('0xf0')](this,_0x44c799);}return VisuMZ[_0x4acf('0x16e')][_0x4acf('0x226')][_0x4acf('0xf0')](this,_0x44c799);},Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x42')]=function(_0x5b5506){if(typeof _0x5b5506==='number')_0x5b5506=$dataStates[_0x5b5506];return this[_0x4acf('0x266')]()[_0x4acf('0x15')](_0x5b5506);},VisuMZ['SkillsStatesCore'][_0x4acf('0xe8')]=Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x266')],Game_BattlerBase['prototype']['states']=function(){let _0x565095=VisuMZ[_0x4acf('0x16e')]['Game_BattlerBase_states'][_0x4acf('0xf0')](this);return this['addPassiveStates'](_0x565095),_0x565095;},Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x1ca')]=function(_0x59a0df){const _0x383e5d=this[_0x4acf('0xce')]();for(state of _0x383e5d){if(!state)continue;if(!this[_0x4acf('0x2ab')](state)&&_0x59a0df[_0x4acf('0x15')](state))continue;_0x59a0df['push'](state);}_0x383e5d[_0x4acf('0x9f')]>0x0&&_0x59a0df[_0x4acf('0x125')]((_0x4e8b86,_0x14c6e9)=>{const _0x3102d2=_0x4e8b86[_0x4acf('0xf2')],_0x289e17=_0x14c6e9[_0x4acf('0xf2')];if(_0x3102d2!==_0x289e17)return _0x289e17-_0x3102d2;return _0x4e8b86-_0x14c6e9;});},Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x2ab')]=function(_0x24ef2f){return _0x24ef2f[_0x4acf('0x1c1')]['match'](/<PASSIVE STACKABLE>/i);},Game_BattlerBase['prototype'][_0x4acf('0x238')]=function(){const _0x31a605=[];for(const _0x4b2387 of this[_0x4acf('0x277')]['passiveStates']){const _0x8b09db=$dataStates[_0x4b2387];if(!_0x8b09db)continue;if(!this[_0x4acf('0x13e')](_0x8b09db))continue;_0x31a605[_0x4acf('0x52')](_0x8b09db);}return _0x31a605;},Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x13e')]=function(_0x4ceea3){if(!this[_0x4acf('0x14')](_0x4ceea3))return![];if(!this[_0x4acf('0x6f')](_0x4ceea3))return![];if(!this[_0x4acf('0x187')](_0x4ceea3))return![];return!![];},Game_BattlerBase[_0x4acf('0x61')]['meetsPassiveStateConditionSwitches']=function(_0x44219f){const _0x38452f=_0x44219f[_0x4acf('0x1c1')];if(_0x38452f[_0x4acf('0x152')](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x41ea00=JSON[_0x4acf('0x47')]('['+RegExp['$1'][_0x4acf('0x152')](/\d+/g)+']');for(const _0xc7b34c of _0x41ea00){if(!$gameSwitches[_0x4acf('0x83')](_0xc7b34c))return![];}return!![];}if(_0x38452f['match'](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x59dbaa=JSON[_0x4acf('0x47')]('['+RegExp['$1'][_0x4acf('0x152')](/\d+/g)+']');for(const _0x338a45 of _0x59dbaa){if(_0x4acf('0x2d0')===_0x4acf('0x2a2')){function _0x94141c(){_0x48936c[_0x4acf('0xd2')](_0x182b8c,_0x575abb),this[_0x4acf('0x22')](_0x3de09a);}}else{if(!$gameSwitches[_0x4acf('0x83')](_0x338a45))return![];}}return!![];}if(_0x38452f['match'](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]ON:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x82d9b9=JSON[_0x4acf('0x47')]('['+RegExp['$1'][_0x4acf('0x152')](/\d+/g)+']');for(const _0x4dfd13 of _0x82d9b9){if(_0x4acf('0x114')===_0x4acf('0x114')){if($gameSwitches[_0x4acf('0x83')](_0x4dfd13))return!![];}else{function _0x2675e1(){return _0x4c0fc8[_0x4acf('0x37')];}}}return![];}if(_0x38452f['match'](/<PASSIVE CONDITION[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x47d192=JSON[_0x4acf('0x47')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x1b97f0 of _0x47d192){if(!$gameSwitches[_0x4acf('0x83')](_0x1b97f0))return!![];}return![];}if(_0x38452f['match'](/<PASSIVE CONDITION ALL[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x30881d=JSON[_0x4acf('0x47')]('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x2ddf8b of _0x30881d){if(!$gameSwitches[_0x4acf('0x83')](_0x2ddf8b))return!![];}return![];}if(_0x38452f[_0x4acf('0x152')](/<PASSIVE CONDITION ANY[ ](?:SWITCH|SWITCHES)[ ]OFF:[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x5d7e57=JSON[_0x4acf('0x47')]('['+RegExp['$1'][_0x4acf('0x152')](/\d+/g)+']');for(const _0x187fa2 of _0x5d7e57){if($gameSwitches['value'](_0x187fa2))return![];}return!![];}return!![];},Game_BattlerBase['prototype'][_0x4acf('0x6f')]=function(_0x1cecfd){const _0x548180=VisuMZ[_0x4acf('0x16e')][_0x4acf('0x2b5')];if(_0x548180[_0x1cecfd['id']]&&!_0x548180[_0x1cecfd['id']][_0x4acf('0xf0')](this,_0x1cecfd))return![];return!![];},Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x187')]=function(_0x4cec08){return VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0x1e2')][_0x4acf('0x269')][_0x4acf('0xf0')](this,_0x4cec08);},Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0xce')]=function(){if(this[_0x4acf('0x267')](_0x4acf('0xce')))return this['convertPassiveStates']();return this[_0x4acf('0x277')][_0x4acf('0xce')]=[],this[_0x4acf('0x29e')](),this[_0x4acf('0x1c7')](),this[_0x4acf('0x1d9')](),this['convertPassiveStates']();},Game_BattlerBase['prototype'][_0x4acf('0x29e')]=function(){if(Imported[_0x4acf('0xbb')])this[_0x4acf('0x1a0')]();},Game_BattlerBase['prototype'][_0x4acf('0x138')]=function(){return[];},Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x1c7')]=function(){const _0x28819f=this[_0x4acf('0x138')]();for(const _0x1464e8 of _0x28819f){if(_0x4acf('0x2be')==='TpoLc'){function _0x2b8f63(){const _0x4bad1d=_0x2479fc['boxWidth']-this[_0x4acf('0x1ee')](),_0x2f9545=this['_skillTypeWindow'][_0x4acf('0x227')],_0x1e46c1=this[_0x4acf('0x6b')]()?0x0:_0x16b600['boxWidth']-_0x4bad1d,_0x3cd3c3=this[_0x4acf('0x18d')]();return new _0x52438a(_0x1e46c1,_0x3cd3c3,_0x4bad1d,_0x2f9545);}}else{if(!_0x1464e8)continue;const _0x289664=_0x1464e8[_0x4acf('0x1c1')][_0x4acf('0x152')](/<PASSIVE (?:STATE|STATES):[ ](.*)>/gi);if(_0x289664)for(const _0x45a5c9 of _0x289664){_0x45a5c9[_0x4acf('0x152')](/<PASSIVE (?:STATE|STATES):[ ](.*)>/i);const _0x44d962=RegExp['$1'];if(_0x44d962[_0x4acf('0x152')](/(\d+(?:\s*,\s*\d+)*)/i)){const _0x371a74=JSON[_0x4acf('0x47')]('['+RegExp['$1'][_0x4acf('0x152')](/\d+/g)+']');this[_0x4acf('0x277')]['passiveStates']=this[_0x4acf('0x277')]['passiveStates'][_0x4acf('0x17e')](_0x371a74);}else{if(_0x4acf('0x10d')!==_0x4acf('0xf1')){const _0x57c9a5=_0x44d962[_0x4acf('0x1ac')](',');for(const _0x145588 of _0x57c9a5){if(_0x4acf('0x154')!==_0x4acf('0x154')){function _0x7fb359(){const _0x56588c=_0x1fb867[_0x4acf('0x47')]('['+_0x2561e7['$1']['match'](/\d+/g)+']');for(const _0x471762 of _0x56588c){if(!_0x21663c[_0x4acf('0x83')](_0x471762))return!![];}return![];}}else{const _0x1230b1=DataManager[_0x4acf('0x129')](_0x145588);if(_0x1230b1)this['_cache'][_0x4acf('0xce')][_0x4acf('0x52')](_0x1230b1);}}}else{function _0x5ccd2d(){return _0x5dc0e1[_0x4acf('0x16e')]['Settings']['Skills'][_0x4acf('0x264')][_0x4acf('0xf0')](this);}}}}}}},Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x1d9')]=function(){const _0x2ffd6a=VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0x1e2')][_0x4acf('0x205')];this[_0x4acf('0x277')][_0x4acf('0xce')]=this[_0x4acf('0x277')][_0x4acf('0xce')]['concat'](_0x2ffd6a);},Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x1af')]=function(_0x2b31b3){if(typeof _0x2b31b3!=='number')_0x2b31b3=_0x2b31b3['id'];return this[_0x4acf('0x17')][_0x2b31b3]||0x0;},Game_BattlerBase[_0x4acf('0x61')]['setStateTurns']=function(_0x56dda7,_0x564dd8){if(typeof _0x56dda7!==_0x4acf('0xc2'))_0x56dda7=_0x56dda7['id'];if(this['isStateAffected'](_0x56dda7)){if(_0x4acf('0x4b')!=='XzwSu'){const _0x502173=DataManager[_0x4acf('0x159')](_0x56dda7);this[_0x4acf('0x17')][_0x56dda7]=_0x564dd8['clamp'](0x0,_0x502173);if(this['_stateTurns'][_0x56dda7]<=0x0)this[_0x4acf('0x2cd')](_0x56dda7);}else{function _0x4205a9(){if(!_0x21bb3a)return;_0x20600b[_0x4acf('0x16e')][_0x4acf('0x210')][_0x4acf('0xf0')](this,_0x59dfa8,_0xfdf0be,_0x1548b9,_0x196e25),this[_0x4acf('0x19')](_0x48aec7,_0x20e69c,_0x3291b9,_0x3c7579);}}}},Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x1c9')]=function(_0x2de972,_0x598310){if(typeof _0x2de972!==_0x4acf('0xc2'))_0x2de972=_0x2de972['id'];this['isStateAffected'](_0x2de972)&&(_0x598310+=this['stateTurns'](_0x2de972),this[_0x4acf('0x20')](_0x2de972,_0x598310));},VisuMZ['SkillsStatesCore']['Game_BattlerBase_eraseBuff']=Game_BattlerBase[_0x4acf('0x61')]['eraseBuff'],Game_BattlerBase['prototype'][_0x4acf('0x228')]=function(_0x52df9b){const _0x581521=this[_0x4acf('0x208')][_0x52df9b];VisuMZ[_0x4acf('0x16e')][_0x4acf('0x12')][_0x4acf('0xf0')](this,_0x52df9b);if(_0x581521>0x0)this['onEraseBuff'](_0x52df9b);if(_0x581521<0x0)this[_0x4acf('0x211')](_0x52df9b);},VisuMZ[_0x4acf('0x16e')][_0x4acf('0xd0')]=Game_BattlerBase['prototype'][_0x4acf('0xf6')],Game_BattlerBase['prototype'][_0x4acf('0xf6')]=function(_0x421064){VisuMZ[_0x4acf('0x16e')]['Game_BattlerBase_increaseBuff']['call'](this,_0x421064);if(!this[_0x4acf('0x3d')](_0x421064))this[_0x4acf('0x228')](_0x421064);},VisuMZ[_0x4acf('0x16e')]['Game_BattlerBase_decreaseBuff']=Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x136')],Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x136')]=function(_0x1f0550){VisuMZ[_0x4acf('0x16e')]['Game_BattlerBase_decreaseBuff'][_0x4acf('0xf0')](this,_0x1f0550);if(!this['isBuffOrDebuffAffected'](_0x1f0550))this[_0x4acf('0x228')](_0x1f0550);},Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x88')]=function(_0x2f3e9e){},Game_BattlerBase['prototype'][_0x4acf('0x211')]=function(_0x132a00){},Game_BattlerBase[_0x4acf('0x61')]['isMaxBuffAffected']=function(_0x1a46c9){return this[_0x4acf('0x208')][_0x1a46c9]===VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0x4a')]['StackBuffMax'];},Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x1cd')]=function(_0x2bc5de){return this[_0x4acf('0x208')][_0x2bc5de]===-VisuMZ[_0x4acf('0x16e')]['Settings'][_0x4acf('0x4a')][_0x4acf('0x3f')];},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x1d')]=Game_BattlerBase[_0x4acf('0x61')]['buffIconIndex'],Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x24d')]=function(_0x5e401a,_0x2a9f49){return _0x5e401a=_0x5e401a['clamp'](-0x2,0x2),VisuMZ[_0x4acf('0x16e')][_0x4acf('0x1d')][_0x4acf('0xf0')](this,_0x5e401a,_0x2a9f49);},Game_BattlerBase['prototype'][_0x4acf('0x270')]=function(_0x52ba19){const _0x180bb5=this[_0x4acf('0x208')][_0x52ba19];return VisuMZ['SkillsStatesCore']['Settings'][_0x4acf('0x4a')][_0x4acf('0x2c9')][_0x4acf('0xf0')](this,_0x52ba19,_0x180bb5);},Game_BattlerBase['prototype'][_0x4acf('0x2d')]=function(_0x6237f){return this[_0x4acf('0x80')][_0x6237f]||0x0;},Game_BattlerBase['prototype'][_0x4acf('0xb8')]=function(_0x240204){return this[_0x4acf('0x2d')](_0x240204);},Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0xd2')]=function(_0x36dc67,_0x3f0fa7){if(this[_0x4acf('0x27a')](_0x36dc67)){if('OUovy'!==_0x4acf('0x130')){const _0x5e9d6c=VisuMZ[_0x4acf('0x16e')]['Settings'][_0x4acf('0x4a')][_0x4acf('0x71')];this['_buffTurns'][_0x36dc67]=_0x3f0fa7[_0x4acf('0x1fc')](0x0,_0x5e9d6c);}else{function _0x1369e4(){const _0x188ee9=this[_0x4acf('0x232')](_0x1e4763);this[_0x4acf('0x1ba')](_0x188ee9,_0x4acf('0x147'),!![],_0x13f652);}}}},Game_BattlerBase[_0x4acf('0x61')]['addBuffTurns']=function(_0x21ea1a,_0x5c1435){this[_0x4acf('0x27a')](_0x21ea1a)&&(_0x5c1435+=this[_0x4acf('0x2d')](stateId),this[_0x4acf('0x20')](_0x21ea1a,_0x5c1435));},Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x2b1')]=function(_0x3ce626,_0x16e33d){if(this[_0x4acf('0x206')](_0x3ce626)){const _0x28e366=VisuMZ['SkillsStatesCore'][_0x4acf('0x20e')][_0x4acf('0x4a')][_0x4acf('0x71')];this[_0x4acf('0x80')][_0x3ce626]=_0x16e33d[_0x4acf('0x1fc')](0x0,_0x28e366);}},Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x2a1')]=function(_0x8904d9,_0x365ab7){if(this[_0x4acf('0x206')](_0x8904d9)){if(_0x4acf('0x2bf')!=='IALtd')_0x365ab7+=this[_0x4acf('0x2d')](stateId),this[_0x4acf('0x20')](_0x8904d9,_0x365ab7);else{function _0x5237dc(){_0x14540d=_0x2cf4f2,_0x53f9cf+=_0x5b80ce;}}}},Game_BattlerBase['prototype'][_0x4acf('0x182')]=function(_0x22474b){if(typeof _0x22474b!==_0x4acf('0xc2'))_0x22474b=_0x22474b['id'];return this[_0x4acf('0x1e3')]=this[_0x4acf('0x1e3')]||{},this[_0x4acf('0x1e3')][_0x22474b]=this[_0x4acf('0x1e3')][_0x22474b]||{},this[_0x4acf('0x1e3')][_0x22474b];},Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0xc1')]=function(_0x3f58c4,_0x347082){if(typeof _0x3f58c4!==_0x4acf('0xc2'))_0x3f58c4=_0x3f58c4['id'];const _0x40d508=this['stateData'](_0x3f58c4);return _0x40d508[_0x347082];},Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x1f0')]=function(_0x560597,_0x434216,_0x35b544){if(typeof _0x560597!==_0x4acf('0xc2'))_0x560597=_0x560597['id'];const _0x5ab22b=this['stateData'](_0x560597);_0x5ab22b[_0x434216]=_0x35b544;},Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0xc0')]=function(_0x332d86){if(typeof _0x332d86!==_0x4acf('0xc2'))_0x332d86=_0x332d86['id'];this[_0x4acf('0x1e3')]=this[_0x4acf('0x1e3')]||{},this[_0x4acf('0x1e3')][_0x332d86]={};},Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x28c')]=function(_0x303e1c){if(typeof _0x303e1c!==_0x4acf('0xc2'))_0x303e1c=_0x303e1c['id'];this[_0x4acf('0x233')]=this[_0x4acf('0x233')]||{};if(this['_stateDisplay'][_0x303e1c]===undefined){if('MNGVU'!==_0x4acf('0x112')){function _0x5c8e67(){_0x3068da[_0x4acf('0x61')][_0x4acf('0x2c4')]['call'](this,_0x53dc99),this[_0x4acf('0x1ec')](_0x4b5d5b),this[_0x4acf('0x24f')](_0x1daa1f);}}else this[_0x4acf('0x233')][_0x303e1c]='';}return this['_stateDisplay'][_0x303e1c];},Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x131')]=function(_0x292d11,_0x2757bc){if(typeof _0x292d11!==_0x4acf('0xc2'))_0x292d11=_0x292d11['id'];this[_0x4acf('0x233')]=this[_0x4acf('0x233')]||{},this['_stateDisplay'][_0x292d11]=_0x2757bc;},Game_BattlerBase[_0x4acf('0x61')]['clearStateDisplay']=function(_0x139a19){if(typeof _0x139a19!==_0x4acf('0xc2'))_0x139a19=_0x139a19['id'];this[_0x4acf('0x233')]=this['_stateDisplay']||{},this['_stateDisplay'][_0x139a19]='';},Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x165')]=function(_0x236f27){if(typeof _0x236f27!=='number')_0x236f27=_0x236f27['id'];this['_stateOrigin']=this[_0x4acf('0x62')]||{},this[_0x4acf('0x62')][_0x236f27]=this[_0x4acf('0x62')][_0x236f27]||_0x4acf('0x103');const _0x4f6238=this['_stateOrigin'][_0x236f27];return this[_0x4acf('0x23e')](_0x4f6238);},Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x99')]=function(_0x50b41f,_0x2e450c){this[_0x4acf('0x62')]=this[_0x4acf('0x62')]||{};const _0xb36906=_0x2e450c?this[_0x4acf('0x21a')](_0x2e450c):this['getCurrentStateOriginKey']();this[_0x4acf('0x62')][_0x50b41f]=_0xb36906;},Game_BattlerBase['prototype']['clearStateOrigin']=function(_0x4fa2a7){this[_0x4acf('0x62')]=this[_0x4acf('0x62')]||{},delete this['_stateOrigin'][_0x4fa2a7];},Game_BattlerBase['prototype'][_0x4acf('0xaf')]=function(){const _0x35179e=this[_0x4acf('0x27e')]();return this[_0x4acf('0x21a')](_0x35179e);},Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x27e')]=function(){if($gameParty['inBattle']()){if(_0x4acf('0x18f')!==_0x4acf('0x1ea')){if(BattleManager[_0x4acf('0x59')]){if(_0x4acf('0x18')!==_0x4acf('0x39'))return BattleManager[_0x4acf('0x59')];else{function _0x286a7c(){return this[_0x4acf('0x2d')](_0xdfaa75);}}}else{if(BattleManager[_0x4acf('0x127')])return BattleManager['_currentActor'];}}else{function _0xc59a9(){_0x5797b8[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0x4a')][_0x4acf('0x1b2')][_0x4acf('0xf0')](this,_0x3a46d0);}}}else{const _0xf7d139=SceneManager[_0x4acf('0x2cb')];if(![Scene_Map,Scene_Item][_0x4acf('0x15')](_0xf7d139[_0x4acf('0x171')])){if(_0x4acf('0x73')==='YkKcR')return $gameParty[_0x4acf('0x181')]();else{function _0x1db5f7(){if(!this[_0x4acf('0x14')](_0x14e46b))return![];if(!this[_0x4acf('0x6f')](_0xa393a1))return![];if(!this['meetsPassiveStateGlobalConditionJS'](_0x59c5c8))return![];return!![];}}}}return this;},Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x21a')]=function(_0x69653d){if(!_0x69653d)return _0x4acf('0x103');if(_0x69653d[_0x4acf('0x1c4')]()){if('KZZps'===_0x4acf('0x261'))return _0x4acf('0x44')[_0x4acf('0x7a')](_0x69653d['actorId']());else{function _0x504560(){this[_0x4acf('0x2e')][_0x4452ac]=_0x4acf('0xae')[_0x4acf('0x7a')](_0x58456d(_0x453376['$1']));}}}else{const _0x4b0bad=_0x4acf('0x2a5')['format'](_0x69653d['enemyId']()),_0x2a069b=_0x4acf('0x26d')[_0x4acf('0x7a')](_0x69653d[_0x4acf('0x1e9')]()),_0x1bc706=_0x4acf('0xa2')[_0x4acf('0x7a')]($gameTroop[_0x4acf('0x116')]());return _0x4acf('0x14e')['format'](_0x4b0bad,_0x2a069b,_0x1bc706);}return _0x4acf('0x103');},Game_BattlerBase[_0x4acf('0x61')]['getStateOriginByKey']=function(_0x598716){if(_0x598716===_0x4acf('0x103'))return this;else{if(_0x598716[_0x4acf('0x152')](/<actor-(\d+)>/i))return $gameActors[_0x4acf('0x235')](Number(RegExp['$1']));else{if($gameParty[_0x4acf('0x6')]()&&_0x598716[_0x4acf('0x152')](/<troop-(\d+)>/i)){const _0x57e18d=Number(RegExp['$1']);if(_0x57e18d===$gameTroop[_0x4acf('0x116')]()){if(_0x598716[_0x4acf('0x152')](/<member-(\d+)>/i))return $gameTroop[_0x4acf('0x198')]()[Number(RegExp['$1'])];}}if(_0x598716[_0x4acf('0x152')](/<enemy-(\d+)>/i))return new Game_Enemy(Number(RegExp['$1']),-0x1f4,-0x1f4);}}return this;},VisuMZ['SkillsStatesCore'][_0x4acf('0x74')]=Game_Battler[_0x4acf('0x61')][_0x4acf('0x1d3')],Game_Battler[_0x4acf('0x61')][_0x4acf('0x1d3')]=function(_0x4e0f5e){VisuMZ[_0x4acf('0x16e')][_0x4acf('0x74')][_0x4acf('0xf0')](this,_0x4e0f5e);if(this[_0x4acf('0x42')]($dataStates[_0x4e0f5e])){if(_0x4acf('0x4')===_0x4acf('0x4')){this[_0x4acf('0xe')](_0x4e0f5e);;}else{function _0x52b9d1(){return this[_0x4acf('0x6c')](_0x5c18b6);}}}},Game_Battler[_0x4acf('0x61')][_0x4acf('0xe')]=function(_0x5c1804){this[_0x4acf('0x99')](_0x5c1804),this['onAddStateMakeCustomSlipValues'](_0x5c1804),this[_0x4acf('0x31')](_0x5c1804),this[_0x4acf('0x25e')](_0x5c1804);},Game_Battler[_0x4acf('0x61')][_0x4acf('0x2c4')]=function(_0x54ef8a){Game_BattlerBase[_0x4acf('0x61')]['onRemoveState'][_0x4acf('0xf0')](this,_0x54ef8a),this[_0x4acf('0x1ec')](_0x54ef8a),this[_0x4acf('0x24f')](_0x54ef8a);},Game_Battler['prototype'][_0x4acf('0x135')]=function(_0x42f9e4){for(const _0x443846 of this[_0x4acf('0x266')]()){if(_0x4acf('0x101')==='XFZog'){if(this[_0x4acf('0x214')](_0x443846['id'])&&_0x443846['autoRemovalTiming']===_0x42f9e4){if(_0x4acf('0xf')!==_0x4acf('0xf')){function _0x28ace0(){this[_0x4acf('0x115')][_0xb78a6]=_0x4be414(_0x407f32['$1']);}}else this[_0x4acf('0x2cd')](_0x443846['id']),this[_0x4acf('0x26b')](_0x443846['id']),this['onExpireStateGlobalJS'](_0x443846['id']);}}else{function _0x363368(){_0x552c5c[_0x4acf('0x16e')][_0x4acf('0x8d')][_0x4acf('0xf0')](this),this[_0x4acf('0x11b')]()&&this[_0x4acf('0x209')]();}}}},Game_Battler[_0x4acf('0x61')][_0x4acf('0x26b')]=function(_0x337405){this[_0x4acf('0xbc')](_0x337405);},Game_Battler[_0x4acf('0x61')][_0x4acf('0x31')]=function(_0x3d8277){const _0x3fef58=VisuMZ[_0x4acf('0x16e')][_0x4acf('0x257')];if(_0x3fef58[_0x3d8277])_0x3fef58[_0x3d8277]['call'](this,_0x3d8277);},Game_Battler[_0x4acf('0x61')][_0x4acf('0x1ec')]=function(_0x5b4fc2){const _0x2cdf8f=VisuMZ[_0x4acf('0x16e')][_0x4acf('0x1a8')];if(_0x2cdf8f[_0x5b4fc2])_0x2cdf8f[_0x5b4fc2][_0x4acf('0xf0')](this,_0x5b4fc2);},Game_Battler[_0x4acf('0x61')][_0x4acf('0xbc')]=function(_0x452359){const _0x431e57=VisuMZ[_0x4acf('0x16e')][_0x4acf('0x265')];if(_0x431e57[_0x452359])_0x431e57[_0x452359][_0x4acf('0xf0')](this,_0x452359);},Game_Battler[_0x4acf('0x61')][_0x4acf('0x25e')]=function(_0x1480bb){try{if(_0x4acf('0x258')==='myjJp')VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0xe6')][_0x4acf('0x35')][_0x4acf('0xf0')](this,_0x1480bb);else{function _0x1b7599(){this[_0x4acf('0x115')]=this[_0x4acf('0x115')]||{};if(this['_stateMaxTurns'][_0x1a6afc])return this['_stateMaxTurns'][_0x39d0ec];return _0x5866c3[_0x234cfd]['note'][_0x4acf('0x152')](/<MAX TURNS:[ ](\d+)>/i)?this[_0x4acf('0x115')][_0x368a07]=_0x432a13(_0x2afc52['$1']):this[_0x4acf('0x115')][_0x2e7b8e]=_0x3142a8[_0x4acf('0x16e')]['Settings']['States'][_0x4acf('0x71')],this[_0x4acf('0x115')][_0x216647];}}}catch(_0x3d7f20){if('weFik'===_0x4acf('0xd3')){function _0x2ebfb3(){return _0xd45d08(_0x70078d['$1']);}}else{if($gameTemp[_0x4acf('0xb5')]())console[_0x4acf('0x69')](_0x3d7f20);}}},Game_Battler[_0x4acf('0x61')][_0x4acf('0x24f')]=function(_0x2979ce){try{VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')]['States']['onEraseStateJS'][_0x4acf('0xf0')](this,_0x2979ce);}catch(_0x5820f7){if($gameTemp['isPlaytest']())console[_0x4acf('0x69')](_0x5820f7);}},Game_Battler[_0x4acf('0x61')][_0x4acf('0x1ab')]=function(_0x1899fc){try{if(_0x4acf('0x65')==='txmyB')VisuMZ[_0x4acf('0x16e')]['Settings'][_0x4acf('0xe6')][_0x4acf('0x14d')][_0x4acf('0xf0')](this,_0x1899fc);else{function _0x5d0123(){_0x56d859(_0x4acf('0x3e')['format'](_0xd70e2d,_0x3c0f83,_0x444ead)),_0x11ec53[_0x4acf('0x1bf')]();}}}catch(_0x4592ec){if(_0x4acf('0x1b6')===_0x4acf('0x1b6')){if($gameTemp['isPlaytest']())console[_0x4acf('0x69')](_0x4592ec);}else{function _0x4ced82(){const _0x45f26b=this[_0x4acf('0x22a')](),_0x1e64da=_0x16808f[_0x4acf('0x4f')]((_0x33b6b4-0x2)*_0x45f26b),_0x15f1ca=_0x306960-0x2,_0x1befa0=this['gaugeBackColor']();this[_0x4acf('0x8a')][_0x4acf('0xd4')](_0x1da132,_0x38701a,_0x36564c,_0x306e03,_0x1befa0),this[_0x4acf('0x8a')][_0x4acf('0x5f')](_0x3bf00e+0x1,_0x247493+0x1,_0x1e64da,_0x15f1ca,_0x230b31,_0x5017e2);}}}},Game_Battler['prototype'][_0x4acf('0x296')]=function(_0x3b1333){return _0x3b1333=_0x3b1333[_0x4acf('0x1c8')]()[_0x4acf('0x13f')](),this[_0x4acf('0x266')]()[_0x4acf('0x41')](_0x11ed4f=>_0x11ed4f[_0x4acf('0x89')]['includes'](_0x3b1333));},Game_Battler[_0x4acf('0x61')][_0x4acf('0x2f')]=function(_0x397efa,_0x1abe1b){_0x397efa=_0x397efa[_0x4acf('0x1c8')]()[_0x4acf('0x13f')](),_0x1abe1b=_0x1abe1b||0x0;const _0x24aa20=this[_0x4acf('0x296')](_0x397efa);for(state of _0x24aa20){if(_0x1abe1b<=0x0)return;this['removeState'](state['id']),this[_0x4acf('0x166')][_0x4acf('0x157')]=!![],_0x1abe1b--;}},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x51')]=Game_Battler[_0x4acf('0x61')][_0x4acf('0x2b0')],Game_Battler['prototype'][_0x4acf('0x2b0')]=function(_0x16aeb0,_0x5e254a){VisuMZ[_0x4acf('0x16e')]['Game_Battler_addBuff'][_0x4acf('0xf0')](this,_0x16aeb0,_0x5e254a),this[_0x4acf('0x27a')](_0x16aeb0)&&this[_0x4acf('0x1f2')](_0x16aeb0,_0x5e254a);},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x21')]=Game_Battler[_0x4acf('0x61')][_0x4acf('0xb')],Game_Battler[_0x4acf('0x61')][_0x4acf('0xb')]=function(_0x29a876,_0x2f9a0a){VisuMZ[_0x4acf('0x16e')][_0x4acf('0x21')][_0x4acf('0xf0')](this,_0x29a876,_0x2f9a0a),this[_0x4acf('0x206')](_0x29a876)&&this['onAddDebuff'](_0x29a876,_0x2f9a0a);},Game_Battler[_0x4acf('0x61')][_0x4acf('0x13b')]=function(){for(let _0x2d544e=0x0;_0x2d544e<this[_0x4acf('0xd8')]();_0x2d544e++){if(_0x4acf('0xb7')==='ORqRu'){if(this[_0x4acf('0xcf')](_0x2d544e)){const _0x4b04c3=this[_0x4acf('0x208')][_0x2d544e];this[_0x4acf('0x1b7')](_0x2d544e);if(_0x4b04c3>0x0)this[_0x4acf('0x1d2')](_0x2d544e);if(_0x4b04c3<0x0)this[_0x4acf('0x1a3')](_0x2d544e);}}else{function _0x2133a3(){this['commandName'](_0x47ae81)[_0x4acf('0x152')](/\\I\[(\d+)\]/i);const _0x10f6c1=_0x5d266f(_0x24cb0d['$1'])||0x0,_0x2dd046=this['itemLineRect'](_0xba8603),_0x45d041=_0x2dd046['x']+_0x567c49[_0x4acf('0x4f')]((_0x2dd046[_0x4acf('0x97')]-_0x519545[_0x4acf('0xba')])/0x2),_0x12a9bb=_0x2dd046['y']+(_0x2dd046[_0x4acf('0x227')]-_0x36071d['iconHeight'])/0x2;this[_0x4acf('0x1b9')](_0x10f6c1,_0x45d041,_0x12a9bb);}}}},Game_Battler['prototype'][_0x4acf('0x1f2')]=function(_0x56d523,_0x37aba8){this[_0x4acf('0x219')](_0x56d523,_0x37aba8);},Game_Battler[_0x4acf('0x61')][_0x4acf('0x90')]=function(_0x36925c,_0x56d3d6){this[_0x4acf('0xea')](_0x36925c,_0x56d3d6);},Game_Battler['prototype']['onEraseBuff']=function(_0xc93be){Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x88')]['call'](this,_0xc93be),this[_0x4acf('0x7f')](_0xc93be);},Game_Battler['prototype'][_0x4acf('0x211')]=function(_0x4b5c19){Game_BattlerBase['prototype'][_0x4acf('0x211')][_0x4acf('0xf0')](this,_0x4b5c19),this[_0x4acf('0x25d')](_0x4b5c19);},Game_Battler[_0x4acf('0x61')][_0x4acf('0x1d2')]=function(_0x31e455){this[_0x4acf('0xbd')](_0x31e455);},Game_Battler[_0x4acf('0x61')]['onExpireDebuff']=function(_0xdbbb0e){this['onExpireDebuffGlobalJS'](_0xdbbb0e);},Game_Battler[_0x4acf('0x61')][_0x4acf('0x219')]=function(_0x15aab0,_0x13cd3c){VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0x4a')][_0x4acf('0x193')][_0x4acf('0xf0')](this,_0x15aab0,_0x13cd3c);},Game_Battler[_0x4acf('0x61')][_0x4acf('0xea')]=function(_0x38a130,_0x61a105){VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0x4a')][_0x4acf('0x16')]['call'](this,_0x38a130,_0x61a105);},Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x7f')]=function(_0x1e5114){VisuMZ['SkillsStatesCore'][_0x4acf('0x20e')][_0x4acf('0x4a')][_0x4acf('0x1b2')][_0x4acf('0xf0')](this,_0x1e5114);},Game_BattlerBase[_0x4acf('0x61')][_0x4acf('0x25d')]=function(_0x62ef5b){VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0x4a')][_0x4acf('0x278')][_0x4acf('0xf0')](this,_0x62ef5b);},Game_Battler['prototype'][_0x4acf('0xbd')]=function(_0x91ce28){VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0x4a')][_0x4acf('0xff')][_0x4acf('0xf0')](this,_0x91ce28);},Game_Battler[_0x4acf('0x61')]['onExpireDebuffGlobalJS']=function(_0x1c031f){VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0x4a')]['onExpireDebuffJS'][_0x4acf('0xf0')](this,_0x1c031f);},Game_Battler[_0x4acf('0x61')][_0x4acf('0x2c7')]=function(_0x36c148){const _0x1d3701=VisuMZ[_0x4acf('0x16e')],_0x34acfb=[_0x4acf('0x2b4'),_0x4acf('0x1e'),_0x4acf('0x1bb'),_0x4acf('0xf4'),_0x4acf('0x282'),_0x4acf('0x186')];for(const _0xf6d810 of _0x34acfb){_0x1d3701[_0xf6d810][_0x36c148]&&_0x1d3701[_0xf6d810][_0x36c148]['call'](this,_0x36c148);}},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x200')]=Game_Battler[_0x4acf('0x61')][_0x4acf('0x76')],Game_Battler[_0x4acf('0x61')][_0x4acf('0x76')]=function(){VisuMZ['SkillsStatesCore'][_0x4acf('0x200')][_0x4acf('0xf0')](this),this[_0x4acf('0x249')]();},Game_Battler[_0x4acf('0x61')][_0x4acf('0x249')]=function(){if(!this[_0x4acf('0x243')]())return;const _0x5e4f16=this[_0x4acf('0x266')]();for(const _0x2ddea2 of _0x5e4f16){if(!_0x2ddea2)continue;this[_0x4acf('0x262')](_0x2ddea2);}},Game_Battler[_0x4acf('0x61')][_0x4acf('0x262')]=function(_0x39d0e6){const _0x42085f=this['getStateData'](_0x39d0e6['id'],_0x4acf('0x2cc'))||0x0,_0x703e05=-this[_0x4acf('0xe5')](),_0x13be9f=Math[_0x4acf('0xf3')](_0x42085f,_0x703e05);if(_0x13be9f!==0x0)this[_0x4acf('0x273')](_0x13be9f);const _0x1bd72e=this[_0x4acf('0xc1')](_0x39d0e6['id'],_0x4acf('0x2c8'))||0x0;if(_0x1bd72e!==0x0)this[_0x4acf('0x218')](_0x1bd72e);const _0x45421e=this[_0x4acf('0xc1')](_0x39d0e6['id'],_0x4acf('0x5'))||0x0;if(_0x45421e!==0x0)this[_0x4acf('0x29a')](_0x1bd72e);},VisuMZ[_0x4acf('0x16e')][_0x4acf('0xfd')]=Game_Actor[_0x4acf('0x61')][_0x4acf('0x46')],Game_Actor[_0x4acf('0x61')]['skillTypes']=function(){const _0x26091b=VisuMZ[_0x4acf('0x16e')][_0x4acf('0xfd')][_0x4acf('0xf0')](this),_0x4471b5=VisuMZ['SkillsStatesCore'][_0x4acf('0x20e')][_0x4acf('0x10f')];let _0x5ef3ef=_0x4471b5[_0x4acf('0x12e')];return $gameParty[_0x4acf('0x6')]()&&(_0x5ef3ef=_0x5ef3ef[_0x4acf('0x17e')](_0x4471b5[_0x4acf('0x108')])),_0x26091b[_0x4acf('0x41')](_0x55031c=>!_0x5ef3ef[_0x4acf('0x15')](_0x55031c));},Game_Actor[_0x4acf('0x61')][_0x4acf('0x174')]=function(){return this[_0x4acf('0x22c')]()[_0x4acf('0x41')](_0x27fe39=>this[_0x4acf('0x1b3')](_0x27fe39));},Game_Actor[_0x4acf('0x61')][_0x4acf('0x1b3')]=function(_0x278a60){if(!this[_0x4acf('0x43')](_0x278a60))return![];const _0x413e62=this[_0x4acf('0x46')](),_0x2b0b2c=DataManager[_0x4acf('0x100')](_0x278a60),_0x28811b=_0x413e62['filter'](_0x446972=>_0x2b0b2c[_0x4acf('0x15')](_0x446972));return _0x28811b['length']>0x0;},Game_Actor[_0x4acf('0x61')][_0x4acf('0x138')]=function(){let _0x115ec6=[this[_0x4acf('0x235')](),this[_0x4acf('0x5a')]()];_0x115ec6=_0x115ec6[_0x4acf('0x17e')](this[_0x4acf('0xd7')]()[_0x4acf('0x41')](_0x485507=>_0x485507));for(const _0x2488d0 of this['_skills']){const _0x468f23=$dataSkills[_0x2488d0];if(_0x468f23)_0x115ec6[_0x4acf('0x52')](_0x468f23);}return _0x115ec6;},Game_Actor[_0x4acf('0x61')][_0x4acf('0x1d9')]=function(){Game_Battler[_0x4acf('0x61')][_0x4acf('0x1d9')][_0x4acf('0xf0')](this);const _0x44b484=VisuMZ[_0x4acf('0x16e')]['Settings'][_0x4acf('0x1e2')]['Actor'];this[_0x4acf('0x277')][_0x4acf('0xce')]=this[_0x4acf('0x277')][_0x4acf('0xce')][_0x4acf('0x17e')](_0x44b484);},VisuMZ['SkillsStatesCore'][_0x4acf('0x9')]=Game_Actor[_0x4acf('0x61')][_0x4acf('0x254')],Game_Actor[_0x4acf('0x61')][_0x4acf('0x254')]=function(_0x465d96){VisuMZ['SkillsStatesCore'][_0x4acf('0x9')][_0x4acf('0xf0')](this,_0x465d96),this[_0x4acf('0x277')]={};},VisuMZ['SkillsStatesCore'][_0x4acf('0x75')]=Game_Actor[_0x4acf('0x61')][_0x4acf('0x288')],Game_Actor['prototype'][_0x4acf('0x288')]=function(_0x478660){VisuMZ[_0x4acf('0x16e')]['Game_Actor_forgetSkill'][_0x4acf('0xf0')](this,_0x478660),this[_0x4acf('0x277')]={};},Game_Enemy[_0x4acf('0x61')][_0x4acf('0x138')]=function(){let _0x1e4ed4=[this[_0x4acf('0xdf')]()];return _0x1e4ed4['concat'](this['skills']());},Game_Enemy['prototype']['addPassiveStatesByPluginParameters']=function(){Game_Battler[_0x4acf('0x61')][_0x4acf('0x1d9')][_0x4acf('0xf0')](this);const _0x2c54ac=VisuMZ['SkillsStatesCore'][_0x4acf('0x20e')][_0x4acf('0x1e2')][_0x4acf('0xd5')];this['_cache'][_0x4acf('0xce')]=this[_0x4acf('0x277')][_0x4acf('0xce')][_0x4acf('0x17e')](_0x2c54ac);},Game_Enemy[_0x4acf('0x61')][_0x4acf('0x22c')]=function(){const _0x1e8c6a=[];for(const _0x4d405d of this['enemy']()[_0x4acf('0x161')]){if(_0x4acf('0x168')!==_0x4acf('0x2ce')){const _0x346aa0=$dataSkills[_0x4d405d[_0x4acf('0x2b7')]];if(_0x346aa0&&!_0x1e8c6a[_0x4acf('0x15')](_0x346aa0))_0x1e8c6a[_0x4acf('0x52')](_0x346aa0);}else{function _0x51f1e4(){const _0x33fba7=_0x1fc864[_0x4acf('0x2cb')];if(![_0x2b354a,_0x4c26c1][_0x4acf('0x15')](_0x33fba7[_0x4acf('0x171')]))return _0x19ad7b[_0x4acf('0x181')]();}}}return _0x1e8c6a;},Game_Enemy[_0x4acf('0x61')][_0x4acf('0x3')]=function(_0x291931){return this[_0x4acf('0x42')]($dataStates[_0x291931]);},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x0')]=Game_Unit[_0x4acf('0x61')]['isAllDead'],Game_Unit[_0x4acf('0x61')][_0x4acf('0x57')]=function(){if(this[_0x4acf('0x1ae')]())return!![];return VisuMZ[_0x4acf('0x16e')][_0x4acf('0x0')]['call'](this);},Game_Unit[_0x4acf('0x61')]['isPartyAllAffectedByGroupDefeatStates']=function(){const _0x27d5f5=this[_0x4acf('0x1b1')]();for(const _0x646b01 of _0x27d5f5){if(!_0x646b01[_0x4acf('0x8b')]())return![];}return!![];},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x2c5')]=Game_Troop['prototype']['setup'],Game_Troop[_0x4acf('0x61')][_0x4acf('0x2d3')]=function(_0x589ae9){VisuMZ[_0x4acf('0x16e')][_0x4acf('0x2c5')][_0x4acf('0xf0')](this,_0x589ae9),this[_0x4acf('0x180')]();},Game_Troop[_0x4acf('0x61')][_0x4acf('0x180')]=function(){this[_0x4acf('0x18a')]=Graphics[_0x4acf('0x18c')];},Game_Troop[_0x4acf('0x61')][_0x4acf('0x116')]=function(){return this[_0x4acf('0x18a')]=this['_currentTroopUniqueID']||Graphics[_0x4acf('0x18c')],this[_0x4acf('0x18a')];},Scene_Skill[_0x4acf('0x61')][_0x4acf('0x53')]=function(){if(ConfigManager[_0x4acf('0x16b')]&&ConfigManager[_0x4acf('0x290')]!==undefined){if(_0x4acf('0xcd')!==_0x4acf('0x1e5'))return ConfigManager[_0x4acf('0x290')];else{function _0xb4a206(){this[_0x4acf('0x27a')](_0x44a209)&&(_0x5cade6+=this[_0x4acf('0x2d')](_0x246e37),this[_0x4acf('0x20')](_0x2adf37,_0x2107d8));}}}else{if(this['isUseSkillsStatesCoreUpdatedLayout']())return this[_0x4acf('0x28a')]()[_0x4acf('0x152')](/LOWER/i);else{if(_0x4acf('0x104')===_0x4acf('0x104'))Scene_ItemBase[_0x4acf('0x61')][_0x4acf('0x6b')][_0x4acf('0xf0')](this);else{function _0x29a268(){return _0x283ef8[_0x4acf('0x235')](_0x8bfb2e(_0x589503['$1']));}}}}},Scene_Skill[_0x4acf('0x61')][_0x4acf('0x6b')]=function(){if(ConfigManager[_0x4acf('0x16b')]&&ConfigManager[_0x4acf('0x26e')]!==undefined)return ConfigManager[_0x4acf('0x26e')];else{if(this[_0x4acf('0x24a')]())return this[_0x4acf('0x28a')]()[_0x4acf('0x152')](/RIGHT/i);else{if('Apzok'!==_0x4acf('0x2a0'))Scene_ItemBase['prototype'][_0x4acf('0x6b')][_0x4acf('0xf0')](this);else{function _0x212f74(){let _0x1a3444=[this[_0x4acf('0x235')](),this[_0x4acf('0x5a')]()];_0x1a3444=_0x1a3444[_0x4acf('0x17e')](this[_0x4acf('0xd7')]()['filter'](_0x43aa00=>_0x43aa00));for(const _0x114da2 of this[_0x4acf('0x16f')]){const _0x2c83de=_0x12db1c[_0x114da2];if(_0x2c83de)_0x1a3444['push'](_0x2c83de);}return _0x1a3444;}}}}},Scene_Skill[_0x4acf('0x61')][_0x4acf('0x28a')]=function(){return VisuMZ[_0x4acf('0x16e')]['Settings'][_0x4acf('0x10f')][_0x4acf('0xd')];},Scene_Skill['prototype'][_0x4acf('0x29f')]=function(){return this[_0x4acf('0x1b8')]&&this[_0x4acf('0x1b8')][_0x4acf('0x29f')]();},Scene_Skill['prototype'][_0x4acf('0x24a')]=function(){return VisuMZ[_0x4acf('0x16e')]['Settings'][_0x4acf('0x10f')][_0x4acf('0xdb')];},VisuMZ['SkillsStatesCore']['Scene_Skill_helpWindowRect']=Scene_Skill[_0x4acf('0x61')][_0x4acf('0x145')],Scene_Skill[_0x4acf('0x61')]['helpWindowRect']=function(){if(this[_0x4acf('0x24a')]()){if(_0x4acf('0x155')===_0x4acf('0x155'))return this['helpWindowRectSkillsStatesCore']();else{function _0x433e2b(){for(_0x4577f6 of _0x2aa053[_0x4acf('0x16e')][_0x4acf('0x20e')]['Costs']){if(_0x53e7e8[_0x4acf('0x1ff')][_0x4acf('0x1c8')]()==='MP')return _0x410c5d[_0x4acf('0xda')][_0x4acf('0xf0')](this,_0x1039a5);}return _0x4dbe30[_0x4acf('0x16e')][_0x4acf('0x1a2')][_0x4acf('0xf0')](this,_0x1793c5);}}}else return VisuMZ[_0x4acf('0x16e')][_0x4acf('0x19d')][_0x4acf('0xf0')](this);},Scene_Skill[_0x4acf('0x61')][_0x4acf('0x29d')]=function(){const _0x44e81c=0x0,_0x2d4195=this[_0x4acf('0x8c')](),_0x1112c2=Graphics['boxWidth'],_0x2be3af=this[_0x4acf('0x7d')]();return new Rectangle(_0x44e81c,_0x2d4195,_0x1112c2,_0x2be3af);},VisuMZ['SkillsStatesCore'][_0x4acf('0x5b')]=Scene_Skill[_0x4acf('0x61')]['skillTypeWindowRect'],Scene_Skill['prototype'][_0x4acf('0x16c')]=function(){if(this[_0x4acf('0x24a')]()){if('Zdrsa'===_0x4acf('0x251')){function _0x1ce8b3(){return _0x1ae76f[_0x4acf('0x198')]()[_0x1d64af(_0x36cea8['$1'])];}}else return this[_0x4acf('0x215')]();}else return VisuMZ[_0x4acf('0x16e')][_0x4acf('0x5b')][_0x4acf('0xf0')](this);},Scene_Skill[_0x4acf('0x61')][_0x4acf('0x215')]=function(){const _0x3490fb=this[_0x4acf('0x1ee')](),_0x7947d1=this['calcWindowHeight'](0x3,!![]),_0x2b252c=this[_0x4acf('0x6b')]()?Graphics[_0x4acf('0x72')]-_0x3490fb:0x0,_0x2e5a27=this[_0x4acf('0x18d')]();return new Rectangle(_0x2b252c,_0x2e5a27,_0x3490fb,_0x7947d1);},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x23d')]=Scene_Skill[_0x4acf('0x61')][_0x4acf('0x1c3')],Scene_Skill[_0x4acf('0x61')][_0x4acf('0x1c3')]=function(){if(this[_0x4acf('0x24a')]()){if('jFMjY'===_0x4acf('0x19b')){function _0x3e8b25(){const _0x2c0b3e=this[_0x4acf('0x190')]();this['resetFontSettings'](),this[_0x4acf('0x223')](_0x58e45b,_0x4d6bcc,_0x5cd5b8,_0x3bc36f,!![]),this[_0x4acf('0xbf')](),this[_0x4acf('0x5e')][_0x4acf('0x4c')]-=0x8;const _0x27181e=this['_actor'][_0x4acf('0xa9')](_0xdaddee,!![]);this[_0x4acf('0x5e')][_0x4acf('0x19c')](_0x27181e,_0x4fec9d,_0x5cd4f4,_0x2edbf0,_0x2c0b3e,_0x4acf('0x121'));}}else return this[_0x4acf('0x1dd')]();}else{if('Ehpaq'!==_0x4acf('0x1a1')){function _0x17d11c(){const _0x235ce2=this[_0x4acf('0x1b0')];_0x235ce2[_0x4acf('0x19c')](_0x5b028f,0x0,_0xa7f928['y'],_0x235ce2[_0x4acf('0x77')],_0x4acf('0x1c'));}}else return VisuMZ[_0x4acf('0x16e')]['Scene_Skill_statusWindowRect'][_0x4acf('0xf0')](this);}},Scene_Skill[_0x4acf('0x61')][_0x4acf('0x1dd')]=function(){const _0x2131dd=Graphics[_0x4acf('0x72')]-this[_0x4acf('0x1ee')](),_0x52f922=this['_skillTypeWindow'][_0x4acf('0x227')],_0x427742=this['isRightInputMode']()?0x0:Graphics[_0x4acf('0x72')]-_0x2131dd,_0x25334c=this[_0x4acf('0x18d')]();return new Rectangle(_0x427742,_0x25334c,_0x2131dd,_0x52f922);},VisuMZ[_0x4acf('0x16e')]['Scene_Skill_createItemWindow']=Scene_Skill[_0x4acf('0x61')][_0x4acf('0x15d')],Scene_Skill[_0x4acf('0x61')][_0x4acf('0x15d')]=function(){VisuMZ[_0x4acf('0x16e')][_0x4acf('0x8d')][_0x4acf('0xf0')](this);if(this[_0x4acf('0x11b')]()){if(_0x4acf('0x13')!=='IYorq'){function _0x4aee6f(){if(_0x58731c[_0x4acf('0x83')](_0x3d0f43))return!![];}}else this[_0x4acf('0x209')]();}},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x196')]=Scene_Skill[_0x4acf('0x61')]['itemWindowRect'],Scene_Skill[_0x4acf('0x61')][_0x4acf('0xac')]=function(){if(this['isUseSkillsStatesCoreUpdatedLayout']()){if(_0x4acf('0x21d')!=='FAGIo'){function _0x93dade(){const _0x2eecf9=_0x4af3e5(_0x937dc4['$1']);_0x2eecf9!==_0x531e32[_0x17a917][_0x4acf('0xb6')]&&(_0x5776fa(_0x4acf('0x15b')[_0x4acf('0x7a')](_0x4b5a74,_0x2eecf9)),_0x177bd2[_0x4acf('0x1bf')]());}}else return this[_0x4acf('0x21b')]();}else{if(_0x4acf('0x10b')!==_0x4acf('0x10b')){function _0x3d4e16(){this[_0x4acf('0x1df')](_0x4e65f7['normalColor']()),this[_0x4acf('0x2a8')](_0x80cad6['outlineColor']());}}else{const _0xbdfb84=VisuMZ[_0x4acf('0x16e')][_0x4acf('0x196')][_0x4acf('0xf0')](this);return this[_0x4acf('0x11b')]()&&this[_0x4acf('0x268')]()&&(_0xbdfb84[_0x4acf('0x97')]-=this['shopStatusWidth']()),_0xbdfb84;}}},Scene_Skill['prototype'][_0x4acf('0x21b')]=function(){const _0x2459dc=Graphics[_0x4acf('0x72')]-this[_0x4acf('0x230')](),_0xafdb1d=this[_0x4acf('0x110')]()-this['_statusWindow'][_0x4acf('0x227')],_0x1dfd86=this[_0x4acf('0x6b')]()?Graphics[_0x4acf('0x72')]-_0x2459dc:0x0,_0x37e505=this[_0x4acf('0xa5')]['y']+this[_0x4acf('0xa5')][_0x4acf('0x227')];return new Rectangle(_0x1dfd86,_0x37e505,_0x2459dc,_0xafdb1d);},Scene_Skill[_0x4acf('0x61')][_0x4acf('0x11b')]=function(){if(!Imported[_0x4acf('0x107')])return![];else return this['isUseSkillsStatesCoreUpdatedLayout']()?!![]:VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')]['Skills'][_0x4acf('0x1eb')];},Scene_Skill[_0x4acf('0x61')]['adjustItemWidthByShopStatus']=function(){return VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0x10f')][_0x4acf('0x272')];},Scene_Skill[_0x4acf('0x61')][_0x4acf('0x209')]=function(){const _0x78abb9=this[_0x4acf('0x234')]();this[_0x4acf('0x287')]=new Window_ShopStatus(_0x78abb9),this[_0x4acf('0xa8')](this[_0x4acf('0x287')]),this[_0x4acf('0x21c')]['setStatusWindow'](this[_0x4acf('0x287')]);},Scene_Skill[_0x4acf('0x61')][_0x4acf('0x234')]=function(){if(this[_0x4acf('0x24a')]()){if(_0x4acf('0x1fd')===_0x4acf('0x1fd'))return this[_0x4acf('0x68')]();else{function _0x2c0463(){return![];}}}else return VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0x10f')][_0x4acf('0x264')][_0x4acf('0xf0')](this);},Scene_Skill[_0x4acf('0x61')][_0x4acf('0x68')]=function(){const _0x46fed1=this[_0x4acf('0x230')](),_0x2bf493=this[_0x4acf('0x21c')][_0x4acf('0x227')],_0x357849=this[_0x4acf('0x6b')]()?0x0:Graphics['boxWidth']-this[_0x4acf('0x230')](),_0x5b864c=this[_0x4acf('0x21c')]['y'];return new Rectangle(_0x357849,_0x5b864c,_0x46fed1,_0x2bf493);},Scene_Skill['prototype']['shopStatusWidth']=function(){return Imported[_0x4acf('0x107')]?Scene_Shop[_0x4acf('0x61')][_0x4acf('0xe3')]():0x0;},Scene_Skill[_0x4acf('0x61')][_0x4acf('0x241')]=function(){if(this['_skillTypeWindow']&&this['_skillTypeWindow'][_0x4acf('0x212')]){if(_0x4acf('0x2ba')!==_0x4acf('0x2ba')){function _0x38b114(){return _0x1d246e(_0x4c40fc['$1']);}}else return TextManager[_0x4acf('0x37')];}else{if(_0x4acf('0xb0')!==_0x4acf('0xb0')){function _0x5ba251(){return this[_0x4acf('0x24a')]()?this[_0x4acf('0x215')]():_0x4024ef[_0x4acf('0x16e')]['Scene_Skill_skillTypeWindowRect']['call'](this);}}else return'';}},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x2ad')]=Sprite_Gauge['prototype'][_0x4acf('0x2ae')],Sprite_Gauge['prototype']['initMembers']=function(){VisuMZ['SkillsStatesCore'][_0x4acf('0x2ad')][_0x4acf('0xf0')](this),this[_0x4acf('0x221')]=null;},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x1f5')]=Sprite_Gauge['prototype'][_0x4acf('0x2d3')],Sprite_Gauge[_0x4acf('0x61')][_0x4acf('0x2d3')]=function(_0x11b200,_0x43cf66){this[_0x4acf('0x1cb')](_0x11b200,_0x43cf66),_0x43cf66=_0x43cf66['toLowerCase'](),VisuMZ[_0x4acf('0x16e')][_0x4acf('0x1f5')]['call'](this,_0x11b200,_0x43cf66);},Sprite_Gauge[_0x4acf('0x61')][_0x4acf('0x1cb')]=function(_0xf65536,_0x3d7da3){const _0x3747ad=VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0xec')][_0x4acf('0x41')](_0xd8156f=>_0xd8156f[_0x4acf('0x1ff')]['toUpperCase']()===_0x3d7da3[_0x4acf('0x1c8')]());_0x3747ad[_0x4acf('0x9f')]>=0x1?this[_0x4acf('0x221')]=_0x3747ad[0x0]:this[_0x4acf('0x221')]=null;},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x113')]=Sprite_Gauge[_0x4acf('0x61')]['currentValue'],Sprite_Gauge[_0x4acf('0x61')][_0x4acf('0x172')]=function(){return this[_0x4acf('0x63')]&&this[_0x4acf('0x221')]?this[_0x4acf('0x202')]():VisuMZ[_0x4acf('0x16e')][_0x4acf('0x113')][_0x4acf('0xf0')](this);},Sprite_Gauge[_0x4acf('0x61')]['currentValueSkillsStatesCore']=function(){return this[_0x4acf('0x221')]['GaugeCurrentJS'][_0x4acf('0xf0')](this[_0x4acf('0x63')]);},VisuMZ[_0x4acf('0x16e')][_0x4acf('0xdc')]=Sprite_Gauge[_0x4acf('0x61')][_0x4acf('0x184')],Sprite_Gauge[_0x4acf('0x61')]['currentMaxValue']=function(){if(this[_0x4acf('0x63')]&&this[_0x4acf('0x221')])return this['currentMaxValueSkillsStatesCore']();else{if(_0x4acf('0x20a')===_0x4acf('0x2a3')){function _0x48b4bb(){return _0x5e1d83[_0x4acf('0xda')]['call'](this,_0x476831);}}else return VisuMZ[_0x4acf('0x16e')][_0x4acf('0xdc')][_0x4acf('0xf0')](this);}},Sprite_Gauge[_0x4acf('0x61')][_0x4acf('0x1f7')]=function(){return this[_0x4acf('0x221')][_0x4acf('0x18e')][_0x4acf('0xf0')](this[_0x4acf('0x63')]);},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x45')]=Sprite_Gauge[_0x4acf('0x61')][_0x4acf('0x22a')],Sprite_Gauge[_0x4acf('0x61')][_0x4acf('0x22a')]=function(){const _0x2c6cfb=VisuMZ[_0x4acf('0x16e')][_0x4acf('0x45')][_0x4acf('0xf0')](this);return _0x2c6cfb[_0x4acf('0x1fc')](0x0,0x1);},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x1fb')]=Sprite_Gauge[_0x4acf('0x61')][_0x4acf('0xc4')],Sprite_Gauge[_0x4acf('0x61')][_0x4acf('0xc4')]=function(){this[_0x4acf('0x63')]&&this[_0x4acf('0x221')]?(this[_0x4acf('0x8a')][_0x4acf('0x2a9')](),this[_0x4acf('0x9e')]()):VisuMZ[_0x4acf('0x16e')][_0x4acf('0x1fb')][_0x4acf('0xf0')](this);},Sprite_Gauge[_0x4acf('0x61')][_0x4acf('0xe2')]=function(){let _0x3c4853=this[_0x4acf('0x172')]();return Imported['VisuMZ_0_CoreEngine']&&this[_0x4acf('0xa')]()&&(_0x3c4853=VisuMZ[_0x4acf('0x8')](_0x3c4853)),_0x3c4853;},Sprite_Gauge[_0x4acf('0x61')]['redrawSkillsStatesCore']=function(){this[_0x4acf('0x221')][_0x4acf('0x13d')][_0x4acf('0xf0')](this);},Sprite_Gauge['prototype']['drawFullGauge']=function(_0x1cd472,_0x3a8533,_0x36c371,_0x41e5a1,_0x3e98a0,_0x273bd6){const _0x388c7d=this[_0x4acf('0x22a')](),_0x4f3c41=Math['floor']((_0x3e98a0-0x2)*_0x388c7d),_0x469bd3=_0x273bd6-0x2,_0x5234e9=this[_0x4acf('0xcb')]();this[_0x4acf('0x8a')][_0x4acf('0xd4')](_0x36c371,_0x41e5a1,_0x3e98a0,_0x273bd6,_0x5234e9),this[_0x4acf('0x8a')][_0x4acf('0x5f')](_0x36c371+0x1,_0x41e5a1+0x1,_0x4f3c41,_0x469bd3,_0x1cd472,_0x3a8533);},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x1cc')]=Sprite_StateIcon[_0x4acf('0x61')][_0x4acf('0x9c')],Sprite_StateIcon[_0x4acf('0x61')][_0x4acf('0x9c')]=function(){VisuMZ[_0x4acf('0x16e')][_0x4acf('0x1cc')][_0x4acf('0xf0')](this),this[_0x4acf('0x7c')]();},Sprite_StateIcon[_0x4acf('0x61')]['createTurnDisplaySprite']=function(){const _0xfa876c=Window_Base[_0x4acf('0x61')][_0x4acf('0x292')]();this[_0x4acf('0xb2')]=new Sprite(),this[_0x4acf('0xb2')][_0x4acf('0x8a')]=new Bitmap(ImageManager[_0x4acf('0xba')],_0xfa876c),this[_0x4acf('0xb2')][_0x4acf('0x1fe')]['x']=this[_0x4acf('0x1fe')]['x'],this['_turnDisplaySprite']['anchor']['y']=this[_0x4acf('0x1fe')]['y'],this[_0x4acf('0x1be')](this[_0x4acf('0xb2')]),this[_0x4acf('0x5e')]=this[_0x4acf('0xb2')][_0x4acf('0x8a')];},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x123')]=Sprite_StateIcon[_0x4acf('0x61')][_0x4acf('0x2a')],Sprite_StateIcon[_0x4acf('0x61')][_0x4acf('0x2a')]=function(){VisuMZ[_0x4acf('0x16e')][_0x4acf('0x123')][_0x4acf('0xf0')](this),this[_0x4acf('0x148')]();},Sprite_StateIcon[_0x4acf('0x61')][_0x4acf('0x19c')]=function(_0x5c36bd,_0x1c5812,_0x1610ba,_0x5894af,_0x206fa7){this[_0x4acf('0x5e')]['drawText'](_0x5c36bd,_0x1c5812,_0x1610ba,_0x5894af,this[_0x4acf('0x5e')][_0x4acf('0x227')],_0x206fa7);},Sprite_StateIcon['prototype'][_0x4acf('0x148')]=function(){this['resetFontSettings'](),this[_0x4acf('0x5e')]['clear']();const _0x510f76=this[_0x4acf('0x63')];if(!_0x510f76)return;const _0xb7d866=_0x510f76[_0x4acf('0x266')]()[_0x4acf('0x41')](_0x276d2b=>_0x276d2b[_0x4acf('0x236')]>0x0),_0x7d1540=[...Array(0x8)[_0x4acf('0x1da')]()][_0x4acf('0x41')](_0xab2dae=>_0x510f76[_0x4acf('0x5d')](_0xab2dae)!==0x0),_0x61736d=this[_0x4acf('0x2c3')],_0x355c95=_0xb7d866[_0x61736d];if(_0x355c95)Window_Base[_0x4acf('0x61')][_0x4acf('0x170')][_0x4acf('0xf0')](this,_0x510f76,_0x355c95,0x0,0x0),Window_Base[_0x4acf('0x61')][_0x4acf('0x140')][_0x4acf('0xf0')](this,_0x510f76,_0x355c95,0x0,0x0);else{const _0x3d216b=_0x7d1540[_0x61736d-_0xb7d866[_0x4acf('0x9f')]];if(!_0x3d216b)return;Window_Base[_0x4acf('0x61')]['drawActorBuffTurns'][_0x4acf('0xf0')](this,_0x510f76,_0x3d216b,0x0,0x0),Window_Base['prototype'][_0x4acf('0x26a')][_0x4acf('0xf0')](this,_0x510f76,_0x3d216b,0x0,0x0);}},Sprite_StateIcon[_0x4acf('0x61')][_0x4acf('0x93')]=function(){this[_0x4acf('0x5e')]['fontFace']=$gameSystem[_0x4acf('0x96')](),this[_0x4acf('0x5e')][_0x4acf('0x4c')]=$gameSystem[_0x4acf('0x1a7')](),this['resetTextColor']();},Sprite_StateIcon[_0x4acf('0x61')][_0x4acf('0xbf')]=function(){this[_0x4acf('0x1df')](ColorManager[_0x4acf('0x6a')]()),this[_0x4acf('0x2a8')](ColorManager[_0x4acf('0x144')]());},Sprite_StateIcon[_0x4acf('0x61')][_0x4acf('0x1df')]=function(_0x3ff3c1){this[_0x4acf('0x5e')]['textColor']=_0x3ff3c1;},Sprite_StateIcon['prototype'][_0x4acf('0x2a8')]=function(_0x5883bc){this['contents'][_0x4acf('0x144')]=_0x5883bc;},Window_Base[_0x4acf('0x61')][_0x4acf('0xc6')]=function(_0xb7e56c,_0x131b72,_0x1c1a36,_0x18e5ee,_0x125341){const _0x5cc62f=this[_0x4acf('0x23f')](_0xb7e56c,_0x131b72),_0x702328=this[_0x4acf('0x27f')](_0x5cc62f,_0x1c1a36,_0x18e5ee,_0x125341),_0x524ab9=_0x1c1a36+_0x125341-_0x702328[_0x4acf('0x97')];this[_0x4acf('0x124')](_0x5cc62f,_0x524ab9,_0x18e5ee,_0x125341),this[_0x4acf('0x93')]();},Window_Base[_0x4acf('0x61')][_0x4acf('0x23f')]=function(_0x2abe14,_0x39a45c){let _0x11895a='';for(settings of VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0xec')]){if(!this[_0x4acf('0x67')](_0x2abe14,_0x39a45c,settings))continue;if(_0x11895a['length']>0x0)_0x11895a+=this[_0x4acf('0x21f')]();_0x11895a+=this[_0x4acf('0x20d')](_0x2abe14,_0x39a45c,settings);}_0x11895a=this['makeAdditionalSkillCostText'](_0x2abe14,_0x39a45c,_0x11895a);if(_0x39a45c[_0x4acf('0x1c1')][_0x4acf('0x152')](/<CUSTOM COST TEXT>\s*([\s\S]*)\s*<\/CUSTOM COST TEXT>/i)){if('RLPdv'!=='RLPdv'){function _0x53466b(){if(!_0x3fb258[_0x4acf('0x83')](_0x1371f7))return![];}}else{if(_0x11895a['length']>0x0)_0x11895a+=this[_0x4acf('0x21f')]();_0x11895a+=String(RegExp['$1']);}}return _0x11895a;},Window_Base[_0x4acf('0x61')][_0x4acf('0x216')]=function(_0x49df71,_0x1a5330,_0x210e75){return _0x210e75;},Window_Base[_0x4acf('0x61')][_0x4acf('0x67')]=function(_0x15298a,_0x5e1c34,_0xa2b424){const _0x71b513=_0xa2b424[_0x4acf('0xda')][_0x4acf('0xf0')](_0x15298a,_0x5e1c34);return _0xa2b424['ShowJS'][_0x4acf('0xf0')](_0x15298a,_0x5e1c34,_0x71b513,_0xa2b424);},Window_Base['prototype'][_0x4acf('0x20d')]=function(_0x2b2e7c,_0x167c8c,_0x3282c4){const _0x564664=_0x3282c4[_0x4acf('0xda')]['call'](_0x2b2e7c,_0x167c8c);return _0x3282c4[_0x4acf('0x12a')][_0x4acf('0xf0')](_0x2b2e7c,_0x167c8c,_0x564664,_0x3282c4);},Window_Base[_0x4acf('0x61')][_0x4acf('0x21f')]=function(){return'\x20';},Window_Base[_0x4acf('0x61')]['drawActorIcons']=function(_0x4d20ec,_0x22399f,_0x2a512e,_0x4c2609){if(!_0x4d20ec)return;VisuMZ[_0x4acf('0x16e')][_0x4acf('0x210')]['call'](this,_0x4d20ec,_0x22399f,_0x2a512e,_0x4c2609),this[_0x4acf('0x19')](_0x4d20ec,_0x22399f,_0x2a512e,_0x4c2609);},Window_Base[_0x4acf('0x61')][_0x4acf('0x19')]=function(_0x588d96,_0x5a2b54,_0x16a2c7,_0xb3c8f5){_0xb3c8f5=_0xb3c8f5||0x90;const _0x1c8862=ImageManager[_0x4acf('0xba')],_0x20619b=_0x588d96[_0x4acf('0x197')]()[_0x4acf('0x16a')](0x0,Math[_0x4acf('0x4f')](_0xb3c8f5/_0x1c8862)),_0x20645a=_0x588d96[_0x4acf('0x266')]()[_0x4acf('0x41')](_0x17bc42=>_0x17bc42[_0x4acf('0x236')]>0x0),_0x341a90=[...Array(0x8)[_0x4acf('0x1da')]()][_0x4acf('0x41')](_0x1a35fa=>_0x588d96['buff'](_0x1a35fa)!==0x0),_0x1b82d1=[];let _0xe2c8dc=_0x5a2b54;for(let _0x4fddae=0x0;_0x4fddae<_0x20619b[_0x4acf('0x9f')];_0x4fddae++){this[_0x4acf('0x93')]();const _0x445f24=_0x20645a[_0x4fddae];if(_0x445f24)!_0x1b82d1[_0x4acf('0x15')](_0x445f24)&&this[_0x4acf('0x170')](_0x588d96,_0x445f24,_0xe2c8dc,_0x16a2c7),this[_0x4acf('0x140')](_0x588d96,_0x445f24,_0xe2c8dc,_0x16a2c7),_0x1b82d1[_0x4acf('0x52')](_0x445f24);else{const _0x4bd69b=_0x341a90[_0x4fddae-_0x20645a[_0x4acf('0x9f')]];this[_0x4acf('0x17d')](_0x588d96,_0x4bd69b,_0xe2c8dc,_0x16a2c7),this[_0x4acf('0x26a')](_0x588d96,_0x4bd69b,_0xe2c8dc,_0x16a2c7);}_0xe2c8dc+=_0x1c8862;}},Window_Base[_0x4acf('0x61')][_0x4acf('0x170')]=function(_0x24a7a2,_0x515000,_0x2586c2,_0x551350){if(!VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0xe6')][_0x4acf('0x1d6')])return;if(!_0x24a7a2[_0x4acf('0x81')](_0x515000['id']))return;if(_0x515000[_0x4acf('0x18b')]===0x0)return;if(_0x515000[_0x4acf('0x1c1')][_0x4acf('0x152')](/<HIDE STATE TURNS>/i))return;const _0x116b69=_0x24a7a2[_0x4acf('0x1af')](_0x515000['id']),_0xfc7a2e=ImageManager[_0x4acf('0xba')],_0x5bd4e0=ColorManager[_0x4acf('0x146')](_0x515000);this[_0x4acf('0x1df')](_0x5bd4e0),this[_0x4acf('0x2a8')](_0x4acf('0x54')),this[_0x4acf('0x5e')][_0x4acf('0x158')]=!![],this[_0x4acf('0x5e')]['fontSize']=VisuMZ['SkillsStatesCore'][_0x4acf('0x20e')][_0x4acf('0xe6')][_0x4acf('0x299')],_0x2586c2+=VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0xe6')][_0x4acf('0x34')],_0x551350+=VisuMZ[_0x4acf('0x16e')]['Settings']['States'][_0x4acf('0x111')],this[_0x4acf('0x19c')](_0x116b69,_0x2586c2,_0x551350,_0xfc7a2e,_0x4acf('0x121')),this[_0x4acf('0x5e')][_0x4acf('0x158')]=![],this[_0x4acf('0x93')]();},Window_Base['prototype'][_0x4acf('0x140')]=function(_0x3baf22,_0x100553,_0x920a38,_0x65da8e){if(!VisuMZ[_0x4acf('0x16e')]['Settings'][_0x4acf('0xe6')][_0x4acf('0x25c')])return;const _0x3d17cb=ImageManager[_0x4acf('0xba')],_0x2d053b=ImageManager[_0x4acf('0x1d5')]/0x2,_0x5ec55b=ColorManager[_0x4acf('0x6a')]();this['changeTextColor'](_0x5ec55b),this[_0x4acf('0x2a8')](_0x4acf('0x54')),this[_0x4acf('0x5e')][_0x4acf('0x158')]=!![],this['contents'][_0x4acf('0x4c')]=VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0xe6')][_0x4acf('0x2a4')],_0x920a38+=VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0xe6')][_0x4acf('0x1a')],_0x65da8e+=VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')]['States'][_0x4acf('0x143')];const _0x3fd61f=String(_0x3baf22[_0x4acf('0x28c')](_0x100553['id']));this[_0x4acf('0x19c')](_0x3fd61f,_0x920a38,_0x65da8e,_0x3d17cb,'center'),this['contents'][_0x4acf('0x158')]=![],this[_0x4acf('0x93')]();},Window_Base[_0x4acf('0x61')][_0x4acf('0x17d')]=function(_0x1f3600,_0x462a71,_0x19b59d,_0x5910ef){if(!VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0x4a')][_0x4acf('0x1d6')])return;const _0x263520=_0x1f3600['buff'](_0x462a71);if(_0x263520===0x0)return;const _0x228c47=_0x1f3600[_0x4acf('0x2d')](_0x462a71),_0x180ccf=ImageManager['iconWidth'],_0x2491f3=_0x263520>0x0?ColorManager['buffColor']():ColorManager[_0x4acf('0x263')]();this[_0x4acf('0x1df')](_0x2491f3),this[_0x4acf('0x2a8')](_0x4acf('0x54')),this['contents']['fontBold']=!![],this[_0x4acf('0x5e')][_0x4acf('0x4c')]=VisuMZ['SkillsStatesCore'][_0x4acf('0x20e')][_0x4acf('0x4a')]['TurnFontSize'],_0x19b59d+=VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0x4a')]['TurnOffsetX'],_0x5910ef+=VisuMZ[_0x4acf('0x16e')]['Settings'][_0x4acf('0x4a')][_0x4acf('0x111')],this[_0x4acf('0x19c')](_0x228c47,_0x19b59d,_0x5910ef,_0x180ccf,_0x4acf('0x121')),this[_0x4acf('0x5e')][_0x4acf('0x158')]=![],this[_0x4acf('0x93')]();},Window_Base['prototype'][_0x4acf('0x26a')]=function(_0x4e2db9,_0x27cacb,_0x5574b7,_0x23c298){if(!VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0x4a')][_0x4acf('0x25c')])return;const _0x5233d0=_0x4e2db9[_0x4acf('0x270')](_0x27cacb),_0x228bee=_0x4e2db9['buff'](_0x27cacb),_0xca7042=ImageManager[_0x4acf('0xba')],_0x2fe3f6=ImageManager[_0x4acf('0x1d5')]/0x2,_0x1baf3e=_0x228bee>0x0?ColorManager[_0x4acf('0x15c')]():ColorManager[_0x4acf('0x263')]();this[_0x4acf('0x1df')](_0x1baf3e),this[_0x4acf('0x2a8')](_0x4acf('0x54')),this[_0x4acf('0x5e')][_0x4acf('0x158')]=!![],this['contents'][_0x4acf('0x4c')]=VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0x4a')]['DataFontSize'],_0x5574b7+=VisuMZ[_0x4acf('0x16e')]['Settings']['Buffs'][_0x4acf('0x1a')],_0x23c298+=VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0x4a')][_0x4acf('0x143')];const _0x3dccf2=_0x4acf('0x284')[_0x4acf('0x7a')](Math[_0x4acf('0x33')](_0x5233d0*0x64));this[_0x4acf('0x19c')](_0x3dccf2,_0x5574b7,_0x23c298,_0xca7042,_0x4acf('0x1c')),this['contents'][_0x4acf('0x158')]=![],this['resetFontSettings']();},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x106')]=Window_StatusBase[_0x4acf('0x61')][_0x4acf('0x12d')],Window_StatusBase[_0x4acf('0x61')][_0x4acf('0x12d')]=function(_0x35c51f,_0x156c87,_0x4c4b14,_0x18fba0){if(_0x35c51f[_0x4acf('0x1c4')]())_0x156c87=this[_0x4acf('0x2aa')](_0x35c51f,_0x156c87);this[_0x4acf('0x1a6')](_0x35c51f,_0x156c87,_0x4c4b14,_0x18fba0);},Window_StatusBase[_0x4acf('0x61')][_0x4acf('0x1a6')]=function(_0x1541ed,_0x1dc2f1,_0x1fcf62,_0x51395f){if([_0x4acf('0x28d'),_0x4acf('0x1f6')][_0x4acf('0x15')](_0x1dc2f1[_0x4acf('0x297')]()))return;VisuMZ[_0x4acf('0x16e')][_0x4acf('0x106')][_0x4acf('0xf0')](this,_0x1541ed,_0x1dc2f1,_0x1fcf62,_0x51395f);},Window_StatusBase['prototype'][_0x4acf('0x2aa')]=function(_0x10b9d6,_0x54e926){const _0x4c4187=_0x10b9d6['currentClass']()[_0x4acf('0x1c1')];if(_0x54e926==='hp'&&_0x4c4187[_0x4acf('0x152')](/<REPLACE HP GAUGE:[ ](.*)>/i)){if('LuFjk'!==_0x4acf('0x298')){function _0x4d428f(){return _0x20a347[_0x4acf('0x16e')][_0x4acf('0x20e')]['States'][_0x4acf('0x10')];}}else return String(RegExp['$1']);}else{if(_0x54e926==='mp'&&_0x4c4187[_0x4acf('0x152')](/<REPLACE MP GAUGE:[ ](.*)>/i))return String(RegExp['$1']);else{if(_0x54e926==='tp'&&_0x4c4187[_0x4acf('0x152')](/<REPLACE TP GAUGE:[ ](.*)>/i)){if('idGdp'!==_0x4acf('0x3b'))return String(RegExp['$1']);else{function _0x1b86c7(){const _0x369b14=_0x33d429(_0xa279cb['$1']),_0x422d73=_0x5c85bf[_0x4acf('0x7a')](_0x369b14,'damage',-0x1,'slipMp');_0x8d0661[_0x4acf('0x16e')][_0x4acf('0x1bb')][_0x248df0['id']]=new _0x40a3f5(_0x4acf('0x204'),_0x422d73);}}}else{if(_0x4acf('0x12b')==='tVSWv'){function _0x319002(){const _0x1816cc=this[_0x4acf('0x1b0')],_0x338ec9=_0x383740['windowPadding'](),_0xe0e7ed=_0x3a382b['x']+_0x9df5af[_0x4acf('0x4f')](_0x2cc015['width']/0x2)+_0x338ec9;_0x1816cc['x']=_0x1816cc[_0x4acf('0x97')]/-0x2+_0xe0e7ed,_0x1816cc['y']=_0x47a8b5[_0x4acf('0x4f')](_0x278690[_0x4acf('0x227')]/0x2);}}else return _0x54e926;}}}},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x210')]=Window_StatusBase[_0x4acf('0x61')][_0x4acf('0x17c')],Window_StatusBase[_0x4acf('0x61')][_0x4acf('0x17c')]=function(_0x4eedb8,_0x465995,_0x2bacf8,_0x4b0517){if(!_0x4eedb8)return;Window_Base[_0x4acf('0x61')][_0x4acf('0x17c')][_0x4acf('0xf0')](this,_0x4eedb8,_0x465995,_0x2bacf8,_0x4b0517);},VisuMZ[_0x4acf('0x16e')]['Window_SkillType_initialize']=Window_SkillType[_0x4acf('0x61')][_0x4acf('0x244')],Window_SkillType[_0x4acf('0x61')][_0x4acf('0x244')]=function(_0x13a5bf){VisuMZ['SkillsStatesCore'][_0x4acf('0x14c')][_0x4acf('0xf0')](this,_0x13a5bf),this['createCommandNameWindow'](_0x13a5bf);},Window_SkillType[_0x4acf('0x61')][_0x4acf('0x24b')]=function(_0x26422a){const _0x15e92c=new Rectangle(0x0,0x0,_0x26422a[_0x4acf('0x97')],_0x26422a['height']);this[_0x4acf('0x1b0')]=new Window_Base(_0x15e92c),this[_0x4acf('0x1b0')][_0x4acf('0xa4')]=0x0,this[_0x4acf('0x1be')](this[_0x4acf('0x1b0')]),this[_0x4acf('0x1c6')]();},Window_SkillType[_0x4acf('0x61')][_0x4acf('0x217')]=function(){Window_Command[_0x4acf('0x61')]['callUpdateHelp'][_0x4acf('0xf0')](this);if(this['_commandNameWindow'])this['updateCommandNameWindow']();},Window_SkillType[_0x4acf('0x61')]['updateCommandNameWindow']=function(){const _0x600913=this['_commandNameWindow'];_0x600913[_0x4acf('0x5e')]['clear']();const _0x497c99=this[_0x4acf('0x30')](this['index']());if(_0x497c99===_0x4acf('0x7')&&this[_0x4acf('0x7e')]()>0x0){if(_0x4acf('0x66')==='LuXxc'){function _0x39d426(){if(this[_0x4acf('0x280')]===_0x137b2b)return;this[_0x4acf('0x280')]=_0x33ca8b,this[_0x4acf('0x289')](),this[_0x4acf('0x1a5')](0x0,0x0),this[_0x4acf('0xa5')]&&this[_0x4acf('0xa5')][_0x4acf('0x171')]===_0x1544d1&&this[_0x4acf('0xa5')][_0x4acf('0x12c')](this[_0x4acf('0x13c')](0x0));}}else{const _0x11412a=this[_0x4acf('0xfa')](this['index']());let _0x3bcf7f=this[_0x4acf('0x21e')](this[_0x4acf('0x1e9')]());_0x3bcf7f=_0x3bcf7f[_0x4acf('0xdd')](/\\I\[(\d+)\]/gi,''),_0x600913[_0x4acf('0x93')](),this[_0x4acf('0x274')](_0x3bcf7f,_0x11412a),this[_0x4acf('0x1e8')](_0x3bcf7f,_0x11412a),this[_0x4acf('0x183')](_0x3bcf7f,_0x11412a);}}},Window_SkillType[_0x4acf('0x61')]['commandNameWindowDrawBackground']=function(_0x489d7f,_0x2b13e5){},Window_SkillType[_0x4acf('0x61')][_0x4acf('0x1e8')]=function(_0x36a20a,_0x58d83f){const _0x235e55=this[_0x4acf('0x1b0')];_0x235e55[_0x4acf('0x19c')](_0x36a20a,0x0,_0x58d83f['y'],_0x235e55[_0x4acf('0x77')],_0x4acf('0x1c'));},Window_SkillType[_0x4acf('0x61')][_0x4acf('0x183')]=function(_0xc4c12e,_0x4bb059){const _0x1a0212=this[_0x4acf('0x1b0')],_0x3a8c9b=$gameSystem['windowPadding'](),_0x31d48b=_0x4bb059['x']+Math[_0x4acf('0x4f')](_0x4bb059[_0x4acf('0x97')]/0x2)+_0x3a8c9b;_0x1a0212['x']=_0x1a0212[_0x4acf('0x97')]/-0x2+_0x31d48b,_0x1a0212['y']=Math[_0x4acf('0x4f')](_0x4bb059['height']/0x2);},Window_SkillType[_0x4acf('0x61')][_0x4acf('0x29f')]=function(){return Imported[_0x4acf('0xbe')]&&Window_Command[_0x4acf('0x61')][_0x4acf('0x29f')][_0x4acf('0xf0')](this);},Window_SkillType[_0x4acf('0x61')]['makeCommandList']=function(){if(!this[_0x4acf('0x1f9')])return;const _0x1e839a=this[_0x4acf('0x1f9')][_0x4acf('0x46')]();for(const _0x200bdf of _0x1e839a){if(_0x4acf('0x167')===_0x4acf('0x167')){const _0x31417b=this['makeCommandName'](_0x200bdf);this[_0x4acf('0x1ba')](_0x31417b,_0x4acf('0x147'),!![],_0x200bdf);}else{function _0x9eed09(){_0xe0c7e[_0x4acf('0x152')](/<SET[ ](.*)[ ]BUFF TURNS:[ ](\d+)>/i);const _0x15113b=_0x5d36c4['indexOf'](_0x22da4d(_0x272692['$1'])[_0x4acf('0x1c8')]()),_0xf981d7=_0x348ec9(_0x559342['$2']);_0x15113b>=0x0&&(_0xb6ca80[_0x4acf('0xd2')](_0x15113b,_0xf981d7),this['makeSuccess'](_0x150834));}}}},Window_SkillType[_0x4acf('0x61')][_0x4acf('0x232')]=function(_0x42b243){let _0xb35db1=$dataSystem[_0x4acf('0x46')][_0x42b243];if(_0xb35db1[_0x4acf('0x152')](/\\I\[(\d+)\]/i))return _0xb35db1;const _0x966e2=VisuMZ[_0x4acf('0x16e')]['Settings'][_0x4acf('0x10f')],_0x3b787a=$dataSystem[_0x4acf('0xc8')][_0x4acf('0x15')](_0x42b243),_0xd7f508=_0x3b787a?_0x966e2[_0x4acf('0x240')]:_0x966e2[_0x4acf('0x2c0')];return'\x5cI[%1]%2'[_0x4acf('0x7a')](_0xd7f508,_0xb35db1);},Window_SkillType[_0x4acf('0x61')][_0x4acf('0x279')]=function(){return VisuMZ[_0x4acf('0x16e')]['Settings']['Skills'][_0x4acf('0x11')];},Window_SkillType[_0x4acf('0x61')][_0x4acf('0x175')]=function(_0x53ee07){const _0xefac27=this[_0x4acf('0x30')](_0x53ee07);if(_0xefac27==='iconText')this[_0x4acf('0x1f4')](_0x53ee07);else{if(_0xefac27===_0x4acf('0x7'))this[_0x4acf('0xef')](_0x53ee07);else{if('tZSUB'!==_0x4acf('0x1d4')){function _0x3efb07(){const _0x2ec03d=_0x41a8d1[_0x4acf('0x1c1')];_0x2ec03d[_0x4acf('0x152')](/<MP COST:[ ](\d+)>/i)&&(_0x2da130[_0x4acf('0x19a')]=_0x4b76f4(_0x1e6d64['$1'])),_0x2ec03d[_0x4acf('0x152')](/<TP COST:[ ](\d+)>/i)&&(_0x14729a[_0x4acf('0x2b3')]=_0x3a3260(_0x23f2bf['$1']));}}else Window_Command['prototype'][_0x4acf('0x175')]['call'](this,_0x53ee07);}}},Window_SkillType[_0x4acf('0x61')][_0x4acf('0x79')]=function(){return VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')]['Skills'][_0x4acf('0xc9')];},Window_SkillType[_0x4acf('0x61')][_0x4acf('0x30')]=function(_0x383780){if(_0x383780<0x0)return _0x4acf('0x2d2');const _0x3ea31a=this['commandStyle']();if(_0x3ea31a!==_0x4acf('0xeb')){if(_0x4acf('0x91')!==_0x4acf('0x17b'))return _0x3ea31a;else{function _0x5084bf(){const _0x2d5256=this[_0x4acf('0xfa')](_0x208d96),_0x17276e=this[_0x4acf('0x21e')](_0x4a72c1),_0x372181=this['textSizeEx'](_0x17276e)[_0x4acf('0x97')];this[_0x4acf('0x173')](this[_0x4acf('0x1d7')](_0xb17c3b));const _0x34516f=this[_0x4acf('0x279')]();if(_0x34516f===_0x4acf('0x121'))this[_0x4acf('0x124')](_0x17276e,_0x2d5256['x']+_0x2d5256[_0x4acf('0x97')]-_0x372181,_0x2d5256['y'],_0x372181);else{if(_0x34516f===_0x4acf('0x1c')){const _0xa9427d=_0x2d5256['x']+_0x2608a9[_0x4acf('0x4f')]((_0x2d5256[_0x4acf('0x97')]-_0x372181)/0x2);this[_0x4acf('0x124')](_0x17276e,_0xa9427d,_0x2d5256['y'],_0x372181);}else this[_0x4acf('0x124')](_0x17276e,_0x2d5256['x'],_0x2d5256['y'],_0x372181);}}}}else{if(this['maxItems']()>0x0){if(_0x4acf('0xe1')!==_0x4acf('0xe1')){function _0x48fd39(){_0x56e683[_0x4acf('0x16e')]['Game_BattlerBase_decreaseBuff']['call'](this,_0x5a3edf);if(!this[_0x4acf('0x3d')](_0x3094a9))this['eraseBuff'](_0x546d5d);}}else{const _0x56acc3=this[_0x4acf('0x21e')](_0x383780);if(_0x56acc3[_0x4acf('0x152')](/\\I\[(\d+)\]/i)){if(_0x4acf('0x64')!=='QYFPs'){function _0x46a144(){if(_0x1fe436[_0x4acf('0x1ff')][_0x4acf('0x1c8')]()==='MP')return _0x32bdb2['CalcJS'][_0x4acf('0xf0')](this,_0x44fa44);}}else{const _0x2e82ea=this[_0x4acf('0xfa')](_0x383780),_0xdc100a=this[_0x4acf('0x27f')](_0x56acc3)['width'];return _0xdc100a<=_0x2e82ea[_0x4acf('0x97')]?_0x4acf('0x2bc'):_0x4acf('0x7');}}}}}return _0x4acf('0x2d2');},Window_SkillType['prototype'][_0x4acf('0x1f4')]=function(_0x74ee1c){const _0x4e713a=this['itemLineRect'](_0x74ee1c),_0x24c67a=this[_0x4acf('0x21e')](_0x74ee1c),_0x66a3c0=this['textSizeEx'](_0x24c67a)[_0x4acf('0x97')];this[_0x4acf('0x173')](this[_0x4acf('0x1d7')](_0x74ee1c));const _0x1b752f=this[_0x4acf('0x279')]();if(_0x1b752f===_0x4acf('0x121'))this[_0x4acf('0x124')](_0x24c67a,_0x4e713a['x']+_0x4e713a[_0x4acf('0x97')]-_0x66a3c0,_0x4e713a['y'],_0x66a3c0);else{if(_0x1b752f==='center'){const _0xa11eff=_0x4e713a['x']+Math[_0x4acf('0x4f')]((_0x4e713a[_0x4acf('0x97')]-_0x66a3c0)/0x2);this[_0x4acf('0x124')](_0x24c67a,_0xa11eff,_0x4e713a['y'],_0x66a3c0);}else this[_0x4acf('0x124')](_0x24c67a,_0x4e713a['x'],_0x4e713a['y'],_0x66a3c0);}},Window_SkillType[_0x4acf('0x61')][_0x4acf('0xef')]=function(_0x91c79e){this[_0x4acf('0x21e')](_0x91c79e)['match'](/\\I\[(\d+)\]/i);const _0x181e3=Number(RegExp['$1'])||0x0,_0x54b3a2=this[_0x4acf('0xfa')](_0x91c79e),_0x545509=_0x54b3a2['x']+Math[_0x4acf('0x4f')]((_0x54b3a2[_0x4acf('0x97')]-ImageManager[_0x4acf('0xba')])/0x2),_0xb9a7f2=_0x54b3a2['y']+(_0x54b3a2[_0x4acf('0x227')]-ImageManager[_0x4acf('0x1d5')])/0x2;this['drawIcon'](_0x181e3,_0x545509,_0xb9a7f2);},VisuMZ[_0x4acf('0x16e')]['Window_SkillStatus_refresh']=Window_SkillStatus[_0x4acf('0x61')]['refresh'],Window_SkillStatus[_0x4acf('0x61')][_0x4acf('0x289')]=function(){VisuMZ[_0x4acf('0x16e')][_0x4acf('0x24e')]['call'](this);if(this[_0x4acf('0x1f9')])this[_0x4acf('0xd9')]();},Window_SkillStatus[_0x4acf('0x61')][_0x4acf('0xd9')]=function(){if(!Imported[_0x4acf('0xbe')])return;if(!Imported[_0x4acf('0x119')])return;const _0x24c5b4=this[_0x4acf('0x190')]();let _0x46b970=this[_0x4acf('0x2af')]()/0x2+0xb4+0xb4+0xb4,_0x1f2659=this[_0x4acf('0x77')]-_0x46b970-0x2;if(_0x1f2659>=0x12c){const _0x3529c7=VisuMZ['CoreEngine']['Settings'][_0x4acf('0xb1')][_0x4acf('0x6e')],_0x4eb5f5=Math[_0x4acf('0x4f')](_0x1f2659/0x2)-0x18;let _0xedec9e=_0x46b970,_0x4f5ce1=Math[_0x4acf('0x4f')]((this[_0x4acf('0xc')]-Math[_0x4acf('0x1e7')](_0x3529c7[_0x4acf('0x9f')]/0x2)*_0x24c5b4)/0x2),_0x348964=0x0;for(const _0x3f6844 of _0x3529c7){if(_0x4acf('0x231')==='rlcPt'){this['drawExtendedParameter'](_0xedec9e,_0x4f5ce1,_0x4eb5f5,_0x3f6844),_0x348964++;if(_0x348964%0x2===0x0){if(_0x4acf('0x1a9')!==_0x4acf('0x1e0'))_0xedec9e=_0x46b970,_0x4f5ce1+=_0x24c5b4;else{function _0x3d6a58(){const _0x5ad8af=_0x210a28['note'];if(_0x5ad8af[_0x4acf('0x152')](/<JS PASSIVE CONDITION>\s*([\s\S]*)\s*<\/JS PASSIVE CONDITION>/i)){const _0x82c27d=_0x48d34c(_0x42307e['$1']),_0x3f23f0=_0x4acf('0xaa')['format'](_0x82c27d);_0x39039d[_0x4acf('0x16e')][_0x4acf('0x2b5')][_0x3c41f0['id']]=new _0x457612(_0x4acf('0x191'),_0x3f23f0);}}}}else{if(_0x4acf('0x7b')!=='SlLww')_0xedec9e+=_0x4eb5f5+0x18;else{function _0x15a668(){const _0x2e0ac0=_0x18b10d['parse']('['+_0x3b3a34['$1'][_0x4acf('0x152')](/\d+/g)+']');for(const _0x412d4a of _0x2e0ac0){if(!this[_0x4acf('0x1f9')][_0x4acf('0xb3')](_0x412d4a))return!![];}return![];}}}}else{function _0x4b100b(){const _0x3de61c=_0x3143de['parse']('['+_0x318307['$1'][_0x4acf('0x152')](/\d+/g)+']');for(const _0x4acb6f of _0x3de61c){if(!_0x1c74df[_0x4acf('0x83')](_0x4acb6f))return![];}return!![];}}}}this[_0x4acf('0x93')]();},Window_SkillStatus['prototype'][_0x4acf('0x1b5')]=function(_0x481f5b,_0x40aa1d,_0x14179d,_0x507828){const _0x3f5f20=this[_0x4acf('0x190')]();this[_0x4acf('0x93')](),this['drawParamText'](_0x481f5b,_0x40aa1d,_0x14179d,_0x507828,!![]),this[_0x4acf('0xbf')](),this[_0x4acf('0x5e')]['fontSize']-=0x8;const _0x523fc8=this[_0x4acf('0x1f9')][_0x4acf('0xa9')](_0x507828,!![]);this[_0x4acf('0x5e')][_0x4acf('0x19c')](_0x523fc8,_0x481f5b,_0x40aa1d,_0x14179d,_0x3f5f20,_0x4acf('0x121'));},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x177')]=Window_SkillList['prototype'][_0x4acf('0x15')],Window_SkillList[_0x4acf('0x61')][_0x4acf('0x15')]=function(_0x11504b){return this[_0x4acf('0x6c')](_0x11504b);},VisuMZ['SkillsStatesCore']['Window_SkillList_maxCols']=Window_SkillList[_0x4acf('0x61')]['maxCols'],Window_SkillList['prototype'][_0x4acf('0xc7')]=function(){if(SceneManager[_0x4acf('0x2cb')][_0x4acf('0x171')]===Scene_Battle){if(_0x4acf('0x49')!==_0x4acf('0x1aa'))return VisuMZ['SkillsStatesCore'][_0x4acf('0x275')][_0x4acf('0xf0')](this);else{function _0x173d09(){let _0x92e103=0x0,_0x326132=0x0;if(_0x3355b4[_0x4acf('0x152')](/<SET STATE[ ](\d+)[ ]TURNS:[ ](\d+)>/i))_0x92e103=_0x1c02cc(_0x2c7dc8['$1']),_0x326132=_0x495221(_0x480815['$2']);else _0x37581b['match'](/<SET STATE[ ](.*)[ ]TURNS:[ ](\d+)>/i)&&(_0x92e103=_0x194936[_0x4acf('0x129')](_0x580b54['$1']),_0x326132=_0x43cded(_0x275309['$2']));_0x4796e7[_0x4acf('0x20')](_0x92e103,_0x326132),this[_0x4acf('0x22')](_0x3b5af6);}}}else{if(_0x4acf('0x189')===_0x4acf('0x20b')){function _0x5c878b(){this[_0x4acf('0x63')]&&this['_costSettings']?(this[_0x4acf('0x8a')]['clear'](),this[_0x4acf('0x9e')]()):_0x3319fc[_0x4acf('0x16e')][_0x4acf('0x1fb')][_0x4acf('0xf0')](this);}}else return VisuMZ[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0x10f')][_0x4acf('0xa3')];}},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x1f')]=Window_SkillList[_0x4acf('0x61')][_0x4acf('0x255')],Window_SkillList[_0x4acf('0x61')][_0x4acf('0x255')]=function(_0x118073){const _0x92c5f5=this[_0x4acf('0x1f9')]!==_0x118073;VisuMZ[_0x4acf('0x16e')][_0x4acf('0x1f')]['call'](this,_0x118073);if(_0x92c5f5){if('kuOSx'===_0x4acf('0x134')){function _0x3a97b7(){return _0x44f877[_0x4acf('0x1c1')][_0x4acf('0x152')](/<PASSIVE STACKABLE>/i);}}else{if(this[_0x4acf('0xa5')]&&this[_0x4acf('0xa5')][_0x4acf('0x171')]===Window_ShopStatus){if(_0x4acf('0x160')===_0x4acf('0xca')){function _0x27bdfd(){_0x3baa4b[_0x4acf('0x16e')][_0x4acf('0x1b4')][_0x4acf('0xf0')](this),this[_0x4acf('0x22f')]();}}else this[_0x4acf('0xa5')][_0x4acf('0x12c')](this[_0x4acf('0x13c')](0x0));}}}},Window_SkillList[_0x4acf('0x61')][_0x4acf('0x1f1')]=function(_0x3426e4){if(this[_0x4acf('0x280')]===_0x3426e4)return;this['_stypeId']=_0x3426e4,this['refresh'](),this['scrollTo'](0x0,0x0),this[_0x4acf('0xa5')]&&this[_0x4acf('0xa5')][_0x4acf('0x171')]===Window_ShopStatus&&this[_0x4acf('0xa5')][_0x4acf('0x12c')](this[_0x4acf('0x13c')](0x0));},Window_SkillList['prototype'][_0x4acf('0x6c')]=function(_0x551a12){if(!_0x551a12)return VisuMZ[_0x4acf('0x16e')][_0x4acf('0x177')]['call'](this,_0x551a12);if(!this[_0x4acf('0x126')](_0x551a12))return![];if(!this['checkShowHideNotetags'](_0x551a12))return![];if(!this[_0x4acf('0x222')](_0x551a12))return![];return!![];},Window_SkillList[_0x4acf('0x61')][_0x4acf('0x126')]=function(_0x468486){return DataManager[_0x4acf('0x100')](_0x468486)[_0x4acf('0x15')](this[_0x4acf('0x280')]);},Window_SkillList[_0x4acf('0x61')][_0x4acf('0x132')]=function(_0x108b7a){if(!this['checkShowHideBattleNotetags'](_0x108b7a))return![];if(!this['checkShowHideSwitchNotetags'](_0x108b7a))return![];if(!this[_0x4acf('0x32')](_0x108b7a))return![];return!![];},Window_SkillList[_0x4acf('0x61')][_0x4acf('0xe4')]=function(_0x4d6f5f){const _0x1fc261=_0x4d6f5f[_0x4acf('0x1c1')];if(_0x1fc261[_0x4acf('0x152')](/<HIDE IN BATTLE>/i)&&$gameParty[_0x4acf('0x6')]()){if('HfzgK'===_0x4acf('0x245'))return![];else{function _0x374df5(){return _0x3148ab['SkillsStatesCore'][_0x4acf('0x23d')][_0x4acf('0xf0')](this);}}}else{if(_0x1fc261[_0x4acf('0x152')](/<HIDE OUTSIDE BATTLE>/i)&&!$gameParty['inBattle']()){if('sOyVP'!==_0x4acf('0x1e4'))return![];else{function _0x28b993(){_0x14a364[_0x4acf('0x16e')][_0x4acf('0x200')][_0x4acf('0xf0')](this),this[_0x4acf('0x249')]();}}}else return!![];}},Window_SkillList[_0x4acf('0x61')][_0x4acf('0x1f8')]=function(_0x41b35c){const _0x269a2b=_0x41b35c[_0x4acf('0x1c1')];if(_0x269a2b[_0x4acf('0x152')](/<SHOW[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x4acf('0xd1')===_0x4acf('0xd1')){const _0x3ad2d1=JSON[_0x4acf('0x47')]('['+RegExp['$1'][_0x4acf('0x152')](/\d+/g)+']');for(const _0x44d7ca of _0x3ad2d1){if(!$gameSwitches['value'](_0x44d7ca))return![];}return!![];}else{function _0x3e75d4(){if(!this[_0x4acf('0x86')](_0xb45792))return![];return!![];}}}if(_0x269a2b[_0x4acf('0x152')](/<SHOW ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x4acf('0x9a')!==_0x4acf('0x8e')){const _0x20219f=JSON[_0x4acf('0x47')]('['+RegExp['$1'][_0x4acf('0x152')](/\d+/g)+']');for(const _0x48ab46 of _0x20219f){if(!$gameSwitches[_0x4acf('0x83')](_0x48ab46))return![];}return!![];}else{function _0x234ff5(){if(_0x22504e[_0x4acf('0xb5')]())_0x5ad40a['log'](_0x3cba08);}}}if(_0x269a2b['match'](/<SHOW ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x26e327=JSON[_0x4acf('0x47')]('['+RegExp['$1'][_0x4acf('0x152')](/\d+/g)+']');for(const _0x52402b of _0x26e327){if($gameSwitches['value'](_0x52402b))return!![];}return![];}if(_0x269a2b[_0x4acf('0x152')](/<HIDE[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x4acf('0x195')===_0x4acf('0x201')){function _0x49ae1b(){this[_0x4acf('0x1b5')](_0x360709,_0x1444c0,_0x9aa726,_0x50d0a8),_0x5a3549++,_0x28f603%0x2===0x0?(_0x2cfa72=_0x495112,_0x26dc47+=_0x2cafb6):_0x5e07e4+=_0x5b2fda+0x18;}}else{const _0x400e1f=JSON[_0x4acf('0x47')]('['+RegExp['$1'][_0x4acf('0x152')](/\d+/g)+']');for(const _0x24b2a4 of _0x400e1f){if('vWJQH'!==_0x4acf('0x14f')){if(!$gameSwitches[_0x4acf('0x83')](_0x24b2a4))return!![];}else{function _0x25882b(){_0x2e125c[_0x4acf('0x16e')][_0x4acf('0x20e')]['Buffs'][_0x4acf('0x27d')][_0x4acf('0xf0')](this,_0x31c11c);}}}return![];}}if(_0x269a2b[_0x4acf('0x152')](/<HIDE ALL[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x3f283d=JSON[_0x4acf('0x47')]('['+RegExp['$1'][_0x4acf('0x152')](/\d+/g)+']');for(const _0x4c7074 of _0x3f283d){if(!$gameSwitches[_0x4acf('0x83')](_0x4c7074))return!![];}return![];}if(_0x269a2b[_0x4acf('0x152')](/<HIDE ANY[ ](?:SW|SWITCH|SWITCHES):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x4d5ce7=JSON[_0x4acf('0x47')]('['+RegExp['$1'][_0x4acf('0x152')](/\d+/g)+']');for(const _0x219ae9 of _0x4d5ce7){if($gameSwitches[_0x4acf('0x83')](_0x219ae9))return![];}return!![];}return!![];},Window_SkillList[_0x4acf('0x61')][_0x4acf('0x32')]=function(_0x53e340){const _0x526559=_0x53e340[_0x4acf('0x1c1')];if(_0x526559[_0x4acf('0x152')](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('sFDYa'!==_0x4acf('0x48')){const _0x264f0e=JSON[_0x4acf('0x47')]('['+RegExp['$1'][_0x4acf('0x152')](/\d+/g)+']');for(const _0x53e66f of _0x264f0e){if(_0x4acf('0x9b')===_0x4acf('0x27')){function _0x1855f(){const _0x3ae85d=_0x58364d['getStateIdWithName'](_0x3ffee6);if(_0x3ae85d)this[_0x4acf('0x277')]['passiveStates'][_0x4acf('0x52')](_0x3ae85d);}}else{if(!this[_0x4acf('0x1f9')][_0x4acf('0xb3')](_0x53e66f))return![];}}return!![];}else{function _0x2fc015(){const _0x43ff8c=0x0,_0xf88a44=this[_0x4acf('0x8c')](),_0x500a40=_0x33893b['boxWidth'],_0x134560=this[_0x4acf('0x7d')]();return new _0x2fc2e8(_0x43ff8c,_0xf88a44,_0x500a40,_0x134560);}}}else{if(_0x526559[_0x4acf('0x152')](/<SHOW IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x4acf('0x188')===_0x4acf('0xa0')){function _0x3d9afa(){const _0x3af11c=_0x2447db['parse']('['+_0x2bd814['$1'][_0x4acf('0x152')](/\d+/g)+']');this[_0x4acf('0x277')][_0x4acf('0xce')]=this[_0x4acf('0x277')][_0x4acf('0xce')][_0x4acf('0x17e')](_0x3af11c);}}else{const _0x5d9ced=RegExp['$1'][_0x4acf('0x1ac')](',');for(const _0x502f95 of _0x5d9ced){if(_0x4acf('0x2b')!==_0x4acf('0x2b')){function _0x513c6d(){const _0x3fd2d1=_0x407592[_0x4acf('0x1c1')],_0x42c669=_0x4acf('0xd6');if(_0x3fd2d1[_0x4acf('0x152')](/<JS ON ADD STATE>\s*([\s\S]*)\s*<\/JS ON ADD STATE>/i)){const _0xe834de=_0x1383cf(_0x349ca8['$1']),_0x847742=_0x42c669['format'](_0xe834de);_0x514491[_0x4acf('0x16e')]['stateAddJS'][_0x5cd925['id']]=new _0x35f9c0('stateId',_0x847742);}if(_0x3fd2d1[_0x4acf('0x152')](/<JS ON ERASE STATE>\s*([\s\S]*)\s*<\/JS ON ERASE STATE>/i)){const _0x1b4114=_0x572f7a(_0x453ca0['$1']),_0x1a4262=_0x42c669[_0x4acf('0x7a')](_0x1b4114);_0x58efa7[_0x4acf('0x16e')][_0x4acf('0x257')][_0x166d74['id']]=new _0x34eeba('stateId',_0x1a4262);}if(_0x3fd2d1['match'](/<JS ON EXPIRE STATE>\s*([\s\S]*)\s*<\/JS ON EXPIRE STATE>/i)){const _0x4cf9d8=_0x330b06(_0x4a82f1['$1']),_0x1bbcf8=_0x42c669[_0x4acf('0x7a')](_0x4cf9d8);_0x30ad0a[_0x4acf('0x16e')][_0x4acf('0x257')][_0xa102e0['id']]=new _0x4c0866('stateId',_0x1bbcf8);}}}else{const _0x146acf=DataManager[_0x4acf('0x253')](_0x146acf);if(!_0x146acf)continue;if(!this['_actor']['isLearnedSkill'](_0x146acf))return![];}}return!![];}}}if(_0x526559['match'](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if('bsDsz'===_0x4acf('0xfb')){function _0x257115(){this[_0x4acf('0x214')](_0x1f8a78['id'])&&_0x236278[_0x4acf('0x18b')]===_0x209d3e&&(this['removeState'](_0x871b45['id']),this['onExpireState'](_0xfdaf13['id']),this[_0x4acf('0x1ab')](_0x3b7994['id']));}}else{const _0x2052b8=JSON['parse']('['+RegExp['$1']['match'](/\d+/g)+']');for(const _0x36135b of _0x2052b8){if(_0x4acf('0x178')==='SbkUQ'){if(!this['_actor'][_0x4acf('0xb3')](_0x36135b))return![];}else{function _0x314f3b(){const _0x2269f1=_0x37dc51[_0x4acf('0x1c1')];return _0x2269f1[_0x4acf('0x152')](/<REAPPLY RULES:[ ](.*)>/i)?_0x3670b1(_0x17eb48['$1']):_0x585147[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0xe6')][_0x4acf('0x10')];}}}return!![];}}else{if(_0x526559[_0x4acf('0x152')](/<SHOW IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x4acf('0x250')!==_0x4acf('0x250')){function _0x28bc96(){_0x2726e9[_0x4acf('0x16e')]['Game_BattlerBase_increaseBuff'][_0x4acf('0xf0')](this,_0x550fd5);if(!this[_0x4acf('0x3d')](_0x44c49c))this[_0x4acf('0x228')](_0x47ab0b);}}else{const _0x341f6a=RegExp['$1'][_0x4acf('0x1ac')](',');for(const _0x228e14 of _0x341f6a){if(_0x4acf('0x82')!==_0x4acf('0x56')){const _0xad74d3=DataManager[_0x4acf('0x253')](_0xad74d3);if(!_0xad74d3)continue;if(!this[_0x4acf('0x1f9')][_0x4acf('0xb3')](_0xad74d3))return![];}else{function _0x693d9(){for(let _0x48ae12=0x0;_0x48ae12<this[_0x4acf('0xd8')]();_0x48ae12++){if(this[_0x4acf('0xcf')](_0x48ae12)){const _0x32f595=this[_0x4acf('0x208')][_0x48ae12];this[_0x4acf('0x1b7')](_0x48ae12);if(_0x32f595>0x0)this['onExpireBuff'](_0x48ae12);if(_0x32f595<0x0)this[_0x4acf('0x1a3')](_0x48ae12);}}}}}return!![];}}}if(_0x526559[_0x4acf('0x152')](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x2fe3db=JSON[_0x4acf('0x47')]('['+RegExp['$1'][_0x4acf('0x152')](/\d+/g)+']');for(const _0x189c66 of _0x2fe3db){if('CvDly'===_0x4acf('0x2d1')){function _0x5ecb1b(){return this['_buffs'][_0x4b4bfd]===_0x22309d[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0x4a')]['StackBuffMax'];}}else{if(this[_0x4acf('0x1f9')][_0x4acf('0xb3')](_0x189c66))return!![];}}return![];}else{if(_0x526559[_0x4acf('0x152')](/<SHOW IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x4acf('0x1e1')!==_0x4acf('0x1e1')){function _0x35a10a(){const _0x217876=_0x532f90['SkillsStatesCore'][_0x4acf('0x1a8')];if(_0x217876[_0x46e754])_0x217876[_0x307a01][_0x4acf('0xf0')](this,_0x44d2a1);}}else{const _0x895ea3=RegExp['$1'][_0x4acf('0x1ac')](',');for(const _0x4fb909 of _0x895ea3){if(_0x4acf('0x87')!==_0x4acf('0x192')){const _0x313871=DataManager[_0x4acf('0x253')](_0x313871);if(!_0x313871)continue;if(this[_0x4acf('0x1f9')][_0x4acf('0xb3')](_0x313871))return!![];}else{function _0x4c0529(){this[_0x4acf('0x5e')][_0x4acf('0x17f')]=_0x124210;}}}return![];}}}if(_0x526559[_0x4acf('0x152')](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x124921=JSON[_0x4acf('0x47')]('['+RegExp['$1'][_0x4acf('0x152')](/\d+/g)+']');for(const _0x209658 of _0x124921){if(_0x4acf('0x207')!==_0x4acf('0x207')){function _0x383a29(){if(typeof _0x1ec5b8!=='number')_0x47027f=_0x2f30e2['id'];return this[_0x4acf('0x1e3')]=this[_0x4acf('0x1e3')]||{},this[_0x4acf('0x1e3')][_0x4e5c94]=this[_0x4acf('0x1e3')][_0x4e916e]||{},this[_0x4acf('0x1e3')][_0xa0c7de];}}else{if(!this[_0x4acf('0x1f9')][_0x4acf('0xb3')](_0x209658))return!![];}}return![];}else{if(_0x526559[_0x4acf('0x152')](/<HIDE IF LEARNED[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x4acf('0x2a6')===_0x4acf('0x2a6')){const _0x4b973c=RegExp['$1'][_0x4acf('0x1ac')](',');for(const _0x4128a9 of _0x4b973c){const _0x5045a8=DataManager['getSkillIdWithName'](_0x5045a8);if(!_0x5045a8)continue;if(!this[_0x4acf('0x1f9')]['isLearnedSkill'](_0x5045a8))return!![];}return![];}else{function _0x2b42b7(){const _0x39740c=_0x397d1e[_0x4acf('0x16e')][_0x4acf('0x20e')][_0x4acf('0x1e2')]['Global'];this[_0x4acf('0x277')][_0x4acf('0xce')]=this[_0x4acf('0x277')]['passiveStates'][_0x4acf('0x17e')](_0x39740c);}}}}if(_0x526559['match'](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){const _0x13ad4d=JSON[_0x4acf('0x47')]('['+RegExp['$1'][_0x4acf('0x152')](/\d+/g)+']');for(const _0xd02af7 of _0x13ad4d){if(_0x4acf('0x22d')===_0x4acf('0x22d')){if(!this['_actor'][_0x4acf('0xb3')](_0xd02af7))return!![];}else{function _0x30bc54(){this[_0x4acf('0xa5')]['setItem'](this[_0x4acf('0x286')]());}}}return![];}else{if(_0x526559[_0x4acf('0x152')](/<HIDE IF LEARNED ALL[ ](?:SKILL|SKILLS):[ ](.*)>/i)){const _0x166608=RegExp['$1'][_0x4acf('0x1ac')](',');for(const _0x3fc3d1 of _0x166608){const _0x426503=DataManager[_0x4acf('0x253')](_0x426503);if(!_0x426503)continue;if(!this[_0x4acf('0x1f9')][_0x4acf('0xb3')](_0x426503))return!![];}return![];}}if(_0x526559[_0x4acf('0x152')](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ]*(\d+(?:\s*,\s*\d+)*)>/i)){if(_0x4acf('0x271')!==_0x4acf('0xcc')){const _0xc4c32c=JSON['parse']('['+RegExp['$1'][_0x4acf('0x152')](/\d+/g)+']');for(const _0x7cd656 of _0xc4c32c){if(_0x4acf('0x281')===_0x4acf('0x14a')){function _0x3aff96(){const _0x3b258b=_0x5c5561['parse']('['+_0x447c33['$1'][_0x4acf('0x152')](/\d+/g)+']');for(const _0x420ef5 of _0x3b258b){if(this[_0x4acf('0x1f9')][_0x4acf('0xb3')](_0x420ef5))return![];}return!![];}}else{if(this['_actor'][_0x4acf('0xb3')](_0x7cd656))return![];}}return!![];}else{function _0x15ad7d(){const _0x424966=_0xbcb5a3[_0x4acf('0x47')]('['+_0x5a1584['$1'][_0x4acf('0x152')](/\d+/g)+']');for(const _0x67d3aa of _0x424966){if(!_0x57c260['value'](_0x67d3aa))return![];}return!![];}}}else{if(_0x526559[_0x4acf('0x152')](/<HIDE IF LEARNED ANY[ ](?:SKILL|SKILLS):[ ](.*)>/i)){if(_0x4acf('0xde')!==_0x4acf('0x16d')){const _0x3abc7c=RegExp['$1'][_0x4acf('0x1ac')](',');for(const _0x517852 of _0x3abc7c){const _0x94339=DataManager[_0x4acf('0x253')](_0x94339);if(!_0x94339)continue;if(this['_actor'][_0x4acf('0xb3')](_0x94339))return![];}return!![];}else{function _0xdf53a3(){if(!this[_0x4acf('0x1f9')]['isLearnedSkill'](_0x578aa2))return![];}}}}return!![];},Window_SkillList[_0x4acf('0x61')]['checkShowHideJS']=function(_0x16ea01){const _0x3bba92=_0x16ea01[_0x4acf('0x1c1')],_0x10ce30=VisuMZ[_0x4acf('0x16e')]['skillVisibleJS'];if(_0x10ce30[_0x16ea01['id']])return _0x10ce30[_0x16ea01['id']][_0x4acf('0xf0')](this,_0x16ea01);else{if(_0x4acf('0x283')!==_0x4acf('0x283')){function _0x3da835(){if(typeof _0x5971b6!==_0x4acf('0xc2'))_0x5cc333=_0x3ca1cc['id'];return this[_0x4acf('0x233')]=this['_stateDisplay']||{},this[_0x4acf('0x233')][_0x36cf5f]===_0x4185b6&&(this[_0x4acf('0x233')][_0x356b2b]=''),this['_stateDisplay'][_0x6bbedd];}}else return!![];}},Window_SkillList[_0x4acf('0x61')][_0x4acf('0xc6')]=function(_0x5b9934,_0x21c2b6,_0x5d20be,_0x23ebf2){Window_Base['prototype'][_0x4acf('0xc6')][_0x4acf('0xf0')](this,this[_0x4acf('0x1f9')],_0x5b9934,_0x21c2b6,_0x5d20be,_0x23ebf2);},Window_SkillList['prototype'][_0x4acf('0x1ad')]=function(_0x4e4e98){this[_0x4acf('0xa5')]=_0x4e4e98,this[_0x4acf('0x217')]();},VisuMZ[_0x4acf('0x16e')][_0x4acf('0x1dc')]=Window_SkillList['prototype'][_0x4acf('0x117')],Window_SkillList[_0x4acf('0x61')][_0x4acf('0x117')]=function(){VisuMZ[_0x4acf('0x16e')]['Window_SkillList_updateHelp']['call'](this);if(this['_statusWindow']&&this[_0x4acf('0xa5')]['constructor']===Window_ShopStatus){if(_0x4acf('0x25a')===_0x4acf('0x25a'))this[_0x4acf('0xa5')]['setItem'](this['item']());else{function _0x4e3ba3(){this[_0x4acf('0x3a')](_0x4acf('0xad')),_0x31ef8f[_0x4acf('0x16e')][_0x4acf('0xe0')][_0x4acf('0xf0')](this),this[_0x4acf('0x1b')]();}}}};